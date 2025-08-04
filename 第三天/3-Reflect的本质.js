// //Reflect的本质：调用对象的基本方法(内部方法)
// const obj = {
//   a: 1,
//   b: 2,
//   get c() {
//     return this.a + this.b;
//   },
// };
// obj.a = 1; //本质上是调用对象的[[SET]]方法
// console.log(obj.a); //本质上是调用对象的[[GET]]方法
// Reflect.set(obj, "a", 2); //本质上是调用对象的[[SET]]方法

// console.log(obj.c); //本质上是调用对象的[[GET]]方法
// //[[GET]方法有一个参数叫Receiver，指定的this指向；像obj.c读取c的时候会经过一个函数，这个函数里面的this指向，是由Receiver决定的。
// console.log(obj.c); //=> 步骤是：首先将obj定义为this,再去调[[GET]](obj,'c',obj),第三个参数就是Receiver(this)

// console.log(Reflect.get(obj, "c", { a: 3, b: 4 })); //7  [[GET]](obj,'c',{ a: 3, b: 4 }),this就改为{ a: 3, b: 4 } => 7

// //此时是监听不到a b的，因为c()的this是obj(原始对象)，c()中this.a和this.b访问的是obj(原始对象)的a b,无法被proxy捕捉
// const proxy1 = new Proxy(obj, {
//   get(target, key) {
//     console.log("read", key);
//     return target[key];
//   },
// });

// proxy.c;

// //此时是可以监听a b的，因为c()的this是proxy2(代理对象)，c()中this.a和this.b访问的是proxy2(代理对象)的a b,可以被proxy捕捉
// const proxy2 = new Proxy(obj, {
//   get(target, key) {
//     console.log("read", key);
//     return Reflect.get(target, key, proxy2);
//   },
// });

// proxy.c;

const obj2 = {
  a: 1,
  b: 2,
  [Symbol()]: 4,
};
Object.defineProperty(obj2, "c", {
  value: 3,
  enumerable: false,
});
const keys1 = Object.keys(obj2);
console.log(keys); //["a", "b"]; Object.keys做一些判断再调用内部方法[[OwnPropertyKeys]]
const keys2 = Reflect.ownKeys(obj2);
console.log(keys2); //["a", "b", "c", Symbol()] //直接调用内部方法[[OwnPropertyKeys]]
