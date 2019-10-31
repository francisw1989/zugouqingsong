<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item> {{this.$route.meta.title}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class=" clearfix top10">
                <el-input v-model="userName" placeholder="姓名" class="handle-input"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="search" class="left10">搜索</el-button>
                <span class="left20">活动类型</span>
                <el-select class="left10" v-model="type" placeholder="请选择类型" style="width: 120px">
                    <el-option v-for="(v,i) in ffTypeList" :key="i" :label="v" :value="i"></el-option>
                </el-select>
            </div>
            <el-table :data="list"  border class="table top20" ref="multipleTable" @selection-change="handleSelectionChange">
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                <el-table-column type="index" label="序号"  width="50" align='center'></el-table-column>
                <el-table-column prop="userName" label="参与人姓名" width="150"></el-table-column>
                <el-table-column prop="activityTypeName" label="参与活动" width="120"></el-table-column>
                <el-table-column prop="activityTime" label="参与时间"></el-table-column>
                <el-table-column prop="amount" label="现金"></el-table-column>
                <el-table-column prop="couponIds" label="优惠券"></el-table-column>
                <el-table-column prop="score" label="积分"></el-table-column>
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
    import {activityService} from '../../../service/activity';

    export default {
        data() {
            return {
                list: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                userName: '',
                is_search: false,
                idx: -1,
                id: -1,
                type: '',
                ffTypeList: [],
                total: 0,
                pageSize: 10,
                pageNumber: 1
            }
        },
        components:{
            activityService
        },
        methods:{

            handleCurrentChange(val) {
                this.cur_page = val;
                this.getActivityConfigList();
            },
            search() {
                //this.is_search = true;
                const t = this;
                t.getuserActivityRecord();
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            getuserActivityRecord(){
                const t = this;
                t.list = [];
                let params = {
                    pageSize: t.pageSize,
                    pageNumber: t.pageNumber,
                    type: t.type,
                    userName: t.userName
                }
                activityService.getuserActivityRecord(params).then((res)=>{
                    for(const v of res.records){
                        if(v.activityType == null){
                            v.activityTypeName = '';
                        }else{
                            v.activityTypeName = t.ffTypeList[v.activityType];
                        }
                    }
                    t.list = res.records;
                    t.total = res.total
                })
            }

        },
        watch:{
            type(val){
                const t = this;
                t.getuserActivityRecord();
            },
        },
        mounted(){
           const t = this;
           t.ffTypeList = t.$GD.ffTypeList;
           t.getuserActivityRecord();
        }
    }
</script>
<style scoped>
    
</style>
