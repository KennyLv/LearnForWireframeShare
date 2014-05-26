/**
 * Line class
 * @package com.kenny.model
 * @author lu_feng
 */
com.kenny.model.BasicModel = function(left, top, width, height) {
	this._type = "BasicModel";
	
	this._left   = left;
	this._top    = top;
	this._width  = width;
	this._height = height;
};
com.kenny.model.BasicModel.prototype = {
	_width:null,
	_height:null,
	_left:null,
	_top:null,
	
	setLeft:function(left){
		this._left = left;
	},
	setHeight:function(height){
		this._height = height;
	},
	setTop:function(top){
		this._top = top;
	},
	setWidth:function(width){
		this._width = width;
	},
	
	getLeft:function(){
		return this._left;
	},
	getTop:function(){
		return this._top;
	},
	getWidth:function(){
		return this._width;
	},
	getHeight:function(){
		return this._height;
	},
	
	clone: function(){
		var cloneObj = new com.kenny.model.BasicModel(this._left, this._top, this._width, this._height);
		return cloneObj;
	}
};

com.kenny.model.BasicModelHelper = {
	isEquals: function(model1, model2){
		return (model1.getLeft() == model2.getLeft()) 
			&& (model1.getTop() == model2.getTop())
			&& (model1.getWidth() == model2.getWidth())
			&& (model1.getHeight() == model2.getHeight());
	},
	
	isEqualsList: function(list1, list2){
		//Null
		if(!list1 && !list2){
			return true;
		}
		//Only one is Null
		if(!list1 || !list2){
			return false;
		}
		//Not same length
		if(list1.length != list2.length){
			return false;
		}
		//Validate the value 
		for(var i=0; i<list1.length; i++){
			if(!this.isEquals(list1[i],list2[i])){
				return false;
			}
		}
		//Finally take consider it same
		return true;
	},
	
	addToList: function(list, model){
		for(var i=0; i<list.length; i++){
			if(this.isEquals(list[i], model)){
				return i;
			}
		}
		list.push(model);
		return -1;
	},
	
	cloneList: function(list){
		var cloneLst = [];
		for(var i=0; i<list.length; i++){
			cloneLst.push(list[i].clone());
		}
		return cloneLst;
	}
};