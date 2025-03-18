import React from 'react';
import { ReactFlow, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const Flow = React.memo(() => {
  return (
      <div style={{ height: '100%' }}>
        <ReactFlow>
          <Background />
          <Controls />
        </ReactFlow>
      </div>
  )
})

export default Flow
