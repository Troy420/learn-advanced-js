let array = [1,2,3,4,5,6];


// ARRAY MAP
let arrayMap = array.map((element) => {
    return element * 2;
});

console.log(arrayMap);


// The filter() method creates a new array with all elements that pass the test implemented by the provided function.
let arrayFilt = array.filter((element) => {
    if(element > 3) {
        return true;
    }
    return false;
});

console.log(arrayFilt);


//FOREACH
array.forEach((element) => {
    console.log((element));
});

// To look at the properties of document
console.dir(document);
console.log(document.documentElement.innerHTML);

