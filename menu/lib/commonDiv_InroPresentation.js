function commonDiv_InroPresentation_ready() {
	// Set default option's background image
	$('#menu_intro_option div').css('background-image', 'url("../images/05 Menus/Graphics/images/background/main_bkgd.png")');
	$('#setup').css('background-image', 'url("../images/05 Menus/Graphics/images/background/main_sml_hg.png")');
	
    // Set default display page
	$('#menu_edit_setup_container').css('display', 'block');
    $('#menu_edit_templates_container').css('display', 'none');
    
    // Click option
    $('#setup').click(function () {
        // Only show setup pate
        $('#menu_intro_pannel_container div').css('display', 'none');
        $('#menu_intro_setup_container').css('display', 'block');
        $('#menu_intro_setup_container').children().css('display', 'block');
        $('#menu_intro_setup_container').children().children().css('display', 'block');

        // Set background
		$('#menu_intro_option div').css('background-image', 'url("../images/05 Menus/Graphics/images/background/main_bkgd.png")');
		var defbkimg = document.getElementById('setup');
		defbkimg.style.backgroundImage = "url('../images/05 Menus/Graphics/images/background/main_sml_hg.png')";
    });
    
    $('#templates').click(function () {
        $('#menu_intro_pannel_container div').css('display', 'none');
        $('#menu_intro_templates_container').css('display', 'block');
        $('#menu_intro_templates_container').children().css('display', 'block');
        $('#menu_intro_templates_container').children().children().css('display', 'block');

     	// Set background
		$('#menu_intro_option div').css('background-image', 'url("../images/05 Menus/Graphics/images/background/main_bkgd.png")');
		var defbkimg = document.getElementById('templates');
		defbkimg.style.backgroundImage = "url('../images/05 Menus/Graphics/images/background/main_sml_hg.png')";
    });

    $('#animitaions').click(function () {
        $('#menu_intro_pannel_container div').css('display', 'none');
        $('#menu_intro_animitaions_container').css('display', 'block');
        $('#menu_intro_animitaions_container').children().css('display', 'block');
        $('#menu_intro_animitaions_container').children().children().css('display', 'block');

     	// Set background
		$('#menu_intro_option div').css('background-image', 'url("../images/05 Menus/Graphics/images/background/main_bkgd.png")');
		var defbkimg = document.getElementById('animitaions');
		defbkimg.style.backgroundImage = "url('../images/05 Menus/Graphics/images/background/main_sml_hg.png')";
    });
    
    $('#share').click(function () {
        $('#menu_intro_pannel_container div').css('display', 'none');
        $('#menu_intro_share_container').css('display', 'block');
        $('#menu_intro_share_container').children().css('display', 'block');
        $('#menu_intro_share_container').children().children().css('display', 'block');

     	// Set background
		$('#menu_intro_option div').css('background-image', 'url("../images/05 Menus/Graphics/images/background/main_bkgd.png")');
		var defbkimg = document.getElementById('share');
		defbkimg.style.backgroundImage = "url('../images/05 Menus/Graphics/images/background/main_sml_hg.png')";
    });
    
    $('#search').click(function () {
        $('#menu_intro_pannel_container div').css('display', 'none');
        $('#menu_intro_search_container').css('display', 'block');
        $('#menu_intro_search_container').children().css('display', 'block');
        $('#menu_intro_search_container').children().children().css('display', 'block');

     	// Set background
		$('#menu_intro_option div').css('background-image', 'url("../images/05 Menus/Graphics/images/background/main_bkgd.png")');
		var defbkimg = document.getElementById('search');
		defbkimg.style.backgroundImage = "url('../images/05 Menus/Graphics/images/background/main_sml_hg.png')";
    });
    
    $('#spelling').click(function () {
        $('#menu_intro_pannel_container div').css('display', 'none');
        $('#menu_intro_spelling_container').css('display', 'block');
        $('#menu_intro_spelling_container').children().css('display', 'block');
        $('#menu_intro_spelling_container').children().children().css('display', 'block');

     	// Set background
		$('#menu_intro_option div').css('background-image', 'url("../images/05 Menus/Graphics/images/background/main_bkgd.png")');
		var defbkimg = document.getElementById('spelling');
		defbkimg.style.backgroundImage = "url('../images/05 Menus/Graphics/images/background/main_sml_hg.png')";
    });
    
    $('#calculator').click(function () {
        $('#menu_intro_pannel_container div').css('display', 'none');
        $('#menu_intro_calculator_container').css('display', 'block');
        $('#menu_intro_calculator_container').children().css('display', 'block');
        $('#menu_intro_calculator_container').children().children().css('display', 'block');

     	// Set background
		$('#menu_intro_option div').css('background-image', 'url("../images/05 Menus/Graphics/images/background/main_bkgd.png")');
		var defbkimg = document.getElementById('calculator');
		defbkimg.style.backgroundImage = "url('../images/05 Menus/Graphics/images/background/main_sml_hg.png')";
    });
    
    $('#setup2').click(function () {
        $('#menu_intro_pannel_container div').css('display', 'none');
        $('#menu_intro_setup2_container').css('display', 'block');
        $('#menu_intro_setup2_container').children().css('display', 'block');
        $('#menu_intro_setup2_container').children().children().css('display', 'block');

     	// Set background
		$('#menu_intro_option div').css('background-image', 'url("../images/05 Menus/Graphics/images/background/main_bkgd.png")');
		var defbkimg = document.getElementById('setup2');
		defbkimg.style.backgroundImage = "url('../images/05 Menus/Graphics/images/background/main_sml_hg.png')";
    });
    
    $('#import').click(function () {
        $('#menu_intro_pannel_container div').css('display', 'none');
        $('#menu_intro_import_container').css('display', 'block');
        $('#menu_intro_import_container').children().css('display', 'block');
        $('#menu_intro_import_container').children().children().css('display', 'block');

     	// Set background
		$('#menu_intro_option div').css('background-image', 'url("../images/05 Menus/Graphics/images/background/main_bkgd.png")');
		var defbkimg = document.getElementById('import');
		defbkimg.style.backgroundImage = "url('../images/05 Menus/Graphics/images/background/main_sml_hg.png')";
    });
    
    $('#export').click(function () {
        $('#menu_intro_pannel_container div').css('display', 'none');
        $('#menu_intro_export_container').css('display', 'block');
        $('#menu_intro_export_container').children().css('display', 'block');
        $('#menu_intro_export_container').children().children().css('display', 'block');

     	// Set background
		$('#menu_intro_option div').css('background-image', 'url("../images/05 Menus/Graphics/images/background/main_bkgd.png")');
		var defbkimg = document.getElementById('export');
		defbkimg.style.backgroundImage = "url('../images/05 Menus/Graphics/images/background/main_sml_hg.png')";
    });
    
    $('#print').click(function () {
        $('#menu_intro_pannel_container div').css('display', 'none');
        $('#menu_intro_print_container').css('display', 'block');
        $('#menu_intro_print_container').children().css('display', 'block');
        $('#menu_intro_print_container').children().children().css('display', 'block');

     	// Set background
		$('#menu_intro_option div').css('background-image', 'url("../images/05 Menus/Graphics/images/background/main_bkgd.png")');
		var defbkimg = document.getElementById('print');
		defbkimg.style.backgroundImage = "url('../images/05 Menus/Graphics/images/background/main_sml_hg.png')";
    });
	
	$('#menu_intro_receive').click(function () {
        $('#Menu_Drawing_Intro_Container_Get').slideUp();
    });
};

/**
* Change selected item's opacity.When mousemove.
*/
function changeBkimg1(id){
	var bkimg1 = document.getElementById(id);
	bkimg1.style.opacity = '0.8';
}

/**
* Change selected item's opacity.When mouseout.
*/
function changeBkimg2(id){
	var bkimg2 = document.getElementById(id);
	bkimg2.style.opacity = '1';
}