//TODO: 联合类型（Union）：变量可以是多种类型中的 任意一个
//TODO: 交叉类型（Intersection）：变量必须同时满足多种类型（通常用于对象合并）
type A = { name: string };
type B = { age: number };

type Union = A | B; // { name: string } 或 { age: number }
type Intersection = A & B; // { name: string, age: number }

let person = {
  name: "wangtao",
  age: 20,
};

//TODO: 采用ts中的typeof来获取变量的类型,
//ts中的this类型需要手动指定，默认是函数的第一个参数
type IThis = typeof person;
function getVal(this: IThis, key: keyof IThis) {
  return this[key];
}
let n = getVal.call(person, "name");
let a = getVal.call(person, "age");

//TODO:ts 中的函数重载是伪重载，是类型的重载，而不是逻辑的重载
function toArray(value: string): string[];
function toArray(value: number): number[];
function toArray(value: number | string): string[] | number[] {
  if (typeof value === "string") {
    return value.split("");
  } else {
    return value
      .toString()
      .split("")
      .map((item) => Number(item));
  }
}
let arr = toArray(123);
let arr1 = toArray("123");

//TODO: type 和 interface 的区别
// 1.1 如果只是用来描述结构，我们采用 interface。(比如说一个对象，type 主要是声明一个类型)
// 1.2 如果涉及到联合类型，则只能使用 type 来进行声明。
// 1.3 type 不能扩展，interface 是可以扩展。
// 1.4 type 不能重名，interface 重名可以合并。
// 1.5 type 可以使用循环和条件，interface 不行。
// 1.6 其他情况无所谓，可以互换（函数类型一般采用 type 来声名）
