/**
 * Text helper class
 * 
 * @package com.hoperun.util
 * @import com.hoperun.util.BaseTool, com.hoperun.node.Style
 * @dependent Jquery 3rd
 * @author lu_feng
 */
com.hoperun.util.TextHelper = {
	//private property
	_caculateItem: null,
	_lineSpacing: 1,
	
	_getCaculateItem: function(){
		if(!com.hoperun.util.TextHelper._caculateItem){
			var noVisibleItem = document.createElement("div");
			com.hoperun.util.BaseTool.setStyleProperties(noVisibleItem.style, {
				'z-index': -5000,
				'top': '-5000px',
				'left': '-5000px',
				'position': 'absolute'
			});
			var caculateItem = document.createElement("span");
			com.hoperun.util.BaseTool.setStyleProperties(caculateItem.style, {
				'white-space': 'nowrap'
			});
			noVisibleItem.appendChild(caculateItem);
			document.body.appendChild(noVisibleItem);
			this._caculateItem = $(caculateItem);
		}
		return this._caculateItem;
	},
	
	/**
	 * Change calculate object's style. It should be an instance of Style Class
	 * 
	 * @param styleObj required, the instance of Style Class
	 */
	changeStyle: function(styleObj){
		styleObj.copyToDom(this._getCaculateItem()[0]);
	},
	
	getOffsetWithWidth: function(words, width){
		var offset = 0, wordWidth=0;
		for(var i=0; i<words.length; i++){
			offset = i;
			txt = words.substring(0, i+1);
			wordWidth = this.getWidth(txt);
			if(wordWidth > width){
				break;
			}
		}
		return offset;
	},
	
	/**
	 * Set text into calculate item.
	 * @param text.
	 */
	setContent: function(text){
		if(text == ''){
			text = " ";
		}
		this._getCaculateItem().html(text.filterHTML());
	},
	
	/**
	 * Get text range on the real page, which is based on the style of calculate item.
	 * @param text to be calculate text value.
	 * @return text fact width and height
	 */
	getRect: function(text){
		if(text == '' || text == '\n'){
			text = " ";
		}
		var jqobj = this._getCaculateItem();
		jqobj.html(text.filterHTML()); //Filter special characters to adapt displays on the page.
		var height = Math.floor(jqobj.height() * this._lineSpacing);
		return { width: jqobj.width(), height: height };
	},
	
	/**
	 * Get text width on the real page, which is based on the default style of calculate item.
	 * @param text to be calculate text value.
	 * @return text fact width
	 */
	getWidth: function(text){
		if(text == ''){
			text = " ";
		}
		return this.getRect(text).width;
	},
	
	/**
	 * Get text height on the real page, which is based on the default style of calculate item.
	 * @param text to be calculate text value.
	 * @return text fact height
	 */
	getHeight: function(){
		return Math.floor(this._getCaculateItem().height() * this._lineSpacing);
	},
	
	/**
	 * Get text width on the real page, which is based on the default style of calculate item.
	 * @param word         required, the word value to be breaking.
	 * @param lineWidth    required, the line width, max size of a line
	 * @param contentWidth required, the line width, max size of a line
	 * @param usedWidth    optional, the used width.(Consider breaking word following other words)
	 *  
	 * @return the lines of breaking word
	 */
	getLinesByBreakingWord: function(word, lineWidth, contentWidth, usedWidth){
		usedWidth = usedWidth?usedWidth:0;
		
		var linesOffset = [];
		var txt, idx=0, width=0,prevousWidth=0;
		for(var i=0;i<word.length;i++){
			txt = word.substring(idx,i+1);
			width = this.getWidth(txt);
			if(width > lineWidth - usedWidth){
				linesOffset.push( { offset:i, width:prevousWidth } );
				usedWidth = 0;
				idx = i;
				lineWidth = contentWidth;
			}
			prevousWidth = width;
		}
		if(idx < word.length){
			linesOffset.push( { offset:word.length, width:prevousWidth } );
		}
		return linesOffset;
	},
	_convertArrayBySpaceString: function(text, breakingOffset){
		var rel = [];
		if(breakingOffset){
			var beginOffset = 0;
			for(var i=0;i<breakingOffset.length;i++){
				rel = rel.concat(this._convertArrayBySpaceString(text.substring(beginOffset, breakingOffset[i])));
				beginOffset = breakingOffset[i];
			}
			if(beginOffset!=text.length)
				rel = rel.concat(this._convertArrayBySpaceString(text.substring(beginOffset)));
			return rel;
		}
		var beginIndex = 0, endIndex;
		while((endIndex = text.indexOf(" ", beginIndex))!=-1){
			rel.push(text.substring(beginIndex, endIndex+1));
			beginIndex = endIndex+1;
		}
		if(beginIndex<text.length){
			rel.push(text.substring(beginIndex, text.length));
		}
		return rel;
	},
	_getPageBreakingOffset: function(begin, end, pageBreakingData){
		var breakingOffsetLst = [];
		for(var i=0; i<pageBreakingData.length; i++){
			if(pageBreakingData[i] > begin && pageBreakingData[i] <= end){
				breakingOffsetLst.push(pageBreakingData[i]);
			}
		}
		return breakingOffsetLst;
	},
	_addOffsetWord: function(breakingOffsetLst, diff){
		for(var i=0; i<breakingOffsetLst.length; i++){
			breakingOffsetLst[i] -= diff;
		}
		return breakingOffsetLst;
	},
	_validateBreakingPage: function(breakingOffsetLst){
		for(var i=0; i<breakingOffsetLst.length; i++){
			if(breakingOffsetLst[i]==0) return true;
		}
		return false;
	},
	
	_getValidAvailablePositionInNextLine: function(paragraph, top, wordWidth, lineHeight){
		var paddingLeft = 0, colIndex = 0;
		var width = 0, availableWidths = null;
		
		do{
			while((availableWidths = paragraph.getAvailablePosition(top, lineHeight, false)).length==0){
				top += lineHeight;
			}
			//Validate enough space to display word
			paddingLeft = 0; colIndex = 0; 
			paddingLeft = availableWidths[colIndex].paddingLeft; width = availableWidths[colIndex++].width; 
			
			//In the new line, do validate whether there is enough space left to append 
			while(wordWidth > width && colIndex < availableWidths.length){
				paddingLeft += availableWidths[colIndex].paddingLeft + width;
				width = availableWidths[colIndex++].width;
			}
			
			if(wordWidth > width) top += lineHeight;
		}while(wordWidth > width);
		
		return {
			top: top,
			paddingLeft: paddingLeft,
			colIndex: colIndex,
			availableWidths : availableWidths,
			width: width
		};
	},
	
	_getValidAvailablePosition: function(){
		
	},
	
	/**
	 * Get lines for paragraph text, based on its style and configuration.
	 * @param paragraph required, the paragraph information.
	 * @param pageStart optional, where is page breaking
	 * @return the lines of paragraph
	 */
	getLinesOfParagraph: function(paragraph, pageStart){
		this._lineSpacing =  paragraph.getTextLineSpacing();
		
		//define return item
		var lines = [];
		
		//prepare paragraph property
		var indentStyle = paragraph.getIndentStyle();
		var contentWidth = paragraph.getWidth() - indentStyle.left - indentStyle.right;
		var firstLineWidth = paragraph.getWidth() - indentStyle.firstLine - indentStyle.right;
		var fullText = paragraph.getFullText(), container = paragraph.getTextContainer();
		
		//variables defined
		var lineData = {}, tmpLine = [], item, lineWidth=0, beginOffset=0, offset=0;
		var width = firstLineWidth;
		var realWidth = firstLineWidth;

		//Add new line
		lineData.data = tmpLine;
		lineData.height = 0;
		lines.push(lineData);
		
		//Special Case
		if(fullText == ''){
			var itemStyle = paragraph.getFirstCursorStyle(); //Style object
			this.changeStyle(itemStyle);
			this.setContent(" "); //Avoid no content, zero height.
			var itemHeight = this.getHeight();
			itemStyle = itemStyle.clone();
			itemStyle.clearVisibleStyle();
			tmpLine.push({ style: itemStyle, text: ' ', width: 0 });
			lineData.height = itemHeight;
			lineData.paddingTop = 0; 
			lineData.offset = 0;
			return lines;
		}
		
		var availableWidths = null, colIdx = 0, top = 0, paddingLeft = 0, previousTop = 0;
		for(var i=0; i<container.length; i++){
			var itemStyle = container[i].style; //Style object
			var itemOffset = container[i].offset; //text's offset
			
			var pageBreaking = this._getPageBreakingOffset(beginOffset, itemOffset, pageStart);
			this._addOffsetWord(pageBreaking, beginOffset);
			var words = this._convertArrayBySpaceString(fullText.substring(beginOffset, itemOffset), pageBreaking); 
			//Do change style 
			this.changeStyle(itemStyle);
			this.setContent(" "); //Avoid no content, zero height.
			var itemHeight = this.getHeight();
			
			//Do set line height
			//lineData.height = itemHeight > lineData.height ? itemHeight : lineData.height;
			lineData.height = lineData.height==0 ? itemHeight : lineData.height;
			
			//Do find available widths
			if(!availableWidths){
				//Reset parameters for available widths
				previousTop = top; colIdx = 0; 
				//Find available position, which should contain one item at least
				while((availableWidths = paragraph.getAvailablePosition(top, itemHeight, true)).length==0){
					top += itemHeight;
					realWidth = contentWidth;
				}
				//Do set values for calculation
				width = availableWidths[colIdx].width;
				paddingLeft = availableWidths[colIdx].paddingLeft;
				lineData.paddingTop = (top - previousTop);
				colIdx++;
			}
			//Consider space to avoid break word
			var wordIndex = 0, itemWords = "", itemWidth = 0;
			
			do{
				var word = words[wordIndex++];
				if(this._validateBreakingPage(pageBreaking)){
					lineData.pageEnd = true;
					if(itemWidth > 0){
						item = { style: itemStyle, text: itemWords, width: itemWidth, paddingLeft: paddingLeft}; 
						tmpLine.push(item);
						
						//Reset padding left value, after adding item
						paddingLeft = 0;
						//Append offset of the item words length
						offset += itemWords.length;
						
						//Reset item words
						itemWords = "";
						itemWidth = 0;
					}
					//Only when line is not null to do insert new line
					if(lineWidth > 0){
						lineData.offset = offset;
						
						//New Line data
						tmpLine = [];
						lineData = { data: tmpLine, height:itemHeight };
						lines.push(lineData);
						
						//Reset line width
						lineWidth = 0;
					}
					
				}
				//Add word offset into the page breaking.
				this._addOffsetWord(pageBreaking, word.length);
				//Get word width
				var wordWidth = this.getWidth(word);
				
				//Default not to do break line
				var needBreakLine = false;
				//When new word leads to exceeding the span width
				if(lineWidth + wordWidth > width){
					//When the item variable is not empty
					if(itemWidth > 0){
						item = { style: itemStyle, text: itemWords, width: itemWidth, paddingLeft: paddingLeft};
						tmpLine.push(item);
						lineData.height = lineData.height<itemHeight ? itemHeight : lineData.height;
						
						//Reset padding left value, after adding item
						paddingLeft = width - lineWidth;
						//Append offset of the item words length
						offset += itemWords.length;
						
						//Reset item words
						itemWords = "";
						itemWidth = 0;
					}
					paddingLeft = width - lineWidth;
					//Try to find possible position in the same line
					while(colIdx < availableWidths.length){
						paddingLeft += availableWidths[colIdx].paddingLeft;
						width = availableWidths[colIdx].width;
						colIdx++;
						lineWidth = 0;
						
						if(lineWidth + wordWidth <= width){
							break;
						}
					}
					
					if(lineWidth + wordWidth > width){
						needBreakLine = true;
					}
				}
				//When to break line
				if(needBreakLine){
					//Save the previous line offset
					lineData.offset = offset; //Record the offset for this line
					
					//Record the end position of previous line
					previousTop = top = top + lineData.height;
					
					//New line data
					if(tmpLine.length>0){
						tmpLine = [];
						lineData = { data: tmpLine, height:itemHeight };
						lines.push(lineData);
						
						//clear item and line variable
						itemWords = "";
						itemWidth = 0;
						lineWidth = 0;
						
						realWidth = contentWidth;
					}
					//When width of the word exceeds the 1/3 of the content width, to do break word
					if( wordWidth > contentWidth/3 || width < contentWidth/3){
						//Do get new clear line, which is supposed not to contain any absolute item
						while((availableWidths = paragraph.getAvailablePosition(top, itemHeight, realWidth != contentWidth)).length != 1 || availableWidths[0].width != realWidth){
							top += itemHeight;
							realWidth = contentWidth;
						}
						
						//Reset padding left and span width value, after get new available data
						colIdx = 0;
						width = availableWidths[colIdx].width;
						paddingLeft = 0;
						//Do set padding top of the line
						lineData.paddingTop = (top - previousTop); 
						
						var linesOffset = this.getLinesByBreakingWord(word, width, contentWidth, 0);
						var offsetOfWord = 0;
						for(var j=0; j<linesOffset.length-1; j++){
							itemWords = word.substring(offsetOfWord, linesOffset[j].offset); //append with the piece of word
							
							offsetOfWord = linesOffset[j].offset; //offset of the piece of word
							lineWidth = linesOffset[j].width; //width of the piece of word
							
							//package words into one line item.
							item = { style: itemStyle, text: itemWords, width: linesOffset[j].width }; //TODO: breaking long word
							tmpLine.push(item);
							lineData.height = lineData.height<itemHeight ? itemHeight : lineData.height;
							
							offset += itemWords.length;
							lineData.offset = offset;
							
							
							//New line data
							tmpLine = [];
							lineData = { data: tmpLine, height:itemHeight };
							lines.push(lineData);
							
							previousTop = top = top + itemHeight;
							while((availableWidths = paragraph.getAvailablePosition(top, itemHeight, false)).length != 1){
								top += itemHeight;
								realWidth = contentWidth;
							}
							//Do set padding top of the line
							lineData.paddingTop = (top - previousTop); 
							
							
							//Reset padding left and span width value, after get new available data
							colIdx = 0;
							width = availableWidths[colIdx].width;
							paddingLeft = 0;
						}
						//Add last-line's width into new line				
						lineWidth = itemWidth = linesOffset[linesOffset.length-1].width;
						itemWords = word.substring(offsetOfWord, word.length);
						colIdx++;
					}
					//Move to next line
					else {
						var validPositionInNewLine = this._getValidAvailablePositionInNextLine(paragraph, top, wordWidth, itemHeight);
						top = validPositionInNewLine.top;
						paddingLeft = validPositionInNewLine.paddingLeft;
						colIdx = validPositionInNewLine.colIndex;
						availableWidths = validPositionInNewLine.availableWidths;
						width = validPositionInNewLine.width;
						
						//Do set padding top of the line
						lineData.paddingTop = (top - previousTop); 
						
						itemWidth = lineWidth = wordWidth;
						itemWords = word;
					}
				}
				//Add to this word to the span object.
				else{
					lineData.height = lineData.height<itemHeight ? itemHeight : lineData.height;
					itemWords += word;
					lineWidth += wordWidth;
					itemWidth += wordWidth;
				}
			}while(wordIndex < words.length);
			
			if(itemWords!=''){
				item = {style: itemStyle, text: itemWords, width: itemWidth, paddingLeft: paddingLeft};  paddingLeft = 0;
				offset += itemWords.length;
				tmpLine.push(item);
				lineData.height = lineData.height<itemHeight ? itemHeight : lineData.height;
			}
			
			if(this._validateBreakingPage(pageBreaking)){
				lineData.pageEnd = true;
				lineData.offset = offset;
				
				tmpLine = [];
				lineData = { data: tmpLine, height:itemHeight, offset: offset };
				lines.push(lineData);
				
				itemWords = "";
				itemWidth = 0;
				lineWidth = 0;
			}
			//Move The Next 
			beginOffset = itemOffset;
		}
		lineData.offset = offset;
		if(lineWidth == 0){
			lines.removeAt(lines.length-1);
		}
		
        this._lineSpacing =  1;
		return lines;
	},
	
};
