/**
 * AbnormityTriangle class
 * 
 * @package com.kenny.node.shape
 * @import com.kenny.util.BaseTool, com.kenny.util.ShapeHelper
 * @author Jian.T
 */
com.kenny.shape.AbnormityTriangle = function() {
	this._id = com.kenny.util.BaseTool.uuid();
	this._domInstance = com.kenny.util.ShapeHelper.createAbnormityTriangle({
		id : this._id,
		top : this._top,
		left : this._left,
		strokeWidth : this._strokeWidth,
		strokeColor : this._strokeColor,
		strokeDasharray : this._strokeDasharray,
		angle : this._angle,
		zoomX : this._zoomX,
		zoomY : this._zoomY,
		zoomAngle : this._zoomAngle,
		sideLength : this._sideLength,
		sideLength2 : this._sideLength2,
		color : this._color,
		opacity : this._opacity,
		fontSize : this._fontSize,
		fontFamily : this._fontFamily,
		fontStyle : this._fontStyle,
		fontWeight : this._fongWeight,
		fontColor : this._fontColor,
		textDecoration : this._textDecoration,
		fontLinethrough : this._fontLinethrough,
		fontUnderline : this._fontUnderline,
		fontContent : this._fontContent,
		zIndex : this._zIndex
	});
	this._type = "AbnormityTriangle";
	this._domInstance.setAttribute("objectType", this._type);
	com.kenny.util.NodeCache.add(this.getId(), this);
	
	var self = this;
	this._domInstance.addEventListener('click', function(event){com.kenny.event.MouseEvent.click(event, self);}, true);
	this._domInstance.addEventListener('dblclick', function(event){com.kenny.event.MouseEvent.dblclick(event, self);}, true);
	this._domInstance.addEventListener('contextmenu', function(event){com.kenny.event.MouseEvent.rightclick(event, self);}, true);
	$(this.getDomInstance()).draggable({disabled : true});
	
	com.kenny.util.BaseTool.addForbiddenPropagation(this._domInstance);
	com.kenny.util.BaseTool.actsAsAspect(this);
};

