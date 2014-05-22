/**
 * Rectangle class
 * 
 * @package com.hoperun.node.shape
 * @import com.hoperun.util.BaseTool, com.hoperun.helper.ShapeHelper
 * @author Jian.Tao
 */
com.hoperun.node.shape.Rectangle = function() {

	com.hoperun.node.shape.Rectangle.superClass.constructor.call(this);
	this.createDomInstance('Shape_Rectangle');
};

com.hoperun.util.BaseTool.extend(com.hoperun.node.shape.Rectangle,
		com.hoperun.node.shape.Shape);

com.hoperun.util.BaseTool.augment(com.hoperun.node.shape.Rectangle, {
	
	_shapeInstance : null,

	_radii : null,

	setRadii : function(radii) {
		this._radii = radii;
	},

	getRadii : function() {
		return this._radii;
	},

	setShapeData : function(data) {
		if (data.radii != null)
			this.setRadii(data.radii);
	},

	getShapeData : function() {
		var data = {};
		data.radii = this.getRadii();
		return data;
	},
	
	createShapeInstance : function() {
		var shapeInstance = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
		this.setShapeInstance(shapeInstance);
		this.getDomInstance().appendChild(shapeInstance);
	},

	render : function() {
		com.hoperun.helper.ShapeHelper.applyBaseAttr(this);
		com.hoperun.helper.ShapeHelper.drawRectangle(this);
	},

	setShapeInstance : function(shapeInstance) {
		this._shapeInstance = shapeInstance;
	},
	
	getShapeInstance : function() {
		return this._shapeInstance;
	}
	
});
