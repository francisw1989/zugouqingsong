<template>
    <el-row>
        <el-col :span="16">
            <el-card class="">
                <div slot="header" class="clearfix">
                   【基本信息】
                </div>
                <el-row>
                    <el-col :span="4" class="col999">订单编号</el-col>
                    <el-col :span="8" class="">21312312</el-col>
                </el-row>
                <el-row class="top5">
                    <el-col :span="4" class="col999">当前状态</el-col>
                    <el-col :span="8" class="">已完成</el-col>
                    <el-col :span="4" class="col999">服务门店</el-col>
                    <el-col :span="8" class="">弘扬总店</el-col>
                </el-row>
                <el-row class="top5">
                    <el-col :span="4" class="col999">实际消费</el-col>
                    <el-col :span="8" class="">363元</el-col>
                    <el-col :span="4" class="col999">服务房间</el-col>
                    <el-col :span="8" class="">101荷花亭</el-col>
                </el-row>
                <el-row class="top5">
                    <el-col :span="4" class="col999">服务时间</el-col>
                    <el-col :span="8" class="">2653-6563-6</el-col>
                    <el-col :span="4" class="col999">支付方式</el-col>
                    <el-col :span="8" class="">现金</el-col>
                </el-row>
            </el-card>
            <el-card class="top10">
                <div slot="header" class="clearfix">
                   【服务项目】
                </div>
                <el-row>
                    <el-col :span="4" class="col999">项目名称</el-col>
                    <el-col :span="8" class="">颈椎放松</el-col>
                    <el-col :span="4" class="col999">服务技师</el-col>
                    <el-col :span="8" class=""><span class="colblue">豆腐坊</span></el-col>
                </el-row>
                <el-row class="top5">
                    <el-col :span="4" class="col999">所属分类</el-col>
                    <el-col :span="8" class="">休闲放松</el-col>
                    <el-col :span="4" class="col999">服务评价标签</el-col>
                    <el-col :span="8" class="">力道刚刚好</el-col>
                </el-row>
                <el-row class="top5">
                    <el-col :span="4" class="col999">服务时长</el-col>
                    <el-col :span="8" class="">60</el-col>
                </el-row>
                <el-row class="top5">
                    <el-col :span="4" class="col999">价格</el-col>
                    <el-col :span="8" class="">60</el-col>
                    <el-col :span="4" class="col999">消费金额</el-col>
                    <el-col :span="8" class="">600</el-col>
                </el-row>
            </el-card>
            <el-card class="top10">
                <div slot="header" class="clearfix">
                   【服务项目】
                </div>
                <el-row>
                    <el-col :span="4" class="col999">项目名称</el-col>
                    <el-col :span="8" class="">颈椎放松</el-col>
                    <el-col :span="4" class="col999">服务技师</el-col>
                    <el-col :span="8" class=""><span class="colblue">豆腐坊</span></el-col>
                </el-row>
                <el-row class="top5">
                    <el-col :span="4" class="col999">所属分类</el-col>
                    <el-col :span="8" class="">休闲放松</el-col>
                    <el-col :span="4" class="col999">服务评价标签</el-col>
                    <el-col :span="8" class="">力道刚刚好</el-col>
                </el-row>
                <el-row class="top5">
                    <el-col :span="4" class="col999">服务时长</el-col>
                    <el-col :span="8" class="">60</el-col>
                </el-row>
                <el-row class="top5">
                    <el-col :span="4" class="col999">价格</el-col>
                    <el-col :span="8" class="">60</el-col>
                    <el-col :span="4" class="col999">消费金额</el-col>
                    <el-col :span="8" class="">600</el-col>
                </el-row>
            </el-card>
            <el-card class="top10">
                <div slot="header" class="clearfix">
                   【拼团信息】
                </div>
                <el-row>
                    <el-col :span="4" class="col999">是否拼团</el-col>
                    <el-col :span="8" class="">否</el-col>
                    <el-col :span="4" class="col999">团员</el-col>
                    <el-col :span="8" class="">张三,李四</el-col>
                </el-row>
                <el-row class="top5">
                    <el-col :span="4" class="col999">拼团价格(元)</el-col>
                    <el-col :span="8" class="">325</el-col>
                </el-row>
            </el-card>
             <el-card class="top10">
                <div slot="header" class="clearfix">
                   【优惠券信息】
                </div>
                <el-row>
                    <el-col :span="5" class="col999">是否使用优惠券</el-col>
                    <el-col :span="7" class="">否</el-col>
                    <el-col :span="4" class="col999">优惠券代码</el-col>
                    <el-col :span="8" class="">21321121212</el-col>
                </el-row>
                <el-row class="top5">
                    <el-col :span="5" class="col999">优惠金额(元)</el-col>
                    <el-col :span="7" class="">325</el-col>
                </el-row>
            </el-card>
        </el-col>
        <el-col :span="8" style="padding-left: 10px">
            <div class="yhBoard">
                <div class="pad20 bor_btm_so">
                    <p class="font16b">用户信息</p>
                    <el-row class="top10">
                        <el-col :span="7" class="col999">用户名</el-col>
                        <el-col :span="16" class="">张三</el-col>
                    </el-row>
                    <el-row class="top5">
                        <el-col :span="7" class="col999">性别</el-col>
                        <el-col :span="16" class="">男</el-col>
                    </el-row>
                    <el-row class="top5">
                        <el-col :span="7" class="col999">电话</el-col>
                        <el-col :span="16" class="">43243242342</el-col>
                    </el-row>
                    <el-row class="top5">
                        <el-col :span="7" class="col999">邮箱</el-col>
                        <el-col :span="16" class="">33222C@qq.com</el-col>
                    </el-row>
                    <el-row class="top5">
                        <el-col :span="7" class="col999">会员等级</el-col>
                        <el-col :span="16" class="">23</el-col>
                    </el-row>
                    <el-row class="top5">
                        <el-col :span="7" class="col999">积分</el-col>
                        <el-col :span="16" class="">32423</el-col>
                    </el-row>
                    <el-row class="top5">
                        <el-col :span="7" class="col999">账户余额</el-col>
                        <el-col :span="16" class="">3242</el-col>
                    </el-row>
                </div>
                <div class="pad20 bor_btm_so">
                    <p class="font16b">用户评价</p>
                    <el-row class="top10">
                        <el-col :span="7" class="col999">评分</el-col>
                        <el-col :span="16" class="">3</el-col>
                    </el-row>
                    <el-row class="top5">
                        <el-col :span="7" class="col999">标签</el-col>
                        <el-col :span="16" class="">地方但是</el-col>
                    </el-row>
                    <el-row class="top5">
                        <el-col :span="7" class="col999">建议</el-col>
                        <el-col :span="16" class="">但是范德萨范德萨范德萨范德萨爱迪生</el-col>
                    </el-row>
                </div>
                <div class="pad20 bor_btm_so">
                    <p class="font14b">状态信息</p>
                    <el-row class="top10 font12">
                        <el-col :span="8" class="">
                            <p class="colblue">今天12:21</p>
                            <img src="../../../assets/img/img2.png" class="left25" alt="">
                        </el-col>
                        <el-col :span="16" class="">服务完成</el-col>
                    </el-row>
                    <el-row class="font12">
                        <el-col :span="8" class="">
                            <p class="colblue">今天12:21</p>
                            <img src="../../../assets/img/img2.png" class="left25" alt="">
                        </el-col>
                        <el-col :span="16" class="">服务完成</el-col>
                    </el-row>
                    <el-row class="font12">
                        <el-col :span="8" class="">
                            <p class="colblue">今天12:21</p>
                        </el-col>
                        <el-col :span="16" class="">服务完成</el-col>
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
        data() {
            return {
                info:{}
            }
        },
        computed:{
            
        },
        methods:{
           
        },
        mounted(){
            const t = this;
            orderService.getOrderDetal().then((res)=>{
                t.info = res
            })
        }
    }
</script>
<style scoped>
    
</style>
