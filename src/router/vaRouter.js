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
            },
            {
                path: 'orderList',
                component: resolve => require(['../view/va/order/orderList.vue'], resolve),
                meta: { title: '订单列表' },
            },
            {
                path: 'project',
                component: resolve => require(['../view/va/order/project.vue'], resolve),
                meta: { title: '服务项目' },
            },
            {
                path: 'projectCat',
                component: resolve => require(['../view/va/order/projectCat.vue'], resolve),
                meta: { title: '服务分类' },
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
                path: 'positionSetting',
                component: resolve => require(['../view/va/staff/positionSetting.vue'], resolve),
                meta: { title: '岗位与等级设置' },
            },
            {
                path: 'schedulingSetting',
                component: resolve => require(['../view/va/staff/schedulingSetting.vue'], resolve),
                meta: { title: '排班规则设置' },
            },
            {
                path: 'customerList',
                component: resolve => require(['../view/va/customer/customerList.vue'], resolve),
                meta: { title: '客户列表' },
            },
            {
                path: 'tagsSetting',
                component: resolve => require(['../view/va/customer/tagsSetting.vue'], resolve),
                meta: { title: '用户标签设置' },
            },
            {
                path: 'rightsSetting',
                component: resolve => require(['../view/va/customer/rightsSetting.vue'], resolve),
                meta: { title: '会员权益设置' },
            },
            {
                path: 'stockList',
                component: resolve => require(['../view/va/stockManage/stockList.vue'], resolve),
                meta: { title: '库存管理' },
            },
            {
                path: 'outStock',
                component: resolve => require(['../view/va/stockManage/outStock.vue'], resolve),
                meta: { title: '出库记录' },
            },
            {
                path: 'procurementList',
                component: resolve => require(['../view/va/stockManage/procurementList.vue'], resolve),
                meta: { title: '采购记录' },
            },
            {
                path: 'couponList',
                component: resolve => require(['../view/va/couponManage/couponList.vue'], resolve),
                meta: { title: '优惠券列表' },
            },
            {
                path: 'lingquList',
                component: resolve => require(['../view/va/couponManage/lingquList.vue'], resolve),
                meta: { title: '领用记录' },
            },
            {
                path: 'activityList',
                component: resolve => require(['../view/va/activity/activityList.vue'], resolve),
                meta: { title: '活动数据列表' },
            },
            {
                path: 'activityRule',
                component: resolve => require(['../view/va/activity/activityRule.vue'], resolve),
                meta: { title: '活动规则列表' },
            }

        ]
    },
]
export default vaRouter
