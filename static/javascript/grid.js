var manager,g,o,n,screenWidth;
function select_invoice(resultlist)
        {
            $("#maingrid").remove();
            liger.inject.init();
            $("#taxexport").after("<div id=\"maingrid\"></div>")
            g = manager = $("#maingrid").ligerGrid({
                /*title : 'Maintain',*/
                pageSize:10,
                contentType: 'application/json',
                data: resultlist,
                columns: [
                { display: '是否勾选(是/否)', name: '是否勾选_是_否_field', width: 100, type: 'text'},
                { display: '发票代码', name: '发票代码', width: 80, type: 'text'},
                { display: '发票号码', name: '发票号码', width: 80, type: 'text'},
                { display: '开票日期', name: '开票日期', width: 80,type: 'text'},
                { display: '销方名称', name: '销方名称', type: 'text'},
                { display: '销方税号', name: '销方税号', type: 'text'},
                { display: '金额', name: '金额', width: 100, type: 'number',render: function(rowdata,rowindex,value){
                	if (value==null || value == "0"){
                    	value = "";
                    }else{
                	    var val = Math.round(value*100)/100;
                	}
                	return String(val).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
                    }},
                { display: '税额', name: '税额', width: 80, type: 'number',render: function(rowdata,rowindex,value){
                	if (value==null || value == "0"){
                    	value = "";
                    }else{
                	    var val = Math.round(value*100)/100;
                	}
                	return String(val).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
                    }},
                { display: '税率', width: 60, type: 'number',render: function(rowdata){
                    if (Number(rowdata['金额'])==null || Number(rowdata['金额']) == "0"){
                    	value = "";
                    	return value;
                    }else {
                        var value = Number(rowdata['税额']) / Number(rowdata['金额']);
                        var val = Math.round(value * 100);
                        var valstr = String(val) + '%';
                        return valstr;
                    }}},
                { display: '含税金额', width: 100, type: 'number',render: function(rowdata){
                    if (Number(rowdata['税额'])==null || Number(rowdata['税额']) == "0"){
                    	value = "";
                    	return value;
                    }else {
                	    var value = Number(rowdata['税额']) + Number(rowdata['金额']);
                	    var val = Math.round(value*100)/100;
                	    return String(val).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
                    }}},
                ],isScroll: false,
              //配置设置
                enabledEdit: false,
                isScroll: true,
                checkbox:false,
                rownumbers:false,
                clickToEdit: false,
                width: '100%'
            });
        }

function check_invoice(resultlist)
        {
            $("#maingrid").remove();
            liger.inject.init();
            $("#taxexport").after("<div id=\"maingrid\"></div>")
            g = manager = $("#maingrid").ligerGrid({
                /*title : 'Maintain',*/
                pageSize:10,
                contentType: 'application/json',
                data: resultlist,
                columns: [
                { display: '是否签收', name: '是否签收', width: 60, type: 'text'},
                { display: '是否勾选', name: '是否勾选_是_否_field', width: 60, type: 'text'},
                { display: '发票代码', name: '发票代码', width: 90, type: 'text'},
                { display: '发票号码', name: '发票号码', width: 80, type: 'text'},
                { display: '开票日期', name: '开票日期', width: 80, type: 'text'},
                { display: '销方名称', name: '销方名称', width: 80, type: 'text'},
                { display: '销方税号', name: '销方税号', width: 80, type: 'text'},
                { display: '金额', name: '金额', width: 100, type: 'number',render: function(rowdata,rowindex,value){
                	if (value==null || value == "0"){
                    	value = "";
                    	return value;
                    }else{
                	    var val = Math.round(value*100)/100;
                	    return String(val).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
                	}}},
                { display: '税额', name: '税额', width: 80, type: 'number',render: function(rowdata,rowindex,value){
                	if (value==null || value == "0"){
                    	value = "";
                    	return value;
                    }else{
                	    var val = Math.round(value*100)/100;
                	    return String(val).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
                	}}},
                { display: '税率', width: 60, type: 'number',render: function(rowdata){
                    if (Number(rowdata['金额'])==null || Number(rowdata['金额']) == "0"){
                    	value = "";
                    	return value;
                    }else {
                        var value = Number(rowdata['税额']) / Number(rowdata['金额']);
                        var val = Math.round(value * 100);
                        var valstr = String(val) + '%';
                        return valstr;
                    }}},
                { display: '含税金额', width: 100, type: 'number',render: function(rowdata){
                    if (Number(rowdata['税额'])==null || Number(rowdata['税额']) == "0"){
                    	value = "";
                    	return value;
                    }else {
                	    var value = Number(rowdata['税额']) + Number(rowdata['金额']);
                	    var val = Math.round(value*100)/100;
                	    return String(val).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
                    }}},
                { display: '快递单号/签收人', name: '快递单号', width: 100, type: 'text'},
                { display: '签收日期', name: '签收日期', width: 140, type: 'text',render: function(rowdata,rowindex,value) {
                   if (value == null || value == "0") {
                        var val = "";
                    }else if(value.substring(0,4) == "1900"){
                        var val = "";
                    }else if((value != null && value != "0" && value.substring(0,4) != "1900") ){
                	    var val = value.replace("T"," ");
                	}
                	return String(val);
                }},
                ],isScroll: true,
              //配置设置
//                toolbar: { items: [{ text: '高级自定义查询', click: itemclick, icon: 'search2'}]
//                },
                enabledEdit: false,
                checkbox:true,
                rownumbers:false,
                clickToEdit: false,
                width: '100%',

            });
//        function itemclick()
//        {
//            g.options.data = $.extend(true,{}, resultlist);
//            g.showFilter();
//        }
        }

