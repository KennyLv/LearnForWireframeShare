function sheet_popuShortCutMenu(cell) {
    //get the position of table
    var currTable = document.getElementById(cell.getId()).parentNode;
    var tablePosition = com.kenny.util.BaseTool.getAbsPostion(currTable);
    var tableWidth = com.kenny.util.BaseTool.convertPixelToNumber(com.kenny.util.BaseTool.findObjWithId(currTable.getAttribute('id')).getWidth());
    var scrollTop =0;
    var scrollLeft = 0;
    var data;
    if (currDocType == "sheet") {
        data = [
        { Title: 'Cut', command: 'Cut' },
        { Title: 'Copy', command: 'Copy' },
        { Title: 'Delete', command: 'Delete' },
        { Title: 'Paste', command: 'Paste' }
        ];
        scrollTop =$("#myContent").scrollTop();//sheet        
    } else {
        data = [
        { Title: 'Cut', command: 'Cut' },
        { Title: 'Copy', command: 'Copy' },
        { Title: 'Delete', command: 'Delete' },
        { Title: 'Paste', command: 'Paste' }
        ];
        if(currDocType == "paper"){
	        scrollTop =$("#myContent").scrollTop();
	        scrollLeft = $("#myContent").scrollLeft()+$(".content-area").scrollLeft();//paper
        }else{
	        scrollTop =$("#myContent").scrollTop()+$(".menu_edit_form").scrollTop();
	        scrollLeft = $("#myContent").scrollLeft()+$(".menu_edit_form").scrollLeft();//slide
        }
        //alert(currDocType+":"+scrollLeft);
    }
    $('#popup-menu-shortCut').css('display', 'none');
    $('#popup-menu-shortCut').empty();

    var html = '<div id="shortCutMenu">';
    for (var n = 0; n < data.length; n++) {
        html += '<div command="' + data[n].command + '" class="shortCutMenu_normal"><span class="button-text">' + data[n].Title + '</span></div>';
    }
    html += '</div>'; //<img src="images/shortCutMenu_LeftArrow.png" class="shortCutMenu_img"/>
    $('#popup-menu-shortCut').append(html);
    $('#popup-menu-shortCut').css('width',data.length * 60);

    //alert($('#shortCutMenu div:first-child').attr('command'));
    $('#shortCutMenu div:first-child').addClass('shortCutMenu_left');
    $('#shortCutMenu div:last-child').addClass('shortCutMenu_right');
    com.kenny.util.BaseTool.showMenuShadow();
    
    var shortCutMenuLeft = 0;
    var shortCutMenuTop=0;

    if ((tablePosition.x - (data.length * 50 - tableWidth) / 2) < 0) {
        shortCutMenuLeft = 0;
    } else if ((tablePosition.x + tableWidth + (data.length * 50 - tableWidth) / 2) > 1330) {
        shortCutMenuLeft = tablePosition.x - (data.length * 50 - tableWidth) - 30-scrollLeft;
    } else {
        shortCutMenuLeft = tablePosition.x - (data.length * 50 - tableWidth) / 2 - 15-scrollLeft;
    }
    shortCutMenuTop=tablePosition.y - 32 - scrollTop;

   // $("#popup-menu-shortCut").css("top", shortCutMenuTop).css("left", shortCutMenuLeft).css('display', 'block');
    
   // console.log("shortCutMenuLeft= tablePosition.x("+tablePosition.x+") - (data.length("+data.length+") * 50 - tableWidth("+tableWidth+"))");
   // console.log("shortCutMenuTop=tablePosition.y("+tablePosition.y+") - 32 ");
    
    
    $(".shortCutMenu_normal").click(function () {
    	com.kenny.util.BaseTool.closeMenuPopup();
        var command = $(this).attr('command');
        //alert(command);
        var message = new com.kenny.util.Observer.Message();
        switch (command) {
            case 'Cut':
                message.id = com.kenny.util.Observer.MessageType.CELL_CUT;
                message.sender = cell;
                com.kenny.util.Observer.sendMessage(message);
                break;
            case 'Copy':
                message.id = com.kenny.util.Observer.MessageType.CELL_COPY;
                message.sender = cell;
                com.kenny.util.Observer.sendMessage(message);
                break;
            case 'Delete':
                message.id = com.kenny.util.Observer.MessageType.CELL_DELETE;
                message.sender = cell;
                com.kenny.util.Observer.sendMessage(message);
                break;
            case 'Paste':
                message.id = com.kenny.util.Observer.MessageType.CELL_PASTE;
                message.sender = cell;
                com.kenny.util.Observer.sendMessage(message);
                break;
            //            case 'Fill': 
            //                message.id = com.kenny.util.Observer.MessageType.CELL_FILL; 
            //                message.sender = cell; 
            //                com.kenny.util.Observer.sendMessage(message); 
            //                break; 
        }
    });
};

