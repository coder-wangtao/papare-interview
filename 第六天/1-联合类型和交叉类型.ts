//即可以是这个又可以是那个
type UnionType =
  | {
      a: number;
      b: number;
    }
  | {
      b: number;
      c: number;
    };

const data1: UnionType = {
  a: 1,
  b: 1,
  c: 1,
};

data1.b; //用的时候只能用它们共有的东西

//即是这个又必须是那个
type IntersectionType = {
  a: number;
  c: number;
} & {
  b: number;
  c: number;
};

const data2: IntersectionType = {
  a: 1,
  b: 2,
  c: 3,
};
data2.a; //用的时候两个类型的成员都能用
