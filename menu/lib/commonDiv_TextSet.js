function commonDiv_TextSet_Ready() {
    $("#Menu_Edit_Text").tabs();
    $("#Menu_Edit_Text_Style_BIU").buttonset();
    $("#Menu_Edit_TextSet_Style_Format").selectable();

    $("#Menu_Edit_Text_List_Around").buttonset();
    $("#Menu_Edit_Text_List_Format").selectable();
	$("#Menu_Edit_Text_Style_Fonts_Group_Format").selectable();
	
    $("#Menu_Edit_Text_Layout_Align").buttonset();
    $("#Menu_Edit_Text_Layout_Columns").buttonset();
	
    $("#Menu_Edit_Text_Style_goColorSet").click(
		function () {
		    $("#Menu_Edit_Text_Style_Text").css('display', 'none');
			$("#Menu_Edit_Text_Style_Fonts_Group").css('display', 'none');
		    $("#Menu_Edit_Text_Style_ColorPanel_Main").css('display', 'block');
		}
	);
	
    $("#Menu_Edit_Text_Style_Color_ColorPanel_Goback_Span").click(
		function () {
		    $("#Menu_Edit_Text_Style_Text").css('display', 'block');
			$("#Menu_Edit_Text_Style_Fonts_Group").css('display', 'none');
		    $("#Menu_Edit_Text_Style_ColorPanel_Main").css('display', 'none');
		}
	);
	
	$("#Menu_Edit_Text_Style_Fonts").click(
		function () {
		    $("#Menu_Edit_Text_Style_Text").css('display', 'none');
			$("#Menu_Edit_Text_Style_Fonts_Group").css('display', 'block');
		    $("#Menu_Edit_Text_Style_ColorPanel_Main").css('display', 'none');
		}
	);
	
	$("#Menu_Edit_Text_Style_Fonts_Group_Goback_Span").click(
		function () {
		    $("#Menu_Edit_Text_Style_Text").css('display', 'block');
			$("#Menu_Edit_Text_Style_Fonts_Group").css('display', 'none');
		    $("#Menu_Edit_Text_Style_ColorPanel_Main").css('display', 'none');
		}
	);
	
	fontSize();
	lineSpacing();
	commonControl_PageTurnning("Menu_Edit_Text_Style_ColorPanel_ChangePage");
    registerButtonListener();
};

function fontSize(){
	for(var i = 9; i <= 70; i++){
		$('#text-style-font-size').append("<option value='"+i+"'>"+i+"</option>");
	};
}

function lineSpacing(){
	for(var i = 2; i <= 20; i++){
		$('#text-style-line-spacing').append("<option value='"+i/4+"'>"+i/4+"</option>");
	};
}

