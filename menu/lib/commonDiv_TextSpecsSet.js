function commonDiv_TextSpecsSet_Ready() {
    $('#Menu_Edit_TextSpecsSet_BIU').buttonset();
    $("#Menu_Edit_TextSpecsSet_Fonts_Group_Format").buttonset();
	$("#Menu_Edit_TextSpecsSet_Fonts_Value").text(checkTextLength($("#Menu_Edit_TextSpecsSet_Fonts_Value").text()));
    
    //UI parts initialize and event register
    $('#Menu_Edit_TextSpecsSet_Fonts').click(function(e){
    	com.kenny.util.BaseTool.showMenuShadow();
		com.kenny.util.BaseTool.formateVeticalFollowingItemPosition($(this), $("#Menu_Edit_TextSpecsSet_Fonts_FontName"));
        $("#Menu_Edit_TextSpecsSet_Fonts_FontName").css('display', 'block');
    });
	  
	$('#Menu_Edit_TextSpecsSet_AlignMent').click(function(e){	
		com.kenny.util.BaseTool.showMenuShadow();
		com.kenny.util.BaseTool.formateVeticalFollowingItemPosition($(this), $("#Menu_Edit_TextSpecsSet_AlignMent_Style_Set"));
        $("#Menu_Edit_TextSpecsSet_AlignMent_Style_Set").css('display', 'block');
	});
	
	$('#Menu_Edit_TextSpecsSet_Color').click(function(e){
		com.kenny.util.BaseTool.showMenuShadow();
		com.kenny.util.BaseTool.formateVeticalFollowingItemPosition($(this), $("#Menu_Edit_TextSpecsSet_Color_StyleSet"));
		$("#Menu_Edit_TextSpecsSet_Color_StyleSet").css('display', 'block');
     //   $("#Menu_Edit_TextSpecsSet_Color_StyleSet").css("top", "40px").css("left", e.pageX   - 110).css('display', 'block');
	});
	
	$('#Menu_Edit_TextSpecsSet_More').click(function(e){	
		com.kenny.util.BaseTool.showMenuShadow();
		com.kenny.util.BaseTool.formateVeticalFollowingItemPosition($(this), $("#Menu_Edit_TextSpecsSet_More_Style"));
		$("#Menu_Edit_TextSpecsSet_More_Style").css('display', 'block');
      //  $("#Menu_Edit_TextSpecsSet_More_Style").css("top", "40px").css("left", e.pageX  -100 ).css('display', 'block');
	});
	
	$('#Menu_Edit_TextSpecsSet_More_Set1_edit_label').click(function(e){
		com.kenny.util.BaseTool.showMenuShadow();
        $("#Menu_Edit_TextSpecsSet_More_Edit").css("top", "30px").css("left", e.pageX  -150 ).css('display', 'block');
	});
	
	
	$('#Menu_Edit_TextSpecsSet_delete').click(function(e){
		com.kenny.util.BaseTool.closeMenuPopup();
		$('#Menu_Edit_TextSpecsSet').hide();
	});
	
	
	registerMenuTextSetListener();
}

