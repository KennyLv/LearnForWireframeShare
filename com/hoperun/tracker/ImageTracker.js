/**
 * Image Tracker class
 * 
 * @package com.hoperun.tracker
 * @import com.hoperun.util.BaseTool
 * @author lu_feng, Jian.T
 */
com.hoperun.tracker.ImageTracker = function() {
	this._id = com.hoperun.util.BaseTool.uuid();
	this._type = "imageTracker";

	this._domInstance = document.createElement("div");
	this._domInstance.id = this._id;
	this._domInstance.className = "image-tracker-box";
	this._domInstance.style.position = "absolute";
	this._domInstance.style.zIndex = 1;
	
	this._flipInstance = document.createElement("div");
	this._flipInstance.className = "image-tracker-flip";
	this._flipInstance.style.position = "absolute";
	this._flipInstance.style.zIndex = 2000;
	this._flipInstance.style.display = "none";
	this._flipInstance.setAttribute("trackerType", "image");
	
	this._arrowInstance = document.createElement("img");
	this._arrowInstance.src = "images/flip-arrow.png";
	this._arrowInstance.style.position = "absolute";
	this._arrowInstance.style.width = "100%";
	this._arrowInstance.style.height = "100%";
	
	this._flipInstance.appendChild(this._arrowInstance);

	this._activeItem = null;
	
	this._buttons = [];
	this._lines = [];
	this._coord = null;
	
	this._buttonsPos = [];
	this._focusBtnNum = null;
	
	this._flip = { x : 0, y : 0 };
	this._rotation = 0;
	
	this._initChilds();
	this._registerMouseEvent();
	this._registerFlipEvent();
	
	com.hoperun.util.BaseTool.addForbiddenPropagation(this._domInstance);
	com.hoperun.util.BaseTool.addForbiddenPropagation(this._flipInstance);
};

