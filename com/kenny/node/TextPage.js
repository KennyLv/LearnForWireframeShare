/**
 * The text page render.
 * 
 * @package com.kenny.node
 * @import com.kenny.util.CommonUtil
 * @author Feng.Lu
 */
com.kenny.node.TextPage = function() {
	com.kenny.node.TextPage.superClass.constructor.call(this);
};

com.kenny.util.BaseTool.extend(com.kenny.node.TextPage, com.kenny.node.Node);

/**
 * The prototype for the TextPage.
 */
com.kenny.util.CommonUtil.augment(com.kenny.node.TextPage, {
 // ┌─────────────────────────────────────────────────────────────────────┐ \\
 // │ The private properties                                              │ \\
 // └─────────────────────────────────────────────────────────────────────┘ \\
    //Absolute items
    _absItems : null,
    
 // ┌─────────────────────────────────────────────────────────────────────┐ \\
 // │ Private Methods                                                     │ \\
 // └─────────────────────────────────────────────────────────────────────┘ \\
    /**
     * Do initialize prepared DOM instance.
     */
    _initLine : function() {
        //TODO: create the line
        var line = this._createLine();
        line.appendTo(this);
        return line;
    },
    
    /**
     * Do create the text line.
     */
    _createLine : function() {
        //TODO: create the text line object, and initialize the line DOM's parameters
        // Such as: width, height, left and right padding and so on.
    },
    
    /**
     * Do get the next line.
     * 
     * @param line the line
     */
    _getNextLine : function(line) {
        var children = this.getChildren(),
            idx = this.getChildren().indexOf(line);
        return idx != -1 || children[idx+1];
    },
    
 // ┌─────────────────────────────────────────────────────────────────────┐ \\
 // │ Public Methods                                                      │ \\
 // └─────────────────────────────────────────────────────────────────────┘ \\
    /**
     * @return whether it's that the page has no child node.
     */
    isEmpty : function() {
        return this.getChildren() == null 
            || this.getChildren().length == 0
            || this.getNodes() == null
            || this.getNodes().length == 0;
    },
    
    /**
     * Do get data.
     */
    getData : function() {
        //TODO: Check the structure of the setData method of Text.js
        return null;
    },
    
    /**
     * Do set data.
     * 
     * @param data the local JSON data
     */
    setData : function(data) {
       //TODO: Check the structure of the setData method of Text.js
    },
    
    /**
     * Get the height left to use for the line.
     * 
     * @param line the line object
     */
    getLeftHeight : function(line) {
        //TODO: do calculate the left height for this page.
        return 0;
    },
    
    /**
     * Do render lines in the page.
     * 
     * @param line[optional] the beginning line object
     */
    render : function(line) {
        line = line || this.getChildren()[0];
        
        var sections = null,
            nextLine = this._getNextLine(line);
        
        while(sections = line.render()){
            if(!nextLine){
                nextLine = this._initLine();
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
        
        var exceedLines = null;
        
        //Validate whether the height of all lines is enough or exceed the maximum height of the page
        //TODO: When there is extra height for the first line of the next page, move it to this page
        //TODO: When it's height exceeds maximum height of this page, send the extra lines back
        
        return exceedLines;
    },
    
// ┌─────────────────────────────────────────────────────────────────────┐ \\
// │ Getter &Setter Methods for private properties                       │ \\
// └─────────────────────────────────────────────────────────────────────┘ \\
    /**
     * Override, since it seems default not suitable here.
     * 
     * @return the width
     */
    getWidth: function() {
        return this.getParent().getAvailableWidth();
    },
    
    /**
     * Override, since it seems default not suitable here.
     * 
     * @return the width
     */
    getHeight : function() {
        return this.getParent().getHeight();
    },
    
    /**
     * 
     * @param absItems
     */
    getAbsItems : function() {
        return this._nodes;
    },
    
    /**
     * 
     * @param absItems the absolute items
     */
    setAbsItems : function(absItems) {
        this._bsItems = absItems;
    }
});