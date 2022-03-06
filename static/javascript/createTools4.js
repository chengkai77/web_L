var message = ""
var display_style = ""
//var global_url = ""
//var global_width = ""
//var global_height = ""
var actions = {}
var img_style = "margin-left:5px;marginbottom:2px;width:width;height:height;"

function createParametersDom(id,dom, configurations) {
    // 每个DOM递归配置
    for (var config in configurations) {
        var configContent = configurations[config]
        // class类型用添加的方法
        if (config == "class" && configContent != "") {
            dom.addClass(configContent);
        // text类型
        } else if (config == "text" && configContent != "") {
            dom.html(gettext(configContent));
        // optionalValues不配置
        } else if (config == "optionalValues") {
            continue
        } else if (config == "src") {
            dom.attr(config, configContent);
        // placeholder属性, 要有翻译功能
        } else if (config == "placeholder" && configContent != "") {
            dom.attr(config, gettext(configContent));
        // 所有步骤描述增加"oninput","adjust("+id+")"，可以在连线时显示描述
        } else if (config == "oninput" && configContent != "") {
            if (id == "name"){
                dom.attr(config, "adjust('"+id+"')");
            }else{
                dom.attr(config, configContent);
            }
        // 其他属性
        } else if (configContent != "") {
            dom.attr(config, configContent);
        }
    }
    return dom
}

