<template>
<div class="table">
    <div class="crumbs">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item> {{this.$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="container">
        <div class=" clearfix">
            <el-button type="primary" icon="el-icon-search" @click="employeeCoefficientCollectReportExport()" class="right">导出</el-button>
            <span class="">员工姓名</span>
            <el-select class="left10" clearable v-model="employeeId" placeholder="请选择" filterable>
                <el-option v-for="(v, i) in employeesList" :key='v.value' :label="v.label" :value="v.value"></el-option>
            </el-select>
            <span class="left20">请选择日期范围</span>
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

        <table class="m-table6 top20">
            <tr>
                <td rowspan='2'>姓名</td>
                <td rowspan='2'>日期</td>
                <td colspan="3">项目提成（线上）</td>
                <td colspan="3">项目提成（收银台）</td>
                <td rowspan="2">总提成</td>
            </tr>
            <tr>
                <td>次数</td>
                <td>业绩</td>
                <td>提成</td>
                <td>次数</td>
                <td>业绩</td>
                <td>提成</td>
            </tr>
            <template v-for="(v1, i1) in list">
                <tr class="tr1" v-for="(v2, i2) in v1.list" v-if="v1.list.length">
                    <td v-if="i2 == 0" :rowspan="v1.list.length">{{v1.employeeName}}</td>
                    <td>{{v2.date}}</td>
                    <td>{{v2.onlineNum}}</td>
                    <td>{{(v2.onlinePay/100).toFixed(2)}}</td>
                    <td>{{(v2.onlineIncome/100).toFixed(2)}}</td>
                    <td>{{v2.cashierNum}}</td>
                    <td>{{(v2.cashierPay/100).toFixed(2)}}</td>
                    <td>{{(v2.cashierIncome/100).toFixed(2)}}</td>
                    <td>{{(v2.allIncome/100).toFixed(2)}}</td>
                </tr>
                <tr class="tr2" v-if="v1.total.onlineNum">
                    <td colspan="2">合计：</td>
                    <td>{{v1.total.onlineNum}}</td>
                    <td>{{(v1.total.onlinePay/100).toFixed(2)}}</td>
                    <td>{{(v1.total.onlineIncome/100).toFixed(2)}}</td>
                    <td>{{v1.total.cashierNum}}</td>
                    <td>{{(v1.total.cashierPay/100).toFixed(2)}}</td>
                    <td>{{(v1.total.cashierIncome/100).toFixed(2)}}</td>
                    <td>{{(v1.total.allIncome/100).toFixed(2)}}</td>
                </tr>
            </template>

        </table>
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
            list: [],
            daterange: [],
            pickerOptions: {
                disabledDate(time) {
                    let currentTime = new Date(t.daterange[0]);
                    let threeMonths = 60 * 60 * 1000 * 24 * 92;
                    if (currentTime) {
                        return time.getTime() > currentTime.getTime() + threeMonths || time.getTime() < currentTime.getTime() - threeMonths
                    }
                },
                onPick({
                    minDate,
                    maxDate
                }) {
                    // 当第一时间选中才设置禁用
                    if (minDate && !maxDate) {
                        t.daterange[0] = minDate;
                    }
                    if (maxDate) {
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
            employeesList: [],
            employeeId: ''
        }
    },
    components: {

    },
    methods: {
        employeeCoefficientCollectReportExport() {
            const t = this;
            let params = {
                startDate: new Date(t.daterange[0]).getTime(),
                endDate: new Date(t.daterange[1]).getTime(),
                employeeId: t.employeeId
            }
            reportService.employeeCoefficientCollectReportExport(params)
        },
        getEmployeesList() {
            const t = this;
            reportService.employeeSelect().then((res) => {
                t.employeesList = res;
            })
        },
        handleCurrentChange(val) {
            this.pageNumber = val;
            this.getlist();
        },
        search() {
            const t = this;
            t.getlist();
        },
        heji() {
            const t = this;
            const keys = Object.keys(t.list[0].list[0]);
            t.list.forEach((staffItem) => {
                staffItem.list.forEach((item, i) => {
                    keys.forEach(key => {
                        if (!isNaN(item[key])) {
                            staffItem[key] = !isNaN(staffItem[key]) ? Number(staffItem[key] || 0) + Number(item[key] || 0) : Number(item[key] || 0)
                            staffItem[key] = staffItem[key].toFixed(2)
                        }
                    })
                })
            });
        },
        getlist() {
            const t = this;
            let params = {
                startDate: new Date(t.daterange[0]).getTime(),
                endDate: new Date(t.daterange[1]).getTime(),
                employeeId: t.employeeId
            }
            reportService.employeeCoefficientCollectReportList(params).then((res) => {
                t.list = res;
            });
        },
        setDefauteDate() {
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
        t.getEmployeesList();
    }
}
</script>

<style scoped>
    
</style>
