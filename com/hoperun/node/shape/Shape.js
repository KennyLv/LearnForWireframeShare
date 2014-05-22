/**
 * BaseShape Class
 * 
 * @package com.hoperun.node.shape
 * @import com.hoperun.util.BaseTool
 * @author Jian.Tao
 */
com.hoperun.node.shape.Shape = function() {
	com.hoperun.node.shape.Shape.superClass.constructor.call(this);
};

com.hoperun.util.BaseTool.extend(com.hoperun.node.shape.Shape,
		com.hoperun.node.Node);

com.hoperun.util.BaseTool.augment(com.hoperun.node.shape.Shape, {

	_rotate : null,

	_color : null,

	_opacity : null,

	_shadow : null,

	_borderWidth : null,

	_borderColor : null,

	_borderStyle : null,

	createDomInstance : function(shapeType) {

		var svgns = 'http://www.w3.org/2000/svg';
		var domInstance = document.createElementNS(svgns, 'svg');

		this.setType(shapeType);
		this.setDomInstance(domInstance);
		this.initDefaultDomInstance();
		this.createShapeInstance();

		with (domInstance) {
			style.cursor = 'pointer';
			setAttribute('version', '1.1');
			setAttribute('fill', 'none');
		}

		com.hoperun.util.BaseTool.registerDraggable(this);
		com.hoperun.util.BaseTool.registerMouseEvent(this, [ 'click',
				'dblclick', 'contextmenu' ]);
		com.hoperun.util.BaseTool.addForbiddenPropagation(domInstance);
	},

	setRotate : function(rotate) {
		this._rotate = rotate;
	},

	getRotate : function(rotate) {
		return this._rotate;
	},

	setColor : function(color) {
		this._color = color;
	},

	getColor : function() {
		return this._color;
	},

	setOpacity : function(opacity) {
		this._opacity = opacity;
	},

	getOpacity : function() {
		return this._opacity;
	},

	setShadow : function(shadow) {
		this._shadow = shadow;
	},

	getShadow : function() {
		return this._shadow;
	},

	setBorderWidth : function(borderWidth) {
		this._borderWidth = borderWidth;
	},

	getBorderWidth : function() {
		return this._borderWidth;
	},

	setBorderColor : function(borderColor) {
		this._borderColor = borderColor;
	},

	getBorderColor : function() {
		return this._borderColor;
	},

	setBorderStyle : function(borderStyle) {
		this._borderStyle = borderStyle;
	},

	getBorderStyle : function() {
		return this._borderStyle;
	},

	/**
	 * Abstract method to set shape data.
	 * 
	 * @param data
	 *            the data
	 */
	setShapeData : function(data) {
		com.hoperun.util.BaseTool.throwImplementException(this, "setShapeData");
	},

	/**
	 * Abstract method to get shape data.
	 * 
	 * @returns the data
	 */
	getShapeData : function() {
		com.hoperun.util.BaseTool.throwImplementException(this, "getShapeData");
	},
	
	zoom : function(multiple) {
        this.setZoom(multiple);
        with (this.getDomInstance()) {
        	style.top = this.getTop() * multiple;
        	style.left = this.getLeft() * multiple;
        	style.width = this.getWidth() * multiple;
        	style.height = this.getHeight() * multiple;
        }
        
        this.render();
        
        with (this.getShapeInstance()) {
        	setAttribute('transform', 'scale(' + this.getZoom() + ', ' + this.getZoom() + ')');
        }
		
	},
	
	createShapeInstance : function() {
		com.hoperun.util.BaseTool.throwImplementException(this, "createShapeInstance");
	},

	setData : function(data) {
		if (data.type != null)
			this.setType(data.type);
		if (data.top != null)
			this.setTop(data.top);
		if (data.left != null)
			this.setLeft(data.left);
		if (data.width != null)
			this.setWidth(data.width);
		if (data.height != null)
			this.setHeight(data.height);
		if (data.rotate != null)
			this.setRotate(data.rotate);
		if (data.color != null)
			this.setColor(data.color);
		if (data.opacity != null)
			this.setOpacity(data.opacity);
		if (data.shadow != null)
			this.setShadow(data.shadow);
		if (data.borderWidth != null)
			this.setBorderWidth(data.borderWidth);
		if (data.borderColor != null)
			this.setBorderColor(data.borderColor);
		if (data.borderStyle != null)
			this.setBorderStyle(data.borderStyle);
		
		this.setShapeData(data);

		this.render();
	},

	getData : function() {
		var data = this.getShapeData();
		data.id = this.getId();
		data.type = this.getType();
		data.top = this.getTop();
		data.left = this.getLeft();
		data.width = this.getWidth();
		data.height = this.getHeight();
		data.rotate = this.getRotate();
		data.color = this.getColor();
		data.opacity = this.getOpacity();
		data.shadow = this.getShadow();
		data.borderWidth = this.getBorderWidth();
		data.borderColor = this.getBorderColor();
		data.borderStyle = this.getBorderStyle();

		return data;
	}
});