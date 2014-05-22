/**
 * TextBox class
 * 
 * @package com.hoperun.node.shape
 * @import com.hoperun.util.BaseTool, com.hoperun.render.SvgTextRender, com.hoperun.model.SvgTextSelectionModel
 * @author Feng.Lu
 */
com.hoperun.node.shape.TextBox = function() {
	this._id = com.hoperun.util.BaseTool.uuid();
	this._domInstance = com.hoperun.util.ShapeHelper.createTextBox({
		id : this._id,
		top : this._top,
		left : this._left,
		width : this._width,
		height : this._height,
		
		strokeWidth : this._strokeWidth,
		strokeColor : this._strokeColor,
		strokeDasharray : this._strokeDasharray,
		radii : this._radii,
		color : this._color,
		opacity : this._opacity,
		
		zIndex : this._zIndex
	});
	this._type = "Shape_TextBox";
	this._domInstance.setAttribute("objectType", this._type);
	//this._domInstance.setAttribute("tabindex", '2');
	this._domInstance.style.overflow = 'hidden';
	this._imgInstanceDot = document.createElement("img");
	this._imgInstanceDot.src = "images/cleardot.gif";
	this._imgInstanceDot.className = "hr-embeddedobjectview-handle";
	this._domInstance.appendChild(this._imgInstanceDot);
	
//	this._cancelEditDiv = document.createElement("img");
//	this._cancelEditDot = "images/cleardot.gif";
//	this._cancelEditDiv.className = "hr-embeddedobjectview-handle";
//	this._cancelEditDiv.style.position = 'absolute';
//	this._cancelEditDiv.style.left = '-5000';
//	this._cancelEditDiv.style.top = '-5000';
//	this._cancelEditDiv.style.width = '10000';
//	this._cancelEditDiv.style.height = '10000';
//	
//	this._domInstance.appendChild(this._cancelEditDiv);
	
	com.hoperun.util.BaseTool.addForbiddenPropagation(this._domInstance);
	com.hoperun.util.NodeCache.add(this.getId(), this);

	this._registerListener();
	
	this._activeSelection = new com.hoperun.model.SvgTextSelectionModel();
	
	this._render = new com.hoperun.render.SvgTextRender(this);
	
	this._texts = {
		text: "",
		styles: [
		   {
			   offset: 0,
			   style: this._render._getDefaultStyle()
		   }
		]
	};
	$(this.getDomInstance()).draggable({ disabled : true });
	
	com.hoperun.util.BaseTool.actsAsAspect(this);
};

