/**
 * VideoTracker class
 * 
 * @package com.hoperun.tracker
 * @import com.hoperun.util.BaseTool,com.hoperun.util.NodeCache,com.hoperun.event.MouseEvent
 * @author kenny
 */
com.hoperun.tracker.VideoTracker = function () {
    this._id = com.hoperun.util.BaseTool.uuid();
    this._activeVideo = null;
    this._domInstance = document.createElement("div");
    this._domInstance.className = "video-tracker";
    this._domInstance.style.position = "absolute";

    this._domInstance.id = this._id;
    this._domInstance.style.zIndex = 1;
    this._className = "com.hoperun.tracker.VideoTracker";
    this._type = "videoTracker";
    //_LeftBar    _TopBar     _RightBar    _BottomBar   _CloseBar   _ResizeBar
    this._LeftBar = document.createElement("div");
    this._TopBar = document.createElement("div");
    this._RightBar = document.createElement("div");
    this._BottomBar = document.createElement("div");

    this._CloseBtn = document.createElement("div");
    this._ResizeBtn = document.createElement("div");

    this._domInstance.appendChild(this._LeftBar);
    this._domInstance.appendChild(this._TopBar);
    this._domInstance.appendChild(this._RightBar);
    this._domInstance.appendChild(this._BottomBar);

    this._TopBar.appendChild(this._CloseBtn);
    this._BottomBar.appendChild(this._ResizeBtn);

    this._TopBar.className = 'video-top-border node-moveable';
    this._BottomBar.className = 'video-bottom-border';
    
    this._LeftBar.className = 'video-left-border';
    this._RightBar.className = 'video-right-border'; 

    this._CloseBtn.className = 'video-close-botton';
    this._ResizeBtn.className = 'video-resize-botton';
    
    //Forbidden all propagation.
    com.hoperun.util.BaseTool.addForbiddenPropagation(this._domInstance);
    
    var self=this;
    //Bind Event 
    this._CloseBtn.onclick = function () {
        var message = new com.hoperun.util.Observer.Message();
        message.id = com.hoperun.util.Observer.MessageType.DELETE_ITEM;
        message.sender = self.getActiveItem();
        com.hoperun.util.Observer.sendMessage(message);
        self.hide();
    };
	this._ResizeBtn.onmousedown = function(evt) {
		var oldWidth = self.getWidth();
		var oldHeight = self.getHeight();
		evt = evt || window.event;
		var x0 = evt.pageX, y0 = evt.pageY;
		var diffH, diffW;
		var zoom=1;
		
		document.body.onmousemove = function(evt) {
			evt = evt || window.event;
			var x = evt.pageX, y = evt.pageY;
			diffH = y - y0;
			diffW = x - x0;
			self.setHeight(oldHeight + diffH);
			self.setWidth(oldWidth + diffW);
		};
		document.body.onmouseup = function(evt) {
//			
			document.body.onmousemove = null;
			document.body.onmouseup = null;
			var newWidth=oldWidth + diffW;
			var newHeight=oldHeight + diffH;
			
			self.setWidth(newWidth);
			self.setHeight(newHeight);
//
			var shapeResizeMsg = new com.hoperun.util.Observer.Message();
			shapeResizeMsg.id = com.hoperun.util.Observer.MessageType.VIDEO_RESIZE;
			shapeResizeMsg.sender = self;
			shapeResizeMsg.data = {'newWidth':newWidth,'newHeight':newHeight};
			com.hoperun.util.Observer.sendMessage(shapeResizeMsg);
		};
	};
	
	this._TopBar.onmousedown = function(evt) {
		var divItem=evt.target;
		if(divItem.getAttribute('class')=="video-close-botton"){
			return;
		}
		var startTop = self.getTop();
		var startLeft = self.getLeft();
		evt = evt || window.event;		
		var x0 = evt.pageX, y0 = evt.pageY;
		var diffT, diffL;
		
		document.body.onmousemove = function(evt) {
			evt = evt || window.event;
			var x = evt.pageX, y = evt.pageY;
			diffT = y - y0;
			diffL = x - x0;
			self.setTop(startTop + diffT);
			self.setLeft(startLeft + diffL);			
			self._activeVideo.getDomInstance().style.top=startTop + diffT;
			self._activeVideo.getDomInstance().style.left=startLeft + diffL;
		};
		document.body.onmouseup = function(evt) {

			document.body.onmousemove = null;
			document.body.onmouseup = null;

			var shapeMoveMsg = new com.hoperun.util.Observer.Message();
			shapeMoveMsg.id = com.hoperun.util.Observer.MessageType.VIDEO_POSITION;
			shapeMoveMsg.sender = self;
			shapeMoveMsg.data = {'moveTop':diffT, 'moveLeft':diffL};
			com.hoperun.util.Observer.sendMessage(shapeMoveMsg);
		};
	};
};
com.hoperun.tracker.VideoTracker.prototype = {

    _domInstance: null,

    _id: null,

    _width: null,

    _height: null,

    _left: null,

    _top: null,

    _activeVideo: null,

    _zIndex: null,

    setActiveItem: function (activeVideo) {
        this._activeVideo = activeVideo;
        var pos = com.hoperun.util.BaseTool.getAbsPostionInContainer(this._activeVideo.getDomInstance());
        this.setLeft(pos.x-2); //Balance border left width
        this.setTop(pos.y-20); //Balance border top width
        this.setWidth(this._activeVideo.getWidth());
        this.setHeight(this._activeVideo.getHeight());

	    //console.info(activeVideo.getDomInstance().getElementsByTagName("video")[0].videoWidth);
	    //console.info(activeVideo.getDomInstance().getElementsByTagName("video")[0].videoHeight);
	    
        ////Send tracker focus
        var msg = new com.hoperun.util.Observer.Message();
        msg.id = com.hoperun.util.Observer.MessageType.CONTEXT_FOCUS;
        msg.sender = this;
        com.hoperun.util.Observer.sendMessage(msg);
    },
    getActiveItem: function () {
        return this._activeVideo;
    },
    getLeft: function () {
        return this._left;
    },

    getTop: function () {
        return this._top;
    },
    setLeft: function (left) {
        this._left = left;
        this._domInstance.style.left = left;
    },

    setTop: function (top) {
        this._top = top;
        this._domInstance.style.top = top;
    },

    setZIndex: function (zIndex) {
        this._domInstance.style.zIndex = zIndex;
        this._zIndex = zIndex;
    },

    getZIndex: function () {
        return this._zIndex;
    },

    setWidth: function (width) {
        this._width = width;

        this._domInstance.style.width = com.hoperun.util.BaseTool.convertPixelToNumber(width+4) + "px";
        this._TopBar.style.width = com.hoperun.util.BaseTool.convertPixelToNumber(width + 4) + "px";
        this._BottomBar.style.width = com.hoperun.util.BaseTool.convertPixelToNumber(width + 4) + "px";
        //this._RightBar.style.right = com.hoperun.util.BaseTool.convertPixelToNumber(width + 2) + "px";
    },

    setHeight: function (height) {
        this._height = height;

        this._domInstance.style.height = com.hoperun.util.BaseTool.convertPixelToNumber(height+35) + "px";
        this._LeftBar.style.height = com.hoperun.util.BaseTool.convertPixelToNumber(height+35)+ "px";
        this._RightBar.style.height = com.hoperun.util.BaseTool.convertPixelToNumber(height+35) + "px";
    },
    getWidth: function () {
        return this._width;
    },

    getHeight: function () {
        return this._height;
    },

    // 公共方法 深度拷贝对象
    clone: function () {

    },
    // 公共方法 返回对象ID
    getId: function () {
        return this._id;
    },
    // 公共方法 返回类名
    getClassName: function () {
        return this._className;
    },
    // 公共方法 返回对象类型
    getType: function () {
        return this._type;
    },
    // 公共方法 将对象添加到本身
    appendChild: function (childNode) {
        this.getDomInstance().appendChild(childNode.getDomInstance());
    },
    // 公共方法 将对象添加到父节
    appendTo: function (parentNode) {
        parentNode.appendChild(this);
    },
    // 公共方法 将对象从父节点移
    removeFrom: function (parentNode) {
        parentNode.removeChild(this);
    },
    // 公共方法 数据对象以JSON格式返回
    toJSON: function () {
        return JSON.stringify(this.getData());
    },
    // 公共方法 以JSON字串为数据恢复对象属性设
    toObject: function (json) {
        this.setData(JSON.parse(json));
    },
    // 公共对象 根据数据对象设置对象属�?
    setData: function (data) {
    },
    // 公共方法 返回数据对象
    getData: function () {
        return {};
    },
    // 公共方法 返回该对象DOM实例
    getDomInstance: function () {
        return this._domInstance;
    },
    // 公共方法 获取当前Tracker是否处于隐藏状�?
    isHide: function () {
        return this.getDomInstance().style.display == 'none';
    },
    // 公共方法 隐藏当前Tracker
    hide: function () {
        this.getDomInstance().style.display = 'none';
    },
    // 公共方法 显示当前Tracker
    show: function () {
        this.getDomInstance().style.display = 'block';
    }
};
