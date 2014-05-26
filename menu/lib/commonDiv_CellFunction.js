var recent = ["SUM(cell/num,...)", "AVERAGE(cell/num,...)", "COUNT(cell/num,...)", "MAX(cell/num,...)", "MIN(cell/num,...)"];

var functionType = ["Date and Time", "Duration", "Engineering","Finacial", "Logical and Information", 
                    "Numberic", "Reference", "Statistical", "Text", "Trigonometric"];

var functionDate=[
{ name: 'DATE' },
{ name: 'DATEDIF' },
{ name: 'DATEVALUE' },
{ name: 'DAY' },
{ name: 'DAYNAME' },
{ name: 'DAYS360' },
{ name: 'EDATE' },
{ name: 'EOMONTH' },
{ name: 'HOUR' },
{ name: 'MINUTE' },
{ name: 'MONTH' },
{ name: 'MONTHNAME' },
{ name: 'NETWORKDAYS' },
{ name: 'NOW' },
{ name: 'SECOND' },
{ name: 'TIME' },
{ name: 'TIMEVALUE' },
{ name: 'TODAY' },
{ name: 'WEEKDAY' },
{ name: 'WEEKNUM' },
{ name: 'WORKDAY' },
{ name: 'YEAR' },
{ name: 'YEARFRAC' },
];

var functionDuration=[
{ name: 'DUR2DAYS' },
{ name: 'DUR2HOURS' },
{ name: 'DUR2MILLISECONDS' },
{ name: 'DUR2MINUTES' },
{ name: 'DUR2SECONDS' },
{ name: 'DUR2WEEKS' },
{ name: 'DURATION' },
{ name: 'STRIPDURATION' },
];

var functionEngineering=[
{ name: 'BASSETONUM' },
{ name: 'BASSELJ' },
{ name: 'BASSELY' },
{ name: 'BIN2DEC' },
{ name: 'CONVERT' },
{ name: 'DELTA' },
{ name: 'REF' },
{ name: 'ERFC' },
{ name: 'GESTEP' },
{ name: 'HEX2DEC' },
{ name: 'OCT2DEC' },
];

var functionFinacial=[
{ name: 'ACCRINT' },
{ name: 'ACCRINTM' },
{ name: 'BONDDURATION' },
{ name: 'COUPDAYBS' },
{ name: 'COUPDAYS' },
{ name: 'COUPDAYSNC' },
{ name: 'COUPNUM' },
{ name: 'CUMIPMT' },
{ name: 'CUMPRINC' },
{ name: 'DB' },
{ name: 'DDB' },
{ name: 'DISC' },
{ name: 'EFFECT' },
{ name: 'FV' },
{ name: 'INTRATE' },
{ name: 'IPMT' },
{ name: 'IRR' },
{ name: 'ISPMT' },
{ name: 'MIRR' },
{ name: 'NOMINAL' },
{ name: 'NPER' },
{ name: 'NPV' },
{ name: 'PMT' },
{ name: 'PPMT' },
{ name: 'PRICE' },
{ name: 'PRICEDISC' },
{ name: 'PRICEMAT' },
{ name: 'PV' },
{ name: 'RATE' },
{ name: 'RECEIVED' },
{ name: 'SLN' },
{ name: 'SYD' },
{ name: 'VDB' },
{ name: 'YIELD' },
{ name: 'YIELDDISC' },
{ name: 'YIELDMAT' },
];

var functionLogical=[
{ name: 'AND' },
{ name: 'FALSE' },
{ name: 'IF' },
{ name: 'IFERROR' },
{ name: 'ISBLANK' },
{ name: 'ISERROR' },
{ name: 'ISEVEN' },
{ name: 'ISODD' },
{ name: 'NOT' },
{ name: 'OR' },
{ name: 'TRUE' },
];

