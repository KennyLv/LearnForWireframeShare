/**
 * SVG Text helper class
 * 
 * @package com.kenny.util
 * @import com.kenny.util.BaseTool, com.kenny.node.Style
 * @dependent Jquery 3rd
 * @author lu_feng
 */
com.kenny.util.SvgTextHelper = {
	//private property
	_caculateItem: null,
	_lineSpacing: 1,
	
	_getCaculateItem: function(){
		if(!this._caculateItem){
			var noVisibleItem = document.createElement("div");
			com.kenny.util.BaseTool.setStyleProperties(noVisibleItem.style, {
				'z-index': -5000,
				'width': '800px',
				'height': '600px',
				'position': 'absolute',
				'left':'-5000px',
				'top':'-5000px'
			});
			var svgObj = document.createElementNS("http://www.w3.org/2000/svg","svg");
			
			svgObj.style.position = "absolute";
			svgObj.setAttribute("xmlns:svg", "http://www.w3.org/2000/svg");
			svgObj.setAttribute("xmlns", "http://www.w3.org/2000/svg");
			svgObj.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
			svgObj.setAttribute("xmlns:inkscape", "http://www.inkscape.org/namespaces/inkscape");
			svgObj.setAttribute("version", "1.0");
			svgObj.setAttribute("top", 0);
			svgObj.setAttribute("left", 0);
			svgObj.setAttribute("width", 800);
			svgObj.setAttribute("height", 600);
			//z-index: 5000; width: 800px; height: 600px; position: absolute; left:10px;top:10px;
			var textItem = document.createElementNS("http://www.w3.org/2000/svg", 'text');
			var caculateItem = document.createElementNS("http://www.w3.org/2000/svg", 'tspan');
			
			caculateItem.appendChild(document.createTextNode(''));
			caculateItem.setAttribute('x',0);
			caculateItem.setAttribute('y',200);
			svgObj.appendChild(textItem);
			textItem.appendChild(caculateItem);
			
			noVisibleItem.appendChild(svgObj);
			document.body.appendChild(noVisibleItem);
			this._caculateItem = caculateItem;
		}
		return this._caculateItem;
	},
	
	/**
	 * Change calculate object's style. It should be an instance of Style Class
	 * 
	 * @param styleObj required, the instance of Style Class
	 */
	changeStyle: function(styleObj){
		styleObj.copyToDom(this._getCaculateItem());
	},
	
	/**
	 * Set text into calculate item.
	 * @param text.
	 */
	setContent: function(text){
		if(text==''){
			text = " ";
		}
		this._getCaculateItem().childNodes[0].nodeValue = text.filterText();
	},
	
	/**
	 * Get text range on the real page, which is based on the style of calculate item.
	 * @param text to be calculate text value.
	 * @return text fact width and height
	 */
	getRect: function(text){
		var item = this._getCaculateItem();
		if(text) this.setContent(text);
		var width, height;
		
		if(jQuery.browser.opera || item.offsetWidth == null){
			var rect = item.getBoundingClientRect();
			width = rect.width;
			height = rect.height;
    	}
		else{
			width = item.offsetWidth;
			height = item.offsetHeight;
		}
		height = Math.floor(height * this._lineSpacing);
		
		return { width: width, height: height };
	},
	
	/**
	 * Get text width on the real page, which is based on the default style of calculate item.
	 * @param text to be calculate text value.
	 * @return text fact width
	 */
	getWidth: function(text){
		return this.getRect(text).width;
	},
	
	/**
	 * Get text height on the real page, which is based on the default style of calculate item.
	 * @param text to be calculate text value.
	 * @return text fact height
	 */
	getHeight: function(text){
		return this.getRect(text).height;
	},
	
	/**
	 * Get the offset value of words by the specified width.
	 * @param words the words
	 * @param width the width
	 * @returns the offset
	 */
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
	 * Get text width on the real page, which is based on the default style of calculate item.
	 * @param word         required, the word value to be breaking.
	 * @param contentWidth required, the line width, max size of a line
	 * @param usedWidth    optional, the used line width
	 *  
	 * @return the lines of breaking word
	 */
	getLinesByBreakingWord: function(word, contentWidth, usedWidth){
		usedWidth = usedWidth ? usedWidth : 0;
		
		var linesOffset = [];
		var txt, idx=0, width=0, prevousWidth=0;
		
		for(var i=0; i<word.length; i++){
			txt = word.substring(idx,i+1);
			width = this.getWidth(txt);
			if(width > contentWidth - usedWidth){
				linesOffset.push( { offset:i, width:prevousWidth } );
				usedWidth = 0;
				idx = i;
				width = this.getWidth(word.substring(idx,i+1));
			}
			prevousWidth = width;
		}
		if(idx < word.length){
			linesOffset.push( { offset:word.length, width:prevousWidth } );
		}
		return linesOffset;
	},

	/**
	 * convert to array by the space char.
	 * @param text the text
	 * @returns {Array}
	 */
	_convertToArrayBySpaceChar: function(text){
		var rel = [];
		var beginIndex = 0, endIndex;
		while((endIndex = text.indexOf(" ", beginIndex))!=-1){
			rel.push(text.substring(beginIndex, endIndex+1));
			beginIndex = endIndex + 1;
		}
		if(beginIndex < text.length){
			rel.push(text.substring(beginIndex, text.length));
		}
		return rel;
	},
	
	/**
	 * Get lines for paragraph text, based on its style and configuration.
	 * @param paragraph required, the paragraph information.
	 * @param defaultStyle required,
	 * @param textBoxWidth required,
	 * @return the lines of paragraph
	 */
	getLinesOfParagraph: function(fullText, allStyles, defaultStyle, textBoxWidth, beginOffset){
		this._lineSpacing = 1;
		
		//define return item
		var lines = [];
		
		//prepare paragraph property

		var contentWidth = textBoxWidth;

		//variables defined
		var lineData = {}, tmpLine = [], item, lineWidth=0, offset=0, paraBeginOffset = 0;
		var width = contentWidth;

		//Add new line
		lineData.data = tmpLine;
		lineData.height = 0;
		lines.push(lineData);
		
		//Special Case
		if(fullText == ''){
			var itemStyle = defaultStyle; //Style object
			this.changeStyle(itemStyle);
			this.setContent(""); //Avoid no content, zero height.
			var itemHeight = this.getHeight();
			tmpLine.push({ style: itemStyle, text: '', width: 0 });
			lineData.height = itemHeight;
			lineData.offset = 0;
			return lines;
		}
		
		for(var i=0; i<allStyles.length; i++){
			var itemStyle = allStyles[i].style; //Style object
			var itemOffset = allStyles[i].offset; //text's offset
			
			if(allStyles[i].offset > beginOffset && allStyles[i].offset <= beginOffset + fullText.length){
				var words = this._convertToArrayBySpaceChar(fullText.substring(paraBeginOffset, itemOffset-beginOffset) );
				paraBeginOffset = itemOffset-beginOffset;
				
				//Do change style 
				this.changeStyle(itemStyle);
				var itemHeight = this.getHeight("Test");
				
				//Do set line height
				lineData.height = lineData.height==0 ? itemHeight : lineData.height;
				
				//Consider space to avoid break word
				var wordIndex = 0, itemWords = "", itemWidth = 0;
				
				do{
					var word = words[wordIndex++];
					//Get word width
					var wordWidth = this.getWidth(word);
					
					if(lineWidth + wordWidth > width){
						//When the item variable is not empty
						if(itemWidth > 0){
							item = { style: itemStyle, text: itemWords, width: itemWidth};
							tmpLine.push(item);

							offset += itemWords.length;
						}

						//New line data, Only when the line contains item data to add new line
						if(tmpLine.length > 0){
							tmpLine = [];
							lineData = { data: tmpLine, height:itemHeight };
							lines.push(lineData);
							
							//clear item and line variable
							itemWords = "";
							itemWidth = 0;
							lineWidth = 0;
						}
						
						//Save the previous line offset
						lineData.offset = offset; //Record the offset for this line
						
						//When width of the word exceeds the 1/3 of the content width, to do break word
						if( wordWidth > contentWidth/3 ){
							
							var linesOffset = this.getLinesByBreakingWord(word, width, 0);
							var offsetOfWord = 0;
							for(var j=0; j<linesOffset.length-1; j++){
								itemWords = word.substring(offsetOfWord, linesOffset[j].offset); //append with the piece of word
								
								offsetOfWord = linesOffset[j].offset; //offset of the piece of word
								
								//Save line's offset
								offset += itemWords.length;
								lineData.offset = offset;
								
								//package words into one line item.
								item = { style: itemStyle, text: itemWords, width: linesOffset[j].width };
								tmpLine.push(item);
								
								//New line data
								tmpLine = [];
								lineData = { data: tmpLine, height:itemHeight };
								lines.push(lineData);
							}
							//Add last-line's width into new line				
							lineWidth = itemWidth = linesOffset[linesOffset.length-1].width;
							itemWords = word.substring(offsetOfWord, word.length);
						}
						//Move to next line
						else {
							itemWidth = wordWidth;
							lineWidth = wordWidth;
							itemWords = word;
						}
					}
					else{
						lineData.height = lineData.height<itemHeight ? itemHeight : lineData.height;
						
						itemWords += word;
						lineWidth += wordWidth;
						itemWidth += wordWidth;
					}
					
				}while(wordIndex < words.length);
				
				
				if(itemWords!=''){
					item = {style: itemStyle, text: itemWords, width: itemWidth};
					offset += itemWords.length;
					tmpLine.push(item);
				}
			}
		}
		
		lineData.offset = offset;
		if(lineWidth == 0){
			lines.removeAt(lines.length-1);
		}
		
        this._lineSpacing =  1;
		return lines;
		
	}
	
};
