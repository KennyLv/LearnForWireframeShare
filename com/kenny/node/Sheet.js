/**
 * Sheet class
 * @package com.kenny.node
 * @import com.kenny.util.BaseTool,com.kenny.util.NodeCache,com.kenny.shape.Circle,com.kenny.node.Text,com.kenny.node.Table,com.kenny.node.Cell,com.kenny.node.Image
 * @author xuliyu
 */
com.kenny.node.Sheet = function(){
	com.kenny.node.Sheet.superClass.constructor.call(this);
	this._domInstance = document.createElement("div");
	this._domInstance.id = this._id;
	this._childNodes = [];
	this._domInstance.style.position = "relative";
	this._type = "Sheet";
	com.kenny.util.NodeCache.add(this.getId(), this);
	this._domInstance.setAttribute("objectType", this._type);
	
	this._registerSheetListener(this._domInstance);
	
	com.kenny.util.BaseTool.addForbiddenPropagation(this._domInstance);
	com.kenny.util.BaseTool.actsAsAspect(this);
};

com.kenny.util.BaseTool.extend(com.kenny.node.Sheet,com.kenny.node.Node);

com.kenny.util.BaseTool.augment(com.kenny.node.Sheet,{
    ///////////////////////////////////////////////////////////////////////////////////////
	_activeCursorPosition: {
		x: 0,
		y: 0
	},
	
    setCursorPosition: function (relativePos) {
        this._activeCursorPosition = relativePos;
    },
    getCursorPosition: function () {
        return this._activeCursorPosition;
    },
    ///////////////////////////////////////////////////////////////////////////////////////

    _childNodes: null,

    _sheetName: null,
    
    _sheetNum:null,

    //position
    _position: null, //static | absolute | fixed | relative 
    _display: null, //block | none | inline
    _visibility: null, //inherit | visible | hidden 
    _zIndex: null, //number
    _overflow: {//visible | auto | hidden | scroll 
        x: null,
        y: null
    },
    _whiteSpace: null, //normal|nowrap|pre
    _clip: null, //auto | rect ( number number number number ) 
    _float: null, //none | left | right 
    _clear: null, //none | left | right | both 

    //box model
    _width: null,
    _height: null,
    _top: null,
    _right: null,
    _bottom: null,
    _left: null,
    _margin: {//auto | length 
        top: null,
        right: null,
        bottom: null,
        left: null
    },
    _padding: {//auto | length 
        top: null,
        right: null,
        bottom: null,
        left: null
    },
    _border: {
        top: {
            width: null,
            color: null,
            style: null//none | hidden | dotted | dashed | solid | double | groove | ridge | inset | outset 
        },
        right: {
            width: null,
            color: null,
            style: null
        },
        bottom: {
            width: null,
            color: null,
            style: null
        },
        left: {
            width: null,
            color: null,
            style: null
        }
    },
    _boxShadow: null, //<length> <length> <length> <length> || <color>

    //other
    _cursor: null, // auto | all-scroll | col-resize| crosshair | default | hand | move | help | no-drop | not-allowed | pointer | progress | row-resize | text | vertical-text | wait | *-resize | url ( url ) 
    _listStyleImage: null, //none | url ( url ) 
    _listStylePosition: null, //outside | inside 
    _listStyleType: null, //disc | circle | square | decimal | lower-roman | upper-roman | lower-alpha | upper-alpha | none | armenian | cjk-ideographic | georgian | lower-greek | hebrew | hiragana | hiragana-iroha | katakana | katakana-iroha | lower-latin | upper-latin 
    _markerOffset: null, //auto | length 

    _registerSheetListener: function (sheetDivObj) {
        var self = this;
        $(sheetDivObj).droppable({
            //accept: ".node-moveable",
            //activeClass: 'droppable-active',
            //hoverClass: 'droppable-hover',
            drop: function (event, ui) {
            	var item = ui.draggable.data("item");
                var targetDivObj = sheetDivObj;
                var targetPageDivObjPos = com.kenny.util.BaseTool.getAbsPostionInContainer(targetDivObj);

                var left = ui.position.left - targetPageDivObjPos.x < 0 ? 0 : ui.position.left - targetPageDivObjPos.x;
                var top = ui.position.top - targetPageDivObjPos.y < 0 ? 0 : ui.position.top - targetPageDivObjPos.y;

                if (item.getType() == 'Table') {
                	
            	    // send current table`s position
                    var msg = new com.kenny.util.Observer.Message();
                    msg.id = com.kenny.util.Observer.MessageType.TABLE_POSITION;
                    msg.sender = item;
                    msg.data = {'left':left + 10 ,'top':top ,'self':self};
                    com.kenny.util.Observer.sendMessage(msg);
                    
                    var message = new com.kenny.util.Observer.Message();
                    message.id = com.kenny.util.Observer.MessageType.TABLE_FOCUS;
                    message.sender = item;
                    com.kenny.util.Observer.sendMessage(message);
                }
                else if (item.getType() == 'Image') {
                	//item.setLeft(left); item.setTop(top);
                	var msg = new com.kenny.util.Observer.Message();
                    msg.id = com.kenny.util.Observer.MessageType.IMAGE_POSITION;
                    msg.sender = item;
                    msg.data = {'left':left ,'top':top ,'self':self};
                    com.kenny.util.Observer.sendMessage(msg);
                	
            	    //com.kenny.util.BaseTool.doValidPosition(self, item);
                    var message = new com.kenny.util.Observer.Message();
                    message.id = com.kenny.util.Observer.MessageType.IMAGE_FOCUS;
                    message.sender = item;
                    com.kenny.util.Observer.sendMessage(message);
                }
                else {
                    if(item.getType().indexOf("Chart_") == 0){
                        var msg = new com.kenny.util.Observer.Message();
                        msg.id = com.kenny.util.Observer.MessageType.CHART_POSITION;
                        msg.sender = item;
                        msg.data = {'left':left ,'top':top ,'self':self};
                        com.kenny.util.Observer.sendMessage(msg);
                    }
                    else if(item.getType().indexOf("Shape_") == 0){
//                      item.setLeft(left); item.setTop(top);
//                      com.kenny.util.BaseTool.doValidPosition(self, item);
                        var msg = new com.kenny.util.Observer.Message();
                        msg.id = com.kenny.util.Observer.MessageType.SHAPE_POSITION;
                        msg.sender = item;
                        msg.data = {'left':left ,'top':top ,'self':self};
                        com.kenny.util.Observer.sendMessage(msg);
                        
                        var message = new com.kenny.util.Observer.Message();
                        message.id = com.kenny.util.Observer.MessageType.SHAPE_FOCUS;
                        message.sender = item;
                        com.kenny.util.Observer.sendMessage(message);   
                    }
                }
            }
        });

        $(sheetDivObj).click(function (evt) {
            var relativePos = com.kenny.util.BaseTool.getRelativeCoordinates(evt, sheetDivObj);
            self.setCursorPosition(relativePos);
            
    		var msg = new com.kenny.util.Observer.Message();
            msg.id = com.kenny.util.Observer.MessageType.CONTEXT_BLUR;
            msg.sender = null;
            com.kenny.util.Observer.sendMessage(msg);
        });
    },
    setPosition: function (position) {
        this._domInstance.style.position = position;
        this._position = position;
    },
    setDisplay: function (display) {
        this._domInstance.style.display = display;
        this._display = display;
    },
    setVisibility: function (visibility) {
        this._domInstance.style.visibility = visibility;
        this._visibility = visibility;
    },
    setZIndex: function (zIndex) {
        this._domInstance.style.zIndex = zIndex;
        this._zIndex = zIndex;
    },
    setOverflow: function (overflow) {//{x:null,y:null,all:null}
        if (overflow.all != null) {
            this._domInstance.style.overflow = overflow.all;
            this._overflow = {
                x: overflow.all,
                y: overflow.all
            };
        } else {
            this._domInstance.style.overflowX = overflow.x;
            this._domInstance.style.overflowY = overflow.y;
            this._overflow = {
                x: overflow.x,
                y: overflow.y
            };
        }
    },
    setWhiteSpace: function (whiteSpace) {
        this._domInstance.style.whiteSpace = whiteSpace;
        this._whiteSpace = whiteSpace;
    },
    setClip: function (clip) {
        this._domInstance.style.clip = clip;
        this._clip = clip;
    },
    setFloat: function (float) {
        this._domInstance.style.float = float;
        this._float = float;
    },
    setClear: function (clear) {
        this._domInstance.style.clear = clear;
        this._clear = clear;
    },

    setSheetName: function (sheetname) {
        this._sheetName = sheetname;
    },
    
    setSheetNum: function (sheetNum) {
        this._sheetNum = sheetNum;
    },

    setWidth: function (width) {
        this._domInstance.style.width = width;
        this._width = width;
    },
    setHeight: function (height) {
        this._domInstance.style.height = height;
        this._height = height;
    },
    setTop: function (top) {
        this._domInstance.style.top = top;
        this._top = top;
    },
    setRight: function (right) {
        this._domInstance.style.right = right;
        this._right = right;
    },
    setBottom: function (bottom) {
        this._domInstance.style.bottom = bottom;
        this._bottom = bottom;
    },
    setLeft: function (left) {
        this._domInstance.style.left = left;
        this._left = left;
    },
    setMargin: function (margin) {//{top:null,right:null,bottom:null,left:null,all:null}
        if (margin.all != null) {
            this._domInstance.style.margin = margin;
        } else {
            this._domInstance.style.marginTop = margin.top;
            this._domInstance.style.marginRight = margin.right;
            this._domInstance.style.marginBottom = margin.bottom;
            this._domInstance.style.marginLeft = margin.left;
        }
        this._margin = {
            top: this._domInstance.style.marginTop,
            right: this._domInstance.style.marginRight,
            bottom: this._domInstance.style.marginBottom,
            left: this._domInstance.style.marginLeft
        };
    },
    setPadding: function (padding) {//{top:null,right:null,bottom:null,left:null,all:null}
        if (padding.all != null) {
            this._domInstance.style.padding = padding;
        } else {
            this._domInstance.style.paddingTop = padding.top;
            this._domInstance.style.paddingRight = padding.right;
            this._domInstance.style.paddingBottom = padding.bottom;
            this._domInstance.style.paddingLeft = padding.left;
        }
        this._padding = {
            top: this._domInstance.style.paddingTop,
            right: this._domInstance.style.paddingRight,
            bottom: this._domInstance.style.paddingBottom,
            left: this._domInstance.style.paddingLeft
        };
    },
    setBorder: function () {

    },
    setBoxShadow: function (boxShadow) {
        this._domInstance.style.boxShadow = boxShadow;
        this._boxShadow = boxShadow;
    },
    setCursor: function (cursor) {
        this._domInstance.style.cursor = cursor;
        this._cursor = cursor;
    },
    setListStyleImage: function (listStyleImage) {
        this._domInstance.style.listStyleImage = listStyleImage;
        this._listStyleImage = listStyleImage;
    },
    setListStylePosition: function (listStylePosition) {
        this._domInstance.style.listStylePosition = listStylePosition;
        this._listStylePosition = listStylePosition;
    },
    setListStyleType: function (listStyleType) {
        this._domInstance.style.listStyleType = listStyleType;
        this._listStyleType = listStyleType;
    },
    setMarkerOffset: function (markerOffset) {
        this._domInstance.style.markerOffset = markerOffset;
        this._markerOffset = markerOffset;
    },
    getPosition: function () {
        return this._position;
    },
    getDisplay: function () {
        return this._display;
    },
    getVisibility: function () {
        return this._visibility;
    },
    getZIndex: function () {
        return this._zIndex;
    },
    getOverflow: function () {
        return this._overflow;
    },
    getWhiteSpace: function () {
        return this._whiteSpace;
    },
    getClip: function () {
        return this._clip;
    },
    getFloat: function () {
        return this._float;
    },
    getClear: function () {
        return this._clear;
    },
    getSheetName: function () {
        return this._sheetName;
    },
    getSheetNum: function () {
        return this._sheetNum;
    },
    getWidth: function () {
        return this._width;
    },
    getHeight: function () {
        return this._height;
    },
    getTop: function () {
        return this._top;
    },
    getRight: function () {
        return this._right;
    },
    getBottom: function () {
        return this._bottom;
    },
    getLeft: function () {
        return this._left;
    },
    getMargin: function () {
        return this._margin;
    },
    getPadding: function () {
        return this._padding;
    },
    getBorder: function () {
        return this._border;
    },
    getBoxShadow: function () {
        return this._boxShadow;
    },
    getCursor: function () {
        return this._cursor;
    },
    getListStyleImage: function () {
        return this._listStyleImage;
    },
    getListStylePosition: function () {
        return this._listStylePosition;
    },
    getListStyleType: function () {
        return this._listStyleType;
    },
    getMarkerOffset: function () {
        return this._markerOffset;
    },
    appendChild: function (childNode) {
        this._domInstance.appendChild(childNode.getDomInstance());
        this._childNodes.push(childNode);
    },
    //Remove Child
    removeChild: function (childNode) {
        var idx = this._childNodes.indexOf(childNode);
        if (idx != -1) {
            this._childNodes.removeAt(idx);
            this._domInstance.removeChild(childNode.getDomInstance());
        }
    },
    
    getAllElements:function(){
		return this._childNodes;
	},

    //Only for Node Class, 公共方法 指定位置插入元素
    /**
    * @see DOM's insertAdjacentElement method
    * @param sWhere Required. String that specifies where to insert the HTML element, using one of the following values: 
    *          beforeBegin Inserts oElement immediately before the object. 
    * 			afterEnd    Inserts oElement immediately after the end of the object. 
    * @param oElement Required. Object that specifies the element to be inserted adjacent to the object that invoked the insertAdjacentElement method 
    * @param parentNode Required.
    */
    /**
    * @see DOM's insertAdjacentElement method
    * @param sWhere Required. String that specifies where to insert the HTML element, using one of the following values: 
    *          beforeBegin Inserts oElement immediately before the object. 
    * 			afterEnd    Inserts oElement immediately after the end of the object. 
    * @param oElement Required. Object that specifies the element to be inserted adjacent to the object that invoked the insertAdjacentElement method 
    * @param parentNode Required.
    */
    insertAdjacentElement: function (sWhere, oElement, parentNode) {
        //this.getDomInstance().insertAdjacentElement(sWhere, oElement.getDomInstance());
        var parsedNode = oElement.getDomInstance();
        var selfDom = this.getDomInstance();
        var idx = parentNode._childNodes.indexOf(this);
        switch (sWhere) {
            case "beforeBegin":
                selfDom.parentNode.insertBefore(parsedNode, selfDom);
                parentNode._childNodes.insert(idx, oElement);
                break;
            case "afterBegin":
                selfDom.insertBefore(parsedNode, selfDom.firstChild);
                break;
            case "beforeEnd":
                selfDom.appendChild(parsedNode);
                break;
            case "afterEnd":
                if (selfDom.nextSibling)
                    selfDom.parentNode.insertBefore(parsedNode, selfDom.nextSibling);
                else
                    selfDom.parentNode.appendChild(parsedNode);
                parentNode._childNodes.insert(idx + 1, oElement);
                break;
        }

    },
    //公共对象 根据数据对象设置对象属性
    setData: function (data) {
        if (data.sheetName != null && data.sheetName != this._sheetName) this.setSheetName(data.sheetName);
        if (data.sheetNum != null && data.sheetNum != this._sheetNum) this.setSheetNum(data.sheetNum);
        if (data.position != null && data.position != this._position) this.setPosition(data.position);
        if (data.display != null && data.display != this._display) this.setDisplay(data.display);
        if (data.visibility != null && data.visibility != this._visibility) this.setVisibility(data.visibility);
        if (data.zIndex != null && data.zIndex != this._zIndex) this.setZIndex(data.zIndex);
        if (data.overflow != null && data.overflow != this._overflow) this.setOverflow(data.overflow);
        if (data.whiteSpace != null && data.whiteSpace != this._whiteSpace) this.setWhiteSpace(data.whiteSpace);
        if (data.clip != null && data.clip != this._clip) this.setClip(data.clip);
        if (data.float != null && data.float != this._float) this.setFloat(data.float);
        if (data.clear != null && data.clear != this._clear) this.setClear(data.clear);
        if (data.width != null && data.width != this._width) this.setWidth(data.width);
        if (data.height != null && data.height != this._height) this.setHeight(data.height);
        if (data.top != null && data.top != this._top) this.setTop(data.top);
        if (data.right != null && data.right != this._right) this.setRight(data.right);
        if (data.bottom != null && data.bottom != this._bottom) this.setBottom(data.bottom);
        if (data.left != null && data.left != this._left) this.setLeft(data.left);
        if (data.margin != null && data.margin != this._margin) this.setMargin(data.margin);
        if (data.padding != null && data.padding != this._padding) this.setPadding(data.padding);
        if (data.border != null && data.border != this._border) this.setBorder(data.border);
        if (data.boxShadow != null && data.boxShadow != this._boxShadow) this.setBoxShadow(data.boxShadow);
        if (data.cursor != null && data.cursor != this._cursor) this.setCursor(data.cursor);
        if (data.listStyleImage != null && data.listStyleImage != this._listStyleImage) this.setListStyleImage(data.listStyleImage);
        if (data.listStylePosition != null && data.listStylePosition != this._listStylePosition) this.setListStylePosition(data.listStylePosition);
        if (data.listStyleType != null && data.listStyleType != this._listStyleType) this.setListStyleType(data.listStyleType);
        if (data.markerOffset != null && data.markerOffset != this._markerOffset) this.setMarkerOffset(data.markerOffset);
        
        var right = 0, bottom = 0;
        for (var i = 0; data.childNodes != null && i < data.childNodes.length; i++) {
            var node = com.kenny.util.BaseTool.createNode(data.childNodes[i].type);
            node.setData(data.childNodes[i]);
            node.appendTo(this);
            
            if(right < node.getLeft()+node.getWidth()){
                right = node.getLeft()+node.getWidth();
            }
            if(bottom < node.getTop()+node.getHeight()){
                bottom = node.getTop()+node.getHeight();
            }
        }
        
        if(right < 1366){
        	right = 1366;
        }
        if(bottom < 768){
        	bottom = 768;
        }
        this.setWidth(right);
        this.setHeight(bottom);
    },
    //公共方法 返回数据对象
    getData: function () {
        var childNodes = [];
        if (this._childNodes) {
            for (var i = 0; i < this._childNodes.length; i++)
                childNodes.push(this._childNodes[i].getData());
        }
        return {
            id: this._id,
            type: this._type,
            sheetName:this._sheetName,
            sheetNum:this._sheetNum,
            width: this._width,
            height: this._height,
            x: this._x,
            y: this._y,
            childNodes: childNodes
        };
    },

    getTableObjById: function(id){
		for (var i = 0 ; i < this._childNodes.length ; i++){
			if (this._childNodes[i].getId() == id){
				return this._childNodes[i];
			}
		}
		return null;
	}

});