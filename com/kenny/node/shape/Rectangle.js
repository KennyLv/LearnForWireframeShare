/**
 * Rectangle class
 * 
 * @package com.kenny.node.shape
 * @import com.kenny.util.BaseTool, com.kenny.helper.ShapeHelper
 * @author Jian.Tao
 */
com.kenny.node.shape.Rectangle = function() {

	com.kenny.node.shape.Rectangle.superClass.constructor.call(this);
	this.createDomInstance('Shape_Rectangle');
};

com.kenny.util.BaseTool.extend(com.kenny.node.shape.Rectangle,
		com.kenny.node.shape.Shape);

com.kenny.util.BaseTool.augment(com.kenny.node.shape.Rectangle, {
	
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
		com.kenny.helper.ShapeHelper.applyBaseAttr(this);
		com.kenny.helper.ShapeHelper.drawRectangle(this);
	},

	setShapeInstance : function(shapeInstance) {
		this._shapeInstance = shapeInstance;
	},
	
	getShapeInstance : function() {
		return this._shapeInstance;
	}
	
});
