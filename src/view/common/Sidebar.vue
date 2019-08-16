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
                        ]
                    },
                    {
                        icon: 'el-icon-lx-group',
                        index: '/va/customerManage',
                        title: '客户管理'
                    },
                    {
                        icon: 'el-icon-lx-global',
                        index: '/va/materielManage',
                        title: '物料管理'
                    },
                    {
                        icon: 'el-icon-lx-recharge',
                        index: '/va/couponlManage',
                        title: '优惠卷管理'
                    },
                    {
                        icon: 'el-icon-lx-present',
                        index: '/va/activity',
                        title: '常规活动'
                    },
                    {
                        icon: 'el-icon-lx-message',
                        index: '/va/evaluateManage',
                        title: '评价管理'
                    },
                    {
                        icon: 'el-icon-lx-profile',
                        index: '/va/accountManage',
                        title: '账号管理'
                    },
                    {
                        icon: 'el-icon-lx-lock',
                        index: '/va/jurisdictionManage',
                        title: '权限管理'
                    },
                    {
                        icon: 'el-icon-lx-settings',
                        index: '/va/systemManage',
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
