import { lazy } from "react";



const routes = [
  {
    path: "/",
    component: "home/index",
    wrappers: [
      '@/wrappers/auth',
    ],
    meta: { name: 'home' },
  },
  {
    path:'/login',
    component: "login/index",
    meta: { name: 'login' },
    layout: false,
  },
  {
    path:'/register',
    component: "login/index",
    meta: { name: 'register' },
    layout: false,
  },
  {
    path:'/chat',
    component: "chat/index",
    meta: { name: 'chat' },
    layout: false,
  },
  {
    path:'/flow',
    component: "flow/index",
    meta: { name: 'flow' },
    layout: false,
  },
  {
      path:'/tree',
      component: "tree/index",
      meta: { name: 'tree' },
      layout: false,
  },
    {
        path:'/goods',
        component: "goods/index",
        meta: { name: 'goods' },
        layout: false,
    }
]

export default routes
