/**
 * Style class
 * @package com.kenny.node
 * @import com.kenny.util.BaseTool
 * @author lu_feng
 */
com.kenny.node.Style = function(){
	this._id = com.kenny.util.BaseTool.uuid();
	this._type = "Style";
};

//TODO: The following should be implement.
/** 
background-color: transparent;
color: #000000;
font-family: Arial;
font-size: 11pt;
font-style: normal;
font-weight: bold;
text-decoration: none;
vertical-align: baseline;

font-size:18pt;
font-family:Arial;
color:#000000;
background-color:transparent;
font-weight:bold;
font-style:italic;
text-decoration:none;
vertical-align:baseline;
*/
com.kenny.node.Style.prototype = {
	// Basic style storage
	// TODO: Left others property to be done.
	_bold: false,
	_fontFamily: 'Arial',
	_fontSize: 18,
	_italic : false,
	_textDecoration: false,
	_lineThrough: false,
	_color: '#000000',
	_background: null, // '#FFFFFF',
	_verticalAlign: 'baseline',
	
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
		this._color = com.kenny.util.BaseTool.rgb2hex(_color);
	},
	setBackground:function(_background) {
		this._background = null; //com.kenny.util.BaseTool.rgb2hex(_background);
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
	clearVisibleStyle: function(){
		this.setTextDecoration(false);
		//this.setBackground("#FFF");
		this.setLineThrough(false);
	},
	//Setting style to DOM object
	//TODO: Left others property to be done.
	copyToDom: function(obj){
		com.kenny.util.BaseTool.setStyleProperty(obj.style, 'font-weight', this._bold == null ? this._bold : (this._bold ? "bold" : "normal") );
		com.kenny.util.BaseTool.setStyleProperty(obj.style, 'font-family', this._fontFamily );
		com.kenny.util.BaseTool.setStyleProperty(obj.style, 'font-size', this._fontSize == null ? this._fontSize : this._fontSize );
		com.kenny.util.BaseTool.setStyleProperty(obj.style, 'font-style', this._italic == null ? this._italic : (this._italic ? "italic" : "normal") );
		var textDecoration = "";
		if(this._textDecoration){
			textDecoration += " underline";
		}
		if(this._lineThrough){
			textDecoration += " line-through";
		}
		if(textDecoration!=''){
			textDecoration = textDecoration.substring(1);
		}
		com.kenny.util.BaseTool.setStyleProperty(obj.style, 'text-decoration', textDecoration );
		
		com.kenny.util.BaseTool.setStyleProperty(obj.style, 'color', this._color );
		//com.kenny.util.BaseTool.setStyleProperty(obj.style, 'background-color', this._background );
		com.kenny.util.BaseTool.setStyleProperty(obj.style, 'vertical-align', this._verticalAlign );
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
		//if(data.verticalAlign!= null) this.setVerticalAlign(data.verticalAlign);
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
		if(isCompleteDiffFlag){
			objClone._id = com.kenny.util.BaseTool.uuid();
		}
		
		objClone.toString = this.toString;
		objClone.valueOf = this.valueOf;
		return objClone; 
	}
};