com.kenny.shape.AbnormityTriangle.prototype = {

	_domInstance : null,

	_id : null,

	_type : null,

	_top : null,
	
	_left : null,

	_strokeWidth : 0,

	_strokeColor : '#68a22f',
	
	_opacity : 1,

	_strokeDasharray : '0, 0',
	
	_angle : 90,

	_zoomX : 1,

	_zoomY : 1,
	
	_zoomAngle : 0,
	
	_sideLength : 100,
	
	_sideLength2 : 100,
	
	_color : '#68a22f',

	_fontSize : 12,

	_fontFamily : 'Verdana',

	_fontStyle : 'normal',

	_fontWeight : 'normal',

	_fontColor : '#000000',

	_textDecoration : 'normal',

	_fontLinethrough : false,

	_fontUnderline : false,
	
	_fontContent : '',
	
	_zIndex : 1000,
	
	setTop : function(top) {
		this._domInstance.style.top = top + "px";
		this._top = top;
	},

	getTop : function() {
		return this._top;
	},
	
	setLeft : function(left) {
		this._domInstance.style.left = left + "px";
		this._left = left;
	},

	getLeft : function() {
		return this._left;
	},

	setStrokeWidth : function(strokeWidth) {
		this._strokeWidth = strokeWidth;
		this._resize();
	},

	getStrokeWidth : function() {
		return this._strokeWidth;
	},

	setStrokeColor : function(strokeColor) {
		this._strokeColor = strokeColor;
		this._resize();
	},

	getStrokeColor : function() {
		return this._strokeColor;
	},
	
	setOpacity : function(opacity) {
		this._opacity = opacity;
		this._resize();
	},

	getOpacity : function() {
		return this._opacity;
	},
	
	setStrokeDasharray : function(strokeDasharray) {
		this._strokeDasharray = strokeDasharray;
		this._resize();
	},

	getStrokeDasharray : function() {
		return this._strokeDasharray;
	},
	
	setAngle : function(angle) {
		this._angle = angle;
		this._resize();
	},

	getAngle : function() {
		return this._angle;
	},

	setZoomX : function(zoomX) {
		this._zoomX = zoomX;
		this._resize();
	},

	getZoomX : function() {
		return this._zoomX;
	},

	setZoomY : function(zoomY) {
		this._zoomY = zoomY;
		this._resize();
	},

	getZoomY : function() {
		return this._zoomY;
	},
	
	setZoomAngle : function(zoomAngle) {
		this._zoomAngle = zoomAngle;
		this._resize();
	},

	getZoomAngle : function() {
		return this._zoomAngle;
	},
	
	setSideLength : function(sideLength) {
		this._sideLength = sideLength;
		this._resize();
	},

	getSideLength : function() {
		return this._sideLength;
	},

	setSideLength2 : function(sideLength2) {
		this._sideLength2 = sideLength2;
		this._resize();
	},

	getSideLength2 : function() {
		return this._sideLength2;
	},

	setColor : function(color) {
		this._color = color;
		this._resize();
	},

	getColor : function() {
		return this._color;
	},

	setFontSize : function(fontSize) {
		this._fontSize = fontSize;
		this._resize();
	},

	getFontSize : function() {
		return this._fontSize;
	},

	setFontFamily : function(fontFamily) {
		this._fontFamily = fontFamily;
		this._resize();
	},

	getFontFamily : function() {
		return this._fontFamily;
	},

	setFontStyle : function(fontStyle) {
		this._fontStyle = fontStyle;
		this._resize();
	},

	getFontStyle : function() {
		return this._fontStyle;
	},

	setFontWeight : function(fontWeight) {
		this._fontWeight = fontWeight;
		this._resize();
	},

	getFontWeight : function() {
		return this._fontWeight;
	},

	setFontColor : function(fontColor) {
		this._fontColor = fontColor;
		this._resize();
	},

	getFontColor : function() {
		return this._fontColor;
	},

	setTextDecoration : function() {
		var textDecoration = "";
		if (this._fontUnderline) {
			textDecoration += " underline";
		}
		if (this._fontLinethrough) {
			textDecoration += " line-through";
		}
		if (textDecoration != '') {
			textDecoration = textDecoration.substring(1);
		}
		this._textDecoration = textDecoration;
		this._resize();
	},

	getTextDecoration : function() {
		return this._textDecoration;
	},

	setFontLinethrough : function(fontLinethrough) {
		this._fontLinethrough = fontLinethrough;
		this.setTextDecoration();
	},

	getFontLinethrough : function() {
		return this._fontLinethrough;
	},

	setFontUnderline : function(fontUnderline) {
		this._fontUnderline = fontUnderline;
		this.setTextDecoration();
	},

	getFontUnderline : function() {
		return this._fontUnderline;
	},
	
	setFontContent : function(fontContent) {
		this._fontContent = fontContent;
		this._resize();
	},

	getFontContent : function() {
		return this._fontContent;
	},
	
	getWidth : function() {
		return com.kenny.util.BaseTool.convertPixelToNumber(this._domInstance.style.width);
	},

	getHeight : function() {
		return com.kenny.util.BaseTool.convertPixelToNumber(this._domInstance.style.height);
	},
	
	setZIndex : function(zIndex) {
		this._domInstance.style.zIndex = zIndex;
		this._zIndex = zIndex;
		this._resize();
	},

	getZIndex : function() {
		return this._zIndex;
	},

	edit : function() {

		var text = this._fontContent;
		var editObj = $("<div></div>").attr({
			id : this._id + '_edit_value',
			contenteditable : 'true'
		}).html(text);

		editObj.css({
			'width' : $(this._domInstance).width(),
			'height' : $(this._domInstance).height(),
			'word-break' : 'break-all',
			'word-wrap' : 'break-word',
			'overflow' : 'hidden',
			'white-space' : 'nowrap',
			'color' : 'black',
			'z-index' : 9999,
			'position' : 'fixed',
			'background-color' : this._color,
			'font-size' : this._fontSize,
			'font-family' : this._fontFamily
		});

		var padding = $(this._domInstance).height() - editObj.height();

		editObj.css({
			'padding-top' : padding / 2,
			'padding-bottom' : padding / 2
		});

		$(this._domInstance).append(editObj);

		editObj.keypress(function(e) {
			if (e.keyCode == 13 && e.shiftKey == false) {
				e.preventDefault();
				this.blur();
			}
		});

		editObj.blur(function() {
			var value = editObj.text();
			var shape = self;
			shape.setFontContent(value);
			shape.setFontSize(com.kenny.util.BaseTool.convertPixelToNumber(editObj.css('font-size')));
			shape.setFontFamily(editObj.css('font-family'));
			editObj.remove();
			editObj = null;

			var message = new com.kenny.util.Observer.Message();
			message.id = com.kenny.util.Observer.MessageType.UPDATE_SLIDE_LEFTSIDE;
			message.sender = this;
			message.data = {};
			com.kenny.util.Observer.sendMessage(message);

			return false;
		});

		editObj.focus();

	},

	_resize : function() {
		this._domInstance = com.kenny.util.ShapeHelper
				.updateAbnormityTriangle(this._domInstance, {
					top : this._top,
					left : this._left,
					strokeWidth : this._strokeWidth,
					strokeColor : this._strokeColor,
					strokeDasharray : this._strokeDasharray,
					angle : this._angle,
					zoomX : this._zoomX,
					zoomY : this._zoomY,
					zoomAngle : this._zoomAngle,
					sideLength : this._sideLength,
					sideLength2 : this._sideLength2,
					color : this._color,
					opacity : this._opacity,
					fontSize : this._fontSize,
					fontFamily : this._fontFamily,
					fontStyle : this._fontStyle,
					fontWeight : this._fontWeight,
					fontColor : this._fontColor,
					textDecoration : this._textDecoration,
					fontContent : this._fontContent,
					zIndex : this._zIndex
				});
	},
	
	zoom : function(multiple) {
		this._top = this._top * multiple;
		this._left = this._left * multiple;
		this._strokeWidth = this._strokeWidth * multiple;
		this._sideLength = this._sideLength * multiple;
		this._sideLength2 = this._sideLength2 * multiple;
		this._fontSize = this._fontSize * multiple;
		this._resize();
	},
	
	toPng : function() {
		var pngUrl = null;
		var xmlHttp = null;
		try {
			xmlHttp = new XMLHttpRequest();
		} catch (e) {
			try {
				xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {
				try {
					xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
				} catch (e) {
					xmlHttp = false;
				}
			}
		}
		xmlHttp.onreadystatechange = function() {
			if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
				pngUrl = xmlHttp.responseText;
			}
		};
		var url = "http://127.0.0.1:8080//MobileOffice/svg2pngservice";
		xmlHttp.open("POST", url, false);
		xmlHttp.setRequestHeader("Method", "POST " + url + " HTTP/1.1");
		xmlHttp.setRequestHeader("Content-Type",
				"application/x-www-form-urlencoded");
		var data = "name=" + encodeURIComponent(this._id + ".png") + "&svg="
				+ encodeURIComponent(this._domInstance.innerHTML);
		xmlHttp.send(data);
		return pngUrl;
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
		if (data.top != this._top)
			this.setTop(data.top);
		if (data.left != this._left)
			this.setLeft(data.left);
		if (data.strokeWidth != this._strokeWidth)
			this._strokeWidth = data.strokeWidth;
		if (data.strokeColor != this._strokeColor)
			this._strokeColor = data.strokeColor;
		if (data.opacity != this._opacity)
			this.opacity = data.opacity;
		if (data.strokeDasharray != this._strokeDasharray)
			this._strokeDasharray = data.strokeDasharray;
		if (data.angle != this._angle)
			this._angle = data.angle;
		if (data.zoomX != this._zoomX)
			this._zoomX = data.zoomX;
		if (data.zoomY != this._zoomY)
			this._zoomY = data.zoomY;
		if (data.zoomAngle != this._zoomAngle)
			this._zoomAngle = data.zoomAngle;
		if (data.sideLength != this._sideLength)
			this._sideLength = data.sideLength;
		if (data.sideLength2 != this._sideLength2)
			this._sideLength2 = data.sideLength2;
		if (data.color != this._color)
			this._color = data.color;
		if (data.fontSize != this._fontSize)
			this._fontSize = data.fontSize;
		if (data.fontFamily != this._fontFamily)
			this._fontFamily = data.fontFamily;
		if (data.fontStyle != this._fontStyle)
			this._fontStyle = data.fontStyle;
		if (data.fontWeight != this._fontWeight)
			this._fontWeight = data.fontWeight;
		if (data.fontColor = data.fontColor)
			this._fontColor = data.fontColor;
		if (data.textDecoration != this._textDecoration)
			this._textDecoration = data.textDecoration;
		if (data.fontContent != this._fontContent)
			this._fontContent = data.fontContent;
		if (data.zIndex != this._zIndex)
			this._zIndex = data.zIndex;
		this._resize();
	},
	
	getData : function() {
		return {
			id : this._id,
			type : this._type,
			top : this._top,
			left : this._left,
			strokeWidth : this._strokeWidth,
			strokeColor : this._strokeColor,
			opacity : this._opacity,
			strokeDasharray : this._strokeDasharray,
			angle : this._angle,
			zoomX : this._zoomX,
			zoomY : this._zoomY,
			zoomAngle : this._zoomAngle,
			sideLength : this._sideLength,
			sideLength2 : this._sideLength2,
			color : this._color,
			fontSize : this._fontSize,
			fontFamily : this._fontFamily,
			fontStyle : this._fontStyle,
			fontWeight : this._fontWeight,
			fontColor : this._fontColor,
			textDecoration : this._textDecoration,
			fontContent : this._fontContent,
			zIndex : this._zIndex
		};
	},

	getDomInstance : function() {
		return this._domInstance;
	},

	clone : function() {
		var cloneObj = new com.kenny.shape.AbnormityTriangle();
		cloneObj.setData(this.getData());
		return cloneObj;
	}
};