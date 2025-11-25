type MyReturnType<T> = T extends (...args:any[]) => infer R ? R : T;

type sum = (a: number, b: number) => number;
type concat = (a: any[], b: any[]) => any[];

let sumResult: MyReturnType<sum>; //number
let concatResult: MyReturnType<concat>; //any[]
