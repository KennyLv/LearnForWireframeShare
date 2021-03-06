/**
 * Cell class
 * 
 * @package com.kenny.node
 * @import com.kenny.util.BaseTool,com.kenny.util.NodeCache,com.kenny.event.MouseEvent
 * @author lu_feng
 */
com.kenny.tracker.CellMenu = function() {
	this._id = com.kenny.util.BaseTool.uuid();
	this._activeTable = null;
	this._domInstance = document.createElement("div");
	this._domInstance.className = "cell-menu tracker-menu";
	this._domInstance.style.position = "absolute";

	this._domInstance.id = this._id;
	this._className = "com.kenny.tracker.CellMenu";
	this._type = "CellMenu";
	// com.kenny.util.NodeCache.add(this.getId(), this);

	this._insert = new com.kenny.tracker.CellButton();
	this._insert.setText("Insert");
	this._insert.appendTo(this);
	this._insert.setMessageType(com.kenny.util.Observer.MessageType.CELL_MENU_INSERT);
	this._insert.initClick();
	this._delete = new com.kenny.tracker.CellButton();
	this._delete.setText("Delete");
	this._delete.setMessageType(com.kenny.util.Observer.MessageType.CELL_MENU_DELETE);
	this._delete.appendTo(this);
	this._delete.initClick();
};
com.kenny.tracker.CellMenu.FlagType = {
	Horizontal : 'Horizontal',
	Vertical : 'Vertical',
	None : 'None'
};
com.kenny.tracker.CellMenu.prototype = {

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

	show : function(e){
		$(this.getDomInstance()).show();
		this.setTop(e.clientY - $(this._activeTable.getDomInstance()).offset().top);
		this.setLeft(e.clientX - $(this._activeTable.getDomInstance()).offset().left);
	},
	
	hide : function(){
		this.getDomInstance().style.display = 'none';
	},

	setFlag : function(flag) {
		this._flag = flag;
	},

	getFlag : function() {
		return this._flag;
	},

	setActiveTable : function(activeTable) {
		this._activeTable = activeTable;
		this._delete.setActiveTable(activeTable);
		this._insert.setActiveTable(activeTable);
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
