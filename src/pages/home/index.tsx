import React from 'react';
import styles from './index.less';
import RightContainer from "@/components/homePage/rightContainer";
import {connect} from "umi";
import {ICommon} from "@/models/commons";

const HomePage = React.memo(({commons}:{commons:ICommon}) =>  {
  return (
    <div className={styles.hone_container}>
        <div className="s_flex" style={{height:'100%'}}>
            <div className={`${styles.left_container} ${!commons.showLeft && styles.hide}`}></div>
            <RightContainer />
        </div>
    </div>
  );
})

export default connect(({commons}) => ({commons}))(HomePage)
