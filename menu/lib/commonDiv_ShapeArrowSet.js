function commonDiv_ShapeArrowSet_ready(){
		$("#Menu_Edit_ShapeArrowSet_Style_Arrange").tabs();
		$("#Menu_Edit_Style_Option").tabs();
		$("#Menu_Edit_ShapeArrowSet_MovewithText").buttonset();
		$("#Menu_Edit_ShapeArrowSet_WrapStyle").selectable();
		$("#Menu_Edti_ShapeArrowSet_Shadow_Options").buttonset();
		
		$("#Menu_Edit_Line_Wrap_mySlider").slider({
	        value: 100,
	        min: 0,
	        max: 100,
	        step: 2,
	        slide: function (event, ui) {
	            $("#Menu_Edit_Line_Wrap_thisOpacity").text(ui.value + "px");
				var data = {'MenuEditLineWrapExtraSpaceSlider':ui.value};
	            sendMessage(com.kenny.util.Observer.MessageType.SHAPE_ARRANGE,
						currentSelectedObj,
						data);
	        }
	    });
		
		$("#Menu_Edit_Line_Wrap_thisOpacity").text($("#Menu_Edit_Line_Wrap_mySlider").slider("value") + "px");
		
		$("#Menu_Edit_ShapeArrowSet_MoveToBackOrFront").click(function(e){
			var initValue = currentSelectedObj.getZIndex();//1001;
			var container = getActiveContainer();
			var num = container.getAllElements().length < 2 ? 2 : container.getAllElements().length;
			$("#Menu_Edit_Line_Arrange_mySlider").slider({
				value: initValue,
				min: 1001,
				max: 1000 + 10*num,
				step: 1,
				slide: function (event, ui) {
					$('#Menu_Edit_Line_Arrange_Reduce').removeAttr('disabled');
					$('#Menu_Edit_Line_Arrange_Add').removeAttr('disabled');
					if(ui.value == 1001){
					$('#Menu_Edit_Line_Arrange_Reduce').attr('disabled', 'disabled');
					}
					else if(ui.value == 1000 + num){
						$('#Menu_Edit_Line_Arrange_Add').attr('disabled', 'disabled');
					}
					var data = {'zindex':ui.value};
					
					sendMessage(com.kenny.util.Observer.MessageType.UPDATE_ZINDEX,
							currentSelectedObj,
							data);
				}
			});
			
			$('#Menu_Edit_Line_Arrange_Reduce').removeAttr('disabled');
			$('#Menu_Edit_Line_Arrange_Add').removeAttr('disabled');
			if(initValue == 1001){
				$('#Menu_Edit_Line_Arrange_Reduce').attr('disabled', 'disabled');
			}
			else if(initValue == 1000 + num){
				$('#Menu_Edit_Line_Arrange_Add').attr('disabled', 'disabled');
			}
		});
		
		$('#Menu_Edit_Line_Arrange_Reduce').click(function(e){
			var initValue = currentSelectedObj.getZIndex();//1001;
			initValue -= 1;
			$("#Menu_Edit_Line_Arrange_mySlider").slider({
				value : initValue
			});
			var data = {'zindex':initValue};
			sendMessage(com.kenny.util.Observer.MessageType.UPDATE_ZINDEX, currentSelectedObj, data);
			
			$('#Menu_Edit_Line_Arrange_Add').removeAttr('disabled');
			if(initValue == 1001){
				$('#Menu_Edit_Line_Arrange_Reduce').attr('disabled', 'disabled');
			}
		});
		
		$('#Menu_Edit_Line_Arrange_Add').click(function(e){
			var initValue = currentSelectedObj.getZIndex();//1001;
			initValue += 1;
			$("#Menu_Edit_Line_Arrange_mySlider").slider({
				value : initValue
			});
			var data = {'zindex':initValue};
			sendMessage(com.kenny.util.Observer.MessageType.UPDATE_ZINDEX, currentSelectedObj, data);
			
			$('#Menu_Edit_Line_Arrange_Reduce').removeAttr('disabled');
			var container = getActiveContainer();
			var num = container.getAllElements().length < 2 ? 2 : container.getAllElements().length;
			if(initValue == 1000 + num){
				$('#Menu_Edit_Line_Arrange_Add').attr('disabled', 'disabled');
			}
		});
		
		$("#Menu_Style_Option_Line_mySlider").slider({
	        value: 2,
	        min: 2,
	        max: 20,
	        step: 2,
	        slide: function (event, ui) {
	            $("#Menu_Style_Option_Line_thisOpacity").text(ui.value + "px");
				var data = {'MenuEditStyleOptionLineWidthSlider':ui.value};
	            sendMessage(com.kenny.util.Observer.MessageType.SHAPE_STYLE,
						currentSelectedObj,
						data);
	        }
	    });
		$("#Menu_Style_Option_Line_thisOpacity").text($("#Menu_Style_Option_Line_mySlider").slider("value") + "px");
		
		$("#Menu_Style_Option_Effects_mySlider").slider({
	        value: 100,
	        min: 0,
	        max: 100,
	        step: 2,
	        slide: function (event, ui) {
	            $("#Menu_Style_Option_Effects_thisOpacity").text(ui.value + "%");
				var data = {'MenuEditLineShadowOpacitySlider':ui.value};
	            sendMessage(com.kenny.util.Observer.MessageType.SHAPE_STYLE,
						currentSelectedObj,
						data);
	        }
	    });
		$("#Menu_Style_Option_Effects_thisOpacity").text($("#Menu_Style_Option_Effects_mySlider").slider("value") + "%");
		
	    $("#Menu_Edit_Line_style_to_Style_Option").click(function () {
	    	$("#Menu_Edit_Line_container").css('display','none');
	        $("#Menu_Edit_Line_container1").css('display','block');
	    });
	    $("#Menu_Edit_Style_Option_to_Menu_Edit_Line").click(function () {
	    	$("#Menu_Edit_Line_container1").css('display','none');
	        $("#Menu_Edit_Line_container").css('display','block');
	    });
	    $("#Menu_Edit_Style_Option_to_Menu_Edit_Line1").click(function () {
	    	$("#Menu_Edit_Line_container2").css('display','none');
	        $("#Menu_Edit_Line_container").css('display','block');
	    });
	    $("#Menu_Edit_Line_Arrowhead_Options_to_Line").click(function () {
	    	$("#Menu_Edit_Line_container3").css('display','none');
	        $("#Menu_Edit_Line_container1").css('display','block');
	    });
	    $("#Menu_Edit_Line_Line_Color_to_Line1").click(function () {
	    	$("#Menu_Edit_Line_container4").css('display','none');
	        $("#Menu_Edit_Line_container1").css('display','block');
	    });
	    $("#Menu_Edit_Style_Option_line_to_Arrowheads").click(function () {
	    	$("#Menu_Edit_Line_container1").css('display','none');
	        $("#Menu_Edit_Line_container3").css('display','block');
	    });
	    $("#Menu_Edit_Style_Option_line_to_Line_Color").click(function () {
	    	
	    	$("#Menu_Edit_Line_container1").css('display','none');
	        $("#Menu_Edit_Line_container4").css('display','block');
	    });
	    $("#Menu_Edit_Line_arrange_to_Wrap").click(function () {
	    	$("#Menu_Edit_Line_container").css('display','none');
	        $("#Menu_Edit_Line_container2").css('display','block');
	        
	    });
		$("#Menu_Edit_ShapeArrowSet_Style_Option_Effects_shadow_On").click(function () {
			$("#Menu_Edit_ShapeArrowSet_StyleOption_Image_Effects_Shadow_Image").css('display', 'block');
		});
		$("#Menu_Edit_ShapeArrowSet_Style_Option_Effects_shadow_Off").click(function () {
			$("#Menu_Edit_ShapeArrowSet_StyleOption_Image_Effects_Shadow_Image").css('display', 'none');
		});
        $("#hidden").click(function () {
	    	$("#hidden").remove();
	    });
		
	registerShapeArrowButtonListener();

    function registerShapeArrowButtonListener() {
	
		$('#Menu_Edit_Line_style_box div').click(function () {
			
			var clazz = $(this).attr('class').split(' ')[1];
			var data = {'MenuEditLinestylebox':clazz};
			sendMessage(com.kenny.util.Observer.MessageType.SHAPE_STYLE,
								currentSelectedObj,
								data);
		});
		
		$("#Menu_Edit_ShapArrowSet_BorderLine .ui-widget-content img").click(function () {
			var imageLineStyle = $(this).attr('imageLineStyle');
			var data = {'MenuStyleOptionLineStyle':imageLineStyle};
			$("#Menu_Edit_ShapeArrowSet_BorderColor_is_picked").remove();
			$(this).parent().append('<div id="Menu_Edit_ShapeArrowSet_BorderColor_is_picked" style="border:0px;float:right;margin-top:-20px;margin-right:5px">' +
	    		'<input type="checkbox" disabled="true" checked="true"></div>');
			sendMessage(com.kenny.util.Observer.MessageType.SHAPE_STYLE,
				  currentSelectedObj,
				  data);
		});
		
		$('.Menu_Edit_Line_tab_01_opn_item_1 div').click(function () {
			
			var classname = $(this).attr('classname');
			var data = {'MenuEditLineArrangeWarp':classname};
			sendMessage(com.kenny.util.Observer.MessageType.SHAPE_STYLE,
								currentSelectedObj,
								data);
		});
		
		$('#Menu_Edit_ShapeArrowSet_WrapStyle li').click(function () {
			
			var stylename =$(this).attr('styleName');
			var data = {'MenuEditLineWrapStyle':stylename}; 
			$("#Menu_Edit_ShapeArrowSet_WrapStyle_CheckBoxStyle").remove();
			$(this).children('span').before('<div id="Menu_Edit_ShapeArrowSet_WrapStyle_CheckBoxStyle" style="float:right;margin-top:10px;margin-right:10px;width:20px;">' +
	    		'<input type="checkbox" disabled="true" checked="true"/></div>');
			sendMessage(com.kenny.util.Observer.MessageType.SHAPE_ARRANGE,
							currentSelectedObj,
							data);
		});
		
		$('#Menu_Edit_ShapeArrowSet_TextColor_One .Color_colorDiv_normal').click(function () {
			
			var backgroundColor = $(this).css('backgroundColor');
			$("#Menu_Edit_ShapeArrowSet_BorderColorSelect_button").css('backgroundColor',backgroundColor);
			var className = $(this).attr("class").split(' ')[1];
			var data = {'MenuEditLinecolor':backgroundColor};
			$("#Menu_Edit_ShapeArrowSet_TextColorOne_is_picked").remove();
			$(this).append('<div id="Menu_Edit_ShapeArrowSet_TextColorOne_is_picked" style="border:0px;float:right;margin-top:10px;margin-right:5px">' +
	    		'<input type="checkbox" disabled="true" checked="true"></div>');
			sendMessage(com.kenny.util.Observer.MessageType.SHAPE_STYLE,
								currentSelectedObj,
								data);
		});
		
		
		$('#Menu_Edit_ShapeArrowSet_TextColor_Two .Color_MultiStylePanel div').click(function () {
			
			var backgroundColor = $(this).css('backgroundColor');
			var className = $(this).attr("class");
			$("#Menu_Edit_ShapeArrowSet_BorderColorSelect_button").css('backgroundColor',backgroundColor);
			var data = {'MenuEditLineStyleLineColorTwo':backgroundColor};
			$("#Menu_Edit_ShapeArrowSet_TextColorTwo_is_picked").remove();
			$(this).append('<div id="Menu_Edit_ShapeArrowSet_TextColorTwo_is_picked" style="width: 20px; height: 20px; float: right; margin-top: 100px; margin-left: 20px;">' +
	    		'<input type="checkbox" disabled="true" checked="true"></div>');
			sendMessage(com.kenny.util.Observer.MessageType.SHAPE_STYLE,
							currentSelectedObj,
							data);
		});
		
		$('#Menu_Edit_Line_Wrap_Shadow_On').click(function () {
		
			var value =$(this).attr('value');
			var data = {'MenuEditLineWrapShadowOn':value}; 
			sendMessage(com.kenny.util.Observer.MessageType.SHAPE_ARRANGE,
								currentSelectedObj,
								data);
		});
		
		$('#Menu_Edit_Line_Wrap_Shadow_Off').click(function () {
			
			var value =$(this).attr('value');
			var data = {'MenuEditLineWrapShadowOff':value}; 
			sendMessage(com.kenny.util.Observer.MessageType.SHAPE_ARRANGE,
								currentSelectedObj,
								data);
			});
		
		$("#Menu_Edit_ShapeArrowSet_StyleOption_Image_Effects_Shadow_Image div").click(function () {
			var shadow = $(this).attr('class');
			var data = { 'MenuStyleOptionEffectsShadow': shadow };
			//alert("data value:" + data.shadow);
			closeAllShadowSelectedCheckBox();
			switch(shadow){
				case 'Menu_Edit_Line_table_style_box_1':
					$('#Menu_Edit_ShapeArrowSet_check_shaow1').css('display', 'block');
					break;
				case 'Menu_Edit_Line_table_style_box_2':
					$('#Menu_Edit_ShapeArrowSet_check_shaow2').css('display', 'block');
					break;
				case 'Menu_Edit_Line_table_style_box_3':
					$('#Menu_Edit_ShapeArrowSet_check_shaow3').css('display', 'block');
					break;
				case 'Menu_Edit_Line_table_style_box_4':
					$('#Menu_Edit_ShapeArrowSet_check_shaow4').css('display', 'block');
					break;
			}
			sendMessage(com.kenny.util.Observer.MessageType.SHAPE_STYLE,
							currentSelectedObj,
							data);
		});
		
		function closeAllShadowSelectedCheckBox(){
			$('#Menu_Edit_ShapeArrowSet_check_shaow1').css('display', 'none');
			$('#Menu_Edit_ShapeArrowSet_check_shaow2').css('display', 'none');
			$('#Menu_Edit_ShapeArrowSet_check_shaow3').css('display', 'none');
			$('#Menu_Edit_ShapeArrowSet_check_shaow4').css('display', 'none');
		}
		
		function classAllShapeArrowSetColorCheckBox(){
			$('#Menu_Edit_ShapeArrowSet_Color1').css('display', 'none');
			$('#Menu_Edit_ShapeArrowSet_Color2').css('display', 'none');
			$('#Menu_Edit_ShapeArrowSet_Color3').css('display', 'none');
			$('#Menu_Edit_ShapeArrowSet_Color4').css('display', 'none');
			
			$('#Menu_Edit_ShapeArrowSet_Color5').css('display', 'none');
			$('#Menu_Edit_ShapeArrowSet_Color6').css('display', 'none');
			$('#Menu_Edit_ShapeArrowSet_Color7').css('display', 'none');
			$('#Menu_Edit_ShapeArrowSet_Color8').css('display', 'none');
			
			$('#Menu_Edit_ShapeArrowSet_Color9').css('display', 'none');
			$('#Menu_Edit_ShapeArrowSet_Color10').css('display', 'none');
			$('#Menu_Edit_ShapeArrowSet_Color11').css('display', 'none');
			$('#Menu_Edit_ShapeArrowSet_Color12').css('display', 'none');
			
			$('#Menu_Edit_ShapeArrowSet_Color13').css('display', 'none');
			$('#Menu_Edit_ShapeArrowSet_Color14').css('display', 'none');
			$('#Menu_Edit_ShapeArrowSet_Color15').css('display', 'none');
			$('#Menu_Edit_ShapeArrowSet_Color16').css('display', 'none');
			
			$('#Menu_Edit_ShapeArrowSet_Color17').css('display', 'none');
			$('#Menu_Edit_ShapeArrowSet_Color18').css('display', 'none');
			$('#Menu_Edit_ShapeArrowSet_Color19').css('display', 'none');
			$('#Menu_Edit_ShapeArrowSet_Color20').css('display', 'none');
			
			$('#Menu_Edit_ShapeArrowSet_Color21').css('display', 'none');
			$('#Menu_Edit_ShapeArrowSet_Color22').css('display', 'none');
			$('#Menu_Edit_ShapeArrowSet_Color23').css('display', 'none');
			$('#Menu_Edit_ShapeArrowSet_Color24').css('display', 'none');
			
			$('#Menu_Edit_ShapeArrowSet_ColorBox1').css('display', 'none');
			$('#Menu_Edit_ShapeArrowSet_ColorBox2').css('display', 'none');
			$('#Menu_Edit_ShapeArrowSet_ColorBox3').css('display', 'none');
			$('#Menu_Edit_ShapeArrowSet_ColorBox4').css('display', 'none');
			$('#Menu_Edit_ShapeArrowSet_ColorBox5').css('display', 'none');
		}
    }
	
	commonControl_PageTurnning("Menu_Edit_ShapeArrowSet_ColorPanel_ChangePage");
};

function updateShapeArrowMenu(objData) {
    $('#Menu_Edit_Line_style_box div').each(function(){
		var clazz = $(this).attr('class');  	
	});
}