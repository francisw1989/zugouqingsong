<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage">
            <i class="el-icon-menu"></i>
        </div>
        <div class="logo">{{storeName}}</div>
        <div class="header-right">
            <div class="header-user-con">
                
                <!-- 消息中心 -->
                <!-- <div class="btn-bell">
                    <el-tooltip effect="dark" :content="message?`有${message}条未读消息`:`消息中心`" placement="bottom">
                        <router-link to="/tabs">
                            <i class="el-icon-bell"></i>
                        </router-link>
                    </el-tooltip>
                    <span class="btn-bell-badge" v-if="message"></span>
                </div> -->
                <!-- 用户头像 -->
                <div class="user-avator"><img src="../../assets/img/img.jpg"></div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                       欢迎 {{username}} <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command='updatePassword'>修改密码</el-dropdown-item>
                        <el-dropdown-item divided  command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <!-- 全屏显示 -->
                <div class="btn-fullscreen left20" @click="handleFullScreen">
                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                        <i class="el-icon-rank"></i>
                    </el-tooltip>
                </div>
            </div>
        </div>
        <el-dialog :title="'修改密码'" :visible.sync="editVisible" width="400px">
            <el-form ref="form" :model="form" :rules="rules" label-width="90px">
                <el-form-item  label="原密码" prop="oldPassword" :show-password='true'>
                    <el-input v-model="form.oldPassword" show-password></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPassword" :show-password='true'>
                    <el-input v-model="form.newPassword" show-password></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="conifrmPassword" :show-password='true'>
                    <el-input v-model="form.conifrmPassword" show-password></el-input>
                </el-form-item>
                
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="updatePassword('form')">确 定</el-button>
            </span>
        </el-dialog>
    </div>
    
</template>
<script>
import bus from '../../bus';
import {commonService} from '../../service/common';
import {accountService} from '../../service/account';
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
            } else if (value != this.form.newPassword) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            editVisible: false,
            collapse: false,
            fullscreen: false,
            name: 'francis',
            message: 2,
            title: '',
            form: {
                oldPassword: '',
                newPassword: '',
                conifrmPassword: '',
            },
            rules: {
                oldPassword: [
                    { required: true, message: '请输入',  trigger: 'blur' },
                    { validator: validatePass },
                ],
                newPassword: [
                    { required: true, message: '请输入',  trigger: 'blur' },
                    { validator: validatePass },
                ],
                conifrmPassword: [
                    { validator: validatePass2 ,trigger: 'blur' },
                ],
            },
        }
    },
    computed:{
        username(){
            let userInfo = JSON.parse(localStorage.userInfo);
            let username = '';
            if(userInfo){
                return userInfo.account || userInfo.employeeName;
            }else{
                return this.name
            }
        },
        storeName(){
            const t = this;
            let userInfo = JSON.parse(localStorage.userInfo);
            if(userInfo.stores && userInfo.stores.name){
                return userInfo.stores.name + ' 门店管理系统'
            }else{
                return t.$GD.sysName
            }
            
        }
    },
    methods:{
        updatePassword(form){
            const t = this;
            this.$refs[form].validate((valid) => {
                if (valid) {
                    let params = {
                        userId: JSON.parse(localStorage.userInfo).id,
                        type: localStorage.sysRoute=='vb'? '1':'0',
                        oldPassword: t.form.oldPassword,
                        newPassword: t.form.newPassword
                    }
                    accountService.updatePassword(params).then((res)=>{
                        this.$message.success('修改成功，请重新登录');
                        setTimeout(() => {
                            localStorage.removeItem('token');
                            this.$router.push('/login?'+localStorage.sysRoute||'vb');
                        }, 2000);
                    })
                        
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
                
            },
            // 用户名下拉菜单选择事件
            handleCommand(command) {
                const t = this;
                if(command == 'loginout'){
                    accountService.logout().then(()=>{
                        localStorage.removeItem('token');
                        this.$router.push('/login?'+localStorage.sysRoute||'vb');
                    })
                }
                if(command == 'updatePassword'){
                    t.editVisible = true;
                    
                }
            },
            // 侧边栏折叠
            collapseChage(){
                this.collapse = !this.collapse;
                bus.$emit('collapse', this.collapse);
            },
            // 全屏事件
            handleFullScreen(){
                let element = document.documentElement;
                if (this.fullscreen) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                } else {
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if (element.webkitRequestFullScreen) {
                        element.webkitRequestFullScreen();
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if (element.msRequestFullscreen) {
                        // IE11
                        element.msRequestFullscreen();
                    }
                }
                this.fullscreen = !this.fullscreen;
            }
        },
        mounted(){
            const t = this;
            if(document.body.clientWidth < 1500){
                // this.collapseChage();
            }
            t.title = t.$GD.sysName;
        }
    }
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        color: #fff;
    }
    .collapse-btn{
        float: left;
        padding: 0 21px;
        cursor: pointer;
        line-height: 70px;
    }
    .header .logo{
        float: left;
        width:250px;
        line-height: 70px;
    }
    .header-right{
        float: right;
        padding-right: 20px;
    }
    .header-user-con{
        display: flex;
        height: 70px;
        align-items: center;
    }
    .btn-fullscreen{
        transform: rotate(45deg);
        margin-right: 5px;
        font-size: 24px;
    }
    .btn-bell, .btn-fullscreen{
        position: relative;
        width: 30px;
        height: 30px;
        text-align: center;
        border-radius: 15px;
        cursor: pointer;
    }
    .btn-bell-badge{
        position: absolute;
        right: 0;
        top: -2px;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background: #f56c6c;
        color: #fff;
    }
    .btn-bell .el-icon-bell{
        color: #fff;
    }
    .user-name{
        margin-left: 10px;
    }
    .user-avator{
        margin-left: 20px;
    }
    .user-avator img{
        display: block;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-link{
        color: #fff;
        cursor: pointer;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
</style>
