<template>
    <div>
        <el-row class="sInfoWap">
            <el-col :span="12">
                <p class="font24b">{{row.name}}</p>
                <p class="top20"><i class="el-icon-phone"></i><span class="left5">{{row.phoneNum}}</span></p>
                <p class="top10"><i class="el-icon-lx-people"></i><span class="left5">{{row.shopowner}}</span></p>
                <p class="top10"><i class="el-icon-lx-mobile"></i><span class="left5">{{row.shopownerPhoneNum}}</span></p>
                <p class="top10"><i class="el-icon-lx-home"></i><span class="left5">{{row.area}}㎡</span></p>
                <p class="top10"><i class="el-icon-lx-tag"></i><span class="left5">{{row.tags}}</span></p>
            </el-col>
            <el-col :span="12">
                <img :src="D.imgs" class="img" alt="">
            </el-col>
        </el-row>
        <el-row class="table1 center top10" v-if="D.data">
            <el-col :span="6">
                <p  class="colblue font16">今日收入</p>
                <p>{{(D.data.todayIncome/100).toFixed(2)}}</p>
            </el-col>
            <el-col :span="6">
                <p class="colye font16">今日支出</p>
                <p>{{(D.data.todaySpending/100).toFixed(2)}}</p>
            </el-col>
            <el-col :span="6">
                <p class="colred font16">服务人次</p>
                <p>{{D.data.todayServiceNum}}</p>
            </el-col>
            <el-col :span="6">
                <p class="colgreen font16">客单价</p>
                <p>{{(D.data.todayPassengerUnitPrice/100).toFixed(2)}}</p>
            </el-col>
        </el-row>
        <el-row class=" "  style=" border-bottom: 1px solid #ddd; padding: 20px 0">
            <el-col :span="12" class="font12" style="padding-right: 20px">
                <p  class=" font16 center col000 font14">本月收入（{{(monthMerchandiseSales+totalPrice)/100}}）元</p>
				<p class="clearfix top10">商品销售<span class="right col999">{{monthMerchandiseSales}}元</span></p>
				<!-- 根据D.data.monthSpending的长度来创建相应的行数，行内数据按数组数据顺序展示 -->
				 <p class="clearfix" v-if="monthSpending!=null" v-for="v in monthSpending">
					{{v.item_class_name}}<span class="right col999">{{v.totalPrice/100}}元</span>
				</p> 
            </el-col>
            <el-col :span="12" class="font12" style="padding-left: 20px">
                <p class=" font16 center col000">本月支出（{{(monthEmployeeExpenses+monthArticleExpenses+monthGoodsExpenses+monthRent+monthPropertyCosts)/100}}）元</p>
                <p class="clearfix top10 ">员工工资<span class="right col999">{{monthEmployeeExpenses/100}}元</span></p>
                <p class="clearfix">物料成本<span class="right col999">{{monthArticleExpenses/100}}元</span></p>
                <p class="clearfix">商品成本<span class="right col999">{{monthGoodsExpenses/100}}元</span></p>
                <p class="clearfix">租金/月<span class="right col999">{{monthRent/100}}元</span></p>
                <p class="clearfix">物业/月<span class="right col999">{{monthPropertyCosts/100}}元</span></p>
            </el-col>
        </el-row>
        <!-- <div class="top20">
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
        </div> -->
    </div>
   
</template>
<script>
    import bus from '../../../bus';
    import {storeService} from '../../../service/store';
    import {dashboardService} from '../../../service/dashboard.js'
    var echarts = require('echarts');
    export default {
        name: 'StoreDetail',
        props: ['row'],
        data() {
            return {
                shopList: [],
                incomeA: [],
                incomeB: [],
				monthMerchandiseSales:'',
				monthArticleExpenses:'',
				monthEmployeeExpenses:'',
				monthArticleExpenses:'',
				monthGoodsExpenses:'',
				monthRent:'',
				monthPropertyCosts:'',
				monthSpending:[],
				totalPrice:'',
                D:{}
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
            getData(){
                const t = this;
                storeService.getData({id: t.row.id}).then((res)=>{
					console.log(res);
                    t.D = res;
					t.monthMerchandiseSales = res.data.monthMerchandiseSales;
					t.monthArticleExpenses = res.data.monthArticleExpenses;
					t.monthGoodsExpenses = res.data.monthGoodsExpenses;
					t.monthEmployeeExpenses = res.data.monthEmployeeExpenses;
					t.monthPropertyCosts = res.data.monthPropertyCosts;
					t.monthRent = res.data.monthRent;
					t.monthSpending = res.data.monthSpending==null?null:res.data.monthSpending;
					if(res.data.monthSpending!=null){
						for(let i = 0;i<res.data.monthSpending.length;i++){
							t.totalPrice += res.data.monthSpending[i].totalPrice;
						}
					}else{
						t.totalPrice = 0 ;
					}
                })
            }
        },
        mounted(){
            const t = this;
            console.log(t.row)
            t.getData();

        }
    }
</script>
<style scoped>
    
</style>
