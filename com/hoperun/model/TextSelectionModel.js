/**
 * Text selection model class
 * @package com.hoperun.model
 * @import com.hoperun.util.BaseTool, com.hoperun.util.NodeCache
 * 
 * @author lu_feng
 */
com.hoperun.model.TextSelectionModel = function(from, to, fromOffset, toOffset) {
	this._type = "TextSelectionModel";
	
	this._from = null;
	this._to = null;
	this._fromOffset = null;
	this._toOffset = null;
	
	this._fromObj = null;
	this._toObj = null;
	
	this._anchorOffset = null;
	this._focusOffset = null;
};
com.hoperun.model.TextSelectionModel.prototype = {
	_from:null,
	_to:null,
	_fromOffset:null,
	_toOffset:null,
	
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
	getAnchorOffset: function(){
		return this._anchorOffset;
	},
	getFocusOffset: function(){
		return this._focusOffset;
	},
	
	getFromObj: function(){
		return this._fromObj;
	},
	getToObj: function(){
		return this._toObj;
	},
	setFromObj: function(obj){
		this._fromObj = obj;
	},
	setToObj: function(obj){
		this._toObj = obj;
	},
	setAnchorOffset: function(offset){
		this._anchorOffset = offset;
	},
	setFocusOffset: function(offset){
		this._focusOffset = offset;
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
		this._focusOffset = this._anchorOffset = null;
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
		tmp = this._focusOffset; this._focusOffset = this._anchorOffset; this._anchorOffset = tmp;
	},
	getData: function(){
		return {
			from : this._from,
			to : this._to,
			fromObj : this._fromObj,
			toObj : this._toObj,
			fromOffset : this._fromOffset,
			toOffset : this._toOffset,
			type: 'Text',
			isCollapsed: this.isCollapsed()
		};
	},
	
	setData: function(data){
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
		var cloneObj = new com.hoperun.model.TextSelectionModel();
		cloneObj.setData(this.getData());
		return cloneObj;
	},
	isReverse: function(){
		return (this._to == this._from && this._fromOffset > this._toOffset) || 
        	 (this._to != this._from && this._from.getPage().compareParagraphIndex(this._to, this._from) < 0)
	},
};

