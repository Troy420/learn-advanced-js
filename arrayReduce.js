// The arr.reduce() method in JavaScript is used to reduce the array to a single value and executes a provided function for each value of the array (from left-to-right) and the return value of the function is stored in an accumulator.

// accumulator = 2 | currentValue = 1 <== if accumulator is initialized

// accumulator = 1 | currentValue = 2 <== if no initialize value given
// accumulator = 3 | currentValue = 3
// accumulator = 6 | currentValue = 4
// ....
// accumulator = 15 | currentValue = 6

let arrayReduce = array.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
}, 2); // <== this is to initialize the value of accumulator

console.log(arrayReduce);