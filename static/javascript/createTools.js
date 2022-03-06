function generateTools(id,variant){
    var json = getConnections();
    var nodeVariant = "";
    var nodeNo = json[id+"nodeNo"];
    var param = {"function":variant,"nodeNo":nodeNo,"id":id};
    $("#diagramContainer-main").css('width','66.66666667%');
    $("#header").css('border-width','0px');
	$("#header").css('background','#d9edf7');
	var propertyArea = $("#diagramContainer-control");
	propertyArea.css('display','block');
    propertyArea.empty();
    $("#setting-header").css('display','block');
    if (variant == "Start"){
        var html = '<div id="property"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;" disabled="false" value="1">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" value="Start" disabled="false">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
        propertyArea.append(html);
        try{
            nextNode = json[id+"nextNode"];
            $("#nextNode").val(nextNode);
            $("#nextNode").attr("disabled","false");
        }catch(err){
            console(err);
        }
    }else if(variant == "End"){
        var html = '<div id="property"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" value="End" disabled="false">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
        propertyArea.append(html);
        try{
            nodeNo = json[id+"nodeNo"];
            lastNode = json[id+"lastNode"];
            $("#nodeNo").val(nodeNo);
            $("#lastNode").val(lastNode);
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="wait_seconds">'
                +'<span style="margin-top:10px;">Wait Seconds</span></div>'
                +'<input name="property" id="wait_seconds" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" value="driver" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
    }else if(variant == "Configuration"){
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="browser">'
                +'<span style="margin-top:10px;">Browser</span></div>'
                +'<select name="property" id="browser" style="width:98%">'
                +'<option value ="chrome">Chrome</option>'
                +'<option value ="ie">IE</option>'
                +'<option value ="firefox">FireFox</option>'
                +'</select>'
                +'<span style="margin-top:10px;">Head(Chrome)</span>'
                +'<select name="property" id="head_visible" style="width:98%">'
                +'<option value ="show" selected = "selected">show</option>'
                +'<option value ="hide">hide</option>'
                +'</select>'
                +'<div><input type="checkbox" id="checkbox2" name="start_path">'
                +'<span style="margin-top:10px;">Browser Path</span></div>'
                +'<input name="property" id="start_path" style="width:98%" placeholder="D:/Chrome/chromedriver.exe" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox3" name="download_path">'
                +'<span style="margin-top:10px;">Download Path</span></div>'
                +'<input name="property" id="download_path" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" value="driver" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                var driver = $("#output").val();
                if (driver == null || driver == ""){
                    $("#output").val("driver");
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
    }else if(variant == "Start_Browser"){
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="login_url">'
                +'<span style="margin-top:10px;">Url</span></div>'
                +'<input name="property" id="login_url" style="width:98%" placeholder="https://www.baidu.com" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox2" name="size">'
                +'<span style="margin-top:10px;">Window Size</span></div>'
                +'<select name="property" id="size" style="width:98%">'
                +'<option value ="maximize" selected = "selected">maximize</option>'
                +'<option value ="minimize">minimize</option>'
                +'</select>'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" value="driver" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                var driver = $("#input").val();
                if (driver == null || driver == ""){
                    $("#input").val("driver");
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
    }else if(variant == "Click_Element" || variant == "Mouse_Move" || variant == "Double_Click" || variant == "Content_Click" || variant == "Get_Text" || variant == "Clear"){
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="method">'
                +'<span style="margin-top:10px;">Find Method</span></div>'
                +'<select name="property" id="method" style="width:98%">'
                +'<option value ="ID" selected = "selected">ID</option>'
                +'<option value ="NAME">NAME</option>'
                +'<option value ="CLASS_NAME">CLASS_NAME</option>'
                +'<option value ="XPATH">XPATH</option>'
                +'<option value ="LINK_TEXT">LINK_TEXT</option>'
                +'</select>'
                +'<div><input type="checkbox" id="checkbox2" name="element_name">'
                +'<span style="margin-top:10px;">Element Property</span></div>'
                +'<input name="property" id="element_name" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Implicit Waiting(s)</span>'
                +'<input name="property" id="waiting" style="width:98%" value="10" autocomplete="off">'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" value="driver" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                var driver = $("#input").val();
                if (driver == null || driver == ""){
                    $("#input").val("driver");
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
    }else if(variant == "Send_Keys"){
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="method">'
                +'<span style="margin-top:10px;">Find Method</span></div>'
                +'<select name="property" id="method" style="width:98%">'
                +'<option value ="ID" selected="selected">ID</option>'
                +'<option value ="NAME">NAME</option>'
                +'<option value ="CLASS_NAME">CLASS_NAME</option>'
                +'<option value ="XPATH">XPATH</option>'
                +'<option value ="LINK_TEXT">LINK_TEXT</option>'
                +'</select>'
                +'<div><input type="checkbox" id="checkbox2" name="element_name">'
                +'<span style="margin-top:10px;">Element Property</span></div>'
                +'<input name="property" id="element_name" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Implicit Waiting(s)</span>'
                +'<input name="property" id="waiting" style="width:98%" value="10" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox3" name="content">'
                +'<span style="margin-top:10px;">Content</span></div>'
                +'<input name="property" id="content" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" value="driver" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                var driver = $("#input").val();
                if (driver == null || driver == ""){
                    $("#input").val("driver");
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
    }else if(variant == "Self_Code"){
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="own_code">'
                +'<span style="margin-top:10px;">Self Code</span></div>'
                +'<input name="property" id="own_code" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" value="driver" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                var driver = $("#input").val();
                if (driver == null || driver == ""){
                    $("#input").val("driver");
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
    }else if(variant == "Run_Script"){
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="js_script">'
                +'<span style="margin-top:10px;">JS Script</span></div>'
                +'<input name="property" id="js_script" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" value="driver" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                var driver = $("#input").val();
                if (driver == null || driver == ""){
                    $("#input").val("driver");
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
    }else if(variant == "Switch_to_Frame"){
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="method">'
                +'<span style="margin-top:10px;">Find Method</span></div>'
                +'<select name="property" id="method" style="width:98%">'
                +'<option value ="INDEX" selected="selected">INDEX</option>'
                +'<option value ="ID">ID</option>'
                +'<option value ="NAME">NAME</option>'
                +'<option value ="CLASS_NAME">CLASS_NAME</option>'
                +'<option value ="XPATH">XPATH</option>'
                +'<option value ="LINK_TEXT">LINK_TEXT</option>'
                +'</select>'
                +'<div><input type="checkbox" id="checkbox2" name="element_name">'
                +'<span style="margin-top:10px;">Element Property</span></div>'
                +'<input name="property" id="element_name" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Implicit Waiting(s)</span>'
                +'<input name="property" id="waiting" style="width:98%" value="10" autocomplete="off">'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" value="driver" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                var driver = $("#input").val();
                if (driver == null || driver == ""){
                    $("#input").val("driver");
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
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
    }else if(variant == "Switch_Back"){
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" value="driver" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                var driver = $("#input").val();
                if (driver == null || driver == ""){
                    $("#input").val("driver");
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
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
    }else if(variant == "Parent_Frame"){
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" value="driver" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                var driver = $("#input").val();
                if (driver == null || driver == ""){
                    $("#input").val("driver");
                }
                nextNode = json[id+"nextNode"];
                nodeNo = json[id+"nodeNo"];
                lastNode = json[id+"lastNode"];
                $("#nodeNo").val(nodeNo);
                $("#lastNode").val(lastNode);
                $("#nextNode").val(nextNode);
                $("#function").val(variant);
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
    }else if(variant == "Switch_to_Window"){
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<span style="margin-top:10px;">Implicit Waiting(s)</span>'
                +'<input name="property" id="waiting" style="width:98%" value="10" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox1" name="sequence">'
                +'<span style="margin-top:10px;">Sequence</span></div>'
                +'<input name="property" id="sequence" style="width:98%" value="1" autocomplete="off">'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" value="driver" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                var driver = $("#input").val();
                if (driver == null || driver == ""){
                    $("#input").val("driver");
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
    }else if(variant == "Forward" || variant == "Back" || variant == "Refresh" || variant == "Close" || variant == "Quit"){
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" value="driver" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
            try{
                for (variate in data){
                    $("#"+variate).val(data[variate]);
                }
                var public_list = data["list"];
                for (var i=0;i<public_list.length;i++){
                    var public_variant = public_list[i];
                    $('input[name='+public_variant+']').attr("checked", 'checked')
                }
                var driver = $("#input").val();
                if (driver == null || driver == ""){
                    $("#input").val("driver");
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<span style="margin-top:10px;">Title</span>'
                +'<input name="property" id="title_name" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Size</span><br>'
                +'<input name="property" id="width" style="width:30%" autocomplete="off">'
                +'<span style="margin-top:10px;"> x </span>'
                +'<input name="property" id="height" style="width:30%" autocomplete="off"><br>'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" value="root" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<span style="margin-top:10px;">Type</span>'
                +'<select name="property" id="type" style="width:98%">'
                +'<option value ="info" selected="selected">Info</option>'
                +'<option value ="warning">Warning</option>'
                +'<option value ="error">Error</option>'
                +'</select>'
                +'<span style="margin-top:10px;">Title</span>'
                +'<input name="property" id="title_name" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Content</span>'
                +'<input name="property" id="content" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" value="root" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<span style="margin-top:10px;">Font</span>'
                +'<input name="property" id="widget_font" style="width:98%" value="Arial" autocomplete="off">'
                +'<span style="margin-top:10px;">Size</span>'
                +'<input name="property" id="widget_size" style="width:98%" value="10" autocomplete="off">'
                +'<span style="margin-top:10px;">Row</span>'
                +'<input name="property" id="widget_row" style="width:98%" value="0" autocomplete="off">'
                +'<span style="margin-top:10px;">Row Span</span>'
                +'<input name="property" id="row_span" style="width:98%" value="1" autocomplete="off">'
                +'<span style="margin-top:10px;">Column</span>'
                +'<input name="property" id="widget_column" style="width:98%" value="0" autocomplete="off">'
                +'<span style="margin-top:10px;">Column Span</span>'
                +'<input name="property" id="column_span" style="width:98%" value="1" autocomplete="off">'
                +'<span style="margin-top:10px;">Text</span>'
                +'<input name="property" id="widget_text" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" value="root" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<span style="margin-top:10px;">Row</span>'
                +'<input name="property" id="widget_row" style="width:98%" value="0" autocomplete="off">'
                +'<span style="margin-top:10px;">Row Span</span>'
                +'<input name="property" id="row_span" style="width:98%" value="1" autocomplete="off">'
                +'<span style="margin-top:10px;">Column</span>'
                +'<input name="property" id="widget_column" style="width:98%" value="0" autocomplete="off">'
                +'<span style="margin-top:10px;">Column Span</span>'
                +'<input name="property" id="column_span" style="width:98%" value="1" autocomplete="off">'
                +'<span style="margin-top:10px;">Text</span>'
                +'<input name="property" id="widget_text" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" value="root" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<span style="margin-top:10px;">Font</span>'
                +'<input name="property" id="widget_font" style="width:98%" value="Arial" autocomplete="off">'
                +'<span style="margin-top:10px;">Size</span>'
                +'<input name="property" id="widget_size" style="width:98%" value="10" autocomplete="off">'
                +'<span style="margin-top:10px;">Row</span>'
                +'<input name="property" id="widget_row" style="width:98%" value="0" autocomplete="off">'
                +'<span style="margin-top:10px;">Row Span</span>'
                +'<input name="property" id="row_span" style="width:98%" value="1" autocomplete="off">'
                +'<span style="margin-top:10px;">Column</span>'
                +'<input name="property" id="widget_column" style="width:98%" value="0" autocomplete="off">'
                +'<span style="margin-top:10px;">Column Span</span>'
                +'<input name="property" id="column_span" style="width:98%" value="1" autocomplete="off">'
                +'<span style="margin-top:10px;">Text</span>'
                +'<input name="property" id="widget_text" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Command</span>'
                +'<input name="property" id="widget_command" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" value="root" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="file_path">'
                +'<span style="margin-top:10px;">Folder Path</span></div>'
                +'<input name="property" id="file_path" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="file_path">'
                +'<span style="margin-top:10px;">Folder Path</span></div>'
                +'<input name="property" id="file_path" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="original_path">'
                +'<span style="margin-top:10px;">Original Folder Path</span></div>'
                +'<input name="property" id="original_path" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox2" name="target_path">'
                +'<span style="margin-top:10px;">Target Folder Path</span></div>'
                +'<input name="property" id="target_path" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
    }else if(variant == "File_Exist?" || variant == "New_File" || variant == "Delete_File" || variant == "Add_to_File" || variant == "Get_File_Information" || variant == "Get_File_Content"){
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="file_path">'
                +'<span style="margin-top:10px;">File Path</span></div>'
                +'<input name="property" id="file_path" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="file_path">'
                +'<span style="margin-top:10px;">File Path</span></div>'
                +'<input name="property" id="file_path" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox2" name="file_variant">'
                +'<span style="margin-top:10px;">Variant</span></div>'
                +'<input name="property" id="file_variant" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="file_path">'
                +'<span style="margin-top:10px;">File Path</span></div>'
                +'<input name="property" id="file_path" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox2" name="folder_path">'
                +'<span style="margin-top:10px;">Folder Path</span></div>'
                +'<input name="property" id="folder_path" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
    }else if(variant == "New_Workbook"){
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="excel_path">'
                +'<span style="margin-top:10px;">File Path</span></div>'
                +'<input name="property" id="excel_path" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox2" name="remind">'
                +'<span style="margin-top:10px;">Cover Reminder</span></div>'
                +'<select name="property" id="remind" style="width:98%">'
                +'<option value ="False" selected="selected">No</option>'
                +'<option value ="True">Yes</option>'
                +'</select>'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
    }else if(variant == "Open_Workbook"){
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="excel_path">'
                +'<span style="margin-top:10px;">File Path</span></div>'
                +'<input name="property" id="excel_path" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox2" name="show">'
                +'<span style="margin-top:10px;">Show</span></div>'
                +'<select name="property" id="show" style="width:98%">'
                +'<option value ="True" selected="selected">True</option>'
                +'<option value ="False">False</option>'
                +'</select>'
                +'<div><input type="checkbox" id="checkbox3" name="calculation_method">'
                +'<span style="margin-top:10px;">Automatic Calculation</span></div>'
                +'<select name="property" id="calculation_method" style="width:98%">'
                +'<option value ="0" selected="selected">None</option>'
                +'<option value ="-4105" selected="selected">Yes</option>'
                +'<option value ="-4135">No</option>'
                +'</select>'
                +'<div><input type="checkbox" id="checkbox4" name="size">'
                +'<span style="margin-top:10px;">Size</span></div>'
                +'<select name="property" id="size" style="width:98%">'
                +'<option value ="1">normal</option>'
                +'<option value ="2">minimize</option>'
                +'<option value ="3" selected="selected">maximize</option>'
                +'</select>'
                +'<div><input type="checkbox" id="checkbox5" name="display_alerts">'
                +'<span style="margin-top:10px;">Display Alerts</span></div>'
                +'<select name="property" id="display_alerts" style="width:98%">'
                +'<option value ="True">True</option>'
                +'<option value ="False" selected="selected">False</option>'
                +'</select>'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
    }else if(variant == "Show_Level"){
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="excel_name">'
                +'<span style="margin-top:10px;">Sheet Name</span></div>'
                +'<input name="property" id="sheet_name" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox2" name="excel_level">'
                +'<span style="margin-top:10px;">Level</span></div>'
                +'<input name="property" id="sheet_level" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
    }else if(variant == "Active_Workbook"){
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
    }else if(variant == "Close_Workbook"){
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="calculation_method">'
                +'<span style="margin-top:10px;">Automatic Calculation</span></div>'
                +'<select name="property" id="calculation_method" style="width:98%">'
                +'<option value ="1" selected="selected">Yes</option>'
                +'<option value ="0">No</option>'
                +'</select>'
                +'<div><input type="checkbox" id="checkbox2" name="save_judge">'
                +'<span style="margin-top:10px;">Save</span></div>'
                +'<select name="property" id="save_judge" style="width:98%">'
                +'<option value ="1" selected="selected">yes</option>'
                +'<option value ="0">no</option>'
                +'</select>'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
    }else if(variant == "Save_As"){
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="excel_path">'
                +'<span style="margin-top:10px;">File Path</span></div>'
                +'<input name="property" id="excel_path" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox2" name="remind">'
                +'<span style="margin-top:10px;">Cover Reminder</span></div>'
                +'<select name="property" id="remind" style="width:98%">'
                +'<option value ="False" selected="selected">No</option>'
                +'<option value ="True">Yes</option>'
                +'</select>'
                +'<div><input type="checkbox" id="checkbox3" name="calculation_method">'
                +'<span style="margin-top:10px;">Automatic Calculation</span></div>'
                +'<select name="property" id="calculation_method" style="width:98%">'
                +'<option value ="1" selected="selected">Yes</option>'
                +'<option value ="0">No</option>'
                +'</select>'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
    }else if(variant == "Save"){
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="calculation_method">'
                +'<span style="margin-top:10px;">Automatic Calculation</span></div>'
                +'<select name="property" id="calculation_method" style="width:98%">'
                +'<option value ="1" selected="selected">Yes</option>'
                +'<option value ="0">No</option>'
                +'</select>'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
    }else if(variant == "Add_Sheet" || variant == "Sheet_Exist?" || variant == "Delete_Sheet" || variant == "Used_Rows" || variant == "Used_Columns"){
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="sheet_name">'
                +'<span style="margin-top:10px;">Sheet Name</span></div>'
                +'<input name="property" id="sheet_name" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox2" name="excel_active">'
                +'<span style="margin-top:10px;">Active</span></div>'
                +'<select name="property" id="excel_active" style="width:98%">'
                +'<option value ="yes" selected="selected">Yes</option>'
                +'<option value ="no">No</option>'
                +'</select>'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
    }else if(variant == "Run_Marco"){
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="marco_name">'
                +'<span style="margin-top:10px;">Marco Name</span></div>'
                +'<input name="property" id="marco_name" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
    }else if(variant == "Calculation"){
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="sheet_name">'
                +'<span style="margin-top:10px;">Sheet Name</span></div>'
                +'<input name="property" id="sheet_name" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox2" name="selected_cells">'
                +'<span style="margin-top:10px;">Cells</span></div>'
                +'<input name="property" id="selected_cells" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox3" name="calculation">'
                +'<span style="margin-top:10px;">Calculation</span></div>'
                +'<input name="property" id="calculation" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox4" name="excel_active">'
                +'<span style="margin-top:10px;">Active</span></div>'
                +'<select name="property" id="excel_active" style="width:98%">'
                +'<option value ="yes" selected="selected">Yes</option>'
                +'<option value ="no">No</option>'
                +'</select>'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
    }else if(variant == "Filter"){
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="filter_type">'
                +'<span style="margin-top:10px;">Filter Type</span></div>'
                +'<select name="property" id="filter_type" style="width:98%">'
                +'<option value ="7" selected="selected">Value</option>'
                +'<option value ="8">Cell Color</option>'
                +'<option value ="9">Font Color</option>'
                +'<option value ="12">No Cell Color</option>'
                +'</select>'
                +'<div><input type="checkbox" id="checkbox2" name="sheet_name">'
                +'<span style="margin-top:10px;">Sheet Name</span></div>'
                +'<input name="property" id="sheet_name" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox3" name="column_num">'
                +'<span style="margin-top:10px;">Column</span></div>'
                +'<input name="property" id="column_num" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox4" name="filter_condition">'
                +'<span style="margin-top:10px;">Condition</span></div>'
                +'<input name="property" id="filter_condition" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox5" name="excel_active">'
                +'<span style="margin-top:10px;">Active</span></div>'
                +'<select name="property" id="excel_active" style="width:98%">'
                +'<option value ="yes" selected="selected">Yes</option>'
                +'<option value ="no">No</option>'
                +'</select>'
                +'<div><input type="checkbox" id="checkbox6" name="show_all_data">'
                +'<span style="margin-top:10px;">Show All Data</span></div>'
                +'<select name="property" id="show_all_data" style="width:98%">'
                +'<option value ="no" selected="selected">No</option>'
                +'<option value ="yes">Yes</option>'
                +'</select>'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
    }else if(variant == "Top_10"){
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="sheet_name">'
                +'<span style="margin-top:10px;">Sheet Name</span></div>'
                +'<input name="property" id="sheet_name" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox2" name="column_num">'
                +'<span style="margin-top:10px;">Column</span></div>'
                +'<input name="property" id="column_num" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox2" name="filter_condition">'
                +'<span style="margin-top:10px;">Condition</span></div>'
                +'<select name="property" id="filter_condition" style="width:98%">'
                +'<option value ="3" selected="selected">Top</option>'
                +'<option value ="4">Bottom</option>'
                +'</select>'
                +'<div><input type="checkbox" id="checkbox3" name="filter_num">'
                +'<span style="margin-top:10px;">Number</span></div>'
                +'<input name="property" id="filter_num" style="width:98%" value="10" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox4" name="excel_active">'
                +'<span style="margin-top:10px;">Active</span></div>'
                +'<select name="property" id="excel_active" style="width:98%">'
                +'<option value ="yes" selected="selected">Yes</option>'
                +'<option value ="no">No</option>'
                +'</select>'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
    }else if(variant == "Delete_Cells"){
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="sheet_name">'
                +'<span style="margin-top:10px;">Sheet Name</span></div>'
                +'<input name="property" id="sheet_name" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox2" name="selected_cells">'
                +'<span style="margin-top:10px;">Cells</span></div>'
                +'<input name="property" id="selected_cells" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox3" name="move_method">'
                +'<span style="margin-top:10px;">Move Method</span></div>'
                +'<select name="property" id="move_method" style="width:98%">'
                +'<option value ="2" selected="selected">Up</option>'
                +'<option value ="1">Left</option>'
                +'</select>'
                +'<div><input type="checkbox" id="checkbox4" name="excel_active">'
                +'<span style="margin-top:10px;">Active</span></div>'
                +'<select name="property" id="excel_active" style="width:98%">'
                +'<option value ="yes" selected="selected">Yes</option>'
                +'<option value ="no">No</option>'
                +'</select>'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
    }else if(variant == "Clear_Cells" || variant == "Merge_Cells" || variant == "UnMerge_Cells" || variant == "Cut_Cells" || variant == "Copy_Cells" || variant == "Filter_Result"){
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="sheet_name">'
                +'<span style="margin-top:10px;">Sheet Name</span></div>'
                +'<input name="property" id="sheet_name" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox2" name="selected_cells">'
                +'<span style="margin-top:10px;">Cells</span></div>'
                +'<input name="property" id="selected_cells" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox3" name="excel_active">'
                +'<span style="margin-top:10px;">Active</span></div>'
                +'<select name="property" id="excel_active" style="width:98%">'
                +'<option value ="yes" selected="selected">Yes</option>'
                +'<option value ="no">No</option>'
                +'</select>'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
    }else if(variant == "Paste_Cells"){
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="sheet_name">'
                +'<span style="margin-top:10px;">Sheet Name</span></div>'
                +'<input name="property" id="sheet_name" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox2" name="selected_cells">'
                +'<span style="margin-top:10px;">Cells</span></div>'
                +'<input name="property" id="selected_cells" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox3" name="paste_mode">'
                +'<span style="margin-top:10px;">Paste Mode</span></div>'
                +'<select name="property" id="paste_mode" style="width:98%">'
                +'<option value ="-4104" selected="selected">All</option>'
                +'<option value ="-4163">Value</option>'
                +'<option value ="-4123">Calculation</option>'
                +'<option value ="-4122">Format</option>'
                +'<option value ="13">Source Theme</option>'
                +'</select>'
                +'<div><input type="checkbox" id="checkbox4" name="paste_operation">'
                +'<span style="margin-top:10px;">Paste Operation</span></div>'
                +'<select name="property" id="paste_operation" style="width:98%">'
                +'<option value ="-4142" selected="selected">No</option>'
                +'<option value ="2">Add</option>'
                +'<option value ="3">Minus</option>'
                +'<option value ="4">Multiply</option>'
                +'<option value ="5">Divide</option>'
                +'</select>'
                +'<div><input type="checkbox" id="checkbox5" name="skip_blanks">'
                +'<span style="margin-top:10px;">Skip Blanks</span></div>'
                +'<select name="property" id="skip_blanks" style="width:98%">'
                +'<option value ="False" selected="selected">No</option>'
                +'<option value ="True">Yes</option>'
                +'</select>'
                +'<div><input type="checkbox" id="checkbox6" name="transpose">'
                +'<span style="margin-top:10px;">Transpose</span></div>'
                +'<select name="property" id="transpose" style="width:98%">'
                +'<option value ="False" selected="selected">No</option>'
                +'<option value ="True">Yes</option>'
                +'</select>'
                +'<div><input type="checkbox" id="checkbox7" name="excel_active">'
                +'<span style="margin-top:10px;">Active</span></div>'
                +'<select name="property" id="excel_active" style="width:98%">'
                +'<option value ="yes" selected="selected">Yes</option>'
                +'<option value ="no">No</option>'
                +'</select>'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
    }else if(variant == "Sort_Cells"){
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="sheet_name">'
                +'<span style="margin-top:10px;">Sheet Name</span></div>'
                +'<input name="property" id="sheet_name" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox2" name="sort_range">'
                +'<span style="margin-top:10px;">Sort Range</span></div>'
                +'<input name="property" id="sort_range" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox3" name="sort_column">'
                +'<span style="margin-top:10px;">Sort Column</span></div>'
                +'<input name="property" id="sort_column" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox4" name="order_method">'
                +'<span style="margin-top:10px;">Order Method</span></div>'
                +'<select name="property" id="order_method" style="width:98%">'
                +'<option value ="1" selected="selected">Positive Order</option>'
                +'<option value ="2">Inverted Order</option>'
                +'</select>'
                +'<div><input type="checkbox" id="checkbox5" name="excel_active">'
                +'<span style="margin-top:10px;">Active</span></div>'
                +'<select name="property" id="excel_active" style="width:98%">'
                +'<option value ="yes" selected="selected">Yes</option>'
                +'<option value ="no">No</option>'
                +'</select>'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
    }else if(variant == "Read_Cell"){
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="sheet_name">'
                +'<span style="margin-top:10px;">Sheet Name</span></div>'
                +'<input name="property" id="sheet_name" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox2" name="selected_cell">'
                +'<span style="margin-top:10px;">Cell</span></div>'
                +'<input name="property" id="selected_cell" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox3" name="decimal_digits">'
                +'<span style="margin-top:10px;">Decimal Digits</span>'
                +'<select name="property" id="decimal_digits" style="width:98%">'
                +'<option value ="0" selected="selected">0</option>'
                +'<option value ="1">1</option>'
                +'<option value ="2">2</option>'
                +'<option value ="3">3</option>'
                +'<option value ="4">4</option>'
                +'<option value ="5">5</option>'
                +'</select>'
                +'<div><input type="checkbox" id="checkbox4" name="excel_active">'
                +'<span style="margin-top:10px;">Active</span></div>'
                +'<select name="property" id="excel_active" style="width:98%">'
                +'<option value ="yes" selected="selected">Yes</option>'
                +'<option value ="no">No</option>'
                +'</select>'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
    }else if(variant == "Write_Cell"){
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="sheet_name">'
                +'<span style="margin-top:10px;">Sheet Name</span></div>'
                +'<input name="property" id="sheet_name" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox2" name="selected_cell">'
                +'<span style="margin-top:10px;">Cell</span></div>'
                +'<input name="property" id="selected_cell" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox3" name="excel_active">'
                +'<span style="margin-top:10px;">Active</span></div>'
                +'<select name="property" id="excel_active" style="width:98%">'
                +'<option value ="yes" selected="selected">Yes</option>'
                +'<option value ="no">No</option>'
                +'</select>'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
    }else if(variant == "Image_Cell"){
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="sheet_name">'
                +'<span style="margin-top:10px;">Sheet Name</span></div>'
                +'<input name="property" id="sheet_name" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox2" name="image_path">'
                +'<span style="margin-top:10px;">Image Path</span></div>'
                +'<input name="property" id="image_path" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox3" name="selected_cell">'
                +'<span style="margin-top:10px;">Start Cell</span></div>'
                +'<input name="property" id="selected_cell" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox4" name="img_width">'
                +'<span style="margin-top:10px;">Width</span></div>'
                +'<input name="property" id="img_width" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox5" name="img_height">'
                +'<span style="margin-top:10px;">Height</span></div>'
                +'<input name="property" id="img_height" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox6" name="excel_active">'
                +'<span style="margin-top:10px;">Active</span></div>'
                +'<select name="property" id="excel_active" style="width:98%">'
                +'<option value ="yes" selected="selected">Yes</option>'
                +'<option value ="no">No</option>'
                +'</select>'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
    }else if(variant == "Insert"){
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="sheet_name">'
                +'<span style="margin-top:10px;">Sheet Name</span></div>'
                +'<input name="property" id="sheet_name" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox2" name="selected_cells">'
                +'<span style="margin-top:10px;">Rows(1:2)/Columns(A:B)</span></div>'
                +'<input name="property" id="selected_cells" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox3" name="insert_type">'
                +'<span style="margin-top:10px;">Columns/Rows</span>'
                +'<select name="property" id="insert_type" style="width:98%">'
                +'<option value ="columns" selected="selected">Columns</option>'
                +'<option value ="rows">Rows</option>'
                +'</select>'
                +'<div><input type="checkbox" id="checkbox4" name="excel_active">'
                +'<span style="margin-top:10px;">Active</span></div>'
                +'<select name="property" id="excel_active" style="width:98%">'
                +'<option value ="yes" selected="selected">Yes</option>'
                +'<option value ="no">No</option>'
                +'</select>'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
    }else if(variant == "Auto_Fit"){
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="sheet_name">'
                +'<span style="margin-top:10px;">Sheet Name</span></div>'
                +'<input name="property" id="sheet_name" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox2" name="fit_type">'
                +'<span style="margin-top:10px;">Fit Type</span></div>'
                +'<select name="property" id="fit_type" style="width:98%">'
                +'<option value ="Columns" selected="selected">Columns</option>'
                +'<option value ="Rows">Rows</option>'
                +'</select>'
                +'<div><input type="checkbox" id="checkbox3" name="selected_cells">'
                +'<span style="margin-top:10px;">Rows(1:2)/Columns(A:B)</span></div>'
                +'<input name="property" id="selected_cells" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox4" name="excel_active">'
                +'<span style="margin-top:10px;">Active</span></div>'
                +'<select name="property" id="excel_active" style="width:98%">'
                +'<option value ="yes" selected="selected">Yes</option>'
                +'<option value ="no">No</option>'
                +'</select>'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
    }else if(variant == "Select_Excel"){
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="chosen_excel">'
                +'<span style="margin-top:10px;">Chosen Excel</span></div>'
                +'<input name="property" id="chosen_excel" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox2" name="chosen_excel">'
                +'<span style="margin-top:10px;">Chosen Sheet</span></div>'
                +'<input name="property" id="chosen_sheet" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox3" name="chosen_excel">'
                +'<span style="margin-top:10px;">Chosen Cell</span></div>'
                +'<input name="property" id="chosen_cell" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
    }else if(variant == "Format"){
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="sheet_name">'
                +'<span style="margin-top:10px;">Sheet Name</span></div>'
                +'<input name="property" id="sheet_name" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox2" name="selected_cells">'
                +'<span style="margin-top:10px;">Range(Row 1:1,Column A:A)</span></div>'
                +'<input name="property" id="selected_cells" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox3" name="font_size">'
                +'<span style="margin-top:10px;">Font Size</span></div>'
                +'<input name="property" id="font_size" style="width:98%" autocomplete="off" value="10">'
                +'<div><input type="checkbox" id="checkbox4" name="font_name">'
                +'<span style="margin-top:10px;">Font Name</span></div>'
                +'<input name="property" id="font_name" style="width:98%" autocomplete="off" value="Arial">'
                +'<div><input type="checkbox" id="checkbox5" name="font_bold">'
                +'<span style="margin-top:10px;">Font Bold</span></div>'
                +'<select name="property" id="font_bold" style="width:98%">'
                +'<option value ="False" selected="selected">False</option>'
                +'<option value ="True">True</option>'
                +'</select>'
                +'<div><input type="checkbox" id="checkbox6" name="font_italic">'
                +'<span style="margin-top:10px;">Font Italic</span></div>'
                +'<select name="property" id="font_italic" style="width:98%">'
                +'<option value ="False" selected="selected">False</option>'
                +'<option value ="True">True</option>'
                +'</select>'
                +'<div><input type="checkbox" id="checkbox7" name="font_underline">'
                +'<span style="margin-top:10px;">Font Underline</span></div>'
                +'<select name="property" id="font_underline" style="width:98%">'
                +'<option value ="-4142" selected="selected">False</option>'
                +'<option value ="2">True</option>'
                +'</select>'
                +'<div><input type="checkbox" id="checkbox8" name="vertical_alignment">'
                +'<span style="margin-top:10px;">Vertical Alignment</span></div>'
                +'<select name="property" id="vertical_alignment" style="width:98%">'
                +'<option value ="" selected="selected"></option>'
                +'<option value ="-4160">Top</option>'
                +'<option value ="-4108">Center</option>'
                +'<option value ="-4107">Bottom</option>'
                +'</select>'
                +'<div><input type="checkbox" id="checkbox9" name="horizontal_alignment">'
                +'<span style="margin-top:10px;">Horizontal Alignment</span></div>'
                +'<select name="property" id="horizontal_alignment" style="width:98%">'
                +'<option value ="" selected="selected"></option>'
                +'<option value ="-4131">Left</option>'
                +'<option value ="-4108">Center</option>'
                +'<option value ="-4152">Right</option>'
                +'</select>'
                +'<div><input type="checkbox" id="checkbox10" name="number_format">'
                +'<span style="margin-top:10px;">Number Format</span></div>'
                +'<select name="property" id="number_format" style="width:98%">'
                +'<option value ="" selected="selected"></option>'
                +'<option value ="General">General</option>'
                +'<option value ="Number">Number</option>'
                +'</select>'
                +'<div><input type="checkbox" id="checkbox11" name="decimal_digits">'
                +'<span style="margin-top:10px;">Decimal Digits</span></div>'
                +'<select name="property" id="decimal_digits" style="width:98%">'
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
                +'</select>'
                +'<div><input type="checkbox" id="checkbox12" name="background_color">'
                +'<span style="margin-top:10px;">Background Color(R,G,B)</span></div>'
                +'<input name="property" id="background_color" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox13" name="font_color">'
                +'<span style="margin-top:10px;">Font Color(R,G,B)</span></div>'
                +'<input name="property" id="font_color" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox14" name="range_width">'
                +'<span style="margin-top:10px;">Width</span></div>'
                +'<input name="property" id="range_width" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox15" name="range_height">'
                +'<span style="margin-top:10px;">Height</span></div>'
                +'<input name="property" id="range_height" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox16" name="excel_active">'
                +'<span style="margin-top:10px;">Active</span></div>'
                +'<select name="property" id="excel_active" style="width:98%">'
                +'<option value ="yes" selected="selected">Yes</option>'
                +'<option value ="no">No</option>'
                +'</select>'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="access_path">'
                +'<span style="margin-top:10px;">Access Path</span></div>'
                +'<input name="property" id="access_path" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox2" name="table_name">'
                +'<span style="margin-top:10px;">Table Name</span></div>'
                +'<input name="property" id="table_name" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox3" name="update_column">'
                +'<span style="margin-top:10px;">Update Columns(col1,col2)</span></div>'
                +'<input name="property" id="update_column" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox4" name="update_result">'
                +'<span style="margin-top:10px;">Update Result(res1,res2)</span></div>'
                +'<input name="property" id="update_result" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox5" name="update_type">'
                +'<span style="margin-top:10px;">Result Type</span></div>'
                +'<select name="property" id="update_type" style="width:98%">'
                +'<option value ="variant" selected="selected">Variant</option>'
                +'<option value ="string">String</option>'
                +'</select>'
                +'<div><input type="checkbox" id="checkbox6" name="where_column">'
                +'<span style="margin-top:10px;">Where Columns(col1,col2)</span></div>'
                +'<input name="property" id="where_column" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox7" name="where_result">'
                +'<span style="margin-top:10px;">Where Condition(con1,con2)</span></div>'
                +'<input name="property" id="where_result" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox8" name="where_type">'
                +'<span style="margin-top:10px;">Condition Type</span></div>'
                +'<select name="property" id="where_type" style="width:98%">'
                +'<option value ="variant">Variant</option>'
                +'<option value ="string" selected="selected">String</option>'
                +'</select>'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="access_path">'
                +'<span style="margin-top:10px;">Access Path</span></div>'
                +'<input name="property" id="access_path" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox2" name="table_name">'
                +'<span style="margin-top:10px;">Table Name</span></div>'
                +'<input name="property" id="table_name" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox3" name="insert_column">'
                +'<span style="margin-top:10px;">Insert Columns(col1,col2)</span></div>'
                +'<input name="property" id="insert_column" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox4" name="insert_result">'
                +'<span style="margin-top:10px;">Insert Result(res1,res2)</span></div>'
                +'<input name="property" id="insert_result" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox5" name="insert_type">'
                +'<span style="margin-top:10px;">Result Type</span></div>'
                +'<select name="property" id="insert_type" style="width:98%">'
                +'<option value ="variant" selected="selected">Variant</option>'
                +'<option value ="string">String</option>'
                +'</select>'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="access_path">'
                +'<span style="margin-top:10px;">Access Path</span></div>'
                +'<input name="property" id="access_path" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox2" name="table_name">'
                +'<span style="margin-top:10px;">Table Name</span></div>'
                +'<input name="property" id="table_name" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox3" name="where_column">'
                +'<span style="margin-top:10px;">Where Columns(col1,col2)</span></div>'
                +'<input name="property" id="where_column" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox4" name="where_result">'
                +'<span style="margin-top:10px;">Condition Result(res1,res2)</span></div>'
                +'<input name="property" id="where_result" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox5" name="where_type">'
                +'<span style="margin-top:10px;">Condition Type</span></div>'
                +'<select name="property" id="where_type" style="width:98%">'
                +'<option value ="variant" selected="selected">Variant</option>'
                +'<option value ="string">String</option>'
                +'</select>'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="access_path">'
                +'<span style="margin-top:10px;">Access Path</span></div>'
                +'<input name="property" id="access_path" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox2" name="table_name">'
                +'<span style="margin-top:10px;">Table Name</span></div>'
                +'<input name="property" id="table_name" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox3" name="select_column">'
                +'<span style="margin-top:10px;">Select Columns(col1,col2)</span></div>'
                +'<input name="property" id="select_column" style="width:98%" autocomplete="off" value="*">'
                +'<div><input type="checkbox" id="checkbox4" name="where_column">'
                +'<span style="margin-top:10px;">Where Columns(col1,col2)</span></div>'
                +'<input name="property" id="where_column" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox5" name="where_result">'
                +'<span style="margin-top:10px;">Where Condition(con1,con2)</span></div>'
                +'<input name="property" id="where_result" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox6" name="where_type">'
                +'<span style="margin-top:10px;">Condition Type</span></div>'
                +'<select name="property" id="where_type" style="width:98%">'
                +'<option value ="variant">Variant</option>'
                +'<option value ="string" selected="selected">String</option>'
                +'</select>'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="access_path">'
                +'<span style="margin-top:10px;">Access Path</span></div>'
                +'<input name="property" id="access_path" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox2" name="self_sql">'
                +'<span style="margin-top:10px;">SQL</span></div>'
                +'<textarea name="property" id="self_sql" style="width:98%;height:60px;" autocomplete="off"></textarea>'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
    }else if(variant == "Start_SAP"){
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="sap_exe_path">'
                +'<span style="margin-top:10px;">SAP EXE Path</span></div>'
                +'<input name="property" id="sap_exe_path" style="width:98%" value="C:/Program Files (x86)/SAP/FrontEnd/SAPgui/saplogon.exe" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox2" name="server_name">'
                +'<span style="margin-top:10px;">Server Name</span></div>'
                +'<input name="property" id="server_name" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
    }else if(variant == "Login_SAP"){
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="client">'
                +'<span style="margin-top:10px;">Client</span></div>'
                +'<input name="property" id="client" style="width:98%" value="500" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox2" name="user_name">'
                +'<span style="margin-top:10px;">User Name</span></div>'
                +'<input name="property" id="user_name" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox3" name="password">'
                +'<span style="margin-top:10px;">Password</span></div>'
                +'<input type="password" name="property" id="password" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox4" name="language">'
                +'<span style="margin-top:10px;">Language</span></div>'
                +'<input name="property" id="language" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
    }else if(variant == "T_Code"){
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="new_window">'
                +'<span style="margin-top:10px;">New Window</span></div>'
                +'<select name="property" id="new_window" style="width:98%">'
                +'<option value ="yes">Yes</option>'
                +'<option value ="no" selected="selected">No</option>'
                +'</select>'
                +'<div><input type="checkbox" id="checkbox2" name="sap_window">'
                +'<span style="margin-top:10px;">SAP Window</span></div>'
                +'<select name="property" id="sap_window" style="width:98%">'
                +'<option value ="1" selected="selected">1</option>'
                +'<option value ="2">2</option>'
                +'<option value ="3">3</option>'
                +'<option value ="4">4</option>'
                +'<option value ="5">5</option>'
                +'</select>'
                +'<div><input type="checkbox" id="checkbox3" name="t_code">'
                +'<span style="margin-top:10px;">T Code</span></div>'
                +'<input name="property" id="t_code" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox4" name="sap_active">'
                +'<span style="margin-top:10px;">Active</span></div>'
                +'<select name="property" id="sap_active" style="width:98%">'
                +'<option value ="yes" selected="selected">Yes</option>'
                +'<option value ="no">No</option>'
                +'</select>'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
    }else if(variant == "SAP_Input"){
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="find_method">'
                +'<span style="margin-top:10px;">Find Method</span></div>'
                +'<select name="property" id="find_method" style="width:98%">'
                +'<option value ="ID" selected="selected">ID</option>'
                +'</select>'
                +'<div><input type="checkbox" id="checkbox2" name="element_name">'
                +'<span style="margin-top:10px;">Element Property</span><i class="icon-target" onclick="target()"></i></div>'
                +'<input name="property" id="element_name" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox3" name="send_content">'
                +'<span style="margin-top:10px;">Content</span></div>'
                +'<input name="property" id="send_content" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox4" name="replace_slash">'
                +'<span style="margin-top:10px;">Replace Slash</span></div>'
                +'<select name="property" id="replace_slash" style="width:98%">'
                +'<option value ="yes" selected="selected">Yes</option>'
                +'<option value ="no">No</option>'
                +'</select>'
                +'<div><input type="checkbox" id="checkbox5" name="sap_active">'
                +'<span style="margin-top:10px;">Active</span></div>'
                +'<select name="property" id="sap_active" style="width:98%">'
                +'<option value ="yes" selected="selected">Yes</option>'
                +'<option value ="no">No</option>'
                +'</select>'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
    }else if(variant == "SAP_Send_VKey" || variant == "SAP_Press_Toolbar" || variant == "SAP_Select_Context"){
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="find_method">'
                +'<span style="margin-top:10px;">Find Method</span></div>'
                +'<select name="property" id="find_method" style="width:98%">'
                +'<option value ="ID" selected="selected">ID</option>'
                +'</select>'
                +'<div><input type="checkbox" id="checkbox2" name="element_name">'
                +'<span style="margin-top:10px;">Element Property</span><i class="icon-target" onclick="target()"></i></div>'
                +'<input name="property" id="element_name" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox3" name="send_content">'
                +'<span style="margin-top:10px;">Content</span></div>'
                +'<input name="property" id="send_content" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox4" name="sap_active">'
                +'<span style="margin-top:10px;">Active</span></div>'
                +'<select name="property" id="sap_active" style="width:98%">'
                +'<option value ="yes" selected="selected">Yes</option>'
                +'<option value ="no">No</option>'
                +'</select>'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
    }else if(variant == "SAP_SelectItem" || variant == "SAP_EnsureVisibleHorizontalItem" || variant == "SAP_DoubleClickItem" || variant == "SAP_PressToolbarContextButton" || variant == "SAP_SelectContextMenuItem"){
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="find_method">'
                +'<span style="margin-top:10px;">Find Method</span></div>'
                +'<select name="property" id="find_method" style="width:98%">'
                +'<option value ="ID" selected="selected">ID</option>'
                +'</select>'
                +'<div><input type="checkbox" id="checkbox2" name="element_name">'
                +'<span style="margin-top:10px;">Element Property</span><i class="icon-target" onclick="target()"></i></div>'
                +'<input name="property" id="element_name" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox3" name="send_content">'
                +'<span style="margin-top:10px;">Content</span></div>'
                +'<input name="property" id="send_content" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox4" name="sap_active">'
                +'<span style="margin-top:10px;">Active</span></div>'
                +'<select name="property" id="sap_active" style="width:98%">'
                +'<option value ="yes" selected="selected">Yes</option>'
                +'<option value ="no">No</option>'
                +'</select>'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
    }else if(variant == "SAP_Vertical_Scrollbar"){
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="find_method">'
                +'<span style="margin-top:10px;">Find Method</span></div>'
                +'<select name="property" id="find_method" style="width:98%">'
                +'<option value ="ID" selected="selected">ID</option>'
                +'</select>'
                +'<div><input type="checkbox" id="checkbox2" name="element_name">'
                +'<span style="margin-top:10px;">Element Property</span><i class="icon-target" onclick="target()"></i></div>'
                +'<input name="property" id="element_name" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox3" name="scroll_position">'
                +'<span style="margin-top:10px;">Position</span></div>'
                +'<input name="property" id="scroll_position" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox4" name="sap_active">'
                +'<span style="margin-top:10px;">Active</span></div>'
                +'<select name="property" id="sap_active" style="width:98%">'
                +'<option value ="yes" selected="selected">Yes</option>'
                +'<option value ="no">No</option>'
                +'</select>'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="find_method">'
                +'<span style="margin-top:10px;">Find Method</span></div>'
                +'<select name="property" id="find_method" style="width:98%">'
                +'<option value ="ID" selected="selected">ID</option>'
                +'</select>'
                +'<div><input type="checkbox" id="checkbox2" name="element_name">'
                +'<span style="margin-top:10px;">Element Property</span><i class="icon-target" onclick="target()"></i></div>'
                +'<input name="property" id="element_name" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox3" name="sap_active">'
                +'<span style="margin-top:10px;">Active</span></div>'
                +'<select name="property" id="sap_active" style="width:98%">'
                +'<option value ="yes" selected="selected">Yes</option>'
                +'<option value ="no">No</option>'
                +'</select>'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
    }else if(variant == "SAP_Click" || variant == "SAP_Select" || variant == "SAP_Focus" || variant == "Click_Current_Cell" || variant == "SAP_Cancel_Select" || variant == "SAP_Selected" || variant == "SAP_Get_Text"){
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="find_method">'
                +'<span style="margin-top:10px;">Find Method</span></div>'
                +'<select name="property" id="find_method" style="width:98%">'
                +'<option value ="ID" selected="selected">ID</option>'
                +'</select>'
                +'<div><input type="checkbox" id="checkbox2" name="element_name">'
                +'<span style="margin-top:10px;">Element Property</span><i class="icon-target" onclick="target()"></i></div>'
                +'<input name="property" id="element_name" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox3" name="sap_active">'
                +'<span style="margin-top:10px;">Active</span></div>'
                +'<select name="property" id="sap_active" style="width:98%">'
                +'<option value ="yes" selected="selected">Yes</option>'
                +'<option value ="no">No</option>'
                +'</select>'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
    }else if(variant == "Expand_Node" || variant == "Select_Node" || variant == "Selected_Node" || variant == "Top_Node" || variant == "Double_Click_Node"){
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="find_method">'
                +'<span style="margin-top:10px;">Find Method</span></div>'
                +'<select name="property" id="find_method" style="width:98%">'
                +'<option value ="ID" selected="selected">ID</option>'
                +'</select>'
                +'<div><input type="checkbox" id="checkbox2" name="element_name">'
                +'<span style="margin-top:10px;">Element Property</span><i class="icon-target" onclick="target()"></i></div>'
                +'<input name="property" id="element_name" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox3" name="select_node">'
                +'<span style="margin-top:10px;">Node No</span></div>'
                +'<input name="property" id="select_node" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox4" name="sap_active">'
                +'<span style="margin-top:10px;">Active</span></div>'
                +'<select name="property" id="sap_active" style="width:98%">'
                +'<option value ="yes" selected="selected">Yes</option>'
                +'<option value ="no">No</option>'
                +'</select>'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
    }else if(variant == "Caret_Position"){
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="find_method">'
                +'<span style="margin-top:10px;">Find Method</span></div>'
                +'<select name="property" id="find_method" style="width:98%">'
                +'<option value ="ID" selected="selected">ID</option>'
                +'</select>'
                +'<div><input type="checkbox" id="checkbox2" name="element_name">'
                +'<span style="margin-top:10px;">Element Property</span><i class="icon-target" onclick="target()"></i></div>'
                +'<input name="property" id="element_name" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox3" name="select_position">'
                +'<span style="margin-top:10px;">Position</span></div>'
                +'<input name="property" id="select_position" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox4" name="sap_active">'
                +'<span style="margin-top:10px;">Active</span></div>'
                +'<select name="property" id="sap_active" style="width:98%">'
                +'<option value ="yes" selected="selected">Yes</option>'
                +'<option value ="no">No</option>'
                +'</select>'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="find_method">'
                +'<span style="margin-top:10px;">Find Method</span></div>'
                +'<select name="property" id="find_method" style="width:98%">'
                +'<option value ="ID" selected="selected">ID</option>'
                +'</select>'
                +'<div><input type="checkbox" id="checkbox2" name="element_name">'
                +'<span style="margin-top:10px;">Element Property</span><i class="icon-target" onclick="target()"></i></div>'
                +'<input name="property" id="element_name" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox3" name="sap_key">'
                +'<span style="margin-top:10px;">Key</span></div>'
                +'<input name="property" id="sap_key" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox4" name="sap_active">'
                +'<span style="margin-top:10px;">Active</span></div>'
                +'<select name="property" id="sap_active" style="width:98%">'
                +'<option value ="yes" selected="selected">Yes</option>'
                +'<option value ="no">No</option>'
                +'</select>'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
    }else if(variant == "SAP_Table_Rows"){
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="initial_row">'
                +'<span style="margin-top:10px;">Initial Row</span></div>'
                +'<input name="property" id="initial_row" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox2" name="dynamic_var">'
                +'<span style="margin-top:10px;">Dynamic Variant</span></div>'
                +'<input name="property" id="dynamic_var" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox3" name="find_method">'
                +'<span style="margin-top:10px;">Find Method</span></div>'
                +'<select name="property" id="find_method" style="width:98%">'
                +'<option value ="ID" selected="selected">ID</option>'
                +'</select>'
                +'<div><input type="checkbox" id="checkbox4" name="element_name">'
                +'<span style="margin-top:10px;">Element Property</span><i class="icon-target" onclick="target()"></i></div>'
                +'<input name="property" id="element_name" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox5" name="sap_active">'
                +'<span style="margin-top:10px;">Active</span></div>'
                +'<select name="property" id="sap_active" style="width:98%">'
                +'<option value ="yes" selected="selected">Yes</option>'
                +'<option value ="no">No</option>'
                +'</select>'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
    }else if(variant == "SAP_Node_Rows"){
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="initial_node">'
                +'<span style="margin-top:10px;">Initial Node</span></div>'
                +'<input name="property" id="initial_node" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox2" name="find_method">'
                +'<span style="margin-top:10px;">Find Method</span></div>'
                +'<select name="property" id="find_method" style="width:98%">'
                +'<option value ="ID" selected="selected">ID</option>'
                +'</select>'
                +'<div><input type="checkbox" id="checkbox3" name="element_name">'
                +'<span style="margin-top:10px;">Element Property</span><i class="icon-target" onclick="target()"></i></div>'
                +'<input name="property" id="element_name" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox4" name="sap_active">'
                +'<span style="margin-top:10px;">Active</span></div>'
                +'<select name="property" id="sap_active" style="width:98%">'
                +'<option value ="yes" selected="selected">Yes</option>'
                +'<option value ="no">No</option>'
                +'</select>'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
    }else if(variant == "Select_Rows" || variant == "SAP_Get_Absolute_Row"){
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="find_method">'
                +'<span style="margin-top:10px;">Find Method</span></div>'
                +'<select name="property" id="find_method" style="width:98%">'
                +'<option value ="ID" selected="selected">ID</option>'
                +'</select>'
                +'<div><input type="checkbox" id="checkbox2" name="element_name">'
                +'<span style="margin-top:10px;">Element Property</span><i class="icon-target" onclick="target()"></i></div>'
                +'<input name="property" id="element_name" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox3" name="select_row">'
                +'<span style="margin-top:10px;">Select Row</span></div>'
                +'<input name="property" id="select_row" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox4" name="sap_active">'
                +'<span style="margin-top:10px;">Active</span></div>'
                +'<select name="property" id="sap_active" style="width:98%">'
                +'<option value ="yes" selected="selected">Yes</option>'
                +'<option value ="no">No</option>'
                +'</select>'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="element_id">'
                +'<span style="margin-top:10px;">Element ID</span><span style="padding:2px;"><i class="icon-target" onclick="target()"></i></span></div>'
                +'<input name="property" id="element_id" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
    }else if(variant == "SAP_Set_Current_Cell"){
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="find_method">'
                +'<span style="margin-top:10px;">Find Method</span></div>'
                +'<select name="property" id="find_method" style="width:98%">'
                +'<option value ="ID" selected="selected">ID</option>'
                +'</select>'
                +'<div><input type="checkbox" id="checkbox2" name="element_name">'
                +'<span style="margin-top:10px;">Element Property</span><i class="icon-target" onclick="target()"></i></div>'
                +'<input name="property" id="element_name" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox3" name="cell_no">'
                +'<span style="margin-top:10px;">Cell No</span></div>'
                +'<input name="property" id="cell_no" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox4" name="format">'
                +'<span style="margin-top:10px;">Format</span></div>'
                +'<input name="property" id="format" style="width:98%" autocomplete="off" value="TEXT">'
                +'<div><input type="checkbox" id="checkbox5" name="sap_active">'
                +'<span style="margin-top:10px;">Active</span></div>'
                +'<select name="property" id="sap_active" style="width:98%">'
                +'<option value ="yes" selected="selected">Yes</option>'
                +'<option value ="no">No</option>'
                +'</select>'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
    }else if(variant == "SAP_First_Visible_Row"){
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="find_method">'
                +'<span style="margin-top:10px;">Find Method</span></div>'
                +'<select name="property" id="find_method" style="width:98%">'
                +'<option value ="ID" selected="selected">ID</option>'
                +'</select>'
                +'<div><input type="checkbox" id="checkbox2" name="element_name">'
                +'<span style="margin-top:10px;">Element Property</span><i class="icon-target" onclick="target()"></i></div>'
                +'<input name="property" id="element_name" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox3" name="row_no">'
                +'<span style="margin-top:10px;">Row No</span></div>'
                +'<input name="property" id="row_no" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox4" name="sap_active">'
                +'<span style="margin-top:10px;">Active</span></div>'
                +'<select name="property" id="sap_active" style="width:98%">'
                +'<option value ="yes" selected="selected">Yes</option>'
                +'<option value ="no">No</option>'
                +'</select>'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="email_account">'
                +'<span style="margin-top:10px;">Account</span></div>'
                +'<input name="property" id="email_account" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox2" name="email_password">'
                +'<span style="margin-top:10px;">Password</span></div>'
                +'<input type="password" name="property" id="email_password" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox3" name="smtp_server">'
                +'<span style="margin-top:10px;">SMTP Server</span></div>'
                +'<input name="property" id="smtp_server" style="width:98%" value="10.190.2.136" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox4" name="mail_title">'
                +'<span style="margin-top:10px;">Title</span></div>'
                +'<input name="property" id="mail_title" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox5" name="receive_list">'
                +'<span style="margin-top:10px;">Receive</span></div>'
                +'<input name="property" id="receive_list" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox6" name="cc_mail_list">'
                +'<span style="margin-top:10px;">CC</span></div>'
                +'<input name="property" id="cc_mail_list" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox7" name="bcc_list">'
                +'<span style="margin-top:10px;">BCC</span></div>'
                +'<input name="property" id="bcc_list" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox8" name="attach_file">'
                +'<span style="margin-top:10px;">Attached File</span></div>'
                +'<input name="property" id="attach_file" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox9" name="mail_content">'
                +'<span style="margin-top:10px;">Content</span></div>'
                +'<textarea name="property" id="mail_content" style="width:98%;height:60px;" autocomplete="off"></textarea>'
                +'<div><input type="checkbox" id="checkbox10" name="mail_signature">'
                +'<span style="margin-top:10px;">Signature</span></div>'
                +'<textarea name="property" id="mail_signature" style="width:98%;height:60px;" autocomplete="off"></textarea>'
                +'<div><input type="checkbox" id="checkbox11" name="attach_image">'
                +'<span style="margin-top:10px;">Attached Picture</span></div>'
                +'<input name="property" id="attach_image" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox12" name="showed_pictures">'
                +'<span style="margin-top:10px;">Pictures(showed in content)</span></div>'
                +'<input name="property" id="showed_pictures" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox13" name="picture_position">'
                +'<span style="margin-top:10px;">Picture Position</span></div>'
                +'<select name="property" id="picture_position" style="width:98%">'
                +'<option value ="up" selected="selected">Up</option>'
                +'<option value ="down">Down</option>'
                +'</select>'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="for_range">'
                +'<span style="margin-top:10px;">Range</span></div>'
                +'<input name="property" id="for_range" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox2" name="for_variant">'
                +'<span style="margin-top:10px;">Variant</span></div>'
                +'<input name="property" id="for_variant" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox3" name="initial_value">'
                +'<span style="margin-top:10px;">Initial Value</span></div>'
                +'<input name="property" id="initial_value" style="width:98%" value="0" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox4" name="for_step">'
                +'<span style="margin-top:10px;">Step</span></div>'
                +'<input name="property" id="for_step" style="width:98%" value="1" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox5" name="for_type">'
                +'<span style="margin-top:10px;">Type</span></div>'
                +'<select name="property" id="for_type" style="width:98%">'
                +'<option value ="string" selected="selected">String</option>'
                +'<option value ="number">Number</option>'
                +'</select>'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="while_condition">'
                +'<span style="margin-top:10px;">Condition</span></div>'
                +'<input name="property" id="while_condition" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox2" name="while_code">'
                +'<span style="margin-top:10px;">Code</span></div>'
                +'<input name="property" id="while_code" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="if_condition">'
                +'<span style="margin-top:10px;">Condition</span></div>'
                +'<input name="property" id="if_condition" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="screen_width">'
                +'<span style="margin-top:10px;">Width Variant</span></div>'
                +'<input name="property" id="screen_width" style="width:98%" value="width" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox2" name="screen_height">'
                +'<span style="margin-top:10px;">Height Variant</span></div>'
                +'<input name="property" id="screen_height" style="width:98%" value="height" autocomplete="off">'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="x_axis">'
                +'<span style="margin-top:10px;">X-axis</span></div>'
                +'<input name="property" id="x_axis" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox2" name="y_axis">'
                +'<span style="margin-top:10px;">Y-axis</span></div>'
                +'<input name="property" id="y_axis" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox3" name="duration_s">'
                +'<span style="margin-top:10px;">Duration</span></div>'
                +'<input name="property" id="duration_s" style="width:98%" value="0.25" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox4" name="move_type">'
                +'<span style="margin-top:10px;">Type</span></div>'
                +'<select name="property" id="move_type" style="width:98%">'
                +'<option value ="moveTo" selected="selected">Absolute</option>'
                +'<option value ="moveRel">Relative</option>'
                +'</select>'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="click_option">'
                +'<span style="margin-top:10px;">Click Option</span></div>'
                +'<select name="property" id="click_option" style="width:98%">'
                +'<option value ="left" selected="selected">Left</option>'
                +'<option value ="middle">Middle</option>'
                +'<option value ="right">Right</option>'
                +'<option value ="double">Double Chick</option>'
                +'</select>'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="scroll_units">'
                +'<span style="margin-top:10px;">Units</span></div>'
                +'<input name="property" id="scroll_units" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="x_axis">'
                +'<span style="margin-top:10px;">X-axis</span></div>'
                +'<input name="property" id="x_axis" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox2" name="y_axis">'
                +'<span style="margin-top:10px;">Y-axis</span></div>'
                +'<input name="property" id="y_axis" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox3" name="duration_s">'
                +'<span style="margin-top:10px;">Duration</span></div>'
                +'<input name="property" id="duration_s" style="width:98%" value="2" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox4" name="drag_type">'
                +'<span style="margin-top:10px;">Type</span></div>'
                +'<select name="property" id="drag_type" style="width:98%">'
                +'<option value ="dragTo" selected="selected">Absolute</option>'
                +'<option value ="dragRel">Relative</option>'
                +'</select>'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
    }else if(variant == "Press_Keyboard" || variant == "Hot_Key"){
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="press_keys">'
                +'<span style="margin-top:10px;">Keys</span></div>'
                +'<input name="property" id="press_keys" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="write_content">'
                +'<span style="margin-top:10px;">Content</span></div>'
                +'<input name="property" id="write_content" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox2" name="duration_s">'
                +'<span style="margin-top:10px;">Duration</span></div>'
                +'<input name="property" id="duration_s" style="width:98%" value="0.5" autocomplete="off">'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="window_title">'
                +'<span style="margin-top:10px;">Window Title</span></div>'
                +'<input name="property" id="window_title" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox2" name="save_path">'
                +'<span style="margin-top:10px;">Save Path</span></div>'
                +'<input name="property" id="save_path" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" value="root" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<span style="margin-top:10px;">Variant</span>'
                +'<input name="property" id="fun_variant" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" value="root" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<span style="margin-top:10px;">Title</span>'
                +'<input name="property" id="focus_title" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" value="root" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<span style="margin-top:10px;">Year</span>'
                +'<select name="property" id="year_selection" style="width:98%">'
                +'<option value ="-5">5 years ago</option>'
                +'<option value ="-4">4 years ago</option>'
                +'<option value ="-3">3 years ago</option>'
                +'<option value ="-2">2 years ago</option>'
                +'<option value ="-1">1 year ago</option>'
                +'<option value ="0" selected="selected">current year</option>'
                +'<option value ="1">1 year later</option>'
                +'<option value ="2">2 year2 later</option>'
                +'<option value ="3">3 year2 later</option>'
                +'<option value ="4">4 year2 later</option>'
                +'<option value ="5">5 year2 later</option>'
                +'</select>'
                +'<span style="margin-top:10px;">Month</span>'
                +'<select name="property" id="month_selection" style="width:98%">'
                +'<option value ="-11">11 months ago</option>'
                +'<option value ="-10">10 months ago</option>'
                +'<option value ="-9">9 months ago</option>'
                +'<option value ="-8">8 months ago</option>'
                +'<option value ="-7">7 months ago</option>'
                +'<option value ="-6">6 months ago</option>'
                +'<option value ="-5">5 months ago</option>'
                +'<option value ="-4">4 months ago</option>'
                +'<option value ="-3">3 months ago</option>'
                +'<option value ="-2">2 months ago</option>'
                +'<option value ="-1">1 month ago</option>'
                +'<option value ="0" selected="selected">current month</option>'
                +'<option value ="1">1 month later</option>'
                +'<option value ="2">2 month2 later</option>'
                +'<option value ="3">3 month2 later</option>'
                +'<option value ="4">4 month2 later</option>'
                +'<option value ="5">5 month2 later</option>'
                +'<option value ="6">6 month2 later</option>'
                +'<option value ="7">7 month2 later</option>'
                +'<option value ="8">8 month2 later</option>'
                +'<option value ="9">9 month2 later</option>'
                +'<option value ="10">10 month2 later</option>'
                +'<option value ="11">11 month2 later</option>'
                +'</select>'
                +'<span style="margin-top:10px;">Day</span>'
                +'<select name="property" id="day_selection" style="width:98%">'
                +'<option value ="-1">first day</option>'
                +'<option value ="0" selected="selected">today</option>'
                +'<option value ="1">last day</option>'
                +'</select>'
                +'<span style="margin-top:10px;">Format</span>'
                +'<input name="property" id="time_format" style="width:98%" autocomplete="off" value="%d.%m.%Y">'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" value="root" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<span style="margin-top:10px;">Variant</span>'
                +'<input name="property" id="self_variant" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" value="root" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
    }else if(variant == "Custom_Code"){
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<span style="margin-top:10px;">Custom Code</span>'
                +'<input name="property" id="self_code" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" value="root" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
    }else if(variant == "Reminder"){
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="used_variant">'
                +'<span style="margin-top:10px;">Variant</span>'
                +'<input name="property" id="used_variant" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox2" name="cal_divisor">'
                +'<span style="margin-top:10px;">Divisor</span>'
                +'<input name="property" id="cal_divisor" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" value="root" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<div><input type="checkbox" id="checkbox1" name="used_variant">'
                +'<span style="margin-top:10px;">Variant</span>'
                +'<input name="property" id="used_variant" style="width:98%" autocomplete="off">'
                +'<div><input type="checkbox" id="checkbox2" name="decimal_digits">'
                +'<span style="margin-top:10px;">Decimal Digits</span>'
                +'<select name="property" id="decimal_digits" style="width:98%">'
                +'<option value ="0" selected="selected">0</option>'
                +'<option value ="1">1</option>'
                +'<option value ="2">2</option>'
                +'<option value ="3">3</option>'
                +'<option value ="4">4</option>'
                +'<option value ="5">5</option>'
                +'</select>'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" value="root" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<span style="margin-top:10px;">Variant Name</span>'
                +'<input name="property" id="input_name" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" value="root" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
            var html = '<div id="property" style="height:100%;overflow:auto;overflow-x:hidden;"><span style="margin-top:10px;">Node No</span>'
                +'<input name="property" id="nodeNo" style="width:98%;">'
                +'<span style="margin-top:10px;">Last Node</span>'
                +'<input name="property" id="lastNode" style="width:98%">'
                +'<span style="margin-top:10px;">Next Node</span>'
                +'<input name="property" id="nextNode" style="width:98%">'
                +'<span style="margin-top:10px;">Node Name</span>'
                +'<input name="property" id="function" style="width:98%" disabled="false">'
                +'<span style="margin-top:10px;">Name</span>'
                +'<input name="property" id="name" style="width:98%" autocomplete="off" oninput="adjust('+"'"+id+"'"+')">'
                +'<span style="margin-top:10px;">Input</span>'
                +'<input name="property" id="input" style="width:98%" autocomplete="off">'
                +'<span style="margin-top:10px;">Output</span>'
                +'<input name="property" id="output" style="width:98%" autocomplete="off">'
                +'<button class="layui-btn layui-btn-sm" style="margin-top:10px;margin-left:10px" onclick="save('+"'"+id+"'"+')">Save</button>'
                +'<button class="layui-btn layui-btn-sm layui-btn-warm" style="margin-top:10px;margin-left:10px" onclick="cancel('+"'"+id+"'"+')">Cancel</button></div>'
            propertyArea.append(html);
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
    $("#name").bind("input propertychange",function(){
       alert($("#name").val());
    });
	document.getElementById("bg").style.display ="block";
}