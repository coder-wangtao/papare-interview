import createOverload from "./createOverload.js";
const getUsers = createOverload();

getUsers.addImpl(() => {
  console.log("查询所有用户");
});

const searchPage = (page, size = 10) => {
  console.log("按照页面和数量查询用户");
};

getUsers.addImpl("number", searchPage);

getUsers.addImpl("number", "number", searchPage);

getUsers.addImpl("string", (name) => {
  console.log("按照姓名查询用户");
});

getUsers.addImpl("string", "string", (name, sex) => {
  console.log("按照姓名和姓名查询用户");
});

getUsers("11", "11");
