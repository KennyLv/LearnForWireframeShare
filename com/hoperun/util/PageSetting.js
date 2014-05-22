/**
 * PageSetting class
 * 
 * @package com.hoperun.util
 * @author xuliyu
 */
if (!com.hoperun.util.PageSetting) {
	com.hoperun.util.PageSetting = {
		_width : 500,
		
		_height : 500,
		
		_margin : {all:"10px"},
		
		_border : {all:{all:'1px solid #212121'}},
		
		setWidth:function(width){
			this._width = width;
		},
		
		setHeight:function(height){
			this._height = height;
		},
		
		setMargin:function(margin){
			this._margin = margin;
		},
		
		setBorder:function(border){
			this._border = border;
		},
		
		getWidth:function(){
			return this._width;
		},
		
		getHeight:function(){
			return this._height;
		},
		
		getMargin:function(){
			return this._margin;
		},
		
		getBorder:function(){
			return this._border;
		}
		
	};
}
