/**
 * Table class
 *
 * @package com.hoperun.node
 * @import com.hoperun.util.BaseTool,com.hoperun.util.NodeCache,com.hoperun.node.Cell, com.hoperun.model.TableSelectionModel
 * @author xuliyu
 */
com.hoperun.node.Table = function () {
	com.hoperun.node.Table.superClass.constructor.call(this);
	this._domInstance = document.createElement("div");
	this._domInstance.style.position = 'absolute';
	//this._domInstance.setAttribute("style","-moz-box-shadow:4px 4px 0 #F00;-webkit-box-shadow:4px 4px 0 #F00;box-shadow:4px 4px 0 #F00;");
	this._domInstance.setAttribute("objectType", "Table");
	this._domInstance.id = this._id;
	this._domInstance.style.zIndex = 1000;
	this._domInstance.style.backgroundColor = "#FFFFFF";
	this._type = "Table";
	this._selections = []; //Added by Feng for table cell selection
	this._activeSelection = new com.hoperun.model.TableSelection(0, 0, 0, 0);
	this._cells = [];
	this._cellTracker = new com.hoperun.tracker.CellTracker();
	this._cellTracker.appendTo(this);
	this._cellTracker.setActiveTable(this);
	com.hoperun.util.NodeCache.add(this.getId(), this);

	this.bindSelectRange();

	var self = this;
	this._domInstance.addEventListener('contextmenu', function(event) {
		com.hoperun.event.MouseEvent.rightclick(event, self);
	}, true);
	//this.setFontFamily("Aril");

	com.hoperun.util.BaseTool.addForbiddenPropagation(this._domInstance);
	com.hoperun.util.BaseTool.actsAsAspect(this);
};
com.hoperun.util.BaseTool.extend(com.hoperun.node.Table,com.hoperun.node.Node);

