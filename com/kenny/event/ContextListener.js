/**
 * Context Listener class
 * 
 * @package com.kenny.event
 * @import com.kenny.util.BaseTool,com.kenny.util.Observer
 * @author lu_feng
 */
if (!com.kenny.event.ContextListener) {
	com.kenny.event.ContextListener = function() {
		var _focusObjs = [];
		this.update = function(message) {
			switch (message.id) {
    			case com.kenny.util.Observer.MessageType.CONTEXT_BLUR:
    			    com.kenny.event.ContextMenuEvent.hideAll();
    			    
    				for ( var i = 0; i < _focusObjs.length; i++) {
    					var focusObj = _focusObjs[i]; 
    					if (focusObj.hide && focusObj != message.sender) {
    						focusObj.hide();
    					}
    				}
    				_focusObjs = [];
    				if(message.sender && message.sender.getType){
    			        var msgId = null;
    			        if(message.sender.getType() == 'Table'){
    			            msgId = com.kenny.util.Observer.MessageType.TABLE_FOCUS;
    			        }
    			        else if(message.sender.getType() == 'Image') {
    			            msgId = com.kenny.util.Observer.MessageType.IMAGE_FOCUS;
    		            } 
    			        else if(message.sender.getType().indexOf("Chart_") == 0) {
    		                    msgId = com.kenny.util.Observer.MessageType.CHART_FOCUS; 
    		            } 
    			        else if(message.sender.getType().indexOf("Shape_") == 0){
    			            msgId = com.kenny.util.Observer.MessageType.SHAPE_FOCUS;
    		            }
    			        if(msgId){
    			            var msg = new com.kenny.util.Observer.Message();
    			            msg.sender = msg.sender;
    			            msg.id = msgId;
    			            com.kenny.util.Observer.sendMessage(msg);
    			        }
    				}
    				break;
    			case com.kenny.util.Observer.MessageType.CONTEXT_FOCUS:
    				_focusObjs.push(message.sender);
    				break;
    		}
		};
	};
	
	com.kenny.event.ContextActiveItemListener = function() {
		this._activeItem = null;
		this._shadowDivObj = null;
		this._historyZIndexValue = -1;
		this._getShadowDivObj = function(){
			var self = this;
			if(this._shadowDivObj == null){
				var objs = $('.svg-text-shadow');
				var divObj = null;
				if(objs.length == 0){
					divObj = document.createElement('div');
					$(divObj).css('opacity',0.3);
					com.kenny.util.BaseTool.setStyleProperties(
						divObj.style,
						{
							position: 'absolute',
							top: 0,
							left:0,
							width:'100%',
							height:'100%',
							'z-index':4000,
							'background-color':'rgb(200,200,200)'
						}
					);
					divObj.className = 'svg-text-shadow';
					//Forbidden not to pop propagation
					$(divObj).bind('mousedown', function(e){
						try{
							evt.stopPropagation();
						}catch(e){}
					}).bind('mouseup', function(e){
						try{
							evt.stopPropagation();
						}catch(e){}
					}).bind('click', function(){
						try{
							evt.stopPropagation();
							evt.preventDefault();
						}catch(e){}
						self.hideShadow();
					});
					$('.docs-editor').append(divObj);
				}
				else{
					divObj = objs[0];
				}
				this._shadowDivObj = divObj;
			}
			return this._shadowDivObj;
		},
		this.showShadow = function(item){
			this._activeItem = item;
			this._getShadowDivObj().style.display = '';
			var docsEditor = $('.docs-editor');
			com.kenny.util.BaseTool.setStyleProperties(
				this._getShadowDivObj().style,
				{
					top: docsEditor.scrollTop()
				}
			);
			
			this._historyZIndexValue = this._activeItem.getZIndex();
			this._activeItem.setZIndex(4001);
		},
		this.hideShadow = function(){
			this._getShadowDivObj().style.display = 'none';
			this._activeItem.setZIndex(this._historyZIndexValue);

			//Send the keyboard command message
			var message = new com.kenny.util.Observer.Message();
			message.id = com.kenny.util.Observer.MessageType.KEYBOARD_BLUR;
			message.sender = this;
			com.kenny.util.Observer.sendMessage(message);
			
			//Send shape refocus
			var message = new com.kenny.util.Observer.Message();
	        message.sender = this._activeItem;
			message.id = com.kenny.util.Observer.MessageType.SHAPE_FOCUS;
	        message.data = {
	        	type: this._activeItem.getType()	
	        };
	        com.kenny.util.Observer.sendMessage(message);
	        this._activeItem = null;
		},
		this.update = function(message) {
			switch (message.id) {
				case com.kenny.util.Observer.MessageType.CONTEXT_ACTIVE:
					this.showShadow(message.sender);
					break;
				case com.kenny.util.Observer.MessageType.CONTEXT_INACTIVE:
					this.hideShadow();
					break;
			}
		};
	};
	(function() {
		var contextListener = new com.kenny.event.ContextListener();
		com.kenny.util.Observer.register(com.kenny.util.Observer.MessageType.CONTEXT_BLUR, contextListener);
		com.kenny.util.Observer.register(com.kenny.util.Observer.MessageType.CONTEXT_FOCUS, contextListener);
		
		var contextActiveListener = new com.kenny.event.ContextActiveItemListener();
		com.kenny.util.Observer.register(com.kenny.util.Observer.MessageType.CONTEXT_ACTIVE, contextActiveListener);
		com.kenny.util.Observer.register(com.kenny.util.Observer.MessageType.CONTEXT_INACTIVE, contextActiveListener);
	})();
}