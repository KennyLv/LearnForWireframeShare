/**
 * Tracker class.
 * 
 * @description it contains resize function.
 * 
 * @package com.hoperun.tracker
 * @import com.hoperun.util.BaseTool
 * @author feng.lu
 */
com.hoperun.tracker.Tracker = function() {
};
com.hoperun.tracker.Tracker.prototype = {
    
    /**
     * Do create DOM instance.
     * 
     * @param type the type
     */
    createDomInstance: function(type){
        this._type = type;

        this._domInstance = document.createElement("div");
        
        this._domInstance.style.zIndex = 1;
        
        this._activeItem = null;
        this._layoutItem = null;
        this._buttons = [];

        com.hoperun.util.BaseTool.addForbiddenPropagation(this._domInstance);
        
        this._createChilds();
        this._registerMouseEvent();
    },
    
    /**
     * Do hide the tracker only.
     */
    hideTrackerOnly: function() {
        this.getDomInstance().style.display = 'none';
    },
    
    /**
     * Do check hide status of the tracker.
     */
    isHide: function(){
        return this.getDomInstance().style.display == 'none';
    },
    
    /**
     * Do hide the tracker and apply to active item.
     */
    hide: function() {
        this.hideTrackerOnly();
        this._doBlurItem();
    },
    
    /**
     * Do show the tracker. 
     */
    show: function() {
        this.getDomInstance().style.display = 'block';
    },
    
    /**
     * Do blur the active item.
     */
    _doBlurItem: function(){
        if(this._activeItem){
            this._activeItem.getDomInstance().onmousedown = null;
            $(this._activeItem.getDomInstance()).draggable("destroy").removeClass("node-moveable");
            this._activeItem.doBlur && this._activeItem.doBlur();
        }
    },
    
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////// Private Properties   ////////////////////////////////////////////// 
    _domInstance : null,

    //Type
    _type : null,
    
    //Position
    _top : null,
    _left : null,
    _width : null,
    _height : null,
    
    //Active item
    _activeItem : null,
    
    //Z-index
    _zIndex : null,
    /////////////////////////////// Private Properties   ////////////////////////////////////////////// 
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    
    
    
    
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////// Getter and setter methods of the private properties   /////////////////////////// 
    getDomInstance : function() {
        return this._domInstance;
    },
    
    getType : function() {
        return this._type;
    },

    getZIndex : function() {
        return this._zIndex;
    },
    setZIndex : function(zIndex) {
        this._zIndex = zIndex;
        this._domInstance.style.zIndex = zIndex;
        
        $('.tracker-box-handle').css({
            'zIndex' : zIndex + 1
        });
        $('.tracker-box').css({
            'zIndex' : this._zIndex
        });
    },
    
    getLeft : function() {
        return this._left;
    },
    setLeft : function(left) {
        this._left = com.hoperun.util.BaseTool.convertPixelToNumber(left);
        this._changeLayout();
    },
    getTop : function() {
        return this._top;
    },
    setTop : function(top) {
        this._top = com.hoperun.util.BaseTool.convertPixelToNumber(top);
        this._changeLayout();
    },
    getWidth : function() {
        return this._width;
    },
    setWidth : function(width) {
        this._width = com.hoperun.util.BaseTool.convertPixelToNumber(width);
        this._changeLayout();
    },
    getHeight : function() {
        return this._height;
    },
    setHeight : function(height) {
        this._height = com.hoperun.util.BaseTool.convertPixelToNumber(height);
        this._changeLayout();
    },
    
    getActiveItem : function() {
        return this._activeItem;
    },
    
    /**
     * Do set active item.
     * 
     * @param item the item
     */
    setActiveItem : function(item) {
        if (this._activeItem != item) {
            this._doBlurItem();
        }

        this._activeItem = item;
        this._activeItem.doEndEdit && this._activeItem.doEndEdit(); //Ensure the current initialize status is not below on editing.
        $(this._activeItem.getDomInstance()).addClass("node-moveable");
        
        //Reset position for the tracker
        var pos = com.hoperun.util.BaseTool.getAbsPostionInContainer(this._activeItem.getDomInstance());
        this._top = pos.y;
        this._left = pos.x;
        this._width = com.hoperun.util.BaseTool.convertPixelToNumber(this._activeItem.getDomInstance().style.width);
        this._height = com.hoperun.util.BaseTool.convertPixelToNumber(this._activeItem.getDomInstance().style.height);
        this._changeListener();
        this._changeLayout();

        //Reset z-index for tracker against this active item
        this.setZIndex(this._activeItem.getZIndex() - 1);
        
        // Send tracker focus
        var focusMsg = new com.hoperun.util.Observer.Message();
        focusMsg.id = com.hoperun.util.Observer.MessageType.CONTEXT_FOCUS; 
        focusMsg.sender = this;
        com.hoperun.util.Observer.sendMessage(focusMsg);
    },
    ///////////////// Getter and setter methods of the private properties   /////////////////////////// 
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    
    
    
    

    
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////// Private Method       ////////////////////////////////////////////// 
    /**
     * Do change listener
     */
    _changeListener: function() {
        var options = {
            zIndex : 4003,
            opacity : 0.35,
            disabled : false,
            distance: 5,
            appendTo: '.docs-editor',
            helper : 'clone'
        };
        $(this._activeItem.getDomInstance()).draggable(options).data('item', this._activeItem);
    },
    
    /**
     * Do create children nodes.
     */
    _createChilds: function() {
        var parentNode = this._domInstance;

        // Button list
        var btnsNode = document.createElement("div");
        parentNode.appendChild(btnsNode);
        btnsNode.className = "hr-docstext-unprintable";

        // First layout item
        this._layoutItem = document.createElement("div");
        btnsNode.appendChild(this._layoutItem);
        this._layoutItem.className = "tracker-box";

        var rectCursor = [ "nw-resize", "n-resize", "ne-resize", "w-resize", "e-resize", "sw-resize", "s-resize", "se-resize" ];
        for ( var i = 0; i < rectCursor.length; i++) {
            var btn = document.createElement("div");
            btnsNode.appendChild(btn);
            btn.className = "tracker-box-handle";
            this._buttons.push(btn);
            btn.style.cursor = rectCursor[i];
        }
    },
    
    /**
     * Do change layout.
     */
    _changeLayout: function() {
        this._layoutItem.style.top = this._top - 6 + 'px';
        this._layoutItem.style.left = this._left - 6 + 'px';
        this._layoutItem.style.width = this._width + 4 + 'px';
        this._layoutItem.style.height = this._height + 4 + 'px';

        this._buttons[0].style.top = this._buttons[1].style.top = this._buttons[2].style.top = this._top - 8 + 'px';
        this._buttons[3].style.top = this._buttons[4].style.top = this._top + this._height / 2 - 4 + 'px';
        this._buttons[5].style.top = this._buttons[6].style.top = this._buttons[7].style.top = this._top + this._height + 2 + 'px';

        this._buttons[0].style.left = this._buttons[3].style.left = this._buttons[5].style.left = this._left - 8 + 'px';
        this._buttons[1].style.left = this._buttons[6].style.left = this._left + this._width / 2 - 4 + 'px';
        this._buttons[2].style.left = this._buttons[4].style.left = this._buttons[7].style.left = this._left + this._width + 2  + 'px';
    },
    
    /**
     * Do register mouse event.
     */
    _registerMouseEvent: function() {
        var self = this;
        // Resize listener
        for ( var i = 0; i < this._buttons.length; i++) {
            this._buttons[i].onmousedown = function(evt) {
                var oldWidth = self.getWidth();
                var oldHeight = self.getHeight();
                evt = evt || window.event;
                var obj = evt.srcElement || evt.target;
                var direction = obj.style.cursor.substring(0, obj.style.cursor.indexOf("-resize"));
                var x0 = evt.pageX, y0 = evt.pageY, w = self.getWidth(), h = self.getHeight(), t = self.getTop(), l = self.getLeft();
                var diffH = 0, diffW = 0;
                self.getActiveItem().getDomInstance().parentNode.onmousemove = function(evt) {
                    evt = evt || window.event;
                    var x = evt.pageX, y = evt.pageY;
                    diffH = y0 - y;
                    diffW = x0 - x;
                    if (direction == 's') {
                        self.setHeight(h - diffH);
                    } else if (direction == 'n') {
                        self.setTop(t - diffH);
                        self.setHeight(h + diffH);
                    } else if (direction == 'e') {
                        self.setWidth(w - diffW);
                    } else if (direction == 'w') {
                        self.setLeft(l - diffW);
                        self.setWidth(w + diffW);
                    } else {
                        if (direction == 'nw') {
                            self.setTop(t - diffH);
                            self.setHeight(h + diffH);
                            self.setLeft(l - diffW);
                            self.setWidth(w + diffW);
                        } else if (direction == 'ne') {
                            self.setTop(t - diffH);
                            self.setHeight(h + diffH);
                            self.setWidth(w - diffW);
                        } else if (direction == 'sw') {
                            self.setHeight(h - diffH);
                            self.setLeft(l - diffW);
                            self.setWidth(w + diffW);
                        } else if (direction == 'se') {
                            self.setHeight(h - diffH);
                            self.setWidth(w - diffW);
                        }
                    }
                };
                document.body.onmouseup = function(evt) {
                    var zoomX = self.getWidth() / oldWidth;
                    var zoomY = self.getHeight() / oldHeight;
                    
                    var moveTop = (diffH < 0 && zoomY < 1 || diffH > 0 && zoomY > 1) ? -diffH : 0;
                    var moveLeft = (diffW < 0 && zoomX < 1 || diffW > 0 && zoomX > 1) ? -diffW : 0;
                    
                    self.getActiveItem().getDomInstance().parentNode.onmousemove = null;
                    document.body.onmouseup = null;

                    var resizeMsg = new com.hoperun.util.Observer.Message();
                    resizeMsg.id = com.hoperun.util.BaseTool.getMsgType("resize", self.getActiveItem());
                    resizeMsg.sender = self;
                    resizeMsg.data = {'zoomX':zoomX, 'zoomY':zoomY, 'moveTop':moveTop, 'moveLeft':moveLeft};
                    com.hoperun.util.Observer.sendMessage(resizeMsg);
                    
                    var updateMsg = new com.hoperun.util.Observer.Message();
                    updateMsg.id = com.hoperun.util.BaseTool.getMsgType("layout", self.getActiveItem()); 
                    updateMsg.sender = self.getActiveItem();
                    com.hoperun.util.Observer.sendMessage(updateMsg);
                };

                return false;
            };
        }
    }
    /////////////////////////////// Private Method       ////////////////////////////////////////////// 
    ///////////////////////////////////////////////////////////////////////////////////////////////////
};
