/**
 * The text line render.
 * 
 * @package com.hoperun.node
 * @import com.hoperun.util.CommonUtil
 * @author Feng.Lu
 */
com.hoperun.node.TextLine = function() {
	com.hoperun.node.TextLine.superClass.constructor.call(this);
	
	this._paddingTop = 0;
};

com.hoperun.util.BaseTool.extend(com.hoperun.node.TextLine, com.hoperun.node.Node);

/**
 * The prototype for the TextLine.
 */
com.hoperun.util.CommonUtil.augment(com.hoperun.node.TextLine, {
 // ┌─────────────────────────────────────────────────────────────────────┐ \\
 // │ The private properties                                              │ \\
 // └─────────────────────────────────────────────────────────────────────┘ \\
    _firstLineFlag : null, 
    
    //The paragraph model
    _paragraphModel : null,
    
    _paddingTop : null,
    
 // ┌─────────────────────────────────────────────────────────────────────┐ \\
 // │ Private Methods                                                     │ \\
 // └─────────────────────────────────────────────────────────────────────┘ \\
    /**
     * Do initialize prepared DOM instance.
     */
    _initSection : function() {
        //TODO: create the section
        var section = this._createSection();
        section.appendTo(this);
        return section;
    },
    
    /**
     * Do create the text section.
     */
    _createSection : function() {
        //TODO: create the text section object, and initialize the section DOM's parameters
        // Such as: width, height, left and right padding, paragraph ID and so on.
    },
    
    /**
     * Do get the next section.
     * 
     * @param section the section
     */
    _getNextSection : function(section) {
        var children = this.getChildren(),
            idx = this.getChildren().indexOf(section);
        return idx != -1 || children[idx+1];
    },
    
 // ┌─────────────────────────────────────────────────────────────────────┐ \\
 // │ Public Methods                                                      │ \\
 // └─────────────────────────────────────────────────────────────────────┘ \\
    /**
     * @return whether it's that the line has no child node.
     */
    isEmpty : function() {
        return this.getChildren() == null || this.getChildren().length == 0;
    },
    
    /**
     * Do get data.
     */
    getData : function() {
        //TODO: Check the structure of the setData method of Text.js
    },
    
    /**
     * Do set data.
     * 
     * @param data the local JSON data
     */
    setData : function(data) {
       //TODO: Check the structure of the setData method of Text.js
        return null;
    },
    
    /**
     * Do get the left width for this line.
     */
    getLeftWidth : function() {
        //TODO: Do calculate the left width.
        return 0;
    },
    
    /**
     * Do render the line in the page.
     * TODO: here absolute nodes should be taken consideration. 
     * 
     * @param section[optional] the beginning line object
     */
    render : function(section) {
        section = section || this.getChildren()[0];
        
        //TODO: 
        var usedWidth = 0;
        while((relRender = section.render()).fitFlag == false){
            if(!section){
                section = this._initSection();
            }
            //Insert the extra lines into next line
            for(var i=0; i<sections.length; i++) {
                //TODO: Don't forget to append section's DOM instance into the next line DOM instance
                nextLine.insert(sections[i], i); 
            }
            line = nextLine;
            
            //Clear the empty line
            var tmpLine = this._getNextLine(line);
            while(tmpLine && tmpLine.isEmpty()){
                nextLine = this._getNextLine(nextLine);
                this.remove(tmpLine);
                tmpLine = nextLine;
            }
        }
        
        var exceedSections = null;
        
        //Validate whether the width of all sections is enough or exceed the maximum width of the line
        //TODO: When there is extra width for the parts of first section of the next line, move it to this line
        //TODO: When it's width exceeds maximum width of this line, send the extra sections back
        
        return exceedSections;
    },
    
// ┌─────────────────────────────────────────────────────────────────────┐ \\
// │ Getter &Setter Methods for private properties                       │ \\
// └─────────────────────────────────────────────────────────────────────┘ \\
    /**
     * Override, since it seems default not suitable here.
     * @param w the width
     */
    setWidth: function(w){
        this._width = w;
    },
    
    /**
     * Get the line width.
     * 
     * @return the width
     */
    getWidth : function() {
        var t = this,
            i = t.getParagraphModel().getIndent(),
            l = t.getFirstLineFlag() ? i.firstLine : i.left,
            r = indent.right;
       return t.getParent().getWidth() - l - r;
    },
    
    /**
     * Override, since it seems default not suitable here.
     * @param h the height
     */
    setHeight : function(h) {
        this._height = h;
    },
    
    /**
     * Get the naked height, which is calculated with section's height.
     * 
     * @return the height
     */
    getHeight : function() {
        return this._height;
    },
    
    /**
     * Get the fact height, which is calculated with paragraph's line space.
     * 
     * @return the height
     */
    getHeightWithSpacing : function() {
       return this.getHeight() * this.getParagraphModel().getTextLineSpacing();
    },
    
    
    /**
     * Get the fact height, which is calculated with paragraph's line space and padding top.
     * 
     * @return the height
     */
    getFullHeight : function() {
       return this.getHeightWithSpacing() + this._paddingTop;
    },
    
    /**
     * @return the first line flag
     */
    getFirstLineFlag : function(){
        return this._firstLineFlag;
    },
    
    /**
     * @param firstLineFlag the first line flag
     */
    setFirstLineFlag : function(firstLineFlag){
        this._firstLineFlag = firstLineFlag;
    },
    
    /**
     * @return the paragraph model
     */
    getParagraphModel : function(){
        return this._paragraphModel;
    },
    
    /**
     * @param paragraphModel the paragraph model
     */
    setParagraphModel : function(paragraphModel){
        this._paragraphModel = paragraphModel;
    }
    
});