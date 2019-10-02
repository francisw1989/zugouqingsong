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
                <el-table-column prop="account" label="账号" width="150"></el-table-column>
                <el-table-column prop="name" label="姓名" width="120"></el-table-column>
                <el-table-column prop="mobile" label="手机"></el-table-column>
                <el-table-column prop="email" label="邮箱"></el-table-column>
                <el-table-column prop="roleIdName" label="角色"></el-table-column>
                <el-table-column prop="loginTime" label="最后登录时间"></el-table-column>
                <el-table-column prop="loginIp" label="登录ip"></el-table-column>
                <el-table-column prop="statusName" label="状态"></el-table-column>
                <el-table-column label="操作" width="150" align="center">
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
        <el-dialog :title="idx==-1?'新增账号':'修改账号'" :visible.sync="editVisible" width="400px">
            <el-form ref="form" :model="form" :rules="rules" label-width="90px">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="账号" prop="account">
                    <el-input v-model="form.account"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" :show-password='true'>
                    <el-input v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="conifrmPassword" :show-password='true'>
                    <el-input v-model="form.conifrmPassword"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="mobile">
                    <el-input v-model="form.mobile"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item label="角色" prop="roleId">
                    <el-select class="" v-model="form.roleId" placeholder="请选择角色">
                        <el-option v-for="item in jueseList" :key="item.id" :label="item.roleName" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-form-item label="关联员工" prop="a">
                    <el-select class="" v-model="form.a" placeholder="请选择员工">
                        <el-option v-for="item in yuangongList" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item label="备注" prop="a">
                    <el-input v-model="form.a" type="textarea"></el-input>
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
    import {jurisdictionService} from '../../../service/jurisdiction';

    import {accountService} from '../../../service/account';
    const Form = {
        id: '',
        name: '',
        account: '',
        password: '',
        mobile: '',
        email: '',
        roleId: 0,
        remark: ''
    }
    export default {
        data() {
            var validatePass = (rule, value, callback) => {
                if (value.length<6) {
                    callback(new Error('请输入6位数密码'));
                }else{
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value != this.form.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                list: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                is_search: false,
                form: {
                },
                rules: {
                    name: [
                        { required: true, message: '请输入',  },
                    ],
                    account: [
                        { required: true, message: '请输入',  },
                    ],
                    password: [
                        { required: true, message: '请输入',  trigger: 'blur' },
                        { validator: validatePass },
                    ],
                    conifrmPassword: [
                        { validator: validatePass2 ,trigger: 'blur' },
                    ],
                    roleId: [
                        { required: true, message: '请选择',  },
                    ]
                },
                idx: -1,
                id: -1,
                jueseList: [],
                yuangongList: [],
                editVisible: false,
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
                        if(t.idx != -1){
                            accountService.save(params).then(()=>{
                                t.getList();
                            });
                        }else{
                            accountService.add(params).then(()=>{
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
                    this.idx = index;
                    this.id = row.id;
                    this.form = row;
                    this.form.conifrmPassword = this.form.password;
                }else{
                    this.idx = '-1';
                    this.id = '';
                    t.form = JSON.parse(JSON.stringify(Form));
                }
                
                this.editVisible = true;
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
            handleForbid(){
                const t = this;
                let params = {
                    id: row.id
                }
                this.$confirm('确认禁用？').then(() => {
                    jurisdictionService.delete(params).then((res)=>{
                        this.$message.success('禁用成功！');
                        t.getList();
                    })
                }).catch(_ => {});
            },
            radioChange(){
                const t = this;
                console.log(t.neirong)
            },
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getList();
            },
            search() {
                this.is_search = true;
            },
            getList(){
                const t = this;
                accountService.sysUserList().then((res)=>{
                    for(const v of res.records){
                        v.statusName = v.status == 0 ? '禁用' : '启用';
                        v.roleId = Number(v.roleId);
                        let jueseItem = t.jueseList.filter((v2)=>{
                            return v2.id == v.roleId;
                        });
                        
                        v.roleIdName = jueseItem.length?jueseItem[0].roleName : '';
                    }
                    t.list = res.records;
                });
            }

        },
        mounted(){
            const t = this;
            
            
            jurisdictionService.getList().then((res)=>{
                t.jueseList = res.records;
                t.getList();
            });
        }
    }
</script>
<style scoped>

</style>
