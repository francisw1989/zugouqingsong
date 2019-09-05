let vbRouter = [
    {
        path: '/',
        redirect: 'vb',
        meta: { title: '门店管理' },
    },
    {
        path: '/vb',
        redirect: '/vb/dashboard',
        component: resolve => require(['../view/common/Home.vue'], resolve),
        children:[
            {
                path: 'dashboard',
                component: resolve => require(['../view/vb/dashboard/index.vue'], resolve),
                meta: { title: '首页' },
            },
            {
                path: 'room',
                component: resolve => require(['../view/vb/room/index.vue'], resolve),
                meta: { title: '房间管理' },
            },
            {
                path: 'orderList',
                component: resolve => require(['../view/va/order/orderList.vue'], resolve),
                meta: { title: '订单列表' },
            },
            {
                path: 'staffList',
                component: resolve => require(['../view/va/staff/staffList.vue'], resolve),
                meta: { title: '员工列表' },
            },
            {
                path: 'staffScheduling',
                component: resolve => require(['../view/va/staff/staffScheduling.vue'], resolve),
                meta: { title: '员工排班' },
            },
            {
                path: 'staffWorktime',
                component: resolve => require(['../view/va/staff/staffWorktime.vue'], resolve),
                meta: { title: '员工考勤' },
            },
            {
                path: 'customerList',
                component: resolve => require(['../view/va/customer/customerList.vue'], resolve),
                meta: { title: '客户列表' },
            },
            {
                path: 'stockList',
                component: resolve => require(['../view/vb/stockManage/stockList.vue'], resolve),
                meta: { title: '库存管理' },
            },
            {
                path: 'outStock',
                component: resolve => require(['../view/vb/stockManage/outStock.vue'], resolve),
                meta: { title: '出库管理' },
            },
            {
                path: 'procurementList',
                component: resolve => require(['../view/vb/stockManage/procurementList.vue'], resolve),
                meta: { title: '入库管理' },
            },
            {
                path: 'evaluateList',
                component: resolve => require(['../view/va/evaluate/evaluateList.vue'], resolve),
                meta: { title: '评价列表' },
            },
            {
                path: 'accountList',
                component: resolve => require(['../view/va/account/accountList.vue'], resolve),
                meta: { title: '账号管理' },
            },
            {
                path: 'jurisdictionList',
                component: resolve => require(['../view/va/jurisdiction/jurisdictionList.vue'], resolve),
                meta: { title: '权限管理' },
            },
            {
                path: 'setting',
                component: resolve => require(['../view/vb/setting/index.vue'], resolve),
                meta: { title: '门店配置' },
            },
        ]
    },
]
export default vbRouter
