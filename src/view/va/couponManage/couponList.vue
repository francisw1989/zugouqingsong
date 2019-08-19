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
                <el-input v-model="select_word" placeholder="请输入商品编号或名称" class="handle-input"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="search" class="left10">搜索</el-button>
                
                <span class="left20">优惠券类型</span>
                <el-select class="left10" v-model="yhqType" placeholder="请选择类型" filterable>
                    <el-option v-for="item in yhqTypeList" :key="item" :label="item" :value="item"></el-option>
                </el-select>
                <span class="left20">优惠券范围</span>
                <el-select class="left10" v-model="yhqFw" placeholder="请选择" filterable>
                    <el-option v-for="item in yhqFwList" :key="item" :label="item" :value="item"></el-option>
                </el-select>

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
        <el-dialog :title="idx==-1?'新增':'查看'" :visible.sync="editVisible" width="450px">
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
                <el-form-item label="销售价" prop="a">
                    <el-input v-model="form.a"></el-input>
                </el-form-item>
                <el-form-item label="单位" prop="a">
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
    import {couponService} from '../../../service/coupon';
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
                yhqType: '',
                yhqTypeList: [],
                yhqFw: '',
                yhqFwList: '',
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
            couponService.getCouponList().then((res)=>{
                t.list = res;
            });
            t.yhqTypeList = t.$GD.yhqTypeList;
            t.yhqFwList = t.$GD.yhqFwList;

        }
    }
</script>
<style scoped>
    
</style>
