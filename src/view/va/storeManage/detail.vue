<template>
    <div>
        <el-row class="sInfoWap">
            <el-col :span="12">
                <p class="font24b">陆青交易冬季</p>
                <p class="top20"><i class="el-icon-phone"></i><span class="left5">025-56565656</span></p>
                <p class="top10"><i class="el-icon-lx-people"></i><span class="left5">张晓梅</span></p>
                <p class="top10"><i class="el-icon-lx-mobile"></i><span class="left5">189636363</span></p>
                <p class="top10"><i class="el-icon-lx-home"></i><span class="left5">105.36平方</span></p>
                <p class="top10"><i class="el-icon-lx-tag"></i><span class="left5">总店、首家、1000平以上、五星标准</span></p>
            </el-col>
            <el-col :span="12">
                <img src="../../../assets/img/login-bg.jpg" class="img" alt="">
            </el-col>
        </el-row>
        <el-row class="table1 center top10">
            <el-col :span="6">
                <p  class="colblue font16">今日收入</p>
                <p>363.00</p>
            </el-col>
            <el-col :span="6">
                <p class="colye font16">今日支出</p>
                <p>363.00</p>
            </el-col>
            <el-col :span="6">
                <p class="colred font16">服务人次</p>
                <p>363.00</p>
            </el-col>
            <el-col :span="6">
                <p class="colgreen font16">客单价</p>
                <p class="">363.00</p>
            </el-col>
        </el-row>
        <el-row class=" "  style=" border-bottom: 1px solid #ddd; padding: 20px 0">
            <el-col :span="12" class="font12" style="padding-right: 20px">
                <p  class=" font16 center col000 font14">本月收入（38271.50）</p>
                <p class="clearfix top10">休闲服务<span class="right col999">1222.00</span></p>
                <p class="clearfix">职场人事<span class="right col999">1222.00</span></p>
                <p class="clearfix">女性专区<span class="right col999">1222.00</span></p>
                <p class="clearfix">商品销售<span class="right col999">1222.00</span></p>
            </el-col>
            <el-col :span="12" class="font12" style="padding-left: 20px">
                <p class=" font16 center col000">本月支出（19748.33）</p>
                <p class="clearfix top10 ">员工工资<span class="right col999">1222.00</span></p>
                <p class="clearfix">物料成本<span class="right col999">1222.00</span></p>
                <p class="clearfix">商品成本<span class="right col999">1222.00</span></p>
                <p class="clearfix">租金/月<span class="right col999">1222.00</span></p>
                <p class="clearfix">物业/月<span class="right col999">1222.00</span></p>
            </el-col>
        </el-row>
        <div class="top20">
            <div class="clearfix">
                <span class="font16 col000">各门店收入情况</span>
                <el-select class="left10" v-model="selShopId_income" placeholder="请选择" filterable @change='onChange_income'>
                    <el-option v-for="(item, index) in shopList" :key="index" :value="item.shopId"  :label="item.shopName"></el-option>
                </el-select>
                <el-radio-group v-model="radio_income" class="right" @change='income_radio_change'>
                    <el-radio-button label="今日"></el-radio-button>
                    <el-radio-button label="本周"></el-radio-button>
                    <el-radio-button label="近一周"></el-radio-button>
                </el-radio-group>
            </div>
            <div id="incomeChart" class="top10" style="height: 250px;">
                                
            </div>
        </div>
    </div>
   
</template>
<script>
    import bus from '../../../bus';
    import {storeService} from '../../../service/store';
    import {dashboardService} from '../../../service/dashboard.js'
    var echarts = require('echarts');
    export default {
        name: 'StoreDetail',
        data() {
            return {
                shopList: [],
                incomeA: [],
                incomeB: [],
                radio_income: '今日',
                selShopId_income: '-10000',
            }
        },
        computed:{
            
        },
        methods:{
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
                    color: ['#3398DB', '#f25e43', '#07c4a8'],
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
        },
        mounted(){
            const t = this;
            t.incomeChart = echarts.init(document.getElementById('incomeChart'));
            t.$commonService.getShopList().then((res)=>{
                t.shopList = res
            })
            t.getIncomeData();
        }
    }
</script>
<style scoped>
    
</style>
