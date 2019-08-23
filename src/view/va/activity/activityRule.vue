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
            <div class="pad20" style="">
                <el-form ref="form" :model="form"  :rules="rules"   label-width="150px">
                    <el-form-item label="活动是否生效">
                        <el-switch v-model="form.isShengxiao" class="left10"></el-switch>
                    </el-form-item>
                    <el-form-item label="有效期开始时间">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.date" value-format="yyyy-MM-dd" style=""></el-date-picker>
                        <span class="col999 left5">默认取当前时间</span>
                    </el-form-item>
                    <el-form-item label="有效期结束时间">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.date" value-format="yyyy-MM-dd" style=""></el-date-picker>
                        <span class="col999 left5">不填表示长期有效</span>
                    </el-form-item>
                    <el-form-item label="返利方式">
                        <div>
                            <el-checkbox label="返现(满赠)" v-model='form.fx'></el-checkbox>
                        </div>
                        <div v-if="form.fx">
                            <p class="col999">返现（满赠）规则</p>
                            <div class="top10"  v-for="(v, i) in form.fxList" :key="i" >
                                <span>满</span>
                                <el-input v-model="form.a" class="left5" style="width: 80px"></el-input>
                                <span class="left20">返</span>
                                <el-input v-model="form.a" class="left5" style="width: 80px"></el-input>
                                <i class="el-icon-circle-plus-outline left10 pointer" @click="mdAdd('fx', 'fxList')"></i>
                                <i class="el-icon-remove-outline left5 pointer" v-if='i>0' @click="mdRemove(i, 'fx', 'fxList')"></i>
                            </div>
                        </div>
                        <div>
                            <el-checkbox label="赠送优惠券" v-model='form.yhq'></el-checkbox>
                        </div>
                        <div v-if="form.yhq">
                            <p class="col999">赠送优惠券规则</p>
                            <div class="top10"  v-for="(v, i) in form.yhqList" :key="i" >
                                <span>满</span>
                                <el-input v-model="form.a" class="left5" style="width: 80px"></el-input>
                                <span class="left20">送优惠券</span>
                                <el-select class="left10" v-model="yhq" placeholder="请选择" style="width: 120px">
                                    <el-option v-for="(v, i) in yhqList" :key="i" :label="v" :value="i"></el-option>
                                </el-select>
                                <el-input v-model="form.a" class="left5" style="width: 80px"></el-input>
                                <span class="left5">张</span>
                                <i class="el-icon-circle-plus-outline left10 pointer" @click="mdAdd('yhq', 'yhqList')"></i>
                                <i class="el-icon-remove-outline left5 pointer" v-if='i>0' @click="mdRemove(i, 'yhq', 'yhqList')"></i>
                            </div>
                        </div>
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
                    c: '',
                    isShengxiao: true,
                    fx: false,
                    fxList: [''],
                    yhq: false,
                    yhqList: ['']
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

                type: '0',
                typeList: ['充值', '注册', '消费', '邀请好友', '拼团']
            }
        },
        components:{
            
        },
        methods:{
            mdAdd(key, keyList){
                const t = this;
                if(t.form[keyList].length>2){
                    t.$message({
                        message: '最多三条',
                        type: 'warning'
                    });
                    return
                }
                t.form[keyList].push('');

            },
            mdRemove(i, key, keyList){
                const t = this;
                t.form[keyList].splice(i, 1)
            },


        },
        mounted(){
            const t = this;
            t.yhqList = t.$GD.yhqList;

        }
    }
</script>
<style scoped>
    
</style>
