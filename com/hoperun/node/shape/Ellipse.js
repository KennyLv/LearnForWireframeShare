/**
 * Ellipse class
 * 
 * @package com.hoperun.node.shape
 * @import com.hoperun.util.BaseTool
 * @author Jian.Tao
 */
com.hoperun.node.shape.Ellipse = function() {

	com.hoperun.node.shape.Ellipse.superClass.constructor.call(this);
	this.createDomInstance('Shape_Ellipse');
};

com.hoperun.util.BaseTool.extend(com.hoperun.node.shape.Ellipse,
		com.hoperun.node.shape.Shape);

com.hoperun.util.BaseTool.augment(com.hoperun.node.shape.Ellipse, {

	_rx : null,

	_ry : null,

	setRx : function(rx) {
		this._rx = rx;
	},

	getRx : function() {
		return this._rx;
	},

	setRy : function(ry) {
		this._ry = ry;
	},

	getRy : function() {
		return this._ry;
	},

	setShapeData : function(data) {
		if (data.rx != null)
			this.setRx(data.rx);
		if (data.ry != null)
			this.setRy(data.ry);
	},

	getShapeData : function() {
		var data = {};
		data.rx = this.getRx();
		data.ry = this.getRy();
		return data;
	},

	createShapeInstance : function() {
		var shapeInstance = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
		this.setShapeInstance(shapeInstance);
		this.getDomInstance().appendChild(shapeInstance);
	},
	
	render : function() {
		com.hoperun.helper.ShapeHelper.applyBaseAttr(this);
		com.hoperun.helper.ShapeHelper.drawEllipse(this);
	},

	setShapeInstance : function(shapeInstance) {
		this._shapeInstance = shapeInstance;
	},
	
	getShapeInstance : function() {
		return this._shapeInstance;
	}
	
});