function sheet_editFunctionMenu(cell) {
    if (currDocType != "sheet") {
        return;
    }
    currentEditCell = cell;
    //get the position of table
    var currTable = com.kenny.util.BaseTool.findObjWithId(document.getElementById(cell.getId()).parentNode.getAttribute('id'));
    var tablePosition = com.kenny.util.BaseTool.getAbsPostion(currTable.getDomInstance());
    var tableWidth = com.kenny.util.BaseTool.convertPixelToNumber(currTable.getWidth());
    var scrollTop = 0;
    var data = [
        { Title: 'Add Function', command: 'function' }
        ];
    $('#popup-menu-shortCut').css('display', 'none');
    $('#popup-menu-shortCut').empty();

    var html = '<div id="shortCutMenu">';
    for (var n = 0; n < data.length; n++) {
        html += '<div command="' + data[n].command + '" class="shortCutMenu_normal" style="width:120px;"><span class="button-text">' + data[n].Title + '</span></div>';
    }
    html += '</div>'; //<img src="images/shortCutMenu_LeftArrow.png" class="shortCutMenu_img"/>
    $('#popup-menu-shortCut').append(html);

    //alert($('#shortCutMenu div:first-child').attr('command'));
    $('#shortCutMenu div:first-child').addClass('shortCutMenu_both');
    //$('#shortCutMenu div:last-child').addClass('shortCutMenu_right');
    
    com.kenny.util.BaseTool.showMenuShadow();

    var shortCutMenuLeft = 0;

    if ((tablePosition.x - (data.length * 50 - tableWidth) / 2) < 0) {
        shortCutMenuLeft = 0;
    } else if ((tablePosition.x + tableWidth + (data.length * 50 - tableWidth) / 2) > 1330) {
        shortCutMenuLeft = tablePosition.x - (data.length * 50 - tableWidth) - 30;
    } else {
        shortCutMenuLeft = tablePosition.x - (data.length * 50 - tableWidth) / 2 - 15;
    }
    $("#popup-menu-shortCut").css("top", tablePosition.y - 32 - scrollTop).css("left", shortCutMenuLeft).css('display', 'block');

    $(".shortCutMenu_normal").click(function () {
        com.kenny.util.BaseTool.closeMenuPopup();
        
        $("#popup-menu-cellFunctionBar").css("top", tablePosition.y - 50 - scrollTop).css('display', 'block');
        if ((tablePosition.x + tableWidth) > 910 && tablePosition.x < 400) {
            //$("#popup-menu-cellFunctionPannel").css("top", tablePosition.y - 30 - scrollTop).css("left", 880).css('display', 'block');
            $("#popup-menu-cellFunctionPannel").css("top", tablePosition.y - 30 - scrollTop).css("left", 880).css('display', 'none');
        } else if ((tablePosition.x + tableWidth) > 910 && tablePosition.x > 400) {
            //$("#popup-menu-cellFunctionPannel").css("top", tablePosition.y - 30 - scrollTop).css("left", tablePosition.x - 220).css('display', 'block');
            $("#popup-menu-cellFunctionPannel").css("top", tablePosition.y - 30 - scrollTop).css("left", tablePosition.x - 220).css('display', 'none');
        } else {
            //$("#popup-menu-cellFunctionPannel").css("top", tablePosition.y - 30 - scrollTop).css("left", tablePosition.x + 30 + tableWidth).css('display', 'block');
            $("#popup-menu-cellFunctionPannel").css("top", tablePosition.y - 30 - scrollTop).css("left", tablePosition.x + 30 + tableWidth).css('display', 'none');
        }
        var cellFunction = currentEditCell.getFunctions();
        if (cellFunction != null) {
            //
            var cellRegExp = new RegExp("[a-zA-Z]{1,20}[0-9]{1,20}", "g"); //
            var cells = cellFunction.match(cellRegExp);
            if (cells != null) {
                for (var i = 0; i < cells.length; i++) {
                    //console.log("CELL" + i.toString() + ":  " + cells[i]);
                    //var index = cells[i].indexOf('-');
                    //var row = parseInt(cells[i].substring(1, index));
                    //var col = parseInt(cells[i].substring(index + 1, cells[i].length - 1));
                    var index = cells[i].search("[0-9]");
                    var col = com.kenny.util.BaseTool.CellIndex_StrToNum(cells[i].substring(0, index));
                    var row = parseInt(cells[i].substring(index, cells[i].length));
                    if (currTable.getCellsByRowAndColNo(row, col) == null) {
                        //Replace with value
                        cellFunction = cellFunction.replace(cells[i], '#NullRef(' + cells[i] + ')');
                    }
                }
            }
            //        
            $("#function_inputValue").val(cellFunction.replace(new RegExp("\"\"", "g"), "\""));
        }
        $("#function_inputValue").focus();
        var message = new com.kenny.util.Observer.Message();
        message.id = com.kenny.util.Observer.MessageType.CELL_ADDFUNCTION;
        message.sender = currentEditCell;
        com.kenny.util.Observer.sendMessage(message);
    });
}


