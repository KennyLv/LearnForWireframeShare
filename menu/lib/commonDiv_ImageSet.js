function menuu_edit_image_ready() {
    $("#menu_edit_img").tabs();
    //$("#menu_edit_img_option_color").css('display', 'none');
    /*menu edit image border */
    $("#menu_edit_img_style_border_choose").buttonset();
    $("#menu-image-border-line").selectable();
    $("#menu-image-flip-mask").selectable();
    $("#menu_edit_img_flip_choose").buttonset();


    /*menu edit image border width*/
    $("#menu_edit_img_style_border_width_slider").slider({
        value: 1,
        min: 0,
        max: 25,
        step: 1,
        slide: function (event, ui) {
            $("#menu_edit_img_style_border_width_text").text("　" + ui.value + "px");
            sendMessage(com.kenny.util.Observer.MessageType.IMAGE_SETSTYLE,
                    currentSelectedObj,
                    { 'borderWidth': ui.value });
        }
    });
    $("#menu_edit_img_style_border_width_text").text("　" + $("#menu_edit_img_style_border_width_slider").slider("value") + "px");

    /*menu edit image effort shadow*/
    $("#menu_edit_img_effort_shadow_choose").buttonset();
    $("#menu_edit_img_effort_shadow_On").click(function () {
        $("#menu_edit_im_effort_shadow_style").css('display', 'block');
        $("#menu_edit_img_effort_shadow").css("height","110px");
        $("#menu_edit_img_effort_shadow").parent().css("height","110px");
        
        var shadow = $("#menu_image_check_shaow").parent().attr('commend');
        currentSelectedObj.setShadow(shadow);
    });
    $("#menu_edit_img_effort_shadow_Off").click(function () {
        $("#menu_edit_im_effort_shadow_style").css('display', 'none');
        $("#menu_edit_img_effort_shadow").css("height","35px");
        $("#menu_edit_img_effort_shadow").parent().css("height","35px");
        
		currentSelectedObj.setShadow('');
        
    });
    $("#menu_edit_img_style_borderOption").click(function (e) {
        $('#menu_edit_img_stylePannel').css('display', "none");
        $('#menu_edit_img_optionPannel').css('display', 'block');
        $('#menu_edit_img_option_borderPannel').css('display', 'block');
    });

    $("#menu_edit_img_style_effortOption").click(function (e) {
        $('#menu_edit_img_stylePannel').css('display', "none");
        $('#menu_edit_img_optionPannel').css('display', 'block');
        $('#menu_edit_img_option_effortPannel').css('display', "block");
    });

    $("#menu_edit_img_style_border_color").click(function (e) {
        $('#menu_edit_img_optionPannel').css('display', 'none');
        $('#menu_edit_img_option_BorderColor').css('display', "block");
    });
    $("#menu_edit_img_style_border_color_goBack").click(function (e) {
        $('#menu_edit_img_optionPannel').css('display', 'block');
        $('#menu_edit_img_option_BorderColor').css('display', "none");
    });

    $("#menu_edit_img_styleOption_goBack").click(function (e) {
        $('#menu_edit_img_stylePannel').css('display', "block");
        $('#menu_edit_img_optionPannel').css('display', 'none');
        $('#menu_edit_img_option_effortPannel').css('display', "none");
        $('#menu_edit_img_option_borderPannel').css('display', 'none');
    });

    // shadow
    $("#menu_edit_im_effort_shadow_style div").click(function () {
        //var shadow = $(this).css('box-shadow');
        
        var shadow = $(this).attr('commend');
        //alert(shadow);
        var data = { 'shadow': shadow };
    	$("#menu_image_check_shaow").remove();
    	var browersNm = window.navigator.userAgent.toLowerCase();
    	// 临时改法
    	if(browersNm.indexOf('safari') == -1 || browersNm.indexOf('chrome') != -1){
	    	$(this).append('<div id="menu_image_check_shaow" style="border:0px;margin-top:25px;">' +
					'<input type="checkbox" disabled="true" checked="true"></div>');
    	} else {
	    	$(this).append('<div id="menu_image_check_shaow" style="border:0px;margin-top:25px;float:right;margin-right:3px;width:12px;height:12px;background-color:white">' +
	    			'<img src="./images/icon_choosed.png"  style="height:13px;width:13px;margin-left:-12px;"/></div>');
    	}
        sendMessage(com.kenny.util.Observer.MessageType.IMAGE_SETSTYLE,
              currentSelectedObj,
              data);
    });

    /*menu edit image effort reflection */
    $("#menu_edit_img_effort_reflection_choose").buttonset();
    $("#menu_edit_img_effort_reflection_On").click(function () {
        $("#menu_edit_im_effort_reflection_style").css('display', 'block');
        $("#menu_edit_img_effort_reflection_pannel").css("height","55px");
        var ref = $("#menu_edit_img_effort_reflection_slider").slider("value");
        //alert(ref); TODO
        if(ref!=0){
        	currentSelectedObj.setReflection(ref);
        }
    });
    $("#menu_edit_img_effort_reflection_Off").click(function () {
        $("#menu_edit_im_effort_reflection_style").css('display', 'none');
        $("#menu_edit_img_effort_reflection_pannel").css("height","25px");
        currentSelectedObj.setReflection(0);//TODO
    });

    $("#menu_edit_img_effort_reflection_slider").slider({
        value: 0,
        min: 0,
        max: 100,
        step: 10,
        slide: function (event, ui) {
        	if(!$.browser.webkit){
        		alert('This option only support webkit browser!');
        		return;
        	}
            $("#menu_edit_img_effort_reflection").text(ui.value + "%");
            var data = { 'reflection': ui.value };
            sendMessage(com.kenny.util.Observer.MessageType.IMAGE_SETSTYLE,
                  currentSelectedObj,
                  data);
        }
    });
    $("#menu_edit_img_effort_reflection").text($("#menu_edit_img_effort_reflection_slider").slider("value") + "%");

//    $("#menu_edit_img_effort_opacity_slider").slider({
//        value: 100,
//        min: 0,
//        max: 100,
//        step: 10,
//        slide: function (event, ui) {
//            $("#menu_edit_img_effort_opacity").text(ui.value + "%");
//            var data = { 'effOpacity': ui.value };
//            sendMessage(com.kenny.util.Observer.MessageType.IMAGE_SETSTYLE,
//                  currentSelectedObj,
//                  data);
//        }
//    });
    $("#menu_edit_img_effort_opacity").text($("#menu_edit_img_effort_opacity_slider").slider("value") + "%");

    $("#menu_edit_img_arrange_setting_flipV").click(function () {
        sendMessage(com.kenny.util.Observer.MessageType.IMAGE_SETSTYLE,
                currentSelectedObj,
                //{'flip':currentSelectedObj.setFlip({x:(currentSelectedObj.getFlip().x + 180), y:currentSelectedObj.getFlip().y})});
                {'flip':{x:(currentSelectedObj.getFlip().x + 180), y:currentSelectedObj.getFlip().y}});
    });
    $("#menu_edit_img_arrange_setting_flipH").click(function () {
        sendMessage(com.kenny.util.Observer.MessageType.IMAGE_SETSTYLE,
                currentSelectedObj,
                //{'flip':currentSelectedObj.setFlip({x:currentSelectedObj.getFlip().x, y:(currentSelectedObj.getFlip().y + 180)})});
                {'flip':{x:currentSelectedObj.getFlip().x, y:(currentSelectedObj.getFlip().y + 180)}});
    });
    $("#menu_edit_img_arrange_setting_maskReset").click(function () {
    	$("#menu_img_cover_slide").css("display","none");
        //alert("maskReset SlideValue:" + arrangeSlideValue);
        sendMessage(com.kenny.util.Observer.MessageType.IMAGE_SETSTYLE,
                currentSelectedObj,
                {});
    });
    $("#menu_edit_img_arrange_setting_maskEdit").click(function () {
    	$("#menu_img_cover_slide").css("display","block");
    });
    
    $("#menu_img_cover_Slide_content").slider({
        value: 0,
        min: 0,
        max: 100,
        step: 10,
        slide: function (event, ui) {
            //$("#menu_img_cover_Slide_text").text(ui.value + "%");
            var data = { 'maskEdit': ui.value };
            sendMessage(com.kenny.util.Observer.MessageType.IMAGE_SETSTYLE,
                  currentSelectedObj,
                  data);
        }
    });
    //$("#menu_img_cover_Slide_text").text($("#menu_img_cover_Slide_content").slider("value") + "%");
    $("#menu_img_cover_Slide_text").click(function () {
    	$("#menu_img_cover_slide").css("display","none");
    });

    $("#menu_edit_img_style_border_On").click(function () {
        $("#menu_edit_img_style_border_settingPannel").css('display', 'block');
        
        var borderWidth = $("#menu_edit_img_style_border_width_slider").slider("value");
        if(borderWidth == null || borderWidth==0){
        	borderWidth = 1;
        }
//		currentSelectedObj.setBorderWidth(borderWidth);
		var borderColor = $("#Menu_Edit_img_border_Color").css('backgroundColor');
		if(borderColor == null || borderColor == undefined){
			$("#Menu_Edit_img_border_Color").css('backgroundColor');
		}
//		currentSelectedObj.setBorderColor(borderColor);
		var childImg=$("#check_img_border_line_color").parent().children('img')[0];
		var borderStyle = $(childImg).attr('imageLineStyle');
		if(borderStyle == null || borderStyle == undefined){
			borderStyle = 'solid';
		}
//		currentSelectedObj.setBorderStyle(borderStyle);
		sendMessage(com.kenny.util.Observer.MessageType.IMAGE_SETSTYLE,
	               currentSelectedObj,
	               { 'borderWidth': borderWidth,'borderStyle':borderStyle,'borderColor':borderColor });
		initImageMenu();
    });
    $("#menu_edit_img_style_border_Off").click(function () {
        $("#menu_edit_img_style_border_settingPannel").css('display', 'none');
//        currentSelectedObj.setBorderWidth(0);
//		currentSelectedObj.setBorderColor('none');
//		currentSelectedObj.setBorderStyle('none');
		sendMessage(com.kenny.util.Observer.MessageType.IMAGE_SETSTYLE,
	               currentSelectedObj,
	               { 'borderWidth': 0,'borderStyle':'none','borderColor':'none' });
    });

    // 第一页img点击
    $("#menu_edit_img_styleChoosePannel .menu_edit_img_style_div").click(function () {
        var styleClass = $(this).children("img").attr('class');
        var borderImage = 'none';
        var borderImageWidth = 0;
        switch(styleClass){
			case 'style1':
		    	break;
		    case 'style2':
		    	borderImage = 'url("./images/divImage/common/image/template/IMG_0131.png")18 22 15 18 repeat repeat';
		    	borderImageWidth = 22;
		    	break;
		    case 'style3':
		    	borderImage = 'url("images/divImage/common/image/template/IMG_0051.png") 26 30 27 28 repeat repeat';
		    	borderImageWidth = 22;
		    	break;
		    case 'style4':
		    	borderImage = 'url("images/divImage/common/image/template/IMG_0011.png") 12 23 24 20 stretch repeat';
		    	borderImageWidth = 22;
		    	break;
		    case 'style5':
		    	borderImage = 'url("images/divImage/common/image/template/IMG_0041.png") 25 28 20 24 stretch stretch';
		    	borderImageWidth = 22;
		    	break;
		    case 'style6': 
		    	borderImage = 'url("images/divImage/common/image/template/IMG_0091.png") 28 27 11 23 stretch repeat';
		    	borderImageWidth = 22;
		    	break;
        };
//        //$("#menu_edit_img_styleChoosePannel .menu_edit_img_style_div").css('border','1px solid #eeeeee');
//        $(this).css('border','1px solid #8DDF48');
        sendMessage(com.kenny.util.Observer.MessageType.IMAGE_SETSTYLE,
               currentSelectedObj,
               { 'borderImage': borderImage,'borderWidth':borderImageWidth });
//               { 'imgStyleClass': styleClass });
    });

    /*menu edit image border style*/
    $("#menu_edit_img_style_border_stylechoose .menu_edit_img_border_style_div img").click(function () {
        var styleBorderClass = $(this).attr('class');
        var data = { 'borderStyle': styleBorderClass };
        
        sendMessage(com.kenny.util.Observer.MessageType.IMAGE_SETSTYLE,
              currentSelectedObj,
              data);
    });
    // image_line
    $("#menu_edit_img_style_border_line .ui-widget-content img").click(function () {
        //var styleLineClass = $(this).attr('class');
        //var changeImgStyle = styleLineClass.split(' ')[1];
    	var changeImgStyle = $(this).attr('imageLineStyle');
        var data = { 'borderStyle': changeImgStyle };
        $("#check_img_border_line_color").remove();
        var browersNm = window.navigator.userAgent.toLowerCase();
    	// 临时改法
    	if(browersNm.indexOf('safari') == -1 || browersNm.indexOf('chrome') != -1){
		    $(this).parent().append('<div id="check_img_border_line_color" style="border:0px;float:right;margin-top:-20px;margin-right:5px">' +
		    		'<input type="checkbox" disabled="true" checked="true"></div>');
    	} else{
		    $(this).parent().append('<div id="check_img_border_line_color" style="border:0px;float:right;margin-top:-20px;margin-right:5px;width:12px;height:12px;background-color:white">' +
		    		'<img src="./images/icon_choosed.png"  style="height:13px;width:13px;margin-left:-12px"/></div>');
    	}
        sendMessage(com.kenny.util.Observer.MessageType.IMAGE_SETSTYLE,
              currentSelectedObj,
              data);
    });
    
    // set img border color 
    $("#menu_edit_img_option_BorderColor_setting .Color_colorDiv_normal,#menu_edit_img_option_BorderColor_setting .Color_MultiStylePanel div").click(
    		function () {
    		    var color = $(this).css('backgroundColor');
    		    var commend = $(this).attr("commend")
    		    var data = { 'borderColor': color };
    		    $("#check_img_Color").remove();
    		    var browersNm = window.navigator.userAgent.toLowerCase();
    		    if(commend.indexOf('Color_MultiStylePanel_') == -1) {//small color
    		    	if(browersNm.indexOf('safari') == -1 || browersNm.indexOf('chrome') != -1){
    		    		$(this).append('<div id="check_img_Color" style="border:0px;margin-left:35px;position:relative;top:50%;left:10%;">' +
    		    		       '<input type="checkbox" disabled="true" checked="true"/></div>');
    		    	} else {
    		    		$(this).append('<div id="check_img_Color" style="border:0px;margin-top:12px;float:right;margin-right:4px;width:13px;height:13px;">' +
						       '<img src="./images/icon_choosed.png"  style="height:13px;width:13px;"/></div>');
    		    	}
//	    		    $(this).append('<div id="check_img_Color" style="border:0px;margin-left:35px;margin-top:15px;">' +
//	    		    		'<input type="checkbox" disabled="true" checked="true"/></div>');
    		    } else {
    		    	if(browersNm.indexOf('safari') == -1 || browersNm.indexOf('chrome') != -1){
    		    		$(this).append('<div id="check_img_Color" style="border:0px;margin-left:25px;margin-top:95px;">' +
		    			        '<input type="checkbox" disabled="true" checked="true"/></div>');
    		    	} else {
    		    		$(this).append('<div id="check_img_Color" style="border:0px;margin-top:95px;float:right;margin-right:4px;width:12px;height:12px;background-color:white">' +
    		    		        '<img src="./images/icon_choosed.png" style="height:13px;width:13px;"/></div>');
    		    	}
//    		    	$(this).append('<div id="check_img_Color" style="border:0px;margin-left:25px;margin-top:95px;">' +
//		    			'<input type="checkbox" disabled="true" checked="true"/></div>');
    		    }
    		    $("#Menu_Edit_img_border_Color").css('backgroundColor',color);
    		    sendMessage(com.kenny.util.Observer.MessageType.IMAGE_SETSTYLE,
    	                currentSelectedObj,
    	                data);
    		}
    );

    $("#Menu_Edit_Images_Arrange_WrapAutomatic_BackToWrap").click(function (e) {
		$('#Menu_Edit_Images_Arrange_WrapAutomatic').css('display', 'none');
		$('#menu_edit_img_arrangeSetPannel').css('display', "block");
	});

    $("#Menu_Edit_Images_Arrange_WrapClick").click(function(e){
    	$('#menu_edit_img_arrangeSetPannel').css('display', 'none');
    	$('#Menu_Edit_Images_Arrange_WrapAutomatic').css('display', 'block');
    });

    $("#Menu_img_extraSpace-slider").slider({
    	disabled: true,
        value: 0,
        min: 0,
        max: 100,
        step: 10
//        slide: function (event, ui) {
//            $("#Menu_img_style-extraSpace").text(ui.value + "%");
//            var data = { 'maskEdit': ui.value };
//            sendMessage(com.kenny.util.Observer.MessageType.IMAGE_SETSTYLE,
//                  currentSelectedObj,
//                  data);
//        }
    });
    var currentSelWrapAutomatic = 'Automatic';
    $("#Menu_Edit_Images_Arrange_WrapAutomatic_BackToWrap_Checkbox > li").each(function (i) {
    	//$(this).attr("class","ui-widget-content ui-selectee Option_Box");
    	var liNm = $(this).text();
    	if(liNm == currentSelWrapAutomatic){
    		//$(this).attr("class","ui-widget-content ui-selectee");
    		$("#WrapAutomatic-checkBox").remove();
    		$(this).children('span').before('<div id="WrapAutomatic-checkBox" style="border:0px;float:right;margin-top:10px;margin-right:5px">' +
    		    '<img src="./images/icon_choosed.png" style="height:13px;width:13px;"/></div>');
    	}
    });
    $("#Menu_Edit_Images_Arrange_WrapAutomatic_BackToWrap_Checkbox > li").click(function(e){
    	$("#WrapAutomatic-checkBox").remove();
		$(this).children('span').before('<div id="WrapAutomatic-checkBox" style="border:0px;float:right;margin-top:10px;margin-right:5px">' +
		    '<img src="./images/icon_choosed.png" style="height:13px;width:13px;"/></div>');
    });
    $("#Menu_img_style-extraSpace").text($("#Menu_img_extraSpace-slider").slider("value") + "%");
    
    $("#Menu_Edit_Images_Arrange_WrapAutomatic_Button").buttonset();
    
    $("#Menu_Edit_Images_Arrange_WrapAutomatic_BackToWrap_Checkbox").selectable();

    commonControl_PageTurnning("menu_edit_img_option_BorderColor_setting");
    /*button listener*/

   $("#menu_edit_img_flip_On").click(function(e){
	   sendMessage(com.kenny.util.Observer.MessageType.IMAGE_FOCUS, currentSelectedObj, {"fliparea":"on"});
   });
   
   $("#menu_edit_img_flip_Off").click(function(e){
	   sendMessage(com.kenny.util.Observer.MessageType.IMAGE_FOCUS, currentSelectedObj, {"fliparea":"off"});
   });
};

