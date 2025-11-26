namespace LEARN_TWO {
  //TODO: 如何解决多的属性后，让 tomato 可以赋予给 IVeg？
  interface IVeg {
    color: string;
    size: number;
  }

  // [1].如果对象中的属性多余接口可以直接采用断言的方式来赋值
  const tomato1: IVeg = {
    color: "red",
    size: 10,
    a: 1,
  } as IVeg;
  // [2].可以基于接口的特性写一个同名的接口
  interface IVeg {
    a: number;
  }
  // [3].产生一个新类型，通过继承原有属性的方式
  interface IV extends IVeg {
    a: number;
  }
  // [4].通过任意类型来扩展
  interface IVeg {
    color: string;
    size: number;
    [key: string]: any; //key 是任意类型，key 的类型是字符串时，可以赋予 number,string,symbol，value 也是任意类型
  }
  const tomato2: IV = {
    color: "red",
    size: 10,
    a: 1,
  };

  ////TODO: unknown 是 any 的安全类型，泛型没有赋值的时候，默认就是 unknown,unknown 必须先要进行类型检测才能使用（类型检查、类型断言）
  type UnionUnknown = unknown | string | null; //===> unknown //unknown 和任何类型做联合类型都是 unknown
  type InternUnknown = unknown & string; //===> string
  type InternAny = any & string; //===> any
  type IKeyOf1 = keyof any; //===> string | number | symbol  通用键类型，可以表示 任意对象的键
  type IKeyOf2 = keyof unknown; //===> never

  //TODO:A extends B,A 是 B 的子类型（会触发条件分发）
  // 5.1 何时会触发条件分发？
  // 5.1.1 A 类型是通过泛型传入的
  // 5.1.2 A 类型如果是联合类型会进行分发
  // 5.1.3 泛型参数 A 必须是完全裸露的，才具备分发能力，比如 A&{}、[A],就不是裸露的，不具备分发能力。
  // 5.2 条件分发
  type Conditional<T> = T extends string ? string : number;
  type R1 = Conditional<"1" | 1>;
  // 5.3 有些情况下，我们需要关闭这种分发能力，因为会造成判断不准确
  type Conditional2<T, U> = T extends U ? true : false;
  type R2 = Conditional2<1 | 2, 1>;
  // 5.4.1 禁用分发(1)
  type NoDistribute<T> = T & {};
  type Conditional3<T, U> = NoDistribute<T> extends U ? true : false;
  type R3 = Conditional3<1 | 2, 1>;
  // 5.4.2 禁用分发(2)
  type Conditional4<T, U> = [T] extends [U] ? true : false;
  type R4 = Conditional4<1 | 2, 1>;
  // 5.5 ts使用条件分发实现了一些常见的内置类型
  // 5.5.1 求差集
  type MyExtract<T, U> = T extends U ? T : never;
  type R6 = MyExtract<1 | 2 | 3, 1 | 2 | 4>; //1 | 2
  // 5.5.2 排除
  type MyExclude<T, U> = T extends U ? never : T;
  type R7 = MyExclude<1 | 2 | 3 | 4 | 5, 2 | 4>; //1 | 3 | 5
  // 5.5.3 排除空值(常用在获取 getElement 排除 null 或者 undefined)
  type x1 = null & {}; //never
  type x2 = undefined & {}; //never
  type x3 = 1 & {}; //1
  type NoNullable<T> = T & {};
  type R8 = NoNullable<1 | 2 | null | undefined>; //1 | 2

  interface IAddress {
    x: string;
    y: string;
  }

  interface Person {
    name: string;
    age: number;
    address: IAddress;
  }
  //TODO: Partial会将目标类型中的每个属性变为可选，生成一个新的类型。
  type Partial<T> = {
    [K in keyof T]?: T[K];
  };
  type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
  };

  let p1: Partial<Person> = {
    name: "1",
    age: 100,
    address: { x: "1", y: "1" },
  };
  let p2: DeepPartial<Person> = { name: "1", age: 100, address: { x: "1" } };

  //TODO: Required 会将一个类型的所有属性变为必需的
  type Require<T> = {
    [K in keyof T]-?: T[K];
  };

  interface People {
    name?: string;
    age?: number;
  }
  let p3: Require<People> = { name: "1", age: 10 };

  interface TempPerson {
    name?: string;
    age?: number;
  }
  //TODO: Readonly 将类型的所有属性变为只读，返回一个新类型
  type Readonly<T> = {
    readonly [K in keyof T]: T[K];
  };
  let p4: Readonly<TempPerson> = { name: "1", age: 10 };

  interface PersonReadonly {
    readonly name: string;
    readonly age: number;
  }
  //TODO: Mutate 将类型的所有属性移除 readonly,返回一个新类型
  type Mutate<T> = {
    -readonly [K in keyof T]: T[K];
  };
  let p5: Mutate<PersonReadonly> = { name: "1", age: 10 };

  //TODO: Pick 从一个类型中选择一部分属性，创建一个新类型，包含原类型的部分字段
  type Pick<T, K extends keyof T> = {
    [Key in K]: T[K];
  };
  type PickPerson = Pick<Person, "name" | "age">;

  //TODO: Exclude 用于从一个类型中排除某些类型，生成一个新的类型。
  type T = "a" | "b" | "c";
  // 从 T 中排除 'a'
  type Result = Exclude<T, "a">;

  //TODO: 它和 Pick 相反，用于从一个类型中排除某些属性，生成一个新的类型。
  interface Person {
    name: string;
    age: number;
    address: IAddress;
  }
  type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
  type OmitPerson = Omit<Person, "name" | "age">; //{ address: IAddress; }
}
