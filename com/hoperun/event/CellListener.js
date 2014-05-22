/**
 * Cell Listener class
 * 
 * @package com.hoperun.event
 * @import com.hoperun.util.BaseTool,com.hoperun.util.Observer
 * @author xuliyu
 */
if (!com.hoperun.event.CellListener) {
    com.hoperun.event.CellListener = function () {
        this.update = function (message) {
            switch (message.id) {
                case com.hoperun.util.Observer.MessageType.CELL_CLICK:
                    var tableFocusMsg = new com.hoperun.util.Observer.Message();
                    tableFocusMsg.id = com.hoperun.util.Observer.MessageType.TABLE_FOCUS;
                    tableFocusMsg.sender = getActiveContainer().getTableObjById(message.sender.getDomInstance().parentNode.id);
                    tableFocusMsg.data = {};
                    com.hoperun.util.Observer.sendMessage(tableFocusMsg);
                    break;
                case com.hoperun.util.Observer.MessageType.CELL_DBLCLICK:
                    message.sender.edit();
                    break;
            }
        };
    };

    com.hoperun.event.CellStyleListener = function () {
        var activeTable = null;
        this.handleCellStyle = function (message) {
			var activeSelection = activeTable.getActiveSelection();
			var dataaa = message.data;//TODO
			if (message.data.name) {
				var tempTable = activeTable;
				var tempActiveSelection = activeSelection.copy();
				var cell = new com.hoperun.node.Cell();
				var getFormat = function(currTable, currSelection){
            		var format;
            		currTable.removeSelection(currSelection.getId());
            		var startRow=currSelection.getRow();
            		var startCol=currSelection.getCol();
            		var endRow=startRow+currSelection.getRowNumber();
            		var endCol=startCol+currSelection.getColNumber();
            		for(var r=startRow;r<endRow;r++){
            			for(var c=startCol;c<endCol;c++){
            				if(currTable.getCell(r,c).getFormat()){
            					format = currTable.getCell(r,c).getFormat();
            					break;
            				}else{
            					format = null;
            				}
            			}
            		}
            		return format;
            	};
            	var format = getFormat(tempTable, activeSelection);
				jsk.execute( function () {
					cell.setFormat(message.data);
	                tempTable.render(cell,activeSelection);
	                return {
						"currTable":tempTable,"currSelection":tempActiveSelection,"format":format};
				}, function (data) {
					cell.setFormat(data.format);
	                data.currTable.render(cell,data.currSelection);
				});                
            }else if (message.data.fillColor) {
            	var tempTable = activeTable;
            	var cell = new com.hoperun.node.Cell();
            	var getCellBgColor = function(currTable, currSelection){
            		var tempColor;
            		currTable.removeSelection(currSelection.getId());
            		var startRow=currSelection.getRow();
            		var startCol=currSelection.getCol();
            		var endRow=startRow+currSelection.getRowNumber();
            		var endCol=startCol+currSelection.getColNumber();
            		for(var r=startRow;r<endRow;r++){
            			for(var c=startCol;c<endCol;c++){
            				if(currTable.getCell(r,c).getBackgroundColor()){
            					tempColor = currTable.getCell(r,c).getBackgroundColor();
            					break;
            				}else{
            					tempColor = '#ffffff';
            				}
            				
            			}
            		}
            		
            		return tempColor;
            	};
            	
            	var tempColor = getCellBgColor(tempTable, activeSelection);
            	
            	var tempActiveSelection = activeSelection.copy();
				jsk.execute( function () {
					cell.setBackgroundColor(message.data.fillColor);
	                tempTable.render(cell,activeSelection);
					return {
						"activeTable":tempTable,"activeSelection":tempActiveSelection ,"tempColor":tempColor
					};
				}, function (data) {
					var currTable = data.activeTable;
					var currSelection = data.activeSelection;
					var cell = new com.hoperun.node.Cell();
					cell.setBackgroundColor(data.tempColor);
					currTable.render(cell, currSelection);
				});
            }  else if (message.data.borderStyle) {
            	var tempTable = activeTable;
            	var tempActiveSelection =activeSelection.copy();
            	var cell = new com.hoperun.node.Cell();
            	
            	var getBorderStyle = function(currTable, currSelection){
            		var borderStyle;
            		currTable.removeSelection(currSelection.getId());
            		var startRow=currSelection.getRow();
            		var startCol=currSelection.getCol();
            		var endRow=startRow+currSelection.getRowNumber();
            		var endCol=startCol+currSelection.getColNumber();
            		for(var r=startRow;r<endRow;r++){
            			for(var c=startCol;c<endCol;c++){
            				if(currTable.getCell(r,c).getBorderStyle()){
            					borderStyle = currTable.getCell(r,c).getBorderStyle();
            					break;
            				}else{
            					borderStyle = 'Default';
            				}
            				
            			}
            		}
            		
            		return borderStyle;
            	};
            	var borderStyle = getBorderStyle(tempTable, activeSelection);
				jsk.execute( function () {
					cell.setBorderStyle(message.data.borderStyle);
					tempTable.render(cell,activeSelection);
					return {
						"activeTable":tempTable,"activeSelection":tempActiveSelection,"borderStyle":borderStyle};
				}, function (data) {
					cell.setBorderStyle(data.borderStyle);
					data.activeTable.render(cell,data.activeSelection);
				}); 
            } else if (message.data.flag == "headers") {
                if (message.data.headerRows != null) {
                	var tempVls = message.data.headerRows;
					jsk.execute( function () {
						var headerRows = activeTable.getHeaderRows();
						activeTable.setHeaderRows(tempVls);
                   		activeTable.render();
						return {
							"headerRows": headerRows ,"currentHeaderRows": tempVls
						};
					}, function (data) {
						tempVls = data.currentHeaderRows;
						activeTable.setHeaderRows(data.headerRows);
                   		activeTable.render();
					});
                } else if (message.data.headerColumns != null) {
                	var tempVls = message.data.headerColumns;
					jsk.execute( function () {
						var headerColumn = activeTable.getHeaderCols();
						activeTable.setHeaderCols(tempVls);
                   		activeTable.render();
						return {
							"headerCols": headerColumn,"currentHeaderCols": tempVls
						};
					}, function (data) {
						tempVls = data.currentHeaderCols;
						activeTable.setHeaderCols(data.headerCols);
						activeTable.render();
					});
                } else if (message.data.footerRows != null) {
                	var tempVls = message.data.footerRows;
					jsk.execute( function () {
						tempFooterRows = activeTable.getFooterRows();
						activeTable.setFooterRows(tempVls);
                   		activeTable.render();
						return {
							"footerRows": tempFooterRows ,"currentFooterRows": tempVls
						};
					}, function (data) {
						tempVls = data.currentFooterRows;
						activeTable.setFooterRows(data.footerRows);
                   		activeTable.render();
					});
                } 
            }else if (message.data.flag == "table") {
				if (message.data.src != null) {
					var tempVls = null;
					if (message.data.src.lastIndexOf("Table_0004.png") > 0) {
						tempVls = "style1";
					} else if (message.data.src.lastIndexOf("Table_0009.png") > 0) {
						tempVls = "style2";
					} else if (message.data.src.lastIndexOf("Table_0014.png") > 0) {
						tempVls = "style3";
					} else if (message.data.src.lastIndexOf("Table_0019.png") > 0) {
						tempVls = "style4";
					} else if (message.data.src.lastIndexOf("Table_0024.png") > 0) {
						tempVls = "style5";
					} else if (message.data.src.lastIndexOf("Table_0029.png") > 0) {
						tempVls = "style6";
					}
					var tempTable = activeTable;
					jsk.execute(function() {
						var tempStyleId = tempTable.getStyleId();
						tempTable.setStyleId(tempVls);
						return {
							"styleId" : tempStyleId,
							"currentStyleId" : tempVls,
							"table" : tempTable
						};
					}, function(data) {
						tempVls = data.currentStyleId;
						data.table.setStyleId(data.styleId);
					});
				} else if (message.data.tableBorder != null) {
                	var tempVls = message.data.tableBorder;
                	var tempTable = activeTable;
					jsk.execute( function () {
						var tableBorder = tempTable.getTableBorder();
						tempTable.setTableBorder(tempVls);
						tempTable.render();
						return {
							"tableBorder": tableBorder,"currentTableBorder": tempVls,"table": tempTable
						};
					}, function (data) {
						tempVls = data.currentTableBorder;
						data.table.setTableBorder(data.tableBorder);
						data.table.render();
					});
                }
				else if (message.data.alternatingRows != null) {
		        	var tempVls = message.data.alternatingRows;
		        	var tempTable = activeTable;
					jsk.execute( function () {
						var tempAlternatingRows = tempTable.getAlternatingRows();
						tempTable.setAlternatingRows(tempVls);
						tempTable.render();
						return {
							"alternatingRows": tempAlternatingRows ,"currentAlternatingRows": tempVls,"table": tempTable
						};
					}, function (data) {
						tempVls = data.currentAlternatingRows;
						data.table.setAlternatingRows(data.alternatingRows);
						data.table.render();
					});
		       } else if (message.data.horizontalLines != null) {
		        	var tempVls = message.data.horizontalLines;
		        	var tempTable = activeTable;
					jsk.execute( function () {
						var tempHorizontalLines = tempTable.getHorizontalLines();
						tempTable.setHorizontalLines(tempVls);
						tempTable.render();
						return {
							"horizontalLines": tempHorizontalLines ,"currentHorizontalLines": tempVls,"table":tempTable
						};
					}, function (data) {
						tempVls = data.currentHorizontalLines;
						data.table.setHorizontalLines(data.horizontalLines);
						data.table.render();
					});
		      } else if (message.data.headerColumnLines != null) {
		        	var tempVls = message.data.headerColumnLines;
		        	var tempTable = activeTable;
					jsk.execute( function () {
						var tempHeaderColumnLines = tempTable.getHeaderColumnLines();
						tempTable.setHeaderColumnLines(tempVls);
						tempTable.render();
						return {
							"headerColumnLines": tempHeaderColumnLines ,"currentHeaderColumnLines": tempVls,"table": tempTable
						};
					}, function (data) {
						tempVls = data.currentHeaderColumnLines;
						data.table.setHeaderColumnLines(data.headerColumnLines);
						data.table.render();
					});
		       } else if (message.data.verticalLines != null) {
                	var tempVls = message.data.verticalLines;
                	var tempTable = activeTable;
					jsk.execute( function () {
						var tempVerticalLines = tempTable.getVerticalLines();
						tempTable.setVerticalLines(tempVls);
						tempTable.render();
						return {
							"verticalLines": tempVerticalLines ,"currentVerticalLines": tempVls,"table": tempTable
						};
					}, function (data) {
						tempVls = data.currentVerticalLines;
						data.table.setVerticalLines(data.verticalLines);
						data.table.render();
					});
                } else if (message.data.tableFont != null) {
                 	var tempVls = message.data.tableFont;
                 	var tempTable = activeTable;
					jsk.execute( function () {
						var tempTableFont = tempTable.getFontFamily();
						tempTable.setFontFamily(tempVls);
						return {
							"tableFont": tempTableFont ,"currentFontFamily": tempVls,"table": tempTable
						};
					}, function (data) {
						tempVls = data.currentFontFamily;
						data.table.setFontFamily(data.tableFont);
					});
                }
            } else if(message.data.flag == "cell"){
            	if(message.data.bold!=null){
					var tempTable = activeTable;
					var tempActiveSelection = activeSelection.copy();
					var cell = new com.hoperun.node.Cell();
					jsk.execute( function () {
						var bold = 'false';
						if(message.data.bold)
							bold = 'true';
						cell.setFontWeight(bold);
		                tempTable.render(cell,activeSelection);
						return {"activeTable":tempTable,"activeSelection":tempActiveSelection,"bold":message.data.bold};
					}, function (data) {
						var currTable=data.activeTable;
						var currSelection=data.activeSelection;	
						var isBold="bold";
						if(data.bold){
							isBold="";							
						}
						currTable.removeSelection(currSelection.getId());
						var startRow=currSelection.getRow();
						var startCol=currSelection.getCol();
						var endRow=startRow+currSelection.getRowNumber();
						var endCol=startCol+currSelection.getColNumber();
						for(var r=startRow;r<endRow;r++){
							for(var c=startCol;c<endCol;c++){
								currTable.getCell(r,c).setFontWeight(isBold);
							}
						}
						currTable.render();
					});
				}
			else if(message.data.italic!=null){
					var tempTable = activeTable;
					var tempActiveSelection = activeSelection.copy();
					var cell = new com.hoperun.node.Cell();
					jsk.execute( function () {
						var italic = 'false';
						if(message.data.italic)
							italic = 'true';
		                cell.setFontStyle(italic);
		                tempTable.render(cell,activeSelection);
						return {"activeTable":tempTable,"activeSelection":tempActiveSelection,"Italic":message.data.italic};
					}, function (data) {
						var currTable=data.activeTable;
						var currSelection=data.activeSelection;
						var isItalic="italic";
						if(data.Italic){
							isItalic="";
						}
						currTable.removeSelection(currSelection.getId());
						var startRow=currSelection.getRow();
						var startCol=currSelection.getCol();
						var endRow=startRow+currSelection.getRowNumber();
						var endCol=startCol+currSelection.getColNumber();
						for(var r=startRow;r<endRow;r++){
							for(var c=startCol;c<endCol;c++){
								currTable.getCell(r,c).setFontStyle(isItalic);
							}
						}
						currTable.render();
					});
				}
					else if(message.data.underscore!=null){

					var tempTable = activeTable;
					var tempActiveSelection = activeSelection.copy();
					var cell = new com.hoperun.node.Cell();
					jsk.execute( function () {
						var underline = 'false';
						if(message.data.underscore)
							underline = 'true';
		                cell.setUnderline(underline);
		                tempTable.render(cell,activeSelection);
						return {"activeTable":tempTable,"activeSelection":tempActiveSelection,"underscore":message.data.underscore};
					}, function (data) {
						var currTable=data.activeTable;
						var currSelection=data.activeSelection;
						var isunderscore=true;
						if(data.underscore){
							isunderscore=false;
						}
						currTable.removeSelection(currSelection.getId());
						var startRow=currSelection.getRow();
						var startCol=currSelection.getCol();
						var endRow=startRow+currSelection.getRowNumber();
						var endCol=startCol+currSelection.getColNumber();
						for(var r=startRow;r<endRow;r++){
							for(var c=startCol;c<endCol;c++){
								currTable.getCell(r,c).setUnderline(isunderscore);
							}
						}
						currTable.render();
					});
				} else if(message.data.deleteLine!=null){
					var tempTable = activeTable;
					var tempActiveSelection = activeSelection.copy();
					var cell = new com.hoperun.node.Cell();
					jsk.execute( function () {
						var lineThrough = 'false';
						if(message.data.deleteLine)
							lineThrough = 'true';
						cell.setLineThrough(lineThrough);
						tempTable.render(cell,activeSelection);
						return {"activeTable":tempTable,"activeSelection":tempActiveSelection,"deleteLine":message.data.deleteLine};
					}, function (data) {
						var currTable=data.activeTable;
						var currSelection=data.activeSelection;	
						var isdeleteLine=true;
						if(data.deleteLine){
							isdeleteLine=false;
						}
						currTable.removeSelection(currSelection.getId());
						var startRow=currSelection.getRow();
						var startCol=currSelection.getCol();
						var endRow=startRow+currSelection.getRowNumber();
						var endCol=startCol+currSelection.getColNumber();
						for(var r=startRow;r<endRow;r++){
							for(var c=startCol;c<endCol;c++){
								currTable.getCell(r,c).setLineThrough(isdeleteLine);
							}
						}
						currTable.render();
					}); 
				} else if(message.data.textSize!=null){
					var tempTable = activeTable;
					var tempActiveSelection = activeSelection.copy();
					var cell = new com.hoperun.node.Cell();
					var getTextSize = function(currTable, currSelection){
	            		var textSize;
	            		currTable.removeSelection(currSelection.getId());
	            		var startRow=currSelection.getRow();
	            		var startCol=currSelection.getCol();
	            		var endRow=startRow+currSelection.getRowNumber();
	            		var endCol=startCol+currSelection.getColNumber();
	            		for(var r=startRow;r<endRow;r++){
	            			for(var c=startCol;c<endCol;c++){
	            				if(currTable.getCell(r,c).getFontSize()){
	            					textSize = currTable.getCell(r,c).getFontSize();
	            					break;
	            				}else{
	            					textSize = '12';
	            				}
	            			}
	            		}
	            		
	            		return textSize;
	            	};
	            	var textSize = getTextSize(tempTable, activeSelection);
					jsk.execute( function () {
						cell.setFontSize(message.data.textSize);
						tempTable.render(cell,activeSelection);
						return {"activeTable":tempTable,"activeSelection":tempActiveSelection,"textSize":textSize};
					}, function (data) {
						cell.setFontSize(data.textSize);
						data.activeTable.render(cell,data.activeSelection);
					});
				} else if(message.data.textColor!=null){
					var tempTable = activeTable;
					var tempActiveSelection = activeSelection.copy();
					var cell = new com.hoperun.node.Cell();
					var getTextColor = function(currTable, currSelection){
	            		var textColor;
	            		currTable.removeSelection(currSelection.getId());
	            		var startRow=currSelection.getRow();
	            		var startCol=currSelection.getCol();
	            		var endRow=startRow+currSelection.getRowNumber();
	            		var endCol=startCol+currSelection.getColNumber();
	            		for(var r=startRow;r<endRow;r++){
	            			for(var c=startCol;c<endCol;c++){
	            				if(currTable.getCell(r,c).getColor()){
	            					textColor = currTable.getCell(r,c).getColor();
	            					break;
	            				}else{
	            					textColor = '000000';
	            				}
	            			}
	            		}
	            		
	            		return textColor;
	            	};
	            	var textColor = getTextColor(tempTable, activeSelection);
					jsk.execute( function () {
						cell.setColor(message.data.textColor);
						tempTable.render(cell,activeSelection);
						return {"activeTable":tempTable,"activeSelection":tempActiveSelection,"textColor":textColor};
					}, function (data) {
						cell.setColor(data.textColor);
						data.activeTable.render(cell,data.activeSelection);
					});
				} else if(message.data.textFont!=null){
					var tempTable = activeTable;
					var tempActiveSelection = activeSelection.copy();
					var cell = new com.hoperun.node.Cell();
					var getFontFamily = function(currTable, currSelection){
	            		var fontFamily;
	            		currTable.removeSelection(currSelection.getId());
	            		var startRow=currSelection.getRow();
	            		var startCol=currSelection.getCol();
	            		var endRow=startRow+currSelection.getRowNumber();
	            		var endCol=startCol+currSelection.getColNumber();
	            		for(var r=startRow;r<endRow;r++){
	            			for(var c=startCol;c<endCol;c++){
	            				if(currTable.getCell(r,c).getFontFamily()){
	            					fontFamily = currTable.getCell(r,c).getFontFamily();
	            					break;
	            				}else{
	            					fontFamily = null;
	            				}
	            			}
	            		}
	            		
	            		return fontFamily;
	            	};
	            	var fontFamily = getFontFamily(tempTable, activeSelection);
					jsk.execute( function () {
						cell.setFontFamily(message.data.textFont);
						tempTable.render(cell,activeSelection);
						return {"activeTable":tempTable,"activeSelection":tempActiveSelection,"fontFamily":fontFamily};
					}, function (data) {
						cell.setFontFamily(data.fontFamily);
						data.activeTable.render(cell,data.activeSelection);
					});
				} else if(message.data.wrapTextInCell!=null){
					var tempTable = activeTable;
					var tempActiveSelection = activeSelection.copy();
					var cell = new com.hoperun.node.Cell();
					jsk.execute( function () {
						cell.setWrapText(message.data.wrapTextInCell);
						tempTable.render(cell,activeSelection);
						return {"activeTable":tempTable,"activeSelection":tempActiveSelection,"wrapTextInCell":message.data.wrapTextInCell};
					}, function (data) {
						var currTable=data.activeTable;
						var currSelection=data.activeSelection;
						var iswrapText=true;
						if(data.wrapTextInCell){
							iswrapText=false;
						}
						currTable.removeSelection(currSelection.getId());
						var startRow=currSelection.getRow();
						var startCol=currSelection.getCol();
						var endRow=startRow+currSelection.getRowNumber();
						var endCol=startCol+currSelection.getColNumber();
						for(var r=startRow;r<endRow;r++){
							for(var c=startCol;c<endCol;c++){
								currTable.getCell(r,c).setWrapText(iswrapText);
							}
						}
						currTable.render();
					});
				}else if(message.data.horizontalAlign){
					var tempTable = activeTable;
					var tempActiveSelection = activeSelection.copy();
					var cell = new com.hoperun.node.Cell();
					var getHorizontalAlign = function(currTable, currSelection){
	            		var horizontalAlign;
	            		currTable.removeSelection(currSelection.getId());
	            		var startRow=currSelection.getRow();
	            		var startCol=currSelection.getCol();
	            		var endRow=startRow+currSelection.getRowNumber();
	            		var endCol=startCol+currSelection.getColNumber();
	            		for(var r=startRow;r<endRow;r++){
	            			for(var c=startCol;c<endCol;c++){
	            				if(currTable.getCell(r,c).getTextAlign()){
	            					horizontalAlign = currTable.getCell(r,c).getTextAlign();
	            					break;
	            				}else{
	            					horizontalAlign = null;
	            				}
	            			}
	            		}
	            		return horizontalAlign;
	            	};
	            	var horizontalAlign = getHorizontalAlign(tempTable, activeSelection);
					jsk.execute( function () {
						cell.setTextAlign(message.data.horizontalAlign);
						tempTable.render(cell,activeSelection);
						return {"activeTable":tempTable,"activeSelection":tempActiveSelection,"horizontalAlign":horizontalAlign};
					}, function (data) {
						cell.setTextAlign(data.horizontalAlign);
						data.activeTable.render(cell,data.activeSelection);
					}); 
				}
            }
//				}else if(message.data.verticalAlignTop!=null){
//					//alert("message.data.verticalAlignTop :"+message.data.verticalAlignTop);
//				}else if(message.data.verticalAlignCenter!=null){
//					//alert("message.data.verticalAlignCenter :"+message.data.verticalAlignCenter);
//				}else if(message.data.verticalAlignDown!=null){
//					//alert("message.data.verticalAlignDown :"+message.data.verticalAlignDown);
//	            }
   //         }
        
        };//end of define
        this.update = function (message) {
            switch (message.id) {
                case com.hoperun.util.Observer.MessageType.CONTEXT_BLUR:
                    activeTable = null;
                    break;
                case com.hoperun.util.Observer.MessageType.TABLE_FOCUS:
                    activeTable = message.sender;
                    break;
                default:
                    if (activeTable != null) {
                        switch (message.id) {
                            case com.hoperun.util.Observer.MessageType.CELL_STYLE:
                                var styleData = message.data;
                                break;
                            case com.hoperun.util.Observer.MessageType.CELL_CHANGED:
                                this.handleCellStyle(message);
                                break;
                        }
                    }
                    break;
            }
        };//end of update
    };

    com.hoperun.event.CellFunctionListener = function () {
        var setFunctionModel = false;
        this.update = function (message) {
            switch (message.id) {
                case com.hoperun.util.Observer.MessageType.CELL_ADDFUNCTION:
                    if (message.data) {//finished
                        setFunctionModel = false;
                        jsk.execute( function () {
                        	var oldFunctions=message.sender.getFunctions();
                        message.sender.setFunctions(message.data.newFunctions);
    						return {
    							"oldFunctions": oldFunctions
    						};
    					}, function (data) {
    						message.sender.setFunctions(data.oldFunctions);
    					});
                    } else {
                        setFunctionModel = true;
                    }
                    break;
                case com.hoperun.util.Observer.MessageType.CELL_CLICK:
                    if (setFunctionModel) {
                        sheet_editFunction(message.sender); //commonDiv_CellFunction.js
                    }else{
                        com.hoperun.util.BaseTool.closeMenuPopup();
                    }
                    break;
                case com.hoperun.util.Observer.MessageType.CONTEXT_BLUR:       
                    if (setFunctionModel) {       
                        setFunctionModel = false;
                        sheet_cancelEditFunction();
                    }       
                    break;       
            }
        };
    };
    
    com.hoperun.event.CellEditListener = function () {
    	
        var tempCellArray = [];
        var rowColNum = [];// 复制区域的跨越的行列数
        var selectionIdArray = [];//
        this.update = function (message) {
        	var currTable = document.getElementById(message.sender.getId()).parentNode;
			var activeTableObj = getActiveContainer().getTableObjById(currTable.getAttribute('id'));
			var activeSelection = activeTableObj.getActiveSelection();
			
        	switch (message.id) {
        		case com.hoperun.util.Observer.MessageType.CELL_CUT:
//        			tempCellArray = [];
//        			rowColNum = [];
//        			rowColNum.push(activeSelection.getRowNumber());
//        			rowColNum.push(activeSelection.getColNumber());
//        			
//        			copyCellValue(activeSelection,activeTableObj,tempCellArray);
//        			// cut，undo时把选中的cell粘贴回去
//        			var oldCellArray = getSelectionCell(activeTableObj,activeSelection);
        			var currentActiveTable = activeTableObj;
        			var currentActiveSelection = activeSelection;
        			jsk.execute(
    					function() {
    						tempCellArray = [];
    	        			rowColNum = [];
    	        			rowColNum.push(currentActiveSelection.getRowNumber());
    	        			rowColNum.push(currentActiveSelection.getColNumber());
    	        			
    	        			copyCellValue(currentActiveSelection,currentActiveTable,tempCellArray);
    	        			// cut，undo时把选中的cell粘贴回去
    	        			var oldCellArray = getSelectionCell(currentActiveTable,currentActiveSelection);
    	        			selectionIdArray = deleteCell(currentActiveTable,currentActiveSelection);
    						return {'table':currentActiveTable,'activeSelection':currentActiveSelection,'oldCellArray':oldCellArray
    							,'selectionIdArray':selectionIdArray};
    					},
    					function(data) {
    						var currentTable = data.table;
    						var currentSecition = data.activeSelection; 
    						var oldCellArray = data.oldCellArray;
    						// 行列不足时不建行和列,后一个是粘贴公式(true)
    						//pasteCellValue(currentSecition,currentTable,oldCellArray,false);
    						//pasteCells(currentSecition,currentTable,oldCellArray,false,true);
    						pasteCellOnlyCellValue(currentSecition,currentTable,oldCellArray,false,true);
    						// TODO
    						var removeSelectionIsArray = data.selectionIdArray;
    						for(var i = 0;i < removeSelectionIsArray.length;i++){
    							currentTable.removeSelection(removeSelectionIsArray[i]);
    						}
    						//activeTableObj.setStyle();
    						currentTable.setCellStyle();
    					}
    				);
        			break;
        		case com.hoperun.util.Observer.MessageType.CELL_COPY:
        			tempCellArray = [];
        			rowColNum = [];
        			rowColNum.push(activeSelection.getRowNumber());
        			rowColNum.push(activeSelection.getColNumber());
        			copyCellValue(activeSelection,activeTableObj,tempCellArray);
        			break;
				case com.hoperun.util.Observer.MessageType.CELL_DELETE:
//					var oldCellArray = getSelectionCell(activeTableObj,activeSelection);
					var currentActiveTable = activeTableObj;
        			var currentActiveSelection = activeSelection;
					jsk.execute(
	    				function() {
	    					var oldCellArray = getSelectionCell(currentActiveTable,currentActiveSelection);
	    					selectionIdArray = deleteCell(currentActiveTable,currentActiveSelection);
	    					return {'table':currentActiveTable,'activeSelection':currentActiveSelection,'oldCellArray':oldCellArray
	    						,'selectionIdArray':selectionIdArray};
	    				},
	    				function(data) {
	    					var currentTable = data.table;
    						var currentSecition = data.activeSelection;
    						var oldCellArray = data.oldCellArray;
    						// 行列不足时不建行和列,后一个是粘贴公式(true)
    						//pasteCellValue(currentSecition,currentTable,oldCellArray,false);
//    						pasteCells(currentSecition,currentTable,oldCellArray,false,true);
    						pasteCellOnlyCellValue(currentSecition,currentTable,oldCellArray,false,true);
    						// TODO
    						var removeSelectionIsArray = data.selectionIdArray;
    						for(var i = 0;i < removeSelectionIsArray.length;i++){
    							currentTable.removeSelection(removeSelectionIsArray[i]);
    						}
    						//activeTableObj.setStyle();
    						currentTable.setCellStyle();
	    				}
    				);
				    break;
				case com.hoperun.util.Observer.MessageType.CELL_PASTE:
					
//					// 粘贴前的单元格
//					activeSelection.setRowNumber(rowColNum[0]);
//                	activeSelection.setColNumber(rowColNum[1]);
//					var oldCellArray = getSelectionCell(activeTableObj,activeSelection);
					var currentActiveTable = activeTableObj;
        			var currentActiveSelection = activeSelection;
        			var currentTempCellArray = tempCellArray;
        			var currentRowColNum = rowColNum;
					
					// 弹出菜单不用undo,redo
					var hasFunction = false;
                	for (var i = 0;i < currentTempCellArray.length;i++){
                		var cell = currentTempCellArray[i];
                		var cellFun = cell.getFunctions();
                		if(cellFun != null){
                			hasFunction = true;
                			break;
                		}
                	}
                	if(hasFunction == true){
                		shortCutMenuForCellPaste(message.sender);
                		return;
                	}
					var redo=function(){
						// 粘贴前的单元格
						currentActiveSelection.setRowNumber(currentRowColNum[0]);
						currentActiveSelection.setColNumber(currentRowColNum[1]);
						var oldCellArray = getSelectionCell(currentActiveTable,currentActiveSelection);
						var addRowCols = [];
						if(hasFunction == false){
							// 行列不足时新建行和列,后一个是不粘贴公式(false)
		                	addRowCols = pasteCells(currentActiveSelection,currentActiveTable,currentTempCellArray,true,false);
						}
						selectionIdArray = addRowCols.slice(2);
						//alert(selectionIdArray.length);
						return {'addRow':addRowCols[0],'addCol':addRowCols[1],'table':currentActiveTable,
							'activeSelection':currentActiveSelection,'hasFunction':hasFunction,'oldCellArray':oldCellArray
							,'selectionIdArray':selectionIdArray};
					};
					
					var undo=function(data){
						if(data.hasFunction == false){
							var currentTable = data.table;
							var currentSecition = data.activeSelection; 
							var oldCellArray = data.oldCellArray;
							var delRows = data.addRow;
							for(var i = 0;i < delRows;i++){
								currentTable.deleteRow(currentTable.getRows());
							}
							
							var delCols = data.addCol;
							for(var j = 0;j < delCols;j++){
								currentTable.deleteCol(currentTable.getCols());
							}
							// 行列不足时不建行和列,后一个是粘贴公式(true)
							//pasteCellValue(currentSecition,currentTable,oldCellArray,false);
							//pasteCells(currentSecition,currentTable,oldCellArray,false,true);
							pasteCellOnlyCellValue(currentSecition,currentTable,oldCellArray,false,true);
    						// TODO
    						var removeSelectionIsArray = data.selectionIdArray;
    						for(var k = 0;k < removeSelectionIsArray.length;k++){
    							//console.info(removeSelectionIsArray[k].toJSON());
    							currentTable.removeSelection(removeSelectionIsArray[k]);
    						}
    						//activeTableObj.setStyle();
    						currentTable.setCellStyle();
						}
					};
					//redo;
					jsk.execute(redo,undo);
					break;
				case com.hoperun.util.Observer.MessageType.CELL_FORMULAS:
					
					var currentActiveTable = activeTableObj;
        			var currentActiveSelection = activeSelection;
        			var currentTempCellArray = tempCellArray;
        			var currentRowColNum = rowColNum;
        			
//					activeSelection.setRowNumber(rowColNum[0]);
//                	activeSelection.setColNumber(rowColNum[1]);
//                	var oldCellArray = getSelectionCell(activeTableObj,activeSelection);
                	jsk.execute(
        				function() {
        					currentActiveSelection.setRowNumber(currentRowColNum[0]);
        					currentActiveSelection.setColNumber(currentRowColNum[1]);
                        	var oldCellArray = getSelectionCell(currentActiveTable,currentActiveSelection);
        					var addRowCols = [];
        					addRowCols = pasteCells(currentActiveSelection,currentActiveTable,currentTempCellArray,true,true);
        					selectionIdArray = addRowCols.slice(2);
        					return {'addRow':addRowCols[0],'addCol':addRowCols[1],'table':currentActiveTable,
        						'activeSelection':currentActiveSelection,'oldCellArray':oldCellArray
        						,'selectionIdArray':selectionIdArray};
        				},
    					function(data) {
        					var currentTable = data.table;
    						var currentSecition = data.activeSelection; 
    						var oldCellArray = data.oldCellArray;
    						var delRows = data.addRow;
    						for(var i = 0;i < delRows;i++){
    							currentTable.deleteRow(currentTable.getRows());// TODO
    						}
    						
    						var delCols = data.addCol;
    						for(var j = 0;j < delCols;j++){
    							currentTable.deleteCol(currentTable.getCols());
    						}
    						//pasteCells(currentSecition,currentTable,oldCellArray,false,true);
    						pasteCellOnlyCellValue(currentSecition,currentTable,oldCellArray,false,true);
    						// TODO
    						var removeSelectionIsArray = data.selectionIdArray;
    						for(var k = 0;k < removeSelectionIsArray.length;k++){
    							//console.info(removeSelectionIsArray[k].toJSON());
    							currentTable.removeSelection(removeSelectionIsArray[k]);
    						}
    						//activeTableObj.setStyle();
    						currentTable.setCellStyle();
        				}
    				);	
					break;
				case com.hoperun.util.Observer.MessageType.CELL_VALUES:
//					activeSelection.setRowNumber(rowColNum[0]);
//                	activeSelection.setColNumber(rowColNum[1]);
//                	var oldCellArray = getSelectionCell(activeTableObj,activeSelection);
					var currentActiveTable = activeTableObj;
        			var currentActiveSelection = activeSelection;
        			var currentTempCellArray = tempCellArray;
        			var currentRowColNum = rowColNum;
					
                	jsk.execute(
    					function() {
    						currentActiveSelection.setRowNumber(currentRowColNum[0]);
    						currentActiveSelection.setColNumber(currentRowColNum[1]);
    	                	var oldCellArray = getSelectionCell(currentActiveTable,currentActiveSelection);
    						var addRowCols = [];
    						addRowCols = pasteCells(currentActiveSelection,currentActiveTable,currentTempCellArray,true,false);
    						selectionIdArray = addRowCols.slice(2);
    						return {'addRow':addRowCols[0],'addCol':addRowCols[1],'table':currentActiveTable,'activeSelection':currentActiveSelection
    							,'oldCellArray':oldCellArray
    							,'selectionIdArray':selectionIdArray};
    					},
    					function(data) {
    						var currentTable = data.table;
    						var currentSecition = data.activeSelection; 
    						var oldCellArray = data.oldCellArray;
    						var delRows = data.addRow;
    						for(var i = 0;i < delRows;i++){
    							currentTable.deleteRow(currentTable.getRows());
    						}
    						
    						var delCols = data.addCol;
    						for(var j = 0;j < delCols;j++){
    							currentTable.deleteCol(currentTable.getCols());
    						}
    						// 行列不足时不建行和列
//    						pasteCellValue(currentSecition,currentTable,oldCellArray,false);
    						//pasteCells(currentSecition,currentTable,oldCellArray,false,true);
    						pasteCellOnlyCellValue(currentSecition,currentTable,oldCellArray,false,true);
    						// TODO
    						var removeSelectionIsArray = data.selectionIdArray;
    						for(var k = 0;k < removeSelectionIsArray.length;k++){
    							currentTable.removeSelection(removeSelectionIsArray[k]);
    						}
    						//activeTableObj.setStyle();
    						currentTable.setCellStyle();
    					}
    				);
					break;
        	}
        };
    };

	var cellStyleListener = new com.hoperun.event.CellStyleListener();
	//com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.CONTEXT_BLUR, cellStyleListener);
	com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.TABLE_FOCUS, cellStyleListener);
	com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.CELL_STYLE, cellStyleListener);
	com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.CELL_CHANGED, cellStyleListener);
	//sunwei
	var cellEditListener = new com.hoperun.event.CellEditListener();
	com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.CELL_CUT, cellEditListener);
	com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.CELL_COPY, cellEditListener);
	com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.CELL_DELETE, cellEditListener);
	com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.CELL_PASTE, cellEditListener);
	com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.CELL_FORMULAS, cellEditListener);
	com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.CELL_VALUES, cellEditListener);

    com.hoperun.util.Observer.register(
			com.hoperun.util.Observer.MessageType.CELL_CLICK,
			new com.hoperun.event.CellListener());
    com.hoperun.util.Observer.register(
			com.hoperun.util.Observer.MessageType.CELL_DBLCLICK,
			new com.hoperun.event.CellListener());



    var cellFunctionListener = new com.hoperun.event.CellFunctionListener();
    com.hoperun.util.Observer.register(
			com.hoperun.util.Observer.MessageType.CELL_ADDFUNCTION, cellFunctionListener
			);
    com.hoperun.util.Observer.register(
			com.hoperun.util.Observer.MessageType.CELL_CLICK, cellFunctionListener
			);
    com.hoperun.util.Observer.register(
			com.hoperun.util.Observer.MessageType.CONTEXT_BLUR, cellFunctionListener
			);    
}