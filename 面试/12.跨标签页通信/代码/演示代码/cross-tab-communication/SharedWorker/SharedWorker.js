import { creatMessageElement, initButtonFun, id, input } from '../script.js';

if (window.SharedWorker) {
  const myWorker = new SharedWorker('./worker.js', 'share-worker-name');

  const buttonFun = () => {
    const message = `${new Date().toLocaleString()} from page: ${id}: ${input.value}`;

    myWorker.port.postMessage(message);
  };

  initButtonFun(buttonFun);

  myWorker.port.onmessage = e => {
    creatMessageElement(e.data);
  };

  window.onbeforeunload = () => {
    myWorker.port.postMessage('CLOSE');
  };
} else {
  alert('Your browser does not support SharedWorker');
}
