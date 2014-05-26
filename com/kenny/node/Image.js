/**
 * Image class
 * 
 * @package com.kenny.node
 * @import com.kenny.util.BaseTool,com.kenny.util.NodeCache,com.kenny.event.MouseEvent
 * @author Jian.T
 */
com.kenny.node.Image = function() {
	com.kenny.node.Image.superClass.constructor.call(this);
	this._type = "Image";

	this._domInstance = document.createElement("div");
	this._domInstance.style.position = "absolute";
	this._domInstance.style.zIndex = 1000;
	
	this._bgInstance = document.createElement("img");
	
	this._bgInstance.style.width = "100%";
	this._bgInstance.style.height = "100%";
	this._bgInstance.style.opacity = 0.5;
	this._bgInstance.style.display = 'none';
	this._domInstance.appendChild(this._bgInstance);
	
	this._imgInstance = document.createElement("img");
	this._imgInstance.style.width = "100%";
	this._imgInstance.style.height = "100%";
	this._imgInstance.style.position = "absolute";
	this._domInstance.appendChild(this._imgInstance);
	
	this._winInstance = document.createElement("div");
	this._domInstance.appendChild(this._winInstance);
	
	this.setPosition("absolute");
	
	//Do set DOM information
	this._domInstance.setAttribute('objectType', this._type);
	this._domInstance.id = this._id;
	
	com.kenny.util.NodeCache.add(this.getId(), this);
	
	var self = this;
	this._domInstance.addEventListener('click', function(event){com.kenny.event.MouseEvent.click(event, self);}, true);
	this._domInstance.addEventListener('dblclick', function(event){com.kenny.event.MouseEvent.dblclick(event, self);}, true);
	this._domInstance.addEventListener('contextmenu', function(event){com.kenny.event.MouseEvent.rightclick(event, self);}, true);

	$(this.getDomInstance()).draggable({
		disabled : true
	});
	
	this._flip = {x:0,y:0};
	this._rotation = 0;
	this._zIndex = 1000;
	this._clip = {x:0, y:0};
	
	com.kenny.util.BaseTool.addForbiddenPropagation(this._domInstance);
	com.kenny.util.BaseTool.actsAsAspect(this);
};

com.kenny.util.BaseTool.extend(com.kenny.node.Image,com.kenny.node.Node);

