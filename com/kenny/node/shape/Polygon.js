/**
 * Polygon class
 * 
 * @package com.kenny.node.shape
 * @import com.kenny.util.BaseTool
 * @author Jian.Tao
 */
com.kenny.node.shape.Polygon = function() {

	com.kenny.node.shape.Polygon.superClass.constructor.call(this);
	this.createDomInstance('Shape_Polygon');
};

com.kenny.util.BaseTool.extend(com.kenny.node.shape.Polygon,
		com.kenny.node.shape.Shape);

com.kenny.util.BaseTool.augment(com.kenny.node.shape.Polygon, {

	_radii : null,
	
	_vertex : null,

	_zoomX : null,
	
	_zoomY : null,
	
	setRadii : function(radii) {
		this._radii = radii;
	},

	getRadii : function() {
		return this._radii;
	},
	
	setVertex : function(vertex) {
		this._vertex = vertex;
	},
	
	getVertex: function() {
		return this._vertex;
	},
	
	setZoomX : function(zoomX) {
		this._zoomX = zoomX;
	},
	
	getZoomX : function(zoomX) {
		return this._zoomX;
	},
	
	setZoomY : function(zoomY) {
		this._zoomY = zoomY;
	},
	
	getZoomY : function(zoomY) {
		return this._zoomY;
	},

	setShapeData : function(data) {
		if (data.radii != null)
			this.setRadii(data.radii);
		if (data.vertex != null)
			this.setVertex(data.vertex);
		if (data.zoomX != null)
			this.setZoomX(data.zoomX);
		if (data.zoomY != null)
			this.setZoomY(data.zoomY);
	},

	getShapeData : function() {
		var data = {};
		data.radii = this.getRadii();
		data.vertex = this.getVertex();
		data.zoomX = this.getZoomX();
		data.zoomY = this.getZoomY();
		return data;
	},

	createShapeInstance : function() {
		var shapeInstance = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
		this.setShapeInstance(shapeInstance);
		this.getDomInstance().appendChild(shapeInstance);
	},

	setData : function(data) {
		this.setBaseData(data);
		if (data.radii != null)
			this.setRadii(data.radii);
		if (data.vertex != null)
			this.setVertex(data.vertex);
		if (data.zoomX != null)
			this.setZoomX(data.zoomX);
		if (data.zoomY != null)
			this.setZoomY(data.zoomY);
	},

	getData : function() {
		var data = this.getBaseData();
		data.radii = this.getRadii();
		data.vertex = this.getVertex();
		data.zoomX = this.getZoomX();
		data.zoomY = this.getZoomY();
		return data;
	},

	render : function() {
		com.kenny.helper.ShapeHelper.applyBaseAttr(this);
		com.kenny.helper.ShapeHelper.drawPolygon(this);
	},

	zoom : function(multiple) {
		this.baseZoom(multiple);
		this.render();
	},
	
	setShapeInstance : function(shapeInstance) {
		this._shapeInstance = shapeInstance;
	},

	getShapeInstance : function() {
		return this._shapeInstance;
	}

});