com.hoperun.node.shape.TextBox.prototype = {

	_render: null,
	
	_domInstance : null,
	
	_texts: null,
	
	_id : null,

	_type : null,

	_top : null,
	
	_left : null,
	
	_width : 300,

	_height : 100,

	_strokeWidth : 1,

	_strokeColor : "#000000",
	
	_strokeDasharray : "0, 0",

	_color : '#FFF',
	
	_opacity : 1,
	
	_zIndex : 1000,

	_radii: 5,
	
	_textAlign: 'left',
	
	__multiple: 1,
	
	
	_activeSelection: null,
	
	_isEditingFlag : false,
	
	setActiveSelection: function(selection){
		this._activeSelection = selection;
	},
	
	getActiveSelection: function(){
		return this._activeSelection;
	},
	
	////////////////////////////////////////////////////////////////////////////
	/////////////// Begin: relation to words editor ////////////////////////////
	getKeyBoardDomInstance: function(){
		return this._domInstance;
	},
	
	findPreviousCharacterInfo: function(paraIdx, offset){
		return this._render.findPreviousCharacterInfo(paraIdx, offset);
	},
	
	findNextCharacterInfo: function(paraIdx, offset, containSpecialFlag){
		containSpecialFlag = containSpecialFlag == null? true: containSpecialFlag;
		return this._render.findNextCharacterInfo(paraIdx, offset, containSpecialFlag);
	},
	
	setTextByOffset: function(paraIdx, offset, val){
		return this._render.setTextByOffset(paraIdx, offset, val);
	},
	
	changeStyle: function(from, to, fromOffset, toOffset, style){
		return this._render.changeStyle(from, to, fromOffset, toOffset, style);
	},
	
	recoverStyle: function(from, to, fromOffset, toOffset, recoverStyleData){
		return this._render.recoverStyle(from, to, fromOffset, toOffset, recoverStyleData);
	},
	
	changeAllStyle: function(style){
		return this._render.changeAllStyle(style);
	},
	
	getAllStyleData: function(){
		return this._render.getAllStyleData();
	},
	
	recoverAllStyle: function(allStyles){
		return this._render.recoverAllStyle(allStyles);
	},
	
	deleteText: function(from, to, fromOffset, toOffset){
		return this._render.deleteText(from, to, fromOffset, toOffset);
	},
	
	resetTexts: function(texts){
		return this._render.resetTexts(texts);
	},
	
	getStyleWithOffset: function(paraIdx, offset){
		return this._render.getStyleWidthOffset(paraIdx, offset);
	},
	
	getItemWidthWithOffset: function(paraIdx, offset){
		return this._render.getItemWidthWithOffset(paraIdx, offset);
	},
	
	getItemWithOffset: function(paraIdx, offset){
		return this._render.getItemWithOffset(paraIdx, offset);
	},
	/////////////// End: Relation to words editor //////////////////////////////
	////////////////////////////////////////////////////////////////////////////
	
	enableDot : function(flag) {
		if (flag) {
			this._imgInstanceDot.style.display = '';
			this._imgInstanceDot.style.cursor = 'default';
			this._imgInstanceDot.style.width = this._width;
			this._imgInstanceDot.style.height = this._height;
		} else {
			this._imgInstanceDot.style.display = 'none';
		}
	},

	_resizeDot: function(){
		this._imgInstanceDot.style.width = this._width;
		this._imgInstanceDot.style.height = this._height;
	},
	
	beginEdit: function(evt){
		this._isEditingFlag = true;
		$(this._domInstance).draggable("destroy").removeClass("node-moveable");
		this.enableDot(false);
		
		//Send the keyboard command message
		var message = new com.hoperun.util.Observer.Message();
		message.id = com.hoperun.util.Observer.MessageType.SVG_KEYBOARD_FOCUS;
		message.sender = this;
		message.data = {
			evt: evt
		};
		com.hoperun.util.Observer.sendMessage(message);

		//Hide tracker
		var hidetracker = new com.hoperun.util.Observer.Message();
		hidetracker.id = com.hoperun.util.Observer.MessageType.SHAPE_TRACKER_HIDE;
		hidetracker.sender = this;
		com.hoperun.util.Observer.sendMessage(hidetracker);
		
		//Context active
		var message = new com.hoperun.util.Observer.Message();
		message.id = com.hoperun.util.Observer.MessageType.CONTEXT_ACTIVE;
		message.sender = this;
		com.hoperun.util.Observer.sendMessage(message);
	},
	endEdit: function(){
		this._isEditingFlag = false;
		this.enableDot(true);
	},
	getIsEditingFlag: function(){
		return this._isEditingFlag;
	},
	_registerListener: function(){
		var self = this;
		$(this._imgInstanceDot).bind('mouseup', function(evt){
		}).bind('mouseup', function(evt){
		}).bind('click', function(e){
			var obj = $(this);
			setTimeout(function(){
				if(!obj.hasClass('noClick')){
					com.hoperun.event.MouseEvent.click(e, self);
					self._imgInstanceDot.style.cursor = 'move';
				}
				setTimeout(function(){
					obj.removeClass('noClick');
				}, 200);
			}, 200);
		}).bind('dblclick', function(e){
			$(this).addClass('noClick');
			self.beginEdit(e);
		}).bind('contextmenu', function(e){com.hoperun.event.MouseEvent.rightclick(e, self);});
	},
	
	render: function(){
		if(this._top !=null && this._left != null){
			
			this._render.render(this._domInstance.getElementsByTagName("svg")[0].getElementsByTagName("text")[0], this._width, this.__multiple, this._strokeWidth);
		}
	},

	setTop : function(top) {
		this._domInstance.style.top = top + "px";
		this._top = top;
		this.render();
	},

	getTop : function() {
		return this._top;
	},
	
	setLeft : function(left) {
		this._domInstance.style.left = left + "px";
		this._left = left;
		this.render();
	},

	getLeft : function() {
		return this._left;
	},

	setWidth : function(width) {
		this._width = width;
		this._resize();
	},

	getWidth : function() {
		return this._width;
	},

	setHeight : function(height, flag) {
		this._height = height;
		this._resize(flag);
	},

	getHeight : function() {
		return this._height;
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
	
	setStrokeDasharray : function(strokeDasharray) {
		this._strokeDasharray = strokeDasharray;
		this._resize();
	},

	getStrokeDasharray : function() {
		return this._strokeDasharray;
	},

	setRadii : function(radii) {
		this._radii = radii;
		this._resize();
	},

	getRadii : function() {
		return this._radii;
	},
	
	setColor : function(color) {
		this._color = color;
		this._resize();
	},

	getColor : function() {
		return this._color;
	},
	
	setOpacity : function(opacity) {
		this._opacity = opacity;
		this._resize();
	},

	getOpacity : function() {
		return this._opacity;
	},
	
	setZIndex : function(zIndex) {
		this._domInstance.style.zIndex = zIndex;
		this._zIndex = zIndex;
		this._resize();
	},

	getZIndex : function() {
		return this._zIndex;
	},

	setTextAlign: function(align){
		this._textAlign = align;
	},
	
	getTextAlign: function(){
		return this._textAlign;
	},
	_resize : function(flag) {
		this._resizeDot();
		this._domInstance = com.hoperun.util.ShapeHelper.updateTextBox(
				this._domInstance, {
					top : this._top * this.__multiple,
					left : this._left * this.__multiple,
					width : this._width * this.__multiple,
					height : this._height * this.__multiple,
					strokeWidth : this._strokeWidth * this.__multiple,
					strokeColor : this._strokeColor,
					radii : this._radii * this.__multiple,
					color : this._color,
					strokeDasharray : this._strokeDasharray,
					opacity : this._opacity,
					zIndex : this._zIndex,
					noRefreshText : flag
				});
		this.render();
	},
	
	zoom : function(multiple) {
		this.__multiple = multiple;
		this._resize();
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
		if (data.top != null)
			this.setTop(data.top);
		if (data.left != null)
			this.setLeft(data.left);
		if (data.width != null)
			this._width = data.width;
		if (data.height != null)
			this._height = data.height;
		if (data.zIndex != null)
			this._zIndex = data.zIndex;
		if (data.strokeWidth != null)
			this._strokeWidth = data.strokeWidth;
		if (data.strokeColor != null)
			this._strokeColor = data.strokeColor;
		if (data.strokeDasharray != null)
			this._strokeDasharray = data.strokeDasharray;
		if (data.radii != null)
			this._radii = data.radii;
		if (data.color != null)
			this._color = data.color;
		if (data.opacity != null)
			this._opacity = data.opacity;
		if (data.textAlign != null){
			this._textAlign = data.textAlign;
		}
		if(data.styles && data.styles.length>0) {
			com.hoperun.util.TextStyleContainerUtils.clearCache();
			com.hoperun.util.TextStyleContainerUtils.setAllDataForSvgStyle(data.styles, true);
		}
		
		if(data.texts){
			var styles = [];
			for(var i=0; i<data.texts.styles.length; i++){
				styles.push({
					offset: data.texts.styles[i].offset,
					style: com.hoperun.util.TextStyleContainerUtils.getById(data.texts.styles[i].style).clone()
				});
			}
			this._texts = {
				text: data.texts.text, //data.texts.text.replaceAll("\n\r", "\n"),
				styles: styles
			};
		}
		
		
		//_texts
		this._resize();
	},
	
	getData : function() {
		com.hoperun.util.TextStyleContainerUtils.clearCache();
		
		var textStyles = [];
		for(var i=0; i<this._texts.styles.length; i++){
			var stylesData = this._texts.styles[i];
			stylesData.style.setId(com.hoperun.util.BaseTool.uuid());
			com.hoperun.util.TextStyleContainerUtils.register(stylesData.style);
			textStyles.push({
				offset: stylesData.offset,
				style: stylesData.style.getId()
			});
		}
		
		var styles = com.hoperun.util.TextStyleContainerUtils.getAllData();
		
		//Paragraph
		var texts = {
			text: this._texts.text,
			styles: textStyles
		};
//		
//		for(var i=0; i<this._texts.length; i++){
//			var textstyles = [];
//			var textItem = this._texts[i];
//			for(var j=0; j<textItem.styles.length; j++){
//				textstyles.push({
//					offset: textItem.styles[j].offset,
//					style: textItem.styles[j].style.getId()
//				});
//			}
//			texts.push({
//				text: textItem.text,
//				styles: textstyles
//			});
//		}
		//console.info("length:"+texts.text.length+ "          text:" +texts.text);
		return {
			id : this._id,
			type : this._type,
			top : this._top,
			left : this._left,
			width : this._width,
			height : this._height,
			zIndex : this._zIndex,
			textAlign : this._textAlign,

			strokeWidth : this._strokeWidth,
			strokeColor : this._strokeColor,
			strokeDasharray : this._strokeDasharray,
			radii : this._radii,
			color: this._color,
			opacity : this._opacity,
			
			texts: texts,
			styles: styles
		};
	},
	
	getDomInstance : function() {
		return this._domInstance;
	},
	
	clone : function() {
		var cloneObj = new com.hoperun.shape.TextBoxNew();
		cloneObj.setData(this.getData());
		return cloneObj;
	},
	
	setSelected: function(){
		
	},
	
	isInActiveFlag: function(){
		
	},
	
	getBaseType : function() {
		return 'Shape';
	}
};