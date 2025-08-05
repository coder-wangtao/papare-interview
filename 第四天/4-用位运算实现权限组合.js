const READ = 0b1; //1
const CREATE = 0b10; //2
const UPDATE = 0b100; //4
const DELETE = 0b1000; //8

//某个用户对某篇文章有可读可创建且可修改的权限
let userPer = READ | CREATE | DELETE; // 1011  11

userPer ^= READ; //切换权限（把READ删除）
userPer ^= READ; //切换权限（把READ添加回来）

if (userPer & READ) {
  console.log("有可读权限");
} else {
  console.log("没有有可读权限");
}