//Added by Feng for taking a try on text change
function updateMenuTextStatus(style, paragraphStyleData) {
	//For text's font size
	$('#Menu_Edit_TextSpecsSet_Font_ValueS').text(style.getFontSize());
	
	//For text's font color
	var fontColor = style.getColor() == null ? '#000000' : style.getColor();
	$('#Menu_Edit_TextSpecsSet_Color_StyleSet img').each(function(){
		var obj = $(this);
		var color =  com.kenny.util.BaseTool.rgb2hex(this.style.color);
		if(fontColor == color){
			obj.attr('src', obj.attr('src').replace("_off", "_press"));
			$('#Menu_Edit_TextSpecsSet_Color img').attr('src', obj.attr('src').replace('_press',''));
		}
		else{
			obj.attr('src', obj.attr('src').replace("_press", "_off"));
		}
	});
	
	//For text's font style
	$('#Menu_Edit_TextSpecsSet_BIU .Menu_Edit_TextSpecsSet_Model').each(function () {
    	var cmd = $(this).attr('command');
    	var checked = false;
    	switch (cmd) {
	        case 'bold':
	        	checked = style.getBold() == null ? false : style.getBold();
	            break;
	        case 'italic':
	        	checked = style.getItalic() == null ? false : style.getItalic();
	            break;
	        case 'underline':
	        	checked = style.getTextDecoration() == null ? false : style.getTextDecoration();
	            break;
	        case 'linethrough':
	        	checked = style.getLineThrough() == null ? false : style.getLineThrough();
	            break;
	    }
	    var srcPath = $(this).next('label').children().children().attr('src');
       	var newsrcPath;
	    if(checked){
	    	if(srcPath.indexOf("_off") > 0){
				newsrcPath = srcPath.replace("_off","_on");
			}
       	}else{
       		if(srcPath.indexOf("_on") > 0){
				newsrcPath = srcPath.replace("_on","_off");
			}
       	}
       	$(this).next('label').children().children().attr('src',newsrcPath);
    	$(this).attr('checked', checked);
		$(this).button('refresh');
    });
	
	//For the paragraph's align
	var textAlign = paragraphStyleData.textAlign;
	$('#Menu_Edit_TextSpecsSet_AlignMent_Style_Set .menu-text-align-item').each(function(e){			    
        var cmd = $(this).attr('command');
        var checked = (cmd == textAlign);
        $(this).attr('checked', checked);
        $(this).css('opacity',0.5);
		$(this).button('refresh');
		if(checked){
			$('#Menu_Edit_TextSpecsSet_AlignMent img').attr('src', $(this).attr('src').replace("_on","_off"));
			//$(this).css('backgroundColor','red');
			$(this).css('opacity',1);
		}
	});
			
	//For text's font family
	$("#Menu_Edit_TextSpecsSet_Fonts_Value").text(checkTextLength(style.getFontFamily()));
	$("#fontGroupFormat_is_picked").remove();
	$("#Menu_Edit_TextSpecsSet_Fonts_Group_Format .Menu_Edit_Text_Style_Fonts_Group_FormatStyle").each(function () {
		var fontStyle = $(this).attr('fontStyle');
		if(fontStyle == style.getFontFamily()){
	    	$(this).children("span").before('<div id="fontGroupFormat_is_picked" style="float:right;border:0px;margin-right:25px;margin-top:10px;">' +
	    	      '<img src="./images/icon_choosed.png" style="height:13px;width:13px;"/></div>');
		}
	});
};

