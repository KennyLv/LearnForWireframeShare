/**
 * Hashtable class
 * @package com.kenny.util
 * @author xuliyu
 */
com.kenny.util.Hashtable = function(){
	this._hash = {};
};
com.kenny.util.Hashtable.prototype = {
	_hash:null,
	
	add:function(key,value){
		if(typeof(key)!="undefined"){
			if(this.contains(key)==false){
				this._hash[key]=typeof(value)=="undefined"?null:value;
					return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	},
	
    remove:function(key){
		delete this._hash[key];
	},
	
    count:function(){
		var i=0;
		for(var k in this._hash)
			i++;
		return i;
	},
	
    items:function(key){
		return this._hash[key];
	},
    
	contains:function(key){
		return typeof(this._hash[key])!= "undefined";
	},
	
    clear:function(){
		for(var k in this._hash)
			delete this._hash[k];
	}
};
