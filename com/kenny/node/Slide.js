/**
 * Slide class
 * @package com.kenny.node
 * @import com.kenny.util.BaseTool, com.kenny.util.NodeCache, com.kenny.shape
 * @author xuliyu, Jian.T
 */
com.kenny.node.Slide = function(){
	com.kenny.node.Slide.superClass.constructor.call(this);
	this._domInstance = document.createElement("div");
	this._domInstance.id = this._id;
	this._childNodes = [];
	this._domInstance.style.position = "relative";
	this._domInstance.style.overflow = "hidden";
	//
	//this._domInstance.style.border = "1px solid #000";
	this._type = "Slide";
	this._domInstance.setAttribute("objectType",this._type);
	com.kenny.util.NodeCache.add(this.getId(), this);
	this._init();
	this._currPosition = {x:null, y:null};
	
	com.kenny.util.BaseTool.addForbiddenPropagation(this._domInstance);
	com.kenny.util.BaseTool.actsAsAspect(this);
};

com.kenny.util.BaseTool.extend(com.kenny.node.Slide,com.kenny.node.Node);

com.kenny.util.BaseTool.augment(com.kenny.node.Slide,{
	
	_childNodes:null,
	
	_top:0,
	
	_left:0,
	
	_width:null,
	
	_height:null,
	
	_transitions:null,
	
	_currPosition:{
		x: 0,
		y: 0
	},
	
	_background:null,
	
	setWidth:function(width){
		this._domInstance.style.width = width;
		this._width = width;
	},
	
	getWidth:function(){
		return this._width;
	},
	
	setHeight:function(height){
		this._domInstance.style.height = height;
		this._height = height;
	},
	
	getHeight:function(){
		return this._height;
	},
	
	setLeft:function(left){
		this._domInstance.style.left = left + "px";
		this._left = left;
	},
	
	getLeft:function(){
		return this._left;
	},
	
	setTop:function(top){
		this._domInstance.style.top = top + "px";
		this._top = top;
	},
	
	getTop:function(){
		return this._top;
	},
	
	setTransitions:function(transitions){
		this._transitions = transitions;
	},
	
	getTransitions:function(){
		return this._transitions;
	},
	
	setBackground:function(background){//{color:null,image:null,repeat:null}
		this._domInstance.style.backgroundColor = background.color;
		this._domInstance.style.backgroundImage = background.image;
		//this._domInstance.style.backgroundRepeat = background.repeat;
		this._domInstance.style.backgroundSize = '100% 100%';	
		this._background = background;
		
		var message = new com.kenny.util.Observer.Message();
		message.id = com.kenny.util.Observer.MessageType.UPDATE_SLIDE_LEFTSIDE;
		message.sender = this;
		message.data = {};
		com.kenny.util.Observer.sendMessage(message);
	},
	
	getBackground:function(){
		return this._background;
	},
		
	appendChild:function(childNode){
		if(childNode.getTop() == null && childNode.getLeft() == null){
			if(this._currPosition.x != null && this._currPosition.y != null){
				childNode.setTop(this._currPosition.y);
				childNode.setLeft(this._currPosition.x);
			} else {
				childNode.setTop(0);
				childNode.setLeft(0);
			}
		} 
		this._domInstance.appendChild(childNode.getDomInstance());
		this._childNodes.push(childNode);
	},
	
	removeChild:function(childNode){
		this._domInstance.removeChild(childNode.getDomInstance());
		var index = this._childNodes.indexOf(childNode, 0);
		if(index != -1) this._childNodes.removeAt(index);
	},
	
	getAllElements:function(){
		return this._childNodes;
	},
	
	setCursorPosition:function(x, y){
		this._currPosition.x = x;
		this._currPosition.y = y;
	},
	
	getCursorPosition:function(){
		return this._currPosition;
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
	
	zoom:function(multiple){
		//Reset slide page size  ---Added by Feng
//		this._width = 1000,
//		this._height = 750;
		
		this.setTop((this._top || this._domInstance.offsetTop) * multiple);
		this.setLeft((this._left || this._domInstance.offsetLeft) * multiple);
		this.setWidth((this._width || this._domInstance.offsetWidth) * multiple);
		this.setHeight((this._height || this._domInstance.offsetHeight) * multiple);
		for(var i=0; i<this._childNodes.length; i++){
			var node = this._childNodes[i];
			if(node.zoom) node.zoom(multiple);
		}
	},
	
	/**
	 * Add mouse listener for slide.
	 * 
	 */
	_init : function() {
		
		var self = this;
		$(this._domInstance).droppable({
			//accept: ".node-moveable",
	        drop: function(event, ui) {
	        	var item = ui.draggable.data("item");
	        	if(item.getType() == 'Image') {
		        	
		        	var msg = new com.kenny.util.Observer.Message();
                    msg.id = com.kenny.util.Observer.MessageType.IMAGE_POSITION;
                    msg.sender = item;
                    msg.data = {'left':ui.position.left+item.getClip().x ,'top':ui.position.top+item.getClip().y ,'self':self};
                    com.kenny.util.Observer.sendMessage(msg);
		        	
		        	var message = new com.kenny.util.Observer.Message();
	        		message.id = com.kenny.util.Observer.MessageType.IMAGE_FOCUS;
	        		message.sender = item;
		    		message.data = {};
		    		com.kenny.util.Observer.sendMessage(message);
	    		}
	        	else if(item.getType() == 'Table') {
	        		
		        	// send current table`s position
                    var msg = new com.kenny.util.Observer.Message();
                    msg.id = com.kenny.util.Observer.MessageType.TABLE_POSITION;
                    msg.sender = item;
                    msg.data = {'left':ui.position.left + 10 ,'top':ui.position.top ,'self':self};
                    com.kenny.util.Observer.sendMessage(msg);
		        	
		        	var message = new com.kenny.util.Observer.Message();
	        		message.id = com.kenny.util.Observer.MessageType.TABLE_FOCUS;
	        		message.sender = item;
		    		message.data = {};
		    		com.kenny.util.Observer.sendMessage(message);
	    		}
	    		else {
	    		    if(item.getType().indexOf("Chart_") == 0){
	    		        var msg = new com.kenny.util.Observer.Message();
                        msg.id = com.kenny.util.Observer.MessageType.CHART_POSITION;
                        msg.sender = item;
                        msg.data = {'left':ui.position.left ,'top':ui.position.top ,'self':self};
                        com.kenny.util.Observer.sendMessage(msg);
                    }
                    else if(item.getType().indexOf("Shape_") == 0){
//                      item.setTop(ui.position.top);
//                      item.setLeft(ui.position.left);
//                      com.kenny.util.BaseTool.doValidPosition(self, item);
                        var msg = new com.kenny.util.Observer.Message();
                        msg.id = com.kenny.util.Observer.MessageType.SHAPE_POSITION;
                        msg.sender = item;
                        msg.data = {'left':ui.position.left ,'top':ui.position.top ,'self':self};
                        com.kenny.util.Observer.sendMessage(msg);
                        
                        var message = new com.kenny.util.Observer.Message();
                        message.id = com.kenny.util.Observer.MessageType.SHAPE_FOCUS;
                        message.sender = item;
                        message.data = {};
                        com.kenny.util.Observer.sendMessage(message);
                    }

	    		}
	    		
	    		var message = new com.kenny.util.Observer.Message();
				message.id = com.kenny.util.Observer.MessageType.UPDATE_SLIDE_LEFTSIDE;
				message.sender = this;
				message.data = {};
				com.kenny.util.Observer.sendMessage(message);
	        }
	    });
		
		$(this._domInstance).bind('click', function(evt){
			var relativePos =  com.kenny.util.BaseTool.getOffset(evt);
			self.setCursorPosition(relativePos.offsetX < 0 ? 0 : relativePos.offsetX, relativePos.offsetY < 0 ? 0 : relativePos.offsetY);
			var msg = new com.kenny.util.Observer.Message();
			msg.id = com.kenny.util.Observer.MessageType.CONTEXT_BLUR;
			msg.sender = null;
			com.kenny.util.Observer.sendMessage(msg);
		});
	},
	
	setData:function(data){
		if(this._childNodes!=null && this._childNodes.length>0){
			for(var i=this._childNodes.length-1; i>=0; i--){
				this._childNodes[i].removeFrom(this);
			}
		}
		if(data.top != this._top)
			this.setTop(data.top);
		if(data.left != this._left)
			this.setLeft(data.left);
		if(data.width != this._width)
			this.setWidth(data.width);
		if(data.height != this._height)
			this.setHeight(data.height);
		if(data.transitions != this._transitions)
			this.setTransitions(data.transitions);
		if(data.background != this._background)
			this.setBackground(data.background);
		for(var i=0; i<data.childNodes.length; i++){
	        var node = com.kenny.util.BaseTool.createNode(data.childNodes[i].type);
            node.setData(data.childNodes[i]);
            node.appendTo(this);
		}
	},
	
	getData:function(){
		var childNodes = [];
		for(var i=0; i<this._childNodes.length; i++)
			childNodes.push(this._childNodes[i].getData());
		return {
			id:this._id,
			type:this._type,
			top:this._top,
			left:this._left,
			width:this._width,
			height:this._height,
			transitions:this._transitions,
			background:this._background,
			childNodes:childNodes
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