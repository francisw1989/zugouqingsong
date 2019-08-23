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
                <el-input v-model="select_word" placeholder="订单编号、项目名称、技师名称、客户名称" class="handle-input"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="search" class="left10">搜索</el-button>
                <span class="left10 font12 colblue pointer" @click="moreSeach">更多筛选条件  <i class="el-icon-caret-bottom"></i></span>
            </div>
            <div v-if='showMore' class="top10">
                <span class="">项目分类</span>
                <el-select class="left10" v-model="form.a" placeholder="请选择项目分类" filterable>
                    <el-option v-for="(v, i) in xmflList" :key="i" :label="v" :value="v"></el-option>
                </el-select>
                <span class="left20">开始时间</span>
                <el-date-picker class="left10" style="width: 150px" v-model="startData" type="date" placeholder="选择日期"></el-date-picker>
                <span class="left20">结束时间</span>
                <el-date-picker class="left10" style="width: 150px" v-model="endData" type="date" placeholder="选择日期"></el-date-picker>
                <el-radio-group v-model="neirong" class="left20" @change='radioChange'> 
                    <el-radio label="0">全部</el-radio>
                    <el-radio label="1">有评价的内容</el-radio>
                </el-radio-group>
            </div>
            <el-table :data="list"  border class="table top20" ref="multipleTable">
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                <!-- <el-table-column type="index" label="序号"  width="50" align='center'></el-table-column> -->
                <el-table-column prop="a" label="服务时间" width="150"></el-table-column>
                <el-table-column prop="b" label="客户名称" width="120"></el-table-column>
                <el-table-column prop="c" label="评分"></el-table-column>
                <el-table-column prop="c" label="服务技师"></el-table-column>
                <el-table-column prop="c" label="评价标签"></el-table-column>
                <el-table-column prop="c" label="评价内容"></el-table-column>
                <el-table-column prop="c" label="项目内容"></el-table-column>
                <el-table-column prop="c" label="实际消费"></el-table-column>
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
    import {evaluateService} from '../../../service/evaluate';

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
                startData: '',
                endData: '',

                hdType: '',
                hdTypeList: [],
                showMore: false,
                xmfl: '',
                xmflList: [],
                neirong: '0'
            }
        },
        components:{
            
        },
        methods:{
            radioChange(){
                const t = this;
                console.log(t.neirong)
            },
            moreSeach(){
                const t = this;
                if(t.showMore){
                    t.showMore = false
                }else{
                    t.showMore = true
                }
            },
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
           evaluateService.getEvaluateList().then((res)=>{
               t.list = res;
           });
           t.xmflList = t.$GD.xmflList;


        }
    }
</script>
<style scoped>
    
</style>
