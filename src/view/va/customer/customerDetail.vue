<template>
    <el-row>
        <el-col :span="11" style="border-right: 1px solid #ddd; padding-left: 10px">
            <el-row>
                <el-col :span="7">
                    <div style="width: 80px" class="relative clearfix">
                        <img :src="form.photo" alt="" class="tx1 left">
                        <!-- <div class="ghWap font12"></div> -->
                    </div>
                </el-col>
                <el-col :span="17">
                    <p class="font16b top5 ">{{form.userNickname}}  <span class="left20 font12 col999">{{form.sexName}} {{form.age}}岁</span> </p>
                    <p class="">
                        <el-tag type="success" size="small">¥{{form.balance}}</el-tag>
                        <el-tag type="info" size="small" class="left5">VIP-{{form.memberLevel}}</el-tag>
                        <el-tag type="danger" size="small" class="left5">{{form.score}}</el-tag>
                    </p>
                    <p>{{form.memberNum}}</p>
                </el-col>
            </el-row>
            <el-form ref="form" :model="form"  :rules="rules"   label-width="80px" class="staffForm top20">
                <el-form-item label="联系电话" >
                    {{form.telephoneNum}}
                </el-form-item>
                <el-form-item label="注册时间" >
                    {{form.createTime}}
                </el-form-item>
                <el-form-item label="出生日期" >
                    <span v-if="!edit.birthday">{{birthday}} <i class="el-icon-edit left20 pointer" @click="openEdit('birthday')"></i> </span>
                    <el-date-picker v-if="edit.birthday" ref="birthday"  value-format="yyyy-MM-dd" v-model="birthday" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="黑名单" >
                    <el-switch v-model="inBlacklist" class=""></el-switch>
                    <span v-if="inBlacklist" class="col999 left5">{{form.updateTime}} 修改</span>
                    <p class="top5" v-if="inBlacklist && form.userTags">{{form.userTags?form.userTags.tags:''}}</p>
                </el-form-item>
                <el-form-item label="红名单" >
                    <el-switch v-model="inRedlist" class=""></el-switch>
                </el-form-item>
                
            </el-form>
            
        </el-col>
        <el-col :span="13" style="padding-left: 10px">
            <div class="smallTabWap">
                <el-tabs v-model="tabName" @tab-click="tabClick">
                    <el-tab-pane :label="v" :name="v" v-for="(v, i) in tabs" :key="i"></el-tab-pane>
                </el-tabs>
            </div>
            <div class="pad10 ">
                <div v-if="tabName=='行为统计'">
                    <p class="font20 col000">服务情况</p>
                    <el-row class="table1 top10 center" style="border: none">
                        <el-col :span="6">
                            <p>服务次数</p>
                            <p>{{customerDate['服务总次数']}}次</p>
                        </el-col>
                        <el-col :span="6">
                            <p>服务总额</p>
                            <p>￥{{(customerDate['总消费金额']/100).toFixed(2)}}元</p>
                        </el-col>
                        <el-col :span="6">
                            <p>平均客单</p>
                            <p>￥{{(customerDate['平均客单价']/100).toFixed(2)}}元</p>
                        </el-col>
                        <el-col :span="6">
                            <p>消费频次</p>
                            <p>{{customerDate['消费频次']}}次</p>
                        </el-col>
                    </el-row>
                    <p class="font20 col000 top20">服务偏好</p>
                    <el-form ref="form" :model="form"  :rules="rules"   label-width="60px" class="staffForm top20">
                        <el-form-item label="标签" >
                            <el-tag :key="tag" v-for="tag in customerDate['标签']" class="right5">{{tag}}</el-tag> 
                            <!-- <el-tag :key="tag" v-for="tag in form.tags" closable :disable-transitions="false" @close="handleClose(tag)" class="right5">
                            {{tag}}
                            </el-tag>
                            <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="mini" @keyup.enter.native="handleInputConfirm"
                            @blur="handleInputConfirm">
                            </el-input>
                            <el-button v-else class="button-new-tag" size="mini" @click="showInput">+ 新增标签</el-button> -->
                        </el-form-item>
                        <el-form-item label="门店" >
                            <el-tag type="success"  :key="tag" v-for="tag in customerDate['消费门店']" class="right5" >{{tag}}</el-tag>
                        </el-form-item>
                        <el-form-item label="技师" >
                            <el-tag type="warning"   :key="tag" v-for="tag in customerDate['服务技师']" class="right5">{{tag}}</el-tag>
                            <p class="font12 col999">自动过滤服务一次的技师</p>
                        </el-form-item>
                        
                    </el-form>
                </div>
                <div v-if="tabName=='服务明细'">
                    <p class="font20 col000  clearfix"><span class="right ">本月共服务{{orderTotalNum}}单</span>服务订单</p>
                    <div style="max-height: 400px; overflow: auto" class="top10">
                        <div v-for="(v) in orderRecordList" :key="v.id" class="pad15TB bor_btm_so" >
                            <p class="col999">
                                <span>{{v.createTime}}</span>
                                <span class="left20">{{v.itemName}}</span>
                                <span class="left20">{{v.storeName}}</span>
                                <!-- <span class="left20">{{v.isAssemble==1?'拼团':''}}</span> -->
                                <span class="left20">{{(v.payPrice/100).toFixed(2)}}元</span>
                            </p>
                            <p class="clearfix">
                                <span class="verMid">{{v.employeeName}}</span>
                                <!-- <span class="left20 verMid">{{}}分</span> -->
                                <!-- <span class="left20 txtOver verMid" style="width: 160px">{{}}</span> -->
                                <span class="right">
                                    <el-tag v-if="v.status=='6' || v.status=='7'" class="left20 verMid">{{statusList[v.status]}}</el-tag>
                                    <el-tag v-else-if="v.status=='5' " type="success" class="left20 verMid">{{statusList[v.status]}}</el-tag>
                                    <el-tag v-else type="success" class="left20 verMid">{{statusList[v.status]}}</el-tag>
                                </span>
                            </p>
                        </div>
                    </div>
                    <!-- <p  class="center top10"><span class="pointer colblue">查看完整记录</span></p> -->
                </div>
                <div v-if="tabName=='消费明细'">
                    <p class="font20 col000  clearfix"><span class="right ">本月共消费{{articleOrderTotalNum}}元</span>消费明细</p>
                    <table  v-for="(v) in articleOrderItemRecord" :key="v.id"  class="m-table1 top20">
                        <tr>
                            <td class="col999">{{v.createTime}}</td>
                            <td class="col999">-{{(v.totalPrice/100).toFixed(2)}}元</td>
                            <td>{{v.articleName}}</td>
                            <!-- <td>{{}}</td> -->
                        </tr>
                    </table>
                </div>
                <div v-if="tabName=='充值记录'">
                    <p class="font20 col000  clearfix">充值记录</p>
                    <table class="m-table2 top20">
                        <tr v-for="(v, i) in rechargeRecord" :key="i">
                            <td class="col999">{{v.createTime}}</td>
                            <td class="col999">{{v.storeName}}</td>
                            <td>+{{(v.rechargeAmount/100).toFixed(2)}}元</td>
                            <td>{{payTypeList[v.payStatus]}}</td>
                        </tr>
                        
                    </table>
                </div>
            </div>
        </el-col>
        
    </el-row>
   
