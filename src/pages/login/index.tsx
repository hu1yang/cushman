import {useEffect} from "react";
import styles from './index.less'
import LoginPage from '@/components/loginPage/index'
export default () => {
  useEffect(() => {
    return () => {
      console.log('卸载')
    }
  },[])
  return (
      <div className={styles.loaginContainer}>
        <div className={`${styles.loginBox} s_flex flex_dir jc_ct`}>
          <div className={`${styles.loginCenter}`}>
            <LoginPage />
          </div>
        </div>
      </div>
  )
}
