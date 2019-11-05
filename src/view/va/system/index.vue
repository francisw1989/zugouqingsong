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
                <el-radio-group v-model="tabIndex" @change='tabChange'>
                    <el-radio-button :label="i"  v-for="(v, i) in tabList" :key="i" >{{v.tabName}}</el-radio-button>
                </el-radio-group>
            </div>
            <el-card class="box-card top10"  v-for="(v, i) in groupList" :key="i" shadow="hover">
                <div slot="header" class="clearfix">
                    {{v.groupName}}
                </div>
                <!-- (text,int,float,select,checkbox,textarea,radio) -->
                <div>
                    <el-form class='top10' ref="form" :rules="rules" label-width="280px" label-position='right'>
                        <template v-for="(item, itemIndex) in v.item" >
                            <el-form-item :label="item.settingName" :key="itemIndex" >
                                <el-input style="width: 200px" v-model="item.settingValue" class="" placeholder="" v-if="item.settingType == 'int' || item.settingType == 'text'  || item.settingType == 'float'"></el-input>
                                <el-input style="width: 200px" v-model="item.settingValue" type="textarea" class="" placeholder="" v-if="item.settingType == 'textarea'"></el-input>
                                
                                <div v-if="item.settingType=='image'">
                                     <el-upload action="" 
                                        :show-file-list="false" 
                                        :on-change='getFile' 
                                        :auto-upload='false'>
                                        <el-button size="small" type="primary" @click="doImgUp(item)">点击上传</el-button>
                                    </el-upload>
                                    <img v-if="item.settingValue" :src="item.settingValue" class=" top10" style="max-width: 100px;max-height: 100px;">
                                    <br />
                                    <el-input style="width: 200px" v-model="item.settingValue" class="" placeholder="" ></el-input>
                                </div>

                                <span class="left10">{{item.settingDescription}}</span>
                            </el-form-item>
                        </template>
                        <el-form-item label="">
                            <el-button @click="saveItemValueList(v.item)" type="primary">保存</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>

            

        </div>




    </div>
</template>
<script>
    import bus from '../../../bus';
    import {systemService} from '../../../service/system';

    export default {
        data() {
            return {
                form: {
                    a: '',
                    b: '',
                    c: ''
                },
                yhq: 0,
                yhqList: [],
                rules: {
                    a: [
                        { required: true, message: '请选择类型', trigger: 'change' },
                    ]
                },
                idx: -1,
                id: -1,

                tabIndex: 0,
                tabList: [],
                groupList: [],
                ctrItem: {}
            }
        },
        components:{
            
        },
        methods:{
            doImgUp(res){
                const t = this;
                t.ctrItem = res;
            },
            getFile(file, fileList){
                const t = this;
                t.$commonService.getBase64(file.raw).then((Base64)=>{
                    t.$commonService.upload(Base64).then((res)=>{
                        t.ctrItem.settingValue = res.netUrl
                        
                    })
                })
            },
            beforeImgUpload(file) {
                console.log(file)
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG && !isPNG) {
                    this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M && isPNG;
            },
            saveItemValueList(data){
                const t = this;
                console.log(data)
                let itemList = [];
                let valida = true;
                for(const v of data){
                    if(v.isNullable != 1 && !v.settingValue){
                        this.$message.error('请输入: ' + v.settingName);
                        valida = false;
                        break;
                        return;
                    }
                    itemList.push({
                        settingKey: v.settingKey,
                        settingValue: v.settingValue
                    })
                }
                if(valida){
                    systemService.saveItemValueList(itemList).then((res)=>{
                        // t.typeList = res;
                        this.$message.success('修改成功！');
                    })
                }
                
            },
            tabChange(){
                const t = this;
                t.getTabCodeList();
            },
            getTabCodeList(){
                const t = this;
                let params = {
                    tabId: t.tabList[t.tabIndex].id
                }
                systemService.getTabCodeList(params).then((res)=>{
                    // t.typeList = res;
                    for(const v of res){
                        for(const v2 of v.item){
                            v2.settingValue = v2.settingValue ? v2.settingValue: v2.defaultValue
                        }
                    }
                    t.groupList = res;
                })
            },
            getTabList(){
                const t = this;
                systemService.getTabList().then((res)=>{
                    t.tabList = res;
                    t.tabIndex = 0;
                    t.getTabCodeList();
                })
            }


        },
        mounted(){
            const t = this;
            t.getTabList();

        }
    }
</script>
<style scoped>
    
</style>
