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
                <el-button type="primary" icon="el-icon-circle-plus-outline" class="handle-del right" @click="handle2">新增</el-button>

            </div>

            <el-table :data="list"  border class="table top20" ref="multipleTable" @selection-change="handleSelectionChange">
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                <el-table-column type="index" label="序号"  width="50" align='center'></el-table-column>
                <el-table-column prop="b" label="项目分类名称" width="120"></el-table-column>
                <el-table-column prop="c" label="项目数"></el-table-column>
                <el-table-column prop="c" label="技师数"></el-table-column>
                <el-table-column prop="c" label="创建时间"></el-table-column>
                <el-table-column label="操作" width="150" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handle1(scope.$index, scope.row)">修改</el-button>
                        <el-button size="mini" type="danger" @click="handle2(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="添加分类" :visible.sync="editVisible" width="500px">
             <el-form ref="form" :model="form"  :rules="rules"   label-width="80px">
                <el-form-item label="分类名称" prop="a" style="" class="">
                    <el-input v-model="form.a" placeholder="输入项目名称"></el-input>
                </el-form-item>
                <el-form-item label="分类序号" prop="a" style="" class="">
                    <el-input v-model="form.a" placeholder=""></el-input>
                </el-form-item>
                 <el-form-item label="门店照片" prop="a">
                    <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                    :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                    </el-upload>

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
    import {orderService} from '../../../service/order';
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

                xmfl: '',
                xmflList: [],
                startData: '',
                endData: '',
                isTuijian: false,
                isPintuan: false
            }
        },
        components:{
            
        },
        methods:{
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
            handleRemove(file, fileList) {
                console.log(file, fileList);
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
            handle1(index, row) {

            },
            handle2(index, row) {
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
            orderService.getProjectCatList().then((res)=>{
               t.list = res;
           })

        }
    }
</script>
<style scoped>
    
</style>
