var control_tree;
var control_tree_status = "";
var control_tree_vars = {};
control_tree_vars["id"] = true,control_tree_vars["name"] = true,control_tree_vars["class"] = true;
function setting(id) {
    var text = $("#"+id)[0].firstElementChild.firstElementChild.id;
    var parent_div = $("#"+id);
    var process_id = id;
    var color = $("#" + id).find(".jnode-box").eq(0).css("background-color");
    if (typeof color != "undefined" && color != null && color != "") {
        $("#borderColor").val(color);
    } else {
        $("#borderColor").val("");
    }
    var board_color = $("#" + id).find(".jnode-box").eq(0).css("border-color");
    if (board_color == "rgb(213, 133, 18)") {
        div_status[id] = 'saved';
    }
    $("#" + id).find(".jnode-box").eq(0).css("background-color", "#d58512");
    $("#" + id).find(".jnode-box").eq(0).css("border", "3px solid #d58512");
    try {
        var div_id = $("#"+id)[0].children[0].children[0].getAttribute("name");
    } catch(err) {
        var div_id = "";
    }
    if (div_id != null && div_id != "" && typeof(div_id) != "undefined") {
        $.ajax({
            type: 'POST',
            url: '../showprocess/',
            dataType: 'json',
            data: {
                "selectfile": div_id
            },
            beforeSend: function() {
                layer.load(2);
            },
            success: function(data) {
                layer.closeAll('loading');
                result = data['result'];
                if (result == "success") {
                    list = data['list'];
                    var title = div_id.replace(".py","");
				    titles = title.split("\\");
				    if (titles[0] == "public"){
				        title = title.replace("public","Public");
				    }else if(titles[0] == "release"){
				        title = title.replace("release","Release");
				    }else{
				        title = title.replace(titles[0],"Private");
				    }
                    title = title + ' ('+gettext("Click submit to insert the existing process")+')';
                    var index = layer.open({
                        type: 2,
                        title: title,
                        content: '../processvariant/?selectfile=' + div_id,
                        area: ['320px', '195px'],
                        maxmin: true,
                        skin: 'process-class',
                        btn: [gettext("Submit"), gettext("Cancel"), gettext("Update")],
                        btn1: function(index, layero) {
                            var iframeWin = window[layero.find('iframe')[0]['name']];
                            var public_list = new Array;
                            var list2 = new Array;
                            for (var o = 0; o < list.length; o++) {
                                /*var jnode = list[o].jnode;
                                var status = list[o].status;
                                if (jnode != "start" && jnode != "end"){
                                    if (status != "saved"){
                                        layer.msg(gettext("Please save all the steps of insert process first")+'!', {
                                            time: 1000,
                                            icon: 5,
                                        });
                                        return false;
                                    }
                                }*/
                                var variant_string = list[o].variant;
                                var public_json = {};
                                try {
                                    public_json = eval('(' + variant_string + ')');
                                } catch(err) {
                                    public_json = {};
                                }
                                var id = list[o].source_id;
                                if (iframeWin.document.getElementById(id)) {
                                    var div = iframeWin.document.getElementById(id);
                                    var input_childs = div.getElementsByTagName("input");
                                    for (var p = 0; p < input_childs.length; p++) {
                                        var input_child = input_childs[p];
                                        var value = input_child.value;
                                        var name = input_child.name;
                                        if (name != "" && name != null) {
                                            public_json[name] = value.toString();
                                        }
                                    }
                                    var select_childs = div.getElementsByTagName("select");
                                    for (var p = 0; p < select_childs.length; p++) {
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
                            var tab = getActiveTab();
                            if (tab == ''){tab = 0};
                            connections['list'] = JSON.stringify(public_list);
                            connections['list2'] = JSON.stringify(list2);
                            connections['id'] = process_id;
                            connections['nodeNo'] = connections[process_id + 'nodeNo'];
                            connections['group'] = div_id;
                            connections['tab'] = tab;
                            $.ajax({
                                type: 'POST',
                                url: '../saveinsertvariant/',
                                dataType: 'json',
                                data: connections,
                                beforeSend: function() {
                                    layer.load(2);
                                },
                                success: function(data) {
                                    layer.closeAll('loading');
                                    result = data['result'];
                                    if (result == "success") {
                                        layer.msg(gettext("Save Successfully")+'!', {
                                            time: 1000,
                                            icon: 6,
                                        });
                                        var div = document.getElementById(process_id);
                                        div.children[0].setAttribute("style", "border:3px solid #d58512");
                                    } else {
                                        layer.msg(gettext("Save Failed")+'!', {
                                            time: 1000,
                                            icon: 5,
                                        });
                                    }
                                },
                            });
                        },
                        btn2: function(index, layero) {
                            cancel(id);
                        },
                        btn3: function(index, layero) {
                            var iframeWin = window[layero.find('iframe')[0]['name']];
                            var public_list = new Array;
                            for (var o = 0; o < list.length; o++) {
                                /*var jnode = list[o].jnode;
                                var status = list[o].status;
                                if (jnode != "start" && jnode != "end"){
                                    if (status != "saved"){
                                        layer.msg(gettext("Please save all the steps of insert process first")+'!', {
                                            time: 1000,
                                            icon: 5,
                                        });
                                        return false;
                                    }
                                }*/
                                var variant_string = list[o].variant;
                                var public_json = {};
                                try {
                                    public_json = eval('(' + variant_string + ')');
                                } catch(err) {
                                    public_json = {};
                                }
                                var id = list[o].source_id;
                                if (iframeWin.document.getElementById(id)) {
                                    var div = iframeWin.document.getElementById(id);
                                    var input_childs = div.getElementsByTagName("input");
                                    for (var p = 0; p < input_childs.length; p++) {
                                        var input_child = input_childs[p];
                                        var value = input_child.value;
                                        var name = input_child.name;
                                        if (name != "" && name != null) {
                                            public_json[name] = value.toString();
                                        }
                                    }
                                    var select_childs = div.getElementsByTagName("select");
                                    for (var p = 0; p < select_childs.length; p++) {
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
                            param['nodeNo'] = connections[process_id + 'nodeNo'];
                            param['group'] = div_id;
                            $.ajax({
                                type: 'POST',
                                url: '../updateinsertvariant/',
                                dataType: 'json',
                                data: param,
                                beforeSend: function() {
                                    layer.load(2);
                                },
                                success: function(data) {
                                    layer.closeAll('loading');
                                    result = data['result'];
                                    if (result == "success") {
                                        layer.msg(gettext("Save Successfully")+'!', {
                                            time: 1000,
                                            icon: 6,
                                        });
                                        var div = document.getElementById(process_id);
                                        div.children[0].setAttribute("style", "border:3px solid #d58512");
                                    } else {
                                        layer.msg(gettext("Save Failed")+'!', {
                                            time: 1000,
                                            icon: 5,
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
    } else {
        try {
            // 选中后保存后无法拉框选择
//            console.log(div_json)
            delete div_json[id]
            delete div_json[id+"className"]
            delete div_json[id+"jnodeHtml"]
//            console.log(div_selection_list)
            // 数组中删掉元素
            div_selection_list.forEach(function(item,index,arr){
                if (item == id){
                    arr.splice(index,1);
                }
            });
        } catch(err) {

        }
        generateTools(id, text);
    }
}

function deleteDiv(id) {
    delete name_json[id];
    var text = $("#"+id)[0].firstElementChild.innerText;
    var json = getConnections();
    var nodeNo = json[id + "nodeNo"];
    layer.confirm(gettext("Are you sure to delete")+'?', {
        title: gettext("Delete Confirmation"),
        btn: [gettext("Yes"), gettext("No")]
    },function(index) {
        jsPlumb.removeAllEndpoints(id);
        $("#"+id).remove();
        delete div_status[id];
        if ($.inArray(id,div_selection_list) != -1){
            div_selection_list.splice($.inArray(id,div_selection_list),1);
        }
        layer.close(index);
        var param = {
            "name": text,
            "nodeNo": nodeNo,
            "divId": id
        }
        $.ajax({
            type: 'POST',
            url: '../deletevariant/',
            dataType: 'json',
            data: param,
            success: function(data) {}
        })
    })
}

function dblClickDiv(id) {
    var backgroundColor = $("#" + id).find(".jnode-box").eq(0).css("background-color");
    var className = $("#" + id).find(".jnode-box").eq(0).attr('class') || "";
    if (backgroundColor != "rgb(146, 208, 80)" && backgroundColor != "rgb(128, 128, 128)" || className.indexOf("jnode-judge") != -1) {
        var select_json_2_str = JSON.stringify(div_selection_list);
        var innerText = $("#"+id)[0].firstElementChild.firstElementChild.id;
        if (innerText != "Start" && innerText != "End") {
            var background = $("#" + id).find(".jnode-box").eq(0).css("background-color");
            if (select_json_2_str.indexOf(id) == -1 || backgroundColor != "rgb(95, 184, 120)") {
                var exist_select_isture = -1
                var tab_index = getActiveTab();
                for (var i=0;i<div_selection_list.length;i++) {
                    var val = div_selection_list[i];
                    var areaId = "#diagramContainer-main" + tab_index;
                    var div_length = $(areaId + " div[id='" + val + "']").length;
                    if (div_length > 0){
                        exist_select_isture = -1
                    }else{
                        exist_select_isture = 0
                        break;
                    }
                }
                var className = $("#"+id)[0].children[0].className;
                var jnode_html = $("#"+id)[0].firstElementChild.innerHTML;
                if (select_json_2_str.indexOf(id) == -1){
                    if (exist_select_isture == -1){
                        $("#" + id).find(".jnode-box").eq(0).css("background-color", "#5FB878");
                        var color = "";
                        if (className.indexOf("bdc-success") != -1) {
                            color = "#4cae4c";
                        } else if (className.indexOf("bdc-primary") != -1) {
                            color = "#122b40";
                        } else if (className.indexOf("bdc-warning") != -1) {
                            color = "#4F6228";
                        } else if (className.indexOf("bdc-danger") != -1) {
                            color = "#ac2925";
                        } else if (className.indexOf("bdc-wait") != -1) {
                            color = "#215967";
                        } else if (className.indexOf("bdc-process") != -1) {
                            color = "#92D050";
                        }
                        div_selection_list.push(id);
                        // 感觉是改成backgroundColor
                        div_json[id] = backgroundColor;
                        // div_json[id] = color;
                        div_json[id + "className"] = className;
                        div_json[id + "jnodeHtml"] = jnode_html;
                    }else{
                        layer.msg(gettext("Select by double click with errors! You can not select modules across tabs,Please return to the last tab page."), {
                        time: 3000,
                        icon: 5,
                        });
                        return
                    }
                }
            }
        }
    }
}

function showInsertProcess(id) {
    var process_id = $("#" + id)[0].children[0].children[0].getAttribute("name");
    openCertainProcess(process_id);
}

function openCertainProcess(select_file) {
    var tab_index = getActiveTab();
    if (parseInt(tab_index) == 0) {
        layer.msg(gettext("Not allowed in view codes")+'!', {
            offset: 't',
        });
        return false;
    }
    var showed_paths = select_file.split("\\");
    var showed_path = "";
    var type = "";
    var select_type = select_file.split("\\")[0]
    if (select_type == "public") {
        showed_path = "Public"
        for (var i = 1; i < showed_paths.length; i++) {
            showed_path = showed_path + "\\" + showed_paths[i];
        }
        type = 'public';
    } else if (select_type == "release") {
        showed_path = "Release"
        for (var i = 1; i < showed_paths.length; i++) {
            showed_path = showed_path + "\\" + showed_paths[i];
        }
        type = 'release';
    } else {
        showed_path = "Private"
        for (var i = 1; i < showed_paths.length; i++) {
            showed_path = showed_path + "\\" + showed_paths[i];
        }
        type = 'private';
    }
    showed_path = showed_path.replace(".py", "");
    var file_paths = showed_path.split('\\');
    var file_path = '',file_name = '';
    for (var i = 0; i < file_paths.length; i++) {
        if (i != file_paths.length - 1) {
            file_path += file_paths[i] + '\\';
        } else {
            file_name = file_paths[i]
        }
    }
    var select_file_divs = $("input[name='select_file']");
    for (var i = 0; i < select_file_divs.length; i++) {
        var selectFile = select_file_divs[i].value;
        if (select_file == selectFile) {
            layer.msg(gettext("This process has been opened")+'!', {
                offset: 't',
            });
            return false;
        }
    }
    var divs = $('#process-area' + tab_index.toString()).find('.jnode-box');
    var tab_title = file_name;
    var select_tab = $('.tabs-selected').text();
    var exist_tabs = $("#tt").tabs().tabs('tabs');
    var title_list = new Array;
    for (var i = 0; i < exist_tabs.length; i++) {
        var exist_title = exist_tabs[i].panel('options').title;
        title_list.push(exist_title)
    }
    $('#tt').tabs("select", select_tab);
    var result = title_list.includes(tab_title);
    var ini_num = 2;
    while (result == true) {
        tab_title = file_name + ' (' + ini_num + ')';
        result = title_list.includes(tab_title);
        ini_num += 1;
    }
    if (divs.length > 0) {
        var tabs = $('#tt').tabs('tabs');
        if (tabs.length == 5) {
            layer.msg(gettext("Maximum Tabs"), {
                offset: 't',
            });
            return false;
        } else {
            addPanel(tab_title);
            $('#tt').tabs("select", tab_title);
            tab_index = getActiveTab();
            $('#file_path_label' + tab_index.toString()).text(showed_path);
        }
    } else {
        var currTab = $('#tt').tabs('getSelected');
        $('#tt').tabs('update', {
            tab: currTab,
            options: {
                title: tab_title
            }
        });
        $('#file_path_label' + tab_index.toString()).text(showed_path);
        reloadJS("jvisio", "../static/javascript/jvisio-flow/jvisio-index2.js");
    }
    tab_index = getActiveTab();
    $("#selectfile" + tab_index.toString()).val(select_file);
    $.ajax({
        type: 'POST',
        url: '../drawprocess/',
        dataType: 'json',
        data: {
            "type": type,
            "selectfile": select_file
        },
        beforeSend: function() {
            layer.load(2);
        },
        success: function(data) {
            layer.closeAll('loading');
            result = data['result'];
            if (result == "success") {
                var id_json = {};
                extend = data['extend'];
                list = data['list'];
                $("#move").val("yes");
                var tab_index = getActiveTab();
                for (var x = 0; x < list.length; x++) {
                    var dataObj = {};
                    var source_id = list[x].source_id;
                    var org_id = list[x].source_id;
                    var new_id = uuid.v1();
                    dataObj.id = new_id;
                    id_json[org_id] = new_id;
                    dataObj.jnode = list[x].jnode;
                    dataObj.jnodeClass = list[x].jnode_class;
                    var html_result = '';
                    var need2change_html = list[x].jnode_html;
                    if (need2change_html.indexOf('name=') != -1){
                        html_result = need2change_html
                    }else{
                        var before_title = need2change_html.split(">")[0];
                        var after_title = need2change_html.split("<")[1];
                        var need2changed_text = after_title.split(">")[1].split("<")[0];
                        var changed_text = gettext(need2changed_text);
                        if (need2change_html.indexOf('id=') != -1){
                            if (need2changed_text.indexOf("Web_StartBrowser") != -1){
                                var browser_json = JSON.parse(list[x].variant);
                                var browser = browser_json.browser.replace(/"/g,"");
                                if (browser == "ie"){
                                    browser = "IE";
                                }else if(browser == "chrome"){
                                    browser = "Chrome";
                                }else{
                                    browser = "Edge";
                                }
                                var browser_des = "Current browser: " + browser;
                                $("#browser_mode" + tab_index.toString()).val(browser.toLowerCase());
                                $("#current_browser" + tab_index.toString()).text(gettext(browser_des));
                            }
                            html_result = before_title + ">" + changed_text + "</span>";
                        }else{
                            html_result = '<span id="' + need2changed_text + '" class="flow-span" title='+changed_text+'>' + changed_text + '</span>';
                        }
                    }
                    dataObj.jnodeHtml = html_result;
                    dataObj.left = parseFloat(list[x].left);
                    dataObj.top = parseFloat(list[x].top);
                    var targetHtml = Mustache.render($("#jnode-template").html(), dataObj);
                    $("#diagramContainer-main" + tab_index.toString()).append(targetHtml);
                    // 判断、循环结构赋颜色
                    try {
                        process_background_color_rgb = JSON.parse(list[x].variant)["process_background_color"];
                        rgb_color = process_background_color_rgb.substring(1, process_background_color_rgb.length - 1)
                        rgb_color = "rgb(" + rgb_color + ")"
                        $("#"+dataObj.id).find(".jnode-box").eq(0).css("background", rgb_color);
                    } catch(err) {

                    }
                    adjSize(dataObj.id,tab_index);
                    jsPlumb.draggable(new_id, {
                        containment: 'parent'
                    });
                    addPoints(new_id);
                    var status = list[x].status;
                    if (status == 'saved') {
                        $("#" + new_id).find(".jnode-box").eq(0).css("border", "3px solid #d58512");
                        div_status[new_id] = "saved";
                    }
                    var group_id = $("#group_id").val();
                    if (org_id == group_id){
                        $("#" + new_id).find(".jnode-box").eq(0).css("border", "3px solid #ac2925");
                    }
                    $("#" + new_id).on("mouseenter", ".jnode-box", function() {
                        var left = parseFloat($("#icon_left" + tab_index.toString()).val());
                        var top = parseFloat($("#icon_top" + tab_index.toString()).val());
                        var right = parseFloat($("#icon_right" + tab_index.toString()).val());
                        var backgroundColor = $(this).css("background-color");
                        var className = this.className || "";
                        if (backgroundColor == "rgb(146, 208, 80)" && className.indexOf("jnode-judge") == -1) {
                            var divWidth = $(this).width() / 2 - 3;
                            if (showed_path.substring(0, 7) != "Release" && showed_path.substring(0, 7) != "release"){
                                $(this).append('<i class="fa fa-trash-o" style="position:absolute;color:#fff;left:' + left + 'px;top:' + top + 'px;z-index:12;"/>');
                                $(this).append('<i class="fa fa-cog" style="position:absolute;color:#fff;right:' + right + 'px;top:' + top + 'px;z-index:12;"/>');
                            }
                            $(this).append('<i class="icon-refresh" style="position:absolute;color:#fff;left:' + divWidth + 'px;top:' + 4 + 'px;z-index:12;"/>');
                        } else if(backgroundColor == "rgb(128, 128, 128)" && className.indexOf("jnode-judge") == -1) {
                            if (showed_path.substring(0, 7) != "Release" && showed_path.substring(0, 7) != "release"){
                                $(this).append('<i class="fa fa-trash-o" style="position:absolute;color:#fff;left:' + left + 'px;top:' + top + 'px;z-index:12;"/>');
                            }
                            $(this).append('<i class="fa fa-cogs" style="position:absolute;color:#fff;right:' + right + 'px;top:' + top + 'px;z-index:12;"/>');
                        } else {
                            if (showed_path.substring(0, 7) != "Release" && showed_path.substring(0, 7) != "release"){
                                $(this).append('<i class="fa fa-trash-o" style="position:absolute;color:#fff;left:' + left + 'px;top:' + top + 'px;z-index:12;"/>');
                            }
                            $(this).append('<i class="fa fa-cog" style="position:absolute;color:#fff;right:' + right + 'px;top:' + top + 'px;z-index:12;"/>');
                        }
                    }).on("mouseleave", ".jnode-box", function() {
                        $(".fa-trash-o").remove();
                        $(".fa-cog").remove();
                        $(".fa-cogs").remove();
                        $(".icon-refresh").remove();
                    }).on("mousedown", ".jnode-box", function() {
                        var div = $(this);
                        var text = div[0].children[0].innerText;
                        var new_text = text.replace(/ /g, "-");
                        $(this)[0].children[0].innerText = new_text;
                    }).on("mouseover", ".jnode-box", function() {
                        var id = $(this).parent()[0].id || $(this).parent()[0].parentElement.id;
                        hideLabel(id);
                    }).on("mouseout", ".jnode-box", function() {
                        var id = $(this).parent()[0].id || $(this).parent()[0].parentElement.id;
                        showLabel(id);
                    }).on("mouseup", ".jnode-box", function() {
                        var div = $(this);
                        var text = div[0].children[0].innerText;
                        var new_text = text.replace(/-/g, " ");
                        $(this)[0].children[0].innerText = new_text;
                    }).on("click", ".fa-trash-o", function() {
                        var id = $(this).parent()[0].parentElement.id;
				        deleteDiv(id);
                    }).on("click", ".fa-cog", function() {
                        var parent_div = $(this).parent()[0];
                        var id = parent_div.parentElement.id;
                        setting(id);
                    }).on("click", ".fa-cogs", function() {
                        var parent_div = $(this).parent()[0];
                        var id = parent_div.parentElement.id;
                        ungroup(id);
                    }).on("click", ".icon-refresh", function() {
                        var id = $(this).parent()[0].parentElement.id;
				        showInsertProcess(id);
                    }).on("dblclick", ".jnode-box", function() {
                        var id = $(this).parent()[0].id;
				        dblClickDiv(id);
                    });
                }
                $("#move").val("");
                $("#left").val("");
                $("#top").val("");
                for (var y = 0; y < list.length; y++) {
                    id1 = list[y].source_id;
                    id1 = id_json[id1];
                    id2 = list[y].target_id;
                    id2 = id_json[id2];
                    direction1 = list[y].source_type;
                    direction2 = list[y].target_type;
                    if (direction1 != "" && direction1 != null) {
                        var name = list[y + 1].name || "";
                        var isvisible = false;
                        if (name != "" && name != null) {
                            isvisible = true
                        }else{
                            name = "";
                        }
                        name_json[id2] = name;
                        addConnection(id1,id2,direction1,direction2,name,isvisible);
                    }
                }
                adjSeq();
                var transfer = "yes";
                if (extend == "yes") {
                    for (var l = 0; l < list.length; l++) {
                        var public_variant = list[l].public_variant;
                        if (public_variant != "" && public_variant != null && public_variant != "{}") {
                            transfer = "no";
                            var public_type = $("#type"+tab_index.toString()).val();
                            var public_file = $("#selectfile"+tab_index.toString()).val();
                            // Ajax处理特殊字符&
                            public_file =　encodeURIComponent(public_file);
                            var index = layer.open({
                                type: 2,
                                title: gettext('Public Variants'),
                                content: '../publicvariant/?type=' + public_type + '&selectfile=' + public_file,
                                area: ['320px', '195px'],
                                maxmin: true,
                                btn: [gettext("Submit"), gettext("Cancel")],
                                btn1: function(index, layero) {
                                    var iframeWin = window[layero.find('iframe')[0]['name']];
                                    var public_list = new Array;
                                    for (var o = 0; o < list.length; o++) {
                                        var variant_string = list[o].variant;
                                        var public_json = {};
                                        try {
                                            public_json = eval('(' + variant_string + ')');
                                        } catch(err) {
                                            public_json = {};
                                        }
                                        var id = list[o].source_id;
                                        if (iframeWin.document.getElementById(id)) {
                                            var div = iframeWin.document.getElementById(id);
                                            var input_childs = div.getElementsByTagName("input");
                                            for (var p = 0; p < input_childs.length; p++) {
                                                var input_child = input_childs[p];
                                                var value = input_child.value;
                                                var name = input_child.name;
                                                if (name != "" && name != null) {
                                                    public_json[name] = value.toString();
                                                }
                                            }
                                            var select_childs = div.getElementsByTagName("select");
                                            for (var p = 0; p < select_childs.length; p++) {
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
                                    var tab = getActiveTab();if(tab == ''){tab = 0};
                                    var json1 = id_json;
                                    json1.list = public_list;
                                    json1.type = public_type;
                                    json1.selectfile = public_file;
                                    json1.tab = tab;
                                    $.ajax({
                                        type: 'POST',
                                        url: '../publictransfer/',
                                        dataType: 'json',
                                        data:json1 ,
                                        beforeSend: function() {
                                            layer.load(2);
                                        },
                                        success: function(data) {
                                            layer.closeAll('loading');
                                            result = data['result'];
                                            if (result == "success") {
                                                var list = data['list'];
                                                for (var i = 0; i < list.length; i++) {
                                                    var div = document.getElementById(list[i]);
                                                    div.children[0].setAttribute("style", "border:3px solid #d58512");
                                                }
                                                layer.msg(gettext("Save public variants successfully")+'!', {
                                                    time: 1000,
                                                    icon: 6,
                                                });
                                            } else {
                                                layer.msg(gettext("Save public variants failed")+'!', {
                                                    time: 1000,
                                                    icon: 5,
                                                });
                                            }
                                            layer.close(index);
                                        }
                                    })
                                },
                                btn2: function(index, layero) {
                                    var iframeWin = window[layero.find('iframe')[0]['name']];
                                    var public_list = new Array;
                                    for (var o = 0; o < list.length; o++) {
                                        var variant_string = list[o].variant;
                                        var public_json = {};
                                        try {
                                            public_json = eval('(' + variant_string + ')');
                                        } catch(err) {
                                            public_json = {};
                                        }
                                        var id = list[o].source_id;
                                        if (iframeWin.document.getElementById(id)) {
                                            var div = iframeWin.document.getElementById(id);
                                            var input_childs = div.getElementsByTagName("input");
                                            for (var p = 0; p < input_childs.length; p++) {
                                                var input_child = input_childs[p];
                                                var value = input_child.value;
                                                var name = input_child.name;
                                                if (name != "" && name != null) {
                                                    public_json[name] = value.toString();
                                                }
                                            }
                                            var select_childs = div.getElementsByTagName("select");
                                            for (var p = 0; p < select_childs.length; p++) {
                                                var select_child = select_childs[p];
                                                var value = "";
                                                var name = select_child.name;
                                                public_json[name] = value.toString();
                                            }
                                            list[o].variant = JSON.stringify(public_json);
                                        }
                                        json_2_str = JSON.stringify(list[o]);
                                        public_list.push(json_2_str);
                                    }
                                    $.ajax({
                                        type: 'POST',
                                        url: '../publictransfer/',
                                        dataType: 'json',
                                        data: {
                                            "list": public_list,
                                            "type": public_type,
                                            "selectfile": public_file
                                        },
                                        beforeSend: function() {
                                            layer.load(2);
                                        },
                                        success: function(data) {
                                            layer.closeAll('loading');
                                            result = data['result'];
                                            if (result == "success") {
                                                var list = data['list'];
                                                for (var i = 0; i < list.length; i++) {
                                                    var div = document.getElementById(list[i]);
                                                    div.children[0].setAttribute("style", "border:3px solid #d58512");
                                                }
                                            } else {
                                                layer.msg(gettext("Clear public variants failed")+'!', {
                                                    time: 1000,
                                                    icon: 5,
                                                });
                                            }
                                            layer.close(index);
                                        }
                                    })
                                }
                            });
                            layer.full(index);
                            break;
                        }
                    }
                }
                if (transfer == "yes") {
                    var tab = getActiveTab();
                    var transfer_type = $("#type").val();
                    var transfer_file = $("#selectfile" + tab.toString()).val();
                    if (tab == '') {
                        tab = 0
                    };
                    id_json['type'] = transfer_type;
                    id_json['selectfile'] = transfer_file;
                    id_json['tab'] = tab;
                    $.ajax({
                        type: 'POST',
                        url: '../transfervariant/',
                        dataType: 'json',
                        data: id_json,
                        beforeSend: function() {
                            layer.load(2);
                        },
                        success: function(data) {
                            layer.closeAll('loading');
                            result = data['result'];
                            if (result == "success") {
                                var list = data['list'];
                                layer.msg(gettext("Open file successfully")+'!', {
                                    time: 1000,
                                    icon: 6,
                                });
                            } else {
                                layer.msg(gettext("Open failed")+'!', {
                                    time: 1000,
                                    icon: 5,
                                });
                            }
                        }
                    })
                }
                $("#type").val("");
            } else {
                layer.alert(gettext("Open failed, file has been damaged")+'!', {
                    title: gettext("Open Failed"),
                    skin: 'layui-layer-lan',
                    closeBtn: 1,
                    icon: 5,
                    offset: 'rb',
                    btn: false,
                });
            }
        },
    });
}


function download(type) {
    var tab_index = getActiveTab();
    var filePath = $('#file_path_label' + tab_index.toString()).text();
    if (type.indexOf('process') != -1){
        if (filePath == ""){
            layer.msg(gettext("Please choose one process first!"), {
                offset: 't',
            });
            return false;
        }else{
            window.location.href = "../downloadprocess/?filePath="+filePath;
        }
    }else{
        if (tab_index === 0){
            var formdata = layui.table.cache["codeTable"];
            if (formdata.length == 0){
                layer.msg(gettext("Please choose one process first!"), {
                    offset: 't',
                });
                return false;
            }
            var fileName = $(".selected_tab").text();
            if (!fileName){
                var tabs = $("#tt").tabs().tabs('tabs');
                if (tabs.length == 2){
                    fileName = tabs[1].panel('options').tab.find(".tabs-title").html();
                }
            }
            var codeList = new Array;
            for (var i=0;i<formdata.length;i++){
                var code = formdata[i].code;
                codeList.push(code);
            }
            $.ajax({
                url: '../getdownloadcodes/',
                type: 'post',
                data: {"codeList":codeList,"type":type,"fileName":fileName},
                success: function(res) {
                    var result = res.result;
                    var path = res.path;
                    if (result == "success"){
                        location.href = "../startdownloadcodes/?path="+path;
                    }else{

                    }
                }
            })
        }else{
            layer.msg(gettext("Please choose view codes page!"), {
                offset: 't',
            });
            return false;
        }
    }
}

function upload() {
    $("#myfile").click();
}

function importfile() {
    var formdata = new FormData();
    var file_obj = $('[name=myfile]')[0].files[0];
    var file_name = file_obj.name;
    if (file_name.indexOf(".lbt") == -1) {
        layer.msg(gettext("Please select the LBT format file!"), {
            offset: 't',
        });
        return false;
    } else {
        var tab_index = getActiveTab();
        if (parseInt(tab_index) == 0) {
            layer.msg(gettext("Not allowed in view codes") + '!', {
                offset: 't',
            });
            return false;
        }
        var divs = $('#process-area' + tab_index.toString()).find('.jnode-box');
        if (divs.length > 0) {
            var tabs = $('#tt').tabs('tabs');
            if (tabs.length == 5) {
                layer.msg(gettext("Maximum Tabs"), {
                    offset: 't',
                });
                return false;
            }
        }
        var tab_title = file_name.replace(".lbt", "");
        var select_tab = $('.tabs-selected').text();
        var exist_tabs = $("#tt").tabs().tabs('tabs');
        var title_list = new Array;
        for (var i = 0; i < exist_tabs.length; i++) {
            var exist_title = exist_tabs[i].panel('options').title;
            title_list.push(exist_title)
        }
        $('#tt').tabs("select", select_tab);
        var result = title_list.includes(tab_title);
        var ini_num = 2;
        while (result == true) {
            tab_title = file_name.replace(".lbt", "") + ' (' + ini_num + ')';
            result = title_list.includes(tab_title);
            ini_num += 1;
        }
        if (divs.length > 0) {
            var tabs = $('#tt').tabs('tabs');
            if (tabs.length == 5) {
                layer.msg(gettext("Maximum Tabs"), {
                    offset: 't',
                });
                return false;
            } else {
                var tabs = $('#tt').tabs('tabs');
                addPanel(tab_title);
                $('#tt').tabs("select", tab_title);
                tab_index = getActiveTab();
            }
        } else {
            var currTab = $('#tt').tabs('getSelected');
            $('#tt').tabs('update', {
                tab: currTab,
                options: {
                    title: tab_title
                }
            });
            reloadJS("jvisio", "../static/javascript/jvisio-flow/jvisio-index2.js");
        }
        tab_index = getActiveTab();
        var csrf_data = $('[name=csrfmiddlewaretoken]').val();
        formdata.append('file_obj', file_obj);
        formdata.append('csrfmiddlewaretoken', csrf_data);
        $("#myfile").val("");
        $.ajax({
            url: '../uploadprocess/',
            type: 'post',
            data: formdata,
            processData: false,
            // 不处理数据
            contentType: false,
            // 不设置内容类型
            success: function(res) {
                var tab_index = getActiveTab();
                var status = res.status;
                if (status == "error") {
                    var msg = res['msg'];
                    var conso = res['conso'];
                    $('#control_area').html(conso);
                    $('#cc').layout('expand', 'south');
                } else {
                    var list = res.list;
                    var id_json = {};
                    for (var x = 0; x < list.length; x++) {
                        var dataObj = {};
                        var source_id = list[x].source_id;
                        var org_id = list[x].source_id;
                        var new_id = uuid.v1();
                        dataObj.id = new_id;
                        div_status[new_id] = list[x].status;
                        id_json[org_id] = new_id;
                        dataObj.jnode = list[x].jnode;
                        dataObj.jnodeClass = list[x].jnode_class;
                        var html_result = '';
                        var need2change_html = list[x].jnode_html;
                        if (need2change_html.indexOf('name=') != -1) {
                            html_result = need2change_html
                        } else {
                            var before_title = need2change_html.split(">")[0];
                            var after_title = need2change_html.split("<")[1];
                            var need2changed_text = after_title.split(">")[1].split("<")[0];
                            var changed_text = gettext(need2changed_text);
                            if (need2change_html.indexOf('id=') != -1) {
                                if (need2changed_text.indexOf("Web_StartBrowser") != -1) {
                                    var browser_json = JSON.parse(list[x].variant);
                                    var browser = browser_json.browser.replace(/"/g, "");
                                    if (browser == "ie") {
                                        browser = "IE";
                                    } else if (browser == "chrome") {
                                        browser = "Chrome";
                                    } else {
                                        browser = "Edge";
                                    }
                                    var browser_des = "Current browser: " + browser;
                                    $("#current_browser").text(gettext(browser_des));
                                }
                                html_result = before_title + ">" + changed_text + "</span>";
                            } else {
                                html_result = '<span id="' + need2changed_text + '" class="flow-span" title=' + changed_text + '>' + changed_text + '</span>';
                            }
                        }
                        dataObj.jnodeHtml = html_result;
                        dataObj.left = parseFloat(list[x].left);
                        dataObj.top = parseFloat(list[x].top);
                        var targetHtml = Mustache.render($("#jnode-template").html(), dataObj);
                        $("#diagramContainer-main" + tab_index.toString()).append(targetHtml);
                        // 判断、循环结构赋颜色
                        try {
                            process_background_color_rgb = JSON.parse(list[x].variant)["process_background_color"];
                            rgb_color = process_background_color_rgb.substring(1, process_background_color_rgb.length - 1)
                            rgb_color = "rgb(" + rgb_color + ")"
                            $("#"+dataObj.id).find(".jnode-box").eq(0).css("background", rgb_color);
                        } catch(err) {

                        }
                        adjSize(dataObj.id,tab_index);
                        jsPlumb.draggable(new_id, {
                            containment: 'parent'
                        });
                        addPoints(new_id);
                        var status = list[x].status;
                        if (status == 'saved') {
                            $("#" + new_id).find(".jnode-box").eq(0).css("border", "3px solid #d58512");
                        }
                        addMouseEvent(new_id);
                    }
                    $("#move").val("");
                    $("#left").val("");
                    $("#top").val("");
                    for (var y = 0; y < list.length; y++) {
                        id1 = list[y].source_id;
                        id1 = id_json[id1];
                        id2 = list[y].target_id;
                        id2 = id_json[id2];
                        direction1 = list[y].source_type;
                        direction2 = list[y].target_type;
                        if (direction1 != "" && direction1 != null) {
                            try {
                                var name = list[y + 1].name || "";
                            } catch (err) {

                            }
                            var isvisible = false;
                            if (name != "" && name != null) {
                                isvisible = true
                            }else{
                                name = ""
                            }
                            addConnection(id1,id2,direction1,direction2,name,isvisible);
                        }
                    }
                    adjSeq();
                    var transfer_list = []
                    for (var i = 0; i < list.length; i++) {
                        var transfer_json = {};
                        transfer_json = list[i];
                        transfer_json.source_id = id_json[transfer_json.source_id];
                        transfer_json.target_id = id_json[transfer_json.target_id];
                        transfer_list.push(JSON.stringify(transfer_json));
                    }
                    var tab = getActiveTab();
                    if (tab == '') {
                        tab = 0
                    };
                    $.ajax({
                        type: 'POST',
                        url: '../transfertoaction/',
                        dataType: 'json',
                        data: {
                            "list": transfer_list,
                            "tab": tab
                        },
                        beforeSend: function() {
                            layer.load(2);
                        },
                        success: function(data) {
                            layer.closeAll('loading');
                        }
                    })
                }
            }
        })
    }
}


//group steps
function group(){
    var tab_index = getActiveTab();
    if (parseInt(tab_index) == 0){
        layer.msg(gettext("Not allowed in view codes!"), {
            offset: 't',
        });
        return false;
    }
    var divs = $('#process-area'+ tab_index.toString()).find('.jnode-box');
    var div_list = new Array;
    var connect = getConnections();
    for (var i=0;i<divs.length;i++){
        var div = divs[i];
        var id = div.parentElement.id;
        var obj = document.getElementById(id);
        if(obj){
            if (div_selection_list.includes(id)){
                var div = obj.children[0];
                var color = div.style.border;
                if (color != "3px solid rgb(213, 133, 18)" && color != "3px solid rgb(172, 41, 37)"){
                    layer.msg(gettext("Only saved steps can be merged!"), {
                        offset: 't',
                    });
                    return false;
                }
                var className = div.className;
                //check whether has judge step
                if (className.indexOf("bdc-warning") != -1){
                    layer.msg(gettext("These kinds of If, while, for cannot be grouped!"), {
                        offset: 't',
                    });
                    return false;
                }else{
                    var child = obj.lastElementChild;
                    connect[id+"-left"] = child.parentElement.offsetLeft;
                    connect[id+"-top"] = child.parentElement.offsetTop;
                }
                div_list.push(id);
            }
        }
    }
    //check more than 2 steps
    if (div_list.length < 2){
        layer.msg(gettext("Please select at least two steps to merge!"), {
            offset: 't',
        });
        return false;
    }
    //check whether connected and adjacent
    var sourceType1 = "",sourceType2 = "",targetType1 = "",targetType2 = "";
    var startId = "",endId = "";
    for (var i=0;i<div_list.length;i++){
        var div = div_list[i];
        var option1 = {},option2 = {};
        var sourceId = "",targetId = "";
        option1.source = div;
        option2.target = div;
        var con1 = jsPlumb.getConnections(option1,"");
        var con2 = jsPlumb.getConnections(option2,"");
        var lastLabel = "";
        if (con1.length + con2.length > 0){
            if (con1.length > 0){
                targetId = con1[0].targetId;
                connect[div] = targetId;
                connect[div+"-sourceType"] = con1[0].endpoints[0].anchor.type;
                connect[div+"-targetType"] = con1[0].endpoints[1].anchor.type;
            }
            if (con2.length > 0){
                sourceId = con2[0].sourceId;
                connect[sourceId] = div;
            }
            if (div_selection_list.includes(targetId) == false){
                if (!endId){
                    endId = div;
                    connect.targetId = targetId;
                    sourceType2 = con1[0].endpoints[0].anchor.type;
                    targetType2 = con1[0].endpoints[1].anchor.type;
                    lastLabel = con1[0].getOverlays(div)[1].getLabel();
                }else{
                    layer.msg(gettext("Please make sure that the selected steps are adjacent!"), {
                        offset: 't',
                    });
                    return false;
                }
            }else if(div_selection_list.includes(sourceId) == false){
                if (!startId){
                    startId = div;
                    connect.sourceId = sourceId;
                    connect.startId = div;
                    sourceType1 = con2[0].endpoints[0].anchor.type;
                    targetType1 = con2[0].endpoints[1].anchor.type;
                }else{
                    layer.msg(gettext("Please make sure that the selected steps are adjacent!"), {
                        offset: 't',
                    });
                    return false;
                }
            }
        }else{
            layer.msg(gettext("Please make sure that the selected steps have been connected!"), {
                offset: 't',
            });
            return false;
        }
    }
    layer.prompt({
        btn: [gettext("Confirm"), gettext("Cancel")],
        title: gettext("Please input your group name"),
        formType: 3,
        btn2: function(index, layero) {
            layer.closeAll('loading');
        },
    },function(pass, index) {
        layer.close(index);
        group_name = pass;
        if (group_name.length > 20){
            layer.msg(gettext("No more than 20 characters!"), {
                offset: 't',
            });
            return false;
        }
        var pattern = new RegExp("[^a-zA-Z0-9\\_\u4e00-\u9fa5\\s ]","i");
        var illegal = pattern.test(pass);
        if (illegal == true) {
            layer.msg(gettext('Group name contains illegal characters!'));
            return false;
        }
        connect.group = group_name;
        connect.groupId = uuid.v1();
        connect.steps = div_list;
        var tab = tab_index;if(tab == ''){tab = 0};
        connect.tab = tab;
        $.ajax({
            type: 'POST',
            url: '../groupsteps/',
            dataType: 'json',
            data: connect,
            beforeSend: function() {
                layer.load(2);
            },
            success: function(data) {
                layer.closeAll('loading');
                var status = data['status'];
                if (status == "success"){
                    for (var i=0;i<div_list.length;i++){
                        var divId = div_list[i];
                        $("#"+divId).remove();
                        div_selection_list.splice($.inArray(divId,div_selection_list),1);
                        jsPlumb.detachAllConnections(divId); //删除divID所有连接线
                        jsPlumb.removeAllEndpoints(divId); //刪除divID所有端點
                    }
                    var dataObj = {};
                    dataObj.id = connect.groupId;
                    dataObj.jnode = "task";
                    dataObj.jnodeClass = "jnode-task bdc-group";
                    dataObj.jnodeHtml = '<span name="' + group_name + '" class="flow-span" title="' + group_name + '">' + group_name + '</span>';
                    dataObj.left = parseFloat(connect[connect.startId+"-left"]);
                    dataObj.top = parseFloat(connect[connect.startId+"-top"]);
                    var targetHtml = Mustache.render($("#jnode-template").html(), dataObj);
                    $("#diagramContainer-main" + tab_index.toString()).append(targetHtml);
                    adjSize(dataObj.id,tab_index);
                    addPoints(connect.groupId);
                    $("#" + connect.groupId).find(".jnode-box").eq(0).css("border", "3px solid #d58512");
                    addMouseEvent(connect.groupId);
                    addConnection(connect.sourceId,connect.groupId,sourceType1,targetType1,"",false);
                    if (lastLabel != ""){var isvisible = true;}else{var isvisible = false;lastLabel = ""}
                    addConnection(connect.groupId,connect.targetId,sourceType2,targetType2,lastLabel,isvisible);
                    jsPlumb.draggable(connect.groupId, {containment: 'parent'});
                    adjSeq();
                }else{
                    var msg = data['msg'];
                    $('#control_area').html(msg);
                    $('#cc').layout('expand', 'south');
                }
            }
        })
    })
}

//ungroup steps
function ungroup(id){
    layer.confirm(gettext("Are you sure to ungroup")+'?', {
        title: gettext("Ungroup Confirmation"),
        btn: [gettext("Yes"), gettext("No")]
    },function(index) {
        layer.close(index);
        var tab_index = getActiveTab();if(tab_index == ''){var tab = 0}else{var tab = tab_index};
        $.ajax({
            type: 'POST',
            url: '../breakupsteps/',
            dataType: 'json',
            data: {"id":id,"tab":tab},
            beforeSend: function() {
                layer.load(2);
            },
            success: function(data) {
                layer.closeAll('loading');
                //get group connection
                var option1 = {},option2 = {};
                var sourceId = "",targetId = "";
                var sourceType1 = "",targetType1 = "";
                var sourceType2 = "",targetType2 = "";
                option1.source = id;
                option2.target = id;
                var con1 = jsPlumb.getConnections(option1,"");
                var con2 = jsPlumb.getConnections(option2,"");
                var lastLabel = "";
                if (con1.length > 0){
                    targetId = con1[0].targetId;
                    sourceType2 = con1[0].endpoints[0].anchor.type;
                    targetType2 = con1[0].endpoints[1].anchor.type;
                    lastLabel = con1[0].getOverlays(id)[1].getLabel();
                }
                if (con2.length > 0){
                    sourceId = con2[0].sourceId;
                    sourceType1 = con2[0].endpoints[0].anchor.type;
                    targetType1 = con2[0].endpoints[1].anchor.type;
                }
                var status = data['status'];
                if (status == "success"){
                    var group_list = data['list'];
                    $("#"+id).remove();
                    jsPlumb.detachAllConnections(id); //删除divID所有连接线
                    jsPlumb.removeAllEndpoints(id); //刪除divID所有端點
                    var lastId = "",lastSourceType = "",lastTargetType = "";
                    for (var i=0;i<group_list.length;i++){
                        var group = group_list[i];
                        var divId = group.id;
                        div_status[divId] = "saved";
                        var orgId = group.orgId;
                        var functionName = group.functionName;
                        var sourceType = group.sourceType;
                        var targetType = group.targetType;
                        var left = group.left;
                        var top = group.top;
                        var name = group.name;
                        if (name != "" && name != null){
                            var isvisible = true;
                        }else{
                            var isvisible = false;
                            name = "";
                        }
                        //draw step
                        var dataObj = {};
                        dataObj.id = divId;
                        if (functionName == "Wait"){
                            dataObj.jnode = "end";
                            dataObj.jnodeClass = "jnode-radius bdc-wait";
                        }else{
                            dataObj.jnode = "task";
                            dataObj.jnodeClass = "jnode-task bdc-primary";
                        }
                        dataObj.jnodeHtml = '<span id="' + functionName + '" class="flow-span" title=' + gettext(functionName) + '>' + gettext(functionName) + '</span>';
                        dataObj.left = parseFloat(left);
                        dataObj.top = parseFloat(top);
                        var targetHtml = Mustache.render($("#jnode-template").html(), dataObj);
                        $("#diagramContainer-main" + tab_index.toString()).append(targetHtml);
                        adjSize(dataObj.id,tab_index);
                        addPoints(divId);
                        var group_id = $("#group_id").val();
                        if (orgId == group_id){
                            $("#" + divId).find(".jnode-box").eq(0).css("border", "3px solid #ac2925");
                        }else{
                            $("#" + divId).find(".jnode-box").eq(0).css("border", "3px solid #d58512");
                        }
                        addMouseEvent(divId);
                        if (i == 0 && sourceId != ""){
                            addConnection(sourceId,divId,sourceType1,targetType1,name,isvisible);
                        }else if(i == group_list.length - 1 && targetId != ""){
                            addConnection(lastId,divId,lastSourceType,lastTargetType,name,isvisible);
                            if (lastLabel != ""){isvisible = true;}else{isvisible = false;lastLabel = "";}
                            addConnection(divId,targetId,sourceType2,targetType2,lastLabel,isvisible);
                        }else if(lastId){
                            addConnection(lastId,divId,lastSourceType,lastTargetType,name,isvisible);
                        }
                        lastId = divId;
                        lastSourceType = sourceType;
                        lastTargetType = targetType;
                        jsPlumb.draggable(divId, {containment: 'parent'});
                        adjSeq();
                    }
                }else{
                    var msg = data['msg'];
                    $('#control_area').html(msg);
                    $('#cc').layout('expand', 'south');
                }
            }
        })
    })
}

function adjSize(id,tab_index){
    var screenSize = parseFloat($("#screen_size" + tab_index).val());
    if (screenSize != 100 && typeof(screen_size) != "undefined") {
        var div = document.getElementById(id).firstElementChild;
        span_width_list.push(id);
        span_width_json[id] = div.getBoundingClientRect().width.toFixed(2);
        var fontSize = parseFloat($("#font_size" + tab_index).val());
        var lineHeight = parseFloat($("#line_height" + tab_index).val());
        div.style.width = span_width_json[id] / 100 * parseInt(screenSize) + 'px';
        div.style.height = div.offsetHeight / 100 * parseInt(screenSize) + 'px';
        div.style.fontSize = fontSize + 'pt';
        div.style.lineHeight = lineHeight + 'px';
    }
}

function addPoints(id){
    visioConfig.baseArchors.forEach(function(key) {
        jsPlumb.addEndpoint(id, {
            anchors: key,
            connectorOverlays: [["Arrow", {
                width: 10,
                length: 10,
                location: 1,
                id: "arrow",
                visible: "false"
            }], ["Label", {
                id: "myLabel",
                cssClass: "connectorLabel flow-span",
                visible: "false",
                events: {
                    "click": function(label, evt) {
                        console.log("clicked on label for connection", label.component);
                    }
                }
            }]]
        },
        visioConfig.hollowCircle);
    });
}

function addMouseEvent(divId){
    $("#" + divId).on("mouseenter", ".jnode-box",
        function() {
            var left = 10,top = 18,right = 10,top = 33;
            var backgroundColor = $(this).css("background-color");
            var className = this.className || "";
            if (backgroundColor == "rgb(146, 208, 80)" && className.indexOf("jnode-judge") == -1) {
                var divWidth = $(this).width() / 2 - 3;
                $(this).append('<i class="fa fa-trash-o" style="position:absolute;color:#fff;left:' + left + 'px;top:' + top + 'px;z-index:12;"/>');
                $(this).append('<i class="fa fa-cog" style="position:absolute;color:#fff;right:' + right + 'px;top:' + top + 'px;z-index:12;"/>');
                $(this).append('<i class="icon-refresh" style="position:absolute;color:#fff;left:' + divWidth + 'px;top:' + 4 + 'px;z-index:12;"/>');
            } else if (backgroundColor == "rgb(128, 128, 128)" && className.indexOf("jnode-judge") == -1) {
                $(this).append('<i class="fa fa-trash-o" style="position:absolute;color:#fff;left:' + left + 'px;top:' + top + 'px;z-index:12;"/>');
                $(this).append('<i class="fa fa-cogs" style="position:absolute;color:#fff;right:' + right + 'px;top:' + top + 'px;z-index:12;"/>');
            } else {
                $(this).append('<i class="fa fa-trash-o" style="position:absolute;color:#fff;left:' + left + 'px;top:' + top + 'px;z-index:12;"/>');
                $(this).append('<i class="fa fa-cog" style="position:absolute;color:#fff;right:' + right + 'px;top:' + top + 'px;z-index:12;"/>');
            }
    }).on("mouseleave", ".jnode-box",
        function() {
            $(".fa-trash-o").remove();
            $(".fa-cog").remove();
            $(".fa-cogs").remove();
            $(".icon-refresh").remove();
    }).on("mousedown", ".jnode-box",
        function() {
            var div = $(this);
            var text = div[0].children[0].innerText;
            var new_text = text.replace(/ /g, "-");
            $(this)[0].children[0].innerText = new_text;
    }).on("mouseup", ".jnode-box",
        function() {
            var div = $(this);
            var text = div[0].children[0].innerText;
            var new_text = text.replace(/-/g, " ");
            $(this)[0].children[0].innerText = new_text;
    }).on("mouseover", ".jnode-box", function() {
        var id = $(this).parent()[0].id || $(this).parent()[0].parentElement.id;
        hideLabel(id);
    }).on("mouseout", ".jnode-box", function() {
        var id = $(this).parent()[0].id || $(this).parent()[0].parentElement.id;
        showLabel(id);
    }).on("click", ".fa-trash-o",
        function() {
            var id = $(this).parent()[0].parentElement.id;
            deleteDiv(id);
    }).on("click", ".fa-cog",
        function() {
            var parent_div = $(this).parent()[0];
            var id = parent_div.parentElement.id;
            setting(id);
    }).on("click", ".fa-cogs",
        function() {
            var parent_div = $(this).parent()[0];
            var id = parent_div.parentElement.id;
            ungroup(id);
    }).on("click", ".icon-refresh",
        function() {
            var id = $(this).parent()[0].parentElement.id;
            showInsertProcess(id);
    }).on("dblclick", ".jnode-box",
        function() {
            var id = $(this).parent()[0].id;
            dblClickDiv(id);
    });
}

function addConnection(id1,id2,direction1,direction2,label,visible){
    label = label.replace(/<br>/g,"");
    var new_name = label.replace(/([^\u0000-\u00FF])/g,"  ");
    if (new_name.length > 16){
        var first_line = label.substring(0,Math.round(label.length / 2));
        var second_line = label.substring(Math.round(label.length / 2),label.length);
        label = first_line + "<br>" + second_line;
        var label_class = "connectorLabel flow-span label-branch";
    }else{
        var label_class = "connectorLabel flow-span";
    }
    var con = jsPlumb.connect({
        anchors: [direction1, direction2, "_jsPlumb_endpoint_anchor"],
        endpoint: ['Dot', {
            radius: 2,
            strokeStyle: '#1e8151',
            fillStyle: 'transparent',
            lineWidth: 2
        }],
        source: id1,
        target: id2,
        hoverPaintStyle: {
            lineWidth: 2,
            strokeStyle: "#d58512",
            outlineWidth: 2,
            outlineColor: "transparent"
        },
        connector: ["Flowchart", {
            stub: [5, 10],
            gap: 5,
            cornerRadius: 5,
            alwaysRespectStubs: true
        }],
        paintStyle: {
            lineWidth: 2,
            strokeStyle: '#337ab7',
            joinstyle: 'round',
            outlineColor: 'transparent',
            outlineWidth: 2
        },
        overlays: [["Arrow", {
            id: "arrow",
            length: 10,
            location: 1,
            visible: false,
            width: 10
        }], ["Label", {
            label: label,
            id: "myLabel",
            name: id1,
            visible: visible,
            cssClass: label_class
        }]],
    });
    if (new_name.length > 16){
        var label_span = con.getOverlays(id1)[1];
        label_span.setLabel(label);
    }
}

function cancelSelect(){
    var tab_index = getActiveTab();
    var divs = $('#process-area'+ tab_index.toString()).find('.jnode-box');
    var ids = new Array;
    for (var i = 0; i < divs.length; i++) {
        var div = divs[i];
        try {
            var id = div.parentElement.id;
            if ($.inArray(id,div_selection_list) != -1){
                div_selection_list.splice($.inArray(id,div_selection_list),1);
                var org_color = div_json[id];
                var div = $("#"+id);
                $(div).children(":first").css({"background-color":org_color});
                delete div_json[id];
            }
        } catch(err) {
            next;
        }
    }
}

function hideLabel(div){
    var option1 = {},option2 = {};
    var sourceId = "",targetId = "";
    option1.source = div;
    option2.target = div;
    var con1 = jsPlumb.getConnections(option1,"");
    var con2 = jsPlumb.getConnections(option2,"");
    if (con1.length > 0 || con2.length > 0){
        $("#"+div).addClass("hide_label");
    }
}

function showLabel(div){
    var option1 = {},option2 = {};
    var sourceId = "",targetId = "";
    option1.source = div;
    option2.target = div;
    var con1 = jsPlumb.getConnections(option1,"");
    var con2 = jsPlumb.getConnections(option2,"");
    if (con1.length > 0 || con2.length > 0){
        $("#"+div).removeClass("hide_label");
    }
}

function adjSeq(){
    var connections = getConnections();
    var tab_index = getActiveTab();
    var divs = $('#process-area'+ tab_index.toString()).find('.jnode-box');
    for (var i = 0; i < divs.length; i++) {
        try {
            var div = divs[i];
            var id = div.parentElement.id;
            if (document.getElementById(id+"_node")){
                $("#"+id+"_node").remove();
            }
        }catch(err){
            continue;
        }
    }
    for (var key in connections){
        if (key.indexOf("nodeNo") != -1){
            var divId = key.replace("nodeNo","");
            var nodeNo = connections[key];
            var left = parseFloat($("#icon_left" + tab_index.toString()).val());
            var top = parseFloat($("#icon_top" + tab_index.toString()).val());
            var right = parseFloat($("#icon_right" + tab_index.toString()).val());
            $("#"+divId).append('<span id=' + divId + '_node class="layui-badge message-alert" style="font-size:8px !important;background:#778899;transform: scale(0.7);position:absolute;color:#fff;border-radius: 12px!important;left:'+0+'px;top:'+0+'px;z-index:12;">'+nodeNo+'</span>');
        }
    }
}

function getDirection(id1,id2){
    var direction1,direction2;
    try{
        var div1 = document.getElementById(id1);
        var div2 = document.getElementById(id2);
        var div1x1 = div1.offsetLeft + div1.parentElement.offsetLeft;
        var div1y1 = div1.offsetTop + div1.parentElement.offsetTop;
        var div1x2 = div1x1 + div1.offsetWidth;
        var div1y2 = div1y1 + div1.offsetHeight;
        var div2x1 = div2.offsetLeft + div2.parentElement.offsetLeft;
        var div2y1 = div2.offsetTop + div2.parentElement.offsetTop;
        var div2x2 = div2x1 + div2.offsetWidth;
        var div2y2 = div2y1 + div2.offsetHeight;
        if (div2y1 >= div1y2){
            direction1 = "BottomCenter";
            direction2 = "TopCenter";
        }else if(div2y2 <= div1y1){
            direction1 = "TopCenter";
            direction2 = "BottomCenter";
        }else{
            if (div2x1 >= div1x1){
                direction1 = "RightMiddle";
                direction2 = "LeftMiddle";
            }else{
                direction1 = "LeftMiddle";
                direction2 = "RightMiddle";
            }
        }
    }catch(err){
        direction1 = "RightMiddle";
        direction2 = "LeftMiddle";
    }
    return {"direction1":direction1,"direction2":direction2};
}

function drawRecordProcess(codes) {
    var tab_index = getActiveTab();
    var divs = $('#process-area' + tab_index.toString()).find('.jnode-box');
    var init_left = 0;
    for (var i = 0; i < divs.length; i++) {
        var div = divs[i].parentElement;
        var divLeft = div.offsetLeft + div.offsetWidth;
        if (divLeft > init_left) {
            init_left = divLeft;
        }
    }
    init_left = init_left + 20;
    var main_height = $("#diagramContainer-main" + tab_index).height();
    var fontSize = parseInt($("#font_size" + tab_index.toString()).val());
    var qtys = parseInt((main_height - 18) / (fontSize * 5 + 40));
    var init_top = 20;
    var num = 1;
    var init_height = fontSize * 5 + 40;
    var width = 0;
    var div_list = [];
    var lastId = "";
    var direction1 = "BottomCenter",
    direction2 = "TopCenter";
    var data_list = [];
    for (var j = 0; j < codes.length; j++) {
        var data_json = {};
        var code = codes[j];
        var action = code.action;
        data_json["function"] = action;
        data_json["variant"] = code.parameters;
        var dataObj = {};
        var new_id = uuid.v1();
        dataObj.id = new_id;
        data_json["div_id"] = new_id;
        div_list.push(new_id);
        dataObj.jnode = "task";
        dataObj.jnodeClass = "jnode-task bdc-primary";
        dataObj.jnodeHtml = '<span id="' + action + '" class="flow-span" title=' + gettext(action) + '>' + gettext(action) + '</span>';
        dataObj.left = init_left;
        dataObj.top = init_top + init_height * (num - 1);
        var targetHtml = Mustache.render($("#jnode-template").html(), dataObj);
        $("#diagramContainer-main" + tab_index.toString()).append(targetHtml);
        var div_width = document.getElementById(new_id).offsetWidth;
        if (div_width > width) {
            width = div_width;
        }
        if (num == qtys || j == codes.length - 1) {
            for (var i = 0; i < div_list.length; i++) {
                var divId = div_list[i];
                var offset = $("#" + divId).offset();
                var offset_adj = {};
                offset_adj.top = offset.top;
                offset_adj.left = parseFloat(offset.left + (width - document.getElementById(divId).offsetWidth) / 2);
                $("#" + divId).offset(offset_adj);
                adjSize(divId,tab_index);
                jsPlumb.draggable(divId, {
                    containment: 'parent'
                });
                addPoints(divId);
                addMouseEvent(divId);
                if (i == 0 && j != 0) {
                    direction1 = "RightMiddle";
                    direction2 = "LeftMiddle";
                } else if (i != 0) {
                    if (init_top == 20) {
                        direction1 = "BottomCenter";
                        direction2 = "TopCenter";
                    } else {
                        direction1 = "TopCenter";
                        direction2 = "BottomCenter";
                    }
                }
                if (lastId) {
                    addConnection(lastId, divId, direction1, direction2, "", false);
                }
                lastId = divId;
                $("#" + divId).find(".jnode-box").eq(0).css("border", "3px solid #d58512");
                div_status[divId] = 'saved';
            }
            div_list = [];
            num = 0;
            if (init_top == 20) {
                init_top = (qtys - 1) * (fontSize * 5 + 40) + 20;
            } else {
                init_top = 20;
            }
            init_height = -init_height;
            init_left = init_left + width + 20;
        }
        num += 1;
        data_list.push(JSON.stringify(data_json));
    }
    if (!tab_index) {
        tab_index = 0;
    }
    $.ajax({
        type: 'POST',
        url: '../saverecordvariant/',
        dataType: 'json',
        data: {
            "data": data_list,
            "tab": tab_index
        },
        beforeSend: function() {
            layer.load(2);
        },
        success: function(data) {
            layer.closeAll('loading');
        }
    })
}

function checkLength(id){
    var description = $('#'+id).val();
    var new_description = description.replace(/([^\u0000-\u00FF])/g,"  ");
    while (new_description.length > 30){
        description = description.substring(0, description.length-1);
        new_description = description.replace(/([^\u0000-\u00FF])/g,"  ");
    }
    $("#"+id).val(description);
}

function generateHandleTreeData(json,treeId){
    let result = [];
    var disabled_json = {"type":true,"num":false};
    ["type","num","id","name","class"].forEach(function (value) {
        if (["type","num"].indexOf(value) > -1){
            treeId+=1;
            var label_text = JSON.stringify(json[value]);
            if (value == "num"){
                label_text = label_text.replace(/\"/g, "");
            }
            result.push({"type":value,"id":treeId,"title":"<label style='color:#5FB878;'>"+value+": </label>"+label_text,"checked":true,"disabled":disabled_json[value]});
        }else{
            if(json.hasOwnProperty(value)){
                treeId+=1;
                if (json.hasOwnProperty(value+"Match")){
                    let type_result = [false,true];
                    if (!type_result[json[value+"Match"]] && control_tree_vars[value]){
                        control_tree_vars[value] = false;
                    }
                    result.push({"type":value,"id":treeId,"title":"<label style='color:#5FB878;'>"+value+": </label>"+JSON.stringify(json[value]),"checked":type_result[json[value+"Match"]]});
                }else{
                    if (control_tree_vars[value] && value != "name"){
                        control_tree_vars[value] = false;
                    }
                    let type_result = false;
                    if (value == "name"){type_result = true;}
                    result.push({"type":value,"id":treeId,"title":"<label style='color:#5FB878;'>"+value+": </label>"+JSON.stringify(json[value]),"checked":type_result});
                }
            }
        }
    });
    return result;
}

//将树形结构num为变量的加上引号，否则无法展开树形结构
function addTreeQuotes(str){
    var str_list = [];
    for (var i=0;i<str.length;i++){
        if (str[i] == "n" && str[i+1] == "u" && str[i+2] == "m" && str[i+3] == "'" && str[i+4] == ":" && str[i+5] != "'" && isNaN(str[i+6])){
            str_list.push(i+5);
            for (var j=i+5;j<str.length;j++){
                if (str[j] == "," && str[j+1] == "'"){
                    str_list.push(j);
                    break;
                }else if (str[j] == "}" && str[j+1] == ","){
                    str_list.push(j);
                    break;
                }
            }
        }
    }
    n = 0;
    str_list.forEach(function (value) {
        str = str.slice(0, value+n) + "'" + str.slice(value+n);
        n+=1;
    })
    return str;
}

function showTree(){
    var h = $("#control_handle").val();
    //判断是否为句柄信息
    if (h.indexOf("{") != -1) {
        //判断是否已经展开树形结构
        var div = document.getElementById("h_control_tree");
        var tree = layui.tree,
        layer = layui.layer;
        if (!div) {
            try{
                //按钮元素
                var html = '<form class="layui-form" action=""><div class="layui-form-item" style="margin:10px 10px;"><div class="layui-btn-container"><button type="button" class="layui-btn layui-btn-sm" lay-demo="expandAll" style="margin-bottom:0px;">' + gettext("Expand All") + '</button><button type="button" class="layui-btn layui-btn-sm" lay-demo="collapseAll" style="margin-bottom:0px;">' + gettext("Collapse All") + '</button></div></div>';
                //全选列表元素
                html += '<div class="layui-form-item" pane style="margin:10px 10px;"><input lay-filter="handleTreeSelect" type="checkbox" name="match[id]" lay-skin="primary" title="id"><input lay-filter="handleTreeSelect" type="checkbox" name="match[name]" lay-skin="primary" title="name" checked><input lay-filter="handleTreeSelect" type="checkbox" name="match[class]" lay-skin="primary" title="class"></div>';
                //树形结构元素
                html += '<div class="layui-form-item"><div id="h_control_tree" class="demo-tree-more"></div></div></form>';

                var options = {
                    type: 1,
                    maxmin: true,
                    id: "h_tree",
                    shadeClose: true,
                    title: gettext("Handle Tree"),
                    area: ['300px', '400px'],
                    content: html,
                    contentFormData: {
                        checkbox: 'false',
                        expandLevel: '-1',
                        isReturnValue: 'false'
                    },
                    success: function(layero, index) {
                        layui.use(['tree', 'util'],
                        function() {
                            var tree = layui.tree,
                            layer = layui.layer,
                            util = layui.util;
                            h = addTreeQuotes(h);
                            try{
                                var h_list = eval(h);
                            }catch(err){
                                try{
                                    var h_list = eval($("#control_handle").val());
                                }catch(e){
                                    top.layer.msg(gettext("Abnormal handle structure, please target again!"), {
                                        icon: 2,
                                        time: 5000
                                    })
                                    return false;
                                }
                            }
                            var list1 = [];
                            var json1 = {};
                            var id = Math.pow(10, h_list.length);
                            var depth = h_list.length;
                            for (var i = 0; i < h_list.length; i++) {
                                var json2 = {};
                                var list2 = [];
                                var j = h_list.length - i - 1;
                                //将最底层没有name的结构默认勾选id跟class
                                if (i == 0){
                                    if (JSON.stringify(h_list[j]).indexOf("Match") == -1 && JSON.stringify(h_list[j]).indexOf("name") == -1 || h_list[j]["name"] == ""){
                                        if (JSON.stringify(h_list[j]).indexOf("id") > -1){
                                            h_list[j]["idMatch"] = 1;
                                        }
                                        if (JSON.stringify(h_list[j]).indexOf("class") > -1){
                                            h_list[j]["classMatch"] = 1;
                                        }
                                    }
                                }

                                id = id / 10;
                                result = generateHandleTreeData(h_list[j], id);
                                for (var n = 0; n < result.length; n++) {
                                    if (depth == 1 && !h_list[j].hasOwnProperty("classMatch") && result[n].type == "class") {
                                        result[n].checked = true;
                                    }
                                    list2.push(result[n]);
                                }
                                list1.unshift({
                                    "id": id,
                                    "title": "<label style='color:#5FB878;'>Depth: </label>" + depth,
                                    "children": list2,
                                    "disabled": true
                                });
                                depth -= 1;
                            }
                            list1 = [{
                                "id": 0,
                                "title": "<label style='color:#5FB878;'>Depth: </label>0",
                                "children": list1,
                                "disabled": true,
                                "spread": true
                            }];

                            //基本演示
                            control_tree = tree.render({
                                elem: '#h_control_tree',
                                data: list1,
                                showCheckbox: true,
                                edit: ['update'] //操作节点的图标
                                ,
                                onlyIconControl: true,
                                showLine: true,
                                id: 'treeId1',
                                oncheck: function(obj) {
                                    if (control_tree) {
                                        if (!control_tree_status){
                                            var dataId = obj.data.id;
                                            var element = obj.elem[0];
                                            var checked = false;
                                            if (element.getElementsByClassName("layui-form-checked").length > 0) {
                                                checked = true;
                                            }else{
                                                if (obj.data.type == "id" || obj.data.type == "name" || obj.data.type == "class"){
                                                    //取消全选
                                                    if ($("input[name='match["+obj.data.type+"]']")[0].checked){
                                                        var form = layui.form;
                                                        $("input[name='match["+obj.data.type+"]']").prop("checked", false);
                                                        form.render('checkbox');
                                                    }
                                                }
                                            }
                                            if (obj.data.checked != checked) {
                                                var firstChildId = dataId.toString().length - 1,
                                                secondChildId = dataId % 10 - 1;
                                                if (firstChildId == 0) {
                                                    secondChildId -= 1;
                                                }
                                                try {
                                                    control_tree.config.data[0].children[firstChildId].children[secondChildId]["checked"] = checked;
                                                } catch(e) {
                                                    console.log();
                                                }
                                            }
                                        }
                                    }
                                },
                                click: function(obj) {
                                    var elem = obj.elem;
                                    //将label移至上层
                                    var textEle = elem[0].getElementsByClassName("layui-tree-txt")[0];
                                    var labelEle = elem[0].getElementsByTagName("label")[0];
                                    textEle.parentElement.insertBefore(labelEle,textEle);

                                    var icon = elem[0].getElementsByClassName("layui-icon-edit")[0];
                                    var width = textEle.offsetWidth;
                                    icon.click();
                                    var inputEle = elem[0].getElementsByClassName("layui-tree-editInput")[0];
                                    inputEle.value = inputEle.value.replace(/<label style="color:#5FB878;">[^#]*(<\/label>)/g, "");
                                    inputEle.style.width = (width + 50) + "px";
                                }
                                /*operate: function(obj) {
                                    var type = obj.type; //得到操作类型：add、edit、del
                                    var data = obj.data; //得到当前节点的数据
                                    var elem = obj.elem; //得到当前节点元素
                                    if (type === 'update') {
                                        var ele = elem[0].getElementsByClassName("layui-tree-txt")[0]; //增加label标签
                                        ele.innerHTML = "<label style='color:#5FB878;'>" + data.type + ": </label>" + ele.innerHTML;
                                    }
                                }*/
                            });

                            //按钮事件
                            util.event('lay-demo', {
                                expandAll: function(othis) {
                                    control_tree_status = "expand";
                                    var data = control_tree.config.data[0];
                                    if (data.hasOwnProperty("children")) {
                                        for (var i = 0; i < data.children.length; i++) {
                                            data.children[i]["spread"] = true;
                                        }
                                        data.spread = true;
                                        control_tree.config.data[0] = data;
                                        //重载实例
                                        control_tree = tree.reload('treeId1', {});
                                    }
                                    control_tree_status = "";
                                },
                                collapseAll: function() {
                                    control_tree_status = "collapse";
                                    var data = control_tree.config.data[0];
                                    data.spread = false;
                                    if (data.hasOwnProperty("children")) {
                                        for (var i = 0; i < data.children.length; i++) {
                                            data.children[i]["spread"] = false;
                                        }
                                    }
                                    control_tree.config.data[0] = data;
                                    //重载实例
                                    control_tree = tree.reload('treeId1', {});
                                    control_tree_status = "";
                                }
                            });
                        });

                        //根据id，name，class是否全选进行调整checkbox框
                        ["id","name","class"].forEach(function (value) {
                            $("input[name='match["+value+"]']")[0].checked = control_tree_vars[value];
                        })
                        //初始化复选框
                        var form = layui.form;
                        form.render();
                        //监听复选框
                        form.on('checkbox(handleTreeSelect)',
                        function(selectData) {
                            var select_type = selectData.elem.name.replace("match[", "").replace("]", "");
                            var checked = selectData.elem.checked;
                            var data = control_tree.config.data[0];
                            var checkedData = tree.getChecked('treeId1');
                            if (checked) {
                                if (data.hasOwnProperty("children")) {
                                    for (var i = 0; i < data.children.length; i++) {
                                        if (data.children[i].hasOwnProperty("children")) {
                                            for (var j = 0; j < data.children[i].children.length; j++) {
                                                var child = data.children[i].children[j];
                                                if (child.type == select_type) {
                                                    data.children[i].children[j].checked = true;
                                                }
                                            }
                                        }
                                    }
                                }
                                control_tree.config.data[0] = data;
                                //重载实例
                                control_tree = tree.reload('treeId1', {});
                            } else {
                                if (data.hasOwnProperty("children")) {
                                    for (var i = 0; i < data.children.length; i++) {
                                        if (data.children[i].hasOwnProperty("children")) {
                                            for (var j = 0; j < data.children[i].children.length; j++) {
                                                var child = data.children[i].children[j];
                                                if (child.type == select_type) {
                                                    data.children[i].children[j].checked = false;
                                                }
                                            }
                                        }
                                    }
                                }
                                control_tree.config.data[0] = data;
                                //重载实例
                                control_tree = tree.reload('treeId1', {});
                            }
                        });

                        if ($(layer.window).width() < 300 || $(layer.window).height() < 400) {
                            layer.full(index);
                        }
                    },
                    btn: ['<i class="fa fa-check"></i>' + gettext("Submit")],
                    btn1: function(index, layero) {
                        var data = control_tree.config.data[0];
                        var h_data = [];
                        if (data.hasOwnProperty("children")) {
                            for (var i = 0; i < data.children.length; i++) {
                                if (data.children[i].hasOwnProperty("children")) {
                                    var json = {};
                                    for (var j = 0; j < data.children[i].children.length; j++) {
                                        var child = data.children[i].children[j];
                                        var title_value = child.title.replace("<label style='color:#5FB878;'>" + child.type + ": </label>", "").replace(/(^")|("$)/g,'').replace(/\\"/g, "'").replace(/\"/g, "'");
                                        json[child.type] = title_value;
                                        if (child.type == "num") {
                                            json[child.type] = Number(json[child.type]) || "choclead_num_variant" + json[child.type] + "choclead_num_variant";
                                        }
                                        if (["id", "name", "class"].indexOf(child.type) > -1) {
                                            if (typeof(child.checked) == "undefined") {
                                                child.checked == false
                                            }
                                            json[child.type + "Match"] = Number(child.checked);
                                        }
                                    }
                                    h_data.push(json);
                                }
                            }
                        }
                        $("#control_handle").val(JSON.stringify(h_data).replace(/\'/g, "choclead_rpa_single_quote").replace(/\"/g, "'").replace(/choclead_rpa_single_quote/g, '"').replace(/choclead_num_variant'/g, '').replace(/'choclead_num_variant/g, ''));
                        control_tree = "";
                        control_tree_status = "";
                        control_tree_vars["id"] = true,control_tree_vars["name"] = true,control_tree_vars["class"] = true;
                    }
                };
                options.btn.push('<i class="fa fa-close"></i>' + gettext("Close"));
                layer.open(options);
            }catch(err){
            }
        }
    }
}
//function showTree(){
//    var h = $("#control_handle").val().replace(/\"/g,"");
//    //判断是否为句柄信息
//    if (h.indexOf("{") != -1){
//        //判断是否已经展开树形结构
//        var div = document.getElementById("h_control_tree");
//        var tree = layui.tree,layer = layui.layer;
//        if (!div){
//            $("#control_handle").after('<div id="h_control_tree" class="demo-tree demo-tree-box" style="width: 100%; height: 150px; overflow: scroll;"></div>');
//            var h_list = eval(h);
//            var list1 = [];
//            var json1 = {};
//            var id = Math.pow(10,h_list.length);
//            for(var i=0;i<h_list.length;i++){
//                var json2 = {};
//                var list2 = [];
//                var j = h_list.length - i - 1;
//                id = id/10;
//                if (i == 0){
//                    json2.id = id;
//                    json2.title = JSON.stringify(h_list[j]);
//                    list1.push(json2);
//                }else{
//                    json2.id = id;
//                    json2.title = JSON.stringify(h_list[j]);
//                    json2.children = list1;
//                    list2.push(json2);
//                    list1 = list2;
//                }
//            }
//            control_tree = tree.render({
//                elem: '#h_control_tree'
//                ,id: 'control_tree'
//                ,data: list1
//                ,edit: ['update'] //操作节点的图标
//                ,onlyIconControl: true
//                ,click: function(obj){
//                    var treeId = obj.data.id;
//                    var eq = treeId.toString().length - 1;
//                    var icon = $("#h_control_tree").find(".layui-icon-edit").eq(eq)[0];
//                    var width = document.getElementsByClassName("layui-tree-txt")[eq].offsetWidth;
//                    icon.click();
//                    document.getElementsByClassName("layui-tree-editInput")[0].style.width = width + "px";
//                }
//            });
//            $("#control_handle").parent().find("i").eq(1).attr("class","fa fa-save");
//        }else{
//            var data = control_tree.config.data[0];
//            var h_data = [];
//            while (data.children){
//                var title = JSON.parse(data.title);
//                h_data.push(title);
//                data = data.children[0];
//            }
//            h_data.push(JSON.parse(data.title));
//            $("#control_handle").val(JSON.stringify(h_data).replace(/\"/g,"'"));
//            $("#h_control_tree").remove();
//            $("#control_handle").parent().find("i").eq(1).attr("class","fa fa-edit");
//            try{
//                var h2 = $("#control_h_show").val();
//                var h2_json = JSON.parse(h2);
//                h2_json.window_class = h_data[0].class;
//                h2_json.window_name = h_data[0].name;
//                h2_json.name = h_data[0].controlName;
//                h2_json.class = h_data[0].controlClass;
//                $("#control_h_show").val(JSON.stringify(h2_json));
//            }catch(err){
//            }
//        }
//    }
//    <!--判断是否是JAVA动作-->
//    if (div){
//        var is_java_operation = false
//        var result = $("#control_h_show").val()
//        try {
//            java_object = JSON.parse(result.replace(/'/g, '"'));
//            is_java_operation = java_object.hasOwnProperty("hwnd") && java_object.hasOwnProperty("Nodes")
//        } catch(err) {
//            console.log(err);
//        }
//        if (is_java_operation == true){
//            var java_update_result = '{"Nodes"' + ": " + $("#control_handle").val().replace(/'/g, '"') + "}"
//            java_object["Nodes"] = JSON.parse(java_update_result)["Nodes"];
//            $("#control_h_show").val(JSON.stringify(java_object).replace(/\"/g,"'"));
//        }
//    }
//}

//更改excel图表更新数据源范围选项
function change_excel_update_chart(){
    var event = window.event || arguments[0];
    var id = event.srcElement.id;
    var ele_index = id.replace("chart_series","");
    var index = $('#'+id).prop('selectedIndex');
    try{
        var option = excel_chart_range[index];
        if (option){
            $("#selected_cells"+ele_index).val("\"" + option + "\"");
        }
    }catch(e){
    }
}