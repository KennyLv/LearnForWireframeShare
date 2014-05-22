com.hoperun.node.Text = function(){
	
	com.hoperun.node.Text.superClass.constructor.call(this);
	
	this._type = "Page";

	this._compositor = SimpleFlowCompositor;
	
	this._data  = null;
	
};

com.hoperun.util.BaseTool.extend(com.hoperun.node.Text,com.hoperun.node.Node);

com.hoperun.node.Text.prototype.getDomInstance =  function(){
	if (!this._domInstance){
		this._domInstance = document.createElement("div");
		this._domInstance.id = this._id;
				
		this._domInstance.className = "hr-view-editor";
		this._domInstance.objectType = this._type;
		this._domInstance.setAttribute('objectType', this._type);
		this._domInstance.setAttribute('tabindex', "1");
		$(this._domInstance).bind('mousedown', com.hoperun.event.MouseEvent.mouseDown).bind('mouseup', com.hoperun.event.MouseEvent.mouseUp);
	}
	return this._domInstance;
	
};

com.hoperun.node.Text.prototype.renderTo = function(container){
	
	var domInstance = this.getDomInstance();
	
	container.appendChild(domInstance);
	
	if (!this._data ){
		//TODO default initiation action
	}else{
		//compose
		this._compositor.setComposition(this);
		this._compositor.compose(this._data);
		
		//render pages
		for (var i = 0 ; i < this._children.length; i++){
			this._children[i].render();
		}
	}
	
};


com.hoperun.node.Text.prototype.setData = function(data){
	this._data  = data;
};

com.hoperun.node.Text.prototype.getData = function(){
	//TODO gather the data of self and the children
};



com.hoperun.node.Page = function(){
	
	com.hoperun.node.Page.superClass.constructor.call(this);
	
	this._width = null;
	
	this._height = null;
	
	this._padding = null;
	
	this._nodes = [];
	
	this._header = null;
	
	this._footer = null;

};

com.hoperun.util.BaseTool.extend(com.hoperun.node.Page,com.hoperun.node.Node);

com.hoperun.node.Page.prototype.getDomInstance = function(){
	if (!this._domInstance ){
		this._domInstance = document.createElement("DIV");
	}
	
	var parent = this._parent;
	
	if (!parent ||!parent.getDomInstance()){
		return null;
	}
	
	var $parent = $(parent.getDomInstance());
	
	if (this._parent.getDomInstance() !== this._domInstance.parentNode){
		var idx = parent.getChildren().indexOf(this);
		if ($parent.children().length === 0 || idx === $parent.children().length){
			$parent.append($(this._domInstance));
		}else{
			$parent.children().eq(idx).before($(this._domInstance));
		}
	}
	
	return this._domInstance;
	
};

com.hoperun.node.Page.prototype.render = function(){
	
	var domInstance = this.getDomInstance();
	
	var $div = $(domInstance);
	
	$div.css("height", this._height).css("width", this._width - this._padding.right - this._padding.left)
		.css("text-align","left").css("background-color","rgb(255, 255, 255)")
		.css("padding-top", this._padding.top)
		.css("padding-right", this._padding.right)
		.css("padding-bottom", this._padding.bottom)
		.css("padding-left", this._padding.left);
	$div.attr("class", "hr-page hr-page-paginated");

	if (this._footer){
		this._footer.render();
	}
	
	if (this._header){
		this._header.render();
	}
	
	for (var i = 0 ; i < this._children.length ; i++){
		this._children[i].render();
	};
	
	for (var i = 0 ;i < this._nodes.length; i++){
		var dom = this._nodes[i].getDomInstance();
		$dom = $(dom);
		$dom.css("left", (parseInt($dom.css("left")) + this._padding.left) + "px")
					.css("top",(parseInt($dom.css("top")) + this._padding.top) + "px");
		domInstance.appendChild(dom);
	}
	
};


com.hoperun.node.Page.prototype.getHeight = function(){
	return this._height;
};

com.hoperun.node.Page.prototype.setHeight = function(height){
	this._height = height;
};

com.hoperun.node.Page.prototype.getWidth = function(){
	return this._width;
};

com.hoperun.node.Page.prototype.setWidth = function(width){
	this._width = width;
};

com.hoperun.node.Page.prototype.setPadding = function(padding){
	this._padding = padding;
};

com.hoperun.node.Page.prototype.getPadding = function(){
	return this._padding;
};

com.hoperun.node.Page.prototype.setHeader = function(header){
	this._header = header;
	header.setParent(this);
};

com.hoperun.node.Page.prototype.getHeader = function(){
	return this._header;
};

com.hoperun.node.Page.prototype.setFooter = function(footer){
	this._footer = footer;
	footer.setParent(this);
};

com.hoperun.node.Page.prototype.getFooter = function(){
	return this._footer;
};

com.hoperun.node.Page.prototype.getOccupiedHeight = function(){
	var accumulatedHeight = 0;
	
	for (var i = 0 ; i < this._children.length ; i++){
		accumulatedHeight += this._children[i].getHeight();
	}
	
	return accumulatedHeight;
};