com.hoperun.tracker.ImageTracker.prototype = {

	_domInstance : null,

	_id : null,

	_type : null,

	_trackerType : false, // true:resize | false:clip

	_top : null,

	_left : null,

	_width : null,

	_height : null,

	_activeItem : null,
	
	_dragMode: false,
	
	_zIndex : null,

	_isIgnoreItemFocusEventFlag : false,
	
	_displayFlipArea : false,
	
	getIgnoreItemFocusEventFlag: function(){
		return this._isIgnoreItemFocusEventFlag;
	},
	
	_initChilds : function() {

		// tracker
		var parentNode = this._domInstance;

		// tracker handle
		var rectCursor = [ "nw-resize", "n-resize", "ne-resize", "w-resize", "e-resize", "sw-resize", "s-resize", "se-resize" ];
		for (var i = 0; i < rectCursor.length; i++) {
			var btn = document.createElement("div");
			//parentNode.appendChild(btn);
			btn.className = "image-tracker-box-handle";
			btn.setAttribute("trackerType", "image");
			this._buttons.push(btn);
			btn.style.cursor = rectCursor[i];
			com.hoperun.util.BaseTool.addForbiddenPropagation(btn);
		}

		// tracker ruler line
		var lineClass = [ "hr-ruler-line-h-nw", "hr-ruler-line-v-nw", "hr-ruler-line-h-se", "hr-ruler-line-v-se" ];

		for (var i = 0; i < lineClass.length; i++) {
			var line = document.createElement("div");
			line.className = 'hr-ruler-line ' + lineClass[i];
			this._lines.push(line);
		}

		// tracker coord
		this._coord = document.createElement("div");
		this._coord.className = 'hr-ruler-coord';
	},

	_updateLayout : function() {
		// tracker layout
		var centerX, centerY;
		if(this._dragMode){
			centerX = (this._activeItem.getWidth() + this._activeItem.getBorderWidth()*2 + 4) / 2;
			centerY = (this._activeItem.getHeight() + this._activeItem.getBorderWidth()*2 + 4) / 2;
		}
		else{
			centerX = (this._activeItem.getWidth() + this._activeItem.getBorderWidth()*2 + 4) / 2 + (this._activeItem.getLeft() - this._left);
			centerY = (this._activeItem.getHeight() + this._activeItem.getBorderWidth()*2 + 4) / 2 + (this._activeItem.getTop() - this._top);
		}
		var self = this;
		with (this._domInstance.style) {
			top = self._top - 2;
			left = self._left - 2;
			width = self._width + 2 + self.getActiveItem().getBorderWidth()*2;
			height = self._height + 2 + self.getActiveItem().getBorderWidth()*2;
			
			OTransformOrigin = centerX + 'px ' + centerY + 'px';
			OTransform = 'rotate(' + self._rotation + 'deg)';
			
			MozTransformOrigin = centerX + 'px ' + centerY + 'px';
			MozTransform = 'rotate(' + self._rotation + 'deg)';
			
			WebkitTransformOrigin = centerX + 'px ' + centerY + 'px';
			WebkitTransform = 'rotate(' + self._rotation + 'deg)';
		}
		
		with (this._flipInstance.style) {
			top = self._top - 2;
			left = self._left - 2;
			width = self._width + 2 + self.getActiveItem().getBorderWidth()*2;
			height = self._height + 2 + self.getActiveItem().getBorderWidth()*2;
			
			OTransformOrigin = centerX + 'px ' + centerY + 'px';
			OTransform = 'rotate(' + this._rotation + 'deg)';
			
			MozTransformOrigin = centerX + 'px ' + centerY + 'px';
			MozTransform = 'rotate(' + this._rotation + 'deg)';
			
			WebkitTransformOrigin = centerX + 'px ' + centerY + 'px';
			WebkitTransform = 'rotate(' + this._rotation + 'deg)';
		}
		
		
		this._updateBtnLayout();
		this._updateLineLayout();
		this._updateCoordLayout();
	},

	_updateBtnLayout : function() {
		var angle = (this._rotation / 180) * Math.PI;
		
		var visualX, visualY;
		if(this._dragMode){
			visualX = this._left + this._width / 2;
			visualY = this._top + this._height / 2;
		}
		else{
			var delta = this.getActiveItem().getRotation(); delta = delta == null ? 0: delta;
			var deltaX = this._width / 2 + this._left - this._activeItem.getLeft() - this._activeItem.getWidth()/2;
			var deltaY = this._height / 2 + this._top - this._activeItem.getTop() - this._activeItem.getHeight()/2;
			
			var diffs = com.hoperun.util.BaseTool.convertCoordinateXY(deltaX, deltaY, -delta);
			visualX = diffs.x + this._activeItem.getWidth()/2 + this._activeItem.getLeft();
			visualY = diffs.y + this._activeItem.getHeight()/2 + this._activeItem.getTop();
		}
		var oldX, oldY;
		var w = this._width / 2 + this.getActiveItem().getBorderWidth();
		var h = this._height / 2 + this.getActiveItem().getBorderWidth();
		for (var i = 0; i < this._buttons.length; i++) {
			switch (i) {
			case 0:
				oldX = -w;
				oldY = -h;
				break;
			case 1:
				oldX = 0;
				oldY = -h;
				break;
			case 2:
				oldX = w;
				oldY = -h;
				break;
			case 3:
				oldX = -w;
				oldY = 0;
				break;
			case 4:
				oldX = w;
				oldY = 0;
				break;
			case 5:
				oldX = -w;
				oldY = h;
				break;
			case 6:
				oldX = 0;
				oldY = h;
				break;
			case 7:
				oldX = w;
				oldY = h;
				break;
			}
			
			var newX, newY;
			newX = Math.cos(angle) * oldX - Math.sin(angle) * oldY;
			newY = Math.cos(angle) * oldY + Math.sin(angle) * oldX;

			this._buttonsPos[i] = {
				x : Math.round(visualX + newX),
				y : Math.round(visualY + newY)
			};
			
			this._buttons[i].style.top  = i==0||i==1||i==2 ? this._buttonsPos[i].y + this.getActiveItem().getBorderWidth() - 4 : this._buttonsPos[i].y + this.getActiveItem().getBorderWidth() - 2;
			this._buttons[i].style.left = i==0||i==3||i==5 ? this._buttonsPos[i].x + this.getActiveItem().getBorderWidth() - 4 : this._buttonsPos[i].x + this.getActiveItem().getBorderWidth() - 2;
		}
	},

	_updateLineLayout : function() {
		// tracker ruler line layout
		if (this._focusBtnNum == null) {
			
			this._lines[0].style.top = Math.min(this._buttonsPos[0].y, this._buttonsPos[1].y, this._buttonsPos[2].y, this._buttonsPos[3].y, 
					this._buttonsPos[4].y, this._buttonsPos[5].y, this._buttonsPos[6].y, this._buttonsPos[7].y) - 2 + this.getActiveItem().getBorderWidth();
			this._lines[0].style.left = 0;
			this._lines[0].style.width = getActiveContainer().getWidth();
			this._lines[0].style.height = 0;

			this._lines[1].style.top = 0;
			this._lines[1].style.left = Math.min(this._buttonsPos[0].x, this._buttonsPos[1].x, this._buttonsPos[2].x, this._buttonsPos[3].x, 
					this._buttonsPos[4].x, this._buttonsPos[5].x, this._buttonsPos[6].x, this._buttonsPos[7].x) - 2 + this.getActiveItem().getBorderWidth();
			this._lines[1].style.width = 0;
			this._lines[1].style.height = getActiveContainer().getHeight();

			this._lines[2].style.top = Math.max(this._buttonsPos[0].y, this._buttonsPos[1].y, this._buttonsPos[2].y, this._buttonsPos[3].y, 
					this._buttonsPos[4].y, this._buttonsPos[5].y, this._buttonsPos[6].y, this._buttonsPos[7].y) + 1 + this.getActiveItem().getBorderWidth();
			this._lines[2].style.left = 0;
			this._lines[2].style.width = getActiveContainer().getWidth();
			this._lines[2].style.height = 0;

			this._lines[3].style.top = 0;
			this._lines[3].style.left = Math.max(this._buttonsPos[0].x, this._buttonsPos[1].x, this._buttonsPos[2].x, this._buttonsPos[3].x, 
					this._buttonsPos[4].x, this._buttonsPos[5].x, this._buttonsPos[6].x, this._buttonsPos[7].x) + 1 + this.getActiveItem().getBorderWidth();
			this._lines[3].style.width = 0;
			this._lines[3].style.height = getActiveContainer().getHeight();
		} else {
			var deviationH = (this._focusBtnNum == 5 || this._focusBtnNum == 6 || this._focusBtnNum == 7) ? 1 : -2;
			var deviationV = (this._focusBtnNum == 2 || this._focusBtnNum == 4 || this._focusBtnNum == 7) ? 1 : -2;
			
			this._lines[0].style.top = this._buttonsPos[this._focusBtnNum].y + deviationH + this.getActiveItem().getBorderWidth();
			this._lines[0].style.left = 0;
			this._lines[0].style.width = getActiveContainer().getWidth();
			this._lines[0].style.height = 0;

			this._lines[1].style.top = 0;
			this._lines[1].style.left = this._buttonsPos[this._focusBtnNum].x + deviationV + this.getActiveItem().getBorderWidth();
			this._lines[1].style.width = 0;
			this._lines[1].style.height = getActiveContainer().getHeight();

			this._lines[2].style.display = this._lines[3].style.display = 'none';
		}
	},
	
	_updateCoordLayout : function() {
		// tracker coord layout
		if (this._focusBtnNum == null) {
			this._coord.style.top = com.hoperun.util.BaseTool.convertPixelToNumber(this._buttons[0].style.top) - 20;
			this._coord.style.left = com.hoperun.util.BaseTool.convertPixelToNumber(this._buttons[0].style.left) + 3;
			this._setCoordValue(this._buttonsPos[0].x, this._buttonsPos[0].y);
		} else {
			this._coord.style.top = com.hoperun.util.BaseTool.convertPixelToNumber(this._buttons[this._focusBtnNum].style.top) - 20;
			this._coord.style.left = com.hoperun.util.BaseTool.convertPixelToNumber(this._buttons[this._focusBtnNum].style.left) + 3;
			this._setCoordValue(this._buttonsPos[this._focusBtnNum].x, this._buttonsPos[this._focusBtnNum].y);
		}
	},
	
	_getCenterPosition : function() {
		var x = this._activeItem.getLeft() + this._activeItem.getWidth()/2;
		var y = this._activeItem.getTop() + this._activeItem.getHeight()/2;
		return { x : x, y : y };
	},

	_registerMouseEvent : function() {
		var self = this;
		for (var i = 0; i < this._buttons.length; i++) {
			this._buttons[i].onmousedown = function(evt) {
				
				evt = evt || window.event;
				var obj = evt.srcElement || evt.target;
				var direction = obj.style.cursor.substring(0, obj.style.cursor.indexOf("-resize"));
				switch (direction) {
				case 'nw':
					self._focusBtnNum = 0;
					break;
				case 'n':
					self._focusBtnNum = 1;
					break;
				case 'ne':
					self._focusBtnNum = 2;
					break;
				case 'w':
					self._focusBtnNum = 3;
					break;
				case 'e':
					self._focusBtnNum = 4;
					break;
				case 'sw':
					self._focusBtnNum = 5;
					break;
				case 's':
					self._focusBtnNum = 6;
					break;
				case 'se':
					self._focusBtnNum = 7;
					break;
				}
				self._sendMessage(com.hoperun.util.Observer.MessageType.RULER_DISPLAY, self, {'display':true});
				self.lineShow();
				self.coordShow();
				self._updateLineLayout();
				self._updateCoordLayout();
				
				var x = evt.pageX, y = evt.pageY, w = self.getWidth(), h = self.getHeight(), t = self.getTop(), l = self.getLeft();
				var diffH, diffW;
				
				var mousedownPos = com.hoperun.util.BaseTool.getRelativeCoordinates(evt,self.getActiveItem().getDomInstance().parentNode);
				var centerPosition = self._getCenterPosition();
				mousedownPos.x -= centerPosition.x;
				mousedownPos.y -= centerPosition.y;
				var delta = self.getActiveItem().getRotation(); delta = delta==null? 0: delta;
				self.getActiveItem().getDomInstance().parentNode.onmousemove = function(evt) {
					evt = evt || window.event;
					var movePos = com.hoperun.util.BaseTool.getRelativeCoordinates(evt,self.getActiveItem().getDomInstance().parentNode);
					
					movePos.x -= centerPosition.x;
					movePos.y -= centerPosition.y;
					diffH = y - evt.pageY, diffW = x - evt.pageX;
					var diffs = com.hoperun.util.BaseTool.getOffsetWithDelta(movePos.x, movePos.y, mousedownPos.x, mousedownPos.y, delta);
					
					//Reset diffH and diffW
					diffH = diffs.dy, diffW = diffs.dx;
					
					switch (direction) {
					case 'nw':
						self.setTop(t - diffH);
						self.setLeft(l - diffW);
						self.setWidth(w + diffW);
						self.setHeight(h + diffH);
						break;
					case 'n':
						self.setTop(t - diffH);
						self.setHeight(h + diffH);
						break;
					case 'ne':
						self.setTop(t - diffH);
						self.setWidth(w - diffW);
						self.setHeight(h + diffH);
						break;
					case 'w':
						self.setLeft(l - diffW);
						self.setWidth(w + diffW);
						break;
					case 'e':
						self.setWidth(w - diffW);
						break;
					case 'sw':
						self.setLeft(l - diffW);
						self.setWidth(w + diffW);
						self.setHeight(h - diffH);
						break;
					case 's':
						self.setHeight(h - diffH);
						break;
					case 'se':
						self.setWidth(w - diffW);
						self.setHeight(h - diffH);
						break;
					}
				};

				document.body.onmouseup = function(evt) {
					document.body.onmouseup = null;
					self.getActiveItem().getDomInstance().parentNode.onmousemove = null;
					self._sendMessage(com.hoperun.util.Observer.MessageType.RULER_DISPLAY, self, {'display':false});
					self.lineHide();
					self.coordHide();
					
					self._isIgnoreItemFocusEventFlag = true;
					//Do calculate left and top.
					//The point of the current rotation
					var imageRotationX = self._activeItem.getWidth() / 2 + self._activeItem.getLeft();
					var imageRotationY = self._activeItem.getHeight() / 2 + self._activeItem.getTop();
					
					//relative left and top of the tracker
					var trackerRotationRelativeX = imageRotationX - self._left;
					var trackerRotationRelativeY = imageRotationY - self._top;
					
					//the position of relative to tracker's rotation point
					var trackerCenterRelativeX = (self.getWidth()) / 2 - trackerRotationRelativeX;
					var trackerCenterRelativeY = (self.getHeight()) / 2 - trackerRotationRelativeY;
					
					//Get the point of 
					var targetCenterPos = com.hoperun.util.BaseTool.convertCoordinateXY(trackerCenterRelativeX, trackerCenterRelativeY, delta*(-1));
					targetCenterPos.x += imageRotationX; 
					targetCenterPos.y += imageRotationY;
					
					var targetLeft = self.getLeft() + self._left + (self.getWidth()) / 2 - targetCenterPos.x;
					var targetTop = self.getTop() + self._top + (self.getHeight()) / 2 - targetCenterPos.y;
					
					var data = {
							'x': self.getLeft(),
							'y': self.getTop(),
							'w': self.getWidth(),
							'h': self.getHeight(),
							'dx': -(targetLeft - self.getLeft()),
							'dy': -(targetTop - self.getTop())
						};
					self._trackerType ? self._sendMessage(com.hoperun.util.Observer.MessageType.IMAGE_RESIZE, self, data) 
							: self._sendMessage(com.hoperun.util.Observer.MessageType.IMAGE_CLIP, self, data);
					
					self._isIgnoreItemFocusEventFlag = false;
					
					try{
						evt.preventDefault();
					}catch(e){}
					
					return false;
				};
				return false;
			};
		}
	},

	_registerDraggable : function() {
		var self = this;
		var options = {
			appendTo : '.docs-editor',
			disabled : false,
			distance : 1,
			opacity : 0.35,
			helper: 'clone',
			start : function(event, ui) {
				self._sendMessage(com.hoperun.util.Observer.MessageType.RULER_DISPLAY, self, {'display':true});
				self._dragMode = true;
				self._focusBtnNum = null;
				self.lineShow();
				self.coordShow();
				
				self._updateLineLayout();
				self._updateCoordLayout();
			},
			drag : function(event, ui) {
				//var pos1 = com.hoperun.util.BaseTool.getAbsPostionInContainer(self._activeItem.getWinInstance());
				var pos2 = com.hoperun.util.BaseTool.getAbsPostionInContainer(self._activeItem.getDomInstance().parentNode);
				self._top = ui.position.top - pos2.y + self._activeItem.getClip().y;
				self._left = ui.position.left - pos2.x + self._activeItem.getClip().x;
				self._updateLayout();
				self._lines[2].style.display = self._lines[3].style.display = 'block';
			},
			stop : function(event, ui) {
				self._sendMessage(com.hoperun.util.Observer.MessageType.RULER_DISPLAY, self, {'display':false});
				self._dragMode = false;
				self.lineHide();
				self.coordHide();
			}
		};
		$(this._activeItem.getDomInstance()).draggable(options).data('item', this._activeItem);
	},
	
	_registerFlipEvent : function() {
		var self = this;
		$(this._flipInstance).click(function(e){
			var pos = com.hoperun.util.BaseTool.getRelativeCoordinates(e, com.hoperun.util.BaseTool.findContainer(self.getDomInstance()));
			//console.debug("p.x: " + pos.x + " p.y: " + pos.y);
			var p = {x:pos.x, y:pos.y};
			var center = {
					x:self.getWidth()/2 + self.getActiveItem().getBorderWidth() + self.getLeft(),
					y:self.getHeight()/2 + self.getActiveItem().getBorderWidth() + self.getTop()
			};

			//t
			var a1 = self._buttonsPos[0];
			var b1 = self._buttonsPos[2];
			var c1 = center;
			//l
			var a2 = self._buttonsPos[0];
			var b2 = self._buttonsPos[5];
			var c2 = center;
			//r
			var a3 = self._buttonsPos[2];
			var b3 = self._buttonsPos[7];
			var c3 = center;
			//b
			var a4 = self._buttonsPos[5];
			var b4 = self._buttonsPos[7];
			var c4 = center;
			
			var t = com.hoperun.util.BaseTool.isInsideTriangle(p, a1, b1, c1);
			var l = com.hoperun.util.BaseTool.isInsideTriangle(p, a2, b2, c2);
			var r = com.hoperun.util.BaseTool.isInsideTriangle(p, a3, b3, c3);
			var b = com.hoperun.util.BaseTool.isInsideTriangle(p, a4, b4, c4);
			
			var o = self.getActiveItem().getFlip();
			//console.debug(t ? 'top' : l ? 'left' : r ? 'right' : b ? 'bottom' : 'error');
			var flip = t ? {x:o.x-180, y:o.y} : l ? {x:o.x, y:o.y+180} : r ? {x:o.x, y:o.y-180} : b ? {x:o.x+180, y:o.y} : {x:o.x, y:o.y};
			var data = {'flip' : flip};
			self._sendMessage(com.hoperun.util.Observer.MessageType.IMAGE_SETSTYLE, self.getActiveItem(), data);
			
		});
		
	},

	_setCoordValue : function(x, y) {
		$(this._coord).text('X: ' + x + ' / ' + 'Y: ' + y);
	},

	_sendMessage : function(id, sender, data) {
		var message = new com.hoperun.util.Observer.Message();
		message.id = id;
		message.sender = sender;
		message.data = data;
		com.hoperun.util.Observer.sendMessage(message);
	},

	setTrackerType : function(flag) {
		this._trackerType = flag;
	},

	getTrackerType : function() {
		return this._trackerType;
	},

	setTop : function(top) {
		this._top = com.hoperun.util.BaseTool.convertPixelToNumber(top);
		this._updateLayout();
	},

	getTop : function() {
		return this._top;
	},

	setLeft : function(left) {
		this._left = com.hoperun.util.BaseTool.convertPixelToNumber(left);
		this._updateLayout();
	},

	getLeft : function() {
		return this._left;
	},

	setWidth : function(width) {
		this._width = com.hoperun.util.BaseTool.convertPixelToNumber(width);
		this._updateLayout();
	},

	getWidth : function() {
		return this._width;
	},

	setHeight : function(height) {
		this._height = com.hoperun.util.BaseTool.convertPixelToNumber(height);
		this._updateLayout();
	},

	getHeight : function() {
		return this._height;
	},

	setZIndex : function(zIndex) {
		this._domInstance.style.zIndex = zIndex;
		for (var i = 0; i < this._buttons.length; i++) {
			this._buttons[i].style.zIndex = zIndex + 3;
		}
		for (var i = 0; i < this._lines.length; i++) {
			this._lines[i].style.zIndex = zIndex + 3;
		}
		this._coord.style.zIndex = zIndex + 3;
		this._zIndex = zIndex;
	},

	getZIndex : function() {
		return this._zIndex;
	},

	setActiveItem : function(item) {
		if (this._activeItem && this._activeItem!=item) {
			this.getActiveItem().doBlur();
			this._activeItem.getDomInstance().onmousedown = null;
			$(this._activeItem.getDomInstance()).removeClass("node-moveable");
		}
		
		this.getDomInstance().style.display = 'none';
		
		this._activeItem = item;
		$(this._activeItem.getDomInstance()).addClass("node-moveable");
		this.getActiveItem().doFocus();
		
		var pos = com.hoperun.util.BaseTool.getAbsPostionInContainer(this._activeItem.getDomInstance());
		this._top = this.getActiveItem().getTop();
		this._left = this.getActiveItem().getLeft();
		this._width = this.getActiveItem().getWidth();// + this.getActiveItem().getBorderWidth()*2;
		this._height = this.getActiveItem().getHeight();// + this.getActiveItem().getBorderWidth()*2;
		this._rotation = this._activeItem.getRotation();
		this.setZIndex(this._activeItem.getZIndex() - 2);
		this._registerDraggable();
		
		this._updateLayout();
		
		var container = this.getActiveItem().getDomInstance().parentNode;
		
		if(this.getDomInstance().parentNode != this.getActiveItem().getDomInstance().parentNode) {
			container.appendChild(this.getDomInstance());
			container.appendChild(this._flipInstance);
			
			for (var i = 0; i < this._buttons.length; i++) {
				container.appendChild(this._buttons[i]);
			}
			
			for (var i = 0; i < this._lines.length; i++) {
				container.appendChild(this._lines[i]);
			}
			container.appendChild(this._coord);
		}
	
		this._sendMessage(com.hoperun.util.Observer.MessageType.CONTEXT_FOCUS, this, {});
		this.show();
		
	},

	getActiveItem : function() {
		return this._activeItem;
	},

	// common function
	getId : function() {
		return this._id;
	},

	getType : function() {
		return this._type;
	},

	getDomInstance : function() {
		return this._domInstance;
	},

	isHide : function() {
		return this.getDomInstance().style.display == 'none';
	},

	hide : function() {
		this.btnHide();
		this.lineHide();
		this.coordHide();
		this.setDisplayFlipArea(false);
		this.getDomInstance().style.display = 'none';
		$(this._activeItem.getDomInstance()).draggable("destroy").removeClass("node-moveable");
		this.getActiveItem().doBlur();
	},

	show : function() {
		this.btnShow();
		this.getDomInstance().style.display = 'block';
		this.getActiveItem().getBgInstance().style.display = 'block';
	},
	
	btnHide : function() {
		for (var i = 0; i < this._buttons.length; i++) {
			this._buttons[i].style.display = 'none';
		}
	},

	btnShow : function() {
		this._updateBtnLayout();
		for (var i = 0; i < this._buttons.length; i++) {
			this._buttons[i].style.display = 'block';
		}
	},

	lineHide : function() {
		for (var i = 0; i < this._lines.length; i++) {
			this._lines[i].style.display = 'none';
		}
	},

	lineShow : function() {
		for (var i = 0; i < this._lines.length; i++) {
			this._lines[i].style.display = 'block';
		}
	},

	coordHide : function() {
		this._coord.style.display = 'none';
	},

	coordShow : function() {
		this._coord.style.display = 'block';
	},
	
	setDisplayFlipArea : function(boolean) {
		this._flipInstance.style.display = boolean ? 'block' : 'none';
		this._displayFlipArea = boolean;
	},
	
	getDisplayFlipArea : function() {
		return this._displayFlipArea;
	}
};
