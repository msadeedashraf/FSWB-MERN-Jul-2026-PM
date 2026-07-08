//https://www.w3schools.com/js/js_es6.asp
/*Arrow Function*/
//  () => {}


const add = (num1, num2) => { return num1 + num2}

console.log(add(6,6))


const add2 = (num1, num2) => num1 + num2
console.log(add2(7,6))

const square = num => num * num

console.log(square(5))

const greet = name => {
    console.log(`Welcome ${name}`);
};

greet("Hazla")
greet("Frank")



/*
function add(num1, num2)
{
    result = num1+num2
    return result
}

console.log(add(15,6))
*/