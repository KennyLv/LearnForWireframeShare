/**
 * Text style container util class
 * @package com.kenny.util
 * @import com.kenny.util.NodeCache, com.kenny.util.BaseTool
 * @author lu_feng
 */
com.kenny.util.TextStyleContainerUtils = {
	_items: null,
	
	getAll: function(){
		var styles = this._items;
		if(!styles){
			styles = [];
			this._items = styles;
		}
		return styles;
	},
	
	clearCache: function(){
		this._items = [];
	},
	
	register : function(style, notIgnoreSameFlag){
		notIgnoreSameFlag = notIgnoreSameFlag == null? false : notIgnoreSameFlag;
		var styles = this.getAll();
		if(styles.indexOf(style) == -1){
			if(notIgnoreSameFlag == false){
				for(var i=0; i<styles.length; i++){
					if(styles[i].equals(style)){
						style.setId(styles[i].getId());
						return;
					}
				}
			}
			styles.push(style);	
		}
	},
	
	getById: function(id){
		var style = null, styles = this.getAll();
		for(var i=0; i <styles.length; i++){
			if(styles[i].getId() == id){
				style = styles[i]; 
				break;;
			}
		}
		return style;
	},
	
	getAllData: function(){
		var data = [], styles = this.getAll();
		
		for(var i=0; i <styles.length; i++){
			data.push(styles[i].getData());
		}
		
		return data;
	},
	
	setAllData: function(data, notIgnoreSameFlag){
		for(var i=0; i <data.length; i++){
			var style = new com.kenny.node.Style();
			style.setData(data[i]);
			style.setId(data[i].id);
			this.register(style, notIgnoreSameFlag);
		}
	},
	
	
	setAllDataForSvgStyle: function(data, isNeedAllFlag){
		if(isNeedAllFlag){
			var styles = this.getAll();
			for(var i=0; i <data.length; i++){
				var style = new com.kenny.model.SvgStyle();
				style.setData(data[i]);
				style.setId(data[i].id);
				styles.push(style);	
			}
		}
		else{
			for(var i=0; i <data.length; i++){
				var style = new com.kenny.model.SvgStyle();
				style.setData(data[i]);
				style.setId(data[i].id);
				this.register(style);
			}
		}
		
	}
};