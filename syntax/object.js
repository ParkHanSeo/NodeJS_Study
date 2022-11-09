var member = ['egoing','k8805','hoya'];
console.log(member[1]);
for(var i =0; i < member.length; i++){
    console.log('array loop '+member[i]);
}

var roles = {
    'programmer':'egoing',
    'designer' : 'k8805',
    'manager' : 'hoya'
};
console.log(roles.designer);

for(var name in roles){
    console.log('object => ',name, 'value => ', roles[name]);
}