com.kenny.util.BaseTool.augment(com.kenny.node.Image,{

	_top : null,

	_left : null,

	_width : null,
	
	_origWidth : null,

	_height : null,
	
	_origHeight : null,

	_position : null,
	
	_borderWidth : null,
	
	_borderColor : null,
	
	_borderStyle : null,

	_opacity : null,
	
	_flip : null,
	
	_rotation : null,
	
	_clip : null,
	
	_reflection : null,
	
	_shadow : null,

	_src : null,
	
	_zIndex : null,
	
	_isFocusFlag: false,
	
	_borderImage: null,
	
	setBorderImage : function(borderImage) {
		this._borderImage = borderImage;
		this.render();
	},
	
	getBorderImage : function() {
		return this._borderImage;
	},
	
	setTop : function(top) {
		this._top = top;
		this.render();
	},

	getTop : function() {
		return this._top;
	},
	
	setLeft : function(left) {
		this._left = left;
		this.render();
	},

	getLeft : function() {
		return this._left;
	},
	
	setWidth : function(width) {
		this._width = width;
		this.render();
	},

	getWidth : function() {
		return this._width;
	},
	
	setHeight : function(height) {
		this._height = height;
		this.render();
	},

	getHeight : function() {
		return this._height;
	},
	
	setOrigWidth : function(width) {
		this._width = width;
		this._origWidth = width;
		this.render();
	},

	getOrigWidth : function() {
		return this._origWidth;
	},
	
	setOrigHeight : function(height) {
		this._height = height;
		this._origHeight = height;
		this.render();
	},

	getOrigHeight : function() {
		return this._origHeight;
	},

	setPosition : function(position) {
		this._position = position;
		this._domInstance.style.position = this._winInstance.style.position = position;
		this._bgInstance.className = this._imgInstance.className = (position == 'absolute') ? "image-embeddedobjectview-handle" : "";
	},

	getPosition : function() {
		return this._position;
	},
	
	setOpacity : function(opacity) {
		this._domInstance.style.opacity = opacity;
		this._opacity = opacity;
	},
	
	getOpacity : function() {
		return this._opacity;
	},
	
	setBorderWidth : function(borderWidth) {
		this._borderWidth = borderWidth;
		this.render();
	},
	
	getBorderWidth : function() {
		return this._borderWidth;
	},
	
	setBorderColor : function(borderColor) {
		this._winInstance.style.borderColor = borderColor;
		this._borderColor = borderColor;
	},
	
	getBorderColor : function() {
		return this._borderColor;
	},
	
	setBorderStyle : function(borderStyle) {
		this._winInstance.style.borderStyle = borderStyle;
		this._borderStyle = borderStyle;
	},
	
	getBorderStyle : function() {
		return this._borderStyle;
	},
	
	setFlip : function(flip) {
		this._flip = flip;
		this.render();
	},
	
	getFlip : function() {
		return this._flip;
	},
	
	setRotation : function(rotation) {
		this._rotation = rotation;
		this.render();
	},
	
	getRotation : function() {
		return this._rotation;
	},
	
	setClip : function(clip) {
		this._clip = clip;
		this.render();
	},
	
	getClip : function() {
		return this._clip;
	},
	
	setReflection : function(reflection) {
		this._domInstance.style.WebkitBoxReflect = 'below 4px' 
			+ ' -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(0.7, transparent), to(rgba(255, 255, 255, ' 
			+ reflection/160 + ')))';
		this._reflection = reflection;
	},

	getReflection : function() {
		return this._reflection;
	},
	
	setShadow : function(shadow) {
		this._winInstance.style.boxShadow = this._winInstance.style.OBoxShadow = shadow;
		this._winInstance.style.MozBoxShadow = this._winInstance.style.WebkitBoxShadow = shadow;
		this._shadow = shadow;
	},

	getShadow : function() {
		return this._shadow;
	},
	
	setSrc : function(src) {
		this._bgInstance.src = this._imgInstance.src = src;
		this._src = src;
	},

	getSrc : function() {
		return this._src;
	},

	setZIndex : function(zIndex) {
		this._zIndex = zIndex;
		this.render();
	},

	getZIndex : function() {
		return this._zIndex;
	},
	
	render : function() {
		if (this._left == null || this._top == null) return;
		this._domInstance.style.display = 'none';
		if(this._isFocusFlag){
			this._domInstance.style.left = this._left - this._clip.x;
			this._domInstance.style.top = this._top - this._clip.y;
			this._domInstance.style.width = this._origWidth + this._borderWidth*2;
			this._domInstance.style.height = this._origHeight + this._borderWidth*2;
			
			this._winInstance.style.left = this._clip.x;
			this._winInstance.style.top = this._clip.y;
			this._winInstance.style.width = this._width;
			this._winInstance.style.height = this._height;
			
			this._winInstance.style.borderWidth = this._borderWidth;
			
			this._imgInstance.style.width = this._bgInstance.style.width = this._origWidth;
			this._imgInstance.style.height = this._bgInstance.style.height = this._origHeight;
			
			this._imgInstance.style.top = this._imgInstance.style.left = this._bgInstance.style.top = this._bgInstance.style.left = this._borderWidth;
			
			// flip
			this._bgInstance.style.WebkitTransition = this._imgInstance.style.WebkitTransition = '-webkit-transform 1s';
			
			this._bgInstance.style.WebkitTransformOrigin = (this._clip.x + this._width / 2) + 'px ' + (this._clip.y + this._height / 2) + 'px';
			this._bgInstance.style.WebkitTransform = 'perspective(500) ' + 'rotateX(' + this._flip.x + 'deg)' + 'rotateY(' + this._flip.y + 'deg)';
			
			this._imgInstance.style.WebkitTransformOrigin = (this._clip.x + this._width / 2) + 'px ' + (this._clip.y + this._height / 2) + 'px';
			this._imgInstance.style.WebkitTransform = 'perspective(500) ' + 'rotateX(' + this._flip.x + 'deg)' + 'rotateY(' + this._flip.y + 'deg)';
			
			// clip
			//console.info("rect(" + this._clip.y + "px, " + (this._clip.x + this._width) + "px, " + (this._clip.y + this._height) + "px, " + this._clip.x + "px)");
			this._imgInstance.style.clip = "rect(" + this._clip.y + "px, " + (this._clip.x + this._width) + "px, " + (this._clip.y + this._height) + "px, " + this._clip.x + "px)";
			
			// rotation
			this._domInstance.style.OTransformOrigin = (this._clip.x + this._width / 2 + this._borderWidth) + 'px ' + (this._clip.y + this._height / 2 + this._borderWidth) + 'px';
			this._domInstance.style.MozTransformOrigin = (this._clip.x + this._width / 2 + this._borderWidth) + 'px ' + (this._clip.y + this._height / 2 + this._borderWidth) + 'px';
			this._domInstance.style.WebkitTransformOrigin = (this._clip.x + this._width / 2 + this._borderWidth) + 'px ' + (this._clip.y + this._height / 2 + this._borderWidth) + 'px';
			this._domInstance.style.OTransform = 'rotate(' + this._rotation + 'deg)';
			this._domInstance.style.MozTransform = 'rotate(' + this._rotation + 'deg)';
			this._domInstance.style.WebkitTransform = 'rotate(' + this._rotation + 'deg)';
			
			// z-index 
			this._domInstance.style.zIndex = this._zIndex;
			this._bgInstance.style.zIndex = this._zIndex - 3;
			this._imgInstance.style.zIndex = this._zIndex - 2;
			this._winInstance.style.zIndex = this._zIndex - 1;
			
			// border-image
			this._winInstance.style.WebkitBorderImage = this._borderImage;
			this._winInstance.style.MozBorderImage = this._borderImage;
			this._winInstance.style.OBorderImage = this._borderImage;
		}
		else{
			this._domInstance.style.left = this._left;
			this._domInstance.style.top = this._top;
			this._domInstance.style.width = this._origWidth + this._borderWidth*2;
			this._domInstance.style.height = this._origHeight + this._borderWidth*2;
			
			this._winInstance.style.left = 0;
			this._winInstance.style.top = 0;
			this._winInstance.style.width = this._width;
			this._winInstance.style.height = this._height;
			
			this._winInstance.style.borderWidth = this._borderWidth;
			
			this._imgInstance.style.left =  - this._clip.x + this._borderWidth;
			this._imgInstance.style.top = - this._clip.y + this._borderWidth;
			this._imgInstance.style.WebkitTransformOrigin = (this._clip.x + this._width / 2) + 'px ' + (this._clip.y + this._height / 2) + 'px';
			this._imgInstance.style.WebkitTransform = 'perspective(500) ' + 'rotateX(' + this._flip.x + 'deg)' + 'rotateY(' + this._flip.y + 'deg)';
			
			// clip
			this._imgInstance.style.clip = "rect(" + this._clip.y + "px, " + (this._clip.x + this._width) + "px, " + (this._clip.y + this._height) + "px, " + this._clip.x + "px)";
			
			// rotation
			this._domInstance.style.OTransformOrigin = (this._width / 2 + this._borderWidth) + 'px ' + (this._height / 2 + this._borderWidth) + 'px';
			this._domInstance.style.MozTransformOrigin = (this._width / 2 + this._borderWidth) + 'px ' + (this._height / 2 + this._borderWidth) + 'px';
			this._domInstance.style.WebkitTransformOrigin = (this._width / 2 + this._borderWidth) + 'px ' + (this._height / 2 + this._borderWidth) + 'px';
			this._domInstance.style.OTransform = 'rotate(' + this._rotation + 'deg)';
			this._domInstance.style.MozTransform = 'rotate(' + this._rotation + 'deg)';
			this._domInstance.style.WebkitTransform = 'rotate(' + this._rotation + 'deg)';
			
			// border-image
			this._winInstance.style.WebkitBorderImage = this._borderImage;
			this._winInstance.style.MozBorderImage = this._borderImage;
			this._winInstance.style.OBorderImage = this._borderImage;
		}
		// z-index 
		this._domInstance.style.zIndex = this._zIndex;
		this._bgInstance.style.zIndex = this._zIndex - 3;
		this._imgInstance.style.zIndex = this._zIndex - 2;
		this._winInstance.style.zIndex = this._zIndex - 1;
		this._domInstance.style.display = '';
	},
	
	doBlur: function(){
		this._isFocusFlag = false;
		this._bgInstance.style.display = 'none';
		this._imgInstance.style.position = 'absolute';
		
		this._bgInstance.style.width = this._origWidth;
		this._bgInstance.style.height = this._origHeight;
		
		this._imgInstance.style.width = this._origWidth;
		this._imgInstance.style.height = this._origHeight;
		
		this._domInstance.style.cursor = "auto";
		
		com.kenny.util.BaseTool.setStyleProperties(this._imgInstance.style, {
			position: 'absolute'
		});
		
		this.setReflection(this.getReflection());
		
		this.render();
	},
	
	doFocus: function(){
		this._isFocusFlag = true;
		this._bgInstance.style.display = '';
		
		this._domInstance.style.cursor = "move";
		
		com.kenny.util.BaseTool.setStyleProperties(this._imgInstance.style, {
			position: null,
			left: null,
			top: null
		});
		
		this._bgInstance.style.width = "100%";
		this._bgInstance.style.height = "100%";
		
		this._imgInstance.style.width = "100%";
		this._imgInstance.style.height = "100%";
		
		this._domInstance.style.WebkitBoxReflect = '';
		
		this.render();
	},
	
	/**
	 * Do resize visible area.
	 * 
	 * @param x the left of the visible area's position
	 * @param y the top of the visible area's position
	 * @param w the width
	 * @param h the height
	 */
	doResize : function(x, y, w, h) {
		var pt = this._doFindLeftTopPosition(x, y, w, h);
		var left = pt.left, top = pt.top;

		var zoomX = w / this._width, zoomY = h / this._height;
		
		this.setLeft(left);
		this.setTop(top);
		this.setWidth(w);
		this.setHeight(h);
		
		// Update original image width &height
		this._origWidth *= zoomX;
		this._origHeight *= zoomY;
		
		this.render();
	},
	unDoResize : function(left, top, width, height,origWidth,origHeight) {
		
		this.setLeft(left);
		this.setTop(top);
		this.setWidth(width);
		this.setHeight(height);
		
		// Update original image width &height
		this._origWidth = origWidth;
		this._origHeight = origHeight;
		
		this.render();
	},

	/**
	 * Do clip visible area.
	 * 
	 * @param x the left of the visible area's position
	 * @param y the top of the visible area's position
	 * @param w the width
	 * @param h the height
	 */
	doClip : function(x, y, w, h) {
		var pt = this._doFindLeftTopPosition(x, y, w, h);
		var left = pt.left, top = pt.top;

		// Update clip property
		//console.info("before"+this._clip.x+" , "+this._clip.y);
		this._clip.x += left - this.getLeft();
		this._clip.y += top - this.getTop();
		//console.info("after"+this._clip.x+" , "+this._clip.y);
		

		// Record new rectangle information for visible area.
		this.setLeft(x);
		this.setTop(y);
		this.setWidth(w);
		this.setHeight(h);
	},
	undoClip:function(left, top, width, height,clipX,clipY){
		
		//console.info("before undo"+this._clip.x+" , "+this._clip.y);
		this._clip.x = clipX;
		this._clip.y = clipY;
		//console.info("after undo"+this._clip.x+" , "+this._clip.y);
		
		this.setLeft(left);
		this.setTop(top);
		this.setWidth(width);
		this.setHeight(height);
	},

	moveTo: function(dx, dy){
		if(dx!=0 && dy!=0){
			this.setLeft(this.getLeft()+dx);
			this.setTop(this.getTop()+dy);
		}
	},
	
	unMoveTo:function(dx, dy){
		if(dx!=0 && dy!=0){
			this.setLeft(this.getLeft()-dx);
			this.setTop(this.getTop()-dy);
		}
	},
	
	/**
	 * Find the original left-top point position.
	 * 
	 * @param x the left of the visible area's position
	 * @param y the top of the visible area's position
	 * @param w the width
	 * @param h the height
	 */
	_doFindLeftTopPosition : function(x, y, w, h) {
		var isFlipX = Math.abs(this._flip.y / 180) % 2 == 1; // Whether flip on horizon direction
		var isFlipY = Math.abs(this._flip.x / 180) % 2 == 1; // Whether flip on vertical direction
		// Find left-top point position
		var left = x, top = y;

		// When it is flip on horizon
		if (isFlipX) {
			left = this.getLeft()*2 + this.getWidth() - (left + w); // do calculate original left border position
		}
		// When it is flip on vertical
		if (isFlipY) {
			top = this.getTop()*2 + this.getHeight() - (top + h); // do calculate original top border position.
		}
		return { left : left, top : top };
	},

	zoom : function(multiple) {
		//console.info("multiple = "+multiple);

		this._left *=  multiple;
		this._top *=  multiple;
		this._clip.x *=  multiple;
		this._clip.y *=  multiple;
		
		this._origWidth *= multiple;
		this._origHeight *= multiple;
		
		this._bgInstance.style.width = this._origWidth;
		this._bgInstance.style.height = this._origHeight;
		
		this._imgInstance.style.width = this._origWidth;
		this._imgInstance.style.height = this._origHeight;
		
		this._width *= multiple;
		this._height *= multiple;
		
		this._borderWidth *= multiple;
		
		this.render();
	},


	setData : function(data) {
		if (data.top != this._top)
			this.setTop(data.top);
		if (data.left != this._left)
			this.setLeft(data.left);
		if (data.origWidth != this._origWidth)
			this.setOrigWidth(data.origWidth);
		if (data.origHeight != this._origHeight)
			this.setOrigHeight(data.origHeight);
		if (data.width != this._width)
			this.setWidth(data.width);
		if (data.height != this._height)
			this.setHeight(data.height);
		if (data.opacity != this._opacity)
			this.setOpacity(data.opacity);
		if (data.borderWidth != this._borderWidth)
			this.setBorderWidth(data.borderWidth);
		if (data.borderColor != this._borderColor)
			this.setBorderColor(data.borderColor);
		if (data.borderStyle != this._borderStyle)
			this.setBorderStyle(data.borderStyle);
		if (data.flip != this._flip)
			this.setFlip(data.flip);
		if (data.rotation != this._rotation)
			this.setRotation(data.rotation);
		if (data.clip != this._clip)
			this.setClip(data.clip);
		if (data.reflection != this._reflection)
			this.setReflection(data.reflection);
		if (data.shadow != this._shadow)
			this.setShadow(data.shadow);
		if (data.src != this._src)
			if(data.src!=null) this.setSrc(data.src.replaceAll("\\\\","/")); else this.setSrc(null);
		if (data.zIndex != this._zIndex)
			this.setZIndex(data.zIndex);
		if (data.borderImage != this._borderImage)
			this.setBorderImage(data.borderImage);
		
		this.render();
	},

	getData : function() {
		return {
			id : this._id,
			type : this._type,
			top : this._top,
			left : this._left,
			width : this._width,
			height : this._height,
			origWidth : this._origWidth,
			origHeight : this._origHeight,
			opacity : this._opacity,
			borderWidth : this._borderWidth,
			borderColor : this._borderColor,
			borderStyle : this._borderStyle,
			flip : this._flip,
			rotation : this._rotation,
			clip : {
				x: this._clip.x,
				y: this._clip.y
			},
			reflection : this._reflection,
			shadow : this._shadow,
			src : this._src,
			zIndex : this._zIndex,
			borderImage : this._borderImage
		};
	},

	getBgInstance : function() {
		return this._bgInstance;
	},
	
	getImgInstance : function() {
		return this._imgInstance;
	}
});