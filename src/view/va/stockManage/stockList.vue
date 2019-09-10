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
                <el-button type="primary" class="right" @click="handleEdit">新增</el-button>
                <el-input v-model="chose" placeholder="请输入商品编号或名称" class="handle-input"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="search" class="left10">搜索</el-button>
                <el-checkbox v-model="checked1" class="left40">商品</el-checkbox>
                <el-checkbox v-model="checked2">物料</el-checkbox>
            </div>


            
            <el-table :data="list"  border class="table top20" ref="multipleTable">
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                <!-- <el-table-column type="index" label="序号"  width="50" align='center'></el-table-column> -->
                <el-table-column prop="articleId" label="商品编号" sortable width="150"></el-table-column>
                <el-table-column prop="articleName" label="商品名称" width="120"></el-table-column>
                <el-table-column prop="articleTypeName" label="商品类别"></el-table-column>
                <el-table-column prop="costPrice" label="成本价格（元）"></el-table-column>
                <el-table-column prop="salesPrice" label="销售价格（元）"></el-table-column>
                <el-table-column prop="count" label="数量"></el-table-column>
                <el-table-column prop="unit" label="单位"></el-table-column>
                <el-table-column label="操作" width="150" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleDetail(scope.$index, scope.row)">查看</el-button>
                        <el-button size="mini" type="danger" @click="handle2(scope.$index, scope.row)">停用</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :page-size='pageSize' :total="total">
                </el-pagination>
            </div>
        </div>

        <!-- 新增 -->
        <el-dialog :title="idx==-1?'新增':'编辑'" :visible.sync="editVisible" width="450px">
            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                <el-form-item label="商品名称" prop="articleName">
                    <el-input v-model="form.articleName"></el-input>
                </el-form-item>
                <el-form-item label="商品类别" prop="articleType">
                    <el-select v-model="form.articleType" placeholder="请选择类型" filterable>
                        <el-option v-for="item in goodsCat" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="成本价" prop="costPrice">
                    <el-input v-model="form.costPrice"></el-input>
                </el-form-item>
                <el-form-item label="销售价" prop="salesPrice">
                    <el-input v-model="form.salesPrice"></el-input>
                </el-form-item>
                <el-form-item label="单位" prop="unit">
                    <el-input v-model="form.unit"></el-input>
                </el-form-item>
                <el-form-item label="商品图片" prop="imgs">
                    <el-upload 
                         action="" 
                         :show-file-list="false" 
                         :on-change='getFile'
                         :before-upload="beforeImgUpload"
                         :auto-upload='false'>
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                <el-form-item label="商品图片" prop="imgs">
                    <img v-if="form.imgs" :src="form.imgs" class="el-upload-img top10">
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit('form')">确 定</el-button>
            </span>
        </el-dialog>

         <!-- 查看 -->
        <el-dialog title="详情" :visible.sync="viewVisible" width="40%">
            <StoreDetail :row='row' :info='info'></StoreDetail>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="viewVisible = false">关 闭</el-button>
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
                chose: '',
                is_search: false,
                idx: -1,
                id: -1,
                row: {},
                viewVisible: false,
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
                total: 0,
                pageSize: 10,
                pageNumber: 1,
                info: {}
            }
        },
        components:{
            stockService
        },
        methods:{
             getFile(file, fileList){
                const t = this;
                t.$commonService.getBase64(file.raw).then((Base64)=>{
                    t.$commonService.upload(Base64).then((res)=>{
                        t.form.icon = res.netUrl
                    })
                })
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
                this.getPlatformArticleStockList();
            },
            search() {
                // this.is_search = true;
                const t = this;
                t.getPlatformArticleStockList();
            },
            
            // 物料库存详情
            handleDetail(index, row) {
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
                
                this.viewVisible = true;
            },
             // 物料库存新增
            handleEdit(index, row) {
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
            getPlatformArticleStockList(){
                const t = this;
                t.list = [];
                let params = {
                    pageSize: t.pageSize,
                    pageNumber: t.pageNumber,
                    chose: t.chose
                }
                if(t.checked1 && !t.checked1){
                    params.articleType =1
                }else if(!t.checked1 && t.checked2){
                    params.articleType =2
                }
                stockService.getPlatformArticleStockList(params).then((res)=>{
                    for(const v of res.records){
                        v.articleTypeName = v.articleType == 1 ? '商品' : '物料';
                    }
                    t.list = res.records;
                    t.total = res.total
                })
            }
        },
        mounted(){
            const t = this;
            t.getPlatformArticleStockList();
            t.goodsCat = t.$GD.goodsCat;

        }
    }
</script>
<style scoped>
    
</style>
