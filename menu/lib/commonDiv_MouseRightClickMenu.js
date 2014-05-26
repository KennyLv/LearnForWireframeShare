function mouseRightClickMenu(shape){
	var data = [
	            { Title: 'Cut', command: 'Cut' },
	            { Title: 'Copy', command: 'Copy' },
	            { Title: 'Delete', command: 'Delete' }
	           ];
	$('#shape_rightclick_menu').css('display', 'none');
    $('#shape_rightclick_menu').empty();
	
    var html = '<div id="mouseRightClickMenu"><img src="images/shortCutMenu_LeftArrow.png" class="shortCutMenu_img"/>';
    for (var n = 0; n < data.length; n++) {
        html += '<div command="' + data[n].command + '" class="shortCutMenu_normal"><span class="button-text">' + data[n].Title + '</span></div>';
    }
    html += '</div>';
    $('#shape_rightclick_menu').append(html);
    
    $('#mouseRightClickMenu div:first-child').addClass('shortCutMenu_left');
    $('#mouseRightClickMenu div:last-child').addClass('shortCutMenu_right');

    com.kenny.util.BaseTool.showMenuShadow();
    
	var position = com.kenny.util.BaseTool.getAbsPostion(document.getElementById(shape.getId()));
	var shapeWidth = com.kenny.util.BaseTool.convertPixelToNumber(shape.getWidth());
	var numShapeWidth = Number(position.x) + Number(shapeWidth);
	$("#shape_rightclick_menu").css("top", position.y).css("left", numShapeWidth).css('display', 'block');
	
	 
}