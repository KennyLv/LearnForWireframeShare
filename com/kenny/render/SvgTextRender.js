/**
 * Svg Text class
 * @package com.kenny.node
 * @import com.kenny.util.BaseTool,com.kenny.util.NodeCache,com.kenny.util.TextStyleContainerUtils, com.kenny.model.SvgStyle
 * @author lu_feng
 */
com.kenny.render.SvgTextRender = function(container){
	this._type = "SvgTextRender";

	this._container = container;
};



com.kenny.render.SvgTextRender.prototype = {
	_id: null,
	_container: null,
	
	_renderData: null,
	_width: null,
	
	_getDefaultStyle: function(){
		var style = null;
		var stylesData = this._container._texts;
		if(stylesData && stylesData.styles && stylesData.styles.length>0){
			style = stylesData.styles[0].style;
		}
		else{
			style = new com.kenny.model.SvgStyle();
		}
		return style;
	},
	
	//Find previous character, and ignore the end character of paragraph.
	//Description: Since the beginning of paragraph is a special case, when to find previous character, it should be jump to the before position of the character('\n')
	findPreviousCharacterInfo: function(paraIdx, offset){
		var rel = {
			paraIdx: paraIdx,
			offset: offset
		};
		var texts = this._container._texts;
		var text = texts.text;
		
		//When previous character existed
		if(offset != 0){
			rel.offset -= 1;
		}
		//When previous existed
		else if(paraIdx > 0){
			rel.paraIdx -= 1;
			
			var idx = rel.paraIdx, prevEnd = 0, end = 0;
			while(idx-- >= 0){
				end = text.indexOf('\n', prevEnd);
				rel.offset = end - prevEnd;
				prevEnd = end + 1; //Consider the end character of paragraph
			}
		}
		//Clear information
		else{
			rel = null;
		}
		return rel;
	},
	
	//Find next character, and not contain the end character of paragraph('\n')
	findNextVisiableCharacterInfo: function(paraIdx, offset){
		var rel = {
			paraIdx: paraIdx,
			offset: offset
		};
		var texts = this._container._texts;
		var text = texts.text;
		
		//Find the length of the paragraph
		var length = 0;
		var idx = paraIdx, prevEnd = 0, end = text.length;
		while(idx-- > 0){
			prevEnd = text.indexOf('\n', prevEnd) + 1;  //Consider the end character of paragraph
		}
		
		if((end = text.indexOf('\n', prevEnd)) != -1){
			length = end - prevEnd;  //Do not Consider the end character of paragraph
		}
		else{
			end = text.length;
			length = end - prevEnd;
		}
		
		//When previous character existed
		if(offset < length){
			rel.offset += 1;
		}
		//When next existed
		else if(end < text.length){
			rel.paraIdx += 1;
			rel.offset = 0;
		}
		//Clear information
		else{
			rel = null;
		}
		return rel;
	},
	
	//Find next character, and contains the end character of paragraph('\n')
	findNextCharacterInfo: function(paraIdx, offset, containSpecialFlag){
		var rel = {
			paraIdx: paraIdx,
			offset: offset
		};
		var texts = this._container._texts;
		var text = texts.text;
		
		//Find the length of the paragraph
		var length = 0;
		var idx = paraIdx, prevEnd = 0, end = text.length;
		while(idx-- > 0){
			prevEnd = text.indexOf('\n', prevEnd) + 1;  //Consider the end character of paragraph
		}
		
		if((end = text.indexOf('\n', prevEnd)) != -1){
			length = end - prevEnd;  
			if(containSpecialFlag){
				length += 1; //Consider the end character of paragraph
			}
		}
		else{
			end = text.length;
			length = end - prevEnd;
		}
		
		//When previous character existed
		if(offset < length){
			rel.offset += 1;
		}
		//When next existed
		else if(end < text.length){
			rel.paraIdx += 1;
			rel.offset = 0;
		}
		//Clear information
		else{
			rel = null;
		}
		return rel;
	},
	
	_getAbsOffset: function(paraIdx, offset){
		var texts = this._container._texts;
		var text = texts.text;
		
		//Convert to full text's offset
		var paragraphOffset = 0;
		while(paraIdx-- > 0){
			paragraphOffset = text.indexOf('\n', paragraphOffset) + 1;
		}
		offset += paragraphOffset;
		
		return offset;
	},
	
	getStyleWidthOffset: function(paraIdx, offset){
		var style = null;
		
		var texts = this._container._texts;
		
		//Convert to full text's offset
		var absOffset = this._getAbsOffset(paraIdx, offset);
		
		//Find the target style
		for(var i=0; i<texts.styles.length; i++){
			var itemOffset = texts.styles[i].offset;
			//When it is the beginning of paragraph, don't follow the previous style
			if(itemOffset >= absOffset && offset != 0){
				style = texts.styles[i].style;
				break;
			}
		}
		
		//When there is no style found, use the default.
		if(!style){
			style = this._getDefaultStyle();
		}
		return style;
	},
	
	getItemWithOffset: function(paraIdx, offset){
		var item = null;
		
		//Find the target span item in DOM
		var textObj = this._container.getKeyBoardDomInstance().getElementsByTagName("text")[0];
		var paragraphOffset = 0, idx = 0;
		
		for(var i=0; i<textObj.childNodes.length; i++){
			var tspan = textObj.childNodes[i];
			//Move to new paragraph status
			if(tspan.getAttribute('objType') == 'paragraph' && i!=0){
				idx++;
				if(paraIdx < idx){
					break;
				}
			}
			//Same paragraph
			var len = tspan.childNodes[0].nodeValue.length;
			if(paraIdx == idx && paragraphOffset+len >= offset){
				item = tspan;
				break;
			}
			else if(paraIdx == idx){
				paragraphOffset += len;
			}
		}
		
		return item;
	},
	
	getItemWidthWithOffset: function(paraIdx, offset){
		var width = 0;
		//Special case for zero position
		if(offset!=0){
			//Convert to full text's offset
			offset = this._getAbsOffset(paraIdx, offset);
			
			var idx = 0;
			for(var i=0; i<this._renderData.length; i++){
				var paraData = this._renderData[i];
				for(var j=0; j<paraData.length; j++){
					var lineData = paraData[j];

					//style: itemStyle, text: itemWords, width: linesOffset[j].width
					for(var k=0; k<lineData.data.length; k++){
						var itemData = lineData.data[k];
						var style = itemData.style, text = itemData.text;
						if(idx + text.length >= offset){
							com.kenny.util.SvgTextHelper.changeStyle(style);
							return com.kenny.util.SvgTextHelper.getWidth(text.substring(0, offset - idx));
						}
						idx += text.length;
					}
				}
				idx += 1;
			}
		}
		return width;
	},
	
	setTextByOffset: function(paraIdx, offset, val){
		var texts = this._container._texts;
		var text = texts.text;
		
		//Convert to full text's offset
		offset = this._getAbsOffset(paraIdx, offset);

		var len = val.length;
		
		//add the break paragraph character '\n'
		var beginAddOffset = offset;
		if(val == '\n'){
			this._addNewBreakByOffset(texts.styles, offset);
			beginAddOffset++;
		}
		
		//
		var isNewParagraphFlag = true;
		for(var i=0; i<texts.styles.length; i++){
			var itemOffset = texts.styles[i].offset;
			if(itemOffset >= beginAddOffset){
				texts.styles[i].offset += len;
				isNewParagraphFlag = false;
			}
		}
		if(isNewParagraphFlag){
			texts.styles.push({
				offset: (text.length+len),
				style: texts.styles[texts.styles.length-1].style.clone()
			});
		}
		
		//Add text into storage
		texts.text = text.substring(0, offset) + val + text.substring(offset);
	},
	
	changeStyle: function(from, to, fromOffset, toOffset, style){
		var rel = [];
		
		var texts = this._container._texts;
		var styles = texts.styles;
		
		//Convert to full text's offset
		fromOffset = this._getAbsOffset(from, fromOffset);
		toOffset = this._getAbsOffset(to, toOffset);
		
		//Ensure the break point is split
		this._addNewBreakByOffset(styles, fromOffset);
		this._addNewBreakByOffset(styles, toOffset);
		
		for(var i=styles.length-1; i>-1; i--){
			if(styles[i].offset <= fromOffset){
				break;
			}
			//the selected text
			else if(styles[i].offset <= toOffset){
				rel.insert(0, styles[i].style.clone());
				styles[i].style.setData(style);
			}
		}
		
		return rel;
	},

	recoverStyle: function(from, to, fromOffset, toOffset, recoverStyleData){
		//Convert to full text's offset
		fromOffset = this._getAbsOffset(from, fromOffset);
		toOffset = this._getAbsOffset(to, toOffset);
		
		var texts = this._container._texts;
		var styles = texts.styles;
		
		var startIdx = 0;
		for(var i=styles.length-1; i>-1; i--){
			if(styles[i].offset <= fromOffset){
				startIdx = i;
				break;
			}
		}
		for(var i=0; i<recoverStyleData.length; i++){
			styles[i+startIdx+1].style = recoverStyleData[i].clone();
		}
		
		//remove same style
		this._combineSameStyle(texts.text, styles, startIdx);
		this._combineSameStyle(texts.text, styles, startIdx+recoverStyleData.length);
		
	},
	
	changeAllStyle: function(style){
		var texts = this._container._texts;
		var styles = texts.styles;
		for(var i=styles.length-1; i>-1; i--){
			styles[i].style.setData(style);
		}
	},
	
	getAllStyleData: function(){
		var rel = [];
		var texts = this._container._texts;
		var styles = texts.styles;
		for(var i=styles.length-1; i>-1; i--){
			rel.push({
				offset: styles[i].offset,
				style: styles[i].style.clone()
			});
		}
		return rel;
	},
	
	recoverAllStyle: function(allStyles){
		var texts = this._container._texts;
		var styles = texts.styles = [];
		
		for(var i=0; i<allStyles.length; i++){
			//styles[i].style = allStyles[i].clone();
			styles.push({
				offset: allStyles[i].offset,
				style: allStyles[i].style.clone()
			});
		}
	},
	
	_addNewBreakByOffset: function(styles, offset){
		if(offset > 0)
			for(var i=0; i<styles.length; i++){
				if(styles[i].offset == offset){
					break;
				}
				else if(styles[i].offset > offset){
					var style = styles[i].style;
					styles.insert(i, {
						offset: offset,
						style: style.clone()
					});
					break;
				}
			}
	},
	
	deleteText: function(from, to, fromRelavtiveOffset, toRelavtiveOffset){
		var texts = this._container._texts;
		
		//Convert to full text's offset
		var fromOffset = this._getAbsOffset(from, fromRelavtiveOffset);
		var toOffset = this._getAbsOffset(to, toRelavtiveOffset);
		
		//Delete text
		var removedtext = texts.text.substring(fromOffset, toOffset); 
		texts.text = texts.text.substring(0, fromOffset) + texts.text.substring(toOffset);
		
		//Delete offset&style
		var removedStyles = [];
		var styles = texts.styles;
		//Ensure the break point is split
		this._addNewBreakByOffset(styles, fromOffset);
		this._addNewBreakByOffset(styles, toOffset);
		//Do remove
		var startIdx = -1;
		for(var i=styles.length-1; i>-1; i--){
			if(styles[i].offset <= fromOffset){
				startIdx = i;
				break;
			}
			else if(styles[i].offset <= toOffset){
				removedStyles.push(styles[i]);
				if(styles.length > 1){
					styles.removeAt(i);
				}
				else{
					styles[i].offset = 0;
				}
			}
			//The following's offset need to be calculated 
			else {
				styles[i].offset -= toOffset - fromOffset;
			}
		}
		
		//remove same style
		this._combineSameStyle(texts.text, styles, startIdx);

		return {
			text: removedtext,
			styles: removedStyles,
			position: {
				from: from,
				fromOffset: fromOffset,
				to: to,
				toOffset: toOffset
			}
		};
	},
	
	_combineSameStyle: function(text, styles, index){
		if(index != -1 && index + 1 < styles.length){
			var beginOffset = styles[index].offset, endOffset = styles[index+1].offset;
			var noBreakingFlag = text.substring(beginOffset, endOffset).indexOf('\n')==-1;
			if(noBreakingFlag && styles[index].style.equals(styles[index+1].style)){
				styles.removeAt(index);
			}
		}
	},
	
	resetTexts: function(resetTextsData){
		var position = resetTextsData.position;
		var resetText = resetTextsData.text;
		var resetStyles = resetTextsData.styles;
		
		//Convert to full text's offset
		var absOffset = position.fromOffset;
		
		//Add text into container
		var texts = this._container._texts;
		texts.text = texts.text.substring(0, absOffset) + resetText + texts.text.substring(absOffset);
		
		//Add style into container
		var styles = texts.styles;
		
		var startIdx = -1;
		for(var i=0; i<styles.length; i++){
			if(styles[i].offset >= absOffset){
				if(startIdx == -1) startIdx = i;
				styles[i].offset += position.toOffset - position.fromOffset;
			}
		}
		
		//Break the begin offset position
		this._addNewBreakByOffset(styles, absOffset);
		
		//Append new styles
		for(var j=0; j<resetStyles.length; j++){
			styles.insert(startIdx+j+1, resetStyles[j]);
		}
		
		//remove same style
		this._combineSameStyle(texts.text, styles, startIdx + resetStyles.length);
		this._combineSameStyle(texts.text, styles, startIdx);
	},
	
	render: function(svgText, totalWidth, zoom, strokeWidth){
		strokeWidth = strokeWidth == null? 0: strokeWidth;
		//Clear history value
		while(svgText.childNodes.length>0){
			svgText.removeChild(svgText.childNodes[0]);
		}
		
		var renderData = [];
		
		var textArr = this._container._texts.text.split('\n');
		var align = this._container.getTextAlign();
		
		var stylesData = this._container._texts.styles;
		var offset = 0;
		
		for(var i=0; i<textArr.length; i++){
			renderData.push(com.kenny.util.SvgTextHelper.getLinesOfParagraph(textArr[i], stylesData, this._getDefaultStyle(), totalWidth-strokeWidth*2, offset));
			offset += textArr[i].length + 1;
		}
		var height = 0;
		for(var i=0; i<renderData.length; i++){
			var paraData = renderData[i];
			for(var j=0; j<paraData.length; j++){
				var width = 0;
				var lineData = paraData[j];
				var lineHeight = lineData.height; 
				height += lineHeight;
				
				if(i==0 && j==0){
					svgText.setAttribute('y', lineHeight * zoom);
				}
				var beginLeft = strokeWidth * zoom, totalLineWidth = 0, beginTop = strokeWidth;
				for(var k=0; k<lineData.data.length; k++){
					totalLineWidth += lineData.data[k].width;
				}
				if(align == 'center'){
					beginLeft += (totalWidth-totalLineWidth-strokeWidth*2)/2 * zoom;
				}
				else if(align == 'right'){
					beginLeft += (totalWidth-totalLineWidth-strokeWidth*2) * zoom;
				}
				for(var k=0; k<lineData.data.length; k++){
					var itemData = lineData.data[k];
					var style = itemData.style, text = itemData.text, itemWidth = itemData.width;
					var tSpanObj = this._createTSpan();
					tSpanObj.style.position = "absolute";
					tSpanObj.style.zIndex = "40";
					tSpanObj.setAttribute('x', width * zoom+beginLeft);
					tSpanObj.setAttribute('y', height * zoom+beginTop);
					//Paragraph start
					if(k==0 && j==0){
						tSpanObj.setAttribute('objType', "paragraph");
					}
					tSpanObj.appendChild(document.createTextNode(text.filterText()));
					svgText.appendChild(tSpanObj);
					style.copyToDom(tSpanObj, zoom); //TODO: To do special style for svg
					
					width += itemWidth;
				}
			}
		}
		height += 5 + strokeWidth*2; //Avoid to reach bottom
		if(height > this._container.getHeight()){
			this._container.setHeight(height, true);
			
			//Notify shape resize event
			var layoutListener = new com.kenny.util.Observer.Message();
			layoutListener.id = com.kenny.util.Observer.MessageType.SHAPE_LAYOUT;
			layoutListener.sender = this._container;
			layoutListener.data = {};
			com.kenny.util.Observer.sendMessage(layoutListener);
		}
		this._renderData = renderData;
	},
	
	
	_createTSpan: function(){
		return document.createElementNS("http://www.w3.org/2000/svg", 'tspan');
	}
	
	
};