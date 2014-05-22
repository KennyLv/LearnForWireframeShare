/**
 * Table menu class
 * 
 * @package com.hoperun.node
 * @import com.hoperun.util.BaseTool,com.hoperun.util.NodeCache,com.hoperun.event.MouseEvent
 * @author lu_feng
 */
com.hoperun.tracker.TableMenu = function() {
	this._id = com.hoperun.util.BaseTool.uuid();
	this._activeTable = null;
	this._domInstance = document.createElement("div");
	this._domInstance.className = "table-menu tracker-menu";
	this._domInstance.style.position = "absolute";

	this._domInstance.id = this._id;
	this._className = "com.hoperun.tracker.TableMenu";
	this._type = "TableMenu";

	this._delete = new com.hoperun.tracker.CellButton();
	this._delete.setText("Delete");
	this._delete.setMessageType(com.hoperun.util.Observer.MessageType.TABLE_MENU_DELETE);
	this._delete.appendTo(this);
	this._delete.initClick();
};

com.hoperun.tracker.TableMenu.hideAll = function(){
	$('.table-menu').hide();
};
com.hoperun.tracker.TableMenu.FlagType = {
	Horizontal : 'Horizontal',
	Vertical : 'Vertical',
	None : 'None'
};
com.hoperun.tracker.TableMenu.prototype = {

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
		this.setTop(e.clientY - $(this._activeTable.getDomInstance()).offset().top - 25);
		this.setLeft(e.clientX - $(this._activeTable.getDomInstance()).offset().left + 10);
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
		var cloneObj = new com.hoperun.node.Cell();
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
