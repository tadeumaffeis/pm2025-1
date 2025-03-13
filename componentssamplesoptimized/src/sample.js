let arr = [null,1,3,3,4,5,6,7,8];

console.log(arr.indexOf(1));

if (arr[1])
{
    console.log("It´s not null")
}
else{
    console.log("It´s null")
}

let reset = () => {
    console.log("Reset")
}

const obj = { content: 'Hello, World!', reset };

reset = null;

if (obj.reset) {
    obj.reset();
}