var functionNumberic=[
{ name: 'ABS' },
{ name: 'CEILING' },
{ name: 'COMBIN' },
{ name: 'EVEN' },
{ name: 'EXP' },
{ name: 'FACT' },
{ name: 'FACTDOUBLE' },
{ name: 'FLOOR' },
{ name: 'GCD' },
{ name: 'INT' },
{ name: 'LCM' },
{ name: 'LN' },
{ name: 'LOG' },
{ name: 'LOG10' },
{ name: 'MOD' },
{ name: 'MROUND' },
{ name: 'MULTINOMIAL' },
{ name: 'ODD' },
{ name: 'PI' },
{ name: 'POWER' },
{ name: 'PRODUCT' },
{ name: 'QUOTIENT' },
{ name: 'RAND' },
{ name: 'RANDBETWEEN' },
{ name: 'ROMAN' },
{ name: 'ROUND' },
{ name: 'ROUNDDOWN' },
{ name: 'ROUNDUP' },
{ name: 'SIGN' },
{ name: 'SORT' },
{ name: 'SQRTPI' },
{ name: 'SUM' },
{ name: 'SUMIF' },
{ name: 'SUMIFS' },
{ name: 'SUMPROUDUCT' },
{ name: 'SUMSQ' },
{ name: 'SUMX2MY2' },
{ name: 'SUMX2PY2' },
{ name: 'SUMXMY2' },
{ name: 'TRUNC' },
];

var functionReference=[
{ name: 'ADDRESS' },
{ name: 'AREAS' },
{ name: 'CHOOSE' },
{ name: 'COLUMN' },
{ name: 'COLUMNS' },
{ name: 'HLOOKUP' },
{ name: 'INDEX' },
{ name: 'INDIRECT' },
{ name: 'INTERSECT.RANGES' },
{ name: 'LOOKUP' },
{ name: 'MATCH' },
{ name: 'OFFSET' },
{ name: 'ROW' },
{ name: 'ROWS' },
{ name: 'TRANSPOSE' },
{ name: 'VLOOKUP' },
];

var functionStatistical=[
{ name: 'AVEDEV' },
{ name: 'AVERAGE' },
{ name: 'AVERAGEA' },
{ name: 'AVERAGEIF' },
{ name: 'AVERAGEIFS' },
{ name: 'BETADIST' },
{ name: 'BETAINV' },
{ name: 'BINOMDIST' },
{ name: 'CHIDIST' },
{ name: 'CHIINV' },
{ name: 'CHITEST' },
{ name: 'CONFIDENCE' },
{ name: 'CORREL' },
{ name: 'COUNT' },
{ name: 'COUNTA' },
{ name: 'COUNTBLANK' },
{ name: 'COUNTIF' },
{ name: 'COUNTIFS' },
{ name: 'COVAR' },
{ name: 'CRITBINOM' },
{ name: 'DEVSQ' },
{ name: 'EXPONDIST' },
{ name: 'FDIST' },
{ name: 'FINV' },
{ name: 'FORECAST' },
{ name: 'FREQUENCEY' },
{ name: 'GAMMADIST' },
{ name: 'GAMMAINV' },
{ name: 'GAMMALN' },
{ name: 'GEOMEAN' },
{ name: 'HARMEAN' },
{ name: 'INTERCEPT' },
{ name: 'LARGE' },
{ name: 'LINEST' },
{ name: 'LOGINV' },
{ name: 'LOGNORMDIST' },
{ name: 'MAX' },
{ name: 'MAXA' },
{ name: 'MEDIAN' },
{ name: 'MIN' },
{ name: 'MINA' },
{ name: 'MDE' },
{ name: 'NEGBINOMDIST' },
{ name: 'NORMDIST' },
{ name: 'NORMINV' },
{ name: 'NORMSDIST' },
{ name: 'NORMSINV' },
{ name: 'PERCENTILE' },
{ name: 'PERCENTRANK' },
{ name: 'PERMUT' },
{ name: 'POISSON' },
{ name: 'PROB' },
{ name: 'QUARTILE' },
{ name: 'RANK' },
{ name: 'SLOPE' },
{ name: 'SMALL' },
{ name: 'STANDARDIZE' },
{ name: 'STDEV' },
{ name: 'STDEVA' },
{ name: 'STDEVP' },
{ name: 'STDEVPA' },
{ name: 'TDIST' },
{ name: 'TINV' },
{ name: 'TTEST' },
{ name: 'VAR' },
{ name: 'VARA' },
{ name: 'VARP' },
{ name: 'VARPA' },
{ name: 'ZTEST' },
];

