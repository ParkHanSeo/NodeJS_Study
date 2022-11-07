var name = 'temp';

var letter = 'aaaaaaaaaaaaaaaaaa '+name+' bbbbbbbbbbbbbbb ddddd ddddddddd '+name+' eeeeeeeee';


// 리터럴이란 정보를 표현하는 방법
// ~모양 에 있는 ` 키임
var letter = `aaaaaaaaaaaaaaaaaa${name}`+'bbbbbbbbbbbbbbb ddddd ddddddddd '+name+' eeeeeeeee';
console.log(letter);