function createParametersHtml(id, variant, url, width, height) {
    // 参数动态生成方法
    actionParameters = actions[variant]
    var parameterDiv = $('<div></div>');
    parameterDiv.addClass('property')
    parameterDiv.attr('style','overflow:auto; overflow-x:hidden;');
    for (var key in actionParameters) {
        var parameterChildDiv = $('<div></div>');
        // 获取一个配置参数，需考虑以下8个配置
        oneParameter = actionParameters[key]
        // 父类参数框
        for (var dom in oneParameter) {
            domType = oneParameter[dom]
            if (dom == "structure") {
                // 主结构设置
                var structureConfigs = oneParameter[dom]
                structureConfigs.style = structureConfigs.style.replace("display_style",display_style)
                structureConfigs.style = structureConfigs.style.replace("block",display_style)
                structureConfigs.style = structureConfigs.style.replace("none",display_style)
                parameterChildDiv = createParametersDom(id,parameterChildDiv, structureConfigs)
            }
            if (dom == "required-icon") {
                // 必输设置
                var requiredIconConfigs = oneParameter[dom]
                var parameterRequiredIcon = $('<span></span>');
                parameterRequiredIcon.addClass('required-icon')
                parameterRequiredIcon = createParametersDom(id,parameterRequiredIcon, requiredIconConfigs)
                parameterChildDiv.append(parameterRequiredIcon)
            }
            if (dom == "checkbox") {
                // checkbox设置
                var checkBoxConfigs = oneParameter[dom]
                var parameterCheckBox = $('<input></input>');
                parameterCheckBox.attr("type","checkbox")
                parameterCheckBox = createParametersDom(id,parameterCheckBox, checkBoxConfigs)
                parameterChildDiv.append(parameterCheckBox)
            }
            if (dom == "title") {
                // 参数名设置
                var titleConfigs = oneParameter[dom]
                var parameterTitle = $('<span></span>');
                parameterTitle = createParametersDom(id,parameterTitle, titleConfigs)
                parameterChildDiv.append(parameterTitle)
            }
            if (dom == "colorpicker") {
                // 获取元素目标
                var color_pickerConfigs = oneParameter[dom]
                var parameter_color_picker = $('<div></div>');
                parameter_color_picker = createParametersDom(id,parameter_color_picker, color_pickerConfigs)
                parameterChildDiv.append(parameter_color_picker)
            }
            if (dom == "pencil") {
                // 获取元素目标
                var pencilConfigs = oneParameter[dom]
                var parameterPencil = $('<i></i>');
                parameterPencil = createParametersDom(id,parameterPencil, pencilConfigs)
                parameterChildDiv.append(parameterPencil)
            }
            if (dom == "custom_button") {
                // 获取元素目标
                var customButtonConfigs = oneParameter[dom]
                var parameterCustomButton = $('<i></i>');
                parameterCustomButton = createParametersDom(id,parameterCustomButton, customButtonConfigs)
                parameterChildDiv.append(parameterCustomButton)
            }
            if (dom == "add") {
                // 获取元素目标
                var addConfigs = oneParameter[dom]
                var parameterAdd = $('<i></i>');
                parameterAdd = createParametersDom(id,parameterAdd, addConfigs)
                parameterChildDiv.append(parameterAdd)
            }
            if (dom == "cancel") {
                // 获取元素目标
                var cancelConfigs = oneParameter[dom]
                var parameterCancel = $('<i></i>');
                parameterCancel = createParametersDom(id,parameterCancel, cancelConfigs)
                parameterChildDiv.append(parameterCancel)
            }
            if (dom == "img") {
                // 获取元素目标
                var imgConfigs = oneParameter[dom]
                var parameterImg = $('<img></img>');
                imgConfigs.src = url
                imgConfigs.style = img_style
                if (width != undefined) {
                    imgConfigs.style = imgConfigs.style.replace("width;",width + ";")
                    imgConfigs.style = imgConfigs.style.replace("height;",height + ";")
                }
                parameterImg = createParametersDom(id,parameterImg, imgConfigs)
                parameterChildDiv.append(parameterImg)
            }
            if (dom == "infoButton") {
                // 详情说明按钮设置
                var infoButtonConfigs = oneParameter[dom]
                var parameterInfoButton = $('<i></i>');
                parameterInfoButton = createParametersDom(id,parameterInfoButton, infoButtonConfigs)
                parameterChildDiv.append(parameterInfoButton)
            }
            if (dom == "input") {
                // 参数输入框设置
                var inputConfigs = oneParameter[dom]
                if (inputConfigs instanceof Array) {
                    for(let index in inputConfigs) {
                        var parameterInput = $('<input></input>');
                        parameterInput = createParametersDom(id,parameterInput, inputConfigs[index])
                        parameterChildDiv.append(parameterInput)
                    }
                } else {
                    var parameterInput = $('<input></input>');
                    parameterInput = createParametersDom(id,parameterInput, inputConfigs)
                    parameterChildDiv.append(parameterInput)
                }
            }
            if (dom == "textarea") {
                // 参数输入框设置
                var textAreaConfigs = oneParameter[dom]
                var parameterTextArea = $('<textarea></textarea>');
                parameterTextArea = createParametersDom(id,parameterTextArea, textAreaConfigs)
                parameterTextArea.removeAttr("value")
                parameterTextArea[0].innerText = textAreaConfigs.value
                parameterChildDiv.append(parameterTextArea)
            }
            if (dom == "select") {
                // 下拉框值设置
                var selectConfigs = oneParameter[dom]
                //针对Web的谷歌模块重新生成find_method的方法
                if (variant.indexOf("Web_") != -1 && selectConfigs.id === "method"){
                    var browser = $("#browser_mode").val().replace(/"/g,"").toLowerCase();
                    if (browser == "chrome"){
                        selectConfigs.optionalValues = [{ID:'\"id\"'},{LINK_TEXT:'\"linkText\"'},{XPATH:'\"xpath\"'},{CSS:'\"css\"'}];
                    }else if(browser == "ie"){
                        selectConfigs.optionalValues = [{ID:'\"id\"'},{NAME:'\"name\"'},{CLASS_NAME:'\"className\"'},{LINK_TEXT:'\"linkText\"'},{XPATH:'\"xpath\"'}];
                    }
                }

                var parameterSelect = $('<select></select>');
                parameterSelect = createParametersDom(id,parameterSelect, selectConfigs)
                // 整理下拉框中的选项
                var optionalValuesConfigs = selectConfigs['optionalValues']
                for (var i = 0; i < optionalValuesConfigs.length; i++) {
                    var parameterSelectOptionValue = $('<option></option>');
                    optionalValuesConfig = optionalValuesConfigs[i];
                    if ( i == 0) {
                        parameterSelectOptionValue.attr('selected','selected')
                    }
                    // 如果是下拉多选，默认全选
                    if (selectConfigs["multiple"] == "multiple") {
                        parameterSelectOptionValue.attr('selected','selected')
                    }
                    for (var key in optionalValuesConfig) {
                        parameterSelectOptionValue.attr('value', optionalValuesConfig[key]);
                        parameterSelectOptionValue.html(gettext(key));
                    }
                    parameterSelect.append(parameterSelectOptionValue)
                }
                parameterChildDiv.append(parameterSelect)
            }
        }
        parameterDiv.append(parameterChildDiv)
    }
    console.log(parameterDiv[0].outerHTML)
    return parameterDiv[0].outerHTML.replace(/(.*)<\/div>/, '$1');
}

$.getJSON('../static/javascript/actions.json',data=>{
  actions = data
})

// 新增自动保存参数
function generateTools(id,variant, auto_save = false){
    // 获取参数设置
//    $.getJSON("../static/javascript/actions.json", function (data){
//        actions = data
//    })
    $("#setting_element_id").val(id);
    var json = getConnections();
    var nodeVariant = "";
    var nodeNo = json[id+"nodeNo"];
    var language = $("#language").val();
    var param = {"function":variant,"nodeNo":nodeNo,"id":id};
//    message = "If contains (, then the system will be converted to the variable in (), otherwise the input value will be a string";
//    if (variant == "SAP_SendVkey"){
//        message = "0:Enter;1:F1;2:F2;3:F3;4:F4;5:F5;6:F6;7:F7;8:F8;9:F9;10:F10;11:Ctrl+S;12:F12;13:Shift+F1;14:Shift+F2;15:Shift+F3;16:Shift+F4;17:Shift+F5;18:Shift+F6;19:Shift+F7;20:Shift+F8;21:Shift+F9;22:Shift+Ctrl+0;23:Shift+F11;24:Shift+F12;25:Ctrl+F1;26:Ctrl+F2;27:Ctrl+F3;28:Ctrl+F4;29:Ctrl+F5;30:Ctrl+F6;31:Ctrl+F7;32:Ctrl+F8;33:Ctrl+F9;34:Ctrl+F10;35:Ctrl+F11;36:Ctrl+F12;37:Ctrl+Shift+F1;38:Ctrl+Shift+F2;39:Ctrl+Shift+F3;40:Ctrl+Shift+F4;41:Ctrl+Shift+F5;42:Ctrl+Shift+F6;43:Ctrl+Shift+F7;44:Ctrl+Shift+F8;45:Ctrl+Shift+F9;46:Ctrl+Shift+F10;47:Ctrl+Shift+F11;48:Ctrl+Shift+F12;70:Ctrl+E;71:Ctrl+F;72:Ctrl+/;73:Ctrl+\;74:Ctrl+N;75:Ctrl+O;76:Ctrl+X;77:Ctrl+C;78:Ctrl+V;79:Ctrl+Z;80:Ctrl+PageUp;81:PageUp;82:PageDown;83:Ctrl+PageDown;84:Ctrl+G;85:Ctrl+R;86:Ctrl+P";
//    }
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

    if (variant == "Start") {
        var html = '<div class="property">'
                +'<div class="property-div"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo" disabled="false" value="1"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode" style="display: none;"></div>'
                +'<div class="property-div"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" value="Start" disabled="false"></div>'
                + button_html
        layerHtml(html);
        try {
            nextNode = json[id+"nextNode"];
            $("#nextNode").val(nextNode);
            $("#function").val(variant);
            $("#nextNode").attr("disabled","false");
        } catch(err) {
            console.log(err);
        }
    } else if (variant == "End") {
        var html = '<div class="property">'
                +'<div class="property-div"><span>'+gettext('Node No')+'</span>'
                +'<input class="property-input" name="property" id="nodeNo" disabled="false" value="1"></div>'
                +'<div class="property-div" style="display: none;"><span>'+gettext('Next Node')+'</span>'
                +'<input class="property-input" name="property" id="nextNode" style="display: none;"></div>'
                +'<div class="property-div"><span>'+gettext('Node Name')+'</span>'
                +'<input class="property-input" name="property" id="function" value="End" disabled="false"></div>'
                + button_html
        layerHtml(html);
        try {
            nodeNo = json[id+"nodeNo"];
            lastNode = json[id+"lastNode"];
            $("#nodeNo").val(nodeNo);
            $("#lastNode").val(lastNode);
            $("#function").val(variant);
            $("#lastNode").attr("disabled","false");
            $("#nodeNo").attr("disabled","false");
        } catch(err) {
            console.log(err);
        }
    } else {
        $.ajax({
            type:'POST',
            url:'../sortvariant/',
            dataType:'json',
            data:param,
            beforeSend:function(){
                if (!auto_save) {
                    layer.load(2);
                }
            },
            success:function(data){
                if (data == "system exit"){
                    parent.window.location.href = "../logout/";
                }
                if (!auto_save) {
                    layer.closeAll('loading');
                }
                nodeVariant = data['variant'];
                input = data['input'];
                output = data['output'];

                //发送邮件是否显示密码
                email_verification_type = data['email_verification_type'];
                if (email_verification_type != "\"passwd-authorization\""){
                    display_style =  "none";
                    // 通用模块里用的
                    find_method = data['find_method'];
                    if (find_method != "1"){
                        display_style =  "none";
                    }else{
                        display_style =  "block";
                    }
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
                var shot_coordinate_base64 = data['shot_coordinate_base64'];
                if (shot_coordinate_base64 != "" && typeof(shot_coordinate_base64) != "undefined" && shot_coordinate_base64.indexOf("icon_coordinate_target") != -1){
                    var image_data =  JSON.parse(shot_coordinate_base64);
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

//                global_url = url
//                global_width = width
//                global_height = height
                // 退出复制流程监控
                //div_json = {};
                //div_selection_list = [];
                //$("#copy_mode").val("");
                var html = createParametersHtml(id, variant, url, width, height) + button_html
                layerHtml(html, auto_save);
                try {
                    for (variate in data){
                        $("#"+variate).val(data[variate]);
                    }
                    var public_list = data["list"];
                    for (var i=0;i<public_list.length;i++){
                        var public_variant = public_list[i];
                        $('input[name='+public_variant+']').attr("checked", 'checked')
                    }
                    // 判断是否是SAP_Text或者SAP_Press
                    if (variant.indexOf("SAP_Press") != -1 || variant.indexOf("SAP_Text") != -1){
                        var element_name = data["element_name"];
                        var element_content = data["send_content"];
                        if (element_name){
                            var n = 0;
                            var find_ele = true;
                            var ele_name_list = new Array,ele_content_list = new Array;
                            ele_name_list.push(element_name);
                            ele_content_list.push(element_content);
                            while (find_ele == true){
                                if (data["element_name" + (n + 1).toString()]){
                                    ele_name_list.push(data["element_name" + (n + 1).toString()]);
                                    if (data["send_content" + (n + 1).toString()]){
                                        ele_content_list.push(data["send_content" + (n + 1).toString()]);
                                    }
                                    n = n + 1;
                                }else{
                                    find_ele = false;
                                }
                            }
                            if (n != 0){element_name = ele_name_list;element_content = ele_content_list;}
                            try {
                                element_name = eval(element_name);
                            } catch(err){
                                console.log(err);
                            }
                            try {
                                element_content = eval(element_content);
                            } catch(err) {
                                console.log(err);
                            }
                            if ($.isArray(element_name)){
                                for (var i=0;i<element_name.length;i++){
                                    var ele_name = element_name[i];
                                    if(i == 0){
                                        $("#element_name").val(ele_name);
                                        if (document.getElementById("send_content")){
                                            $("#send_content").val(element_content[i]);
                                        }
                                    }else{
                                        var nameElement = document.getElementById("element_name").parentElement;
                                        var nameEle = document.createElement("div");
                                        nameEle.className = "property-div";
                                        nameEle.innerHTML = nameElement.innerHTML.replace(/element_name/g,"element_name"+i);
                                        var sapActiveElement = document.getElementById("sap_active").parentElement;
                                        var parentElement = sapActiveElement.parentNode;
                                        parentElement.insertBefore(nameEle, sapActiveElement);
                                        $("#element_name"+i).val(ele_name);
                                        if (document.getElementById("send_content")){
                                            var contentElement = document.getElementById("send_content").parentElement;
                                            var contentEle = document.createElement("div");
                                            contentEle.className = "property-div";
                                            contentEle.innerHTML = contentElement.innerHTML.replace(/send_content/g,"send_content"+i);
                                            parentElement.insertBefore(contentEle, sapActiveElement);
                                            $("#send_content"+i).val(element_content[i]);
                                        }
                                    }
                                }
                            }
                        }
                    }else if (variant.indexOf("HCI_Input") != -1){
                        var description = data["description"];
                        var required_field = data["required_field"];
                        var password_format = data["password_format"];
                        if (description){
                            var n = 0;
                            var find_ele = true;
                            var description_list = new Array,required_field_list = new Array,password_format_list = new Array;
                            description_list.push(description);
                            required_field_list.push(required_field);
                            password_format_list.push(password_format);
                            while (find_ele == true){
                                if (data["description" + (n + 1).toString()]){
                                    description_list.push(data["description" + (n + 1).toString()]);
                                    required_field_list.push(data["required_field" + (n + 1).toString()]);
                                    password_format_list.push(data["password_format" + (n + 1).toString()]);
                                    n = n + 1;
                                }else{
                                    find_ele = false;
                                }
                            }
                            if (n != 0){description = description_list;required_field = required_field_list;password_format = password_format_list;}
                        }
                        if (description){
                            try {
                                description = eval(description);
                            } catch(err){
                                console.log(err);
                            }
                            try {
                                password_format = eval(password_format);
                            } catch(err) {
                                console.log(err);
                            }
                            try {
                                required_field = eval(required_field);
                            } catch(err) {
                                console.log(err);
                            }
                            if ($.isArray(description)){
                                var output_list = data["output"].split(",");
                                for (var i=0;i<description.length;i++){
                                    var des = description[i];
                                    var req_field = required_field[i];
                                    var pwd_format = password_format[i];
                                    var out = output_list[i];
                                    output = output_list[0];
                                    if(i == 0){
                                        $("#description").val(des);
                                        $("#required_field").val(req_field);
                                        $("#password_format").val(pwd_format);
                                        $("#output").val(out);
                                    }else{
                                        var desElement = document.getElementById("description").parentElement;
                                        var desEle = document.createElement("div");
                                        desEle.className = "property-div";
                                        desEle.innerHTML = desElement.innerHTML.replace(/description/g,"description"+i);
                                        var reqElement = document.getElementById("required_field").parentElement;
                                        var reqEle = document.createElement("div");
                                        reqEle.className = "property-div";
                                        reqEle.innerHTML = reqElement.innerHTML.replace(/required_field/g,"required_field"+i);
                                        var pwdElement = document.getElementById("password_format").parentElement;
                                        var pwdEle = document.createElement("div");
                                        pwdEle.className = "property-div";
                                        pwdEle.innerHTML = pwdElement.innerHTML.replace(/password_format/g,"password_format"+i);
                                        var outputElement = document.getElementById("output").parentElement;
                                        var outEle = document.createElement("div");
                                        var parentElement = outputElement.parentNode;
                                        outEle.className = "property-div";
                                        outEle.innerHTML = outputElement.innerHTML.replace(/output/g,"output"+i);
                                        parentElement.append(desEle);
                                        parentElement.append(reqEle);
                                        parentElement.append(pwdEle);
                                        parentElement.append(outEle);
                                        $("#description"+i).val(des);
                                        $("#required_field"+i).val(req_field);
                                        $("#password_format"+i).val(pwd_format);
                                        $("#output"+i).val(out);
                                    }
                                }
                            }
                        }
                    }else if (variant.indexOf("Excel_ReadCell") != -1 || variant.indexOf("Excel_WriteCells") != -1){
                        var des1,des2,var1,var2;
                        if (variant.indexOf("Excel_ReadCell") != -1){
                            des1 = "selected_cell";
                            des2 = "decimal_digits";
                        }else{
                            des1 = "selected_cells";
                            des2 = "content";
                        }
                        var1 = data[des1];
                        var2 = data[des2];
                        if (var1){
                            var n = 0;
                            var find_ele = true;
                            var list1 = new Array,list2 = new Array;
                            list1.push(var1);
                            list2.push(var2);
                            while (find_ele == true){
                                if (data["des" + (n + 1).toString()]){
                                    list1.push(data[des1 + (n + 1).toString()]);
                                    list2.push(data[des2 + (n + 1).toString()]);
                                    n = n + 1;
                                }else{
                                    find_ele = false;
                                }
                            }
                            if (n != 0){var1 = list1;var2 = list2}
                        }
                        if (var1){
                            try {
                                var1 = eval(var1);
                            } catch(err){
                                console.log(err);
                            }
                            try {
                                var2 = eval(var2);
                            } catch(err) {
                                console.log(err);
                            }
                            if ($.isArray(var1)){
                                var output_list,out;
                                if (des1 == "selected_cell"){
                                    output_list = data["output"].split(",");
                                }
                                for (var i=0;i<var1.length;i++){
                                    var variant1 = var1[i];
                                    var variant2 = var2[i];
                                    if (des1 == "selected_cell"){
                                        out = output_list[i];
                                        output = output_list[0];
                                    }
                                    if(i == 0){
                                        $("#"+des1).val(variant1);
                                        $("#"+des2).val(variant2);
                                        if (des1 == "selected_cell"){
                                            $("#output").val(out);
                                        }
                                    }else{
                                        var rangeElement = document.getElementById(des1).parentElement;
                                        var rangeEle = document.createElement("div");
                                        rangeEle.className = "property-div";
                                        if (des1 == "selected_cell"){
                                            rangeEle.innerHTML = rangeElement.innerHTML.replace(/selected_cell/g,des1+i);
                                        }else{
                                            rangeEle.innerHTML = rangeElement.innerHTML.replace(/selected_cells/g,des1+i);
                                        }
                                        var contentElement = document.getElementById(des2).parentElement;
                                        var contentEle = document.createElement("div");
                                        contentEle.className = "property-div";
                                        if (des1 == "selected_cell"){
                                            contentEle.innerHTML = contentElement.innerHTML.replace(/decimal_digits/g,des2+i);
                                        }else{
                                            contentEle.innerHTML = contentElement.innerHTML.replace(/content/g,des2+i);
                                        }
                                        $("#excel_active").parent().before(rangeEle);
                                        $("#excel_active").parent().before(contentEle);
                                        $("#"+des1+i).val(variant1);
                                        $("#"+des2+i).val(variant2);
                                        if (des1 == "selected_cell"){
                                            var outputElement = document.getElementById("output").parentElement;
                                            var outputEle = document.createElement("div");
                                            outputEle.className = "property-div";
                                            outputEle.innerHTML = outputElement.innerHTML.replace(/output/g,"output"+i);
                                            $("#excel_active").parent().before(outputEle);
                                            $("#output"+i).val(out);
                                        }
                                    }
                                }
                            }
                        }
                    }else if(variant.indexOf("Excel_PivotTable")!=-1){
                        // 数据透视表筛选项
                        $('#pivot_table_filters').ySelect({
                            placeholder: 'Please choose options',
                            id: "pivot_table_filters_values",
                            type: "input",
                            showSearch: false,
                            numDisplayed: 7,
                            isCheck:false
                          });
                        // 数据透视表列
                        $('#pivot_table_columns').ySelect({
                            placeholder: 'Please choose options',
                            id: "pivot_table_columns_values",
                            type: "input",
                            showSearch: false,
                            numDisplayed: 7,
                            isCheck:false
                          });
                        // 数据透视表行
                        $('#pivot_table_rows').ySelect({
                            placeholder: 'Please choose options',
                            id: "pivot_table_rows_values",
                            type: "input",
                            showSearch: false,
                            numDisplayed: 7,
                            isCheck:false
                        });

                        var table_chosen =data["table_chosen"];
                        if (table_chosen=='"refresh"'){
                            $("#excel_pivotTable_refresh").parent().show();
                            $("#table_start").parent().hide();
                            $("#pivotremind").parent().hide();
                        }else if(table_chosen=='"new"'){
                            $("#table_start").parent().show();
                            $("#pivotremind").parent().show();
                            $("#excel_pivotTable_refresh").parent().hide();
                        }
                        let pivot_options = eval(data["pivot_options"]);
                        if(data["pivot_table_filters"]){
                            var table_filter = data["pivot_table_filters"].replace(/\"/g,"");
                            if(table_filter.indexOf(", ")>-1){
                                var table_filter = table_filter.split(", ");
                            }else if(table_filter.indexOf(",")>-1){
                                var table_filter = table_filter.split(",");
                            }

                        }
                        if(data["pivot_table_columns"]){
                            var table_column = data["pivot_table_columns"].replace(/\"/g,"");
                            if(table_column.indexOf(", ")>-1){
                                var table_column = table_column.split(", ");
                            }else if(table_column.indexOf(",")>-1){
                                var table_column = table_column.split(",");
                            }

                        }
                        if(data["pivot_table_rows"]){
                            var table_row = data["pivot_table_rows"].replace(/\"/g,"");
                            if(table_row.indexOf(", ")>-1){
                                var table_row = table_row.split(", ");
                            }else if(table_row.indexOf(",")>-1){
                                var table_row = table_row.split(",");
                            }
                        }

                        try{
                            var options = pivot_options;
                            var columns = table_column;
                            var rows = table_row;
                            var pages = table_filter;
                        }catch(e){
                            var options = [];
                            var columns = [];
                            var rows = [];
                            var pages = [];
                        }
                        if (options){
                            var select_html = "";
                            var select_html_columns = "";
                            var select_html_rows = "";
                            var select_html_pages = "";
                            var select_text = "";
                            var select_text_columns = "";
                            var select_text_rows = "";
                            var select_text_pages = "";
                            var option_html = "";
                            var option_html_columns = "";
                            var option_html_rows = "";
                            var option_html_pages = "";
//
//                            for (var i=0;i<options.length;i++){
//                                if (columns.indexOf(options[i])>-1){
//                                    select_html_columns+='<div class="fs-option selected" data-value="" '+options[i]+' data-index="' +i+ '"><span class="fs-checkbox"><i></i></span><div class="fs-option-label">'+options[i]+'</div></div>';
//                                    option_html_columns+='<option selected="selected">' + "\"" + options[i] + "\"" + '</option>';
//                                    select_text_columns+=options[i];
//                                    if(options[i]==columns.slice(-1)){
//                                        select_text_columns = select_text_columns
//                                    }else{
//                                        select_text_columns = select_text_columns + ",";
//                                    }
//                                }else{
//                                    select_html_columns+='<div class="fs-option" data-value="" '+options[i]+' data-index="' +i+ '"><span class="fs-checkbox"><i></i></span><div class="fs-option-label">'+options[i]+'</div></div>';
//                                }
//                            }
//
//                            for (var i=0;i<options.length;i++){
//                                if (rows.indexOf(options[i])>-1){
//                                    select_html_rows+='<div class="fs-option selected" data-value="" '+options[i]+' data-index="' +i+ '"><span class="fs-checkbox"><i></i></span><div class="fs-option-label">'+options[i]+'</div></div>';
//                                    option_html_rows+='<option selected="selected">' + "\"" + options[i] + "\"" + '</option>';
//                                    select_text_rows+=options[i];
//                                    if(options[i]==rows.slice(-1)){
//                                        select_text_rows = select_text_rows
//                                    }else{
//                                        select_text_rows = select_text_rows + ",";
//                                    }
//                                }else{
//                                    select_html_rows+='<div class="fs-option" data-value="" '+options[i]+' data-index="' +i+ '"><span class="fs-checkbox"><i></i></span><div class="fs-option-label">'+options[i]+'</div></div>';
//                                }
//                            }
//
                            for (var i=0;i<options.length;i++){
                                if (pages.indexOf(options[i])>-1){
                                    select_html_pages+='<div class="fs-option selected" data-value="" '+options[i]+' data-index="' +i+ '"><span class="fs-checkbox"><i></i></span><div class="fs-option-label">'+options[i]+'</div></div>';
                                    option_html_pages+='<option selected="selected">' + "\"" + options[i] + "\"" + '</option>';
                                    select_text_pages+=options[i];
                                    if(options[i]==pages.slice(-1) || options[i]==pages){
                                        select_text_pages = select_text_pages
                                    }else{
                                        select_text_pages = select_text_pages + ", ";
                                    }
                                }else{
                                    select_html_pages+='<div class="fs-option" data-value="" '+options[i]+' data-index="' +i+ '"><span class="fs-checkbox"><i></i></span><div class="fs-option-label">'+options[i]+'</div></div>';
                                }
                            }
                            for (var i=0;i<options.length;i++){
                                if (columns.indexOf(options[i])>-1){
                                    select_html_columns+='<div class="fs-option selected" data-value="" '+options[i]+' data-index="' +i+ '"><span class="fs-checkbox"><i></i></span><div class="fs-option-label">'+options[i]+'</div></div>';
                                    option_html_columns+='<option selected="selected">' + "\"" + options[i] + "\"" + '</option>';
                                    select_text_columns+=options[i];
                                    if(options[i]==columns.slice(-1) || options[i]==columns){
                                        select_text_columns = select_text_columns
                                    }else{
                                        select_text_columns = select_text_columns + ", ";
                                    }
                                }else{
                                    select_html_columns+='<div class="fs-option" data-value="" '+options[i]+' data-index="' +i+ '"><span class="fs-checkbox"><i></i></span><div class="fs-option-label">'+options[i]+'</div></div>';
                                }
                            }

                            for (var i=0;i<options.length;i++){
                                if (rows.indexOf(options[i])>-1){
                                    select_html_rows+='<div class="fs-option selected" data-value="" '+options[i]+' data-index="' +i+ '"><span class="fs-checkbox"><i></i></span><div class="fs-option-label">'+options[i]+'</div></div>';
                                    option_html_rows+='<option selected="selected">' + "\"" + options[i] + "\"" + '</option>';
                                    select_text_rows+=options[i];
                                    if(options[i]==rows.slice(-1) || options[i]==rows){
                                        select_text_rows = select_text_rows
                                    }else{
                                        select_text_rows = select_text_rows + ", ";
                                    }
                                }else{
                                    select_html_rows+='<div class="fs-option" data-value="" '+options[i]+' data-index="' +i+ '"><span class="fs-checkbox"><i></i></span><div class="fs-option-label">'+options[i]+'</div></div>';
                                }
                            }
//                            document.getElementById("table_filters").innerHTML = option_html_pages;
//                            document.getElementById("table_columns").innerHTML = option_html_columns;
//                            document.getElementById("table_rows").innerHTML = option_html_rows;
                        }
                            let ySelect = document.getElementsByClassName("fs-options")[0];
                            let ySelect1 = document.getElementsByClassName("fs-options")[1];
                            let ySelect2 = document.getElementsByClassName("fs-options")[2];
                            ySelect.innerHTML = select_html_pages;
                            ySelect1.innerHTML = select_html_columns;
                            ySelect2.innerHTML = select_html_rows;
                            $("#pivot_table_filters_values").val(select_text_pages);
                            $("#pivot_table_columns_values").val(select_text_columns);
                            $("#pivot_table_rows_values").val(select_text_rows);
//                        $("#table_filters_values").val(data['table_filters']);
//                        $("#table_columns_values").val(data['table_columns']);
//                        $("#table_rows_values").val(data['table_rows']);

                        var saved_selected_values = pivot_options
                        for (pivot_variant in data){
                            // 读取table_filters_values
                            if ("table_filters_values" == pivot_variant) {
                                $("#table_filters_values").text(saved_selected_values);
                            }
                        }
                        var selected_doms = $(".fs-option")
                        for (var i=0; i<selected_doms.length; i++) {
                            var selected_dom = selected_doms[i]
                            var selected_dom_value = selected_dom.lastChild.innerText
                            if (saved_selected_values.indexOf(selected_dom_value) < 0) {
                                selected_dom.classList.remove("selected")
                            }
                        }
                    }else if (variant.indexOf("Excel_ConditionalFormat") != -1 ){
                        var highlight_cell_rules = data['highlight_cell_rules'];
                        if (highlight_cell_rules=='0' || highlight_cell_rules=='1' || highlight_cell_rules=='3'){
                            $("#img_number1").show();
                            $("#img_minimum").hide();
                            $("#img_maxmum").hide();
                            $("#img_text").hide();
                            $("#img_date").hide();
                            $("#img_characteristics").hide();
                            $("#item_selection_rules").attr("disabled",true);
                        }else if(highlight_cell_rules=='2'){
                            $("#img_number1").hide();
                            $("#img_minimum").show();
                            $("#img_maxmum").show();
                            $("#img_text").hide();
                            $("#img_date").hide();
                            $("#img_characteristics").hide();
                            $("#item_selection_rules").attr("disabled",true);
                        }else if(highlight_cell_rules=='4'){
                            $("#img_text").show();
                            $("#img_number1").hide();
                            $("#img_minimum").hide();
                            $("#img_maxmum").hide();
                            $("#img_date").hide();
                            $("#img_characteristics").hide();
                            $("#item_selection_rules").attr("disabled",true);
                        }else if(highlight_cell_rules=='5'){
                            $("#img_date").show();
                            $("#img_text").hide();
                            $("#img_number1").hide();
                            $("#img_minimum").hide();
                            $("#img_maxmum").hide();
                            $("#img_characteristics").hide();
                            $("#item_selection_rules").attr("disabled",true);
                        }else if(highlight_cell_rules=='6'){
                            $("#img_characteristics").show();
                            $("#img_text").hide();
                            $("#img_number1").hide();
                            $("#img_minimum").hide();
                            $("#img_maxmum").hide();
                            $("#img_date").hide();
                            $("#item_selection_rules").attr("disabled",true);
                        }
                        var item_selection_rules = data['item_selection_rules'];
                        if (item_selection_rules == '0' || item_selection_rules == '1' ||  item_selection_rules == '3' || item_selection_rules == '2'){
                            $("#img_number1").show();
                            $("#img_minimum").hide();
                            $("#img_maxmum").hide();
                            $("#img_text").hide();
                            $("#img_date").hide();
                            $("#img_characteristics").hide();
                            $("#highlight_cell_rules").attr("disabled",true);
                        }else if(item_selection_rules == '4' || item_selection_rules == '5'){
                            $("#img_number1").hide();
                            $("#img_minimum").hide();
                            $("#img_maxmum").hide();
                            $("#img_text").hide();
                            $("#img_date").hide();
                            $("#img_characteristics").hide();
                            $("#highlight_cell_rules").attr("disabled",true);
                        }
                    }else if (variant.indexOf("Excel_Parse") != -1 ){
                        var symbol = data['symbol'];
                        if (symbol=='1'){
                            $("#img_respectively").show();
                        }else{
                            $("#img_respectively").hide();
                        }
                    }else if (variant.indexOf("Excel_SortCells") != -1 ){
                        var des1,des2,var1,var2;
                        if (variant.indexOf("Excel_SortCells") != -1){
                            des1 = "sort_column";
                            des2 = "order_method";
                        }
                        var1 = data[des1];
                        var2 = data[des2];
                        if (var1){
                            var n = 0;
                            var find_ele = true;
                            var list1 = new Array,list2 = new Array;
                            list1.push(var1);
                            list2.push(var2);
                            while (find_ele == true){
                                if (data["des" + (n + 1).toString()]){
                                    list1.push(data[des1 + (n + 1).toString()]);
                                    list2.push(data[des2 + (n + 1).toString()]);
                                    n = n + 1;
                                }else{
                                    find_ele = false;
                                }
                            }
                            if (n != 0){var1 = list1;var2 = list2}
                        }
                        if (var1){
                            try {
                                var1 = eval(var1);
                            } catch(err){
                                console.log(err);
                            }
                            try {
                                var2 = eval(var2);
                            } catch(err) {
                                console.log(err);
                            }
                            if ($.isArray(var1)){
                                for (var i=0;i<var1.length;i++){
                                    var variant1 = var1[i];
                                    var variant2 = var2[i];
                                    if(i == 0){
                                        $("#"+des1).val(variant1);
                                        $("#"+des2).val(variant2);
                                    }else{
                                        var rangeElement = document.getElementById(des1).parentElement;
                                        var rangeEle = document.createElement("div");
                                        rangeEle.className = "property-div";
                                        if (des1 == "sort_column"){
                                            rangeEle.innerHTML = rangeElement.innerHTML.replace(/sort_column/g,des1+i);
                                        }else{
                                            rangeEle.innerHTML = rangeElement.innerHTML.replace(/sort_column/g,des1+i);
                                        }
                                        var contentElement = document.getElementById(des2).parentElement;
                                        var contentEle = document.createElement("div");
                                        contentEle.className = "property-div";
                                        if (des1 == "sort_column"){
                                            contentEle.innerHTML = contentElement.innerHTML.replace(/order_method/g,des2+i);
                                        }
                                        $("#excel_active").parent().before(rangeEle);
                                        $("#excel_active").parent().before(contentEle);
                                        $("#"+des1+i).val(variant1);
                                        $("#"+des2+i).val(variant2);
                                    }
                                }
                            }
                        }
                    }else if(variant.indexOf("Excel_UpdateChartSeriesData") != -1){
                        //动态更新excel设置图标数据源的系列下拉框
                        try{
                            var options = eval(data["chart_series_options"])[0];
                            excel_chart_range = eval(data["chart_series_options"])[1];
                        }catch(e){
                            var options = [];
                        }
                        if (options){
                            var select_html = "";
                            var index = options.indexOf(data["chart_series"]);
                            for (var i=0;i<options.length;i++){
                                if (i == index){
                                    select_html+="<option value=\"" + options[i].replace(/\"/g, "") + "\" selected>" + options[i].replace(/\"/g, "") + "</option>";
                                }else{
                                    select_html+="<option value=\"" + options[i].replace(/\"/g, "") + "\">" + options[i].replace(/\"/g, "") + "</option>";
                                }
                            }
                            document.getElementById("chart_series").innerHTML = select_html;
                            try{
                                var option = eval(data["chart_series_options"])[1][index];
                                $("#selected_cells").val("\"" + option + "\"");
                            }catch(e){
                            }
                        }
                        var des1,des2,var1,var2;
                        des1 = "chart_series";
                        des2 = "selected_cells";
                        var1 = data[des1];
                        var2 = data[des2];
                        if (var1){
                            try {
                                var1 = eval(var1);
                            } catch(err){
                                console.log(err);
                            }
                            try {
                                var2 = eval(var2);
                            } catch(err) {
                                console.log(err);
                            }
                            if ($.isArray(var1)){
                                for (var i=0;i<var1.length;i++){
                                    var variant1 = var1[i].replace(/\"/g,"");
                                    var variant2 = var2[i];
                                    if(i == 0){
                                        $("#"+des1).val(variant1);
                                        $("#"+des2).val(variant2);
                                        if (des1 == "chart_series"){
                                            $("#output").val(out);
                                        }
                                    }else{
                                        var rangeElement = document.getElementById(des1).parentElement;
                                        var rangeEle = document.createElement("div");
                                        rangeEle.className = "property-div";
                                        if (des1 == "chart_series"){
                                            rangeEle.innerHTML = rangeElement.innerHTML.replace(/chart_series/g,des1+i);
                                        }else{
                                            rangeEle.innerHTML = rangeElement.innerHTML.replace(/chart_series/g,des1+i);
                                        }
                                        var contentElement = document.getElementById(des2).parentElement;
                                        var contentEle = document.createElement("div");
                                        contentEle.className = "property-div";
                                        if (des1 == "chart_series"){
                                            contentEle.innerHTML = contentElement.innerHTML.replace(/selected_cells/g,des2+i);
                                        }
                                        $("#excel_active").parent().before(rangeEle);
                                        $("#excel_active").parent().before(contentEle);
                                        $("#"+des1+i).val(variant1);
                                        $("#"+des2+i).val(variant2);
                                    }
                                }
                            }else{
                                $("#chart_series").val(var1);
                                $("#selected_cells").val("\"" + var2 + "\"");
                            }
                        }
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
                    if (find_method != "1" && variant != "Picture_Shot_Coordinate"){
                        $('#img_screenshot').css('display','none');
                    }
                    if (variant == "Read_Mail") {
                        $('#out_result').ySelect({
                            id: 'out_result_values',
                            placeholder: 'Please choose output',
                            showSearch: false,
                            numDisplayed: 10,
                            isCheck:false
                          });
                        var saved_selected_values = data["out_result"].replaceAll("\"", "")
                        for (variant in data){
                            // 读取out_result_values
                            if ("out_result" == variant) {
                                $("#out_result_values").text(saved_selected_values);
                            }
                        }
                        var selected_doms = $(".fs-option")
                        for (var i=0; i<selected_doms.length; i++) {
                            var selected_dom = selected_doms[i]
                            var selected_dom_value = selected_dom.lastChild.innerText
                            if (saved_selected_values.indexOf(selected_dom_value) < 0) {
                                selected_dom.classList.remove("selected")
                            }
                        }
                    }
//                    }else if(variant == "Excel_PivotTable"){
//                        // 数据透视表筛选项
//                        $('#table_filters').ySelect({
//                            placeholder: 'Please choose options',
//                            id: "table_filters_values",
//                            type: "input",
//                            showSearch: false,
//                            numDisplayed: 4,
//                            isCheck:false
//                          });
//                        // 数据透视表列
//                        $('#table_columns').ySelect({
//                            placeholder: 'Please choose options',
//                            id: "table_columns_values",
//                            type: "input",
//                            showSearch: false,
//                            numDisplayed: 4,
//                            isCheck:false
//                          });
//                        // 数据透视表行
//                        $('#table_rows').ySelect({
//                            placeholder: 'Please choose options',
//                            id: "table_rows_values",
//                            type: "input",
//                            showSearch: false,
//                            numDisplayed: 4,
//                            isCheck:false
//                          });
//                    }
                    if (variant == "Excel_Format") {
                        // 拾色器初始化颜色
                        try {
                            background_color_rgb_init = data["background_color"]
                            background_color_rgb_init = background_color_rgb_init.substring(1, background_color_rgb_init.length - 1)
                            background_color_rgb_init = "rgb(" + background_color_rgb_init + ")"
                        } catch(err) {
//                            background_color_rgb_init = "rgb(79,98,40)"
                        }
//                        var obj = document.getElementById("picker");
                        var aColorPicker = Colorpicker.create({
                            el: "background_color_picker",
                            color: "#000fff",
                            allMode: "rgb",
                            initColor: background_color_rgb_init,
                            input_name: "background_color",
                            change: function (elem, hex) {
                                elem.style.backgroundColor = hex;
                            }
                        })
                        // 拾色器初始化颜色
                        try {
                            font_color_rgb_init = data["font_color"]
                            font_color_rgb_init = font_color_rgb_init.substring(1, font_color_rgb_init.length - 1)
                            font_color_rgb_init = "rgb(" + font_color_rgb_init + ")"
                        } catch(err) {
//                            font_color_rgb_init = "rgb(79,98,40)"
                        }
//                        var obj = document.getElementById("picker");
                        var aColorPicker = Colorpicker.create({
                            el: "font_color_picker",
                            color: "#000fff",
                            allMode: "rgb",
                            initColor: font_color_rgb_init,
                            input_name: "font_color",
                            change: function (elem, hex) {
                                elem.style.backgroundColor = hex;
                            }
                        })
                    } else {
                        // 拾色器初始化颜色
                        try {
                            rgb_init = data["process_background_color"]
                            rgb_init = rgb_init.substring(1, rgb_init.length - 1)
                            rgb_init = "rgb(" + rgb_init + ")"
                        } catch(err) {
                            rgb_init = "rgb(79,98,40)"
                        }
                        try {
                            var obj = document.getElementById("picker");
                            var aColorPicker = Colorpicker.create({
                                el: "color-picker",
                                color: "#000fff",
                                allMode: "rgb",
                                initColor: rgb_init,
                                input_name: "process_background_color",
                                change: function (elem, hex) {
                                    elem.style.backgroundColor = hex;
                                }
                            })
                            $('#process_background_color').change(function() {
                                try {
                                    process_background_color_rgb = $("#process_background_color")[0].value;
                                    rgb_color = process_background_color_rgb.substring(1, process_background_color_rgb.length - 1)
                                    rgb_color = "rgb(" + rgb_color + ")"
                                    $("#color-picker").css({"background-color":rgb_color});
                                } catch(err){

                                }
                            })
                        } catch(err) {
                            console.log(err);
                        }
                    }
                    if (auto_save) {
                        save(id, auto_save)
                    }
                } catch(err) {
                    console.log(err);
                }
            },
        });
    }
}
