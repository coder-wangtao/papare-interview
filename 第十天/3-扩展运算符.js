const nums = [1, 2, 3, 4];
//浅拷贝
const newNums1 = nums.slice(0);
const newNums2 = [...nums];

//TODO:1.针对可选代对象展开   ...可选代对象

//TODO:2.针对普通对象展开

//TODO:2.针对普通对象展开

//TODO:
function printSum(...nums) {
  //收拢
  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
  }
  console.log(sum);
}
//展开
printSum(...nums);
