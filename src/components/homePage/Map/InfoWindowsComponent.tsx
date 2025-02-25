import React , { useEffect , useState } from "react";
import styles from './index.less'
import introduction from '@/assets/introduction.png'

const InfoWindowsComponent = React.memo(({data}:{data:any}) => {
  return(
      <div className={`${styles.informations} s_flex jc_bt ai_ct `}>
        <div className={`${styles.informationsLeft} flex_1`}>
          <img src={introduction} />
        </div>
        <div className={`${styles.informationsRight} s_flex flex_dir jc_ct ai_fs`}>
          <div className={`${styles.names} ec_1`}>
            {data.names}
          </div>
          <p className='ec_1'>{data.structure}</p>
          <p className='ec_2'>{data.fire_control}</p>
        </div>
      </div>
  )
})

export default InfoWindowsComponent
