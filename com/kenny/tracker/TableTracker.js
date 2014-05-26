/**
 * Cell class
 * 
 * @package com.kenny.node
 * @import com.kenny.util.BaseTool,com.kenny.util.NodeCache,com.kenny.event.MouseEvent
 * @author lu_feng
 */
com.kenny.tracker.TableTracker = function() {
	this._id = com.kenny.util.BaseTool.uuid();
	this._activeTable = null;
	this._domInstance = document.createElement("div");
	this._domInstance.className = "table-tracker node-moveable";
	this._domInstance.style.position = "absolute";
	
	this._domInstance.id = this._id;
	this._domInstance.style.zIndex = 1;
	this._className = "com.kenny.tracker.TableTracker";
	this._type = "tableTracker";
	
	//Forbidden all propagation.
    com.kenny.util.BaseTool.addForbiddenPropagation(this._domInstance);
    
	this._leftTopBtn = document.createElement("div");
	this._leftBottomBtn = document.createElement("div");
	this._rightTopBtn = document.createElement("div");
	this._topBar = document.createElement("div");
	this._leftBar = document.createElement("div");
	this._leftBar_top = document.createElement("div");
	//this._leftBar_center = document.createElement("div");
	this._leftBar_bottom = document.createElement("div");
	
	this._topBar_left = document.createElement("div");
	//this._topBar_center = document.createElement("div");
	this._topBar_right = document.createElement("div");
	
	this._domInstance.appendChild(this._leftTopBtn);
	this._domInstance.appendChild(this._leftBottomBtn);
	this._domInstance.appendChild(this._rightTopBtn);
	this._domInstance.appendChild(this._topBar);
	this._domInstance.appendChild(this._leftBar);
	
	this._leftBar.appendChild(this._leftBar_top);
	//this._leftBar.appendChild(this._leftBar_center);
	this._leftBar.appendChild(this._leftBar_bottom);
	
	this._topBar.appendChild(this._topBar_left);
	//this._topBar.appendChild(this._topBar_center);
	this._topBar.appendChild(this._topBar_right);
	
	
	this._leftTopBtn.className = 'move-button';
	this._leftTopBtn.style.left = "-6px";
	this._leftTopBtn.style.top = "-6px";
	
	this._leftBottomBtn.className = 'add-row-button';
	this._leftBottomBtn.style.left = "-6px";
	this._leftBottomBtn.style.top = "10px";
	
	this._rightTopBtn.className = 'add-col-button';
	this._rightTopBtn.style.left = "10px";
	this._rightTopBtn.style.top = "-6px";
	
	this._leftBar.className = 'left-bar';
	this._leftBar_top.className = 'left-bar-top';
	//this._leftBar_center.className = 'left-bar-center';
	this._leftBar_bottom.className = 'left-bar-bottom';
	
	this._topBar.className = 'top-bar';
	this._topBar_left.className = 'top-bar-left';
	//this._topBar_center.className = 'top-bar-center';
	this._topBar_right.className = 'top-bar-right';
	
	var self = this;
	
	//Bind Event 
	this._rightTopBtn.onclick = function(){
		var message = new com.kenny.util.Observer.Message();
		message.id = com.kenny.util.Observer.MessageType.TABLE_COL_ADD;
		message.sender = self.getActiveTable();
		com.kenny.util.Observer.sendMessage(message);
	};
	this._leftBottomBtn.onclick = function(){
		var addRowMsg = new com.kenny.util.Observer.Message();
		addRowMsg.id = com.kenny.util.Observer.MessageType.TABLE_ROW_ADD;
		addRowMsg.sender = self.getActiveTable();
		com.kenny.util.Observer.sendMessage(addRowMsg);

	};
	this._leftTopBtn.onclick = function(){
		self.getActiveTable().getCellTracker().hide();
		var message = new com.kenny.util.Observer.Message();
		message.id = com.kenny.util.Observer.MessageType.TABLE_SELECTED;
		message.sender = self.getActiveTable();
		message.data = {};
		com.kenny.util.Observer.sendMessage(message);
	};
    this._leftTopBtn.ondblclick = function () {
        com.kenny.event.ContextMenuEvent.show(self.getActiveTable());
    };
	this._leftBar.onclick = function(e){
		var message = new com.kenny.util.Observer.Message();
		message.id = com.kenny.util.Observer.MessageType.TABLE_ROW_SELECT;
		message.sender = self.getActiveTable();
		message.data = {e:e};
		com.kenny.util.Observer.sendMessage(message);
	};

	this._topBar.onclick = function(e){
		var message = new com.kenny.util.Observer.Message();
		message.id = com.kenny.util.Observer.MessageType.TABLE_COL_SELECT;
		message.sender = self.getActiveTable();
		message.data = {e:e};
		com.kenny.util.Observer.sendMessage(message);
	};
	
	/**
<html>

<body>
<div style='position:absolutely;width:100%;height:100%;'>
	<svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" space="preserve" id="masterDocument" style="position: absolute; z-index: 1000; font-size: 33.96875px; left: 0px; top: 0px; " preserveAspectRatio="none" _type="masterDocument" viewBox="0, 0, 1087 ,815" width="608px" height="456px" xlink="http://www.w3.org/1999/xlink">
	<g id="trackergrp" transform="rotate(0, 906.114, 232.51)" _transform="rotate(0, 906.1135670731707, 232.50990853658533)">
			<rect id="tracker" fill="none" stroke="#0ef803" stroke-width="1.787828947368421pt" x="857.6973684210526" y="137.7017543859649" width="96.83239730423618" height="189.61630830124088"/>
			<rect id="rse" width="8.939144736842104px" height="8.93640350877193px" fill="#00b4ff" stroke="#082481" stroke-width="1.787828947368421px" x="950.0601933568678" y="322.84849031878474" style="cursor: se-resize;"/>
			<rect id="rn" width="8.939144736842104px" height="8.93640350877193px" fill="#ffee7a" stroke="#03d5dd" stroke-width="1.787828947368421px" x="901.6439947047496" y="133.23218201754386" style="cursor: n-resize;"/>
			<rect id="rw" width="8.939144736842104px" height="8.93640350877193px" fill="#ffee7a" stroke="#03d5dd" stroke-width="1.787828947368421px" x="853.2277960526316" y="228.0403361681643" style="cursor: w-resize;"/>
			<rect id="rs" width="8.939144736842104px" height="8.93640350877193px" fill="#ffee7a" stroke="#03d5dd" stroke-width="1.787828947368421px" x="901.6439947047496" y="322.84849031878474" style="cursor: n-resize;"/>
			<rect id="re" width="8.939144736842104px" height="8.93640350877193px" fill="#ffee7a" stroke="#03d5dd" stroke-width="1.787828947368421px" x="950.0601933568678" y="228.0403361681643" style="cursor: w-resize;"/>
			<line id="rotateline" x1="906.1135670731707" y1="135.7017543859649" x2="906.1135670731707" y2="101.95614035087718" stroke="#0ef803" stroke-width="1pt"/>
			<ellipse id="rotatecircle" style="cursor: move;" cx="906.1135670731707" cy="101.95614035087718" rx="7.151315789473684px" ry="7.149122807017544px" fill="#ff8a00" stroke="#6c6c6c" stroke-width="1.787828947368421pt"/>
			<ellipse id="c-circle" style="cursor: move;" cx="906.1135670731707" cy="232.50990853658533" rx="5.363486842105263px" ry="5.3618421052631575px" fill="gray" stroke="black" stroke-width="1.787828947368421pt" fill-opacity=".4" stroke-opacity=".4"/>
		</g>
	</svg>

</div>
</body>

</html>
	*/
	
	// this._domInstance.onclick = com.kenny.event.MouseEvent.click;
};
com.kenny.tracker.TableTracker.prototype= {
	
	_domInstance:null,
	
	_type:null,
	
	_className:null,
	
	_id:null,
	
	_width:null,
	
	_height:null,
	
	_left:null,
	
	_top:null,
	
	_activeTable: null,
	
	_zIndex : null,
	
	_registerDraggable : function() {
		var self = this;
		var options = {
			zIndex: 9998, 
			opacity: 0.35,
			appendTo: '.docs-editor',
			distance: 5,
			disabled: false,
			helper: function(){
				return $(self.getActiveTable().getDomInstance()).clone(true);
			}	
		};
		$( this._domInstance ).draggable(options).data('item', self.getActiveTable());
	},
	
	setActiveTable:function(activeTable){
		this._activeTable = activeTable;
		var pos = com.kenny.util.BaseTool.getAbsPostionInContainer(this._activeTable.getDomInstance());
		
		this.setLeft(pos.x);
		this.setTop(pos.y);
		this.setWidth(this._activeTable.getWidth());
		this.setHeight(this._activeTable.getHeight());
		
		this._registerDraggable();
		
		//Send tracker focus
		var msg = new com.kenny.util.Observer.Message();
		msg.id = com.kenny.util.Observer.MessageType.CONTEXT_FOCUS;
		msg.sender = this;
		com.kenny.util.Observer.sendMessage(msg);
	},
	
	getActiveTable:function(){
		return this._activeTable;
	},
	
	setLeft:function(left){
		this._left = left;
		this._domInstance.style.left = com.kenny.util.BaseTool.convertPixelToNumber(left) - 15 + "px"; //Balance border left width
	},
	
	setTop:function(top){
		this._top = top;
		this._domInstance.style.top = com.kenny.util.BaseTool.convertPixelToNumber(top)-15; //Balance border top width
	},
	
	setZIndex : function(zIndex) {
		this._domInstance.style.zIndex = zIndex;
		this._zIndex = zIndex;
	},
	
	getZIndex : function() {
		return this._zIndex;
	},
	
	setWidth:function(width){
		this._width = com.kenny.util.BaseTool.convertPixelToNumber(width) + "px";
		this._domInstance.style.width = com.kenny.util.BaseTool.convertPixelToNumber(width) + "px";
		this._rightTopBtn.style.left = com.kenny.util.BaseTool.convertPixelToNumber(width) + 10 + 5 + 5 + "px";
		this._topBar.style.width = com.kenny.util.BaseTool.convertPixelToNumber(width-16) + "px";
	},
	
	setHeight:function(height){
		this._height = height;
		this._domInstance.style.height = com.kenny.util.BaseTool.convertPixelToNumber(height) + "px";
		this._leftBottomBtn.style.top = com.kenny.util.BaseTool.convertPixelToNumber(height) + 10 + 5 + 5 + "px";
		this._leftBar.style.height = com.kenny.util.BaseTool.convertPixelToNumber(height-16) + "px";
	},
	
	getLeft:function(){
		return this._left;
	},
	
	getTop:function(){
		return this._top;
	},
	
	getWidth:function(){
		return this._width;
	},
	
	getHeight:function(){
		return this._height;
	},
	
	// 公共方法 深度拷贝对象
	clone:function(){
		var cloneObj = new com.kenny.node.Cell();
		cloneObj.setData(this.getData());
		return cloneObj;
	},
	// 公共方法 返回对象ID
	getId:function(){
		return this._id;
	},
	// 公共方法 返回类名
	getClassName:function(){
		return this._className;
	},
	// 公共方法 返回对象类型
	getType:function(){
		return this._type;
	},
	// 公共方法 将对象添加到本身
	appendChild:function(childNode){
		this.getDomInstance().appendChild(childNode.getDomInstance());
	},
	// 公共方法 将对象添加到父节�?
	appendTo:function(parentNode){
		parentNode.appendChild(this);
	},
	// 公共方法 将对象从父节点移�?
	removeFrom:function(parentNode){
		parentNode.removeChild(this);
	},
	// 公共方法 数据对象以JSON格式返回
	toJSON:function(){
		return JSON.stringify(this.getData());
	},
	// 公共方法 以JSON字串为数据恢复对象属性设�?
	toObject:function(json){
		this.setData(JSON.parse(json));
	},
	// 公共对象 根据数据对象设置对象属�?
	setData:function(data){
	},
	// 公共方法 返回数据对象
	getData:function(){
		return {
		};
	},
	// 公共方法 返回该对象DOM实例
	getDomInstance:function(){
		return this._domInstance;
	},
	// 公共方法 获取当前Tracker是否处于隐藏状�?
	isHide:function(){
		return this.getDomInstance().style.display == 'none';
	},
	// 公共方法 隐藏当前Tracker
	hide:function(){
		this.getDomInstance().style.display = 'none';
		if(this.getActiveTable()){
			this.getActiveTable().hideCellTracker();
		}
	},
	// 公共方法 显示当前Tracker
	show:function(){
		this.getDomInstance().style.display = 'block';
	}
};
