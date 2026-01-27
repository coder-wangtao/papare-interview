当我们出现白屏时间太久的情况，那当然就需要进行相关优化，关于白屏出现的情况非常的多，这个当然我们需要通过指标，进行相关的分析，得出结论。

其中一种最常见的导致页面白屏时间过长的原因，就是界面需要渲染的内容过多，渲染时间过长导致的白屏问题
解决思路
<1>骨架屏
<2>SSR DOM直出:直出可以直观的减少页面二次请求和渲染 <服务端渲染（SSR）或静态渲染：减少首屏白屏时间。>
<3>分屏加载<优先渲染关键内容>
<4>FCP/CLS优化：谷歌指标中，首屏**首次内容绘制（FCP）和布局稳定性（CLS）**很重要。
<5> 图片压缩 懒加载非首屏资源

最后想到了requestAnimationFrame进行分帧渲染的方式，和我们现在的需求是最契合的。根本原理就是借助RAF下一次重绘（repaint）之前执行回调函数，将长任务分帧分解成一个个的短任务，当然还需要封装相关的脚本工具，探测页面的节点，根据节点渲染的优先级进行处理

首先，其实RAF的根本是在下一次重绘（repaint）之前会执行回调函数，所以问题的关键点是，我们可以利用vue响应式数据的更新机制，在每一帧更新一个响应式数据的值，比如一个不重复的自增的值。而在 Vue 中，任何依赖于 这个响应式数据的组件或计算属性都会在数据改变时自动更新，由于数据的更新是逐帧进行的，这样就实现了分帧渲染的效果
对于界面上使用的话，我们可以使用脚本或者插件的方式，遍历页面节点，根据页面css相关命名规范确定页面渲染的优先级，动态的给相应的节点加入defer函数，确保对应的节点可以依次进行渲染。

```js
import { onUnmounted, ref } from "vue";

export function useDefer(maxCount = 100) {
  const count = ref(0);
  let raqId = null;
  function updateFrame() {
    count.value++;
    if (count.value >= maxCount) {
      return;
    }
    raqId = requestAnimationFrame(updateFrame);
  }
  updateFrame();
  onUnmounted(() => {
    cancelAnimationFrame(raqId);
  });
  return function (n) {
    return count.value >= n;
  };
}
```
