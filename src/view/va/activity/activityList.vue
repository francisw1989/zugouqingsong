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
                <el-input v-model="select_word" placeholder="姓名、手机号" class="handle-input"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="search" class="left10">搜索</el-button>
                <span class="left20">活动类型</span>
                <el-select class="left10" v-model="hdType" placeholder="请选择类型" style="width: 120px">
                    <el-option v-for="item in hdTypeList" :key="item" :label="item" :value="item"></el-option>
                </el-select>
            </div>
            <el-table :data="list"  border class="table top20" ref="multipleTable" @selection-change="handleSelectionChange">
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                <el-table-column type="index" label="序号"  width="50" align='center'></el-table-column>
                <el-table-column prop="a" label="参与人姓名" width="150"></el-table-column>
                <el-table-column prop="b" label="参与活动" width="120"></el-table-column>
                <el-table-column prop="c" label="参与时间"></el-table-column>
                <el-table-column prop="c" label="现金"></el-table-column>
                <el-table-column prop="c" label="优惠券"></el-table-column>
                <el-table-column prop="c" label="积分"></el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
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
                select_word: '',
                is_search: false,
                form: {
                    a: '',
                    b: '',
                    c: ''
                },
                rules: {
                    a: [
                        { required: true, message: '请选择类型', trigger: 'change' },
                    ]
                },
                idx: -1,
                id: -1,


                hdType: '',
                hdTypeList: [],
            }
        },
        components:{
            
        },
        methods:{

            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            search() {
                this.is_search = true;
            },

        },
        mounted(){
           const t = this;
           activityService.getActivityList().then((res)=>{
               t.list = res;
           });
           t.hdTypeList = t.$GD.hdTypeList;


        }
    }
</script>
<style scoped>
    
</style>
