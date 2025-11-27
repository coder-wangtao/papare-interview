namespace LEARN_FOUR {
  // 函数的逆变和协变，函数的参数时候逆变的，返回值是协变的
  // TODO:函数的参数是逆变的,返回值是协变的
  class Parent {
    house() {}
  }
  class Child extends Parent {
    car() {}
  }
  class Grandson extends Child {
    money() {}
  }

  let t1: (instance: Child) => void = (instance: Parent) => ""; //函数的参数是逆变的
  let t2: (instance: Child) => Child = (instance: Child) => new Grandson(); //函数的返回值是协变的
  // 记忆：传父（参数是逆变的）返子（返回值是协变的）
  // 逆变 c
  // 协变 输出/返回类型可从子类赋值给父类。

  // 推导公式
  type Arg<T> = (arg: T) => void;
  type Return<T> = (arg: any) => T;
  type ArgType = Arg<Parent> extends Arg<Child> ? true : false; //逆变
  type ReturnType = Return<Grandson> extends Return<Child> ? true : false; //逆变

  // 装饰器就是一个函数，只能在类中使用（类本身，类成员中使用）
  // 装饰器的分类：类的装饰器，方法装饰器（静态方法装饰器），属性装饰器(静态属性装饰器)，属性访问装饰器，参数装饰器
  // TODO:类的装饰器：给类来进行扩展(一般不用通过装饰器去扩展类的属性和方法，因为扩展后原来没有的方法无法访问到，需要通过 namespace,interface 来进行扩展)
  const classDecorator = <T extends new (...args: any[]) => any>(target: T) => {
    (target as any).type = "动物";
    (target as any).getType = function () {
      return this.type;
    };
    Object.assign(target.prototype, {
      eat() {},
      drink() {},
    });
  };

  @classDecorator
  class AnimalOne {}
  console.log(typeof AnimalOne); //function
  console.log((AnimalOne as any).getType());
  const animalOne = new AnimalOne();
  console.log(animalOne);

  //TODO:方法装饰器（方法装饰器最终是要返回一个函数）
  function Enum(isEnum: boolean): MethodDecorator {
    return function (target, property, descriptor) {
      //descriptor.enumerable 是否可枚举
      //descriptor.writable 是否可被重写
      //descriptor.configurable 是否可被删除
      //descriptor.value 当前值
      descriptor.enumerable = isEnum;
      let original = descriptor.value as any;
      descriptor.value = function () {
        console.log("prev eat");
        return original(...arguments);
      } as any;
    };
  }
  class AnimalTwo {
    @Enum(true)
    eat() {
      console.log("animal original");
    }
  }
  const animalTwo = new AnimalTwo();
  animalTwo.eat();

  //TODO:属性装饰器
  function ToUpper(isUpper: boolean): PropertyDecorator {
    return function (target, property) {
      //descriptor.enumerable 是否可枚举
      //descriptor.writable 是否可被重写
      //descriptor.configurable 是否可被删除
      //descriptor.value 当前值
      let val = "";
      Object.defineProperty(target, property, {
        enumerable: true,
        get() {
          return val.toUpperCase();
        },
        set(newValue) {
          val = newValue;
        },
      });
    };
  }
  class AnimalThree {
    @ToUpper(true)
    public name: string = "animal";
  }
  const animalThree = new AnimalThree();
  console.log(animalThree.name);

  //TODO:属性访问装饰器
  function valToUpper(target: any, property: any, descriptor: any) {
    let originalSet = descriptor.set;
    let originalGet = descriptor.get;
    descriptor.set = function (newValue: string) {
      return originalSet.call(this, newValue.toUpperCase());
    };
    descriptor.get = function () {
      return originalGet.call(this) + "123";
    };
  }
  class Animal {
    private _val!: string;
    @valToUpper
    get val() {
      return this._val;
    }
    set val(newValue: string) {
      this._val = newValue;
    }
  }
  const animal = new Animal();
  animal.val = "abc";
  console.log(animal.val);
}
