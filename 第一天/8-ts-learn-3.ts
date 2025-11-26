namespace LEARN_THREE {
  // TODO:实现一个mixin
  function mixin<T, K>(a: T, b: K): Omit<K, keyof T> & T {
    return { ...a, ...b };
  }
  let x = mixin(
    {
      name: "wt",
      age: 30,
      c: 3,
    },
    {
      name: 123,
      age: 30,
      b: 2,
    }
  );
  type Computed<T> = {
    [K in keyof T]: T[K];
  };
  type nameType = Computed<typeof x>;
  // {
  //     b: number;
  //     name: string;
  //     age: number;
  //     c: number;
  // }

  //TODO:如果只想要 key,value 的格式，可以采用 Record 类型
  type Record<K extends keyof any, V> = { [P in K]: V };
  let p6: Record<string, any> = { AB: 123 };

  function map<T extends keyof any, K, U>(
    obj: Record<T, K>,
    callback: (value: K, key: T) => U
  ) {
    let result = {} as Record<T, U>;
    for (let key in obj) {
      result[key] = callback(obj[key], key);
    }
    return result;
  }

  let mapResult = map<string, any, string>(
    { name: "jj", age: 30 },
    (value, key) => {
      return "ABC";
    }
  );
}
