import { post } from '@/utils/request'


// 登录接口

export function loginApi(user){
    return post('/api/login',user)
}