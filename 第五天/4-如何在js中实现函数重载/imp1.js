import addMethod from "./addMethod.js";
const searcher = {};
addMethod(searcher, "getUsers", () => {
  console.log("查询所有用户");
});

addMethod(searcher, "getUsers", (name) => {
  console.log("按照姓名查询用户");
});

addMethod(searcher, "getUsers", (name, sex) => {
  console.log("按照姓名和性别查询用户");
});
searcher.getUsers();
searcher.getUsers(1);
searcher.getUsers(1, 2);
