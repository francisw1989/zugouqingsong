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
            <el-table :data="list"  border class="table top20" >
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                <!-- <el-table-column type="index" label="序号"  width="50" align='center'></el-table-column> -->
                <el-table-column prop="roleName" label="权限名称" width="150"></el-table-column>
                <!-- <el-table-column prop="roleStatusName" label="状态" width="120"></el-table-column> -->
                <el-table-column prop="roleDesc" label="描述"></el-table-column>
                <el-table-column label="操作" width="160" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="dodelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                </el-pagination>
            </div> -->
        </div>
        <el-dialog :title="idx==-1?'新增权限':'编辑权限'" :visible.sync="editVisible" width="700px">
            <el-row style="border: 1px solid #ebeef5" v-if="editVisible">
                <el-col :span="15">
                    <p class="center pad10" style="background-color: #f1f1f1">权限信息</p>
                    <div class="pad20">
                        <el-form ref="form" :model="form" :rules="rules" label-width="90px" class="">
                            <el-form-item label="权限名称" prop="roleName">
                                <el-input v-model="form.roleName"></el-input>
                            </el-form-item>
                           <!-- <el-form-item label="权限状态">
                                <el-switch v-model="form.roleStatus" class="left10"></el-switch>
                            </el-form-item> -->
                            <el-form-item label="权限描述" prop="roleDesc">
                                <el-input v-model="form.roleDesc" type="textarea"></el-input>
                            </el-form-item>
                            
                            
                        </el-form>
                    </div>
                </el-col>
                <el-col style="border-left: 1px solid #ebeef5" :span="9">
                    <p class="center pad10" style="background-color: #f1f1f1">权限分配</p>
                    <div class="pad20">
                        <el-tree
                        ref="tree"
                        :data="menuList"
                        show-checkbox
                        node-key="id"
                        default-expand-all
                        check-on-click-node
                        :default-checked-keys="form.sysMenuIds"
                        :props="defaultProps">
                        </el-tree>
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
    import {commonService} from '../../../service/common';
    const Form = {
        id: '',
        roleName: '',
        roleStatus: true,
        roleDesc: '',
        menuIds: []
    }
    export default {
        data() {
            return {
                defaultProps: {
                    label: 'menuName',
                    children: 'sysMenu'
                },
                list: [],
                cur_page: 1,
                select_cate: '',
                select_word: '',
                form: {
                    
                },
                rules: {
                    roleName: [
                        { required: true, message: '请输入', trigger: 'change' },
                    ],
                    roleDesc: [
                        { required: true, message: '请输入', trigger: 'change' },
                    ]
                },
                idx: -1,
                id: -1,
                editVisible: false,
                menuList: [],
            }
        },
        components:{
            
        },
        methods:{
            
            // 保存编辑
            saveEdit(form) {
                const t = this;
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        let params = {};
                        t.editVisible = false;
                        for(let key in Form){
                            params[key] = t.form[key]
                        }
                        params.roleStatus = params.roleStatus?'1':'0';
                        params.menuIds = t.$refs.tree.getCheckedNodes(false, true).map((v)=>{return v.id}).join(',')
                        console.log(params.menuIds)
                        if(t.idx != -1){
                            jurisdictionService.save(params).then(()=>{
                                t.getList();
                            });
                        }else{
                            jurisdictionService.add(params).then(()=>{
                                t.getList();
                            });
                        }
                        
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            handleEdit(index, row) {
                const t = this;
                
                
                
                if(row){
                    t.idx = index;
                    t.id = row.id;
                    t.form = row;
                    t.form.roleStatus ==0 ? false: true;
                    // t.form.sysMenuIds = '1,3'
                }else{
                    t.idx = '-1';
                    t.id = '';
                    t.form = JSON.parse(JSON.stringify(Form))
                }
                this.editVisible = true;
                
                
                
                
            },
            handleDelete(){

            },
           
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            getList(){
                const t = this;
                jurisdictionService.getList().then((res)=>{
                    for(const v of res.records){
                        v.roleStatusName = v.roleStatus==0?'禁用':'启用'
                    }
                    t.list = res.records;
                });
            },
            dodelete(index, row){
                const t = this;
                let params = {
                    id: row.id
                }
                this.$confirm('确认删除？').then(() => {
                    jurisdictionService.delete(params).then((res)=>{
                        this.$message.success('删除成功！');
                        t.getList();
                    })
                }).catch(_ => {});
            },
            
            

        },
        mounted(){
            const t = this;
            t.getList();
            commonService.getSysMenu().then((res)=>{
                t.menuList = res;
            });
            // jurisdictionService.getSysMenuList().then((res)=>{
            //     t.menuList = res;
            //     console.log(t.menuList);
            // });
            
            

        }
    }
</script>
<style scoped>

</style>