function slide_popuShortCutMenu(e, slide) {
	var showName = slide.getTransitions();
	if(showName == null){
		showName = 'None';
	} else {
		var nameArray = showName.split(' ');
		for(var j =0;j < nameArray.length;j++ ){
			var firstChar = nameArray[j].charAt(0).toUpperCase();
		    var newStr = firstChar + nameArray[j].substr(1);
		    nameArray[j] = newStr;
		}
		showName = nameArray.join(' ').trim();
	}
    com.kenny.util.BaseTool.closeMenuPopup();
    var data;
    if (this.addingAnimation) {
        data = [
        { Title: showName, command: '' },
        { Title: 'ADD', command: 'Add' }
        ];
    } else {
        data = [
        { Title: 'Cut', command: 'Cut' },
        { Title: 'Copy', command: 'Copy' },
        { Title: 'Delete', command: 'Delete' },
        { Title: 'Paste', command: 'Paste' },
        { Title: 'Skip', command: 'Skip' }
        ];
    }

    $('#popup-menu-shortCut').css('display', 'none');
    $('#popup-menu-shortCut').empty();

    var html = '<div id="shortCutMenu"><img src="images/shortCutMenu_LeftArrow.png" class="shortCutMenu_img"/>';
    for (var n = 0; n < data.length; n++) {
        html += '<div command="' + data[n].command + '" class="shortCutMenu_normal"><span class="button-text">' + data[n].Title + '</span></div>';
    }
    html += '</div>';
    $('#popup-menu-shortCut').append(html);

    //alert($('#shortCutMenu div:first-child').attr('command'));
    $('#shortCutMenu div:first-child').addClass('shortCutMenu_left');
    $('#shortCutMenu div:last-child').addClass('shortCutMenu_right');

    com.kenny.util.BaseTool.showMenuShadow();
    $("#popup-menu-shortCut").css("top", e.pageY - 10).css("left", e.pageX + 10).css('display', 'block');

    $(".shortCutMenu_normal").click(function () {
        com.kenny.util.BaseTool.closeMenuPopup();
        var command = $(this).attr('command');
        var message = new com.kenny.util.Observer.Message();
        switch (command) {
        	case 'Cut':
        		message.id = com.kenny.util.Observer.MessageType.SLIDE_CUT;
            	message.sender = slide;
        		com.kenny.util.Observer.sendMessage(message);
        		break;
        	case 'Copy':
        		message.id = com.kenny.util.Observer.MessageType.SLIDE_COPY;
            	message.sender = slide;
        		com.kenny.util.Observer.sendMessage(message);
        		break;
            case 'Delete':
            	message.id = com.kenny.util.Observer.MessageType.SLIDE_REMOVE;
            	message.sender = slide;
        		com.kenny.util.Observer.sendMessage(message);
                break;
            case 'Paste':
            	message.id = com.kenny.util.Observer.MessageType.SLIDE_PASTE;
            	message.sender = slide;
        		com.kenny.util.Observer.sendMessage(message);
        		break;
            case 'Add':
            	com.kenny.util.BaseTool.showMenuShadow();
            	
                currentLi = showName;
                $("#menu-text-style-slide > li").each(function (i) {
                	$(this).attr("class","ui-widget-content ui-selectee");
                	var liNm = $(this).text();
                	if (liNm == currentLi) {
                		$(this).attr("class","ui-widget-content ui-selectee ui-selected");
                	}
                });
                
                if (e.pageY < 370) {
                    $("#popup-menu-transition").css("top", e.pageY - 100).css("left", e.pageX + 10).css('display', 'block');
                } else {
                    $("#popup-menu-transition").css("top", e.pageY - 220).css("left", e.pageX + 10).css('display', 'block');
                }

                //sendMessage(com.kenny.util.Observer.MessageType.TEXT_STYLE,
                //        com.kenny.util.BaseTool.findObjWithId(menu._targetId),
                //        data);
                break;
        }
    });
}