com.hoperun.model.TextSelectionModelHelper = {
		
	parseWithLineAndWidth: function(lineDivObj, width){
		var fromOffset = -1, fromObj = null;
		
        var paraDivObj = com.hoperun.util.BaseTool.findElementWithType(lineDivObj, 'Paragraph');
        var paragraphObj = com.hoperun.util.BaseTool.findObjWithId(paraDivObj.id);
		
		var position = 0;
		//var pos = com.hoperun.util.BaseTool.getAbsPostionInContainer(lineDivObj);
		var textSpans = $(lineDivObj).children().filter("span");
		for(var i=0; i< textSpans.length; i++){
			var spanItemObj = textSpans[i];
			position = com.hoperun.util.BaseTool.getAbsPostionInContainer(spanItemObj).x;
			var paddingLeft = spanItemObj.style.paddingLeft!=''? com.hoperun.util.BaseTool.convertPixelToNumber(spanItemObj.style.paddingLeft): 0;
			var spanWidth = spanItemObj.offsetWidth;
			//Belong this span text, however it does not reach text content
			if(width <= position + paddingLeft){
				fromObj = spanItemObj;
				fromOffset = com.hoperun.util.BaseTool.getParentOffsetWithType(spanItemObj, 0, paraDivObj);
				break;
			}
			//Belong to this span
			else if(width < position + paddingLeft + spanWidth){
				fromObj = spanItemObj;
				
				fromOffset = com.hoperun.util.BaseTool.getParentOffsetWithType(spanItemObj, 0, paraDivObj);
				var textStyle = paragraphObj.getTextContainerByOffset(fromOffset + 1);
				com.hoperun.util.TextHelper.changeStyle(textStyle.style);
				fromOffset += com.hoperun.util.TextHelper.getOffsetWithWidth($(spanItemObj).text(), width - position - paddingLeft);
				
				break;
			}
			else if(i == textSpans.length - 1){
				fromObj = spanItemObj;
				fromOffset = com.hoperun.util.BaseTool.getParentOffsetWithType($(spanItemObj).text(), $(spanItemObj).text().length, paraDivObj);
				
				break;
			}
		}
		
		var textSelection = new com.hoperun.model.TextSelectionModel();
        textSelection.setFrom(paragraphObj);
        textSelection.setFromObj(fromObj);
        textSelection.setFromOffset(fromOffset);
        textSelection.doCollapse();
		return textSelection;
	},
	
	parseWindowSelection: function(selection, evt, isShift){
		var textSelection = null;
		//When browser is opera
		if(isShift || (selection.isCollapsed && $.browser.opera)){
			var pages = $('.hr-view-editor');
			var relativePos = com.hoperun.util.BaseTool.getRelativeCoordinates(evt, $('.docs-editor')[0]);
			//console.log("relativePos = "+JSON.stringify(relativePos));
			var pageDivObj = null;
			var lineDivObj = null;
			
			pages.children().filter("div").each(function(idx){
				var pos = com.hoperun.util.BaseTool.getAbsPostionInContainer(this);
				if(pos.y + this.offsetHeight > relativePos.y && !pageDivObj){
					pageDivObj = this;
				}
			});
			
			//Find line Div Object
			if(pageDivObj.hasChildNodes()){
				var paragraphDivObj = pageDivObj.firstChild;
				if(paragraphDivObj.getAttribute('objectType') != 'Paragraph'){
					paragraphDivObj = com.hoperun.util.BaseTool.findNextParagraph(paragraphDivObj);
				}
				var previousParagraph = paragraphDivObj;
				while(paragraphDivObj){
					var position = com.hoperun.util.BaseTool.getAbsPostionInContainer(paragraphDivObj);
					if(position.y + paragraphDivObj.offsetHeight > relativePos.y){
						break;
					}
					previousParagraph = paragraphDivObj;
					paragraphDivObj = com.hoperun.util.BaseTool.findNextParagraph(paragraphDivObj);
				}
				if(!paragraphDivObj){
					paragraphDivObj = previousParagraph;
				}
				
				if(paragraphDivObj){
					lineDivObj = paragraphDivObj.firstChild;
					while(lineDivObj){
						var position = com.hoperun.util.BaseTool.getAbsPostionInContainer(lineDivObj);
						if(position.y + lineDivObj.offsetHeight > relativePos.y){
							break;
						}
						lineDivObj = lineDivObj.nextSibling;
					}
				}
			}
			
			
			if(lineDivObj){
				textSelection = this.parseWithLineAndWidth(lineDivObj, relativePos.x);
			}
			
			return textSelection;
		}
		
		if(selection == null || selection.anchorNode == null){
	       	return textSelection;
	    }
		
		var anchorNode = selection.anchorNode;
        var focusNode = selection.focusNode;
        var anchorOffset = selection.anchorOffset;
        var focusOffset = selection.focusOffset;

        //var isEmpty = selection.anchorNode && selection.anchorNode.nodeValue == null ? true : false;
        
        var from, to, fromOffset, toOffset, fromObj, toObj, fromParaDivObj, toParaDivObj;
        
        //Find the beginning information, default 'to' and 'toOffset' is same like with 'from' parts
        toObj = fromObj = anchorNode.parentNode;
        toParaDivObj = fromParaDivObj = com.hoperun.util.BaseTool.findElementWithType(fromObj, 'Paragraph');
        toOffset = fromOffset = com.hoperun.util.BaseTool.getParentOffsetWithType(fromObj, anchorOffset, toParaDivObj);
        to = from = com.hoperun.util.BaseTool.findObjWithId(fromParaDivObj.id);
        
        //Only when selection is not collapsed to find focus values.
        if(!selection.isCollapsed){
        	toObj = focusNode.parentNode;
        	toParaDivObj = com.hoperun.util.BaseTool.findElementWithType(toObj, 'Paragraph');
            toOffset = com.hoperun.util.BaseTool.getParentOffsetWithType(toObj, focusOffset, toParaDivObj);
            to = com.hoperun.util.BaseTool.findObjWithId(toParaDivObj.id);
        }
        
        textSelection = new com.hoperun.model.TextSelectionModel();
        textSelection.setFrom(from);
        textSelection.setFromObj(fromObj);
        textSelection.setFromOffset(fromOffset);
        textSelection.setAnchorOffset(anchorOffset);
        
        textSelection.setTo(to);
        textSelection.setToObj(toObj);
        textSelection.setToOffset(toOffset);
        textSelection.setFocusOffset(focusOffset);
        //Same paragraph
        /*
        if(to == from && toOffset < fromOffset){
        	textSelection.doSwap();
        }
        else if(to != from){
        	var page = from.getPage();
        	var cmpVal = page.compareParagraphIndex(to, from);
        	if(cmpVal < 0){
        		textSelection.doSwap();
        	}
        }*/
        
        return textSelection;  
	},
	//Default to collapse to begin
	doCollapse: function(selection, collapseToBegin){
		selection.doCollapse(collapseToBegin);
	}
};