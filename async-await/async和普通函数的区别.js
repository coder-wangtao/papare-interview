//1.异步函数可以有返回值，但是异步函数的返回值会被 包裹到Promise.resolve中
//2.异步函数的返回值是Promise，异步函数的状态由promise决定
{
    then(resolve.reject) {
        resolve('333')
    }
}
//3.异步函数返回值是一个对象并且实现了thenable，异步函数的状态由then方法决定

// async 函数抛出了异常，程序不会像普通函数一样报错，而是会作为promise的reject来从传递
function foo() {
  throw new Error("出错了");
}

foo(); // 程序直接报错

async function fooAsync() {
  throw new Error("出错了");
}

fooAsync(); // 不会直接报错，而是返回一个被 reject 的 Promise

//）用 try...catch 搭配 await：
async function fooAsync() {
  throw new Error("出错了");
}

async function run() {
  try {
    await fooAsync();
  } catch (err) {
    console.log("捕获到错误:", err.message);
  }
}

run();
