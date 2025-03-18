import React ,{useEffect , useRef } from 'react'
import {Tree } from 'antd'
import http from '@/utils/http/http'
import Editor from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';

const treeData = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        disabled: false,
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
            disableCheckbox: false,
          },
          {
            title: 'leaf----------------------leaf',
            key: '0-0-0-1',
          }
        ]
      }
    ]
  }
]
const TreeIndex = React.memo(() => {
  const editor = useRef<Editor|null>(null);
  const selectTree = () => {
    editor.current?.setMarkdown('Hello, Toast UI Editor!胡俊你好呢',false)
  }
  const connectSSE = () => {
    // 创建 EventSource 实例（注意跨域需后端配合）
    const eventSource = new EventSource(`/api/home/longDoc?timestamp=${Date.now()}`);

    // 1. 监听默认的 message 事件（无 event 字段的消息）
    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('收到普通消息:', data);
      } catch (err) {
        console.error('消息解析失败:', err);
      }
    };

    // 2. 监听自定义事件（如后端的 connected 事件）
    eventSource.addEventListener('connected', (event) => {
      console.log('收到连接成功事件:', JSON.parse(event.data));
    });

    // 3. 统一错误处理
    eventSource.onerror = (err) => {
      console.error('SSE 连接错误:', err);
      // 自动重连逻辑（可选）
      setTimeout(connectSSE, 3000);
    };

    // 4. 主动关闭连接（如组件卸载时）
    // window.addEventListener('beforeunload', () => eventSource.close());
  };

  useEffect(() => {
    connectSSE()
    editor.current = new Editor({
      el: document.getElementById('editor'),
      height: '500px',
      initialEditType: 'markdown',
      previewStyle: 'vertical',
      initialValue: 'Hello, Toast UI Editor!'
    });
  }, []);

  return(
      <div className='s_flex' style={{height:'100vh'}}>
        <div style={{width:'200px'}}>
          <Tree treeData={treeData} onSelect={selectTree} />
        </div>
        <div className={'flex_1'}>
          <div id="editor"></div>
        </div>
      </div>
  )
})
export default TreeIndex
