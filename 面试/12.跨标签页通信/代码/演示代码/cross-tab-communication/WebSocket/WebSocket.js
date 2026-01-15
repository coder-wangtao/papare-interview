import { creatMessageElement, initButtonFun, id, input } from '../script.js';

const WS_SERVER = 'wss://xxxx';

const ws = new WebSocket(WS_SERVER);

const buttonFun = () => {
  const message = `${new Date().toLocaleString()} from page: ${id}: ${input.value}`;
  ws.send(
    JSON.stringify({
      id,
      message
    })
  );
};

initButtonFun(buttonFun);

ws.onmessage = e => {
  const data = JSON.parse(e.data);
  if (data.id !== id) {
    creatMessageElement(data.message);
  }
};
