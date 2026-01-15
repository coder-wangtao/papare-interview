/* export function sendMsg(type, payload) {
  localStorage.setItem(
    "@@" + type,
    JSON.stringify({
      payload,
      temp: Date.now(),
    })
  );
}
export function listenMsg(handler) {
  const storageHandler = (e) => {
    const data = JSON.parse(e.newValue);
    handler({
      type: e.key.substring(2),
      payload: data.payload
    });
  };
  window.addEventListener("storage", storageHandler);
  return () => {
    window.removeEventListener("storage", storageHandler);
  };
} */

const channel = new BroadcastChannel("emp-demo");

export function sendMsg(type, payload) {
  channel.postMessage({
    type,
    payload
  })
}


export function listenMsg(handler) {
  const cb = (e) => { 
    handler && handler(e.data)
  }
  channel.addEventListener('message', cb)

  return () => { 
    channel.removeEventListener('message', cb);
  }
}