var functionText=[
{ name: 'CHAR' },
{ name: 'CLEAN' },
{ name: 'CODE' },
{ name: 'CONCATENATE' },
{ name: 'DOLLAR' },
{ name: 'EXACT' },
{ name: 'FIND' },
{ name: 'FIXED' },
{ name: 'LEFT' },
{ name: 'LEN' },
{ name: 'LOWER' },
{ name: 'MID' },
{ name: 'PROPER' },
{ name: 'PEPLACE' },
{ name: 'REPT' },
{ name: 'RIGHT' },
{ name: 'SEARCH' },
{ name: 'SUBSTITUTE' },
{ name: 'Text' },
{ name: 'TRIM' },
{ name: 'UPPER' },
{ name: 'VALUE' },
];

var functionTrigonometric=[
{ name: 'ACOS' },
{ name: 'ACOSH' },
{ name: 'ASIN' },
{ name: 'ASINH' },
{ name: 'ATAN' },
{ name: 'ATAN2' },
{ name: 'ATANH' },
{ name: 'COS' },
{ name: 'COSH' },
{ name: 'DEGREES' },
{ name: 'PADIANS' },
{ name: 'SIN' },
{ name: 'SINH' },
{ name: 'TAN' },
{ name: 'YANH' },
];

//var autoFinish

function autoFinish(e) {
    var keyValue = e.keyCode ? e.keyCode : e.charCode;
    $("#popup-menu-cellFunctionPannel").css('display', 'none');
    if (39 < keyValue && keyValue < 48) {
    	if (functionModel) {
    		functionModel = false;
    	}
            
        //$("#function_pannel_operator").css('display', 'none');
        //$("#function_functionlist").css('display', 'block');
        //$("#popup-menu-cellFunctionPannel").css('display', 'block');
    }
    if (47 < keyValue && keyValue < 58) {
        $("#function_pannel_operator").css('display', 'block');
        $("#function_functionlist").css('display', 'none');
        $("#popup-menu-cellFunctionPannel").css('display', 'block');
    }
    if (e.keyCode == 13 && e.shiftKey == false) {
        sheet_saveEditFunction();
    }
}

var currentEditCell = null;    //var currentFunction = null; //currentFunction = { 'cells': [], 'operatos': ['='] };
var functionModel = false; //if True: you can continuously choose cells . Otherwise, you have to type in an operator before you slelect another cell;
var currFunctionCells = []; //store all the selected cells when under a functionModel
var currFunctionName = "";