function scan_invoice(resultlist)
        {
            $("#maingrid").remove();
            liger.inject.init();
            $("#taxexport").after("<div id=\"maingrid\"></div>")
            g = manager = $("#maingrid").ligerGrid({
                /*title : 'Maintain',*/
                pageSize:10,
                contentType: 'application/json',
                data: resultlist,
                columns: [
                { display: '是否签收', name: '是否签收', width: 60, type: 'text'},
                { display: '是否勾选', name: '是否勾选_是_否_field', width: 60, type: 'text'},
                { display: '发票代码', name: '发票代码', width: 90, type: 'text'},
                { display: '发票号码', name: '发票号码', width: 80, type: 'text'},
                { display: '开票日期', name: '开票日期', width: 80,type: 'text'},
                { display: '销方名称', name: '销方名称', type: 'text'},
                { display: '销方税号', name: '销方税号', type: 'text'},
                { display: '金额', name: '金额', width: 100, type: 'number',render: function(rowdata,rowindex,value){
                	if (value==null || value == "0"){
                    	value = "";
                    	return value;
                    }else{
                	    var val = Math.round(value*100)/100;
                	    return String(val).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
                	}}},
                { display: '税额', name: '税额', width: 80, type: 'number',render: function(rowdata,rowindex,value){
                	if (value==null || value == "0"){
                    	value = "";
                    	return value;
                    }else{
                	    var val = Math.round(value*100)/100;
                	    return String(val).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
                	}}},
                { display: '税率', width: 60, type: 'number',render: function(rowdata){
                    if (Number(rowdata['税额'])==null || Number(rowdata['税额']) == "0"){
                    	value = "";
                    	return value;
                    }else {
                        var value = Number(rowdata['税额']) / Number(rowdata['金额']);
                        var val = Math.round(value * 100);
                        var valstr = String(val) + '%';
                        return valstr;
                    }}},
                { display: '含税金额', width: 100, type: 'number',render: function(rowdata){
                    if (Number(rowdata['税额'])==null || Number(rowdata['税额']) == "0"){
                    	value = "";
                    	return value;
                    }else {
                	    var value = Number(rowdata['税额']) + Number(rowdata['金额']);
                	    var val = Math.round(value*100)/100;
                	    return String(val).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
                    }}},
                { display: '快递单号/签收人', name: '快递单号', width: 100, type: 'text'},
                { display: '签收日期', name: '签收日期', width: 140, type: 'text',render: function(rowdata,rowindex,value) {
                   if (value == null || value == "0") {
                        var val = "";
                    }else if(value.substring(0,4) == "1900"){
                        var val = "";
                    }else if((value != null && value != "0" && value.substring(0,4) != "1900") ){
                	    var val = value.replace("T"," ");
                	}
                   return String(val);
                }},
                ],isScroll: true,
                enabledEdit: true,
                clicktoEdit:false,
                checkbox:false,
                rownumbers:false,
                onBeforeEdit: f_onBeforeEdit,
                width: '100%',
            });
        }

