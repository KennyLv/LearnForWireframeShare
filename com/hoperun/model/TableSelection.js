/**
 * Table selection model class
 * 
 * @package com.hoperun.model
 * @author lu_feng
 */
com.hoperun.model.TableSelection = function(row, col, rowNumber, colNumber) {
	this._type = "TableSelection";
	this._id = com.hoperun.util.BaseTool.uuid();
	this._row = row;
	this._col = col;
	this._rowNumber = rowNumber;
	this._colNumber = colNumber;
};
com.hoperun.model.TableSelection.prototype = {
	_id : null,
	_row : null,
	_col : null,
	_rowNumber : null,
	_colNumber : null,

	getId : function() {
		return this._id;
	},
	setRow : function(row) {
		this._row = row;
	},
	setCol : function(col) {
		this._col = col;
	},
	setRowNumber : function(rowNumber) {
		this._rowNumber = rowNumber;
	},
	setColNumber : function(colNumber) {
		this._colNumber = colNumber;
	},
	getRow : function() {
		return this._row;
	},
	getCol : function() {
		return this._col;
	},
	getRowNumber : function() {
		return this._rowNumber;
	},
	getColNumber : function() {
		return this._colNumber;
	},

	getData : function() {
		return {
			row : this._row,
			col : this._col,
			rowNumber : this._rowNumber,
			colNumber : this._colNumber
		};
	},

	setData : function(data) {
		this._row = data.row;
		this._col = data.col;
		this._rowNumber = data.rowNumber;
		this._colNumber = data.colNumber;
	},

	toJSON : function() {
		return JSON.stringify(this.getData());
	},

	clone : function() {
		var cloneObj = new com.hoperun.model.TableSelection();
		cloneObj.setData(this.getData());
		return cloneObj;
	},

	copy : function() {
		var copyObj = new com.hoperun.model.TableSelection();
		copyObj.setRow(this.getRow());
		copyObj.setCol(this.getCol());
		copyObj.setRowNumber(this.getRowNumber());
		copyObj.setColNumber(this.getColNumber());
		return copyObj;
	},

	isSameRange : function(selection) {
		if (this._row == selection._row && this._col == selection._col
				&& this._rowNumber == selection._rowNumber
				&& this._colNumber == selection._colNumber) {
			return true;
		}
		return false;
	}
};

com.hoperun.model.TableSelectionModelHelper = {
	extendRow : function(selections, rowNo) {
		for ( var i = 0; i < selections.length; i++) {
			var selection = selections[i];
			var begin = selection.getRow(), rowNumber = selection
					.getRowNumber();
			var end = begin + rowNumber;
			if (rowNo < begin) {
				selection.setRow(begin + 1);
			} else if (rowNo < end) {
				selection.setRowNumber(rowNumber + 1);
			}
		}
	},
	removeRow : function(selections, rowNo) {
		for ( var i = selections.length - 1; i > -1; i--) {
			var selection = selections[i];
			var begin = selection.getRow(), rowNumber = selection
					.getRowNumber();
			var end = begin + rowNumber;
			if (rowNo < begin) {
				selection.setRow(begin - 1);
			} else if (rowNo < end) {
				if (selection.getRowNumber() <= 1) {
					selections.removeAt(i);
				} else {
					selection.setRowNumber(rowNumber - 1);
				}
			}
		}
	},
	extendCol : function(selections, colNo) {
		for ( var i = 0; i < selections.length; i++) {
			var selection = selections[i];
			var begin = selection.getCol(), colNumber = selection
					.getColNumber();
			var end = begin + colNumber;
			if (colNo < begin) {
				selection.setCol(begin + 1);
			} else if (colNo < end) {
				selection.setColNumber(colNumber + 1);
			}
		}
	},
	removeCol : function(selections, colNo) {
		for ( var i = selections.length - 1; i > -1; i--) {
			var selection = selections[i];
			var begin = selection.getCol(), colNumber = selection
					.getColNumber();
			var end = begin + colNumber;
			if (colNo < begin) {
				selection.setCol(begin - 1);
			} else if (colNo < end) {
				if (selection.setColNumber() <= 1) {
					selections.removeAt(i);
				} else {
					selection.setColNumber(colNumber - 1);
				}
			}
		}
	},

	addSelection : function(selections, selection, mustPush) {
		if (mustPush) {
			selections.push(selection);
			return;
		}
		if (selections.length > 0
				&& selections[selections.length - 1].isSameRange(selection)) {
			var existedSelection = selections[selections.length - 1];
			existedSelection.copyNotNullStyle(selection);
		} else {
			selections.push(selection);
		}
	},
	removeSelection : function(selections, selectionId) {
		for ( var s = selections.length - 1; s > -1; s--) {
			if (selections[s].getId() == selectionId) {
				selections.splice(s, 1);
				break;
			}
		}
	},
	addSelectionByDel : function(selections, selection) {
		selections.push(selection);
	}
};