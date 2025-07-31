interface ComplexObject {
  mandatory: string;
  option1?: number;
  option2?: boolean;
}

type GetOptional<T> = {
  [K in keyof T as T[K] extends Required<T>[K] ? never : K]: T[K];
};

let keys: GetOptional<ComplexObject>;
