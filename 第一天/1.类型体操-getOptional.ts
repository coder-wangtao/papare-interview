// interface Person {
//   name: string;
//   age?: number;  // 可选属性
// }
// TODO: Required 将类型 T 的所有属性都变为必填属性。
// type RequiredPerson = Required<Person>;
// 相当于
// type RequiredPerson = {
//   name: string;
//   age: number;  // 不可选了
// }

interface ComplexObject {
  mandatory: string;
  option1?: number;
  option2?: boolean;
}

let keys: GetOptional<ComplexObject>;
// keys.option1
// keys.option2

//实现一个GetOptional传入一个类型，只获取类型中可选字段，生成一个新类型只包含可选字段

//只需要将原来的必选的字段设置为never即可
type GetOptional<T> = {
  [K in keyof T as K extends Required<T>[K] ? never : K]: T[K];
};
