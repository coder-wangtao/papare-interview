// 对象的原型{}  [[prototype]]  __proto__ /Object.getPrototypeof(info)
// 函数的原型 function foo(){} prototype

function Foo() {}

const f1 = new Foo();
const f2 = new Foo();

Foo.prototype === f1.__proto__;
Foo.prototype === f2.__proto__;
Foo.prototype.constructor = function Foo() {};

function Object() {}
const o1 = Object();

Object.prototype = o1.__proto__;

function Function() {}

Function.__proto__ = Function.prototype;

new [[__proto__]] =fun  