com.hoperun.util.BaseTool.augment(com.hoperun.node.Table, {

	_rows: null,

	_cols: null,

	_width: null,

	_height: null,

	_left: null,

	_top: null,

	_cells: null,

	_position: null, // static | absolute | fixed | relative

	_defaultCellHeight: 29,

	_defaultCellWidth: 99,

	_cellTracker: null,

	_selectRowNo: null,

	_selectColNo: null,

	_mouseUpCell: null,

	_mouseDownCell: null,

	_headerRows: null, //表头行数

	_headerCols: null, //表头列数

	_footerRows: null, //表尾行数

	_tableBorder: null, //是否显示表格外边�?

	_alternatingRows: null, //是否隔行变色

	_horizontalLines: null, //是否显示内容区行�?

	_headerColumnLines: null, //是否显示表头列线

	_headerColumnColLines: null, //是否显示表头列列�?

	_headerLines: null, //是否显示表头行线

	_footerLines: null, //是否显示表尾行线

	_verticalLines: null, //是否显示内容区列�?

	_headerRowLines: null, //是否显示表头列线

	_footerRowLines: null, //是否显示表尾列线

	_tableName: null, //表名

	_styleId: null, //样式 1 - 6

	_selections: null,

	_activeSelection: null,

	_border: null,

	_alternatingRowsColor: null,

	_headerRowsColor: null,

	_headerColsColor: null,

	_footerRowsColor: null,

	_fontFamily: null,

	_zIndex: 1000,

	_tableBackGroundColor: null,

	setZIndex: function (zIndex) {
		this._domInstance.style.zIndex = zIndex;
		this._zIndex = zIndex;
	},
	getZIndex: function () {
		return this._zIndex;
	},
	getActiveSelection: function () {
		return this._activeSelection;
	},
	setActiveSelection: function (activeSelection) {
		this._activeSelection = activeSelection;
	},
	addSelection: function (selection,mustPush) {
		//    	if(mustPush == null){
		//            com.hoperun.model.TableSelectionModelHelper.addSelection(this._selections, selection);
		//    	} else {
		com.hoperun.model.TableSelectionModelHelper.addSelection(this._selections, selection,mustPush);
		//    	}
	},
	removeSelection: function (selectionID) {
		com.hoperun.model.TableSelectionModelHelper.removeSelection(this._selections, selectionID);
	},
	addSelectionByDel: function (selection) {
		com.hoperun.model.TableSelectionModelHelper.addSelectionByDel(this._selections, selection);
	},
	setFontFamily: function (fontFamily) {
		this._domInstance.style.fontFamily = fontFamily;
		this._fontFamily = fontFamily;
	},
	getFontFamily: function () {
		return this._fontFamily;
	},
	getStyleId: function () {
		return this._styleId;
	},
	setStyleId: function (styleId) {
		this._styleId = styleId;
		if (this._styleId == "style1") {
			this._headerRowsColor = "#B6B6B6";
			this._headerColsColor = "#D7D7D7";
			this._footerRowsColor = "#B6B6B6";
			this._border = "1px solid #B6B6B6";
			this.setAlternatingRows(false);
			this.setHorizontalLines(true);
			this.setVerticalLines(true);
			this.setFooterLines(false);
			this.setHeaderLines(false);
			this.setHeaderRowLines(false);
			this.setHeaderColumnLines(true);
			this.setFooterRowLines(false);
			this.setHeaderColumnColLines(false);
		} else if (this._styleId == "style2") {
			this._headerRowsColor = "#FFFFFF";
			this._headerColsColor = "#768E9E";
			this._footerRowsColor = "#FFFFFF";
			this._alternatingRowsColor = "#DFDFDF";
			this._border = "1px solid #B6B6B6";
			this.setAlternatingRows(true);
			this.setHeaderColumnLines(false);
			this.setHeaderRowLines(false);
			this.setHorizontalLines(false);
			this.setVerticalLines(false);
			this.setFooterRowLines(false);
			this.setHeaderColumnColLines(false);
			this.setHeaderColumnLines(false);
		} else if (this._styleId == "style3") {
			this._headerRowsColor = "#568130";
			this._headerColsColor = "#6D6D6D";
			this._footerRowsColor = "#568130";
			this._border = "1px solid #DFDFDF";
			this.setAlternatingRows(false);
			this.setFooterRowLines(true);
			this.setHeaderRowLines(true);
			this.setHeaderColumnLines(true);
			this.setHorizontalLines(true);
			this.setVerticalLines(true);
		} else if (this._styleId == "style4") {
			this._headerRowsColor = "#3D7599";
			this._headerColsColor = "#568CB2";
			this._footerRowsColor = "#3D7599";
			this._border = "1px solid black";
			this.setAlternatingRows(false);
			this.setHeaderColumnLines(true);
			this.setHeaderRowLines(true);
			this.setHorizontalLines(false);
			this.setVerticalLines(true);
			this.setFooterRowLines(true);
			this.setHeaderColumnColLines(false);
			this.setHeaderColumnLines(false);
		} else if (this._styleId == "style5") {
			this._headerRowsColor = "#434343";
			this._headerColsColor = "#6E6E6E";
			this._footerRowsColor = "#434343";
			this._border = "1px solid black";
			this.setAlternatingRows(false);
			this.setHorizontalLines(true);
			this.setVerticalLines(true);
			this.setFooterLines(false);
			this.setFooterRowLines(false);
			this.setHeaderRowLines(false);
			this.setHeaderColumnLines(false);
			this.setHeaderColumnColLines(false);
		} else if (this._styleId == "style6") {
			this._headerRowsColor = "#FFFFFF";
			this._headerColsColor = "#FFFFFF";
			this._footerRowsColor = "#FFFFFF";
			this._alternatingRowsColor = "#DFDFDF";
			this._border = "1px solid #B6B6B6";
			this.setAlternatingRows(true);
			this.setFooterRowLines(false);
			this.setHeaderRowLines(false);
			this.setHeaderColumnLines(false);
			this.setHeaderColumnColLines(false);
		} else if (this._styleId == "initStyle1") {
			this._headerRowsColor = null;
			this._headerColsColor = null;
			this._footerRowsColor = null;
			this._border = null;
			this._alternatingRowsColor = null;
			this.setTableBorder(true);
			this.setHeaderRows(1);
			this.setHeaderCols(1);
			this.setFooterRows(0);
			this.setAlternatingRows(false);
			this.setHorizontalLines(true);
			this.setHeaderColumnLines(true);
			this.setHeaderLines(true);
			this.setFooterLines(true);
			this.setHeaderRowLines(false);
			this.setVerticalLines(true);
			this.setHeaderColumnColLines(false);
		} else if (this._styleId == "initStyle2") {
			this._headerRowsColor = null;
			this._headerColsColor = null;
			this._footerRowsColor = null;
			this._border = null;
			this._alternatingRowsColor = null;
			this.setTableBorder(true);
			this.setHeaderRows(1);
			this.setHeaderCols(0);
			this.setFooterRows(0);
			this.setAlternatingRows(false);
			this.setHorizontalLines(true);
			this.setHeaderColumnLines(true);
			this.setHeaderLines(true);
			this.setFooterLines(true);
			this.setHeaderRowLines(false);
			this.setVerticalLines(true);
			this.setFooterRowLines(true);
			this.setHeaderColumnColLines(false);
		} else if (this._styleId == "initStyle3") {
			this._headerRowsColor = null;
			this._headerColsColor = null;
			this._footerRowsColor = null;
			this._border = null;
			this._alternatingRowsColor = null;
			this.setTableBorder(true);
			this.setHeaderRows(0);
			this.setHeaderCols(0);
			this.setFooterRows(0);
			this.setAlternatingRows(false);
			this.setHorizontalLines(true);
			this.setHeaderColumnLines(true);
			this.setHeaderLines(true);
			this.setFooterLines(true);
			this.setHeaderRowLines(false);
			this.setVerticalLines(true);
			this.setFooterRowLines(true);
			this.setHeaderColumnColLines(false);
		} else if (this._styleId == "initStyle4") {
			this._headerRowsColor = null;
			this._headerColsColor = null;
			this._footerRowsColor = null;
			this._border = null;
			this._alternatingRowsColor = null;
			this.setTableBorder(true);
			this.setHeaderRows(1);
			this.setHeaderCols(1);
			this.setFooterRows(1);
			this.setAlternatingRows(false);
			this.setHorizontalLines(true);
			this.setHeaderColumnLines(true);
			this.setHeaderLines(true);
			this.setFooterLines(true);
			this.setHeaderRowLines(false);
			this.setVerticalLines(true);
			this.setFooterRowLines(false);
			this.setHeaderColumnColLines(false);
		} else if (this._styleId == "initStyle5") {
			this._headerRowsColor = "#FFFFFF";
			this._headerColsColor = "#768E9E";
			this._footerRowsColor = null;
			this._border = null;
			this._alternatingRowsColor = "#D7D7D7";
			this.setTableBorder(true);
			this.setHeaderRows(1);
			this.setHeaderCols(1);
			this.setFooterRows(0);
			this.setAlternatingRows(true);
			this.setHorizontalLines(false);
			this.setHeaderColumnLines(false);
			this.setHeaderLines(true);
			this.setFooterLines(true);
			this.setHeaderRowLines(false);
			this.setVerticalLines(false);
			this.setHeaderColumnColLines(false);
		} else if (this._styleId == "initStyle6") {
			this._headerRowsColor = "#FFFFFF";
			this._headerColsColor = null;
			this._footerRowsColor = null;
			this._border = null;
			this._alternatingRowsColor = "#D7D7D7";
			this.setTableBorder(true);
			this.setHeaderRows(1);
			this.setHeaderCols(0);
			this.setFooterRows(0);
			this.setAlternatingRows(true);
			this.setHorizontalLines(false);
			this.setHeaderColumnLines(false);
			this.setHeaderLines(true);
			this.setFooterLines(true);
			this.setHeaderRowLines(false);
			this.setVerticalLines(false);
			this.setHeaderColumnColLines(false);
		} else if (this._styleId == "initStyle7") {
			this._headerRowsColor = "#FFFFFF";
			this._headerColsColor = null;
			this._footerRowsColor = null;
			this._border = null;
			this._alternatingRowsColor = "#D7D7D7";
			this.setTableBorder(true);
			this.setHeaderRows(0);
			this.setHeaderCols(0);
			this.setFooterRows(0);
			this.setAlternatingRows(true);
			this.setHorizontalLines(false);
			this.setHeaderColumnLines(false);
			this.setHeaderLines(true);
			this.setFooterLines(true);
			this.setHeaderRowLines(false);
			this.setVerticalLines(false);
			this.setHeaderColumnColLines(false);
		} else if (this._styleId == "initStyle8") {
			this._headerRowsColor = "#FFFFFF";
			this._headerColsColor = "#768E9E";
			this._footerRowsColor = "#FFFFFF";
			this._border = null;
			this._alternatingRowsColor = "#D7D7D7";
			this.setTableBorder(true);
			this.setHeaderRows(1);
			this.setHeaderCols(1);
			this.setFooterRows(1);
			this.setAlternatingRows(true);
			this.setHorizontalLines(false);
			this.setHeaderColumnLines(false);
			this.setHeaderLines(true);
			this.setFooterLines(true);
			this.setHeaderRowLines(false);
			this.setVerticalLines(false);
			this.setFooterRowLines(false);
			this.setHeaderColumnColLines(false);
		} else if (this._styleId == "initStyle9") {
			this._headerRowsColor = "#FFFFFF";
			this._headerColsColor = "#FFFFFF";
			this._footerRowsColor = "#FFFFFF";
			this._border = "1px solid #B6B6B6";
			this._alternatingRowsColor = "#DFDFDF";
			this.setTableBorder(true);
			this.setHeaderRows(1);
			this.setHeaderCols(1);
			this.setFooterRows(1);
			this.setAlternatingRows(true);
			this.setHorizontalLines(true);
			this.setHeaderColumnLines(false);
			this.setHeaderLines(true);
			this.setFooterLines(true);
			this.setHeaderRowLines(false);
			this.setVerticalLines(true);
			this.setHeaderColumnColLines(false);
			this.setFooterRowLines(false);
		} else if (this._styleId == "initStyle10") {
			this._headerRowsColor = "#434343";
			this._headerColsColor = "#6E6E6E";
			this._footerRowsColor = "#434343";
			this._border = "1px solid black";
			this.setAlternatingRows(false);
			this.setHorizontalLines(true);
			this.setVerticalLines(true);
			this.setFooterLines(false);
			this.setFooterRowLines(false);
			this.setHeaderRowLines(false);
			this.setHeaderColumnLines(false);
			this.setHeaderColumnColLines(false);
			this._alternatingRowsColor = null;
			this.setTableBorder(true);
			this.setHeaderRows(1);
			this.setHeaderCols(1);
			this.setFooterRows(1);
			this.setHeaderLines(true);
		} else if (this._styleId == "initStyle11") {
			this._headerRowsColor = "#568130";
			this._headerColsColor = "#6D6D6D";
			this._footerRowsColor = "#568130";
			this._border = "1px solid #DFDFDF";
			this.setAlternatingRows(false);
			this.setFooterRowLines(true);
			this.setHeaderRowLines(true);
			this.setHeaderColumnLines(true);
			this.setHorizontalLines(true);
			this.setVerticalLines(true);
			this._alternatingRowsColor = null;
			this.setTableBorder(true);
			this.setHeaderRows(1);
			this.setHeaderCols(1);
			this.setFooterRows(1);
			this.setHeaderLines(true);
			this.setFooterLines(true);
			this.setHeaderColumnColLines(false);
		} else if (this._styleId == "initStyle12") {
			this._headerRowsColor = "#3D7599";
			this._headerColsColor = "#568CB2";
			this._footerRowsColor = "#3D7599";
			this._border = "1px solid black";
			this.setAlternatingRows(false);
			this.setHeaderRowLines(true);
			this.setHorizontalLines(false);
			this.setVerticalLines(true);
			this.setFooterRowLines(true);
			this.setHeaderColumnColLines(false);
			this.setHeaderColumnLines(false);
			this._alternatingRowsColor = null;
			this.setTableBorder(true);
			this.setHeaderRows(1);
			this.setHeaderCols(1);
			this.setFooterRows(1);
			this.setHeaderLines(true);
			this.setFooterLines(true);
		}
		this.render();
	},
	bindSelectRange: function () {
		var self = this;
		$(this._domInstance).bind('mousedown', function (e) {
			// 右键返回
			var clickButton = e.button;
			if (clickButton == 2) {//所有浏览器鼠标右键值都�?(mousedown,mouseup),
				return true;
			}
			var targetObj = com.hoperun.util.BaseTool.findEventTarget(e);
			var nodeObj = self.getCellById(targetObj.id);
			if (nodeObj != null && nodeObj.getType() == 'Cell') {
				self.setMouseDownCell(e);
				$(this).mousemove( function (e) {
					if (window.getSelection())
						window.getSelection().removeAllRanges();

					var c1 = self.getMouseDownCell();
					var c2 = self.getMouseCell(e);
					if (c1 != null && c2 != null) {
						self.getCellTracker().refreshRange(c1, c2);
					}
					if (e.stopPropagation)
						return e.stopPropagation();
					else
						return e.cancelBubble = true;
				}).mouseup( function (e) {
					self.setMouseUpCell(e);
					var c1 = self.getMouseDownCell();
					var c2 = self.getMouseUpCell();
					if (c1 != null && c2 != null) {
						self.getCellTracker().refreshRange(c1, c2);
					}
					self._mouseDownCell = null;
					self._mouseUpCell = null;
					$(this).unbind('mousemove');
					$(this).unbind('mouseup');
				});
			}
		});
	},
	refreshFocus: function () {
		var tableFocusMsg = new com.hoperun.util.Observer.Message();
		tableFocusMsg.id = com.hoperun.util.Observer.MessageType.TABLE_FOCUS;
		tableFocusMsg.sender = this;
		tableFocusMsg.data = {};
		com.hoperun.util.Observer.sendMessage(tableFocusMsg);
	},
	addRow: function (rowNo) {
		var lastRow = this.getCellsByRowNo(rowNo - 1);
		this._rows = this._rows + 1;
		var cells = this.getCellsGreaterOrEqualRowNo(rowNo);
		//change the top of the following cells.
		for (var i = 0; i < cells.length; i++) {
			var cell = cells[i];
			cell.setTop(cell.getTop() + this._defaultCellHeight);
			cell.setRow(cell.getRow() + 1);
		}
		for (var i = 1; i <= this._cols; i++) {
			var cell = lastRow[i - 1];
			//if(rowNo == this._rows){
			//$(cell.getDomInstance()).css('border-bottom', "");
			//}
			var top = cell.getTop() + cell.getHeight();
			var left = cell.getLeft();
			var background = cell.getBackgroundColor();
			if(!background)
				background = '#FFFFFF';
			this.createCell(rowNo, i, top, left, cell.getWidth(), this._defaultCellHeight,background);
		}
		this.setHeight(this.getHeight() + this._defaultCellHeight);
		this.refreshFocus();
		if (this._selectColNo != null)
			this._cellTracker.refresh(this.getCellsByColNo(this._selectColNo), com.hoperun.tracker.CellTracker.FlagType.Vertical);
		this.refreshCellIndex();
		if (this._headerRows != null && this._headerRows > 0 && rowNo <= this._headerRows + 1)
			this.setHeaderRows(this._headerRows + 1);
		if (this._footerRows != null && this._footerRows > 0 && rowNo > (this._rows - this._footerRows))
			this.setFooterRows(this._footerRows + 1);

		com.hoperun.model.TableSelectionModelHelper.extendRow(this._selections, rowNo);
		this.render();
		this.refreshCellExpression('ADDROW', rowNo); //1704
	},
	addRowForUndo: function (cells ,rowIndex ,hdRows ,ftRows) {
		var offset = cells[0].getHeight();

		//change the top of the following cells.
		for (var i = this._cells.length - 1; i >= 0; i--) {
			var cell = this._cells[i];
			if (cell.getRow() >= rowIndex) {
				cell.setRow(cell.getRow() + 1);
				cell.setTop(cell.getTop() + offset);
			}
		}

		//add cell into tables
		var rowNum = this._rows, colNum = this._cols;
		var pos = [];
		for(var i=0; i < colNum; i++) {
			pos.push(i+1);
		}
		for(var i = cells.length - 1; i >= 0; i--) {
			this._cells.insert(pos[i], cells[i]);
			cells[i].appendTo(this);
		}
		this._rows = this._rows + 1;
		this.setHeaderRows(hdRows);
		this.setFooterRows(ftRows);

		// update
		this.setHeight(this.getHeight() + offset);
		this.refreshFocus();
		//   this._cellTracker.refresh(this.getCellsByRowNo(rowIndex), com.hoperun.tracker.CellTracker.FlagType.Horizontal);
		this.refreshCellIndex();

		//        if (this._headerRows != null && this._headerRows > 0 && rowIndex <= this._headerRows + 1)
		//            this.setHeaderRows(this._headerRows + 1);
		//        if (this._footerRows != null && this._footerRows > 0 && rowIndex > (this._rows - this._footerRows))
		//            this.setFooterRows(this._footerRows + 1);

		com.hoperun.model.TableSelectionModelHelper.extendRow(this._selections, rowIndex);
		this.render();
		this.refreshCellExpression('ADDROW', rowIndex); //1704
	},
	hideCellTracker: function () {
		if (this._cellTracker) {
			this._cellTracker.hide();
		}
	},
	insertRow: function (rowNo) {
		this.addRow(rowNo + 1);
	},
	insertRowForUndo: function (cells, rowNo ,hdRows ,ftRows) {
		this.addRowForUndo(cells, rowNo ,hdRows ,ftRows);
	},
	deleteRow: function (rowNo) {
		var delCells = [];
		if (this._rows == 1) {
			this.addRow(2);
		}
		var belowCells = this.getCellsGreaterOrEqualRowNo(rowNo + 1);
		var selectCells = this.getCellsByRowNo(rowNo);
		var offset = selectCells[0].getHeight();
		for (var i = 0; i < belowCells.length; i++) {
			var cell = belowCells[i];
			cell.setTop(cell.getTop() - offset);
		}
		for (var i = this._cells.length - 1; i >= 0; i--) {
			var cell = this._cells[i];
			if (cell.getRow() == rowNo) {
				delCells.insert(0, cell);
				$(cell.getDomInstance()).remove();
				this._cells.removeAt(i);
			}
		}
		for (var i = 0; i < belowCells.length; i++) {
			var cell = belowCells[i];
			cell.setRow(cell.getRow() - 1);
		}
		this._rows = this._rows - 1;
		if (this._selectRowNo != null) {
			this._selectRowNo = this._selectRowNo > this._rows ? this._rows : this._selectRowNo;
			this._cellTracker.refresh(this.getCellsByRowNo(this._selectRowNo), com.hoperun.tracker.CellTracker.FlagType.Horizontal);
		}

		this.setHeight(this.getHeight() - offset);
		this.refreshFocus();
		this.refreshCellIndex();
		if (this._headerRows != null && this._headerRows > 0 && rowNo <= this._headerRows)
			this.setHeaderRows(this._headerRows - 1);
		if (this._footerRows != null && this._footerRows > 0 && rowNo > (this._rows - this._footerRows + 1))
			this.setFooterRows(this._footerRows - 1);

		com.hoperun.model.TableSelectionModelHelper.removeRow(this._selections, rowNo);
		this.render();
		this.refreshCellExpression('DELETEROW', rowNo); //1704
		return delCells;
	},
	copyRow: function () {
	},
	changeRowHeight: function (rowNo, height) {
		var offset = 0;
		var cells = this.getCellsByRowNo(rowNo);
		for (var i = 0; i < cells.length; i++) {
			var cell = cells[i];
			offset = height - cell.getHeight();
			cell.setHeight(height);
		}
		cells = this.getCellsGreaterOrEqualRowNo(rowNo + 1);
		for (var i = 0; i < cells.length; i++) {
			var cell = cells[i];
			cell.setTop(cell.getTop() + offset);
		}
		this._cellTracker.refresh(this.getCellsByRowNo(this._selectRowNo), com.hoperun.tracker.CellTracker.FlagType.Horizontal);
		this.setHeight(this.getHeight() + offset);
		this.refreshFocus();
	},
	rowSelect: function (e) {
		var eTop = e.layerY == null ? e.offsetY : e.layerY;
		var cells = this.getCellsByColNo(1);
		for (var i = 0; i < cells.length; i++) {
			var cell = cells[i];
			var top = cell.getTop();
			var height = cell.getHeight();
			if (eTop > top && eTop <= top + height) {
				this.setSelectRowNo(cell.getRow());
				break;
			}
		}
		this._cellTracker.setFlag(com.hoperun.tracker.CellTracker.FlagType.Horizontal);
		this._cellTracker.refresh(this.getCellsByRowNo(this._selectRowNo), com.hoperun.tracker.CellTracker.FlagType.Horizontal);
	},
	setSelectRowNo: function (rowNo) {
		this._selectRowNo = rowNo;
		this._selectColNo = null;
	},
	setSelectColNo: function (colNo) {
		this._selectColNo = colNo;
		this._selectRowNo = null;
	},
	addCol: function (colNo) {
		//alert(colNo);
		var lastCol = this.getCellsByColNo(colNo - 1);
		this._cols = this._cols + 1;
		var cells = this.getCellsGreaterOrEqualColNo(colNo);
		//change the top of the following cells.
		for (var i = 0; i < cells.length; i++) {
			var cell = cells[i];
			cell.setLeft(cell.getLeft() + this._defaultCellWidth);
			cell.setCol(cell.getCol() + 1);
		}
		for (var i = 1; i <= this._rows; i++) {
			var cell = lastCol[i - 1];
			//if(colNo == this._cols){
			//$(cell.getDomInstance()).css('border-right', "");
			//}
			var top = cell.getTop();
			var left = cell.getLeft() + cell.getWidth();
			var background = cell.getBackgroundColor();
			if(!background)
				background = '#FFFFFF';
			this.createCell(i, colNo, top, left, this._defaultCellWidth, cell.getHeight(),background);
		}

		if (this._selectRowNo != null)
			this._cellTracker.refresh(this.getCellsByRowNo(this._selectRowNo), com.hoperun.tracker.CellTracker.FlagType.Horizontal);
		this.setWidth(this.getWidth() + this._defaultCellWidth);
		this.refreshFocus();
		this.refreshCellIndex();
		if (this._headerCols != null && this._headerCols > 0 && colNo <= this._headerCols + 1)
			this.setHeaderCols(this._headerCols + 1);

		com.hoperun.model.TableSelectionModelHelper.extendCol(this._selections, colNo);
		this.render();
		this.refreshCellExpression('ADDCOL', colNo); //1704
	},
	addColForUndo: function (cells, colIndex, headerCols) {

		//colIndex, add one col into after this colIndex
		var offset = cells[0].getWidth();
		for (var i = this._cells.length - 1; i >= 0; i--) {
			var cell = this._cells[i];
			if (cell.getCol() >= colIndex) {
				cell.setCol(cell.getCol() + 1);
				cell.setLeft(cell.getLeft() + offset);
			}
		}

		//add cell into tables
		var rowNum = this._rows, colNum = this._cols;
		var pos = [];
		for(var i=0; i<rowNum;i++) {
			pos.push(colIndex + i * (colNum + 1));
		}
		for(var i = cells.length-1; i>=0; i--) {
			this._cells.insert(pos[i], cells[i]);
			cells[i].appendTo(this);
		}

		this._cols = this._cols + 1;
		this.setHeaderCols(headerCols);

		//update
		//this._cellTracker.refresh(this.getCellsByColNo(colIndex), com.hoperun.tracker.CellTracker.FlagType.Vertical);
		this.setWidth(this.getWidth() + offset);
		this.refreshFocus();
		this.refreshCellIndex();

		com.hoperun.model.TableSelectionModelHelper.extendCol(this._selections, colIndex);
		this.render();
		this.refreshCellExpression('ADDCOL', colIndex); //1704
	},
	insertCol: function (colNo) {
		this.addCol(colNo + 1);
	},
	insertColForUndo: function (cells, colNo ,headerCols) {
		this.addColForUndo(cells, colNo ,headerCols);
	},
	deleteCol: function (colNo) {
		var delCells = [];
		if (this._cols == 1) {
			this.addCol(2);
		}
		var afterCells = this.getCellsGreaterOrEqualColNo(colNo + 1);
		var selectCells = this.getCellsByColNo(colNo);
		var offset = selectCells[0].getWidth();
		for (var i = 0; i < afterCells.length; i++) {
			var cell = afterCells[i];
			cell.setLeft(cell.getLeft() - offset);
		}
		for (var i = this._cells.length - 1; i >= 0; i--) {
			var cell = this._cells[i];
			if (cell.getCol() == colNo) {
				delCells.insert(0, cell);
				$(cell.getDomInstance()).remove();
				this._cells.removeAt(i);
			}
		}
		for (var i = 0; i < afterCells.length; i++) {
			var cell = afterCells[i];
			cell.setCol(cell.getCol() - 1);
		}
		this._cols = this._cols - 1;
		this._selectColNo = this._selectColNo > this._cols ? this._cols : this._selectColNo;
		this._cellTracker.refresh(this.getCellsByColNo(this._selectColNo), com.hoperun.tracker.CellTracker.FlagType.Vertical);
		this.setWidth(this.getWidth() - offset);
		this.refreshFocus();
		this.refreshCellIndex();
		if (this._headerCols != null && this._headerCols > 0 && colNo <= this._headerCols)
			this.setHeaderCols(this._headerCols - 1);

		com.hoperun.model.TableSelectionModelHelper.removeCol(this._selections, colNo);
		this.render();
		this.refreshCellExpression('DELETECOL', colNo); //1704

		return delCells;
	},
	copyCol: function () {

	},
	changeColWidth: function (colNo, width) {
		var offset = 0;
		var cells = this.getCellsByColNo(colNo);
		for (var i = 0; i < cells.length; i++) {
			var cell = cells[i];
			offset = width - cell.getWidth();
			cell.setWidth(width);
		}
		cells = this.getCellsGreaterOrEqualColNo(colNo + 1);
		for (var i = 0; i < cells.length; i++) {
			var cell = cells[i];
			cell.setLeft(cell.getLeft() + offset);
		}
		if (this._selectColNo != null)
			this._cellTracker.refresh(this.getCellsByColNo(this._selectColNo), com.hoperun.tracker.CellTracker.FlagType.Vertical);
		this.setWidth(this.getWidth() + offset);
		this.refreshFocus();
	},
	colSelect: function (e) {
		var eLeft = e.layerX == null ? e.offsetX : e.layerX;
		var cells = this.getCellsByRowNo(1);
		for (var i = 0; i < cells.length; i++) {
			var cell = cells[i];
			var left = cell.getLeft();
			var width = cell.getWidth();
			if (eLeft > left && eLeft <= left + width) {
				this.setSelectColNo(cell.getCol());
				break;
			}
		}
		this._cellTracker.setFlag(com.hoperun.tracker.CellTracker.FlagType.Vertical);
		this._cellTracker.refresh(this.getCellsByColNo(this._selectColNo), com.hoperun.tracker.CellTracker.FlagType.Vertical);
	},
	setMouseDownCell: function (e) {
		this._mouseDownCell = this.getMouseCell(e);
	},
	getMouseDownCell: function () {
		return this._mouseDownCell;
	},
	setMouseUpCell: function (e) {
		this._mouseUpCell = this.getMouseCell(e);
	},
	getMouseUpCell: function () {
		return this._mouseUpCell;
	},
	setHeaderRows: function (headerRows) {
		this._headerRows = headerRows;
	},
	getHeaderRows: function () {
		return this._headerRows;
	},
	setHeaderCols: function (headerCols) {
		this._headerCols = headerCols;
	},
	getHeaderCols: function () {
		return this._headerCols;
	},
	setFooterRows: function (footerRows) {
		this._footerRows = footerRows;
	},
	getFooterRows: function () {
		return this._footerRows;
	},
	setTableBorder: function (tableBorder) {
		this._tableBorder = tableBorder;
	},
	getTableBorder: function () {
		return this._tableBorder;
	},
	setAlternatingRows: function (alternatingRows) {
		this._alternatingRows = alternatingRows;
	},
	getAlternatingRows: function () {
		return this._alternatingRows;
	},
	setHorizontalLines: function (horizontalLines) {
		this._horizontalLines = horizontalLines;
	},
	getHorizontalLines: function () {
		return this._horizontalLines;
	},
	setHeaderColumnLines: function (headerColumnLines) {
		this._headerColumnLines = headerColumnLines;
	},
	getHeaderColumnLines: function () {
		return this._headerColumnLines;
	},
	setHeaderColumnColLines: function (headerColumnColLines) {
		this._headerColumnColLines = headerColumnColLines;
	},
	getHeaderColumnColLines: function () {
		return this._headerColumnColLines;
	},
	setHeaderLines: function (headerLines) {
		this._headerLines = headerLines;
	},
	getHeaderLines: function () {
		return this._headerLines;
	},
	setFooterLines: function (footerLines) {
		this._footerLines = footerLines;
	},
	getFooterLines: function () {
		return this._footerLines;
	},
	setVerticalLines: function (verticalLines) {
		this._verticalLines = verticalLines;
	},
	getVerticalLines: function () {
		return this._verticalLines;
	},
	setHeaderRowLines: function (headerRowLines) {
		this._headerRowLines = headerRowLines;
	},
	getHeaderRowLines: function () {
		return this._headerRowLines;
	},
	setFooterRowLines: function (footerRowLines) {
		this._footerRowLines = footerRowLines;
	},
	getFooterRowLines: function () {
		return this._footerRowLines;
	},
	setTableName: function (tableName) {
		this._tableName = tableName;
	},
	getTableName: function () {
		return this._tableName;
	},
	getMouseCell: function (e) {
		var xOffset = e.pageX - $(this.getDomInstance()).offset().left;
		var yOffset = e.pageY - $(this.getDomInstance()).offset().top;
		var cells = this.getCellsByColNo(1);
		var rowNo = null, colNo = null;
		for (var i = 0; i < cells.length; i++) {
			var cell = cells[i];
			var top = cell.getTop();
			var height = cell.getHeight();
			if (yOffset > top && yOffset <= top + height) {
				rowNo = cell.getRow();
				break;
			}
		}
		var cells = this.getCellsByRowNo(1);
		for (var i = 0; i < cells.length; i++) {
			var cell = cells[i];
			var left = cell.getLeft();
			var width = cell.getWidth();
			if (xOffset > left && xOffset <= left + width) {
				colNo = cell.getCol();
				break;
			}
		}
		return this.getCell(rowNo, colNo);
	},
	refreshCellIndex: function () {
		var cells = [];
		for (var i = 1; i <= this._rows; i++) {
			for (var j = 1; j <= this._cols; j++) {
				for (var k = 0; k < this._cells.length; k++) {
					var cell = this._cells[k];
					if (cell.getRow() == i && cell.getCol() == j) {
						cells[cells.length] = cell;
						break;
					}
				}
			}
		}
		this._cells = cells;
	},
	getCells: function () {
		return this._cells;
	},
	getCellById: function (id) {
		for( var i = 0 ; i < this._cells.length; i++) {
			if (this._cells[i].getId() == id ) {
				return this._cells[i];
			}
		}
		return null;
	},
	getCellsByRowNo: function (rowNo) {
		var cells = [];
		for (var i = 0; i < this._cells.length; i++) {
			var c = this._cells[i];
			if (c.getRow() == rowNo)
				cells[cells.length] = c;
		}
		return cells;
	},
	getCellsByColNo: function (colNo) {
		var cells = [];
		for (var i = 0; i < this._cells.length; i++) {
			var c = this._cells[i];
			if (c.getCol() == colNo)
				cells[cells.length] = c;
		}

		return cells;
	},
	getCellsGreaterOrEqualRowNo: function (rowNo) {
		var cells = [];
		for (var i = 0; i < this._cells.length; i++) {
			if (this._cells[i].getRow() >= rowNo) {
				cells.push(this._cells[i]);
			}
		}
		return cells;
	},
	getCellsByRowAndColNo: function (rowNo, cellNo) {
		return (rowNo <= this.getRows() && cellNo <= this.getCols()) ? this._cells[(rowNo - 1) * this.getCols() + cellNo - 1] : null;
	},
	getCellsGreaterOrEqualColNo: function (colNo) {
		var cells = [];
		for (var i = 0; i < this._cells.length; i++) {
			if (this._cells[i].getCol() >= colNo) {
				cells.push(this._cells[i]);
			}
		}
		return cells;
	},
	getCellTracker: function () {
		return this._cellTracker;
	},
	getCell: function (rowNo, colNo) {
		var cell = null;
		for (var i = 0; i < this._cells.length; i++) {
			if (this._cells[i].getRow() == rowNo
			&& this._cells[i].getCol() == colNo) {
				cell = this._cells[i];
				break;
			}
		}
		return cell;
	},
	createCell: function (r, c, top, left, width, height,background) {
		var cell = new com.hoperun.node.Cell();
		cell.setWidth(width);
		cell.setHeight(height);
		cell.setLeft(left);
		cell.setTop(top);
		cell.setRow(r);
		cell.setCol(c);
		cell.setBackgroundColor(background);
		cell.appendTo(this);
		return cell;
	},
	getPosition: function () {
		return this._position;
	},
	setPosition: function (position) {
		this._domInstance.style.position = position;
		this._position = position;
	},
	setLeft: function (left) {
		this._domInstance.style.left = left;
		this._left = left;
	},
	getLeft: function () {
		return this._left;
	},
	setTop: function (top) {
		this._domInstance.style.top = top;
		this._top = top;
	},
	getTop: function () {
		return this._top;
	},
	build: function () {
		var w = 0;
		var h = 0;
		var top = 0, left = 0, cell;
		for (var r = 1; r <= this._rows; r++) {
			left = 0;
			for (var c = 1; c <= this._cols; c++) {
				cell = this.createCell(r, c, top, left, this._defaultCellWidth, this._defaultCellHeight);
				if (r == 1)
					w += cell.getWidth();
				if (c == 1)
					h += cell.getHeight();
				left += this._defaultCellWidth;
			}
			top += this._defaultCellHeight;
		}
		this.setWidth(w);
		this.setHeight(h);
	},
	setRows: function (rows) {
		this._rows = rows;
	},
	getRows: function () {
		return this._rows;
	},
	setCols: function (cols) {
		this._cols = cols;
	},
	getCols: function () {
		return this._cols;
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
	refreshCellExpression: function (type, RowOrColNO) {
		for (var c = 0; c < this._cells.length; c++) {
			var cell = this._cells[c];
			var expression = cell.getFunctions();
			if (expression != null) {
				try {
					var cellRegExp = new RegExp("[a-zA-Z]{1,20}[0-9]{1,20}", "g"); // new RegExp("[A-Z]\w{0,20}\d{0,20}[0-9]", "g"); //
					var cells = expression.match(cellRegExp);
					for (var i = 0; i < cells.length; i++) {
						var index = cells[i].search("[0-9]");
						var col = com.hoperun.util.BaseTool.CellIndex_StrToNum(cells[i].substring(0, index));
						var row = parseInt(cells[i].substring(index, cells[i].length));
						switch (type) {
							case 'ADDROW':
								//[3-                            //+1
								if (row >= RowOrColNO) {
									expression = expression.replace(cells[i], com.hoperun.util.BaseTool.CellIndex_NumToStr(col, "") + (row + 1).toString());
								}
								break;
							case 'DELETEROW':
								//[3-                            //-1
								if (row > RowOrColNO) {
									expression = expression.replace(cells[i], com.hoperun.util.BaseTool.CellIndex_NumToStr(col, "") + (row - 1).toString());
								}
								if (row == RowOrColNO) {
									expression = expression.replace(cells[i], '#NullRef(' + cells[i] + ')');
								}
								break;
							case 'ADDCOL':
								//-3]                            //+1
								if (col >= RowOrColNO) {
									expression = expression.replace(cells[i], com.hoperun.util.BaseTool.CellIndex_NumToStr((col + 1), "") + row);
								}
								break;
							case 'DELETECOL':
								//-3]                            //-1
								if (col == RowOrColNO) {
									expression = expression.replace(cells[i], '#NullRef(' + cells[i] + ')');
								}
								if (col > RowOrColNO) {
									expression = expression.replace(cells[i], com.hoperun.util.BaseTool.CellIndex_NumToStr((col - 1), "") + row);
								}
								break;
						}
					}
					cell.setFunctions(expression);
				} catch (ex) {
				}
			}
		}
	},
	refreshCellValue: function () {
		for (var c = 0; c < this._cells.length; c++) {
			var cell = this._cells[c];
			if (cell.getFunctions() != null) {
				try {
					var cellValue = com.hoperun.util.AlgorithmsParseTools.doCalculate(cell.getExpression().toUpperCase());
					if (!isNaN(cellValue)) {
						cell.setText(cellValue.toString());
					} else {
						cell.setText("");
					}
				} catch (ex) {
					cell.setText("- !! -");
				}
			}
		}
		//this.setStyle();
	},
	render: function (paramCell,activeSelection) {
		if (this._backgroundColor == null)
			this._backgroundColor = '#FFFFFF';
		if (this._headerRowsColor == null)
			this._headerRowsColor = "#B6B6B6";
		if (this._headerColsColor == null)
			this._headerColsColor = "#D7D7D7";
		if (this._footerRowsColor == null)
			this._footerRowsColor = "#B6B6B6";
		if (this._alternatingRowsColor == null)
			this._alternatingRowsColor = "#DFDFDF";
		if (this._border == null)
			this._border = "1px solid black";
		var k = 0;
		for (var r = 0; r < this._rows; r++) {
			for (var c = 0; c < this._cols; c++) {
				this._cells[k].setBorderTop("");
				this._cells[k].setBorderBottom("");
				this._cells[k].setBorderLeft("");
				this._cells[k].setBorderRight("");

				if(this._cells[k].getBackgroundColor())
					this._cells[k].setBackgroundColor(this._cells[k].getBackgroundColor());
				else
					this._cells[k].setBackgroundColor(this._backgroundColor);
				
				this._cells[k].getDomInstance().style.zIndex = k;
				if (this._tableBorder) {//是否显示外边�?
					if (r == 0)
						this._cells[k].setBorderTop(this._border);
					if (r == this._rows - 1)
						this._cells[k].setBorderBottom(this._border);
					if (c == 0)
						this._cells[k].setBorderLeft(this._border);
					if (c == this._cols - 1)
						this._cells[k].setBorderRight(this._border);
				}
				if (this._horizontalLines) {//是否显示内容区行�?
					var start = 0, end = this._rows - 1, col = 0;
					if (this._headerCols != null && this._headerCols >= 0)
						col = this._headerCols - 1;
					if (this._headerRows != null && this._headerRows > 0)
						start = this._headerRows - 1;
					if (this._footerRows != null && this._footerRows > 0)
						end = this._rows - this._footerRows - 1;
					if (r > start && r <= end && c > col)
						this._cells[k].setBorderTop(this._border);
				}
				if (this._headerColumnLines) {//是否显示表头列线
					if (this._headerCols != null && this._headerCols > 0) {
						if (c <= this._headerCols - 1) {
							var start = 0, end = this._rows - 1;
							if (this._headerRows != null && this._headerRows > 0)
								start = this._headerRows - 1;
							if (this._footerRows != null && this._footerRows > 0)
								end = this._rows - this._footerRows - 1;
							if (r > start && r <= end) {
								this._cells[k].setBorderTop(this._border);
							}
						}
					}
				}
				if (this._headerColumnColLines) {//是否显示表头列列�?
					if (this._headerCols != null && this._headerCols > 0) {
						if (c <= this._headerCols - 1) {
							var start = 0, end = this._rows - 1;
							if (this._headerRows != null && this._headerRows > 0)
								start = this._headerRows - 1;
							if (this._footerRows != null && this._footerRows > 0)
								end = this._rows - this._footerRows - 1;
							if (r > start && r <= end) {
								this._cells[k].setBorderLeft(this._border);
							}
						}
					}
				}
				if (this._headerLines) {//是否显示表头行线
					if (this._headerRows != null && this._headerRows > 0) {
						if (r <= this._headerRows - 1)
							this._cells[k].setBorderTop(this._border);
					}
				}
				if (this._footerLines) {//是否显示表尾行线
					if (r >= (this._rows - this._footerRows))
						this._cells[k].setBorderTop(this._border);
				}
				if (this._verticalLines) {//是否显示内容区列�?
					var start = 0, end = this._rows - 1, col = 0;
					if (this._headerCols != null && this._headerCols > 0)
						col = this._headerCols - 1;
					if (this._headerRows != null && this._headerRows > 0)
						start = this._headerRows;
					if (this._footerRows != null && this._footerRows > 0)
						end = this._rows - this._footerRows - 1;
					if (r >= start && r <= end && c > col) {
						this._cells[k].setBorderLeft(this._border);
					}
				}
				if (this._headerRowLines) {//是否显示表头列线
					if (this._headerRows != null && this._headerRows > 0) {
						if (r <= this._headerRows - 1)
							this._cells[k].setBorderLeft(this._border);
					}
				}
				if (this._footerRowLines) {//是否显示表尾列线
					if (r >= (this._rows - this._footerRows))
						this._cells[k].setBorderLeft(this._border);
				}
				if (this._alternatingRows) {//是否隔行变色
					if (r % 2 == 0)
						this._cells[k].setBackgroundColor(this._alternatingRowsColor);
				}
				if (this._headerRows != null && this._headerRows > 0) {//表头行数
					if (r <= this._headerRows - 1)
						this._cells[k].setBackgroundColor(this._headerRowsColor);
					else if (r == this._headerRows)
						this._cells[k].setBorderTop(this._border);
				}
				if (this._headerCols != null && this._headerCols > 0) {//表头列数
					if (c <= this._headerCols - 1) {
						if (r >= this._headerRows)
							this._cells[k].setBackgroundColor(this._headerColsColor);
					} else if (c == this._headerCols) {
						var start = 0, end = this._rows - 1;
						if (this._headerRows != null && this._headerRows > 0)
							start = this._headerRows - 1;
						if (this._footerRows != null && this._footerRows > 0)
							end = this._rows - this._footerRows - 1;
						if (r > start && r <= end)
							this._cells[k].setBorderLeft(this._border);
					}
				}
				if (this._footerRows != null && this._footerRows > 0) {//表尾列数
					if (r >= (this._rows - this._footerRows))
						this._cells[k].setBackgroundColor(this._footerRowsColor);
					if (r == (this._rows - this._footerRows))
						this._cells[k].setBorderTop(this._border);
				}
				k++;
			}
		}

		if(paramCell)
			this.applyCellStyle(this, activeSelection ,paramCell);
	},
	setCellStyle: function () {// temp function
		//com.hoperun.model.TableSelectionModelHelper.updateTableCellsStyle(this, this._selections);
		if (this._headerRowsColor == null)
			this._headerRowsColor = "#B6B6B6";
		if (this._headerColsColor == null)
			this._headerColsColor = "#D7D7D7";
		if (this._footerRowsColor == null)
			this._footerRowsColor = "#B6B6B6";
		if (this._alternatingRowsColor == null)
			this._alternatingRowsColor = "#DFDFDF";
		if (this._border == null)
			this._border = "1px solid black";
		var k = 0;
		for (var r = 0; r < this._rows; r++) {
			for (var c = 0; c < this._cols; c++) {
				this._cells[k].setBorderTop("");
				this._cells[k].setBorderBottom("");
				this._cells[k].setBorderLeft("");
				this._cells[k].setBorderRight("");
				//				this._cells[k].setBackgroundColor("");
				if(this._cells[k].getBackgroundColor()=="default"||this._cells[k].getBackgroundColor()==null) {
					this._cells[k].setBackgroundColor("");
				}

				//if(!this._cells[k].getBackgroundColor()) this._cells[k].setBackgroundColor(this._tableBackGroundColor);
				this._cells[k].getDomInstance().style.zIndex = k;
				if (this._tableBorder) {//是否显示外边�?
					if (r == 0)
						this._cells[k].setBorderTop(this._border);
					if (r == this._rows - 1)
						this._cells[k].setBorderBottom(this._border);
					if (c == 0)
						this._cells[k].setBorderLeft(this._border);
					if (c == this._cols - 1)
						this._cells[k].setBorderRight(this._border);
				}
				if (this._horizontalLines) {//是否显示内容区行�?
					var start = 0, end = this._rows - 1, col = 0;
					if (this._headerCols != null && this._headerCols >= 0)
						col = this._headerCols - 1;
					if (this._headerRows != null && this._headerRows > 0)
						start = this._headerRows - 1;
					if (this._footerRows != null && this._footerRows > 0)
						end = this._rows - this._footerRows - 1;
					if (r > start && r <= end && c > col)
						this._cells[k].setBorderTop(this._border);
				}
				if (this._headerColumnLines) {//是否显示表头列线
					if (this._headerCols != null && this._headerCols > 0) {
						if (c <= this._headerCols - 1) {
							var start = 0, end = this._rows - 1;
							if (this._headerRows != null && this._headerRows > 0)
								start = this._headerRows - 1;
							if (this._footerRows != null && this._footerRows > 0)
								end = this._rows - this._footerRows - 1;
							if (r > start && r <= end) {
								this._cells[k].setBorderTop(this._border);
							}
						}
					}
				}
				if (this._headerColumnColLines) {//是否显示表头列列�?
					if (this._headerCols != null && this._headerCols > 0) {
						if (c <= this._headerCols - 1) {
							var start = 0, end = this._rows - 1;
							if (this._headerRows != null && this._headerRows > 0)
								start = this._headerRows - 1;
							if (this._footerRows != null && this._footerRows > 0)
								end = this._rows - this._footerRows - 1;
							if (r > start && r <= end) {
								this._cells[k].setBorderLeft(this._border);
							}
						}
					}
				}
				if (this._headerLines) {//是否显示表头行线
					if (this._headerRows != null && this._headerRows > 0) {
						if (r <= this._headerRows - 1)
							this._cells[k].setBorderTop(this._border);
					}
				}
				if (this._footerLines) {//是否显示表尾行线
					if (r >= (this._rows - this._footerRows))
						this._cells[k].setBorderTop(this._border);
				}
				if (this._verticalLines) {//是否显示内容区列�?
					var start = 0, end = this._rows - 1, col = 0;
					if (this._headerCols != null && this._headerCols > 0)
						col = this._headerCols - 1;
					if (this._headerRows != null && this._headerRows > 0)
						start = this._headerRows;
					if (this._footerRows != null && this._footerRows > 0)
						end = this._rows - this._footerRows - 1;
					if (r >= start && r <= end && c > col) {
						this._cells[k].setBorderLeft(this._border);
					}
				}
				if (this._headerRowLines) {//是否显示表头列线
					if (this._headerRows != null && this._headerRows > 0) {
						if (r <= this._headerRows - 1)
							this._cells[k].setBorderLeft(this._border);
					}
				}
				if (this._footerRowLines) {//是否显示表尾列线
					if (r >= (this._rows - this._footerRows))
						this._cells[k].setBorderLeft(this._border);
				}
				if (this._alternatingRows) {//是否隔行变色
					if (r % 2 == 0) {
						//this._cells[k].setBackgroundColor(this._alternatingRowsColor);
						if(this._cells[k].getBackgroundColor()=="") {
							this._cells[k].setBackgroundColor(this._alternatingRowsColor);
						}
					}
				}
				if (this._headerRows != null && this._headerRows > 0) {//表头行数
					if (r <= this._headerRows - 1)
					//this._cells[k].setBackgroundColor(this._headerRowsColor);
					{
						if(this._cells[k].getBackgroundColor()=="") {
							this._cells[k].setBackgroundColor(this._headerRowsColor);
						}
					} else if (r == this._headerRows)
						this._cells[k].setBorderTop(this._border);
				}
				if (this._headerCols != null && this._headerCols > 0) {//表头列数
					if (c <= this._headerCols - 1) {
						if (r >= this._headerRows)
						//this._cells[k].setBackgroundColor(this._headerColsColor);
						{
							if(this._cells[k].getBackgroundColor()=="") {
								this._cells[k].setBackgroundColor(this._headerColsColor);
							}
						}
					} else if (c == this._headerCols) {
						var start = 0, end = this._rows - 1;
						if (this._headerRows != null && this._headerRows > 0)
							start = this._headerRows - 1;
						if (this._footerRows != null && this._footerRows > 0)
							end = this._rows - this._footerRows - 1;
						if (r > start && r <= end)
							this._cells[k].setBorderLeft(this._border);
					}
				}
				if (this._footerRows != null && this._footerRows > 0) {//表尾列数
					if (r >= (this._rows - this._footerRows))
					//this._cells[k].setBackgroundColor(this._footerRowsColor);
					{
						if(this._cells[k].getBackgroundColor()=="") {
							this._cells[k].setBackgroundColor(this._footerRowsColor);
						}
					}
					if (r == (this._rows - this._footerRows))
						this._cells[k].setBorderTop(this._border);
				}
				k++;
			}
		}
	},
	applyCellStyle : function(table, selection, paramCell) {
		var cells = table.getCells();
		var cellBorderWidthStyle = [];
		
		for (var i = 0; i < cells.length; i++) {
			cellBorderWidthStyle.push({
				top: -1,
				right: -1,
				bottom: -1,
				left: -1
			});
		}
		
		if(selection) {
			var borderTypeStyle = this.getBorderStyle(paramCell.getBorderStyle());
			var minCol = selection.getCol(),
				minRow = selection.getRow();

			var maxCol = minCol + selection.getColNumber() - 1,
				maxRow = minRow + selection.getRowNumber() - 1;

			for ( var i = 0; i < cells.length; i++) {
				var cell = cells[i];
				var row = cell.getRow(), 
					col = cell.getCol();
				if (row >= minRow && col >= minCol && row <= maxRow && col <= maxCol) {
					
					// set border style
					if(paramCell.getBorderStyle()){
						cell.setBorderStyle(paramCell.getBorderStyle());
					}

					if (paramCell.getFormat()) {
						this.updateTableCellsFormat(cell, paramCell.getFormat());
					}

					if (paramCell.getBackgroundColor()) {
						cell.setBackgroundColor(paramCell.getBackgroundColor());
					}

					if (paramCell.getFontWeight()) {
						if (paramCell.getFontWeight() == 'true') {
							cell.setFontWeight('bold');
						} else {
							cell.setFontWeight('');
						}
					}

					if (paramCell.getFontStyle()) {
						if (paramCell.getFontStyle() == 'true') {
							cell.setFontStyle('italic');
						} else {
							cell.setFontStyle('');
						}
					}

					if (paramCell.getUnderline()) {
						if (paramCell.getUnderline() == 'true') {
							cell.setUnderline('underline');
						} else {
							cell.setUnderline('');
						}
					}

					if (paramCell.getLineThrough()) {
						if (paramCell.getLineThrough() == 'true') {
							cell.setLineThrough('line-through');
						} else {
							cell.setLineThrough('');
						}
					}

					if (paramCell.getFontSize()) {
						cell.setFontSize(paramCell.getFontSize());
					}

					if (paramCell.getColor()) {
						cell.setColor(paramCell.getColor());
					}

					if (paramCell.getFontFamily()) {
						cell.setFontFamily(paramCell.getFontFamily());
					}

					if (paramCell.getWrapText() != null) {
						cell.setWrapText(paramCell.getWrapText());
					}

					if (paramCell.getTextAlign()) {
						cell.setTextAlign(paramCell.getTextAlign());
					}

					// Set border style
					var cellBorderWidth = cellBorderWidthStyle[i];
					var position = "";
					
					if (row == minRow) {
						position += ",top";
					}
					
					if (col == minCol) {
						position += ",left";
					}
					
					if (row == maxRow) {
						position += ",bottom";
					}
					
					if (col == maxCol) {
						position += ",right";
					}
					
					// center cell for vertical line of selection
					if (col > minCol && col <= maxCol) {
						position += ",vertical";
					}
					
					// center cell for horizon line of selection
					if (row > minRow && row <= maxRow) {
						position += ",horizon";
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

		// Update border width style into DOM cell
		var tableRow = table.getRows(),
		tableCol = table.getCols();
		for (var i = 0; i < cells.length; i++) {
			var cell = cells[i];
			var row = cell.getRow(),
			col = cell.getCol();

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
		} else {
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
	
	getBorderStyle : function(borderType) {
		var styleData = null;
		if (!borderType) {
			styleData = null;
		} else if (borderType == 'ALL') {
			styleData = {
				left : true,
				top : true,
				right : true,
				bottom : true,
				vertical : true,
				horizon : true
			};
		} else if (borderType == 'OutlineMiddle') {
			styleData = {
				left : true,
				top : true,
				right : true,
				bottom : true,
				vertical : false,
				horizon : true
			};
		} else if (borderType == 'OutlineCenter') {
			styleData = {
				left : true,
				top : true,
				right : true,
				bottom : true,
				vertical : true,
				horizon : false
			};
		} else if (borderType == 'Outline') {
			styleData = {
				left : true,
				top : true,
				right : true,
				bottom : true,
				vertical : false,
				horizon : false
			};
		} else if (borderType == 'Top') {
			styleData = {
				left : false,
				top : true,
				right : false,
				bottom : false,
				vertical : false,
				horizon : false
			};
		} else if (borderType == 'Middle') {
			styleData = {
				left : false,
				top : false,
				right : false,
				bottom : false,
				vertical : false,
				horizon : true
			};
		} else if (borderType == 'Bottom') {
			styleData = {
				left : false,
				top : false,
				right : false,
				bottom : true,
				vertical : false,
				horizon : false
			};
		} else if (borderType == 'Left') {
			styleData = {
				left : true,
				top : false,
				right : false,
				bottom : false,
				vertical : false,
				horizon : false
			};
		} else if (borderType == 'Center') {
			styleData = {
				left : false,
				top : false,
				right : false,
				bottom : false,
				vertical : true,
				horizon : false
			};
		} else if (borderType == 'Right') {
			styleData = {
				left : false,
				top : false,
				right : true,
				bottom : false,
				vertical : false,
				horizon : false
			};
		} else if (borderType == 'Default') {
		}

		return styleData;
	},
	
	updateTableCellsFormat : function(cell, newformat) {
		if (isNaN(cell.getText())
		&& (newformat.name == "Number" || newformat.name == "Currency" || newformat.name == "Percentage")) {
			// alert("Can't set a string to double !");
		}
		// else if ((cell.getFormat().name == "" && newformat.name == "") ||
		// (cell.getFormat().name == "" && newformat.name == "")) {
		// alert("Can't convert the two !");//// 1704BUG separator redo undo
		// }
		else {
			if (cell.getFormat() != null
			&& cell.getFormat().name == newformat.name) {
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
							// alert(newformat.formatOptions.curDecimal);
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
						}
						if (newformat.formatOptions.timeStyle != null) {
							orginFormat.formatOptions.timeStyle = newformat.formatOptions.timeStyle;
						}
						break;
					case 'Duration':
						if (newformat.formatOptions.durStyle != null) {
							orginFormat.formatOptions.durStyle = newformat.formatOptions.durStyle;
						}
						if (newformat.formatOptions.durType != null) {
							orginFormat.formatOptions.durType = newformat.formatOptions.durType;
						}
						break;
				}
				cell.setFormat(orginFormat);
			} else {
				cell.setFormat(newformat);
			}
		}
	},
	
	appendChild: function (childNode) {
		this._domInstance.appendChild(childNode.getDomInstance());
		if (childNode != null && childNode.getType() == 'Cell') {
			var cellIdx = (childNode.getRow() - 1) * this.getCols() + childNode.getCol() - 1;
			this._cells.insert(cellIdx, childNode);
		}
		childNode._parentNode = this;
	},
	
	removeChild: function (childNode) {
		this._domInstance.removeChild(childNode.getDomInstance());
	},
	
	// 公共对象 根据数据对象设置对象属�?
	setData: function (data) {
		//Table Basic property
		if (data.width != this._width)
			this.setWidth(data.width);
		if (data.height != this._height)
			this.setHeight(data.height);
		if (data.top != this._top)
			this.setTop(data.top);
		if (data.left != this._left)
			this.setLeft(data.left);
		if (data.rows != this._rows)
			this.setRows(data.rows);
		if (data.cols != this._cols)
			this.setCols(data.cols);
		if (data.headerRows != this._headerRows)
			this.setHeaderRows(data.headerRows);
		if (data.headerCols != this._headerCols)
			this.setHeaderCols(data.headerCols);
		if (data.footerRows != this._footerRows)
			this.setFooterRows(data.footerRows);
		//Append cell
		var top = 0, left = 0;

		var nWidth = 0, nHeight = 0;
		for(var i=0;i<this._rows;i++) {
			for(var j=0;j<this._cols; j++) {
				var cell = new com.hoperun.node.Cell();
				for (var k = 0; data.cells != null && k < data.cells.length; k++) {
					var tmpCellData = data.cells[k];
					if(tmpCellData.row == i + 1 && tmpCellData.col == j + 1) {
						cell.setData(tmpCellData);
						break;
					}
				}
				cell.setRow(i+1);
				cell.setCol(j+1);
				cell.appendTo(this);

				cell.setLeft(left);
				cell.setTop(top);
				if (cell.getCol() == data.cols) {
					top += cell.getHeight();
					left = 0;
				} else
					left += cell.getWidth();

				if(i==0) {
					nWidth += cell.getWidth();
				}
				if(j == 0) {
					nHeight += cell.getHeight();
				}
			}
		}
		this.setWidth(nWidth);
		this.setHeight(nHeight);

		if (data.selections) {
			for (var i = 0; i < data.selections.length; i++) {
				var selection = new com.hoperun.model.TableSelection();
				selection.setData(data.selections[i]);
				this._selections.push(selection);
			}
		}

		//Set table style
		if (data.styleId != this._styleId)
			this.setStyleId(data.styleId);
		if (data.tableBorder != this._tableBorder)
			this.setTableBorder(data.tableBorder);
		if (data.alternatingRows != this._alternatingRows)
			this.setAlternatingRows(data.alternatingRows);
		if (data.horizontalLines != this._horizontalLines)
			this.setHorizontalLines(data.horizontalLines);
		if (data.headerColumnLines != this._headerColumnLines)
			this.setHeaderColumnLines(data.headerColumnLines);
		if (data.headerLines != this._headerLines)
			this.setHeaderLines(data.headerLines);
		if (data.footerLines != this._footerLines)
			this.setFooterLines(data.footerLines);
		if (data.verticalLines != this._verticalLines)
			this.setVerticalLines(data.verticalLines);
		if (data.headerRowLines != this._headerRowLines)
			this.setHeaderRowLines(data.headerRowLines);
		if (data.footerRowLines != this._footerRowLines)
			this.setFooterRowLines(data.footerRowLines);
		if (data.headerColumnColLines != this._headerColumnColLines)
			this.setHeaderColumnColLines(data.headerColumnColLines);
		if (data.tableName != this._tableName)
			this.setTableName(data.tableName);
		if (data.fontFamily != this._fontFamily)
			this.setFontFamily(data.fontFamily);
		if (data.zIndex != this._zIndex)
			this.setZIndex(data.zIndex);
		this.render();
		this.refreshCellValue();
	},
	
	// 公共方法 返回数据对象
	getData: function () {
		var cells = [];
		for (var i = 0; i < this._cells.length; i++)
			cells.push(this._cells[i].getData());

		var selections = [];
		for (var i = 0; i < this._selections.length; i++)
			selections.push(this._selections[i].getData());

		return {
			id: this._id,
			type: this._type,
			left: this._left,
			top: this._top,
			width: this._width,
			height: this._height,
			rows: this._rows,
			cols: this._cols,
			cells: cells,
			selections: selections, //Added by Feng
			headerRows: this._headerRows,
			headerCols: this._headerCols,
			footerRows: this._footerRows,
			tableBorder: this._tableBorder,
			alternatingRows: this._alternatingRows,
			horizontalLines: this._horizontalLines,
			headerColumnLines: this._headerColumnLines,
			headerLines: this._headerLines,
			footerLines: this._footerLines,
			verticalLines: this._verticalLines,
			headerRowLines: this._headerRowLines,
			footerRowLines: this._footerRowLines,
			headerColumnColLines: this._headerColumnColLines,
			tableName: this._tableName,
			styleId: this._styleId,
			fontFamily: this._fontFamily,
			zIndex: this._zIndex
		};
	},
	
	// 按比例缩�?
	zoom: function (multiple) {
		this.setTop(this._top * multiple);
		this.setLeft(this._left * multiple);
		this.setWidth(this._width * multiple);
		this.setHeight(this._height * multiple);
		for (var i = 0; this._cells != null && i < this._cells.length; i++)
			this._cells[i].zoom(multiple);
	}
});