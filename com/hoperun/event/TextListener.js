/**
 * Text Listener class
 * 
 * @package com.hoperun.event
 * @import com.hoperun.util.BaseTool,com.hoperun.util.Observer
 * @author Jian.T
 */
if (!com.hoperun.event.TextListener) {
	com.hoperun.event.TextListener = function() {
		this.update = function(message) {
			switch(message.id){
				case com.hoperun.util.Observer.MessageType.TEXT_STYLE:
					
					var pageObj = message.sender;
					var style = message.data;
					var selection = pageObj.getActiveSelection();
					
					//When there is no range selected, just save it into active selection
					pageObj.setActiveStyleData(style);
					
					if(!selection.isCollapsed()){
						var fromOffset = selection.getFromOffset();
						var toOffset = selection.getToOffset();
						var oldToOffset = selection.getToOffset();
						var from = selection.getFrom();
						var to = selection.getTo();
						var oldTo = selection.getTo();
						
						if ( selection.isReverse()){
				        	var temp = from;
				        	from = to;
				        	to = temp;
				        	temp = fromOffset;
				        	fromOffset = toOffset;
				        	toOffset = temp;
				        }
						
						var styleHistoryLst = com.hoperun.util.BaseTool.cloneJsObject(pageObj.getTextStyles(from, to, fromOffset, toOffset));
						var selectionData = selection.getData(); //Backup the current selection data.
						var styleData = style; //pageObj.getActiveStyle().getData();
							
						jsk.execute(
							function () {
								selection.setData(selectionData);
								pageObj.changeTextStyle(from, to, fromOffset, toOffset, styleData);
								
								var style = oldTo.getTextContainerByOffset(oldToOffset).style;
								pageObj.setActiveStyle(style);
		     					
		     					selection.setFromObj(selection.getFrom().getSpanItem(selection.getFromOffset()));
		     					selection.setToObj(selection.getTo().getSpanItem(selection.getToOffset()));
		     					
								pageObj.sendSelectionChangeNotify();
								
								return { 
									'historyStyles': styleHistoryLst, 
									'from': from, 
									'to': to, 
									'fromOffset': fromOffset, 
									'toOffset': toOffset, 
									'container': pageObj,
									'selectionData': selectionData
								};
							},
							function (data) {
								data.container.getActiveSelection().setData(data.selectionData);
								data.container.setTextStyles(data.from, data.to, data.fromOffset, data.toOffset, data.historyStyles);
								
								var style = data.to.getTextContainerByOffset(data.toOffset).style;
								data.container.setActiveStyle(style);
								data.container.sendSelectionChangeNotify();
							}
						);
					}
					//Notify the page to do keyboard focus
					else{
						pageObj.sendSelectionChangeNotify();
					}
					break;
			}
		};
	};
	com.hoperun.util.Observer.register(
			com.hoperun.util.Observer.MessageType.TEXT_STYLE,
			new com.hoperun.event.TextListener());
}
