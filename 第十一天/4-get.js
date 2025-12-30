/**
 * 获取对象中指定路径的值，如果路径不存在则返回默认值
 * @param {Object} object 要查询的对象
 * @param {Array|string} path 要访问的路径，可以是字符串或数组形式
 * @param {*} [defaultValue] 当路径不存在时返回的默认值
 * @return {*} 返回路径对应的值，如果路径不存在则返回默认值
 *
 * @example
 * get({ a: [{ b: { c: 3 } }] }, ["a", 0, "b", "c"]) // => 3
 * get({ a: [{ b: { c: 3 } }] }, "a[0].b.c") // => 3
 * get({ a: [{ b: { c: 3 } }] }, "a[0].b.d", "default") // => 'default'
 */
function get(object, path, defaultValue) {
  let obj = object;
  if (typeof path === "string") {
    const reg = /[^\[\].]+/g;
    path = path.match(reg);
  }
  for (const key of path) {
    if (!obj) {
      return defaultValue;
    }
    obj = obj[key];
  }
  return obj === undefined ? defaultValue : obj;
}

const object = { a: [{ b: { c: 3 } }] };
console.log(get(object, ["a", 0, "b", "c"])); // => 3
console.log(get(object, "a[0].b.c")); // => 3
console.log(get(object, "a[0].b.d", "default")); // => 'default'