</template>
<script>
    import bus from '../../../bus';
    import {customerService} from '../../../service/customer';
    var echarts = require('echarts');
    const Form = {
        id: '',
        birthday: '',
        inBlacklist: '',
        inRedlist: ''
    }
    export default {
        name: 'customerDetail',
        data() {
            return {
                form:{},
                rules: {
                    a: [
                        { required: true, message: '请选择类型', trigger: 'change' },
                    ]
                },
                edit:{
                    
                },
                shopList: [],
                projectList: [],
                tabs: ['行为统计', '服务明细', '消费明细', '充值记录'],
                tabsType:[],
                tabName: '行为统计',
                hei: false,
                hong: false,
                inputVisible: false,
                inputValue: '',
                sexList:['女','男','未知'],
                statusList: ['','待支付','已支付待到店','已到店待服务','服务中','服务完成','系统取消','用户取消'],
                payTypeList:['','虚拟账户','现金账户','微信支付','现金','微信转账','支付宝转账'],
                customerDate: {},
                rechargeRecord: [],
                birthday: '',
                inBlacklist:'',
                inRedlist: '',
                finishInit: false
            }
        },
        computed:{
            
        },
        watch:{
            birthday(){
                const t = this;
                t.save();
            },
            inBlacklist(){
                const t = this;
                t.save();
            },
            inRedlist(){
                const t = this;
                t.save();
            },
        },
        props: ['row'],
        methods:{
            save(){
                const t = this;
                if(!t.finishInit){
                    return
                }
                let params = {};
                params.birthday = t.birthday;
                params.inBlacklist = t.inBlacklist?'1':'0';
                params.inRedlist = t.inRedlist?'1':'0';
                params.id = t.row.id;
                customerService.save(params).then((res)=>{
                    this.$message.success('修改成功');
                })
            },
            handleClose(tag) {
                this.form.tags.splice(this.form.tags.indexOf(tag), 1);
            },
            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.form.tags.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },
            tabClick(tab, event){
                const t = this;
                console.log(t.tabName)
                if(t.tabName == '师徒'){
                    setTimeout(() => {
                        t.initTreeChart()
                    }, 100);
                    
                }
            },
            
            openEdit(key){
                const t = this;
                for(const _key in t.edit){
                    t.edit[_key] = false;
                }
                t.edit[key] = true;
                t.edit = JSON.parse(JSON.stringify(t.edit));
                setTimeout(() => {
                    t.$refs[key].$el.children[0].select();
                }, 100);
            }
        },
        mounted(){
            const t = this;
            console.log(t.row);
            t.row.inBlacklist=t.row.inBlacklist==0?false:true;
            t.row.inRedlist=t.row.inRedlist==0?false:true;
            t.row.sexName=t.sexList[t.row.sex];
            t.row.balance=(t.row.virtualAccount+t.row.savingsAccount)/100;
            t.form = t.row;
            t.inBlacklist = t.form.inBlacklist;
            t.inRedlist = t.form.inRedlist;
            t.birthday = t.form.birthday;
            setTimeout(() => {
                t.finishInit = true;
            }, 1000);
            //用户行为数据
            customerService.getCustomerDate({id: t.row.id}).then((res)=>{
                t.customerDate = res;
            });
            //用户服务记录
            customerService.getCustomerOrderRecord({id: t.row.id,pageSize: 30,pageNumber: 1}).then((res)=>{
                t.orderRecordList = res.records;
                t.orderTotalNum=res.total;
            });
            //用户消费记录
            customerService.getArticleOrderItemRecord({id: t.row.id,pageSize: 30,pageNumber: 1}).then((res)=>{
                t.articleOrderItemRecord = res.records;
                t.articleOrderTotalNum=res.total;
            });
            //用户充值记录
            customerService.getRechargeRecord({id: t.row.id,pageSize: 30,pageNumber: 1}).then((res)=>{
                for(const v of res.records){
                    v.totalPrice=v.totalPrice/100;
                    // v.statusName=t.payTypeList[v.status];
                }
                t.rechargeRecord = res.records;
            });
        }
    }
</script>
<style scoped>
    .button-new-tag {
        margin-left: 5px;
        height: 24px;
        line-height: 24px;
        padding-top: 0;
        padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 5px;
    vertical-align: bottom;
  }
</style>
