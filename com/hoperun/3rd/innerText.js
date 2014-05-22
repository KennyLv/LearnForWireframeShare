function isIE() { // ie?
	if (window.navigator.userAgent.toLowerCase().indexOf("msie") >= 1)
		return true;
	else
		return false;
}

if (!isIE()) { // firefox innerText define
	HTMLElement.prototype.__defineGetter__("innerText", function() {
		var anyString = "";
		var childS = this.childNodes;
		for ( var i = 0; i < childS.length; i++) {
			if (childS[i].nodeType == 1)
				anyString += childS[i].tagName == "BR" ? '\n'
						: childS[i].textContent;
			else if (childS[i].nodeType == 3)
				anyString += childS[i].nodeValue;
		}
		return anyString;
	});
	HTMLElement.prototype.__defineSetter__("innerText", function(sText) {
		this.textContent = sText;
	});
}

if (typeof (HTMLElement) != "undefined" && !window.opera) {
	HTMLElement.prototype.__defineGetter__("outerHTML", function() {
		var a = this.attributes, str = "<" + this.tagName, i = 0;
		for (; i < a.length; i++)
			if (a[i].specified)
				str += " " + a[i].name + '="' + a[i].value + '"';
		if (!this.canHaveChildren)
			return str + " />";
		return str + ">" + this.innerHTML + "</" + this.tagName + ">";
	});
	HTMLElement.prototype.__defineSetter__("outerHTML", function(s) {
		var r = this.ownerDocument.createRange();
		r.setStartBefore(this);
		var df = r.createContextualFragment(s);
		this.parentNode.replaceChild(df, this);
		return s;
	});
	HTMLElement.prototype
			.__defineGetter__(
					"canHaveChildren",
					function() {
						return !/^(area|base|basefont|col|frame|hr|img|br|input|isindex|link|meta|param)$/
								.test(this.tagName.toLowerCase());
					});
}