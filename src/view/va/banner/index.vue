<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item> {{this.$route.meta.title}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box align-right">
                <el-button type="primary" icon="el-icon-circle-plus-outline" class="handle-del" @click="handleEdit">新增</el-button>
                <!-- <el-button type="danger" icon="el-icon-delete" class="handle-del left10" @click="delAll">批量删除</el-button> -->
            </div>
            <el-table :data="list"  border class="table top10" ref="multipleTable" @selection-change="handleSelectionChange">
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                <el-table-column type="index" label="序号"  width="50" align='center'></el-table-column>
                <el-table-column prop="a" label="banner大图" sortable width="150">
                </el-table-column>
                <el-table-column prop="b" label="类型" width="120">
                </el-table-column>
                <el-table-column prop="c" label="状态">
                </el-table-column>
                <el-table-column prop="c" label="创建时间">
                </el-table-column>
                <el-table-column label="操作" width="220" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" @click="handlePublish(scope.$index, scope.row)">发布</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog :title="idx==-1?'新增':'编辑'" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" :rules="rules" label-width="60px">
                <el-form-item label="类型" prop="a">
                    <el-select v-model="form.a" placeholder="请选择类型" filterable>
                        <el-option v-for="item in bannerTypeList" :key="item.name" :label="item.name" :value="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="图片">
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

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" left>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import bus from '../../../bus';
    import {bannerService} from '../../../service/banner';
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
                editVisible: false,
                delVisible: false,
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
                bannerTypeList: [],
                bannerTypeSel: '技师',
                imageUrl: '',
                
            }
        },
        computed:{
            
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
            delAll() {
                const length = this.multipleSelection.length;
                let str = '';
                this.del_list = this.del_list.concat(this.multipleSelection);
                console.log(this.multipleSelection)
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].a + ' ';
                }
                this.$message.error('删除了' + str);
                this.multipleSelection = [];
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
            handlePublish(index, row){

            },

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
            handleDelete(index, row) {
                this.idx = index;
                this.id = row.id;
                this.delVisible = true;
            },
             // 保存编辑
            saveEdit(form) {
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        this.editVisible = false;
                        this.$message.success(`修改第 ${this.idx+1} 行成功`);
                        if(this.list[this.idx].id === this.id){
                            this.$set(this.list, this.idx, this.form);
                        }else{
                            for(let i = 0; i < this.list.length; i++){
                                if(this.list[i].id === this.id){
                                    this.$set(this.list, i, this.form);
                                    return ;
                                }
                            }
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
                
            },
            // 确定删除
            deleteRow(){
                this.$message.success('删除成功');
                this.delVisible = false;
                if(this.list[this.idx].id === this.id){
                    this.list.splice(this.idx, 1);
                }else{
                    for(let i = 0; i < this.list.length; i++){
                        if(this.list[i].id === this.id){
                            this.list.splice(i, 1);
                            return ;
                        }
                    }
                }
            }
        },
        mounted(){
           const t = this;
           bannerService.getBannerList().then((res)=>{
               t.list = res;
           })
           bannerService.getBannerTypeList().then((res)=>{
               t.bannerTypeList = res;
           })
        }
    }
</script>
<style scoped>
    
</style>
