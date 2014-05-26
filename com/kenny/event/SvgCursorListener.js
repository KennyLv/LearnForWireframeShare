/**
 * Cursor Listener class
 * 
 * @package com.kenny.event
 * @import com.kenny.util.BaseTool, com.kenny.util.TextHelper, com.kenny.util.Observer
 * @author lu_feng
 */
if (!com.kenny.event.SvgCursorListener) {
	com.kenny.event.SvgCursorListener = function() {
		var cursorObj = $('.hr-cursor-svg');
		this.visibleFlag = false, this.twinklingFlag = false, this.showFlag = false;
		this.eventObj = null;
		var self = this;
		
		this.pause = function(){
			this.twinklingFlag = false;
		};
		this.hide = function(){
			self.showFlag = false;
		};
		this.show = function(){
			self.showFlag = self.twinklingFlag = true;
		};
		var twinklingFuncSvg = function(){
			if(self.showFlag){
				if(self.twinklingFlag){
					self.visibleFlag ? cursorObj.children().hide() : cursorObj.children().show();
					self.visibleFlag = !self.visibleFlag;
				}
				else if(!self.visibleFlag){
					cursorObj.children().show(); self.visibleFlag = !self.visibleFlag; 
				}
			}else if(self.visibleFlag){
				cursorObj.children().hide();
			}
			
			setTimeout(twinklingFuncSvg,400);
		};
		twinklingFuncSvg();
 
		this.update = function(message) {
			switch(message.id){
				case com.kenny.util.Observer.MessageType.SVG_CURSOR_SHOW:
					var selection = message.sender;
					//Avoid exception case
					if(selection == null || selection.getFromObj() == null || selection.getActiveItem() == null){
						return;
					}
					var textObj = selection.getActiveItem();
					var paraIdx = selection.getFrom();
					var spanObj = selection.getFromObj();
					var offset = selection.getFromOffset();
					
					//console.info("paragraph information: para index="+paraIdx+" from offset="+offset+" to="+selection.getTo()+" to offset="+selection.getToOffset());
					var styleObj = textObj.getStyleWithOffset(paraIdx, offset);
					var spanWidth = textObj.getItemWidthWithOffset(paraIdx, offset);
					
					var rect = com.kenny.util.BaseTool.getBoundingRectForSvg(spanObj);
					//For empty object
					if(rect.height <= 0){
						com.kenny.util.SvgTextHelper.changeStyle(styleObj);
						rect.height = com.kenny.util.SvgTextHelper.getHeight(' ');
						rect.left = Number(spanObj.getAttribute('x'));
						rect.top = Number(spanObj.getAttribute('y')) - rect.height;
					}
					var fromDivObj = com.kenny.util.BaseTool.findElementWithType(spanObj, 'TextBox');
					cursorObj.appendTo(fromDivObj);
					
					cursorObj.css("left", rect.left + spanWidth + 0.5);
					cursorObj.css("top", rect.top);
					cursorObj.css("height",  rect.height);
					$('.hr-cursor-caret-svg').css("height",  rect.height);
					
					if(styleObj.getItalic()){
						cursorObj.addClass('hr-cursor-italic');
					}
					else{
						cursorObj.removeClass('hr-cursor-italic');
					}
					self.show();
					
//					com.kenny.util.BaseTool.scrollPageTo(posSpan.y, spanObj.offsetHeight);
					
//					if(message.data && message.data.onlyUpdateCursor){
//						
//					}
//					else{
//						var keyBoardMsg = new com.kenny.util.Observer.Message();
//						keyBoardMsg.sender = paragraphObj;
//						keyBoardMsg.id = com.kenny.util.Observer.MessageType.KEYBOARD_ADD;
//						keyBoardMsg.data = {};
//						keyBoardMsg.data.anchorOffset = anchorOffset;
//						
//						com.kenny.util.Observer.sendMessage(keyBoardMsg);
//					}
					break;
				case com.kenny.util.Observer.MessageType.SVG_CURSOR_HIDE:
					self.hide();
					break;
				
				case com.kenny.util.Observer.MessageType.SVG_CURSOR_PAUSE:
					self.pause();
					break;
				
				case com.kenny.util.Observer.MessageType.SVG_CURSOR_RECOVER:
					self.show();
					break;
			}
		};
	};
	
	$(document).ready(function(){
		var cursorSvgListener = new com.kenny.event.SvgCursorListener();
		com.kenny.util.Observer.register(com.kenny.util.Observer.MessageType.SVG_CURSOR_SHOW, cursorSvgListener);
		com.kenny.util.Observer.register(com.kenny.util.Observer.MessageType.SVG_CURSOR_PAUSE, cursorSvgListener);
		com.kenny.util.Observer.register(com.kenny.util.Observer.MessageType.SVG_CURSOR_RECOVER, cursorSvgListener);
		com.kenny.util.Observer.register(com.kenny.util.Observer.MessageType.SVG_CURSOR_HIDE, cursorSvgListener);
	});
}
