/**
 * Cell class
 * 
 * @package com.hoperun.node
 * @import com.hoperun.util.BaseTool,com.hoperun.util.NodeCache,com.hoperun.event.MouseEvent
 * @author lu_feng
 */
com.hoperun.tracker.CellButton = function() {
	this._id = com.hoperun.util.BaseTool.uuid();
	this._activeTable = null;
	this._domInstance = document.createElement("div");
	this._domInstance.className = "cell-button";
	this._domInstance.style.position = "relative";

	this._domInstance.id = this._id;
	this._className = "com.hoperun.tracker.CellButton";
	this._type = "CellButton";
};

com.hoperun.tracker.CellButton.prototype = {

	_domInstance : null,

	_type : null,

	_className : null,

	_id : null,

	_width : null,

	_height : null,

	_left : null,

	_top : null,

	_activeTable : null,
	
	_text : null,
	
	_messageType : null,

	initClick:function(){
		var self = this;
		$(this._domInstance).click(function(e){
			var message = new com.hoperun.util.Observer.Message();
			message.id = self._messageType;
			message.sender = self._activeTable;
			message.data = {};
			message.isStoped = true;
			com.hoperun.util.Observer.sendMessage(message);
			
	        if(e.stopPropagation) {
	        	return e.stopPropagation();
	        }
	        else {
	        	e.cancelBubble = true; 
	        }
		});
	},
	
	getMessageType : function(){
		return this._messageType;
	},
	
	setMessageType : function(messageType){
		this._messageType = messageType;
	},
	
	setText:function(text){
		this._domInstance.innerHTML = text;
	},
	
	setActiveTable : function(activeTable) {
		this._activeTable = activeTable;
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
