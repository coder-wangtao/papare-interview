//父子类型安全：父子类型传递的过程中出现
//子类型:成员较多，包含父类型。
//父类型:成员较少

// 函数参数的类型是逆变的，也就是说，函数类型的参数类型可以接受比目标类型更宽泛的类型，
// 或者说，类型越小的子类型可以用来代替父类型。

//函数返回值是协变的，意味着，如果函数的返回类型是某个类型的子类型，
// 它也可以返回父类型的子类型，或者返回类型越大就越符合要求。

//父类型:成员较少
interface Parent {
  a: string;
}

//子类型:成员较多，包含父类型。
interface Child extends Parent {
  b: string;
}

let p1: Parent = { a: "" };
let c1: Child = { a: "", b: "" };
p1 = c1; //子类型传递给父类型，类型是安全的；
c1 = p1; //父类型传递给子类型，类型不安全  //协变

let p2: Array<Parent> = [{ a: "" }];
let c2: Array<Child> = [{ a: "", b: "" }];
p2 = c2; //子类型传递给父类型，类型是安全的；
c2 = p2; //父类型传递给子类型，类型不安全 //协变

// 函数参数的类型是逆变的，也就是说，类型越小的子类型可以用来代替父类型。
type pTransform = (p: Parent) => void;
type cTransform = (c: Child) => void;

let p3: pTransform = (p: Parent) => {};
let c3: cTransform = (p: Child) => {};

// 要把 p3 赋给 c3。
// 所以把 p3 当成一个 cTransform 来用。
// “如果我把 p3 当成 (c: Child) => void 来调用，会不会有问题？”
// 如果 c3（被赋值后的函数）被调用： c3({ a: "...", b: "..." })  // Child
// TODO: 逆变：函数参数允许把父类型赋给子类型的位置
c3 = p3; //逆变
p3 = c3;

type pReturn = (p) => Parent;
type cReturn = (c) => Child;

let p4: pReturn = (p) => ({ a: "" });
let c4: cReturn = (p) => ({ a: "", b: "" });

//TODO:协变：返回值类型可以从子类型赋值到父类型
c4 = p4;
p4 = c4; //协变
