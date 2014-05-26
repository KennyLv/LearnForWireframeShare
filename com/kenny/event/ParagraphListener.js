/**
 * Paragraph Listener class
 * 
 * @package com.kenny.event
 * @import com.kenny.util.BaseTool,com.kenny.util.Observer
 * @author lu_feng
 */
if (!com.kenny.event.ParagraphListener) {
	com.kenny.event.ParagraphListener = function() {
		this._pageObj = null; 
		this._selectedShape = null; 
			
		this.update = function(message) {
			//alert("Begin Execute Paragraph ");
			if(message.id == com.kenny.util.Observer.MessageType.DOCUMENT_CREATE){
				//Register shape event
				com.kenny.util.Observer.register(com.kenny.util.Observer.MessageType.SHAPE_RESIZE, this);
				//alert("Register paragraph ")
				com.kenny.util.Observer.register(com.kenny.util.Observer.MessageType.PARAGRAPH_STYLE, this);
				
				com.kenny.util.Observer.register(com.kenny.util.Observer.MessageType.PARAGRAPH_ACTION, this);
			}
			else if(message.id == com.kenny.util.Observer.MessageType.PARAGRAPH_STYLE){
				var style = message.data;
				var container = getActiveContainer();
				var paragraphObj = message.sender;
				
				var selectionData = container.getActiveSelection().getData(); //Backup the current selection data.
				
				var textParagraphObjStyle = {};
				var historyParagraphObjStyle = {};
				
				var oldTextParagraphObjStyle = paragraphObj.getParagraphStyle();
				
				if(style.styleFormat){
					historyParagraphObjStyle.styleFormat = oldTextParagraphObjStyle.styleFormat;
					textParagraphObjStyle.styleFormat = {
						value: style.styleFormat
					};
				}
				if(style.textAlign){
					historyParagraphObjStyle.textAlign = oldTextParagraphObjStyle.textAlign;
					textParagraphObjStyle.textAlign = style.textAlign;
				}
				if(style.textLineSpacing){
					historyParagraphObjStyle.textLineSpacing = oldTextParagraphObjStyle.textLineSpacing;
					textParagraphObjStyle.textLineSpacing = style.textLineSpacing;
				}
				
				if(style.indentation){
					var indentation = style.indentation;
					var updateIndentation = {}, historyIndentation = {};
					for(var key in indentation){
						updateIndentation[key] = indentation[key];
						historyIndentation[key] = oldTextParagraphObjStyle.indentation[key];
					}
					historyParagraphObjStyle.indentation = historyIndentation;
					textParagraphObjStyle.indentation = updateIndentation;
				}
				
				//TODO: It seems that the paragraph object is not necessary to be transferred from the message
				jsk.execute(
					function () {
						var selection = container.getActiveSelection(); 
						selection.setData(selectionData);
						
						paragraphObj.setParagraphStyle(textParagraphObjStyle);
						paragraphObj.refreshLineData();
						paragraphObj.updatePage(true);
						
						var paraObj = selection.getFrom();
     					var offset = selection.getFromOffset();
     					var style = paraObj.getTextContainerByOffset(offset).style;
     					container.setActiveStyle(style);
     					
     					selection.setFromObj(selection.getFrom().getSpanItem(selection.getFromOffset()));
     					selection.setToObj(selection.getTo().getSpanItem(selection.getToOffset()));
     					
						container.sendSelectionChangeNotify();
						
						return { "historyParagraphObjStyle": historyParagraphObjStyle, "paragraphObj": paragraphObj, "container":container, "selectionData":selectionData };
					},
					function (data) {
						var selection = data.container.getActiveSelection(); 
						selection.setData(data.selectionData);
						
						var paragraphObj = data.paragraphObj;
						paragraphObj.setParagraphStyle(data.historyParagraphObjStyle);
						paragraphObj.refreshLineData();
						paragraphObj.updatePage(true);
						
						var paraObj = selection.getFrom();
     					var offset = selection.getFromOffset();
     					var style = paraObj.getTextContainerByOffset(offset).style;
     					data.container.setActiveStyle(style);
     					
     					selection.setFromObj(selection.getFrom().getSpanItem(selection.getFromOffset()));
     					selection.setToObj(selection.getTo().getSpanItem(selection.getToOffset()));
     					
						data.container.sendSelectionChangeNotify();
					}
				);
			}
			else if(message.id == com.kenny.util.Observer.MessageType.PARAGRAPH_ACTION){
				if(message.data.action == 'PageBreak'){
					var paragraphObj = message.sender;
					paragraphObj.addPageStart(message.data.offset);
					paragraphObj.refreshLineData();
					paragraphObj.updatePage(true);
				}
			}
		};
	};

	//(function(){
		var listener = new com.kenny.event.ParagraphListener();
		com.kenny.util.Observer.register(com.kenny.util.Observer.MessageType.DOCUMENT_CREATE, listener);
	//})();
	
}