function getTextSelectionIndex() {
	var rel = null;
	var selection = window.getSelection();
	if (selection.rangeCount == 0)
		return rel;
	if (selection.rangeCount > 1) {
		alert("不支持多选");
		return rel;
	}
	rel = [];
	
	var anchorNode = selection.anchorNode;
	var focusNode = selection.focusNode;
	var anchorOffset = selection.anchorOffset;
	var focusOffset = selection.focusOffset;
	
	
	var anchorIndex = getOffsetCount(anchorNode) + anchorOffset;
	var focusIndex = getOffsetCount(focusNode) + focusOffset;
	var anchorLine = findLine(anchorNode);
	var anchorNodeoffsetTop = anchorLine.offsetTop;
	var focusLine = findLine(focusNode);
	var focusNodeoffsetTop = focusLine.offsetTop;
	if (anchorNodeoffsetTop < focusNodeoffsetTop) {
		var offsetWidth = getOffsetWidth(anchorNode);
		var left = getTempDivLeft(anchorNode, anchorOffset);
		var height = anchorLine.offsetHeight;
		showOverWordDiv(getSpanOffsetLeft(anchorNode) + offsetWidth + left,
				getWholeOffsetWidth(anchorLine) - left - offsetWidth, height,
				findLine(anchorNode));
		var nextNode = findNextNode(anchorLine);
		while (focusNodeoffsetTop > nextNode.offsetTop) {
			showOverWordDiv(getSpanOffsetLeft(nextNode),
					getWholeOffsetWidth(nextNode), nextNode.offsetHeight,
					findLine(nextNode));
			nextNode = findNextNode(nextNode);
		}
		offsetWidth = getOffsetWidth(focusNode);
		left = getTempDivLeft(focusNode, focusOffset);
		height = focusLine.offsetHeight;
		showOverWordDiv(getSpanOffsetLeft(focusNode), left + offsetWidth,
				height, findLine(focusNode));
		// alert("向下" +anchorOffset+ " "+ focusOffset);
	} else if (anchorNodeoffsetTop == focusNodeoffsetTop) {
		if (anchorNode === focusNode) {
			if (anchorOffset < focusOffset) {
				var offsetWidth = getOffsetWidth(anchorNode);
				var left1 = getTempDivLeft(anchorNode, anchorOffset);
				var left2 = getTempDivLeft(anchorNode, focusOffset);
				var height = anchorLine.offsetHeight;
				showOverWordDiv(getSpanOffsetLeft(anchorNode) + offsetWidth
						+ left1, left2 - left1, height, findLine(anchorNode));
			} else if (anchorOffset > focusOffset) {
				var offsetWidth = getOffsetWidth(focusNode);
				var left1 = getTempDivLeft(anchorNode, focusOffset);
				var left2 = getTempDivLeft(anchorNode, anchorOffset);
				var height = anchorLine.offsetHeight;
				showOverWordDiv(getSpanOffsetLeft(anchorNode) + offsetWidth
						+ left1, left2 - left1, height, findLine(anchorNode));
			}
		} else {
			if (anchorNode.parentNode.offsetLeft < focusNode.parentNode.offsetLeft) {
				var offsetWidth1 = getOffsetWidth(anchorNode);
				var left1 = getTempDivLeft(anchorNode, anchorOffset);
				var offsetWidth2 = getOffsetWidth(focusNode);
				var left2 = getTempDivLeft(focusNode, focusOffset);
				var height = anchorLine.offsetHeight;
				showOverWordDiv(getSpanOffsetLeft(anchorNode) + offsetWidth1
						+ left1, offsetWidth2 + left2 - left1 - offsetWidth1,
						height, findLine(anchorNode));
			} else {
				var offsetWidth1 = getOffsetWidth(focusNode);
				var left1 = getTempDivLeft(focusNode, focusOffset);
				var offsetWidth2 = getOffsetWidth(anchorNode);
				var left2 = getTempDivLeft(anchorNode, anchorOffset);
				var height = anchorLine.offsetHeight;
				showOverWordDiv(getSpanOffsetLeft(anchorNode) + offsetWidth1
						+ left1, offsetWidth2 + left2 - left1 - offsetWidth1,
						height, findLine(anchorNode));
			}
		}
		// alert("同行"+anchorOffset+ " "+ focusOffset);
	} else {
		var offsetWidth = getOffsetWidth(focusNode);
		var left = getTempDivLeft(focusNode, focusOffset);
		var height = focusLine.offsetHeight;
		showOverWordDiv(getSpanOffsetLeft(focusNode) + offsetWidth + left,
				getWholeOffsetWidth(focusLine) - left - offsetWidth, height,
				findLine(focusNode));
		var nextNode = findPreviousDivNode(anchorLine);
		while (focusNodeoffsetTop < nextNode.offsetTop) {
			showOverWordDiv(getSpanOffsetLeft(nextNode),
					getWholeOffsetWidth(nextNode), nextNode.offsetHeight,
					findLine(nextNode));
			nextNode = findPreviousDivNode(nextNode);
		}
		offsetWidth = getOffsetWidth(anchorNode);
		left = getTempDivLeft(anchorNode, anchorOffset);
		height = anchorLine.offsetHeight;
		showOverWordDiv(getSpanOffsetLeft(anchorNode), left + offsetWidth,
				height, findLine(anchorNode));
		// alert("向上"+anchorOffset+ " "+ focusOffset);
	}
	selection.removeAllRanges();

	if (anchorIndex < focusIndex) {
		return {
			"start" : anchorIndex,
			"end" : focusIndex
		};
	} else {
		return {
			"start" : focusIndex,
			"end" : anchorIndex
		};
	}

	// }catch(e){alert(e);}

	function getSpanOffsetLeft(textNode) {
		var offsetLeft = 0;
		var line = findLine(textNode);
		var childNodes = line.childNodes;
		for ( var i = 0; childNodes != null && i < childNodes.length; i++) {
			var node = childNodes[i];
			if (node.tagName == "SPAN") {
				offsetLeft = node.offsetLeft;
				break;
			}
		}
		return offsetLeft;
	}
	function getOffsetWidth(textNode) {
		var offsetWidth = 0;
		var previousNode = findPreviousNode(textNode.parentNode);
		while (previousNode != null) {
			offsetWidth += previousNode.offsetWidth;
			previousNode = findPreviousNode(previousNode);
		}
		return offsetWidth;
	}
	function getLastSpanNode(line) {
		var obj = null;
		var childNodes = line.childNodes;
		if (childNodes != null) {
			for ( var i = childNodes.length - 1; i >= 0; i--) {
				var node = childNodes[i];
				if (node.tagName == "SPAN") {
					obj = node;
					break;
				}
			}
		}
		return obj;
	}
	function getWholeOffsetWidth(line) {
		var offsetWidth = 0;
		var lastSpan = getLastSpanNode(line);
		if (lastSpan != null) {
			var previousNode = findPreviousNode(lastSpan);
			offsetWidth = lastSpan.offsetWidth;
			while (previousNode != null) {
				offsetWidth += previousNode.offsetWidth;
				previousNode = findPreviousNode(previousNode);
			}
		}
		return offsetWidth;
	}
	function getTempDivLeft(textNode, offset) {
		var left = 0;
		var tempSpan = textNode.parentNode.cloneNode(true);
		tempSpan.textContent = textNode.parentNode.textContent.substring(0,
				offset);
		var tempDiv = findLine(textNode).cloneNode(false);
		tempDiv.appendChild(tempSpan);
		document.getElementById("tempDiv").appendChild(tempDiv);
		left = tempSpan.offsetWidth;
		document.getElementById("tempDiv").removeChild(tempDiv);
		return left;
	}
	function findLine(node) {
		var obj = null;
		while (node != null) {
			if (node.attributes != null
					&& node.attributes['objectType'] != null
					&& node.attributes['objectType'].nodeValue == "Line") {
				obj = node;
				break;
			} else
				node = node.parentNode;
		}
		return obj;
	}
	function findNextNode(node) {
		var objectType = node.attributes['objectType'].nodeValue;
		node = node.nextSibling;
		while (node != null) {
			if (node.attributes != null
					&& node.attributes['objectType'] != null
					&& node.attributes['objectType'].nodeValue == objectType)
				break;
			else
				node = node.nextSibling;
		}
		return node;
	}
	function findPreviousDivNode(divNode) {
		var obj = null;
		var objectType = divNode.attributes['objectType'].nodeValue;
		divNode = divNode.previousSibling;
		while (divNode != null) {
			if (divNode.attributes != null
					&& divNode.attributes['objectType'] != null
					&& divNode.attributes['objectType'].nodeValue == objectType) {
				obj = divNode;
				break;
			} else
				divNode = divNode.previousSibling;
		}
		return obj;
	}
	function findPreviousNode(node) {
		var obj = null;
		node = node.previousSibling;
		while (node != null) {
			if (node.tagName == "SPAN") {
				obj = node;
				break;
			} else
				node = node.previousSibling;
		}
		return obj;
	}
	function getSpanTextLength(spanNode) {
		var length = 0;
		if (spanNode != null && spanNode.textContent != null)
			length = spanNode.textContent.length;
		return length;
	}
	function getOffsetCount(textNode) {
		var count = getSpanCount(textNode);
		var node = findPreviousDivNode(findLine(textNode));
		count += getDivCount(node);
		return count;
	}
	function getSpanCount(textNode) {
		var count = 0;
		var node = findPreviousNode(textNode.parentNode);
		while (node != null) {
			count += getSpanTextLength(node);
			node = findPreviousNode(node);
		}
		return count;
	}
	function getDivCount(divNode) {
		var count = 0;
		while (divNode != null) {
			count += getDivSpanCount(divNode);
			divNode = findPreviousDivNode(divNode);
		}
		return count;
	}
	function getDivSpanCount(divNode) {
		var count = 0;
		var spanNode = getLastSpanNode(divNode);
		while (spanNode != null) {
			count += getSpanTextLength(spanNode);
			spanNode = findPreviousNode(spanNode);
		}
		return count;
	}
	function getWidth(textNode) {
		var offsetWidth = 0;
		var previousNode = findPreviousNode(textNode.parentNode);
		while (previousNode != null) {
			offsetWidth += previousNode.offsetWidth;
			previousNode = findPreviousNode(previousNode);
		}
		return offsetWidth;
	}
	function showOverWordDiv(left, width, height, parentNode) {
		var overWordDiv = document.createElement("div");
		with (overWordDiv) {
			setAttribute(
					"style",
					"position:absolute;background-color:#00F;filter:alpha(opacity=40);-moz-opacity:0.4;-khtml-opacity:0.4;opacity:0.4");
			setAttribute("name", "overWordDiv");
			style.height = height + "px";
			style.left = left + "px";
			style.top = "0px";
			style.width = width + "px";
		}
		parentNode.appendChild(overWordDiv);
	}
}