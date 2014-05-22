/**
 * Cursor Listener class
 * 
 * @package com.hoperun.event
 * @import com.hoperun.util.BaseTool, com.hoperun.util.TextHelper, com.hoperun.util.Observer
 * @author lu_feng
 */
if (!com.hoperun.event.SvgCursorListener) {
	com.hoperun.event.SvgCursorListener = function() {
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
				case com.hoperun.util.Observer.MessageType.SVG_CURSOR_SHOW:
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
					
					var rect = com.hoperun.util.BaseTool.getBoundingRectForSvg(spanObj);
					//For empty object
					if(rect.height <= 0){
						com.hoperun.util.SvgTextHelper.changeStyle(styleObj);
						rect.height = com.hoperun.util.SvgTextHelper.getHeight(' ');
						rect.left = Number(spanObj.getAttribute('x'));
						rect.top = Number(spanObj.getAttribute('y')) - rect.height;
					}
					var fromDivObj = com.hoperun.util.BaseTool.findElementWithType(spanObj, 'TextBox');
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
					
//					com.hoperun.util.BaseTool.scrollPageTo(posSpan.y, spanObj.offsetHeight);
					
//					if(message.data && message.data.onlyUpdateCursor){
//						
//					}
//					else{
//						var keyBoardMsg = new com.hoperun.util.Observer.Message();
//						keyBoardMsg.sender = paragraphObj;
//						keyBoardMsg.id = com.hoperun.util.Observer.MessageType.KEYBOARD_ADD;
//						keyBoardMsg.data = {};
//						keyBoardMsg.data.anchorOffset = anchorOffset;
//						
//						com.hoperun.util.Observer.sendMessage(keyBoardMsg);
//					}
					break;
				case com.hoperun.util.Observer.MessageType.SVG_CURSOR_HIDE:
					self.hide();
					break;
				
				case com.hoperun.util.Observer.MessageType.SVG_CURSOR_PAUSE:
					self.pause();
					break;
				
				case com.hoperun.util.Observer.MessageType.SVG_CURSOR_RECOVER:
					self.show();
					break;
			}
		};
	};
	
	$(document).ready(function(){
		var cursorSvgListener = new com.hoperun.event.SvgCursorListener();
		com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.SVG_CURSOR_SHOW, cursorSvgListener);
		com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.SVG_CURSOR_PAUSE, cursorSvgListener);
		com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.SVG_CURSOR_RECOVER, cursorSvgListener);
		com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.SVG_CURSOR_HIDE, cursorSvgListener);
	});
}
