/**
 * Cell class
 * 
 * @package com.hoperun.node
 * @import com.hoperun.util.BaseTool,com.hoperun.util.NodeCache,com.hoperun.event.MouseEvent
 * @author xuliyu
 */
com.hoperun.node.Cell = function() {
	com.hoperun.node.Cell.superClass.constructor.call(this);
	this._domInstance = document.createElement("div");
	this._domInstance.style.position = 'absolute';
	this._domInstance.style.overflow = 'hidden';
	this._domInstance.id = this._id;
	this._domInstance.appendChild(document.createElement("span"));
	this._domInstance.setAttribute("objectType","Cell");
	this.setLineHeight(20);
	this.setFontSize(12);
	this.setText("");
	
	//this.setUnderline(true);
	//this.setLineThrough(true);
	//this.setFontStyle("italic");
	//this.setFontWeight("bold");
	//this.setTextAlign("center");
	
	this._type = "Cell";
	com.hoperun.util.NodeCache.add(this.getId(), this);
	
	var self = this;
	this._domInstance.addEventListener('click', function(event){com.hoperun.event.MouseEvent.click(event, self);$('.tracker-menu').css('display','none');}, true);
	this._domInstance.addEventListener('dblclick', function(event){com.hoperun.event.MouseEvent.dblclick(event, self);}, true);
	
	com.hoperun.util.BaseTool.actsAsAspect(this);
};
com.hoperun.util.BaseTool.extend(com.hoperun.node.Cell,com.hoperun.node.Node);

