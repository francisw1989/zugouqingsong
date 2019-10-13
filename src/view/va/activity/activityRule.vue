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
                            <el-date-picker type="date" placeholder="选择日期" v-model="form.endTime" value-format="yyyy-MM-dd" style=""></el-date-picker>
                            <span class="col999 left5">不填表示长期有效</span>
                        </el-form-item>
                        <el-form-item label="返利方式">
                            <!-- 充值 消费-->
                            <div v-if="type==0 || type==2">
                                <div>
                                    <el-checkbox label="返现(满赠)" v-model='form.isMoneny'></el-checkbox>
                                </div>
                                <div v-if="form.isMoneny">
                                    <p class="col999">返现（满赠）规则</p>
                                    <div class=""  v-for="(v, i) in form.monenyList" :key="i" >
                                        <span>{{type==0?'充值':'消费'}}满</span>
                                        <el-input v-model="v.activityCondition" placeholder="元" class="left5" style="width: 80px"></el-input>
                                        <span class="left20">返</span>
                                        <el-input v-model="v.amount" class="left5" placeholder="元" style="width: 80px"></el-input>
                                        <i class="el-icon-circle-plus-outline left10 pointer" @click="mdAdd('fx', 'monenyList')"></i>
                                        <i class="el-icon-remove-outline left5 pointer" v-if='i>0' @click="mdRemove(i, 'fx', 'monenyList')"></i>

                                    </div>
                                    
                                </div>
                                <div class="top10">
                                    <el-checkbox label="赠送优惠券" v-model='form.isCoupon'></el-checkbox>
                                </div>
                                <div v-if="form.isCoupon">
                                    <p class="col999">赠送优惠券规则</p>
                                    <div class=""  v-for="(v, i) in form.couponList" :key="v.couponId" >
                                        <span>{{type==0?'充值':'消费'}}满</span>
                                        <el-input v-model="v.activityCondition" class="left5" style="width: 80px"></el-input>
                                        <span class="left20">送优惠券</span>
                                        <el-select class="left10" v-model="v.couponIds" placeholder="请选择" style="width: 120px">
                                            <el-option v-for="(v2) in couponList" :key="v2.id" :label="v2.couponName" :value="v2.id"></el-option>
                                        </el-select>
                                        <el-input v-model="v.amount" placeholder="张" class="left5" style="width: 80px"></el-input>
                                        <span class="left5">张</span>
                                        <i class="el-icon-circle-plus-outline left10 pointer" @click="mdAdd('couponIds', 'couponList')"></i>
                                        <i class="el-icon-remove-outline left5 pointer" v-if='i>0' @click="mdRemove(i, 'couponIds', 'couponList')"></i>
                                        
                                    </div>

                                </div>
                                <div class="top10">
                                    <el-checkbox label="赠送积分" v-model='form.isScore'></el-checkbox>
                                </div>
                                <div v-if="form.isScore">
                                    <p class="col999">赠送积分规则</p>
                                    <div class=""  v-for="(v, i) in form.scoreList" :key="i" >
                                        <span>{{type==0?'充值':'消费'}}满</span>
                                        <el-input v-model="v.activityCondition" class="left5" style="width: 80px"></el-input>
                                        <span class="left20">送</span>
                                        <el-input v-model="v.amount" placeholder="分" class="left5" style="width: 80px"></el-input>
                                        <i class="el-icon-circle-plus-outline left10 pointer" @click="mdAdd('jf', 'scoreList')"></i>
                                        <i class="el-icon-remove-outline left5 pointer" v-if='i>0' @click="mdRemove(i, 'jf', 'scoreList')"></i>
                                    </div>
                                </div>
                            </div>
                            <!-- 注册 -->
                            <div v-if="type==1">
                                <div>
                                    <el-checkbox label="赠送储值金" v-model='form.isMoneny'></el-checkbox>
                                </div>
                                <div v-if="form.isMoneny">
                                    <p class="col999">赠送储值金规则</p>
                                    <div class="" >
                                        <span>注册送</span>
                                        <el-input v-model="form.monenyList[0].amount" class="left5" style="width: 80px" placeholder="元"></el-input>
                                    </div>
                                </div>
                                <div class="top10">
                                    <el-checkbox label="赠送优惠券" v-model='form.isCoupon'></el-checkbox>
                                </div>
                                <div v-if="form.isCoupon">
                                    <p class="col999">赠送优惠券规则</p>
                                    <div class="">
                                        <span>注册送</span>
                                        <el-select class="left10" v-model="form.couponList[0].couponIds" placeholder="请选择" style="width: 120px">
                                            <el-option v-for="(v2) in couponList" :key="v2.id" :label="v2.couponName" :value="v2.id"></el-option>
                                        </el-select>
                                        <el-input v-model="form.couponList[0].amount" class="left5" style="width: 80px"></el-input>
                                        <span class="left5">张</span>
                                    </div>
                                </div>
                                <div class="top10">
                                    <el-checkbox label="积分" v-model='form.isScore'></el-checkbox>
                                </div>
                                <div v-if="form.isScore">
                                    <p class="col999">赠送积分规则</p>
                                    <div class="" >
                                        <span>注册送</span>
                                        <el-input v-model="form.scoreList[0].amount" class="left5" style="width: 80px"></el-input>
                                    </div>
                                </div>
                            </div>
                            <div v-if="type==3">
                                <div>
                                    <el-checkbox label="赠送储值金" v-model='form.isMoneny'></el-checkbox>
                                </div>
                                <div v-if="form.isMoneny">
                                    <p class="col999">赠送储值金规则</p>
                                    <div class="" >
                                        <span>每邀请一位好友送</span>
                                        <el-input v-model="form.monenyList[0].amount" class="left5" style="width: 80px" placeholder="元"></el-input>
                                    </div>
                                </div>
                                <div class="top10">
                                    <el-checkbox label="赠送优惠券" v-model='form.isCoupon'></el-checkbox>
                                </div>
                               <div v-if="form.isCoupon">
                                    <p class="col999">赠送优惠券规则</p>
                                    <div class=""  v-for="(v, i) in form.couponList" :key="v.couponId" >
                                        <span>每邀请一位好友送送优惠券</span>
                                        <el-select class="left10" v-model="v.couponIds" placeholder="请选择" style="width: 120px">
                                            <el-option v-for="(v2) in couponList" :key="v2.id" :label="v2.couponName" :value="v2.id"></el-option>
                                        </el-select>
                                        <el-input v-model="v.amount" placeholder="张" class="left5" style="width: 80px"></el-input>
                                        <span class="left5">张</span>
                                        <i class="el-icon-circle-plus-outline left10 pointer" @click="mdAdd('couponIds', 'couponList')"></i>
                                        <i class="el-icon-remove-outline left5 pointer" v-if='i>0' @click="mdRemove(i, 'couponIds', 'couponList')"></i>
                                    </div>

                                </div>
                                <div class="top10">
                                    <el-checkbox label="积分" v-model='form.isScore'></el-checkbox>
                                </div>
                                <div v-if="form.isScore">
                                    <p class="col999">赠送积分规则</p>
                                    <div class="" >
                                        <span>每邀请一位好友送</span>
                                        <el-input v-model="form.scoreList[0].amount" class="left5" style="width: 80px"></el-input>
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
                        <el-button  type="primary" @click="save('form')">保存</el-button>
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
    const FormGroup = {
        expiryDays: '',
        assembleDays: '',
        status: ''
    }
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
                couponList: [],
                rules: {
                    a: [
                        { required: true, message: '请选择类型', trigger: 'change' },
                    ]
                },
                idx: -1,
                id: -1,

                type: 0,
                //活动类型（0充值1注册2消费3邀请好友4拼团）
                typeList: ['充值', '注册', '消费', '邀请好友', '拼团']
            }
        },
        components:{
            
        },
        methods:{
            save1(form){
                const t = this;
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        let params = {};
                        t.editVisible = false;
                        for(let key in Form){
                            params[key] = t.form[key]
                        }
                        params.status = params.status?'1': '0';
                        params.couponList = params.couponList.filter((v)=>{
                            return (v.amount || v.activityCondition)
                        })
                        params.monenyList = params.monenyList.filter((v)=>{
                            return (v.amount || v.activityCondition)
                        })
                        params.scoreList = params.scoreList.filter((v)=>{
                            return (v.amount || v.activityCondition)
                        })
                        // 优惠券 金额处理
                        if(!t.form.isCoupon){
                            delete params.couponList
                        }
                        if(params.couponList && params.couponList.length){
                            for(const v of  params.couponList){
                                v.activityCondition = v.activityCondition*100;
                            }
                        }
                        
                        // 满送 金额处理
                        if(!t.form.isMoneny){
                            delete params.monenyList
                        }
                        if(params.monenyList && params.monenyList.length){
                            for(const v of  params.monenyList){
                                v.amount = v.amount*100;
                                v.activityCondition = v.activityCondition*100;
                            }
                        }
                        // 积分处理
                        if(!t.form.isScore){
                            delete params.scoreList
                        }
                        if(params.scoreList && params.scoreList.length){
                            for(const v of  params.scoreList){
                                v.activityCondition = v.activityCondition*100;
                            }
                        }
                        console.log(params);
                        activityService.activityConfigActivity(params).then((res)=>{
                            t.$message({
                                message: '保存成功',
                                type: 'success'
                            });
                            t.getActivityConfig()
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            save2(form){
                const t = this;
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        let params = {};
                        t.editVisible = false;
                        for(let key in FormGroup){
                            params[key] = t.form[key]
                        }
                        params.status = params.status?'1': '0';
                        activityService.activityConfigAssemble(params).then((res)=>{
                            t.$message({
                                message: '保存成功',
                                type: 'success'
                            });
                            t.getActivityConfig()
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            save(form){
                const t = this;
                if(t.type!=4){
                    t.save1(form)
                }else{
                    t.save2(form)
                }
                
            },
            mdAdd(key, keyList){
                const t = this;
                // if(t.form[keyList].length>2){
                //     t.$message({
                //         message: '最多三条',
                //         type: 'warning'
                //     });
                //     return
                // }
                t.form[keyList].push({});

            },
            mdRemove(i, key, keyList){
                const t = this;
                t.form[keyList].splice(i, 1)
            },
            getActivityConfig(){
                const t = this;
                let params = {
                    type: t.type
                }
                activityService.getActivityConfig(params).then((res)=>{
                    if(!res){
                        res = {}
                    }
                    res.status = res.status?true:false;
                    // 优惠券 金额处理
                    if(res.couponList && res.couponList.length){
                        res.isCoupon = true;
                        for(const v of  res.couponList){
                            v.couponIds = Number(v.couponIds)
                            v.activityCondition = v.activityCondition/100;
                        }
                     }else{
                        res.isCoupon = false;
                        res.couponList = [{
                            activityCondition: '',
                            amount: '',
                            couponIds: '',
                            grantType: 2
                        }]
                    };
                    // 满送 金额处理
                    if(res.monenyList && res.monenyList.length){
                        res.isMoneny = true;
                        for(const v of  res.monenyList){
                            v.amount = v.amount/100;
                            v.activityCondition = v.activityCondition/100;
                        }
                     }else{
                        res.isMoneny = false;
                        res.monenyList = [{
                            activityCondition: '',
                            amount: '',
                            couponIds: '',
                            grantType: 0
                        }]
                    };
                    // 积分处理
                    if(res.scoreList && res.scoreList.length){
                        res.isScore = true
                        for(const v of  res.scoreList){
                            v.activityCondition = v.activityCondition/100;
                        }
                     }else{
                        res.isScore = false;
                        res.scoreList = [{
                            activityCondition: '',
                            amount: '',
                            couponIds: '',
                            grantType: 1
                        }]
                    };

                    t.form = res;
                    console.log(t.form)
                })
            }


        },
        watch:{
            type(){
                const t = this;
                t.getActivityConfig();
            }
        },
        mounted(){
            const t = this;
            
            couponService.getCouponManagerList({pageSize: 100,pageNumber: 1}).then((res)=>{
                t.couponList = res.records;
                t.getActivityConfig();
            }); 

        }
    }
</script>
<style scoped>
    
</style>
