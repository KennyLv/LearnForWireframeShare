/**
 * BaseTool class
 * 
 * @package com.hoperun.util
 * @author xuliyu
 */
// log
if(!logDebug) var logDebug = new Log(Log.DEBUG,Log.popupLogger);
if(!logInfo) var logInfo = new Log(Log.INFO,Log.popupLogger);
if(!logWarn) var logWarn = new Log(Log.WARN,Log.popupLogger);
if(!logError) var logError = new Log(Log.ERROR,Log.popupLogger);
if(!logFatal) var logFatal = new Log(Log.FATAL,Log.popupLogger);

if(!debug) var debug;
if(!info) var info;
if(!warn) var warn;
if(!error) var error;
if(!fatal) var fatal;

$.ajaxSetup({
    contentType:"application/x-www-form-urlencoded;charset=utf-8"
});

com.hoperun.util.BaseTool = {	
	getOffsetWithDelta: function(x0, y0, x1, y1, delta){
		var sp = this.convertCoordinateXY(x0, y0, delta);
		var np = this.convertCoordinateXY(x1, y1, delta);
		return {
			dx: (np.x - sp.x),
			dy: (np.y - sp.y)
		};
	},
	convertCoordinateXY: function(x, y, delta){
		var rDelta = delta * Math.PI / 180;
		var x1 = x * Math.cos(rDelta) + y * Math.sin(rDelta);
		var y1 = y * Math.cos(rDelta) - x * Math.sin(rDelta);
		return {
			x: x1,
			y: y1
		};
	},
	
	showShadow: function(clickCallback){
		var hiddenObj = $('#hidden');
		if(hiddenObj.length == 0){
			hiddenObj = $('<div/>');
			hiddenObj.attr('id', 'hidden');
			hiddenObj.css({
				width: '100%',
				height: '100%',
				top: 0,
				left:0,
				position: 'absolute',
				'z-index': 5000
			});
			$('.content-area').append(hiddenObj);
		}
		hiddenObj.unbind('click.hidden').bind('click.hidden',function(e){
			clickCallback();
			hiddenObj.hide();
		});
		hiddenObj.show();
	},
	
	showMenuShadow: function(clickCallback){
		var hiddenObj = $('#hiddenForMenu');
		if(hiddenObj.length == 0){
			hiddenObj = $('<div/>');
			hiddenObj.attr('id', 'hiddenForMenu');
			hiddenObj.css({
				width: '100%',
				height: '100%',
				top: 0,
				left:0,
				position: 'absolute',
				'z-index': 5000
			});
			$('.content-area').append(hiddenObj);
		}
		hiddenObj.unbind('click.hidden').bind('click.hidden',function(e){
			com.hoperun.util.BaseTool.closeMenuPopup();
			if(clickCallback) clickCallback();
		});
		com.hoperun.util.BaseTool.closeMenuPopup();
		hiddenObj.show();
	},
	
	closeMenuPopup: function(){
		$('#hiddenForMenu').hide();
		$('.menu-popup-item').hide();
	},
	
    /**
	 * get UUID.
	 * 
	 * @returns the uuid string
	 */
    uuid: function () {
        var s = [];
        var hexDigits = "0123456789ABCDEF";
        for (var i = 0; i < 32; i++)
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        s[12] = "4";
        s[16] = hexDigits.substr((s[16] & 0x3) | 0x8, 1);
        return s.join("");
    },

    rgb2hex: function(rgb){
        if (  rgb.search("rgb") == -1 ) {
             return rgb;
        } else {
             rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);
             function hex(x) {
                  return ("0" + parseInt(x).toString(16)).slice(-2);
             }
             return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]); 
        }
   },
    
    convertPixelToNumber: function (pixels) {
        if (isNaN(pixels) && pixels.indexOf("px") != -1) {
            return parseInt(pixels.substring(0, pixels.indexOf("px")), 10);
        }
        return parseInt(pixels, 10);
    },

    percentToFloat: function (per) {
        var rel = per.indexOf("%") ? per.slice(0, -1) : per;
        return parseInt(rel, 10) / 100;
    },
    /**
	 * Get the col index from 'AA' to 27 A=1, B=2, C=3 ...... BAC=2*26*26+1*26+3
	 * 
	 * //alert(com.hoperun.util.BaseTool.CellIndex_NumToStr(com.hoperun.util.BaseTool.CellIndex_StrToNum("ERBQWIOERBL"),
	 * ""));
	 */
    CellIndex_StrToNum: function (str) {
        var strLength = str.length;
        var Num = 0;
        for (var i = 0; i < strLength; i++) {
            var dd = strLength - i - 1;
            var aa = str.substring(i, i + 1).toUpperCase().charCodeAt() - 64;
            Num += aa * Math.pow(26, dd);
        }
        return Num;
    },
    /**
	 * Get the col index from 27 to 'AA'; A=1, B=2, C=3 ......
	 * BAC=2*26*26+1*26+3
	 */
    CellIndex_NumToStr: function (num, str) {
        //
        if (num <= 26) {
            return String.fromCharCode(num + 64) + str;
        } else {
            var gg = Math.floor(num / 26);
            var ff = num % 26;
            if (ff == 0) {
                return this.CellIndex_NumToStr(gg - 1, String.fromCharCode(26 + 64) + str);
            }
            else {
                return this.CellIndex_NumToStr(gg, String.fromCharCode(ff + 64) + str);
            }
        }
    },
    setStyleProperty: function (styleObj, key, value) {
        if (value == null) {
            if (styleObj.removeProperty) styleObj.removeProperty(key); else styleObj.removeAttribute(key);
        }
        else {
            if (styleObj.setProperty) styleObj.setProperty(key, value, null); else styleObj.setAttribute(key, value);
        }
    },

    setStyleProperties: function (styleObj, data) {
        for (var key in data) {
            this.setStyleProperty(styleObj, key, data[key]);
        }
    },

    // Clone JS object
    cloneJsObject: function (jsObj) {
        var objClone;
        if (jsObj.constructor == Object) {
            objClone = new jsObj.constructor();
        } else {
            objClone = new jsObj.constructor(jsObj.valueOf());
        }
        for (var key in jsObj) {
            if (objClone[key] != jsObj[key]) {
                if (typeof (this[key]) == 'object') {
                    objClone[key] = jsObj[key].Clone();
                } else {
                    objClone[key] = jsObj[key];
                }
            }
        }
        objClone.toString = jsObj.toString;
        objClone.valueOf = jsObj.valueOf;
        return objClone;
    },
    /**
	 * get the parameters passed by URL.
	 * 
	 * @returns the key-values parameter
	 */
    parseUrl: function (url) {
        var obj;
        if (url.indexOf('?') != -1) {
            obj = {};
            var parameterUrl = url.substring(url.indexOf('?') + 1);
            var arrTmp = parameterUrl.split("&");
            for (var i = 0; i < arrTmp.length; i++) {
                var dIntPos = arrTmp[i].indexOf("=");
                var paraName = arrTmp[i].substr(0, dIntPos);
                var paraData = decodeURI(arrTmp[i].substr(dIntPos + 1));
                if (obj[paraName]) {
                    if (!(obj.paraName instanceof Array)) {
                        var preData = obj.paraName;
                        obj[paraName] = [];
                        obj[paraName].push(preData);
                    }
                    obj[paraName].push(paraData);
                }
                else {
                    obj[paraName] = paraData;
                }
            }
        }
        return obj;
    },

    formateVeticalFollowingItemPosition: function(jObj, jNextObj, dfData){
    	var pos = this.getAbsPostionInContainer(jObj[0], 'menu-toolbar-text');  
		var centerX = pos.x + jObj.width() / 2, bottom = pos.y + jObj.height();
		var width = jNextObj.width();
		var left = centerX-width/2;
		if(dfData){
			left -= dfData.dx;
			bottom -= dfData.dy;
		}
		if(left<5){
			left = 5; 
		}
		jNextObj.css({
			left: left,
			top: bottom
		});
    },
    /**
	 * Do find event element.
	 * 
	 * @param evt
	 *            the event object
	 * 
	 * @return the event element
	 */
    findEventElement: function (evt) {
        evt = evt || window.event;
        return evt.srcElement || evt.target;
    },

    /**
	 * Do find event element.
	 * 
	 * @param obj
	 *            require, the DOM object
	 * @param objectType
	 *            require, the object type
	 * 
	 * @return the event element
	 */
    findElementWithType: function (obj, objectType) {
        var rel = obj;
        // Find DOM instance
        while(rel && !rel.getAttribute){
            rel = rel.parentNode;
        }
        while (rel && rel.getAttribute && rel.getAttribute('objectType') != objectType && rel.tagName && rel.tagName.toLowerCase() != 'body') {
            rel = rel.parentNode;
        }
        if (rel && rel.tagName.toLowerCase() == 'body') {
            rel = null;
        }
        return rel;
    },
    
    findNearestParentNodeWithAttributeValues: function (obj, attrKey, attrValue) {
        var rel = false;
        var obj = obj.getAttribute ? obj : obj.parentNode;

        while (obj && obj.getAttribute) {
            if (obj.getAttribute(attrKey)) {
                if (attrValue.indexOf(obj.getAttribute(attrKey)) != -1) {
                    rel = true;
                }
                break;
            }
            obj = obj.parentNode;
        }

        return rel;
    },
    
    findNearestValueWithAttribute: function (obj, attrKey) {
        var rel = null;
        var obj = obj.getAttribute ? obj : obj.parentNode;

        while (obj && obj.getAttribute) {
            if (obj.getAttribute(attrKey)!=null) {
                rel = obj.getAttribute(attrKey);
                break;
            }
            obj = obj.parentNode;
        }

        return rel;
    },
    
    /**
	 * 
	 */
    findEventTarget: function (evt) {
        evt = evt || window.event;
        var obj = evt.srcElement || evt.target;
        while (obj != null && (obj.id == null || obj.id == '')) {
            obj = obj.parentNode;
        }
        return obj;
    },
    
    // ////////////////////////////////////////////////////////////////////////////////
    // ///////////// Begin: Get Svg Object information
	// ////////////////////////////////
    getParagraphNumberWithTypeForSvg: function(obj, offset){
    	var num = 0;
    	var textObj = obj.parentNode;
    	for(var i=0; i<textObj.childNodes.length; i++){
    		if(textObj.childNodes[i].getAttribute('objType') == 'paragraph'){
    			num++;
    		}
    		if(obj == textObj.childNodes[i]){
    			break;
    		}
    	}
    	return num-1;
    },
    getParentOffsetWithTypeForSvg: function(obj, offset){
    	var parentOffset = 0;
    	var textObj = obj.parentNode;
    	var paragraphOffset = 0;
    	for(var i=0; i<textObj.childNodes.length; i++){
    		if(textObj.childNodes[i].getAttribute('objType') == 'paragraph'){
    			paragraphOffset = parentOffset;
    		}
    		if(obj == textObj.childNodes[i]){
    			break;
    		}
    		parentOffset += textObj.childNodes[i].childNodes[0].nodeValue.length;
    	}
    	return parentOffset - paragraphOffset + offset;
    },
    getBoundingRectForSvg: function(item){
    	var rect = null;
    	if(jQuery.browser.opera || item.offsetWidth == null){
    		rect = item.getBoundingClientRect();
			// It's werid, the left and top value is not pointed to parent
			// container, even it is absolute item.
			var left = rect.left, top = rect.top;
			if(item.getAttribute('x')!=null){
				left = parseInt(item.getAttribute('x'), 10);
			}
			if(item.getAttribute('y')!=null){
				top = parseInt(item.getAttribute('y'), 10) - rect.height;
			}
			
			rect = {
				top: top,
				left: left,
				width: rect.width,
				height: rect.height
			};
    	}
		else{
			rect = {
				top: item.offsetTop,
				left: item.offsetLeft,
				width: item.offsetWidth,
				height: item.offsetHeight
			};
		}
    	return rect;
    },
    // ///////////// End: Get Svg Object information
	// ////////////////////////////////
    // //////////////////////////////////////////////////////////////////////////////
    getParentOffsetWithType: function (obj, offset, parentObj) {
    	
		var lineData = this.findElementWithType(obj, 'Line');
		if(lineData && lineData.getAttribute('noVisibleData') == 'true'){
			return 0;
		}
		
        parentObj = typeof (parentObj) == 'string' ? this.findElementWithType(obj, parentObj) : parentObj;
        var childrenObjs = parentObj.getElementsByTagName(obj.tagName);
        var parentOffset = offset;
        for (var i = 0; i < childrenObjs.length; i++) {
            if (childrenObjs[i] == obj) {
                break;
            }
            parentOffset += childrenObjs[i].textContent.length;
        }
        // Consider pagination
        var previousObj = findPrevouisParagraph(parentObj);
        if (previousObj && previousObj.id == parentObj.id) {
            parentOffset += this.getParentOffsetWithType(previousObj.lastChild.lastChild, previousObj.lastChild.lastChild.textContent.length, previousObj);
        }
        return parentOffset;

        function findPrevouisParagraph(paraObj) {
            var previousSibling = paraObj.previousSibling;
            // find previous paragraph
            while (previousSibling) {
                if (previousSibling.getAttribute && previousSibling.getAttribute('objectType') == 'Paragraph') {
                    break;
                }
                previousSibling = previousSibling.previousSibling;
            }
            if (!previousSibling) {
                var prevPage = paraObj.parentNode.previousSibling;
                while (prevPage) {
                    previousSibling = prevPage.lastChild;
                    while (previousSibling) {
                        if (previousSibling.getAttribute && previousSibling.getAttribute('objectType') == 'Paragraph') {
                            break;
                        }
                        previousSibling = previousSibling.previousSibling;
                    }

                    if (previousSibling) {
                        break;
                    }
                    prevPage = prevPage.previousSibling;
                }
            }

            return previousSibling;
        }
    },
    /**
	 * Get the absolute position.
	 * 
	 * @param obj
	 *            the ele of DOM
	 * @return the position of DOM on browser
	 */
    getAbsPostionInContainer: function (obj, className) {
        function findPos(obj, className, rel) {
            if (obj.className == null || obj.className.indexOf(className) == -1) {
                rel.x += obj.offsetLeft;
                rel.y += obj.offsetTop;
                if (obj.offsetParent) {
                    findPos(obj.offsetParent, className, rel);
                }
            }
            return;
        }
        className = className ? className : 'docs-editor';
        var rel = { x: 0, y: 0 };
        findPos(obj, className, rel);
        return { x: rel.x, y: rel.y };
    },
    /**
	 * Get the absolute position.
	 * 
	 * @param obj
	 *            the ele of DOM
	 * @return the position of DOM on browser
	 */
    getAbsPostion: function (obj) {
        function findPosX(obj) {
            var curleft = 0;
            if (obj.offsetParent) {
                while (obj.offsetParent) {
                    curleft += obj.offsetLeft;
                    obj = obj.offsetParent;
                }
            } else if (obj.x)
                curleft += obj.x;
            return curleft;
        }

        function findPosY(obj) {
            var curtop = 0;

            if (obj.offsetParent) {
                while (obj.offsetParent) {

                    curtop += obj.offsetTop;
                    obj = obj.offsetParent;
                }
            } else if (obj.y)
                curtop += obj.y;
            return curtop;
        }
        return { x: findPosX(obj), y: findPosY(obj) };
    },

    get: function (e) {

        return
    },

    /**
	 * Retrieve the coordinates of the given event relative to the center of the
	 * widget.
	 * 
	 * @param event
	 *            A mouse-related DOM event.
	 * @param reference
	 *            A DOM element whose position we want to transform the mouse
	 *            coordinates to.
	 * @return A hash containing keys 'x' and 'y'.
	 */
    getRelativeCoordinates: function (event, reference) {
        var x, y;
        event = event || window.event;
        var el = event.target || event.srcElement;

        var posx = 0, posy = 0;
        if (event.pageX || event.pageY) {
            posx = event.pageX;
            posy = event.pageY;
        }
        else if (event.clientX || event.clientY) {
            posx = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }


        // Use absolute coordinates
        var refPos = getAbsolutePosition(reference);
        if($(".menu_edit_form").scrollLeft() || $(".menu_edit_form").scrollTop()){
        	 x = posx - refPos.x + $('.docs-editor').scrollLeft() + $('.top-container').scrollLeft() + $(".menu_edit_form").scrollLeft();
             y = posy - refPos.y + $('.docs-editor').scrollTop() + $('.top-container').scrollTop() + $(".menu_edit_form").scrollTop();
        } else {
        	 x = posx - refPos.x + $('.docs-editor').scrollLeft() + $('.top-container').scrollLeft() + $('.content-area').scrollLeft();
        	 y = posy - refPos.y + $('.docs-editor').scrollTop() + $('.top-container').scrollTop() + $('.content-area').scrollTop();
        }
       

        // Subtract distance to middle
        return { x: x, y: y };

        function getAbsolutePosition(element) {
        	if(element == null) return {x:0, y:0};
            var r = { x: element.offsetLeft, y: element.offsetTop };
            if (element.offsetParent) {
                var tmp = getAbsolutePosition(element.offsetParent);
                r.x += tmp.x;
                r.y += tmp.y;
            }
            return r;
        };

    },
    doValidPositionWidthRect: function (rect, item) {
        if (item.getLeft() < rect.left) {
            item.setLeft(rect.left);
        }
        else if (item.getLeft() + this.convertPixelToNumber(item.getWidth()) > rect.width + rect.left) {
            item.setLeft(rect.width + rect.left - this.convertPixelToNumber(item.getWidth()));
        }
        if (item.getTop() < rect.top) {
            item.setTop(rect.top);
        }
        else if (item.getTop() + this.convertPixelToNumber(item.getHeight()) > rect.top + rect.height) {
            item.setTop(rect.top + rect.height - this.convertPixelToNumber(item.getHeight()));
        }
    },
    
    doValidPosition: function (container, item) {
        var w = typeof (container.getWidth()) == 'string' ? container.getDomInstance().offsetWidth : container.getWidth();
        var h = typeof (container.getHeight()) == 'string' ? container.getDomInstance().offsetHeight : container.getHeight();

        if (item.getLeft() < 0) {
            item.setLeft(0);
        }
        else if (item.getLeft() + this.convertPixelToNumber(item.getWidth()) > w) {
            item.setLeft(w - this.convertPixelToNumber(item.getWidth()));
        }
        if (item.getTop() < 0) {
            item.setTop(0);
        }
        else if (item.getTop() + this.convertPixelToNumber(item.getHeight()) > h) {
            item.setTop(h - this.convertPixelToNumber(item.getHeight()));
        }
    },
    hiddenOverWordDiv: function () {
        $('.overWordDiv').remove();
        // var eles = document.getElementsByName("overWordDiv");
        // var size = eles.length;
        // for(var i=size-1;i>=0;i--){
        // var node = eles[i];
        // node.parentNode.removeChild(node);
        // }
    },

    hiddenSvgOverWordDiv: function () {
        $('.overWordDivSvg').remove();
        // var eles = document.getElementsByName("overWordDiv");
        // var size = eles.length;
        // for(var i=size-1;i>=0;i--){
        // var node = eles[i];
        // node.parentNode.removeChild(node);
        // }
    },
    
    markSvgTextSelection: function (selection) {
    	if (selection.isCollapsed()) {
            return;
        }
    	
    	var from = selection.getFrom(), to = selection.getTo(), fromOffset = selection.getFromOffset(), toOffset = selection.getToOffset();
    	var fromObj = selection.getFromObj(), toObj = selection.getToObj();
    	
    	var divObj = com.hoperun.util.BaseTool.findElementWithType(fromObj, 'TextBox');
        var activeItem = com.hoperun.util.BaseTool.findObjWithId(divObj.id);
        
    	var textObj = fromObj.parentNode;
    	
    	var needShowData = [], currentData = null;
    	// Same span
    	if(fromObj == toObj){
    		var rect = com.hoperun.util.BaseTool.getBoundingRectForSvg(fromObj);
    		currentData = {};
    		var leftWidth = activeItem.getItemWidthWithOffset(from, fromOffset);
    		currentData.left = rect.left + leftWidth;
    		
    		var ny = parseInt(fromObj.getAttribute('y'), 10);
    		var lineHeight = getLineHeight(textObj.childNodes, ny);
    		
    		currentData.top = ny - lineHeight;
    		currentData.height = lineHeight;
    		currentData.width = activeItem.getItemWidthWithOffset(to, toOffset) - leftWidth;
    		
    		needShowData.push(currentData);
    	}
    	else{
    		var ny = 0;
    		for(var i=0; i<textObj.childNodes.length; i++){
    			var obj = textObj.childNodes[i];
    			if(obj == fromObj){
    				var rect = com.hoperun.util.BaseTool.getBoundingRectForSvg(fromObj);
    	    		currentData = {};
    	    		var leftWidth = activeItem.getItemWidthWithOffset(from, fromOffset);
    	    		currentData.left = rect.left + leftWidth;
    	    		
    	    		ny = parseInt(fromObj.getAttribute('y'), 10);
    	    		var lineHeight = getLineHeight(textObj.childNodes, ny);
    	    		
    	    		currentData.top = ny - lineHeight;
    	    		currentData.height = lineHeight;
    	    		currentData.width = rect.width - leftWidth;
    	    		
    	    		needShowData.push(currentData);
    			}
    			else if(currentData){
    				var tny = parseInt(obj.getAttribute('y'), 10);
    				var rect = com.hoperun.util.BaseTool.getBoundingRectForSvg(obj);
    				
    				if(tny != ny){
    					ny = tny;
        	    		var lineHeight = getLineHeight(textObj.childNodes, ny);
        	    		
    					currentData = {};
    					currentData.left = rect.left;
    					currentData.top = ny - lineHeight;
        	    		currentData.height = lineHeight;
        	    		currentData.width = 0;    
        	    		needShowData.push(currentData);
    				}
    				
    				if(obj == toObj){
    					currentData.width += activeItem.getItemWidthWithOffset(to, toOffset);
    					break;
        			}
    				else{
    					currentData.width += rect.width;
    				}
    			}
    		}
    	}
    	var showOverWordDivObj = getParentElement(divObj);
    	for(var i=0; i<needShowData.length; i++){
    		var rect = needShowData[i];
    		showOverWordDiv(showOverWordDivObj, rect.left, rect.top, rect.width, rect.height);
    	}
    	
    	function getLineHeight(objs, y){
    		var lineHeight = 0;
    		for(var i=0; i<objs.length; i++){
        		var tspan = objs[i];
        		var ny = parseInt(tspan.getAttribute('y'), 10);
        		if(ny == y){
        			var rect = com.hoperun.util.BaseTool.getBoundingRectForSvg(tspan);
        			if(rect.height > lineHeight){
        				lineHeight = rect.height;
        			}
        		}
        		else if(ny > y){
        			break;
        		}
        	}
    		return lineHeight;
    	}
    	
    	function showOverWordDiv(parentNode, left, top, width, height) {
            var overWordDiv = document.createElement("div");
            with (overWordDiv) {
                className = 'overWordDivSvg';
                setAttribute("style", "position:absolute;background-color:#00F;filter:alpha(opacity=40);-moz-opacity:0.4;-khtml-opacity:0.4;opacity:0.4; z-index:30;");
                style.left = left + "px";
                style.top = top + 5 + "px";
                style.height = height + "px";
                style.width = width + "px";
            }
            parentNode.appendChild(overWordDiv);
        }
    	
    	function getParentElement(textBoxObj){
    		var showOverWordDivObj = null;
    		var objs = $('.svg-text-selection');
    		if(objs.length > 0){
    			showOverWordDivObj = objs[0];
    		}
    		if(!showOverWordDivObj){
    			showOverWordDivObj = document.createElement("div");
    			showOverWordDivObj.className = 'svg-text-selection';
    			// showOverWordDivObj.style.zIndex = 100;
    			showOverWordDivObj.style.position = 'absolute';
    		}
    		else{
    			while(showOverWordDivObj.hasChildNodes()){
    				showOverWordDivObj.removeChild(showOverWordDivObj.childNodes[0]);
    			}
    		}
    		showOverWordDivObj.style.left = '0px';
			showOverWordDivObj.style.top = '0px';
    		textBoxObj.insertAdjacentElement('afterBegin', showOverWordDivObj);
    		
    		return showOverWordDivObj;
    	}
    },
    
    markTextSelection: function (selection) {
    	
    	this.hiddenOverWordDiv();
    	
        if (selection.isCollapsed()) {
            return;
        }

        var from = selection.getFrom(), to = selection.getTo(); fromOffset = selection.getFromOffset(), toOffset = selection.getToOffset();
        if ( (to == from && fromOffset > toOffset) || 
        	 (to != from && from.getPage().compareParagraphIndex(to, from) < 0)){
        	var temp = from;
        	from = to;
        	to = temp;
        	temp = fromOffset;
        	fromOffset = toOffset;
        	toOffset = temp;
        }
        
      
        var fromObj = from.getSpanItem(fromOffset), toObj = to.getSpanItem(toOffset);
         /*
			 * selection.setFromObj(fromObj); selection.setToObj(toObj);
			 */
        // Same DOM Span
        if (fromObj == toObj) {
            var lineDivObj = fromObj.parentNode;
            // var anchorLeft = getWordsWidth(fromObj,
			// from.getSpanOffsetByOffset(fromOffset)), focusLeft =
			// getWordsWidth(toObj, to.getSpanOffsetByOffset(toOffset));
            var anchorLeft = from.getWidthWithOffset(fromOffset).width, focusLeft = to.getWidthWithOffset(toOffset).width;
            var spanPaddingLeft = fromObj.style.paddingLeft;
            var left = anchorLeft + fromObj.offsetLeft;
            if (spanPaddingLeft) {
                left += this.convertPixelToNumber(spanPaddingLeft);
            }
            var width = focusLeft - anchorLeft;
            var top = fromObj.offsetTop;
            var height = fromObj.offsetHeight;
            showOverWordDiv(lineDivObj, left, top, width, height);
        }
        // Same DOM line
        else if (fromObj.parentNode == toObj.parentNode) {
            var lineDivObj = fromObj.parentNode;

            var anchorLeft = from.getWidthWithOffset(fromOffset).width, fullWidth = fromObj.offsetWidth;
            var spanPaddingLeft = fromObj.style.paddingLeft;
            var left = anchorLeft + fromObj.offsetLeft;
            if (spanPaddingLeft) {
                left += this.convertPixelToNumber(spanPaddingLeft);
                fullWidth -= this.convertPixelToNumber(spanPaddingLeft);
            }
            var width = fullWidth - anchorLeft;
            var top = fromObj.offsetTop;
            var height = fromObj.offsetHeight;
            showOverWordDiv(lineDivObj, left, top, width, height);

            var sibling = findNextValidSpan(fromObj);
            while (sibling && sibling != toObj) {
                makeSpanSelection(sibling);
                sibling = findNextValidSpan(sibling);
            }

            var width = to.getWidthWithOffset(toOffset).width;
            var spanPaddingLeft = toObj.style.paddingLeft;
            var left = toObj.offsetLeft;
            if (spanPaddingLeft) {
                left += this.convertPixelToNumber(spanPaddingLeft);
            }
            var top = toObj.offsetTop;
            var height = toObj.offsetHeight;
            showOverWordDiv(lineDivObj, left, top, width, height);

        }
        // Same DOM paragraph
        else { // if(fromObj.parentNode.parentNode ==
				// toObj.parentNode.parentNode)
            var lineDivObj = fromObj.parentNode;

            var anchorLeft = from.getWidthWithOffset(fromOffset).width, fullWidth = fromObj.offsetWidth;
            var spanPaddingLeft = fromObj.style.paddingLeft;
            var left = anchorLeft + fromObj.offsetLeft;
            if (spanPaddingLeft) {
                left += this.convertPixelToNumber(spanPaddingLeft);
                fullWidth -= this.convertPixelToNumber(spanPaddingLeft);
            }
            var width = fullWidth - anchorLeft;
            var top = fromObj.offsetTop;
            var height = fromObj.offsetHeight;
            showOverWordDiv(lineDivObj, left, top, width, height);

            var sibling = findNextValidSpan(fromObj);
            while (sibling && sibling != toObj) {
                // try{
                makeSpanSelection(sibling);
                sibling = findNextValidSpan(sibling);
                // }
                // catch(e){
                // var aaa = "";
                // sibling = null;
                // }
            }
            lineDivObj = toObj.parentNode;
            var width = to.getWidthWithOffset(toOffset).width;
            var spanPaddingLeft = toObj.style.paddingLeft;
            var left = toObj.offsetLeft;
            if (spanPaddingLeft) {
                left += this.convertPixelToNumber(spanPaddingLeft);
            }
            var top = toObj.offsetTop;
            var height = toObj.offsetHeight;
            showOverWordDiv(lineDivObj, left, top, width, height);
        }

        if (window.getSelection()) {
            window.getSelection().removeAllRanges();
        }

        function findNextValidSpan(spanObj) {
            var nextSpanObj = findNextSpan(spanObj);
            if (!nextSpanObj) {
                var lineObj = spanObj.parentNode;
                // move to paragraph to find span
                nextSpanObj = findValidSpanInParagraph(lineObj);

                if (!nextSpanObj) {
                    var paragraphObj = lineObj.parentNode;
                    // Move to page to find span
                    nextSpanObj = findValidSpanInPage(paragraphObj);

                    if (!nextSpanObj) {
                        var pageObj = paragraphObj.parentNode;
                        // Move to docs to find span
                        nextSpanObj = findValidSpanInDocs(pageObj);
                    }
                }
            }

            return nextSpanObj;
        }

        function findValidSpanInParagraph(lineObj, isNewFlag) {
            var spanObj = null;
            var nextLine = isNewFlag ? lineObj : findNextLine(lineObj);
            while (nextLine && spanObj == null) {
                spanObj = findSpan(nextLine);
                nextLine = findNextLine(lineObj);
            }
            return spanObj;
        }

        function findValidSpanInPage(paragraphObj, isNewFlag) {
            var spanObj = null;

            var nextParagraph = isNewFlag ? paragraphObj : findNextParagraph(paragraphObj);
            while (nextParagraph && spanObj == null) {
                var nextLine = findLine(nextParagraph);
                if (nextLine) spanObj = findValidSpanInParagraph(nextLine, true);
                nextParagraph = findNextParagraph(nextParagraph);
            }
            return spanObj;
        }

        function findValidSpanInDocs(pageObj, isNewFlag) {
            var spanObj = null;
            var nextPage = isNewFlag ? pageObj : findNextPage(pageObj);
            while (nextPage && spanObj == null) {
                var paragraph = findParagraph(nextPage);
                if (paragraph) spanObj = findValidSpanInPage(paragraph, true);
                nextPage = findNextPage(nextPage);
            }
            return spanObj;
        }

        function findSpan(lineObj) {
            var spanObj = lineObj.firstChild;
            while (spanObj && spanObj.getAttribute('objectType') != 'SPAN') {
                spanObj = spanObj.nextSibling;
            }
            return spanObj;
        }
        function findLine(paragraphObj) {
            var lineDivObj = paragraphObj.firstChild;
            while (lineDivObj && lineDivObj.getAttribute('objectType') != 'Line') {
                lineDivObj = lineDivObj.nextSibling;
            }
            return lineDivObj;
        }
        function findParagraph(pageObj) {
            var paragraphObj = pageObj.firstChild;
            while (paragraphObj && paragraphObj.getAttribute('objectType') != 'Paragraph') {
                paragraphObj = paragraphObj.nextSibling;
            }
            return paragraphObj;
        }
        function findNextSpan(spanObj) {
            spanObj = spanObj.nextSibling;
            while (spanObj && spanObj.getAttribute('objectType') != 'SPAN') {
                spanObj = spanObj.nextSibling;
            }
            return spanObj;
        }
        function findNextLine(lineObj) {
            lineObj = lineObj.nextSibling;
            while (lineObj && lineObj.getAttribute('objectType') != 'Line') {
                lineObj = lineObj.nextSibling;
            }
            return lineObj;
        }
        function findNextParagraph(paragraphObj) {
            paragraphObj = paragraphObj.nextSibling;
            while (paragraphObj && paragraphObj.getAttribute('objectType') != 'Paragraph') {
                paragraphObj = paragraphObj.nextSibling;
            }
            return paragraphObj;
        }
        function findNextPage(pageObj) {
            return pageObj.nextSibling;
        }
        function makeSpanSelection(obj) {
            var lineDivObj = obj.parentNode;

            var fullWidth = obj.offsetWidth;
            var left = obj.offsetLeft;

            var spanPaddingLeft = obj.style.paddingLeft;
            if (spanPaddingLeft) {
                // try{
                left += com.hoperun.util.BaseTool.convertPixelToNumber(spanPaddingLeft);
                // }
                // catch(e){
                // alert("spanPaddingLeft = "+spanPaddingLeft);
                // }

                fullWidth -= com.hoperun.util.BaseTool.convertPixelToNumber(spanPaddingLeft);
            }
            var width = fullWidth;
            var top = obj.offsetTop;
            var height = obj.offsetHeight;
            showOverWordDiv(lineDivObj, left, top, width, height);
        }
        function showOverWordDiv(lineDivObj, left, top, width, height) {
            var overWordDiv = document.createElement("div");
            with (overWordDiv) {
                className = 'overWordDiv';
                setAttribute("style", "position:absolute;background-color:#00F;filter:alpha(opacity=40);-moz-opacity:0.4;-khtml-opacity:0.4;opacity:0.4; z-index:30;");
                // setAttribute("name","overWordDiv");
                var paddingTop = (lineDivObj.style.paddingTop != '' && lineDivObj.style.paddingTop != null) ? com.hoperun.util.BaseTool.convertPixelToNumber(lineDivObj.style.paddingTop) : 0;
                if (paddingTop != 0) {
                    style.height = lineDivObj.offsetHeight - paddingTop + "px";
                    style.marginTop = paddingTop + "px";
                }
                else {
                    style.height = lineDivObj.offsetHeight + "px";
                }
                style.left = left + "px";
                style.top = 0 + "px";
                style.width = width + "px";
            }
            lineDivObj.insertAdjacentElement("afterBegin", overWordDiv);
        }
    },
    
    fDragging: function (obj, e, limit, callback, completeCallBack, table) {
        if (!e) e = window.event;
        var x = parseInt(obj.style.left);
        var y = parseInt(obj.style.top);

        var x_ = e.clientX - x;
        var y_ = e.clientY - y;

        var validX = -1, validY = -1;
        var validX_ = -1, validY_ = -1;

        if (document.addEventListener) {
            document.addEventListener('mousemove', inFmove, true);
            document.addEventListener('mouseup', inFup, true);
        } else if (document.attachEvent) {
            document.attachEvent('onmousemove', inFmove);
            document.attachEvent('onmouseup', inFup);
        }

        inFstop(e);
        inFabort(e);
        
        var e0 = e;
        var width = table.getWidth() + table.getLeft();
        var height = table.getHeight() + table.getTop();
        
        function inFmove(e) {
            var evt;
            if (!e) e = window.event;

            if (limit) {
                var op = obj.parentNode;
                var opX = parseInt(op.style.left);
                var opY = parseInt(op.style.top);

                if ((e.clientX - x_) < 0) return false;
                else if ((e.clientX - x_ + obj.offsetWidth + opX) > (opX + op.offsetWidth)) return false;

                if (e.clientY - y_ < 0) return false;
                else if ((e.clientY - y_ + obj.offsetHeight + opY) > (opY + op.offsetHeight)) return false;
            }

			validX = e.clientX;
			validY = e.clientY;
			
			var container = $('#myContent').attr('containerType');
			var moveWidth = e.clientX - e0.clientX;
			var moveHeight = e.clientY - e0.clientY;
			
			var first = table.getCellTracker().getCells()[0];
			var left = $(first.getDomInstance()).offset().left;
			var top = $(first.getDomInstance()).offset().top;
			
			if(validX - left > 20 || validY - top > 20){
				if(container == 'slide') {
					if((moveWidth + width) < 1356 && (moveHeight + height) < 776){
						callback(validX, validY);
						validX_ = validX, validY_ = validY;
					}
				} else if (container == 'paper') {
					if((moveWidth + width) < 816 && (moveHeight + height) < 1056){
						callback(validX, validY);
						validX_ = validX, validY_ = validY;
					}
				} else {
					callback(validX, validY);
					validX_ = validX, validY_ = validY;
				}
	
	            inFstop(e);
			}
				
			
        } // shawl.qiu script
        function inFup(e) {
            var evt;
            if (!e) e = window.event;
            if (document.removeEventListener) {
                document.removeEventListener('mousemove', inFmove, true);
                document.removeEventListener('mouseup', inFup, true);
            } else if (document.detachEvent) {
                document.detachEvent('onmousemove', inFmove);
                document.detachEvent('onmouseup', inFup);
            }

            inFstop(e);
            if(validX_ != -1 || validY_ != -1){
            	if(completeCallBack){
                	completeCallBack(validX_, validY_, true);
                }
            }
            
        } // shawl.qiu script

        function inFstop(e) {
            if (e.stopPropagation) return e.stopPropagation();
            else return e.cancelBubble = true;
        } // shawl.qiu script
        function inFabort(e) {
            if (e.preventDefault) return e.preventDefault();
            else return e.returnValue = false;
        } // shawl.qiu script
    },

    getOffset: function (evt) {
        var target = evt.target;
        if (target.offsetLeft == undefined) {
            target = target.parentNode;
        }
        var pageCoord = getPageCoord(target);
        var eventCoord = {
            x: window.pageXOffset + evt.clientX,
            y: window.pageYOffset + evt.clientY
        };
        var offset = {
            offsetX: eventCoord.x - pageCoord.x,
            offsetY: eventCoord.y - pageCoord.y
        };

        function getPageCoord(element) {
            var coord = { x: 0, y: 0 };
            while (element) {
                coord.x += element.offsetLeft;
                coord.y += element.offsetTop;
                element = element.offsetParent;
            }
            return coord;
        }

        return offset;
    },

    scrollPageTo: function (top, lineHeight) {
        if (top == 0) {
            // It seems somewhere wrong to send cursor show message when
			// reassign paragraph style.
            return;
        }
        var scrollObj = $('.docs-editor');
        var scrollTop = scrollObj.scrollTop();
        var height = scrollObj[0].offsetHeight;
        // console.log("height: "+height+" scrollTop:"+scrollTop+" top:"+top+"
		// lineHeight="+lineHeight);
        // First line is no visible, or line height is exceed out of visible
		// screen
        if (top < scrollTop || top + lineHeight > scrollTop + height) {
            scrollObj.scrollTop(top);
        }
    },

    getLineDivWithDirection: function (lineObj, isFollowing) {
        var lineDivObj = null;

        if (isFollowing) {
            // Find next available line
            lineDivObj = findNextAvaiableLineSibling(lineObj);
        }
        else {
            // Find previous available line
            lineDivObj = findPrevAvaiableLineSibling(lineObj);
        }

        return lineDivObj;

        function findPrevAvaiableLineSibling(lineObj) {
            var prevLineObj = findPrevLine(lineObj);
            // When there is no prev line
            if (!prevLineObj) {
                var paragraphDivObj = lineObj.parentNode;
                var prevParagraphDivObj = findPrevParagraph(paragraphDivObj);
                // Take consider paragraph must have valid line data
                if (prevParagraphDivObj) {
                    prevLineObj = prevParagraphDivObj.lastChild;
                }
                else {
                    var pageDivObj = paragraphDivObj.parentNode;
                    var prevPageDivObj = findPrevPage(pageDivObj);
                    while (prevPageDivObj) {
                        if (prevPageDivObj.children.length > 0) {
                            prevParagraphDivObj = prevPageDivObj.lastChild;
                            // Take consider paragraph must have valid line data
                            if (prevParagraphDivObj.getAttribute('objectType') == 'Paragraph' || (prevParagraphDivObj = findPrevParagraph(prevParagraphDivObj))) {
                                prevLineObj = prevParagraphDivObj.lastChild;
                                break;
                            }
                        }
                        prevPageDivObj = findPrevPage(prevPageDivObj);
                    }
                }
            }

            return prevLineObj;
        }

        function findPrevLine(lineObj) {
            lineObj = lineObj.previousSibling;
            while (lineObj && lineObj.getAttribute('objectType') != 'Line') {
                lineObj = lineObj.previousSibling;
            }
            return lineObj;
        }
        function findPrevParagraph(paragraphObj) {
            paragraphObj = paragraphObj.previousSibling;
            while (paragraphObj && paragraphObj.getAttribute('objectType') != 'Paragraph') {
                paragraphObj = paragraphObj.previousSibling;
            }
            return paragraphObj;
        }
        function findPrevPage(pageObj) {
            return pageObj.previousSibling;
        }

        function findNextAvaiableLineSibling(lineObj) {
            var nextLineObj = findNextLine(lineObj);
            if (!nextLineObj) {
                var paragraphDivObj = lineObj.parentNode;
                var nextParagraphDivObj = findNextParagraph(paragraphDivObj);
                // Take consider paragraph must have valid line data
                if (nextParagraphDivObj) {
                    nextLineObj = nextParagraphDivObj.firstChild;
                }
                else {
                    var pageDivObj = paragraphDivObj.parentNode;
                    var nextPageDivObj = findNextPage(pageDivObj);
                    while (nextPageDivObj) {
                        if (nextPageDivObj.children.length > 0) {
                            nextParagraphDivObj = nextPageDivObj.firstChild;
                            // Take consider paragraph must have valid line data
                            if (nextParagraphDivObj.getAttribute('objectType') == 'Paragraph' || (nextParagraphDivObj = findNextParagraph(nextParagraphDivObj))) {
                                nextLineObj = nextParagraphDivObj.firstChild;
                                break;
                            }
                        }
                        nextPageDivObj = findNextPage(nextPageDivObj);
                    }
                }
            }

            return nextLineObj;
        }

        function findNextLine(lineObj) {
            lineObj = lineObj.nextSibling;
            while (lineObj && lineObj.getAttribute('objectType') != 'Line') {
                lineObj = lineObj.nextSibling;
            }
            return lineObj;
        }
        function findNextParagraph(paragraphObj) {
            paragraphObj = paragraphObj.nextSibling;
            while (paragraphObj && paragraphObj.getAttribute('objectType') != 'Paragraph') {
                paragraphObj = paragraphObj.nextSibling;
            }
            return paragraphObj;
        }
        function findNextPage(pageObj) {
            return pageObj.nextSibling;
        }
    },

    findNextParagraph: function (paragraphObj) {
        paragraphObj = paragraphObj.nextSibling;
        while (paragraphObj && paragraphObj.getAttribute('objectType') != 'Paragraph') {
            paragraphObj = paragraphObj.nextSibling;
        }
        return paragraphObj;
    },

    toDataURL: function (image) {
        var canvas = document.createElement("canvas");
        canvas.style.width = image.width;
        canvas.style.height = image.height;
        var context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, image.width, image.height);
        return canvas.toDataURL();
    },

    clip: function (img, x, y, width, height, rotate) {
        var canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext('2d');
        // ctx.save();
        if (rotate) ctx.rotate(rotate);
        ctx.drawImage(img, -x, -y, img.width, img.height);
        // ctx.restore();
        return canvas.toDataURL();
    },
	
	findContainer:function(node){
		var domInstance = null;
		while (node != null) {
			if ($(node).hasClass('hr-page') || (node.attributes != null&& node.attributes['objectType'] != null&& node.attributes['objectType'].nodeValue=="Sheet") || (node.attributes != null&& node.attributes['objectType'] != null&& node.attributes['objectType'].nodeValue=="Slide")) {
				domInstance = node;
				break;
			} else
				node = node.parentNode;
		}
		return domInstance;
	},

    isInsideTriangle : function(p, a, b, c) {
		
		var fAB = (p.y - a.y) * (b.x - a.x) - (p.x - a.x) * (b.y - a.y);
		var fBC = (p.y - b.y) * (c.x - b.x) - (p.x - b.x) * (c.y - b.y);
		var fCA = (p.y - c.y) * (a.x - c.x) - (p.x - c.x) * (a.y - c.y);
		
		return (fAB * fBC > 0 && fBC * fCA > 0) ?  true : false; 
	},
	
	isExistsFile:function(url){
		var isExists = false;
		var xmlHttp = null;
		try {
			xmlHttp = new XMLHttpRequest();
		} catch (e) {
			try {
				xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {
				try {
					xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
				} catch (e) {
					xmlHttp = false;
				}
			}
		}
		xmlHttp.onreadystatechange = function() {
			if(xmlHttp.status == 200)
				isExists = true;
		};
		xmlHttp.open("GET", url, false);
		xmlHttp.send();
		return isExists;
	},
	
	log4js:function(logMode, message){
		var showLogInExplore = function(){
			if(logMode == 'DEBUG' && debug == '1'){
				logDebug.debug(message);
			}else if(logMode == 'INFO' && info == '1'){
				logInfo.info(message);
			}else if(logMode == 'WARN' && warn == '1'){
				logWarn.warn(message);
			}else if(logMode == 'ERROR' && error == '1'){
				logError.error(message);
			}else if(logMode == 'FATAL' && fatal == '1'){
				logFatal.fatal(message);
			}
		};
		showLogInExplore();
		
		// ajax submit
		$.ajax({
			url : 'log4jsServlet',
			type : 'POST',
			data : {
				logDate : new Date().toLocaleDateString(),
				logTime : new Date().toLocaleTimeString(),
				logMode : logMode,
				logMessage : message
			},
			success : function(msg) {
				if(msg){
					// logDebug.debug('submit the js log successfully!');
				}
				else{
					logDebug.debug('submit the js log failed!');
				}
			},
			error : function(textStatus) {
				logDebug.error('error!');
			}
		});
	},
	
	log4jsConfig:function(){
		$.ajax({
			url : 'getLog4jsConfigServlet',
			type : 'POST',
			dataType: 'json',
			success : function(json) {
				if(json){
					// alert(json.jsonData.log4js.debug);
					if(json.jsonData.log4js.debug)
						debug = json.jsonData.log4js.debug;
					if(json.jsonData.log4js.info)
						info = json.jsonData.log4js.info;
					if(json.jsonData.log4js.warn)
						warn = json.jsonData.log4js.warn;
					if(json.jsonData.log4js.error)
						error = json.jsonData.log4js.error;
					if(json.jsonData.log4js.fatal)
						fatal = json.jsonData.log4js.fatal;
				}
				
			},
			error : function(textStatus) {
				// logDebug.error('error!');
			}
		});
	},

	extend: function(subClass, superClass){
		var F = function(){};
		F.prototype = superClass.prototype;
		subClass.prototype = new F();
		subClass.prototype.constructor = subClass;
		
		if (superClass.prototype.constructor == Object){
			superClass.prototype.constructor = superClass;
		}
		subClass.superClass = superClass.prototype;
		
	},
	
	augment : function(receivingClass, givingClass){
		var proto = givingClass.prototype;
		if (!proto){
			proto = givingClass;
		}
		if (arguments[2]){
			for( var i = 2; i < arguments.length ; i++){
				receivingClass.prototype[arguments[i]] = proto[arguments[i]];
			}
		}else{
			for (methodName in proto){
				receivingClass.prototype[methodName] = proto[methodName];
			}
		}
	},

	/**
	 * Do throw method is not implemented by class.
	 * 
	 * @param objClass
	 *            the class instance
	 * @param methodName
	 *            the method name
	 */
	throwImplementException : function(objClass, methodName){
	    var message = methodName + " is supposed to be implemented";
	    throw message;
	},
	
	/**
	 * Get random number, which should be less than the specified number.
	 * 
	 * @param mMax
	 *            the default mMax value is 10
	 */
	getRandomNum: function(mMax){
	    mMax = mMax || 10;
	    var vNum = Math.random();
	    return vNum = Math.round(mMax * vNum);
	},
	
	/**
	 * Add forbidden propagation.
	 * 
	 * @param domObj
	 *            the DOM instance object
	 * @param excepEvents
	 *            the value should be an array for event type, which are
	 *            supposed to do propagation.
	 * @param events
	 *            the value should be an array, which are supposed not to do
	 *            propagation.
	 */
	_defaultEvent: [
        'blur',   'focus',  'focusin', 'focusout', 'load',      'resize',
        'scroll', 'unload', 'click',   'dblclick', 'mousedown', 'change',
        'select', 'submit', 'keydown', 'keypress', 'keyup',     'error' 
        // mouseup mousemove mouseover mouseout mouseenter mouseleave
     ],
	addForbiddenPropagation: function(domObj, excepEvents, events){
	    var bindEvent = [];
	    if(!events){
	        events = this._defaultEvent; 
	    }
	    if(!excepEvents){
	        excepEvents = [];
	    }
	    for(var i=0; i<events.length; i++){
	        var isExceptFlag = false;
	        for(var j=0; j<excepEvents.length; j++){
	            if(excepEvents[j] == events[i]){
	                isExceptFlag = true;
	                break;
	            }
	        }
	        if(isExceptFlag == false){
	            bindEvent.push(events[i]);
	        }
	    }
	    $(domObj).bind(bindEvent.join(" "), function(e){
            e.stopPropagation();
        });
	},
	
	/**
	 * Create the instance of the Node.
	 * 
	 * @param t the node type
	 * @returns the node object
	 */
	createNode : function(t){
	    var node = com.hoperun.node,
	        arr  = t.split("_"),
	        func = arr.length > 1 ? node[arr[0].toLowerCase()][arr[1]] : node[t];
	    return func ? new func() : null;
	},
	
	
	/**
	 * 
	 * @param object
	 *            the object
	 */
	actsAsAspect : function (object) {
		var aop = com.hoperun.util.AopInit.getAop();
		aop.actsAsAspect(object);
		for(var name in object.__proto__) {
			if(false && isValid(name)) {
				object.before(object, name, aop.beforeHander);
				object.after(object, name, aop.afterHander);
			}
		}
		
		function isValid(name) {
			return  name.substr(0, 3) == 'set' ? true : false;
			
		}
	},
	
	/**
	 * 
	 * @param id
	 * @returns
	 */
	findObjWithId : function (id) {
		var container = getActiveContainer();
		if(container) {
			if(container.getId() == id){
				return container;
			} else {
			    if(container._paragraphContainer){
			        for (var i = 0; i < container._paragraphContainer.length; i++) {
	                    if (container._paragraphContainer[i].getId() == id) {
	                        return container._paragraphContainer[i];
	                    }
	                }
			    }
				for (var i = 0; i < container._childNodes.length; i++) {
					if (container._childNodes[i].getId() == id) {
						return container._childNodes[i];
					}
				}
				return null;
			}
		} else  return null;
	},
	
	/**
	 * method of spell check
	 */
	spellCheck : function(str){
		var res = null;
		$.ajax({
			url : 'check',
			type : 'post',
			dataType : 'json',
			async : false,
			data : {'str' : str},
			success : function(json){
				if(json.success == 'true')
					res = eval("(" + JSON.stringify(json.jsonData) + ")");
				else
					alert(JSON.stringify(json.errors));
			}
		});
		return res;
	},
	
	/**
	 * 
	 * @param item
	 * @param events
	 */
	registerMouseEvent : function(item, events) {
		for (var i = 0; i < events.length; i++) {
			(function(event, item) {
				item.getDomInstance().addEventListener(event, function(e) {
					com.hoperun.event.MouseEvent[event](e, item);
				}, true);
			})(events[i], item);
		}
	},
	
	/**
	 * 
	 * @param item
	 */
	registerDraggable : function(item) {
		var options = {
			zIndex : 4001,
			opacity : 0.5,
			disabled : false,
			distance: 5,
			appendTo: '.docs-editor',
			helper : 'clone'
		};
		$(item.getDomInstance()).draggable(options).data('item', item);
	},
	
	/**
	 * Do get message type.
	 * 
	 * @param eventType the event type, values: resize|layout
	 * @returns the message type
	 */
	getMsgType: function(eventType, item){
        var msgType = null;
        if(eventType == 'resize'){
            switch(item.getType()){
                case 'Image':
                    msgType = com.hoperun.util.Observer.MessageType.IMAGE_RESIZE;
                    break;
                case 'Table':
                    msgType = com.hoperun.util.Observer.MessageType.TABLE_RESIZE;
                    break;
                default:
                    if(item.getType().indexOf("Chart_") == 0){
                        msgType = com.hoperun.util.Observer.MessageType.CHART_RESIZE;
                    }
                    else if(item.getType().indexOf("Shape_") == 0){
                        msgType = com.hoperun.util.Observer.MessageType.SHAPE_RESIZE;
                    }
            }
        }  
        else if(eventType == 'layout'){
            switch(item.getType()){
                case 'Image':
                    msgType = com.hoperun.util.Observer.MessageType.IMAGE_LAYOUT;
                    break;
                case 'Table':
                    msgType = com.hoperun.util.Observer.MessageType.TABLE_LAYOUT;
                    break;
                default:
                    if(item.getType().indexOf("Chart_") == 0){
                        msgType = com.hoperun.util.Observer.MessageType.CHART_LAYOUT;
                    }
                    else if(item.getType().indexOf("Shape_") == 0){
                        msgType = com.hoperun.util.Observer.MessageType.SHAPE_LAYOUT;
                    }
            }
        }
        return msgType;
    }
};
