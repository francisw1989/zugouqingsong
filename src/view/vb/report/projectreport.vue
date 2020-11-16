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
                <span class="">项目分类</span>
                <el-select class="left10"  clearable v-model="itemId" placeholder="请选择项目" filterable>
                    <el-option v-for="(v, i) in itemList" :key='v.id' :label="v.itemName"  :value="v.id"></el-option>
                </el-select>
                <span class="left20">开始时间</span>
                <el-date-picker class="left10" style="width: 150px" value-format="yyyy-MM-dd" v-model="startData" type="date" placeholder="选择日期"></el-date-picker>
                <span class="left20">结束时间</span>
                <el-date-picker class="left10" style="width: 150px" value-format="yyyy-MM-dd" v-model="endData" type="date" placeholder="选择日期"></el-date-picker>

                <el-button type="primary" icon="el-icon-search" @click="search" class="left10">查询</el-button>
            </div>
            
            <el-table :data="list"  border class="table top20" ref="multipleTable">
                <el-table-column prop="actualOrderTime" label="项目名称" ></el-table-column>
                <el-table-column prop="user.userName" label="分钟单价" ></el-table-column>
                <el-table-column prop="evaluateScore" label="总分钟数"></el-table-column>
                <el-table-column prop="employeeName" label="数量（订单数）"></el-table-column>
                <el-table-column prop="evaluateLabel" label="总金额（订单金额）"></el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next"  :page-size='pageSize' :total="total">
                </el-pagination>
            </div>
        </div>


    </div>
</template>
<script>
    import bus from '../../../bus';
    import {orderService} from '../../../service/order';
    import {reportService} from '../../../service/report';
    export default {
        data() {
            return {
                list: [],
                startData: '',
                endData: '',
                total: 0,
                pageSize: 10,
                pageNumber: 1,
                itemList: [],
                itemId: ''
            }
        },
        components:{
			
        },
        methods:{
            Export(){
                
            },
            getItemList() {
				const t = this;
				t.list = [];
				let params = {
					pageSize: 100,
					pageNumber: 1
				}
				orderService.getItemList(params).then((res) => {
					t.itemList = res.records;
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
                    startData: t.startData,
                    endData: t.endData,
                    itemId: t.itemId,
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
        watch:{
        },
        mounted(){
           const t = this;
           t.getlist();
           t.getItemList();
        }
    }
</script>
<style scoped>
    
</style>
