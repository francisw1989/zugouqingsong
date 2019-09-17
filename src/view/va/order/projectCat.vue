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
                <el-button type="primary" icon="el-icon-circle-plus-outline" class="handle-del right" @click="handleEdit">新增</el-button>

            </div>

            <el-table :data="list"  border class="table top20" ref="multipleTable" @selection-change="handleSelectionChange">
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                <el-table-column type="index" label="序号"  width="50" align='center'></el-table-column>
                <el-table-column prop="itemClassName" label="项目分类名称" width="120"></el-table-column>
                <el-table-column prop="itemsCount" label="项目数"></el-table-column>
                <el-table-column prop="employeeCount" label="技师数"></el-table-column>
                <el-table-column prop="createTime" label="创建时间"></el-table-column>
                <el-table-column label="操作" width="150" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :page-size='pageSize' :total="total">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="添加分类" :visible.sync="editVisible" width="500px">
             <el-form ref="form" :model="form"  :rules="rules"   label-width="80px">
                <el-form-item label="分类名称" prop="itemClassName" style="" class="">
                    <el-input v-model="form.itemClassName" placeholder="输入项目名称"></el-input>
                </el-form-item>
                <el-form-item label="分类排序" prop="sort" style="" class="">
                    <el-input v-model="form.sort" placeholder=""></el-input>
                </el-form-item>
                 <el-form-item label="分类图片" prop="icon">
                    <el-upload
                    action="" 
                    :show-file-list="false" 
                    :on-change='getFile' 
                    :auto-upload='false'>
                    <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                    <img v-if="form.icon" :src="form.icon" class=" top10" style="max-width: 100%">
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
    import {orderService} from '../../../service/order';
    const Form= {
        id: '',
        itemClassName: '',
        sort: '',
        icon: ''
    }
    export default {
        data() {
            return {
                list: [],
                cur_page: 1,
                multipleSelection: [],
                del_list: [],
                is_search: false,
                editVisible: false,
                delVisible: false,
                form: JSON.parse(JSON.stringify(Form)),
                rules: {
                    itemClassName: [
                        { required: true, message: '请输入项目名称', trigger: 'blur' },
                    ],
                    sort: [
                        { required: true, message: '请输入分类顺序', trigger: 'blur' },
                    ]
                },
                idx: -1,
                id: -1,
                itemClassList: [],
                total: 0,
                pageSize: 10,
                pageNumber: 1
            }
        },
        components:{
            orderService
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
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },

            handleCurrentChange(val) {
                this.cur_page = val;
                this.getItemClassList();
            },
            search() {
                this.is_search = true;
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleEdit(index, row) {
                 const t = this;
                if(row){
                    // 编辑
                    t.idx = index;
                    t.row = row;
                    t.form = t.row;
                }else{
                    // 新增
                    t.idx = '-1';
                    t.id = '';
                    t.form = JSON.parse(JSON.stringify(Form));
                }
                t.editVisible = true;
            },
            handleDelete(index, row) {
                this.idx = index;
                this.id = row.id;
                this.delVisible = true;
            },
            // 保存编辑
            saveEdit(form) {
                 const t = this;
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        let params = {};
                        this.editVisible = false;
                        for(let key in Form){
                            params[key] = t.form[key]
                        }
                        if(t.idx == '-1'){
                            orderService.itemClassAdd(params).then((res)=>{
                                t.getItemClassList()
                            })
                        }else{
                            orderService.itemClassEdit(params).then((res)=>{
                                t.getItemClassList()
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
                orderService.itemClassDelete(parmas).then((res)=>{
                    this.$message.success('删除成功');
                    this.delVisible = false;
                    t.getItemClassList();
                })
            },
            getItemClassList(){
                const t = this;
                t.list = [];
                let params = {
                    pageSize: t.pageSize,
                    pageNumber: t.pageNumber
                }
                orderService.getItemClassList(params).then((res)=>{
                    t.list = res.records;
                    t.total = res.total
                })
            }
        },
        mounted(){
            const t = this;
            t.getItemClassList();
        }
    }
</script>
<style scoped>
    
</style>
