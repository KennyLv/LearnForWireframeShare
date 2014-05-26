/**
 * ArrowLine class
 * 
 * @package com.kenny.node.shape
 * @import com.kenny.util.BaseTool, com.kenny.util.ShapeHelper
 * @author Jian.T
 */
com.kenny.node.shape.ArrowLine = function() {
	com.kenny.node.shape.Star.superClass.constructor.call(this);
	this.createDomInstance('Shape_ArrowLine');
};
com.kenny.util.BaseTool.extend(com.kenny.node.shape.ArrowLine,
		com.kenny.node.shape.Shape);

com.kenny.util.BaseTool.augment(com.kenny.node.shape.ArrowLine, {

	_domInstance : null,

	_x1 : null,

	_y1 : null,

	_x2 : null,

	_y2 : null,

	setX1 : function(x1) {
		this._x1 = x1;
	},

	getX1 : function() {
		return this._x1;
	},

	setY1 : function(y1) {
		this._y1 = y1;
	},

	getY1 : function() {
		return this._y1;
	},

	setX2 : function(x2) {
		this._x2 = x2;
	},

	getX2 : function() {
		return this._x2;
	},

	setY2 : function(y2) {
		this._y2 = y2;
	},

	getY2 : function() {
		return this._y2;
	},

	setData : function(data) {
		this.setBaseData(data);
		if (data.x1 != null)
			this.setX1(data.x1);
		if (data.x2 != null)
			this.setX2(data.x2);
		if (data.y1 != null)
			this.setY1(data.y1);
		if (data.y2 != null)
			this.setY2(data.y2);
		if (data.zIndex != null)
			this.setZIndex(data.zIndex);
	},

	getData : function() {
		var data = this.getBaseData();
		data.x1 = this.getX1();
		data.x2 = this.getX2();
		data.y1 = this.getY1();
		data.y2 = this.getY2();
		return data;
	},

	createShapeInstance : function() {
		var svgns = 'http://www.w3.org/2000/svg';

		var shapeMarkerInstance = document.createElementNS(svgns, 'marker');
		this.setShapeMarkerInstance(shapeMarkerInstance);
		this.getDomInstance().appendChild(shapeMarkerInstance);

		var shapeMarkerPathInstance = document.createElementNS(svgns, 'path');
		this.setShapeMarkerPathInstance(shapeMarkerPathInstance);
		this.getShapeMarkerInstance().appendChild(shapeMarkerPathInstance);

		var shapeInstance = document.createElementNS(svgns, 'line');
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

	setShapeMarkerInstance : function(shapeMarkerInstance) {
		this._shapeMarkerInstance = shapeMarkerInstance;
	},

	setShapeMarkerPathInstance : function(shapeMarkerPathInstance) {
		this._shapeMarkerPathInstance = shapeMarkerPathInstance;
	},

	getShapeMarkerPathInstance : function() {
		return this._shapeMarkerPathInstance;
	},

	getShapeMarkerInstance : function() {
		return this._shapeMarkerInstance;
	},

	getShapeInstance : function() {
		return this._shapeInstance;
	},

	getDomInstance : function() {
		return this._domInstance;
	}
});