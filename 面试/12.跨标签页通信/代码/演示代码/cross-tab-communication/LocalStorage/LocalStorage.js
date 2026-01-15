import { creatMessageElement, initButtonFun, id, input } from '../script.js';

const STORAGE_KEY = 'message';

const buttonFun = () => {
  localStorage.setItem(STORAGE_KEY, `${new Date().toLocaleString()} from page: ${id}: ${input.value}`);
};

initButtonFun(buttonFun);

window.addEventListener('storage', e => {
  console.log(e);
  if (e.key === STORAGE_KEY) {
    creatMessageElement(e.newValue);
  }
});
