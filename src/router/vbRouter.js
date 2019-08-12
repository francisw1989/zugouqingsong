let vbRouter = [
    {
        path: '/',
        redirect: 'vb',
        meta: { title: '门店管理' },
    },
    {
        path: '/vb',
        redirect: '/vb/dashboard',
        component: resolve => require(['../view/index/Home.vue'], resolve),
        children:[
            {
                path: 'dashboard',
                component: resolve => require(['../view/vb/dashboard/index.vue'], resolve),
                meta: { title: '首页' },
            }

        ]
    },
]
export default vbRouter
