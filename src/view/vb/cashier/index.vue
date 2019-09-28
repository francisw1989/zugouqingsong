<template>
<div class="wapper">
    <div class="header relative">
        <i class="el-icon-back" @click="back"></i>
        <span class="font18">足够轻松  门店收银系统</span>
        <span class="currTime">2019年 07月 23日    18:30</span>
    </div>
    <div class="main">
        <el-row style="height: 100%">
            <el-col :span="6" style="height: 100%; padding: 5px">
                <div class="area relative" style='background-color: #f5f5f5'>
                    <div class="center bor_btm_so font18 col000" style="padding-bottom: 15px">会员信息</div>
                    <div class="top15 center">
                        <el-radio-group v-model="tab1">
                            <el-radio-button label="检索"></el-radio-button>
                            <el-radio-button label="信息"></el-radio-button>
                        </el-radio-group>
                    </div>
                    <div class="top15">
                        <div v-if="tab1=='检索'" class="clearfix">
                            <el-form  ref="form" :model="seachForm"  :rules="rules"   label-width="70px">
                                <el-form-item label="会员号" style="" class="">
                                    <el-input v-model="seachForm.memberNum" placeholder=""></el-input>
                                </el-form-item>
                                <el-form-item label="手机号" style="" class="">
                                    <el-input v-model="seachForm.telephoneNum" placeholder=""></el-input>
                                </el-form-item>
                                <el-form-item label="姓名" style="" class="">
                                    <el-input v-model="seachForm.userName" placeholder=""></el-input>
                                </el-form-item>
                                <el-form-item label="房间号" style="" class="">
                                    <el-input v-model="seachForm.roomName" placeholder=""></el-input>
                                </el-form-item>
                            </el-form>
                            <div class="btns btns1 absolute" style="left: 0; bottom: 0" @click="customSeach('seachForm')">检索</div>
                        </div>
                        <div v-if="tab1=='信息'" class="clearfix">
                            <div class="clearfix">
                                <img src="../../../assets/img/img.jpg" width="50" height="50" style="border-radius: 50%" alt="" class="left right10" />
                                <p class="top5">李先生</p>
                                <p class="colye">二星会员</p>
                            </div>
                            <el-form class="top15"  ref="form" :model="form1"  label-width="80px" label-position='left'>
                                <el-form-item label="会员号" style="" class="">
                                    {{userForm.memberNum}}
                                </el-form-item>
                                <el-form-item label="手机号" style="" class="">
                                    {{userForm.telephoneNum}}
                                </el-form-item>
                                <el-form-item label="姓名" style="" class="">
                                    {{userForm.userName}}
                                </el-form-item>
                                <el-form-item label="性别" style="" class="">
                                    {{userForm.sex==0?'女':'男'}}
                                </el-form-item>
                                <el-form-item label="生日" style="" class="">
                                    {{userForm.birthday}}
                                </el-form-item>
                                <el-form-item label="积分" style="" class="">
                                    {{userForm.score}}
                                </el-form-item>
                                <el-form-item label="虚拟账户" style="" class="">
                                    {{userForm.savingsAccount/1000}}
                                </el-form-item>
                                <el-form-item label="储值账户" style="" class="">
                                    {{userForm.virtualAccount/1000}}
                                    <el-button type="primary" class="left10">充值</el-button>
                                    <div class="colye">余额不足</div>
                                </el-form-item>
                            </el-form>
                            <div class="col999 top10">*此用户为红名单用户</div>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="18" style="height: 100%;">
                <el-row style="height: 100%;">
                    <el-col style="height: 100%; padding: 5px 5px 5px 0" :span="tab1=='信息'?16:24">
                        <div class="area" >
                            <div v-if="tab1=='检索'" class="bor_btm_so font18 col000" style="padding-bottom: 15px">待到店(24)</div>
                            <div v-if="tab1=='信息'" class="bor_btm_so font18 col000" style="padding-bottom: 15px">预约订单</div>
                            <div style="height: 80%; overflow: auto">
                                <table class="m-table3">
                                    <tr class="tr">
                                        <td>姓名</td>
                                        <td>会员等级</td>
                                        <td>预约项目</td>
                                        <td>预约时间</td>
                                        <td>手机号</td>
                                        <td>距离到店</td>
                                    </tr>
                                    <template v-for="(v, i) in list">
                                        <tr>
                                            <td>{{v.a}}</td>
                                            <td>{{v.a}}</td>
                                            <td>{{v.a}}</td>
                                            <td>{{v.a}}</td>
                                            <td>{{v.a}}</td>
                                            <td style="width: 100px" class="align-right"><span v-bind:time='v.time' :id="'time' + i"></span></td>
                                        </tr>
                                        <tr>
                                            <td colspan="6" class="align-right">
                                                <el-button type="primary" size="mini" v-if='!v.isArrived' @click='confirmArrived(v)'>确认到店</el-button>
                                                <el-button v-if="v.isArrived && !v.isRoomed" type="primary" size="mini" class="left10" @click="doFpfj(i ,v)">分配房间</el-button>
                                                <el-button v-if="v.isArrived && v.isRoomed" type="primary" size="mini" class="left10" @click="doChangeJishi(i ,v)">更换技师</el-button>
                                                <el-button v-if="v.isArrived && v.isRoomed" type="primary" size="mini" class="left10" @click="doChangeRoom(i ,v)">更换房间</el-button>
                                            </td>
                                        </tr>
                                    </template>
                                </table>
                            </div>
                            <!-- <div class="pagination">
                                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                                </el-pagination>
                            </div> -->
                        </div>
                    </el-col>
                    <el-col v-if="tab1=='信息'" style="height: 100%; padding: 5px 5px 5px 0" :span="8">
                        <div class="area">
                            <div class="center bor_btm_so font18 col000" style="padding-bottom: 15px">店内项目</div>
                            <el-tabs v-model="tab2" class="top10" @tab-click="tab2Click">
                                <el-tab-pane v-for='(v, i) in tab2List' :key="i" :label="v"></el-tab-pane>
                            </el-tabs>
                            <div style="height: 75%; overflow: auto">
                                <div class="clearfix bor_btm_so pad10TB" v-for="(v, i) in xmList" :key="i">
                                    <img src="../../../assets/img/img.jpg" width="70" height="70" style="border-radius: 3px" alt="" class="left right10" />
                                    <p class="col000">
                                        【颈椎放松】
                                        <span class="right">默认：60分钟</span>
                                    </p>
                                    <p class="top5">单价：<span class="colred">60</span> 元/小时</p>
                                    <div class="top5 xmWap">
                                        <span class="colred">¥168</span>
                                        <el-input-number class="right" size='mini' v-model="v.num" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
                                    </div>
                                </div>
                            </div>
                            <div class="xzFoot clearfix">
                                <div class="left top5">
                                    <el-badge :value="2" class="item">
                                        <span class="pad10RL">选择项目</span>
                                    </el-badge>
                                </div>
                                <el-button type="primary" @click="timeChangeLengthVisible = true" size="mini" class="right">下一步</el-button>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
    <el-dialog title="分配房间" :visible.sync="fpfjVisible" width="350px">
        <div v-for="(v, i) in roomList" :key="i">
            <el-radio v-model="roomNum" :label="i">
                <span>201</span>
                <span class="left10">剩余：2位/4位</span>
                <span class="left10">无烟|娴静|足疗|可SPA</span>
            </el-radio>
            
        </div>
        <span slot="footer" class="dialog-footer">
                <el-button @click="fpfjVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmDoFpfj">确 定</el-button>
            </span>
    </el-dialog>
    <el-dialog title="选择技师" :visible.sync="changeVisible" width="500px">
        <el-tabs v-model="tab2" class="" @tab-click="tab2Click">
            <el-tab-pane v-for='(v, i) in tab2List' :key="i" :label="v"></el-tab-pane>
        </el-tabs>
        <div class="clearfix bor_btm_so pad10TB" v-for="(v, i) in jsList" :key="i">
            <div class="imgWap right10">
                <img src="../../../assets/img/img.jpg" width="50" height="50" style="border-radius: 50%" alt="" class="" />
                <div class="xinWap">
                    <img src="../../../assets/img/2.png" class="xin" />
                    <img src="../../../assets/img/2.png" class="xin" />
                </div>
            </div>
            
            <p class="col000">
                <span>张大姐</span>
                <span class="left10">¥1.5/分钟</span>
                <span class="col999 right">评分:4.8分</span>
            </p>
            <p class="">擅长:颈部按摩</p>
        </div>
        <span slot="footer" class="dialog-footer">
                <el-button @click="changeVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmChange">确 定</el-button>
            </span>
    </el-dialog>
    <el-dialog title="项目时长调整" :visible.sync="timeChangeLengthVisible" width="500px">
        <table class="table ">
            <tr  v-for="(v, i) in selectedXmList" :key="i" class="m-table4">
                <td style="width: 90px">
                    <img src="../../../assets/img/img.jpg" width="70" height="70" style="border-radius: 3px" alt="" class="" />
                </td>
                <td class="relative">
                    <div class="clearfix">
                        <span>休闲养生SPA</span>
                        <span class="left20">默认60分钟</span>
                        <span class="right">{{v.time}}</span>
                    </div>
                    <el-slider v-model="v.time" :step="10" :show-tooltip=false :max='120'></el-slider>
                    <div>
                        <span class="colred font20">￥ {{v.time*1.5}}</span>
                        <span class="left20 col999">普通技师：￥1.5/分钟</span>
                    </div>
                </td>
            </tr>
        </table>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="timeLengthChangeNext">下一步</el-button>
        </span>
    </el-dialog>
    <el-dialog title="服务时间选择" :visible.sync="serviceTimeVisible" width="300px">
        <el-time-select v-model="serviceTime" :picker-options="{start: '08:30',step: '00:15',end: '18:30'}" placeholder="选择时间"></el-time-select>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="serviceTimePrev">上一步</el-button>
            <el-button type="primary" @click="serviceTimeNext">下一步</el-button>
        </span>
    </el-dialog>
    <!--成功-->
    <el-dialog title="预约成功" :visible.sync="successVisible" width="360px">
        <el-card shadow="hover" >
            <div class="clearfix">
                <span class="right">今天 21:30</span>
                <span class="col999">时间</span>
            </div>
            <div class="clearfix">
                <span class="right">颈椎放松</span>
                <span class="col999">预约项目</span>
            </div>
            <div class="clearfix">
                <span class="right">张三</span>
                <span class="col999">预约技师</span>
            </div>
            <div class="clearfix">
                <span class="right">$15/分钟</span>
                <span class="col999">单价</span>
            </div>
            <div class="clearfix">
                <span class="colred right">¥200</span>
                <span class="col999">总价</span>
            </div>

        </el-card>
        <div class="center top15">
            <el-radio-group v-model="payType"  @change='payTypeChange'>
                <el-radio-button :label="i"  v-for="(v, i) in payTypeList" :key="i" >{{v}}</el-radio-button>
            </el-radio-group>
        </div>
        <div class="center top15">
            <img src="../../../assets/img/1.png"  width="130" />
        </div>
        <div class="top15 center">
            <i class="el-icon-loading"></i>
            <span class="col999 left10">等待支付</span>
            <span class="colred left10" time='2019/09/08' id="payCountTime"></span>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="successVisible = false">完成支付</el-button>
        </span>
    </el-dialog>
