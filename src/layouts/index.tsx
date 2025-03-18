import React,{useEffect} from 'react'
import { Link, Outlet , useDispatch } from 'umi';
import styles from './index.less';

export default function Layout() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({
      type: 'user/setUserInfoEffects',
    });
  }, [dispatch]);
  return (
    <div className={styles.app_container}>
      <Outlet />
    </div>
  );
}
