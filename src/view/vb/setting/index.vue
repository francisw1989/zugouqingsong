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
                    <el-form-item class="top20" label="门店名称" prop="name">
                        <span v-if='!openEdit'>{{form.name}}</span>
                        <el-input v-if='openEdit' v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="门店地址" prop="detailAddress">
                        <span v-if='!openEdit'>{{form.detailAddress}}</span>
                        <el-input v-if='openEdit' v-model="form.detailAddress"></el-input>
                    </el-form-item>
                    <el-form-item label="门店面积" prop="area">
                        <span v-if='!openEdit'>{{form.area}}</span>
                        <el-input v-if='openEdit' v-model="form.area"></el-input>
                    </el-form-item>
                    <el-form-item label="门店租金" prop="rent">
                        <span v-if='!openEdit'>{{form.rent}}</span>
                        <el-input v-if='openEdit' v-model="form.rent"></el-input>
                    </el-form-item>
                    <el-form-item label="门店电话" prop="phoneNum">
                        <span v-if='!openEdit'>{{form.phoneNum}}</span>
                        <el-input v-if='openEdit' v-model="form.phoneNum"></el-input>
                    </el-form-item>
                    <el-form-item label="店长" prop="shopowner">
                        <span v-if='!openEdit'>{{form.shopowner}}</span>
                        <el-input v-if='openEdit' v-model="form.shopowner"></el-input>
                    </el-form-item>
                    <el-form-item label="店长电话" prop="shopownerPhoneNum">
                        <span v-if='!openEdit'>{{form.shopownerPhoneNum}}</span>
                        <el-input v-if='openEdit' v-model="form.shopownerPhoneNum"></el-input>
                    </el-form-item>
                    <el-form-item label="标签" prop="tags">
                        <span v-if='!openEdit'>{{form.tags}}</span>
                        <el-input v-if='openEdit' v-model="form.tags" placeholder="英文逗号','隔开"></el-input>
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
                    <el-form-item label="wifi名称" prop="wifiName">
                        <span v-if='!openEdit'>{{form.wifiName}}</span>
                        <el-input v-if='openEdit' v-model="form.wifiName"></el-input>
                    </el-form-item>
                    <el-form-item label="wifiId" prop="wifiSsid">
                        <span v-if='!openEdit'>{{form.wifiSsid}}</span>
                        <el-input v-if='openEdit' v-model="form.wifiSsid"></el-input>
                    </el-form-item>
                    <div class="font16b">【营业设置】</div>
                    <el-form-item class="top20" label="开始营业时间" prop="openStartTime">
                        <span v-if='!openEdit'>{{form.openStartTime}}</span>
                        <el-time-select v-if='openEdit' style="width: 100%" v-model="form.openStartTime" :picker-options="{start: '08:30',step: '00:30',end: '18:30'}" placeholder="开始时间"></el-time-select>
                    </el-form-item>
                    <el-form-item label="结束营业时间" prop="openEndTime">
                        <span v-if='!openEdit'>{{form.openEndTime}}</span>
                        <el-time-select v-if='openEdit' style="width: 100%" v-model="form.openEndTime" :picker-options="{start: '12:00',step: '00:30',end: '24:00'}" placeholder="结束时间"></el-time-select>
                    </el-form-item>
                    <el-form-item label="最大可容纳人数" prop="maxPeopleNum">
                        <span v-if='!openEdit'>{{form.maxPeopleNum}}</span>
                        <el-input v-if='openEdit' v-model="form.maxPeopleNum"></el-input>
                    </el-form-item>
                    <el-form-item label="基本介绍" prop="introduction">
                        <span v-if='!openEdit'>{{form.introduction}}</span>
                        <el-input type="textarea" v-if='openEdit' v-model="form.introduction"></el-input>
                    </el-form-item>
                    <el-form-item label="忙碌时间开始" prop="busyStartTime">
                        <span v-if='!openEdit'>{{form.busyStartTime}}</span>
                        <el-time-select v-if='openEdit' style="width: 100%" v-model="form.busyStartTime" :picker-options="{start: '00:00',step: '00:30',end: '24:00'}" placeholder="开始时间"></el-time-select>
                    </el-form-item>
                    <el-form-item label="忙碌时间结束" prop="busyEndTime">
                        <span v-if='!openEdit'>{{form.busyEndTime}}</span>
                        <el-time-select v-if='openEdit' style="width: 100%" v-model="form.busyEndTime" :picker-options="{start: '00:00',step: '00:30',end: '24:00'}" placeholder="结束时间"></el-time-select>
                    </el-form-item>
                </el-form>
            </div>
        </div>



    </div>
</template>
<script>
    const Form = {
        id: '',
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
        openStartTime: '',
        openEndTime: '',
        introduction: '',
        maxPeopleNum: '',
        busyStartTime: '',
        busyEndTime: '',
        wifiName: '',
        wifiSsid: ''

    }
    import bus from '../../../bus';
    import {storeService} from '../../../service/store';
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
                const t = this;
                t.form.imgs = t.form.imgListShow.map((v)=>{
                    return v.url
                }).join(',');
                t.$refs[form].validate((valid) => {
                    if (valid) {
                        let params = {};
                        t.editVisible = false;
                        for(let key in Form){
                            params[key] = t.form[key]
                        }
                        storeService.edit(params).then((res)=>{
                            // t.getList()
                            this.$message.success(`修改成功`);
							t.getDetail();
                        })

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
                
            },
            getDetail(){
                const t = this;
                storeService.getDetail().then((res)=>{
                    t.form = res;
                    t.form.imgListShow = [];
                    if(t.form.imgs){
                        t.form.imgs.split(',').forEach((v)=>{
                            t.form.imgListShow.push({
                                url: v
                            })
                        })
                    }
                })
            }


        },
        mounted(){
            const t = this;
            t.getDetail();

        }
    }
</script>
<style scoped>
    
</style>
