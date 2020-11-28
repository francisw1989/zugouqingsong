<template>
<div class="sidebar">
    <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" unique-opened router>
        <template v-for="item in items">
            <template v-if="item.subs">
                <el-submenu v-if="item.show" :index="item.index" :key="item.index">
                    <template slot="title" v-if="item.show">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </template>
                    <template v-for="subItem in item.subs" v-if="item.show">
                        <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                            <template slot="title">{{ subItem.title }}</template>
                            <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
                                {{ threeItem.title }}
                            </el-menu-item>
                        </el-submenu>
                        <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                            <template v-of="subItem.show">
                                {{ subItem.title }}
                            </template>
                        </el-menu-item>
                    </template>
                </el-submenu>
            </template>
            <template v-else>
                <el-menu-item v-if="item.show" :index="item.index" :key="item.index" @click="menuClick(item)">
                    <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                </el-menu-item>
            </template>
        </template>
    </el-menu>
</div>
</template>

<script>
import Bus from '../../bus';
import {
    commonService
} from '../../service/common.js'
export default {
    data() {
        return {
            collapse: false,
            items: []
        }
    },
    computed: {
        onRoutes() {
            return this.$route.path;
        }
    },
    methods: {
        menuDeal(res) {
            const t = this;
            let allMenu = commonService.allMenu();
            for (const v1 of allMenu) {
                let item = res.filter((v2) => {
                    if (v2) {
                        return v2.id == v1.id
                    }

                });
                if (item && item.length) {
                    v1.show = true;
                    if (v1.subs && v1.subs.length) {
                        for (const v3 of v1.subs) {
                            if (item[0].sysMenu && item[0].sysMenu.length) {
                                let item2 = item[0].sysMenu.filter((v4) => {
                                    return v4.id == v3.id
                                })
                                if (item2 && item2.length) {
                                    v3.show = true
                                } else {
                                    v3.show = false
                                }
                            }

                        }
                    }
                } else {
                    v1.show = false
                }

            }
            if (localStorage.sysRoute == 'vb') {
                allMenu.push({
                    icon: 'el-icon-lx-recharge',
                    index: '44',
                    title: '财务报表',
                    id: 62,
                    subs: [{
                            index: '/vb/projectreport',
                            title: '项目销售报表',
                            id: 63
                        },
                        {
                            index: '/vb/qudaoreport',
                            title: '渠道分析报表',
                            id: 64
                        },
                        {
                            index: '/vb/chongzhireport',
                            title: '充值报表',
                            id: 65
                        },
                        {
                            index: '/vb/tichengreport',
                            title: '员工提成报表',
                            id: 66
                        },
                        {
                            index: '/vb/huizongreport',
                            title: '提成汇总报表',
                            id: 67
                        }
                    ],
                    show: true
                })
            }
            t.items = allMenu;
        },
        menuClick(item) {
            const t = this;
        }
    },
    mounted() {

    },
    created() {
        const t = this;
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        Bus.$on('collapse', msg => {
            this.collapse = msg;
        })

        let userInfo = JSON.parse(localStorage.userInfo);
        window.userId = userInfo.id;
        window.sysRoute = localStorage.sysRoute;
        if (localStorage.sysRoute == 'vb') {
            window.storeId = userInfo.stores.id;
        }

        if ((userInfo && userInfo.account == 'admin') || (userInfo && userInfo.isShopponer == 1)) {
            commonService.getSysMenu().then((res) => {
                t.menuDeal(res)
            })
        } else {
            t.menuDeal(userInfo.menuList)
        }

    }
}
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}

.sidebar::-webkit-scrollbar {
    width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}

.sidebar>ul {
    height: 100%;
}
</style>