com.hoperun.util.BaseTool.augment(com.hoperun.node.Cell,{

    _row: null,

    _col: null,

    _width: null,

    _height: null,

    _backgroundColor: null,

    _child: null,

    _left: null,

    _top: null,

    _text: null,

    _lineHeight: null,

    _fontSize: null,

    _fontWeight: null, //bold

    _fontStyle: null, //italic

    _underline: null,

    _lineThrough: null,

    _fontFamily: null,

    _textAlign: null, //center left right justify

    _color: null,

    _format: null,

    _wrapText: null,

    _borderTop: null,

    _borderBottom: null,

    _borderLeft: null,

    _borderRight: null,

    _functions: null,
    
    _borderStyle:null,
    
    getBorderStyle: function () {
        return this._borderStyle;
    },

    setBorderStyle: function (borderStyle) {
        this._borderStyle = borderStyle;
    },

    getBorderTop: function () {
        return this._borderTop;
    },

    setBorderTop: function (borderTop) {
        this._domInstance.style.borderTop = borderTop;
        this._borderTop = borderTop;
    },

    getBorderBottom: function () {
        return this._borderBottom;
    },

    setBorderBottom: function (borderBottom) {
        this._domInstance.style.borderBottom = borderBottom;
        this._borderBottom = borderBottom;
    },

    getBorderLeft: function () {
        return this._borderLeft;
    },

    setBorderLeft: function (borderLeft) {
        this._domInstance.style.borderLeft = borderLeft;
        this._borderLeft = borderLeft;
    },

    getBorderRight: function () {
        return this._borderRight;
    },

    setBorderRight: function (borderRight) {
        this._domInstance.style.borderRight = borderRight;
        this._borderRight = borderRight;
    },
    setFunctions: function (functions) {
        var oldFunction = this._functions;
        this._functions = functions;
        if (oldFunction != null && this._functions == null) {
            this.setText("");
        }
        var cellParent = this._parentNode;
        if(cellParent != null || cellParent != undefined){
        		cellParent.refreshCellValue();
        }
    },
    getFunctions: function () {
        return this._functions;
    },
    getExpression: function () {
        var expression = this._functions;
        if (this._functions != null) {
            var parentTable = this._parentNode;
            /*FUNCTION1
            [2-2]+([3-2]-[3-2])+SUM([3-2],[4-2],[4-2],[3-1])
            ? +  -  ×  /   //var objRegExp = new RegExp("[/\+\*\-]"); //var operatorUnit = expression.toString().split(objRegExp);*/
            /*FUNCTION2
            replace by '[' ']'
            ////////var cellRegExp = new RegExp("[\[].+?]", "g"); //\[[^[]*]*/
            /*FUNCTION3
            replace by 'AA23'
            var cellRegExp = new RegExp("[A-Z]\w{0,20}\d{0,20}[0-9]", "g"); */

            var cellRegExp = new RegExp("[a-zA-Z]{1,20}[0-9]{1,20}", "g"); //
            var cells = expression.match(cellRegExp);
            if (cells != null) {
                for (var i = 0; i < cells.length; i++) {
                    //console.log("CELL" + i.toString() + ":  " + cells[i]);
                    //var index = cells[i].indexOf('-');
                    //var row = parseInt(cells[i].substring(1, index));
                    //var col = parseInt(cells[i].substring(index + 1, cells[i].length - 1));
                    var index = cells[i].search("[0-9]");
                    var col = com.hoperun.util.BaseTool.CellIndex_StrToNum(cells[i].substring(0, index));
                    var row = parseInt(cells[i].substring(index, cells[i].length));
                    var cellExpression = "";
                    if (parentTable.getCellsByRowAndColNo(row, col) != null) {
                        cellExpression = parentTable.getCellsByRowAndColNo(row, col).getExpression();
                    } else {
                        cellExpression = '#NullRef(' + cells[i] + ')';
                    }
                    //Replace with value
                    expression = expression.replace(cells[i], cellExpression);
                } 
            }
            return '(' + expression + ')';
        } else {
            if (this.getText() == "") {
                return 0;
            } else {
                return this.getText();
            }
        }
    },
    
    setWrapText: function (wrapText) {
        with (this._domInstance.getElementsByTagName("span")[0]) {
            if (wrapText) {
                style.wordBreak = 'break-all';
                style.wordWrap = 'break-word';
                style.overflow = 'hidden';
                style.whiteSpace = 'normal';
            } else {
                style.wordBreak = '';
                style.wordWrap = '';
                style.overflow = 'hidden';
                style.whiteSpace = '';
            }
        }
        this._wrapText = wrapText;
    },

    getWrapText: function () {
        return this._wrapText;
    },

    updateCellBorderWidth: function (borderWidthPropertyKey, width) {
        var value = null;
        if (width == 0) {
            value = "0px";
        }
        else if (width == 1) {
            value = "1px";
        }
        if (value) {
            com.hoperun.util.BaseTool.setStyleProperty(this._domInstance.style, borderWidthPropertyKey, value);
        }
    },

    updateCellsFormatValue: function (cell) {
        if (cell.getFormat() != null) {
            var thisFormat = cell.getFormat();
            switch (thisFormat.name) {
                case "Number":
                    cell.getDomInstance().getElementsByTagName("span")[0].innerHTML
                    = FormatToNumber(cell);
                    break;
                case "Currency":
                    cell.getDomInstance().getElementsByTagName("span")[0].innerHTML
                    = FormatToCurrency(cell);
                    break;
                case "Percentage": cell.getDomInstance().getElementsByTagName("span")[0].innerHTML
                    = FormatToPercentage(cell);
                    break;
                case "DateTime": cell.getDomInstance().getElementsByTagName("span")[0].innerHTML
                    = FormatToDateTime(cell);
                    break;
                case "Duration": cell.getDomInstance().getElementsByTagName("span")[0].innerHTML
                    = FormatToDuration(cell);
                    break;
                case "CheckBox": cell.getDomInstance().getElementsByTagName("span")[0].innerHTML
                    = FormatToCheckBox(cell);
                    break;
                case "StarRating": cell.getDomInstance().getElementsByTagName("span")[0].innerHTML
                    = FormatToStarRating(cell);
                    break;
                case "Text":
                    cell.getDomInstance().getElementsByTagName("span")[0].innerHTML
                    = FormatToText(cell);
                    break;
              default:
            	    cell.getDomInstance().getElementsByTagName("span")[0].innerHTML = FormatToText(cell);
              		break;
            }
        } else {
            if ($("#" + this._id + ":has(input)").length != 0) {
                $("#" + this._id + " input").remove();
            }
            cell.getDomInstance().getElementsByTagName("span")[0].innerHTML =this._text;
        }
    },
    setColor: function (color) {
        this._domInstance.getElementsByTagName("span")[0].style.color = color;
        this._color = color;
    },

    getColor: function () {
        return this._color;
    },

    getTextAlign: function () {
        return this._textAlign;
    },

    setTextAlign: function (textAlign) {
        this._domInstance.style.textAlign = textAlign;
        this._textAlign = textAlign;
    },

    getTextAlign: function () {
        return this._textAlign;
    },

    setFontFamily: function (fontFamily) {
        this._domInstance.style.fontFamily = fontFamily;
        this._fontFamily = fontFamily;
    },

    getFontFamily: function () {
        return this._fontFamily;
    },

    setLineThrough: function (lineThrough) {
        var style = "";
        if (lineThrough)
            style = "line-through ";
        if (this._underline)
            style += "underline";
        this._domInstance.getElementsByTagName("span")[0].style.textDecoration = style;
        this._lineThrough = lineThrough;
    },

    getLineThrough: function () {
        return this._lineThrough;
    },

    setUnderline: function (underline) {
        var style = "";
        if (this._lineThrough)
            style = "line-through ";
        if (underline)
            style += "underline";
        this._domInstance.getElementsByTagName("span")[0].style.textDecoration = style;
        this._underline = underline;
    },

    getUnderline: function () {
        return this._underline;
    },

    setFontStyle: function (fontStyle) {
        this._domInstance.getElementsByTagName("span")[0].style.fontStyle = fontStyle;
        this._fontStyle = fontStyle;
    },

    getFontStyle: function () {
        return this._fontStyle;
    },

    setFontWeight: function (fontWeight) {
        this._domInstance.getElementsByTagName("span")[0].style.fontWeight = fontWeight;
        this._fontWeight = fontWeight;
    },

    getFontWeight: function () {
        return this._fontWeight;
    },

    setFontSize: function (fontSize) {
        this._domInstance.getElementsByTagName("span")[0].style.fontSize = fontSize;
        this._fontSize = fontSize;
    },

    getFontSize: function () {
        return this._fontSize;
    },

    setLineHeight: function (height) {
        this._domInstance.getElementsByTagName("span")[0].style.lineHeight = height + "px";
        this._lineHeight = height;
    },

    getLineHeight: function () {
        return this._lineHeight;
    },

    edit: function () {
    	var that = this;
        var text = this._text;
        this.setText("");
        var editObj = $("<div></div>").attr({
            id: this._id + '_edit_value',
            contenteditable: 'true'
        }).html(text);
        editObj.css({
            'width': this._width,
            'height': this._height,
            'word-break': 'break-all',
            'word-wrap': 'break-word',
            'overflow': 'hidden',
            'white-space': 'normal',
            'backgroundColor': 'white',
            'text-align':'left',
            'margin':'0 auto',
            'padding-left':'1px'
        });
        $(this._domInstance).append(editObj);
        editObj.keypress(function (e) {
            if (e.keyCode == 13 && e.shiftKey == false) {
                e.preventDefault();
                this.blur();
            }
        });
        editObj.blur(function() {
					var value = editObj.text();
					var cell = that;
					if (value != text) {
						jsk.execute(function() {
									cell.setText(value);
									// cell
									var currTable = that._parentNode;
									currTable.refreshCellValue();
									return {
										"currCell" : cell,
										"value" : text,
										'currTable' : currTable
									};
								}, function(data) {
									data.currCell.setText(data.value);
									data.currTable.refreshCellValue();
								});
					} else {
						cell.setText(value);
					}
					editObj.remove();
					editObj = null;
					return false;
				});
		editObj.focus();
    },
    // 
    zoom: function (multiple) {
        this.setTop(this._top * multiple);
        this.setLeft(this._left * multiple);
        this.setWidth(this._width * multiple);
        this.setHeight(this._height * multiple);
        this.setFontSize(this._fontSize * multiple);
    },

    setLeft: function (left) {
        this._left = left;
        this._domInstance.style.left = left;
    },

    getLeft: function () {
        return this._left;
    },

    setTop: function (top) {
        this._top = top;
        this._domInstance.style.top = top;
    },

    getTop: function () {
        return this._top;
    },

    setRow: function (row) {
        this._row = row;
    },

    getRow: function () {
        return this._row;
    },

    setCol: function (col) {
        this._col = col;
    },

    getCol: function () {
        return this._col;
    },

    setWidth: function (width) {
        this._domInstance.style.width = width;
        this._width = width;
    },

    getWidth: function () {
        return this._width;
    },

    setHeight: function (height) {
        this._domInstance.style.height = height;
        this._height = height;
    },

    getHeight: function () {
        return this._height;
    },

    setBackgroundColor: function (backgroundColor) {
        this._domInstance.style.backgroundColor = backgroundColor;
        this._backgroundColor = backgroundColor;
    },

    getBackgroundColor: function () {
        return this._backgroundColor;
    },

    setText: function (text) {
        //this._domInstance.getElementsByTagName("span")[0].innerHTML = text;
        this._text = text;
        this.updateCellsFormatValue(this);
    },

    getText: function () {
        return this._text;
    },

    setFormat: function (format) {
        //this._domInstance.getElementsByTagName("span")[0].innerHTML = format.value;
        this._format = format;
        //alert('set fromat');
        this.updateCellsFormatValue(this);
    },
    getFormat: function () {
        return this._format;
    },

    //  public method : set obj from attr
    setData: function (data) {
        if (data.width != this._width)
            this.setWidth(data.width);
        if (data.height != this._height)
            this.setHeight(data.height);
        if (data.row != this._row)
            this.setRow(data.row);
        if (data.col != this._col)
            this.setCol(data.col);
        if (data.backgroundColor != this._backgroundColor)
            this.setBackgroundColor(data.backgroundColor);
        if (data.text != this._text)
            this.setText(data.text==null?"":data.text);
        if (data.lineHeight != this._lineHeight)
            this.setLineHeight(data.lineHeight);
        if (data.fontSize != this._fontSize)
            this.setFontSize(data.fontSize);
        if (data.fontWeight != this._fontWeight)
            this.setFontWeight(data.fontWeight);
        if (data.fontStyle != this._fontStyle)
            this.setFontStyle(data.fontStyle);
        if (data.textDecoration != this._textDecoration)
            this.setTextDecoration(data.textDecoration);
        if (data.underline != this._underline)
            this.setUnderline(data.underline);
        if (data.lineThrough != this._lineThrough)
            this.setLineThrough(data.lineThrough);
        if (data.fontFamily != this._fontFamily)
            this.setFontFamily(data.fontFamily);
        if (data.textAlign != this._textAlign)
            this.setTextAlign(data.textAlign);
        if (data.color != this._color)
            this.setColor(data.color);
        if (data.format != this._format)
            this.setFormat(data.format);
        if (data.wrapText != this._wrapText)
            this.setWrapText(data.wrapText);
        if (data.borderTop != this._borderTop)
            this.setBorderTop(data.borderTop);
        if (data.borderBottom != this._borderBottom)
            this.setBorderBottom(data.borderBottom);
        if (data.borderLeft != this._borderLeft)
            this.setBorderLeft(data.borderLeft);
        if (data.borderRight != this._borderRight)
            this.setBorderRight(data.borderRight);
        if (data.functions != this._functions)
            this.setFunctions(data.functions);
    },
    // 
    getData: function () {
        return {
            id: this._id,
            type: this._type,
            row: this._row,
            col: this._col,
            format: this._format,
            width: this._width,
            height: this._height,
            backgroundColor: this._backgroundColor,
            text: this._text,
            lineHeight: this._lineHeight,
            fontSize: this._fontSize,
            fontWeight: this._fontWeight,
            fontStyle: this._fontStyle,
            underline: this._underline,
            lineThrough: this._lineThrough,
            fontFamily: this._fontFamily,
            textAlign: this._textAlign,
            color: this._color,
            wrapText: this._wrapText,
            borderTop: this._borderTop,
            borderBottom: this._borderBottom,
            borderLeft: this._borderLeft,
            borderRight: this._borderRight,
            functions: this._functions
        };
    },

    appendChild: function (childNode) {
        this._domInstance.appendChild(childNode.getDomInstance());
        childNode._parentNode = this;
    },

    removeChild: function (childNode) {
        this._domInstance.removeChild(childNode.getDomInstance());
    },
    
});