</div>
</template>
<script>
// 场景一  线上预约过来的    出现的按钮依次： 确认到店--分配房间 -- 更换技师  更换房间
// 场景二   直接到店消费       操作步骤：选择项目--选择时长---选择预约时间-- 选择技师 --- 支付  可出现的按钮：分配房间
    const Form = {
        a: '',
        b: '',
        c: ''
    }
    const SeachForm = {
        memberNum: '',
        telephoneNum:'',
        userName: '',
        roomName: '',
        pageSize: '100',
        pageNumber: '1'  
        

    }
    import {cashierService} from '../../../service/cashier';
    import {orderService} from '../../../service/order';
    export default {
        data() {
            return {
                seachForm: JSON.parse(JSON.stringify(SeachForm)),
                userForm: {},
                appointList: [], // 待到店列表
                itemClassList: [], // 项目分类列表
                itemList: [], // 项目列表
                list: [],
                tab1: '检索',
                tab2: 0,
                tab2List: ['休闲放松1','休闲放松2','休闲放松3'],
                form: {
                    a: '',
                    b: '',
                    c: ''
                },
                rules: {
                    a: [
                        { required: true, message: '请输入', trigger: 'change' },
                    ]
                },
                form1: {
                    a: '',
                    b: '',
                    c: ''
                },
                xmList: [{num: 1},{num: 1},{num: 1},{num: 1},{num: 1}],
                jsList: ['', '','',''],
                
                chosed: false,
                fpfjVisible: false,
                roomList: ['','',''],
                roomNum: 0,
                changeVisible: false,
                timeChangeLengthVisible: false,
                selectedXmList: [{time: 30},{time: 30}],
                serviceTimeVisible: false,
                serviceTime: '',
                successVisible: false,
                payTypeList:['扫码支付', '现金','支付宝','微信','银联'],
                payType: '0',
                onlineBookingStep: 0,
                underLineBookingStep: 0,
                
            }
        },
        components: {
            
        },
        computed:{
            
        },
        methods:{
            getAppointList(){
                const t = this;
                cashierService.getAppointList({
                    pageSize: 100, 
                    pageNumber: 1,
                    storeId: 2,
                    userId: ''
                }).then((res)=>{
                    t.appointList = res.records
                });
            },
            confirmArrived(v){
                const t = this;
                v.isArrived = true;
                t.list = JSON.parse(JSON.stringify(t.list))
            },
            handleChange(){

            },
            customSeach(seachform){
                const t = this;
                t.tab1 = '信息';
                this.$refs[seachform].validate((valid) => {
                    if (valid) {
                        let params = {};
                        // t.editVisible = false;
                        for(let key in SeachForm){
                            params[key] = t.seachForm[key]
                        }
                        cashierService.customSeach(params).then(()=>{
                            
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
                
            },
            payTypeChange(){

            },
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            tab2Click(){

            },
            confirmDoFpfj(){
                const t = this;
                t.fpfjVisible = false;
                t.list[t.idx].isRoomed = true;
                t.list = JSON.parse(JSON.stringify(t.list))
            },
            // 跟换技师确认
            confirmChange(){
                const t = this;
                t.changeVisible = false;
                if(t.directBook){
                    t.directBook = false;
                    setTimeout(() => {
                        t.successVisible = true;
                        t.$commonService.getTime('payCountTime')
                    }, 300);
                }
                
            },
            // 分配房间
            doFpfj(i, v){
                const t = this;
                t.fpfjVisible = true;
                t.idx = i;
            },
            // 更换技师
            doChangeJishi(){
                const t = this;
                t.changeVisible = true;
            },
            // 更换房间
            doChangeRoom(){
                const t = this;
                t.fpfjVisible = true;
            },
            // 项目时长调整下一步
            timeLengthChangeNext(){
                const t = this;
                t.timeChangeLengthVisible = false;
                setTimeout(() => {
                    t.serviceTimeVisible = true;    
                }, 300);
                
            },
            // 服务时间上一步
            serviceTimePrev(){
                const t = this;
                t.timeChangeLengthVisible = true;
                t.serviceTimeVisible = false;
            },
            // 服务时间下一步
            serviceTimeNext(){
                const t = this;
                t.serviceTimeVisible = false;
                
                setTimeout(() => {
                    t.directBook = true;
                    t.doChangeJishi();
                }, 300);
            },
            
            back(){
                window.location.href = '/'
            },
            getItemClassList(){
                const t = this;
                orderService.getItemClassList().then((res)=>{
                    t.itemClassList = res.records;
                    t.getItemList(t.itemClassList[0].id)
                })
            },
            getItemList(itemClassId){
                const t = this;
                orderService.getItemList({
                    pageSize: 100,
                    pageNumber: 1,
                    itemClassId: itemClassId
                }).then((res)=>{
                    t.itemList = res.records
                }); 
            }

        },
        mounted(){
            const t = this;
            t.getAppointList();
            t.getItemClassList();
            


           setTimeout(()=>{
                this.$notify({
                    message: '您有新的订单',
                    duration: 0
                });
           }, 3000)
           document.body.style.zoom = '1'
           cashierService.list().then((res)=>{
               t.list = res;
               setTimeout(() => {
                   for(const i in t.list){
                       t.$commonService.getTime('time' + i)
                   }
               }, 100);
           })

        }
    }
</script>
<style scoped>
.el-icon-back{ position: absolute; top:20px; left: 20px; color: #fff; font-size: 20px; cursor: pointer;}
.currTime{ position: absolute; top: 0; right: 20px; line-height: 60px; color: #fff;}
.wapper{  width: 100%; height: 100%; background-color: #f1f1f1; position: relative;}
.main{ width: 100%; height: 100%; box-sizing: border-box; padding-top: 60px;  position: relative;}
.header{ height: 60px; line-height: 60px; color: #fff; text-align: center; background-color: #459E8C; position: absolute; width: 100%; top: 0; left: 0; z-index: 2;}
.area { width: 100%; height: 100%; overflow: auto; background-color: #fff; box-shadow: 0 0 5px rgba(0,0,0,0.1); box-sizing: border-box; padding: 30px; position: relative;}
.btns{ display: inline-block; cursor: pointer; text-align: center; color: #fff}
.btns1{ width: 100%; line-height: 40px;  background-color: #459E8C}

.pagination{ position: absolute; width: 100%; left: 0; bottom: 0; box-sizing: border-box; margin: 0; text-align: center;}
.xzFoot{ width: 100%; box-sizing: border-box; padding: 10px; background-color: #EEEEEE; position: absolute; left: 0; bottom: 0;}

.imgWap{ width: 50px; height: 50px; float: left; position: relative;}
.imgWap .xinWap{ position: absolute; width: 100%; left: 0; bottom: 0;  }
.imgWap .xinWap .xin{ width: 10px; height: 10px; float: right; margin-left: 3px;}
</style>
