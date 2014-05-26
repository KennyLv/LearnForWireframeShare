/**
 * Polygon class
 * 
 * @package com.kenny.node.shape
 * @import com.kenny.util.BaseTool
 * @author Jian.Tao
 */
com.kenny.node.shape.Star = function() {

	com.kenny.node.shape.Star.superClass.constructor.call(this);
	this.createDomInstance('Shape_Star');
};

com.kenny.util.BaseTool.extend(com.kenny.node.shape.Star,
		com.kenny.node.shape.Shape);

com.kenny.util.BaseTool.augment(com.kenny.node.shape.Star, {

	_r1 : null,
	
	_r2 : null,
	
	_vertex : null,

	_zoomX : null,
	
	_zoomY : null,
	
	setR1 : function(r1) {
		this._r1 = r1;
	},

	getR1 : function() {
		return this._r1;
	},
	
	setR2 : function(r2) {
		this._r2 = r2;
	},

	getR2 : function() {
		return this._r2;
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

	setData : function(data) {
		this.setBaseData(data);
		if (data.r1 != null)
			this.setR1(data.r1);
		if (data.r2 != null)
			this.setR2(data.r2);
		if (data.vertex != null)
			this.setVertex(data.vertex);
		if (data.zoomX != null)
			this.setZoomX(data.zoomX);
		if (data.zoomY != null)
			this.setZoomY(data.zoomY);
	},

	getData : function() {
		var data = this.getBaseData();
		data.r1 = this.getR1();
		data.r2 = this.getR2();
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

	render : function() {
		com.kenny.helper.ShapeHelper.applyBaseAttr(this);
		com.kenny.helper.ShapeHelper.drawStar(this);
	},

	setShapeInstance : function(shapeInstance) {
		this._shapeInstance = shapeInstance;
	},
	
	getShapeInstance : function() {
		return this._shapeInstance;
	}	

});
