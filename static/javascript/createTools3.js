function generateTools(id,variant){
    $("#setting_element_id").val(id);
    var json = getConnections();
    var nodeVariant = "";
    var nodeNo = json[id+"nodeNo"];
    var language = $("#language").val();
    var param = {"function":variant,"nodeNo":nodeNo,"id":id};
    var message = "If contains (, then the system will be converted to the variable in (), otherwise the input value will be a string";
    if (variant == "SAP_SendVkey"){
        message = "0:Enter;1:F1;2:F2;3:F3;4:F4;5:F5;6:F6;7:F7;8:F8;9:F9;10:F10;11:Ctrl+S;12:F12;13:Shift+F1;14:Shift+F2;15:Shift+F3;16:Shift+F4;17:Shift+F5;18:Shift+F6;19:Shift+F7;20:Shift+F8;21:Shift+F9;22:Shift+Ctrl+0;23:Shift+F11;24:Shift+F12;25:Ctrl+F1;26:Ctrl+F2;27:Ctrl+F3;28:Ctrl+F4;29:Ctrl+F5;30:Ctrl+F6;31:Ctrl+F7;32:Ctrl+F8;33:Ctrl+F9;34:Ctrl+F10;35:Ctrl+F11;36:Ctrl+F12;37:Ctrl+Shift+F1;38:Ctrl+Shift+F2;39:Ctrl+Shift+F3;40:Ctrl+Shift+F4;41:Ctrl+Shift+F5;42:Ctrl+Shift+F6;43:Ctrl+Shift+F7;44:Ctrl+Shift+F8;45:Ctrl+Shift+F9;46:Ctrl+Shift+F10;47:Ctrl+Shift+F11;48:Ctrl+Shift+F12;70:Ctrl+E;71:Ctrl+F;72:Ctrl+/;73:Ctrl+\;74:Ctrl+N;75:Ctrl+O;76:Ctrl+X;77:Ctrl+C;78:Ctrl+V;79:Ctrl+Z;80:Ctrl+PageUp;81:PageUp;82:PageDown;83:Ctrl+PageDown;84:Ctrl+G;85:Ctrl+R;86:Ctrl+P";
    }else if(variant == "Excel_WriteCells"){
        message = "1.A1:A3 [[1],[2],[3]];2.A1:C1 [1,2,3];3.A1:C3 [[1,2,3],[4,5,6],[7,8,9]];4.If contains (, then the system will be converted to the variable in (), otherwise the input value will be a string";
    }
    var tab_index = getActiveTab();
    var filePath = $('#file_path_label' + tab_index.toString()).text();
    var button_html = '';
    if (filePath.substring(0, 7) != "Release" && filePath.substring(0, 7) != "release"){
        $("#setting_process_type").val("");
        button_html = '<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:100px" onclick="save('+"'"+id+"'"+')">'+gettext('Save')+'</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">'+gettext('Cancel')+'</button></div>'
    }else{
        $("#setting_process_type").val("release");
        button_html = '<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:100px" onclick="cancel('+"'"+id+"'"+')">'+gettext('Cancel')+'</button></div>'
    }
    if (variant == "Start"){
        var html = '<div class="property">'
                +'<div class="property-div"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo" disabled="false" value="1"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode" style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" value="Start" disabled="false"></div>'
                + button_html
        layerHtml(html);
        try{
            nextNode = json[id+"nextNode"];
            $("#nextNode").val(nextNode);
            $("#function").val(variant);
            $("#nextNode").attr("disabled","false");
        }catch(err){
            console(err);
        }
    }else if(variant == "End"){
        var html = '<div class="property">'
                +'<div class="property-div"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo" disabled="false" value="1"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode" style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" value="End" disabled="false"></div>'
                + button_html
        layerHtml(html);
        try{
            nodeNo = json[id+"nodeNo"];
            lastNode = json[id+"lastNode"];
            $("#nodeNo").val(nodeNo);
            $("#lastNode").val(lastNode);
            $("#function").val(variant);
            $("#lastNode").attr("disabled","false");
            $("#nodeNo").attr("disabled","false");
        }catch(err){
            console(err);
        }
    }else if(variant == "Wait"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            name = data['name'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;">'
                +'<div class="property-div"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode" style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox1" name="wait_seconds">'
                +'<span name="Wait Seconds">'+gettext('Wait Seconds')+'</span>'
                +'<input class="property-input" name="property" id="wait_seconds" placeholder="1,2,3..." autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Web_StartBrowser"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;">'
                +'<div class="property-div" style="display: none;"><span style="display: none;">'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo" style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode" style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span>'
                +'<span>'+gettext('Url')+'</span>'
                +'<input class="property-input" name="property" id="login_url" placeholder="https://www.baidu.com" autocomplete="off"></div>'
                +'<div class="property-div">'
                +'<span>'+gettext('Browser')+'</span>'
                +'<select class="property-input" name="property" id="browser" onchange="browser_change()">'
                +'<option value ="chrome">'+gettext('Chrome')+'</option>'
                +'<option value ="ie">IE</option>'
                +'<option value ="edge">Edge</option>'
                +'</select></div>'
                +'<div class="property-div">'
                +'<span>'+gettext('Window Size')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.maximize(maximize the browser window);2minimize(minimize the browser window)','size'"+')"></i>'
                +'<select class="property-input" name="property" id="size">'
                +'<option value ="1">'+gettext('default')+'</option>'
                +'<option value ="2" selected = "selected">'+gettext('maximize')+'</option>'
                +'<option value ="3">'+gettext('minimize')+'</option>'
                +'</select></div>'
                +'<div class="property-div">'
                +'<span name="Active">'+gettext('Active')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.Yes(active current web window);2.No(not active current web window)','web_active'"+')"></i>'
                +'<select class="property-input" name="property" id="web_active">'
                +'<option value ="yes" selected="selected">'+gettext('Yes')+'</option>'
                +'<option value ="no">'+gettext('No')+'</option>'
                +'</select></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Web_ReuseBrowser"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;">'
                +'<div class="property-div" style="display: none;"><span style="display: none;">'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo" style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode" style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span>'
                +'<span>'+gettext('Url')+'</span>'
                +'<input class="property-input" name="property" id="login_url" placeholder="https://www.baidu.com" autocomplete="off"></div>'
                +'<div class="property-div">'
                +'<span>'+gettext('Browser')+'</span>'
                +'<select class="property-input" name="property" id="browser" onchange="browser_change()">'
                +'<option value ="chrome">'+gettext('Chrome')+'</option>'
                +'<option value ="ie">IE</option>'
                +'<option value ="edge">Edge</option>'
                +'</select></div>'
                +'<div class="property-div"><span class="required-icon">*</span>'
                +'<span name="Window Sequence">'+gettext('Element Sequence')+'</span>'
                +'<input class="property-input" name="property" id="sequence" autocomplete="off" value="0"></div>'
                +'<div class="property-div">'
                +'<span>'+gettext('Window Size')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.maximize(maximize the browser window);2minimize(minimize the browser window)','size'"+')"></i>'
                +'<select class="property-input" name="property" id="size">'
                +'<option value ="1">'+gettext('default')+'</option>'
                +'<option value ="2" selected = "selected">'+gettext('maximize')+'</option>'
                +'<option value ="3">'+gettext('minimize')+'</option>'
                +'</select></div>'
                +'<div class="property-div">'
                +'<span name="Active">'+gettext('Active')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.Yes(active current web window);2.No(not active current web window)','web_active'"+')"></i>'
                +'<select class="property-input" name="property" id="web_active">'
                +'<option value ="yes" selected="selected">'+gettext('Yes')+'</option>'
                +'<option value ="no">'+gettext('No')+'</option>'
                +'</select></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Web_ClickElement"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;">'
                +'<div class="property-div"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode" style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span name="Click Option">'+gettext('Click Option')+'</span>'
                +'<select class="property-input" name="property" id="click_option">'
                +'<option value ="left" selected="selected">'+gettext('Left')+'</option>'
                +'<option value ="middle">'+gettext('Middle')+'</option>'
                +'<option value ="right">'+gettext('Right')+'</option>'
                +'<option value ="double">'+gettext('Double Chick')+'</option>'
                +'</select></div>'
                +'<div class="property-div">'
                +'<span name="Find Element Method">'+gettext('Find Element Method')+'</span><i class="fa fa-pencil" onclick="web_target()"></i>'
                +'<select class="property-input" name="property" id="method" onchange="web_tar_change(method)">'
                +'<option value ="tagName"></option>'
                +'<option value ="id" selected = "selected">ID</option>'
                +'<option value ="name">'+gettext('NAME')+'</option>'
                +'<option value ="className">'+gettext('CLASS_NAME')+'</option>'
                +'<option value ="xpath">'+gettext('XPATH')+'</option>'
                +'<option value ="linkText">'+gettext('LINK_TEXT')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span class="required-icon">*</span>'
                +'<span name="Element Property">'+gettext('Tag Name')+'</span>'
                +'<input class="property-input" name="property" id="tag_name" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span>'
                +'<span name="Element Property">'+gettext('Element Property')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'"+message+"','element_name'"+')"></i>'
                +'<input class="property-input" name="property" id="element_name" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span>'
                +'<span name="Element Sequence">'+gettext('Element Sequence')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'Element sequence if you choose find elements by method','element_sequence'"+')"></i>'
                +'<input class="property-input" name="property" id="element_sequence" autocomplete="off" value="0"></div>'
                +'<div class="property-div">'
                +'<span name="Element Sequence">'+gettext('Iframe')+'</span>'
                +'<input class="property-input" name="property" id="iframe" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><span>'+gettext('Implicit Waiting')+'('+gettext('s')+')</span><i class="fa fa-info-circle" onclick="showInfo('+"'Maximum wait time to find this element or these elements','waiting'"+')"></i>'
                +'<input class="property-input" name="property" id="waiting" value="10" autocomplete="off"></div>'
                +'<div class="property-div"><span name="Active">'+gettext('Active')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.Yes(active current web window);2.No(not active current web window)','web_active'"+')"></i>'
                +'<select class="property-input" name="property" id="web_active">'
                +'<option value ="yes" selected="selected">'+gettext('Yes')+'</option>'
                +'<option value ="no">'+gettext('No')+'</option>'
                +'</select></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Web_GetText"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;">'
                +'<div class="property-div"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode" style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span name="Click Option">'+gettext('Click Option')+'</span>'
                +'<select class="property-input" name="property" id="click_option">'
                +'<option value ="left" selected="selected">'+gettext('Left')+'</option>'
                +'<option value ="middle">'+gettext('Middle')+'</option>'
                +'<option value ="right">'+gettext('Right')+'</option>'
                +'<option value ="double">'+gettext('Double Chick')+'</option>'
                +'</select></div>'
                +'<div class="property-div">'
                +'<span name="Find Element Method">'+gettext('Find Element Method')+'</span><i class="fa fa-pencil" onclick="web_target()"></i>'
                +'<select class="property-input" name="property" id="method" onchange="web_tar_change(method)">'
                +'<option value ="tagName"></option>'
                +'<option value ="id" selected = "selected">ID</option>'
                +'<option value ="name">'+gettext('NAME')+'</option>'
                +'<option value ="className">'+gettext('CLASS_NAME')+'</option>'
                +'<option value ="xpath">'+gettext('XPATH')+'</option>'
                +'<option value ="linkText">'+gettext('LINK_TEXT')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span class="required-icon">*</span>'
                +'<span name="Element Property">'+gettext('Tag Name')+'</span>'
                +'<input class="property-input" name="property" id="tag_name" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span>'
                +'<span name="Element Property">'+gettext('Element Property')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'"+message+"','element_name'"+')"></i>'
                +'<input class="property-input" name="property" id="element_name" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span>'
                +'<span name="Element Sequence">'+gettext('Element Sequence')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'Element sequence if you choose find elements by method','element_sequence'"+')"></i>'
                +'<input class="property-input" name="property" id="element_sequence" autocomplete="off" value="0"></div>'
                +'<div class="property-div">'
                +'<span name="Element Sequence">'+gettext('Iframe')+'</span>'
                +'<input class="property-input" name="property" id="iframe" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><span>'+gettext('Implicit Waiting')+'('+gettext('s')+')</span><i class="fa fa-info-circle" onclick="showInfo('+"'Maximum wait time to find this element or these elements','waiting'"+')"></i>'
                +'<input class="property-input" name="property" id="waiting" value="10" autocomplete="off"></div>'
                +'<div class="property-div"><span name="Active">'+gettext('Active')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.Yes(active current web window);2.No(not active current web window)','web_active'"+')"></i>'
                +'<select class="property-input" name="property" id="web_active">'
                +'<option value ="yes" selected="selected">'+gettext('Yes')+'</option>'
                +'<option value ="no">'+gettext('No')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span><span class="required-icon">*</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Web_ElementExist?"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;">'
                +'<div class="property-div"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode" style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span name="Click Option">'+gettext('Click Option')+'</span>'
                +'<select class="property-input" name="property" id="click_option">'
                +'<option value ="left" selected="selected">'+gettext('Left')+'</option>'
                +'<option value ="middle">'+gettext('Middle')+'</option>'
                +'<option value ="right">'+gettext('Right')+'</option>'
                +'<option value ="double">'+gettext('Double Chick')+'</option>'
                +'</select></div>'
                +'<div class="property-div">'
                +'<span name="Find Element Method">'+gettext('Find Element Method')+'</span><i class="fa fa-pencil" onclick="web_target()"></i>'
                +'<select class="property-input" name="property" id="method" onchange="web_tar_change(method)">'
                +'<option value ="tagName"></option>'
                +'<option value ="id" selected = "selected">ID</option>'
                +'<option value ="name">'+gettext('NAME')+'</option>'
                +'<option value ="className">'+gettext('CLASS_NAME')+'</option>'
                +'<option value ="xpath">'+gettext('XPATH')+'</option>'
                +'<option value ="linkText">'+gettext('LINK_TEXT')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span class="required-icon">*</span>'
                +'<span name="Element Property">'+gettext('Tag Name')+'</span>'
                +'<input class="property-input" name="property" id="tag_name" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span>'
                +'<span name="Element Property">'+gettext('Element Property')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'"+message+"','element_name'"+')"></i>'
                +'<input class="property-input" name="property" id="element_name" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span>'
                +'<span name="Element Sequence">'+gettext('Element Sequence')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'Element sequence if you choose find elements by method','element_sequence'"+')"></i>'
                +'<input class="property-input" name="property" id="element_sequence" autocomplete="off" value="0"></div>'
                +'<div class="property-div">'
                +'<span name="Element Sequence">'+gettext('Iframe')+'</span>'
                +'<input class="property-input" name="property" id="iframe" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><span>'+gettext('Implicit Waiting')+'('+gettext('s')+')</span><i class="fa fa-info-circle" onclick="showInfo('+"'Maximum wait time to find this element or these elements','waiting'"+')"></i>'
                +'<input class="property-input" name="property" id="waiting" value="10" autocomplete="off"></div>'
                +'<div class="property-div"><span name="Exist">'+gettext('Exist')+'</span>'
                +'<select class="property-input" name="property" id="exist">'
                +'<option value ="yes" selected="selected">'+gettext('Yes')+'</option>'
                +'<option value ="no">'+gettext('No')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span name="Active">'+gettext('Active')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.Yes(active current web window);2.No(not active current web window)','web_active'"+')"></i>'
                +'<select class="property-input" name="property" id="web_active">'
                +'<option value ="yes" selected="selected">'+gettext('Yes')+'</option>'
                +'<option value ="no">'+gettext('No')+'</option>'
                +'</select></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Web_SendKeys" || variant == "Web_SetText" || variant == "Web_Select"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;">'
                +'<div class="property-div"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode" style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span name="Click Option">'+gettext('Click Option')+'</span>'
                +'<select class="property-input" name="property" id="click_option">'
                +'<option value ="left" selected="selected">'+gettext('Left')+'</option>'
                +'<option value ="middle">'+gettext('Middle')+'</option>'
                +'<option value ="right">'+gettext('Right')+'</option>'
                +'<option value ="double">'+gettext('Double Chick')+'</option>'
                +'</select></div>'
                +'<div class="property-div">'
                +'<span name="Find Element Method">'+gettext('Find Element Method')+'</span><i class="fa fa-pencil" onclick="web_target()"></i>'
                +'<select class="property-input" name="property" id="method" onchange="web_tar_change(method)">'
                +'<option value ="tagName"></option>'
                +'<option value ="id" selected = "selected">ID</option>'
                +'<option value ="name">'+gettext('NAME')+'</option>'
                +'<option value ="className">'+gettext('CLASS_NAME')+'</option>'
                +'<option value ="xpath">'+gettext('XPATH')+'</option>'
                +'<option value ="linkText">'+gettext('LINK_TEXT')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span class="required-icon">*</span>'
                +'<span name="Element Property">'+gettext('Tag Name')+'</span>'
                +'<input class="property-input" name="property" id="tag_name" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span>'
                +'<span name="Element Property">'+gettext('Element Property')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'"+message+"','element_name'"+')"></i>'
                +'<input class="property-input" name="property" id="element_name" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span>'
                +'<span name="Element Sequence">'+gettext('Element Sequence')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'Element sequence if you choose find elements by method','element_sequence'"+')"></i>'
                +'<input class="property-input" name="property" id="element_sequence" autocomplete="off" value="0"></div>'
                +'<div class="property-div">'
                +'<span name="Element Sequence">'+gettext('Iframe')+'</span>'
                +'<input class="property-input" name="property" id="iframe" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span>'
                +'<span name="Content">'+gettext('Content')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'"+message+"','content'"+')"></i>'
                +'<input class="property-input" name="property" id="content" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><span>'+gettext('Implicit Waiting')+'('+gettext('s')+')</span><i class="fa fa-info-circle" onclick="showInfo('+"'Maximum wait time to find this element or these elements','waiting'"+')"></i>'
                +'<input class="property-input" name="property" id="waiting" value="10" autocomplete="off"></div>'
                +'<div class="property-div"><span name="Active">'+gettext('Active')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.Yes(active current web window);2.No(not active current web window)','web_active'"+')"></i>'
                +'<select class="property-input" name="property" id="web_active">'
                +'<option value ="yes" selected="selected">'+gettext('Yes')+'</option>'
                +'<option value ="no">'+gettext('No')+'</option>'
                +'</select></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Web_GetAttribute"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;">'
                +'<div class="property-div"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode" style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span name="Click Option">'+gettext('Click Option')+'</span>'
                +'<select class="property-input" name="property" id="click_option">'
                +'<option value ="left" selected="selected">'+gettext('Left')+'</option>'
                +'<option value ="middle">'+gettext('Middle')+'</option>'
                +'<option value ="right">'+gettext('Right')+'</option>'
                +'<option value ="double">'+gettext('Double Chick')+'</option>'
                +'</select></div>'
                +'<div class="property-div">'
                +'<span name="Find Element Method">'+gettext('Find Element Method')+'</span><i class="fa fa-pencil" onclick="web_target()"></i>'
                +'<select class="property-input" name="property" id="method" onchange="web_tar_change(method)">'
                +'<option value ="tagName"></option>'
                +'<option value ="id" selected = "selected">ID</option>'
                +'<option value ="name">'+gettext('NAME')+'</option>'
                +'<option value ="className">'+gettext('CLASS_NAME')+'</option>'
                +'<option value ="xpath">'+gettext('XPATH')+'</option>'
                +'<option value ="linkText">'+gettext('LINK_TEXT')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span class="required-icon">*</span>'
                +'<span name="Element Property">'+gettext('Tag Name')+'</span>'
                +'<input class="property-input" name="property" id="tag_name" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span>'
                +'<span name="Element Property">'+gettext('Element Property')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'"+message+"','element_name'"+')"></i>'
                +'<input class="property-input" name="property" id="element_name" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span>'
                +'<span name="Element Sequence">'+gettext('Element Sequence')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'Element sequence if you choose find elements by method','element_sequence'"+')"></i>'
                +'<input class="property-input" name="property" id="element_sequence" autocomplete="off" value="0"></div>'
                +'<div class="property-div">'
                +'<span name="Element Sequence">'+gettext('Iframe')+'</span>'
                +'<input class="property-input" name="property" id="iframe" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><span>'+gettext('Implicit Waiting')+'('+gettext('s')+')</span><i class="fa fa-info-circle" onclick="showInfo('+"'Maximum wait time to find this element or these elements','waiting'"+')"></i>'
                +'<input class="property-input" name="property" id="waiting" value="10" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span>'
                +'<span name="Property">'+gettext('Property')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'Get the property value of the selected element,eg:id','property'"+')"></i>'
                +'<input class="property-input" name="property" id="property" placeholder="id" autocomplete="off"></div>'
                +'<div class="property-div"><span name="Active">'+gettext('Active')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.Yes(active current web window);2.No(not active current web window)','web_active'"+')"></i>'
                +'<select class="property-input" name="property" id="web_active">'
                +'<option value ="yes" selected="selected">'+gettext('Yes')+'</option>'
                +'<option value ="no">'+gettext('No')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span><span class="required-icon">*</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Web_RunJSCode"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox1" name="js_script">'
                +'<span name="JS Script">'+gettext('JS Script')+'</span>'
                +'<input class="property-input" name="property" id="js_script" placeholder="document.getElementById('+"'id'"+')" autocomplete="off"></div>'
                +'<div class="property-div"><span name="Active">'+gettext('Active')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.Yes(active current web window);2.No(not active current web window)','web_active'"+')"></i>'
                +'<select class="property-input" name="property" id="web_active">'
                +'<option value ="yes" selected="selected">'+gettext('Yes')+'</option>'
                +'<option value ="no">'+gettext('No')+'</option>'
                +'</select></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Web_SwitchToWindow"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><span>'+gettext('Implicit Waiting')+'('+gettext('s')+')</span><i class="fa fa-info-circle" onclick="showInfo('+"'Maximum wait time to find this element or these elements','waiting'"+')"></i>'
                +'<input class="property-input" name="property" id="waiting" value="10" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox1" name="sequence">'
                +'<span name="Sequence">'+gettext('Sequence')+'</span>'
                +'<input class="property-input" name="property" id="sequence" value="1" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Web_Forward" || variant == "Web_Back" || variant == "Web_Refresh" || variant == "Web_Close" || variant == "Web_Quit"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Main_Window"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'+'<div class="property-div"><span>'+gettext('Title')+'</span>'
                +'<input class="property-input" name="property" id="title_name" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Size')+'</span><br>'
                +'<input class="property-input" name="property" id="width" style="width:30%" autocomplete="off"></div>'
                +'<div class="property-div"><span> x </span>'
                +'<input class="property-input" name="property" id="height" style="width:30%" autocomplete="off"><br>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" value="root" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                if (input == "" || input == "None"){
                    $("#input").val("root");
                }else{
                    $("#input").val(input);
                }
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Message_Box"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'+'<div class="property-div"><span>'+gettext('Type')+'</span>'
                +'<select class="property-input" name="property" id="type">'
                +'<option value ="info" selected="selected">Info</option>'
                +'<option value ="warning">Warning</option>'
                +'<option value ="error">Error</option>'
                +'</select></div>'
                +'<div class="property-div"><span>'+gettext('Title')+'</span>'
                +'<input class="property-input" name="property" id="title_name" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Content')+'</span>'
                +'<input class="property-input" name="property" id="content" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" value="root" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                if (input == "" || input == "None"){
                    $("#input").val("root");
                }else{
                    $("#input").val(input);
                }
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Label"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'+'<div class="property-div"><span>Font</span>'
                +'<input class="property-input" name="property" id="widget_font" value="Arial" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Size')+'</span>'
                +'<input class="property-input" name="property" id="widget_size" value="10" autocomplete="off"></div>'
                +'<div class="property-div"><span>Row</span>'
                +'<input class="property-input" name="property" id="widget_row" value="0" autocomplete="off"></div>'
                +'<div class="property-div"><span>Row Span</span>'
                +'<input class="property-input" name="property" id="row_span" value="1" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Column')+'</span>'
                +'<input class="property-input" name="property" id="widget_column" value="0" autocomplete="off"></div>'
                +'<div class="property-div"><span>Column Span</span>'
                +'<input class="property-input" name="property" id="column_span" value="1" autocomplete="off"></div>'
                +'<div class="property-div"><span>Text</span>'
                +'<input class="property-input" name="property" id="widget_text" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" value="root" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                if (input == "" || input == "None"){
                    $("#input").val("root");
                }else{
                    $("#input").val(input);
                }
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Entry"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'+'<div class="property-div"><span>Row</span>'
                +'<input class="property-input" name="property" id="widget_row" value="0" autocomplete="off"></div>'
                +'<div class="property-div"><span>Row Span</span>'
                +'<input class="property-input" name="property" id="row_span" value="1" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Column')+'</span>'
                +'<input class="property-input" name="property" id="widget_column" value="0" autocomplete="off"></div>'
                +'<div class="property-div"><span>Column Span</span>'
                +'<input class="property-input" name="property" id="column_span" value="1" autocomplete="off"></div>'
                +'<div class="property-div"><span>Text</span>'
                +'<input class="property-input" name="property" id="widget_text" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" value="root" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                if (input == "" || input == "None"){
                    $("#input").val("root");
                }else{
                    $("#input").val(input);
                }
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Button"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'+'<div class="property-div"><span>Font</span>'
                +'<input class="property-input" name="property" id="widget_font" value="Arial" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Size')+'</span>'
                +'<input class="property-input" name="property" id="widget_size" value="10" autocomplete="off"></div>'
                +'<div class="property-div"><span>Row</span>'
                +'<input class="property-input" name="property" id="widget_row" value="0" autocomplete="off"></div>'
                +'<div class="property-div"><span>Row Span</span>'
                +'<input class="property-input" name="property" id="row_span" value="1" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Column')+'</span>'
                +'<input class="property-input" name="property" id="widget_column" value="0" autocomplete="off"></div>'
                +'<div class="property-div"><span>Column Span</span>'
                +'<input class="property-input" name="property" id="column_span" value="1" autocomplete="off"></div>'
                +'<div class="property-div"><span>Text</span>'
                +'<input class="property-input" name="property" id="widget_text" autocomplete="off"></div>'
                +'<div class="property-div"><span>Command</span>'
                +'<input class="property-input" name="property" id="widget_command" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" value="root" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                if (input == "" || input == "None"){
                    $("#input").val("root");
                }else{
                    $("#input").val(input);
                }
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Folder_Exist?" || variant == "New_Folder" || variant == "Delete_Folder"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox1" name="file_path">'
                +'<span name="Folder Path">'+gettext('Folder Path')+'</span>'
                +'<input class="property-input" name="property" id="file_path"  placeholder="D:\\folder" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Read_Folder"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox1" name="file_path">'
                +'<span name="Folder Path">'+gettext('Folder Path')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'"+message+"','file_path'"+')"></i>'
                +'<input class="property-input" name="property" id="file_path" placeholder="D:\\python_robot"" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><span>'+gettext('Output')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'Output variant name of folder list','output'"+')"></i>'
                +'<input class="property-input" name="property" id="output" placeholder="folder_list1" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Copy_Folder" || variant == "Move_Folder"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox1" name="original_path">'
                +'<span name="Original Folder Path">'+gettext('Original Folder Path')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'"+message+"','original_path'"+')"></i>'
                +'<input class="property-input" name="property" id="original_path" placeholder="D:\\folder1" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox2" name="target_path">'
                +'<span name="Target Folder Path">'+gettext('Target Folder Path')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'"+message+"','target_path'"+')"></i>'
                +'<input class="property-input" name="property" id="target_path" placeholder="D:\\folder2" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "File_Exist?" || variant == "New_File" || variant == "Delete_File"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox1" name="file_path">'
                +'<span name="File Path">'+gettext('File Path')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'"+message+"','file_path'"+')"></i>'
                +'<input class="property-input" name="property" id="file_path" placeholder="D:\\1.txt" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Add_to_File"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox1" name="file_path">'
                +'<span name="File Path">'+gettext('File Path')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'"+message+"','file_path'"+')"></i>'
                +'<input class="property-input" name="property" id="file_path" placeholder="D:\\1.txt" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Get_File_Information" || variant == "Get_File_Content"){
        if (variant == "Get_File_Information"){
            output_des = gettext("(data type: dict {})")
        }else{
            output_des = gettext("(data type: list [])")
        }
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox1" name="file_path">'
                +'<span name="File Path">'+gettext('File Path')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'"+message+"','file_path'"+')"></i>'
                +'<input class="property-input" name="property" id="file_path" placeholder="D:\\1.txt" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><span>'+gettext('Output')+output_des+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'Output variant name of file information','output'"+')"></i>'
                +'<input class="property-input" name="property" id="output" placeholder="file_result_list1" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Run_Bat"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox1" name="file_path">'
                +'<span name="File Path">'+gettext('File Path')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'"+message+"','file_path'"+')"></i>'
                +'<input class="property-input" name="property" id="file_path" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox2" name="file_variant">'
                +'<span name="Variant">'+gettext('Variant')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'Variables that need to be transferred to the bat file','file_variant'"+')"></i>'
                +'<input class="property-input" name="property" id="file_variant" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Copy_File" || variant == "Move_File"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox1" name="file_path">'
                +'<span name="File Path">'+gettext('File Path')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'"+message+"','file_path'"+')"></i>'
                +'<input class="property-input" name="property" id="file_path" placeholder="D:\\folder1\\file" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox2" name="folder_path">'
                +'<span name="Folder Path">'+gettext('Folder Path')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'"+message+"','folder_path'"+')"></i>'
                +'<input class="property-input" name="property" id="folder_path" placeholder="D:\\folder2" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Excel_NewWorkbook"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox1" name="excel_path">'
                +'<span name="File Path">'+gettext('File Path')+'</span>'
                +'<input class="property-input" name="property" id="excel_path" placeholder="D:\\1.xlsx" autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox2" name="remind">'
                +'<span name="Cover Reminder">'+gettext('Cover Reminder')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.Yes(overwrite an existing workbook with the same name;2.No(do not overwrite an existing workbook with the same name)','remind'"+')"></i>'
                +'<select class="property-input" name="property" id="remind">'
                +'<option value ="False" selected="selected">'+gettext('No')+'</option>'
                +'<option value ="True">'+gettext('Yes')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            var width = window.screen.width;
            var left = (parseInt(width) - 300) + 'px';
            var height = $("#diagramContainer-main").height() + 'px';
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Excel_OpenWorkbook"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox1" name="excel_path">'
                +'<span name="File Path">'+gettext('File Path')+'</span>'
                +'<input class="property-input" name="property" id="excel_path" autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox2" name="show">'
                +'<span name="Show">'+gettext('Show')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.True(displays the current workbook in the current interdace);2.False(Does not Displays the current workbook in the current interdace)','show'"+')"></i>'
                +'<select class="property-input" name="property" id="show">'
                +'<option value ="True" selected="selected">'+gettext('True')+'</option>'
                +'<option value ="False">'+gettext('False')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox3" name="calculation_method">'
                +'<span name="Automatic Calculation">'+gettext('Automatic Calculation')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.Yes(automatic calaclation will be started when the workbook is open);2.No(automatic calaclation will not started when the workbook is open)','calculation_method'"+')"></i>'
                +'<select class="property-input" name="property" id="calculation_method">'
                +'<option value ="0" selected="selected">'+gettext('None')+'</option>'
                +'<option value ="-4105" selected="selected">'+gettext('Yes')+'</option>'
                +'<option value ="-4135">'+gettext('No')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox4" name="size">'
                +'<span name="Size">'+gettext('Size')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.normal(open workbook with default size);2.minimize(open workbook with mini size);3.maximize(open workbook with full size)','size'"+')"></i>'
                +'<select class="property-input" name="property" id="size">'
                +'<option value ="1">'+gettext('normal')+'</option>'
                +'<option value ="2">'+gettext('minimize')+'</option>'
                +'<option value ="3" selected="selected">'+gettext('maximize')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox5" name="display_alerts">'
                +'<span name="Display Alerts">'+gettext('Display Alerts')+'</span>'
                +'<select class="property-input" name="property" id="display_alerts">'
                +'<option value ="True">'+gettext('True')+'</option>'
                +'<option value ="False" selected="selected">'+gettext('False')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'Output variant name of workbook','output'"+')"></i>'
                +'<input class="property-input" name="property" id="output" placeholder="wk1" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Excel_ShowLevel"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox1" name="sheet_name">'
                +'<span name="Sheet Name">'+gettext('Sheet Name')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'"+message+"','sheet_name'"+')"></i>'
                +'<input class="property-input" name="property" id="sheet_name" placeholder="Sheet1" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox2" name="excel_level">'
                +'<span name="Level">'+gettext('Level')+'</span>'
                +'<input class="property-input" name="property" id="sheet_level" placeholder="1" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Excel_Print"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span>'
                +'<span name="Print Area">'+gettext('Print Area')+'</span>'
                +'<select class="property-input" name="property" id="print_area">'
                +'<option value ="select_sheet" selected="selected">'+gettext('Print Sheet')+'</option>'
                +'<option value ="select_workbook">'+gettext('Print Workbook')+'</option>'
                +'<option value ="select_cells">'+gettext('Print Selection')+'</option>'
                +'</select></div>'
                +'<div class="property-div">'
                +'<span name="Sheet Name">'+gettext('Sheet Name')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'"+message+"','sheet_name'"+')"></i>'
                +'<input class="property-input" name="property" id="sheet_name" placeholder="Sheet1" autocomplete="off"></div>'
                +'<div class="property-div">'
                +'<span name="Selection">'+gettext('Selection')+'</span>'
                +'<input class="property-input" name="property" id="selected_cells" placeholder="A1:D10" autocomplete="off"></div>'
                +'<div class="property-div"><span name="Page" style="font-weight:700">'+gettext('Page:')+'</span></div>'
                +'<div class="property-div">'
                +'<span name="Orientation">'+gettext('Orientation')+'</span>'
                +'<select class="property-input" name="property" id="orientation">'
                +'<option value = 1 selected="selected">'+gettext('Portrait')+'</option>'
                +'<option value = 2>'+gettext('Landscape')+'</option>'
                +'</select></div>'
                +'<div class="property-div">'
                +'<span name="Scaling">'+gettext('Scaling')+'</span>'
                +'<select class="property-input" name="property" id="scaling">'
                +'<option value ="no" selected="selected">'+gettext('No Scaling')+'</option>'
                +'<option value ="adjust">'+gettext('Adjust to')+'</option>'
                +'<option value ="fit">'+gettext('Fit to')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span>'+gettext('Adjust Percentage')+'</span>'
                +'<input class="property-input" name="property" id="percentage" value="100" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Pages Wide')+'</span>'
                +'<input class="property-input" name="property" id="wide" value="1" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Pages Tall')+'</span>'
                +'<input class="property-input" name="property" id="tall" value="1" autocomplete="off"></div>'
                +'<div class="property-div">'
                +'<span name="Page Size">'+gettext('Page Size')+'</span>'
                +'<select class="property-input" name="property" id="page_size">'
                +'<option value ="8">'+gettext('A3')+'</option>'
                +'<option value ="9" selected="selected">'+gettext('A4')+'</option>'
                +'<option value ="11">'+gettext('A5')+'</option>'
                +'<option value ="12">'+gettext('B4')+'</option>'
                +'<option value ="13">'+gettext('B5')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span>'+gettext('First Page Number')+'('+gettext('blank means default')+')</span>'
                +'<input class="property-input" name="property" id="first_page_number" autocomplete="off"></div>'
                +'<div class="property-div"><span name="Page" style="font-weight:700">'+gettext('Margins:')+'</span></div>'
                +'<div class="property-div"><span>'+gettext('Left')+'('+gettext('blank means default')+')</span>'
                +'<input class="property-input" name="property" id="left" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Top')+'('+gettext('blank means default')+')</span>'
                +'<input class="property-input" name="property" id="top" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Right')+'('+gettext('blank means default')+')</span>'
                +'<input class="property-input" name="property" id="right" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Bottom')+'('+gettext('blank means default')+')</span>'
                +'<input class="property-input" name="property" id="bottom" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Header')+'('+gettext('blank means default')+')</span>'
                +'<input class="property-input" name="property" id="header" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Footer')+'('+gettext('blank means default')+')</span>'
                +'<input class="property-input" name="property" id="footer" autocomplete="off"></div>'
                +'<div class="property-div"><span name="Horizontally">'+gettext('Horizontally')+'</span>'
                +'<select class="property-input" name="property" id="horizontally">'
                +'<option value ="" selected="selected">'+gettext('Default')+'</option>'
                +'<option value ="1">'+gettext('Yes')+'</option>'
                +'<option value ="0">'+gettext('No')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span name="Horizontally">'+gettext('Vertically')+'</span>'
                +'<select class="property-input" name="property" id="vertically">'
                +'<option value ="" selected="selected">'+gettext('Default')+'</option>'
                +'<option value ="1">'+gettext('Yes')+'</option>'
                +'<option value ="0">'+gettext('No')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span name="Header/Footer:" style="font-weight:700">'+gettext('Header/Footer:')+'</span></div>'
                +'<div class="property-div"><span name="Different odd and even pages">'+gettext('Different odd and even pages')+'</span>'
                +'<select class="property-input" name="property" id="different_odd_and_even_pages">'
                +'<option value ="" selected="selected">'+gettext('Default')+'</option>'
                +'<option value ="1">'+gettext('Yes')+'</option>'
                +'<option value ="0">'+gettext('No')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span name="Different first page">'+gettext('Different first page')+'</span>'
                +'<select class="property-input" name="property" id="different_first_page">'
                +'<option value ="" selected="selected">'+gettext('Default')+'</option>'
                +'<option value ="1">'+gettext('Yes')+'</option>'
                +'<option value ="0">'+gettext('No')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span name="Scale with document">'+gettext('Scale with document')+'</span>'
                +'<select class="property-input" name="property" id="scale_with_document">'
                +'<option value ="" selected="selected">'+gettext('Default')+'</option>'
                +'<option value ="1">'+gettext('Yes')+'</option>'
                +'<option value ="0">'+gettext('No')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span name="Align with page margins">'+gettext('Align with page margins')+'</span>'
                +'<select class="property-input" name="property" id="align_with_page_margins">'
                +'<option value ="" selected="selected">'+gettext('Default')+'</option>'
                +'<option value ="1">'+gettext('Yes')+'</option>'
                +'<option value ="0">'+gettext('No')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span name="Sheet:" style="font-weight:700">'+gettext('Sheet:')+'</span></div>'
                +'<div class="property-div"><span name="Gridlines">'+gettext('Gridlines')+'</span>'
                +'<select class="property-input" name="property" id="gridlines">'
                +'<option value ="" selected="selected">'+gettext('Default')+'</option>'
                +'<option value ="1">'+gettext('Yes')+'</option>'
                +'<option value ="0">'+gettext('No')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span name="Black and white">'+gettext('Black and white')+'</span>'
                +'<select class="property-input" name="property" id="black_and_white">'
                +'<option value ="" selected="selected">'+gettext('Default')+'</option>'
                +'<option value ="1">'+gettext('Yes')+'</option>'
                +'<option value ="0">'+gettext('No')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span name="Draft quality">'+gettext('Draft quality')+'</span>'
                +'<select class="property-input" name="property" id="draft_quality">'
                +'<option value ="" selected="selected">'+gettext('Default')+'</option>'
                +'<option value ="1">'+gettext('Yes')+'</option>'
                +'<option value ="0">'+gettext('No')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span name="Row and column headings">'+gettext('Row and column headings')+'</span>'
                +'<select class="property-input" name="property" id="row_and_column_headings">'
                +'<option value ="" selected="selected">'+gettext('Default')+'</option>'
                +'<option value ="1">'+gettext('Yes')+'</option>'
                +'<option value ="0">'+gettext('No')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span name="Comments">'+gettext('Comments')+'</span>'
                +'<select class="property-input" name="property" id="comments">'
                +'<option value = -4142 selected="selected">'+gettext('None')+'</option>'
                +'<option value = 1>'+gettext('At end of sheet')+'</option>'
                +'<option value = 16>'+gettext('As displayed on sheet')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span name="Cell errors as">'+gettext('Cell errors as')+'</span>'
                +'<select class="property-input" name="property" id="cell_errors_as">'
                +'<option value = 0 selected="selected">'+gettext('displayed')+'</option>'
                +'<option value = 1>'+gettext('<blank>')+'</option>'
                +'<option value = 2>'+gettext('--')+'</option>'
                +'<option value = 3>'+gettext('#N/A')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span name="Page order">'+gettext('Page order')+'</span>'
                +'<select class="property-input" name="property" id="page_order">'
                +'<option value = 1 selected="selected">'+gettext('Down,then over')+'</option>'
                +'<option value = 2>'+gettext('Over,then down')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span name="Others:" style="font-weight:700">'+gettext('Others:')+'</span></div>'
                +'<div class="property-div"><span>'+gettext('Start page')+'('+gettext('blank means default')+')</span>'
                +'<input class="property-input" name="property" id="start_page" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('End page')+'('+gettext('blank means default')+')</span>'
                +'<input class="property-input" name="property" id="end_page" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><span>'+gettext('Copies')+'</span>'
                +'<input class="property-input" name="property" id="copies" value="1" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Preview')+'</span>'
                +'<select class="property-input" name="property" id="preview">'
                +'<option value = False selected="selected">'+gettext('No')+'</option>'
                +'<option value = True>'+gettext('Yes')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span class="required-icon">*</span><span>'+gettext('Printer')+'</span>'
                +'<select class="property-input" name="property" id="printer_name">'
                +'<option value = "Microsoft Print to PDF" selected="selected">'+gettext('Microsoft Print to PDF')+'</option>'
                +'<option value = "excel.ActivePrinter">'+gettext('Default Printer')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span>'+gettext('File Path')+'</span>'
                +'<input class="property-input" name="property" id="file_path" placeholder="D:\\demo.pdf" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Excel_ActiveWorkbook"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><span>'+gettext('Implicit Waiting')+'('+gettext('s')+')</span><i class="fa fa-info-circle" onclick="showInfo('+"'Maximum wait time to get a active workbook','waiting'"+')"></i>'
                +'<input class="property-input" name="property" id="waiting" value="60" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Excel_CloseWorkbook"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'+'<div class="property-div"><input type="checkbox" id="checkbox1" name="calculation_method">'
                +'<span name="Automatic Calculation">'+gettext('Automatic Calculation')+'</span>'
                +'<select class="property-input" name="property" id="calculation_method">'
                +'<option value ="1" selected="selected">'+gettext('Yes')+'</option>'
                +'<option value ="0">'+gettext('No')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox2" name="save_judge">'
                +'<span name="Save">'+gettext('Save')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.Yes(save the current workbook when closed);2.No(do not save the current workbook when closed)','save_judge'"+')"></i>'
                +'<select class="property-input" name="property" id="save_judge">'
                +'<option value ="1" selected="selected">'+gettext('Yes')+'</option>'
                +'<option value ="0">'+gettext('No')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span class="required-icon">*</span><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Excel_SaveAs"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox1" name="excel_path">'
                +'<span name="File Path">'+gettext('File Path')+'</span>'
                +'<input class="property-input" name="property" id="excel_path" placeholder="D:\\1.xlsx" autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox2" name="remind">'
                +'<span name="Cover Reminder">'+gettext('Cover Reminder')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.No(not display overwrite reminder);2.Yes(display overwrite reminder)','remind'"+')"></i>'
                +'<select class="property-input" name="property" id="remind">'
                +'<option value ="False" selected="selected">'+gettext('No')+'</option>'
                +'<option value ="True">'+gettext('Yes')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox3" name="calculation_method">'
                +'<span name="Automatic Calculation">'+gettext('Automatic Calculation')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.Yes(save the current workbook when closed);2.No(do not save the current workbook when closed)','calculation_method'"+')"></i>'
                +'<select class="property-input" name="property" id="calculation_method">'
                +'<option value ="1" selected="selected">'+gettext('Yes')+'</option>'
                +'<option value ="0">'+gettext('No')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Excel_Save"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'+'<div class="property-div"><input type="checkbox" id="checkbox1" name="calculation_method">'
                +'<span name="Automatic Calculation">'+gettext('Automatic Calculation')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.Yes(save the current workbook);2.No(do not save the current workbook)','calculation_method'"+')"></i>'
                +'<select class="property-input" name="property" id="calculation_method">'
                +'<option value ="1" selected="selected">'+gettext('Yes')+'</option>'
                +'<option value ="0">'+gettext('No')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Excel_RenameSheet"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox1" name="org_sheet_name">'
                +'<span name="Sheet Name">'+gettext('Original Sheet Name')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'"+message+"','org_sheet_name'"+')"></i>'
                +'<input class="property-input" name="property" id="org_sheet_name" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox2" name="target_sheet_name">'
                +'<span name="Sheet Name">'+gettext('Target Sheet Name')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'"+message+"','target_sheet_name'"+')"></i>'
                +'<input class="property-input" name="property" id="target_sheet_name" autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox2" name="excel_active">'
                +'<span name="Active">'+gettext('Active')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.Yes(active current excel window);2.No(not active current excel window)','excel_active'"+')"></i>'
                +'<select class="property-input" name="property" id="excel_active">'
                +'<option value ="yes" selected="selected">'+gettext('Yes')+'</option>'
                +'<option value ="no">'+gettext('No')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Excel_AddSheet" || variant == "Excel_SheetExist?" || variant == "Excel_DeleteSheet"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox1" name="sheet_name">'
                +'<span name="Sheet Name">'+gettext('Sheet Name')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'"+message+"','sheet_name'"+')"></i>'
                +'<input class="property-input" name="property" id="sheet_name" autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox2" name="excel_active">'
                +'<span name="Active">'+gettext('Active')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.Yes(active current excel window);2.No(not active current excel window)','excel_active'"+')"></i>'
                +'<select class="property-input" name="property" id="excel_active">'
                +'<option value ="yes" selected="selected">'+gettext('Yes')+'</option>'
                +'<option value ="no">'+gettext('No')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Excel_UsedRows" || variant == "Excel_UsedColumns"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox1" name="sheet_name">'
                +'<span name="Sheet Name">'+gettext('Sheet Name')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'"+message+"','sheet_name'"+')"></i>'
                +'<input class="property-input" name="property" id="sheet_name" autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox2" name="excel_active">'
                +'<span name="Active">'+gettext('Active')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.Yes(active current excel window);2.No(not active current excel window)','excel_active'"+')"></i>'
                +'<select class="property-input" name="property" id="excel_active">'
                +'<option value ="yes" selected="selected">'+gettext('Yes')+'</option>'
                +'<option value ="no">'+gettext('No')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Excel_SheetsCount"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'+'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><span>'+gettext('Output')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'Variant name of current active workbook','output'"+')"></i>'
                +'<input class="property-input" name="property" id="output" placeholder="wk1_sheet_counts" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Excel_RunMarco"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox1" name="marco_name">'
                +'<span name="Marco Name">'+gettext('Marco Name')+'</span>'
                +'<input class="property-input" name="property" id="marco_name" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Excel_Calculation"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox1" name="sheet_name">'
                +'<span name="Sheet Name">'+gettext('Sheet Name')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'"+message+"','sheet_name'"+')"></i>'
                +'<input class="property-input" name="property" id="sheet_name" placeholder="Sheet1" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox2" name="selected_cells">'
                +'<span name="Cells">'+gettext('Cells')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'Several methods:;1.A1:D10/A(variant1):D(variant2);2.(1,1),(10,4)/(variant1,variant2),(variant3,variant4);3.blank means all','selected_cells'"+')"></i>'
                +'<input class="property-input" name="property" id="selected_cells" placeholder="A1:D10" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox3" name="calculation">'
                +'<span name="Calculation">'+gettext('Calculation')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'Input whatever excel calculation same in excel file for the first cell','calculation'"+')"></i>'
                +'<input class="property-input" name="property" id="calculation" placeholder="=B1+C1" autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox4" name="excel_active">'
                +'<span name="Active">'+gettext('Active')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.Yes(active current excel window);2.No(not active current excel window)','excel_active'"+')"></i>'
                +'<select class="property-input" name="property" id="excel_active">'
                +'<option value ="yes" selected="selected">'+gettext('Yes')+'</option>'
                +'<option value ="no">'+gettext('No')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Excel_Filter"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'+'<div class="property-div"><input type="checkbox" id="checkbox1" name="filter_type">'
                +'<span name="Filter Type">'+gettext('Filter Type')+'</span>'
                +'<select class="property-input" name="property" id="filter_type">'
                +'<option value ="7" selected="selected">'+gettext('Value')+'</option>'
                +'<option value ="8">'+gettext('Cell Color')+'</option>'
                +'<option value ="9">'+gettext('Font Color')+'</option>'
                +'<option value ="12">'+gettext('No')+' Cell Color</option>'
                +'</select></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox2" name="sheet_name">'
                +'<span name="Sheet Name">'+gettext('Sheet Name')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'"+message+"','sheet_name'"+')"></i>'
                +'<input class="property-input" name="property" id="sheet_name" placeholder="Sheet1" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox3" name="column_num">'
                +'<span name="Column">'+gettext('Column')+'</span>'
                +'<input class="property-input" name="property" id="column_num" placeholder="A" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox4" name="filter_condition">'
                +'<span name="Condition">'+gettext('Condition')+'</span>'
                +'<input class="property-input" name="property" id="filter_condition" placeholder=">0" autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox5" name="excel_active">'
                +'<span name="Active">'+gettext('Active')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.Yes(active current excel window);2.No(not active current excel window)','excel_active'"+')"></i>'
                +'<select class="property-input" name="property" id="excel_active">'
                +'<option value ="yes" selected="selected">'+gettext('Yes')+'</option>'
                +'<option value ="no">'+gettext('No')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox6" name="show_all_data">'
                +'<span name="Show All Data">'+gettext('Show All Data')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.Yes(remove all filter);2.No(filter according to filter condition)','show_all_data'"+')"></i>'
                +'<select class="property-input" name="property" id="show_all_data">'
                +'<option value ="no" selected="selected">'+gettext('No')+'</option>'
                +'<option value ="yes">'+gettext('Yes')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Excel_Top10"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox1" name="sheet_name">'
                +'<span name="Sheet Name">'+gettext('Sheet Name')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'"+message+"','sheet_name'"+')"></i>'
                +'<input class="property-input" name="property" id="sheet_name" placeholder="Sheet1" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox2" name="column_num">'
                +'<span name="Column">'+gettext('Column')+'</span>'
                +'<input class="property-input" name="property" id="column_num" placeholder="A" autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox2" name="filter_condition">'
                +'<span name="Condition">'+gettext('Condition')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1Top(top10);2.Bottom(bottom10)','filter_condition'"+')"></i>'
                +'<select class="property-input" name="property" id="filter_condition">'
                +'<option value ="3" selected="selected">'+gettext('Top')+'</option>'
                +'<option value ="4">'+gettext('Bottom')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox3" name="filter_num">'
                +'<span name="Number">'+gettext('Number')+'</span>'
                +'<input class="property-input" name="property" id="filter_num" value="10" autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox4" name="excel_active">'
                +'<span name="Active">'+gettext('Active')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.Yes(active current excel window);2.No(not active current excel window)','excel_active'"+')"></i>'
                +'<select class="property-input" name="property" id="excel_active">'
                +'<option value ="yes" selected="selected">'+gettext('Yes')+'</option>'
                +'<option value ="no">'+gettext('No')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Excel_DeleteCells"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox1" name="sheet_name">'
                +'<span name="Sheet Name">'+gettext('Sheet Name')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'"+message+"','sheet_name'"+')"></i>'
                +'<input class="property-input" name="property" id="sheet_name" placeholder="Sheet1" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox2" name="selected_cells">'
                +'<span name="Cells">'+gettext('Cells')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'Several methods:;1.A1:D10/A(variant1):D(variant2);2.(1,1),(10,4)/(variant1,variant2),(variant3,variant4);3.blank means all','selected_cells'"+')"></i>'
                +'<input class="property-input" name="property" id="selected_cells" placeholder="A1:D10" autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox3" name="move_method">'
                +'<span name="Move Method">'+gettext('Move Method')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.Up(lower cells move up);2.Left(right cells move left)','move_method'"+')"></i>'
                +'<select class="property-input" name="property" id="move_method">'
                +'<option value ="2" selected="selected">'+gettext('Up')+'</option>'
                +'<option value ="1">'+gettext('Left')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox4" name="excel_active">'
                +'<span name="Active">'+gettext('Active')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.Yes(active current excel window);2.No(not active current excel window)','excel_active'"+')"></i>'
                +'<select class="property-input" name="property" id="excel_active">'
                +'<option value ="yes" selected="selected">'+gettext('Yes')+'</option>'
                +'<option value ="no">'+gettext('No')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Excel_AutoFill"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox1" name="sheet_name">'
                +'<span name="Sheet Name">'+gettext('Sheet Name')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'"+message+"','sheet_name'"+')"></i>'
                +'<input class="property-input" name="property" id="sheet_name" placeholder="Sheet1" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox2" name="selected_cells">'
                +'<span name="Cells">'+gettext('Selected Cells')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'Several methods:;1.A1:D10/A(variant1):D(variant2);2.(1,1),(10,4)/(variant1,variant2),(variant3,variant4);3.blank means all','selected_cells'"+')"></i>'
                +'<input class="property-input" name="property" id="selected_cells" placeholder="A1:D10" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox3" name="filled_cells">'
                +'<span name="Cells">'+gettext('Filled Cells')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'Several methods:;1.A1:D10/A(variant1):D(variant2);2.(1,1),(10,4)/(variant1,variant2),(variant3,variant4);3.blank means all','filled_cells'"+')"></i>'
                +'<input class="property-input" name="property" id="filled_cells" placeholder="A1:D10" autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox4" name="excel_active">'
                +'<span name="Active">'+gettext('Active')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.Yes(active current excel window);2.No(not active current excel window)','excel_active'"+')"></i>'
                +'<select class="property-input" name="property" id="excel_active">'
                +'<option value ="yes" selected="selected">'+gettext('Yes')+'</option>'
                +'<option value ="no">'+gettext('No')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Excel_ClearCells" || variant == "Excel_MergeCells" || variant == "Excel_UnMergeCells" || variant == "Excel_CutCells" || variant == "Excel_CopyCells" || variant == "Excel_FilterResult"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox1" name="sheet_name">'
                +'<span name="Sheet Name">'+gettext('Sheet Name')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'"+message+"','sheet_name'"+')"></i>'
                +'<input class="property-input" name="property" id="sheet_name" placeholder="Sheet1" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox2" name="selected_cells">'
                +'<span name="Cells">'+gettext('Cells')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'Several methods:;1.A1:D10/A(variant1):D(variant2);2.(1,1),(10,4)/(variant1,variant2),(variant3,variant4);3.blank means all','selected_cells'"+')"></i>'
                +'<input class="property-input" name="property" id="selected_cells" placeholder="A1:D10" autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox3" name="excel_active">'
                +'<span name="Active">'+gettext('Active')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.Yes(active current excel window);2.No(not active current excel window)','excel_active'"+')"></i>'
                +'<select class="property-input" name="property" id="excel_active">'
                +'<option value ="yes" selected="selected">'+gettext('Yes')+'</option>'
                +'<option value ="no">'+gettext('No')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Excel_PasteCells"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox1" name="sheet_name">'
                +'<span name="Sheet Name">'+gettext('Sheet Name')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'"+message+"','sheet_name'"+')"></i>'
                +'<input class="property-input" name="property" id="sheet_name" placeholder="Sheet1" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox2" name="selected_cells">'
                +'<span name="Cells">'+gettext('Cells')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'Paste from some cell','selected_cells'"+')"></i>'
                +'<input class="property-input" name="property" id="selected_cells" placeholder="A1" autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox3" name="paste_mode">'
                +'<span name="Paste Mode">'+gettext('Paste Mode')+'</span>'
                +'<select class="property-input" name="property" id="paste_mode">'
                +'<option value ="-4104" selected="selected">'+gettext('All')+'</option>'
                +'<option value ="-4163">'+gettext('Value')+'</option>'
                +'<option value ="-4123">'+gettext('Calculation')+'</option>'
                +'<option value ="-4122">'+gettext('Format')+'</option>'
                +'<option value ="13">'+gettext('Source Theme')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox4" name="paste_operation">'
                +'<span name="Paste Operation">'+gettext('Paste Operation')+'</span>'
                +'<select class="property-input" name="property" id="paste_operation">'
                +'<option value ="-4142" selected="selected">'+gettext('No')+'</option>'
                +'<option value ="2">'+gettext('Add(+)')+'</option>'
                +'<option value ="3">'+gettext('Minus(-)')+'</option>'
                +'<option value ="4">'+gettext('Multiply(*)')+'</option>'
                +'<option value ="5">'+gettext('Divide(/)')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox5" name="skip_blanks">'
                +'<span name="Skip Blanks">'+gettext('Skip Blanks')+'</span>'
                +'<select class="property-input" name="property" id="skip_blanks">'
                +'<option value ="False" selected="selected">'+gettext('No')+'</option>'
                +'<option value ="True">'+gettext('Yes')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox6" name="transpose">'
                +'<span name="Transpose">'+gettext('Transpose')+'</span>'
                +'<select class="property-input" name="property" id="transpose">'
                +'<option value ="False" selected="selected">'+gettext('No')+'</option>'
                +'<option value ="True">'+gettext('Yes')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox7" name="excel_active">'
                +'<span name="Active">'+gettext('Active')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.Yes(active current excel window);2.No(not active current excel window)','excel_active'"+')"></i>'
                +'<select class="property-input" name="property" id="excel_active">'
                +'<option value ="yes" selected="selected">'+gettext('Yes')+'</option>'
                +'<option value ="no">'+gettext('No')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Excel_SortCells"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox1" name="sheet_name">'
                +'<span name="Sheet Name">'+gettext('Sheet Name')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'"+message+"','sheet_name'"+')"></i>'
                +'<input class="property-input" name="property" id="sheet_name" placeholder="Sheet1" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox2" name="sort_range">'
                +'<span name="Sort Range">'+gettext('Sort Range')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'Several methods:;1.A1:D10/A(variant1):D(variant2);2.(1,1),(10,4)/(variant1,variant2),(variant3,variant4);3.blank means all','sort_range'"+')"></i>'
                +'<input class="property-input" name="property" id="sort_range" placeholder="A1:D10" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox3" name="sort_column">'
                +'<span name="Sort Column">'+gettext('Sort Column')+'</span>'
                +'<input class="property-input" name="property" id="sort_column" placeholder="A" autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox4" name="order_method">'
                +'<span name="Order Method">'+gettext('Order Method')+'</span>'
                +'<select class="property-input" name="property" id="order_method">'
                +'<option value ="1" selected="selected">'+gettext('Positive Order')+'</option>'
                +'<option value ="2">'+gettext('Inverted Order')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox5" name="excel_active">'
                +'<span name="Active">'+gettext('Active')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.Yes(active current excel window);2.No(not active current excel window)','excel_active'"+')"></i>'
                +'<select class="property-input" name="property" id="excel_active">'
                +'<option value ="yes" selected="selected">'+gettext('Yes')+'</option>'
                +'<option value ="no">'+gettext('No')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Excel_ReadCell"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox1" name="sheet_name">'
                +'<span name="Sheet Name">'+gettext('Sheet Name')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'"+message+"','sheet_name'"+')"></i>'
                +'<input class="property-input" name="property" id="sheet_name" placeholder="Sheet1" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox2" name="selected_cell">'
                +'<span name="Cell">'+gettext('Cell')+'</span>'
                +'<input class="property-input" name="property" id="selected_cell" placeholder="A1" autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox3" name="decimal_digits">'
                +'<span name="Decimal Digits">'+gettext('Decimal Digits')+'</span>'
                +'<select class="property-input" name="property" id="decimal_digits">'
                +'<option value ="0" selected="selected">0</option>'
                +'<option value ="1">1</option>'
                +'<option value ="2">2</option>'
                +'<option value ="3">3</option>'
                +'<option value ="4">4</option>'
                +'<option value ="5">5</option>'
                +'</select></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox4" name="excel_active">'
                +'<span name="Active">'+gettext('Active')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.Yes(active current excel window);2.No(not active current excel window)','excel_active'"+')"></i>'
                +'<select class="property-input" name="property" id="excel_active">'
                +'<option value ="yes" selected="selected">'+gettext('Yes')+'</option>'
                +'<option value ="no">'+gettext('No')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><span>'+gettext('Output')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'Output variant name of some cell value','output'"+')"></i>'
                +'<input class="property-input" name="property" id="output" placeholder="cell_variant1" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Excel_WriteCells"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox1" name="sheet_name">'
                +'<span name="Sheet Name">'+gettext('Sheet Name')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'"+message+"','sheet_name'"+')"></i>'
                +'<input class="property-input" name="property" id="sheet_name" placeholder="Sheet1" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox2" name="selected_cells">'
                +'<span name="Cell">'+gettext('Cells')+'</span>'
                +'<input class="property-input" name="property" id="selected_cells" placeholder="A1" autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox3" name="excel_active">'
                +'<span name="Active">'+gettext('Active')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.Yes(active current excel window);2.No(not active current excel window)','excel_active'"+')"></i>'
                +'<select class="property-input" name="property" id="excel_active">'
                +'<option value ="yes" selected="selected">'+gettext('Yes')+'</option>'
                +'<option value ="no">'+gettext('No')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'"+message+"','input'"+')"></i>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Excel_ImageCell"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox1" name="sheet_name">'
                +'<span name="Sheet Name">'+gettext('Sheet Name')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'"+message+"','sheet_name'"+')"></i>'
                +'<input class="property-input" name="property" id="sheet_name" placeholder="Sheet1" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox2" name="image_path">'
                +'<span name="Image Path">'+gettext('Image Path')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'"+message+"','image_path'"+')"></i>'
                +'<input class="property-input" name="property" id="image_path" placeholder="D:\\1.jpg" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox3" name="selected_cell">'
                +'<span name="Start Cell">'+gettext('Start Cell')+'</span>'
                +'<input class="property-input" name="property" id="selected_cell" placeholder="A1/A(variant1)/(variant1,variant2)" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox4" name="img_width">'
                +'<span name="Width">'+gettext('Width')+'</span>'
                +'<input class="property-input" name="property" id="img_width" placeholder="10" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox5" name="img_height">'
                +'<span name="Height">'+gettext('Height')+'</span>'
                +'<input class="property-input" name="property" id="img_height" placeholder="10" autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox6" name="excel_active">'
                +'<span name="Active">'+gettext('Active')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.Yes(active current excel window);2.No(not active current excel window)','excel_active'"+')"></i>'
                +'<select class="property-input" name="property" id="excel_active">'
                +'<option value ="yes" selected="selected">'+gettext('Yes')+'</option>'
                +'<option value ="no">'+gettext('No')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Excel_Insert"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox1" name="sheet_name">'
                +'<span name="Sheet Name">'+gettext('Sheet Name')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'"+message+"','sheet_name'"+')"></i>'
                +'<input class="property-input" name="property" id="sheet_name" placeholder="Sheet1" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox2" name="selected_cells">'
                +'<span name="Rows(1:2)/Columns(A:B)">'+gettext('Rows')+'(1:2)/'+gettext('Columns')+'(A:B)</span>'
                +'<input class="property-input" name="property" id="selected_cells" autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox3" name="insert_type">'
                +'<span name="Columns">'+gettext('Columns')+'/'+gettext('Rows')+'</span>'
                +'<select class="property-input" name="property" id="insert_type">'
                +'<option value ="columns" selected="selected">'+gettext('Columns')+'</option>'
                +'<option value ="rows">'+gettext('Rows')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox4" name="excel_active">'
                +'<span name="Active">'+gettext('Active')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.Yes(active current excel window);2.No(not active current excel window)','excel_active'"+')"></i>'
                +'<select class="property-input" name="property" id="excel_active">'
                +'<option value ="yes" selected="selected">'+gettext('Yes')+'</option>'
                +'<option value ="no">'+gettext('No')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Excel_AutoFit"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'+'<div class="property-div"><input type="checkbox" id="checkbox1" name="sheet_name">'
                +'<span name="Sheet Name">'+gettext('Sheet Name')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'"+message+"','sheet_name'"+')"></i>'
                +'<input class="property-input" name="property" id="sheet_name" placeholder="Sheet1" autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox2" name="fit_type">'
                +'<span name="Fit Type">'+gettext('Fit Type')+'</span>'
                +'<select class="property-input" name="property" id="fit_type">'
                +'<option value ="Columns" selected="selected">'+gettext('Columns')+'</option>'
                +'<option value ="Rows">'+gettext('Rows')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox3" name="selected_cells">'
                +'<span name="Rows(1:2)/Columns(A:B)">'+gettext('Rows')+'(1:2)/'+gettext('Columns')+'(A:B)</span>'
                +'<input class="property-input" name="property" id="selected_cells" autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox4" name="excel_active">'
                +'<span name="Active">'+gettext('Active')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.Yes(active current excel window);2.No(not active current excel window)','excel_active'"+')"></i>'
                +'<select class="property-input" name="property" id="excel_active">'
                +'<option value ="yes" selected="selected">'+gettext('Yes')+'</option>'
                +'<option value ="no">'+gettext('No')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Excel_SelectExcel"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox1" name="chosen_excel">'
                +'<span name="Chosen Excel">'+gettext('Chosen Excel')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'"+message+"','chosen_excel'"+')"></i>'
                +'<input class="property-input" name="property" id="chosen_excel" placeholder="wk1" autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox2" name="chosen_excel">'
                +'<span name="Chosen Sheet">'+gettext('Chosen Sheet')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'"+message+"','chosen_sheet'"+')"></i>'
                +'<input class="property-input" name="property" id="chosen_sheet" placeholder="Sheet1" autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox3" name="chosen_excel">'
                +'<span name="Chosen Cell">'+gettext('Chosen Cell')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'"+message+"','chosen_cell'"+')"></i>'
                +'<input class="property-input" name="property" id="chosen_cell" placeholder="A1" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Excel_Format"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox1" name="sheet_name">'
                +'<span name="Sheet Name">'+gettext('Sheet Name')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'"+message+"','sheet_name'"+')"></i>'
                +'<input class="property-input" name="property" id="sheet_name" placeholder="Sheet1" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox2" name="selected_cells">'
                +'<span name="Range(Row 1:1,Column A:A)">'+gettext('Range')+'('+gettext('Row')+' 1:1,'+gettext('Column')+' A:A)</span>'
                +'<input class="property-input" name="property" id="selected_cells" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox3" name="font_size">'
                +'<span name="Font Size">'+gettext('Font Size')+'</span>'
                +'<input class="property-input" name="property" id="font_size" autocomplete="off" value="10"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox4" name="font_name">'
                +'<span name="Font Name">'+gettext('Font Name')+'</span>'
                +'<input class="property-input" name="property" id="font_name" autocomplete="off" value="Arial"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox5" name="font_bold">'
                +'<span name="Font Bold">'+gettext('Font Bold')+'</span>'
                +'<select class="property-input" name="property" id="font_bold">'
                +'<option value ="False" selected="selected">'+gettext('False')+'</option>'
                +'<option value ="True">'+gettext('True')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox6" name="font_italic">'
                +'<span name="Font Italic">'+gettext('Font Italic')+'</span>'
                +'<select class="property-input" name="property" id="font_italic">'
                +'<option value ="False" selected="selected">'+gettext('False')+'</option>'
                +'<option value ="True">'+gettext('True')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox7" name="font_underline">'
                +'<span name="Font Underline">'+gettext('Font Underline')+'</span>'
                +'<select class="property-input" name="property" id="font_underline">'
                +'<option value ="-4142" selected="selected">'+gettext('False')+'</option>'
                +'<option value ="2">'+gettext('True')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox8" name="vertical_alignment">'
                +'<span name="Vertical Alignment">'+gettext('Vertical Alignment')+'</span>'
                +'<select class="property-input" name="property" id="vertical_alignment">'
                +'<option value ="" selected="selected"></option>'
                +'<option value ="-4160">'+gettext('Top')+'</option>'
                +'<option value ="-4108">'+gettext('Center')+'</option>'
                +'<option value ="-4107">'+gettext('Bottom')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox9" name="horizontal_alignment">'
                +'<span name="Horizontal Alignment">'+gettext('Horizontal Alignment')+'</span>'
                +'<select class="property-input" name="property" id="horizontal_alignment">'
                +'<option value ="" selected="selected"></option>'
                +'<option value ="-4131">'+gettext('Left')+'</option>'
                +'<option value ="-4108">'+gettext('Center')+'</option>'
                +'<option value ="-4152">'+gettext('Right')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox10" name="number_format">'
                +'<span name="Number Format">'+gettext('Number Format')+'</span>'
                +'<select class="property-input" name="property" id="number_format">'
                +'<option value ="" selected="selected"></option>'
                +'<option value ="General">'+gettext('General')+'</option>'
                +'<option value ="Number">'+gettext('Number')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox11" name="decimal_digits">'
                +'<span name="Decimal Digits">'+gettext('Decimal Digits')+'</span>'
                +'<select class="property-input" name="property" id="decimal_digits">'
                +'<option value ="0" selected="selected">0</option>'
                +'<option value ="1">1</option>'
                +'<option value ="2">2</option>'
                +'<option value ="3">3</option>'
                +'<option value ="4">4</option>'
                +'<option value ="5">5</option>'
                +'<option value ="6">6</option>'
                +'<option value ="7">7</option>'
                +'<option value ="8">8</option>'
                +'<option value ="9">9</option>'
                +'<option value ="10">10</option>'
                +'</select></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox12" name="background_color">'
                +'<span name="Background Color(R,G,B)">'+gettext('Background Color')+'(R,G,B)</span>'
                +'<input class="property-input" name="property" id="background_color" placeholder="255,255,255" autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox13" name="font_color">'
                +'<span name="Font Color(R,G,B)">'+gettext('Font Color')+'(R,G,B)</span>'
                +'<input class="property-input" name="property" id="font_color" placeholder="255,255,255" autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox14" name="range_width">'
                +'<span name="Width">'+gettext('Width')+'</span>'
                +'<input class="property-input" name="property" id="range_width" placeholder="10" autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox15" name="range_height">'
                +'<span name="Height">'+gettext('Height')+'</span>'
                +'<input class="property-input" name="property" id="range_height" placeholder="10" autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox16" name="excel_active">'
                +'<span name="Active">'+gettext('Active')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.Yes(active current excel window);2.No(not active current excel window)','excel_active'"+')"></i>'
                +'<select class="property-input" name="property" id="excel_active">'
                +'<option value ="yes" selected="selected">'+gettext('Yes')+'</option>'
                +'<option value ="no">'+gettext('No')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Update_SQL"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox1" name="access_path">'
                +'<span name="Access Path">'+gettext('Access Path')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'"+message+"','access_path'"+')"></i>'
                +'<input class="property-input" name="property" id="access_path" placeholder="D:\\1.accdb" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox2" name="table_name">'
                +'<span name="Table Name">'+gettext('Table Name')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'"+message+"','table_name'"+')"></i>'
                +'<input class="property-input" name="property" id="table_name" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox3" name="update_column">'
                +'<span name="Up date Columns(col1,col2)">'+gettext('Up date Columns')+'(col1,col2)</span>'
                +'<input class="property-input" name="property" id="update_column" placeholder="column1,column2..." autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox4" name="update_result">'
                +'<span name="Up date Result(res1,res2)">'+gettext('Up date Result')+'(res1,res2)</span>'
                +'<input class="property-input" name="property" id="update_result" autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox5" name="update_type">'
                +'<span name="Result Type">'+gettext('Result Type')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.Variant(insert value will be replaced to the variant according to the input name);2.String(insert value will be taked as string)','update_type'"+')"></i>'
                +'<select class="property-input" name="property" id="update_type">'
                +'<option value ="variant" selected="selected">'+gettext('Variant')+'</option>'
                +'<option value ="string">'+gettext('String')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox6" name="where_column">'
                +'<span name="Where Columns(col1,col2)">'+gettext('Where Columns')+'(col1,col2)</span>'
                +'<input class="property-input" name="property" id="where_column" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox7" name="where_result">'
                +'<span name="Where Condition(con1,con2)">'+gettext('Where Condition')+'(con1,con2)</span>'
                +'<input class="property-input" name="property" id="where_result" placeholder="value1,value2..." autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox8" name="where_type">'
                +'<span name="Condition Type">'+gettext('Condition Type')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.Variant(insert value will be replaced to the variant according to the input name);2.String(insert value will be taked as string)','where_type'"+')"></i>'
                +'<select class="property-input" name="property" id="where_type">'
                +'<option value ="variant">'+gettext('Variant')+'</option>'
                +'<option value ="string" selected="selected">'+gettext('String')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Insert_SQL"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox1" name="access_path">'
                +'<span name="Access Path">'+gettext('Access Path')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'"+message+"','access_path'"+')"></i>'
                +'<input class="property-input" name="property" id="access_path" placeholder="D:\\1.accdb" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox2" name="table_name">'
                +'<span name="Table Name">'+gettext('Table Name')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'"+message+"','table_name'"+')"></i>'
                +'<input class="property-input" name="property" id="table_name" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox3" name="insert_column">'
                +'<span name="Insert Columns(col1,col2)">'+gettext('Insert Columns')+'(col1,col2)</span>'
                +'<input class="property-input" name="property" id="insert_column" placeholder="column1,column2..." autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox4" name="insert_result">'
                +'<span name="Insert Result(res1,res2)">'+gettext('Insert Result')+'(res1,res2)</span>'
                +'<input class="property-input" name="property" id="insert_result" placeholder="value1,value2..." autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox5" name="insert_type">'
                +'<span name="Result Type">'+gettext('Result Type')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.Variant(insert value will be replaced to the variant according to the input name);2.String(insert value will be taked as string)','insert_type'"+')"></i>'
                +'<select class="property-input" name="property" id="insert_type">'
                +'<option value ="variant" selected="selected">'+gettext('Variant')+'</option>'
                +'<option value ="string">'+gettext('String')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Delete_SQL"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox1" name="access_path">'
                +'<span name="Access Path">'+gettext('Access Path')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'"+message+"','access_path'"+')"></i>'
                +'<input class="property-input" name="property" id="access_path" placeholder="D:\\1.accdb" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox2" name="table_name">'
                +'<span name="Table Name">'+gettext('Table Name')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'"+message+"','table_name'"+')"></i>'
                +'<input class="property-input" name="property" id="table_name" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox3" name="where_column">'
                +'<span name="Where Columns(col1,col2)">'+gettext('Where Columns')+'(col1,col2)</span>'
                +'<input class="property-input" name="property" id="where_column" placeholder="column1,column2..." autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox4" name="where_result">'
                +'<span name="Condition Result(res1,res2)">'+gettext('Condition Result')+'(res1,res2)</span>'
                +'<input class="property-input" name="property" id="where_result" placeholder="value1,value2..." autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox5" name="where_type">'
                +'<span name="Condition Type">'+gettext('Condition Type')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.Variant(insert value will be replaced to the variant according to the input name);2.String(insert value will be taked as string)','where_type'"+')"></i>'
                +'<select class="property-input" name="property" id="where_type">'
                +'<option value ="variant" selected="selected">'+gettext('Variant')+'</option>'
                +'<option value ="string">'+gettext('String')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Select_SQL"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox1" name="access_path">'
                +'<span name="Access Path">'+gettext('Access Path')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'"+message+"','access_path'"+')"></i>'
                +'<input class="property-input" name="property" id="access_path" placeholder="D:\\1.accdb" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox2" name="table_name">'
                +'<span name="Table Name">'+gettext('Table Name')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'"+message+"','table_name'"+')"></i>'
                +'<input class="property-input" name="property" id="table_name" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox3" name="select_column">'
                +'<span name="Select Columns(col1,col2)">'+gettext('Select Columns')+'(col1,col2)</span>'
                +'<input class="property-input" name="property" id="select_column" placeholder="column1,column2..." autocomplete="off" value="*"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox4" name="where_column">'
                +'<span name="Where Columns(col1,col2)">'+gettext('Where Columns')+'(col1,col2)</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.Variant(insert value will be replaced to the variant according to the input name);2.String(insert value will be taked as string)','where_column'"+')"></i>'
                +'<input class="property-input" name="property" id="where_column"  placeholder="value1,value2..." autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox5" name="where_result">'
                +'<span name="Where Condition(con1,con2)">'+gettext('Where Condition')+'(con1,con2)</span>'
                +'<input class="property-input" name="property" id="where_result" autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox6" name="where_type">'
                +'<span name="Condition Type">'+gettext('Condition Type')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.Variant(insert value will be replaced to the variant according to the input name);2.String(insert value will be taked as string)','where_type'"+')"></i>'
                +'<select class="property-input" name="property" id="where_type">'
                +'<option value ="variant">'+gettext('Variant')+'</option>'
                +'<option value ="string" selected="selected">'+gettext('String')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><span>'+gettext('Output')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'Output variant name of access select sql result','output'"+')"></i>'
                +'<input class="property-input" name="property" id="output" placeholder="sql_result" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Custom_SQL"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox1" name="access_path">'
                +'<span name="Access Path">'+gettext('Access Path')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'"+message+"','access_path'"+')"></i>'
                +'<input class="property-input" name="property" id="access_path" placeholder="D:\\1.accdb" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox2" name="self_sql">'
                +'<span name="SQL">'+gettext('SQL')+'</span>'
                +'<textarea name="property" id="self_sql" style="width:98%;height:60px;" autocomplete="off"></textarea>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "SAP_Start"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox1" name="sap_exe_path">'
                +'<span name="SAP EXE Path">'+gettext('SAP EXE Path')+'</span>'
                +'<input class="property-input" name="property" id="sap_exe_path" value="C:/Program Files (x86)/SAP/FrontEnd/SAPgui/saplogon.exe" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox2" name="server_name">'
                +'<span name="Server Name">'+gettext('Server Name')+'</span>'
                +'<input class="property-input" name="property" id="server_name" placeholder="S11,P11,Q11..." autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "SAP_Login"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox1" name="client">'
                +'<span name="Client">'+gettext('Client')+'</span>'
                +'<input class="property-input" name="property" id="client" value="500" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox2" name="user_name">'
                +'<span name="User Name">'+gettext('User Name')+'</span>'
                +'<input class="property-input" name="property" id="user_name" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox3" name="password">'
                +'<span name="Password">'+gettext('Password')+'</span>'
                +'<input class="property-input" type="password" name="property" id="password" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox4" name="sap_language">'
                +'<span name="Language">'+gettext('Language')+'</span>'
                +'<input class="property-input" name="property" id="sap_language" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "SAP_TCode"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'+'<div class="property-div"><input type="checkbox" id="checkbox1" name="new_window">'
                +'<span name="New Window">'+gettext('New Window')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.Yes(open new window);2.No(not open new window)','new_window'"+')"></i>'
                +'<select class="property-input" name="property" id="new_window">'
                +'<option value ="yes">'+gettext('Yes')+'</option>'
                +'<option value ="no" selected="selected">'+gettext('No')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox2" name="sap_window">'
                +'<span name="SAP Window">'+gettext('SAP Window')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'Which window to open (1-5)','sap_window'"+')"></i>'
                +'<select class="property-input" name="property" id="sap_window">'
                +'<option value ="1" selected="selected">1</option>'
                +'<option value ="2">2</option>'
                +'<option value ="3">3</option>'
                +'<option value ="4">4</option>'
                +'<option value ="5">5</option>'
                +'</select></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox3" name="t_code">'
                +'<span name="T Code">'+gettext('T Code')+'</span>'
                +'<input class="property-input" name="property" id="t_code" autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox4" name="sap_active">'
                +'<span name="Active">'+gettext('Active')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.Yes(active current sap window);2.No(not active current sap window)','sap_active'"+')"></i>'
                +'<select class="property-input" name="property" id="sap_active">'
                +'<option value ="yes" selected="selected">'+gettext('Yes')+'</option>'
                +'<option value ="no">'+gettext('No')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "SAP_Text"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'+'<div class="property-div"><input type="checkbox" id="checkbox1" name="find_method">'
                +'<span name="Find Method">'+gettext('Find Method')+'</span>'
                +'<select class="property-input" name="property" id="find_method">'
                +'<option value ="ID" selected="selected">ID</option>'
                +'</select></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox2" name="element_name">'
                +'<span name="Element Property">'+gettext('Element Property')+'</span><i class="fa fa-pencil" onclick="target()"></i>'
                +'<input class="property-input" name="property" id="element_name" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox3" name="send_content">'
                +'<span name="Content">'+gettext('Content')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'"+message+"','send_content'"+')"></i>'
                +'<input class="property-input" name="property" id="send_content" autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox4" name="replace_slash">'
                +'<span name="Replace Slash">'+gettext('Replace Slash')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.Yes(system will replace the of the content Backslash );2.No(system will not replace the Backslash )','replace_slash'"+')"></i>'
                +'<select class="property-input" name="property" id="replace_slash">'
                +'<option value ="yes" selected="selected">'+gettext('Yes')+'</option>'
                +'<option value ="no">'+gettext('No')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox5" name="sap_active">'
                +'<span name="Active">'+gettext('Active')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.Yes(active current sap window);2.No(not active current sap window)','sap_active'"+')"></i>'
                +'<select class="property-input" name="property" id="sap_active">'
                +'<option value ="yes" selected="selected">'+gettext('Yes')+'</option>'
                +'<option value ="no">'+gettext('No')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "SAP_SendVkey" || variant == "SAP_PressToolbar" || variant == "SAP_SelectContext"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'+'<div class="property-div"><input type="checkbox" id="checkbox1" name="find_method">'
                +'<span name="Find Method">'+gettext('Find Method')+'</span>'
                +'<select class="property-input" name="property" id="find_method">'
                +'<option value ="ID" selected="selected">ID</option>'
                +'</select></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox2" name="element_name">'
                +'<span name="Element Property">'+gettext('Element Property')+'</span><i class="fa fa-pencil" onclick="target()"></i>'
                +'<input class="property-input" name="property" id="element_name" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox3" name="send_content">'
                +'<span name="Content">'+gettext('Content')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'"+message+"','send_content'"+')"></i>'
                +'<input class="property-input" name="property" id="send_content" autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox4" name="sap_active">'
                +'<span name="Active">'+gettext('Active')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.Yes(active current sap window);2.No(not active current sap window)','sap_active'"+')"></i>'
                +'<select class="property-input" name="property" id="sap_active">'
                +'<option value ="yes" selected="selected">'+gettext('Yes')+'</option>'
                +'<option value ="no">'+gettext('No')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "SAP_SelectItem" || variant == "SAP_EnsureVisibleHorizontalItem" || variant == "SAP_DoubleClickItem" || variant == "SAP_PressToolbarContextButton" || variant == "SAP_PressContextButton" || variant == "SAP_SelectContextMenuItem"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'+'<div class="property-div"><input type="checkbox" id="checkbox1" name="find_method">'
                +'<span name="Find Method">'+gettext('Find Method')+'</span>'
                +'<select class="property-input" name="property" id="find_method">'
                +'<option value ="ID" selected="selected">ID</option>'
                +'</select></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox2" name="element_name">'
                +'<span name="Element Property">'+gettext('Element Property')+'</span><i class="fa fa-pencil" onclick="target()"></i>'
                +'<input class="property-input" name="property" id="element_name" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox3" name="send_content">'
                +'<span name="Content">'+gettext('Content')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'"+message+"','send_content'"+')"></i>'
                +'<input class="property-input" name="property" id="send_content" autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox4" name="sap_active">'
                +'<span name="Active">'+gettext('Active')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.Yes(active current sap window);2.No(not active current sap window)','sap_active'"+')"></i>'
                +'<select class="property-input" name="property" id="sap_active">'
                +'<option value ="yes" selected="selected">'+gettext('Yes')+'</option>'
                +'<option value ="no">'+gettext('No')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "SAP_VerticalScrollbar"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'+'<div class="property-div"><input type="checkbox" id="checkbox1" name="find_method">'
                +'<span name="Find Method">'+gettext('Find Method')+'</span>'
                +'<select class="property-input" name="property" id="find_method">'
                +'<option value ="ID" selected="selected">ID</option>'
                +'</select></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox2" name="element_name">'
                +'<span name="Element Property">'+gettext('Element Property')+'</span><i class="fa fa-pencil" onclick="target()"></i>'
                +'<input class="property-input" name="property" id="element_name" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox3" name="scroll_position">'
                +'<span name="Position">'+gettext('Position')+'</span>'
                +'<input class="property-input" name="property" id="scroll_position" placeholder="10" autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox4" name="sap_active">'
                +'<span name="Active">'+gettext('Active')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.Yes(active current sap window);2.No(not active current sap window)','sap_active'"+')"></i>'
                +'<select class="property-input" name="property" id="sap_active">'
                +'<option value ="yes" selected="selected">'+gettext('Yes')+'</option>'
                +'<option value ="no">'+gettext('No')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "SAP_Close"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'+'<div class="property-div"><input type="checkbox" id="checkbox1" name="find_method">'
                +'<span name="Find Method">'+gettext('Find Method')+'</span>'
                +'<select class="property-input" name="property" id="find_method">'
                +'<option value ="ID" selected="selected">ID</option>'
                +'</select></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox2" name="element_name">'
                +'<span name="Element Property">'+gettext('Element Property')+'</span><i class="fa fa-pencil" onclick="target()"></i>'
                +'<input class="property-input" name="property" id="element_name" value="wnd[0]" autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox3" name="sap_active">'
                +'<span name="Active">'+gettext('Active')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.Yes(active current sap window);2.No(not active current sap window)','sap_active'"+')"></i>'
                +'<select class="property-input" name="property" id="sap_active">'
                +'<option value ="yes" selected="selected">'+gettext('Yes')+'</option>'
                +'<option value ="no">'+gettext('No')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "SAP_Logout"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'+'<div class="property-div"><input type="checkbox" id="checkbox1" name="sap_active">'
                +'<span name="Active">'+gettext('Active')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.Yes(active current sap window);2.No(not active current sap window)','sap_active'"+')"></i>'
                +'<select class="property-input" name="property" id="sap_active">'
                +'<option value ="yes" selected="selected">'+gettext('Yes')+'</option>'
                +'<option value ="no">'+gettext('No')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "SAP_Press" || variant == "SAP_Select" || variant == "SAP_SetFocus" || variant == "SAP_ClickCurrentCell" || variant == "SAP_CancelSelect" || variant == "SAP_Selected"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox1" name="find_method">'
                +'<span name="Find Method">'+gettext('Find Method')+'</span>'
                +'<select class="property-input" name="property" id="find_method">'
                +'<option value ="ID" selected="selected">ID</option>'
                +'</select></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox2" name="element_name">'
                +'<span name="Element Property">'+gettext('Element Property')+'</span><i class="fa fa-pencil" onclick="target()"></i>'
                +'<input class="property-input" name="property" id="element_name" autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox3" name="sap_active">'
                +'<span name="Active">'+gettext('Active')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.Yes(active current sap window);2.No(not active current sap window)','sap_active'"+')"></i>'
                +'<select class="property-input" name="property" id="sap_active">'
                +'<option value ="yes" selected="selected">'+gettext('Yes')+'</option>'
                +'<option value ="no">'+gettext('No')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "SAP_GetText"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'+'<div class="property-div"><input type="checkbox" id="checkbox1" name="find_method">'
                +'<span name="Find Method">'+gettext('Find Method')+'</span>'
                +'<select class="property-input" name="property" id="find_method">'
                +'<option value ="ID" selected="selected">'+gettext('ID')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox2" name="element_name">'
                +'<span name="Element Property">'+gettext('Element Property')+'</span><i class="fa fa-pencil" onclick="target()"></i>'
                +'<input class="property-input" name="property" id="element_name" autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox3" name="sap_active">'
                +'<span name="Active">'+gettext('Active')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.Yes(active current sap window);2.No(not active current sap window)','sap_active'"+')"></i>'
                +'<select class="property-input" name="property" id="sap_active">'
                +'<option value ="yes" selected="selected">'+gettext('Yes')+'</option>'
                +'<option value ="no">'+gettext('No')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><span>'+gettext('Output')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'Output variant name of some sap widget','output'"+')"></i>'
                +'<input class="property-input" name="property" id="output" placeholder="variant" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "SAP_GetCellValue"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'+'<div class="property-div"><input type="checkbox" id="checkbox1" name="find_method">'
                +'<span name="Find Method">'+gettext('Find Method')+'</span>'
                +'<select class="property-input" name="property" id="find_method">'
                +'<option value ="ID" selected="selected">ID</option>'
                +'</select></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox2" name="element_name">'
                +'<span name="Element Property">'+gettext('Element Property')+'</span><i class="fa fa-pencil" onclick="target()"></i>'
                +'<input class="property-input" name="property" id="element_name" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox3" name="row">'
                +'<span name="Row">'+gettext('Row')+'</span>'
                +'<input class="property-input" name="property" id="row" placeholder="0" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox4" name="column">'
                +'<span name="Column(Technical Name)">'+gettext('Column(Technical Name)')+'</span>'
                +'<input class="property-input" name="property" id="column" autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox5" name="sap_active">'
                +'<span name="Active">'+gettext('Active')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.Yes(active current sap window);2.No(not active current sap window)','sap_active'"+')"></i>'
                +'<select class="property-input" name="property" id="sap_active">'
                +'<option value ="yes" selected="selected">'+gettext('Yes')+'</option>'
                +'<option value ="no">'+gettext('No')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "SAP_ExpandNode" || variant == "SAP_SelectNode" || variant == "SAP_SelectedNode" || variant == "SAP_TopNode" || variant == "SAP_DoubleClickNode"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'+'<div class="property-div"><input type="checkbox" id="checkbox1" name="find_method">'
                +'<span name="Find Method">'+gettext('Find Method')+'</span>'
                +'<select class="property-input" name="property" id="find_method">'
                +'<option value ="ID" selected="selected">ID</option>'
                +'</select></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox2" name="element_name">'
                +'<span name="Element Property">'+gettext('Element Property')+'</span><i class="fa fa-pencil" onclick="target()"></i>'
                +'<input class="property-input" name="property" id="element_name" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox3" name="select_node">'
                +'<span name="Node No">'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="select_node" placeholder="000001" autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox4" name="sap_active">'
                +'<span>'+gettext('Active')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.Yes(active current sap window);2.No(not active current sap window)','sap_active'"+')"></i>'
                +'<select class="property-input" name="property" id="sap_active">'
                +'<option value ="yes" selected="selected">'+gettext('Yes')+'</option>'
                +'<option value ="no">'+gettext('No')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "SAP_CaretPosition"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'+'<div class="property-div"><input type="checkbox" id="checkbox1" name="find_method">'
                +'<span name="Active">'+gettext('Find Method')+'</span>'
                +'<select class="property-input" name="property" id="find_method">'
                +'<option value ="ID" selected="selected">ID</option>'
                +'</select></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox2" name="element_name">'
                +'<span name="Element Property">'+gettext('Element Property')+'</span><i class="fa fa-pencil" onclick="target()"></i>'
                +'<input class="property-input" name="property" id="element_name" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox3" name="select_position">'
                +'<span name="Position">'+gettext('Position')+'</span>'
                +'<input class="property-input" name="property" id="select_position" placeholder="10" autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox4" name="sap_active">'
                +'<span name="Active">'+gettext('Active')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.Yes(active current sap window);2.No(not active current sap window)','sap_active'"+')"></i>'
                +'<select class="property-input" name="property" id="sap_active">'
                +'<option value ="yes" selected="selected">'+gettext('Yes')+'</option>'
                +'<option value ="no">'+gettext('No')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "SAP_Key"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'+'<div class="property-div"><input type="checkbox" id="checkbox1" name="find_method">'
                +'<span name="Find Method">'+gettext('Find Method')+'</span>'
                +'<select class="property-input" name="property" id="find_method">'
                +'<option value ="ID" selected="selected">ID</option>'
                +'</select></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox2" name="element_name">'
                +'<span name="Element Property">'+gettext('Element Property')+'</span><i class="fa fa-pencil" onclick="target()"></i>'
                +'<input class="property-input" name="property" id="element_name" autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox3" name="sap_key">'
                +'<span name="Key">'+gettext('Key')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'"+message+"','sap_key'"+')"></i>'
                +'<input class="property-input" name="property" id="sap_key" autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox4" name="sap_active">'
                +'<span name="Active">'+gettext('Active')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.Yes(active current sap window);2.No(not active current sap window)','sap_active'"+')"></i>'
                +'<select class="property-input" name="property" id="sap_active">'
                +'<option value ="yes" selected="selected">'+gettext('Yes')+'</option>'
                +'<option value ="no">'+gettext('No')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "SAP_TableRows"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox1" name="initial_row">'
                +'<span name="Initial Row">'+gettext('Initial Row')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'SAP initial table row','initial_row'"+')"></i>'
                +'<input class="property-input" name="property" id="initial_row" placeholder="1,2,3,4,5..." autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox2" name="dynamic_var">'
                +'<span name="Dynamic Variant">'+gettext('Dynamic Variant')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'Dynamic variant name of the sap tabe row or column','dynamic_var'"+')"></i>'
                +'<input class="property-input" name="property" id="dynamic_var" placeholder="var" autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox3" name="find_method">'
                +'<span name="Find Method">'+gettext('Find Method')+'</span>'
                +'<select class="property-input" name="property" id="find_method">'
                +'<option value ="ID" selected="selected">'+gettext('ID')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox4" name="element_name">'
                +'<span name="Element Property">'+gettext('Element Property')+'</span><i class="fa fa-pencil" onclick="target()"></i>'
                +'<input class="property-input" name="property" id="element_name" autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox5" name="sap_active">'
                +'<span name="Active">'+gettext('Active')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.Yes(active current sap window);2.No(not active current sap window)','sap_active'"+')"></i>'
                +'<select class="property-input" name="property" id="sap_active">'
                +'<option value ="yes" selected="selected">'+gettext('Yes')+'</option>'
                +'<option value ="no">'+gettext('No')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><span>'+gettext('Output')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'Output variant name of sap table rows','output'"+')"></i>'
                +'<input class="property-input" name="property" id="output" placeholder="variant" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "SAP_NodeRows"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox1" name="initial_row">'
                +'<span name="Initial Node">'+gettext('Initial Node')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'SAP initial node row','initial_row'"+')"></i>'
                +'<input class="property-input" name="property" id="initial_row" placeholder="1,2,3,4,5..." autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox2" name="find_method">'
                +'<span name="Find Method">'+gettext('Find Method')+'</span>'
                +'<select class="property-input" name="property" id="find_method">'
                +'<option value ="ID" selected="selected">ID</option>'
                +'</select></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox3" name="element_name">'
                +'<span name="Element Property">'+gettext('Element Property')+'</span><i class="fa fa-pencil" onclick="target()"></i>'
                +'<input class="property-input" name="property" id="element_name" autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox4" name="sap_active">'
                +'<span name="Active">'+gettext('Active')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.Yes(active current sap window);2.No(not active current sap window)','sap_active'"+')"></i>'
                +'<select class="property-input" name="property" id="sap_active">'
                +'<option value ="yes" selected="selected">'+gettext('Yes')+'</option>'
                +'<option value ="no">'+gettext('No')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'Output variant name of sap table rows','output'"+')"></i></i>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "SAP_SelectRows" || variant == "SAP_GetAbsoluteRow"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'+'<div class="property-div"><input type="checkbox" id="checkbox1" name="find_method">'
                +'<span name="Find Method">'+gettext('Find Method')+'</span>'
                +'<select class="property-input" name="property" id="find_method">'
                +'<option value ="ID" selected="selected">'+gettext('ID')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox2" name="element_name">'
                +'<span name="Element Property">'+gettext('Element Property')+'</span><i class="fa fa-pencil" onclick="target()"></i>'
                +'<input class="property-input" name="property" id="element_name" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox3" name="select_row">'
                +'<span name="Select Row">'+gettext('Select Row')+'</span>'
                +'<input class="property-input" name="property" id="select_row" placeholder="0" autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox4" name="sap_active">'
                +'<span name="Active">'+gettext('Active')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.Yes(active current sap window);2.No(not active current sap window)','sap_active'"+')"></i>'
                +'<select class="property-input" name="property" id="sap_active">'
                +'<option value ="yes" selected="selected">'+gettext('Yes')+'</option>'
                +'<option value ="no">'+gettext('No')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "SAP_Exist?"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox1" name="element_name">'
                +'<span name="Element Property">'+gettext('Element Property')+'</span><i class="fa fa-pencil" onclick="target()"></i>'
                +'<input class="property-input" name="property" id="element_name" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "SAP_SetCurrentCell"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'+'<div class="property-div"><input type="checkbox" id="checkbox1" name="find_method">'
                +'<span name="Find Method">'+gettext('Find Method')+'</span>'
                +'<select class="property-input" name="property" id="find_method">'
                +'<option value ="ID" selected="selected">'+gettext('ID')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox2" name="element_name">'
                +'<span name="Element Property">'+gettext('Element Property')+'</span><i class="fa fa-pencil" onclick="target()"></i>'
                +'<input class="property-input" name="property" id="element_name" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox3" name="cell_no">'
                +'<span name="Cell No">'+gettext('Cell No')+'</span>'
                +'<input class="property-input" name="property" id="cell_no" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox4" name="format">'
                +'<span name="Format">'+gettext('Format')+'</span>'
                +'<input class="property-input" name="property" id="format" autocomplete="off" value="TEXT">'
                +'<div class="property-div"><input type="checkbox" id="checkbox5" name="sap_active">'
                +'<span name="Active">'+gettext('Active')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.Yes(active current sap window);2.No(not active current sap window)','sap_active'"+')"></i>'
                +'<select class="property-input" name="property" id="sap_active">'
                +'<option value ="yes" selected="selected">'+gettext('Yes')+'</option>'
                +'<option value ="no">'+gettext('No')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "SAP_FirstVisibleRow"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'+'<div class="property-div"><input type="checkbox" id="checkbox1" name="find_method">'
                +'<span name="Find Method">'+gettext('Find Method')+'</span>'
                +'<select class="property-input" name="property" id="find_method">'
                +'<option value ="ID" selected="selected">ID</option>'
                +'</select></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox2" name="element_name">'
                +'<span name="Element Property">'+gettext('Element Property')+'</span><i class="fa fa-pencil" onclick="target()"></i>'
                +'<input class="property-input" name="property" id="element_name" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox3" name="row_no">'
                +'<span name="Row No">'+gettext('Row No')+'</span>'
                +'<input class="property-input" name="property" id="row_no" placeholder="1" autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox4" name="sap_active">'
                +'<span name="Row No">'+gettext('Active')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.Yes(active current sap window);2.No(not active current sap window)','sap_active'"+')"></i>'
                +'<select class="property-input" name="property" id="sap_active">'
                +'<option value ="yes" selected="selected">'+gettext('Yes')+'</option>'
                +'<option value ="no">'+gettext('No')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Send_Mail"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox1" name="email_account">'
                +'<span name="Account">'+gettext('Account')+'</span>'
                +'<input class="property-input" name="property" id="email_account" placeholder="email_address" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox2" name="email_password">'
                +'<span name="Password">'+gettext('Password')+'</span>'
                +'<input class="property-input" type="password" name="property" id="email_password" placeholder="******" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox3" name="smtp_server">'
                +'<span name="SMTP Server">'+gettext('SMTP Server')+'</span>'
                +'<input class="property-input" name="property" id="smtp_server" value="10.190.2.136" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox4" name="mail_title">'
                +'<span name="Title">'+gettext('Title')+'</span>'
                +'<input class="property-input" name="property" id="mail_title" placeholder="email_title" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox5" name="receive_list">'
                +'<span name="Receive">'+gettext('Receive')+'</span>'
                +'<input class="property-input" name="property" id="receive_list" placeholder="receiver_email_address" autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox6" name="cc_mail_list">'
                +'<span name="CC">'+gettext('CC')+'</span>'
                +'<input class="property-input" name="property" id="cc_mail_list" placeholder="cc_receiver_email_address" autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox7" name="bcc_list">'
                +'<span name="BCC">'+gettext('BCC')+'</span>'
                +'<input class="property-input" name="property" id="bcc_list" placeholder="bcc_receiver_email_address" autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox8" name="attach_file">'
                +'<span name="Attached File">'+gettext('Attached File')+'</span>'
                +'<input class="property-input" name="property" id="attach_file" placeholder="D:\\1.xlsx" autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox9" name="mail_content">'
                +'<span name="Content">'+gettext('Content')+'</span>'
                +'<textarea name="property" id="mail_content" style="width:98%;height:60px;" autocomplete="off"></textarea>'
                +'<div class="property-div"><input type="checkbox" id="checkbox10" name="mail_signature">'
                +'<span name="Signature">'+gettext('Signature')+'</span>'
                +'<textarea name="property" id="mail_signature" style="width:98%;height:60px;" autocomplete="off"></textarea>'
                +'<div class="property-div"><input type="checkbox" id="checkbox11" name="attach_image">'
                +'<span name="Attached Picture">'+gettext('Attached Picture')+'</span>'
                +'<input class="property-input" name="property" id="attach_image" placeholder="D:\\1.jpg" autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox12" name="showed_pictures">'
                +'<span name="Pictures(showed in content)">'+gettext('Pictures')+'('+gettext('showed in content')+')</span>'
                +'<input class="property-input" name="property" id="showed_pictures" placeholder="D:\\1.jpg" autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox13" name="picture_position">'
                +'<span name="Picture Position">'+gettext('Picture Position')+'</span>'
                +'<select class="property-input" name="property" id="picture_position">'
                +'<option value ="up" selected="selected">'+gettext('Up')+'</option>'
                +'<option value ="down">'+gettext('Down')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    if (variate == "mail_content" || variate == "mail_signature"){
                        data[variate] = data[variate].replace(/<br>/, "\n")
                    }
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "For"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox1" name="for_range">'
                +'<span name="Range">'+gettext('Range')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'If you input a comma, the value is the range of the loop;otherwise, the value is the end of the loop','for_range'"+')"></i>'
                +'<input class="property-input" name="property" id="for_range" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox2" name="for_variant">'
                +'<span name="Variant">'+gettext('Variant')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'Loop variant name','for_variant'"+')"></i>'
                +'<input class="property-input" name="property" id="for_variant" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox3" name="initial_value">'
                +'<span name="Initial Value">'+gettext('Initial Value')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'If you input a comma in range field, the value is invalid;otherwise, the value is the initial value of the loop','initial_value'"+')"></i>'
                +'<input class="property-input" name="property" id="initial_value" value="0" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox4" name="for_step">'
                +'<span name="Step">'+gettext('Step')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'If you input a comma in range field, the value is invalid;otherwise, the value is step value of the loop','for_step'"+')"></i>'
                +'<input class="property-input" name="property" id="for_step" value="1" autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox5" name="for_type">'
                +'<span name="Type">'+gettext('Type')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'Loop variable type, depending on whether you want to use value or text later','for_type'"+')"></i>'
                +'<select class="property-input" name="property" id="for_type">'
                +'<option value ="string" selected="selected">'+gettext('String')+'</option>'
                +'<option value ="number">'+gettext('Number')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "While"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox1" name="while_condition">'
                +'<span name="Condition">'+gettext('Condition')+'</span>'
                +'<input class="property-input" name="property" id="while_condition" placeholder="variant > 1 and variant < 10" autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox2" name="while_code">'
                +'<span name="Code">'+gettext('Code')+'</span>'
                +'<input class="property-input" name="property" id="while_code" placeholder="variant = variant + 1" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "If" || variant == "Else_If"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox1" name="if_condition">'
                +'<span name="Condition">'+gettext('Condition')+'</span>'
                +'<input class="property-input" name="property" id="if_condition" placeholder="variant > 1 and variant < 10" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Screen_Resolution"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox1" name="screen_width">'
                +'<span name="Width Variant">'+gettext('Width Variant')+'</span>'
                +'<input class="property-input" name="property" id="screen_width" value="width" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox2" name="screen_height">'
                +'<span name="Height Variant">'+gettext('Height Variant')+'</span>'
                +'<input class="property-input" name="property" id="screen_height" value="height" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Move_Mouse"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox1" name="x_axis">'
                +'<span name="X-axis">'+gettext('X-axis')+'</span><i class="fa fa-pencil" onclick="mouse_target()"></i>'
                +'<input class="property-input" name="property" id="x_axis" placeholder="100" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox2" name="y_axis">'
                +'<span name="Y-axis">'+gettext('Y-axis')+'</span>'
                +'<input class="property-input" name="property" id="y_axis" placeholder="100" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span>'
                +'<span name="Screen Scaling">'+gettext('Screen Scaling')+'</span>'
                +'<input class="property-input" name="property" id="screen_scaling" value="100%" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox3" name="duration_s">'
                +'<span name="Duration">'+gettext('Duration')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'operation time','duration_s'"+')"></i>'
                +'<input class="property-input" name="property" id="duration_s" value="0.25" autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox4" name="move_type">'
                +'<span name="Type">'+gettext('Type')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.Absolute(starting coordinates is 0,0);2.Relative(starting coordinates is the input figure)','move_type'"+')"></i>'
                +'<select class="property-input" name="property" id="move_type">'
                +'<option value ="moveTo" selected="selected">'+gettext('Absolute')+'</option>'
                +'<option value ="moveRel">'+gettext('Relative')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox5" name="move_with_resolution">'
                +'<span name="Calculate by scaling">'+gettext('Calculate by scaling')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.Yes(position adjust according to resolution);2.No(position is the absolute figure)','move_with_resolution'"+')"></i>'
                +'<select class="property-input" name="property" id="move_with_resolution">'
                +'<option value ="0">'+gettext('Yes')+'</option>'
                +'<option value ="1" selected="selected">'+gettext('No')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Click_Mouse"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'+'<div class="property-div"><input type="checkbox" id="checkbox1" name="click_option">'
                +'<span name="Click Option">'+gettext('Click Option')+'</span>'
                +'<select class="property-input" name="property" id="click_option">'
                +'<option value ="left" selected="selected">'+gettext('Left')+'</option>'
                +'<option value ="middle">'+gettext('Middle')+'</option>'
                +'<option value ="right">'+gettext('Right')+'</option>'
                +'<option value ="double">'+gettext('Double Chick')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Scroll_Mouse"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox1" name="scroll_units">'
                +'<span name="Units">'+gettext('Units')+'</span><i class="fa fa-pencil" onclick="mouse_target()"></i>'
                +'<input class="property-input" name="property" id="scroll_units" placeholder="100" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Drag_Mouse"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox1" name="x_axis"><i class="fa fa-pencil" onclick="mouse_target()"></i>'
                +'<span name="X-axis">'+gettext('X-axis')+'</span>'
                +'<input class="property-input" name="property" id="x_axis" placeholder="100" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox2" name="y_axis">'
                +'<span name="Y-axis">'+gettext('Y-axis')+'</span>'
                +'<input class="property-input" name="property" id="y_axis" placeholder="100" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span>'
                +'<span name="Screen Scaling">'+gettext('Screen Scaling')+'</span>'
                +'<input class="property-input" name="property" id="screen_scaling" value="100%" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox3" name="duration_s">'
                +'<span name="Duration">'+gettext('Duration')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'operation time','duration_s'"+')"></i>'
                +'<input class="property-input" name="property" id="duration_s" value="2" autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox4" name="drag_type">'
                +'<span name="Type">'+gettext('Type')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.Absolute(starting coordinates is 0,0);2.Relative(starting coordinates is the input figure)','drag_type'"+')"></i>'
                +'<select class="property-input" name="property" id="drag_type">'
                +'<option value ="dragTo" selected="selected">'+gettext('Absolute')+'</option>'
                +'<option value ="drag">'+gettext('Relative')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox5" name="drag_button">'
                +'<span name="Button">'+gettext('Button')+'</span>'
                +'<select class="property-input" name="property" id="drag_button">'
                +'<option value ="left" selected="selected">'+gettext('Left')+'</option>'
                +'<option value ="right">'+gettext('Right')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox6" name="move_with_resolution">'
                +'<span name="Calculate by scaling">'+gettext('Calculate by scaling')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.Yes(position adjust according to resolution);2.No(position is the absolute figure)','move_with_resolution'"+')"></i>'
                +'<select class="property-input" name="property" id="move_with_resolution">'
                +'<option value ="0">'+gettext('Yes')+'</option>'
                +'<option value ="1" selected="selected">'+gettext('No')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Press_Keyboard"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox1" name="press_keys">'
                +'<span name="Keys">'+gettext('Keys')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'1.shift(single press);2.[a,b,c,d](press based on the sequece)','press_keys'"+')"></i>'
                +'<input class="property-input" name="property" id="press_keys" placeholder="shift" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Hot_Key"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox1" name="press_keys">'
                +'<span name="Keys">'+gettext('Keys')+'</span>'
                +'<input class="property-input" name="property" id="press_keys" placeholder="'+"'ctrl','shift','esc'"+'" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Typewrite"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox1" name="write_content">'
                +'<span name="Content">'+gettext('Content')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'"+message+"','write_content'"+')"></i>'
                +'<input class="property-input" name="property" id="write_content" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox2" name="duration_s">'
                +'<span name="Duration">'+gettext('Duration')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'operation time','duration_s'"+')"></i>'
                +'<input class="property-input" name="property" id="duration_s" value="0.5" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Screen_Shot"){
        var message = "Path name, if contains (, then the system will be converted to the variable in ()";
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'+'<div class="property-div"><input type="checkbox" id="checkbox1" name="window_title">'
                +'<span name="Window Title">'+gettext('Window Title')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'The title that the window contains which need to be intercepted','window_title'"+')"></i>'
                +'<input class="property-input" name="property" id="window_title" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox2" name="save_path">'
                +'<span name="Save Path">'+gettext('Save Path')+' </span><i class="fa fa-info-circle" onclick="showInfo('+"'"+message+"','save_path'"+')"></i>'
                +'<input class="property-input" name="property" id="save_path" placeholder="D:\\1.jpg" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Main_Loop"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'+'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" value="root" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                if (input == "" || input == "None"){
                    $("#input").val("root");
                }else{
                    $("#input").val(input);
                }
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Define"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span>'+gettext('Variant')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'Function name','fun_variant'"+')"></i>'
                +'<input class="property-input" name="property" id="fun_variant" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" value="root" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Set_Focus"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><span>'+gettext('Title')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'The title that the window contains which need to be intercepted','focus_title'"+')"></i>'
                +'<input class="property-input" name="property" id="focus_title" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" value="root" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input)
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Current_Time"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode" style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span>'+gettext('Year')+'</span>'
                +'<select class="property-input" name="property" id="year_selection">'
                +'<option value ="-5">'+gettext('5 years ago')+'</option>'
                +'<option value ="-4">'+gettext('4 years ago')+'</option>'
                +'<option value ="-3">'+gettext('3 years ago')+'</option>'
                +'<option value ="-2">'+gettext('2 years ago')+'</option>'
                +'<option value ="-1">'+gettext('1 year ago')+'</option>'
                +'<option value ="0" selected="selected">'+gettext('current year')+'</option>'
                +'<option value ="1">'+gettext('1 year later')+'</option>'
                +'<option value ="2">'+gettext('2 years later')+'</option>'
                +'<option value ="3">'+gettext('3 years later')+'</option>'
                +'<option value ="4">'+gettext('4 years later')+'</option>'
                +'<option value ="5">'+gettext('5 years later')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span>'+gettext('Month')+'</span>'
                +'<select class="property-input" name="property" id="month_selection">'
                +'<option value ="-11">'+gettext('11 months ago')+'</option>'
                +'<option value ="-10">'+gettext('10 months ago')+'</option>'
                +'<option value ="-9">'+gettext('9 months ago')+'</option>'
                +'<option value ="-8">'+gettext('8 months ago')+'</option>'
                +'<option value ="-7">'+gettext('7 months ago')+'</option>'
                +'<option value ="-6">'+gettext('6 months ago')+'</option>'
                +'<option value ="-5">'+gettext('5 months ago')+'</option>'
                +'<option value ="-4">'+gettext('4 months ago')+'</option>'
                +'<option value ="-3">'+gettext('3 months ago')+'</option>'
                +'<option value ="-2">'+gettext('2 months ago')+'</option>'
                +'<option value ="-1">'+gettext('1 month ago')+'</option>'
                +'<option value ="0" selected="selected">'+gettext('current month')+'</option>'
                +'<option value ="1">'+gettext('1 month later')+'</option>'
                +'<option value ="2">'+gettext('2 months later')+'</option>'
                +'<option value ="3">'+gettext('3 months later')+'</option>'
                +'<option value ="4">'+gettext('4 months later')+'</option>'
                +'<option value ="5">'+gettext('5 months later')+'</option>'
                +'<option value ="6">'+gettext('6 months later')+'</option>'
                +'<option value ="7">'+gettext('7 months later')+'</option>'
                +'<option value ="8">'+gettext('8 months later')+'</option>'
                +'<option value ="9">'+gettext('9 months later')+'</option>'
                +'<option value ="10">'+gettext('10 months later')+'</option>'
                +'<option value ="11">'+gettext('11 months later')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span>'+gettext('Day')+'</span>'
                +'<select class="property-input" name="property" id="day_selection">'
                +'<option value ="-1">'+gettext('first day')+'</option>'
                +'<option value ="-2">'+gettext('yesterday')+'</option>'
                +'<option value ="0" selected="selected">'+gettext('today')+'</option>'
                +'<option value ="2">'+gettext('tomorrow')+'</option>'
                +'<option value ="1">'+gettext('last day')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span class="required-icon">*</span><span>'+gettext('Format')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'%y # two-digit year(00-99);%Y # four-digit year(000-9999);%m # month(01-12);%d # some day in one month(0-31);%H # 24-hour(0-23);%I # 12-hour(01-12) ;%M # minute(00=59);%S # second(00-59);%a # local simplified name of week;%A # local full name of week;%b # local simplified name of month;%B # local full name of month;%c # local corresponding date and time;%j # some day in one year(001-366);%p # local AM or PM;%U # some week in one year(00-53), sunday is the beginning of the week;%w # day of the week(0-6), sunday is the beginning of the week;%W # some week in one year(00-53), monday is the beginning of the week;%x # local corresponding date;%X # local corresponding time;%Z # name of the current time zone;%% # % itself','time_format'"+')"></i>'
                +'<input class="property-input" name="property" id="time_format" autocomplete="off" value="%d.%m.%Y">'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" placeholder="time_var" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input)
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Custom_Variant"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><span>'+gettext('Variant')+'</span>'
                +'<input class="property-input" name="property" id="self_variant" placeholder="var1 = 1 / var1" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Error Variant')+'</span>'
                +'<input class="property-input" name="property" id="error_variant" placeholder="var2 = 1 / var2" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" value="root" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input)
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Python_Code"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><span>'+gettext('Custom Code')+'</span>'
                +'<input class="property-input" name="property" id="self_code" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" value="root" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input)
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Remainder"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox1" name="used_variant">'
                +'<span name="Variant">'+gettext('Variant')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'Variant Name','used_variant'"+')"></i>'
                +'<input class="property-input" name="property" id="used_variant" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox2" name="cal_divisor">'
                +'<span name="Divisor">'+gettext('Divisor')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'Divisor','cal_divisor'"+')"></i>'
                +'<input class="property-input" name="property" id="cal_divisor" placeholder="1,2,3,4,5..."  autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" value="root" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><span>'+gettext('Output')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'Output variant name','output'"+')"></i>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input)
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Integration"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox1" name="used_variant">'
                +'<span name="Variant">'+gettext('Variant')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'Variant Name','used_variant'"+')"></i>'
                +'<input class="property-input" name="property" id="used_variant" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" value="root" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><span>'+gettext('Output')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'Output integration variant name','output'"+')"></i>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input)
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Float"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox1" name="used_variant">'
                +'<span name="Variant">'+gettext('Variant')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'Variant Name','used_variant'"+')"></i>'
                +'<input class="property-input" name="property" id="used_variant" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" value="root" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><span>'+gettext('Output')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'Output float variant name','output'"+')"></i>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input)
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Division"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox1" name="used_variant">'
                +'<span name="Variant">'+gettext('Variant')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'Variant Name','used_variant'"+')"></i>'
                +'<input class="property-input" name="property" id="used_variant" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox2" name="cal_divisor">'
                +'<span name="Divisor">'+gettext('Divisor')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'Divisor','cal_divisor'"+')"></i>'
                +'<input class="property-input" name="property" id="cal_divisor" placeholder="1,2,3,4,5..."  autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" value="root" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><span>'+gettext('Output')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'Output division variant name','output'"+')"></i>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input)
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Double_to_String"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'+'<div class="property-div"><input type="checkbox" id="checkbox1" name="used_variant">'
                +'<span name="Variant">'+gettext('Variant')+'</span>'
                +'<input class="property-input" name="property" id="used_variant" autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox2" name="decimal_digits">'
                +'<span name="Decimal Digits">'+gettext('Decimal Digits')+'</span>'
                +'<select class="property-input" name="property" id="decimal_digits">'
                +'<option value ="0" selected="selected">0</option>'
                +'<option value ="1">1</option>'
                +'<option value ="2">2</option>'
                +'<option value ="3">3</option>'
                +'<option value ="4">4</option>'
                +'<option value ="5">5</option>'
                +'</select></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" value="root" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input)
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "User_Input"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><span>'+gettext('Variant Description')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'Variant description, if several variants, use , to split them','input_name'"+')"></i>'
                +'<input class="property-input" name="property" id="input_name" placeholder="variant description" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" value="root" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><span>'+gettext('Output')+'</span><i class="fa fa-info-circle" onclick="showInfo('+"'Variant name, if several variants, use , to split them, the quantity should be the same as variant description','output'"+')"></i>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input)
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Python_File"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox1" name="file_path"><span name="File Path">'+gettext('File Path')+'</span>'
                +'<input class="property-input" name="property" id="file_path" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox2" name="file_name"><span name="File Name">'+gettext('File Name')+'</span>'
                +'<input class="property-input" name="property" id="file_name" autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox3" name="class_name"><span name="Class Name">'+gettext('Class Name')+'</span>'
                +'<input class="property-input" name="property" id="class_name" autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox4" name="class_variant"><span name="Class Variant">'+gettext('Class Variant')+'</span>'
                +'<input class="property-input" name="property" id="class_variant" autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox5" name="func_name"><span name="Function Name">'+gettext('Function Name')+'</span>'
                +'<input class="property-input" name="property" id="func_name" autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox6" name="func_variant"><span name="Function Variant">'+gettext('Function Variant')+'</span>'
                +'<input class="property-input" name="property" id="func_variant" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" value="root" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input)
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Web_FileUpload"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox1" name="window_title"><span name="Window Title">'+gettext('Window Title')+'</span>'
                +'<input class="property-input" name="property" id="window_title" placeholder="open" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><input type="checkbox" id="checkbox2" name="file_path"><span name="File Path">'+gettext('File Path')+'</span>'
                +'<input class="property-input" name="property" id="file_path" placeholder="D:\\upload_file.xlsx" autocomplete="off"></div>'
                +'<div class="property-div"><input type="checkbox" id="checkbox3" name="waiting"><span name="Implicit Waiting">'+gettext('Implicit Waiting')+'('+gettext('s')+')</span>'
                +'<input class="property-input" name="property" id="waiting" value="5" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" value="root" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input)
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Click"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            find_method = data['find_method'];
            if (find_method != "1"){
                display_style =  "none";
            }else{
                display_style =  "block";
            }
            var url = "";
            var control_handle = data['control_handle'];
            if (control_handle != "" && typeof(control_handle) != "undefined" && control_handle.indexOf("icon_target") != -1){
                var image_data =  JSON.parse(control_handle);
                url = "data:image/png;base64," + image_data['code'];
                var maxWidth = 200; // 图片最大宽度
                var maxHeight = 16;    // 图片最大高度
                var org_width = data['image_width'];    // 图片实际宽度
                var org_height = data['image_height'];  // 图片实际高度
                var ratio = maxHeight/org_height;  // 缩放比例
                // 检查缩放图片是否超宽
                var newWidth = org_width*ratio;
                var width = "0px",height = "0px";
                if(newWidth > maxWidth){
                    width = maxWidth + "px";
                    height = maxHeight + "px";
                }else{
                    width = newWidth + "px";
                    height = maxHeight + "px";
                }
            }
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span name="Method">'+gettext('Method')+'</span>'
                +'<select class="property-input" name="property" id="find_method" onchange="elementsChange()">'
                +'<option value ="0" selected="selected">'+gettext('Windows UI')+'</option>'
                +'<option value ="1">'+gettext('ScreenShot')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span name="Property">'+gettext('Property')+'</span><i class="fa fa-pencil" onclick="general_target()"></i>'
                +'<img id="img_screenshot" src="' + url + '" style="margin-left:5px;margin-bottom:2px;width:' + width + ';height:' + height + ';" onclick="largePic()">'
                +'<input class="property-input" name="property" id="control_handle" autocomplete="off" style="display:none;">'
                +'<input class="property-input" name="property" id="control_h_show" autocomplete="off"></div>'
                +'<div class="property-div"><span name="Click Option">'+gettext('Click Option')+'</span>'
                +'<select class="property-input" name="property" id="click_option">'
                +'<option value ="left" selected="selected">'+gettext('Left')+'</option>'
                +'<option value ="middle">'+gettext('Middle')+'</option>'
                +'<option value ="right">'+gettext('Right')+'</option>'
                +'<option value ="double">'+gettext('Double Chick')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span>'+gettext('Target Delay (s)')+'</span>'
                +'<input class="property-input" name="property" id="delay" value="0" autocomplete="off"></div>'
                +'<div id="img_position" class="property-div" style="display:' + display_style + ';"><span name="Mouse Position">'+gettext('Mouse Position')+'</span>'
                +'<select class="property-input" name="property" id="mouse_position">'
                +'<option value ="0" selected="selected">'+gettext('Center')+'</option>'
                +'<option value ="-1">'+gettext('Upper Left')+'</option>'
                +'<option value ="1">'+gettext('Upper Right')+'</option>'
                +'<option value ="-2">'+gettext('Lower Left')+'</option>'
                +'<option value ="2">'+gettext('Lower Right')+'</option>'
                +'</select></div>'
                +'<div id="match_rate" class="property-div" style="display:' + display_style + ';"><span name="Matching Rate">'+gettext('Matching Rate')+'</span>'
                +'<select class="property-input" name="property" id="matching_rate">'
                +'<option value ="0.1">'+gettext('10%')+'</option>'
                +'<option value ="0.2">'+gettext('20%')+'</option>'
                +'<option value ="0.3">'+gettext('30%')+'</option>'
                +'<option value ="0.4">'+gettext('40%')+'</option>'
                +'<option value ="0.5">'+gettext('50%')+'</option>'
                +'<option value ="0.6">'+gettext('60%')+'</option>'
                +'<option value ="0.7">'+gettext('70%')+'</option>'
                +'<option value ="0.8" selected="selected">'+gettext('80%')+'</option>'
                +'<option value ="0.9">'+gettext('90%')+'</option>'
                +'<option value ="1.0">'+gettext('100%')+'</option>'
                +'</select></div>'
                +'<div id="implicit" class="property-div"><span class="required-icon">*</span><span>'+gettext('Cycle Times')+'"</span>'
                +'<input class="property-input" name="property" id="cycle" value="10" autocomplete="off"></div>'
                +'<div id="img_x" class="property-div" style="display:' + display_style + ';"><span class="required-icon">*</span><span>'+gettext('X Axis Offset')+'</span>'
                +'<input class="property-input" name="property" id="offsetX" value="0" autocomplete="off"></div>'
                +'<div id="img_y" class="property-div" style="display:' + display_style + ';"><span class="required-icon">*</span><span>'+gettext('Y Axis Offset')+'</span>'
                +'<input class="property-input" name="property" id="offsetY" value="0" autocomplete="off"></div>'
                +'<div id="img_width" class="property-div" style="display:' + display_style + ';"><span>'+gettext('Width')+'</span>'
                +'<input class="property-input" name="property" id="image_width" autocomplete="off" disabled="disabled"></div>'
                +'<div id="img_height" class="property-div" style="display:' + display_style + ';"><span>'+gettext('Height')+'</span>'
                +'<input class="property-input" name="property" id="image_height" autocomplete="off" disabled="disabled"></div>'
                +'<div class="property-div"><span name="Show Desktop">'+gettext('Show Desktop')+'</span>'
                +'<select class="property-input" name="property" id="show_desktop">'
                +'<option value ="no" selected="selected">'+gettext('No')+'</option>'
                +'<option value ="yes">'+gettext('Yes')+'</option>'
                +'</select></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input)
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Input"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            find_method = data['find_method'];
            if (find_method != "1"){
                display_style =  "none";
            }else{
                display_style =  "block";
            }
            var url = "";
            var control_handle = data['control_handle'];
            if (control_handle != "" && typeof(control_handle) != "undefined" && control_handle.indexOf("icon_target") != -1){
                var image_data =  JSON.parse(control_handle);
                url = "data:image/png;base64," + image_data['code'];
                var maxWidth = 200; // 图片最大宽度
                var maxHeight = 16;    // 图片最大高度
                var org_width = data['image_width'];    // 图片实际宽度
                var org_height = data['image_height'];  // 图片实际高度
                var ratio = maxHeight/org_height;  // 缩放比例
                // 检查缩放图片是否超宽
                var newWidth = org_width*ratio;
                var width = "0px",height = "0px";
                if(newWidth > maxWidth){
                    width = maxWidth + "px";
                    height = maxHeight + "px";
                }else{
                    width = newWidth + "px";
                    height = maxHeight + "px";
                }
            }
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span name="Method">'+gettext('Method')+'</span>'
                +'<select class="property-input" name="property" id="find_method" onchange="elementsChange()">'
                +'<option value ="0" selected="selected">'+gettext('Windows UI')+'</option>'
                +'<option value ="1">'+gettext('ScreenShot')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span name="Property">'+gettext('Property')+'</span><i class="fa fa-pencil" onclick="general_target()"></i>'
                +'<img id="img_screenshot" src="' + url + '" style="margin-left:5px;margin-bottom:2px;width:' + width + ';height:' + height + ';" onclick="largePic()">'
                +'<input class="property-input" name="property" id="control_handle" autocomplete="off" style="display:none;">'
                +'<input class="property-input" name="property" id="control_h_show" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><span name="Content">'+gettext('Content')+'</span>'
                +'<input class="property-input" name="property" id="control_content" autocomplete="off"></div>'
                +'<div id="img_position" class="property-div" style="display:none;"><span name="Mouse Position">'+gettext('Mouse Position')+'</span>'
                +'<select class="property-input" name="property" id="mouse_position">'
                +'<option value ="0" selected="selected">'+gettext('Center')+'</option>'
                +'<option value ="-1">'+gettext('Upper Left')+'</option>'
                +'<option value ="1">'+gettext('Upper Right')+'</option>'
                +'<option value ="-2">'+gettext('Lower Left')+'</option>'
                +'<option value ="2">'+gettext('Lower Right')+'</option>'
                +'</select></div>'
                +'<div id="match_rate" class="property-div" style="display:' + display_style + ';"><span name="Matching Rate">'+gettext('Matching Rate')+'</span>'
                +'<select class="property-input" name="property" id="matching_rate">'
                +'<option value ="0.1">'+gettext('10%')+'</option>'
                +'<option value ="0.2">'+gettext('20%')+'</option>'
                +'<option value ="0.3">'+gettext('30%')+'</option>'
                +'<option value ="0.4">'+gettext('40%')+'</option>'
                +'<option value ="0.5">'+gettext('50%')+'</option>'
                +'<option value ="0.6">'+gettext('60%')+'</option>'
                +'<option value ="0.7">'+gettext('70%')+'</option>'
                +'<option value ="0.8" selected="selected">'+gettext('80%')+'</option>'
                +'<option value ="0.9">'+gettext('90%')+'</option>'
                +'<option value ="1.0">'+gettext('100%')+'</option>'
                +'</select></div>'
                +'<div id="implicit" class="property-div"><span class="required-icon">*</span><span>'+gettext('Cycle Times')+'</span>'
                +'<input class="property-input" name="property" id="cycle" value="10" autocomplete="off"></div>'
                +'<div id="img_x" class="property-div" style="display:' + display_style + ';"><span class="required-icon">*</span><span>'+gettext('X Axis Offset')+'</span>'
                +'<input class="property-input" name="property" id="offsetX" value="0" autocomplete="off"></div>'
                +'<div id="img_y" class="property-div" style="display:' + display_style + ';"><span class="required-icon">*</span><span>'+gettext('Y Axis Offset')+'</span>'
                +'<input class="property-input" name="property" id="offsetY" value="0" autocomplete="off"></div>'
                +'<div id="img_width" class="property-div" style="display:' + display_style + ';"><span>'+gettext('Width')+'</span>'
                +'<input class="property-input" name="property" id="image_width" autocomplete="off" disabled="disabled"></div>'
                +'<div id="img_height" class="property-div" style="display:' + display_style + ';"><span>'+gettext('Height')+'</span>'
                +'<input class="property-input" name="property" id="image_height" autocomplete="off" disabled="disabled"></div>'
                +'<div class="property-div"><span name="Show Desktop">'+gettext('Show Desktop')+'</span>'
                +'<select class="property-input" name="property" id="show_desktop">'
                +'<option value ="no" selected="selected">'+gettext('No')+'</option>'
                +'<option value ="yes">'+gettext('Yes')+'</option>'
                +'</select></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input)
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else if(variant == "Select"){
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'
                +'<div class="property-div"><span name="Handle">'+gettext('Handle')+'</span><i class="fa fa-pencil" onclick="handle_target()"></i>'
                +'<input class="property-input" name="property" id="control_handle" autocomplete="off"></div>'
                +'<div class="property-div"><span class="required-icon">*</span><span name="Select Content">'+gettext('Select Content')+'</span>'
                +'<input class="property-input" name="property" id="control_content" autocomplete="off"></div>'
                +'<div class="property-div"><span name="Show Desktop">'+gettext('Show Desktop')+'</span>'
                +'<select class="property-input" name="property" id="show_desktop">'
                +'<option value ="no" selected="selected">'+gettext('No')+'</option>'
                +'<option value ="yes">'+gettext('Yes')+'</option>'
                +'</select></div>'
                +'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" value="root" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input)
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }else{
        $.ajax({
          type:'POST',
          url:'../sortvariant/',
          dataType:'json',
          data:param,
          beforeSend:function(){
            layer.load(2);
          },
          success:function(data){
            layer.closeAll('loading');
            nodeVariant = data['variant'];
            input = data['input'];
            output = data['output'];
            var html = '<div class="property" style="overflow:auto;overflow-x:hidden;"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo">'
                +'<div class="property-div"><span style="display: none;">'+gettext('Last Node')+'</span>'
                +'<input class="property-input" name="property" id="lastNode" style="display: none;"></div>'
                +'<div class="property-div"><span style="display: none;">'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode"style="display: none;"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" disabled="false"></div>'
                +'<div class="property-div"><span>'+gettext('Name')+'</span>'
                +'<input class="property-input" name="property" id="name" placeholder='+gettext("step name")+' autocomplete="off" oninput="adjust('+"'"+id+"'"+')"></div>'+'<div class="property-div"><span>'+gettext('Input')+'</span>'
                +'<input class="property-input" name="property" id="input" autocomplete="off"></div>'
                +'<div class="property-div"><span>'+gettext('Output')+'</span>'
                +'<input class="property-input" name="property" id="output" autocomplete="off"></div>'
                + button_html
            layerHtml(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
                $("#input").val(input);
                $("#output").val(output);
                $("#nodeNo").attr("disabled","false");
                $("#lastNode").attr("disabled","false");
                $("#nextNode").attr("disabled","false");
                $("#function").attr("disabled","false");
            }catch(err){
                console(err);
            }
          },
        });
    }
}
