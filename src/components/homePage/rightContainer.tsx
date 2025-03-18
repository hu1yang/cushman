import React, {useState, useEffect, Suspense} from 'react'
import {connect, Dispatch , history} from 'umi';
import styles from './index.less'
import TableIndex from "@/components/homePage/table";
import MapReducer from "@/reducer/map";
import {SwapRightOutlined, SwapLeftOutlined} from '@ant-design/icons'
import {ICommon} from "@/models/commons";
import {IUserState} from "@/models/user";


const LazyMap = React.lazy(() => {
  return new Promise<{default: React.FC}>((resolve) => {
    setTimeout(() => {
      resolve(import("@/components/homePage/Map/index"))
    }, 1000)
  })
})
const RightContainer: React.FC<{ user: IUserState, dispatch: Dispatch, commons: ICommon }> = ({user, dispatch, commons}) => {
  const logOut = () => {
    dispatch({
      type: 'user/logout'
    })
  }
  const switchLeft = () => {
    dispatch({
      type: 'commons/setShowLeft',
      payload: !commons.showLeft
    })
  }
  return (
      <div className="flex_1 s_flex flex_dir">
        <header className={`${styles.header} s_flex ai_ct jc_bt`}>
          <div className={styles.leftMenu} onClick={switchLeft}>
            {
              !commons.showLeft ? <SwapRightOutlined/> : <SwapLeftOutlined/>
            }
          </div>
          {
            user.userInfo.id ?
                <div className={`${styles.user_box} s_flex ai_ct`}>
                  <div className={`${styles.user_picture} imgs`}>
                    <img src={user.userInfo.picture} alt=""/>
                  </div>
                  <div className={styles.user_name}>
                    <span>{user.userInfo.username}</span>
                  </div>
                  <button className={`${styles.login_button}`} onClick={logOut}>
                    退出登录
                  </button>
                </div>
                :
                <button className={`${styles.login_button}`} onClick={() => history.push(`/login`)}>
                  登录
                </button>
          }
        </header>
        <MapReducer>
          <div className={`${styles.content} flex_1 s_flex`} style={{padding: '10px'}}>
            <div className="map" style={{width: '60%'}}>
              <Suspense fallback={<div >组件加载中...</div>}>
                <LazyMap />
              </Suspense>
            </div>
            <div className={`${styles.table_box} flex_1`}>
              <TableIndex/>
            </div>
          </div>
        </MapReducer>

      </div>
  )
}

export default connect(({user, commons}) => ({user, commons}))(RightContainer)
