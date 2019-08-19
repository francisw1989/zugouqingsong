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
                <el-button type="primary" class="right" @click="handle1">新增</el-button>
                <el-input v-model="select_word" placeholder="订单编号、商品名称、接收员、配送员" class="handle-input"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="search" class="left10">搜索</el-button>
                <span class="left10 font12 colblue pointer" @click="moreSeach">更多筛选条件  <i class="el-icon-caret-bottom"></i></span>

            </div>
            <div v-if='showMore' class="top10">
                <span class="">接收门店</span>
                <el-select class="left10" v-model="selShopId_income" placeholder="请选择" filterable >
                    <el-option v-for="(item, index) in shopList" :key="index" :value="item.shopId"  :label="item.shopName"></el-option>
                </el-select>
                <el-checkbox v-model="checked1" class="left40">商品</el-checkbox>
                <el-checkbox v-model="checked2">物料</el-checkbox>
                <div class="top10">
                    <span class="">出库开始时间</span>
                    <el-date-picker class="left10" style="width: 140px" v-model="startDataCK" type="date" placeholder="选择日期"></el-date-picker>
                    <span class="left20">出库结束时间</span>
                    <el-date-picker class="left10" style="width: 140px" v-model="endDataCK" type="date" placeholder="选择日期"></el-date-picker>
                    <span class="left20">接收开始时间</span>
                    <el-date-picker class="left10" style="width: 140px" v-model="startDataJS" type="date" placeholder="选择日期"></el-date-picker>
                    <span class="left20">接收结束时间</span>
                    <el-date-picker class="left10" style="width: 140px" v-model="endDataJS" type="date" placeholder="选择日期"></el-date-picker>
                </div>
                <div class="top10">
                    <span class="">是否拼团</span>
                    <el-switch v-model="isPintuan" class="left10"></el-switch>
                    <span class="left20">是否用券</span>
                    <el-switch v-model="isQuan" class="left10"></el-switch>
                </div>
            </div>

            
            <el-table :data="list"  border class="table top20" ref="multipleTable">
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                <!-- <el-table-column type="index" label="序号"  width="50" align='center'></el-table-column> -->
                <el-table-column prop="a" label="商品编号" sortable width="150"></el-table-column>
                <el-table-column prop="b" label="商品名称" width="120"></el-table-column>
                <el-table-column prop="c" label="商品类别"></el-table-column>
                <el-table-column prop="c" label="成本价格（元）"></el-table-column>
                <el-table-column prop="c" label="销售价格（元）"></el-table-column>
                <el-table-column prop="c" label="数量"></el-table-column>
                <el-table-column prop="c" label="单位"></el-table-column>
                <el-table-column label="操作" width="150" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handle1(scope.$index, scope.row)">查看</el-button>
                        <el-button size="mini" type="danger" @click="handle2(scope.$index, scope.row)">停用</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                </el-pagination>
            </div>
        </div>

        <!-- 新增 -->
        <el-dialog :title="idx==-1?'新增':'查看'" :visible.sync="editVisible" width="350px">
            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                <el-form-item label="商品类别" prop="a">
                    <el-select v-model="form.a" placeholder="请选择类型" filterable>
                        <el-option v-for="item in goodsCat" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商品名称" prop="a">
                    <el-input v-model="form.a"></el-input>
                </el-form-item>
                
                <el-form-item label="成本价" prop="a">
                    2元
                </el-form-item>
                <el-form-item label="销售价" prop="a">
                    2元
                </el-form-item>
                <el-form-item label="单位" prop="a">
                    瓶
                </el-form-item>
                <el-form-item label="接收门店" prop="a">
                    <el-select class="" v-model="form.a" placeholder="请选择" filterable >
                        <el-option v-for="(item, index) in shopList" :key="index" :value="item.shopId"  :label="item.shopName"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="出库时间" prop="a">
                    <el-date-picker class=""  v-model="form.a" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="数量" prop="a">
                    <el-input v-model="form.a"></el-input>
                </el-form-item>
                <el-form-item label="配送员" prop="a">
                    <el-input v-model="form.a"></el-input>
                </el-form-item>
                <el-form-item label="配送员电话" prop="a">
                    <el-input v-model="form.a"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit('form')">确 定</el-button>
            </span>
        </el-dialog>



    </div>
</template>
<script>
    import bus from '../../../bus';
    import {stockService} from '../../../service/stock';
    export default {
        data() {
            return {
                list: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                is_search: false,

                idx: -1,
                id: -1,
                editVisible: false,
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
                imageUrl: '',
                goodsCat:[],
                showMore: false,
                shopList: [],
                checked1: false,
                checked2: false,
                startDataCK:'',
                endDataCK:'',
                startDataJS:'',
                endDataJS:'',
                isPintuan: false,
                isQuan: false
            }
        },
        components:{
            
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
            
            // 员工详情
            handle1(index, row) {
                if(row){
                    this.idx = index;
                    this.id = row.id;
                    this.form = {
                        a: row.a,
                        b: row.b,
                        c: row.c,
                    }
                }else{
                    this.idx = '-1';
                    this.id = '';
                    this.imageUrl = '';
                    this.form = {
                        a: '',
                        b: '',
                        c: '',
                    }
                }
                
                this.editVisible = true;
            },
            handle2(index, row){
                
            }
        },
        mounted(){
            const t = this;
            // 员工列表
            stockService.getOutStockList().then((res)=>{
                t.list = res;
            });
            t.goodsCat = t.$GD.goodsCat;
            t.$commonService.getShopList().then((res)=>{
                t.shopList = res
            })
        }
    }
</script>
<style scoped>
    
</style>
