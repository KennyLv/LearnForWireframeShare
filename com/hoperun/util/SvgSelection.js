////////////////////////////////////////////////////////
//Extend window selection
com.hoperun.util.SvgSelection = {
	svgSelection: {},
	_divContainer: null,
	registerListener: function(divContainer, mousedown, mouseup, mousemove){
		this._divContainer = divContainer;
		
		var self = this;
		self.mousedown = mousedown;
		self.mouseup = mouseup;
		self.mousemove = mousemove;
		
		this._divContainer.onmousedown = function(e){
			try{
				e.stopPropagation();
				e.preventDefault();
			}catch(e){}
			var obj = com.hoperun.util.BaseTool.findEventTarget(e);
			if(obj != self._divContainer){
				return;
			}
			self.getSVGSelection('anchor',e);
			if(self.mousedown) self.mousedown(e);
			com.hoperun.util.BaseTool.hiddenSvgOverWordDiv();
			document.body.onmouseup =  function(e){
				try{
					e.stopPropagation();
					e.preventDefault();
				}catch(e){}
				self.getSVGSelection('focus',e);
				if(self.mouseup) self.mouseup(e);
				self._divContainer.onmousemove = document.body.onmouseup = null;
			};
			self._divContainer.onmousemove = function(e){
				self.getSVGSelection('move',e);
				if(self.mousemove) self.mousemove(e);
				
				var selection = com.hoperun.model.SvgTextSelectionModelHelper.parseWindowSelection(self.svgSelection, e);
				selection.setFromObj(selection.getActiveItem().getItemWithOffset(selection.getFrom(), selection.getFromOffset()));
				selection.setToObj(selection.getActiveItem().getItemWithOffset(selection.getTo(), selection.getToOffset()));
				com.hoperun.util.BaseTool.markSvgTextSelection(selection);
			};

		};
	},
	
	releaseListener: function(){
		this._divContainer.onmousedown = null;
		this.mousedown = this.mouseup = this.mousemove = null; 
	},
	
	getSVGSelection: function(type, e){
		var selectionNode = null;
		var offset = 0;
		if (window.getSelection())
			window.getSelection().removeAllRanges();
		if(type!="anchor" && this.svgSelection.flag!="start")
			return false;
		if(this.svgSelection.flag=="start" && this.svgSelection.anchorNode==null){
			this.svgSelection.flag = null;
			return false;
		}
		if(type=="anchor"){
			this.svgSelection = {};
			this.svgSelection.flag = "start";
		}
		else if(type=="focus")
			this.svgSelection.flag = "stop";
		
		var textBoxDomInstance = findTextBoxDomInstance(e.target);
		if(textBoxDomInstance == null) return;
		var coordinates = com.hoperun.util.BaseTool.getRelativeCoordinates(e, textBoxDomInstance);
		
		selectionNode = findTspanNode(coordinates, textBoxDomInstance);
		var number = selectionNode.textContent ? selectionNode.textContent.length : selectionNode.getNumberOfChars();
		if(selectionNode==null)
			return false;
		
		var rowLeft = findRowLeft(textBoxDomInstance.getElementsByTagName("svg")[0].getElementsByTagName("text")[0].getElementsByTagName("tspan"), Number(selectionNode.getAttribute("y")));
		for(var i=number;i>=0;i--){
			var cloneTextBoxDomInstance = showCloneTextBoxDomInstance(textBoxDomInstance, selectionNode,i);
			
			if(cloneTextBoxDomInstance.getElementsByTagName("svg")[0].getElementsByTagName("text")[0].getComputedTextLength() <= coordinates.x+3-rowLeft){
				offset = i;
				break;
			}
		}
		/**
		//-----------------调试用，可以删除
		if(type=="anchor")
			document.getElementById("span1").innerHTML = offset;
		else
			document.getElementById("span2").innerHTML = offset;
		//---------------------------------
		*/
		
		if(type=="anchor"){
			this.svgSelection.focusNode = this.svgSelection.anchorNode = selectionNode;
			this.svgSelection.focusOffset = this.svgSelection.anchorOffset = offset;
		}else{
			this.svgSelection.focusNode = selectionNode;
			this.svgSelection.focusOffset = offset;
		}

		return true;
		function findTextBoxDomInstance(node){
			var domInstance = null;
			while (node != null) {
				if (node.getAttribute && node.getAttribute("objectType") == "TextBox") {
					domInstance = node;
					break;
				} else
					node = node.parentNode;
			}
			return domInstance;
		}
		function findTextNode(node){
			var textNode = null;
			while (node != null) {
				if (node.localName == "text") {
					textNode = node;
					break;
				} else
					node = node.parentNode;
			}
			return textNode;
		}
		function findTspanNode(coordinates, textBoxDomInstance){
			var tspanNode = null;
			var ts = textBoxDomInstance.getElementsByTagName("svg")[0].getElementsByTagName("text")[0].getElementsByTagName("tspan");
			
			var tsy = -1, begin = 0;
			for(var i=0; i<ts.length; i++){
				var ntsy = Number(ts[i].getAttribute("y"));
				if(tsy != ntsy){
					begin = i;
					tsy = ntsy;
				}
				if(tsy >= coordinates.y){
					break;
				}
			}
			for(var i=begin; i<ts.length; i++){
				var y = Number(ts[i].getAttribute("y"));
				if(y > tsy){
					break;
				}
				var x = Number(ts[i].getAttribute("x"));
				if(x + ts[i].getComputedTextLength() >= coordinates.x || (ts[i+1]!=null&&Number(ts[i+1].getAttribute("y"))==tsy?false:true)){
					tspanNode = ts[i];
					break;
				}
			}
			return tspanNode;
		}
		
		function findRowLeft(tspans, y){
			var left = 0;
			for(var i=0; i<tspans.length ;i++){
				if(Number(tspans[i].getAttribute("y"))==y){
					left = Number(tspans[i].getAttribute("x"));
					break;
				}
			}
			return left;
		}
		
		function getTpanNodes(node, offset){
			var tspanNodes = [];
			var textNode = findTextNode(node);
			if(textNode!=null){
				var ts = textNode.getElementsByTagName("tspan");
				for(var i=0;i<ts.length;i++){
					var cloneNode = ts[i].cloneNode(true);
					if(ts[i]==node){
						if(offset!=null && ts[i].textContent.length>0)
							cloneNode.textContent = ts[i].textContent.substring(0,offset);
						tspanNodes.push(cloneNode);
						break;
					}else{
						if(ts[i].getAttribute("y")==node.getAttribute("y"))
							tspanNodes.push(cloneNode);
					}
				}
			}
			return tspanNodes;
		}
		function showCloneTextBoxDomInstance(textBoxDomInstance, node, offset) {
			var novisiableObj = document.getElementById("novisiableObj");
			if(novisiableObj){
				while(novisiableObj.hasChildNodes()){
					novisiableObj.removeChild(novisiableObj.childNodes[0]);
				}
			}
			else{
				novisiableObj = document.createElement('div');
				novisiableObj.id = 'novisiableObj';
				novisiableObj.style.position = 'absolute';
				novisiableObj.style.left = '-9000px';
				novisiableObj.style.top = '-9000px';
				document.body.appendChild(novisiableObj);
			}
			var cloneTextBoxDomInstance = textBoxDomInstance.cloneNode(true);
			while(cloneTextBoxDomInstance.getElementsByTagName("svg")[0].getElementsByTagName("text")[0].hasChildNodes())
				cloneTextBoxDomInstance.getElementsByTagName("svg")[0].getElementsByTagName("text")[0].removeChild(cloneTextBoxDomInstance.getElementsByTagName("svg")[0].getElementsByTagName("text")[0].firstChild);
			var tspanNodes = getTpanNodes(node, offset);
			for(var i=0;i<tspanNodes.length;i++)
				cloneTextBoxDomInstance.getElementsByTagName("svg")[0].getElementsByTagName("text")[0].appendChild(tspanNodes[i]);
			cloneTextBoxDomInstance.id = "cloneTextBoxDomInstance";
			cloneTextBoxDomInstance.style.top = "0";
			cloneTextBoxDomInstance.style.left = "800";
			novisiableObj.appendChild(cloneTextBoxDomInstance);
			return cloneTextBoxDomInstance;
		}
	}
};
