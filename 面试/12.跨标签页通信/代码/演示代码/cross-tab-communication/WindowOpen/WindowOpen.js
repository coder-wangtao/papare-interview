import { creatMessageElement, initButtonFun, id, input } from '../script.js';

const openButton = document.querySelector('#open-button');
const url = 'https://web-platform-cq7zte.stackblitz.io';
const listOfOtherWindows = [];

// 点击按钮通过新窗口打开页面，并收集打开过的页面的window对象
openButton.addEventListener('click', e => {
  const otherWindow = window.open(`${url}/WindowOpen/WindowOpen.html`);
  listOfOtherWindows.push(otherWindow);
});

const buttonFun = () => {
  const mseegae = `${new Date().toLocaleString()} from page: ${id}: ${input.value}`;

  // 过滤掉已关闭的窗口，给未关闭的窗口发送消息
  listOfOtherWindows.filter(window => !window.closed).forEach(window => window.postMessage(mseegae, url));

  // 给打开该窗口的窗口发送消息
  if (window.opener) {
    window.opener.postMessage(mseegae, url);
  }
};

initButtonFun(buttonFun);

window.addEventListener('message', e => {
  if (e.origin === url) {
    creatMessageElement(e.data);
  }
});
