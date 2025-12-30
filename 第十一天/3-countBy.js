/**
 * 根据指定的迭代函数，对集合中的元素进行分类计数
 * @param {Array|Object} collection 要处理的集合（可以是数组或对象）
 * @param {Function} iteratee 用于对集合元素进行处理的迭代函数
 * @return {Object} 返回一个对象，键为迭代函数返回的值，值为该键的计数
 *
 * @example
 * countBy([6.1, 4.2, 6.3], Math.floor) // => { '4': 1, '6': 2 }
 * countBy(['apple', 'banana', 'apple', 'orange'], (item) => item.length) // => { '5': 2, '6': 1 }
 */
function countBy(collection, iteratee) {
  const result = {};
  for (const item of collection) {
    const key = iteratee(item);
    if (result[key]) {
      result[key]++;
    } else {
      result[key] = 1;
    }
  }
  return result;
}

console.log(countBy([6.1, 4.2, 6.3], Math.floor)); // => { '4': 1, '6': 2 }
console.log(
  countBy(["apple", "banana", "apple", "orange"], (item) => item.length)
); // => { '5': 2, '6': 1 }
