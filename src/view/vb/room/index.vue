<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item> {{this.$route.meta.title}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="select_word" placeholder="请输入房间名称" class="handle-input"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="search" class="left10">搜索</el-button>
                <el-button type="primary" icon="el-icon-circle-plus-outline" class="right" @click="handleEdit">新增</el-button>
            </div>
            <div class="clearfix top20">
                <el-card v-for="(v, i) in list" :key="i" shadow="hover" style="width: 300px;" class="left roomBox">
                    <div slot="header" class="clearfix">
                        <div class="right top5">
                            <i class="el-icon-delete  icon" @click="handleDelete(i, v)" ></i>
                            <i class="el-icon-edit left10 icon" @click="handleEdit(i, v)"></i>
                            <i class="el-icon-view  left10 icon" @click="view(i, v)"></i>

                        </div>
                        <span>101兰花厅</span>
                    </div>
                    <div>
                        <el-tag class="tag">默认标签</el-tag>
                        <el-tag class="tag">默认标签</el-tag>
                        <el-tag class="tag">默认标签</el-tag>
                        <el-tag class="tag">默认标签</el-tag>
                    </div>
                </el-card>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog :title="idx==-1?'新增':'编辑'" :visible.sync="editVisible" width="400px">
            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                <el-form-item label="房间名称" prop="a">
                    <el-input v-model="form.a"></el-input>
                </el-form-item>
                <el-form-item label="可容纳人数" prop="a">
                    <el-input v-model="form.a"></el-input>
                </el-form-item>
                <el-form-item label="房间标签" prop="a">
                    <el-input v-model="form.a" placeholder="请用逗号隔开"></el-input>
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
        <!-- 查看 -->
        <el-dialog title="房间详情" :visible.sync="viewVisible" width="40%">
            <Detail :row='row'></Detail>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="viewVisible = false">关 闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    const Form = {
        a: '',
        b: '',
        c: ''
    }
    import bus from '../../../bus';
    import {roomService} from '../../../service/room';
    import Detail from './detail';
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
                form: JSON.parse(JSON.stringify(Form)),
                rules: {
                    a: [
                        { required: true, message: '请输入', trigger: 'change' },
                    ]
                },
                idx: -1,
                id: -1,
                row: {},
                bannerTypeList: [],
                bannerTypeSel: '技师',
                viewVisible: false
                
                
            }
        },
        components: {
            Detail
        },
        computed:{
            
        },
        methods:{
            view(index, row){
                const t = this;
                t.viewVisible = true;
                this.idx = index;
                this.id = row.id;
                this.row = row;
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
                    this.form = row
                }else{
                    this.idx = '-1';
                    this.id = '';
                    this.form = JSON.parse(JSON.stringify(Form))
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
            del(){
                this.delVisible = true;
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
           roomService.list().then((res)=>{
               t.list = res;
           })

        }
    }
</script>
<style scoped>
    
</style>
