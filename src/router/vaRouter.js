let vaRouter = [
    {
        path: '/',
        redirect: 'va',
        meta: { title: '平台管理' },
    },
    {
        path: '/va',
        redirect: '/va/dashboard',
        component: resolve => require(['../view/common/Home.vue'], resolve),
        children:[
            {
                path: 'dashboard',
                component: resolve => require(['../view/va/dashboard/index.vue'], resolve),
                meta: { title: '首页' },
            },
            {
                path: 'banner',
                component: resolve => require(['../view/va/banner/index.vue'], resolve),
                meta: { title: 'banner管理' },
            },
            {
                path: 'storeManage',
                component: resolve => require(['../view/va/storeManage/index.vue'], resolve),
                meta: { title: '门店管理' },
            }

        ]
    },
]
export default vaRouter