function list_invoice(resultlist)
        {
            $("#maingrid").remove();
            liger.inject.init();
            $("#taxexport").after("<div id=\"maingrid\"></div>")
            g = manager = $("#maingrid").ligerGrid({
                /*title : 'Maintain',*/
                pageSize:10,
                contentType: 'application/json',
                data: resultlist,
                columns: [
                { display: '签收日期', name: '签收日期', width: 140, type: 'text',render: function(rowdata,rowindex,value) {
                   if (value == null || value == "0") {
                        var val = "";
                    }else if(value.substring(0,4) == "1900"){
                        var val = "";
                    }else if((value != null && value != "0" && value.substring(0,4) != "1900") ){
                	    var val = value.replace("T"," ");
                	}
                   return String(val);
                }},
                { display: '快递单号/签收人', name: '快递单号', width: 100, type: 'text'},
                { display: '发票代码', name: '发票代码', width: 90, type: 'text'},
                { display: '发票号码', name: '发票号码', width: 80, type: 'text'},
                { display: '开票日期', name: '开票日期', width: 80,type: 'text'},
                { display: '金额', name: '金额', width: 100, type: 'number',render: function(rowdata,rowindex,value){
                	if (value==null || value == "0"){
                    	value = "";
                    	return value;
                    }else{
                	    var val = Math.round(value*100)/100;
                	    return String(val).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
                	}}},
                { display: '销方名称', name: '销方名称', type: 'text'},
                { display: '公司名称', name: '公司名称', type: 'text'},
                ],isScroll: true,
                enabledEdit: false,
                clicktoEdit:false,
                checkbox:false,
                rownumbers:false,
                width: '100%',
            });
        }

function print_invoice(resultlist,n)
        {
            $("#maingrid").remove();
            liger.inject.init();
            $("#taxexport").after("<div id=\"maingrid\"></div>")
            g = manager = $("#maingrid").ligerGrid({
                /*title : 'Maintain',*/
                pageSize:n,
                contentType: 'application/json',
                data: resultlist,
                columns: [
                { display: '签收日期', name: '签收日期', width: 140, type: 'text',render: function(rowdata,rowindex,value) {
                   if (value == null || value == "0") {
                        var val = "";
                    }else if(value.substring(0,4) == "1900"){
                        var val = "";
                    }else if((value != null && value != "0" && value.substring(0,4) != "1900") ){
                	    var val = value.replace("T"," ");
                	}
                   return String(val);
                }},
                { display: '快递单号/签收人', name: '快递单号', width: 100, type: 'text'},
                { display: '发票代码', name: '发票代码', width: 90, type: 'text'},
                { display: '发票号码', name: '发票号码', width: 80, type: 'text'},
                { display: '开票日期', name: '开票日期', width: 80,type: 'text'},
                { display: '金额', name: '金额', width: 100, type: 'number',render: function(rowdata,rowindex,value){
                	if (value==null || value == "0"){
                    	value = "";
                    	return value;
                    }else{
                	    var val = Math.round(value*100)/100;
                	    return String(val).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
                	}}},
                { display: '销方名称', name: '销方名称',  width: 280, type: 'text'},
                { display: '公司名称', name: '公司名称',  width: 280, type: 'text'},
                ],isScroll: true,
                enabledEdit: false,
                clicktoEdit:false,
                checkbox:false,
                rownumbers:false,
                width: '100%',
            });
        }

function f_onBeforeEdit(e)
        {
            var pass = g.rows;
            o = pass;
        }
function endEdit(rowid)
        {
            manager.endEdit(rowid);
        }