com.hoperun.node.Page.prototype.setNodes = function(nodes){
	if (nodes){
		this._nodes = nodes;
	}
};

com.hoperun.node.Page.prototype.popLine = function(){
	var line = this._children[this._children.length-1];
	this._children.splice(this._children.length-1, 1);
	return line;
};


com.hoperun.node.Page.prototype.getAvailablePosition = function(top, height, paddingLeft, paddingRight){
	var contentWidth = this._width - this._padding.left - this._padding.right - paddingLeft - paddingRight;
	var begin = paddingLeft;
	var end = begin + contentWidth;

	var positions = [];
	
	var attackItems = [];
	for ( var i = 0 ; i < this._nodes.length ; i++){
		var item = this._nodes[i];
		var itemTop = item.getTop();
		var itemBottom = item.getTop() + item.getHeight();
		if ((itemTop >= top && itemTop <= top + height) ||
		    (itemBottom >= top && itemBottom <= top + height) ||
			(itemTop <= top && itemBottom >= top + height)){
			
			for(var j = 0; j<attackItems.length ; j++){
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
			var paddingLeft = left - previousEnd;
			var width = itemLeft - left;
			
			//left margin
			if (left != begin){
				if (width >= 10){
					paddingLeft += 10;
					width -= 10;
				}else{
					paddingLeft = width;
					width = 0;
				}
				
				//make up the previous right margin
				if (positions.length > 0 ){
					paddingLeft += 10;
				}
			}
			
			//margin right if the itemRight don't contact the end 
			if (itemRight != end){
				if (width >= 10){
					width -= 10;
				}else{
					width = 0;
				}
			}
			
			if (width > 0){
				positions.push({
					paddingLeft: (paddingLeft),
					width: (width)
				});
			}
			
			previousEnd = itemLeft;
			
			//Find next left
			for(var j=i+1; j<attackItems.length ; j++){
				var subItem = attackItems[j];
				var subItemLeft = subItem.getLeft(), subItemRight = subItem.getLeft() + subItem.getWidth();
				if(subItemLeft <= itemRight && subItemRight > itemRight){
					itemRight = subItemRight;
				}
			}
			left = itemRight; 
		}
		//Image right is behind of this left value 
		else if(itemRight > left){
			left = itemRight;
		}
	}
	if(left < end){
		var paddingLeft = left - previousEnd;
		var width = end - left;
		
		//just need to set the left margin
		if (left != begin){
			if (width >= 10){
				paddingLeft += 10;
				width -= 10;
			}else{
				paddingLeft = width;
				width = 0;
			}
			
			//make up the previous right margin
			if (positions.length > 0 ){
				paddingLeft += 10;
			}
		}
		
		if (width > 0){
			positions.push({
				paddingLeft: (paddingLeft),
				width: (width)
			});
		}
		
	}
	
	//if positions.length = 0 then there must be attackItems
	if (positions.length == 0){
		var paddingTop = attackItems[0].getTop() + attackItems[0].getHeight();
		for (var i = 1 ;  i < attackItems.length; i++){
			var bottom = attackItems[i].getTop() + attackItems[i].getHeight();
			if (bottom < paddingTop){
				paddingTop = bottom;
			}
		}	
		return paddingTop;
	}
	
	return positions;
};


com.hoperun.node.Line = function(){
	
	com.hoperun.node.Line.superClass.constructor.call(this);
	
	this._width = null;
	
	this._paddingTop = 0;
	
	this._firstIndent = 0;
	
	this._leftIndent = 0;
	
	this._rightIndent = 0;
	
	this._textLineSpacing = 1;
	
	this._textAlign = null;
	
	this._paragraghIdx = null;
	
};

com.hoperun.util.BaseTool.extend(com.hoperun.node.Line,com.hoperun.node.Node);

com.hoperun.node.Line.prototype.getDomInstance = function(){
	if (!this._domInstance ){
		this._domInstance = document.createElement("DIV");
	}
	
	var parent = this._parent;
	
	if (!parent ||!parent.getDomInstance()){
		return null;
	}
	
	//offset the line's DOM instance cause by the DOM instance of the header and footer
	var offset = 0;
	offset += this._parent.getHeader() ? 1:0;
	offset += this._parent.getFooter() ? 1:0;

	var $parent = $(parent.getDomInstance());
	
	if (this._parent.getDomInstance() !== this._domInstance.parentNode){
		var idx = parent.getChildren().indexOf(this);
		if ($parent.children().length === offset || idx === $parent.children().length - offset){
			$parent.append($(this._domInstance));
		}else{
			$parent.children().eq(idx+offset).prepend($(this._domInstance));
		}
	}
	
	return this._domInstance;
	
};

com.hoperun.node.Line.prototype.render = function(){
	var domInstance = this.getDomInstance();
	
	var $div = $(domInstance);
	
	$div.css("height", this.getHeight());
	if (this._leftIndent + this._firstIndent){
		$div.css("padding-left", this._leftIndent + this._firstIndent);
	}
	if (this._rightIndent)	{
		$div.css("padding-right", this._rightIndent);
	}
	if (this._paddingTop){
		$div.css("padding-top", this._paddingTop);
	}
	
	for (var i = 0 ; i < this._children.length ; i++){
		this._children[i].render();
	};
	
};


com.hoperun.node.Line.prototype.getHeight = function(){
	var maxHeight = 0;
	var sectionHeight;
	
	//get the max height of all sections as the line height
	for (var i = 0 ; i < this._children.length ; i++){
		sectionHeight = this._children[i].getHeight();
		if ( sectionHeight > maxHeight){
			maxHeight = sectionHeight;
		};
	}
	return Math.floor(maxHeight*this._textLineSpacing);
};

com.hoperun.node.Line.prototype.getHoldHeight = function(){
	return this.getHeight() + this._paddingTop;
};

com.hoperun.node.Line.prototype.getWidth = function(){
	return this._width;
};

com.hoperun.node.Line.prototype.setWidth = function(width){
	this._width = width;
};

com.hoperun.node.Line.prototype.getOccupiedWidth = function(){
	var accumulatedWidth = 0;
	
	for (var i = 0 ; i < this._children.length ; i++){
		accumulatedWidth += this._children[i].getWidth();
	}
	
	return accumulatedWidth;
};

com.hoperun.node.Line.prototype.getFirstIndent = function(){
	return this._firstIndent;
};

com.hoperun.node.Line.prototype.setFirstIndent = function(firstIndent){
	this._firstIndent = firstIndent;
};

com.hoperun.node.Line.prototype.getLeftIndent = function(){
	return this._leftIndent;
};

com.hoperun.node.Line.prototype.setLeftIndent = function(leftIndent){
	this._leftIndent = leftIndent;
};

com.hoperun.node.Line.prototype.getRightIndent = function(){
	return this._rightIndent;
};

com.hoperun.node.Line.prototype.setRightIndent = function(rightIndent){
	this._rightIndent = rightIndent;
};

com.hoperun.node.Line.prototype.getTextAlign = function(){
	return this._textAlign;
};

com.hoperun.node.Line.prototype.setTextAlign = function(textAlign){
	this._textAlign = textAlign;
};

com.hoperun.node.Line.prototype.setTextLineSpacing = function(textLineSpacing){
	this._textLineSpacing = textLineSpacing;
};

com.hoperun.node.Line.prototype.peek = function(){
	if (this._children.length == 0){
		return null;
	}
	return this._children[this._children.length - 1];
};

com.hoperun.node.Line.prototype.setPaddingTop = function(paddingTop){
	this._paddingTop = paddingTop;
};

com.hoperun.node.Line.prototype.getPaddingTop = function(){
	return this._paddingTop;
};

com.hoperun.node.Line.prototype.getTop = function(){
	 var siblings = this._parent.getChildren();
	 var idx = siblings.indexOf(this);
	 
	 var top = 0;
	 for (var i = 0 ; i < idx; i++){
		 top += siblings[idx].getHoldHeight();
	 }
	 return top;
};


com.hoperun.node.Line.prototype.shiftSection = function(){
	if (this._children.length == 0){
		return null;
	}
	if (this._children.length > 1){
		this._children[1].setPaddingLeft(this._children[0].getPaddingLeft());
	}
	return this._children.shift();
};

com.hoperun.node.Line.prototype.getNextLine = function(){
	var sibling =  this._parent.getChildren();
	var idx = sibling.indexOf(this);
	if (idx < sibling.length - 1){
		return sibling[idx+1];
	}
	else{
		return null;
	}
};


com.hoperun.node.Line.prototype.repair = function(){
	var availableWidths = this.getParent().getAvailablePosition(this.getTop(), this.getHeight(),
			this.getFirstIndent() + this.getLeftIndent(), this.getRightIndent());
	var sectionIdx = 0;
	var startIdx = 0;
	var sections = this._children;
	var nextLine = this.getNextLine();

	for (var i = 0 ; i < availableWidths.length; i++){
		startIdx = sectionIdx;
		var currWidth = 0;
		while(currWidth < availableWidths[i].width && (sectionIdx < sections.length || getNextLineSections(this)) ){
			currWidth += sections[sectionIdx].getWidth();
			
			if (sections[sectionIdx].isBreakParagraph() &&  currWidth < availableWidths[i].width){
				break;
			}
			sectionIdx++;
		}
		
		for (var j = startIdx; j < sectionIdx - 1 ; j++){
			if ( j == startIdx){
				//make up the previous section's length
				var paddingLeft = availableWidths[i].paddingLeft;
				if (i > 0){
					paddingLeft += availableWidths[i-1].paddingLeft;
					var prevSection = sections[startIdx - 1];
					if (prevSection){
						paddingLeft -= prevSection.getWidth();
					}
				}
				sections[j].setPaddingLeft(paddingLeft);
			}else{
				sections[j].setPaddingLeft(0);
			}
		}
			
		
		//over width
		if (currWidth > availableWidths[i].width){
			//minus the last section width
			currWidth -= sections[sectionIdx - 1].getWidth();

			var leftWidth = availableWidths[i].width - currWidth;
			
			if (leftWidth > 0){
				var splitSection  = new com.hoperun.node.Section();
				splitSection.setStyle(sections[sectionIdx - 1].getStyle());
				do{
					//reduce the component of the section util it can be put into line
					splitSection.insert(sections[sectionIdx - 1].shiftWord());
				}while(splitSection.getWidth() < leftWidth);
				sections[sectionIdx - 1].insert(splitSection.popWord(), 0);
				// insert the splitSection section to the sections[]
				if (!splitSection.isEmpty()){
					this.insert(splitSection, sectionIdx - 1);
				}else{
					//left width too small to put anything
					sectionIdx--;
					continue;
				}
				
				if (sectionIdx - 1 == startIdx){
					//make up the previous section's length
					var paddingLeft = availableWidths[i].paddingLeft;
					if (i > 0){
						paddingLeft += availableWidths[i-1].width;
						var prevSection = sections[startIdx - 1];
						if (prevSection){
							paddingLeft -= prevSection.getWidth();
						}
					}
					sections[sectionIdx - 1].setPaddingLeft(paddingLeft);
				}else{
					sections[sectionIdx - 1].setPaddingLeft(0);
				}
			}
		}else if (sections[sectionIdx].isBreakParagraph()){
			//make up the previous section's length
			var paddingLeft = availableWidths[i].paddingLeft;
			if (i > 0){
				paddingLeft += availableWidths[i-1].width;
				var prevSection = this._children[sectionIdx - 1];
				if (prevSection){
					paddingLeft -= prevSection.getWidth();
				}
			}
			sections[sectionIdx].setPaddingLeft(paddingLeft);
			
			startIdx = ++sectionIdx;
			break;
		}else{
			break;
		}
	}
	
	//there are more sections the line can't contain
	if (sectionIdx < this._children.length){
		var firstSection = nextLine.getChildren()[0];
		for (var i = sections.length-1 ; i >= sectionIdx; i--){
			nextLine.insert(sections[i], 0);
			sections.removeAt(i);
		}
		if (firstSection){
			nextLine.getChildren()[0].setPaddingLeft(firstSection.getPaddingLeft());
			firstSection.setPaddingLeft(0);
		}
		
		nextLine.repair();
		
	}
	
	this.render();
	
	function getNextLineSections(line){	
		var nextSection = null;
		
		while(nextLine && !nextSection){
			nextSection = nextLine.shiftSection();
			if (!nextSection){
				nextLine.remove();
				nextLine = nextLine.getNextLine();
			}else{
				line.insert(nextSection);	
				return true;
			}
		}
		
		return false;
	}
};

com.hoperun.node.Section = function(){
	
	com.hoperun.node.Section.superClass.constructor.call(this);
	
	//update when set style
	this._height = null;
	
	this._paddingLeft = null;
	
	this._style = null;
	
	this._text = "";
	
};

com.hoperun.util.BaseTool.extend(com.hoperun.node.Section,com.hoperun.node.Node);

com.hoperun.node.Section.prototype.getDomInstance = function(){
	
	if (!this._domInstance ){
		this._domInstance = document.createElement("SPAN");
	}
	
	var parent = this._parent;
	
	if (!parent ||!parent.getDomInstance()){
		return null;
	}
	
	var $parent = $(parent.getDomInstance());
	
	if (this._parent.getDomInstance() !== this._domInstance.parentNode){
		var idx = parent.getChildren().indexOf(this);
		if ($parent.children().length === 0 || idx === $parent.children().length){
			$parent.append($(this._domInstance));
		}else{
			$parent.children().eq(idx).before($(this._domInstance));
		}
	}
	
	return this._domInstance;
	
};

com.hoperun.node.Section.prototype.render = function(){
	
	var domInstance = this.getDomInstance();
	
	//set styles
	this._style.copyToDom(domInstance);
	
	$domInstance = $(domInstance);
	
	if (this._paddingLeft){
		$domInstance.css("padding-left", this._paddingLeft);
	}
	
	if(this.isEmpty()){
		$domInstance.css("height", this.getHeight());
	}else{
		domInstance.innerHTML = this._text.filterHTML();
	}
	
	
};


com.hoperun.node.Section.prototype.getText = function(){
	return this._text;
};

com.hoperun.node.Section.prototype.setText = function(text){
	this._text = text;
};

com.hoperun.node.Section.prototype.setStyle = function(style){
	this._style = style;
};

com.hoperun.node.Section.prototype.getStyle = function(){
	return this._style;
};

com.hoperun.node.Section.prototype.insert = function(text,index){
	if (index >= 0){
		this._text = this._text.substring(0, index) + text + this._text.substring(index);
	}
	else{
		this._text += text;
	}
};

com.hoperun.node.Section.prototype.remove = function(from, to){
	this._text = this._text.substring(0,from) + this._text.substring(to);
};

com.hoperun.node.Section.prototype.getWidth = function(){
	if (!this._text || this._text === '\n'|| this._text.length === 0){
		return 0;
	}
	//可能没必要，因为render本身是根据属性来的，如果反过来从实际DOM对象来取长，宽的话
    //是非常不可靠的，逻辑上来说也是矛盾的.
	/*
	var domInstance = this.getDomInstance();
	if (domInstance && !this.isEmpty()){
		this.render();
		return $(domInstance).width();
	}else{
		var textHelper = com.hoperun.util.TextHelper;
		textHelper.changeStyle(this._style);
		return textHelper.getRect(this._text).width;
	}*/
	var textHelper = com.hoperun.util.TextHelper;
	textHelper.changeStyle(this._style);
	return textHelper.getRect(this._text).width;
	
};

com.hoperun.node.Section.prototype.getHeight = function(){
	var textHelper = com.hoperun.util.TextHelper;
	textHelper.changeStyle(this._style);
	return textHelper.getRect(this._text).height;
};

com.hoperun.node.Section.prototype.getHoldWidth = function(){
	return this.getWidth() + this._paddingLeft; 
};

com.hoperun.node.Section.prototype.isBreakParagraph = function(){
	return this._text.charAt(this._text.length - 1) === "\n";
};

com.hoperun.node.Section.prototype.shiftWord = function(){
	if (this.isEmpty()){
		return "";
	}
	var blankIdx = this._text.indexOf(" ");
	var shiftWord;
	if (blankIdx >= 0){
		//if blank if the first word, then shift the blank
		if (blankIdx == 0){
			blankIdx++;
		}
		//else shift the word
		shiftWord = this._text.substring(0, blankIdx);
		this._text = this._text.substring(blankIdx);
	}else{
		//if no blank, shift the total text
		shiftWord = this._text;
		this._text = "";
	}
	return shiftWord;
};

com.hoperun.node.Section.prototype.popWord = function(){
	if (this.isEmpty()){
		return "";
	}
	var blankIdx = this._text.lastIndexOf(" ");
	var popWord;
	if (blankIdx >= 0){
		//if the blank is not the last word, then pop the word
		//else pop the blank
		if (blankIdx != this._text.length - 1){
			blankIdx++;
		}
		popWord = this._text.substring(blankIdx, this._text.length);
		this._text = this._text.substring(0, blankIdx);
	}else{
		//if no blank, shift the total text
		popWord = this._text;
		this._text = "";
	}
	return popWord;
};

com.hoperun.node.Section.prototype.isEmpty = function(){
	if (!this._text || this._text == '' || this._text == '\n'){
		return true;
	}
	return false;
};

com.hoperun.node.Section.prototype.setPaddingLeft = function(paddingLeft){
	this._paddingLeft = paddingLeft;
};

com.hoperun.node.Section.prototype.getPaddingLeft = function(){
	return this.paddingLeft;
};


com.hoperun.node.Header = function(){
	
	com.hoperun.node.Header.superClass.constructor.call(this);
	
	this._text = null;
	
	this._align = null;
	
	this._height = null;

};

com.hoperun.util.BaseTool.extend(com.hoperun.node.Header, com.hoperun.node.Node);

com.hoperun.node.Header.prototype.getDomInstance = function(){
	if (!this._domInstance ){
		this._domInstance = document.createElement("DIV");
		this._domInstance.className = 'hr-page-header header-footer';
		this._domInstance.setAttribute('objectType', 'header');
		
		var contentDivObj = document.createElement("DIV");
		contentDivObj.style.padding = '10px 20px';
		contentDivObj.className = 'page-ruler-h-title';
		
		this._domInstance.appendChild(contentDivObj);
		
	}
	
	var parent = this._parent;
	
	if (!parent ||!parent.getDomInstance()){
		return null;
	}
	
	var $parent = $(parent.getDomInstance());
	
	if (this._parent.getDomInstance() !== this._domInstance.parentNode){
		$parent.prepend(this._domInstance);
	}
	
	return this._domInstance;
	
};

com.hoperun.node.Header.prototype.render = function(){
	
	var domInstance = this.getDomInstance();
	
	var $div = $(domInstance);
	
	var height = this._height;
	if (!this._height || this._height > this._parent.getPadding().top){
		height =this._parent.getPadding().top;
	}
	
	var width = this._parent.getWidth() - this._parent.getPadding().left - this._parent.getPadding().right;
	var left = this._parent.getPadding().left;
	var top = this._parent.getPadding().top - height;
	
	$div.css("text-align", this._align).css("height", height + "px").css("min-height", "0px")
	    .css("width",width).css("position", "absolute").css("left",left + "px").css("top",top + "px");
	
	$div.children().text(this._text);
};

com.hoperun.node.Header.prototype.setText = function(text){
	this._text = text;
};

com.hoperun.node.Header.prototype.setAlign = function(align){
	this._align = align;
};

com.hoperun.node.Header.prototype.setHeight = function(height){
	this._height = height;
};

com.hoperun.node.Footer = function(){
	
	com.hoperun.node.Footer.superClass.constructor.call(this);
	
	this._text = null;
	
	this._align = null;
	
	this._height = null;

};

com.hoperun.util.BaseTool.extend(com.hoperun.node.Footer, com.hoperun.node.Node);

com.hoperun.node.Footer.prototype.getDomInstance = function(){
	if (!this._domInstance ){
		this._domInstance = document.createElement("DIV");
		this._domInstance.className = 'hr-page-bottom header-footer';
		this._domInstance.setAttribute('objectType', 'footer');
		
		var contentDivObj = document.createElement("DIV");
		contentDivObj.style.padding = '10px 20px';
		
		this._domInstance.appendChild(contentDivObj);
	}
	
	var parent = this._parent;
	
	if (!parent ||!parent.getDomInstance()){
		return null;
	}
	
	var $parent = $(parent.getDomInstance());
	
	if (this._parent.getDomInstance() !== this._domInstance.parentNode){
		$parent.prepend(this._domInstance);
	}
	
	return this._domInstance;
};

com.hoperun.node.Footer.prototype.render = function(){
	
var domInstance = this.getDomInstance();
	
	var $div = $(domInstance);
	
	var height = this._height;
	if (!this._height || this._height > this._parent.getPadding().bottom){
		height = this._parent.getPadding().bottom;
	}
	
	var width = this._parent.getWidth() - this._parent.getPadding().left - this._parent.getPadding().right;
	var left = this._parent.getPadding().left;
	var bottom = this._parent.getPadding().bottom;
	
	$div.css("text-align", this._align).css("height", height + "px").css("min-height", "0px")
	    .css("width",width).css("position", "absolute").css("left",left + "px").css("bottom",bottom + "px");
	
	$div.children().text(this._text);
};

com.hoperun.node.Footer.prototype.setText = function(text){
	this._text = text;
};

com.hoperun.node.Footer.prototype.setAlign = function(align){
	this._align = align;
};

com.hoperun.node.Footer.prototype.setHeight = function(height){
	this._height = height;
};

var SimpleFlowCompositor = (function(){
	
	var data = null;
	
	var text = null;
	
	var styles = null;
	
	var allPageNodes = null;
	
	var composition = null;
	
	//sections cache for lazy load
	var sections = [];

	var PageProp = function(){
		return {
			height: data.height,
			width: data.width,
			padding: data.pageIndent
		};
	};

	var HeaderFooterProp = function(){
		return {
			header: {
				align: "left",
				text: "This is Header"
			},
			footer: {
				align: "right",
				text: "This is Footer"
			}
		};
		
		//return data.settings;
	};


	var ParagraphProp = function(idx){
		if (idx >= data.texts.length){
			return null;
		}
		return {
			indent: data.texts[idx].indent,
			textAlign: data.texts[idx].textAlign
		};
	};
	
	var getNodes = function(pageIdx){
		return allPageNodes[pageIdx];
	};
	
	
	var composePages = function(count){
		//for generate sections
		var lastBreak = 0;
		
		//for page property setting
		var setting = HeaderFooterProp();
		var pageProp = PageProp();
		
		//for paragraph property setting
		var paragraphIdx = 0;
		var paragraphProp = ParagraphProp(paragraphIdx);
		var nextFirstIndent = paragraphProp.indent.firstLine;
		
		var line = null;
		while( (!count || composition.getChildren().length < count) && (sections.length !== 0 || genSection())){
			var page = new com.hoperun.node.Page();
				
			if (setting){
				var header = new com.hoperun.node.Header();
				header.setText(setting.header.text);
				header.setAlign(setting.header.align);
							
				var footer = new com.hoperun.node.Footer();
				footer.setText(setting.footer.text);
				footer.setAlign(setting.footer.align);
					
				page.setHeader(header);
				page.setFooter(footer);
			}
				
				
			page.setHeight(pageProp.height);
			page.setWidth(pageProp.width);
			page.setPadding(pageProp.padding);
						
			page.setNodes(getNodes(composition.getChildren().length));
				
			//the line over the prev page height
			if(line){
				page.insert(line);
			};
		
			
			var currLineTop = 0;
			
			while(sections.length > 0 || genSection()){
			
				line = genTextLine(page, sections, currLineTop);
				currLineTop += line.getHoldHeight();
					
				page.insert(line);

				if (page.getOccupiedHeight() > page.getHeight()){
					page.popLine();
					break;
				}
			}
			
			composition.insert(page);
			
		}
		
		function genSection(){
			//break the sections
			if (styles.length > 0){
				var section = new com.hoperun.node.Section();
				
				section.setText(text.substring(lastBreak, styles[0].offset));
				section.setStyle(styles[0].style);
					
				var breakIdx;
				while ((breakIdx = isBreakSection(section.getText())) >= 0){
					var sectionText = section.getText();
					
					var splitSection = new com.hoperun.node.Section();
					splitSection.setText(sectionText.substring(0 ,breakIdx + "\n".length));
					splitSection.setStyle(section.getStyle());
					section.setText(sectionText.substring(breakIdx + "\n".length) );
					
					sections.push(splitSection);
				}
				sections.push(section);
				
				lastBreak = styles[0].offset;
				styles.splice(0,1);
				
				return true;
			}
			return false;
		};
		
		function isBreakSection(text){
			var idx = text.indexOf("\n");
			if (idx >= 0 && idx < text.length - "\n".length){
				return idx;
			}
			return -1;
		};
		
		function genTextLine(page, sections, currLineTop){
			var line = new com.hoperun.node.Line();
			line.setWidth(page.getWidth() - page.getPadding().left - page.getPadding().right);
			line.setFirstIndent(nextFirstIndent);
			line.setLeftIndent(paragraphProp.indent.left);
			line.setRightIndent(paragraphProp.indent.right);
			line.setTextAlign(paragraphProp.textAlign);
			line.setTextLineSpacing(1.25);
			
			
			var lineHeight = Math.floor(sections[0].getHeight()*1.25);
			
			//var leftParam = nextFirstIndent ? nextFirstIndent : line.getLeftIndent();
			var leftParam = nextFirstIndent + line.getLeftIndent();
			var availableWidths = page.getAvailablePosition(currLineTop, lineHeight, leftParam, line.getRightIndent());
			
			//if there is no available widths
			//TODO test
			while (!availableWidths.length){
				var paddingTop = availableWidths + 1;
				line.setPaddingTop(line.getPaddingTop() + paddingTop);
				line.setTop(line.getTop() + paddingTop);
				
				currLineTop += paddingTop;
				
				availableWidths = page.getAvailablePosition(currLineTop, lineHeight, leftParam, line.getRightIndent());
			}
			
			var sectionIdx = 0;
			var startIdx = 0;
			outerLoop : 
			for (var i = 0; i < availableWidths.length; i++){
				startIdx = sectionIdx;
				var currWidth = 0;
				while((sectionIdx < sections.length || genSection())&& currWidth < availableWidths[i].width){
					currWidth += sections[sectionIdx].getWidth();
					
					//if the section is going to break pagragraph and the current available width is enough
					if (sections[sectionIdx].isBreakParagraph() &&  currWidth < availableWidths[i].width){
						break;
					}
					
					sectionIdx++;
				}
				
				for (var j = startIdx; j < sectionIdx - 1 ; j++){
					if ( j == startIdx){
						//make up the previous section's length
						var paddingLeft = availableWidths[i].paddingLeft;
						if (i > 0){
							paddingLeft += availableWidths[i-1].paddingLeft;
							var prevSection = line.peek();
							if (prevSection){
								paddingLeft -= prevSection.getWidth();
							}
						}
						sections[j].setPaddingLeft(paddingLeft);
					}
					
					//check if the section being put into the line will cause available widths changes 
					if (checkAvailableChanges(page, sections[j],currLineTop, lineHeight)){
						startIdx = j;
						break outerLoop;
					}
					line.insert(sections[j]);
				}
								
				//over width
				if (currWidth > availableWidths[i].width){
					//minus the last section width
					currWidth -= sections[sectionIdx - 1].getWidth();

					var leftWidth = availableWidths[i].width - currWidth;
					
					if (leftWidth > 0){
						var splitSection  = new com.hoperun.node.Section();
						splitSection.setStyle(sections[sectionIdx - 1].getStyle());
						do{
							//reduce the component of the section util it can be put into line
							splitSection.insert(sections[sectionIdx - 1].shiftWord());
						}while(splitSection.getWidth() < leftWidth);
						sections[sectionIdx - 1].insert(splitSection.popWord(), 0);
						// insert the splitSection section to the sections[]
						if (!splitSection.isEmpty()){
							sections.insert(sectionIdx - 1,splitSection);
						}else{
							//left width too small to put anything
							sectionIdx--;
							continue;
						}
						

						//push into the line
						if (checkAvailableChanges(page, sections[sectionIdx - 1], currLineTop, lineHeight)){
							sectionIdx--;
							break;
						}
						
						if (sectionIdx - 1 == startIdx){
							//make up the previous section's length
							var paddingLeft = availableWidths[i].paddingLeft;
							if (i > 0){
								paddingLeft += availableWidths[i-1].width;
								var prevSection = line.peek();
								if (prevSection){
									paddingLeft -= prevSection.getWidth();
								}
							}
							sections[sectionIdx - 1].setPaddingLeft(paddingLeft);
						}
						line.insert(sections[sectionIdx - 1]);
						
						nextFirstIndent= 0;
						
					}else{
						//left width is 0
						sectionIdx--;
						
						nextFirstIndent = 0;
					};
				}else if (!sections[sectionIdx]){
					//no more sections
					//make up the previous section's length
					var paddingLeft = availableWidths[i].paddingLeft;
					if (i > 0){
						paddingLeft += availableWidths[i-1].width;
						var prevSection = line.peek();
						if (prevSection){
							paddingLeft -= prevSection.getWidth();
						}
					}
					sections[sectionIdx - 1].setPaddingLeft(paddingLeft);
					line.insert(sections[sectionIdx - 1]);
					break;
					
				}else{
					//break paragraph
					paragraphProp = ParagraphProp(++paragraphIdx);
					
					//if there's next paragraph, udpate the nextFirstindent
					if (paragraphProp){
						nextFirstIndent = paragraphProp.indent.firstLine;
					}
					
					//if the first section of the line, then it's not nessary to check the changes
					if (line.length && checkAvailableChanges(page, sections[sectionIdx],currLineTop, lineHeight)){
						break;
					}
					
					//make up the previous section's length
					var paddingLeft = availableWidths[i].paddingLeft;
					if (i > 0){
						paddingLeft += availableWidths[i-1].width;
						var prevSection = line.peek();
						if (prevSection){
							paddingLeft -= prevSection.getWidth();
						}
					}
					sections[sectionIdx].setPaddingLeft(paddingLeft);
					
					line.insert(sections[sectionIdx]);
					//break paragraph
					
					startIdx = ++sectionIdx;
					break;
					
				};
			}
			
			sections.splice(0,sectionIdx);
			
			return line;
		};
		
		function checkAvailableChanges(page, section, currLineTop, lineHeight){
			var thisHeight = section.getHeight();
			if (thisHeight > lineHeight){
				var newAvailableWidths = page.getAvailablePosition(currLineTop, thisHeight);
				if (newAvailableWidths.length && availableWidths.lenght === newAvailableWidths.length){
					for (var i = 0 ; i < availableWidths.length; i++){
						if (availableWidths[i].paddingLeft !== newAvailableWidths[i].paddingLeft ||
							availableWidths[i].width !== newAvailableWidths[i].width){
							return false;
						}
					}
				};
			}
			return false;
		};
		
	};
	
	
	return {
		setComposition: function(acomposition){
			composition = acomposition;
		},
		
		compose: function(adata){
			
			data = adata;
			text = "";
			
			for (var i = 0 ; i < data.texts.length; i++){
				text += data.texts[i].text;
				if (i < data.texts.length - 1){
					text += "\n";
				}
			}
			
			
			com.hoperun.util.TextStyleContainerUtils.setAllData(data.styles, true);
			
			styles = [];
			var accumulatedOffset = 0;
			for (var i = 0 ; i < data.texts.length; i++){
				//offset should be plus with previous text length and length of "\n"
				//and if paragraph has no texts, the total length is the length of "\n" which is 1
				var offset = "\n".length;
				for (var j = 0 ; j < data.texts[i].style.length ; j++){
					offset = data.texts[i].style[j].offset + accumulatedOffset;
					var styleObj = com.hoperun.util.TextStyleContainerUtils.getById(data.texts[i].style[j].style).clone();
					
					if ( j == data.texts[i].style.length - 1){
						styles.push( { offset: ++offset, style: styleObj ,breakParagraph: true} );
					}else{
						styles.push( { offset: offset, style: styleObj } );
					}
					
				}

				//previous paragraph's last offset as the accumulated offset
				if (data.texts[i].style.length > 0){
					accumulatedOffset = offset;
				}else{
					accumulatedOffset += offset;
				}
			}
			
			
			
			allPageNodes = {};
			for (var i = 0 ; i < data.nodes.length; i++){
				var pageIndex = data.nodes[i].pageIndex;
				var pageNodes = data.nodes[i].pageNodes;
				
				if (!allPageNodes[pageIndex]){
					allPageNodes[pageIndex] = [];
				}
			
				
				if (pageIndex !=null && pageNodes){
					for (var i = 0; i < pageNodes.length; i++){
						var node = pageNodes[i];
						var zIndex = 0;
						var passSelf = false;
						for (var j = 0; j < pageNodes.length; j++){
							var tmpNode = pageNodes[j];
							if ((tmpNode.zIndex == node.zIndex && passSelf == false) || tmpNode.zIndex < node.zIndex){
								zIndex++;
							}
							if (tmpNode == node){
								passSelf = true;
							}
						}
						pageNodes[i].zIndex = 1010 + zIndex*10;
					}
				}
				
				for (var i = 0 ; i < pageNodes.length ; i++){
				    var node = com.hoperun.util.BaseTool.createNode(pageNodes[i].type);
					node.setData(pageNodes[i]);
					allPageNodes[pageIndex].push(node);
				}
			}
			
			composePages();
		}
	};
	
})();