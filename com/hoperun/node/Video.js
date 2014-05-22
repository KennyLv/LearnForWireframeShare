/**
 * Video class
 * 
 * @package com.hoperun.node
 * @import com.hoperun.util.BaseTool,com.hoperun.util.NodeCache,com.hoperun.event.MouseEvent
 * @author xuliyu
 */
com.hoperun.node.Video = function() {
	com.hoperun.node.Video.superClass.constructor.call(this);
	this._domInstance = document.createElement("div");
	this._domInstance.style.position = 'absolute';
	this._domInstance.id = this._id;
	this._domInstance.setAttribute("objectType","Video");
	var video = document.createElement("video");
	video.controls = "controls";
	video.autoplay = "autoplay";
	video.style.width = '100%';
	video.style.height = '100%';
	this._domInstance.appendChild(video);	
	this._type = "Video";
	com.hoperun.util.NodeCache.add(this.getId(), this);
	
	var self = this;
	this._domInstance.addEventListener('click', function(event){com.hoperun.event.MouseEvent.click(event, self);}, true);
	
	com.hoperun.util.BaseTool.addForbiddenPropagation(this._domInstance);
	com.hoperun.util.BaseTool.actsAsAspect(this);
};

com.hoperun.util.BaseTool.extend(com.hoperun.node.Video,com.hoperun.node.Node);

com.hoperun.util.BaseTool.augment(com.hoperun.node.Video,{

    _width: null,

    _height: null,

    _left: null,

    _top: null,
	
	_src: null,
	
	_zindex:null,
	
    zoom: function (multiple) {
        this.setTop(this._top * multiple);
        this.setLeft(this._left * multiple);
        this.setWidth(this._width * multiple);
        this.setHeight(this._height * multiple);
    },
	
	setSrc: function (src) {
        this._src = src;
        this._domInstance.getElementsByTagName("video")[0].src = src;
    },

    getSrc: function () {
        return this._src;
    },
	
    setLeft: function (left) {
        this._left = left;
        this._domInstance.style.left = left;
    },

    getLeft: function () {
        return this._left;
    },

    setTop: function (top) {
        this._top = top;
        this._domInstance.style.top = top;
    },

    getTop: function () {
        return this._top;
    },
	
    setWidth: function (width) {
		this._width = width;
        //this._domInstance.style.width = this._domInstance.getElementsByTagName("video")[0].width = width;
		this._domInstance.style.width  = width;
    },

    getWidth: function () {
        return this._width;
    },

    setHeight: function (height) {
        this._height = height;
		//this._domInstance.style.height = this._domInstance.getElementsByTagName("video")[0].height = height;
        this._domInstance.style.height  = height;
    },

    getHeight: function () {
        return this._height;
    },
    setZIndex: function (zIndex) {
    	this._domInstance.style.zIndex = zIndex;
        this._zindex = zIndex;
    },
    getZIndex: function () {
        return this._zindex;
    },
	
    setData: function (data) {
        if (data.width != this._width)
            this.setWidth(data.width);
        if (data.height != this._height)
            this.setHeight(data.height);
		if (data.left != this._left)
            this.setLeft(data.left);
		if (data.top != this._top)
            this.setTop(data.top);
		if (data.src != this._src)
            this.setSrc(data.src);
        if (data.zIndex != this._zindex)
            this.setZIndex(data.zIndex);
    },
	
    getData: function () {
        return {
            id: this._id,
            type: this._type,
            width: this._width,
            height: this._height,
			left: this._left,
			top: this._top,
			src: this._src,
			zIndex: this._zindex
        };
    },
	
});