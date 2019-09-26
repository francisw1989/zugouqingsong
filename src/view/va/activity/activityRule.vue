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
                <el-form ref="form" :model="form"  :rules="rules"   label-width="130px" label-position='left'>
                    <el-form-item label="活动是否生效">
                        <el-switch v-model="form.status" class="left10"></el-switch>
                    </el-form-item>
                    <div v-if='type!=4 && form.status==1'>
                        <el-form-item label="有效期开始时间">
                            <el-date-picker type="date" placeholder="选择日期" v-model="form.startTime" value-format="yyyy-MM-dd" style=""></el-date-picker>
                            <span class="col999 left5">默认取当前时间</span>
                        </el-form-item>
                        <el-form-item label="有效期结束时间">
                            <el-date-picker type="date" placeholder="选择日期" v-model="form.daendTimete" value-format="yyyy-MM-dd" style=""></el-date-picker>
                            <span class="col999 left5">不填表示长期有效</span>
                        </el-form-item>
                        <el-form-item label="返利方式">
                            <div v-if="type==0 || type==2">
                                <div>
                                    <el-checkbox label="返现(满赠)" v-model='form.fx'></el-checkbox>
                                </div>
                                <div v-if="form.fx">
                                    <p class="col999">返现（满赠）规则</p>
                                    <div class=""  v-for="(v, i) in form.fxList" :key="i" >
                                        <span>{{type==0?'充值':'消费'}}满</span>
                                        <el-input v-model="form.activityCondition" class="left5" style="width: 80px"></el-input>
                                        <span class="left20">返</span>
                                        <el-input v-model="form.amount" class="left5" placeholder="元" style="width: 80px"></el-input>
                                        <i class="el-icon-circle-plus-outline left10 pointer" @click="mdAdd('fx', 'fxList')"></i>
                                        <i class="el-icon-remove-outline left5 pointer" v-if='i>0' @click="mdRemove(i, 'fx', 'fxList')"></i>
                                    </div>
                                </div>
                                <div class="top10">
                                    <el-checkbox label="赠送优惠券" v-model='form.yhq1'></el-checkbox>
                                </div>
                                <div v-if="form.yhq1">
                                    <p class="col999">赠送优惠券规则</p>
                                    <div class=""  v-for="(v, i) in form.yhqList" :key="v.couponId" >
                                        <span>{{type==0?'充值':'消费'}}满</span>
                                        <el-input v-model="form.activityCondition" class="left5" style="width: 80px"></el-input>
                                        <span class="left20">送优惠券</span>
                                        <el-select class="left10" v-model="couponIds" placeholder="请选择" style="width: 120px">
                                            <el-option v-for="(v, i) in yhqList" :key="v.couponId" :label="v.couponName" :value="v.couponId"></el-option>
                                        </el-select>
                                        <el-input v-model="form.a" class="left5" style="width: 80px"></el-input>
                                        <span class="left5">张</span>
                                        <i class="el-icon-circle-plus-outline left10 pointer" @click="mdAdd('couponIds', 'yhqList')"></i>
                                        <i class="el-icon-remove-outline left5 pointer" v-if='i>0' @click="mdRemove(i, 'couponIds', 'yhqList')"></i>
                                    </div>
                                </div>
                                <div class="top10">
                                    <el-checkbox label="赠送积分" v-model='form.jf1'></el-checkbox>
                                </div>
                                <div v-if="form.jf1">
                                    <p class="col999">赠送积分规则</p>
                                    <div class=""  v-for="(v, i) in form.jfList" :key="i" >
                                        <span>{{type==0?'充值':'消费'}}满</span>
                                        <el-input v-model="form.activityCondition" class="left5" style="width: 80px"></el-input>
                                        <span class="left20">送</span>
                                        <el-input v-model="form.amount" placeholder="分" class="left5" style="width: 80px"></el-input>
                                        <i class="el-icon-circle-plus-outline left10 pointer" @click="mdAdd('jf', 'jfList')"></i>
                                        <i class="el-icon-remove-outline left5 pointer" v-if='i>0' @click="mdRemove(i, 'jf', 'jfList')"></i>
                                    </div>
                                </div>
                            </div>
                            <div v-if="type==1">
                                <div>
                                    <el-checkbox label="赠送储值金" v-model='form.czj2'></el-checkbox>
                                </div>
                                <div v-if="form.czj2">
                                    <p class="col999">赠送储值金规则</p>
                                    <div class="" >
                                        <span>注册送</span>
                                        <el-input v-model="form.amount" class="left5" style="width: 80px" placeholder="元"></el-input>
                                    </div>
                                </div>
                                <div class="top10">
                                    <el-checkbox label="赠送优惠券" v-model='form.yhq2'></el-checkbox>
                                </div>
                                <div v-if="form.yhq2">
                                    <p class="col999">赠送优惠券规则</p>
                                    <div class="">
                                        <span>注册送</span>
                                        <el-select class="left10" v-model="couponIds" placeholder="请选择" style="width: 120px">
                                            <el-option v-for="(v, i) in yhqList" :key="v.couponId" :label="v.couponName" :value="v.couponId"></el-option>
                                        </el-select>
                                        <el-input v-model="form.a" class="left5" style="width: 80px"></el-input>
                                        <span class="left5">张</span>
                                    </div>
                                </div>
                                <div class="top10">
                                    <el-checkbox label="积分" v-model='form.jf2'></el-checkbox>
                                </div>
                                <div v-if="form.jf2">
                                    <p class="col999">赠送积分规则</p>
                                    <div class="" >
                                        <span>注册送</span>
                                        <el-input v-model="form.amount" class="left5" style="width: 80px" placeholder="分"></el-input>
                                    </div>
                                </div>
                            </div>
                            <div v-if="type==3">
                                <div>
                                    <el-checkbox label="赠送储值金" v-model='form.czj3'></el-checkbox>
                                </div>
                                <div v-if="form.czj3">
                                    <p class="col999">赠送储值金规则</p>
                                    <div class="" >
                                        <span>每邀请一位好友送</span>
                                        <el-input v-model="form.amount" class="left5" style="width: 80px" placeholder="元"></el-input>
                                    </div>
                                </div>
                                <div class="top10">
                                    <el-checkbox label="赠送优惠券" v-model='form.yhq3'></el-checkbox>
                                </div>
                                <div v-if="form.yhq3">
                                    <p class="col999">赠送优惠券规则</p>
                                    <div class="">
                                        <span>每邀请一位好友送</span>
                                        <el-select class="left10" v-model="couponIds" placeholder="请选择" style="width: 120px">
                                            <el-option v-for="(v, i) in yhqList" :key="v.couponId" :label="v.couponName" :value="v.couponId"></el-option>
                                        </el-select>
                                        <el-input v-model="form.a" class="left5" style="width: 80px"></el-input>
                                        <span class="left5">张</span>
                                    </div>
                                </div>
                                <div class="top10">
                                    <el-checkbox label="积分" v-model='form.jf3'></el-checkbox>
                                </div>
                                <div v-if="form.jf3">
                                    <p class="col999">赠送积分规则</p>
                                    <div class="" >
                                        <span>每邀请一位好友送</span>
                                        <el-input v-model="form.amount" class="left5" style="width: 80px" placeholder="分"></el-input>
                                    </div>
                                </div>
                            </div>
                        </el-form-item>
                    </div>
                    <div v-if='type==4'>
                        
                        <el-form-item label="拼团时间限制">
                            <el-input v-model="form.assembleDays" class="left5" style="width: 80px" placeholder=""></el-input>
                            <span class="left10">拼团期限 </span>
                        </el-form-item>
                        <el-form-item label="拼团优惠券有效期">
                            <el-input v-model="form.expiryDays" class="left5" style="width: 80px" placeholder=""></el-input>
                            <span class='left10'>自领取多少天</span>
                        </el-form-item>
                    </div>
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
    import {couponService} from '../../../service/coupon';

    const Form= {
        assembleDays: 0,
        couponList: [
            {
            activityCondition: 0,
            amount: 0,
            couponIds: '',
            grantType: 0
            }
        ],
        endTime: '',
        expiryDays: 0,
        monenyList: [
            {
            activityCondition: 0,
            amount: 0,
            couponIds: '',
            grantType: 0
            }
        ],
        scoreList: [
            {
            activityCondition: 0,
            amount: 0,
            couponIds: '',
            grantType: 0
            }
        ],
        startTime: '',
        status: 0,
        type: 0
    }
    export default {
        data() {
            return {
                form: JSON.parse(JSON.stringify(Form)),
                couponIds: 0,
                yhqList: [],
                rules: {
                    a: [
                        { required: true, message: '请选择类型', trigger: 'change' },
                    ]
                },
                idx: -1,
                id: -1,

                type: '1',
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
            couponService.getCouponManagerList({pageSize: 100,pageNumber: 1}).then((res)=>{
                  t.yhqList = res.records
            }); 

        }
    }
</script>
<style scoped>
    
</style>
