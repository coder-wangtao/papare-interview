const obj = {
  name: "Alice",
  sayHi: () => {
    console.log(this.name);
  },
  sayHi2() {
    (() => {
      console.log(this.name);
    })();
  },
};

obj.sayHi(); // undefined
obj.sayHi2(); // Alice