function hasRelationWithThis(cellId) {
    return false;
}
function sheet_editFunction(cell) {
    var currExp = $("#function_inputValue").val(); //
    if (cell.getId() == currentEditCell.getId() || hasRelationWithThis(cell.getId())) {
        alert("This formula can't reference its own cell,or depend on another formula that references this cell.");
        $("#function_inputValue").focus();
        return;
    }
    if (functionModel) {
        $("#function_functionlist").css('display', 'none');
        $("#function_pannel_operator").css('display', 'block');
        currFunctionCells.push(cell.getId()); //add to child array
        //
        if (currFunctionCells.length > 1) {
            //$("#function_inputValue").text(currExp.substring(0, currExp.length - 1) + ',[' + cell.getRow() + '-' + cell.getCol() + '])');
            $("#function_inputValue").val(currExp.substring(0, currExp.length - 1) + ',' + com.kenny.util.BaseTool.CellIndex_NumToStr(cell.getCol(), "") + cell.getRow() + ')').focus();
        } else {
            //$("#function_inputValue").text(currExp.substring(0, currExp.length - 1) + '[' + cell.getRow() + '-' + cell.getCol() + '])');
            $("#function_inputValue").val(currExp.substring(0, currExp.length - 1) + com.kenny.util.BaseTool.CellIndex_NumToStr(cell.getCol(), "") + cell.getRow() + ')').focus();
        }
    } else {
        ////1704 BUG //////NO [] EXISTED ANY MORE///////////////////////
        //if (currExp.length > 0 && ((currExp.substring(currExp.length - 1, currExp.length) == ']' || currExp.substring(currExp.length - 1, currExp.length) == '�?))) {
        //    alert("You have to type and operator !");
        //    return;
        //} else {
        //    //currentFunction.cells.push(cell.getId()); //
        //    $("#function_inputValue").text(currExp + '[' + cell.getRow() + '-' + cell.getCol() + ']');
        //}
        if (currExp.length > 0 && (!isNaN(currExp.substring(currExp.length - 1, currExp.length)) || currExp.substring(currExp.length - 1, currExp.length) == ')')) {
            alert("You have to type and operator !");
            $("#function_inputValue").focus();
            return;
        } else {
            $("#function_inputValue").val(currExp + com.kenny.util.BaseTool.CellIndex_NumToStr(cell.getCol(), "") + cell.getRow()).focus();
        }
    }
    var cellFunctionPannel_left = $("#popup-menu-cellFunctionPannel").css('left') + 10;
    $("#popup-menu-cellFunctionPannel").css('left', cellFunctionPannel_left);
}
function EditFunction(operator) {
    var expression = $("#function_inputValue").val();
    var objRegExp = new RegExp("[/\+\*\-]"); //+-*/
    if ((operator != "(" && (expression == "" || objRegExp.test(expression.substring(expression.length - 1, expression.length)))) || (expression != "" && expression.substring(expression.length - 1, expression.length) == "(")) {
        alert("Wrong : can't add an operator here!");
        $("#function_inputValue").focus();
        return;
    }
    if (functionModel) {
        if (currFunctionCells.length < 1) {
            alert('At least one cell should be choosed in this function');
            $("#function_inputValue").focus();
            return;
        }
        functionModel = false;
        //currentFunction.operatos.pop();
        //currentFunction.cells.push(currFunctionCells);
        currFunctionCells = [];
    }
    //currentFunction.operatos.push(operator);
    $("#function_inputValue").val($("#function_inputValue").val() + operator).focus();
}
function sheet_cancelEditFunction() {
    functionModel = false;
    currFunctionName = "";
    //currentFunction = null;
    currentEditCell = null;
    currFunctionCells = [];
    $("#function_inputValue").val('');
    $("#popup-menu-cellFunctionBar").css('display', 'none');
    $("#function_functionlist").css('display', 'none');
    $("#function_pannel_operator").css('display', 'block');
    $("#popup-menu-cellFunctionPannel").css('display', 'none');
}

function sheet_saveEditFunction() {
    //currentFunction.expression = $("#function_inputValue").val();
    if (functionModel) {
        functionModel = false;
        //currentFunction.cells.push(currFunctionCells);
        currFunctionCells = [];
    }
    if ($("#function_inputValue").val() != "") {
        //sendMessage(com.kenny.util.Observer.MessageType.CELL_ADDFUNCTION, currentEditCell, { 'newFunctions': currentFunction });
        var currentFunction = $("#function_inputValue").val().replace(new RegExp("\"", "g"), "\"\"");
        sendMessage(com.kenny.util.Observer.MessageType.CELL_ADDFUNCTION, currentEditCell, { 'newFunctions': currentFunction });
    }
    else {
        sendMessage(com.kenny.util.Observer.MessageType.CELL_ADDFUNCTION, currentEditCell, { 'newFunctions': null });
    }
    //currentFunction = null;
    currentEditCell = null;
    $("#function_inputValue").val('');
    $("#popup-menu-cellFunctionBar").css('display', 'none');
    $("#function_functionlist").css('display', 'none');
    $("#function_pannel_operator").css('display', 'block');
    $("#popup-menu-cellFunctionPannel").css('display', 'none');
}

