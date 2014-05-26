function commonDiv_ShapeImageSet_Ready() {
	$("#Menu_Edit_ShapeImageSet").tabs();
	$("#Menu_Edit_ShapeImage_StyleOptions").tabs();
	$("#Menu_Edit_ShapeImage_MutiSelectButton").buttonset();
	$("#Menu_Edit_ShapeImage_Fonts_Checkbox").selectable();
	$("#Menu_Edit_ShapeImage_Checkbox").selectable();
	$("#Menu_Edit_ShapeImages_Arrange_WrapAutomatic_BackToWrap_Checkbox").selectable();
	$("#Menu_Edit_ShapeImage_Alignment_RadioButton_Left").buttonset();
	$("#Menu_Edit_ShapeImage_Alignment_RadioButton_Right").buttonset();
	$("#Menu_Edit_ShapeImage_Fonts_CheckboxDemo").selectable();
	$("#Menu_Edit_ShapeImageSet_StyleOption_Image_StyleBorder").buttonset();
	$("#Menu_Edit_ShapeImageSet_StyleOption_Image_Effects_Shadow").buttonset();
	$("#Menu_Edit_ShapeImages_Arrange_WrapAutomatic_Button").buttonset();

	$('#Menu_Edit_ShapeImages_ArrangeSelect_Slider_Left').click(function(e){
		var container = getActiveContainer();
		var num = container.getAllElements().length;
		if(num >= 2){
			var initValue = currentSelectedObj.getZIndex();//1001;
			initValue -= 10;
			$("#Menu_Edit_ShapeImages_ArrangeSelect_Slider").slider({
				value : initValue
			});
			var data = {'zindex':initValue};
			sendMessage(com.kenny.util.Observer.MessageType.UPDATE_ZINDEX, currentSelectedObj, data);
			
			$('#Menu_Edit_ShapeImages_ArrangeSelect_Slider_Right').removeAttr('disabled');
			if(initValue == 1001){
				$('#Menu_Edit_ShapeImages_ArrangeSelect_Slider_Left').attr('disabled', true);
			}
		}
		
	});
	$('#Menu_Edit_ShapeImages_ArrangeSelect_Slider_Right').click(function(e){
		var container = getActiveContainer();
		var num = container.getAllElements().length;
		if(num >= 2){
			var initValue = currentSelectedObj.getZIndex();
			initValue += 10;
			$("#Menu_Edit_ShapeImages_ArrangeSelect_Slider").slider({
				value : initValue
			});
			var data = {'zindex':initValue};
			sendMessage(com.kenny.util.Observer.MessageType.UPDATE_ZINDEX, currentSelectedObj, data);
			
			$('#Menu_Edit_ShapeImages_ArrangeSelect_Slider_Left').removeAttr('disabled');
			
			if(initValue == 1000 + num){
				$('#Menu_Edit_ShapeImages_ArrangeSelect_Slider_Right').attr('disabled', 'disabled');
			}
		}
	});
	
	$("#Menu_Edit_ShapeImage_InsetMargin_slider").slider({
		value: 100,
		min: 0,
		max: 100,
		step: 10,
		slide: function (event, ui) {
			$("#Menu_Edit_ShapeImage_InsetMargin_slider_Value").text(ui.value + "pt");
			var data = {'InsetMarginSlider':ui.value};
			sendMessage(com.kenny.util.Observer.MessageType.SHAPE_STYLE,
              currentSelectedObj,
              data);
		}
	});
	$("#Menu_Image_extraSpace-slider").slider({
		value: 100,
		min: 0,
		max: 100,
		step: 10,
		slide: function (event, ui) {
			$("#Menu_Image_style-extraSpace").text(ui.value + "pt");
			var data = {'extraSpaceMarginSlider':ui.value};
			sendMessage(com.kenny.util.Observer.MessageType.SHAPE_STYLE,
              currentSelectedObj,
              data);
		}
	});
	$("#Menu_Edit_ShapeImageSet_StyleOption_Image_BorderMySlider").slider({
		value: 1,
		min: 0,
		max: 25,
		step: 1,
		slide: function (event, ui) {
			$("#Menu_Edit_ShapeImageSet_StyleOption_Image_BorderThisOpacity").text(ui.value + "px");
			var data = {'StyleOptionMarginSlider':ui.value};
			sendMessage(com.kenny.util.Observer.MessageType.SHAPE_STYLE,
	              currentSelectedObj,
              data);
		}
	});	
	$("#Menu_Edit_ShapeImageSet_StyleOption_Image_BorderThisOpacity").text($("#Menu_Edit_ShapeImageSet_StyleOption_Image_BorderMySlider").slider("value") + "px");

	$("#Menu_Edit_ShapeImage_InsetMargin_slider_Value").text($("#Menu_Edit_ShapeImage_InsetMargin_slider").slider("value") + "pt");
	$("#Menu_Image_style-extraSpace").text($("#Menu_Image_extraSpace-slider").slider("value") + "pt");
	$("#Menu_Image_style-arrange").text($("#Menu_Edit_ShapeImages_ArrangeSelect_Slider").slider("value") + "%");
	
	$("#Menu_Edit_Image_StyleOptions").click(function (e) {
		$('#Menu_Edit_ShapeImageSet').css('display', 'none');
		$('#Menu_Edit_ShapeImage_StyleOptions').css('display', "");
	});
	
	$("#Menu_Image_imgBack").click(function (e) {
		$('#Menu_Edit_ShapeImage_StyleOptions').css('display', 'none');
		$('#Menu_Edit_ShapeImageSet').css('display', "");
	});
	
	$("#Menu_Edit_ShapeImage_TextOptionClick").click(function (e) {
		$('#Menu_Edit_ShapeImage_StyleOptions_FontSet').css('display', 'none');
		$('#Menu_Edit_ShapeImage_TextOptions').css('display', "");
	});
	
	$("#Menu_Edit_ShapeImage_TextOptions_BackToText").click(function (e) {
		$('#Menu_Edit_ShapeImage_TextOptions').css('display', 'none');
		$('#Menu_Edit_ShapeImage_StyleOptions_FontSet').css('display', "");
	});
	
	$("#Menu_Edit_ShapeImage_TextColor_BackToTextOptions").click(function (e) {
		$('#Menu_Edit_ShapeImage_TextColor').css('display', 'none');
		$('#Menu_Edit_ShapeImage_Fonts').css('display', 'none');
		$('#Menu_Edit_ShapeImage_TextOptions').css('display', "");
	});
	
	$("#Menu_Edit_ShapeImage_Fonts_BackToTextOptions").click(function (e) {
		$('#Menu_Edit_ShapeImage_TextColor').css('display', 'none');
		$('#Menu_Edit_ShapeImage_Fonts').css('display', 'none');
		$('#Menu_Edit_ShapeImage_TextOptions').css('display', "");
	});
	
	$("#Menu_Edit_ShapeImage_TextColorSelect").click(function (e) {
		$('#Menu_Edit_ShapeImage_TextOptions').css('display', 'none');
		$('#Menu_Edit_ShapeImage_TextColor').css('display', "");
	});
	
	$("#Menu_Edit_ShapeImage_FontSelect").click(function (e) {
		$('#Menu_Edit_ShapeImage_TextOptions').css('display', 'none');
		$('#Menu_Edit_ShapeImage_Fonts').css('display', "");
	});
	
	$("#Menu_Image_panel_text_color_one").click(function (e) {
		$('#Menu_Edit_ShapeImage_TextColor_Two').css('display', 'none');
		$('#Menu_Edit_ShapeImage_TextColor_One').css('display', "");
	});
	
	$("#Menu_Image_panel_text_color_two").click(function (e) {
		$('#Menu_Edit_ShapeImage_TextColor_One').css('display', 'none');
		$('#Menu_Edit_ShapeImage_TextColor_Two').css('display', "");
	});
	
	$("#Menu_Edit_ShapeImages_Arrange_WrapClick").click(function (e) {
		$('#Menu_Edit_ShapeImages_ArrangeSelect').css('display', 'none');
		$('#Menu_Edit_ShapeImages_Arrange_WrapAutomatic').css('display', "");
	});
	
	
	$("#Menu_Edit_ShapeImages_Arrange_WrapAutomatic_BackToWrap").click(function (e) {
		$('#Menu_Edit_ShapeImages_Arrange_WrapAutomatic').css('display', 'none');
		$('#Menu_Edit_ShapeImages_ArrangeSelect').css('display', "");
	});
	
	$("#Menu_Edit_ShapeImageSet_StyleOption_Panel_FillOne").click(function (e) {
		$('#Menu_Edit_ShapeImageSet_StyleOption_Image_FillThree').css('display', 'none');
		$('#Menu_Edit_ShapeImageSet_StyleOption_Image_FillTwo').css('display', 'none');
		$('#Menu_Edit_ShapeImageSet_StyleOption_Image_FillFour').css('display', 'none');
		$('#Menu_Edit_ShapeImageSet_StyleOption_Image_FillOne').css('display', "");
	});
	
	$("#Menu_Edit_ShapeImageSet_StyleOption_Panel_FillTwo").click(function (e) {
		$('#Menu_Edit_ShapeImageSet_StyleOption_Image_FillOne').css('display', 'none');
		$('#Menu_Edit_ShapeImageSet_StyleOption_Image_FillThree').css('display', 'none');
		$('#Menu_Edit_ShapeImageSet_StyleOption_Image_FillFour').css('display', 'none');
		$('#Menu_Edit_ShapeImageSet_StyleOption_Image_FillTwo').css('display', "");
	});
	
	$("#Menu_Edit_ShapeImageSet_StyleOption_Panel_FillThree").click(function (e) {
		$('#Menu_Edit_ShapeImageSet_StyleOption_Image_FillTwo').css('display', 'none');
		$('#Menu_Edit_ShapeImageSet_StyleOption_Image_FillOne').css('display', 'none');
		$('#Menu_Edit_ShapeImageSet_StyleOption_Image_FillFour').css('display', 'none');
		$('#Menu_Edit_ShapeImageSet_StyleOption_Image_FillThree').css('display', "");
	});
	
	$("#Menu_Edit_ShapeImageSet_StyleOption_Panel_FillFour").click(function (e) {
		$('#Menu_Edit_ShapeImageSet_StyleOption_Image_FillTwo').css('display', 'none');
		$('#Menu_Edit_ShapeImageSet_StyleOption_Image_FillThree').css('display', 'none');
		$('#Menu_Edit_ShapeImageSet_StyleOption_Image_FillOne').css('display', 'none');
		$('#Menu_Edit_ShapeImageSet_StyleOption_Image_FillFour').css('display', "");
	});
	
	$("#Menu_Image_borderColorSelect").click(function (e) {
		$('#Menu_Edit_ShapeImageSet_StyleOption_Image_BorderSelect').css('display', 'none');
		$('#Menu_Edit_ShapeImageSet_StyleOption_Image_BorderColor').css('display', "");
	});
	
	$("#Menu_Edit_ShapeImageSet_StyleOption_Image_BackToBorder").click(function (e) {
		$('#Menu_Edit_ShapeImageSet_StyleOption_Image_BorderColor').css('display', 'none');
		$('#Menu_Edit_ShapeImageSet_StyleOption_Image_BorderSelect').css('display', "");
	});
	
	$("#Menu_Edit_ShapeImageSet_StyleOption_Image_Panel_BorderColorOne").click(function (e) {
		$('#Menu_Edit_ShapeImageSet_StyleOption_Image_BorderColorTwo').css('display', 'none');
		$('#Menu_Edit_ShapeImageSet_StyleOption_Image_BorderColorOne').css('display', "");
	});
	$("#Menu_Edit_ShapeImageSet_StyleOption_Image_Panel_BorderColorTwo").click(function (e) {
		$('#Menu_Edit_ShapeImageSet_StyleOption_Image_BorderColorOne').css('display', 'none');
		$('#Menu_Edit_ShapeImageSet_StyleOption_Image_BorderColorTwo').css('display', "");
	});	
		
	$("#Menu_Edit_ShapeImageSet_StyleOption_Image_Style_BorderOn").click(function (e) {
		$('#Menu_Edit_ShapeImageSet_StyleOption_Image_Border_ClickOff').show();
		var borderWidth = $("#Menu_Edit_ShapeImageSet_StyleOption_Image_BorderMySlider").slider("value");
		currentSelectedObj.setBorderWidth(borderWidth);
		 var textBorderColor;
		    $("#Menu_Edit_ShapeText_List .Menu_Edit_ShapeImages_List_Style img").click(function(i){
		    	textBorderColor  = $(this).attr('command');		    	
		    	textBorderColor = $("#Menu_Image_borderColorSelect_button").css('backgroundColor', textBorderColor).attr('command',textBorderColor);
		    	
		    });
		
		//var borderColor = $("#Menu_Image_borderColorSelect_button").css('backgroundColor');
		 textBorderColor = $("#Menu_Image_borderColorSelect_button").attr('command');
		currentSelectedObj.setBorderColor(textBorderColor);
		var childImg=$("#check_img_border_line_color").parent().children('img')[0];		
		var lineStyle = $(childImg).attr('imageLineStyle');		
		var data = {'imageLineStyle':lineStyle};
		sendMessage(com.kenny.util.Observer.MessageType.SHAPE_STYLE,
	              currentSelectedObj,
	              data);
	});	
	
	$("#Menu_Edit_ShapeImageSet_StyleOption_Image_Style_BorderOff").click(function (e) {
		$('#Menu_Edit_ShapeImageSet_StyleOption_Image_Border_ClickOff').hide();
		currentSelectedObj.setBorderWidth(0);
		currentSelectedObj.setBorderColor('none');
		currentSelectedObj.setBorderStyle('0,0');		
	});
	
	$("#Menu_Edit_ShapeImageSet_StyleOption_Image_Effects_Shadow_On").click(function (e) {
		$('#Menu_Edit_ShapeImageSet_StyleOption_Image_Effects_Shadow_ClickOff').show();
		$('.Menu_Edit_ShapeImagesSet_singelSetting_div').css('height','100px');
	});	
	
	$("#Menu_Edit_ShapeImageSet_StyleOption_Image_Effects_Shadow_Off").click(function (e) {
		$('#Menu_Edit_ShapeImageSet_StyleOption_Image_Effects_Shadow_ClickOff').hide();
		$('.Menu_Edit_ShapeImagesSet_singelSetting_div').css('height','30px');
	});
	
	$("#Menu_Edit_ShapeImages_Arrange_WrapAutomatic_Button_On").click(function (e) {
		//$('#Menu_Edit_ShapeImages_Arrange_WrapAutomatic_Slider').slideDown("slow");
	});	
	
	$("#Menu_Edit_ShapeImages_Arrange_WrapAutomatic_Button_Off").click(function (e) {
		//$('#Menu_Edit_ShapeImages_Arrange_WrapAutomatic_Slider').slideUp("slow");
	});
	
	$("#Menu_Edit_ShapeImageSet_StyleOption_Image_Effects_Slider").mouseup(function(e){
		var opacityValue = $("#Menu_Edit_ShapeImageSet_StyleOption_Image_Effects_Slider").slider("value");
		var data = {'EffectsMarginSlider':opacityValue};
		sendMessage(com.kenny.util.Observer.MessageType.SHAPE_STYLE,
		          currentSelectedObj,
		          data);
		
	});
	
	commonControl_PageTurnning("Menu_Edit_ShapeImageSet_StyleOption_Image_Fill");
	commonControl_PageTurnning("Menu_Edit_ShapeImageSet_StyleOption_Image_BorderColor_Select");
	commonControl_PageTurnning("Menu_Edit_ShapeImage_TextColor_Select");
	registerShapeSetListener();
	
};

   function registerShapeSetListener() {
   
    $('#Menu_Edit_ShapeImage_MutiSelectButton .Text_Style_BIU_Model').click(function () {
        var cmd = $(this).attr('command');
		
        if (cmd) {
            var checked = $(this).attr('checked');
            checked = checked ? checked == 'checked' : false;
            var data = currentSelectedObj.data;
            var style = {};
            switch (cmd) {
                case 'bold':
                    data = { 'fontWeight': checked?'bold':'normal' };
                    style.bold = checked;
                    break;
                case 'italic':
                    data = { 'fontStyle': checked?'italic':'normal' };
                    style.italic = checked;
                    break;
                case 'underline':
                    data = { 'underline': checked };
                    style.textDecoration = checked;
                    break;
                case 'linethrough':
                    data = { 'linethrough': checked };
                    style.lineThrough = checked;
                    break;
            }
            if(currentSelectedObj.getType() =='TextBox'){
            	sendMessage(com.kenny.util.Observer.MessageType.SVG_TEXT_STYLE, currentSelectedObj, style);
            }
            else{
            	sendMessage(com.kenny.util.Observer.MessageType.SHAPE_TEXT_STYLE,
						currentSelectedObj,
						data);
            }
            
        }
    });

	$("#Menu_Edit_ShapeImageSet_StyleOption_Image_Lines .Menu_Edit_ShapeImageSet_BorderLine_Style_Div img").click(function () {
	   var imageLineStyle = $(this).attr('imageLineStyle');
        var data = {'imageLineStyle':imageLineStyle};
		
		$("#check_img_border_line_color").remove();
//		$(this).parent().append('<div id="check_img_border_line_color" style="border:0px;float:right;margin-top:-20px;margin-right:5px">' +
//    		'<input type="checkbox" disabled="true" checked="true"></div>');
		var browersNm = window.navigator.userAgent.toLowerCase();
    	if(browersNm.indexOf('safari') == -1 || browersNm.indexOf('chrome') != -1){
    		$(this).parent().append('<div id="check_img_border_line_color" style="border:0px;float:right;margin-top:-20px;margin-right:5px">' +
    	    		'<input type="checkbox" disabled="true" checked="true"></div>');
    	} else {
			$(this).parent().append('<div id="check_img_border_line_color" style="border:0px;float:right;margin-top:-20px;margin-right:5px">' +
					'<img src="./images/icon_choosed.png" style="height:13px;width:13px;margin-left:-12px;"/></div>');
    	}
				
        sendMessage(com.kenny.util.Observer.MessageType.SHAPE_STYLE,
              currentSelectedObj,
              data);
    });
	//delete by sunwei 7/21 start
//	$("#Menu_Edit_ShapeImages_List .Menu_Edit_ShapeImages_Img_Style_Div img").click(function () {
//    	var shapeImageStyle = $(this).attr('shapeImageStyle');
//		var data = {'shapeImageStyle':shapeImageStyle};
//		//$('#Menu_Edit_ShapeImages_List div .Menu_Edit_ShapeImages_Img_Style_Div').css('border','1px solid #eeeeee');        
//    	//$(this).parent().css('border','1px solid #8DDF48');	
//    	sendMessage(com.kenny.util.Observer.MessageType.SHAPE_STYLE,
//              currentSelectedObj,
//              data);
//    });
	//delete by sunwei 7/21 end

	$("#Menu_Edit_ShapeImageSet_StyleOption_Image_ColorOne .Color_colorDiv_normal").click(function () {
		var shapeBorderColor = $(this).attr('command');		
		$("#Menu_Image_borderColorSelect_button").css('backgroundColor',shapeBorderColor).attr('command',shapeBorderColor);
		//$("#Menu_Edit_ShapeImage_TextColorSelect_Button").css('backgroundColor',shapeBorderColor);
		var data={'shapeBorderColor':shapeBorderColor};
		$("#check_shape_border_color").remove();
		//alert(this.outerHTML);
		$(this).append('<div id="check_shape_border_color" style="border:0px;margin-left:35px;position:relative;top:50%;left:10%;">' +
//		    		'<input type="checkbox" disabled="true" checked="true"></div>');
		    		'<img src="./images/icon_choosed.png" style="height:13px;width:13px;margin-left:6px;"/></div>');
		//alert(shapeBorderColor);
	   // $(this).append('<div id="check_shape_border_color" style="border:0px;margin-left:35px;position:relative;top:50%;left:10%;">' +
	    	//	'<input type="checkbox" disabled="true" checked="true"></div>');
	    		//'<img src="./images/icon_choosed.png" style="height:13px;width:13px;margin-left:6px;"/></div>');
		sendMessage(com.kenny.util.Observer.MessageType.SHAPE_STYLE,
				currentSelectedObj,
				data);
	});
	
	$("#Menu_Edit_ShapeImageSet_StyleOption_Image_BorderColorTwo .Color_MultiStylePanel div").click(function(){
		var shapeBorderColor =  $(this).attr('command');
		$("#Menu_Image_borderColorSelect_button").css('backgroundColor',shapeBorderColor).attr('command',shapeBorderColor);
		var data={'shapeBorderColor':shapeBorderColor};
		$("#check_shape_border_color").remove();
	    $(this).append('<div id="check_shape_border_color" style="border:0px;margin-left:25px;margin-top:95px;">' +
//	    		'<input type="checkbox" disabled="true" checked="true"></div>');
	    				'<img src="./images/icon_choosed.png" style="height:13px;width:13px;margin-left:-12px;"/></div>');
		sendMessage(com.kenny.util.Observer.MessageType.SHAPE_STYLE,
			currentSelectedObj,
			data);
	});
	
	$("#Menu_Edit_ShapeImageSet_StyleOption_Image_FillOne .Color_colorDiv_normal").click(function () {
		var shapeFillColor = $(this).attr('command');
		var data={'shapeFillColor':shapeFillColor};
		$("#check_shape_fill_color").remove();
	    $(this).append('<div id="check_shape_fill_color" style="border:0px;margin-left:35px;position:relative;top:50%;left:10%;">' +
//	    		'<input type="checkbox" disabled="true" checked="true"></div>');
	    		'<img src="./images/icon_choosed.png" style="height:13px;width:13px;margin-left:6px;"/></div>');
		sendMessage(com.kenny.util.Observer.MessageType.SHAPE_STYLE,
			currentSelectedObj,
			data);    		
	});
	
	$("#Menu_Edit_ShapeImageSet_StyleOption_Image_FillTwo .Color_MultiStylePanel div").click(function(){
		var shapeFillColor = $(this).attr('command');
		var data={'shapeFillColor':shapeFillColor};
		$("#check_shape_fill_color").remove();
	    $(this).append('<div id="check_shape_fill_color" style="border:0px;margin-left:25px;margin-top:95px;">' +
//	    		'<input type="checkbox" disabled="true" checked="true"></div>');
	    		'<img src="./images/icon_choosed.png" style="height:13px;width:13px;margin-left:-12px;"/></div>');
		sendMessage(com.kenny.util.Observer.MessageType.SHAPE_STYLE,
		currentSelectedObj,
		data);  
	});
	
	$("#Menu_Edit_ShapeImage_TextColor_One .Color_colorDiv_normal").click(function () {
		//var color = $(this).css('background');
		var color = $(this).attr('command');
		$("#Menu_Edit_ShapeImage_TextColorSelect_Button").css('backgroundColor',color);
		var data = {'color':color};
		$("#check_shape_text_color").remove();
	    $(this).append('<div id="check_shape_text_color" style="border:0px;margin-left:35px;position:relative;top:50%;left:10%;">' +
	    		'<img src="./images/icon_choosed.png" style="height:13px;width:13px;margin-left:0px;"/></div>');
		
		 if(currentSelectedObj.getType() =='TextBox'){
         	sendMessage(com.kenny.util.Observer.MessageType.SVG_TEXT_STYLE, currentSelectedObj, data);
         }
         else{
        	 sendMessage(com.kenny.util.Observer.MessageType.SHAPE_TEXT_STYLE,
     				currentSelectedObj,
     				data);
         }
	});
	
	$("#Menu_Edit_ShapeImage_TextColor_Two .Color_MultiStylePanel div").click(function(){
		//var color = $(this).css('background');
		var color = $(this).attr('command');
		$("#Menu_Edit_ShapeImage_TextColorSelect_Button").css('backgroundColor',color);
		var data = {'color':color};
		$("#check_shape_text_color").remove();
	    $(this).append('<div id="check_shape_text_color" style="border:0px;margin-left:25px;margin-top:95px;">' +
	    		'<img src="./images/icon_choosed.png" style="height:13px;width:13px;margin-left:-12px;"/></div>');
		if(currentSelectedObj.getType() =='TextBox'){
         	sendMessage(com.kenny.util.Observer.MessageType.SVG_TEXT_STYLE, currentSelectedObj, data);
         }
         else{
        	 sendMessage(com.kenny.util.Observer.MessageType.SHAPE_TEXT_STYLE,
     				currentSelectedObj,
     				data);
         }
		
	});
	
	$("#Menu_Edit_ShapeImage_Alignment_RadioButton_Left label").click(function(){
		 var textAlign = $(this).prev("input").attr('shapeparaalignstyle');
		 var style = {'textAlign':textAlign};
		 if(currentSelectedObj.getType() =='TextBox'){
        	sendMessage(com.kenny.util.Observer.MessageType.SVG_TEXT_STYLE, currentSelectedObj, style);
         }
	});
	
	$("#Menu_Edit_ShapeImageSet_StyleOption_Image_Effects_Shadow_Image div").click(function(){
			var shapeEffectShadowImage = $(this).attr('class');
			var data = {'shapeEffectShadowImage':shapeEffectShadowImage};
			var shapeimage =(shapeEffectShadowImage);
			$('#Menu_Edit_ShapeImageSet_StyleOption_Image_Effects_Shadow_Image_CheckOne').css('display', 'none');
	        $('#Menu_Edit_ShapeImageSet_StyleOption_Image_Effects_Shadow_Image_CheckTwo').css('display', 'none');
	        $('#Menu_Edit_ShapeImageSet_StyleOption_Image_Effects_Shadow_Image_CheckThree').css('display', 'none');
	        $('#Menu_Edit_ShapeImageSet_StyleOption_Image_Effects_Shadow_Image_CheckFour').css('display', 'none');
			switch(shapeEffectShadowImage){
				case 'Menu_Edit_ShapeImageSet_StyleOption_Image_Effects_Shadow_Image_StyleOne':
					$('#Menu_Edit_ShapeImageSet_StyleOption_Image_Effects_Shadow_Image_CheckOne').css('display', 'block');
					break;
				case 'Menu_Edit_ShapeImageSet_StyleOption_Image_Effects_Shadow_Image_StyleTwo':
					$('#Menu_Edit_ShapeImageSet_StyleOption_Image_Effects_Shadow_Image_CheckTwo').css('display', 'block');
					break;
				case 'Menu_Edit_ShapeImageSet_StyleOption_Image_Effects_Shadow_Image_StyleThree':
					$('#Menu_Edit_ShapeImageSet_StyleOption_Image_Effects_Shadow_Image_CheckThree').css('display', 'block');
					break;
				case 'Menu_Edit_ShapeImageSet_StyleOption_Image_Effects_Shadow_Image_StyleFour':
					$('#Menu_Edit_ShapeImageSet_StyleOption_Image_Effects_Shadow_Image_CheckFour').css('display', 'block');
					break;
        }
			sendMessage(com.kenny.util.Observer.MessageType.SHAPE_STYLE,
			currentSelectedObj,
			data);
		}
	);

		$("#Menu_Edit_ShapeImages_Arrange_WrapAutomatic_BackToWrap_Checkbox li").click(function () {
		    var wrapAutomaticStyle = $(this).attr('wrapAutomaticStyle');
		    var data = { 'wrapAutomaticStyle': wrapAutomaticStyle };
		    sendMessage(com.kenny.util.Observer.MessageType.SHAPE_STYLE, currentSelectedObj, data);
		    $("#Menu_Edit_ShapeImage_WrapSet").remove();
		    $(this).children('span').before('<div id="Menu_Edit_ShapeImage_WrapSet" style="float:right;border:0px;margin-right:5px;margin-top:10px;">' +
		    		'<img src="./images/icon_choosed.png" style="height:13px;width:13px;margin-left:-12px;"/></div>');
		});
	
	$("#Menu_Edit_ShapeImage_Checkbox .ui-widget-content").click(function(){
		var shapeTextParagraphStyle = $(this).attr('shapeTextParagraphStyle');
		var data = {'shapeTextParagraphStyle':shapeTextParagraphStyle};
		$("#Menu_Edit_ShapeImage_LineSet").remove();
		$(this).children('span').before('<div id="Menu_Edit_ShapeImage_LineSet" style="float:right;border:0px;margin-right:5px;margin-top:10px;">' 
				+ '<img src="./images/icon_choosed.png" style="height:13px;width:13px;margin-left:-12px;"/></div>');
		if(currentSelectedObj.getType() =='TextBox'){
			sendMessage(com.kenny.util.Observer.MessageType.SVG_TEXT_STYLE, currentSelectedObj, data);
		} else {
			sendMessage(com.kenny.util.Observer.MessageType.SHAPE_TEXT_STYLE, currentSelectedObj, data);
		}
	});
	
	$("#Menu_Edit_ShapeImage_Fonts_Checkbox .ui-widget-content").click(function(){
		var shapeTextFontStyle = $(this).attr('shapeTextFontStyle');
		var data = {'shapeTextFontStyle':shapeTextFontStyle};
		$("#Menu_Edit_ShapeImage_FontSelect_button").text(shapeTextFontStyle);
		$("#Menu_Edit_ShapeImage_FontSet").remove();
		$(this).children('span').before('<div id="Menu_Edit_ShapeImage_FontSet" style="float:right;border:0px;margin-right:5px;margin-top:10px;">' +
				'<img src="./images/icon_choosed.png" style="height:13px;width:13px;margin-left:-12px;"/></div>');
		
		 if(currentSelectedObj.getType() =='TextBox'){
         	sendMessage(com.kenny.util.Observer.MessageType.SVG_TEXT_STYLE, currentSelectedObj, {
         		fontFamily: shapeTextFontStyle
         	});
         }
         else{
        	 sendMessage(com.kenny.util.Observer.MessageType.SHAPE_TEXT_STYLE,
     				currentSelectedObj,
     				data);
         }
	});
	
	$("#Menu_Edit_ShapeImage_Alignment_RadioButton .Menu_Edit_ShapeImage_Alignment").click(function(){
		$("#Menu_Edit_ShapeImage_Alignment_RadioButton .Menu_Edit_ShapeImage_Alignment").each(function(){
			$(this).css('background', '');
		});
		var shapeParaAlignStyle = $(this).attr('shapeParaAlignStyle');
		var data = {'shapeParaAlignStyle':shapeParaAlignStyle};
		$(this).next('label').css('background', 'none');
		
		if(currentSelectedObj.getType() =='TextBox'){
         	sendMessage(com.kenny.util.Observer.MessageType.SVG_TEXT_STYLE, currentSelectedObj, data);
        }
        else{
        	 sendMessage(com.kenny.util.Observer.MessageType.SHAPE_TEXT_STYLE,
     				currentSelectedObj,
     				data);
        }
	});

	
	$("#Menu_Edit_ShapeText_List .Menu_Edit_ShapeImages_List_Style div").click(function(){
	     var ShapeTextStyle = $(this).attr('class').split(' ')[0];		
		var data = {'ShapeTextStyle':ShapeTextStyle};	
		sendMessage(com.kenny.util.Observer.MessageType.SHAPE_TEXT_STYLE,
				currentSelectedObj,
			    data);
	});
	
	
	
	$("#Menu_Edit_ShapeImages_List .Menu_Edit_ShapeImages_Img_Style_Div").click(function(){
		var shapeImgStyle = $(this).attr('class').split(' ')[1];
		var fillColor;
		switch (shapeImgStyle) {
			case "Menu_Edit_ShapeImages_Img_Style_Div_Green":
				fillColor = '#68A22F';
				break;
			case "Menu_Edit_ShapeImages_Img_Style_Div_Blue":
				fillColor = '#2B6991';
				break;
			case "Menu_Edit_ShapeImages_Img_Style_Div_Red":
				fillColor = '#C10C21';
				break;
			case "Menu_Edit_ShapeImages_Img_Style_Div_Yellow":
				fillColor = '#EDC926';
				break;
			case "Menu_Edit_ShapeImages_Img_Style_Div_Purple":
				fillColor = '#8A2AAA';
				break;
			case "Menu_Edit_ShapeImages_Img_Style_Div_Gray":
				fillColor = '#B2B2B2';//D6D8DE
				break;
		}
		$("#Menu_Edit_ShapeImageSet_StyleOption_Image_FillOne .Color_colorDiv_normal").each(function (i) {
			var color = $(this).attr('command');
			if(fillColor.toUpperCase() == color.toUpperCase()){
				$("#check_shape_fill_color").remove();
			    $(this).append('<div id="check_shape_fill_color" style="border:0px;margin-left:35px;position:relative;top:50%;left:10%;">' +
			    		'<img src="./images/icon_choosed.png" style="height:13px;width:13px;margin-left:6px;"/></div>');
			}
		});
	    $("#Menu_Edit_ShapeImageSet_StyleOption_Image_FillTwo .Color_MultiStylePanel div").each(function (i) {
			var color = $(this).attr('command');
			if(fillColor.toUpperCase() == color.toUpperCase()){
				$("#check_shape_fill_color").remove();
				$(this).append('<div id="check_shape_fill_color" style="border:0px;margin-left:25px;margin-top:95px;">' +
						'<img src="./images/icon_choosed.png" style="height:13px;width:13px;margin-left:-12px;"/></div>');
			}
		});
		
		var data = {'shapeImgStyle':shapeImgStyle}; 	
//		if('Menu_Edit_ShapeImages_Img_Style_Div_Blue' == shapeImgStyle){
//			$("#Menu_Image_borderColorSelect_button").css('backgroundColor','#EBEBEB');
//			$("#Menu_Edit_ShapeImageSet_StyleOption_Image_BorderMySlider").slider('value',8);//TODO
//			$("#Menu_Edit_ShapeImageSet_StyleOption_Image_BorderThisOpacity").text('8px');
//		} else {
//			
//		}
		sendMessage(com.kenny.util.Observer.MessageType.SHAPE_STYLE,
				currentSelectedObj,
			    data);
		initShapeImageMenu();
	});
	
	$("#Menu_Edit_ShapeImage_TextOptions_SetFontSize").change(function(){
		var fontSize = $(this).attr('value');
			//var nFontSize = fontSize && fontSize.indexOf('pt')!=-1 ?Number(fontSize.substring(0, fontSize.indexOf('pt'))): null;
		var nFontSize = null;
		if(fontSize.indexOf('pt')!=-1){
			nFontSize = Number(fontSize.substring(0, fontSize.indexOf('pt')));
		}else if(fontSize){
			nFontSize = fontSize;
		}
		var data = {'TextFontSize':nFontSize};
		if(currentSelectedObj.getType() =='TextBox'){
			if(nFontSize != null){
				sendMessage(com.kenny.util.Observer.MessageType.SVG_TEXT_STYLE, currentSelectedObj, { fontSize: nFontSize });
         }
		} else {
        	 sendMessage(com.kenny.util.Observer.MessageType.SHAPE_TEXT_STYLE, currentSelectedObj, data);
         }
	});
}
function updateShapeImageMenu(objData, shapeType) {
    
}

