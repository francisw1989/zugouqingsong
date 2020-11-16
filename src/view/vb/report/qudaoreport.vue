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
            <el-button type="primary" icon="el-icon-search" @click="Export()" class="right">导出</el-button>
            <span class="">下单渠道</span>
            <el-select class="left10" clearable v-model="channelId" placeholder="请选择" filterable>
                <el-option v-for="(v, i) in channelList" :key='v.id' :label="v.label" :value="v.id"></el-option>
            </el-select>
            <span class="left20">开始时间</span>
            <el-date-picker class="left10" style="width: 150px" value-format="yyyy-MM-dd" v-model="startData" type="date" placeholder="选择日期"></el-date-picker>
            <span class="left20">结束时间</span>
            <el-date-picker class="left10" style="width: 150px" value-format="yyyy-MM-dd" v-model="endData" type="date" placeholder="选择日期"></el-date-picker>

            <el-button type="primary" icon="el-icon-search" @click="search" class="left10">查询</el-button>
        </div>

        <el-table :summary-method="getSummaries" show-summary :data="list" border class="table top20" ref="multipleTable">
            <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
            <el-table-column prop="a" label="日期"></el-table-column>
            <el-table-column prop="a" label="渠道"></el-table-column>
            <el-table-column prop="a" label="订单总数"></el-table-column>
            <el-table-column prop="a" label="总金额（订单金额）"></el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :page-size='pageSize' :total="total">
            </el-pagination>
        </div>
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
        return {
            list: [{a: 100}, {a: 100}, {a: 100}],
            startData: '',
            endData: '',
            total: 0,
            pageSize: 10,
            pageNumber: 1,
            channelList: [{
                label: '线上',
                id: 1
            }, {
                label: '收银台',
                id: 2
            }],
            channelId: ''
        }
    },
    components: {

    },
    methods: {
        Export() {

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
                startData: t.startData,
                endData: t.endData,
                channelId: t.channelId,
                pageSize: t.pageSize,
                pageNumber: t.pageNumber
            }
            console.log(params)
            // report.list(params).then((res)=>{
            // 	t.list = res.records;
            //     for(const v of t.list){
            //         v.actualOrderPrice = v.actualOrderPrice/100;
            // 		v.evaluateLabel = v.evaluateLabel==""?'/':v.evaluateLabel;
            // 		v.content = v.content==""?'/':v.content;
            //     }
            //     t.total = res.total
            // });
        }
    },
    watch: {},
    mounted() {
        const t = this;
        t.getlist();
    }
}
</script>

<style scoped>
    
</style>
