type ArrayType1<T> = T extends Array<infer R> ? R : T;
type ArrayType2<T> = T extends Array<infer R> ? ArrayType2<R> : T;


type at1 = ArrayType1<string[]>; // string
type at2 = ArrayType2<string[][]>; // string