/**
 * Cell class
 * 
 * @package com.kenny.node
 * @import com.kenny.util.BaseTool,com.kenny.util.NodeCache,com.kenny.event.MouseEvent
 * @author lu_feng
 */
com.kenny.tracker.CellTracker = function() {
	this._id = com.kenny.util.BaseTool.uuid();
	this._activeTable = null;
	this._domInstance = document.createElement("div");
	this._domInstance.className = "cell-tracker";
	this._domInstance.style.position = "absolute";

	this._domInstance.id = this._id;
	this._className = "com.kenny.tracker.CellTracker";
	this._type = "CellTracker";
	// com.kenny.util.NodeCache.add(this.getId(), this);

	this._top = document.createElement("div");
	this._bottom = document.createElement("div");
	this._left = document.createElement("div");
	this._right = document.createElement("div");
	this._colBtn = document.createElement("div");
	this._rowBtn = document.createElement("div");

	this._domInstance.appendChild(this._top);
	this._domInstance.appendChild(this._bottom);
	this._domInstance.appendChild(this._left);
	this._domInstance.appendChild(this._right);
	this._domInstance.appendChild(this._colBtn);
	this._domInstance.appendChild(this._rowBtn);

	this._top.className = 'cell-tracker-top';
	this._bottom.className = 'cell-tracker-bottom';
	this._left.className = 'cell-tracker-left';
	this._right.className = 'cell-tracker-right';
	this._colBtn.className = 'cell-tracker-colBtn';
	this._rowBtn.className = 'cell-tracker-rowBtn';
	var self = this;
	
	$(this._colBtn).mousedown(function(e){
		var mouseX = e.clientX;
		var callback = function(x, y, isUndoFlag){
			var message = new com.kenny.util.Observer.Message();
			message.id = com.kenny.util.Observer.MessageType.TABLE_COL_WIDTH_CHANGE;
			message.sender = self;
			message.data = {x:x, y:y, isUndoFlag:isUndoFlag, mouseX: mouseX};
			com.kenny.util.Observer.sendMessage(message);
		};
		var table = self.getActiveTable();
		com.kenny.util.BaseTool.fDragging(this, e, false, callback, callback, table);
	});
	$(this._rowBtn).mousedown(function(e){
		var mouseY = e.clientY;
		var callback = function(x, y, isUndoFlag){
			var message = new com.kenny.util.Observer.Message();
			message.id = com.kenny.util.Observer.MessageType.TABLE_ROW_HEIGHT_CHANGE;
			message.sender = self;
			message.data = {x:x, y:y, isUndoFlag:isUndoFlag, mouseY: mouseY};
			com.kenny.util.Observer.sendMessage(message);
		};
		var table = self.getActiveTable();
		com.kenny.util.BaseTool.fDragging(this, e, false, callback, callback, table);
	});

	this._cellMenu = new com.kenny.tracker.CellMenu();
	this._cellMenu.appendTo(this);
	this.hide();
};
com.kenny.tracker.CellTracker.FlagType = {
	Horizontal : 'Horizontal',
	Vertical : 'Vertical',
	None : 'None'
};
com.kenny.tracker.CellTracker.prototype = {

	_domInstance : null,

	_type : null,

	_className : null,

	_id : null,

	_width : null,

	_height : null,

	_left : null,

	_top : null,

	_activeTable : null,

	_cells : null,

	_flag : null, //

	show : function(){
		this.getDomInstance().style.display = '';
	},
	
	hide : function(){
		this.getDomInstance().style.display = 'none';
	},

	/*
	 * cells = [[c, c, c, c],
	 * 			[c, c, c, c],
	 * 			[c, c, c, c],]
	 * row x col = 3 x 4
	 * 
	 */
	refreshRange:function(c1, c2){
		var cells = [];
		if(c1 != null && c2 != null){
			//alert(c1.getRow()+ ' , '+ c1.getCol() + ' | ' + c2.getRow()+ ' , '+ c2.getCol());
			var row1 = c1.getRow() > c2.getRow() ? c2.getRow() : c1.getRow();
			var row2 = c1.getRow() > c2.getRow() ? c1.getRow() : c2.getRow();
			var col1 = c1.getCol() > c2.getCol() ? c2.getCol() : c1.getCol();
			var col2 = c1.getCol() > c2.getCol() ? c1.getCol() : c2.getCol();
//			alert(row1 + ' , ' + row2 + ' , ' + col1 + ' , ' + col2);
			for(var i=0; i<this.getActiveTable().getCells().length; i++){
				var cell = this.getActiveTable().getCells()[i];
				if(row1 <= cell.getRow() && cell.getRow() <= row2 
						&& col1 <= cell.getCol() && cell.getCol() <= col2){
					if(cells[cell.getRow() - row1] == null) 
						cells[cell.getRow() - row1] = [];
					cells[cell.getRow() - row1][cell.getCol() - col1] = cell;
				}
			}
		}
		
		if(cells.length > 0){
			this.setCells(cells);
			var top = cells[0], left = [], right = [], bottom = cells[cells.length-1];
	
			for(var i=0; i< cells.length; i++){
				left[left.length] = cells[i][0];
				right[right.length] = cells[i][cells[i].length-1];
			}
			
			this._top.style.top = top[0].getTop();
			this._top.style.left = top[0].getLeft();
			this._top.style.width = top[top.length -1].getLeft() - top[0].getLeft() + top[top.length -1].getWidth();
			this._top.style.height = 2;
			this._left.style.top = left[0].getTop();
			this._left.style.left = left[0].getLeft();
			this._left.style.width = 2;
			this._left.style.height = left[left.length -1].getTop() - left[0].getTop() + left[left.length -1].getHeight() + 2;
			this._bottom.style.top = bottom[0].getTop() + bottom[0].getHeight();
			this._bottom.style.left = bottom[0].getLeft();
			this._bottom.style.width = bottom[bottom.length -1].getLeft() - bottom[0].getLeft() + bottom[bottom.length -1].getWidth() + 2;
			this._bottom.style.height = 2;
			this._right.style.top = right[0].getTop();
			this._right.style.left = right[0].getLeft() + right[0].getWidth();
			this._right.style.width = 2;
			this._right.style.height = right[right.length -1].getTop() - right[0].getTop() + right[right.length -1].getHeight() + 2;
	
			this._colBtn.style.display = 'none';
			this._rowBtn.style.display = 'none';
			this.show();
		}
	},
	
	//select row or col 
	refresh:function(cells, flag){
		this.setCells(cells);
		this.setFlag(flag);
		var first = this._cells[0];
		var last = this._cells[this._cells.length - 1];
		var self = this;
		if (this._flag == com.kenny.tracker.CellTracker.FlagType.Horizontal) {
			//row handler
			this._bottom.style.display = 'block';
			this._top.style.display = 'block';
			this._left.style.display = 'block';
			this._right.style.display = 'block';
			this._top.style.top = first.getTop();
			this._top.style.left = first.getLeft();
			this._top.style.width = last.getLeft() + last.getWidth();
			this._top.style.height = 2;
			this._bottom.style.top = first.getTop() + first.getHeight();
			this._bottom.style.left = first.getLeft();
			this._bottom.style.width = last.getLeft() + last.getWidth();
			this._left.style.top = first.getTop();
			this._left.style.left = first.getLeft()-13;
			this._left.style.width = 18;
			this._left.style.height = first.getHeight()+2;
			this._right.style.top = first.getTop();
			this._right.style.left = last.getLeft() + last.getWidth();
			this._right.style.height = first.getHeight()+2;

			this._colBtn.style.display = 'none';
			this._rowBtn.style.display = '';
			this._rowBtn.style.top = first.getTop() + first.getHeight() - 5;
			this._rowBtn.style.left = -10;
			this._left.ondblclick = function(e){
				self._cellMenu.show(e);
			};
		}
		else if(this._flag == com.kenny.tracker.CellTracker.FlagType.None){
			this._bottom.style.display = 'none';
			this._top.style.display = 'none';
			this._left.style.display = 'none';
			this._right.style.display = 'none';
			this._colBtn.style.display = 'none';
			this._rowBtn.style.display = 'none';

			this._left.ondblclick = function(e){
				self._cellMenu.show(e);
			};
		}else{
			//col handler
			if(first && last){
				
				this._bottom.style.display = 'block';
				this._top.style.display = 'block';
				this._left.style.display = 'block';
				this._right.style.display = 'block';
				
			this._top.style.top = first.getTop()-13;
			this._top.style.left = first.getLeft();
			this._top.style.width = first.getWidth()+2;
			this._top.style.height = 18;
			this._bottom.style.top = last.getTop() + last.getHeight();
			this._bottom.style.left = last.getLeft();
			this._bottom.style.width = last.getWidth();
			this._left.style.top = first.getTop();
			this._left.style.left = last.getLeft();
			this._left.style.width = 2;
			this._left.style.height = last.getTop() - first.getTop() + last.getHeight() + 2;
			this._right.style.top = first.getTop();
			this._right.style.left = first.getLeft() + first.getWidth();
			this._right.style.height = last.getTop() - first.getTop() + last.getHeight() + 2;

			this._rowBtn.style.display = 'none';
			this._colBtn.style.display = '';
			this._colBtn.style.top = -10;
			this._colBtn.style.left = first.getLeft() + first.getWidth() - 5;
				}
			this._top.ondblclick = function(e){
				self._cellMenu.show(e);
			};
		}
		this.show();
	},
	
	_changeTableSelection: function(cells){
		var cells = this.getCells();
		var minRow = 99999, minCol = 99999, maxRow = 0, maxCol = 0;
		for(var i=0; i<cells.length; i++){
			for(var j=0; j<cells[i].length; j++){
				var rowIdx = cells[i][j].getRow(), colIdx = cells[i][j].getCol();
				if(rowIdx < minRow){
					minRow = rowIdx;
				}
				if(colIdx < minCol){
					minCol = colIdx;
				}
				if(rowIdx > maxRow){
					maxRow = rowIdx;
				}
				if(colIdx > maxCol){
					maxCol = colIdx;
				}
			}
		}
		if(minRow <= maxRow && minCol <= maxCol && this._activeTable){
			var selection = new com.kenny.model.TableSelection(minRow, minCol, maxRow - minRow + 1, maxCol - minCol + 1);
			this._activeTable.setActiveSelection(selection);
		}
	},
	//get cells, which is below selected status
	getCellRange: function(){
		var range = null;
		
		if(minRow <= maxRow && minCol <= maxCol){
			range = {
				top: [],
				right: [],
				bottom: [],
				left: [],
				center: []
			};
			for(var i=0; i<cells.length; i++){
				for(var j=0; j<cells[i].length; j++){
					var cell = cells[i][j];
					var row = cell.getRow(), col = cell.getCol();
					if(row == minRow){
						range.top.push(cell);
					}
					if(col == minCol){
						range.left.push(cell);
					}
					
					if(row == maxRow){
						range.bottom.push(cell);
					}
					if(col == maxCol){
						range.right.push(cell);
					}
					if(row > minRow && row <= maxRow && col > minCol && col <= maxCol){
						range.center.push(cell);
					}
				}
			}
		}
		return range;
	},
	
	setCells : function(cells) {
		this._cells = cells;
		//Invoke to refresh table's selection
		this._changeTableSelection();
	},

	getCells : function() {
		return this._cells;
	},

	setFlag : function(flag) {
		this._flag = flag;
	},

	getFlag : function() {
		return this._flag;
	},

	setActiveTable : function(activeTable) {
		this._activeTable = activeTable;
		this._cellMenu.setActiveTable(activeTable);
	},

	getActiveTable : function() {
		return this._activeTable;
	},

	setLeft : function(left) {
		this._left = left;
		this._domInstance.style.left = left;
	},

	setTop : function(top) {
		this._top = top;
		this._domInstance.style.top = top;
	},

	setWidth : function(width) {
		this._width = width;
		this._domInstance.style.width = width + "px";
	},

	setHeight : function(height) {
		this._height = height;
		this._domInstance.style.height = height + "px";
	},

	getLeft : function() {
		return this._left;
	},

	getTop : function() {
		return this._top;
	},

	getWidth : function() {
		return this._width;
	},

	getHeight : function() {
		return this._height;
	},

	// 公共方法 深度拷贝对象
	clone : function() {
		var cloneObj = new com.kenny.node.Cell();
		cloneObj.setData(this.getData());
		return cloneObj;
	},
	// 公共方法 返回对象ID
	getId : function() {
		return this._id;
	},
	// 公共方法 返回类名
	getClassName : function() {
		return this._className;
	},
	// 公共方法 返回对象类型
	getType : function() {
		return this._type;
	},
	// 公共方法 将对象添加到父节点
	appendTo : function(parentNode) {
		parentNode.appendChild(this);
	},

	appendChild : function(childNode) {
		this._domInstance.appendChild(childNode.getDomInstance());
		childNode._parentNode = this;
	},

	// 公共方法 将对象从父节点移除
	removeFrom : function(parentNode) {
		parentNode.removeChild(this);
	},
	// 公共方法 数据对象以JSON格式返回
	toJSON : function() {
		return JSON.stringify(this.getData());
	},
	// 公共方法 以JSON字串为数据恢复对象属性设置
	toObject : function(json) {
		this.setData(JSON.parse(json));
	},
	// 公共对象 根据数据对象设置对象属性
	setData : function(data) {
	},
	// 公共方法 返回数据对象
	getData : function() {
		return {};
	},
	// 公共方法 返回该对象DOM实例
	getDomInstance : function() {
		return this._domInstance;
	}
};
