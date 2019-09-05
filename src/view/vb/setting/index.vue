<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item> {{this.$route.meta.title}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="align-right">
                <el-button type="primary" v-if="!openEdit" @click="openEdit = true">编辑</el-button>
                <el-button type="primary"  v-if="openEdit" @click="saveEdit('form')">保存</el-button>
            </div>
            <div style="width: 500px">
                <el-form ref="form" :model="form" :rules="rules" label-width="150px">
                    <div class="font16b">【基本信息】</div>
                    <el-form-item class="top20" label="门店名称" prop="a">
                        <span v-if='!openEdit'>{{form.a}}</span>
                        <el-input v-if='openEdit' v-model="form.a"></el-input>
                    </el-form-item>
                    <el-form-item label="门店地址" prop="a">
                        <span v-if='!openEdit'>{{form.a}}</span>
                        <el-input v-if='openEdit' v-model="form.a"></el-input>
                    </el-form-item>
                    <el-form-item label="门店面积" prop="a">
                        <span v-if='!openEdit'>{{form.a}}</span>
                        <el-input v-if='openEdit' v-model="form.a"></el-input>
                    </el-form-item>
                    <el-form-item label="门店租金" prop="a">
                        <span v-if='!openEdit'>{{form.a}}</span>
                        <el-input v-if='openEdit' v-model="form.a"></el-input>
                    </el-form-item>
                    <el-form-item label="门店电话" prop="a">
                        <span v-if='!openEdit'>{{form.a}}</span>
                        <el-input v-if='openEdit' v-model="form.a"></el-input>
                    </el-form-item>
                    <el-form-item label="店长" prop="a">
                        <span v-if='!openEdit'>{{form.a}}</span>
                        <el-input v-if='openEdit' v-model="form.a"></el-input>
                    </el-form-item>
                    <el-form-item label="店长电话" prop="a">
                        <span v-if='!openEdit'>{{form.a}}</span>
                        <el-input v-if='openEdit' v-model="form.a"></el-input>
                    </el-form-item>
                    <el-form-item label="标签" prop="a">
                        <span v-if='!openEdit'>{{form.a}}</span>
                        <el-input v-if='openEdit' v-model="form.a"></el-input>
                    </el-form-item>
                    <el-form-item label="门店照片" prop="imgs">
                        <el-upload
                        :file-list='form.imgListShow'
                        :auto-upload='false'
                        action=""
                        :on-change="getFile"
                        list-type="picture-card"
                        :before-remove="beforeRemove">
                        <i class="el-icon-plus"></i>
                        </el-upload>
                    </el-form-item>
                    <div class="font16b">【营业设置】</div>
                    <el-form-item class="top20" label="开始营业时间" prop="a">
                        <span v-if='!openEdit'>{{form.a}}</span>
                        <el-time-picker v-if='openEdit' v-model="form.a"></el-time-picker>
                    </el-form-item>
                    <el-form-item label="结束营业时间" prop="a">
                        <span v-if='!openEdit'>{{form.a}}</span>
                        <el-time-picker v-if='openEdit' v-model="form.a"></el-time-picker>
                    </el-form-item>
                    <el-form-item label="最大可容纳人数" prop="a">
                        <span v-if='!openEdit'>{{form.a}}</span>
                        <el-input v-if='openEdit' v-model="form.a"></el-input>
                    </el-form-item>
                    <el-form-item label="基本介绍" prop="a">
                        <span v-if='!openEdit'>{{form.a}}</span>
                        <el-input type="textarea" v-if='openEdit' v-model="form.a"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </div>



    </div>
</template>
<script>
    const Form = {
        a: '发送到是非得失反倒是反倒是稍等',
        name: '',
        openingDate: '',
        phoneNum: '',
        area: '',
        shopowner: '',
        rent: '',
        shopownerPhoneNum: '',
        propertyCosts: '',
        x:'',
        y:'',
        imgs: '',
        tags:'',
        detailAddress: '',
        imgListShow: []
    }
    import bus from '../../../bus';
    import {settingService} from '../../../service/setting';
    export default {
        data() {
            return {
                openEdit: false,
                dialogVisible: false,
                form: JSON.parse(JSON.stringify(Form)),
                rules: {
                    a: [
                        { required: true, message: '请输入', trigger: 'change' },
                    ]
                },
            }
        },
        components: {
            
        },
        computed:{
            
        },
        methods:{
            getFile(file, fileList){
                const t = this;
                t.$commonService.getBase64(file.raw).then((Base64)=>{
                    t.$commonService.upload(Base64).then((res)=>{
                        t.form.imgListShow.push({
                            url: res.netUrl
                        })
                        console.log(t.form.imgListShow)
                    })
                })
            },
            beforeRemove(file, fileList) {
                const t = this;
                for(const i in fileList){
                    if(fileList[i].uid == file.uid){
                        t.form.imgListShow.splice(i, 1)
                    }
                }
                console.log(t.form.imgListShow)
            },
            // 保存编辑
            saveEdit(form) {
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
                
            },


        },
        mounted(){
           const t = this;


        }
    }
</script>
<style scoped>
    
</style>
