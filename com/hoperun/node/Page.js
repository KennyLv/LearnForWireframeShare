/**
 * Page class
 * @package com.hoperun.node
 * @import com.hoperun.util.BaseTool,com.hoperun.util.NodeCache,com.hoperun.util.TextStyleContainerUtils
 * @author lu_feng
 */
com.hoperun.node.Page = function(){
	com.hoperun.node.Page.superClass.constructor.call(this);
	this._type = "Page";
	
	//paragraph stuff
	this._paragraphContainer = [];
	this._pageDomObjs = [];
	com.hoperun.util.NodeCache.add(this.getId(), this);
	
	//Absolute items
	this._imageContainer = [];
	this._shapeContainer = [];
	this._tableContainer = [];
	this._pageItemsContainer = [];
	this._childNodes = [];
	
	this._contentPadding = {
		right: 96,
		top: 60,
		bottom: 20,
		left: 96
	};
	
	this._documentSettings = {
		header: {
			align: "left",
			text: "This is Header"
		},
		footer: {
			align: "right",
			text: "This is Footer"
		}
	};
	
	//Notified document is created
	var message = new com.hoperun.util.Observer.Message();
    message.id = com.hoperun.util.Observer.MessageType.DOCUMENT_CREATE;
    message.sender = this;
    com.hoperun.util.Observer.sendMessage(message);
    
    //active selection
    this._tempActiveSelection = null;
    this._headerHeight = 0;
    this._footerHeight = 0;
    //TODO: Save the active item object
    setActiveContainer(this);
    
    //Refresh header fotter height to used height
    this._updateHeaderFooterHeight();
    
    //
    this._tempActiveStyle = null;
    
    com.hoperun.util.BaseTool.addForbiddenPropagation(this._domInstance);
    com.hoperun.util.BaseTool.actsAsAspect(this);
};

com.hoperun.util.BaseTool.extend(com.hoperun.node.Page,com.hoperun.node.Node);

