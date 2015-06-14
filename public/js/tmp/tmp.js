/* Module Pattern A */
var ModuleA = (function() {   
    return function(a, b) {
	    var _privateVar = a;
	    
	    var publicVar = b;
	    
	    var _privateMethod = function() {
			console.log('private method');
	    };
	    
	    var publicMethod = function() {
			console.log('public method');
	    };
	     
	    return {
			publicVar: publicVar,
			publicMethod: publicMethod
		};
	};
})();

//var moduleA = new ModuleA('foo', 'bar');


/* Module Pattern B */
var ModuleB = function(a, b) {
	var _privateVar;	
	var publicVar;
	
	var _privateMethod = function() {
		console.log('private method');
	};
	
	var publicMethod = function() {
		console.log('public method');
	};
	
	var init = function() {
		if(typeof a === 'undefined' || typeof b === 'undefined') {
			console.log('Object arguments required');
			return;
		}
		_privateVar = a;
		
		publicVar = b;
		
		_privateMethod();	
	};
	
	init();
	
	return {
		publicVar: publicVar,
		publicMethod: publicMethod
	};
};

var moduleB = new ModuleB();

alert(moduleB.publicVar);

alert(moduleB._privateVar);