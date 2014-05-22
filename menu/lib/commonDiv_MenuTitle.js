function commonDiv_MenuTitle_Ready() {
    $("#Menu_Title_Text").tabs();
    $("#Menu_Title_Text_Style_Format").selectable();
		
	$("#Menu_Title_Text_Style_Format .Menu_Title_Text_Style_Format_ParagraphStyle").click(function () {
		var paraStyle = $(this).attr('paraStyle');
		if(currentSelectedObj != null){
			var data = currentSelectedObj.data;
			data.style = { 'styleFormat': paraStyle };
			sendMessage(com.hoperun.util.Observer.MessageType.PARAGRAPH_STYLE,
							com.hoperun.util.BaseTool.findObjWithId(currentSelectedObj.sender.getId()),
							data);
		}
	});
};