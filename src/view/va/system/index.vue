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
                <el-radio-group v-model="type">
                    <el-radio-button :label="i"  v-for="(v, i) in typeList" :key="i" >{{v}}</el-radio-button>
                </el-radio-group>
            </div>
            <div class="pad20" style="" >
                <p class="pad10TB colblue">标题标题</p>
                <el-form class='top10' ref="form" :model="form"  :rules="rules"   label-width="150px" label-position='left'>
                    <el-form-item label="活动是否生效">
                        <el-switch v-model="form.isShengxiao" class="left10"></el-switch>
                    </el-form-item>
                    <el-form-item label="邀请人数上线">
                        <el-input v-model="form.a" class="left5" style="width: 80px" placeholder="位"></el-input>
                    </el-form-item>
                    <el-form-item label="有效期开始时间">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.date" value-format="yyyy-MM-dd" style=""></el-date-picker>
                        <span class="col999 left5">默认取当前时间</span>
                    </el-form-item>
                    <el-form-item label="有效期结束时间">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.date" value-format="yyyy-MM-dd" style=""></el-date-picker>
                        <span class="col999 left5">不填表示长期有效</span>
                    </el-form-item>
                    <el-form-item label="">
                        <el-button  type="primary">保存</el-button>
                    </el-form-item>
                </el-form>
            </div>
            

        </div>




    </div>
</template>
<script>
    import bus from '../../../bus';
    import {activityService} from '../../../service/activity';

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

                type: '1',
                typeList: ['系统设置', '提成设置', '会员级别规则', '门店提醒规则', '其他']
            }
        },
        components:{
            
        },
        methods:{
            


        },
        mounted(){
            const t = this;
            

        }
    }
</script>
<style scoped>
    
</style>
