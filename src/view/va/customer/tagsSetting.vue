<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item> {{this.$route.meta.title}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class=" clearfix">
                <el-button type="primary" icon="el-icon-circle-plus-outline" class="handle-del right" @click="handleEdit">新增</el-button>
            </div>
            <el-table :data="list"  border class="table top20" ref="multipleTable">
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                <!-- <el-table-column type="index" label="编号"  width="50" align='center'></el-table-column> -->
                <el-table-column prop="tagsClassName" label="分类" width=""></el-table-column>
                <el-table-column prop="tagList" label="标签" width=""></el-table-column>
                <el-table-column label="操作" width="150px" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

        </div>

        <!-- 新增 -->
       <el-dialog :title="idx==-1?'新增':'编辑'" :visible.sync="editVisible" width="400px">
            <el-form ref="form" :model="form" :rules="rules" label-width="60px">
                <el-form-item label="分类">
                    <el-input v-model="form.tagsClassName"></el-input>
                </el-form-item>
                <el-form-item label="标签">
                    <el-tag :key="tag" v-for="tag in form.tagList" closable :disable-transitions="false" @close="handleClose(tag)" class="right5">
                    {{tag}}
                    </el-tag>
                    <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="mini" @keyup.enter.native="handleInputConfirm"
                    @blur="handleInputConfirm">
                    </el-input>
                    <el-button v-else class="button-new-tag" size="mini" @click="showInput">+ 新增标签</el-button>
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
                <el-button type="primary" @click="deleteRow()">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script>
    import bus from '../../../bus';
    import {customerService} from '../../../service/customer';

    const Form = {
        id: '',
        tagsClassName: '',
        tagList: [],
    }
    export default {
        data() {
            return {
                list: [],
                form: JSON.parse(JSON.stringify(Form)),
                rules: {
                    a: [
                        { required: true, message: '请选择类型', trigger: 'change' },
                    ]
                },
                idx: -1,
                id: -1,
                editVisible: false,
                delVisible: false,
                tagFl: '',
                tagFlList: [],
                inputVisible: false,
                inputValue: ''
            }
        },
        components:{
            
        },
        methods:{
            handleClose(tag) {
                this.form.tagList.splice(this.form.tagList.indexOf(tag), 1);
            },
            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.form.tagList.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },
            handleDelete(index, row){
                const t = this;
                this.idx = index;
                this.id = row.id;
                this.row = row;
                t.delVisible = true;
            },
            handleEdit(index, row){
                const t = this;
                if(row){
                    t.idx = index;
                    t.row = row;
                    t.form = JSON.parse(JSON.stringify(t.row));
                    t.form.tagList = t.form.tagList.split(',');

                }else{
                   t.idx = '-1';
                   t.form = JSON.parse(JSON.stringify(Form));

                }
                t.viewVisible = false;
                t.editVisible = true;
            },
            // 保存编辑
            saveEdit(form) {
                const t = this;
                t.$refs[form].validate((valid) => {
                    if (valid) {
                        let params = {};
                        t.editVisible = false;
                        for(let key in Form){
                            params[key] = t.form[key]
                        }
                        params.tagList = params.tagList.join(',')

                        if(t.idx == '-1'){
                            customerService.userTagsAdd(params).then((res)=>{
                                t.getUserTagsList()
                            })
                        }else{
                            customerService.userTagsEdit(params).then((res)=>{
                                t.getUserTagsList()
                            })
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            // 确定删除
            deleteRow(){
                const t = this;
                let parmas = {
                    id: this.id
                }
                customerService.serTagsDelete(parmas).then((res)=>{
                    this.$message.success('删除成功');
                    this.delVisible = false;
                    t.getUserTagsList();
                })
            },
            getUserTagsList(){
                const t = this;
                t.list = [];
                customerService.getUserTagsList().then((res)=>{
                    t.list = res;
                })
            }

        },
        mounted(){
            const t = this;
            t.getUserTagsList();
        }
    }
</script>
<style scoped>
.button-new-tag {
    margin-left: 5px;
    height: 24px;
    line-height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}
.input-new-tag {
    width: 90px;
    margin-left: 5px;
    vertical-align: bottom;
}
</style>
