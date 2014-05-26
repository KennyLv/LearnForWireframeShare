/**
 * Line class
 * 
 * @package com.kenny.node.shape
 * @import com.kenny.util.BaseTool, com.kenny.util.ShapeHelper
 * @author Jian.T
 */
com.kenny.node.shape.Line = function() {
	com.kenny.node.shape.Star.superClass.constructor.call(this);
	this.createDomInstance('Shape_Line');
};
com.kenny.util.BaseTool.extend(com.kenny.node.shape.Line,
		com.kenny.node.shape.Shape);

com.kenny.util.BaseTool.augment(com.kenny.node.shape.Line, {

	_domInstance : null,

	_id : null,

	_type : null,


	_x1 : 0,

	_y1 : 0,

	_x2 : 0,

	_y2 : 0,
	
	_zIndex : 1000,




	setXX1 : function(x1) {
		this._x1 = x1;
	},

	getXX1 : function() {
		return this._x1;
	},

	setYY1 : function(y1) {
		this._y1 = y1;
	},

	getYY1 : function() {
		return this._y1;
	},

	setXX2 : function(x2) {
		this._x2 = x2;
	},

	getXX2 : function() {
		return this._x2;
	},

	setYY2 : function(y2) {
		this._y2 = y2;
	},

	getYY2 : function() {
		return this._y2;
	},
	

	
	setZIndex : function(zIndex) {
		this._domInstance.style.zIndex = zIndex;
		this._zIndex = zIndex;
	},

	getZIndex : function() {
		return this._zIndex;
	},



	
	
	getId : function() {
		return this._id;
	},
	
	getType : function() {
		return this._type;
	},
	
	appendTo : function(parentNode) {
		parentNode.appendChild(this);
	},
	
	removeFrom : function(parentNode) {
		parentNode.removeChild(this);
	},
	
	toJSON : function() {
		return JSON.stringify(this.getData());
	},
	
	toObject : function(json) {
		this.setData(JSON.parse(json));
	},
	
	setData : function(data) {
		this.setBaseData(data);
		if (data.x1 != null)
			this.setXX1(data.x1);
		if (data.x2 != null)
			this.setXX2(data.x2);
		if (data.y1 != null)
			this.setYY1(data.y1);
		if (data.y2 != null)
			this.setYY2(data.y2);
		if (data.zIndex != null)
			this.setZIndex(data.zIndex);
	},

	getData : function() {
		var data = this.getBaseData();
		data.x1 = this.getXX1();
		data.x2 = this.getXX2();
		data.y1 = this.getYY1();
		data.y2 = this.getYY2();
		return data;
	},
	
	createShapeInstance : function() {
		var shapeInstance = document.createElementNS('http://www.w3.org/2000/svg', 'line');
		this.setShapeInstance(shapeInstance);
		this.getDomInstance().appendChild(shapeInstance);		
		
	},	

	render : function() {
		com.kenny.helper.ShapeHelper.applyBaseAttr(this);
		com.kenny.helper.ShapeHelper.drawLine(this);
	},
	
	setShapeInstance : function(shapeInstance) {
		this._shapeInstance = shapeInstance;
	},
	
	getShapeInstance : function() {
		return this._shapeInstance;
	},	
	getDomInstance : function() {
		return this._domInstance;
	},
	
	clone : function() {
		var cloneObj = new com.kenny.shape.Line();
		cloneObj.setData(this.getData());
		return cloneObj;
	}
});