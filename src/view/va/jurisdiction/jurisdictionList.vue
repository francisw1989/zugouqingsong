<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item> {{this.$route.meta.title}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="clearfix">
                <el-button type="primary" class="right" @click="handleEdit">新增</el-button>
            </div>
            <el-table :data="list"  border class="table top20" ref="multipleTable">
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                <!-- <el-table-column type="index" label="序号"  width="50" align='center'></el-table-column> -->
                <el-table-column prop="a" label="权限名称" width="150"></el-table-column>
                <el-table-column prop="b" label="状态" width="120"></el-table-column>
                <el-table-column prop="c" label="描述"></el-table-column>
                <el-table-column label="操作" width="160" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                </el-pagination>
            </div>
        </div>
        <el-dialog :title="idx==-1?'新增权限':'编辑权限'" :visible.sync="editVisible" width="1000px">
            <el-row style="border: 1px solid #ebeef5">
                <el-col :span="10">
                    <p class="center pad10" style="background-color: #f1f1f1">权限信息</p>
                    <div class="pad20">
                        <el-form ref="form" :model="form" :rules="rules" label-width="90px" class="">
                            <el-form-item label="权限名称" prop="a">
                                <el-input v-model="form.a"></el-input>
                            </el-form-item>
                            <el-form-item label="权限状态" prop="a">
                                <el-switch v-model="form.isOpen" class="left10"></el-switch>
                            </el-form-item>
                            
                            <el-form-item label="权限描述" prop="a">
                                <el-input v-model="form.a" type="textarea"></el-input>
                            </el-form-item>
                            
                            
                        </el-form>
                    </div>
                </el-col>
                <el-col style="border-left: 1px solid #ebeef5" :span="14">
                    <p class="center pad10" style="background-color: #f1f1f1">权限分配</p>
                    <div class="pad20">
                        <el-table :data="menuList"  border class="table "
                            row-key="id" default-expand-all
                            @selection-change="handleSelectionChange"
                            :tree-props="{children: 'sysMenu'}"
                        >
                            <el-table-column type="selection" width="55" align="center"></el-table-column>
                            <el-table-column prop="menuName" label="菜单名称" width=""></el-table-column>
                        </el-table>
                    </div>
                </el-col>
            </el-row>
            
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit('form')">确 定</el-button>
            </span>
        </el-dialog>




    </div>
</template>
<script>
    import bus from '../../../bus';
    import {jurisdictionService} from '../../../service/jurisdiction';
    
    export default {
        data() {
            return {
                list: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                form: {
                    a: '',
                    b: '',
                    c: '',
                    isOpen: true
                },
                rules: {
                    a: [
                        { required: true, message: '请选择类型', trigger: 'change' },
                    ]
                },
                idx: -1,
                id: -1,
                editVisible: false,
                menuList: [],
                multipleSelection: []
            }
        },
        components:{
            
        },
        methods:{
            handleSelectionChange(val) {
                this.multipleSelection = val;
                console.log(this.multipleSelection)
            },
            // 保存编辑
            saveEdit() {
                this.editVisible = false;
                this.$message.success(`修改第 ${this.idx+1} 行成功`);
                if(this.tableData[this.idx].id === this.id){
                    this.$set(this.tableData, this.idx, this.form);
                }else{
                    for(let i = 0; i < this.tableData.length; i++){
                        if(this.tableData[i].id === this.id){
                            this.$set(this.tableData, i, this.form);
                            return ;
                        }
                    }
                }
            },
            handleEdit(index, row) {
                if(row){
                    this.idx = index;
                    this.id = row.id;
                    this.form = row;
                }else{
                    this.idx = '-1';
                    this.id = '';
                    this.form = {
                        a: '',
                        b: '',
                        c: '',
                        isOpen: true
                    }
                }
                
                this.editVisible = true;
            },
            handleDelete(){

            },
           
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            
            

        },
        mounted(){
            const t = this;
            jurisdictionService.getJurisdictionList().then((res)=>{
                t.list = res;
            });

            jurisdictionService.getSysMenuList().then((res)=>{
                t.menuList = res;
                console.log(t.menuList);
            });
            
            

        }
    }
</script>
<style scoped>

</style>
