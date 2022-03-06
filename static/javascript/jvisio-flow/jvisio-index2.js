/* global $, visoConfig, Mustache, uuid, jsPlumb */

(function () {
    var select_tab, tab_index;
    tab_index = '';
    try{
        select_tab = $('#tt').tabs('getSelected');
        var id = select_tab[0].id;
        if (id == "codes_area"){
            tab_index = '';
        }else if(id == "process-area"){
            tab_index = '';
        }else{
            tab_index = parseInt(id.replace("process-area",""));
        }
    }catch{
        tab_index = '';
    }
    var control_id = "diagramContainer-main" + tab_index;
    var areaId = '#' + control_id;
    jsPlumb.ready(jsPlumbMain);

    //判断嵌入流程中是否有子流程
    function initStep(template, dataObj, variant_name) {
        var targetHtml = renderHtml(template, dataObj);
        $(areaId).append(targetHtml);//追加元素
        var screenSize = parseFloat($("#screen_size" + tab_index).val());
        if (screenSize != 100 && typeof(screen_size) != "undefined"){
            var div = document.getElementById(dataObj.id).firstElementChild;
            span_width_list.push(dataObj.id);
            if (dataset.jnodeClass.indexOf('judge') != -1){
                span_width_json[dataObj.id] = div.offsetWidth;
            }else{
                span_width_json[dataObj.id] = div.getBoundingClientRect().width.toFixed(2);
            }
            var fontSize = parseFloat($("#font_size" + tab_index).val());
            var lineHeight = parseFloat($("#line_height" + tab_index).val());
            div.style.width  = span_width_json[dataObj.id] / 100  *  parseInt(screenSize) + 'px';
            div.style.height  = div.offsetHeight / 100  *  parseInt(screenSize) + 'px';
            div.style.fontSize = fontSize + 'pt';
            div.style.lineHeight = lineHeight + 'px';
        }
        initSetNode(dataObj);// 初始化节点设置

        var connection_mode = $("#sb" + tab_index.toString())[0].checked;
        if (connection_mode == true){
            var connection = getConnections();
            var divId = connection.startID;
            while (connection.hasOwnProperty(divId)){
                divId = connection[divId];
            }
            if (divId){
                if (divId != dataObj.id){
                    var id1 = divId;
                    var id2 = dataObj.id;
                    var direction1,direction2;
                    var div1 = document.getElementById(id1);
                    var divText = div1.firstElementChild.firstElementChild.id || div1.innerText;
                    divText = divText.replace(/\ +/g,"");
                    divText = divText.replace(/[\r\n]/g,"");
                    if (divText == "{% trans 'End' %}" || divText == "End"){
                        var option = {};
                        option.target = id1;
                        var endId = id1;
                        var conn = jsPlumb.getConnections(option,"");
                        jsPlumb.detachAllConnections(id1);
                        id1 = conn[0].sourceId;
                        var direction = getDirection(id1,id2);
                        direction1 = direction.direction1,direction2 = direction.direction2;
                        addConnection(id1,id2,direction1,direction2,"",false);
                        id1 = id2;
                        id2 = endId;
                        direction = getDirection(id1,id2);
                        direction1 = direction.direction1,direction2 = direction.direction2;
                        addConnection(id1,id2,direction1,direction2,"",false);
                    }else{
                        var direction = getDirection(id1,id2);
                        direction1 = direction.direction1,direction2 = direction.direction2;
                        addConnection(id1,id2,direction1,direction2,"",false);
                    }
                    adjSeq();
                }
            }
        }
        /**jsplumb实际上不支持改变节点大小，实际上只能通过jquery ui resizable 方法去改变。
         $(areaId).find('.btn').resizable({
          resize: function (event, ui) {
            jsPlumb.repaint(ui.helper)
          }
        })
        **/
        // 有一些模块自动保存
        if (variant_name == "Else" || variant_name == "End_If" || variant_name == "Exit_W" || variant_name == "Break" || variant_name == "Continue" || variant_name == "Exit_For" || variant_name == "Excel_Exit" || variant_name == "Web_Forward" || variant_name == "Web_Back" || variant_name == "Web_Refresh" || variant_name == "Web_Close" || variant_name == "Web_Quit" || variant_name == "Try" || variant_name == "Except" || variant_name == "Finally" || variant_name == "End_Try") {
            generateTools(dataObj.id, variant_name, true)
        }
    }

  // 放入拖动节点
  function dropNode (dataset, ui, obj) {
    var tab_index = getActiveTab();
    var select_file = $("#selectfile" + tab_index.toString()).val();
    if (select_file.substring(0, 7) == "release" || select_file.substring(0, 7) == "Release"){
        return false;
    }
    ui.position.top = ui.position.top + $(areaId).scrollTop();
    ui.position.left = ui.position.left + $(areaId).scrollLeft();
	var dataObj = ui.position;
	//console.log("ui.position",position);
    var adj_top = $(areaId).offset().top;
    var adj_left = $(areaId).offset().left;
    var left = parseInt(event.clientX + $(areaId).scrollLeft() - adj_left);
    var top = parseInt(event.clientY + $(areaId).scrollTop() - adj_top);
    ui.offset.top = ui.offset.top + $(areaId).scrollTop();
    ui.offset.left = ui.offset.left + $(areaId).scrollLeft();
	dataObj.id = uuid.v1();
	dataObj.top = top;
    dataObj.left = left;
	dataObj.jnode = dataset.jnode;
	dataObj.jnodeClass = dataset.jnodeClass;
	try{
	    if (dataObj.jnodeClass.indexOf('bdc-process') != -1){
	        var span_name = ui.helper.html().split('name="')[1].split('"')[0];
	        $.ajax({
                type: 'POST',
                url: '../judgesubprocess/',
                dataType: 'json',
                data: {"filePath":span_name},
                success: function(data) {
                    if (Boolean(data)){
                        layer.msg(gettext("Please do not insert the process with subprocesses or merged processes!"));
	                    return false;
                    }else{
                        dataObj.jnodeHtml = '<span name="' + span_name + '" class="flow-span" title="'+ui.helper[0].innerText+'">' + ui.helper[0].innerText + '</span>';
                        initStep(dataset.template, dataObj, "");
                    }
                }
            })
	    }else{
	        var variant_name = ui.helper[0].firstElementChild.id;
	        if (variant_name.substring(0, 4) == "Web_"){
	            var tab_index = getActiveTab();
	            if (variant_name == "Web_StartBrowser"){
	                $("#browser_mode" + tab_index.toString()).val("Chrome");
	                var browser_des = "Current browser: Chrome";
                    $("#current_browser" + tab_index.toString()).text(gettext(browser_des));
	            } else {
	                var browserDes = $("#current_browser" + tab_index.toString()).text();
	                if (browserDes == ""){
                        var browser_des = "Current browser: " + $("#browser_mode" + tab_index.toString()).val();
                        $("#current_browser" + tab_index.toString()).text(gettext(browser_des));
                    }
	            }
            }
	        dataObj.jnodeHtml = '<span id="' + variant_name + '" class="flow-span" title='+ui.helper[0].innerText+'>' + ui.helper[0].innerText + '</span>';
            initStep(dataset.template, dataObj, variant_name);
	    }
	}catch{
	    if (typeof(variant_name) == "undefined"){
	        var variant = "";
	    }else{
	        var variant = variant_name;
	    }
	    dataObj.jnodeHtml = ui.helper.html();
	    initStep(dataset.template, dataObj, variant);
	}
//	console.log("template.dataObj",dataObj);
  }

  // 初始化节点设置
  function initSetNode (dataObj) {
	var id = dataObj.id;
	var obj = document.getElementById(id);
    if(obj){
        var startText = obj.firstElementChild.firstElementChild.id || obj.innerText;
        if (startText == "" || startText == "null" || typeof(startText) == "undefined"){
            startText = obj.innerText;
        }
        startText = startText.replace(/\ +/g,"");
        startText = startText.replace(/[\r\n]/g,"");
        if (startText == "Start" || startText == "End"){
            var eleId = getId(startText,id);
            if (eleId){
                $("#"+id).remove();
                parent.layer.msg(gettext('Start or end node is allowed to occur only once!'));
                return false;
            }
        }
    }
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
				var left = parseFloat($("#icon_left" + tab_index.toString()).val());
				var top = parseFloat($("#icon_top" + tab_index.toString()).val());
				var right = parseFloat($("#icon_right" + tab_index.toString()).val());
//				var left = 10,top = 18,right = 10,top=33;
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
            }).on("mouseover", ".jnode-box", function() {
                var id = $(this).parent()[0].id || $(this).parent()[0].parentElement.id;
                hideLabel(id);
            }).on("mouseout", ".jnode-box", function() {
                var id = $(this).parent()[0].id || $(this).parent()[0].parentElement.id;
                showLabel(id);
			}).on("click", ".fa-trash-o", function () {
				//鼠标点击close元素时，删除
				var id = $(this).parent()[0].parentElement.id;
				deleteDiv(id);
			}).on("click", ".fa-cog", function () {
			    var parent_div = $(this).parent()[0];
			    var id = parent_div.parentElement.id;
			    setting(id);
		    }).on("click", ".icon-refresh", function () {
				var id = $(this).parent()[0].parentElement.id;
				showInsertProcess(id);
			}).on("dblclick", ".jnode-box",function(){
				//鼠标双击
				var id = $(this).parent()[0].id;
				dblClickDiv(id);
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
	var span_name = name_json[connection.targetId];
    if (span_name != "" && typeof(span_name) != "undefined" && name != null){
        try{
            var label = connection.getOverlay("myLabel");
            label.setLabel(span_name);
            label.setVisible(true);
        }catch(e){
            console.log(e)
        }
    }
  }

  // 主要入口
  function jsPlumbMain () {
    jsPlumb.setContainer(control_id);



	//单点击了连接线, 支持删除连线
	jsPlumb.bind('click', function (conn, originalEvent) {
//		console.log("connection click",conn);
        var tab_index = getActiveTab();
        var select_file = $("#selectfile" + tab_index.toString()).val();
        if (select_file.substring(0, 7) == "release" || select_file.substring(0, 7) == "Release"){
            return false;
        }
		var id = conn.id;
        if (id == "myLabel"){
            conn = conn._jsPlumb.component;
        }
		if(conn.source){//判断是否连接线
		    var ele = document.getElementById('delete_confirmation');
		    if (typeof(ele) == 'undefined' || ele == '' || ele == null){
		       layer.confirm(gettext('Are you sure to delete the connecting line?'), {
		            id: "delete_confirmation",
				    title: gettext("Delete Confirmation"),
                    btn: [gettext('Yes'),gettext('No')]
                    }, function(index){
                        jsPlumb.detach(conn);
                        layer.close(index);
                    })
		    }
		}
		return;
	});

    jsPlumb.bind("connectionDetached", function (connInfo, originalEvent) {
        if (document.getElementById(connInfo.targetId+"_node") && document.getElementById(connInfo.sourceId+"_node")){
            adjSeq();
        }
    });

	jsPlumb.bind("connection", function (connInfo, originalEvent) {
//		console.log("connInfo" ,connInfo);
		if (connInfo.connection.sourceId === connInfo.connection.targetId) {
            jsPlumb.detach(connInfo.connection);
            return false
        }
		initConnection(connInfo.connection);
	});

    //自动避免连线源锚点和目标锚点在同一节点上
    jsPlumb.bind('beforeDrop', function (conn) {
        if (conn.sourceId === conn.targetId) {
            return false
        } else {
            var num = judgeConnection(conn.sourceId,conn.targetId);
            if (num == 1){
                /*layerMsg(gettext("Illegal Operation"));*/
                return false
            }
            return true
        }
    })

	jsPlumb.bind("connectionDrag", function (connection) {
//		console.log("connectionDrag", connection);
        var tab_index = getActiveTab();
        var select_file = $("#selectfile" + tab_index.toString()).val();
        if (select_file.substring(0, 7) == "release" || select_file.substring(0, 7) == "Release"){
            return false;
        }
        if (connection.sourceId === connection.targetId) {
            jsPlumb.detach(connection);
        }
	});

	jsPlumb.bind("connectionDragStop", function (connection) {
//		console.log("connectionDragStop",connection);
        var tab_index = getActiveTab();
        var select_file = $("#selectfile" + tab_index.toString()).val();
        if (select_file.substring(0, 7) == "release" || select_file.substring(0, 7) == "Release"){
            jsPlumb.detach(connection);
            return false;
        }
        if (connection.sourceId === connection.targetId) {
            jsPlumb.detach(connection);
            return false;
        }
        var option = {};
        option.source = connection.sourceId;
        var con = jsPlumb.getConnections(option,"");
        if (con.length > 0){
            var targetId = con[0].targetId;
            if (!document.getElementById(targetId+"_node")){
                var startDiv = document.getElementById(connection.sourceId);
                startText = startDiv.firstElementChild.firstElementChild.id || startDiv.innerText;
                startText = startText.replace(/\ +/g,"");
                startText = startText.replace(/[\r\n]/g,"");
                if (document.getElementById(connection.sourceId+"_node") || startText == "{% trans 'Start' %}" || startText == "Start"){
                    adjSeq();
                }
            }
        }else{
            var hide_label_divs = document.getElementsByClassName("hide_label");
            if (hide_label_divs.length > 0){
                var targetId = hide_label_divs[0].id;
                var option2 = {};
                option2.target = targetId;
                var con2 = jsPlumb.getConnections(option2,"");
                if (con2.length == 0){
                    var div1x = $("#x").val();
                    if (div1x == ""){div1x = "0"}
                    var div1y = $("#y").val();
                    if (div1y == ""){div1y = "0"}
                    var direction1 = "",direction2 = "";
                    if (div1x == "0" && div1y == "0.5"){
                        direction1 = "LeftMiddle"
                    }else if(div1x == "0.5" && div1y == "0"){
                        direction1 = "TopCenter"
                    }else if(div1x == "0.5" && div1y == "1"){
                        direction1 = "BottomCenter"
                    }else{
                        direction1 = "RightMiddle"
                    }
                    if (connection.sourceId == targetId){
                        return false;
                    }
                    /*forbidden incorrect connection*/
                    var num = judgeConnection(connection.sourceId,targetId);
                    if (num == 1){
                        layerMsg(gettext("Illegal Operation"));
                        return false
                    }
                    var div1 = document.getElementById(connection.sourceId);
                    var div1x1 = div1.offsetLeft;
                    var div1y1 = div1.offsetTop;
                    var div1x2 = div1x1 + div1.offsetWidth;
                    var div1y2 = div1y1 + div1.offsetHeight;
                    var div2 = document.getElementById(targetId);
                    var div2x1 = div2.offsetLeft;
                    var div2y1 = div2.offsetTop;
                    var div2x2 = div2x1 + div2.offsetWidth;
                    var div2y2 = div2y1 + div2.offsetHeight;
                    if (div1y2 < div2y1){
                        direction2 = "TopCenter"
                    }else if(div1y1 >= div2y2){
                        direction2 = "BottomCenter"
                    }else if(div1x1 >= div2x2){
                        direction2 = "RightMiddle"
                    }else{
                        direction2 = "LeftMiddle"
                    }
                    var span_name = name_json[targetId];
                    var visible = false;
                    if (span_name != "" && typeof(span_name) != "undefined" && span_name != null){
                        visible = true;
                    }else{
                        span_name = "";
                    }
                    addConnection(connection.sourceId,targetId,direction1,direction2,span_name,visible);
                    $("#start_1").val("");
                    $("#x").val("");
                    $("#y").val("");
                }
            }
        }
	});


	//定义可拖拽控件
//    $('.jnode-box').draggable({
//      stop: function (event, ui) {
//       }
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
