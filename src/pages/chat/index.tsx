import React,{useEffect , useState , useRef} from 'react'
import {Button , Input} from "antd";
import Cookies from "js-cookie";
import SocketWorker from "@/utils/webwork/socketWork.worker";
import {createMessage} from "@/utils/chat/message";

const Chat = () => {
  const [inputVal, setInputVal] = useState<string>('');
  const workerRef = useRef<Worker|null>(null);
  const [socketStatus, setSocketStatus] = useState<number>(-1); //  -2 链接失败 -1 未连接 1 已连接
  const [messageList, setMessageList] = useState<any[]>([]);
  useEffect(() => {
    workerRef.current = new SocketWorker()
    if(!workerRef.current) return
    console.log(workerRef.current)
    workerRef.current.onmessage = (e) => {
      const {type,playload} = e.data
      switch (type){
        case 'SOCKET_ON_CONNECT':
          setSocketStatus(1) // 已经链接
          break;
        case 'SOCKET_ON_MESSAGE':
          onMessage(playload)
          break;
        case 'SOCKET_ON_DISCONNECT':
          setSocketStatus(-2) // 链接失败
          break;
      }
    };
    return () => {
      if(workerRef.current){
        workerRef.current.terminate()
        workerRef.current = null
      }
    };
  }, []);

  const onMessage = (playload:any) => {

  }
  const connectSocket = () => {
    workerRef.current?.postMessage({type:'CONNECT',playload:{url:'ws://localhost:3003/userchat',token:Cookies.get('token')}})
  }
  const sendMessage = () => {
    const option = createMessage({
      message:inputVal,
      type:1,
      roomId:1,
      sendInfo:userInfo
    })
    workerRef.current?.postMessage({type:'SEND',playload:{message:option}})
  }
  return (
      <div>
        <Button onClick={connectSocket}>点击链接</Button>
        <div>
          <Input value={inputVal} onChange={(e) => setInputVal(e.target.value)} />
          <Button onClick={sendMessage}>点击发送</Button>
        </div>
      </div>
  )
}

export default Chat
