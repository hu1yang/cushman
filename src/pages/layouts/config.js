/* eslint-disable import/no-anonymous-default-export */
import Loadable from 'react-loadable';
import Loading from '@/pages/loading/index'

const Login = Loadable({loader: () => import(/*webpackChunkName:'Login'*/'@/pages/components/login/index'),loading: Loading});

export default [
    {path: '/login' , component: Login ,title: '登录'}
]