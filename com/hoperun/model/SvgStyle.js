/**
 * Svg Style class
 * @package com.hoperun.node
 * @import com.hoperun.util.BaseTool
 * @author lu_feng
 */
com.hoperun.model.SvgStyle = function(){
	this._id = com.hoperun.util.BaseTool.uuid();
	this._type = "SvgStyle";
};

//TODO: The following should be implement.
com.hoperun.model.SvgStyle.prototype = {
	// Basic style storage
	_bold: false,
	_fontFamily:'Arial',
	_fontSize: 16,
	_italic : false,
	_textDecoration: false,
	_lineThrough: false,
	_color: '#000000',
	_background: null,
	_verticalAlign: null,
	
	setBold: function(_bold){
		this._bold = _bold;
	},
	setFontFamily:function(_fontFamily) {
		this._fontFamily = _fontFamily;
	},
	setFontSize:function(_fontSize) {
		this._fontSize = _fontSize;
	},
	setItalic:function(_italic) {
		this._italic = _italic;
	},
	setTextDecoration:function(_textDecoration) {
		this._textDecoration = _textDecoration;
	},
	setLineThrough:function(_lineThrough) {
		this._lineThrough = _lineThrough;
	},
	setColor:function(_color) {
		this._color = com.hoperun.util.BaseTool.rgb2hex(_color);
	},
	setBackground:function(_background) {
		this._background = com.hoperun.util.BaseTool.rgb2hex(_background);
	},
	setVerticalAlign:function(_verticalAlign) {
		this._verticalAlign = _verticalAlign;
	},
	
	getBold: function(){
		return this._bold;
	},
	getFontSize:function() {
		return this._fontSize;
	},
	getFontFamily:function() {
		return this._fontFamily;
	},
	getItalic:function() {
		return this._italic;
	},
	getTextDecoration:function() {
		return this._textDecoration;
	},
	getLineThrough:function() {
		return this._lineThrough;
	},
	getColor:function() {
		return this._color;
	},
	getBackground:function() {
		return this._background;
	},
	getVerticalAlign:function() {
		return this._verticalAlign;
	},
	getId: function(){
		return this._id;
	},
	setId: function(id){
		this._id = id;
	},
	//Setting style to DOM object
	//TODO: Left others property to be done.
	copyToDom: function(obj, zoom){
		zoom = zoom ? zoom : 1;

		//Bold
		if(this._bold == null){
			obj.removeAttribute('font-weight');
		}
		else{
			obj.setAttribute('font-weight', this._bold ? "bold" : "normal" );
		}
		//Italic
		if(this._italic == null){
			obj.removeAttribute('font-style');
		}
		else{
			obj.setAttribute('font-style', this._italic ? "italic" : "normal" );
		}
		//Font family
		obj.style.fontFamily = this._fontFamily?this._fontFamily:null;
		//Font size
		obj.style.fontSize = (this._fontSize * zoom) + 'pt';
		//console.info('font-size: '+obj.style.fontSize+"   zoom:"+zoom+"   this._fontSize:"+this._fontSize);
		//text decoration, contains underline and line through
		var textDecoration = "";
		if(this._textDecoration){
			textDecoration += " underline";
		}
		if(this._lineThrough){
			textDecoration += " line-through";
		}
		if(textDecoration!=''){
			textDecoration = textDecoration.substring(1);
			obj.setAttribute('text-decoration', textDecoration);
			obj.style.textDecoration = textDecoration;
		} 
		else{
			obj.removeAttribute('text-decoration');
			obj.style.textDecoration = null;
		}
		//Font color
		if(this._color == null){
			obj.removeAttribute('fill', this._color);
		}
		else {
			obj.setAttribute('fill', this._color );
		}
		//Background Color
		if(this._background == null){
			obj.removeAttribute('background-color');
		}
		else {
			obj.setAttribute('background-color', this._background);
		}
		//vertical align
		if(this._verticalAlign == null){
			obj.removeAttribute('vertical-align');
		}
		else {
			obj.setAttribute('vertical-align', this._verticalAlign);
		}
	},
	
	// TODO: Left others property to be done.
	equals: function(obj){
		if(this._bold == obj._bold 
				&& this._fontFamily == obj._fontFamily 
				&& this._fontSize == obj._fontSize
				&& this._italic == obj._italic
				&& this._textDecoration == obj._textDecoration
				&& this._color == obj._color
				&& this._background == obj._background
				&& this._verticalAlign == obj._verticalAlign
				&& this._lineThrough == obj._lineThrough){
			return true;
		}
		return false;
	},
	//Public, return serialization data
	toJSON:function(){
		return JSON.stringify(this.getData());
	},
	// TODO: Left others property to be done.
	getData: function(){
		return {
			id:this._id,
			type:this._type,
			bold: this.getBold(),
			fontFamily: this.getFontFamily(),
			fontSize: this.getFontSize(),
			italic: this.getItalic(),
			textDecoration: this.getTextDecoration(),
			lineThrough: this.getLineThrough(),
			background: this.getBackground(),
			verticalAlign: this.getVerticalAlign(),
			color: this.getColor()
		};
	},
	// TODO: set others property to be done.
	setData: function(data){
		if(data.bold!= null) this.setBold(data.bold);
		if(data.fontFamily!= null) this.setFontFamily(data.fontFamily);
		if(data.fontSize!= null) this.setFontSize(data.fontSize);
		if(data.italic!= null) this.setItalic(data.italic);
		if(data.textDecoration!= null) this.setTextDecoration(data.textDecoration);
		if(data.lineThrough!= null) this.setLineThrough(data.lineThrough);
		if(data.background!= null) this.setBackground(data.background);
		if(data.verticalAlign!= null) this.setVerticalAlign(data.verticalAlign);
		if(data.color!= null) this.setColor(data.color);
	},
	//Clone its style
	clone: function(isCompleteDiffFlag){
	    var objClone;
		if (this.constructor == Object){
			objClone = new this.constructor(); 
		}else{
			objClone = new this.constructor(this.valueOf()); 
		}
		for(var key in this){
			if ( objClone[key] != this[key] ){ 
				if ( typeof(this[key]) == 'object' ){ 
					objClone[key] = this[key].Clone();
				}else{
					objClone[key] = this[key];
				}
			}
		}
		objClone._id = com.hoperun.util.BaseTool.uuid();
		objClone.toString = this.toString;
		objClone.valueOf = this.valueOf;
		return objClone; 
	}
};
//
//var __svgActiveItem = null;
////TODO: to do svg test style setting.
//function doSvgTestSetStyle(evt){
//	var target = evt.target || (window.event.srcElement);
//	var name = target.name;
//	var val = target.getAttribute('val');
//	var style = {};
//	if(name == 'Bold'){
//		style.bold = target.checked;
//	}
//	else if(name == 'Italic'){
//		style.italic = target.checked;
//	}
//	else if(name == 'UnderLine'){
//		style.textDecoration = target.checked;
//	}
//	else if(name == 'ThroughLine'){
//		style.lineThrough = target.checked;
//	}
//	else if(name == 'Color'){
//		style.color = val;
//	}
//	else if(name == 'FontSize'){
//		val = target.value;
//		style.fontSize = val;
//	}
//	else if(name == 'FontFamily'){
//		val = target.value;
//		style.fontFamily = val;
//	}
//	
//	 //Notify shape blur event
//    var msg = new com.hoperun.util.Observer.Message();
//    msg.id = com.hoperun.util.Observer.MessageType.SVG_TEXT_STYLE;
//    msg.sender = __svgActiveItem;
//    msg.data = style;
//    com.hoperun.util.Observer.sendMessage(msg);
//}
//
//if (!com.hoperun.model.SvgTextStyleMenuListener) {
//	com.hoperun.model.SvgTextStyleMenuListener = function() {
//		this._svgActiveItem = null;
//		
//		this.update = function(message) {
//			__svgActiveItem = message.sender;
//			var style = message.data;
//			$('.svg-text-menu-button').each(function(){
//				var name = $(this).attr('name');
//				if(name == 'Bold'){
//					$(this).attr('checked', style.getBold() == null ? false : style.getBold());
//				}
//				else if(name == 'Italic'){
//					$(this).attr('checked', style.getItalic() == null ? false : style.getItalic());
//				}
//				else if(name == 'UnderLine'){
//					$(this).attr('checked', style.getTextDecoration() == null ? false : style.getTextDecoration());
//				}
//				else if(name == 'ThroughLine'){
//					$(this).attr('checked', style.getLineThrough() == null ? false : style.getLineThrough());
//				}
//				else if(name == 'Color'){
//					$(this).attr('checked', false);
//				}
//				else if(name == 'FontSize'){
//					$(this).val(style.getFontSize()==null?'':style.getFontSize());
//				}
//				else if(name == 'FontFamily'){
//					$(this).val(style.getFontFamily()==null?'':style.getFontFamily());
//				}
//			});
//		};
//	};
//	(function(){
//		var listener = new com.hoperun.model.SvgTextStyleMenuListener();
//		com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.SVG_TEXT_STYLE_NOTIFY, listener);
//	})();
//};