function updateShapeTextBoxStyle(obj, objData, type) {
	// Update text box style
	var selection = obj.getActiveSelection();
	var isCollapsed = selection.isCollapsed();
	
	var paraIdx = selection.getFrom();
	var offset = selection.isCollapsed() ? selection.getFromOffset() : selection.getFromOffset() + 1;
	
	//style changes event
	var style = obj.getStyleWithOffset(paraIdx, offset);
	
	//font style
	 $('#Menu_Edit_ShapeImage_MutiSelectButton .Text_Style_BIU_Model').each(function () {
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
	 $('#Menu_Edit_ShapeImage_TextOptions_SetFontSize').val(style.getFontSize());
	 //Font color
	 $("#Menu_Edit_ShapeImage_TextColorSelect_Button").css('backgroundColor', style.getColor());
     // text color
     var textColor = style.getColor();
     $("#check_shape_text_color").remove();
     $("#Menu_Edit_ShapeImage_TextColor_One div[command]").each(function (i) {
    	var color = com.kenny.util.BaseTool.rgb2hex($(this).attr('command'));
		if(textColor && textColor.toUpperCase() == color.toUpperCase()){
			$(this).append('<div id="check_shape_text_color" style="border:0px;margin-left:35px;position:relative;top:50%;left:10%;">' + '<input type="checkbox" disabled="true" checked="true"></div>');
		}
     });
     $("#Menu_Edit_ShapeImage_TextColor_Two div[command]").each(function (i) {
     	var color = com.kenny.util.BaseTool.rgb2hex($(this).attr('command'));
 		if(textColor && textColor.toUpperCase() == color.toUpperCase()){
 			$(this).append('<div id="check_shape_text_color" style="border:0px;margin-left:25px;margin-top:95px;">' + '<input type="checkbox" disabled="true" checked="true"></div>');
 		}
     });
	 //Font family
	 $("#Menu_Edit_ShapeImage_FontSelect_button").text(style.getFontFamily());
	 $("#Menu_Edit_ShapeImage_Fonts_Checkbox .ui-widget-content").each(function (i){
	    	var font =$(this).attr('shapeTextFontStyle');	    	
	    	 if(style.getFontFamily()==font)
	    	 {
	    		 $("#Menu_Edit_ShapeImage_FontSet").remove();
	    		 $(this).children('span').before('<div id="Menu_Edit_ShapeImage_FontSet" style="float:right;border:0px;margin-right:5px;margin-top:10px;">' +
	    		 		'<img src="./images/icon_choosed.png" style="height:13px;width:13px;margin-left:-12px;"/></div>');
	    	 }
	    });
	 //Text align 
	 var textAlign = obj.getTextAlign();
	 $("#Menu_Edit_ShapeImage_Alignment_RadioButton .Menu_Edit_ShapeImage_Alignment").each(function(){
		var shapeParaAlignStyle = $(this).attr('shapeParaAlignStyle');
		$(this).attr('checked', shapeParaAlignStyle==textAlign).button("refresh");
		$(this).next('label').css('background', shapeParaAlignStyle==textAlign?'none':'');
	 });
	 
}
function initShapeTextMenu(){
	var initValue = currentSelectedObj.getZIndex();
	var container = getActiveContainer();
	var num = container.getAllElements().length;// < 2 ? 2 : container.getAllElements().length;
	if(num < 2){
		$("#Menu_Edit_ShapeImages_ArrangeSelect_Slider").slider({ disabled: true });
		$('#Menu_Edit_ShapeImages_ArrangeSelect_Slider_Left').attr('disabled', true);
		$('#Menu_Edit_ShapeImages_ArrangeSelect_Slider_Right').attr('disabled', true);
	} else {
		$("#Menu_Edit_ShapeImages_ArrangeSelect_Slider").slider({
			value : initValue,
			min: 1000,
			max: 1000 + 10*(num-1),
			step: 10,
			slide: function (event, ui) {
				$("#Menu_Image_style-arrange").text(ui.value + "%");
				$('#Menu_Edit_ShapeImages_ArrangeSelect_Slider_Left').removeAttr('disabled');
				$('#Menu_Edit_ShapeImages_ArrangeSelect_Slider_Right').removeAttr('disabled');
				if(ui.value == 1001){
					$('#Menu_Edit_ShapeImages_ArrangeSelect_Slider_Left').attr('disabled', 'disabled');
				}
				else if(ui.value == 1000 + num){
					$('#Menu_Edit_ShapeImages_ArrangeSelect_Slider_Right').attr('disabled', 'disabled');
				}
				var data = {'zindex':ui.value};
				sendMessage(com.kenny.util.Observer.MessageType.UPDATE_ZINDEX, currentSelectedObj, data);
			}
		});
		$('#Menu_Edit_ShapeImages_ArrangeSelect_Slider_Left').removeAttr('disabled');
		$('#Menu_Edit_ShapeImages_ArrangeSelect_Slider_Right').removeAttr('disabled');
		if(initValue == 1001){
			$('#Menu_Edit_ShapeImages_ArrangeSelect_Slider_Left').attr('disabled', 'disabled');
		}
		else if(initValue == 1000 + num){
			$('#Menu_Edit_ShapeImages_ArrangeSelect_Slider_Right').attr('disabled', 'disabled');
		}
	}
	
	//Opacity
	var opacity = currentSelectedObj.getOpacity();
	if(opacity == null || isNaN(opacity)) opacity=1;
	$("#Menu_Edit_ShapeImageSet_StyleOption_Image_Effects_Slider").slider({
        value: opacity * 100,
        min: 0,
        max: 100,
        step: 10,
        slide: function (event, ui) {
			$("#Menu_Edit_ShapeImageSet_StyleOption_Image_Effects_opacity").text(ui.value + "%");
			var id = currentSelectedObj.getId();
			$('#' + id).css('opacity',ui.value/100);
        }
    });
	
    $("#Menu_Edit_ShapeImageSet_StyleOption_Image_Effects_opacity").text($("#Menu_Edit_ShapeImageSet_StyleOption_Image_Effects_Slider").slider("value") + "%");
    
    // fill
    var fillColor = currentSelectedObj.getColor();
    //alert(color);
	$("#Menu_Edit_ShapeImageSet_StyleOption_Image_FillOne .Color_colorDiv_normal").each(function (i) {
		var color = $(this).attr('command');
		if(fillColor.toUpperCase() == color.toUpperCase()){
			$("#check_shape_fill_color").remove();
		    $(this).append('<div id="check_shape_fill_color" style="border:0px;margin-left:35px;position:relative;top:50%;left:10%;;">' +
		    		'<img src="./images/icon_choosed.png" style="height:13px;width:13px;margin-left:6px;"/></div>');
		}
	});
    $("#Menu_Edit_ShapeImageSet_StyleOption_Image_FillTwo .Color_MultiStylePanel div").each(function (i) {    	
		var color = $(this).attr('command');
		if(fillColor == color){
			$("#check_shape_fill_color").remove();
			$(this).append('<div id="check_shape_fill_color" style="border:0px;margin-left:25px;margin-top:95px;">' +
					'<img src="./images/icon_choosed.png" style="height:13px;width:13px;margin-left:-12px;"/></div>');
		}
	});
    //border color
    var borderColor = currentSelectedObj.getStrokeColor();
    var textBorderColor;
    var borderColorButton;
   
    $("#Menu_Edit_ShapeText_List .Menu_Edit_ShapeImages_List_Style img").click(function(i){
    	textBorderColor  = $(this).attr('command');   
    	$("#Menu_Image_borderColorSelect_button").css('backgroundColor', textBorderColor).attr('command',textBorderColor);  
    	borderColorButton=textBorderColor.toUpperCase(); 
    	$("#check_shape_border_color").remove();    
    	 $("#Menu_Edit_ShapeImageSet_StyleOption_Image_ColorOne .Color_colorDiv_normal").each(function (i) {
    			//var color = $(this).css('backgroundColor'); 
    			textBorderColor  = $(this).attr('command');     			
    			if(borderColorButton == textBorderColor.toUpperCase()){     			
    				$(this).append('<div id="check_shape_border_color" style="border:0px;margin-left:35px;position:relative;top:50%;left:10%;">' +
    						'<img src="./images/icon_choosed.png" style="height:13px;width:13px;margin-left:6px;"/></div>');
    			}
    		});
    	$("#Menu_Edit_ShapeImageSet_StyleOption_Image_BorderColorTwo .Color_MultiStylePanel div").each(function (i) {
    			//var color = $(this).css('backgroundColor');
    			textBorderColor  = $(this).attr('command');
    			if(borderColorButton == textBorderColor.toUpperCase()){
    				$(this).append('<div id="check_shape_border_color" style="border:0px;margin-left:25px;margin-top:95px;">' +
    						'<img src="./images/icon_choosed.png" style="height:13px;width:13px;margin-left:-12px;"/></div>');
    			}
    		});
    	 var fillColor = currentSelectedObj.getColor();
         if(fillColor!=null){
    	$("#Menu_Edit_ShapeImageSet_StyleOption_Image_FillOne .Color_colorDiv_normal").each(function (i) {
    		var shapeFillColor = $(this).attr('command');
    		var data={'shapeFillColor':shapeFillColor};
    		$("#check_shape_fill_color").remove();
    	    $(this).append('<div id="check_shape_fill_color" style="border:0px;margin-left:35px;position:relative;top:50%;left:10%;">' +
//    	    		
    	    		'<img src="./images/icon_choosed.png" style="height:13px;width:13px;margin-left:6px;"/></div>');
    		   		
    	});
    	
    	$("#Menu_Edit_ShapeImageSet_StyleOption_Image_FillTwo .Color_MultiStylePanel div").each(function(i){
    		var shapeFillColor = $(this).attr('command');
    		var data={'shapeFillColor':shapeFillColor};
    		$("#check_shape_fill_color").remove();
    	    $(this).append('<div id="check_shape_fill_color" style="border:0px;margin-left:25px;margin-top:95px;">' +
//    	    		
    	    		'<img src="./images/icon_choosed.png" style="height:13px;width:13px;margin-left:-12px;"/></div>');
    		
    	});
         }
    	
    	 // fill
     /*   var fillColor = currentSelectedObj.getColor();
        if(fillColor!=null){
       
       // $("#check_shape_fill_color").remove();
    	$("#Menu_Edit_ShapeImageSet_StyleOption_Image_FillOne .Color_colorDiv_normal").each(function (i) {
    		var color = $(this).attr('command');
    		if(fillColor.toUpperCase() == color.toUpperCase()){
    			$("#check_shape_fill_color").remove();
    		    $(this).append('<div id="check_shape_fill_color" style="border:0px;margin-left:35px;position:relative;top:50%;left:10%;">' +
    		    		'<img src="./images/icon_choosed.png" style="height:13px;width:13px;margin-left:6px;"/></div>');
    		}
    	});
        $("#Menu_Edit_ShapeImageSet_StyleOption_Image_FillTwo .Menu_Edit_ShapeImageSet_StyleOption_Image_ColorFillTwo").each(function (i) {
    		var color = $(this).attr('command');
    		if(fillColor.toUpperCase() == color.toUpperCase()){
    			$("#check_shape_fill_color").remove();
    			$(this).append('<div id="check_shape_fill_color" style="border:0px;margin-left:25px;margin-top:95px;">' +
    					'<img src="./images/icon_choosed.png" style="height:13px;width:13px;margin-left:-12px;"/></div>');
    		}
    	});
        }
        */
    });
    if(borderColor == null || borderColor == 'none'){
		$("#Menu_Image_borderColorSelect_button").css('backgroundColor',"black").attr('command','#000');
	} else {
		$("#Menu_Image_borderColorSelect_button").css('backgroundColor',borderColor).attr('command',borderColor);
    	borderColorButton=borderColor.toUpperCase(); 
    	$("#check_shape_border_color").remove();
    	 $("#Menu_Edit_ShapeImageSet_StyleOption_Image_ColorOne .Color_colorDiv_normal").each(function (i) {
    			// var color = $(this).css('backgroundColor'); 
    			textBorderColor  = $(this).attr('command'); 
    			//$("#check_shape_border_color").remove();
    			if(borderColorButton == textBorderColor){   
    				$(this).append('<div id="check_shape_border_color" style="border:0px;margin-left:35px;position:relative;top:50%;left:10%;">' +
    						'<img src="./images/icon_choosed.png" style="height:13px;width:13px;margin-left:6px;"/></div>');
    			}
    		});
    	$("#Menu_Edit_ShapeImageSet_StyleOption_Image_BorderColorTwo .Color_MultiStylePanel div").each(function (i) {
    		//	var color = $(this).css('backgroundColor');
    		textBorderColor  = $(this).attr('command');
    		//$("#check_shape_border_color").remove();
			if(borderColorButton == textBorderColor.toUpperCase()){    			
    				$(this).append('<div id="check_shape_border_color" style="border:0px;margin-left:25px;margin-top:95px;">' +
    						'<img src="./images/icon_choosed.png" style="height:13px;width:13px;margin-left:-12px;"/></div>');
    			}
    		});
	}
    /*
    $("#check_shape_border_color").remove();
    
    $("#Menu_Edit_ShapeImageSet_StyleOption_Image_ColorOne .Color_colorDiv_normal").each(function (i) {
		//var color = $(this).css('backgroundColor'); 
		textBorderColor  = $(this).attr('command'); 
		
		if(borderColorButton == textBorderColor){	
			//alert(borderColorButton == textBorderColor);
			$(this).append('<div id="check_shape_border_color" style="border:0px;margin-left:35px;margin-top:15px;">' +
    			'<input type="checkbox" disabled="true" checked="true"/></div>');
		}
	});
	$("#Menu_Edit_ShapeImageSet_StyleOption_Image_BorderColorTwo .Color_MultiStylePanel div").each(function (i) {
		var color = $(this).css('backgroundColor');
		if(borderColor == color){
			$(this).append('<div id="check_shape_border_color" style="border:0px;margin-left:25px;margin-top:95px;">' +
    			'<input type="checkbox" disabled="true" checked="true"/></div>');
		}
	});
	*/
	// border width
	var boederWidth = currentSelectedObj.getStrokeWidth();
	if(boederWidth == null) boederWidth = 0;
	$("#Menu_Edit_ShapeImageSet_StyleOption_Image_BorderMySlider").slider({
        value: boederWidth,
        min: 1,
        max: 25,
        step: 1,
        slide: function (event, ui) {
            $("#Menu_Edit_ShapeImageSet_StyleOption_Image_BorderThisOpacity").text(ui.value + "px");
			var data = {'StyleOptionMarginSlider':ui.value};
			sendMessage(com.kenny.util.Observer.MessageType.SHAPE_STYLE,
	              currentSelectedObj,
	              data);
        }
    });
    $("#Menu_Edit_ShapeImageSet_StyleOption_Image_BorderThisOpacity").text("" + $("#Menu_Edit_ShapeImageSet_StyleOption_Image_BorderMySlider").slider("value") + "px");
    // border line
    var borderStyle = currentSelectedObj.getStrokeDasharray();
    $("#check_img_border_line_color").remove();
	//alert(borderStyle);
    if(borderStyle != null){
    	var borderLineId;
    	switch(borderStyle){
    	case '0,0':
    		borderLineId = "solid";
    		break;
    	case '1,1':
    		borderLineId = "dashed";
    		break;
    	case '2,2':
    		borderLineId = "halfDashed";
    		break;
    	case '4,4':
    		borderLineId = "thickDashed";
    		break;
    	case '3,3':
    		borderLineId = "pointDashed";
    		break;
//    	case '0,0':
//    		borderLineId = "thinSolid";
//    		break;
    	}
    	
    	var image = $("#Menu_Edit_ShapeImage_border_lineSet img[imageLineStyle="+ borderLineId+"]");
    	if(image != null){
    		image.parent().append('<div id="check_img_border_line_color" style="border:0px;float:right;margin-top:-20px;margin-right:5px">' +
    			  '<img src="./images/icon_choosed.png" style="height:13px;width:13px;margin-left:-12px;margin-top:30px;"/></div>');
    	}
    	
       }
}

function initShapeImageMenu(){
	// zIndex change
	var initValue = currentSelectedObj.getZIndex();
	var container = getActiveContainer();
	var num = container.getAllElements().length;// < 2 ? 2 : container.getAllElements().length;
	if(num < 2){
		$("#Menu_Edit_ShapeImages_ArrangeSelect_Slider").slider({ disabled: true });
		$('#Menu_Edit_ShapeImages_ArrangeSelect_Slider_Left').attr('disabled', true);
		$('#Menu_Edit_ShapeImages_ArrangeSelect_Slider_Right').attr('disabled', true);
	} else {
		$("#Menu_Edit_ShapeImages_ArrangeSelect_Slider").slider({
			value : initValue,
			min: 1000,
			max: 1000 + 10*(num-1),
			step: 10,
			slide: function (event, ui) {
				$("#Menu_Image_style-arrange").text(ui.value + "%");
				$('#Menu_Edit_ShapeImages_ArrangeSelect_Slider_Left').removeAttr('disabled');
				$('#Menu_Edit_ShapeImages_ArrangeSelect_Slider_Right').removeAttr('disabled');
				if(ui.value == 1001){
					$('#Menu_Edit_ShapeImages_ArrangeSelect_Slider_Left').attr('disabled', 'disabled');
				}
				else if(ui.value == 1000 + num){
					$('#Menu_Edit_ShapeImages_ArrangeSelect_Slider_Right').attr('disabled', 'disabled');
				}
				var data = {'zindex':ui.value};
				sendMessage(com.kenny.util.Observer.MessageType.UPDATE_ZINDEX, currentSelectedObj, data);
			}
		});
		$('#Menu_Edit_ShapeImages_ArrangeSelect_Slider_Left').removeAttr('disabled');
		$('#Menu_Edit_ShapeImages_ArrangeSelect_Slider_Right').removeAttr('disabled');
		if(initValue == 1001){
			$('#Menu_Edit_ShapeImages_ArrangeSelect_Slider_Left').attr('disabled', 'disabled');
		}
		else if(initValue == 1000 + num){
			$('#Menu_Edit_ShapeImages_ArrangeSelect_Slider_Right').attr('disabled', 'disabled');
		}
	}
	
	//Opacity
	var opacity = currentSelectedObj.getOpacity();
	if(opacity == null || isNaN(opacity)) opacity=1;
	$("#Menu_Edit_ShapeImageSet_StyleOption_Image_Effects_Slider").slider({
        value: opacity * 100,
        min: 0,
        max: 100,
        step: 10,
        slide: function (event, ui) {
			$("#Menu_Edit_ShapeImageSet_StyleOption_Image_Effects_opacity").text(ui.value + "%");
			var id = currentSelectedObj.getId();
			$('#' + id).css('opacity',ui.value/100);
        }
    });
	
    $("#Menu_Edit_ShapeImageSet_StyleOption_Image_Effects_opacity").text($("#Menu_Edit_ShapeImageSet_StyleOption_Image_Effects_Slider").slider("value") + "%");
    
    // fill
    var fillColor = currentSelectedObj.getColor();
    //alert(color);
	$("#Menu_Edit_ShapeImageSet_StyleOption_Image_FillOne .Color_colorDiv_normal").each(function (i) {
		var color = $(this).attr('command');
		if(fillColor.toUpperCase() == color.toUpperCase()){
			$("#check_shape_fill_color").remove();
		    $(this).append('<div id="check_shape_fill_color" style="border:0px;margin-left:35px;position:relative;top:50%;left:10%;">' +
		    		'<img src="./images/icon_choosed.png" style="height:13px;width:13px;margin-left:6px;"/></div>');
		}
	});
    $("#Menu_Edit_ShapeImageSet_StyleOption_Image_FillTwo .Color_MultiStylePanel div").each(function (i) {
		var color = $(this).attr('command');
		if(fillColor == color){
			$("#check_shape_fill_color").remove();
			$(this).append('<div id="check_shape_fill_color" style="border:0px;margin-left:25px;margin-top:95px;">' +
					'<img src="./images/icon_choosed.png" style="height:13px;width:13px;margin-left:-12px;"/></div>');
		}
	});
    //border color
    var borderColor = currentSelectedObj.getBorderColor();
    if(borderColor == null || borderColor == 'none'){
		$("#Menu_Image_borderColorSelect_button").css('backgroundColor',"black").attr('command','#000');
	} else {
		$("#Menu_Image_borderColorSelect_button").css('backgroundColor',borderColor).attr('command',borderColor);
	}
    //$("#check_shape_border_color").remove();
    
    
    $("#check_shape_border_color").remove();
    $("#Menu_Edit_ShapeImageSet_StyleOption_Image_ColorOne .Color_colorDiv_normal").each(function (i) {
		var color = $(this).css('background');
		var color2 = $(this).attr('command');
		var color3 = color2.toLowerCase();
		if(borderColor == color || borderColor == color2 || borderColor == color3){
			$(this).append('<div id="check_shape_border_color" style="border:0px;margin-left:35px;position:relative;top:50%;left:10%;">' +
					'<img src="./images/icon_choosed.png" style="height:13px;width:13px;margin-left:6px;"/></div>');
		}
	});
    
	$("#Menu_Edit_ShapeImageSet_StyleOption_Image_BorderColorTwo .Color_MultiStylePanel div").each(function (i) {
		var color = $(this).css('background');
		var color2 = $(this).attr('command');
		var color3 = color2.toLowerCase();
		if(borderColor == color || borderColor == color2 || borderColor == color3){
			$(this).append('<div id="check_shape_border_color" style="border:0px;margin-left:25px;margin-top:95px;">' +
					'<img src="./images/icon_choosed.png" style="height:13px;width:13px;margin-left:-12px;"/></div>');
		}
	});
	// border width
	var boederWidth = currentSelectedObj.getBorderWidth();
	if(boederWidth == null) boederWidth = 0;
	$("#Menu_Edit_ShapeImageSet_StyleOption_Image_BorderMySlider").slider({
        value: boederWidth,
        min: 1,
        max: 25,
        step: 1,
        slide: function (event, ui) {
            $("#Menu_Edit_ShapeImageSet_StyleOption_Image_BorderThisOpacity").text(ui.value + "px");
			var data = {'StyleOptionMarginSlider':ui.value};
			sendMessage(com.kenny.util.Observer.MessageType.SHAPE_STYLE,
	              currentSelectedObj,
	              data);
        }
    });
    $("#Menu_Edit_ShapeImageSet_StyleOption_Image_BorderThisOpacity").text("" + $("#Menu_Edit_ShapeImageSet_StyleOption_Image_BorderMySlider").slider("value") + "px");
    // border line
    var borderStyle = currentSelectedObj.getBorderStyle();
    if(borderStyle == null) borderStyle = '0,0';
    $("#check_img_border_line_color").remove();
	//alert(borderStyle);
    if(borderStyle != null){
    	var borderLineId;
    	switch(borderStyle){
    	case '0,0':
    		borderLineId = "solid";
    		break;
    	case '1,1':
    		borderLineId = "dashed";
    		break;
    	case '2,2':
    		borderLineId = "halfDashed";
    		break;
    	case '4,4':
    		borderLineId = "thickDashed";
    		break;
    	case '3,3':
    		borderLineId = "pointDashed";
    		break;
    	case '0, 0':
    		borderLineId = "solid";// temp
    		break;
    	}
    	var image = $("#Menu_Edit_ShapeImage_border_lineSet img[imageLineStyle="+ borderLineId+"]");
    	if(image != null){
    		image.parent().append('<div id="check_img_border_line_color" style="border:0px;float:right;margin-top:-20px;margin-right:5px">' +
    			  '<img src="./images/icon_choosed.png" style="height:13px;width:13px;margin-left:-12px;margin-top:30px;"/></div>');
    	}
    }
    /**
    //text color
    var textColor = currentSelectedObj.getFontColor();
    if(textColor == null || textColor == 'none'){
		$("#Menu_Edit_ShapeImage_TextColorSelect_Button").css('backgroundColor',"black");
	} else {
    $("#Menu_Edit_ShapeImage_TextColorSelect_Button").css('background',textColor);
    $("#check_shape_text_color").remove();
    $("#Menu_Edit_ShapeImage_TextColor_One .Color_colorDiv_normal").each(function (i) {
	    	//var color = $(this).css('backgroundColor');    
	    	var color =$(this).attr('command'); 	    	
			if(textColor.toUpperCase()== color.toUpperCase()){					
			$(this).append('<div id="check_shape_text_color" style="border:0px;margin-left:35px;position:relative;top:50%;left:10%;">' +
					'<img src="./images/icon_choosed.png" style="height:13px;width:13px;margin-left:0px;"/></div>');
		}
    });
    $("#Menu_Edit_ShapeImage_TextColor_Two .Color_MultiStylePanel div").each(function (i) {
			//var color = $(this).css('backgroundColor');
			var color =$(this).attr('command');			
			if(textColor.toUpperCase() == color.toUpperCase()){				
			$(this).append('<div id="check_shape_text_color" style="border:0px;margin-left:25px;margin-top:95px;">' +
					'<img src="./images/icon_choosed.png" style="height:13px;width:13px;margin-left:-12px;"/></div>');
		}
    });
	}
    
    //fontFamily    
    var fontFamily =currentSelectedObj.getFontFamily();   
    $("#Menu_Edit_ShapeImage_FontSelect_button").text(fontFamily);     
    $("#Menu_Edit_ShapeImage_Fonts_Checkbox .ui-widget-content").each(function (i){
    	var font =$(this).attr('shapeTextFontStyle');
    	 if(fontFamily==font)
    	 {	    		 
    		 $("#Menu_Edit_ShapeImage_FontSet").remove();
    		 $(this).children('span').before('<div id="Menu_Edit_ShapeImage_FontSet" style="float:right;border:0px;margin-right:5px;margin-top:10px;">' +
    		 		'<img src="./images/icon_choosed.png" style="height:13px;width:13px;margin-left:-12px;"/></div>');
    	 }
    });
    //text (B I U $)// TODO
    var styleB = currentSelectedObj.getFontWeight();
    var styleI = currentSelectedObj.getFontStyle();
    var styleU = currentSelectedObj.getFontUnderline();
    var styleLinethrough = currentSelectedObj.getFontLinethrough(); 
    var fontSize = currentSelectedObj.getFontSize();
    var fontColor = currentSelectedObj.getFontColor();
    
    $('#Menu_Edit_ShapeImage_MutiSelectButton label').each(function () {
    	$(this).removeClass('ui-state-active');
    });
    if(styleB == 'bold'){//add ui-state-active
    	$('#Menu_Edit_ShapeImage_MutiSelectButton label[for=Menu_Edit_ShapeImage_MutiSelectButton_Bold]').addClass('ui-state-active');
    	$('#Menu_Edit_ShapeImage_MutiSelectButton_Bold').attr('checked', true);
    } else {
    	$('#Menu_Edit_ShapeImage_MutiSelectButton_Bold').attr('checked', false);
    }
    if(styleI == 'italic'){
    	$('#Menu_Edit_ShapeImage_MutiSelectButton label[for=Menu_Edit_ShapeImage_MutiSelectButton_italic]').addClass('ui-state-active');
    	$('#Menu_Edit_ShapeImage_MutiSelectButton_italic').attr('checked', true);
    } else {
    	$('#Menu_Edit_ShapeImage_MutiSelectButton_italic').attr('checked', false);
    }
    if(styleU){
    	$('#Menu_Edit_ShapeImage_MutiSelectButton label[for=Menu_Edit_ShapeImage_mutiSelectButton_underline]').addClass('ui-state-active');
    	$('#Menu_Edit_ShapeImage_mutiSelectButton_underline').attr('checked', true);
    } else {
    	$('#Menu_Edit_ShapeImage_mutiSelectButton_underline').attr('checked', false);
    }
    if(styleLinethrough){
    	$('#Menu_Edit_ShapeImage_MutiSelectButton label[for=Menu_Edit_ShapeImage_MutiSelectButton_delete]').addClass('ui-state-active');
    	$('#Menu_Edit_ShapeImage_MutiSelectButton_delete').attr('checked', true);
    } else {
    	$('#Menu_Edit_ShapeImage_MutiSelectButton_delete').attr('checked', false);
    }
    
    $("#Menu_Edit_ShapeImage_LineSet").remove();
    
    var selectedDiv = '<div id="Menu_Edit_ShapeImage_LineSet" style="float:right;border:0px;margin-right:5px;margin-top:10px;">' 
		+ '<img src="./images/icon_choosed.png" style="height:13px;width:13px;margin-left:-12px;"/></div>';
    
    var styleTitle = fontSize == '30' && styleB == 'bold' && styleI == 'normal' && !styleU && !styleLinethrough;
    var styleTitleSmall = fontSize == '26' && styleB == 'bold' && styleI == 'normal' && !styleU && !styleLinethrough;
    var styleSubTitle = fontSize == '20' && styleB == 'bold' && styleI == 'italic' && !styleU && !styleLinethrough;
    var styleBody = fontSize == '16' && styleB == 'normal' && styleI == 'normal' && !styleU && !styleLinethrough;
    var styleBodySmall = fontSize == '14' && styleB == 'normal' && styleI == 'normal' && !styleU && !styleLinethrough;
    var styleLable = fontSize == '12' && styleB == 'normal' && styleI == 'normal' && !styleU && !styleLinethrough && fontColor == '#ffffff';
    var styleLableDark = fontSize == '12' && styleB == 'normal' && styleI == 'normal' && !styleU && !styleLinethrough && fontColor == '#000000';
   
	$('#Menu_Edit_ShapeImage_Checkbox li').each(function(){
		if($(this).attr('shapeTextParagraphStyle') == 'title' && styleTitle) {
			$(this).children('span').before(selectedDiv);
		}
		if($(this).attr('shapeTextParagraphStyle') == 'title-small' && styleTitleSmall) {
			$(this).children('span').before(selectedDiv);
		}
		if($(this).attr('shapeTextParagraphStyle') == 'subtitle' && styleSubTitle) {
			$(this).children('span').before(selectedDiv);
		}
		if($(this).attr('shapeTextParagraphStyle') == 'body' && styleBody) {
			$(this).children('span').before(selectedDiv);
		}
		if($(this).attr('shapeTextParagraphStyle') == 'body-small' && styleBodySmall) {
			$(this).children('span').before(selectedDiv);
		}
		if($(this).attr('shapeTextParagraphStyle') == 'lable' && styleLable) {
			$(this).children('span').before(selectedDiv);
		}
		if($(this).attr('shapeTextParagraphStyle') == 'lable-dark' && styleLableDark) {
			$(this).children('span').before(selectedDiv);
		}
	});
    
    $('#Menu_Edit_ShapeImage_TextOptions_SetFontSize').val(fontSize);
    **/
}
