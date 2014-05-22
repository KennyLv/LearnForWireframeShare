function menu_tool_backgroundColor_ready() {
	
	$("#menu_edit_tool").tabs();
	
	// 单独把背景色赋给slide,paper
    $("#menu_edit_tool_option_BackgroundColor_setting .Color_colorDiv_normal").click(
    		function () {
    		    var color = $(this).css('backgroundColor');
    		    var data = { 'color': color };
    		    $("#check_backgound_Color").remove();
    		    $(this).append('<div id="check_backgound_Color" style="border:0px;margin-left:35px;margin-top:15px;">' +
    		    		'<input type="checkbox" disabled="true" checked="true"></div>');
    		    //alert(commend);
    		    //$("#Menu_Edit_img_Style_Color").css('backgroundColor',color);
    		    sendMessage(com.hoperun.util.Observer.MessageType.SLIDE_SET_BACKGROUND,
    		    		currSlide,
    	                data);
    		}
    );

    // 作用同上
    $("#menu_edit_tool_option_BackgroundColor_setting .Color_MultiStylePanel div").click(
    		function () {
    		    var color = $(this).css('backgroundColor');
    		    var data = { 'color': color };
    		    //alert(color);
    		    $("#check_backgound_Color").remove();
    		    $(this).append('<div id="check_backgound_Color" style="border:0px;margin-left:25px;margin-top:95px;">' +
    		    		'<input type="checkbox" disabled="true" checked="true"></div>');
    		    sendMessage(com.hoperun.util.Observer.MessageType.SLIDE_SET_BACKGROUND,
    		    		currSlide,
    	                data);
    		}
    );
	
	commonControl_PageTurnning("menu_edit_tool_option_BackgroundColor_setting");
};