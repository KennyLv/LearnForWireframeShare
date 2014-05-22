/**
 * Cursor Listener class
 * 
 * @package com.hoperun.event
 * @import com.hoperun.util.BaseTool, com.hoperun.util.TextHelper, com.hoperun.util.Observer
 * @author lu_feng
 */
if (!com.hoperun.event.CursorListener) {
	com.hoperun.event.CursorListener = function() {
		var cursorObj = $('.hr-cursor');
		this.visibleFlag = false, this.twinklingFlag = false, this.showFlag = false;
		this.eventObj = null;
		var self = this;
		
		this.pause = function(){
			this.twinklingFlag = false;
		};
		this.hide = function(){
			self.showFlag = false;
			cursorObj.hide();
			cursorObj.css({
				left:'-5000px',
				top:'-5000px'
			});
		};
		this.show = function(){
			cursorObj.show();
			self.showFlag = self.twinklingFlag = true;
		};
		var twinklingFunc = function(){
			if(self.showFlag){
				if(self.twinklingFlag){
					//alert(1);
					self.visibleFlag ? cursorObj.children().hide() : cursorObj.children().show();
					self.visibleFlag = !self.visibleFlag;
				}
				else if(!self.visibleFlag){
					cursorObj.children().show(); self.visibleFlag = !self.visibleFlag; 
				}
			}else if(self.visibleFlag){
				cursorObj.children().hide();
			}
			
			setTimeout(twinklingFunc,400);
		};
		twinklingFunc();
 
		this.update = function(message) {
			switch(message.id){
				case com.hoperun.util.Observer.MessageType.CURSOR_SHOW:
					var selection = message.sender;
					
					var paragraphObj = selection.getTo();
					var anchorOffset = selection.getToOffset();
					
					var eventObj = selection.getToObj();
					var styleObj = message.data && message.data.style ? message.data.style : null;
					if(!styleObj){
						var styleItemObj = paragraphObj.getTextContainerByOffset(anchorOffset);
						styleObj = styleItemObj.style;
					}
					
					var textOffset = selection.getAnchorOffset();
					
					//TODO: for now, the first cursor position has an issue, which is difficulty to located with window.getSelection() on the current paragraph structure
					if(eventObj.className && eventObj.className.indexOf('hr-paragraph-render')!=-1) {
						eventObj = eventObj.getElementsByTagName('SPAN')[0];
					}

					var	lineDom = com.hoperun.util.BaseTool.findElementWithType(eventObj, 'Line');
					var	spanObj = com.hoperun.util.BaseTool.findElementWithType(eventObj, 'SPAN');
					
					var paddingLeft = spanObj.style.paddingLeft ? com.hoperun.util.BaseTool.convertPixelToNumber(spanObj.style.paddingLeft) : 0;
					var pos = com.hoperun.util.BaseTool.getAbsPostionInContainer(lineDom);
					var posSpan = com.hoperun.util.BaseTool.getAbsPostionInContainer(eventObj);
					var rect = paragraphObj.getWidthWithOffset(anchorOffset, textOffset);
					
					cursorObj.css("left", posSpan.x + rect.width + 0.5 +paddingLeft );
					cursorObj.css("top", posSpan.y);
					
					var height = spanObj.offsetHeight;
					//Problem is that it needs to update line height
					//com.hoperun.util.TextHelper.changeStyle(styleObj);
					//height = com.hoperun.util.TextHelper.getRect(' ').height;
					cursorObj.css("height", height);
					$('.hr-cursor-caret').css("height", height);
					
					if(styleObj.getItalic()){
						cursorObj.addClass('hr-cursor-italic');
					}
					else{
						cursorObj.removeClass('hr-cursor-italic');
					}
					
					self.show();
					
					com.hoperun.util.BaseTool.scrollPageTo(posSpan.y, height);
					
						
					var keyBoardMsg = new com.hoperun.util.Observer.Message();
					keyBoardMsg.id = com.hoperun.util.Observer.MessageType.KEYBOARD_FOCUS;
					com.hoperun.util.Observer.sendMessage(keyBoardMsg);
					break;
				case com.hoperun.util.Observer.MessageType.CURSOR_HIDE:
					self.hide();
					break;
				
				case com.hoperun.util.Observer.MessageType.CURSOR_PAUSE:
					self.pause();
					break;
				
				case com.hoperun.util.Observer.MessageType.CURSOR_RECOVER:
					self.show();
					break;
				case com.hoperun.util.Observer.MessageType.CURSOR_UNDISPLAY:
					cursorObj.hide();
					break;
			}
		};
	};
	
	$(document).ready(function(){
		var cursorListener = new com.hoperun.event.CursorListener();
		com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.CURSOR_SHOW, cursorListener);
		com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.CURSOR_PAUSE, cursorListener);
		com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.CURSOR_RECOVER, cursorListener);
		com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.CURSOR_HIDE, cursorListener);
		com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.CURSOR_UNDISPLAY, cursorListener);
	});
}
