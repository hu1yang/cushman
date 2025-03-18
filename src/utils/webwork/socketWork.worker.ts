import io,{Socket} from "socket.io-client";
let socket:Socket|null = null

self.onmessage = function (event){
  const { type, playload: {message,url ,token} } = event.data;
  // 使用 setInterval 执行周期性任务
  switch (type) {
    case 'CONNECT':
      socket = io(url,{
        extraHeaders: {
          Authorization: token
        },
        query:{
          roomId:1,
          userId:1,
          _t: Date.now(), // 添加时间戳防止缓存
        },
        reconnection: false
      })
      if(!socket) return;

      socket.on('connection', () => {
        self.postMessage({ type: 'SOCKET_ON_CONNECT' });
      })
      socket.on('message', (data) => {
        self.postMessage({ type: 'SOCKET_ON_MESSAGE', playload: data });
      })
      socket.on('disconnect', (reason) => {
        self.postMessage({ type: 'SOCKET_ON_DISCONNECT', playload: reason });
      });
      break;
    case 'SEND':
      console.log(message,'-----1213333')
      socket?.emit('message',message);
      break;
    default:
      break;
  }
}
// 在工作者线程关闭时清除 setInterval
self.onclose = () => {
  // socket?.on('disconnect', (reason) => {
  //   self.postMessage({ type: 'SOCKET_ON_DISCONNECT', playload: reason });
  // });
  // socket?.removeAllListeners
  // socket = null
};
