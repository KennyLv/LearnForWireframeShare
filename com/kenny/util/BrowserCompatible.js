//Extend Array prototype
//Array.insert Method
Array.prototype.insert = function(index) {
    var args = Array.prototype.slice.call(arguments, 1);
    this.length = Math.max(this.length, index);
    index = index < 0 ? this.length : index;

    if(args.length > 1) 
		this.splice.apply(this, [index, 0].concat(args));
    else 
		this.splice(index, 0, args[0]);
    return this;
};
Array.prototype.removeAt = function(index) {
    var args = Array.prototype.slice.call(arguments, 1);
    this.length = Math.max(this.length, index);
    index = index < 0 ? this.length : index;

    if(args.length > 1) 
		this.splice.apply(this, [index, 1]);
    else 
		this.splice(index, 1);
    return this;
};
Array.prototype.swap = function(orig, desc) {
	if(orig > desc) { var tmp = desc; desc = orig; orig = tmp; }
	var descObj = this[desc], origObj = this[orig];
	this.removeAt(desc); this.removeAt(orig);
	this.insert(orig, descObj); this.insert(desc, origObj);
    return this;
};
Array.prototype.add = function(item) {
    return this.push(item);
};
//Array.indexOf Method. Since IE is not supported
Array.prototype.indexOf || (Array.prototype.indexOf = function(v){
    for(var i = this.length; i-- && this[i] !== v;);
    return i;
});
Array.prototype.foreach = function(func){
    for(var i=0; i<this.length; i++){
        func(this[i], i);
    }
};

//Extend String prototype
String.prototype.trim = function () {
	var str = this.replace(/^\s+/, '');
	for (var i = str.length - 1; i >= 0; i--) {
		if (/\S/.test(str.charAt(i))) {
			str = str.substring(0, i + 1);
			break;
		}
	}
	return str;
};
String.prototype.ltrim = function() { 
    return this.replace(/(^\s*)/g, ""); 
};
String.prototype.rtrim = function() { 
    return this.replace(/(\s*$)/g, ""); 
};
String.prototype.filterHTML = function(){
	return this.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/ /g,'&nbsp;');
};
String.prototype.filterText = function(){
	return this.replace(/ /g,'\u00A0');
};
String.prototype.replaceAll = function(regExp, repText){  
    return this.replace(new RegExp(regExp,"g"),repText);  
} ;
String.prototype.insertCharacter = function(index) {
	var args = Array.prototype.slice.call(arguments, 1);
	return this.slice(0,index).concat(args,this.slice(index));
};
String.prototype.removeCharacterRange = function(begin, end) {
	end = end ? end : this.length-1;
	var args = Array.prototype.slice.call(arguments, 1);
	return this.slice(0,begin).concat(this.slice(end));
};


if(window.Node && !Node.prototype.swapNode) { 
	Node.prototype.swapNode = function(node) {
		 var nextSibling = this.nextSibling;
		 var parentNode = this.parentNode;
		 node.parentNode.replaceChild(this, node);
		 if(nextSibling != node){
			 parentNode.insertBefore(node, nextSibling);
		 }
		 else{
			 parentNode.insertBefore(node, this);
		 }
	};
}

if(window.HTMLElement){
    window.HTMLElement.prototype.insertAdjacentElement=function(where,parsedNode){
        switch(where){
            case "beforeBegin":
                this.parentNode.insertBefore(parsedNode,this);
                break;
            case "afterBegin":
                this.insertBefore(parsedNode,this.firstChild);
                break;
            case "beforeEnd":
                this.appendChild(parsedNode);
                break;
            case "afterEnd":
                if(this.nextSibling)
                    this.parentNode.insertBefore(parsedNode,this.nextSibling);
                else
                    this.parentNode.appendChild(parsedNode);
                break;
        }
    };
}
