$(document).ready(function(){
	with(com.hoperun.node)
		with(com.hoperun.node.shape) {
			var docs = $("#myContent");
		    //Resize Listener
		    $(window).resize(function () {
		        var pos = com.hoperun.util.BaseTool.getAbsPostion(docs[0]);
		        var w = $(window).width(), h = $(window).height()- 30;
		        docs.css("height", h - pos.y - 10);
		        if(getActiveContainer()){
		        	var page = getActiveContainer();
					//Notify toolBar the page settings
					var pageDivObj = getActiveContainer().findFirstPage();
					var pos = com.hoperun.util.BaseTool.getAbsPostion(pageDivObj);
					var pageSettingsMsg = new com.hoperun.util.Observer.Message();
					pageSettingsMsg.id = com.hoperun.util.Observer.MessageType.DOCUMENT_CONFIGURATION;
					pageSettingsMsg.sender = [];
					var indent = {
							left: page.getContentPadding().left,
							right: page.getContentPadding().right
					};
					var position = {
							left: pos.x,
							top: pos.y,
							width: page.getWidth(),
							height: page.getHeight()
					};
					var documentSettings = page.getDocumentSettings();
					
					pageSettingsMsg.data = {
							indent: indent,
							position: position,
							documentSettings: documentSettings
					};
					com.hoperun.util.Observer.sendMessage(pageSettingsMsg);
		        }
		    });
			
//			 // added by zhuxiaoquan for creating table examples
//			officeSheet = new Sheet();
//			
//			$("#myContent").append('<div id="tableSet" style="width:400px; height:400px;padding-top:20px; top:0; left:0; position:absolute;z-index:1004"></div>');
//			document.getElementById("tableSet").appendChild(officeSheet.getDomInstance());
			
			
			/*var table = new com.hoperun.node.Table();
			table.setRows(5);
			table.setCols(5);
			table.setTableBorder(true);
			table.setHeaderRows(1);
			table.setHeaderCols(3);
			table.setAlternatingRows(true);
			table.setHorizontalLines(true);
			table.setHeaderColumnLines(true);
			table.setHeaderRowLines(true);
			table.build();
			table.setLeft(10);
			table.appendTo(officeSheet);
			*/

		    var parameters = com.hoperun.util.BaseTool.parseUrl(window.location.href.toString());
		    var random = urlParameter.id;
		    var fileInf = {'random': random};
		    var fileInfo;
		    if(!random){
		    	fileInfo = {
					userName : urlParameter.userName,
		    		fileType : urlParameter.fileType,
		    		docid: urlParameter.docid,
					folderName: urlParameter.folderName
		    	};
		    }
			com.hoperun.util.FileHelper.loadParams(fileInf, function(data){
	    	if(data){
	    		if(random){
			    	fileInfo = {
						userName : data.username,
			    		fileType : data.doctype,
			    		//docid: urlParameter.docid,
						//folderName: data.folderName,
						version: urlParameter.version,
						fileFolderName: data.uuid
			    	};
		    	}
		    	com.hoperun.util.FileHelper.load(fileInfo, function(json){
		    		if(json.fileFolderName){
		    			document.getElementById('folderNameOfFile').innerHTML = json.fileFolderName;
		    		}
		    		var page = new Page();
		    		page.setData(JSON.parse(json.paper[0]));
		    		var doc = page.createDocsPage(docs[0]);
					//Notify toolBar the page settings
					var pageDivObj = page.findFirstPage();
					var pos = com.hoperun.util.BaseTool.getAbsPostion(pageDivObj);
					var pageSettingsMsg = new com.hoperun.util.Observer.Message();
					pageSettingsMsg.id = com.hoperun.util.Observer.MessageType.DOCUMENT_CONFIGURATION;
					pageSettingsMsg.sender = [];
					var indent = {
							left: page.getContentPadding().left,
							right: page.getContentPadding().right
					};
					var position = {
							left: pos.x,
							top: pos.y,
							width: page.getWidth(),
							height: page.getHeight()
					};
					var documentSettings = page.getDocumentSettings();
					
					pageSettingsMsg.data = {
							indent: indent,
							position: position,
							documentSettings: documentSettings
					};
					com.hoperun.util.Observer.sendMessage(pageSettingsMsg);
		    	});
		    }
			
		    else {
		    	var page = new Page();
		    	
		    	var defaultStyle = new Style();

				var paragraph = new Paragraph();
				paragraph.appendText("", defaultStyle);
				paragraph.setDefaultTextStyle(defaultStyle);
				
				page.appendParagraph(paragraph);
				
				//TODO: test for svg text box
				var textBox = new com.hoperun.shape.TextBox();
				textBox.setLeft(65);
				textBox.setTop(150);
				textBox.setWidth(200);
				textBox.setHeight(300);
				textBox.setZIndex(1001);
				
				var texts = [];
				
				var styles = [];
				
				var svgStyle1 = new com.hoperun.model.SvgStyle();
				var svgStyle2 = new com.hoperun.model.SvgStyle();
				
				svgStyle1.setBold(true);svgStyle1.setFontSize("24");svgStyle1.setItalic(true);
				svgStyle2.setBold(false);svgStyle2.setFontSize("18");svgStyle2.setItalic(true);
				
				styles.push(svgStyle1.getData());
				styles.push(svgStyle2.getData());
				var text = "You are so cool! I am so proud of you!\nI am your load! You need to listen to me!";
				texts = {
						text:text,
						styles:[
						       {offset:5, style:svgStyle1.getId()},
						       {offset:20, style:svgStyle2.getId()},
						       {offset:38, style:svgStyle1.getId()},
						       {offset:44, style:svgStyle2.getId()},
						       {offset:53, style:svgStyle1.getId()},
						       {offset:text.length, style:svgStyle2.getId()}
						   ]
				};

				textBox.setData({
					texts: texts,
					styles: styles,
					left:65,
					top:150,
					width:200,
					height:300,
					zIndex:1001
				});
				
				page.appendImage(0, textBox);
				
				
				var doc = page.createDocsPage(docs[0]);
				
				//Notify toolBar the page settings
				var pageDivObj = page.findFirstPage();
				var pos = com.hoperun.util.BaseTool.getAbsPostion(pageDivObj);
				var pageSettingsMsg = new com.hoperun.util.Observer.Message();
				pageSettingsMsg.id = com.hoperun.util.Observer.MessageType.DOCUMENT_CONFIGURATION;
				pageSettingsMsg.sender = [];
				var indent = {
						left: page.getContentPadding().left,
						right: page.getContentPadding().right
				};
				var position = {
						left: pos.x,
						top: pos.y,
						width: page.getWidth(),
						height: page.getHeight()
				};
				var documentSettings = page.getDocumentSettings();
				
				pageSettingsMsg.data = {
						indent: indent,
						position: position,
						documentSettings: documentSettings
				};
				com.hoperun.util.Observer.sendMessage(pageSettingsMsg);
		    }
			});
		    
		    $(window).resize();
		}
});