function shortCutMenuForCellPaste(cell){
	var data;
//	if(hasFunction){
	data = [
        { Title: 'Paste Formulas', command: 'Paste Formulas' },
        { Title: 'Paste Values', command: 'Paste Values' }
        ];
//	}
	$('#popup-menu-shortCut').css('display', 'none');
    $('#popup-menu-shortCut').empty();
    var html = '<div id="shortCutMenu">';
    for (var n = 0; n < data.length; n++) {
        html += '<div command="' + data[n].command + '" class="shortCutMenu_normal"><span class="button-text">' + data[n].Title + '</span></div>';
    }
    html += '</div>';
    $('#popup-menu-shortCut').append(html);

    $('#shortCutMenu div:first-child').addClass('shortCutMenu_left');
    $('#shortCutMenu div:last-child').addClass('shortCutMenu_right');

    com.kenny.util.BaseTool.showMenuShadow();
    
    var cellPosition = com.kenny.util.BaseTool.getAbsPostion(cell.getDomInstance());
    var width = com.kenny.util.BaseTool.convertPixelToNumber(cell.getWidth());
    var heght = cell.getHeight();//com.kenny.util.BaseTool.convertPixelToNumber(cell.getHeight());
    //alert(heght);
    $("#popup-menu-shortCut").css("top", cellPosition.y - heght - 7).css("left", cellPosition.x).css('display', 'block');
    
    
    $(".shortCutMenu_normal").click(function () {
    	com.kenny.util.BaseTool.closeMenuPopup();
        var command = $(this).attr('command');
        var message = new com.kenny.util.Observer.Message();
        switch (command) {
	        case 'Paste Formulas':
	    		message.id = com.kenny.util.Observer.MessageType.CELL_FORMULAS;
	        	message.sender = cell;
	    		com.kenny.util.Observer.sendMessage(message);
	    		break;
	    	case 'Paste Values':
	    		message.id = com.kenny.util.Observer.MessageType.CELL_VALUES;
	        	message.sender = cell;
	    		com.kenny.util.Observer.sendMessage(message);
	    		break;
        }
    });
}