//Temperate added by Feng to invoke text buttons
function registerButtonListener() {
    $('#Menu_Edit_Text_Style_BIU .Text_Style_BIU_Model').click(function () {
    	var pageObj = currentSelectedObj;
        var cmd = $(this).attr('command');
        if (cmd) {
            var checked = $(this).attr('checked');
            checked = checked ? checked == 'checked' : false;
            var style = null;
            switch (cmd) {
                case 'bold':
                    style = { 'bold': checked };
                    break;
                case 'italic':
                	style = { 'italic': checked };
                    break;
                case 'underline':
                	style = { 'textDecoration': checked };
                    break;
                case 'linethrough':
                	style = { 'lineThrough': checked };
                    break;
            }
            sendMessage(com.kenny.util.Observer.MessageType.TEXT_STYLE, pageObj, style);
        }
    });

    //add command here
	$("#Menu_Edit_Text_Style_ColorPanel_ChangePage .Color_colorDiv_normal").click(function () {
		var pageObj = currentSelectedObj;
		var style = { 'color': $(this).css('backgroundColor') };
		$("#Menu_Edit_Text_Style_goColorSet").css('background',$(this).css('backgroundColor'));
		$(".text_color_is_picked").children('img').remove();
        $(this).children(".text_color_is_picked").append('<img src="./images/icon_choosed.png" style="height:13px;width:13px;margin-left:12px;margin-top:4px"/>');
		sendMessage(com.kenny.util.Observer.MessageType.TEXT_STYLE, pageObj, style);
	});
		
	$("#Menu_Edit_Text_Style_Color_SecondColorPanel div").click(function () {
		var pageObj = currentSelectedObj;
		var style = { 'color': $(this).css('backgroundColor') };
		$("#Menu_Edit_Text_Style_goColorSet").css('background',$(this).css('backgroundColor'));
		$(".text_color_is_picked").children('img').remove();
        $(this).children(".text_color_is_picked").append('<img src="./images/icon_choosed.png" style="height:13px;width:13px;margin-left:12px;margin-top:60px"/>');
		sendMessage(com.kenny.util.Observer.MessageType.TEXT_STYLE, pageObj, style);
	});	
		
	$("#Menu_Edit_TextSet_Style_Format .Menu_Edit_Text_Style_Format_ParagraphStyle").click(function () {
		var pageObj = currentSelectedObj;
		var paraStyle = $(this).attr('paraStyle');
		var style = { 'styleFormat': paraStyle };
		$("#Menu_Edit_TextStyleListFormat_is_picked").remove();
	    $(this).children("span").before('<div id="Menu_Edit_TextStyleListFormat_is_picked">' +
	    		'<img src="./images/icon_choosed.png" style="margin-left:-12px;"/></div>');
		sendMessage(com.kenny.util.Observer.MessageType.PARAGRAPH_STYLE, pageObj.getActiveSelection().getFrom(), style);
	});
	
	$("#Menu_Edit_Text_List_Format .Menu_Edit_Text_List_Format_ListStyle").click(function () {
		var pageObj = currentSelectedObj;
		var listStyle = $(this).attr('listStyle');
		var style = { 'listFormat': listStyle };
		$("#textListFormat_is_picked").remove();
	    $(this).children("span").before('<div id="textListFormat_is_picked">' +
	    		'<img src="./images/icon_choosed.png" style="margin-left:-12px;"/></div>');
		sendMessage(com.kenny.util.Observer.MessageType.PARAGRAPH_STYLE, pageObj.getActiveSelection().getFrom(), style);
	});
	
	$("#Menu_Edit_Text_Style_Fonts_Group_Format .Menu_Edit_Text_Style_Fonts_Group_FormatStyle").click(function () {
		var pageObj = currentSelectedObj;
		var fontStyle = $(this).attr('fontStyle');
		var style = { 'fontFamily': fontStyle };
		$("#Menu_Edit_Text_Style_Fonts_goFontsGroup").text(fontStyle+' >');
		$("#Menu_Edit_Text_Style_fontGroupFormat_is_picked").remove();
	    $(this).children("span").before('<div id="Menu_Edit_Text_Style_fontGroupFormat_is_picked" style="float:right;border:0px;margin-right:5px;margin-top:5px;">' +
	    		'<img src="./images/icon_choosed.png" style="height:13px;width:13px;margin-left:-12px;"/></div>');
		sendMessage(com.kenny.util.Observer.MessageType.TEXT_STYLE, pageObj, style);
	});
	
	$("#Menu_Edit_Text_Layout_Align .Menu_Edit_Text_Layout_Align_Model").click(function () {
		var pageObj = currentSelectedObj;
		var paraAlignStyle = $(this).attr('paraAlignStyle');
		//alert('set current paragraph alignment to:'+paraAlignStyle);
		var style = { 'textAlign': paraAlignStyle };
		sendMessage(com.kenny.util.Observer.MessageType.PARAGRAPH_STYLE, pageObj.getActiveSelection().getFrom(), style);
	});
	
	$("#Menu_Edit_Text_Layout_Columns .Menu_Edit_Text_Layout_Columns_Model").click(function () {
		var pageObj = currentSelectedObj;
		var paraColumns = $(this).attr('paraColumns');
		var style = { 'columnStyle': paraColumns };
		sendMessage(com.kenny.util.Observer.MessageType.PARAGRAPH_STYLE, pageObj.getActiveSelection().getFrom(), style);
	});
	
	$("#Menu_Edit_Text_List_Around_Left").click(function () {
		var pageObj = currentSelectedObj;
		var style = { 'indentation': 'left' };
		sendMessage(com.kenny.util.Observer.MessageType.PARAGRAPH_STYLE, pageObj.getActiveSelection().getFrom(), style);
	});
	
	$("#Menu_Edit_Text_List_Around_Right").click(function () {
		var pageObj = currentSelectedObj;
		var style = { 'indentation': 'right' };
		sendMessage(com.kenny.util.Observer.MessageType.PARAGRAPH_STYLE, pageObj.getActiveSelection().getFrom(), style);
	});
	
	$("#text-style-font-size").change(function () {
		var pageObj = currentSelectedObj;
		var textFontSize = $('#text-style-font-size').find('option:selected').text();
		var style = { 'fontSize': textFontSize };
		sendMessage(com.kenny.util.Observer.MessageType.TEXT_STYLE, pageObj, style);
	});
	
	$("#text-style-line-spacing").change(function () {
		var pageObj = currentSelectedObj;
		var textLineSpacing = $('#text-style-line-spacing').find('option:selected').text();
		var style = { 'textLineSpacing': textLineSpacing };
		sendMessage(com.kenny.util.Observer.MessageType.PARAGRAPH_STYLE, pageObj.getActiveSelection().getFrom(), style);
	});
	
};

