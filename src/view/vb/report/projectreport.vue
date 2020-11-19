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
                <el-button type="primary" icon="el-icon-search" @click="itemReportExport()" class="right">导出</el-button>
                <span class="">项目名称</span>
                <el-select class="left10"  clearable v-model="itemId" placeholder="请选择项目" filterable>
                    <el-option v-for="(v, i) in itemList" :key='v.id' :label="v.label"  :value="v.value"></el-option>
                </el-select>
                <span class="left20">请选择日期范围</span>
                <el-date-picker class="left10"
                    v-model="daterange"
                    :clearable = 'false'
                    :editable = 'false'
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions">
                </el-date-picker>
                <el-button type="primary" icon="el-icon-search" @click="search" class="left10">查询</el-button>
            </div>
            
            <el-table :data="list"  border class="table top20" ref="multipleTable">
                <el-table-column prop="itemName" label="项目名称" ></el-table-column>
                <el-table-column prop="itemUnitPrice" label="分钟单价" >
                    <template slot-scope="scope">
                        {{(scope.row.itemUnitPrice).toFixed(2)}}
				    </template>
                </el-table-column>
                <el-table-column prop="totalOrderTime" label="总分钟数"></el-table-column>
                <el-table-column prop="totalOrderNum" label="数量（订单数）"></el-table-column>
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
    import bus from '../../../bus';
    import {reportService} from '../../../service/report';
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
                itemList: [],
                itemId: ''
            }
        },
        components:{
			
        },
        methods:{
            itemReportExport(){
                const t = this;
                let params = {
                    startDate: new Date(t.daterange[0]).getTime(),
                    endDate: new Date(t.daterange[1]).getTime(),
                }
                reportService.itemReportExport(params)
            },
            getItemList() {
				const t = this;
				t.list = [];
				let params = {
					pageSize: 100,
					pageNumber: 1
				}
				reportService.getItemList(params).then((res) => {
					t.itemList = res;
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
            getlist(){
                const t = this;
                let params = {
                    startDate: new Date(t.daterange[0]).getTime(),
                    endDate: new Date(t.daterange[1]).getTime(),
                    itemId: t.itemId
                }
                reportService.itemReportList(params).then((res)=>{
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
        watch:{
        },
        mounted(){
           const t = this;
           t.setDefauteDate();
           t.getlist();
           t.getItemList();
        }
    }
</script>
<style scoped>
    
</style>
