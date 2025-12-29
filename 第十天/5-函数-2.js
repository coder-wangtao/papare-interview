const arr = [23, 1, 23, 4, 6, 2, 3, 2, 1];
const result = [...new Set(arr)];

function foo(options = {}) {
  const defaultOptions = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
  };
  options = { ...defaultOptions, ...options };
  console.log(options);
}

const calculator = {
  count: 0,
  next() {
    return ++this.count;
  },
  double(a) {
    return a * 2;
  },
  add(a, b) {
    return a + b;
  },
};

for (const key in calculator) {
  const origin = calculator[key];
  calculator[key] = function (...args) {
    console.log(`调用了 ${key} 方法，参数是`, arguments);
    origin.call(this, ...args);
    console.log(`调用 ${key} 方法结束`);
  };
}

calculator.add(1, 2);
