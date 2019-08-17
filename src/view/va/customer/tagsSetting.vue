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
                <el-button type="primary" icon="el-icon-circle-plus-outline" class="handle-del right" @click="edit">新增</el-button>
            </div>
            <el-table :data="list"  border class="table top20" ref="multipleTable">
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                <!-- <el-table-column type="index" label="编号"  width="50" align='center'></el-table-column> -->
                <el-table-column prop="a" label="分类" width=""></el-table-column>
                <el-table-column prop="b" label="标签" width=""></el-table-column>
                <el-table-column label="操作" width="100px" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="edit(scope.$index, scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>

        </div>

        <!-- 新增 -->
       <el-dialog :title="idx==-1?'新增':'编辑'" :visible.sync="editVisible" width="400px">
            <el-form ref="form" :model="form" :rules="rules" label-width="60px">
                <el-form-item label="分类">
                    <el-select class="left5" v-model="tagFl" placeholder="" filterable>
                        <el-option v-for="(item, index) in tagFlList" :key="index" :value="item"  :label="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="标签">
                    <el-tag :key="tag" v-for="tag in form.tags" closable :disable-transitions="false" @close="handleClose(tag)" class="right5">
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


    </div>
</template>
<script>
    import bus from '../../../bus';
    import {staffService} from '../../../service/staff';
    import {orderService} from '../../../service/order';

    export default {
        data() {
            return {
                list: [],
                form: {
                    a: '',
                    b: '',
                    c: '',
                    tags: ['但是', '大所属']
                },
                rules: {
                    a: [
                        { required: true, message: '请选择类型', trigger: 'change' },
                    ]
                },
                idx: -1,
                id: -1,
                editVisible: false,
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
                this.form.tags.splice(this.form.tags.indexOf(tag), 1);
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
                    this.form.tags.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
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

            edit(index, row){
                if(row){
                    this.idx = index;
                    this.id = row.id;
                    this.form = row;
                }else{
                    this.idx = -1000;
                    this.id = '';
                    this.form = {
                        a: '',
                        b: '',
                        c: '',
                        tags: ['但是', '大所属']
                    };
                }
                
                console.log(this.form)
                this.editVisible = true;
            },


        },
        mounted(){
            const t = this;

            // 岗位列表
            t.$commonService.getTagsList().then((res)=>{
                t.list = res;
            });
            t.tagFlList = t.$GD.tagFlList;
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
