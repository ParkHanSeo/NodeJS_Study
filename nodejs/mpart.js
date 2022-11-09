var M = {
    v:'v',
    f:function(){
        console.log(this.v);
    }
}
//해당 기능을 외부에서도 사용할 수 있도록 함
module.exports = M;