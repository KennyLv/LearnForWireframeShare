com.kenny.util.Aop = function() {
	this._id = com.kenny.util.BaseTool.uuid();
	this._type = "Aop";
};

com.kenny.util.Aop.prototype = {
	actsAsAspect : function(object) {
		object.yield = null;
		object.rv = {};
		object.before = function(object, method, f) {
			var original = eval("this." + method);
			this[method] = function() {
				f.apply(this, [ object, method, arguments ]);
				return original.apply(this, arguments);
			};
		};
		object.after = function(object, method, f) {
			var original = eval("this." + method);
			this[method] = function() {
				this.rv[method] = original.apply(this, arguments);
				return f.apply(this, [ object, method, arguments ]);
			};
		};
		object.around = function(object, method, f) {
			var original = eval("this." + method);
			this[method] = function() {
				this.yield = original;
				return f.apply(this, [ object, method, arguments ]);
			};
		};
	},

	beforeHander : function(object, fnName) {
		var message = new com.kenny.util.Observer.Message();
		message.id = (object._type + "_" + fnName + "_BRFORE").toUpperCase();
		message.sender = object;
		com.kenny.util.Observer.sendMessage(message);
		
		//com.kenny.util.BaseTool.log4js('DEBUG', 'ID: ' + object._id + " Type: " + object._type + " --- Before " + fnName);
		//console.log('DEBUG', 'ID: ' + object._id + " Type: " + object._type + " --- Before " + fnName);
	},

	afterHander : function(object, fnName) {
		var message = new com.kenny.util.Observer.Message();
		message.id = (object._type + "_" + fnName + "_AFTER").toUpperCase();
		message.sender = object;
		com.kenny.util.Observer.sendMessage(message);
		
		//com.kenny.util.BaseTool.log4js('DEBUG', 'ID: ' + object._id + " Type: " + object._type + " --- After " + fnName);
		//console.log('DEBUG', 'ID: ' + object._id + " Type: " + object._type + " --- After " + fnName);
	},

	aroundHander : function(object, fnName) {
		var message = new com.kenny.util.Observer.Message();
		message.id = (object._type + "_" + fnName + "_AROUND").toUpperCase();
		message.sender = object;
		com.kenny.util.Observer.sendMessage(message);
		
		com.kenny.util.BaseTool.log4js('DEBUG', 'ID: ' + object._id + " Type: " + object._type + " --- Around " + fnName);
	}
};