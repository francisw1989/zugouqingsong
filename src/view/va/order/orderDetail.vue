<template>
    <el-row>
        <el-col :span="16">
            <el-card class="">
                <div slot="header" class="clearfix">
                   【基本信息】
                </div>
                <el-row>
                    <el-col :span="4" class="col999">订单编号</el-col>
                    <el-col :span="8" class="">{{info.orderInfo.outTradeNo}}</el-col>
                </el-row>
                <el-row class="top5">
                    <el-col :span="4" class="col999">当前状态</el-col>
                    <el-col :span="8" class="">{{info.orderInfo.statusName}}</el-col>
                    <el-col :span="4" class="col999">服务门店</el-col>
                    <el-col :span="8" class="">{{info.orderInfo.storeName}}</el-col>
                </el-row>
                <el-row class="top5">
                    <el-col :span="4" class="col999">预约开始时间</el-col>
                    <el-col :span="8" class="">{{info.orderInfo.orderStartTime}}</el-col>
                    <el-col :span="4" class="col999">预约结束时间</el-col>
                    <el-col :span="8" class="">{{info.orderInfo.orderEndTime}}</el-col>
                </el-row>
                <el-row class="top5">
                	<el-col :span="4" class="col999">订单总价</el-col>
                    <el-col :span="8" class="">{{info.orderInfo.totalPrice}}元</el-col>
                    <el-col :span="4" class="col999">优惠价</el-col>
                    <el-col :span="8" class="">{{info.orderInfo.payPrice}}元</el-col>
                </el-row>
                 <el-row class="top5">
                    <el-col :span="4" class="col999">支付方式</el-col>
                    <el-col :span="8" class="">{{info.orderInfo.payTypeName}}</el-col>
                    <el-col :span="4" class="col999">实际扣款</el-col>
                    <el-col :span="8" class="">{{info.orderInfo.actualOrderPrice}}元</el-col>
                </el-row>
                 <el-row class="top5">
                    <el-col :span="4" class="col999">退还金额</el-col>
                    <el-col :span="8" class="">{{info.orderInfo.refundPrice}}元</el-col>
                </el-row>
            </el-card>
            <el-card class="top10"  v-if="info.orderInfo.orderItems&&info.orderInfo.orderItems.length">
                
                <div v-for="(v) in info.orderInfo.orderItems" :key="v.id">
                	<div slot="header" class="clearfix">
            		<br />
                   	【服务项目】
                	</div>
                    <el-row  class="">
                        <el-col :span="4" class="col999">项目名称</el-col>
                        <el-col :span="8" class="">{{v.itemName}}</el-col>
                        <el-col :span="4" class="col999">服务技师</el-col>
                        <el-col :span="8" class=""><span class="colblue">{{v.employeeNames}}</span></el-col>
                    </el-row>
                    <el-row class="top5">
                        <el-col :span="4" class="col999">所属分类</el-col>
                        <el-col :span="8" class="">{{v.itemClassName}}</el-col>
                        <el-col :span="4" class="col999">服务房间</el-col>
                        <el-col :span="8" class="">{{v.room?v.room.name:''}}</el-col>
                    </el-row>
                    <el-row class="top5">
                        <el-col :span="4" class="col999">预约时长</el-col>
                        <el-col :span="8" class="">{{v.orderTime}}（分钟）</el-col>
                        <el-col :span="4" class="col999">原价</el-col>
                        <el-col :span="8" class="">{{v.orderPrice}}元</el-col>
                    </el-row>
                    <el-row class="top5">
                        <el-col :span="4" class="col999">优惠价</el-col>
                        <el-col :span="8" class="">{{v.payPrice}}元</el-col>
                        <el-col :span="4" class="col999">实际扣款</el-col>
                        <el-col :span="8" class="">{{v.actualOrderPrice}}元</el-col>
                    </el-row>
                </div>
            </el-card>
            <el-card v-if="info.assembleInfo"  class="top10"  >
                <div slot="header" class="clearfix">
                   【拼团信息】
                </div>
                <el-row>
                    <el-col :span="4" class="col999">团员</el-col>
                    <el-col :span="8" class="">{{info.assembleInfo.memberNames}}</el-col>
                </el-row>
                <el-row class="top5">
                    <el-col :span="4" class="col999">拼团价格(元)</el-col>
                    <el-col :span="8" class="">{{info.assembleInfo.assemblePrice}}</el-col>
                </el-row>
            </el-card>
             <el-card v-if="!info.assembleInfo && info.couponInfo" class="top10" >
                <div slot="header" class="clearfix">
                   【优惠券信息】
                </div>
                <el-row>
                    <el-col :span="4" class="col999">优惠券名称</el-col>
                    <el-col :span="8" class="">{{info.couponInfo.couponName}}</el-col>
                </el-row>
				<el-row class="top5">
				    <el-col :span="5" class="col999">优惠类型</el-col>
				    <el-col :span="7" class="">{{info.couponInfo.couponType}}</el-col>
				</el-row>
				<el-row class="top5" v-if="info.couponInfo.couponType=='折扣'">
				    <el-col :span="5" class="col999">优惠折扣（折）</el-col>
				    <el-col :span="7" class="">{{info.couponInfo.couponDenomination}}折</el-col>
				</el-row>
				<el-row class="top5" v-else-if="info.couponInfo.couponType=='抵扣分钟'">
				    <el-col :span="5" class="col999">优惠时长（分）</el-col>
				    <el-col :span="7" class="">{{info.couponInfo.couponDenomination}}分</el-col>
				</el-row>
				<el-row class="top5" v-else>
				    <el-col :span="5" class="col999">优惠金额（元）</el-col>
				    <el-col :span="7" class="">{{info.couponInfo.couponDenomination}}元</el-col>
				</el-row>
            </el-card>
        </el-col>
        <el-col :span="8" style="padding-left: 10px">
            <div class="yhBoard">
                <div class="pad20 bor_btm_so">
                    <p class="font16b">用户信息</p>
                    <el-row class="top10">
                        <el-col :span="7" class="col999">用户名</el-col>
                        <el-col :span="16" class="">{{info.userInfo.userName}}</el-col>
                    </el-row>
                    <el-row class="top5">
                        <el-col :span="7" class="col999">性别</el-col>
                        <el-col :span="16" class="">{{info.userInfo.sexName}}</el-col>
                    </el-row>
                    <el-row class="top5">
                        <el-col :span="7" class="col999">电话</el-col>
                        <el-col :span="16" class="">{{info.userInfo.telephoneNum}}</el-col>
                    </el-row>
                </div>
                <div class="pad20 bor_btm_so">
                    <p class="font16b">用户评价</p>
                    <div v-for="(v) in info.OrderEvaluateInfo" :key="v.id">
                        <el-row class="top10">
                            <el-col :span="8" class="">技师：{{v.employeeName}}</el-col>
                            <el-col :span="7" class="">评分：{{v.evaluateScore}}分</el-col>
                            <el-col :span="9" class="">标签：{{v.evaluateLabel}}</el-col>
                        </el-row>
                    </div>
                </div>
                <div class="pad20 bor_btm_so">
                    <p class="font14b">状态信息</p>

                    <el-row v-for="(v,index) in info.orderRecordInfo" :key="v.id"  class="top10 font12">
                        <el-col :span="8" class="">
                            <p class="colblue">{{v.createTime}}</p>
                            
                            <img src="../../../assets/img/img2.png" v-if="index!=info.orderRecordInfo.length-1" class="left25" alt="">
                        </el-col>
                        <el-col :span="16" class="">{{v.content}}</el-col>
                    </el-row>
                </div>
            </div>
        </el-col>
    </el-row>
   
</template>
<script>
    import bus from '../../../bus';
    import {orderService} from '../../../service/order';
    export default {
        name: 'OrderDetail',
        props: ['row', 'info'],
        data() {
            return {
                // info:{}
            }
        },
        computed:{
            
        },
        methods:{
           
        },
        mounted(){
            const t = this;
            console.log(t.info)
            t.info.orderRecordInfo.reverse()
            // orderService.getOrderDetal().then((res)=>{
            //     t.info = res
            // })
        }
    }
</script>
<style scoped>
    
</style>
