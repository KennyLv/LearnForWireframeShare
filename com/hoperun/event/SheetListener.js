/**
 * Sheet Listener class
 * 
 * @package com.hoperun.event
 * @import com.hoperun.util.BaseTool,com.hoperun.util.Observer
 * @author lu_feng
 */
if (!com.hoperun.event.SheetListener) {
    com.hoperun.event.SheetListener = function () {
    	this.isFirstSheetCreate = true;
    	
        this.update = function (message) {
            switch (message.id) {
                case com.hoperun.util.Observer.MessageType.SHEETS_CREATE:
                	if(this.isFirstSheetCreate){
                		com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.SHEETS_SAVE, this);
                    	com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.DELETE_ITEM, this);
                        com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.TABLE_MENU_DELETE, this);
                        this.isFirstSheetCreate = false;
                	}
                    var sheet = new com.hoperun.node.Sheet();
                    
                    var self = this;
                    var tempSheet;
                    
                    //sheet.setWidth("98%");
                    //sheet.setHeight("98%");
                    //sheet.setMargin({ top: 15, right: 15, bottom: 15, left: 15 });
                    sheetNum += 1;
                    sheet.setSheetName("sheet" + sheetNum);
                    sheet.setSheetNum(sheetNum);
                    if(message.data.obj){
                    	sheet.setData(message.data.obj);
                    }else{
                    	 if(message.data){
                    	sheet.setData(message.data);
                    }
                    }
                    var redo = function () {
						if(tempSheet){
							sheet = tempSheet;
				            AddTab(sheet,0);
		                    setCurrSheet(sheet);
							return { "sheet": sheet };
						}else{
							if (sheet) {
						        AddTab(sheet,0);
			                    setCurrSheet(sheet);
			                    sheets.add(sheet);
						    	return { "sheet": sheet };
						    }
						}
					};
					
					var undo = function (data){
						
						if($("#tabContainer").children("li").length != 1){
							tempSheet = data.sheet;
							$("#tabContainer").children().each( function() {
								if($(this).attr('targetId') == tempSheet.getId()){
									var selectedIndex = $(this).index();
							        if (selectedIndex != 0) {
							            focusOn($(this).prev());
							            $(this).remove();
							        } else {
							            focusOn($(this).next());
							            $(this).remove();
							        }
								}
							});
						}
						
					};
					if(message.data.isFirst == 1){
						redo();
					}
					else{
						jsk.execute(redo,undo);
					}
                    break;
                case com.hoperun.util.Observer.MessageType.SHEETS_SAVE:
                    com.hoperun.util.FileHelper.save(message.sender, message.data);
                    break;
                case com.hoperun.util.Observer.MessageType.TABLE_MENU_DELETE:
                    var sheet = getActiveContainer();
                    var tableObj = message.sender;
                    if (sheet && tableObj) {
                        sheet.removeChild(tableObj);

                        //Notify table blur event
                        var msg = new com.hoperun.util.Observer.Message();
                        msg.id = com.hoperun.util.Observer.MessageType.CONTEXT_BLUR;
                        msg.sender = null;
                        com.hoperun.util.Observer.sendMessage(msg);
                    }
                    break;
                case com.hoperun.util.Observer.MessageType.DELETE_ITEM:
                    var container = getActiveContainer();
                    var item = message.sender;
                    jsk.execute(
						function () {
						    if (container && item) {
						        container.removeChild(item);

						        var message = new com.hoperun.util.Observer.Message();
						        message.id = com.hoperun.util.Observer.MessageType.UPDATE_ZINDEX;
						        message.sender = item;
						        message.data = {
						            'remove': true,
						            'criticalZIndex': item.getZIndex()
						        };
						        com.hoperun.util.Observer.sendMessage(message);

						        //Notify table blur event
						        var msg = new com.hoperun.util.Observer.Message();
						        msg.id = com.hoperun.util.Observer.MessageType.CONTEXT_BLUR;
						        msg.sender = null;
						        com.hoperun.util.Observer.sendMessage(msg);
						        return { "sheet": container, "item": item };
						    }
						},
						function (data) {
						    var sheet = data.sheet;
						    var item = data.item;
						    setCurrSheet(sheet);
						    item.appendTo(sheet);
						});
                    break;
            }
        };
    };
    
    com.hoperun.event.sheetCloseListener = function() {
		this.update = function(message) {
			var self = this;
			var sheeid = message.data.sheetId;
			var undoSheet;
			var redo = function () {
				$("#tabContainer").children().each( function() {
					if($(this).attr('targetId') == sheeid){
						undoSheet = findSheetById(sheeid);
						var selectedIndex = $(this).index();
				        if (selectedIndex != 0) {
				            focusOn($(this).prev());
				            $(this).remove();
				        } else {
				            focusOn($(this).next());
				            $(this).remove();
				        }
					}
				});
				return { "sheet": undoSheet};//message.data.sheet};
			};
			var undo = function (data){
				sheet = data.sheet;
				sheets.push(sheet);
			
				if(sheet){
					if(message.data.isFirst == 1){
						AddTab(sheet,0);
					}else{
						AddTab(sheet,1);
					}
	                focusOn($("#tabContainer li[targetid="+sheet.getId()+"]"));
	                com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.SHEETS_SAVE, self);
	                com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.DELETE_ITEM, self);
	                com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.TABLE_MENU_DELETE, self);
				}
			};
	
			if(message.data.isFirst == 1){
				redo();
			}
			else{
				jsk.execute(redo,undo);
			}
	
		};
	};
    
	(function(){
		var sheetListener = new com.hoperun.event.SheetListener();
		var sheetCloseListener = new com.hoperun.event.sheetCloseListener();
		com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.SHEETS_CREATE, sheetListener);
		com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.SHEETS_CLOSE, sheetCloseListener);
	})();
}