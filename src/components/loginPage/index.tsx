import React,{useEffect} from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex , Tabs , message } from 'antd';
import { useSelectedRoutes , history } from 'umi';
import http from '@/utils/http/http'
import styles from './index.less'
import useUserInfo from "@/utils/hook/useUserInfo";
import {IUser} from "@/types/user";

const LoginTab = [{label:'登录',value:'signIn'},{label:'注册',value:'signUp'}]
const LoginPage = () => {
  const routes = useSelectedRoutes();
  const currentRoute = routes[routes.length - 1];
  const routeName = currentRoute.route?.meta?.name;
  const [messageApi, contextHolder] = message.useMessage();
  const {userInfo,setUserInfo} = useUserInfo();


  useEffect(() => {
    console.log(routeName)
  }, [routeName]);

  const onFinish = (values: any) => {
    const {username,password} = values
    http.post<{
      userInfo:IUser,
      token:string
    }>('/login',{username,password}).then(res => {
      if(res.code === 200){
        messageApi.open({
          type: 'success',
          content: res.msg,
        });
        const {token,userInfo} = res.data as {
          userInfo:IUser,
          token:string
        };
        setUserInfo({token,userInfo})
        history.replace('/')
      }else{
        messageApi.open({
          type: 'error',
          content: 'This is an error message',
        });
      }
    })
  };

  return(
      <div className={styles.login}>
        <div className={styles.loginTitle}>
          <span>登录应用</span>
        </div>
        <Tabs
            className={styles.customTabs}
            tabBarGutter={0}
            defaultActiveKey="signIn"
            size='large'
            tabBarStyle={{ width: '100%' }}
            indicator={{align:'center'}}
            items={LoginTab.map((item, index) => {
              return {
                label: item.label,
                key: item.value,
              };
            })}
            onTabClick={(key) => {
              console.log(key)
              history.replace(key==='signIn'?'/login':'/register')
            }}
        />
        <Form
            name="login"
            size='large'
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
          <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
          </Form.Item>
          {/*<Form.Item*/}
          {/*    name="enterpassword"*/}
          {/*    rules={[{ required: true, message: 'Please input your enterpassword!' }]}*/}
          {/*>*/}
          {/*  <Input prefix={<LockOutlined />} type="password" placeholder="Password" />*/}
          {/*</Form.Item>*/}
          <Form.Item>
            <Flex justify="space-between" align="center">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <a href="">Forgot password</a>
            </Flex>
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Log in
            </Button>
            or <a href="">Register now!</a>
          </Form.Item>
        </Form>
      </div>
  )
}

export default LoginPage
