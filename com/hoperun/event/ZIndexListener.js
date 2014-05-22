/**
 * ZIndex Listener class
 * @package com.hoperun.event
 * @import com.hoperun.util.BaseTool, com.hoperun.util.Observer
 * @author Jian.T
 */
if (!com.hoperun.event.ZIndexListener) {
	com.hoperun.event.ZIndexListener = function() {
		this.update = function(message) {
			var newZIndex;
			var oldZIndex = message.sender.getZIndex();
			var currElement = message.sender;
			var container = getActiveContainer();
			var elements = container.getAllElements();
			var refreshPage = false;
			var record = false;
			var changeZindex = function(zIndex, currElement){
				if (zIndex) { // for menu setting
					newZIndex = zIndex;  //message.data.zindex;
					oldZIndex = message.sender.getZIndex();
					if (newZIndex > oldZIndex) {
						for ( var i = 0; i < elements.length; i++) {
							if (elements[i].getZIndex() > oldZIndex && elements[i].getZIndex() <= newZIndex) {
								elements[i].setZIndex(elements[i].getZIndex() - 10);
							}
						}
					} else {
						for ( var i = 0; i < elements.length; i++) {
							if (elements[i].getZIndex() < oldZIndex && elements[i].getZIndex() >= newZIndex) {
								elements[i].setZIndex(elements[i].getZIndex() + 10);
							}
						}
					}
					
					message.sender.setZIndex(newZIndex);
					refreshPage = true;
					record = true;
				} else if (message.data.remove) { // for remove element
					for ( var i = 0; i < elements.length; i++) {
						if (elements[i].getZIndex() > message.data.criticalZIndex) {
							elements[i].setZIndex(elements[i].getZIndex() - 10);
						}
					}
					refreshPage = false;
					record = true;
				} else { // for add new element
					var max = null;
					for ( var i = 0; i < elements.length-1; i++) {
						max = max == null ? elements[i].getZIndex() : Math.max(max, elements[i].getZIndex());
					}
					if(max==null){
						max = 990;
					}
					newZIndex = max + 10;
					message.sender.setZIndex(newZIndex);
					refreshPage = true;
					record = false;
				}
				
				var msg = new com.hoperun.util.Observer.Message();
				switch(message.sender.getType()){
					case 'Image':
						msg.id = com.hoperun.util.Observer.MessageType.IMAGE_FOCUS;
						break;
					case 'Table':
						msg.id = com.hoperun.util.Observer.MessageType.TABLE_FOCUS;
						break;
					default:
					    if(message.sender.getType().indexOf("Chart")!=-1){
					        msg.id = com.hoperun.util.Observer.MessageType.CHART_FOCUS;
					    }
					    else{
					        msg.id = com.hoperun.util.Observer.MessageType.SHAPE_FOCUS;
					    }
				}
				msg.sender = message.sender;
				refreshPage ? com.hoperun.util.Observer.sendMessage(msg) : null; 
				
			};
			if(record) {
				jsk.execute(
					function() {
						changeZindex(message.data.zindex, currElement);	
						return { "oldZIndex" : oldZIndex, 'obj' : currElement };
					},
					function(data) {
						changeZindex(data.oldZIndex, data.obj);
					}
				);
			} else {
				changeZindex(message.data.zindex, currElement);	
			}
			
		};
	};
	
	com.hoperun.util.Observer.register(
			com.hoperun.util.Observer.MessageType.UPDATE_ZINDEX,
			new com.hoperun.event.ZIndexListener());
}