/**
 * Table Listener class
 * 
 * @package com.hoperun.event
 * @import com.hoperun.util.BaseTool, com.hoperun.util.Observer,
 *         com.hoperun.tracker.TableTracker
 * @author lu_feng
 */
if (!com.hoperun.event.TableFocusListener) {
	com.hoperun.event.TableFocusListener = function() {
		var tableTracker = null;
		this.update = function(message) {
			if (!tableTracker) {
				tableTracker = new com.hoperun.tracker.TableTracker();
				($('.docs-editor').length > 0) ? $('.docs-editor').append(tableTracker.getDomInstance()) : document.body.appendChild(tableTracker.getDomInstance());
			}

			if (message.sender) {
				//Avoid to send context blur event
				if(tableTracker.isHide() || tableTracker.getActiveTable() != message.sender){
					//Clear selection
		            var msg = new com.hoperun.util.Observer.Message();
		            msg.id = com.hoperun.util.Observer.MessageType.CONTEXT_BLUR;
		            msg.sender = this;
		            com.hoperun.util.Observer.sendMessage(msg);
				}
				tableTracker.setActiveTable(message.sender);
				tableTracker.setZIndex(message.sender.getZIndex()-1);
				tableTracker.getDomInstance().style.display = 'block';
			} else {
				tableTracker.getDomInstance().style.display = 'none';
			}
		};
	};

	// added by zhuxiaoquan
	com.hoperun.event.TableChangedListener = function() {
		this.update = function(message) {
			var table = message.sender;
			if(message.data){
				if(message.data.flag == "headers"){
					if(message.data.headerRows!=null){
						var tempVls = message.data.headerRows;
						jsk.execute( function () {
							var tempHeaderRows = table.getHeaderRows();
							table.setHeaderRows(tempVls);
							table.render();
							return {
								"headerRows": tempHeaderRows ,"currentHeaderRows": tempVls
							};
						}, function (data) {
							tempVls = data.currentHeaderRows;
							table.setHeaderRows(data.headerRows);
							table.render();
						});
					}else if(message.data.headerColumns!=null){
						var tempVls = message.data.headerColumns;
						jsk.execute( function () {
							var tempHeaderCols = table.getHeaderCols();
							table.setHeaderCols(tempVls);
							table.render();
							return {
								"headerCols": tempHeaderCols,"currentHeaderCols": tempVls
							};
						}, function (data) {
							tempVls = data.currentHeaderCols;
							table.setHeaderCols(data.headerCols);
							table.render();
						});
						
					}else if(message.data.footerRows!=null){
						var tempVls = message.data.footerRows;
						jsk.execute( function () {
							var tempFooterRows = table.getFooterRows();
							table.setFooterRows(tempVls);
							table.render();
							return {
								"footerRows": tempFooterRows ,"currentFooterRows": tempVls
							};
						}, function (data) {
							tempVls = data.currentFooterRows;
							table.setFooterRows(data.footerRows);
							table.render();
						});
					}
				}else if(message.data.flag == "table"){
					if(message.data.src!=null){
						var tempVls = null;
						if(message.data.src.lastIndexOf("Table_0004.png")>0){
							tempVls = "style1";
							com.hoperun.util.BaseTool.log4js('DEBUG' ,"The style is: "+tempVls);
						}
						else if(message.data.src.lastIndexOf("Table_0009.png")>0){
							tempVls = "style2";
							com.hoperun.util.BaseTool.log4js('INFO' ,"The style is: "+tempVls);
						}
						else if(message.data.src.lastIndexOf("Table_0014.png")>0){
							tempVls = "style3";
							com.hoperun.util.BaseTool.log4js('WARN' ,"The style is: "+tempVls);
						}
						else if(message.data.src.lastIndexOf("Table_0019.png")>0){
							tempVls = "style4";
							com.hoperun.util.BaseTool.log4js('ERROR' ,"The style is: "+tempVls);
						}
						else if(message.data.src.lastIndexOf("Table_0024.png")>0){
							tempVls = "style5";
							com.hoperun.util.BaseTool.log4js('FATAL' ,"The style is: "+tempVls);
						}
						else if(message.data.src.lastIndexOf("Table_0029.png")>0){
							tempVls = "style6";
							com.hoperun.util.BaseTool.log4js('DEBUG' ,"The style is: "+tempVls);
						}
							
						jsk.execute( function () {
							var tempStyleId = table.getStyleId();
							
							table.setStyleId(tempVls);
							return {
								styleId: tempStyleId
							};
						}, function (data) {
							table.setStyleId(data.styleId);
						});
					}else if(message.data.tableBorder!=null){
						var tempVls = message.data.tableBorder;
						jsk.execute( function () {
							var tableBorder = table.getTableBorder();
							table.setTableBorder(tempVls);
							table.render();
							return {
								"tableBorder": tableBorder,"currentTableBorder": tempVls
							};
						}, function (data) {
							tempVls = data.currentTableBorder;
							table.setTableBorder(data.tableBorder);
							table.render();
						});
					}else if(message.data.alternatingRows!=null){
						var tempVls = message.data.alternatingRows;
						jsk.execute( function () {
							var tempAlternatingRows = table.getAlternatingRows();
							table.setAlternatingRows(tempVls);
							table.render();
							return {
								"alternatingRows": tempAlternatingRows ,"currentAlternatingRows": tempVls
							};
						}, function (data) {
							tempVls = data.currentAlternatingRows;
							table.setAlternatingRows(data.alternatingRows);
							table.render();
						});
					}else if(message.data.horizontalLines!=null){
						var tempVls = message.data.horizontalLines;
						jsk.execute( function () {
							var tempHorizontalLines = table.getHorizontalLines();
							table.setHorizontalLines(tempVls);
							table.render();
							return {
								"horizontalLines": tempHorizontalLines ,"currentHorizontalLines": tempVls
							};
						}, function (data) {
							tempVls = data.currentHorizontalLines;
							table.setHorizontalLines(data.horizontalLines);
							table.render();
						});
					}else if(message.data.headerColumnLines!=null){
						var tempVls = message.data.headerColumnLines;
						jsk.execute( function () {
							var tempHeaderColumnLines = table.getHeaderColumnLines();
							table.setHeaderColumnLines(tempVls);
							table.render();
							return {
								"headerColumnLines": tempHeaderColumnLines ,"currentHeaderColumnLines": tempVls
							};
						}, function (data) {
							tempVls = data.currentHeaderColumnLines;
							table.setHeaderColumnLines(data.headerColumnLines);
							table.render();
						});
					}else if(message.data.verticalLines!=null){
						var tempVls = message.data.verticalLines;
						jsk.execute( function () {
							var tempVerticalLines = table.getVerticalLines();
							table.setVerticalLines(tempVls);
							table.render();
							return {
								"verticalLines": tempVerticalLines ,"currentVerticalLines": tempVls
							};
						}, function (data) {
							tempVls = data.currentVerticalLines;
							table.setVerticalLines(data.verticalLines);
							table.render();
						});
					}else if(message.data.tableFont!=null){
						var tempVls = message.data.tableFont;
						jsk.execute( function () {
							var tempTableFont = table.getFontFamily();
							table.setFontFamily(tempVls);
							return {
								"tableFont": tempTableFont ,"currentFontFamily": tempVls
							};
						}, function (data) {
							tempVls = data.currentFontFamily;
							table.setFontFamily(data.tableFont);
						});
					}
					// else if(message.data.headerRowLines!=null){
					// 	alert(message.data.headerRowLines);
					// }
					// else if(message.data.footerRowLines!=null){
					// 	alert(message.data.footerRowLines);
					// }
				}
			}
			
			var message = new com.hoperun.util.Observer.Message();
			message.id = com.hoperun.util.Observer.MessageType.TABLE_LAYOUT;
			message.sender = table;
			message.data = {};
			com.hoperun.util.Observer.sendMessage(message);
		};
	};
	
	com.hoperun.event.TableMovedListener = function() {
		this.update = function(message) {
			var table = message.sender.getActiveTable();
			table.setPosition("absolute");
			table.setTop(message.sender.getTop());
			table.setLeft(message.sender.getLeft());
		};
	};
	
	com.hoperun.event.TableRowAddListener = function() {
		this.update = function(message) {
			try{
				var table = message.sender;
				var uuid = table.getId();
				var doChange = function(){
					var rowNo = table.getRows();
					if(table.getFooterRows()){
						rowNo = rowNo - table.getFooterRows();
					}
					jsk.execute( function () {
						table.addRow(rowNo + 1);
						table._cellTracker.setFlag(com.hoperun.tracker.CellTracker.FlagType.Vertical);
				        //table._cellTracker.refresh(table.getCellsByColNo(table._selectColNo), com.hoperun.tracker.CellTracker.FlagType.Vertical);
						return {
							"tempRowNo": rowNo + 1 
						};
					}, function (data) {
						table.deleteRow(data.tempRowNo);
						
				        table._cellTracker.setFlag(com.hoperun.tracker.CellTracker.FlagType.None);
				        //table._cellTracker.refresh(table.getCellsByColNo(table._selectColNo), com.hoperun.tracker.CellTracker.FlagType.None);
					});
				};
				var height = table.getHeight() + table.getTop();
				var containerType = $('#myContent').attr('containerType');
				if(containerType == 'sheet'){
					doChange();
				}else if(containerType == 'slide'){
					if(height > 730){
					}else{
						doChange();
					}
				}else if(containerType == 'paper'){
					if(height > 900){
					}else{
						doChange();
					}
				}
						
			}catch(e){
				alert(e);
			}
			var message = new com.hoperun.util.Observer.Message();
			message.id = com.hoperun.util.Observer.MessageType.TABLE_LAYOUT;
			message.sender = table;
			message.data = {};
			com.hoperun.util.Observer.sendMessage(message);
		};
	};
	
	com.hoperun.event.TableColAddListener = function() {
		this.update = function(message) {
			var table = message.sender;
			var doChange = function(){
				jsk.execute( function () {
					table.addCol(table.getCols()+1);
					table._cellTracker.setFlag(com.hoperun.tracker.CellTracker.FlagType.Vertical);
					//table._cellTracker.refresh(table.getCellsByRowNo(table._selectRowNo), com.hoperun.tracker.CellTracker.FlagType.Vertical);
					return {
						"tempColNo": table.getCols()
					};
				}, function (data) {
					table.deleteCol(data.tempColNo);
					table._cellTracker.setFlag(com.hoperun.tracker.CellTracker.FlagType.None);
					//table._cellTracker.refresh(table.getCellsByRowNo(table._selectRowNo), com.hoperun.tracker.CellTracker.FlagType.None);
				});
				var message = new com.hoperun.util.Observer.Message();
				message.id = com.hoperun.util.Observer.MessageType.TABLE_LAYOUT;
				message.sender = table;
				message.data = {};
				com.hoperun.util.Observer.sendMessage(message);
			};
			
			var width = table.getWidth() + table.getLeft();
			var containerType = $('#myContent').attr('containerType');
			if(containerType == 'sheet'){
				doChange();
			}else if(containerType == 'slide'){
				if(width > 1230){
				}else{
					doChange();
				}
			}else if(containerType == 'paper'){
				if(width > 700){
				}else{
					doChange();
				}
			}
			
		};
	};

	com.hoperun.event.TableRowSelectListener = function() {
		this.update = function(message) {
			var table = message.sender;
			var tempObj = message.data.e;
			table.rowSelect(tempObj);
		};
	};
	
	com.hoperun.event.TableColSelectListener = function() {
		this.update = function(message) {
			var table = message.sender;
			table.colSelect(message.data.e);
		};
	};
	
	com.hoperun.event.TableRowHeightChangeListener = function() {
		this.update = function(message) {
			var cellTracker = message.sender;
			var table = cellTracker.getActiveTable();
			var x = message.data.x, y = message.data.y;
			var first = cellTracker.getCells()[0];
			var rowNo = first.getRow();
			var top = $(first.getDomInstance()).offset().top;
			if(message.data.isUndoFlag){
				var mouseY = message.data.mouseY;
				var height = mouseY - top;
				jsk.execute( function () {
					table.changeRowHeight(rowNo, y - top > 29 ? y - top : 29);
					var message = new com.hoperun.util.Observer.Message();
					message.id = com.hoperun.util.Observer.MessageType.TABLE_LAYOUT;
					message.sender = table;
					message.data = {};
					com.hoperun.util.Observer.sendMessage(message);
					return {
						"msgdata": height
					};
				}, function (data) {
					 table.changeRowHeight(rowNo, data.msgdata);
					 var message = new com.hoperun.util.Observer.Message();
					 message.id = com.hoperun.util.Observer.MessageType.TABLE_LAYOUT;
					 message.sender = table;
					 message.data = {};
					 com.hoperun.util.Observer.sendMessage(message);
				});
			}else{
				table.changeRowHeight(rowNo, y - top);
				var message = new com.hoperun.util.Observer.Message();
				message.id = com.hoperun.util.Observer.MessageType.TABLE_LAYOUT;
				message.sender = table;
				message.data = {};
				com.hoperun.util.Observer.sendMessage(message);
			}
		};
	};
	
	com.hoperun.event.TableColWidthChangeListener = function() {
		this.update = function(message) {
			var cellTracker = message.sender;
			var table = cellTracker.getActiveTable();
			var x = message.data.x, y = message.data.y;
			var first = cellTracker.getCells()[0];
			var colNo = first.getCol();
			var left = $(first.getDomInstance()).offset().left;
			if(message.data.isUndoFlag){
				var mouseX = message.data.mouseX;
				var width = mouseX - left;
				jsk.execute( function () {
					table.changeColWidth(colNo, x - left > 20 ? x - left : 20);
					var message = new com.hoperun.util.Observer.Message();
					message.id = com.hoperun.util.Observer.MessageType.TABLE_LAYOUT;
					message.sender = table;
					message.data = {};
					com.hoperun.util.Observer.sendMessage(message);
					return {
						"msgdata": width
					};
				}, function (data) {
					table.changeColWidth(colNo, data.msgdata);
					var message = new com.hoperun.util.Observer.Message();
					message.id = com.hoperun.util.Observer.MessageType.TABLE_LAYOUT;
					message.sender = table;
					message.data = {};
					com.hoperun.util.Observer.sendMessage(message);
				});
			}
			else{
				table.changeColWidth(colNo, x - left);
				var message = new com.hoperun.util.Observer.Message();
				message.id = com.hoperun.util.Observer.MessageType.TABLE_LAYOUT;
				message.sender = table;
				message.data = {};
				com.hoperun.util.Observer.sendMessage(message);
			}
		};
	};
	
	com.hoperun.event.TableCellInsertListener = function() {
		this.update = function(message) {
			var table = message.sender;
			var flag = table.getCellTracker().getFlag();
			var first = table.getCellTracker().getCells()[0];
			jsk.execute( function () {
				if(flag == com.hoperun.tracker.CellTracker.FlagType.Horizontal){
					table.insertRow(first.getRow());
				}
				if(flag == com.hoperun.tracker.CellTracker.FlagType.Vertical){
					table.insertCol(first.getCol());
				}
				var message = new com.hoperun.util.Observer.Message();
				message.id = com.hoperun.util.Observer.MessageType.TABLE_LAYOUT;
				message.sender = table;
				message.data = {};
				com.hoperun.util.Observer.sendMessage(message);
				return {
					"tempRowNo": first.getRow() ,"tempColNo": first.getCol() ,"flag": flag
				};
			}, function (data) {
				if(data.flag == com.hoperun.tracker.CellTracker.FlagType.Horizontal){
					table.deleteRow(data.tempRowNo);
				}
				if(data.flag == com.hoperun.tracker.CellTracker.FlagType.Vertical){
					table.deleteCol(data.tempColNo);
				}
				var message = new com.hoperun.util.Observer.Message();
				message.id = com.hoperun.util.Observer.MessageType.TABLE_LAYOUT;
				message.sender = table;
				message.data = {};
				com.hoperun.util.Observer.sendMessage(message);
			});
		};
	};
	
	com.hoperun.event.TableCellDeleteListener = function() {
		this.update = function(message) {
			var table = message.sender;
			var flag = table.getCellTracker().getFlag();
			var first = table.getCellTracker().getCells()[0];
			jsk.execute( function () {
				if(flag == com.hoperun.tracker.CellTracker.FlagType.Horizontal){
					var rowNo = first.getRow();
					var headerRows = table.getHeaderRows();
        			var footerRows = table.getFooterRows();
        			if(table.getRows() > 1){
        				var deleteCells = table.deleteRow(rowNo);
        				var message = new com.hoperun.util.Observer.Message();
    					message.id = com.hoperun.util.Observer.MessageType.TABLE_LAYOUT;
    					message.sender = table;
    					message.data = {};
    					com.hoperun.util.Observer.sendMessage(message);
    					return {
    						"rowNo": rowNo,
    						"deleteCells": deleteCells,
    						"headerRows": headerRows,
    						"footerRows": footerRows,
    						"flag": flag,
    						"table": table
    					};
        			}
				}
				if(flag == com.hoperun.tracker.CellTracker.FlagType.Vertical){
					var colNo = first.getCol();
					var headerCols = table.getHeaderCols();
					if(table.getCols() > 1){
						var deleteCells = table.deleteCol(colNo);
						var message = new com.hoperun.util.Observer.Message();
						message.id = com.hoperun.util.Observer.MessageType.TABLE_LAYOUT;
						message.sender = table;
						message.data = {};
						com.hoperun.util.Observer.sendMessage(message);
						return {
							"colNo": colNo,
							"deleteCells": deleteCells,
							"headerCols": headerCols,
							"flag": flag,
							"table": table
						};
					}
					
				}
				
			}, function (data) {
				if(data.flag == com.hoperun.tracker.CellTracker.FlagType.Horizontal){
					data.table.insertRowForUndo(data.deleteCells, data.rowNo, data.headerRows, data.footerRows);
					
					// restore the selection
					var cells = data.deleteCells;
			        for (var i = 0; i < cells.length; i++) {
			            var cell = cells[i];
			            var top = cell.getTop();
			            var height = cell.getHeight();
		            	data.table.setSelectRowNo(cell.getRow());
			        }
			        data.table._cellTracker.setFlag(com.hoperun.tracker.CellTracker.FlagType.Horizontal);
			        data.table._cellTracker.refresh(data.table.getCellsByRowNo(data.table._selectRowNo), com.hoperun.tracker.CellTracker.FlagType.Horizontal);
				        
				}
				if(data.flag == com.hoperun.tracker.CellTracker.FlagType.Vertical){
					data.table.insertColForUndo(data.deleteCells, data.colNo, data.headerCols);
					
					// restore the selection
			        var cells = data.deleteCells;
			        for (var i = 0; i < cells.length; i++) {
			            var cell = cells[i];
			            var left = cell.getLeft();
			            var width = cell.getWidth();
			            data.table.setSelectColNo(cell.getCol());
			        }
			        data.table._cellTracker.setFlag(com.hoperun.tracker.CellTracker.FlagType.Vertical);
			        data.table._cellTracker.refresh(data.table.getCellsByColNo(data.table._selectColNo), com.hoperun.tracker.CellTracker.FlagType.Vertical);
				}
				
				var message = new com.hoperun.util.Observer.Message();
				message.id = com.hoperun.util.Observer.MessageType.TABLE_LAYOUT;
				message.sender = data.table;
				message.data = {};
				com.hoperun.util.Observer.sendMessage(message);
			});
		};
	};
	
	com.hoperun.event.TableChangePositionListener = function() {
		this.update = function(message) {
			var table = message.sender;
			var top = table.getTop();
			var left = table.getLeft();
			
			table.setLeft(message.data.left); 
		    table.setTop(message.data.top);
		    
			if(message.data.rect){
				com.hoperun.util.BaseTool.doValidPositionWidthRect(message.data.rect, table);
			}
			else{
				com.hoperun.util.BaseTool.doValidPosition(message.data.self, table);
			}
			
			var targetLeft = table.getLeft(), targetTop = table.getTop();
			
			jsk.execute( function () {
				table.setLeft(targetLeft); 
			    table.setTop(targetTop);
			    
			    var updateMsg = new com.hoperun.util.Observer.Message();
				updateMsg.id = com.hoperun.util.Observer.MessageType.TABLE_LAYOUT;
				updateMsg.sender = table;
				updateMsg.data = {};
				com.hoperun.util.Observer.sendMessage(updateMsg);
				
			    //Notify shape blur event
		        var msg = new com.hoperun.util.Observer.Message();
		        msg.id = com.hoperun.util.Observer.MessageType.TABLE_FOCUS;
		        msg.sender = table;
		        com.hoperun.util.Observer.sendMessage(msg);
		        
			    
		        var msg = new com.hoperun.util.Observer.Message();
		        msg.id = com.hoperun.util.Observer.MessageType.CONTEXT_BLUR;
		        msg.sender = null;
		        com.hoperun.util.Observer.sendMessage(msg);
				return {
					"top": top ,"left": left ,"table": table 
				};
			}, function (data) {
				table.setLeft(data.left); 
			    table.setTop(data.top);
			    
			    var updateMsg = new com.hoperun.util.Observer.Message();
				updateMsg.id = com.hoperun.util.Observer.MessageType.TABLE_LAYOUT;
				updateMsg.sender = data.table;
				updateMsg.data = {};
				com.hoperun.util.Observer.sendMessage(updateMsg);
				
			    //Notify shape blur event
		        var msg = new com.hoperun.util.Observer.Message();
		        msg.id = com.hoperun.util.Observer.MessageType.TABLE_FOCUS;
		        msg.sender = data.table;
		        com.hoperun.util.Observer.sendMessage(msg);
			});
		};
	};
	
	com.hoperun.event.TableInsertListener = function() {
		this.update = function(message) {
			var container = getActiveContainer();
			var mess = message;
			var tempStyleId;
			if(container==null)
				return;
			var table = new com.hoperun.node.Table();
			if(container.getCursorPosition && container.getCursorPosition()){
				table.setLeft(container.getCursorPosition().x);
				table.setTop(container.getCursorPosition().y);
			}
			 
			if(mess.data.src.lastIndexOf("Table_0001.png")>0){
				tempStyleId = "initStyle1";
				table.setRows(4);
				table.setCols(4);
				table.build();
				
			}else if(mess.data.src.lastIndexOf("Table_0002.png")>0){
				tempStyleId = "initStyle2";
				table.setRows(4);
				table.setCols(4);
				table.build();
			}else if(mess.data.src.lastIndexOf("Table_0003.png")>0){
				tempStyleId = "initStyle3";
				table.setRows(4);
				table.setCols(4);
				table.build();
			}else if(mess.data.src.lastIndexOf("Table_0004.png")>0){
				tempStyleId = "style1";
				table.setRows(5);
				table.setCols(4);
				
				table._headerRowsColor = "#B6B6B6";
				table._headerColsColor = "#D7D7D7";
				table._footerRowsColor = "#B6B6B6";
				table._border = "1px solid #B6B6B6";
				table.setAlternatingRows(false);
				table.setHorizontalLines(true);
				table.setVerticalLines(true);
	            table.setFooterLines(false);
	            table.setHeaderLines(false);
	            table.setHeaderRowLines(false);
	            table.setHeaderColumnLines(true);
	            table.setFooterRowLines(false);
	            table.setHeaderColumnColLines(false);
	            table.setHeaderRows(1);
	            table.setHeaderCols(1);
	            table.setFooterRows(1);
				table.build();
			}else if(mess.data.src.lastIndexOf("Table_0006.png")>0){
				tempStyleId = "initStyle5";
				table.setRows(4);
				table.setCols(4);
				table.build();
			}else if(mess.data.src.lastIndexOf("Table_0007.png")>0){
				tempStyleId = "initStyle6";
				table.setRows(4);
				table.setCols(4);
				table.build();
			}else if(mess.data.src.lastIndexOf("Table_0008.png")>0){
				tempStyleId = "initStyle7";
				table.setRows(4);
				table.setCols(4);
				table.build();
			}else if(mess.data.src.lastIndexOf("Table_0009.png")>0){
				tempStyleId = "style2";
				table.setRows(5);
				table.setCols(4);
				table.setHeaderRows(1);
	            table.setHeaderCols(1);
	            table.setFooterRows(1);
				table._headerRowsColor = "#FFFFFF";
				table._headerColsColor = "#768E9E";
				table._footerRowsColor = "#FFFFFF";
	            table._alternatingRowsColor = "#DFDFDF";
	            table._border = "1px solid #B6B6B6";
	            table.setAlternatingRows(true);
	            table.setHeaderColumnLines(false);
	            table.setHeaderRowLines(false);
	            table.setHorizontalLines(false);
	            table.setVerticalLines(false);
	            table.setFooterRowLines(false);
	            table.setHeaderColumnColLines(false);
	            table.setHeaderColumnLines(false);
	            
				table.build();
			}else if(mess.data.src.lastIndexOf("Table_0029.png")>0){
				tempStyleId = "style6";
				table.setHeaderRows(1);
	            table.setHeaderCols(1);
	            table.setFooterRows(1);
				table._headerRowsColor = "#FFFFFF";
				table._headerColsColor = "#FFFFFF";
				table._footerRowsColor = "#FFFFFF";
				table._alternatingRowsColor = "#DFDFDF";
				table._border = "1px solid #B6B6B6";
	            table.setAlternatingRows(true);
	            table.setFooterRowLines(false);
	            table.setHeaderRowLines(false);
	            table.setHeaderColumnLines(false);
	            table.setHeaderColumnColLines(false);
	            
				table.setRows(5);
				table.setCols(4);
				table.build();
				
			}else if(mess.data.src.lastIndexOf("Table_0024.png")>0){
				tempStyleId = "style5";
				table.setRows(5);
				table.setCols(4);
				table.setHeaderRows(1);
	            table.setHeaderCols(1);
	            table.setFooterRows(1);
				table._headerRowsColor = "#434343";
				table._headerColsColor = "#6E6E6E";
				table._footerRowsColor = "#434343";
				table._border = "1px solid black";
				table.setAlternatingRows(false);
	            table.setHorizontalLines(true);
	            table.setVerticalLines(true);
	            table.setFooterLines(false);
	            table.setFooterRowLines(false);
	            table.setHeaderRowLines(false);
	            table.setHeaderColumnLines(false);
	            table.setHeaderColumnColLines(false);
	            
				table.build();
			}else if(mess.data.src.lastIndexOf("Table_0014.png")>0){
				tempStyleId = "style3";
				table.setRows(5);
				table.setCols(4);
				table.setHeaderRows(1);
	            table.setHeaderCols(1);
	            table.setFooterRows(1);
				table._headerRowsColor = "#568130";
				table._headerColsColor = "#6D6D6D";
				table._footerRowsColor = "#568130";
				table._border = "1px solid #DFDFDF";
				table.setAlternatingRows(false);
	            table.setFooterRowLines(true);
	            table.setHeaderRowLines(true);
	            table.setHeaderColumnLines(true);
	            table.setHorizontalLines(true);
	            table.setVerticalLines(true);
	            
				table.build();
			}else if(mess.data.src.lastIndexOf("Table_0019.png")>0){
				tempStyleId = "style4";
				table.setRows(5);
				table.setCols(4);
				table.setHeaderRows(1);
	            table.setHeaderCols(1);
	            table.setFooterRows(1);
				table._headerRowsColor = "#3D7599";
				table._headerColsColor = "#568CB2";
	            table._footerRowsColor = "#3D7599";
	            table._border = "1px solid black";
	            table.setAlternatingRows(false);
	            table.setHeaderColumnLines(true);
	            table.setHeaderRowLines(true);
	            table.setHorizontalLines(false);
	            table.setVerticalLines(true);
	            table.setFooterRowLines(true);
	            table.setHeaderColumnColLines(false);
	            table.setHeaderColumnLines(false);
	            
				table.build();
			}else{
				return;
			}
			table.render();
			
			jsk.execute(
				function() {
					if(container.getType()=="Slide")
						setCurrSlide(container);
					else if(container.getType()=="Sheet")
						setCurrSheet(container);
					table.appendTo(container);
					table.setStyleId(tempStyleId);
					
					var message = new com.hoperun.util.Observer.Message();
					message.id = com.hoperun.util.Observer.MessageType.TABLE_LAYOUT;
					message.sender = table;
					message.data = {};
					com.hoperun.util.Observer.sendMessage(message);
					
					var message = new com.hoperun.util.Observer.Message();
					message.id = com.hoperun.util.Observer.MessageType.TABLE_FOCUS;
					message.sender = table;
					message.data = {};
					com.hoperun.util.Observer.sendMessage(message);
					
					var message = new com.hoperun.util.Observer.Message();
					message.id = com.hoperun.util.Observer.MessageType.TABLE_SELECTED;
					message.sender = table;
					message.data = {};
					com.hoperun.util.Observer.sendMessage(message);
					
					var message = new com.hoperun.util.Observer.Message();
					message.id = com.hoperun.util.Observer.MessageType.UPDATE_ZINDEX;
					message.sender = table;
					message.data = {};
					com.hoperun.util.Observer.sendMessage(message);
					
					return {"container":container,"table":table};
				},
				function(data) {
					var container = data.container;
					if(container.getType()=="Slide")
						setCurrSlide(container);
					else if(container.getType()=="Sheet")
						setCurrSheet(container);
					var table = data.table;
					table.removeFrom(container);
					
					var message = new com.hoperun.util.Observer.Message();
					message.id = com.hoperun.util.Observer.MessageType.UPDATE_SLIDE_LEFTSIDE;
					message.sender = null;
					message.data = {};
					
					com.hoperun.util.Observer.sendMessage(message);
					var msg = new com.hoperun.util.Observer.Message();
					msg.id = com.hoperun.util.Observer.MessageType.CONTEXT_BLUR;
					msg.sender = container;
					com.hoperun.util.Observer.sendMessage(msg);
				});
		};
	};



	// Register this into Observer container.
	com.hoperun.util.Observer.register(
			com.hoperun.util.Observer.MessageType.TABLE_CHANGED,
			new com.hoperun.event.TableChangedListener());
	com.hoperun.util.Observer.register(
			com.hoperun.util.Observer.MessageType.TABLE_FOCUS,
			new com.hoperun.event.TableFocusListener());

	com.hoperun.util.Observer.register(
			com.hoperun.util.Observer.MessageType.TABLE_MOVED,
			new com.hoperun.event.TableMovedListener());

	com.hoperun.util.Observer.register(
			com.hoperun.util.Observer.MessageType.TABLE_ROW_ADD,
			new com.hoperun.event.TableRowAddListener());

	com.hoperun.util.Observer.register(
			com.hoperun.util.Observer.MessageType.TABLE_COL_ADD,
			new com.hoperun.event.TableColAddListener());

	com.hoperun.util.Observer.register(
			com.hoperun.util.Observer.MessageType.TABLE_ROW_SELECT,
			new com.hoperun.event.TableRowSelectListener());

	com.hoperun.util.Observer.register(
			com.hoperun.util.Observer.MessageType.TABLE_COL_SELECT,
			new com.hoperun.event.TableColSelectListener());

	com.hoperun.util.Observer.register(
			com.hoperun.util.Observer.MessageType.TABLE_ROW_HEIGHT_CHANGE,
			new com.hoperun.event.TableRowHeightChangeListener());

	com.hoperun.util.Observer.register(
			com.hoperun.util.Observer.MessageType.TABLE_COL_WIDTH_CHANGE,
			new com.hoperun.event.TableColWidthChangeListener());
	com.hoperun.util.Observer.register(
			com.hoperun.util.Observer.MessageType.CELL_MENU_INSERT,
			new com.hoperun.event.TableCellInsertListener());
	com.hoperun.util.Observer.register(
			com.hoperun.util.Observer.MessageType.CELL_MENU_DELETE,
			new com.hoperun.event.TableCellDeleteListener());
	
	com.hoperun.util.Observer.register(
			com.hoperun.util.Observer.MessageType.TABLE_INSERT,
			new com.hoperun.event.TableInsertListener()
			);
	com.hoperun.util.Observer.register(
			com.hoperun.util.Observer.MessageType.TABLE_POSITION,
			new com.hoperun.event.TableChangePositionListener()
			);
}