function show_list(resultlist)
        {
            $("#maingrid3").remove();
            liger.inject.init();
            $("#taxexport").after("<div id=\"maingrid3\"></div>")
            g = manager = $("#maingrid3").ligerGrid({
                /*title : 'Maintain',*/
                pageSize:10,
                contentType: 'application/json',
                data: resultlist,
                columns: [
                { display: '是否签收', name: '是否签收', width: 60, type: 'text'},
                { display: '是否勾选', name: '是否勾选_是_否_field', width: 60, type: 'text'},
                { display: '发票代码', name: '发票代码', width: 90, type: 'text'},
                { display: '发票号码', name: '发票号码', width: 80, type: 'text'},
                { display: '开票日期', name: '开票日期', width: 80,type: 'text'},
                { display: '销方名称', name: '销方名称', type: 'text'},
                { display: '销方税号', name: '销方税号', type: 'text'},
                { display: '金额', name: '金额', width: 100, type: 'number',render: function(rowdata,rowindex,value){
                	if (value==null || value == "0"){
                    	value = "";
                    	return value;
                    }else{
                	    var val = Math.round(value*100)/100;
                	    return String(val).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
                	}}},
                { display: '税额', name: '税额', width: 80, type: 'number',render: function(rowdata,rowindex,value){
                	if (value==null || value == "0"){
                    	value = "";
                    	return value;
                    }else{
                	    var val = Math.round(value*100)/100;
                	    return String(val).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
                	}}},
                { display: '快递单号/签收人', name: '快递单号', width: 120, type: 'text'},
                { display: '签收日期', name: '签收日期', width: 140, type: 'text',render: function(rowdata,rowindex,value) {
                   if (value == null || value == "0") {
                        var val = "";
                    }else if(value.substring(0,4) == "1900"){
                        var val = "";
                    }else if((value != null && value != "0" && value.substring(0,4) != "1900") ){
                	    var val = value.replace("T"," ");
                	}
                   return String(val);
                }},
                ],isScroll: false,
                onCheckAllRow: f_onCheckAllRow,
                enabledEdit: false,
                isScroll: true,
                checkbox:false,
                rownumbers:false,
                clickToEdit: false,
                width: '100%',

            });
        }

function error_list(errorlist)
        {
            $("#maingrid2").remove();
            liger.inject.init();
            $("#taxexport").after("<div id=\"maingrid2\"></div>")
            g = manager = $("#maingrid2").ligerGrid({
                /*title : 'Maintain',*/
                pageSize:10,
                contentType: 'application/json',
                data: errorlist,
                columns: [
                { display: '发票代码', name: '发票代码', width: 80, type: 'text'},
                { display: '发票号码', name: '发票号码', width: 80, type: 'text'},
                { display: '开票日期', name: '开票日期', width: 100, type: 'text'},
                { display: '金额', name: '金额', width: 100, type: 'number',render: function(rowdata,rowindex,value){
                	if (value==null || value == "0"){
                    	value = "";
                    	return value;
                    }else{
                	    var val = Math.round(value*100)/100;
                	    return String(val).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
                	}}},
                { display: '失败原因', name: '失败原因', type: 'text'},
                ],isScroll: false,
              //配置设置
                enabledEdit: false,
                isScroll: true,
                checkbox:false,
                rownumbers:false,
                clickToEdit: false,
                width: '100%'
            });
        }

