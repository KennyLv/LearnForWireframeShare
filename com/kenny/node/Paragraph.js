/**
 * Paragraph class
 * @package com.kenny.node
 * @import com.kenny.util.BaseTool,com.kenny.util.NodeCache,com.kenny.util.TextStyleContainerUtils
 * @author lu_feng
 */
com.kenny.node.Paragraph = function(){
	com.kenny.node.Paragraph.superClass.constructor.call(this);
	this._type = "Paragraph";
	
	//Text stuff
	this._text = "";
	this._textContainer = [];
	
	/////////////////////////////////////////////////////////////////////////////////////////
	////////// Paragraph Style Begin
	this._indent = {
		firstLine: 20,
		left: 0,
		right: 0
	};
	this._textAlign = 'left';
	this._defaultTextStyle = null;
	this._textLineSpacing = 1.25;
	this._styleFormat = null;
	////////// Paragraph Style End
	/////////////////////////////////////////////////////////////////////////////////////////
	
	this._width = 0;
	this._pageStart = [];
	
	
	this._tmpHeight = 0;
	
	this._pageAttackItems = [];
	this._debug = false;
	com.kenny.util.NodeCache.add(this.getId(), this);
	
	com.kenny.util.BaseTool.addForbiddenPropagation(this._domInstance);
	com.kenny.util.BaseTool.actsAsAspect(this);
	
};

com.kenny.util.BaseTool.extend(com.kenny.node.Paragraph,com.kenny.node.Node);

