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
