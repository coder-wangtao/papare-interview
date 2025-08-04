//下面这些代码是在一个函数环境内执行的
//  this === exports === module.exports(重要)
//   "./5-common-js本质.js": (module, exports, require) => {
//      this.a = 1;
//      exports.b = 2;
//      exports = {
//        c: 3,
//      };
//      module.exports = {
//        d: 4,
//      };
//      exports.e = 5;
//      this.f = 6;
//   }

this.a = 1;
exports.b = 2;
exports = {
  c: 3,
};

//最后返回的是这个module.exports
module.exports = {
  d: 4,
};

exports.e = 5;
this.f = 6;

const r = require("./5-common-js本质.js");

r = {
  d: 4,
};

// //模块定义
// var modules = {
//   "./src/name.js": (module, exports, require) => {
//     module.exports = "不要秃头啊";
//   },
// };
// var cache = {};

// //接受模块的路径为参数，返回具体的模块的内容
// function require(modulePath) {
//   var cachedModule = cache[modulePath]; //获取模块缓存
//   if (cachedModule !== undefined) {
//     //如果有缓存则不允许模块内容，直接retuen导出的值
//     return cachedModule.exports;
//   }
//   //如果没有缓存，则定义module对象，定义exports属性
//   //这里注意！！！module = cache[modulePath] 代表引用的是同一个内存地址
//   var module = (cache[modulePath] = {
//     exports: {},
//   });
//   //运行模块内的代码，在模块代码中会给module.exports对象赋值
//   modules[modulePath](module, module.exports, require);

//   //导入module.exports对象(是这个)
//   return module.exports;
// }

// (() => {
//   let author = require("./src/name.js");
//   console.log(author, "author");
// })();

require("../5-common-js本质.js");
