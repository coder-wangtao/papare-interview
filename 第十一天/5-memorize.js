/**
 * 创建一个带有缓存的函数，可以避免重复计算相同的参数
 * @param {Function} func 要进行缓存的函数
 * @param {Function} [resolver] 用来计算缓存键的函数，默认为第一个参数作为缓存键
 * @return {Function} 返回一个带缓存功能的函数
 *
 * @example
 * 使用默认缓存规则：第一个参数作为缓存键
 * const add = (a, b) => a + b;
 * const memoizedAdd = memorize(add);
 * console.log(memoizedAdd(1, 2)); // 3，第一次调用，结果计算并缓存
 * console.log(memoizedAdd(1, 2)); // 3，直接返回缓存结果

 * 使用自定义缓存键：通过字符串拼接生成缓存键
 * const getFullName = (firstName, lastName) => `${firstName} ${lastName}`;
 * const memoizedFullName = memorize(getFullName, (firstName, lastName) => `${firstName}_${lastName}`);
 * console.log(memoizedFullName('John', 'Doe')); // 'John Doe'，第一次调用，结果计算并缓存
 * console.log(memoizedFullName('John', 'Doe')); // 'John Doe'，直接返回缓存结果
 */
function memorize(func, resolver) {
  const memorized = function (...args) {
    const key = resolver ? resolver.apply(this, args) : args[0];
    if (memorized.cache.has(key)) {
      return memorized.cache.get(key);
    }
    const result = func.apply(this, args);
    memorized.cache.set(key, result);
    return result;
  };
  memorized.cache = new Map();
  return memorized;
}

const add = (a, b) => a + b;
const memoizedAdd = memorize(add);
console.log(memoizedAdd(1, 2)); // 3，第一次调用，结果计算并缓存
console.log(memoizedAdd(1, 2)); // 3，直接返回缓存结果

const getFullName = (firstName, lastName) => `${firstName} ${lastName}`;
const memoizedFullName = memorize(
  getFullName,
  (firstName, lastName) => `${firstName}_${lastName}`
);
console.log(memoizedFullName("John", "Doe")); // 'John Doe'，第一次调用，结果计算并缓存
console.log(memoizedFullName("John", "Doe")); // 'John Doe'，直接返回缓存结果
