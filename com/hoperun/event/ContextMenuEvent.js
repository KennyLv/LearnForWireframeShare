/**
 * Context menu event
 * 
 * @package com.hoperun.node
 * @import com.hoperun.util.BaseTool,com.hoperun.util.NodeCache,com.hoperun.event.MouseEvent
 * @author sun_wei
 */
com.hoperun.event.ContextMenuEvent = {
	hideAll : function(){
		$('.context-menu').hide();
	},
	
	defautData: [
        { title: 'Cut', command: 'Cut' },
        { title: 'Copy', command: 'Copy' },
        { title: 'Paste', command: 'Paste' },
        { title: 'Delete', command: 'Delete' }
    ],
	
	show: function(contextItem, contextMenuData){
		contextMenuData = contextMenuData ? contextMenuData : this.defautData;
		
		if(contextMenuData){
			var contextMenu = $('.context-menu');
			if(contextMenu.length == 0){
				contextMenu = $('<div></div>');
				contextMenu.addClass('context-menu');
				
				$('.docs-editor').append(contextMenu);
			}
			contextMenu.html('<img src="images/shortCutMenu_LeftArrow.png" class="shortCutMenu_img"/>');
			
			//Change position
			var position = com.hoperun.util.BaseTool.getAbsPostionInContainer(contextItem.getDomInstance());
			var width = com.hoperun.util.BaseTool.convertPixelToNumber(contextItem.getWidth());
			contextMenu.css("top", position.y).css("left", position.x + width).css('display', 'block');
			
			for(var i=0; i<contextMenuData.length; i++){
				var command = $('<div></div>');
				command.addClass('shortCutMenu_normal');
				command.attr('command', contextMenuData[i].command);
				command.html('<span class="button-text">' + contextMenuData[i].title + '</span>');
				
				contextMenu.append(command);
			}
			//contextMenu.filter('div:first-child').addClass('shortCutMenu_left');
			//scontextMenu.filter('div:last-child').addClass('shortCutMenu_right');
			
			var hideContext = function(){
				$(document).unbind('mousedown', hideContext);
				contextMenu.hide();
			};
			
			contextMenu.children('.shortCutMenu_normal').click(function (evt) {
				$(document).unbind('mousedown', hideContext);
				contextMenu.hide();
				
				var command = $(this).attr('command');
				
				var msgId = null;
		        switch (command) {
			        case 'Cut':
			        	msgId = com.hoperun.util.Observer.MessageType.CUT_ITEM;
			            break;
			        case 'Copy':
			        	msgId = com.hoperun.util.Observer.MessageType.COPY_ITEM;
			            break;
			        case 'Paste':
			        	msgId = com.hoperun.util.Observer.MessageType.PASTE_ITEM;
			            break;
			        case 'Delete':
			        	msgId = com.hoperun.util.Observer.MessageType.DELETE_ITEM;
			            break;
		        }
		        if(msgId){
		        	var message = new com.hoperun.util.Observer.Message();
					message.sender = contextItem;
					message.id = msgId;
		        	com.hoperun.util.Observer.sendMessage(message);
		        }
			});
			$(document).bind('click', hideContext);
		}
	}
};

