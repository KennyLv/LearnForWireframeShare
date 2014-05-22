function commonDiv_DrawingMenu_ready(){
	$("#Menu_Drawing_Click_Content").tabs();
	$("#Menu_Drawing_Thickness_Slider").slider({
            value: 0,
            min: 0,
            max: 100,
            step: 2,
            slide: function (event, ui) {
                $("#Menu_Drawing_Thickness_Slider_Value").text(ui.value + "%");
            }
			
    });
	$("#Menu_Drawing_Thickness_Slider a").css('background','url("./images/05 Menus/Graphics/drawing/background/items_bkgd.png")no-repeat').css('width','20px').css('height','20px').css('border-radius','10px').css('-moz-border-radius','10px').css('-webkit-border-radius','10px').css('border','0px').css('margin-top','4px');
	$("#Menu_Drawing_Thickness_Slider_Value").text($("#Menu_Drawing_Thickness_Slider").slider("value") + "%");
	
	$("#Menu_Drawing_Eraser_Thickness_Slider").slider({
            value: 0,
            min: 0,
            max: 100,
            step: 2,
            slide: function (event, ui) {
                $("#Menu_Drawing_Eraser_Thickness_Slider_Value").text(ui.value + "%");
            }
			
    });
	$("#Menu_Drawing_Eraser_Thickness_Slider a").css('background','url("./images/05 Menus/Graphics/drawing/background/items_bkgd.png")no-repeat').css('width','20px').css('height','20px').css('border-radius','10px').css('-moz-border-radius','10px').css('-webkit-border-radius','10px').css('border','0px').css('margin-top','4px');
	$("#Menu_Drawing_Eraser_Thickness_Slider_Value").text($("#Menu_Drawing_Eraser_Thickness_Slider").slider("value") + "%");
	
	$("#Menu_Drawing_Eraser_Pressure_Slider").slider({
            value: 0,
            min: 0,
            max: 100,
            step: 2,
            slide: function (event, ui) {
                $("#Menu_Drawing_Eraser_Pressure_Slider_Value").text(ui.value + "%");
            }
			
    });
	$("#Menu_Drawing_Eraser_Pressure_Slider a").css('background','url("./images/05 Menus/Graphics/drawing/background/items_bkgd.png")no-repeat').css('width','20px').css('height','20px').css('border-radius','10px').css('-moz-border-radius','10px').css('-webkit-border-radius','10px').css('border','0px').css('margin-top','4px');
	$("#Menu_Drawing_Eraser_Pressure_Slider_Value").text($("#Menu_Drawing_Eraser_Pressure_Slider").slider("value") + "%");
	
	
	$("#Menu_Drawing_Tone_Slider").slider({
            value: 0,
            min: 0,
            max: 100,
            step: 2,
            slide: function (event, ui) {
                $("#Menu_Drawing_Tone_Slider_Value").text(ui.value + "%");
            }
			
    });
	$("#Menu_Drawing_Tone_Slider a").css('background','url("./images/05 Menus/Graphics/drawing/background/items_bkgd.png")no-repeat').css('width','20px').css('height','20px').css('border-radius','10px').css('-moz-border-radius','10px').css('-webkit-border-radius','10px').css('border','0px').css('margin-top','4px');
	$("#Menu_Drawing_Tone_Slider_Value").text($("#Menu_Drawing_Tone_Slider").slider("value") + "%");
	
	$("#Menu_Drawing_Opacity_Slider").slider({
            value: 0,
            min: 0,
            max: 100,
            step: 2,
            slide: function (event, ui) {
                $("#Menu_Drawing_Opacity_Slider_Value").text(ui.value + "%");
            }
			
    });
	$("#Menu_Drawing_Opacity_Slider a").css('background','url("./images/05 Menus/Graphics/drawing/background/items_bkgd.png")no-repeat').css('width','20px').css('height','20px').css('border-radius','10px').css('-moz-border-radius','10px').css('-webkit-border-radius','10px').css('border','0px').css('margin-top','4px');
	$("#Menu_Drawing_Opacity_Slider_Value").text($("#Menu_Drawing_Opacity_Slider").slider("value") + "%");
	
	$("#Menu_Drawing_Colour_Click").click(function (e) {
		$("#Menu_Drawing_AllColour_Show").css("left", e.layerX - 100).css('display', 'block');
	});

	$('#Menu_Drawing_Pencil_Content_Body_Show').click(function(e){
		$('.Menu_Drawing_Background_Title_Pencil_ItemStyle').css('background','url("./images/05 Menus/Graphics/drawing/background/main_hg.png")no-repeat');
		$('.Menu_Drawing_Background_Title_Eraser_ItemStyle').css('background','url("./images/05 Menus/Graphics/drawing/background/main_bkgd.png")no-repeat');
		$('.Menu_Drawing_Pencil_Content_Body').css('display','block');
		$('#Menu_Drawing_Eraser_Content_Body').css('display','none');
	});
	
	$('#Menu_Drawing_Eraser_Content_Body_Show').click(function(e){
		$('.Menu_Drawing_Background_Title_Eraser_ItemStyle').css('background','url("./images/05 Menus/Graphics/drawing/background/main_hg.png")no-repeat');
		$('.Menu_Drawing_Background_Title_Pencil_ItemStyle').css('background','url("./images/05 Menus/Graphics/drawing/background/main_bkgd.png")no-repeat');
		$('.Menu_Drawing_Pencil_Content_Body').css('display','none');
		$('#Menu_Drawing_Eraser_Content_Body').css('display','block');
	});
	
	$('#Menu_Drawing_AllColour_Show .draw_color_select img').click(function(e){
		var getDiv = document.getElementById("Menu_Drawing_AllColour_Show");
		var getImg = getDiv.getElementsByTagName("img");
		var i =0;	
		for(; i<getImg.length; i++){
			 var tempsrc  = getImg[i].src;
			 var newtempsrc = tempsrc.replace("_press","_off");
			 getImg[i].src = newtempsrc;
		}
		var src = $(this).attr('src');
		var newsrc = src.replace("_off","_press");
		$(this).attr('src', newsrc);
		$('#Menu_Drawing_Colour_Click').attr('src', newsrc);
		$('#Menu_Drawing_AllColour_Show').css('display','none');
	});
}

