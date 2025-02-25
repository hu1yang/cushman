import { Link, Outlet } from 'umi';
import styles from './index.less';
import {ConfigProvider} from 'antd'

export default function Layout() {
  return (
      <ConfigProvider
          theme={{
            components: {
              Table: {
                /* 这里是你的组件 token */
                headerBorderRadius:0
              },
            },
          }}
      >
        <div className={styles.app_container}>

          <Outlet />
        </div>
      </ConfigProvider>
  );
}
