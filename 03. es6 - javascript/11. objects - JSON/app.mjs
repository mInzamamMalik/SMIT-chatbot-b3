// let arr = ["banana", "orange", "kiwi", "strawberry"];
const arr = ["banana", "orange", "kiwi", "strawberry"];
// array and object both created with let and const can be edited

arr.push("apple");

console.log(arr);

const myVar = "testing11";

// created an javascript object literal
const obj = {
  name: "Shehzad",
  age: 20,
  testingVar: myVar,
  function: (a, b) => a + b,
  interests: ["english", "math", "computer"],
  subjects: {
    // nested object
    computer: 99,
    math: 80,
    english: 60,
  },
};

const iNeedThisKey = "name";

console.log("obj", obj.name);
console.log("obj", obj["name"]);
console.log("obj", obj.iNeedThisKey); // not found
console.log("obj", obj[iNeedThisKey]);

// console.log('arr',obj.subjects[2]); // getting array
console.log("arr", obj.subjects);

obj.name = "dfdf"; // replacing existing items in object
obj.something = "dfdf"; // adding new in object

console.log("obj => ", obj);
