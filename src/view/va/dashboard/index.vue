<template>
    <div id="zugou">
        <el-row :gutter='20'>
            <el-col :span="9">
                <el-card shadow="hover" class="center">
                    <div slot="header" class="clearfix">
                        <span>今日营收数据（元）</span>
                    </div>
                    <el-row class="infoWap">
                        <el-col :span="8">
                            <p>收入</p>
                            <p>{{D.todayIncome/100}}</p>
                        </el-col>
                        <el-col :span="8">
                            <p>今日支出</p>
                            <p>{{D.todaySpending/100}}</p>
                        </el-col>
                        <el-col :span="8">
                            <p>今日退款</p>
                            <p>{{D.todayRefund/100}}</p>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
            <el-col :span="9">
                <el-card shadow="hover" class="center">
                    <div slot="header" class="clearfix">
                        <span>今日经营数据</span>
                    </div>
                    <el-row class="infoWap">
                        <el-col :span="8">
                            <p>服务人次</p>
                            <p>{{D.todayServiceNum}}</p>
                        </el-col>
                        <el-col :span="8">
                            <p>新增会员</p>
                            <p>{{D.todayNewMenmber}}</p>
                        </el-col>
                        <el-col :span="8">
                            <p>客单价</p>
                            <p>{{D.todayPassengerUnitPrice}}</p>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="hover" class="center">
                    <div slot="header" class="clearfix">
                        <span>综合数据</span>
                    </div>
                    <el-row class="infoWap">
                        <el-col :span="12">
                            <p>总平效</p>
                            <p>{{D.todayEffectiveness}}</p>
                        </el-col>
                        <el-col :span="12">
                            <p>总人效</p>
                            <p>{{D.todayHumaneffect}}</p>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
        <el-card shadow="hover" class="top10" v-if="sysRoute=='va'">
            <div slot="header" class="clearfix">
                <span>陆琴门店分布情况</span>
            </div>
            <div id="map" style="width: 100%; height: 300px"></div>
        </el-card>
        <el-row :gutter='20' class="top10">
            <el-col :span='12'>
                <el-card shadow="hover" class="">
                    <div slot="header" class="clearfix">
                        <span>各门店收入情况</span>
                        <el-select class="left10"  v-if="sysRoute=='va'" v-model="selShopId_income" placeholder="请选择" filterable>
                            <el-option v-for="(item, index) in storeList" :key="index" :value="item.id"  :label="item.name"></el-option>
                        </el-select>
                        <el-radio-group v-model="radio_income" class="right">
                            <el-radio-button label="0">周</el-radio-button>
                            <el-radio-button label="1">月</el-radio-button>
                            <el-radio-button label="2">年</el-radio-button>
                        </el-radio-group>
                    </div>
                    <div>
                            <div id="incomeChart" class="top10" style="height: 250px;">
                                
                            </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span='12'>
                <el-card shadow="hover" class="">
                    <div slot="header" class="clearfix">
                        <span>服务次数 好评数 预约数</span>
                        <el-select class="left10" v-if="sysRoute=='va'" v-model="selShopId_nums" placeholder="请选择" filterable>
                            <el-option v-for="(item, index) in storeList" :key="index" :value="item.id"  :label="item.name"></el-option>
                        </el-select>
                        <el-radio-group v-model="radio_nums" class="right">
                            <el-radio-button label="0">周</el-radio-button>
                            <el-radio-button label="1">月</el-radio-button>
                            <el-radio-button label="2">年</el-radio-button>
                        </el-radio-group>
                    </div>
                    <div>
                        
                       <div id="numsChart" class="top10" style="height: 250px;">
                                
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter='20' class="top10">
            <el-col :span='6'>
                <el-card shadow="hover" class="">
                     <div slot="header" class="clearfix">
                        <span  v-if="sysRoute=='va'">本月各门店收入排行榜</span>
                        <span v-if="sysRoute!='va'">本月商品销售排行</span>
                    </div>
                    <div>
                        <template v-if="sysRoute=='va'">
                            <el-table
                            height="250"
                            :data="mdsrList"
                            style="width: 100%">
                            <el-table-column
                                type="index"
                                label="排名"
                                width="">
                                <template slot-scope="scope">
                                    <span class="colfff" style="padding: 0 5px; background-color: #3398DB">{{ scope.$index +1 }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="a"
                                label="店名"
                                width="">
                            </el-table-column>
                            <el-table-column
                                align='right'
                                prop="b"
                                label="收入">
                            </el-table-column>
                            </el-table>
                        </template>
                        <template v-if="sysRoute!='va'">
                            <el-table
                            height="250"
                            :data="spList"
                            style="width: 100%">
                            <el-table-column
                                type="index"
                                label="排名"
                                width="">
                                <template slot-scope="scope">
                                    <span class="colfff" style="padding: 0 5px; background-color: #f25e43">{{ scope.$index +1 }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="a"
                                label="商品名"
                                width="">
                            </el-table-column>
                            <el-table-column
                                prop="b"
                                align='right'
                                label="数量">
                            </el-table-column>
                            </el-table>
                        </template>
                    </div>
                </el-card>
            </el-col>
            <el-col :span='6'>
                <el-card shadow="hover" class="" >
                     <div slot="header" class="clearfix">
                        <span>本月技师服务次数排行</span>
                    </div>
                    <div>
                        <template>
                            <el-table
                            height="250"
                            :data="jsfwList"
                            style="width: 100%">
                            <el-table-column
                                type="index"
                                label="排名"
                                width="">
                                <template slot-scope="scope">
                                    <span class="colfff" style="padding: 0 5px; background-color: #f25e43">{{ scope.$index +1 }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="a"
                                label="姓名"
                                width="">
                            </el-table-column>
                            <el-table-column
                                prop="b"
                                align='right'
                                label="次数">
                            </el-table-column>
                            </el-table>
                        </template>
                        
                    </div>
                </el-card>
            </el-col>
            <el-col :span='6'>
                <el-card shadow="hover" class="">
                     <div slot="header" class="clearfix">
                        <span>本月技师收入排行</span>
                    </div>
                    <div>
                        <template>
                            <el-table
                            height="250"
                            :data="jssrList"
                            style="width: 100%">
                            <el-table-column
                                type="index"
                                label="排名"
                                width="">
                                <template slot-scope="scope">
                                    <span class="colfff" style="padding: 0 5px; background-color: #459E8C">{{ scope.$index +1 }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="a"
                                label="姓名"
                                width="">
                            </el-table-column>
                            <el-table-column
                                prop="b"
                                align='right'
                                label="收入">
                            </el-table-column>
                            </el-table>
                        </template>
                    </div>
                </el-card>
            </el-col>
            <el-col :span='6'>
                <el-card shadow="hover" class="">
                     <div slot="header" class="clearfix">
                        <span>热门项目排行</span>
                    </div>
                    <div>
                        <template>
                            <el-table
                            height="250"
                            :data="rmxmList"
                            style="width: 100%">
                            <el-table-column
                                type="index"
                                label="排名"
                                width="">
                                <template slot-scope="scope">
                                    <span class="colfff" style="padding: 0 5px; background-color: #459E8C">{{ scope.$index +1 }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="a"
                                label="名称"
                                width="">
                            </el-table-column>
                            <el-table-column
                                prop="b"
                                align='right'
                                label="次数">
                            </el-table-column>
                            </el-table>
                        </template>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    var img = require('../../../assets/img/mark.png');
    var echarts = require('echarts');
    import bus from '../../../bus';
    import {dashboardService} from '../../../service/dashboard.js';
    import {storeService} from '../../../service/store';
    export default {
        components: {
            
        },
        data() {
            return {
                storeList: [],
                incomeA: [],
                incomeB: [],
                numsA: [],
                numsB: [],
                numsC: [],
                numsD: [],
                radio_income: '0',
                radio_nums: '0',
                selShopId_income: '',
                selShopId_nums: '',
                mdsrList: [],
                spList: [],
                jsfwList: [],
                jssrList: [],
                rmxmList: [],
                sysRoute: window.sysRoute || '',
                D: {}
            }
        },
        watch:{
            selShopId_income(){
                const t = this;
                t.platformHomePageIncome();
            },
            radio_income(){
                const t = this;
                t.platformHomePageIncome();
            },
            selShopId_nums(){
                const t = this;
                t.platformHomePageCounts();
            },
            radio_nums(){
                const t = this;
                t.platformHomePageCounts();
            }

        },
        methods:{
            // 创建图标对象
            addMarker(point, title, detail){
                const t = this; 
                // 设置标注|设置图标
                var myIcon = new BMap.Icon(img, new BMap.Size(40, 40));    
                var marker = new BMap.Marker(point, {icon: myIcon});    
                t.map.addOverlay(marker);
                // 设置 标题
                var label = new BMap.Label(title,{offset:new BMap.Size(35,-10)});
                label.setStyle({ 
                    color : "#fff", 
                    backgroundColor :"rgba(0, 152, 129, 0.9)",
                    border: '0',
                    borderRadius: '2px',
                    padding: '5px'
                });
                marker.setLabel(label);

                // 设置点击事件
                var opts = {
                    width : 100,     // 信息窗口宽度
                    height: 120,     // 信息窗口高度
                    title : title , // 信息窗口标题
                    enableMessage:true,//设置允许信息窗发送短息
                    message: detail
                }
                var infoWindow = new BMap.InfoWindow(detail, opts);  
                marker.addEventListener("click", function(){
                    t.map.openInfoWindow(infoWindow, point); //开启信息窗口
                }); 
            },
            gotoDetail(shopId){
                console.log(shopId)
            },
            // 地图初始化
            initMap(){
                const t = this;
                let map = new BMap.Map("map");// 创建地图实例  
                t.map = map;
                // 创建中心点坐标
                t.map.centerAndZoom(new BMap.Point(t.storeList[0].y,t.storeList[0].x), 13);
                t.map.enableScrollWheelZoom(true);  
                
                t.storeList.forEach((v, i)=>{
                    if(v.shopId!='-10000'){
                        let detail = `
                            <p class="top5">当前顾客: ${v.presentCustoms}<br/>预约顾客: ${v.orderCustoms}<br/>当班员工: ${v.onDutyEmployess}</p>
                            <p class="top5"><span style="display: none"  class="colblue pointer"onclick="gotoDetail(${v.id})" >查看完整信息</span></p>`;
                        t.addMarker(new BMap.Point(v.y,v.x), v.name, detail)
                    }
                })
            },
            initIncomeChart(){
                const t = this;
                t.incomeChart.setOption({
                    color: ['#3398DB', '#f25e43', '#459E8C'],
                    tooltip: {
                        trigger: 'axis'
                    },
                    xAxis: {
                        data: t.incomeA
                    },
                    yAxis: {
                        type: 'value'
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        top: '5%',
                        bottom: '2%',
                        containLabel: true,
                    },
                    series: [{
                        name: '收入',
                        type: 'line',
                        data: t.incomeB
                    }]
                });
            },
            initNumsChart(){
                const t = this;
                t.numsChart.setOption({
                    color: ['#3398DB', '#f25e43', '#459E8C'],
                    tooltip: {
                        trigger: 'axis'
                    },
                    xAxis: {
                        data: t.numsA
                    },
                    yAxis: {
                        type: 'value'
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        top: '5%',
                        bottom: '2%',
                        containLabel: true
                    },
                    series: [
                        {
                            name: '服务次数',
                            type: 'bar',
                            data: t.numsB
                        },
                        {
                            name: '好评数',
                            type: 'bar',
                            data: t.numsC
                        },
                        {
                            name: '预约数',
                            type: 'bar',
                            data: t.numsD
                        },

                    ]
                });
            },
            platformHomePageCounts(){
                const t = this;
                // 统计好评数
                // type （0 周 1月 2年）
                let params = {
                    storeId: t.selShopId_nums,
                    type: t.radio_nums
                }
                dashboardService.platformHomePageCounts(params).then((res)=>{
                    t.numsA = res[0];
                    t.numsB = res[1];
                    t.numsC= res[2];
                    t.numsD = res[3];
                    t.initNumsChart();
                    
                })
            },
            platformHomePageIncome(){
                const t = this;
                // 统计好评数
                // type （0 周 1月 2年）
                let params = {
                    storeId: t.selShopId_income,
                    type: t.radio_income
                }
                dashboardService.platformHomePageIncome(params).then((res)=>{
                    t.incomeA = res[0];
                    t.incomeB = [];
                    console.log(res[1])
                    for(const v of res[1]){
                        t.incomeB.push(Number(v)/100)
                    }
                    console.log(t.incomeB)
                    t.initIncomeChart();
                })
            },
            getStoreList(){
                // 门店列表
                const t = this;
                storeService.list({
                    pageSize: 100,
                    pageNumber: 1,
                }).then((res)=>{
                    t.storeList = res.records;
                    t.selShopId_income = t.storeList[0].id;
                    t.selShopId_nums = t.storeList[0].id;
                    t.initMap();
                    // t.platformHomePageCounts();
                    // t.platformHomePageIncome();
                })
            },
            platformHomePageAll(){
                const t = this;
                dashboardService.platformHomePageAll({storeId: 0}).then((res)=>{
                    if(res.incomeRankByStore){
                        t.mdsrList = res.incomeRankByStore[0].map((item, index)=>{
                            return {
                                a: item,
                                b: res.incomeRankByStore[1][index]
                            }
                        })
                    }
                    if(res.goodsRankByStore){
                        t.spList = res.goodsRankByStore[0].map((item, index)=>{
                            return {
                                a: item,
                                b: res.goodsRankByStore[1][index]
                            }
                        })
                    }
                    t.jsfwList = res.serviceNumRankByStore[0].map((item, index)=>{
                        return {
                            a: item,
                            b: res.serviceNumRankByStore[1][index]
                        }
                    })
                    t.jssrList = res.incomeRankByTechnician[0].map((item, index)=>{
                        return {
                            a: item,
                            b: res.incomeRankByTechnician[1][index]/100
                        }
                    })
                    t.rmxmList = res.itemRankByStore[0].map((item, index)=>{
                        return {
                            a: item,
                            b: res.itemRankByStore[1][index]
                        }
                    })
                })
            }
        },
        mounted(){
            const t = this;
            t.incomeChart = echarts.init(document.getElementById('incomeChart'));
            t.numsChart = echarts.init(document.getElementById('numsChart'));
            if(t.sysRoute == 'va'){
                t.getStoreList();
            }else{
                t.selShopId_income = window.storeId;
                t.selShopId_nums = window.storeId;
            }
            dashboardService.platformHomePage({storeId: 0}).then((res)=>{
                t.D = res;
            })
            t.platformHomePageAll();
            

            window.gotoDetail = (res)=>{
                t.gotoDetail(res)
            };
        }
    }
</script>
<style scoped>
    .infoWap .el-col{ border-right: 1px solid #ddd;}
    .infoWap .el-col:last-child{ border: none}
</style>