function inquiry_invoice(resultlist)
        {
            $("#maingrid").remove();
            liger.inject.init();
            $("#taxexport").after("<div id=\"maingrid\"></div>")
            g = manager = $("#maingrid").ligerGrid({
                /*title : 'Maintain',*/
                pageSize:10,
                contentType: 'application/json',
                data: resultlist,
                columns: [
                { display: '发票代码', name: '发票代码', width: 80, type: 'text'},
                { display: '发票号码', name: '发票号码', width: 80, type: 'text'},
                { display: '购买方名称', name: '购买方名称', width: 100, type: 'text'},
                { display: '购买方税号', name: '购买方税号', width: 100, type: 'text'},
                { display: '销售方名称', name: '销售方名称', width: 100,type: 'text'},
                { display: '销售方税号', name: '销售方税号', width: 100,type: 'text'},
                { display: '货物名称', name: '货物名称', type: 'text'},
                { display: '规格型号', name: '规格型号', type: 'text'},
                { display: '货物名称', name: '货物名称', type: 'text'},
                { display: '单位', name: '单位', width: 40, type: 'text'},
                { display: '数量', name: '数量', width: 40, type: 'number',render: function(rowdata,rowindex,value){
                	if (value==null){
                    	value = 0;
                    }
                	var val = Math.round(value*100)/100;
                	return String(val).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
                }},
                { display: '单价', name: '单价', width: 40, type: 'number',render: function(rowdata,rowindex,value){
                	if (value==null){
                    	value = 0;
                    }
                	var val = Math.round(value*100)/100;
                	return String(val).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
                }},
                { display: '金额', name: '金额', width: 40, type: 'number',render: function(rowdata,rowindex,value){
                	if (value==null){
                    	value = 0;
                    }
                	var val = Math.round(value*100)/100;
                	return String(val).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
                }},
                { display: '税率', name: '税率', width: 30, type: 'number',render: function(rowdata,rowindex,value){
                	if (value==null){
                    	value = 0;
                    }
                	var val = Math.round(value*100)/100;
                	return String(val).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
                }},
                { display: '税额', name: '税额', width: 40, type: 'number',render: function(rowdata,rowindex,value){
                	if (value==null){
                    	value = 0;
                    }
                	var val = Math.round(value*100)/100;
                	return String(val).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
                }},
                ],isScroll: false,
              //配置设置
                enabledEdit: false,
                isScroll: true,
                checkbox:false,
                rownumbers:false,
                clickToEdit: false,
                width: '100%'
            });
        }

function check_row(name)
        {
            var id = name;
            var rows = manager.getSelectedRows();
            if (id=="save"){
            $.ligerDialog.prompt('请输入快递单号或者签收人：', function (yes, value)
            {
            if (yes){
            var kddh = value;
            if (kddh == '' || kddh == undefined || kddh == null){
            alert("请输入快递单号或者签收人！");
            return false;
            }
            var result = "是";
            for (i=0;i<rows.length;i++){
            rows[i]["快递单号"] = value;
            }
            var rows_json = JSON.stringify(rows);
            $.ajax({
            type:'POST',
            url:'../signdata/',
            traditional:true,
            dataType:'json',
            data:{'rows':rows_json,'result':result},
            beforeSend:function(){
            $('#loading').show();
            },
            success:function(data){
            $('#loading').hide();
            selectdata()
            var msg = data.message;
            var type = data.type;
            $.ligerDialog.tip({  title: '提示',content:msg})
            setTimeout(function ()
                     {
                        $.ligerDialog.close();
                     }, 3000);
            }
            })
            }
            })
            }else{
            var result = "否";
            for (i=0;i<rows.length;i++){
            rows[i]["快递单号"] = "";
            }
            var rows_json = JSON.stringify(rows);
            $.ajax({
            type:'POST',
            url:'../signdata/',
            traditional:true,
            dataType:'json',
            data:{'rows':rows_json,'result':result},
            beforeSend:function(){
            $('#loading').show();
            },
            success:function(data){
            $('#loading').hide();
            selectdata();
            var msg = data.message;
            var type = data.type;
            $.ligerDialog.tip({  title: '提示',content:msg})
            setTimeout(function ()
                     {
                        $.ligerDialog.close();
                     }, 3000);
            }
            })
        }
}

