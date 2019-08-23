<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                                {{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../../bus';
    export default {
        data() {
            return {
                collapse: false,
                items: [
                    {
                        icon: 'el-icon-lx-home',
                        index: '/va/dashboard',
                        title: '首页'
                    },
                    {
                        icon: 'el-icon-picture-outline',
                        index: '/va/banner',
                        title: 'banner管理'
                    },
                    {
                        icon: 'el-icon-lx-shop',
                        index: '/va/storeManage',
                        title: '门店管理'
                    },
                    {
                        icon: 'el-icon-lx-goods',
                        index: '1',
                        title: '订单管理',
                        subs: [
                            {
                                index: '/va/orderList',
                                title: '订单列表'
                            },
                            {
                                index: '/va/project',
                                title: '服务项目'
                            },
                            {
                                index: '/va/projectCat',
                                title: '项目分类'
                            },
                        ]
                    },
                    {
                        icon: 'el-icon-lx-friend',
                        index: '2',
                        title: '员工管理',
                        subs: [
                            {
                                index: '/va/staffList',
                                title: '员工列表'
                            },
                            {
                                index: '/va/staffScheduling',
                                title: '员工排班'
                            },
                            {
                                index: '/va/staffWorktime',
                                title: '员工考勤'
                            },
                            {
                                index: '/va/positionSetting',
                                title: '岗位与等级设置'
                            },
                            {
                                index: '/va/schedulingSetting',
                                title: '排班规则设置'
                            },
                        ]
                    },
                    {
                        icon: 'el-icon-lx-group',
                        index: '3',
                        title: '客户管理',
                        subs: [
                            {
                                index:'/va/customerList', title:'客户列表'
                            },
                            {
                                index:'/va/tagsSetting', title:'用户标签设置'
                            },
                            {
                                index:'/va/rightsSetting', title:'会员权益设置'
                            },
                            

                        ]
                    },
                    {
                        icon: 'el-icon-lx-global',
                        index: '4',
                        title: '物料商品管理',
                        subs: [
                            {
                                index: '/va/stockList', title: '库存管理'
                            },
                            {
                                index: '/va/outStock', title: '出库记录'
                            },
                            {
                                index: '/va/procurementList', title: '采购记录'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-lx-recharge',
                        index: '5',
                        title: '优惠卷管理',
                        subs: [
                            {index: '/va/couponList',title: '优惠券列表'},
                            {index: '/va/lingquList',title: '领用记录'},
                        ]
                    },
                    {
                        icon: 'el-icon-lx-present',
                        index: '6',
                        title: '常规活动',
                        subs: [
                            {index: '/va/activityList',title: '活动数据列表'},
                            {index: '/va/activityRule',title: '活动规则列表'},
                        ]
                    },
                    {
                        icon: 'el-icon-lx-message',
                        index: '7',
                        title: '评价管理',
                        subs: [
                            {index: '/va/evaluateList', title: '评价列表'},
                            {index: '/va/evaluateTag', title: '评价标签'},
                        ]
                    },
                    {
                        icon: 'el-icon-lx-profile',
                        index: '/va/accountList',
                        title: '账号管理'
                    },
                    {
                        icon: 'el-icon-lx-lock',
                        index: '/va/jurisdictionList',
                        title: '权限管理'
                    },
                    {
                        icon: 'el-icon-lx-settings',
                        index: '/va/system',
                        title: '系统配置'
                    },

                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path;
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 250px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
