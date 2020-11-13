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

                <el-button type="primary" icon="el-icon-search" @click="search" class="left10">搜索</el-button>
            </div>
            
            <el-table :data="list"  border class="table top20" ref="multipleTable">
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                <el-table-column type="index" label="序号"  width="50" align='center'></el-table-column>
                <el-table-column prop="actualOrderTime" label="服务时间" width="150"></el-table-column>
                <el-table-column prop="user.userName" label="客户名称" width="120"></el-table-column>
                <el-table-column prop="evaluateScore" label="评分"></el-table-column>
                <el-table-column prop="employeeName" label="服务技师"></el-table-column>
                <el-table-column prop="evaluateLabel" label="评价标签"></el-table-column>
                <el-table-column prop="content" label="评价内容"></el-table-column>
                <el-table-column prop="itemName" label="项目名称"></el-table-column>
                <el-table-column prop="actualOrderPrice" label="实际消费(元)"></el-table-column>
                 <el-table-column label="操作" width="80" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" type="success" @click="handle1(scope.$index, scope.row)">回复</el-button>
                    </template>
                </el-table-column> 
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
