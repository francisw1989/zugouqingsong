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
                <el-input v-model="select_word" placeholder="订单编号、商品名称、接收员、采购员" class="handle-input"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="search" class="left10">搜索</el-button>
            </div>


            
            <el-table :data="list"  border class="table top20" ref="multipleTable">
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                <!-- <el-table-column type="index" label="序号"  width="50" align='center'></el-table-column> -->
                <el-table-column prop="a" label="编号" sortable width="150"></el-table-column>
                <el-table-column prop="b" label="物品名称" width="120"></el-table-column>
                <el-table-column prop="c" label="分类"></el-table-column>
                <el-table-column prop="c" label="采购时间"></el-table-column>
                <el-table-column prop="c" label="配送员"></el-table-column>
                <el-table-column prop="c" label="配送员手机号"></el-table-column>
                <el-table-column prop="c" label="接收时间"></el-table-column>
                <el-table-column prop="c" label="接收员"></el-table-column>
                <el-table-column prop="c" label="成本价"></el-table-column>
                <el-table-column prop="c" label="数量"></el-table-column>
                <el-table-column prop="c" label="成本总价"></el-table-column>
                <el-table-column prop="c" label="状态"></el-table-column>
                <el-table-column label="操作" width="150" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handle1(scope.$index, scope.row)">撤销</el-button>
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
                <el-form-item label="商品名称" prop="a">
                    <el-input v-model="form.a"></el-input>
                </el-form-item>
                <el-form-item label="商品类别" prop="a">
                    <el-select v-model="form.a" placeholder="请选择类型" filterable>
                        <el-option v-for="item in goodsCat" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="成本价" prop="a">
                    <el-input v-model="form.a"></el-input>
                </el-form-item>
                <el-form-item label="单位" prop="a">
                    瓶
                </el-form-item>
                <el-form-item label="退货时间" prop="a">
                    <el-date-picker v-model="form.a" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="数量" prop="a">
                    <el-input v-model="form.a"></el-input>
                </el-form-item>
                <el-form-item label="采购员" prop="a">
                    <el-input v-model="form.a"></el-input>
                </el-form-item>
                <el-form-item label="商品图片">
                    <el-upload action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="upImgSuccess" :on-change='upImgChange' :before-upload="beforeImgUpload">
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                    <img v-if="imageUrl" :src="imageUrl" class="el-upload-img top10">
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
                checked1: false,
                checked2: false,
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
                typeList:['所有采购记录', '已采购', '配送中'],
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
            upImgChange(res){
                this.imageUrl = URL.createObjectURL(res.raw);
            },
            upImgSuccess(res, file) {
                debugger
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeImgUpload(file) {
                console.log(file)
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG && !isPNG) {
                    this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M && isPNG;
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
            getList(){
                const t = this;
                stockService.getStoreArticleStockList().then((res)=>{
                    t.list = res;
                });
            }
        },
        mounted(){
            /* const t = this;
            // 门店物料入库查询
            stockService.getStoreArticleStockList().then((res)=>{
                t.list = res;
            });
            t.goodsCat = t.$GD.goodsCat; */
			const t = this;
			t.getList()       
        }
    }
</script>
<style scoped>
    
</style>