function scan_row(name)
        {
            var id = name;
            var rows = manager.rows;
            if (id=="save"){
            $.ligerDialog.prompt('请输入快递单号或者签收人：', function (yes, value)
            {
            if (yes){
            var kddh = value;
            if (kddh == '' || kddh == undefined || kddh == null){
            alert("请输入快递单号或者签收人！");
            return false;
            }
            var result = "是";
            for (i=0;i<rows.length;i++){
            rows[i]["快递单号"] = value;
            }
            var rows_json = JSON.stringify(rows);
            $.ajax({
            type:'POST',
            url:'../signdata/',
            traditional:true,
            dataType:'json',
            data:{'rows':rows_json,'result':result},
            beforeSend:function(){
            $('#loading').show();
            },
            success:function(data){
            $('#loading').hide();
            selectdata('refresh');
            var msg = data.message;
            var type = data.type;
            $.ligerDialog.tip({  title: '提示',content:msg})
            setTimeout(function ()
                     {
                        $.ligerDialog.close();
                     }, 1000);
            $("#fpdm").focus();
            }
            })
            }
            })
            $(".l-dialog-inputtext").focus();
            }else{
            var result = "否";
            for (i=0;i<rows.length;i++){
            rows[i]["快递单号"] = "";
            }
            var rows_json = JSON.stringify(rows);
            $.ajax({
            type:'POST',
            url:'../signdata/',
            traditional:true,
            dataType:'json',
            data:{'rows':rows_json,'result':result},
            beforeSend:function(){
            $('#loading').show();
            },
            success:function(data){
            $('#loading').hide();
            selectdata('refresh');
            var msg = data.message;
            var type = data.type;
            $.ligerDialog.tip({  title: '提示',content:msg})
            setTimeout(function ()
                     {
                        $.ligerDialog.close();
                     }, 1000);
            $("#fpdm").focus();
            }
            })
        }
}

function clear_list(resultlist)
        {
            $("#maingrid").remove();
            liger.inject.init();
            $("#taxexport").after("<div id=\"maingrid\"></div>")
            g = manager = $("#maingrid").ligerGrid({
                /*title : 'Maintain',*/
                pageSize:10,
                contentType: 'application/json',
                data: resultlist,
                columns: [
                { display: '是否签收', name: '是否签收', width: 60, type: 'text'},
                { display: '发票代码', name: '发票代码', width: 90, type: 'text'},
                { display: '发票号码', name: '发票号码', width: 80, type: 'text'},
                { display: '开票日期', name: '开票日期', width: 80,type: 'text'},
                { display: '销方名称', name: '销方名称', width: 150,type: 'text'},
                { display: '销方税号', name: '销方税号', type: 'text'},
                { display: '金额', name: '金额', width: 100, type: 'number',render: function(rowdata,rowindex,value){
                	if (value==null){
                    	value = 0;
                    }
                	var val = Math.round(value*100)/100;
                	return String(val).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
                }},
                { display: '税额', name: '税额', width: 80, type: 'number',render: function(rowdata,rowindex,value){
                	if (value==null){
                    	value = 0;
                    }
                	var val = Math.round(value*100)/100;
                	return String(val).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
                }},
                ],isScroll: false,
//                onCheckAllRow: f_onCheckAllRow,
                enabledEdit: false,
                isScroll: true,
                checkbox:true,
                rownumbers:false,
                clickToEdit: false,
                width: '100%',

            });
        }

function clear_row(name)
        {
            var id = name;
            var rows = manager.getSelectedRows();
            var rows_json = JSON.stringify(rows);
            if (id=="save"){
            var result = "已清理"
            }else{
            var result = "否"
            }
            $.ajax({
            type:'POST',
            url:'../clearstatus/',
            traditional:true,
            dataType:'json',
            data:{'rows':rows_json,'result':result},
            beforeSend:function(){
            $('#loading').show();
            },
            success:function(data){
            $('#loading').hide();
            selectdata()
            var msg = data.message;
            var type = data.type;
            $.ligerDialog.tip({  title: '提示',content:msg})
            setTimeout(function ()
                     {
                        $.ligerDialog.close();
                     }, 3000);
            }
            })
        }

var checkedFunction = [];
var allcheck = 0;
var memory = 1;
function findCheckedFunction(functionId){
            for(var i =0;i<checkedFunction.length;i++)
            {
                if(checkedFunction[i] == functionId) return i;
            }
            return -1;
}

function f_onCheckAllRow(checked){
            if(allcheck == 0){
                allcheck = 1;
                memory = 0;
                checkedFunction = [];
            }else if(allcheck == 1){
                allcheck = 0;
                memory = 1;
                checkedFunction = [];
            }
}

function addCheckedFunction(functionId){
            if(findCheckedFunction(functionId) == -1)
                checkedFunction.push(functionId);
        }
function removeCheckedFunction(functionId){
            var i = findCheckedFunction(functionId);
            if(i==-1) return;
            checkedFunction.splice(i,1);
}
