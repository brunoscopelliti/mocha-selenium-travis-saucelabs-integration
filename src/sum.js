
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        factory(exports);
    } else {
        factory((root.commonJsStrict = {}));
    }
}(this, function (exports) {
    exports.sum = function sum(){
        // var args = Array.from(arguments);
        // use the previous expression if you want to see the build fail on IE
        var args = Array.prototype.slice.apply(arguments).filter(function(el) { return typeof el == "number" && el === el; });
        return args.length == 0 ? 0 : args.reduce(function(a,b) { return a+b; });
    }
}));
