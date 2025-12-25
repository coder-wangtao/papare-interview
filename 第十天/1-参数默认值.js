//TODO: 参数默认值：arguments和实参不一致
function maxArgs(a, b = 2) {
  //   "use strict";  TODO:严格模式下arguments和实参不一致
  console.log(arguments.length);
  console.log(a === arguments[0]);
  console.log(b === arguments[1]);
  a = "alpha";
  b = "beta";
  console.log(a === arguments[0]);
  console.log(b === arguments[1]);
}

maxArgs(1, 2);

function foo(a, b, c = 2) {}
console.log(foo.length); //TODO: 参数默认值：形参会保存到形参之前的数量

//TODO: 参数默认值是一个函数的时候，调用foo的时候才会调用getValue
let n = 1;
function getValue() {
  return n++;
}
function zoo(a, b = getValue()) {
  console.log(a, b);
}
zoo(1, 2);
zoo(1); // 1 1 n:2
zoo(1); // 1 2 n:3

//TODO: 参数默认值的暂时性死区
function bar(a = getValue(b), b) {
  console.log(a, b);
}
bar(undefined, 1); //报错
bar(undefined, 2); //报错
