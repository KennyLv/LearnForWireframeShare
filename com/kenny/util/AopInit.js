var aop = null; 

com.kenny.util.AopInit = {
	getAop : function() {
		if (aop == null) aop = new com.kenny.util.Aop();
		return aop;
	}
};