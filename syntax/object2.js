// array, object

var f = function(){
    console.log(1+1);
    console.log(2+1);
}
var a = [f];
a[0]();

var o = {
    func:f
}

o.func();

// var i = if(ture){console.log(1)}