com.hoperun.util.BaseTool.augment(com.hoperun.node.Page,{

	_width:816,
	_height:1056,
	
	_contentPadding:null,
	
	_paragraphContainer: null,
	_pageDomObjs: null,
	
	_documentSettings: null, 
	
	getActiveStyle: function(){
		return this._tempActiveStyle;
	},
	
	setActiveStyle: function(style){
		this._tempActiveStyle = style.clone();
	},
	
	setActiveStyleData: function(data){
		this._tempActiveStyle.setData(data);
	},
	
	_activeCursorPosition: {
		x: 0,
		y: 0
	},
	
	getDocumentSettings: function(){
		return this._documentSettings;
	},
	
	getHeaderHeight: function(){
		return this._headerHeight;
	},
	getFooterHeight: function(){
		return this._footerHeight;
	},
	_createHeader : function(){
		var headerDivObj = null;
		if(this._documentSettings && this._documentSettings.header){
			headerDivObj = document.createElement("div");
			//headerRuler = document.createElement("div");
			headerDivObj.className = 'hr-page-header header-footer';
			//headerRuler.id = 'page-ruler-h-bar';
			headerDivObj.setAttribute('objectType', 'header');
			headerDivObj.style.textAlign = this._documentSettings.header.align;
			
			var contentDivObj = document.createElement("div");
			contentDivObj.style.padding = '10px 20px';
			contentDivObj.className = 'page-ruler-h-title';
			contentDivObj.innerHTML = this._documentSettings.header.text;
			
			//headerDivObj.appendChild(headerRuler);
			headerDivObj.appendChild(contentDivObj);
		}
		return headerDivObj;
	},
	_createFooter : function(){
		var footerDivObj = null;
		if(this._documentSettings && this._documentSettings.footer){
			footerDivObj = document.createElement("div");
			footerDivObj.className = 'hr-page-bottom header-footer';
			footerDivObj.setAttribute('objectType', 'footer');
			footerDivObj.style.textAlign = this._documentSettings.footer.align;
			
			var contentDivObj = document.createElement("div");
			contentDivObj.style.padding = '10px 20px';
			contentDivObj.innerHTML = this._documentSettings.footer.text;
			
			footerDivObj.appendChild(contentDivObj);
		}
		return footerDivObj;
	},
	
	_updateHeaderFooterHeight: function(){
		this._headerHeight = this._documentSettings && this._documentSettings.header ? 96 : 0;
	    this._footerHeight = this._documentSettings && this._documentSettings.footer ? 96 : 0;
	},
	
	_updateHeaderFooterDivObj: function(){
		for(var i=0; i<this._pageDomObjs.length; i++){
			var footerObj = null, headerObj = null;
			var pageDivObj = this._pageDomObjs[i];
			for(var j=0; j<pageDivObj.children.length; j++){
				if(pageDivObj.children[j].className.indexOf('hr-page-header') != -1){
					headerObj = pageDivObj.children[j];
				} 
				else if(pageDivObj.children[j].className.indexOf('hr-page-bottom') != -1){
					footerObj = pageDivObj.children[j];
				}
			}
			
			if(this._documentSettings && this._documentSettings.footer){
				if(footerObj){
					footerObj.style.textAlign = this._documentSettings.footer.align;
					footerObj.firstChild.innerHTML = this._documentSettings.footer.text;
				}
				else{
					footerObj = this._createFooter();
					pageDivObj.insertAdjacentElement('afterBegin', footerObj);
				}
			}
			else {
				if(footerObj){
					pageDivObj.removeChild(footerObj);
				}
			}
			
			if(this._documentSettings && this._documentSettings.header){
				if(headerObj){
					headerObj.style.textAlign = this._documentSettings.header.align;
					headerObj.firstChild.innerHTML = this._documentSettings.header.text;
				}
				else{
					headerObj = this._createHeader();
					pageDivObj.insertAdjacentElement('afterBegin', headerObj);
				}
			}
			else {
				if(headerObj){
					pageDivObj.removeChild(headerObj);
				}
			}
		}
	},
	
	setPageSetting: function(documentSettingsData){
		if(documentSettingsData){
			if(!this._documentSettings){
				this._documentSettings = {};
			}
			for(var key in documentSettingsData){
				this._documentSettings[key] = documentSettingsData[key];
			}
		}
		
		this._updateHeaderFooterHeight();
		this._updateHeaderFooterDivObj();
	},
	
	sendSelectionChangeNotify: function(){
		var selection = this.getActiveSelection();
		if(selection){
			if ( !selection.isCollapsed() ) {
				this.setActiveStyle(selection.getTo().getTextContainerByOffset(selection.getToOffset()).style);
				com.hoperun.util.BaseTool.markTextSelection(selection);
			}
			
			var keyBoardFocus = new com.hoperun.util.Observer.Message();
			keyBoardFocus.id = com.hoperun.util.Observer.MessageType.KEYBOARD_FOCUS;
            com.hoperun.util.Observer.sendMessage(keyBoardFocus);
			
			var message = new com.hoperun.util.Observer.Message();
			message.sender = this;
			message.id = com.hoperun.util.Observer.MessageType.TEXT_SELECT;
			com.hoperun.util.Observer.sendMessage(message);
		}
	},
	
	setActiveSelection: function(selection){
		this._tempActiveSelection = selection;
	},
	getActiveSelection: function(){
		return this._tempActiveSelection;
	},
	
	getDataBySelection: function(selection){
		var removedItems = [];
		var fromData = null, toData = null;
		//var paragraph = null, offset = -1;
		var beginRemoveParagraph = false;
		
		var from = selection.getFrom(), to = selection.getTo();
		var fromOffset = selection.getFromOffset(), toOffset = selection.getToOffset();
		
		if ( selection.isReverse()){
        	var temp = from;
        	from = to;
        	to = temp;
        	fromOffset = toOffset;
        }
        
		for(var i=this._paragraphContainer.length-1; i>-1; i--){
			var paragraphObj = this._paragraphContainer[i];
			if(paragraphObj == from){
				break;
			}
			else if(paragraphObj == to){
				beginRemoveParagraph = true;
			}
			else if(beginRemoveParagraph){
				removedItems.push(paragraphObj);
			}
		}
		if(from != to){
			fromData = from.getUndoData();
			toData = to.getUndoData();
		}
		else{
			fromData = from.getUndoData();
		}
		return {
			removedItems: removedItems,
			breakOffset: fromOffset,
			from: from,
			to: to,
			fromData: fromData,
			toData: toData
		};
	},
	//TODO: recover selection
	recoverSelection: function(undoData){
		if(undoData.from != undoData.to){
			undoData.from.breakParagraph(undoData.breakOffset, undoData.to);
			undoData.from.setUndoData(undoData.fromData);
			undoData.from.refreshLineData();
			undoData.from.updatePage(true);
			
			undoData.to.setUndoData(undoData.toData);
			undoData.to.refreshLineData();
			undoData.to.updatePage(true);
			//
			var idx = this._paragraphContainer.indexOf(undoData.from);
			
			var refreshPara = null;
			for(var i=undoData.removedItems.length-1; i>-1; i--){
				refreshPara = undoData.removedItems[i];
				refreshPara.refreshLineData();
				this.insertParagraph(idx, refreshPara);
			}
			if(refreshPara) refreshPara.updatePage(true);
			
		}
		else{
			undoData.from.setUndoData(undoData.fromData);
			undoData.from.refreshLineData();
			undoData.from.updatePage(true);
		}
	},
	deleteSelection: function(selection){
		//var paragraph = null, offset = -1;
		var beginRemoveParagraph = false;
		
		var from = selection.getFrom(), to = selection.getTo(); fromOffset = selection.getFromOffset(), toOffset = selection.getToOffset();
        if ( selection.isReverse()){
        	var temp = from;
        	from = to;
        	to = temp;
        	temp = fromOffset;
        	fromOffset = toOffset;
        	toOffset = temp;
        }
        
		for(var i=this._paragraphContainer.length-1; i>-1; i--){
			var paragraphObj = this._paragraphContainer[i];
			if(paragraphObj == from){
				break;
			}
			else if(paragraphObj == to){
				beginRemoveParagraph = true;
			}
			else if(beginRemoveParagraph){
				this.removeParagraph(paragraphObj);
			}
		}
		selection.doCollapse();
		this.setActiveSelection(selection);
		if(from != to){
			from.removeTextByOffset(fromOffset, from._text.length);
			to.removeTextByOffset(0, toOffset);
			return from.conbineParagraph(false);
		}
		else{
			from.removeTextByOffset(fromOffset, toOffset);
			from.refreshLineData();
			from.updatePage(true);
			var spanObj = from.getSpanItem(fromOffset);
			return { obj:from, divObj:spanObj, offset:fromOffset };
		}
	},
	removeParagraph: function(paragraphObj){
		var idx = this._paragraphContainer.indexOf(paragraphObj);
		this._paragraphContainer.removeAt(idx);
		paragraphObj.removeDom();
	},
	insertParagraph: function(idx, paragraphObj){
		if(this._paragraphContainer.length > idx){
			var nextParaDivObj = document.getElementById(this._paragraphContainer[idx].getId());
			if(nextParaDivObj){
				var paraDivObj = paragraphObj._createDomInstance();
				nextParaDivObj.insertAdjacentElement('beforeBegin', paraDivObj);
			}
		}
		this._paragraphContainer.insert(idx, paragraphObj);
		paragraphObj.setPage(this);
	},
	compareParagraphIndex: function(para1, para2){
		var idx1 = -1, idx2 = -1;
		if(para1.getId() == para2.getId()){
			return 0;
		}
		for( var i=0; i<this._paragraphContainer.length; i++ ){
			var paragraphObj = this._paragraphContainer[i];
			if(paragraphObj.getId() == para1.getId()){
				idx1 = i;
			}
			else if(paragraphObj.getId() == para2.getId()){
				idx2 = i;
			}
			
			if(idx1 != -1 && idx2 != -1){
				break;
			}
		}
		return idx1 > idx2 ? 1 : -1;
	},
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////// Begin: Manager Absolute items on Page
	appendChild: function(item){
		var pageDivObj = this._activePage;
		//Default to 
		if(pageDivObj == null){
			pageDivObj = $('.hr-page')[0];
		}
		if(pageDivObj){
			var pageIndex = this.getPageIndex(pageDivObj);
			if(pageIndex != null && pageIndex >= 0){
				if(item.getLeft() == null && item.getTop() == null){
					item.setLeft(this._activeCursorPosition.x);
					item.setTop(this._activeCursorPosition.y);
					
					com.hoperun.util.BaseTool.doValidPositionWidthRect({
						top: this._headerHeight,
						left: 0,
						width: this.getWidth(),
						height: this._getContentHeight()
					}, item);
				}
				if(item.getType() == 'Image'){
					this.appendImage(pageIndex, item);
				}
				else if(item.getType() == 'Table') {
					this.appendTable(pageIndex, item);
				}
				else{
					this.appendShape(pageIndex, item);
				}
				pageDivObj.appendChild(item.getDomInstance());
			}
		}
	},
	setActivePage: function(pageDivObj){
		this._activePage = pageDivObj;
	},
	setCursorPosition: function(relativePos){
		this._activeCursorPosition = relativePos;
	},
	findEffectParagraphs: function(){
		
	},
	
	_registerPageListener: function(pageDivObj){
		var self = this;
		$(pageDivObj).click(function(e){
			self.setActivePage(pageDivObj);
			var relativePos = com.hoperun.util.BaseTool.getRelativeCoordinates(e, pageDivObj);
			self.setCursorPosition(relativePos);
		});
		
		$(pageDivObj).droppable({
			accept: ".node-moveable",
			//activeClass: 'droppable-active',
			//hoverClass: 'droppable-hover',
	        drop: function(event, ui) { 
	        	var item = ui.draggable.data("item");
	        	var itemDivObj = item.getDomInstance();
	        	var originalPageDivObj = itemDivObj.parentNode;
	        	var targetPageDivObj = pageDivObj;
	        	
        		var targetPageDivObjPos = com.hoperun.util.BaseTool.getAbsPostionInContainer(targetPageDivObj);
        		
	        	var left = ui.position.left - targetPageDivObjPos.x < 0 ? 0 : ui.position.left - targetPageDivObjPos.x;
        		var top = ui.position.top - targetPageDivObjPos.y < 0 ? 0 : ui.position.top - targetPageDivObjPos.y;
        		
        		var needRefreshTop = item.getTop();
        		
        		//Find Need to refresh
        		var sourcePageIndex = self.getPageIndex(originalPageDivObj);
        		var targetPageIndex = self.getPageIndex(targetPageDivObj);
	        	var needRefreshPageDivObj = originalPageDivObj;
	        	if(sourcePageIndex > targetPageIndex){
	        		needRefreshPageDivObj = targetPageDivObj;
	        		needRefreshTop = top;
	        	}
	        	else if(sourcePageIndex == targetPageIndex && needRefreshTop > top){
	        		needRefreshTop = top;
	        	}
        		if(item.getTop() < self.getHeaderHeight()){
        			item.setTop(self.getHeaderHeight());
        		}
        		else if(self.getHeight() - item.getTop() < self.getFooterHeight()){
        			item.setTop(item.getHeight() - self.getFooterHeight());
        		}
        		self.doMoveItemBetweenPageDivObj(originalPageDivObj, targetPageDivObj, item);
	        	
	        	var rect = {
	        		top: self._headerHeight,
	        		left: 0,
	        		width: self.getWidth(),
	        		height: self._getContentHeight()
	        	};
	        	
	        	if(item.getType() == 'Image') {
//	        		item.setLeft(left); item.setTop(top);
//        			com.hoperun.util.BaseTool.doValidPosition(self, item);
	        		var msg = new com.hoperun.util.Observer.Message();
                    msg.id = com.hoperun.util.Observer.MessageType.IMAGE_POSITION;
                    msg.sender = item;
                    msg.data =  {'left':left+item.getClip().x ,'top':top+item.getClip().y ,'self':self, 'rect':rect};
                    com.hoperun.util.Observer.sendMessage(msg);
                    
        			var message = new com.hoperun.util.Observer.Message();
	        		message.id = com.hoperun.util.Observer.MessageType.IMAGE_FOCUS;
	        		message.sender = item;
		    		message.data = {};
		    		com.hoperun.util.Observer.sendMessage(message);
	    		}
	        	else if(item.getType() == 'Table') {
	        		// item.setLeft(left); item.setTop(top);
        			// com.hoperun.util.BaseTool.doValidPosition(self, item);
        			
        			var msg = new com.hoperun.util.Observer.Message();
                    msg.id = com.hoperun.util.Observer.MessageType.TABLE_POSITION;
                    msg.sender = item;
                    msg.data = {'left':left + 10 ,'top':top ,'self':self, 'rect':rect};
                    com.hoperun.util.Observer.sendMessage(msg);
                    
        			var message = new com.hoperun.util.Observer.Message();
	        		message.id = com.hoperun.util.Observer.MessageType.TABLE_FOCUS;
	        		message.sender = item;
		    		message.data = {};
		    		com.hoperun.util.Observer.sendMessage(message);
	    		}
	    		else {
	    		    if(item.getType().indexOf("Chart_") == 0){
	    		        var msg = new com.hoperun.util.Observer.Message();
                        msg.id = com.hoperun.util.Observer.MessageType.CHART_POSITION;
                        msg.sender = item;
                        msg.data = {'left':left ,'top':top ,'self':self, 'rect':rect};
                        com.hoperun.util.Observer.sendMessage(msg);
                    }
                    else if(item.getType().indexOf("Shape_") == 0){
//                      item.setLeft(left); item.setTop(top);
//                      com.hoperun.util.BaseTool.doValidPosition(self, item);
                        var msg = new com.hoperun.util.Observer.Message();
                        msg.id = com.hoperun.util.Observer.MessageType.SHAPE_POSITION;
                        msg.sender = item;
                        msg.data = {'left':left ,'top':top ,'self':self, 'rect':rect};
                        com.hoperun.util.Observer.sendMessage(msg);
                        
                        var message = new com.hoperun.util.Observer.Message();
                        message.id = com.hoperun.util.Observer.MessageType.SHAPE_FOCUS;
                        message.sender = item;
                        message.data = {};
                        com.hoperun.util.Observer.sendMessage(message);
                    }
	    		}
	        	
	        	self.refreshPage(needRefreshPageDivObj, needRefreshTop);
	        }
	    });
		
	},
	_fetchPageDomInstance: function(pageIndex){
		var pageDivObj = null;
		if(this._pageDomObjs.length > pageIndex){
			pageDivObj = this._pageDomObjs[pageIndex];
		}
		else{
			for(var i = this._pageDomObjs.length-1; i <= pageIndex; i++){
				pageDivObj = this._createPage();
			}
		}
		return pageDivObj;
	},
	_generatePageItems: function(){
		if(this._pageItemsContainer){
			for(var i=0; i<this._pageItemsContainer.length; i++){
				var pageItems = this._pageItemsContainer[i];
				if( pageItems && pageItems.length>0 ){
					var pageDivObj = this._fetchPageDomInstance(i);
					
					for(var j=0; j<pageItems.length; j++){
						var item = pageItems[j];
						pageDivObj.appendChild(item.getDomInstance());
					}
				}
			}
		}
	},
	_removeItem: function(pageIndex, item){
		for(var i=0; i<this._childNodes.length; i++){
			if(this._childNodes[i].getId() == item.getId()){
				this._childNodes.removeAt(i);
				break;
			}
		}
		
		var pageItems = this._pageItemsContainer[pageIndex];
		if(pageItems){
			for(var i=0; i<pageItems.length; i++){
				if(pageItems[i].getId() == item.getId()){
					var domObj = item.getDomInstance();
					if(domObj.parentNode){
						domObj.parentNode.removeChild(domObj);
					}
					pageItems.removeAt(i);
					break;
				}
			}
		}
	},
	_appendToPage: function(pageIndex, item){
		var pageItems = this._pageItemsContainer[pageIndex];
		if(!pageItems){
			pageItems = [];
			this._pageItemsContainer[pageIndex] = pageItems;
		}
		pageItems.push(item);
		
		this._childNodes.push(item);
	},
	//TODO: remove item from document
	removeChild: function(item){
		var pageDivObj = null;
		if(item.getType && item.getType() == 'Table'){
			pageDivObj = document.getElementById(item.getId());
			pageDivObj = pageDivObj.parentNode;
			var pageIndex = this.getPageIndex(pageDivObj);
			if(pageIndex!=-1){
				this.removeTable(pageIndex, item);
				//item.removeDom();
			}
		}
		else if(item.getType && item.getType() == 'Image'){
			var imageDivObj = document.getElementById(item.getId());
			pageDivObj = imageDivObj.parentNode;
			var pageIndex = this.getPageIndex(pageDivObj);
			if(pageIndex!=-1){
				this.removeImage(pageIndex, item);
			}
		}
		else {
			var shapeDivObj = document.getElementById(item.getId());
			pageDivObj = shapeDivObj.parentNode;
			var pageIndex = this.getPageIndex(pageDivObj);
			if(pageIndex!=-1){
				this.removeShape(pageIndex, item);
			}
		}
	},
	removeImage: function(pageIndex, item){
		this._removeItem(pageIndex, item);
		for(var i=0; i<this._imageContainer.length; i++){
			if(this._imageContainer[i].getId() == item.getId()){
				this._imageContainer.removeAt(i);
				break;
			}
		}
	},
	removeShape: function(pageIndex, item){
		this._removeItem(pageIndex, item);
		for(var i=0; i<this._shapeContainer.length; i++){
			if(this._shapeContainer[i].getId() == item.getId()){
				this._shapeContainer.removeAt(i);
				break;
			}
		}
	},
	removeTable: function(pageIndex, item){
		this._removeItem(pageIndex, item);
		for(var i=0; i<this._tableContainer.length; i++){
			if(this._tableContainer[i].getId() == item.getId()){
				this._tableContainer.removeAt(i);
				break;
			}
		}
	},
	appendImage: function(pageIndex, item){
		this._appendToPage(pageIndex, item);
		this._imageContainer.push(item);
	},
	appendShape: function(pageIndex, item){
		this._appendToPage(pageIndex, item);
		this._shapeContainer.push(item);
	},
	appendTable: function(pageIndex, item){
		this._appendToPage(pageIndex, item);
		this._tableContainer.push(item);
	},
	doMoveItemBetweenPageDivObj: function(sourcePageDivObj, targetPageDivObj, item){
		var sourcePageIndex = this.getPageIndex(sourcePageDivObj);
		var targetPageIndex = this.getPageIndex(targetPageDivObj);
		
		if(item.getType() == 'Image') {
			this.removeImage(sourcePageIndex, item);
			this.appendImage(targetPageIndex, item);
			targetPageDivObj.appendChild(item.getDomInstance());
		}
		else if(item.getType() == 'Table') {
			this.removeTable(sourcePageIndex, item);
			this.appendTable(targetPageIndex, item);
			targetPageDivObj.appendChild(item.getDomInstance());
		}
		else {
			this.removeShape(sourcePageIndex, item);
			this.appendShape(targetPageIndex, item);
			targetPageDivObj.appendChild(item.getDomInstance());
		}
	},
	getPageItemsWithPageDivObj: function(pageDivObj){
		var rel = {};
		var pageIndex = this.getPageIndex(pageDivObj);
		if(this._pageItemsContainer[pageIndex]){
			rel.current = this._pageItemsContainer[pageIndex];
		}
		if(this._pageItemsContainer[pageIndex+1]){
			rel.next = this._pageItemsContainer[pageIndex+1];
		}
		return rel;
	},
	getPageIndex: function(pageDivObj){
		return $(pageDivObj.parentNode).children(".hr-page").index(pageDivObj);
	},
	findFirstParagraph: function(pageDivObj){
		var paragraphDivObj = null;
		if(pageDivObj.children && pageDivObj.children.length > 0){
			paragraphDivObj = pageDivObj.children[0];
		}
		return paragraphDivObj;
	},
	findParagraphByPosition: function(pageDivObj, top){
		var paragraphTop = 0;
		for(var i=0; i < pageDivObj.children.length; i++){
			var paragraphDivObj = pageDivObj.children[i];
			if(paragraphDivObj && paragraphDivObj.getAttribute('objecttype') == 'Paragraph'){
				paragraphTop += $(paragraphDivObj).height();
				if(paragraphTop > top){
					return paragraphDivObj;
				}
			}
		}
		return null;
	},
	refreshAllPage: function(){
		for(var i=0; i<this._paragraphContainer.length; i++){
			this._paragraphContainer[i].refreshLineData();
			this._paragraphContainer[i].updatePage(false);
		}
		this.clearEmptyPage();
	},
	refreshPage: function(pageDivObj, top){
		var needRefreshParagraphDivObj = null;
		
		if(top <= this.getHeaderHeight()){
			for(var i=0; i < pageDivObj.children.length; i++){
				var paragraphDivObj = pageDivObj.children[i];
				if(paragraphDivObj && paragraphDivObj.getAttribute('objecttype') == 'Paragraph'){
					needRefreshParagraphDivObj = paragraphDivObj;
					break;
				}
			}
		}
		else{
			var paragraphTop = this.getHeaderHeight(), beginToRefresh = false;
			for(var i=0; i < pageDivObj.children.length; i++){
				var paragraphDivObj = pageDivObj.children[i];
				if(paragraphDivObj && paragraphDivObj.getAttribute('objecttype') == 'Paragraph'){
					var height = $(paragraphDivObj).height();
					if(paragraphTop <= top && paragraphTop + height > top){
						beginToRefresh = true;
						needRefreshParagraphDivObj = paragraphDivObj;
					}
					if(beginToRefresh){
						var paragraphObj = this.getParagraphObjById( paragraphDivObj.id );
						paragraphObj._tmpHeight = -1;
						paragraphObj.refreshLineData();
					}
					paragraphTop += height;
				}
			}
		}
		if(needRefreshParagraphDivObj){
			var paragraphObj = this.getParagraphObjById( needRefreshParagraphDivObj.id );
        	paragraphObj.updatePage(true);
		}
		
		this.clearEmptyPage();
	},
	//////////////////////// End: Manager Absolute items on Page
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	getContentPadding: function(){
		return this._contentPadding;
	},
	getWidth: function(){
		return this._width;
	},
	getHeight: function(){
		return this._height;
	},
	_getContentWidth: function(){
		return this._width-this._contentPadding.left-this._contentPadding.right;
	},
	_getContentHeight: function(){
		return this._height - this._headerHeight - this._footerHeight; //-this._contentPadding.top-this._contentPadding.bottom;
	},
	/**
	 * Append paragraph object to page.
	 * 
	 * @param paragraph  the paragraph object.
	 */
	appendParagraph:function(paragraph){
		this._paragraphContainer.push(paragraph);
		paragraph.setPage(this);
		paragraph.setWidth(this.getWidth());
	},
	/**
	 * Append paragraph object to page.
	 * 
	 * @param paragraph  the paragraph object.
	 */
	insertAfter:function(srcParagraph, targetParagraph){
		for(var i=0; i<this._paragraphContainer.length; i++){
			if(this._paragraphContainer[i].getId() == srcParagraph.getId()){
				this._paragraphContainer.insert(i+1, targetParagraph);
				break;
			}
		}
		targetParagraph.setPage(this);
	},
	/**
	 * remove paragraph from the page.
	 * 
	 * @param paragraph  the paragraph object.
	 */
	removeParagraph:function(paragraph){
		paragraph.removeDom();
		for(var i=0;i<this._paragraphContainer.length;i++){
			if(this._paragraphContainer[i].getId() == paragraph.getId()){
				this._paragraphContainer.removeAt(i);
				break;
			}
		}
		for(var i=this._pageDomObjs.length-1;i>-1;i--){
			if(!this._pageDomObjs[i].hasChildNodes()){
				this._pageDomObjs[i].parentNode.removeChild(this._pageDomObjs[i]);
				this._pageDomObjs.removeAt(i);
			}else{
				break;
			}
		}
	},
	getDomInstance: function(){
		if(!this._domInstance){
			this._domInstance = document.createElement("div");
			this._domInstance.id = this._id;
				
			this._domInstance.className = "hr-view-editor";
			this._domInstance.objectType = this._type;
			this._domInstance.setAttribute('objectType', this._type);
			this._domInstance.setAttribute('tabindex', "1");
			$(this._domInstance).bind('mousedown', com.hoperun.event.MouseEvent.mouseDown).bind('mouseup', com.hoperun.event.MouseEvent.mouseUp);
		}
		return this._domInstance;
	},
	
	createDocsPage: function(docs){
		var pageDom = this.getDomInstance();
		if(docs) docs.appendChild(pageDom);
		var pageDivObj = this._createPage();
		for(var i=0; i<this._paragraphContainer.length;i++){
			this._paragraphContainer[i].refreshLineData();
			this._paragraphContainer[i].updatePage(false);
		}
		this._generatePageItems();

		return pageDom;
	},
	
	updateDom: function(paragraphObj){
		var index = this._paragraphContainer.indexOf(paragraphObj);
		for(var i=index+1; i<this._paragraphContainer.length; i++){
			var needRefreshFollowingPage = this._paragraphContainer[i].updatePage(false);
			if(!needRefreshFollowingPage){
				break;
			}
		}
		this.clearEmptyPage();
	},
	
	clearEmptyPage: function(){
		for(var i=this._pageDomObjs.length-1;i>-1;i--){
			if(!this._pageDomObjs[i].hasChildNodes()){
				this._pageDomObjs[i].parentNode.removeChild(this._pageDomObjs[i]);
				this._pageDomObjs.removeAt(i);
			}
			else{
				var findValidItem = false;
				for(var j=0; j<this._pageDomObjs[i].children.length; j++){
					var child = this._pageDomObjs[i].children[j];
					if(child.className.indexOf('header-footer') == -1){
						findValidItem = true;
						break;
					}
				}
				if(findValidItem){
					break;
				}
				else{
					this._pageDomObjs[i].parentNode.removeChild(this._pageDomObjs[i]);
					this._pageDomObjs.removeAt(i);
				}
			}
		}
	},
	
	//change text style
	changeTextStyle: function(from, to, fromOffset, toOffset, style){
		//changeStyle
		var paragraphObjs = [];
		for(var i=0, needNewStyleFlag = false; i<this._paragraphContainer.length;i++){
			var paragraphObj = this._paragraphContainer[i];
			//Validate From
			if(paragraphObj._id == from._id){
				needNewStyleFlag = true;
			}
			if(needNewStyleFlag){
				paragraphObjs.push(paragraphObj);
			}
			if(paragraphObj._id == to._id){
				break;
			}
		}
		if(paragraphObjs.length == 1){
			paragraphObjs[0].changeStyle(style, fromOffset, toOffset);
		}
		else{
			paragraphObjs[0].changeStyle(style, fromOffset);
			var i = 1;
			for(;i<paragraphObjs.length-1;i++){
				paragraphObjs[i].changeStyle(style);
			}
			paragraphObjs[i].changeStyle(style, 0, toOffset);
		}
		for(var i=0;i<paragraphObjs.length;i++){
			paragraphObjs[i].refreshLineData();
		}
		paragraphObjs[0].updatePage(true);
	},
	
	//Get text styles with the paragraph and offset
	getTextStyles: function(from, to, fromOffset, toOffset){
		//TODO: to simply to backup the whole of the paragraph
		var styleList = [];
		
		var paragraphObjs = [];
		for(var i=0, needNewStyleFlag = false; i<this._paragraphContainer.length;i++){
			var paragraphObj = this._paragraphContainer[i];
			//Validate From
			if(paragraphObj._id == from._id){
				needNewStyleFlag = true;
			}
			if(needNewStyleFlag){
				paragraphObjs.push(paragraphObj);
			}
			if(paragraphObj._id == to._id){
				break;
			}
		}
		for(var i=0;i<paragraphObjs.length;i++){
			styleList.push(paragraphObjs[i].copyTextContainer());
		}
		return styleList;
	},
	
	//Set text styles with the paragraph and offset
	setTextStyles:function(from, to, fromOffset, toOffset, styleList){
		var paragraphObjs = [];
		for(var i=0, needNewStyleFlag = false; i<this._paragraphContainer.length;i++){
			var paragraphObj = this._paragraphContainer[i];
			//Validate From
			if(paragraphObj._id == from._id){
				needNewStyleFlag = true;
			}
			if(needNewStyleFlag){
				paragraphObjs.push(paragraphObj);
			}
			if(paragraphObj._id == to._id){
				break;
			}
		}
		for(var i=0;i<paragraphObjs.length;i++){
			paragraphObjs[i]._textContainer = styleList[i];
			paragraphObjs[i].refreshLineData();
		}
		paragraphObjs[0].updatePage(true);
	},
	//
	_createPage: function(){
		var pageDivObj = document.createElement("div");
		pageDivObj.id = com.hoperun.util.BaseTool.uuid();
		pageDivObj.className = "hr-page hr-page-paginated";
		com.hoperun.util.BaseTool.setStyleProperty(pageDivObj.style, 'width', this._width+'px');
		com.hoperun.util.BaseTool.setStyleProperty(pageDivObj.style, 'height', this._height+'px');
		com.hoperun.util.BaseTool.setStyleProperty(pageDivObj.style, 'text-align', 'left');
		com.hoperun.util.BaseTool.setStyleProperty(pageDivObj.style, 'background-color', 'rgb(255, 255, 255)');
		
		if(true){
			var footerDivObj = this._createFooter(), headerDivObj = this._createHeader();
			if(headerDivObj){
				pageDivObj.appendChild(headerDivObj);
			}
			if(footerDivObj){
				pageDivObj.appendChild(footerDivObj);
			}
		}
		
		//pageDivObj.appendChild(footerDivObj);
		//pageDivObj.appendChild(headerDivObj);
		
//		com.hoperun.util.BaseTool.setStyleProperty(pageDivObj.style, 'padding-top', this._contentPadding.top+"px");
//		com.hoperun.util.BaseTool.setStyleProperty(pageDivObj.style, 'padding-bottom', this._contentPadding.bottom+"px");
		
//		//TODO: Need to take more consider about staff gauge
//		com.hoperun.util.BaseTool.setStyleProperty(pageDivObj.style, 'padding-top', this._marginTop+"px");
//		com.hoperun.util.BaseTool.setStyleProperty(pageDivObj.style, 'padding-right', this._marginRight+"px");
//		com.hoperun.util.BaseTool.setStyleProperty(pageDivObj.style, 'padding-bottom', this._marginBottom+"px");
//		com.hoperun.util.BaseTool.setStyleProperty(pageDivObj.style, 'padding-left', this._marginLeft+"px");
		
		this._pageDomObjs.push(pageDivObj);
		this._domInstance.appendChild(pageDivObj);
		
		this._registerPageListener(pageDivObj);
		
		return pageDivObj;
	},
	getLeftContentHeight: function(pageDivObj, pagragraphId){
		var height = this._getContentHeight(), paragraphObj = null;
		if(pagragraphId){
			for(var i=0;i<pageDivObj.children.length;i++){
				if(pageDivObj.children[i].id == pagragraphId){
					paragraphObj = pageDivObj.children[i];
					break;
				}
			}
		}
		height -= this.getUsedContentHeight(pageDivObj, paragraphObj);
		return height;
	},
	getUsedContentHeight: function(pageDivObj, paragraphObj){
		var height = 0;
		for(var i=0; i<pageDivObj.children.length; i++){
			var obj = pageDivObj.children[i];
			if(obj.getAttribute && obj.getAttribute('objectType') == 'Paragraph'){
				if(obj == paragraphObj){
					break;
				}
				height += obj.offsetHeight;
			}
		}
		return height;
	},
	insertAfterBeginInPageDivObj: function(pageDivObj, paragraphDivObj){
		var beginChild = null;
		if(pageDivObj.children.length>0){
			var child = pageDivObj.firstChild;
			while(child){
				if(child.className && child.className.indexOf('header-footer') == -1){
					break;
				}
				beginChild = child;
				child = child.nextSibling;
			}
		}
		if(beginChild){
			beginChild.insertAdjacentElement('afterEnd', paragraphDivObj);
		}
		else{
			pageDivObj.insertAdjacentElement('afterBegin', paragraphDivObj);
		}
	},
	/**
	 * Find first page object.
	 * 
	 * @param pageObj the current page object
	 * 
	 * @return the next page object
	 */
	findFirstPage: function(){
		if(this._pageDomObjs.length>0){
			return this._pageDomObjs[0];
		}
		return this._createPage();
	},
	/**
	 * Find last page object.
	 * 
	 * @param pageObj the current page object
	 * 
	 * @return the next page object
	 */
	findLastPage: function(){
		if(this._pageDomObjs.length>0){
			return this._pageDomObjs[this._pageDomObjs.length-1];
		}
		return this._createPage();
	},
	/**
	 * Find next page object.
	 * 
	 * @param pageObj the current page object
	 * 
	 * @return the next page object
	 */
	findNextPage: function(pageDivObj){
		for(var i=0;i<this._pageDomObjs.length-1;i++){
			if(this._pageDomObjs[i].id == pageDivObj.id){
				return this._pageDomObjs[i+1];
			}
		}
		var rel = this._createPage();
		return rel;
	},
	findExistedPrevPage: function(pageDivObj){
		try{
			for(var i=1;i<this._pageDomObjs.length;i++){
				if(this._pageDomObjs[i].id == pageDivObj.id){
					return this._pageDomObjs[i-1];
				}
			}
		}catch(e){
		}
		return null;
	},
	findExistedNextPage: function(pageDivObj){
		try{
			for(var i=0;i<this._pageDomObjs.length-1;i++){
				if(this._pageDomObjs[i].id == pageDivObj.id){
					return this._pageDomObjs[i+1];
				}
			}
		}catch(e){
			//console.log(e);
		}
		
		return null;
	},
	findNextAvailbleParagraph: function(pageDivObj){
		var paragraphObj = pageDivObj.firstChild;
		while(paragraphObj && paragraphObj.getAttribute('objectType') != 'Paragraph'){
			paragraphObj = paragraphObj.nextSibling;
		}
		//No Availble Paragraph, to find it from following page
		if(!paragraphObj){
			var pageObj = pageDivObj.nextSibling;
			while(pageObj){
				paragraphObj = pageObj.firstChild;
				while(paragraphObj && paragraphObj.getAttribute('objectType') != 'Paragraph'){
					paragraphObj = paragraphObj.nextSibling;
				}
				if(paragraphObj){
					break;
				}
				pageObj = pageObj.nextSibling;
			}
		}
		
		return paragraphObj;
	},
	
	
	//Public Method, Do set data for paragraph
	setData:function(data){
		//Basic data
		if(data.width!=null && data.width!=0) this._width = data.width;
		if(data.height!=null && data.height!=0) this._height = data.height;
		
		if(data.pageIndent) this._contentPadding = data.pageIndent;

		this._documentSettings = data.settings;
		
		this._updateHeaderFooterHeight();
		
		//Text Style
		com.hoperun.util.TextStyleContainerUtils.setAllData(data.styles, true);
		
		//Paragraph
		this._paragraphContainer = [];
		if(data.texts){
			for(var i=0; i<data.texts.length; i++){
				var paragraph = new com.hoperun.node.Paragraph();
				paragraph.setData(data.texts[i]);
				this.appendParagraph(paragraph);
			}
		}
		
		//Images &shape & table
		this._imageContainer = [];
		this._shapeContainer = [];
		this._tableContainer = [];
		this._pageItemsContainer = [];
		if(data.nodes){
			for(var k=0; k<data.nodes.length; k++){
				var nodes = data.nodes[k];
				var pageIndex = nodes.pageIndex, pageNodes = nodes.pageNodes;
				if(pageIndex!=null && pageNodes){
					var zIndexArr = [];
					for(var i=0; i<pageNodes.length; i++){
						var node = pageNodes[i];
						var zIndex = 0;
						var passSelf = false;
						for(var j=0; j<pageNodes.length; j++){
							var tmpNode = pageNodes[j];
							if((tmpNode.zIndex == node.zIndex && passSelf == false) || tmpNode.zIndex < node.zIndex){
								zIndex++;
							}
							if(tmpNode == node){
								passSelf = true;
							}
						}
						zIndexArr.push(zIndex);
					}
					for(var i=0;i<zIndexArr.length;i++){
						var node = pageNodes[i];
						node.zIndex = 1010 + zIndexArr[i]*10;
					}
				}
			}
			for(var i=0; i<data.nodes.length; i++){
				var nodes = data.nodes[i];
				var pageIndex = nodes.pageIndex, pageNodes = nodes.pageNodes;
				pageIndex = parseInt(pageIndex);
				if(pageIndex!=null && pageNodes){
					for(var j=0; j<pageNodes.length; j++){
						var nodeData = pageNodes[j];
						var node = com.hoperun.util.BaseTool.createNode(nodeData.type);
						node.setData(nodeData);
						if(node.getType() == 'Table'){
                            this.appendTable(pageIndex, node);
                        }
                        else if(node.getType() == 'Image'){
                            this.appendImage(pageIndex, node);
                        }
                        else {
                            this.appendShape(pageIndex, node);
                        }
						node.appendTo(this);
					}
				}
			}
		}
	},
	//Public Method, return data format for paragraph 
	getData:function(){
		//Styles
		com.hoperun.util.TextStyleContainerUtils.clearCache();
		for(var i=0; i<this._paragraphContainer.length; i++){
			this._paragraphContainer[i].registerStyle();
		}
		var styles = com.hoperun.util.TextStyleContainerUtils.getAllData();
		
		//Paragraph
		var texts = [];
		for(var i=0;i<this._paragraphContainer.length;i++){
			texts.push(this._paragraphContainer[i].getData());
		}
		
		//Images &shape & table
		var nodes = [];
		for(var i=0; i<this._pageItemsContainer.length; i++){
			var pageNodesData = this._pageItemsContainer[i];
			
			if(pageNodesData){
				var pageNodes = [];
				for(var j=0; j<pageNodesData.length; j++){
					pageNodes.push(pageNodesData[j].getData());
				}
				nodes.push( { pageIndex: i, pageNodes: pageNodes } );
			}
		}
		
		//Docs Style
		var pageIndent = this._contentPadding;
		var settings = this._documentSettings;

		return {
			width: this._width,
			height: this._height,
			type: this._type,
			
			styles: styles,
			
			texts: texts,
			nodes: nodes,
			
			pageIndent: pageIndent,
			settings: settings
		};
	},
	
	getAllElements:function(){
		var elements = [];
		for(var i=0; i<this._imageContainer.length; i++){
			elements.push(this._imageContainer[i]);
		}
		for(var i=0; i<this._shapeContainer.length; i++){
			elements.push(this._shapeContainer[i]);
		}
		for(var i=0; i<this._tableContainer.length; i++){
			elements.push(this._tableContainer[i]);
		}
		return elements;
	},
	getParagraphObjById: function(id){
		for (var i = 0 ; i < this._paragraphContainer.length ; i++){
			if (this._paragraphContainer[i].getId() == id){
				return this._paragraphContainer[i];
			}
		}
		return null;
	},
	getTableObjById: function(id){
		for (var i = 0 ; i < this._tableContainer.length ; i++){
			if (this._tableContainer[i].getId() == id){
				return this._tableContainer[i];
			}
		}
		return null;
	}
});