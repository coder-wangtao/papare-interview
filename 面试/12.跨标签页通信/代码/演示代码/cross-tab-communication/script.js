const id = Math.random().toString(32).slice(2);

const pageIdEle = document.querySelector('#page-id');
const button = document.querySelector('#button');
const input = document.querySelector('#input');
const messageWrapper = document.querySelector('#message-wrapper');

document.title = `Page: ${id}`;
pageIdEle.innerHTML = document.title;

const initButtonFun = fun => {
  button.addEventListener('click', fun);
};

const creatMessageElement = value => {
  const p = document.createElement('p');
  p.innerHTML = `${value}`;
  messageWrapper.appendChild(p);
};

export { creatMessageElement, initButtonFun, id, input };
