/**
 * Abstract node class defined.
 * 
 * @package com.kenny.node
 * @import com.kenny.util.CommonUtil
 * @author Feng.Lu
 */
com.kenny.node.Node = function() {
	this._id = com.kenny.util.CommonUtil.uuid();
	this._children = [];
	this._zoom = 1;
};

com.kenny.node.Node.prototype = {
        
 // ┌─────────────────────────────────────────────────────────────────────┐ \\
 // │ The private properties                                              │ \\
 // └─────────────────────────────────────────────────────────────────────┘ \\
    // The identified code
    _id : null,
    _type : null,

    // The DOM instance
    _domInstance: null,
    
    // Position &Size
    _top    : null,
    _left   : null,
    _width  : null,
    _height : null,
    
    // Zoom of the node
    _zoom : null,
    
    // z-index of the node
    _zIndex : null,
    
    // The parent &children node
    _parent   : null,
    _children : null, 
    
 // ┌─────────────────────────────────────────────────────────────────────┐ \\
 // │ Empty Method to be override                                         │ \\
 // └─────────────────────────────────────────────────────────────────────┘ \\
    /**
     * Do something after appendTo invoked.
     */
    doAfterAppendTo : function() {
    },
    
    /**
     * Do something after removeFrom invoked.
     */
    doAfterRemoveFrom : function() {
    },
    
 // ┌─────────────────────────────────────────────────────────────────────┐ \\
 // │ Abstract Method to be implemented                                   │ \\
 // └─────────────────────────────────────────────────────────────────────┘ \\
    /**
     * Do zoom the data.
     * 
     * @param m the multiple value
     */
    zoom : function(m) {
        com.kenny.util.BaseTool.throwImplementException(this, "zoom");
    },
    
    /**
     * Do get data formatted with JSON.
     * 
     * @returns the JSON object data
     */
    getData : function() {
        com.kenny.util.BaseTool.throwImplementException(this, "getData");
    },
    
    /**
     * Do set the data.
     * 
     * @param d the JSON object data
     */
    setData : function(d) {
        com.kenny.util.BaseTool.throwImplementException(this, "setData");
    },
    
    /**
     * Do render the chart on the page.
     * This method should be implemented by sub class.
     */
    render: function(){
        com.kenny.util.BaseTool.throwImplementException(this, "render");
    },
    
 // ┌─────────────────────────────────────────────────────────────────────┐ \\
 // │ Public Methods & Interfaces                                         │ \\
 // └─────────────────────────────────────────────────────────────────────┘ \\
    /**
     * Do clone new instance with this instance.
     * 
     * @returns the clone object
     */
    clone : function() {
        var cloneObj = new this.constructor();
        cloneObj.setData(this.getData());
        return cloneObj;
    },
    
    /**
     * Do get JSON string.
     * 
     * @returns the string of JSON object
     */
    toJSON : function() {
        return JSON.stringify(this.getData());
    },
    
    /**
     * Do initialize data for DOM instance.
     * 
     * @param sd the style data
     */
    initDefaultDomInstance : function(sd) {
        this._domInstance.setAttribute("objectType", this.getType());
        this._domInstance.setAttribute("id", this.getId());
        this._domInstance.style.position = "absolute";
        this._domInstance.style.zIndex = 1000;
    },
    
    /**
     * Do append to the parent container.
     * 
     * @param p the parent node object
     */
    appendTo : function(p) {
        p.appendChild(this);
        this.doAfterAppendTo();
    },
    
    /**
     * Do remove the object from parent node.
     * 
     * @param p the parent node object
     */
    removeFrom : function(p) {
        p.removeChild(this);
        this.doAfterRemoveFrom();
    },
    
    /**
     * Insert a child node to the specified position
     * 
     * @param n the node to be inserted
     * @param i optional,the position to insert to
     */
    insert : function(n, i) {
    	if (i && i >= 0){
    		this._children.insert(i, n);
    	}
    	else{
    		this._children.push(n);
    	}
    	n.setParent(this);
    },
    
    /**
     * Remove a child from the node
     * 
     * @param e the child to be removed
     */
    remove : function(e) {
    	var i = this._children.indexOf(e);
    	this._children.removeAt(i);
    	this._parent.getDomInstance().removeChild(this.getDomInstance());
    },
    
    
 // ┌─────────────────────────────────────────────────────────────────────┐ \\
 // │ Getter &Setter Methods for private properties                       │ \\
 // └─────────────────────────────────────────────────────────────────────┘ \\
    /**
     * Do get the ID.
     * 
     * @returns the ID 
     */
    getId : function() {
        return this._id;
    },
    
    /**
     * Do get the type.
     * 
     * @returns the type
     */
    getType : function() {
        return this._type;
    },
    
    /**
     * Do set the type.
     */
    setType : function(t) {
        this._type = t;
    },
    
    /**
     * Do get the DOM instance.
     * 
     * @returns the DOM instance
     */
    getDomInstance : function() {
        return this._domInstance;
    },
    /**
     * Do set the DOM instance. 
     */
    setDomInstance : function(dom) {
        this._domInstance = dom;
    },
    
    /**
     * Do get the parent node
     * 
     * @return parent node
     */
    getParent : function() {
        return this._parent;
    },
    
    /**
     * Do set the parent node
     * 
     * @param parent parent node
     */
    setParent : function(p) {
        this._parent = p;
    },
    
    /**
     * Do get the children node
     * 
     * @return children node
     */
    getChildren : function() {
        return this._children;
    },
    
    // Position Begin
    /**
     * 
     */
    getTop : function() {
        return this._top;
    },
    
    /**
     * 
     * @param t
     */
    setTop : function(t) {
        this._top = t;
        this.getDomInstance().style.top = this.getTop();
    },
    
    /**
     * 
     * @returns
     */
    getLeft : function() {
        return this._left;
    },
    
    /**
     * 
     * @param l
     */
    setLeft : function(l) {
        this._left = l;
        this.getDomInstance().style.left = this.getLeft();
    },
    
    /**
     * 
     * @returns
     */
    getWidth : function() {
        return this._width;
    },
    
    /**
     * 
     * @param w
     */
    setWidth: function(w){
        this._width = w;
        this.getDomInstance().style.width = this.getWidth();
    },
    
    /**
     * 
     * @returns
     */
    getHeight : function() {
        return this._height;
    },
    
    /**
     * 
     * @param h
     */
    setHeight : function(h) {
        this._height = h;
        this.getDomInstance().style.height = this.getHeight();
    },
    
    /**
     * Do get the zoom.
     */
    getZoom : function() {
       return this._zoom;
    },
    
    /**
     * Do set the zoom.
     * 
     * @param val the zoom value
     */
    setZoom : function(val) {
        this._zoom = val;
    },
    
    /**
     * Do set z-index.
     * 
     * @param z the z-index value
     */
    setZIndex : function(z) {
        this._zIndex = z;
        this.getDomInstance().style.zIndex = this.getZIndex();
    },
    
    /**
     * Do get z-index.
     * 
     * @returns the z-index value
     */
    getZIndex : function() {
        return this._zIndex;
    }
    
};