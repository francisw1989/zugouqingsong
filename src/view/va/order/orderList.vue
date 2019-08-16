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
                <el-radio-group v-model="type" class="right">
                    <el-radio-button :label="i"  v-for="(v, i) in typeList" :key="i" >{{v}}</el-radio-button>
                </el-radio-group>
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="search" class="left10">搜索</el-button>
                <span class="left10 font12 colblue pointer" @click="moreSeach">更多筛选条件  <i class="el-icon-caret-bottom"></i></span>
            </div>
            <div v-if='showMore' class="top10">
                <span class="">项目分类</span>
                <el-select class="left10" v-model="form.a" placeholder="请选择项目分类" filterable>
                    <el-option v-for="(v, i) in xmflList" :key="i" :label="v" :value="v"></el-option>
                </el-select>
                <span class="left20">开始时间</span>
                <el-date-picker class="left10" v-model="startData" type="date" placeholder="选择日期"></el-date-picker>
                <span class="left20">结束时间</span>
                <el-date-picker class="left10" v-model="endData" type="date" placeholder="选择日期"></el-date-picker>
                <span class="left20">是否拼团</span>
                <el-switch v-model="isPintuan" class="left10"></el-switch>
                <span class="left20">是否用券</span>
                <el-switch v-model="isQuan" class="left10"></el-switch>
            </div>
            <el-table :data="list"  border class="table top20" ref="multipleTable" @selection-change="handleSelectionChange">
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                <!-- <el-table-column type="index" label="序号"  width="50" align='center'></el-table-column> -->
                <el-table-column prop="a" label="订单编号" sortable width="150"></el-table-column>
                <el-table-column prop="b" label="项目名称" width="120"></el-table-column>
                <el-table-column prop="c" label="所属分类"></el-table-column>
                <el-table-column prop="c" label="服务门店"></el-table-column>
                <el-table-column prop="c" label="服务时间"></el-table-column>
                <el-table-column prop="c" label="优惠券"></el-table-column>
                <el-table-column prop="c" label="拼团"></el-table-column>
                <el-table-column prop="c" label="实际消费(元)"></el-table-column>
                <el-table-column prop="c" label="服务技师"></el-table-column>
                <el-table-column prop="c" label="当前状态"></el-table-column>
                <el-table-column label="操作" width="80" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handle1(scope.$index, scope.row)">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="订单详情" :visible.sync="viewVisible" width="50%">
            <OrderDetail></OrderDetail>
        </el-dialog>


    </div>
</template>
<script>
    import bus from '../../../bus';
    import {orderService} from '../../../service/order';
    import OrderDetail from './orderDetail';
    export default {
        data() {
            return {
                list: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                viewVisible: false,
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
                typeList:['所有订单', '未支付','进行中','待评价','已完成'],
                type: '0',
                showMore: false,
                xmfl: '',
                xmflList: [],
                startData: '',
                endData: '',
                isPintuan: false,
                isQuan: false
            }
        },
        components:{
            OrderDetail
        },
        methods:{
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
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 订单详情
            handle1(index, row) {
                this.idx = index;
                this.id = row.id;
                this.viewVisible = true;
            },
        },
        mounted(){
           const t = this;
           orderService.getOrderList().then((res)=>{
               t.list = res;
           });
           orderService.getXmflList().then((res)=>{
               t.xmflList = res;
           })

        }
    }
</script>
<style scoped>
    
</style>
