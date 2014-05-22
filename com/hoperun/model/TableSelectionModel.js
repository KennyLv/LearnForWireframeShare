/**
 * Table selection model class
 * @package com.hoperun.model
 * @author lu_feng
 */
com.hoperun.model.TableSelectionModel = function(row, col, rowNumber, colNumber) {
	this._type = "TableSelectionModel";
	this._id = com.hoperun.util.BaseTool.uuid();
	this._row = row;
	this._col = col;
	this._rowNumber = rowNumber;
	this._colNumber = colNumber;
};
com.hoperun.model.TableSelectionModel.prototype = {
	_id:null,
    _row: null,
    _col: null,
    _rowNumber: null,
    _colNumber: null,
    _format: null,
    _borderType: null,
    _backgroundColor: null,
    _color: null,
    _bold: null,
    _italic: null,
    _underline: null,
    _lineThrough: null,
    _textSize: null,
    _textFont: null,
    _horizontalAlign:null,
    /*
    _horizontalAlignLeft: null,
    _horizontalAlignCenter: null,
    _horizontalAlignRight: null,
    _horizontalAlignAjustment: null,*/
	_wrapTextInCell:null,
	
    getId: function () {
        return this._id;
    },
	setWrapTextInCell: function (wrapTextInCell) {
        this._wrapTextInCell = wrapTextInCell;
    },
    getWrapTextInCell: function () {
        return this._wrapTextInCell;
    },
    setcellHorizontalAlign: function (horizontalAlign) {
        this._horizontalAlign = horizontalAlign;
    },
    getcellHorizontalAlign: function () {
        return this._horizontalAlign;
    },
    /*
    setHorizontalAlignLeft: function (horizontalAlignLeft) {
        this._horizontalAlignLeft = horizontalAlignLeft;
    },
    getHorizontalAlignLeft: function () {
        return this._horizontalAlignLeft;
    },
    setHorizontalAlignCenter: function (horizontalAlignCenter) {
        this._horizontalAlignCenter = horizontalAlignCenter;
    },
    getHorizontalAlignCenter: function () {
        return this._horizontalAlignCenter;
    },
    setHorizontalAlignRight: function (horizontalAlignRight) {
        this._horizontalAlignRight = horizontalAlignRight;
    },
    getHorizontalAlignRight: function () {
        return this._horizontalAlignRight;
    },
    setHorizontalAlignAjustment: function (horizontalAlignAjustment) {
        this._horizontalAlignAjustment = horizontalAlignAjustment;
    },
    getHorizontalAlignAjustment: function () {
        return this._horizontalAlignAjustment;
    },*/
    setTextSize: function (textSize) {
        this._textSize = textSize;
    },
    getTextSize: function () {
        return this._textSize;
    },
    setTextFont: function (textFont) {
        this._textFont = textFont;
    },
    getTextFont: function () {
        return this._textFont;
    },
    setLineThrough: function (lineThrough) {
        this._lineThrough = lineThrough;
    },
    getLineThrough: function () {
        return this._lineThrough;
    },
    setUnderline: function (underline) {
        this._underline = underline;
    },
    getUnderline: function () {
        return this._underline;
    },
    setItalic: function (italic) {
        this._italic = italic;
    },
    getItalic: function () {
        return this._italic;
    },
    setBold: function (bold) {
        this._bold = bold;
    },
    getBold: function () {
        return this._bold;
    },
    setRow: function (row) {
        this._row = row;
    },
    setCol: function (col) {
        this._col = col;
    },
    setRowNumber: function (rowNumber) {
        this._rowNumber = rowNumber;
    },
    setColNumber: function (colNumber) {
        this._colNumber = colNumber;
    },
    setBorderType: function (borderType) {
        this._borderType = borderType;
    },
    setBackgroundColor: function (backgroundColor) {
        this._backgroundColor = backgroundColor;
    },
    getRow: function () {
        return this._row;
    },
    getCol: function () {
        return this._col;
    },
    getRowNumber: function () {
        return this._rowNumber;
    },
    getColNumber: function () {
        return this._colNumber;
    },
    getBorderType: function () {
        return this._borderType;
    },
    getBackgroundColor: function () {
        return this._backgroundColor;
    },
    getColor: function () {
        return this._color;
    },
    setColor: function (color) {
        this._color = color;
    },
    getFormat: function () {
        return this._format;
    },
    setFormat: function (format) {
        this._format = format;
    },

    getData: function () {
        return {
            row: this._row,
            col: this._col,
            rowNumber: this._rowNumber,
            colNumber: this._colNumber,
            format: this._format,
            borderType: this._borderType,
            backgroundColor: this._backgroundColor,
            color: this._color,
            bold: this._bold,
            italic: this._italic,
            underline: this._underline,
            lineThrough: this._lineThrough,
            textSize: this._textSize,
            textFont: this._textFont,
            horizontalAlign:this._horizontalAlign,
            /*horizontalAlignLeft: this._horizontalAlignLeft,
            horizontalAlignCenter: this._horizontalAlignCenter,
            horizontalAlignRight: this._horizontalAlignRight,
            horizontalAlignAjustment: this._horizontalAlignAjustment,*/
			wrapTextInCell : this._wrapTextInCell
        };
    },

    setData: function (data) {
        this._row = data.row;
        this._col = data.col;
        this._rowNumber = data.rowNumber;
        this._colNumber = data.colNumber;
        this._format = data.format; 
        this._borderType = data.borderType;
        this._backgroundColor = data.backgroundColor;
        this._color = data.color;
        this._bold = data.bold;
        this._italic = data.italic;
        this._underline = data.underline;
        this._lineThrough = data.lineThrough;
        this._textSize = data.textSize;
        this._textFont = data.textFont;
        this._horizontalAlign=data.horizontalAlign,
        /*this._horizontalAlignLeft = data.horizontalAlignLeft;
        this._horizontalAlignCenter = data.horizontalAlignCenter;
        this._horizontalAlignRight = data.horizontalAlignRight;
        this._horizontalAlignAjustment = data.horizontalAlignAjustment;*/
		this._wrapTextInCell = data.wrapTextInCell;
    },

    copyNotNullStyle: function(selection){
    	if(selection._format != null) this._format = selection._format; 
    	if(selection._borderType != null) this._borderType = selection._borderType;
    	if(selection._backgroundColor != null) this._backgroundColor = selection._backgroundColor;
    	if(selection._color != null) this._color = selection._color;
    	if(selection._bold != null) this._bold = selection._bold;
    	if(selection._italic != null) this._italic = selection._italic;
    	if(selection._underline != null) this._underline = selection._underline;
    	if(selection._lineThrough != null) this._lineThrough = selection._lineThrough;
    	if(selection._textSize != null) this._textSize = selection._textSize;
    	if(selection._textFont != null) this._textFont = selection._textFont;
    	if(selection._horizontalAlign != null) this._horizontalAlign = selection._horizontalAlign;
    	/*if(selection._horizontalAlignLeft != null) this._horizontalAlignLeft = selection._horizontalAlignLeft;
    	if(selection._horizontalAlignCenter != null) this._horizontalAlignCenter = selection._horizontalAlignCenter;
    	if(selection._horizontalAlignRight != null) this._horizontalAlignRight = selection._horizontalAlignRight;
    	if(selection._horizontalAlignAjustment != null) this._horizontalAlignAjustment = selection._horizontalAlignAjustment;
    	*/
    	if(selection._wrapTextInCell != null) this._wrapTextInCell = selection._wrapTextInCell;
    },
    
    toJSON: function () {
        return JSON.stringify(this.getData());
    },

    clone: function () {
        var cloneObj = new com.hoperun.model.TableSelectionModel();
        cloneObj.setData(this.getData());
        return cloneObj;
    },

    copy: function () {
        var copyObj = new com.hoperun.model.TableSelectionModel();
        copyObj.setRow(this.getRow());
        copyObj.setCol(this.getCol());
        copyObj.setRowNumber(this.getRowNumber());
        copyObj.setColNumber(this.getColNumber());
        return copyObj;
    },

    isSameRange: function (selection) {
        if (this._row == selection._row
				&& this._col == selection._col
				&& this._rowNumber == selection._rowNumber
				&& this._colNumber == selection._colNumber) {
            return true;
        }
        return false;
    }
};

