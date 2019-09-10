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
                <el-input v-model="chose" placeholder="订单编号、商品名称、接收员、采购员" class="handle-input"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="search" class="left10">搜索</el-button>
            </div>


            
            <el-table :data="list"  border class="table top20" ref="multipleTable">
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                <!-- <el-table-column type="index" label="序号"  width="50" align='center'></el-table-column> -->
                <el-table-column prop="articleId" label="编号" sortable width="150"></el-table-column>
                <el-table-column prop="articleName" label="商品名称" width="120"></el-table-column>
                <el-table-column prop="articleType" label="商品类别"></el-table-column>
                <el-table-column prop="supplierName" label="供货商"></el-table-column>
                <el-table-column prop="inTime" label="采购时间"></el-table-column>
                <el-table-column prop="signatureName" label="采购员"></el-table-column>
                <el-table-column prop="inTime" label="接收时间"></el-table-column>
                <el-table-column prop="signatureName" label="收货员"></el-table-column>
                <el-table-column prop="costPrice" label="成本单价（元）"></el-table-column>
                <el-table-column prop="count" label="数量"></el-table-column>
                <el-table-column prop="totalPrice" label="总计"></el-table-column>
                <el-table-column label="操作" width="150" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleDetail(scope.$index, scope.row)">查看</el-button>
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
                <el-form-item label="单位" prop="unit">
                    <el-input v-model="form.unit"></el-input>
                </el-form-item>
                <el-form-item label="进货时间" prop="inTime">
                    <el-date-picker v-model="form.inTime" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="数量" prop="count">
                    <el-input v-model="form.a"></el-input>
                </el-form-item>
                <el-form-item label="采购员" prop="signatureName">
                    <el-input v-model="form.signatureName"></el-input>
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
            }
        },
        components:{
            
        },
        methods:{
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
            
            //物流入库详情
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
                
                this.editVisible = true;
            },
            
        },
        mounted(){
            const t = this;
            // 员工列表
            stockService.getProcurementList().then((res)=>{
                t.list = res;
            });
            t.goodsCat = t.$GD.goodsCat;

        }
    }
</script>
<style scoped>
    
</style>
