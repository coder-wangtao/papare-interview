// git 回滚
// 1.已提交,没有push
// 1)git reset --soft   撤销commit
// 2)git reset --mixed  撤销commit和add两个动作
// 2.已提交，并且push
// 1)git reset --hard  撤销并舍弃版本号之后的提交记录。使用需要谨慎。
// 2)git revert        撤销但是保留了提交记录。