function updateImageMenu(objData) {

    $("#menu_edit_img_styleChoosePannel .menu_edit_img_style_div img").attr("src",objData.src);

};
function initImageMenu(){
	
		var shadowNm = currentSelectedObj.getData().shadow;
		
		$("#menu_image_check_shaow").remove();
		if(shadowNm != null && shadowNm != ''){
			var shadow = shadowNm.split(')')[1].trim();
			var shadowId;
			switch(shadow){
				case '0px 0px 15px 0px' : 
					shadowId = ".menu_img_style_shaow1";
					break;
				case '0px 0px 10px 0px':
					shadowId = ".menu_img_style_shaow2";
					break;
				case '0px 0px 5px 0px':
					shadowId = ".menu_img_style_shaow3";
					break;
				case '3px 3px 5px 0px':
					shadowId = ".menu_img_style_shaow4";
					break;
			}
//	    	$(shadowId).append('<div id="menu_image_check_shaow" style="border:0px;margin-top:25px;">' +
//					'<input type="checkbox" disabled="true" checked="true"></div>');
	    	var browersNm = window.navigator.userAgent.toLowerCase();
	    	// 临时改法
	    	if(browersNm.indexOf('safari') == -1 || browersNm.indexOf('chrome') != -1){
	    		$(shadowId).append('<div id="menu_image_check_shaow" style="border:0px;margin-top:25px;">' +
						'<input type="checkbox" disabled="true" checked="true"></div>');
	    	} else {
	    		$(shadowId).append('<div id="menu_image_check_shaow" style="border:0px;margin-top:25px;float:right;margin-right:3px;width:12px;height:12px;background-color:white">' +
	    				'<img src="./images/icon_choosed.png"  style="height:13px;width:13px;margin-left:-12px;"/></div>');
	    	}
		}
    	//$("#menu_edit_im_effort_shadow_style").css('display', 'none');
        //$("#menu_edit_img_effort_shadow").css("height","25px");
    	
    	var opacity = currentSelectedObj.getData().opacity;
    	if(opacity == null ) opacity=1;
		$("#menu_edit_img_effort_opacity_slider").slider({
	        value: opacity * 100,
	        min: 0,
	        max: 100,
	        step: 10,
	        slide: function (event, ui) {
	            $("#menu_edit_img_effort_opacity").text(ui.value + "%");
	            var data = { 'effOpacity': ui.value };
	            //currentSelectedObj.setOpacity(ui.value/100);
	            var id = currentSelectedObj.getId();
	            $('#' + id).css('opacity',ui.value/100);  //        style.opacity = ui.value/100;
//	            sendMessage(com.kenny.util.Observer.MessageType.IMAGE_SETSTYLE,
//	                  currentSelectedObj,
//	                  data);
	        }
	    });
	    $("#menu_edit_img_effort_opacity").text($("#menu_edit_img_effort_opacity_slider").slider("value") + "%");
	    
	    $("#menu_edit_img_effort_opacity_slider").mouseup(function(e){
    		var effOpacity = $("#menu_edit_img_effort_opacity_slider").slider("value");
    		sendMessage(com.kenny.util.Observer.MessageType.IMAGE_SETSTYLE,
                    currentSelectedObj,
                    { 'opacity': effOpacity });
    	});
    	
    	var borderColor = currentSelectedObj.getData().borderColor;
    	if(borderColor == null || borderColor == 'none'){
    		$("#Menu_Edit_img_border_Color").css('backgroundColor',"black");
    	} else {
    		$("#Menu_Edit_img_border_Color").css('backgroundColor',borderColor);
    	}
    	$("#check_img_Color").remove();
    	$("#menu_edit_img_option_BorderColor_setting .Color_colorDiv_normal").each(function (i) {
    		var color = $(this).css('backgroundColor');
    		if(borderColor == color){
//    			$(this).append('<div id="check_img_Color" style="border:0px;margin-left:35px;margin-top:15px;">' +
//	    			'<input type="checkbox" disabled="true" checked="true"/></div>');
    			$(this).append('<div id="check_img_Color" style="border:0px;margin-top:12px;float:right;margin-right:4px;width:13px;height:13px;">' +
			         '<img src="./images/icon_choosed.png" style="height:13px;width:13px;"/></div>');
    		}
    	});
    	$("#menu_edit_img_option_BorderColor_setting .Color_MultiStylePanel div").each(function (i) {
    		var color = $(this).css('backgroundColor');
    		if(borderColor == color){
//    			$(this).append('<div id="check_img_Color" style="border:0px;margin-left:25px;margin-top:95px;">' +
//	    			'<input type="checkbox" disabled="true" checked="true"/></div>');
    			$(this).append('<div id="check_img_Color" style="border:0px;margin-top:95px;float:right;margin-right:4px;width:12px;height:12px;background-color:white">' +
		            '<img src="./images/icon_choosed.png" style="height:13px;width:13px;"/></div>');
    		}
    	});
    	
    	var boederWidth = currentSelectedObj.getData().borderWidth;
    	if (boederWidth == null || boederWidth == 0){
    		$("#menu_edit_img_style_border_choose label").removeClass("ui-state-active");
    		$("#menu_edit_img_style_border_settingPannel").hide();
    	}
    	if (boederWidth == null) boederWidth = 1;
    	
/*    	$("#menu_edit_img_style_border_width_slider").mouseup(function(e){
    		var borderWidth = $("#menu_edit_img_style_border_width_slider").slider("value");
    		//alert(borderWidth);
    		sendMessage(com.kenny.util.Observer.MessageType.IMAGE_SETSTYLE,
                    currentSelectedObj,
                    { 'borderWidth': borderWidth });
    	});
    	
    	$("#menu_edit_img_style_border_width_slider").slider({
            value: boederWidth,
            min: 1,
            max: 25,
            step: 1,
            slide: function (event, ui) {
                $("#menu_edit_img_style_border_width_text").text("" + ui.value + "px");
                //currentSelectedObj.setBorderWidth(ui.value);
                var id = currentSelectedObj.getId();
                $('#' + id).css('borderWidth',ui.value);
//                sendMessage(com.kenny.util.Observer.MessageType.IMAGE_SETSTYLE,
//                        currentSelectedObj,
//                        { 'borderWidth': ui.value });
            }
        });
        $("#menu_edit_img_style_border_width_text").text("" + $("#menu_edit_img_style_border_width_slider").slider("value") + "px");*/
        
    	$("#menu_edit_img_style_border_width_slider").slider("value",boederWidth);
    	$("#menu_edit_img_style_border_width_text").text(boederWidth+"px");
    	
        var borderStyle = currentSelectedObj.getData().borderStyle;
        // TODO
        if(borderStyle == null || borderStyle == 'none') borderStyle = 'none';
        $("#check_img_border_line_color").remove();
        if(borderStyle != null){
        	var borderLineId;
        	switch(borderStyle){
	        	case 'solid':
	        		borderLineId = '.menu_image_line_img1';
	        		break;
	        	case 'dotted':
	        		borderLineId = '.menu_image_line_img2';
	        		break;
	        	case 'dashed':
	        		borderLineId = '.menu_image_line_img3';
	        		break;
	        	case 'halfdashed':
	        		borderLineId = '.menu_image_line_img4';
	        		break;
	        	case 'halfdotted':
	        		borderLineId = '.menu_image_line_img5';
	        		break;
	        	case 'xsolid':
	        		borderLineId = '.menu_image_line_img6';
	        		break;
        	}
//        	$(borderLineId).parent().append('<div id="check_img_border_line_color" style="border:0px;float:right;margin-top:-20px;margin-right:5px">' +
//    			'<input type="checkbox" disabled="true" checked="true"></div>');
        	var browersNm = window.navigator.userAgent.toLowerCase();
        	//alert(browersNm);
	    	if(browersNm.indexOf('safari') == -1 || browersNm.indexOf('chrome') != -1){
	    		$(borderLineId).parent().append('<div id="check_img_border_line_color" style="border:0px;float:right;margin-top:-20px;margin-right:5px">' +
	        			'<input type="checkbox" disabled="true" checked="true"></div>');
	    	} else {
	        	$(borderLineId).parent().append('<div id="check_img_border_line_color" style="border:0px;float:right;margin-top:-20px;margin-right:5px;width:12px;height:12px;background-color:white">' +
	        			'<img src="./images/icon_choosed.png" style="height:13px;width:13px;margin-left:-12px;"/></div>');
	    	}
        }
        
	    //$("#menu-edit-image-arrange").click(function(e){
		var initValue = currentSelectedObj.getZIndex();
		var container = getActiveContainer();
		var num = container.getAllElements().length;// < 2 ? 2 : container.getAllElements().length;
		if(num < 2){
			$("#menu_edit_img_arrange_slider").slider({ disabled: true });
			$('#menu_edit_img_arrange_Reduce img').attr('disabled', true);
			$('#menu_edit_img_arrange_Add img').attr('disabled', true);
		} else {
			$("#menu_edit_img_arrange_slider").slider({
				disabled: false,
				value : initValue,
				min: 1000,
				max: 1000 + 10*(num-1),
				step: 10,
				slide: function (event, ui) {
					$("#Menu_Image_style-arrange").text(ui.value + "%");
					
					$('#menu_edit_img_arrange_Reduce img').removeAttr('disabled');
					$('#menu_edit_img_arrange_Add img').removeAttr('disabled');
					if(ui.value == 1000){
						$('#menu_edit_img_arrange_Reduce img').attr('disabled', 'disabled');
					}
					else if(ui.value == 1000 + 10*(num-1)){
						$('#menu_edit_img_arrange_Add img').attr('disabled', 'disabled');
					}
					var data = {'zindex':ui.value};
					sendMessage(com.kenny.util.Observer.MessageType.UPDATE_ZINDEX, currentSelectedObj, data);
				}
			});
			$('#menu_edit_img_arrange_Reduce img').removeAttr('disabled');
			$('#menu_edit_img_arrange_Add img').removeAttr('disabled');
			if(initValue == 1000){
				$('#menu_edit_img_arrange_Reduce img').attr('disabled', 'disabled');
			}
			else if(initValue == 1000 + 10*(num-1)){
				$('#menu_edit_img_arrange_Add img').attr('disabled', 'disabled');
			}
		}		
		
		$('#menu_edit_img_arrange_Reduce img').unbind('click.reduce').bind('click.reduce', function(e){
			var container = getActiveContainer();
			var num = container.getAllElements().length;
			if(2 <= num){
				var initValue = currentSelectedObj.getZIndex();//1001;
				if(initValue > 1000){
					initValue -= 10;
				}
				//alert(1);
				$("#menu_edit_img_arrange_slider").slider({
					value : initValue
				});
				var data = {'zindex':initValue};
				sendMessage(com.kenny.util.Observer.MessageType.UPDATE_ZINDEX, currentSelectedObj, data);
				
				$('#menu_edit_img_arrange_Add img').removeAttr('disabled');
				if(initValue == 1000){
					$('#menu_edit_img_arrange_Reduce img').attr('disabled', 'disabled');
				}
			}
		});
		$('#menu_edit_img_arrange_Add img').unbind('click.add').bind('click.add', function(e){
			var container = getActiveContainer();
			var num = container.getAllElements().length;
			if(2 <= num){
				var initValue = currentSelectedObj.getZIndex();//1001;
				if(initValue < 1000 + 10*(num-1)){
					initValue += 10;
				}
				$("#menu_edit_img_arrange_slider").slider({
					value : initValue
				});
				var data = {'zindex':initValue};
				sendMessage(com.kenny.util.Observer.MessageType.UPDATE_ZINDEX, currentSelectedObj, data);
				//alert(2);
				$('#menu_edit_img_arrange_Reduce img').removeAttr('disabled');
				// < 2 ? 2 : container.getAllElements().length;
				if(initValue == 1000 + 10*(num-1)){
					$('#menu_edit_img_arrange_Add img').attr('disabled', 'disabled');
				}
			}
		});
		
		$("#menu_edit_img_turn_slider").slider({
			value : 0,
			min: -180,
			max: 180,
			step: 10,
			slide: function (event, ui) {
			   sendMessage(com.kenny.util.Observer.MessageType.IMAGE_SETSTYLE, currentSelectedObj, {'rotation':ui.value});
			}
		});
		
		$('#menu_edit_img_flip_choose label').removeClass('ui-state-active');
}


//Change selected item's background image
function selectImgStyle(obj) {
	$("#menu_edit_img_option img").css("background-image","none");
	obj.style.background='url("./images/04 Numbers/charts/btn_on.png")';
}

function selectImgArrange(obj) {
	$("#menu_edit_img_option img").css("background-image","none");
	obj.style.background='url("./images/04 Numbers/charts/btn_on.png")';
}
