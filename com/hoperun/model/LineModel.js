/**
 * Line class
 * @package com.hoperun.model
 * @import com.hoperun.util.BaseTool
 * @author lu_feng
 */
com.hoperun.model.LineModel = function(paragraph, indentStyle, rowIndex) {
	this._type = "Line";
	this._groupId = this._id = com.hoperun.util.BaseTool.uuid();
	
	this._paragraph = paragraph;
	this._rowIndex = rowIndex;
	this._indentStyle = indentStyle;
	
	this._createDomInstance();
	this._domInstance.id = this._id;
	this._domInstance.attributes['objectType'] = this._type;
	
	this._lineContentInstance = document.createElement("div");
	//com.hoperun.util.NodeCache.add(this.getId(), this);
};
com.hoperun.model.LineModel.prototype = {
	_domInstance: null,
	_type: null,
	_id: null,
	_data: null,
	
	_lineContentInstance: null,
	_lineSpanInstance: null,
	
	_createDomInstance: function(){
		this._domInstance = document.createElement("div");
		this._domInstance.setAttribute('objectType', this._type);
		this._domInstance.id = this._id;
		this._domInstance.style.position = 'relative';
		if(this._rowIndex == 0){
			com.hoperun.util.BaseTool.setStyleProperty(this._domInstance.style, 'padding-left', this._indentStyle.firstLine+"px");
		}
		else{
			com.hoperun.util.BaseTool.setStyleProperty(this._domInstance.style, 'padding-left', this._indentStyle.left+"px");
		}
		
		com.hoperun.util.BaseTool.setStyleProperty(this._domInstance.style, 'padding-right', this._indentStyle.right+"px");
		
		this._domInstance.className = "hr-line-view-content";

		this._lineSpanInstance = this._domInstance;
		
		this._childDOMInstance = [];
		/*******
		//com.hoperun.util.BaseTool.setStyleProperty(lineObj.style, 'height', height+'px');
		
		//Based on paragraph settings
		com.hoperun.util.BaseTool.setStyleProperty(this._domInstance.style, 'text-align', 'left');
		com.hoperun.util.BaseTool.setStyleProperty(this._domInstance.style, 'direction', 'ltr');
		
		this._lineContentInstance = document.createElement("div");
		this._lineContentInstance.className = "hr-line-view-content";
		com.hoperun.util.BaseTool.setStyleProperty(this._lineContentInstance.style, 'padding-top', '0pt');
		
		this._lineSpanInstance = document.createElement("span");
		this._lineSpanInstance.className = "hr-inline-block hr-line-view-text-block";
		com.hoperun.util.BaseTool.setStyleProperty(this._lineSpanInstance.style, 'padding-left', '0px');
		com.hoperun.util.BaseTool.setStyleProperty(this._lineSpanInstance.style, 'width', '800px');
		
		this._domInstance.appendChild(this._lineContentInstance);
		this._lineContentInstance.appendChild(this._lineSpanInstance);
		***/
	},
	
	_updateDom: function(){
		this._lineSpanInstance.innerHTML = ""; //Clear children
		com.hoperun.util.BaseTool.setStyleProperty(this._domInstance.style, 'height', this.getHeight()+"px");
		if(this.getPaddingTop()) com.hoperun.util.BaseTool.setStyleProperty(this._domInstance.style, 'padding-top', this.getPaddingTop()+"px");
		
		var items = this._data.data;
		this._lineSpanInstance.setAttribute("noVisibleData", ''+(this._data.offset == 0));
		for(var j=0;j<items.length;j++){
			var lineItemObj = items[j];
			var spanObj = document.createElement("span");
			spanObj.style.position = 'relative';
			spanObj.style.zIndex = 40;
			//spanObj.style.display = 'block';
			
			spanObj.setAttribute('objectType', 'SPAN');
			spanObj.getType = function(){
				return "SPAN";
			};
			lineItemObj.style.copyToDom(spanObj);
			if(lineItemObj.paddingLeft && lineItemObj.paddingLeft!=0){
				com.hoperun.util.BaseTool.setStyleProperty(spanObj.style, 'padding-left', lineItemObj.paddingLeft+"px");
			}
			spanObj.innerHTML = lineItemObj.text.filterHTML();
			this._lineSpanInstance.appendChild(spanObj);
			this._childDOMInstance.push(spanObj);
//			
//			spanObj.onmouseup = function (evt) {
//				var selObj = window.getSelection();
//	    		var selRange = selObj.getRangeAt(0);
//	    		var startOffset = selRange.startOffset;
//	    		
//	    		var message = new com.hoperun.util.Observer.Message();
//                message.id = com.hoperun.util.Observer.MessageType.CURSOR_SHOW;
//                message.sender = spanObj;
//                message.data = {startOffset: startOffset, line:self, index:index};
//                com.hoperun.util.Observer.sendMessage(message);
//	                
//            	message = new com.hoperun.util.Observer.Message();
//                message.id = com.hoperun.util.Observer.MessageType.KEYBOARD_ADD;
//                message.sender = spanObj;
//                message.data = {startOffset: startOffset, line:self};
//                com.hoperun.util.Observer.sendMessage(message);
//	            
//	        };
		}
	},
	getDomInstanceByOffset: function(offset){
		var domObj = null, beginOffset=0;
		var items = this._data.data;
		for(var j=0;j<items.length;j++){
			beginOffset += items[j].text.length;
			domObj = this._childDOMInstance[j];
			if(beginOffset >= offset){ 
				break;
			}
		}
		return domObj;
	},
	
	//Public, set line data
	setData: function(data){
		this._data = data;
		this._updateDom();
	},
	//Public, return line height
	getHeight: function() {
		return this._data.height;
	},
	//Public, return line padding top
	getPaddingTop: function() {
		return this._data.paddingTop;
	},
	//Public, return ID
	getId: function(){
		return this._id;
	},
	//Public, return Type
	getType: function(){
		return this._type;
	},	
	//Public, remove DOM from document
	removeFrom: function(parentNode){
		this._domInstance.parentNode.removeChild(this._domInstance);
	},
	//Public, convert object to JSON data
	toJSON: function(){
		return JSON.stringify(this.getData());
	},
	//Public, convert JSON data to object
	toObject: function(json){
		this.setData(JSON.parse(json));
	},
	//Public, return serialization data
	getData: function(){
		var data = {};
		data.height = this.getHeight();
		data.data = [];
		for(var i=0; i<this._data.data.length; i++){
			data.data.push({text:this._data.data[i].text, style:this._data.data[i].style.getData()});
		}
		return data;
	},
	//Public, return DOM instance
	getDomInstance: function(){
		return this._domInstance;
	}
};