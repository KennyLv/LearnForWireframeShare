/**
 * Svg Text selection model class
 * @package com.hoperun.model
 * @import com.hoperun.util.BaseTool, com.hoperun.util.NodeCache
 * 
 * @author lu_feng
 */
com.hoperun.model.SvgTextSelectionModel = function(activeItem, from, to, fromOffset, toOffset, fromObj, toObj) {
	this._type = "SvgTextSelectionModel";

	this._activeItem = activeItem;
	this._from = from;
	this._to = to;
	
	this._fromOffset = fromOffset;
	this._toOffset = toOffset;
	
	this._fromObj = fromObj;
	this._toObj = toObj;
};
com.hoperun.model.SvgTextSelectionModel.prototype = {
	_from:null,
	_to:null,
	
	_fromOffset:null,
	_toOffset:null,
	
	_fromObj:null,
	_toObj:null,
	
	setActiveItem: function(activeItem){
		this._activeItem = activeItem;
	},
	
	setFrom: function(from){
		this._from = from;
	},
	setTo: function(to){
		this._to = to;
	},
	
	setFromOffset: function(fromOffset){
		this._fromOffset = fromOffset;
	},
	setToOffset: function(toOffset){
		this._toOffset = toOffset;
	},
	
	setFromObj: function(obj){
		this._fromObj = obj;
	},
	setToObj: function(obj){
		this._toObj = obj;
	},
	
	getFrom: function(){
		return this._from;
	},
	getTo: function(){
		return this._to;
	},
	
	getFromOffset: function(){
		return this._fromOffset;
	},
	getToOffset: function(){
		return this._toOffset;
	},

	getFromObj: function(){
		return this._fromObj;
	},
	getToObj: function(){
		return this._toObj;
	},
	
	getActiveItem: function(){
		return this._activeItem;
	},
	
	//Public Method
	//Clear selection data
	clear: function(){
		this.setData({});
	},
	//Whether is collapsed
	isCollapsed: function(){
		return this._from == this._to && this._fromOffset == this._toOffset;
	},
	//
	doCollapse: function(){
		this._to = this._from;
		this._toObj = this._fromObj;
		this._toOffset = this._fromOffset;
	},
	
	getType: function(){
		return "Text";
	},
	//Swap from and to
	doSwap: function(){
		var tmp;
		tmp = this._to; this._to = this._from; this._from = tmp;
		tmp = this._toObj; this._toObj = this._fromObj; this._fromObj = tmp;
		tmp = this._toOffset; this._toOffset = this._fromOffset; this._fromOffset = tmp;
	},
	getData: function(){
		return {
			activeItem: this._activeItem,
			from : this._from,
			to : this._to,
			fromOffset : this._fromOffset,
			toOffset : this._toOffset,
			fromObj: this._fromObj,
			toObj: this._toObj,
			type: 'Text',
			isCollapsed: this.isCollapsed()
		};
	},
	
	setData: function(data){
		this._activeItem = data.activeItem;
		this._from = data.from;
		this._to = data.to;
		this._fromObj = data.fromObj;
		this._toObj = data.toObj;
		this._fromOffset = data.fromOffset;
		this._toOffset = data.toOffset;
	},
	
	toJSON: function(){
		return JSON.stringify(this.getData());
	},
	
	clone: function(){
		var cloneObj = new com.hoperun.model.SvgTextSelectionModel();
		cloneObj.setData(this.getData());
		return cloneObj;
	}
};

com.hoperun.model.SvgTextSelectionModelHelper = {
		
	parseWindowSelection: function(selection, evt){
		var textSelection = null;
		//console.info('Current selection: anchorOffset:'+selection.anchorOffset+' FocusOffsset='+selection.focusOffset);
		var fromObj = selection.anchorNode;
        var toObj = selection.focusNode;
        var fromOffset = selection.anchorOffset;
        var toOffset = selection.focusOffset;

        //TODO: take consider all data is belong to same text box.
        var divObj = com.hoperun.util.BaseTool.findElementWithType(fromObj, 'TextBox');
        var activeItem = com.hoperun.util.BaseTool.findObjWithId(divObj.id);

        //the offset in the paragraph
        fromOffset = com.hoperun.util.BaseTool.getParentOffsetWithTypeForSvg(fromObj, fromOffset);
        toOffset = com.hoperun.util.BaseTool.getParentOffsetWithTypeForSvg(toObj, toOffset);
        
        //Find the index of paragraph
        from = com.hoperun.util.BaseTool.getParagraphNumberWithTypeForSvg(fromObj, fromOffset);
        to = com.hoperun.util.BaseTool.getParagraphNumberWithTypeForSvg(toObj, toOffset);
        
        textSelection = new com.hoperun.model.SvgTextSelectionModel(activeItem, from, to, fromOffset, toOffset, fromObj, toObj);

        if(from == to && toOffset < fromOffset || to < from){
        	textSelection.doSwap();
        }
        return textSelection;  
	},
	//Default to collapse to begin
	doCollapse: function(selection, collapseToBegin){
		selection.doCollapse(collapseToBegin);
	}
};