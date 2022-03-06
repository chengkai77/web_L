/* global $, visoConfig, Mustache, uuid, jsPlumb */

(function () {
  var areaId = '#diagramContainer-main';
  jsPlumb.ready(jsPlumbMain);

  // 放入拖动节点
  function dropNode (dataset, ui, obj) {
	var dataObj = ui.position;
	//console.log("ui.position",position);
	//    ui.position.top = event.clientY+document.body.scrollTop;
//    ui.position.left = event.clientX+document.body.scrollLeft;
	var left = parseInt(ui.offset.left - $(obj).offset().left);
    var top = parseInt(ui.offset.top - $(obj).offset().top);
	dataObj.id = uuid.v1();
	dataObj.top = top; 
    dataObj.left = left;//$('#diagramContainer-left').outerWidth();
	dataObj.jnode = dataset.jnode;
	dataObj.jnodeClass = dataset.jnodeClass;
	dataObj.jnodeHtml = ui.helper.html();
	console.log("template.dataObj",dataObj);
    var targetHtml = renderHtml(dataset.template, dataObj);
	//alert(targetHtml);
    $(areaId).append(targetHtml);//追加元素
    initSetNode(dataObj);// 初始化节点设置

	/**jsplumb实际上不支持改变节点大小，实际上只能通过jquery ui resizable 方法去改变。
	 $(areaId).find('.btn').resizable({
      resize: function (event, ui) {
        jsPlumb.repaint(ui.helper)
      }
    })
	**/	

  }

  // 初始化节点设置
  function initSetNode (dataObj) {
	  var id = dataObj.id;
    // jsPlumb.draggable(id, {containment: 'parent'})
    addDraggable(id);

	 var isvisible = false;
//      if("judge"==dataObj.jnode){
//          isvisible = true;//判断节点显示Label标签
//      }
	//设置四周端点
      visioConfig.baseArchors.forEach(function (key) {
          jsPlumb.addEndpoint(
              id,
              {
                  anchors: key,
                  connectorOverlays: [
                      ["Arrow", {width: 10, length: 10, location: 1, id: "arrow",visible: isvisible}],
                      ["Label", {id: "myLabel", cssClass: "connectorLabel",visible: isvisible, events:{
                          "click":function (label, evt) {
                              console.log("clicked on label for connection",label.component);
                          }
                      }}]
                  ]
              },
              visioConfig.hollowCircle);
      });
	

    // jsPlumb.addEndpoints(id, [{anchors: ['TopCenter', 'RightMiddle', 'BottomCenter', 'LeftMiddle']}], visioConfig.hollowCircle)

	//新增可删除的close元素
	$("#"+id).on("mouseenter", ".jnode-box", function () {
				//鼠标穿过被选元素时,添加
				var left = 10,top = 18,right = 10,top=33;
//				if($(this).hasClass("jnode-judge"))top = 30;//判断的特殊控制
				var backgroundColor = $(this).css("background-color");
				if (backgroundColor == "rgb(146, 208, 80)"){
                    var divWidth = $(this).width()/2 - 3;
                    $(this).append('<i class="fa fa-trash-o" style="position:absolute;color:#fff;left:'+left+'px;top:'+top+'px;z-index:12;"/>');
				    $(this).append('<i class="fa fa-cog" style="position:absolute;color:#fff;right:'+right+'px;top:'+top+'px;z-index:12;"/>');
				    $(this).append('<i class="icon-refresh" style="position:absolute;color:#fff;left:'+divWidth+'px;top:'+4+'px;z-index:12;"/>');
				}else{
				    $(this).append('<i class="fa fa-trash-o" style="position:absolute;color:#fff;left:'+left+'px;top:'+top+'px;z-index:12;"/>');
				    $(this).append('<i class="fa fa-cog" style="position:absolute;color:#fff;right:'+right+'px;top:'+top+'px;z-index:12;"/>');
				}
			}).on("mouseleave", ".jnode-box", function () {
				//鼠标离开被选元素时，移除
				$(".fa-trash-o").remove();
				$(".fa-cog").remove();
				try{
				   $(".icon-refresh").remove();
				}catch(err){
				    return
				}
			}).on("mousedown", ".jnode-box", function () {
			    var div = $(this);
                var text = div[0].children[0].innerText;
                var new_text = text.replace(/ /g,"-");
                $(this)[0].children[0].innerText = new_text;
            }).on("mouseup", ".jnode-box", function () {
                var div = $(this);
                var text = div[0].children[0].innerText;
                var new_text = text.replace(/-/g," ");
                $(this)[0].children[0].innerText = new_text;
			}).on("click", ".fa-trash-o", function () {
				//鼠标点击close元素时，删除
				var text = $(this).parent()[0].innerText;
				var thisDiv = $(this).parent();
				var parentDiv = $(this).parent()[0].parentElement;
				var id = $(this).parent()[0].parentElement.id;
				var json = getConnections();
				var nodeNo = json[id+"nodeNo"];
				layer.confirm('Are you sure to delete?', {
				    title: "Delete Confirmation",
                    btn: ['Yes','No']
                    }, function(index){
                        jsPlumb.removeAllEndpoints(id);
					    thisDiv.remove();
					    parentDiv.remove();
					    layer.close(index);
					    var param = {"name":text,"nodeNo":nodeNo,"divId":id}
					    $.ajax({
                          type:'POST',
                          url:'../deletevariant/',
                          dataType:'json',
                          data:param,
                          success:function(data){
                          }
                        })
                    })
			}).on("click", ".fa-cog", function () {
			    var text = $(this).parent()[0].innerText;
			    var parent_div = $(this).parent()[0];
			    var id = parent_div.parentElement.id;
			    var process_id = id;
			    parent_div.setAttribute("style","background:#d58512;border:3px solid #d58512;");
			    try{
			        var div_id = parent_div.children[0].getAttribute("name");
			    }catch(err){
			        var div_id = "";
			    }
				if (div_id != null && div_id != "" && typeof(div_id) != "undefined"){
				    var title = div_id.replace(".py","");
				    titles = title.split("\\");
				    if (titles[0] == "public"){
				        title = title.replace("public","Public");
				    }else if(titles[0] == "release"){
				        title = title.replace("release","Release");
				    }else{
				        title = title.replace(titles[0],"Private");
				    }
                    title = title + ' (Click submit to insert the existing process)';
				    $.ajax({
                        type:'POST',
                        url:'../showprocess/',
                        dataType:'json',
                        data:{"selectfile":div_id},
                        beforeSend:function(){
                            layer.load(2);
                        },
                        success:function(data){
                            layer.closeAll('loading');
                            result = data['result'];
                            if (result == "success"){
                                list = data['list'];
                                var index = layer.open({
                                    type: 2,
                                    title: title,
                                    content: '../processvariant/?selectfile='+div_id,
                                    area: ['320px', '195px'],
                                    maxmin: true,
                                    skin: 'process-class',
                                    btn: ['Submit','Cancel','Update'],
                                    btn1:function(index, layero){
                                        var iframeWin = window[layero.find('iframe')[0]['name']];
                                        var public_list = new Array;
                                        var list2 = new Array;
                                        for (var o=0;o<list.length;o++){
                                          var variant_string = list[o].variant;
                                          var public_json = {};
                                          try{
                                            public_json = eval('(' + variant_string + ')');
                                          }catch(err){
                                            public_json = {};
                                          }
                                          var id = list[o].source_id;
                                          if (iframeWin.document.getElementById(id)){
                                            var div = iframeWin.document.getElementById(id);
                                            var input_childs = div.getElementsByTagName("input");
                                            for (var p=0;p<input_childs.length;p++){
                                              var input_child = input_childs[p];
                                              var value = input_child.value;
                                              var name = input_child.name;
                                              if (name != "" && name != null){
                                                public_json[name] = value.toString();
                                              }
                                            }
                                            var select_childs = div.getElementsByTagName("select");
                                            for (var p=0;p<select_childs.length;p++){
                                              var select_child = select_childs[p];
                                              var value = select_child.value;
                                              var name = select_child.name;
                                              public_json[name] = value.toString();
                                            }
                                            list[o].variant = JSON.stringify(public_json);
                                            list2.push(JSON.stringify(list[o]));
                                          }
                                          json_2_str = JSON.stringify(list[o]);
                                          public_list.push(json_2_str);
                                        }
                                        var connections = getConnections();
                                        var param = {};
                                        param['list'] = JSON.stringify(public_list);
                                        param['list2'] = JSON.stringify(list2);
                                        param['id'] = process_id;
                                        param['nodeNo'] = connections[process_id+'nodeNo'];
                                        param['group'] = div_id;
                                        $.ajax({
                                          type:'POST',
                                          url:'../saveinsertvariant/',
                                          dataType:'json',
                                          data:param,
                                          beforeSend:function(){
                                            layer.load(2);
                                          },
                                          success:function(data){
                                            layer.closeAll('loading');
                                            result = data['result'];
                                            if (result == "success"){
                                                layer.msg(gettext('Save Successfully'), {
                                                  time: 1000,
                                                  icon:6,
                                                });
                                                var div = document.getElementById(process_id);
                                                div.children[0].setAttribute("style","border:3px solid #d58512");
                                            }else{
                                                layer.msg(gettext('Save Failed'), {
                                                  time: 1000,
                                                  icon:5,
                                                });
                                            }
                                          },
                                        });
                                    },
                                    btn2:function(index, layero){
                                        cancel(id);
                                    },
                                    btn3:function(index, layero){
                                        var iframeWin = window[layero.find('iframe')[0]['name']];
                                        var public_list = new Array;
                                        for (var o=0;o<list.length;o++){
                                          var variant_string = list[o].variant;
                                          var public_json = {};
                                          try{
                                            public_json = eval('(' + variant_string + ')');
                                          }catch(err){
                                            public_json = {};
                                          }
                                          var id = list[o].source_id;
                                          if (iframeWin.document.getElementById(id)){
                                            var div = iframeWin.document.getElementById(id);
                                            var input_childs = div.getElementsByTagName("input");
                                            for (var p=0;p<input_childs.length;p++){
                                              var input_child = input_childs[p];
                                              var value = input_child.value;
                                              var name = input_child.name;
                                              if (name != "" && name != null){
                                                public_json[name] = value.toString();
                                              }
                                            }
                                            var select_childs = div.getElementsByTagName("select");
                                            for (var p=0;p<select_childs.length;p++){
                                              var select_child = select_childs[p];
                                              var value = select_child.value;
                                              var name = select_child.name;
                                              public_json[name] = value.toString();
                                            }
                                            list[o].variant = JSON.stringify(public_json);
                                          }
                                          json_2_str = JSON.stringify(list[o]);
                                          public_list.push(json_2_str);
                                        }
                                        var connections = getConnections();
                                        var param = {};
                                        param['list'] = JSON.stringify(public_list);
                                        param['id'] = process_id;
                                        param['nodeNo'] = connections[process_id+'nodeNo'];
                                        param['group'] = div_id;
                                        $.ajax({
                                          type:'POST',
                                          url:'../updateinsertvariant/',
                                          dataType:'json',
                                          data:param,
                                          beforeSend:function(){
                                            layer.load(2);
                                          },
                                          success:function(data){
                                            layer.closeAll('loading');
                                            result = data['result'];
                                            if (result == "success"){
                                                layer.msg(gettext('Save Successfully'), {
                                                  time: 1000,
                                                  icon:6,
                                                });
                                                var div = document.getElementById(process_id);
                                                div.children[0].setAttribute("style","border:3px solid #d58512");
                                            }else{
                                                layer.msg(gettext('Save Failed'), {
                                                  time: 1000,
                                                  icon:5,
                                                });
                                            }
                                          },
                                        });
                                    }
                                });
                                layer.full(index);
                            }
                        }
                    });

				}else{
				    generateTools(id,text);
				}
		    }).on("click", ".icon-refresh", function () {
		        var text = $(this).parent()[0].innerText;
				var thisDiv = $(this).parent();
				var id = $(this).parent()[0].parentElement.id;
				var divHeight = $("#diagramContainer-main").height();
				var process_id = thisDiv[0].children[0].getAttribute("name");
				var showed_paths = process_id.split("\\");
                var showed_path = "";
                if (process_id.indexOf("D:\\workspace\\Python_Platform\\Draw_Process\\pyfile\\public") != -1){
                    showed_path = process_id.replace("D:\\workspace\\Python_Platform\\Draw_Process\\pyfile\\public","Public");
                }else if(process_id.indexOf("D:\\workspace\\Python_Platform\\Draw_Process\\pyfile\\release") != -1){
                    showed_path = process_id.replace("D:\\workspace\\Python_Platform\\Draw_Process\\pyfile\\release","Release");
                }else{
                    showed_path = "Private"
                    for (var i=6;i<showed_paths.length;i++){
                        showed_path = showed_path + "\\" + showed_paths[i];
                    }
                }
                showed_path = showed_path.replace(".py","");
		        var index = layer.open({
                  type: 2,
                  title: 'Insert Process (' + showed_path + ')',
                  skin: 'layui-layer-lan',
                  area: ['650px', '600px'],
                  maxmin: true,
                  content: '../processdetail/?groupID='+id+"&divHeight="+divHeight,
                  })
                layer.full(index);
			}).on("dblclick", ".jnode-box",function(){
				//鼠标双击
				var backgroundColor = $(this).css("background-color");
				if (backgroundColor != "rgb(146, 208, 80)"){
				    var select_json_2_str = JSON.stringify(div_selection_list);
                    var div = $(this).parent()[0];
                    var id = $(this).parent()[0].id;
                    var innerText = div.innerText;
                    if (innerText !="Start" && innerText != "End"){
                        if (select_json_2_str.indexOf(id) == -1){
                            $(div).children(":first").css({"background-color":"#5FB878"});
                            var color = "";
                            var className = div.firstElementChild.className;
                            if (className.indexOf("bdc-success") != -1){
                                color = "#4cae4c";
                            }else if(className.indexOf("bdc-primary") != -1){
                                color = "#122b40";
                            }else if(className.indexOf("bdc-warning") != -1){
                                color = "#4F6228";
                            }else if(className.indexOf("bdc-danger") != -1){
                                color = "#ac2925";
                            }else if(className.indexOf("bdc-wait") != -1){
                                color = "#215967";
                            }else if(className.indexOf("bdc-process") != -1){
                                color = "#92D050";
                            }
                            var jnode_html = div.firstElementChild.innerHTML;
                            div_selection_list.push(id);
                            div_json[id] = color;
                            div_json[id+"className"] = className;
                            div_json[id+"jnodeHtml"] = jnode_html;
                        }
                    }
				}
			});
  }



  // 让元素可拖动
  function addDraggable (id) {
    jsPlumb.draggable(id, {containment: 'parent'});//containment: 'parent'只能在固定区域内移动
	//jsPlumb.draggable(id, {containment: 'parent',grid: [10, 10]});//containment: 'parent'只能在固定区域内移动
  }

  // 利用mustache模板工具，渲染html
  function renderHtml (templateId, dataObj) {
	return Mustache.render($("#"+templateId).html(), dataObj);
	//return Mustache.render(visioConfig.visioTemplate[templateId], dataObj);
  }

  //初始化连接线的文本。
  function initConnection(connection){
	var labelText = connection.sourceId.substring(15) + "-" + connection.targetId.substring(15);
	var startText = connection.source.innerText;
	var endText = connection.target.innerText;
	labelText = startText+"->"+endText;
	connection.getOverlay("myLabel").setLabel(labelText);
  }

  // 主要入口
  function jsPlumbMain () {
    jsPlumb.setContainer("diagramContainer-main");

	

	//单点击了连接线, 支持删除连线
	jsPlumb.bind('click', function (conn, originalEvent) {
		console.log("connection click",conn);
		if(conn.source){//判断是否连接线
		    layer.confirm('Are you sure to delete the connecting line?', {
				    title: "Delete Confirmation",
                    btn: ['Yes','No']
                    }, function(index){
                        jsPlumb.detach(conn);
                        layer.close(index);
                    })
		}
	});


	jsPlumb.bind("connection", function (connInfo, originalEvent) {
		console.log("connInfo" ,connInfo);
		initConnection(connInfo.connection);
	});



	jsPlumb.bind("connectionDrag", function (connection) {
		console.log("connectionDrag", connection);
	});

	jsPlumb.bind("connectionDragStop", function (connection) {
		console.log("connectionDragStop",connection);
	});


	//定义可拖拽控件
//    $('.jnode-box').draggable({
//      helper: 'clone',
//      scope: 'ss',
//    });

    $('.jnode-box2').draggable({
      helper: 'clone',
      scope: 'ss',
    });


	//定义可拖拽释放
    $(areaId).droppable({
      scope: 'ss',
      drop: function (event, ui) {
		//创建新节点
        dropNode(ui.draggable[0].dataset, ui,$(this));
      }
    });

  }

})()
