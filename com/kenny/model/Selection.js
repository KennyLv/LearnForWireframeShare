/**
 * The selection model class
 * 
 * @package com.kenny.model
 * @author lu_feng
 */
com.kenny.model.Selection = function(row, col, rowIndex, colIndex) {
	this._type = "Selection";
	this._id = com.kenny.util.BaseTool.uuid();
	
	this._row = row;
	this._col = col;
	this._rowIndex = rowIndex;
	this._colIndex = colIndex;
};

com.kenny.model.Selection.prototype = {
    // The identified code
	_id : null,
	
	// Row &Column Information
	_rowIndex : null,
	_colIndex : null,
	_rows : null,
	_cols : null,

	/**
	 * 
	 * @returns the identified code
	 */
	getId : function() {
		return this._id;
	},
	
	/**
	 * 
	 * @returns the row number
	 */
	getRows : function() {
        return this._rows;
    },
    
    /**
     * 
     * @param rows the row number
     */
	setRows : function(rows) {
		this._rows = rows;
	},
	
	/**
	 * 
	 * @returns the column number
	 */
	getCols : function() {
        return this._cols;
    },
    
    /**
     * 
     * @param cols the column number.
     */
	setCols : function(cols) {
		this._cols = cols;
	},
	
	/**
	 * 
	 * @returns the row index
	 */
	getRowIndex : function() {
        return this._rowIndex;
    },
    
    /**
     * 
     * @param rowIndex the row index
     */
	setRowIndex : function(rowIndex) {
		this._rowIndex = rowIndex;
	},
	
	/**
	 * 
	 * @returns the column index
	 */
	getColIndex : function() {
        return this._colIndex;
    },
    
    /**
     * 
     * @param colIndex the column index
     */
	setColIndex : function(colIndex) {
		this._colIndex = colIndex;
	},

	/**
	 * 
	 * @returns the data object
	 */
	getData : function() {
		return {
			row : this._row,
			col : this._col,
			rowIndex : this._rowIndex,
			colIndex : this._colIndex
		};
	},

	
	/**
	 * 
	 * @param data the data
	 */
	setData : function(data) {
		this._row = data.row;
		this._col = data.col;
		this._rowIndex = data.rowIndex;
		this._colIndex = data.colIndex;
	},
	
	/**
	 * 
	 * @returns the JSON object
	 */
	toJSON : function() {
		return JSON.stringify(this.getData());
	},

	/**
	 * 
	 * @returns the cloned object
	 */
	clone : function() {
		var cloneObj = new com.kenny.model.Selection();
		cloneObj.setData(this.getData());
		return cloneObj;
	}
};