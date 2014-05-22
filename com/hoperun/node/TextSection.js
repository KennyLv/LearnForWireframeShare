/**
 * The text section render.
 * 
 * @package com.hoperun.node
 * @import com.hoperun.util.CommonUtil
 * @author Feng.Lu
 */
com.hoperun.node.TextSection = function() {
	com.hoperun.node.TextSection.superClass.constructor.call(this);
};

com.hoperun.util.BaseTool.extend(com.hoperun.node.TextSection, com.hoperun.node.Node);

/**
 * The prototype for the TextSection.
 */
com.hoperun.util.CommonUtil.augment(com.hoperun.node.TextSection, {
 // ┌─────────────────────────────────────────────────────────────────────┐ \\
 // │ The private properties                                              │ \\
 // └─────────────────────────────────────────────────────────────────────┘ \\
    //The style object to record this section's style
    _style : null,
    
    //The values for this section's characters
    _text : null,
    
    //The padding left
    _paddingLeft : null,
    
 // ┌─────────────────────────────────────────────────────────────────────┐ \\
 // │ Private Methods                                                     │ \\
 // └─────────────────────────────────────────────────────────────────────┘ \\

    
 // ┌─────────────────────────────────────────────────────────────────────┐ \\
 // │ Public Methods                                                      │ \\
 // └─────────────────────────────────────────────────────────────────────┘ \\
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
     * Do render the section.
     * 
     * @return the return value
     *      {
     *          usedWidth: //the real width for this section
     *          width:     //the total width for this section
     *          item: {
     *              text: "Ba la Ba la",
     *              style: styleObj    
     *          }
     *          noSpace: true|false //description whether there is space left to render
     *          
     *      }
     */
    render : function() {
        //TODO: When there is enough space to render, to find next section content only when the next section has same style
        return null;
    },
    
// ┌─────────────────────────────────────────────────────────────────────┐ \\
// │ Getter &Setter Methods for private properties                       │ \\
// └─────────────────────────────────────────────────────────────────────┘ \\
    /**
     * Override, since it seems default not suitable here.
     * @param w
     */
    setWidth: function(w){
        this._width = w;
    },
    
    /**
     * Override, since it seems default not suitable here.
     * @param h
     */
    setHeight : function(h) {
        this._height = h;
    },
    
    /**
     * 
     */
    getStyle : function() {
        return this._style;
    },
    
    /**
     * 
     * @param style
     */
    setStyle : function(style) {
        this._style = style;
    },
    
    /**
     * 
     */
    getText : function() {
        return this._text;
    },
    
    /**
     * 
     * @param text
     */
    setText : function(text) {
        this._text = text;
    }
});