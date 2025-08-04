//父子类型安全：父子类型传递的过程中出现
//子类型:成员较多，包含父类型。
//父类型:成员较少

interface Parent {
  a: string;
}

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

type pTransform = (p: Parent) => void;
type cTransform = (c: Child) => void;

let p3: pTransform = (p: Parent) => {};
let c3: cTransform = (p: Child) => {};

c3 = p3;
p3 = c3; //逆变

type pReturn = (p) => Parent;
type cReturn = (c) => Child;

let p4: pReturn = (p) => ({ a: "" });
let c4: cReturn = (p) => ({ a: "", b: "" });

c4 = p4; //协变
p4 = c4;
