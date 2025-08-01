//可以一放
type CurryedType<P, R> = P extends []
  ? () => R //当fn没有参数时
  : P extends [infer A]
  ? (x: A) => R //当fn只有一个参数，或者是传递的最后一个参数时
  : P extends [infer A, ...infer Rest]
  ? (x: A) => CurryedType<Rest, R> //当 fn 传递过程中，仍然还有有参数是
  : never;

declare function curry<P extends any[], R>(
  fn: (...args: P) => R
): CurryedType<P, R>;

function sum(a: number, b: number, c: number, d: number, e: number) {
  return a + b + c + d + e;
}

//可以测试空函数、单参数函数
const currySum = curry(sum);
const res = currySum(1)(2);
