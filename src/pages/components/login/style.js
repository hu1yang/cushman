import styled from 'styled-components';
import { Form , Input , Button} from 'antd'

export const Container = styled.div`
    width: 100%;
    height: 100%;
`;
export const Backs = styled.div`
    background: url(/picture/loginback.png) no-repeat;
    background-size: 100% auto;
    height: 100%;
`
export const Suspension = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    
`
export const SuspensionLeft = styled.div`
    width: 536px;
    height: 579px;
    opacity: .5;
    background: #022B47;
    box-shadow: 0px 2px 9px 0px rgba(0, 0, 0, 0.1);
    position: relative;
`
export const Logo = styled.img.attrs({
    src:'/picture/logo.png'
})`
    width: 298px;
    height: 112px;
    position: absolute;
    top: 65px;
    left: 121px;
`
export const SuspensionRight = styled(SuspensionLeft)`
    opacity: 1;
    background: #fff;
`
export const Forms = styled(Form)`
    width: 100%;
    padding: 89px 63px;
    box-sizing: border-box;
    /* .ant-input{
        line-height: 46px !important;
    } */
    .login-form-forgot {
        float: right;
        font-weight: 800;
        color: #004EA2;
        font-size: 16px
    }
`
export const FormH3 = styled.h3`
    font-size: 32px;
    font-family: PingFang-SC-Bold, PingFang-SC;
    font-weight: bold;
    color: #232836;
    line-height: 100px;
    text-align: center;
`
export const Inputs = styled(Input)`
    
    
`

export const Buttons = styled(Button)`
    width: 100%;
    font-weight: bold;
    color: #FFFFFF;
`