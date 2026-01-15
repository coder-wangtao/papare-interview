import { creatMessageElement, initButtonFun, id, input } from '../script.js';

const channel = new BroadcastChannel('channel-name');

const buttonFun = () => {
  channel.postMessage(`${new Date().toLocaleString()} from page: ${id}: ${input.value}`);
};

initButtonFun(buttonFun);

channel.addEventListener('message', e => {
  creatMessageElement(e.data);
});

window.onbeforeunload = () => {
  // 断开与频道的连接
  channel.close();
};
