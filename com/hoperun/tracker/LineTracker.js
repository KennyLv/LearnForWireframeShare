/**
 * Line Tracker class
 * 
 * @package com.hoperun.tracker
 * @import com.hoperun.util.BaseTool
 * @author Jian.T
 */
com.hoperun.tracker.LineTracker = function() {
	this._id = com.hoperun.util.BaseTool.uuid();
	this._className = "com.hoperun.tracker.LineTracker";
	this._type = "lineTracker";

	this._domInstanceBtn1 = document.createElement("div");
	this._domInstanceBtn2 = document.createElement("div");
	this._init();
	this._registerMouseEvent();
	this._activeItem = null;
};

com.hoperun.tracker.LineTracker.prototype = {

	_id : null,

	_type : null,

	_domInstanceBtn1 : null,

	_domInstanceBtn2 : null,

	_className : null,

	_btn1Top : null,

	_btn1Left : null,

	_btn2Top : null,

	_btn2Left : null,

	_activeItem : null,

	_zIndex : null,
	
	_init : function() {
		this._domInstanceBtn1.style.cursor = "move";
		this._domInstanceBtn2.style.cursor = "move";
		this._domInstanceBtn1.className = "line-tracker-box-handle";
		this._domInstanceBtn2.className = "line-tracker-box-handle";
	},

	_changeLayout : function() {
		this._domInstanceBtn1.style.top = this._btn1Top;
		this._domInstanceBtn1.style.left = this._btn1Left;
		this._domInstanceBtn2.style.top = this._btn2Top;
		this._domInstanceBtn2.style.left = this._btn2Left;
	},

	_registerMouseEvent : function() {
		
		var self = this;
		
		this._domInstanceBtn1.onmousedown = function(evt) {
			evt = evt || window.event;
			var x1 = evt.pageX, y1 = evt.pageY, top = self.getBtn1Top(), left = self.getBtn1Left();
			var x2, y2;
			document.body.onmousemove = function(evt) {
				evt = evt || window.event;
				x2 = evt.pageX, y2 = evt.pageY;
				self.setBtn1Top(top + (y2 - y1));
				self.setBtn1Left(left + (x2 - x1));
			};
			document.body.onmouseup = function(evt) {
				document.body.onmousemove = null;
				document.body.onmouseup = null;

				var shapeResizeMsg = new com.hoperun.util.Observer.Message();
				shapeResizeMsg.id = com.hoperun.util.Observer.MessageType.SHAPE_RESIZE;
				shapeResizeMsg.sender = self;
				shapeResizeMsg.data = {'x1':(x2 - x1), 'y1':(y2 - y1)};
				com.hoperun.util.Observer.sendMessage(shapeResizeMsg);
			};
			return false;
		};
		
		this._domInstanceBtn2.onmousedown = function(evt) {
			evt = evt || window.event;
			var x1 = evt.pageX, y1 = evt.pageY, top = self.getBtn2Top(), left = self.getBtn2Left();
			var x2, y2;
			document.body.onmousemove = function(evt) {
				evt = evt || window.event;
				x2 = evt.pageX, y2 = evt.pageY;
				self.setBtn2Top(top + (y2 - y1));
				self.setBtn2Left(left + (x2 - x1));;
				
			};
			document.body.onmouseup = function(evt) {
				document.body.onmousemove = null;
				document.body.onmouseup = null;

				var shapeResizeMsg = new com.hoperun.util.Observer.Message();
				shapeResizeMsg.id = com.hoperun.util.Observer.MessageType.SHAPE_RESIZE;
				shapeResizeMsg.sender = self;
				shapeResizeMsg.data = {'x2':(x2 - x1), 'y2':(y2 - y1)};
				com.hoperun.util.Observer.sendMessage(shapeResizeMsg);
			};
			return false;
		};
	},

	_changeShapeListener : function() {
		var options = {
			zIndex : 4003,
			opacity : 0.35,
			disabled : false,
			distance : 5,
			appendTo : '.docs-editor',
			helper : 'clone',
			start : function(event, ui) {
			}
		};
		$(this._activeItem.getDomInstance()).draggable(options).data('item', this._activeItem);;
	},

	setZIndex : function(zIndex) {
		this._domInstanceBtn1.style.zIndex = zIndex;
		this._domInstanceBtn2.style.zIndex = zIndex;
		this._zIndex = zIndex;
	},

	getZIndex : function() {
		return this._zIndex;
	},
	
	// Left Button
	setBtn1Top : function(btn1Top) {
		this._btn1Top = btn1Top;
		this._changeLayout();
	},

	getBtn1Top : function() {
		return this._btn1Top;
	},
	
	setBtn1Left : function(btn1Left) {
		this._btn1Left = btn1Left;
		this._changeLayout();
	},

	getBtn1Left : function() {
		return this._btn1Left;
	},
	
	// Right Button
	setBtn2Top : function(btn2Top) {
		this._btn2Top = btn2Top;
		this._changeLayout();
	},

	getBtn2Top : function() {
		return this._btn2Top;
	},
	
	setBtn2Left : function(btn2Left) {
		this._btn2Left = btn2Left;
		this._changeLayout();
	},

	getBtn2Left : function() {
		return this._btn2Left;
	},
	
	setActiveItem : function(item) {
		if (this._activeItem) {
			this._activeItem.getDomInstance().onmousedown = null;
			$(this._activeItem.getDomInstance()).removeClass("node-moveable");
		}
		this._activeItem = item;
		$(this._activeItem.getDomInstance()).addClass("node-moveable");
		
		this._btn1Top = this._activeItem.getY1() + this._activeItem.getTop() + this._activeItem.getStrokeWidth()/2 - 4;
		this._btn1Left = this._activeItem.getX1() + this._activeItem.getLeft() + this._activeItem.getStrokeWidth()/2 - 4;
		this._btn2Top = this._activeItem.getY2() + this._activeItem.getTop() + this._activeItem.getStrokeWidth()/2 - 4;
		this._btn2Left = this._activeItem.getX2() + this._activeItem.getLeft() + this._activeItem.getStrokeWidth()/2 - 4;

		this._changeShapeListener();
		this._changeLayout();

		var message = new com.hoperun.util.Observer.Message();
		message.id = com.hoperun.util.Observer.MessageType.CONTEXT_FOCUS;
		message.sender = this;
		com.hoperun.util.Observer.sendMessage(message);

	},
	
	getActiveItem : function() {
		return this._activeItem;
	},
	
	getId : function() {
		return this._id;
	},
	
	getType : function() {
		return this._type;
	},
	
	getClassName : function() {
		return this._className;
	},
	
	isHide : function() {
		return this.getDomInstanceBtn1().style.display == 'none'
				&& this.getDomInstanceBtn2().style.display == 'none';
	},
	
	hide : function() {
		this.getDomInstanceBtn1().style.display = 'none';
		this.getDomInstanceBtn2().style.display = 'none';
	},
	
	show : function() {
		this.getDomInstanceBtn1().style.display = 'block';
		this.getDomInstanceBtn2().style.display = 'block';
	},

	getDomInstanceBtn1 : function() {
		return this._domInstanceBtn1;
	},

	getDomInstanceBtn2 : function() {
		return this._domInstanceBtn2;
	}
};
