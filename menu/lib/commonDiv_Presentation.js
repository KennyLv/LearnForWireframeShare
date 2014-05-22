$(document).ready( function() {
	$("#button_presentation").click( function() {
		$("#presentation_menu").toggle();
		$("#menu_shadow").toggle();
		$("#menu_shadow_body").toggle();
		$("#menu_shadow_arrayhead").toggle();
	});
	$("#menu_presentation").click( function() {
		if ($("#menu_presentation").attr("class") == "focus") {
			$("#menu_presentation").attr('class', 'unfocus');
		} else {
			$("#menu_presentation").attr('class', 'focus');
			$("#menu_numbers").attr('class', 'unfocus');
			$("#menu_vediocall").attr('class', 'unfocus');
			$("#menu_comments").attr('class', 'unfocus');
		}
	});
	$("#menu_numbers").click( function() {
		if ($("#menu_numbers").attr("class") == "focus") {
			$("#menu_numbers").attr('class', 'unfocus');
		} else {
			$("#menu_numbers").attr('class', 'focus');
			$("#menu_presentation").attr('class', 'unfocus');
			$("#menu_vediocall").attr('class', 'unfocus');
			$("#menu_comments").attr('class', 'unfocus');
		}
	});
	$("#menu_vediocall").click( function() {
		if ($("#menu_vediocall").attr("class") == "focus") {
			$("#menu_vediocall").attr('class', 'unfocus');
		} else {
			$("#menu_vediocall").attr('class', 'focus');
			$("#menu_numbers").attr('class', 'unfocus');
			$("#menu_presentation").attr('class', 'unfocus');
			$("#menu_comments").attr('class', 'unfocus');
		}
	});
	$("#menu_comments").click( function() {
		if ($("#menu_comments").attr("class") == "focus") {
			$("#menu_comments").attr('class', 'unfocus');
		} else {
			$("#menu_comments").attr('class', 'focus');
			$("#menu_numbers").attr('class', 'unfocus');
			$("#menu_vediocall").attr('class', 'unfocus');
			$("#menu_presentation").attr('class', 'unfocus');
		}
	});
});