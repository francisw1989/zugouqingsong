<template>
    <div class="login-wrap">
		<!-- 根据地址的路由来展示页面标题 -->
		<div class="login-header">
			<div class="login-title" v-if="sysRoute=='va'">
				足够轻松 平台管理
			</div>
			<div class="login-title" v-else>足够轻松 门店管理</div>
		</div>
        <div class="ms-login">
            <div class="ms-title">账户登录</div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="请输入用户名">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="请输入密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')">
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" style="background-color: #2093ff; font-size: 16px;" @click="submitForm('ruleForm')">登 录</el-button>
                </div>
            </el-form>
        </div>
		<div class="login-foot">
			<div class="companyNmae">技术支持 南京宏智洋科技有限公司</div>
		</div>
    </div>
</template>

<script>
    import {commonService} from '../../service/common';
    import {accountService} from '../../service/account';
    export default {
        data: function(){
            return {
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                },
				sysRoute:'',
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let params = {
                            account: this.ruleForm.username,
                            password: this.ruleForm.password
                        }
                        accountService.login(params).then((res)=>{
                            localStorage.token = res.token;
                            accountService.userLoginInfo().then((userInfo)=>{
                                
                                localStorage.userInfo = JSON.stringify(userInfo)
                                window.location.href = '/';
                            })
                            
                        })
                        
                        
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        },
        mounted(){
            // if(localStorage.token){
            //     window.location.href = '/';
            // }
            if(window.location.href.split('?')[1]){
                localStorage.sysRoute = window.location.href.split('?')[1];
				this.sysRoute = window.location.href.split('?')[1];
            }else{
                window.location.href = window.location.href + '?' + localStorage.sysRoute || 'vb'
            }
            

        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        background-image: url(../../assets/img/login-bg.jpg);
        background-size: 100%;
    }
    .ms-title{
        width:100%;
        line-height: 50px;
        text-align: center;
        font-size:20px;
        color: #000000;
        border-bottom: 1px solid #ddd;
    }
    .ms-login{
        position: absolute;
        left:80%;
        top:50%;
        width:350px;
        margin:-190px 0 0 -175px;
        border-radius: 5px;
		background: rgba(255,255,255, 0.8);
        /* background: rgba(255,255,255, 0.3); */
        overflow: hidden;
    }
    .ms-content{
        padding: 30px 30px;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
        margin-bottom: 10px;
    }
    .login-tips{
        font-size:12px;
        line-height:30px;
        color:#fff;
    }
	.login-header{
		 position: absolute;
		 top:0px;
		/* left:1%;
		 top:1%; */
		 width:100%;
		 height: 80px;
		 border-radius: 5px;
		 background: rgba(255,255,255, 1);
		 overflow: hidden;
	}
	.login-foot{
		position: absolute;
		/* left:1%;*/
		bottom: 0px;
		left: 0px;
		 width:100%;
		 height: 180px;
		 border-radius: 5px;
		 background: rgba(255,255,255, 1);
		 overflow: hidden;
	}
	.companyNmae{
		position: absolute;
		font-size: 14px;
		color: #5f5f5f;
		margin: 4% 0 1% 43%;
		/* left: 45%;
		top:20%; */
	}
	.login-title{
		position: absolute;
		font-size: 30px;
		color: #555555;
		margin: 1% ;
		/* left: 3%;
		top: 20%; */
	}
</style>