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
                            <p>6321.00</p>
                        </el-col>
                        <el-col :span="8">
                            <p>今日支出</p>
                            <p>6321.00</p>
                        </el-col>
                        <el-col :span="8">
                            <p>今日退款</p>
                            <p>6321.00</p>
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
                            <p>服务人数</p>
                            <p>6321.00</p>
                        </el-col>
                        <el-col :span="8">
                            <p>新增会员</p>
                            <p>6321.00</p>
                        </el-col>
                        <el-col :span="8">
                            <p>客单价</p>
                            <p>6321.00</p>
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
                            <p>总平数</p>
                            <p>6321.00</p>
                        </el-col>
                        <el-col :span="12">
                            <p>总人数</p>
                            <p>6321.00</p>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>

        <el-row :gutter='20' class="top10">
            <el-col :span='12'>
                <el-card shadow="hover" class="">
                    <div slot="header" class="clearfix">
                        <span>各门店收入情况</span>
                        <el-select class="left10" v-model="selShopId_income" placeholder="请选择" filterable @change='onChange_income'>
                            <el-option v-for="(item, index) in shopList" :key="index" :value="item.shopId"  :label="item.shopName"></el-option>
                        </el-select>
                        <el-radio-group v-model="radio_income" class="right" @change='income_radio_change'>
                            <el-radio-button label="今日"></el-radio-button>
                            <el-radio-button label="本周"></el-radio-button>
                            <el-radio-button label="近一周"></el-radio-button>
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
                        <el-select class="left10" v-model="selShopId_nums" placeholder="请选择" filterable @change='onChange_nums'>
                            <el-option v-for="(item, index) in shopList" :key="index" :value="item.shopId"  :label="item.shopName"></el-option>
                        </el-select>
                        <el-radio-group v-model="radio_nums" class="right" @change='nums_radio_change'>
                            <el-radio-button label="今日"></el-radio-button>
                            <el-radio-button label="本周"></el-radio-button>
                            <el-radio-button label="近一周"></el-radio-button>
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
            <el-col :span='8'>
                <el-card shadow="hover" class="">
                     <div slot="header" class="clearfix">
                        <span>本月商品销售排行榜</span>
                    </div>
                    <div>
                        <template>
                            <el-table
                            height="250"
                            :data="mdsrList"
                            style="width: 100%">
                            <el-table-column
                                type="index"
                                label="排名"
                                width="180">
                                <template slot-scope="scope">
                                    <span class="colfff" style="padding: 0 5px; background-color: #3398DB">{{ scope.$index +1 }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="a"
                                label="店名"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                align='right'
                                prop="b"
                                label="收入">
                            </el-table-column>
                            </el-table>
                        </template>
                    </div>
                </el-card>
            </el-col>
            <el-col :span='8'>
                <el-card shadow="hover" class="">
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
                                width="180">
                                <template slot-scope="scope">
                                    <span class="colfff" style="padding: 0 5px; background-color: #f25e43">{{ scope.$index +1 }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="a"
                                label="姓名"
                                width="180">
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
            <el-col :span='8'>
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
                                width="180">
                                <template slot-scope="scope">
                                    <span class="colfff" style="padding: 0 5px; background-color: #459E8C">{{ scope.$index +1 }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="a"
                                label="姓名"
                                width="180">
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
        </el-row>
    </div>
</template>
<script>
    var img = require('../../../assets/img/mark.png');
    var echarts = require('echarts');
    import bus from '../../../bus';
    import {dashboardService} from '../../../service/dashboard.js'
    export default {
        components: {
            
        },
        data() {
            return {
                shopList: [],
                incomeA: [],
                incomeB: [],
                numsA: [],
                numsB: [],
                numsC: [],
                numsD: [],
                radio_income: '今日',
                radio_nums: '今日',
                selShopId_income: '-10000',
                selShopId_nums: '-10000',
                mdsrList: [],
                jsfwList: [],
                jssrList: []
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
                t.map.centerAndZoom('南京', 13);
                // t.map.enableScrollWheelZoom(true);  
                
                t.shopList.forEach((v, i)=>{
                    if(v.shopId!='-10000'){
                        let detail = `
                            <p class="top5">当前顾客: ${v.num1}<br/>预约顾客: ${v.num3}<br/>当班员工: ${v.num2}</p>
                            <p class="top5"><span  class="colblue pointer"onclick="gotoDetail(${v.shopId})" >查看完整信息</span></p>`;
                        t.addMarker(new BMap.Point(v.position.split(',')[0],v.position.split(',')[1]), v.shopName, detail)
                    }
                })
            },
            onChange_income(e){
                const t = this;
                t.getIncomeData();
            },
            income_radio_change(e){
                const t = this;
                t.getIncomeData();
            },
            getIncomeData(){
                const t = this;
                let params = {
                    
                }
                dashboardService.getIncomeData(params).then((res)=>{
                    t.incomeA = res.a;
                    t.incomeB = res.b;
                    t.initIncomeChart();
                });
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
            onChange_nums(e){
                const t = this;
                t.getNumsData();
            },
            nums_radio_change(e){
                const t = this;
                t.getNumsData();
            },
            getNumsData(){
                const t = this;
                let params = {
                    
                }
                dashboardService.getNumsData(params).then((res)=>{
                    t.numsA = res.a;
                    t.numsB = res.b;
                    t.numsC = res.c;
                    t.numsD = res.d;
                    t.initNumsChart();
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
            
        },
        mounted(){
            const t = this;
            t.incomeChart = echarts.init(document.getElementById('incomeChart'));
            t.numsChart = echarts.init(document.getElementById('numsChart'));
            window.gotoDetail = (res)=>{
                t.gotoDetail(res)
            };
            // t.$commonService.getShopList().then((res)=>{
            //     t.shopList = res
            //     t.initMap();
            // })
            t.getIncomeData();
            t.getNumsData();
            dashboardService.getMdsrList().then((res)=>{
                t.mdsrList = res;
            })
            dashboardService.getJsfwList().then((res)=>{
                t.jsfwList = res;
            })
            dashboardService.getJssrList().then((res)=>{
                t.jssrList = res;
            })
        }
    }
</script>
<style scoped>
    .infoWap .el-col{ border-right: 1px solid #ddd;}
    .infoWap .el-col:last-child{ border: none}
</style>
