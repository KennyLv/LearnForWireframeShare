// ┌─────────────────────────────────────────────────────────────────────┐ \\
// │ JavaScript Helper tool                                              │ \\
// ├─────────────────────────────────────────────────────────────────────┤ \\
// │ The methods should be totally independent                           │ \\
// └─────────────────────────────────────────────────────────────────────┘ \\
/**
 * 
 * @package com.hoperun.util
 * @author Feng.Lu
 */
com.hoperun.util.CommonUtil = {
        
    /**
     * Generate new UUID.
     * 
     * @returns the uuid string
     */
    uuid: (function (uuidRegEx, uuidReplacer) {
        return function () {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(uuidRegEx, uuidReplacer).toUpperCase();
        };
    })(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == "x" ? r : (r & 3 | 8);
        return v.toString(16);
    }),
    
    /**
     * Generate random value.
     * 
     * @param m the maximum value, default to 10
     * 
     * @return the random value
     */
    random: function(m){
        m = m || 10;
        return Math.round(Math.random() * m);
    },
    
    /**
     * 
     * @param jsObj the JS object
     * @returns the cloned JS object
     */
    cloneJsObject: function (jsObj) {
        var objClone;
        if (jsObj.constructor == Object) {
            objClone = new jsObj.constructor();
        } 
        else {
            objClone = new jsObj.constructor(jsObj.valueOf());
        }
        for (var key in jsObj) {
            if (objClone[key] != jsObj[key]) {
                if (typeof (this[key]) == 'object') {
                    objClone[key] = jsObj[key].Clone();
                } else {
                    objClone[key] = jsObj[key];
                }
            }
        }
        objClone.toString = jsObj.toString;
        objClone.valueOf = jsObj.valueOf;
        return objClone;
    },
    
    /**
     * Do extend class. It helps to create super constructor in sub class prototype.
     * 
     * @param subClass the sub class
     * @param superClass the super class
     */
    extend: function(subClass, superClass){
        var F = function(){};
        F.prototype = superClass.prototype;
        subClass.prototype = new F();
        subClass.prototype.constructor = subClass;
        
        if (superClass.prototype.constructor == Object){
            superClass.prototype.constructor = superClass;
        }
        subClass.superClass = superClass.prototype;
        
    },
    
    /**
     * Do clone prototype from giving class.
     * 
     * @param receivingClass the receiving class
     * @param givingClass the giving class
     */
    augment : function(receivingClass, givingClass){
        var proto = givingClass.prototype;
        if (!proto){
            proto = givingClass;
        }
        if (arguments[2]){
            for( var i = 2; i < arguments.length ; i++){
                receivingClass.prototype[arguments[i]] = proto[arguments[i]];
            }
        }else{
            for (methodName in proto){
                receivingClass.prototype[methodName] = proto[methodName];
            }
        }
    },

    /**
     * Do throw method is not implemented by class.
     * 
     * @param objClass
     *            the class instance
     * @param methodName
     *            the method name
     */
    throwImplementException : function(objClass, methodName){
        var message = methodName + " is supposed to be implemented";
        throw message;
    },
};