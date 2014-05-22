/**
 * AlgorithmsParseTools class
 * 
 * @package com.hoperun.util
 * @author lu_feng
 */
com.hoperun.util.AlgorithmsParseTools = {
    debug: true,

    OPERATOR_BINOCULAR: [
	               '*',
	               '/',
	               '-',
	               '+'],
    OPERATOR_WITH_PARENTHESES: [
     	               'SUM',
     	               'AVERAGE',
     	               'COUNT',
     	               'MAX',
     	               'MIN'],


    /**
    * Third Level
    * 0 => SUM 
    * 1 => AVERAGE
    * 2 => COUNT
    * 3 => MAX
    * 4 => MIN
    * 
    * Second Level
    * 5 => +
    * 6 => -
    * 7 => *
    * 8 => /
    * 
    * First Level
    * 9 => (
    * 10 => )
    */

    isNumberic: function (ch) {
        return !isNaN(ch);
    },

    isBinocularOperator: function (ch) {
        for (var i = 0; i < this.OPERATOR_BINOCULAR.length; i++) {
            if (ch == this.OPERATOR_BINOCULAR[i]) {
                return this.OPERATOR_BINOCULAR[i];
            }
        }
        return false;
    },

    isParenthesesOperator: function (ch) {
        return ch == '(';
    },

    isComplexOperator: function (str) {
        for (var i = 0; i < this.OPERATOR_WITH_PARENTHESES.length; i++) {
            if (str.indexOf(this.OPERATOR_WITH_PARENTHESES[i]) == 0) {
                return this.OPERATOR_WITH_PARENTHESES[i];
            }
        }
        return false;
    },

    findEndParentheses: function (str, idx) {
        var count = 1;
        for (var i = idx; i < str.length; i++) {
            var ch = str.substring(i, i + 1);
            if (ch == '(') {
                count++;
            }
            else if (ch == ')') {
                count--;
                if (count == 0) {
                    return i;
                }
            }
        }

        return -1;
    },

    isComplexSplitOperator: function (ch) {
        return ch == ',';
    },

    findNextOperator: function (str) {
        var operatorType = -1, offset = -1, operatorKey = "";
        for (var i = 0; i < str.length; i++) {
            offset = i;
            var ch = str.substring(i, i + 1);
            var sub = str.substring(i);
            //Find complex split operator
            if (this.isComplexSplitOperator(ch)) {
                operatorType = -2;
                operatorKey = ch;
                break;
            }
            //Find Operator
            else if (this.isParenthesesOperator(ch)) {
                operatorType = 1;
                operatorKey = ch;
                break;
            }
            else if (this.isBinocularOperator(ch)) {
                operatorType = 3;
                operatorKey = ch;
                break;
            }
            else {
                var val = this.isComplexOperator(sub);
                if (val) {
                    operatorType = 2;
                    operatorKey = val;
                    break;
                }
            }
        }
        return {
            operatorType: operatorType,
            offset: offset,
            operatorKey: operatorKey
        };
    },

    convertToNumber: function (str) {
        var val = 0;
        try {
            if (str != '') {
                val = parseFloat(str);
            }
        } catch (e) {
            val = 0;
            if (this.debug) console.log("Exception throw, when to convert to number:" + str);
        }
        return val;
    },

    doCalculate: function (str) {
        var value = this.parseOperator(str);
        var n = eval("(" + value + ")");
        return n;
    },

    parseOperator: function (str) {
        var val = "";
        var operator = this.findNextOperator(str);
        //No operator existed
        if (operator.operatorType == -1) {
            val = str;
        }
        //Special for complex operator
        else if (operator.operatorType == 2) {
            val = this.parseComplexOperator(str, operator.offset, operator.operatorKey);
        }
        else if (operator.operatorType == 1) {
            val = this.parseParenthesesOperator(str, operator.offset, operator.operatorKey);
        }
        else if (operator.operatorType == 3) {
            val = this.parseBinocularOperator(str, operator.offset, operator.operatorKey);
        }
        return val;
    },

    parseComplexOperator: function (str, offset, operatorKey) {
        //console.log(str + " offset=" + offset + " operatorKey=" + operatorKey);
        var begin = offset + operatorKey.length + 1, end = this.findEndParentheses(str, begin);
        var left = "";
        if (operatorKey == 'SUM') {
            left += this.parseSUMOperator(str.substring(begin, end));
        }
        else if (operatorKey == 'AVERAGE') {
            left += this.parseAverageOperator(str.substring(begin, end));
        }
        else if (operatorKey == 'COUNT') {
            left += this.parseCountOperator(str.substring(begin, end));
        }
        else if (operatorKey == 'MAX') {
            left += this.parseMaxOperator(str.substring(begin, end));
        }
        else if (operatorKey == 'MIN') {
            left += this.parseMinOperator(str.substring(begin, end));
        }

        end += 1;
        operator = this.findNextOperator(str.substring(end));
        if (operator.operatorType > 0 && operator.offset == 0) {
            left += operator.operatorKey + this.parseOperator(str.substring(end + 1));
        }
        return left;
    },

    //Parse parentheses
    parseParenthesesOperator: function (str, offset, operatorKey) {
        var begin = offset + 1, end = this.findEndParentheses(str, begin);

        var left = "(" + this.parseOperator(str.substring(begin, end)) + ")";
        end += 1;
        var operator = this.findNextOperator(str.substring(end));
        if (operator.operatorType > 0 && operator.offset == 0) {
            left += operator.operatorKey + this.parseOperator(str.substring(end + 1));
        }
        return left;
    },
    //Parse normal operator
    parseBinocularOperator: function (str, offset, operatorKey) {
        var leftStr = str.substring(0, offset), rightStr = str.substring(offset + 1);
        return this.parseOperator(leftStr) + operatorKey + this.parseOperator(rightStr);
    },

    findNextSplit: function (str, index) {
        var offset = -1;
        for (var i = index; i < str.length; i++) {
            var ch = str.substring(i, i + 1);
            var sub = str.substring(i);
            //Find complex split operator
            if (this.isComplexSplitOperator(ch)) {
                offset = i;
                break;
            }
            //Move the end of this operator
            else if (this.isParenthesesOperator(ch)) {
                i = this.findEndParentheses(str, i + 1);
            }
            //Ignore this operator
            else if (this.isBinocularOperator(ch)) {
                //i++;
            }
            else {
                var val = this.isComplexOperator(sub);
                //Move the end of this operator (Don't forget the begin Parentheses position)
                if (val) {
                    i = this.findEndParentheses(str, i + val.length + 1);
                }
            }
        }

        return offset;
    },

    //
    _getItemsWithSplit: function (str) {
        var items = [];
        var beginIndex = 0;
        while (beginIndex < str.length) {
            var offset = this.findNextSplit(str, beginIndex);
            if (offset != -1) {
                items.push(str.substring(beginIndex, offset));
                beginIndex = offset + 1;
            }
            else {
                items.push(str.substring(beginIndex));
                break;
            }
        }
        return items;
    },

    //Parse SUM
    parseSUMOperator: function (str) {
        var items = this._getItemsWithSplit(str);

        var val = "";
        for (var i = 0; i < items.length; i++) {
            val += "+(" + this.parseOperator(items[i]) + ")";
        }
        if (val == "") {
            val = "0";
        }
        else {
            val = val.substring(1);
        }
        val = "(" + val + ")";
        return val;
    },

    //Parse average
    parseAverageOperator: function (str) {
        var items = this._getItemsWithSplit(str);

        var val = "";
        for (var i = 0; i < items.length; i++) {
            val += "+(" + this.parseOperator(items[i]) + ")";
        }
        if (val == "") {
            val = "0";
        }
        else {
            val = val.substring(1);
            val = "(" + val + ")/" + items.length;
        }
        val = "(" + val + ")";
        return val;
    },

    //Parse Count
    parseCountOperator: function (str) {
        var items = this._getItemsWithSplit(str);

        var value = 0;

        for (var i = 0; i < items.length; i++) {
            var tmpValue = eval("(" + this.parseOperator(items[i]) + ")");
            if (tmpValue != 0) {
                value++;
            }
        }
        return value + "";
    },

    //Parse Max
    parseMaxOperator: function (str) {
        var items = this._getItemsWithSplit(str);
        var max = null;
        for (var i = 0; i < items.length; i++) {
            var tmpValue = eval("(" + this.parseOperator(items[i]) + ")");
            if (!max || tmpValue > max) {
                max = tmpValue;
            }
        }
        return max + "";
    },

    //Parse Min
    parseMinOperator: function (str) {
        var items = this._getItemsWithSplit(str);
        var min = null;
        for (var i = 0; i < items.length; i++) {
            var tmpValue = eval("(" + this.parseOperator(items[i]) + ")");
            if (!min || tmpValue < min) {
                min = tmpValue;
            }
        }
        return min + "";
    }
};

//alert(com.hoperun.util.AlgorithmsParseTools.doCal("COUNT(0,100,(SUM(3,2)+3)+SUM(2,SUM(3,2))/4-AVERAGE(SUM(3,2),SUM(3,2))*(SUM(3,2)-SUM(3,4))+4,200,30)"));//
//alert(com.hoperun.util.AlgorithmsParseTools.doCal("MAX(0,100,(SUM(3,2)+3)+SUM(2,SUM(3,2))/4-AVERAGE(SUM(3,2),SUM(3,2))*(SUM(3,2)-SUM(3,4))+4,200,30)"));//