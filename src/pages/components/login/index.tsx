import React from 'react'
import { Link } from 'react-router-dom'
import { Container , Backs , Suspension , SuspensionLeft , SuspensionRight , 
    Logo , Forms , Inputs , FormH3 , Buttons} from './style'



const Login = () => {
    const onFinish = (values:any) => {
        console.log('Received values of form: ', values);
      };
    return (
        <Container>
            <Backs>
                <Suspension>
                    <SuspensionLeft>
                        <Logo />
                    </SuspensionLeft>
                    <SuspensionRight>
                        <Forms
                            name="normal_login"
                            className="login-form"
                            onFinish={onFinish}
                        >
                            <FormH3>戴德梁行-仓储服务平台</FormH3>
                            <Forms.Item
                                label=""
                                name="username"
                                rules={[{ required: true, message: '请输入正确的账号' }]}
                            >
                                <Inputs  placeholder="请输入账号" size="large" />
                            </Forms.Item>

                            <Forms.Item
                                label=""
                                name="password"
                                rules={[{ required: true, message: '请输入正确的密码' }]}
                            >
                                <Inputs.Password placeholder="请输入密码" size="large" />
                            </Forms.Item>
                            <Forms.Item>
                                <Link to="/" className="login-form-forgot" href="">
                                    忘记密码
                                </Link>
                            </Forms.Item>
                            <Forms.Item>
                                <Buttons  size="large" type="primary" htmlType="submit" className="login-form-button">
                                登录
                                </Buttons>
                            </Forms.Item>
                        </Forms>
                    </SuspensionRight>
                </Suspension>
            </Backs>
        </Container>
    )
}

export default Login