com.hoperun.model.TableSelectionModelHelper = {
    extendRow: function (selections, rowNo) {
        for (var i = 0; i < selections.length; i++) {
            var selection = selections[i];
            var begin = selection.getRow(), rowNumber = selection.getRowNumber();
            var end = begin + rowNumber;
            if (rowNo < begin) {
                selection.setRow(begin + 1);
            }
            else if (rowNo < end) {
                selection.setRowNumber(rowNumber + 1);
            }
        }
    },
    removeRow: function (selections, rowNo) {
        for (var i = selections.length - 1; i > -1; i--) {
            var selection = selections[i];
            var begin = selection.getRow(), rowNumber = selection.getRowNumber();
            var end = begin + rowNumber;
            if (rowNo < begin) {
                selection.setRow(begin - 1);
            }
            else if (rowNo < end) {
                if (selection.getRowNumber() <= 1) {
                    selections.removeAt(i);
                }
                else {
                    selection.setRowNumber(rowNumber - 1);
                }
            }
        }
    },
    extendCol: function (selections, colNo) {
        for (var i = 0; i < selections.length; i++) {
            var selection = selections[i];
            var begin = selection.getCol(), colNumber = selection.getColNumber();
            var end = begin + colNumber;
            if (colNo < begin) {
                selection.setCol(begin + 1);
            }
            else if (colNo < end) {
                selection.setColNumber(colNumber + 1);
            }
        }
    },
    removeCol: function (selections, colNo) {
        for (var i = selections.length - 1; i > -1; i--) {
            var selection = selections[i];
            var begin = selection.getCol(), colNumber = selection.getColNumber();
            var end = begin + colNumber;
            if (colNo < begin) {
                selection.setCol(begin - 1);
            }
            else if (colNo < end) {
                if (selection.setColNumber() <= 1) {
                    selections.removeAt(i);
                }
                else {
                    selection.setColNumber(colNumber - 1);
                }
            }
        }
    },

    addSelection: function (selections, selection,mustPush) {
        //		var existedSelection = null;
        //		for(var i=0; i<selections.length; i++){
        //			if(selections[i].isSameRange(selection)){
        //				existedSelection = selections[i];
        //				selections.removeAt(i);
        //				break;
        //			}
        //		}
        //		if(!existedSelection){
        //			existedSelection = selection.clone();
        //		}
        //		else{
        //			existedSelection.copyStyle(selection);
        //		}
    	if(mustPush){
        	selections.push(selection);
        	return;
        }
        if (selections.length > 0 && selections[selections.length - 1].isSameRange(selection)) {
            var existedSelection = selections[selections.length - 1];
            existedSelection.copyNotNullStyle(selection);
        }
        else {
            selections.push(selection);
        }
    },
    removeSelection: function (selections,selectionId) {
    	for (var s = selections.length-1; s >-1; s--) {
	        if(selections[s].getId()==selectionId){
	        	selections.splice(s,1);
	        	break;
	        }
    	}
        //console.log(selections[selections.length-1].getFormat());
    },
    addSelectionByDel: function (selections, selection) {
        selections.push(selection);
    },

    updateTableCellsStyle: function (table, selections) {
        var cellBorderWidthStyle = [], cellBackgroundColor = [], cellColor = [], cellBold = [], cellItalic = [], cellWrapTextInCell = [];
        var cellUnderline = [], cellLineThrough = [], cellTextSize = [], cellTextFont = [],cellHorizontalAlign=[], cellHorizontalAlignLeft = [];
        var cellHorizontalAlignCenter = [], cellHorizontalAlignRight = [], cellHorizontalAlignAjustment = [], cellFormat = [];
        var cells = table.getCells();
        for (var i = 0; i < cells.length; i++) {
            cellBorderWidthStyle.push({
                top: -1,
                right: -1,
                bottom: -1,
                left: -1
            });
        }
        for (var j = 0; j < selections.length; j++) {
            var selection = selections[j];
            var borderTypeStyle = this.getBorderStyle(selection.getBorderType());
            var minCol = selection.getCol(), minRow = selection.getRow();
            var maxCol = minCol + selection.getColNumber() - 1, maxRow = minRow + selection.getRowNumber() - 1;

            for (var i = 0; i < cells.length; i++) {
                var cell = cells[i];
                var row = cell.getRow(), col = cell.getCol();
                if (row >= minRow && col >= minCol && row <= maxRow && col <= maxCol) {
                    //Set Format
                	if(selection.getFormat()){
                    cellFormat[i] = selection.getFormat();
                	}
                    //Set background color
                    if(selection.getBackgroundColor()){
                    cellBackgroundColor[i] = selection.getBackgroundColor();
                    }
                    //set color
                    if(selection.getColor()){
                    cellColor[i] = selection.getColor();
                    }
                    //set Bold
                    if(selection.getBold()!=null){
                    cellBold[i] = selection.getBold();
                    }
                    //set italic
                    if(selection.getItalic()!=null){
                    cellItalic[i] = selection.getItalic();
                    }
                    //set underline
                    if(selection.getUnderline()!=null){
                    cellUnderline[i] = selection.getUnderline();
                    }
                    //set lineThrough
                    if(selection.getLineThrough()!=null){
                    cellLineThrough[i] = selection.getLineThrough();
                    }
                    //set lineThrough
                    if(selection.getTextSize()){
                    cellTextSize[i] = selection.getTextSize();
                    }
                    //set textFont
                    if(selection.getTextFont()){
                    cellTextFont[i] = selection.getTextFont();
                    }
                    
                    if(selection.getcellHorizontalAlign()){
                    	cellHorizontalAlign[i] = selection.getcellHorizontalAlign();
                    }
                    /*
                    
                    //set horizontalAlignLeft
                    if(selection.getHorizontalAlignLeft()){
                    cellHorizontalAlignLeft[i] = selection.getHorizontalAlignLeft();
                    }
                    //set horizontalAlignCenter
                    if(selection.getHorizontalAlignCenter()){
                    cellHorizontalAlignCenter[i] = selection.getHorizontalAlignCenter();
                    }
                    //set horizontalAlignRight
                    if(selection.getHorizontalAlignRight()){
                    cellHorizontalAlignRight[i] = selection.getHorizontalAlignRight();
                    }
                    //set horizontalAlignAjustment
                    if(selection.getHorizontalAlignAjustment()){
                    cellHorizontalAlignAjustment[i] = selection.getHorizontalAlignAjustment();
                    }
                    */
                    
                    //set wrapTextInCell
                    if(selection.getWrapTextInCell()!=null){
                    cellWrapTextInCell[i] = selection.getWrapTextInCell();
                    }
                    //Set border style
                    var cellBorderWidth = cellBorderWidthStyle[i];
                    var position = "";
                    //top cell of selection
                    if (row == minRow) {
                        //this.updateBorderWidth(borderTypeStyle, 'top', cellBorderWidth, 'top');
                        position += ",top";
                    }
                    //left cell of selection
                    if (col == minCol) {
                        //this.updateBorderWidth(borderTypeStyle, 'left', cellBorderWidth, 'left');
                        //cellBorderWidth.right = 0;
                        position += ",left";
                    }
                    //bottom cell of selection
                    if (row == maxRow) {
                        //this.updateBorderWidth(borderTypeStyle, 'bottom', cellBorderWidth, 'bottom');
                        position += ",bottom";
                    }
                    //right cell of selection
                    if (col == maxCol) {
                        //this.updateBorderWidth(borderTypeStyle, 'right', cellBorderWidth, 'right');
                        position += ",right";
                    }
                    //center cell for vertical line of selection
                    if (col > minCol && col <= maxCol) {
                        //this.updateBorderWidth(borderTypeStyle, 'vertical', cellBorderWidth, 'left');
                        position += ",vertical";
                    }
                    //center cell for horizon line of selection 
                    if (row > minRow && row <= maxRow) {
                        position += ",horizon";
                        //this.updateBorderWidth(borderTypeStyle, 'horizon', cellBorderWidth, 'top');
                    }

                    this.updateBorderWidth(borderTypeStyle, cellBorderWidth, position);

                    if (col < table.getCols()) {
                        cellBorderWidthStyle[i + 1].left = cellBorderWidth.right;
                    }
                    if (row < table.getRows()) {
                        cellBorderWidthStyle[i + table.getCols()].top = cellBorderWidth.bottom;
                    }
                }
            }
        }
        //Update border width style into DOM cell
        var tableRow = table.getRows(), tableCol = table.getCols();
        for (var i = 0; i < cells.length; i++) {
            var cell = cells[i];
            var row = cell.getRow(), col = cell.getCol();
            //Format
            var format = cellFormat[i];
            if (format) {
                this.updateTableCellsFormat(cell, format);
            }
            //Backgound color
            var backgroundColor = cellBackgroundColor[i];
            //console.info(row + ', '+col +', '+backgroundColor);
            if (backgroundColor){
                cell.setBackgroundColor(backgroundColor);
            }
            //color
            var color = cellColor[i];
            if (color){
            	if(format){
            		if(format.name == "Number" || format.name == "Currency" || format.name == "Percentage"){
    	                if(format.formatOptions.minusStyle == null){
    	                	cell.setColor(color);
    	                }
    	            }else{
    	            	cell.setColor(color);
    	            }
            	}else{
	                cell.setColor(color);
	            }
            }
	            
            //bold
            var bold = cellBold[i];
            if (bold != null) {
                if (bold){
                    cell.setFontWeight("bold");
                }else{
                    cell.setFontWeight("");
            }
            }
            //italic
            var italic = cellItalic[i];
            if (italic != null) {
                if (italic)
                    cell.setFontStyle("italic");
                else
                    cell.setFontStyle("");
            }
            //underline
            var underline = cellUnderline[i];
            if (underline != null){
                cell.setUnderline(underline);
            }
            //lineThrough
            var lineThrough = cellLineThrough[i];
            if (lineThrough != null){
                cell.setLineThrough(lineThrough);
            }
            //textSize
            var textSize = cellTextSize[i];
            if (textSize)
                cell.setFontSize(textSize);
            //textFont
            var textFont = cellTextFont[i];
            if (textFont)
                cell.setFontFamily(textFont);
            
            
            
            var cellAlignment=cellHorizontalAlign[i];
            if(cellAlignment){
            	cell.setTextAlign(cellAlignment);
            }
            
            //wrapTextInCell
            var wrapTextInCell = cellWrapTextInCell[i];
            if (wrapTextInCell != null)
                cell.setWrapText(wrapTextInCell);

            //Border width style
            var cellBorderWidth = cellBorderWidthStyle[i];
            cell.updateCellBorderWidth("border-left-width", cellBorderWidth.left);
            cell.updateCellBorderWidth("border-top-width", cellBorderWidth.top);

            if (row == tableRow) {
                cell.updateCellBorderWidth("border-bottom-width", cellBorderWidth.bottom);
            }

            if (col == tableCol) {
                cell.updateCellBorderWidth("border-right-width", cellBorderWidth.right);
            }
        }
    },

    updateBorderWidth: function (borderType, borderWidthStyle, cellPosition) {
        if (borderType == null) {
            borderWidthStyle.top = -1;
            borderWidthStyle.right = -1;
            borderWidthStyle.bottom = -1;
            borderWidthStyle.left = -1;
        }
        else {
            var hasTop = (borderType.top && cellPosition.indexOf('top') != -1) || (borderType.horizon && cellPosition.indexOf('horizon') != -1);
            var hasRight = borderType.right && cellPosition.indexOf('right') != -1;
            var hasBottom = borderType.bottom && cellPosition.indexOf('bottom') != -1;
            var hasLeft = (borderType.left && cellPosition.indexOf('left') != -1) || (borderType.vertical && cellPosition.indexOf('vertical') != -1);

            borderWidthStyle.top = hasTop ? 1 : 0;
            borderWidthStyle.right = hasRight ? 1 : 0;
            borderWidthStyle.bottom = hasBottom ? 1 : 0;
            borderWidthStyle.left = hasLeft ? 1 : 0;
        }
    },

    updateBorderWidth11: function (borderType, borderTypeKey, borderWidthStyle, borderWidthStyleKey) {
        //No specified border existed
        if (borderType[borderTypeKey] == null) {
            borderWidthStyle[borderWidthStyleKey] = 0;
        }
        else {
            //Add border line
            if (borderType[borderTypeKey]) {
                borderWidthStyle[borderWidthStyleKey] = 1;
            }
            //Use the default value
            else {
                borderWidthStyle[borderWidthStyleKey] = -1;
            }
        }
    },

    getBorderStyle: function (borderType) {
        //ALL                      
        //OutlineMiddle             
        //OutlineCenter
        //Outline     
        //Top                       --
        //Middle                    --
        //Bottom                    
        //Left                      |
        //Center                     |
        //Right                        |
        //Default                 
        var styleData = null;
        if (!borderType) {
            styleData = null;
        }
        else if (borderType == 'ALL') {
            styleData = {
                left: true,
                top: true,
                right: true,
                bottom: true,
                vertical: true,
                horizon: true
            };
        }
        else if (borderType == 'OutlineMiddle') {
            styleData = {
                left: true,
                top: true,
                right: true,
                bottom: true,
                vertical: false,
                horizon: true
            };
        }
        else if (borderType == 'OutlineCenter') {
            styleData = {
                left: true,
                top: true,
                right: true,
                bottom: true,

                vertical: true,
                horizon: false
            };
        }
        else if (borderType == 'Outline') {
            styleData = {
                left: true,
                top: true,
                right: true,
                bottom: true,

                vertical: false,
                horizon: false
            };
        }
        else if (borderType == 'Top') {
            styleData = {
                left: false,
                top: true,
                right: false,
                bottom: false,

                vertical: false,
                horizon: false
            };
        }
        else if (borderType == 'Middle') {
            styleData = {
                left: false,
                top: false,
                right: false,
                bottom: false,

                vertical: false,
                horizon: true
            };
        }
        else if (borderType == 'Bottom') {
            styleData = {
                left: false,
                top: false,
                right: false,
                bottom: true,

                vertical: false,
                horizon: false
            };
        }
        else if (borderType == 'Left') {
            styleData = {
                left: true,
                top: false,
                right: false,
                bottom: false,

                vertical: false,
                horizon: false
            };
        }
        else if (borderType == 'Center') {
            styleData = {
                left: false,
                top: false,
                right: false,
                bottom: false,

                vertical: true,
                horizon: false
            };
        }
        else if (borderType == 'Right') {
            styleData = {
                left: false,
                top: false,
                right: true,
                bottom: false,
                vertical: false,
                horizon: false
            };
        }
        else if (borderType == 'Default') {
        }

        return styleData;
    },
    updateTableCellsFormat: function (cell, newformat) {
        if (isNaN(cell.getText()) && (newformat.name == "Number" || newformat.name == "Currency" || newformat.name == "Percentage")) {
            //alert("Can't set a string to double !");
        }
        //else if ((cell.getFormat().name == "" && newformat.name == "") || (cell.getFormat().name == "" && newformat.name == "")) {
        //alert("Can't convert the two !");//// 1704BUG  separator  redo undo
        //}
        else {
            if (cell.getFormat() != null && cell.getFormat().name == newformat.name) {
                var orginFormat = cell.getFormat();
                switch (orginFormat.name) {
                    case 'Number':
                        if (newformat.formatOptions.numDecimal != null) {
                            orginFormat.formatOptions.numDecimal = newformat.formatOptions.numDecimal;
                            orginFormat.formatOptions.sciDecimal = null;
                            orginFormat.formatOptions.styleName = null;
                        }
                        if (newformat.formatOptions.separator != null) {
                            orginFormat.formatOptions.separator = newformat.formatOptions.separator;
                            orginFormat.formatOptions.sciDecimal = null;
                            orginFormat.formatOptions.styleName = null;
                        }
                        if (newformat.formatOptions.minusStyle != null) {
                            orginFormat.formatOptions.minusStyle = newformat.formatOptions.minusStyle;
                            orginFormat.formatOptions.sciDecimal = null;
                            orginFormat.formatOptions.styleName = null;
                        }
                        if (newformat.formatOptions.sciDecimal != null) {
                            orginFormat.formatOptions.sciDecimal = newformat.formatOptions.sciDecimal;
                            orginFormat.formatOptions.numDecimal = null;
                            orginFormat.formatOptions.styleName = null;
                        }
                        if (newformat.formatOptions.styleName != null) {
                            orginFormat.formatOptions.styleName = newformat.formatOptions.styleName;
                            orginFormat.formatOptions.sciDecimal = null;
                        }
                        break;
                    case 'Currency':
                        if (newformat.formatOptions.curDecimal != null) {
                            //alert(newformat.formatOptions.curDecimal);
                            orginFormat.formatOptions.curDecimal = newformat.formatOptions.curDecimal;
                        }
                        if (newformat.formatOptions.separator != null) {
                            orginFormat.formatOptions.separator = newformat.formatOptions.separator;
                        }
                        if (newformat.formatOptions.accountstyle != null) {
                            orginFormat.formatOptions.accountstyle = newformat.formatOptions.accountstyle;
                        }
                        if (newformat.formatOptions.minusStyle != null) {
                            orginFormat.formatOptions.minusStyle = newformat.formatOptions.minusStyle;
                        }
                        if (newformat.formatOptions.dollorType != null) {
                            orginFormat.formatOptions.dollorType = newformat.formatOptions.dollorType;
                        }
                        break;
                    case 'Percentage':
                        if (newformat.formatOptions.perDecimal != null) {
                            orginFormat.formatOptions.perDecimal = newformat.formatOptions.perDecimal;
                        }
                        if (newformat.formatOptions.separator != null) {
                            orginFormat.formatOptions.separator = newformat.formatOptions.separator;
                        }
                        if (newformat.formatOptions.minusStyle != null) {
                            orginFormat.formatOptions.minusStyle = newformat.formatOptions.minusStyle;
                        }
                        break;
                    case 'DateTime':
                        if (newformat.formatOptions.dateStyle != null) {
                            orginFormat.formatOptions.dateStyle = newformat.formatOptions.dateStyle;
                        } if (newformat.formatOptions.timeStyle != null) {
                            orginFormat.formatOptions.timeStyle = newformat.formatOptions.timeStyle;
                        }
                        break;
                    case 'Duration':
                        if (newformat.formatOptions.durStyle != null) {
                            orginFormat.formatOptions.durStyle = newformat.formatOptions.durStyle;
                        } if (newformat.formatOptions.durType != null) {
                            orginFormat.formatOptions.durType = newformat.formatOptions.durType;
                        }
                        break;
                }
                cell.setFormat(orginFormat);
            }
            else {
                cell.setFormat(newformat);
            }
        }
    }
};