com.kenny.util.BaseTool.augment(com.kenny.node.Paragraph,{
	_page: null,
	_linesDataIsChange: false,
	_linesDataDivObjs: null,
	_linesData: null,
	_pageStart: null,
	_lineWidth: null,
	_indent: null,
	_text: null,
	
	addPageStart: function(offset){
		var idx = -1;
		for(var i=0; i<this._pageStart.length; i++){
			if(this._pageStart[i] > offset){
				idx = i;
				break;
			}
		}
		if(idx > 0){
			this._pageStart.insert(idx, offset);
		}
		else{
			this._pageStart.push(offset);
		}
	},
	
	//TODO: change paragraph style, leave paragraph line height to be done.
	/**
	 * @param paragraphStyle
	 * 	textAlign, to set text align 
	 *  textLineSpacing, to set paragraph line spacing
	 */
	setParagraphStyle: function(paragraphStyle){
		for(var key in paragraphStyle){
			var val = paragraphStyle[key];
			if(key == 'textAlign'){
				this.setTextAlign(val);
			}
			else if(key == 'textLineSpacing'){
				this._textLineSpacing = val;
			}
			else if(key == 'styleFormat'){
				this._styleFormat = val.value;
				//Whether it is undo
				if(val.backupData){
					this._textContainer = val.backupData.textContainer;
					this.setTextAlign(val.backupData.textAlign);
				}
				else {
					if(this._styleFormat == 'Title'){
						this.changeAllStyle({"fontSize":'35', "color":"#999966", bold:false, italic:false, lineThrough:false, textDecoration:false});
					} else if(this._styleFormat == 'Heading'){
						this.changeAllStyle({"fontSize":'25', "color":"#CC3300", bold:false, italic:false,lineThrough:false, textDecoration:false});
					} else if(this._styleFormat == 'Body'){
						this.changeAllStyle({"fontSize":'20', "color":"#000000", bold:false, italic:false,lineThrough:false, textDecoration:false});
					} else if(this._styleFormat == 'Caption'){
						this.changeAllStyle({"fontSize":'20', "color":"#000000", bold:false, italic:true, lineThrough:false, textDecoration:false});
					} else if(this._styleFormat == 'Label Dark'){
						this.changeAllStyle({"fontSize":'20', "color":"#000000", bold:true, italic:false, lineThrough:false, textDecoration:false});
					}
					if(this._styleFormat == 'Body'){
						this.setTextAlign('left');
					}else{
						this.setTextAlign('center');
					}
				}
			}
			else if(key == 'indentation'){
				for(var key in val){
					this.setIndent(key, val[key]);
				}
			}
		}
	},
	
	/**
	 * @return paragraphStyle
	 * 	textAlign, to set text align 
	 *  textLineSpacing, to set paragraph line spacing
	 */
	getParagraphStyle: function(){
		return {
			textAlign: this._textAlign,
			textLineSpacing: this._textLineSpacing,
			styleFormat: {
				value: this._styleFormat,
				backupData:{
					textContainer: this.copyTextContainer(),
					textAlign: this._textAlign
				}
			},
			indentation: this._indent
		};
	},
	
	copyTextContainer: function(){
		var newTextContainer = [];
		for(var i=0; i<this._textContainer.length; i++){
			newTextContainer.push({
				offset: this._textContainer[i].offset, 
				style: this._textContainer[i].style.clone()
			});
		}
		return newTextContainer;
	},
		
	getTextLineSpacing: function(){
		return this._textLineSpacing;
	},
		
	
	setTextAlign: function(align){
		this._textAlign = align;
		//To update DOM status
		//TODO: current, simply to set text align property
		$("div[id="+this._id+"]").each(function(i){
			$(this).css('text-align', align);
		});
	},
	
	getTextAlign: function(){
		return this._textAlign;
	},
	
	registerStyle: function(){
		for(var i=0; i<this._textContainer.length; i++){
			com.kenny.util.TextStyleContainerUtils.register(this._textContainer[i].style);
		}
	},
	
	/**
	 * Validate style whether it is existed on style container, then return valid item, or return itself and push it into style container.
	 * 
	 * @param style required, the style object
	 * 
	 * @return the style
	 */
	_addStyle: function(style){
//		for(var i=0; i<this._styleContainer.length; i++){
//			if(this._styleContainer[i].equals(style)){
//				return this._styleContainer[i];
//			}
//		}
//		this._styleContainer.push(style);
		return style;
	},
	_getDefaultTextStyle: function(){
		if(!this._defaultTextStyle){
			if(this._textContainer.length > 0){
				this._defaultTextStyle = this._textContainer[0].style;
			}
			else{
				this._defaultTextStyle = new com.kenny.node.Style();
			}
		}
		return this._defaultTextStyle;
	},
	setDefaultTextStyle: function(textStyle){
		this._defaultTextStyle = textStyle;
	},
	/**
	 * Push text offset and style to paragraph.
	 * 
	 * @param text  required.
	 * @param style required, the object of Style class
	 */
	_pushOffsetStyle: function(offset, style){
		var lastTextItem = null;
		if(this._textContainer.length > 0 && (lastTextItem = this._textContainer[this._textContainer.length-1]).style.equals(style)){
			lastTextItem.offset = offset;
		}
		else{
			var newstyle = this._addStyle(style);
			if(lastTextItem && (lastTextItem.offset == 0)){
				lastTextItem.offset = offset;
				lastTextItem.style = newstyle;
			}
			else {
				this._textContainer.push({ offset: offset, style: newstyle });
			}
		}
	},
	/**
	 * Create paragraph DOM instance.
	 * 
	 * @return the paragraph DIV object
	 */
	_createDomInstance: function(){
		var domInstance = document.createElement("div");
		domInstance.setAttribute('objectType', this._type);
		domInstance.id = this._id;
		domInstance.className = "hr-paragraph-render";
		//domInstance.setAttribute('tempWidth', (this.getWidth()));
		com.kenny.util.BaseTool.setStyleProperty(domInstance.style, 'text-align', this._textAlign);
		//padding-top: 0px; padding-right: 54px; padding-left: 150px; padding-bottom: 0px; 
		return domInstance;
	},
	setPage: function(pageObj){
		this._page = pageObj;
	},
	getPage: function(){
		return this._page;
	},
	//getter-setter of property
	getIndent: function(key){
		return this._indent[key];
	},
	setIndent: function(key, value){
		this._indent[key] = value;
	},
	setWidth: function(_width){
		this._width = _width;
	},
	getWidth: function(){
		return this._width;
	},
	//Public Method, return full text 
	getFullText: function(){
		return this._text;
	},
	getTextContainer: function(){
		return this._textContainer;
	},
	getFirstCursorStyle: function(){
		return this._getDefaultTextStyle();
	},
	getLastCursorStyle: function(){
		return this._textContainer.length>0 ? this._textContainer[this._textContainer.length-1].style.clone(false) : this._getDefaultTextStyle().clone(false);
	},
	getIndentStyle: function(){
		var contentPadding = this._page.getContentPadding();
		var left = this._indent.left + contentPadding.left, right = this._indent.right + contentPadding.right;
		var firstLeft = left + this._indent.firstLine;
		return { left:left, right:right, firstLine:firstLeft };
		//padding-top: 0px; padding-right: 54px; padding-left: 150px; padding-bottom: 0px; 
	},
	changeAllStyle: function(styleData){
		this.changeStyle(styleData, 0, this._text.length);
	},
	/**
	 * Change style with the offset
	 * 
	 * @param style, require.
	 * @param from, optional. Default is the beginning of the paragraph
	 * @param to, optional. Default is the end of the paragraph
	 */
	changeStyle: function(styleData, from, to){
		if(from > to) {var tmp = from; from = to; to = tmp;}
		
		from = from ? from : 0;
		to = to ? to : this._text.length;

		this._splitTextWithOffset(from);
		this._splitTextWithOffset(to);
		
		var tmpTextContainer = this._textContainer;
		this._textContainer = [];
		for(var i=0; i<tmpTextContainer.length ;i++){
			var textStyle = tmpTextContainer[i];
			var offset = textStyle.offset;
			var tmpStyle = textStyle.style;
			var newStyle = tmpStyle.clone(true); newStyle.setData(styleData);
			
			if(textStyle.offset > from && textStyle.offset <= to){
				this._pushOffsetStyle(offset, newStyle);
			}
			else{
				this._pushOffsetStyle(offset, tmpStyle);
			}
		}	
		//Change default style
		if(from == 0){
			this._getDefaultTextStyle().setData(styleData);
		}
	},
	_splitTextWithOffset: function(offset){
		if(offset == 0){
			return;
		}
		for(var i=0; i<this._textContainer.length; i++){
			var textStyle = this._textContainer[i];
			if(textStyle.offset == offset){
				break;
			}
			else if(textStyle.offset > offset){
				var originalOffset = textStyle.offset;
				textStyle.offset = offset;
				this._textContainer.insert(i+1, { offset:originalOffset, style: textStyle.style});
				break;
			}
		}
	},
	/**
	 * Remove text from paragraph by offset position[from, to]. Default to remove the character which is pointed by cursor
	 * 
	 * @param fromOffset, require.
	 * @param endOffset, optional. Default is fromOffset-1. to remove cursor's left character
	 */
	removeTextByOffset: function(fromOffset, endOffset){
		
		endOffset = endOffset ? endOffset : fromOffset-1;
		
		if(fromOffset > endOffset) { var tmp = fromOffset; fromOffset = endOffset; endOffset = tmp; }
		//TODO: when it happened, it is supposed to append this paragraph to previous paragraph
		if(endOffset == 0){
			return;
		}
		var removeTextValue = this._text.substring(fromOffset,endOffset);

		this._splitTextWithOffset(fromOffset);
		this._splitTextWithOffset(endOffset);
		
		var tmpTextContainer = this._textContainer;
		this._textContainer = [];
		for(var i=0; i<tmpTextContainer.length ;i++){
			var textStyle = tmpTextContainer[i];
			if(textStyle.offset > endOffset || textStyle.offset <= fromOffset){
				var textStyleOffset = textStyle.offset; 
				if(textStyle.offset > endOffset){
					textStyleOffset -= endOffset-fromOffset;
				}
				this._pushOffsetStyle(textStyleOffset, textStyle.style);
			}
		}
		this._text = this._text.slice(0,fromOffset).concat(this._text.slice(endOffset));
		return removeTextValue;
	},
	/**
	 * Append the text at the specified offset.
	 * 
	 * @param offset, require. where to append the text
	 * @param text,   require. the text to be added
	 */
	setTextByOffset: function(offset, text){
		var rel = offset;
		var len = text.length;
		//Update offset values.
		for(var i=0;i<this._textContainer.length;i++){
			if(this._textContainer[i].offset >= offset){
				this._textContainer[i].offset += len;
			}
		}
		if(offset == 0 || this._text.length == 0){
			if(this._text.length == 0 && this._textContainer.length!=0){
				this._textContainer[0].offset = len;
			}
			else{
				this._textContainer.insert(0, {offset:len, style:this.getFirstCursorStyle() });
			}
			rel = len;
		}
		else{
			rel += len;
		}
		this._text = this._text.substring(0, offset) + text + this._text.substring(offset);
		
		this.changeStyle(this.getPage().getActiveStyle().getData(), offset, rel);
		return rel;
	},
	insertTextBySelection: function(offset, selection){
		
		var from = selection.paragraphs[0];
		var textContainer = from.getTextContainer();
		
		var fromOffset = selection.getFromOffset();
		var text = from.getFullText().substring(fromOffset);
		
		
		var copyParagraph = [];
		
		for (var i = 1 ; i <selection.paragraphs.length ; i++){
			copyParagraph.push(selection.paragraphs[i].clone());
		}
		
		if (selection.paragraphs.length == 0){
			text = from.getFullText().substring(fromOffset,selection.getToOffset());
		}

		var currParaIndex;
		var paragraphContainer = this._page._paragraphContainer;
		for(var i=0; i< paragraphContainer.length; i++){
			if (paragraphContainer[i].getId() == this._id ){
				currParaIndex = i;
				break;
			}
		}
		
		
		//insert from
		var insertTextContainer = [];
		for(var i = 0;i < textContainer.length; i++){
			if(textContainer[i].offset >= fromOffset){
				var textStyle = {};
				textStyle.offset = textContainer[i].offset - fromOffset;
				textStyle.style = textContainer[i].style.clone();
				insertTextContainer.push(textStyle);
			}
		}
		
		var leftTextContainer = [];
		var splitIndex = null;
		
		if (this._textContainer.length == 0){
			splitIndex = -1;
		}
		for(var i=0;i<this._textContainer.length;i++){
			if (this._textContainer[i].offset == offset){
				splitIndex = i;
			}
			if (this._textContainer[i].offset > offset){
				var textStyle = {};
				textStyle.offset = this._textContainer[i].offset - offset;
				textStyle.style = this._textContainer[i].style.clone();
				leftTextContainer.push(textStyle);
				if (isNaN(splitIndex)){
					splitIndex = i;
				}
			}
		}
		
		
		
		var leftText = this._text.substring(offset);
		if (offset != this._text.length){
			this.removeTextByOffset(offset, this._text.length);
		}
		
		
		this._text = this._text.substring(0, offset) + text;
		
		for(var i = 0 ; i < insertTextContainer.length ; i++, splitIndex++){
			this._textContainer.insert(splitIndex+1, {offset:offset + insertTextContainer[i].offset, style: insertTextContainer[i].style });
		}
		
		
		
		//insert paragraph
		for (var i = 0 ; i < copyParagraph.length ; i++){
			currParaIndex++;
			this._page.insertParagraph(currParaIndex, copyParagraph[i]);
			copyParagraph[i].refreshLineData();
		}
		
		var toOffset = selection.getToOffset();
		
		var lastParagraph;
		if (copyParagraph.length > 0){
			lastParagraph  = copyParagraph[copyParagraph.length - 1];
		}else{
			lastParagraph = this;
			toOffset = offset + selection.getToOffset() - selection.getFromOffset() ;
		}
		
		
		
		//insert to last select paragraph

			textContainer = lastParagraph.getTextContainer();
			var len = leftText.length;
		
			lastParagraph.removeTextByOffset(toOffset, lastParagraph.getFullText().length);
			
			for (var i = 0; i< leftTextContainer.length; i++){
				lastParagraph.getTextContainer().push({offset: toOffset + leftTextContainer[i].offset, style: leftTextContainer[i].style});
			} 
			lastParagraph._text =  lastParagraph._text + leftText;
		
		selection.setFrom(lastParagraph);
		
		selection.setFromOffset(toOffset);
		
		return selection;
	},
	/**
	 * Get span DOM item by the offset
	 * 
	 * @param offset required, the offset of the paragraph
	 * 
	 * @return the span DOM item
	 */
	getSpanItem: function(offset){
		var spanItem = null, previousOffset=0;
		var lineObj = null;
		for(var i=0; i<this._linesDataDivObjs.length; i++){
			//Exceed one page's height
			lineObj = this._linesDataDivObjs[i];
			if(this._linesData[i].offset >= offset){
				spanItem = lineObj.getDomInstanceByOffset(offset - previousOffset);
				break;
			}
			previousOffset = this._linesData[i].offset;
		}
		if(lineObj && (offset == 0 || this._text.length == 0)){
			spanItem = lineObj.getDomInstanceByOffset(0);
		}
		return spanItem;
	},
	/**
	 * Get the width of the span DOM, which is located at by the offset.
	 * 
	 * @param offset, require. where to append the text
	 * 
	 * @return the width
	 */
	getWidthWithOffset : function(offset, textOffset){
		var width = 0, height=0;
		var previousOffset=0, currentOffset = 0;
		for(var i=0; i<this._linesData.length; i++){
			currentOffset = this._linesData[i].offset;
			height = this._linesData[i].height;
			if(offset == 0 || this._text.length == 0 || textOffset == 0) break;
			if(offset > previousOffset && offset <= currentOffset){
				for(var j=0; j<this._linesData[i].data.length; j++){
					var textStyleWidth = this._linesData[i].data[j].text.length;
					//alert("offset="+offset+"\nbeginOffset="+beginOffset+"\nthis._linesData[i].data[j].text.length="+this._linesData[i].data[j].text.length);
					if( offset <= previousOffset + textStyleWidth ){
						var textStyleObj = this.getTextContainerByOffset(offset);
						com.kenny.util.TextHelper.changeStyle(textStyleObj.style);
						width = com.kenny.util.TextHelper.getWidth(this._text.substring(previousOffset, offset));
						break;
					}
					previousOffset += textStyleWidth;
				}
				if(textOffset!=undefined && textOffset == 0 && offset == currentOffset){
					width = 0;
				}
				//Only do calculate width when different of offset more than zero.
				break;
			}
			previousOffset = currentOffset;
		}
		return {width:width, height:height };
	},
	/**
	 * Get the text container, which contains the offset.
	 * 
	 * @param offset, require. the offset which is used for location
	 * @param isRangeFlag, optional. whether to find range style
	 * 
	 * @return the text container
	 */
	getTextContainerByOffset: function(offset, isCollapsed){
		if(isCollapsed != null && !isCollapsed){
			offset += 1;
		}
		var style = null;
		if(offset == 0 || this._text.length == 0){
			style = {offset:0, style:this.getFirstCursorStyle()};
		}
		else {
			for(var i=0;i<this._textContainer.length;i++){
				if(this._textContainer[i].offset >= offset){
					style = this._textContainer[i];
					break;
				}
			}
		}
		return style;
	},
	/**
	 * Get the text container, which contains the offset.
	 * 
	 * @param offset, require. the offset which is used for location
	 * 
	 * @return the text container
	 */
	getSpanOffsetByOffset: function(offset){
		var spanOffset = 0;
		if(offset == 0 || this._text.length == 0){
			return spanOffset;
		}
		var prevoius = 0;
		for(var i=0;i<this._textContainer.length;i++){
			if(this._textContainer[i].offset >= offset){
				return offset -= prevoius;
			}
			prevoius = this._textContainer[i].offset; 
		}
		return this._text.length - prevoius;
	},
	/**
	 * Append text width style to paragraph.
	 * 
	 * @param text  required. the text
	 * @param style required, the object of Style class
	 */
	appendText: function(text, style){
		this._text += text;
		var lastTextItem;
		if(this._textContainer.length > 0 && (lastTextItem = this._textContainer[this._textContainer.length-1]).style.equals(style)){
			lastTextItem.offset = this._text.length;
		}
		else{
			var newstyle = this._addStyle(style);
			this._textContainer.push({ offset: this._text.length, style: newstyle });
		}
	},
	/**
	 * It should be invoked to refresh line data, after any changes happened to text container or text.
	 */
	refreshLineData: function(){
		this._linesDataIsChange = true;
		this._tmpHeight = -1;
	},
	
	_createParagraphDomData: function(paragraphDivObj){
		var indentStyle = this.getIndentStyle();
		
		//Clear line data div object
		this._linesDataDivObjs = [];
		
		for(var i=0; i<this._linesData.length; i++){
			var lineObj = new com.kenny.model.LineModel(this, indentStyle, i);
			lineObj.setData(this._linesData[i]);
			this._linesDataDivObjs.push(lineObj);
			paragraphDivObj.appendChild(lineObj.getDomInstance());
		}
	},
	
	_gatherParagraphDomData: function(paragraphDivObj){
		$('div[id='+paragraphDivObj.id+']').each(function(index){
			$(this).children().each(function(){
				paragraphDivObj.appendChild(this);
			});
			if(this != paragraphDivObj){
				$(this).remove();
			}
		});
	},
	
	_clearAllParagraphDomData: function(paragraphDivObj){
		$('div[id='+paragraphDivObj.id+']').each(function(){
			if(this != paragraphDivObj){
				$(this).remove();
			}
			else {
				$(this).children().each(function(){
					$(this).remove();
				});
			}
		});
	},
	
	/**
	 * Update paragraph information into the DOM. 
	 * 
	 * @param isCascade  optional. Default to update following paragraph when it is necessary.
	 */
	updatePage: function(isCascade){
		isCascade = isCascade ? isCascade : false;
		//Find or create paragraph DOM object, and page DOM object which contains it.
		var paragraphDivObj = document.getElementById(this._id), pageDivObj = null;
		if(paragraphDivObj){
			pageDivObj = paragraphDivObj.parentNode;
			//Combine all data into same paragraph
			this._gatherParagraphDomData(paragraphDivObj);
		}
		else{
			paragraphDivObj = this._createDomInstance();
			pageDivObj = this.getPage().findLastPage();
			pageDivObj.appendChild(paragraphDivObj);
		}
		
		//When the paragraph is first item of the page, to check whether the previous page has enough space to push the first line of this paragraph
		var usedHeight = this.getPage().getUsedContentHeight(pageDivObj, paragraphDivObj), contentHeight = this.getPage()._getContentHeight();
		var minLineHeight = 10; //Default the minimal height
		
		var prevExistedPageDivObj = this.getPage().findExistedPrevPage(pageDivObj);
		if(usedHeight == 0 && prevExistedPageDivObj){
			var leftHeight = this.getPage().getLeftContentHeight(prevExistedPageDivObj);
			if(leftHeight > minLineHeight){
				pageDivObj = prevExistedPageDivObj;
				pageDivObj.appendChild(paragraphDivObj);
				
				usedHeight = this.getPage().getUsedContentHeight(pageDivObj, paragraphDivObj);
			}
		}
		
		//Check whether the changes happened to its attack items
		var attackItems = this.getAttackItems();
		if(this._linesDataIsChange || !com.kenny.model.BasicModelHelper.isEqualsList(this._pageAttackItems, attackItems)){
			this._pageAttackItems = attackItems;
			this._linesDataIsChange = true;
		}
		
		//Need to do refresh line data
		var needUpdateNextParagraph = false;
		if(this._linesDataIsChange){
			needUpdateNextParagraph = true;
			this._linesData = com.kenny.util.TextHelper.getLinesOfParagraph(this, this._pageStart);
			this._clearAllParagraphDomData(paragraphDivObj);
			this._createParagraphDomData(paragraphDivObj);
			this._linesDataIsChange = false;
		}
		
		//Backup the original paragraph
		//Need to move next page item
		var needToBeMovedParagraphDivObjs = [], totalHeight = 0;
		for(var i=0; i<this._linesData.length; i++){
			totalHeight += this._linesData[i].height;
		}
		if(usedHeight + totalHeight + minLineHeight > contentHeight){
			var needToBeMovedParagraphDivObj = paragraphDivObj.nextSibling;
			while(needToBeMovedParagraphDivObj && needToBeMovedParagraphDivObj.getAttribute('objectType') == 'Paragraph'){
				needToBeMovedParagraphDivObjs.push(needToBeMovedParagraphDivObj);
				needToBeMovedParagraphDivObj = needToBeMovedParagraphDivObj.nextSibling;
			}
		}
		//Do calculate paragraph layout
		//When paragraph has exceeded this page's height
		var index = 0, height = usedHeight, activeParagraphDivObj = paragraphDivObj, activePageDivObj = pageDivObj;
		for(var i=0; i<this._linesData.length; i++){
			var lineHeight = this._linesData[i].height + this._linesData[i].paddingTop;
			var lineDivObj = paragraphDivObj.children[index];
			if(height + lineHeight > contentHeight ){
				activeParagraphDivObj = ( i==0 ? paragraphDivObj : this._createDomInstance() );
				activePageDivObj = this.getPage().findNextPage(activePageDivObj);
				this.getPage().insertAfterBeginInPageDivObj(activePageDivObj, activeParagraphDivObj);
				
				//Record the existed dom object on the new page
				var needToBeMovedParagraphDivObj = activeParagraphDivObj.nextSibling;
				while(needToBeMovedParagraphDivObj && needToBeMovedParagraphDivObj.getAttribute('objectType') == 'Paragraph'){
					needToBeMovedParagraphDivObjs.push(needToBeMovedParagraphDivObj);
					needToBeMovedParagraphDivObj = needToBeMovedParagraphDivObj.nextSibling;
				}
				
				//Reset the existed height
				height = 0;
			}
			//Move to next line DOM 
			if(paragraphDivObj == activeParagraphDivObj){
				index++;
			}
			else{
				activeParagraphDivObj.appendChild(lineDivObj);
			}
			
			height += lineHeight;
		}
		
		//Append the paragraph following with this paragraph
		//var previousParagraphDivObj = activeParagraphDivObj;
		for(var i=needToBeMovedParagraphDivObjs.length-1; i>-1; i--){
			activeParagraphDivObj.insertAdjacentElement('afterEnd', needToBeMovedParagraphDivObjs[i]);
		}
		//Force to update next paragraph
		//Need to do update next paragraph, since this paragraph has been recalculated
//		if(needUpdateNextParagraph){
//			
//		}
//		else {
//			//Validate the left space
//			//var leftHeight = this.getPage().getLeftContentHeight(activePageDivObj);
//			if(leftHeight > 10){
//				needUpdateNextParagraph = true;
//			}
//			else if()
//		}
		//TODO: default to update the following page
		needUpdateNextParagraph = true;
		
		if(needUpdateNextParagraph && isCascade){
			this.getPage().updateDom(this);
		}
		
		return needUpdateNextParagraph;
	},
	/**
	 * Break the paragraph by the offset.
	 * 
	 * @param offset required, where to do break paragraph
	 * 
	 * @return new paragraph information. it contains paragraph object, the last span DOM item
	 */
	breakParagraph: function(offset, paragraphObj){
		if(paragraphObj){
			var newParagraph = paragraphObj;
			var newParagraphDivObj = newParagraph._createDomInstance();
			var spanObj = this.getSpanItem(offset);
			var paragraphDivObj = com.kenny.util.BaseTool.findElementWithType(spanObj, this._type);
			paragraphDivObj.insertAdjacentElement("afterEnd", newParagraphDivObj);
			
			this.removeTextByOffset(offset, this._text.length);
			this._page.insertAfter(this, newParagraph);
			newParagraph.refreshLineData();
			this.refreshLineData();
			this.updatePage(false);
			newParagraph.updatePage(true);
			return {obj:newParagraph, divObj:newParagraphDivObj.getElementsByTagName('SPAN')[0]};
		}
		else{
			var newParagraph = this.clone();
			var newParagraphDivObj = newParagraph._createDomInstance();
			var spanObj = this.getSpanItem(offset);
			var paragraphDivObj = com.kenny.util.BaseTool.findElementWithType(spanObj, this._type);
			paragraphDivObj.insertAdjacentElement("afterEnd", newParagraphDivObj);
			
			newParagraph.removeTextByOffset(0, offset);
			this.removeTextByOffset(offset, this._text.length);
			this._page.insertAfter(this, newParagraph);
			newParagraph.setDefaultTextStyle(this.getLastCursorStyle());
			newParagraph.refreshLineData();
			this.refreshLineData();
			this.updatePage(false);
			newParagraph.updatePage(true);
			return {obj:newParagraph, divObj:newParagraphDivObj.getElementsByTagName('SPAN')[0]};
		}
	},
	
	getPrevParagraph: function(){
		var paragraphContainer = this._page._paragraphContainer;
		for(var i=0; i< paragraphContainer.length; i++){
			if(paragraphContainer[i].getId() == this._id && i > 0){
				return paragraphContainer[i-1];
			}
		}
		return null;
	},
	
	getNextParagraph: function(){
		var paragraphContainer = this._page._paragraphContainer;
		for(var i=0; i< paragraphContainer.length; i++){
			if(paragraphContainer[i].getId() == this._id  && i < paragraphContainer.length - 1){
				return paragraphContainer[i+1];
			}
		}
		return null;
	},
	/**
	 * Combine paragraph, and choose previous one or following one by the parameter.
	 * 
	 * @param previousFlag required, whether to choose previous paragraph
	 * 
	 * @return the combined paragraph, the span DOM item pointed by the cursor and the offset
	 */
	conbineParagraph: function(previousFlag){
		var previousParagraph, paragraph;
		if (previousFlag){
			paragraph = this;
			previousParagraph = this.getPrevParagraph();
		}else{
			previousParagraph = this;	
			paragraph = this.getNextParagraph();
		}
		
		var offset = previousParagraph._text.length;
		previousParagraph._text += paragraph._text;
		for(var i=0; i<paragraph._textContainer.length; i++){
			previousParagraph._pushOffsetStyle(paragraph._textContainer[i].offset+offset, paragraph._textContainer[i].style);
		}
		this._page.removeParagraph(paragraph);
		
		previousParagraph.refreshLineData();
		previousParagraph.updatePage(true);
		
		var spanObj = previousParagraph.getSpanItem(offset);
		
		return { obj:previousParagraph, divObj:spanObj, offset:offset };
	},
	//Public Method, Clone object
	clone:function(){
		var cloneObj = new com.kenny.node.Paragraph();
		com.kenny.util.TextStyleContainerUtils.clearCache();
		this.registerStyle();
		cloneObj.setData(this.getData());
		return cloneObj;
	},
	//Public Method, Do set data for paragraph
	setData:function(data){
		if(data.width) this._width = data.width;
		if(data.text) this._text = data.text;
		if(data.style && data.style.length>0) {
			var styleData = data.style;
			
			this._textContainer = [];
			for(var i=0; i<styleData.length; i++){
				var styleObj = com.kenny.util.TextStyleContainerUtils.getById(styleData[i].style).clone();
				this._textContainer.push( { offset: styleData[i].offset, style: styleObj } );
			}
		}
		if(data.pageStart){
			this._pageStart = [];
			for(var i=0;i<data.pageStart.length;i++){
				this._pageStart.push(data.pageStart[i]);
			}
		}
		if(data.indent){ 
			for(var key in data.indent){  this.setIndent(key, data.indent[key]); }
		}
		if(data.textAlign) this._textAlign = data.textAlign;
		
		//Initialize default style
		this._getDefaultTextStyle();
		
	},
	setUndoData: function(undoData){
		
		this._textContainer = [];
		for(var i=0;i<undoData.style.length;i++){
			var styleData = undoData.style[i];
			this._textContainer.push({
				offset: styleData.offset,
				style: styleData.style.clone()
			});
		}

		this._text = undoData.text;
	},
	getUndoData: function(){
		var styleData = [];
		for(var i=0;i<this._textContainer.length;i++){
			styleData.push({
				offset: this._textContainer[i].offset,
				style: this._textContainer[i].style.clone()
			});
		}
		
		return {
			id: this._id,
			text: this._text,
			style: styleData
		};
	},
	//Public Method, return data format for paragraph 
	getData:function(){
		var styleData = [];
		for(var i=0;i<this._textContainer.length;i++){
			styleData.push({
				offset: this._textContainer[i].offset,
				style: this._textContainer[i].style.getId()
			});
		}
		var pageStart = [];
		//Backup page start
		for(var i=0; i<this._pageStart.length; i++){
			pageStart.push(this._pageStart[i]);
		}
		
//		//alert(JSON.stringify(this._linesData));
//		for(var i=0;i<this._linesData.length;i++){
//			//alert(JSON.stringify(this._linesData[i]));
//			if(this._linesData[i].pageEnd){
//				pageStart.push(this._linesData[i].offset);
//			}
//		}
		
		return {
			id: this._id,
			width: this._width,
			type: this._type,
			text: this._text,
			style: styleData,
			pageStart: pageStart,
			
			indent: this._indent,
			textAlign: this._textAlign,
			textLineSpacing: this._textLineSpacing,
			styleFormat: this._styleFormat
		};
	},
	/**
	 * @param top the top should be relative against on this paragraph
	 */
	getAvailablePosition: function(top, height, isFirstLine){
		
		var paragraphDivObj = document.getElementById(this._id);
		if(paragraphDivObj){
			pageDivObj = paragraphDivObj.parentNode;
		}
		else{
			pageDivObj = this.getPage().findLastPage();
		}
		
		//var leftHeight = this.getPage().getLeftContentHeight(pageDivObj, this._id);
		
		var positions = [];
		
		//var indentStyle = this.getIndentStyle();
		//var contentPadding = this._page.getContentPadding();
		
		var indentStyle = this.getIndentStyle();
		var contentWidth = this.getWidth() - indentStyle.right - (isFirstLine? indentStyle.firstLine: indentStyle.left);
		var begin = isFirstLine? indentStyle.firstLine: indentStyle.left;
		var end = begin + contentWidth;
		
		var attackItems = [];
		//Find cross absolute item, then append it into records
		for(var i=0; i<this._pageAttackItems.length; i++){
			var item = this._pageAttackItems[i];
			if(
					( top >= item.getTop() && top <= item.getHeight() + item.getTop() ) 
				 || ( top + height >= item.getTop() && top + height <= item.getHeight() + item.getTop() )
				 || ( item.getTop() >= top && item.getTop() <= top + height )
			){
				var j = 0;
				for(; j<attackItems.length ; j++){
					var attackItem = attackItems[j];
					if(attackItem.getLeft() > item.getLeft()){
						break;
					}
				}
				attackItems.insert(j, item);
			}
		}
		var left = begin;
		var previousEnd = begin; //position = {}, 
		//Split available positions
		for(var i=0; i<attackItems.length ; i++){
			var item = attackItems[i];
			var itemLeft = item.getLeft(), itemRight = item.getLeft() + item.getWidth();
			//Image left is behind of this left value
			if( itemLeft > left){
				positions.push({
					paddingLeft: (left - previousEnd),
					width: (itemLeft - left)
				});
				previousEnd = itemLeft;
				
				//Find next left
				for(var j=i+1; j<attackItems.length ; j++){
					var subItem = attackItems[j];
					var subItemLeft = subItem.getLeft(), subItemRight = subItem.getLeft() + subItem.getWidth();
					if(subItemLeft <= itemRight && subItemRight > itemRight){
						itemRight = subItemRight;
					}
				}
				left = itemRight; //TODO: Need to confirm why there some space is lost
			}
			//Image right is behind of this left value 
			else if(itemRight > left){
				left = itemRight;
			}
		}
		if(left < end){
			positions.push({
				paddingLeft: (left - previousEnd),
				width: (end - left)
			});
		}
		return positions;
	},
	
	getAttackItems: function(){
		var paragraphDivObj = document.getElementById(this._id);
		if(paragraphDivObj){
			pageDivObj = paragraphDivObj.parentNode;
		}
		else{
			pageDivObj = this._page.findLastPage();
		}
		
		var attackItems = [];
		var pageItems = this.getPage().getPageItemsWithPageDivObj(pageDivObj);
		
		var paragraphTop = 0, leftHeight = this.getPage().getLeftContentHeight(pageDivObj, this._id);
		var paragraphs = pageDivObj.children;
		
		//Find the beginning of the paragraph
		for(var i=0; i < paragraphs.length; i++){
			if(paragraphs[i].className.indexOf('hr-page-bottom') == -1){
				if(paragraphs[i].id == this._id){
					break;
				}
				paragraphTop += $(paragraphs[i]).height();
			}
		}
		if(pageItems.current){
			//Find the valid images or others absolute items
			for(var i=0; i<pageItems.current.length; i++){
				var item = pageItems.current[i];
				var itemLeft = item.getLeft()-10, itemTop = item.getTop() - 10, w = item.getWidth()+25, h = item.getHeight()+15;
				if(itemTop >= paragraphTop || itemTop + h > paragraphTop){
					//Cut down top beginning
					if(itemTop < paragraphTop) {
						h -= (paragraphTop - itemTop);
						itemTop = 0;
					}
					else itemTop -= paragraphTop;
					if(h + itemTop  > leftHeight){ //Only keep Current Page's images 
						h = leftHeight - itemTop;
					}
					var basicItem = new com.kenny.model.BasicModel(itemLeft, itemTop, w, h);
					
					var k = 0;
					for(; k<attackItems.length ; k++){
						var attackItem = attackItems[k];
						if(attackItem.getLeft() > basicItem.getLeft()){
							break;
						}
					}
					attackItems.insert(k, basicItem);
				}
			}
		}
		
		if(pageItems.next){
			//Find the valid images or others absolute items
			for(var i=0; i<pageItems.next.length; i++){
				var item = pageItems.next[i];

				var itemLeft = item.getLeft()-10, itemTop = item.getTop() - this.getPage().getHeaderHeight() - 10 + leftHeight, w = item.getWidth()+25, h = item.getHeight()+15;
				
				var basicItem = new com.kenny.model.BasicModel(itemLeft, itemTop, w, h);
				
				var k = 0;
				for(; k<attackItems.length ; k++){
					var attackItem = attackItems[k];
					if(attackItem.getLeft() > basicItem.getLeft()){
						break;
					}
				}
				attackItems.insert(k, basicItem);
			}
		}
		return attackItems;
	},
	
    /**
     * 
     * remove the DOM instance.
     */
    removeDom: function(){
        $("div[id="+this._id+"]").remove();
    }
});