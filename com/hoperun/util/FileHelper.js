/**
 * FileHelper class
 * 
 * @package com.hoperun.util
 * @import com.hoperun.util.BaseTool
 * @author Jian.T
 */
com.hoperun.util.FileHelper = {

	save : function(data, fileInfo, callback) {
		$.ajax({
			url : 'savefileservlet',
			type : 'POST',
			data : {
				userName : fileInfo.userName,
				fileName : fileInfo.fileName,
				fileType : fileInfo.fileType,
				fileFolderName : fileInfo.fileFolderName,
				newFileName : fileInfo.newFileName,
				url : window.location.href,
				json : JSON.stringify(data)
			},
			dataType : 'json',
			success : function(json) {
				if(json.success == 'true'){
					if(callback) callback(dataObj);
					alert('Save the file successfully!');
				}
				else{
					alert(JSON.stringify(json.errors));
				}
			},
			error : function(textStatus) {
				alert('error');
			}
		});
	},

	load : function(fileInfo, callback) {
		if(!fileInfo){
			fileInfo = {
				userName : 'kennylv',
				fileName : 'example1',
				fileType : 'doc'
			};
		}
		$.ajax({
			url : 'readfileservlet',
			type : 'post',
			data : fileInfo,
			dataType : 'json',
			success : function(json){
				if(json.success == 'true'){
					if(callback) callback(json.jsonData);
				}
				else{
					alert(JSON.stringify(json.errors));
				}
				
			}
		});
	},
	
	loadFileImage : function(fileInfo, callback) {
		$.ajax({
			url : 'readFileHistoryServlet',
			type : 'post',
			data : fileInfo,
			dataType : 'json',
			success : function(json){
				if(json.success == 'true'){
					if(callback) callback(json.jsonData);
				}
				else{
					alert(JSON.stringify(json.errors));
				}
				
			},
			error : function(textStatus) {
				alert('error');
			}
		});
	},
	
	loadParams : function(fileInfo, callback) {
		$.ajax({
			url : 'getParamServlet',
			type : 'post',
			data : fileInfo,
			dataType : 'json',
			success : function(json){
				if(json.success == 'true'){
					if(callback) callback(json.jsonData);
				}
				else{
					alert(JSON.stringify(json.errors));
				}
				
			},
			error : function(textStatus) {
				alert('error');
			}
		});
	},
	
	loadId : function(fileInfo, callback) {
		$.ajax({
			url : 'getIdServlet',
			type : 'post',
			data : fileInfo,
			dataType : 'json',
			success : function(json){
				if(json.success == 'true'){
					if(callback) callback(json.jsonData);
				}
				else{
					alert(JSON.stringify(json.errors));
				}
				
			},
			error : function(textStatus) {
				alert('error');
			}
		});
	},
		
	copyFile : function(fileInfo,callback) {
		$.ajax({
			url : 'copyFileServlet',
			type : 'POST',
			data : fileInfo,
			dataType : 'json',
			success : function(json) {
				if(json.success == 'true'){
					alert(JSON.stringify(json.returnMsg));
					if(callback) callback(json.success);
				}
				else{
					alert(JSON.stringify(json.errors));
				}
			},
			error : function(textStatus) {
				alert('error');
			}
		});
	}

};