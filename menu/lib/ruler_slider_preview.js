var myPermission = [
        { img: 'shortCut_tools.png' },
        { img: 'shortCut_tools.png' },
        { img: 'shortCut_tools.png' },
		{ img: 'shortCut_tools.png' },
        { img: 'shortCut_tools.png' },
        { img: 'shortCut_tools.png' },
		{ img: 'shortCut_tools.png' },
		{ img: 'shortCut_tools.png' }
        ];

$(document).ready(function () {
	var container = $('#Menu_Edit_Silde');
	var buff = [], n;

	buff.push('<div align="center" style="background:#fff;height:20px;margin-bottom:5px">ddddd</div>');
	for (n = 0; n < myPermission.length; ++n) {
		buff.push('<div align="center" class="review_top" style="margin-left:10px"><img src=\'images/' + myPermission[n].img + '\'/></div>');
    }
    container.html(buff.join(''));


	$('#Menu_Edit_Silde').click(function (e) {
		com.hoperun.util.BaseTool.closeMenuPopup();
        var buff = [];
        buff.push('<div class="slidePageDiv"></div>');
        $(buff.join('')).insertAfter('#addSlidePage');
    });
});	
