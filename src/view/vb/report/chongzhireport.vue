<template>
<div class="table">
    <div class="crumbs">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item> {{this.$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <el-row :gutter='20' class="top10">
        <el-col :span="8">
            <el-card shadow="hover" class="center">
                <div slot="header" class="clearfix">
                    <span>截止今日 充值总金额</span>
                </div>
                <p>{{(totalRechargeAmout/100).toFixed(2)}}</p>
            </el-card>
        </el-col>
        <el-col :span="8">
            <el-card shadow="hover" class="center">
                <div slot="header" class="clearfix">
                    <span>截止今日 下卡总金额</span>
                </div>
                <p>{{(orderAmout/100).toFixed(2)}}</p>
            </el-card>
        </el-col>
        <el-col :span="8">
            <el-card shadow="hover" class="center">
                <div slot="header" class="clearfix">
                    <span>截止今日 赠送总金额</span>
                </div>
                <p>{{(totalGiveAmout/100).toFixed(2)}}</p>
            </el-card>
        </el-col>
    </el-row>
    <div class="container top10">
        <div class=" clearfix">
            <el-button type="primary" icon="el-icon-search" @click="rechargeReportExport()" class="right">导出</el-button>
            <span class="">请选择日期范围</span>
            <el-date-picker class="left10"
                v-model.trim="daterange"
                value-format="yyyy-MM-dd"
                type="daterange"
                :clearable = 'false'
                :editable = 'false'
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions">
            </el-date-picker>
            <el-button type="primary" icon="el-icon-search" @click="search" class="left10">查询</el-button>
        </div>

        <el-table :summary-method="getSummaries" show-summary :data="list" border class="table top20" ref="multipleTable">
            <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
            <el-table-column prop="date" label="日期"></el-table-column>
            <el-table-column prop="totalRechargeAmout" label="当天充值总金额">
                <template slot-scope="scope">
                    {{(scope.row.totalRechargeAmout/100).toFixed(2)}}
                </template>
            </el-table-column>
            <el-table-column prop="totalGiveAmout" label="当天赠送总金额">
                <template slot-scope="scope">
                    {{(scope.row.totalGiveAmout/100).toFixed(2)}}
                </template>
            </el-table-column>
            <el-table-column prop="orderAmout" label="当天下卡总金额">
                <template slot-scope="scope">
                    {{(scope.row.orderAmout/100).toFixed(2)}}
                </template>
            </el-table-column>
            <el-table-column prop="rechargeNum" label="充值笔数"></el-table-column>
            <el-table-column prop="consumerNum" label="消费笔数"></el-table-column>
        </el-table>
    </div>

</div>
</template>

<script>
import bus from '../../../bus';
import {
    reportService
} from '../../../service/report';
export default {
    data() {
        const t = this;
        return {
            list: [{a: 100}, {a: 100}, {a: 100}],
            daterange: [],
            pickerOptions: {
                disabledDate(time){
                    let currentTime = new Date(t.daterange[0]);
                    let threeMonths = 60*60*1000*24*92;
                    if(currentTime){
                        return time.getTime() >currentTime.getTime() + threeMonths || time.getTime() < currentTime.getTime() - threeMonths
                    }
                },
                onPick({minDate,maxDate}){
                    // 当第一时间选中才设置禁用
                    if(minDate && !maxDate){
                        t.daterange[0] = minDate;
                    }
                    if(maxDate){
                        t.daterange[1] = maxDate;
                    }
                    console.log(minDate)
                    console.log(maxDate)
                },
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                    }
                }]
            },
            itemList: [],
            itemId: '',
            orderAmout: '',
            totalGiveAmout: '',
            totalRechargeAmout: ''
        }
    },
    components: {

    },
    methods: {
        rechargeReportExport() {
            const t = this;
            let params = {
                startDate: new Date(t.daterange[0]).getTime(),
                endDate: new Date(t.daterange[1]).getTime()
            }
            reportService.rechargeReportExport(params)
        },
        handleCurrentChange(val) {
            this.pageNumber = val;
            this.getlist();
        },
        search() {
            const t = this;
            t.getlist();
        },
        getSummaries(param) {
            const {
                columns,
                data
            } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '合计：';
                    return;
                }
                const values = data.map(item => Number(item[column.property]));
                if (!values.every(value => isNaN(value))) {
                    sums[index] = values.reduce((prev, curr) => {
                        const value = Number(curr);
                        if (!isNaN(value)) {
                            return prev + curr;
                        } else {
                            return prev;
                        }
                    }, 0);
                    if(index == 1 || index == 2 || index == 3){
                        sums[index] = (sums[index]/100).toFixed(2)
                    }
                    sums[index] += '';
                } else {
                    sums[index] = '';
                }
            });

            return sums;
        },
        rechargeStatistics(){
            const t = this;
            reportService.rechargeStatistics().then((res)=>{
                t.orderAmout = res.orderAmout;
                t.totalGiveAmout = res.totalGiveAmout;
                t.totalRechargeAmout = res.totalRechargeAmout;
            })
        },
        getlist() {
            const t = this;
            let params = {
                startDate: new Date(t.daterange[0]).getTime(),
                endDate: new Date(t.daterange[1]).getTime()
            }
            reportService.rechargeReportList(params).then((res)=>{
            	t.list = res;
            });
        },
        setDefauteDate(){
            const t = this;
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            t.daterange = [start, end];
        }
    },
    watch: {},
    mounted() {
        const t = this;
        t.setDefauteDate();
        t.getlist();
        t.rechargeStatistics();
    }
}
</script>

<style scoped>
    
</style>
