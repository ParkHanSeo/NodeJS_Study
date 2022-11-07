console.log('A');
console.log('B');
var args = process.argv.slice(2);
console.log(args[2]);
if(args[2] == '1'){
    console.log('C1');
}else if(false){
    console.log('C2');
}else{
    console.log('C3');
}

console.log('D');