//register text style handle listeners
function registerMenuTextSetListener() {
	
	//Handler for text's font size
	$('#Menu_Edit_TextSpecsSet_Font_AddSizeSet, #Menu_Edit_TextSpecsSet_Font_MinusSizeSet').click(function(e){
		com.kenny.util.BaseTool.closeMenuPopup();
		
		var fontSize = parseInt($('#Menu_Edit_TextSpecsSet_Font_ValueS').text());
		if($(this).attr('command') == 'add'){
			fontSize++;
		}
		else{
			fontSize--;
		}
		if(fontSize > 8 && fontSize < 100){
			$('#Menu_Edit_TextSpecsSet_Font_ValueS').text(fontSize);
			var style = { 'fontSize': fontSize };
			//Special case for text boxes
    	    if(currentSelectedObj.getType && currentSelectedObj.getType() == 'TextBox'){
    	    	sendMessage(com.kenny.util.Observer.MessageType.SVG_TEXT_STYLE, currentSelectedObj, style);
    	    }
    	    else{
    	    	sendMessage(com.kenny.util.Observer.MessageType.TEXT_STYLE, currentSelectedObj, style);
    	    }
		}
	});
	
	//Handler for text's font color
	$('#Menu_Edit_TextSpecsSet_Color_StyleSet .Menu_Edit_TextSpecsSet_Color img').click(function(e){
		com.kenny.util.BaseTool.closeMenuPopup();
		
		//Reset image button status
		$('#Menu_Edit_TextSpecsSet_Color_StyleSet img').each(function(){
			var obj = $(this);
			obj.attr('src', obj.attr('src').replace("_press","_off"));
		});
		
		var selObj = $(this);
		var src = selObj.attr('src').replace('_off','_press');
		selObj.attr('src', src);
	    $('#Menu_Edit_TextSpecsSet_Color img').attr('src', src.replace('_press',''));
	    
		if(currentSelectedObj){
			var style = { 'color': selObj.css('color') };
			
			//Special case for text boxes
    	    if(currentSelectedObj.getType && currentSelectedObj.getType() == 'TextBox'){
    	    	sendMessage(com.kenny.util.Observer.MessageType.SVG_TEXT_STYLE, currentSelectedObj, style);
    	    }
    	    else{
    	    	sendMessage(com.kenny.util.Observer.MessageType.TEXT_STYLE, currentSelectedObj, style);
    	    }
		}
	});	
	
	//Handler for text's font style
    $('#Menu_Edit_TextSpecsSet_BIU input').click(function () {
    	com.kenny.util.BaseTool.closeMenuPopup();
    	
    	var cmd = $(this).attr('command');
    	//var imgName = $(this).html(); // .children('img').attr('src');
    	var srcPath = $(this).next('label').children().children().attr('src');
    	var newsrcPath;
    	if(srcPath.indexOf("_off") > 0){
    		newsrcPath = srcPath.replace("_off","_on");
    	}else if(srcPath.indexOf("_on") > 0){
    		newsrcPath = srcPath.replace("_on","_off");
    	}
    	$(this).next('label').children().children().attr('src',newsrcPath);
    	if(currentSelectedObj && cmd){
        	var checked = $(this).attr('checked');
            checked = checked ? checked == 'checked' : false;
            var style = {};					            	
            switch (cmd) {
                case 'bold':
                    style.bold = checked;
                    break;
                case 'italic':
                	style.italic = checked;
                    break;
                case 'underline':
                	style.textDecoration = checked;
                    break;
                case 'linethrough':
                	style.lineThrough = checked;
                    break;
            }
			//Special case for text boxes
    	    if(currentSelectedObj.getType && currentSelectedObj.getType() == 'TextBox'){
    	    	sendMessage(com.kenny.util.Observer.MessageType.SVG_TEXT_STYLE, currentSelectedObj, style);
    	    }
    	    else{
    	    	sendMessage(com.kenny.util.Observer.MessageType.TEXT_STYLE, currentSelectedObj, style);
    	    }
		}
    });
	
	//Handler for the paragraph's align
	$('#Menu_Edit_TextSpecsSet_AlignMent_Style_Set .menu-text-align-item').click(function(e){
		com.kenny.util.BaseTool.closeMenuPopup();
		
		var self = $(this);
		var cmd = self.attr('command');
		
		if(currentSelectedObj && cmd){
			$('#Menu_Edit_TextSpecsSet_AlignMent img').attr('src', self.attr('src').replace("_on","_off"));
	        var style = {};
            switch (cmd) {
                case 'justify':
                	style.textAlign = 'justify';
                    break;
                case 'left':
                    style.textAlign = 'left';
                    break;
                case 'center':
                	style.textAlign = 'center';
                    break;
                case 'right':
                	style.textAlign = 'right';
                    break;
            }
            //Special case for text boxes
    	    if(currentSelectedObj.getType && currentSelectedObj.getType() == 'TextBox'){
    	    	sendMessage(com.kenny.util.Observer.MessageType.SVG_TEXT_STYLE, currentSelectedObj, style);
    	    }
    	    else{
    	    	sendMessage(com.kenny.util.Observer.MessageType.PARAGRAPH_STYLE, currentSelectedObj.getActiveSelection().getFrom(), style);
    	    }
	    }
	});
	
	//Handler for text's font family
	$("#Menu_Edit_TextSpecsSet_Fonts_Group_Format .Menu_Edit_Text_Style_Fonts_Group_FormatStyle").click(function () {
		com.kenny.util.BaseTool.closeMenuPopup();
		
		var fontStyle = $(this).attr('fontStyle');
		var style = { 'fontFamily': fontStyle };
		$("#Menu_Edit_TextSpecsSet_Fonts_Value").text(checkTextLength(fontStyle));
		$("#fontGroupFormat_is_picked").remove();
	    $(this).children("span").before('<div id="fontGroupFormat_is_picked" style="float:right;border:0px;margin-right:25px;margin-top:10px;">' +
	           '<img src="./images/icon_choosed.png" style="height:13px;width:13px;"/></div>');
	    //Special case for text boxes
	    if(currentSelectedObj.getType && currentSelectedObj.getType() == 'TextBox'){
	    	sendMessage(com.kenny.util.Observer.MessageType.SVG_TEXT_STYLE, currentSelectedObj, style);
	    }
	    else{
	    	sendMessage(com.kenny.util.Observer.MessageType.TEXT_STYLE, currentSelectedObj, style);
	    }
	});
}

function closeTextMenu() {
	$('.menu-popup-item').hide();
	$("#hidden").remove();
}

function checkTextLength(str){
	if(str == null){
		return "Arial";
	}
	if(str.length>12){
		
		str=str.substring(0,12)+"...";
	}
	return str;
}
