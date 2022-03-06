(function(a) {
    a.jgrid = a.jgrid || {};
    a.extend(a.jgrid, {
        extend: {
            btnSearch: "Search",
            btnHideSearch: "Hide",
            expandTooMany: "This is going to unfold “{0}” items, canceled due to too many nodes.",
            pageTitle: "Click the number to fill in the page number and the number of entries per page, press enter to take effect!",
            pageLabelA: "Page",
            pageLabelB: ",",
            pageLabelC: "items per page, total {0} items",
        },
        defaults: {
            recordtext: "{0} - {1}\u3000total {2} items",
            emptyrecords: "No Data",
            loadtext: "loading...",
            pgtext: " {0} Total {1} Page",
            pgfirst: "First Page",
            pglast: "Last Page",
            pgnext: "Next Page",
            pgprev: "Previous Page",
            pgrecs: "Records per Page",
            showhide: "Toggle Expand Collapse Grid"
        },
        search: {
            caption: "Search...",
            Find: "Find",
            Reset: "Reset",
            odata: [{
                oper: "eq",
                text: "equal\u3000\u3000"
            },
            {
                oper: "ne",
                text: "not equal\u3000\u3000"
            },
            {
                oper: "lt",
                text: "less more\u3000\u3000"
            },
            {
                oper: "le",
                text: "less than or equal to"
            },
            {
                oper: "gt",
                text: "more than\u3000\u3000"
            },
            {
                oper: "ge",
                text: "more than or equal to"
            },
            {
                oper: "bw",
                text: "start with"
            },
            {
                oper: "bn",
                text: "not start with"
            },
            {
                oper: "in",
                text: "belong to\u3000\u3000"
            },
            {
                oper: "ni",
                text: "not belong to"
            },
            {
                oper: "ew",
                text: "end with"
            },
            {
                oper: "en",
                text: "not end with"
            },
            {
                oper: "cn",
                text: "contain\u3000\u3000"
            },
            {
                oper: "nc",
                text: "not contain"
            },
            {
                oper: "nu",
                text: "not exist"
            },
            {
                oper: "nn",
                text: "exist"
            }],
            groupOps: [{
                op: "AND",
                text: "all"
            },
            {
                op: "OR",
                text: "any"
            }],
            operandTitle: "Click to select search operation.",
            resetTitle: "Reset Search Value"
        },
        edit: {
            addCaption: "add record",
            editCaption: "edit record",
            bSubmit: "submit",
            bCancel: "cancel",
            bClose: "close",
            saveData: "Data has been changed, do you want to save?",
            bYes: "Yes",
            bNo: "No",
            bExit: "Cancel",
            msg: {
                required: "necessary field",
                number: "please input a valid field",
                minValue: "input value must be more than or equal to ",
                maxValue: "input value must be less than or equal to ",
                email: "not valid email",
                integer: "please input a valid integer",
                date: "please input a valid date",
                url: "invalid url, prefix must be ('http://' or 'https://')",
                nodefined: " not defined!",
                novalue: " no value!",
                customarray: "custom function need to return array!",
                customfcheck: "custom function is necessary!"
            }
        },
        view: {
            caption: "view records",
            bClose: "close"
        },
        del: {
            caption: "delete",
            msg: "delete selected records?",
            bSubmit: "delete",
            bCancel: "cancel"
        },
        nav: {
            edittext: "",
            edittitle: "edit selected records?",
            addtext: "",
            addtitle: "add new record",
            deltext: "",
            deltitle: "delete selected records",
            searchtext: "",
            searchtitle: "find",
            refreshtext: "",
            refreshtitle: "refresh",
            alertcap: "attention",
            alerttext: "please choose one record",
            viewtext: "",
            viewtitle: "view selected records"
        },
        col: {
            caption: "choose column",
            bSubmit: "confirm",
            bCancel: "cancel"
        },
        errors: {
            errcap: "error",
            nourl: "no url",
            norecords: "no records",
            model: "length of colNames is not equal to colModel!"
        },
        formatter: {
            integer: {
                thousandsSeparator: ",",
                defaultValue: "0"
            },
            number: {
                decimalSeparator: ".",
                thousandsSeparator: ",",
                decimalPlaces: 2,
                defaultValue: "0.00"
            },
            currency: {
                decimalSeparator: ".",
                thousandsSeparator: ",",
                decimalPlaces: 2,
                prefix: "",
                suffix: "",
                defaultValue: "0.00"
            },
            date: {
                dayNames: ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", ],
                monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec", "January", "Februray", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                AmPm: ["am", "pm", "Morning", "Afternoon"],
                S: function(b) {
                    return b < 11 || b > 13 ? ["st", "nd", "rd", "th"][Math.min((b - 1) % 10, 3)] : "th"
                },
                srcformat: "Y-m-d",
                newformat: "Y-m-d",
                parseRe: /[#%\\\/:_;.,\t\s-]/,
                masks: {
                    ISO8601Long: "Y-m-d H:i:s",
                    ISO8601Short: "Y-m-d",
                    ShortDate: "n/j/Y",
                    LongDate: "l, F d, Y",
                    FullDateTime: "l, F d, Y g:i:s A",
                    MonthDay: "F d",
                    ShortTime: "g:i A",
                    LongTime: "g:i:s A",
                    SortableDateTime: "Y-m-d\\TH:i:s",
                    UniversalSortableDateTime: "Y-m-d H:i:sO",
                    YearMonth: "F, Y"
                },
                reformatAfterEdit: false,
                userLocalTime: false
            },
            baseLinkUrl: "",
            showAction: "",
            target: "",
            checkbox: {
                disabled: true
            },
            idName: "id"
        }
    })
})(jQuery);