//Added by Feng for taking a try on text change
function updateTextMenu(style) {
    $('#Menu_Edit_Text_Style_BIU .Text_Style_BIU_Model').each(function () {
        var cmd = $(this).attr('command');
        if (cmd) {
            switch (cmd) {
	            case 'bold':
	                $(this).attr('checked', (style.getBold() ? style.getBold() : false));
	                break;
	            case 'italic':
	                $(this).attr('checked', (style.getItalic() ? style.getItalic() : false));
	                break;
                case 'underline':
                    $(this).attr('checked', style.getTextDecoration() != null && style.getTextDecoration());
                    break;
                case 'linethrough':
                	$(this).attr('checked', style.getLineThrough() != null && style.getLineThrough());
                    break;
            }
            $(this).button("refresh");
        }
    });
	
	$("#Menu_Edit_Text_Style_Fonts_goFontsGroup").each(function () {
		$(this).text(style.getFontFamily()+" >");
	});
	$("#Menu_Edit_Text_Style_fontGroupFormat_is_picked").remove();
	$("#Menu_Edit_Text_Style_Fonts_Group_Format .Menu_Edit_Text_Style_Fonts_Group_FormatStyle").each(function () {
		//$(this).text(currentSelectedObjData.getFontFamily());
		//alert(currentSelectedObjData.getParagraphStyle());
		var fontStyle = $(this).attr('fontStyle');
		if (fontStyle == style.getFontFamily()) {	
			 $(this).children("span").before('<div id="Menu_Edit_Text_Style_fontGroupFormat_is_picked" style="float:right;border:0px;margin-right:5px;margin-top:5px;">' +
			 		'<img src="./images/icon_choosed.png" style="height:13px;width:13px;margin-left:-12px;"/></div>');
		}
	});
	
	$("#Menu_Edit_Text_Style_goColorSet").each(function () {
		$(this).css('background',style.getColor());
	});
	
	$('#text-style-font-size').each(function () {
		$('#text-style-font-size').val(style.getFontSize());
    });
	
};

function initTextMenu(){
	var selection = currentSelectedObj.getActiveSelection();
	var fromObj = selection.getFromObj();
	var toObj = selection.getToObj();
	var selectedColor;
	var $referObj;
	if (fromObj === toObj ){
		selectedColor = $(fromObj).css("color");
		
		$("#Menu_Edit_Text_Style_ColorPanel_ChangePage .Color_colorDiv_normal").each(function(){
			if ($(this).css("backgroundColor") == selectedColor){
				$referObj = $(this);
				$("#Menu_Edit_Text_Style_goColorSet").css('background',selectedColor);
				$(".text_color_is_picked").children('img').remove();
			    $referObj.children(".text_color_is_picked").append('<img src="./images/icon_choosed.png" style="height:13px;width:13px;margin-left:12px;margin-top:4px"/>');
			}
		});
		
		if ($referObj == undefined){
			$("#Menu_Edit_Text_Style_ColorPanel_ChangePage .color_box_text").each(function(){
				if ($(this).css("backgroundColor") == selectedColor){
					$referObj = $(this);
					$("#Menu_Edit_Text_Style_goColorSet").css('background',selectedColor);
					$(".text_color_is_picked").children('img').remove();
				    $referObj.children(".text_color_is_picked").append('<img src="./images/icon_choosed.png" style="height:13px;width:13px;margin-left:12px;margin-top:60px"/>');
				}
			});
		}
	}

}