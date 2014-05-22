function commonDiv_MenuList_Ready() {
    $("#Menu_List_Text").tabs();
    $("#Menu_List_Text_Style_Format").selectable();
		
	$("#Menu_List_Text_Style_Format .Menu_List_Text_Style_Format_ParagraphStyle").click(function () {
		var action = $(this).attr('paraStyle');
		if(currentSelectedObj != null){
			var paragraph = currentSelectedObj.sender;
			var offset = currentSelectedObj.data.fromOffset;
			var data = {action: action, offset:offset};
			sendMessage(com.hoperun.util.Observer.MessageType.PARAGRAPH_ACTION,
					com.hoperun.util.BaseTool.findObjWithId(paragraph.getId()),
					data);
		}
	});
};