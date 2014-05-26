/**
 * The paragraph model page render.
 * 
 * @package com.kenny.model
 * @author Feng.Lu
 */
com.kenny.node.ParagraphModel = function() {
    //Default values settings
    this._indent = {
        firstLine: 0,
        left: 0,
        right: 0
    };
    
    this._textLineSpacing = 1.25;
};

com.kenny.node.ParagraphModel.prototype = {
    _id : null,
    
    _indent : null,

    _styleId : null,
    
    _textLineSpacing : null,
    
    getTextLineSpacing : function() {
        return this._textLineSpacing;
    },
    
    getIndent : function() {
        return this._indent;
    },
    
    getStyleId : function() {
        return this._styleId;  
    },
    
    getId : function() {
        return this._id;
    }

};