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
            <el-button type="primary" icon="el-icon-search" @click="channelAnalysisReportExport()" class="right">导出</el-button>
            <span class="">下单渠道</span>
            <el-select class="left10" clearable v-model="terminalType" placeholder="请选择" filterable>
                <el-option v-for="(v, i) in channelList" :key='v.id' :label="v.label" :value="v.id"></el-option>
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

        <el-table :summary-method="getSummaries" show-summary :data="list" border class="table top20" ref="multipleTable">
            <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
            <el-table-column prop="date" label="日期">
                <template slot-scope="scope">
                    {{scope.row.date.split('.')[0]}}
                </template>
            </el-table-column>
            <el-table-column prop="channel" label="渠道"></el-table-column>
            <el-table-column prop="totalOrderNum" label="订单总数"></el-table-column>
            <el-table-column prop="totalOrderPrice" label="总金额（订单金额）">
                <template slot-scope="scope">
                    {{(scope.row.totalOrderPrice).toFixed(2)}}
                </template>
            </el-table-column>
        </el-table>
    </div>

</div>
</template>

<script>
import data from '../../../../../admin/src/template/pdf/content';
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
            startData: '',
            endData: '',
            channelList: [{
                label: '小程序',
                id: 0
            },{
                label: '客服台',
                id: 1
            }, {
                label: '客户端',
                id: 2
            }],
            terminalType: 0
        }
    },
    components: {

    },
    methods: {
        channelAnalysisReportExport() {
            const t = this;
            let params = {
                startDate: new Date(t.daterange[0]).getTime(),
                endDate: new Date(t.daterange[1]).getTime(),
                terminalType: t.terminalType
            }
            reportService.itemReportExport(params)
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
            const { columns, data } = param;
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
                    sums[index] += '';
                } else {
                    sums[index] = '';
                }
            });

            return sums;
        },
        getlist() {
            const t = this;
            let params = {
                startDate: new Date(t.daterange[0]).getTime(),
                endDate: new Date(t.daterange[1]).getTime(),
                terminalType: t.terminalType,
            }
            reportService.channelAnalysisReportList(params).then((res)=>{
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
    }
}
</script>

<style scoped>
    
</style>
