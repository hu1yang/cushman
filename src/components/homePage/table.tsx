import {Table} from "antd";
import type { TableProps } from "antd";
import {RenderExpandIconProps} from "rc-table/lib/interface";
import {datas} from '@/assets/data/map'
import {useEffect , useState} from "react";
import {useMApContext} from "@/reducer/map";
import styles from './index.less'


interface DataType {
  key: React.Key;
  types: string[];
  name_position: string[];
  information: string[];
  rent_lease: string[];
  position: string|number[]
}
const TableIndex = () => {
  const [state,dispatch] = useMApContext()

  const [scrollY, setScrollY] = useState(600);
  useEffect(() => {
    const updateHeight = () => {
      const newHeight = window.innerHeight - 150; // 计算滚动高度
      setScrollY(newHeight);
    };

    updateHeight(); // 初始化计算
    window.addEventListener('resize', updateHeight); // 监听窗口变化
    return () => window.removeEventListener('resize', updateHeight);
  },[])

  const data = Array.from(datas,item=>{
    return {
      key:item.id,
      types:[item.city+'-'+item.Sub_Market,item.operate,item.type],
      name_position:[item.corporate_name,item.address],
      information:[item.built_up_area, item.first_year+'-'+(item.last_year===''?'至今':item.last_year) , (
        item.monolayer === '0'?(item.multi_storey === '0'?'':`${item.multi_storey}栋/多层库`):`${item.monolayer}栋/单层库`)],
      rent_lease:['27-31元/月/m²','90%'],
      position:item.position
    }
  })

  const columns:TableProps<DataType>["columns"] =  [
    {
      title:() => (
          <div className="s_flex flex_dir">
            <span>子市场</span>
            <span>开发商</span>
            <span>仓库类型</span>
          </div>
      ),
      width: 100,
      dataIndex: 'types',
      render:(types:string[])=>(<div className='s_flex flex_dir'>
        {
          types.map((item,index) => (
              <span key={index} className={index === 0? 'blod':''}>{item.toUpperCase()}</span>
          ))
        }
      </div>)
    },
    {
      title: () => (
          <div className="s_flex flex_dir">
            <span>项目名称</span>
            <span>位置</span>
          </div>
      ),
      width: 180,
      dataIndex: 'name_position',
      render:(name_position:string[],row,index)=>(<div className='s_flex flex_dir'>
        {
          name_position.map((item,index) => (
              index===0?<span style={{color:'#0069b0',fontWeight:'bold'}} key={index}>{item.toUpperCase()}</span>:<span key={index}>{item.toUpperCase()}</span>
          ))
        }
      </div>)
    },
    {
      title: ()=>(
          <div className="s_flex flex_dir">
            <span>建筑面积</span>
            <span>建成年代</span>
            <span>楼栋信息</span>
          </div>
      ),
      width: 90,
      dataIndex: 'information',
      render:(information:string[])=>(<div className='s_flex flex_dir'>
        {
          information.map((item,index) => (
              <span key={index}>{item.toUpperCase()}{index === 0?'m²':''}</span>
          ))
        }
      </div>)
    },
    {
      title: () => (
          <div className="s_flex flex_dir">
            <span>租金</span>
            <span>出租率</span>
          </div>
      ),
      width: 90,
      dataIndex: 'rent_lease',
      render:(rent_lease:string[])=>(<div className='s_flex flex_dir'>
        {
          rent_lease.map((item,index) => (
              <span key={index}>{item}</span>
          ))
        }
      </div>)
    },
  ]
  return (
      <Table<DataType>
          virtual
          rowKey="key"
          className={styles.tables}
          columns={columns}
          dataSource={data}
          scroll={{y: scrollY}}
          pagination={false}
          components={{
            header:{
              cell: (props:RenderExpandIconProps<DataType>) => (
                  <th {...props} style={{ backgroundColor: '#0069B0',borderRadius:0,fontSize: 12,color:'#fff',fontWeight:"bold" }} />
              ),
            }
          }}
          onRow={
            (record:DataType) => {
              return {
                onClick:() => {
                  const position = record.position
                  state.mapRef.setZoomAndCenter(11,position)
                }
              }
            }
          }
      />
  )
}

export default TableIndex
