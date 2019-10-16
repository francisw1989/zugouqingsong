<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item> {{this.$route.meta.title}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div>
                <el-radio-group v-model="type"  @change='typeChange'>
                    <el-radio-button :label="i"  v-for="(v, i) in typeList" :key="i" >{{v}}</el-radio-button>
                </el-radio-group>
            </div>
            <div class=" clearfix top10">
                <el-button type="primary" class="right" @click="handle1">新增</el-button>
                <el-input v-model="select_word" placeholder="订单编号、商品名称、接收员、配送员" class="handle-input"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="search" class="left10">搜索</el-button>

            </div>


            
            <el-table :data="list"  border class="table top20" ref="multipleTable">
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                <!-- <el-table-column type="index" label="序号"  width="50" align='center'></el-table-column> -->
                <el-table-column prop="a" label="商品编号" sortable width="150"></el-table-column>
                <el-table-column prop="b" label="商品名称" width="120"></el-table-column>
                <el-table-column prop="c" label="成本价格（元）"></el-table-column>
                <el-table-column v-if="type==0" prop="c" label="销售价格（元）"></el-table-column>
                <el-table-column v-if="type==0"  prop="c" label="购买人"></el-table-column>
                <el-table-column v-if="type==1"  prop="c" label="定取人"></el-table-column>
                <el-table-column prop="c" label="商品订单号"></el-table-column>
                <el-table-column prop="c" label="服务时间"></el-table-column>
                <el-table-column prop="c" label="数量"></el-table-column>
                <el-table-column prop="c" label="单位"></el-table-column>
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
    import {stockService} from '../../../service/stockByStore';
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
                isQuan: false,
                typeList:['物料', '商品'],
                type: '0',
            }
        },
        components:{
            
        },
        methods:{
            typeChange(e){
                const t = this;
                console.log(e)
                t.type = e;
            },

            

            handleCurrentChange(val) {
                this.cur_page = val;
                this.list();
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
                
            },
            getList(){
                const t = this;
                stockService.getStoreOutRecordList().then((res)=>{
                    t.list = res;
                });
            }
        },
        mounted(){
            const t = this;
            t.getList()            
            
        }
    }
</script>
<style scoped>
    
</style>
