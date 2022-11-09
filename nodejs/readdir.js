var testFolder = './data';
var fs = require('fs');

// Node.js 는 특정 디렉토리의 파일 목록을 배열로 놓아준다.

fs.readdir(testFolder, function(error, filelist){
    console.log(filelist);
});