function commonCellFunctionReady() {
    $("#function_functionlist").tabs();

    //初始化公式div
    var recentDiv = $('#funRecent');
    var recentBuff = [];
    recentBuff.push('<ol id="text-style-recentFun">');
    for (var j = 0; j < recent.length; j++) {
        recentBuff.push('<li class="ui-widget-content">' + recent[j] + '</li>');
    }
    recentBuff.push('</ol>');
    recentDiv.html(recentBuff.join(''));
    $("#text-style-recentFun").selectable();

    // 公式种类
    var containerDiv = $('#formula-class');
    var buff = [];
    buff.push('<ol id="text-style-functionType">');
    for (var i = 0; i < functionType.length; i++) {
        buff.push('<li class="ui-widget-content">' + functionType[i] + '</li>');
    }
    buff.push('</ol>');
    containerDiv.html(buff.join(''));
    $("#text-style-functionType").selectable();

    // 
    var showName = null;
    // 
    var funName = null;
    $("#text-style-functionType").bind("selectableselected", function () {
        //alert($("#text-style-functionType .ui-selected").text());
        var value = $("#text-style-functionType .ui-selected").text(); //$(".ui-selected").text();//$(this).text();
        showName = value;
        var funArray = [];
        var containerNameDiv = $('#formula-name');
        funArray.push('<ol id="text-style-functionName">');
        var t;
        switch (value) {
            case 'Date and Time':
                for (t = 0; t < functionDate.length; t++) {
                    funArray.push('<li class="ui-widget-content">' + functionDate[t].name + '</li>');
                }
                break;
            case 'Duration':
                for (t = 0; t < functionDuration.length; t++) {
                    funArray.push('<li class="ui-widget-content">' + functionDuration[t].name + '</li>');
                }
                break;
            case 'Engineering':
                for (t = 0; t < functionEngineering.length; t++) {
                    funArray.push('<li class="ui-widget-content">' + functionEngineering[t].name + '</li>');
                }
                break;
            case 'Finacial':
                for (t = 0; t < functionFinacial.length; t++) {
                    funArray.push('<li class="ui-widget-content">' + functionFinacial[t].name + '</li>');
                }
                break;
            case 'Logical and Information':
                for (t = 0; t < functionLogical.length; t++) {
                    funArray.push('<li class="ui-widget-content">' + functionLogical[t].name + '</li>');
                }
                break;
            case 'Numberic':
                for (t = 0; t < functionNumberic.length; t++) {
                    funArray.push('<li class="ui-widget-content">' + functionNumberic[t].name + '</li>');
                }
                break;
            case 'Reference':
                for (t = 0; t < functionReference.length; t++) {
                    funArray.push('<li class="ui-widget-content">' + functionReference[t].name + '</li>');
                }
                break;
            case 'Statistical':
                for (t = 0; t < functionStatistical.length; t++) {
                    funArray.push('<li class="ui-widget-content">' + functionStatistical[t].name + '</li>');
                }
                break;
            case 'Text':
                for (t = 0; t < functionText.length; t++) {
                    funArray.push('<li class="ui-widget-content">' + functionText[t].name + '</li>');
                }
                break;
            case 'Trigonometric':
                for (t = 0; t < functionTrigonometric.length; t++) {
                    funArray.push('<li class="ui-widget-content">' + functionTrigonometric[t].name + '</li>');
                }
                break;
        }

        funArray.push('</ol>');
        //containerNameDiv.html("");
        containerNameDiv.html(funArray.join(''));

        $("#text-style-functionName").selectable();
        //$("#funRecent").css('display', 'none');
        $("#formula-class").css('display', 'none');
        $("#formula-nameT").html(value);
        $("#formula-nameT").css("font-size", "12px");
        $("#formula-names").css('display', 'block');

        $("#text-style-functionName").bind("selectableselected", function () {
            var value = $("#text-style-functionName .ui-selected").text();
            funName = value;
            //alert(value);
        });
    });


    ////trun the pages
    $("#function_pannel_operator_ChooseFunction").click(function () {
        $("#function_pannel_operator").css('display', 'none');
        $("#function_functionlist").css('display', 'block');
    });
    $("#function_backto_operator").click(function () {
        $("#function_functionlist").css('display', 'none');
        $("#function_pannel_operator").css('display', 'block');
    });

    $("#type").click(function (e) {
        $("#formula-class").css('display', 'block');
        $("#formula-names").css('display', 'none');
    });

    $("#back").click(function (e) {
        $("#formula-class").css('display', 'block');
        $("#formula-names").css('display', 'none');
    });

    ////////////////// CHOOSE FUNCTION   ////////////////
    $("#text-style-recentFun").bind("selectableselected", function () {
        var value = $("#text-style-recentFun .ui-selected").text();
        if (value.indexOf('(') != -1) {
            value = value.substring(0, value.indexOf('('));
        }
        var express = $("#function_inputValue").val();
        if (!functionModel) {
            functionModel = true;
            //currentFunction.operatos.push(value);
        } else {
            //currentFunction.operatos.pop(); 
            //currentFunction.operatos.push(value);
            express = express.substring(0, express.lastIndexOf(currFunctionName)); //REPLACE   1704 BUG
            currFunctionCells = [];
        }
        $("#function_inputValue").val(express + value + '()');
        currFunctionName = value;
    });

    ////////////////// + - × /  /////////////////////////////
    $('#function_pannel_operator .functionOperator').click(function () {
        EditFunction($(this).attr('operator'));
    });

    ////////////////// DELETE  /////////////
    $("#function_pannel_operator_Backspace").click(function (e) {
        var expression = $("#function_inputValue").val();
        if (expression != "") {
            if (functionModel) {
                functionModel = false;
                currFunctionCells = [];
            }
            //currFunctionName = "";
            /////////1704 BUG //////NO [] EXISTED ANY MORE///////////////////////
            if (expression.substring(expression.length - 1, expression.length) == ']') {//find the index of last "["
                var index = expression.lastIndexOf('[');
                //currentFunction.cells.pop();
                $("#function_inputValue").val(expression.substr(0, index));
            //} else if (expression.substring(expression.length - 1, expression.length) == ')'
               //             && currentFunction.operatos[currentFunction.operatos.length - 1].length > 1) {//SUM COUNT
                //                // check if the last operator is a function
                //express = express.substring(0, express.lastIndexOf(currFunctionName));
                //                var index = expression.lastIndexOf(currentFunction.operatos[currentFunction.operatos.length - 1]);
                //                $("#function_inputValue").text(expression.substr(0, index));
                //                //currentFunction.operatos.pop();
                //                //currentFunction.cells.pop();
                //                if (functionModel) {
                //                    functionModel = false;
                //                }
            } else {// + - * / ) (
                //currentFunction.operatos.pop();
                $("#function_inputValue").val(expression.substr(0, expression.length - 1));
            }
        }
    });
    ///////////////////  CANCEL  /////////////
    $("#function_cancel").click(function () {
        sheet_cancelEditFunction();
    });

    ///////////////////  SAVE  /////////////
    $("#function_done").click(function () {
        sheet_saveEditFunction();
    });
}