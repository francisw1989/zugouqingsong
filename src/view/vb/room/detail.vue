<template>
        <el-row>
            <el-col :span="16">
                <div class="font20  col333 top10">101兰花厅<span class="left10 font12 col999">古色古香,无烟室</span></div>
                <el-row class="table1 center top20">
                    <el-col :span="8">
                        <p  class="colblue font16">今日收入</p>
                        <p>363.00</p>
                    </el-col>
                    <el-col :span="8">
                        <p class="colred font16">服务人次</p>
                        <p>363.00</p>
                    </el-col>
                    <el-col :span="8">
                        <p class="colgreen font16">客单价</p>
                        <p class="">363.00</p>
                    </el-col>
                </el-row>
                <div class="col333 top20">精油SPA</div>
                <table class="m-table2 top10">
                    <tr>
                        <td>2019-08-02 21：00</td>
                        <td>颈椎放松</td>
                        <td>张小妹</td>
                        <td>120元</td>
                    </tr>
                    <tr>
                        <td>2019-08-02 21：00</td>
                        <td>颈椎放松</td>
                        <td>张小妹</td>
                        <td>120元</td>
                    </tr>
                </table>
                <div class="col333 top20">足底按摩</div>
                <table class="m-table2 top10">
                    <tr>
                        <td>2019-08-02 21：00</td>
                        <td>颈椎放松</td>
                        <td>张小妹</td>
                        <td>120元</td>
                    </tr>
                    <tr>
                        <td>2019-08-02 21：00</td>
                        <td>颈椎放松</td>
                        <td>张小妹</td>
                        <td>120元</td>
                    </tr>
                </table>
            </el-col>
            <el-col :span="8" style="padding-left: 10px">
                <div class="yhBoard">
                    <div class="pad20">
                        <p class="font16b">今日收入（38271.50）</p>
                        <table class="m-table2 top20">
                            <tr>
                                <td>休闲服务</td>
                                <td>122</td>
                                <td>15001.00</td>
                            </tr>
                            <tr>
                                <td>休闲服务</td>
                                <td>122</td>
                                <td>15001.00</td>
                            </tr>
                            <tr>
                                <td>休闲服务</td>
                                <td>122</td>
                                <td>15001.00</td>
                            </tr>
                            <tr>
                                <td>休闲服务</td>
                                <td>122</td>
                                <td>15001.00</td>
                            </tr>
                        </table>
                    </div>
                </div>
                
            </el-col>
    </el-row>
   
   
</template>
<script>
    import bus from '../../../bus';
    import {storeService} from '../../../service/store';
    import {dashboardService} from '../../../service/dashboard.js'
    var echarts = require('echarts');
    export default {
        name: 'Detail',
        props: ['row', 'info'],
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
            console.log(t.row)
            // t.incomeChart = echarts.init(document.getElementById('incomeChart'));
            // t.$commonService.getShopList().then((res)=>{
            //     t.shopList = res
            // })
            // t.getIncomeData();
        }
    }
</script>
<style scoped>
    
</style>
