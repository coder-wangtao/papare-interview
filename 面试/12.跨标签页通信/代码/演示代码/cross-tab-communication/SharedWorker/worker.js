// 所有页面共享的数据
const listOfPort = [];

onconnect = e => {
  // port 属性返回一个用于通信和控制共享 worker 的 MessagePort 对象
  const port = e.ports[0];

  // 如果当前页面不存在该 port 则加到列表中
  if (!listOfPort.includes(port)) {
    listOfPort.push(port);
  }

  // 监听返回的消息
  port.onmessage = e => {
    const { data } = e;

    // 窗口关闭时删除该窗口的 port
    if (data === 'CLOSE') {
      const portIndex = listOfPort.findIndex(p => p === port);
      if (portIndex > -1) {
        listOfPort.splice(portIndex, 1);
        return;
      }
    }
    // 过滤掉当前页面的 port，不给自己发送消息
    listOfPort.filter(p => p !== port).forEach(p => p.postMessage(data));
  };

  // 如果使用  port.addEventListener('message',()=>{}) 方式监听则需要使用 start 来启动。
  // port.start();
};
