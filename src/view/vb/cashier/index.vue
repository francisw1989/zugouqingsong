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
                    <div class="center bor_btm_so font18 col000 relative" style="padding-bottom: 15px">
                        会员信息
                        <el-button size="mini" class="absolute" @click="addCustomerVisible=true" style="top: 0; right:0">添加会员</el-button>
                    </div>
                    <div class="top15 center ">
                        <el-radio-group v-model="tab1">
                            <el-radio-button label="检索"></el-radio-button>
                            <el-radio-button label="信息" disabled></el-radio-button>
                        </el-radio-group>
                        
                    </div>
                    <div class="top15">
                        <div v-if="tab1=='检索'" class="clearfix">
                            <el-form ref="seachForm" :model="seachForm"  :rules="rules"   label-width="70px">
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
                                <p class="top5">{{userForm.userName}}</p>
                                <p class="colye">{{leveName[userForm.memberLevel]}}</p>
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
                                    {{userForm.savingsAccount/100}}
                                </el-form-item>
                                <el-form-item label="储值账户" style="" class="">
                                    {{userForm.virtualAccount/100}}
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
                            <div v-if="tab1=='检索'" class="bor_btm_so font18 col000" style="padding-bottom: 15px">待服务({{appointList.length}})</div>
                            <div v-if="tab1=='信息'" class="bor_btm_so font18 col000" style="padding-bottom: 15px">预约订单</div>
                            <div style="height: 80%; overflow: auto" class="clearfix">
                                <div @click="appointListClick(v, i)" v-for="(v, i) in appointList" :key="i" style="border-bottom: 5px solid #ddd" class="top10">
                                    <div class="pad10TB bor_btm_so clearfix col000">
                                        订单编号：<span class='col999'>{{v.outTradeNo}}</span>
                                        <span class="right colblue">距离到店还有：<span v-bind:time='v.orderStartTimeObj' :id="'time' + i"></span></span>
                                    </div>
                                    <div class="" style="padding: 0 15px">
                                        <div class="bor_btm_so pad10TB clearfix">
                                            <span class="left5"><i class="el-icon-lx-people"></i><span class="left10">{{v.user.userName}}</span></span>
                                            <span class="left20">{{leveName[v.user.memberLevel]}}</span>
                                            <span class="left20">手机号：<span class='col999'>{{v.user.telephoneNum}}</span></span>
                                            
                                        </div>
                                        <div class=" pad10TB">
                                            <table class="m-table1">
                                                <tr v-for='(oItem, oIndex) in v.orderItems' :key="oIndex">
                                                    <td style="width: 15px"><i v-if="oIndex==0" class="el-icon-lx-tag"></i></td>
                                                    <td style="width: 100px">{{oItem.itemName}}</td>
                                                    <td style="width: 200px">技师：{{oItem.orderTechniciansNames}}</td>
                                                    <td class="col999">{{oItem.orderStartTime}}</td>
                                                    <td class="align-right">
                                                        <div v-if="oIndex==v.orderItems.length-1">
                                                            <el-button type="primary" size="mini" v-if='v.status==2' @click.stop='confirmArrived(i, v)'>确认到店</el-button>
                                                            <el-button v-if="v.status==3" type="primary" size="mini" class="left10" @click.stop="doFpfj(v, i)">{{v.orderItems[0].roomId?'跟换房间':'分配房间'}}</el-button>
                                                            <el-button v-if="v.status==3" type="primary" size="mini" class="left10" @click.stop="doChangeJishi(v, i)">更换技师</el-button>
                                                            <el-button v-if="v.status==4" type="primary" size="mini" class="left10" @click.stop="finishOrder(v, i)">结束服务</el-button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </table>
                                           
                                        </div>

                                    </div>
                                </div>
                                <div class="center top40 col999" v-if="!appointList.length">暂无订单</div>
                            </div>
                                
                        </div>
                    </el-col>
                    <el-col v-if="tab1=='信息'" style="height: 100%; padding: 5px 5px 5px 0" :span="8">
                        <div class="area">
                            <div class="center bor_btm_so font18 col000" style="padding-bottom: 15px">店内项目</div>
                            <el-tabs v-model="choosedItemIndex" class="top10" @tab-click="itemClassClick">
                                <el-tab-pane v-for='(v, i) in itemClassList' :key="i" :name="i + ''" :label="v.itemClassName"></el-tab-pane>
                            </el-tabs>
                            <div style="height: 75%; overflow: auto">
                                <template v-if="itemClassList[choosedItemIndex].itemList">
                                    <div class="clearfix bor_btm_so pad10TB"  v-for="(v, i) in itemList" :key="i">
                                        <img :src="v.imgs" width="70" height="70" style="border-radius: 3px" alt="" class="left right10" />
                                        <p class="col000">
                                            {{v.itemName}}
                                            <span class="right">默认：{{v.defaultDuration}}分钟</span>
                                        </p>
                                        <p class="top5">单价：<span class="colred">{{v.unitPrice}}</span> 元/分钟</p>
                                        <div class="top5 xmWap">
                                            <span class="colred">¥{{v.defaultPrice}}</span>
                                            <el-input-number class="right" size='mini' v-model="v.num" @change="projectNumChange(v, i)" :min="0" :max="10" label="描述文字"></el-input-number>
                                        </div>
                                    </div>
                                </template>
                            </div>
                            <div class="xzFoot clearfix">
                                <div class="left top5">
                                    <el-badge :value="chooseTechnicIdAll.length" class="item">
                                        <span class="pad10RL">选择项目</span>
                                    </el-badge>
                                </div>
                                <el-button type="primary" @click="doChooseProject" size="mini" class="right">下一步</el-button>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
    <el-dialog title="选择替换技师" :close-on-press-escape='false' :close-on-click-modal='false' :visible.sync="replaceJishiVisible" width="500px">
        <template v-for="(v, i) in technicianList">
            <div class="clearfix bor_btm_so pad10TB"  :key="i"   v-if="!v.hasChoosedByOther">
                <div class="imgWap right10">
                    <img :src="v.photo" width="50" height="50" style="border-radius: 50%" alt="" class="" />
                    <div class="xinWap">
                        <img src="../../../assets/img/2.png" v-for="(v2, i2) in v.levelArr" :key='i2' class="xin" />
                    </div>
                </div>
                <p class="col000">
                    <span>{{v.employeeName}}</span>
                    <span class="left10">¥{{v.pricePerMinute/100}}/分钟</span>
                    <span class="col999 right">评分:{{Number(v.score).toFixed(1)}}分</span>
                </p>
                <p class=""><span class="pointer right colblue" @click="confirmChangeJishi(v, i)">选择并替换</span></p>
            </div>
        </template>
        <p class="pad20 center col999" v-if="!technicianList.length">暂无可替换技师</p>
    </el-dialog>
    <el-dialog title="跟换技师" :close-on-press-escape='false' :close-on-click-modal='false' :visible.sync="changeJishiVisible" width="500px">
        <div v-if="currentOrder.orderItems && currentOrder.orderItems.length"> 
            <el-tabs v-model="currentOrderItemIndex" class="" @tab-click="tab3Click">
                <el-tab-pane v-for='(v, i) in currentOrder.orderItems' :key="i" :name="i + ''" :label="v.itemName"></el-tab-pane>
            </el-tabs>
            <template v-for="(v, i) in currentOrder.orderItems[currentOrderItemIndex].orderTechnicians">
                <div class="clearfix bor_btm_so pad10TB"  :key="i"  >
                    <div class="imgWap right10">
                        <img :src="v.photo" width="50" height="50" style="border-radius: 50%" alt="" class="" />
                        <div class="xinWap">
                            <img src="../../../assets/img/2.png" v-for="(v2, i2) in v.levelArr" :key='i2' class="xin" />
                        </div>
                    </div>
                    <p class="col000">
                        <span>{{v.employeeName}}</span>
                        <span class="left10">¥{{v.pricePerMinute/100}}/分钟</span>
                        <span class="col999 right">评分:{{Number(v.score).toFixed(1)}}分</span>
                    </p>
                    <p class=""><span class="pointer right colblue" @click="openReplaceJishiModal(v, i)">选择替换该技师</span></p>
                </div>
            </template>
        </div>
    </el-dialog>
    <el-dialog title="分配房间" :close-on-press-escape='false' :close-on-click-modal='false' :visible.sync="fpfjVisible" width="350px">
        <el-tabs v-model="currentOrderItemIndex" class="" @tab-click="tab3Click">
            <el-tab-pane v-for='(v, i) in currentOrder.orderItems' :key="i" :name="i + ''" :label="v.itemName"></el-tab-pane>
        </el-tabs>
        <template v-for='(v, i) in currentOrder.orderItems'>
            <el-radio-group v-model="v.roomId" :key="i" v-if="i==currentOrderItemIndex">
                <el-radio :label="v2.id" v-for="(v2) in roomList" :key="v2.id" style="margin: 10px 0 0 0">
                    <span>{{v2.name}}</span>
                    <span class="left10">剩余：{{v2.useNum || 0}}位/{{v2.peopleNum}}位</span>
                    <span class="left10">{{v2.labels}}</span>
                </el-radio>
            </el-radio-group>
        </template>
        <span slot="footer" class="dialog-footer">
            <!-- <el-button @click="fpfjVisible = false">取 消</el-button> -->
            <el-button type="primary" @click="confirmDoFpfj">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog title="选择技师" :close-on-press-escape='false' :close-on-click-modal='false' :visible.sync="changeVisible" width="500px">
        <el-tabs v-model="choosenProjectIndex" class="" @tab-click="tab2Click">
            <el-tab-pane v-for='(v, i) in choosenProject' :key="i" :name="i + ''" :label="v.itemName"></el-tab-pane>
        </el-tabs>
        <template v-for="(v, i) in technicianList">
            <div class="clearfix bor_btm_so pad10TB"  :key="i"   v-if="!v.hasChoosedByOther">
                <div class="imgWap right10">
                    <img :src="v.photo" width="50" height="50" style="border-radius: 50%" alt="" class="" />
                    <div class="xinWap">
                        <img src="../../../assets/img/2.png" v-for="(v2, i2) in v.levelArr" :key='i2' class="xin" />
                    </div>
                </div>
                <p class="col000">
                    <span>{{v.employeeName}}</span>
                    <span class="left10">¥{{v.pricePerMinute/100}}/分钟</span>
                    <span class="col999 right">评分:{{Number(v.score).toFixed(1)}}分</span>
                </p>
                <p class=""><span class="pointer right" :class="v.choosed?'col999':'colblue'" @click="doChooseTechnic(v, i)">{{v.choosed?'取消':'选择'}}</span></p>
            </div>
        </template>
        <span slot="footer" class="dialog-footer">
            <!-- <el-button @click="changeVisible = false">取 消</el-button> -->
            <el-button type="primary" @click="confirmChange">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog title="服务时间选择" :close-on-press-escape='false' :close-on-click-modal='false' :visible.sync="serviceTimeVisible" width="300px">
        <el-time-select v-model="time" @change="dateTimeChange" :picker-options="{start: stores.openStartTime, step: '00:30',end: stores.openEndTime}" placeholder="选择时间" style="width: 100%;"></el-time-select>
        <span slot="footer" class="dialog-footer">
            <!-- <el-button type="primary" @click="serviceTimePrev">上一步</el-button> -->
            <el-button type="primary" @click="serviceTimeNext">下一步</el-button>
        </span>
    </el-dialog>
    
    <el-dialog title="项目时长调整" :close-on-press-escape='false' :close-on-click-modal='false' :visible.sync="timeChangeLengthVisible" width="500px">
        <table class="table ">
            <tr  v-for="(v, i) in choosenProject" :key="i" class="m-table4">
                <td style="width: 90px">
                    <img :src="v.imgs" width="70" height="70" style="border-radius: 3px" alt="" class="" />
                </td>
                <td class="relative">
                    <div class="clearfix">
                        <span>{{v.itemName}}</span>
                        <span class="left20">默认{{v.defaultDurationShow}}分钟</span>
                        <span class="right">{{v.defaultDuration}}</span>
                    </div>
                    <el-slider v-model="v.defaultDuration" :step="5" :show-tooltip=false :max='120'></el-slider>
                    <div>
                        <span class="colred font20">￥ {{(v.defaultDuration*v.unitPrice).toFixed(2)}}</span>
                        <span class="left20 col999">普通技师：￥{{v.unitPrice}}/分钟</span>
                    </div>
                </td>
            </tr>
        </table>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="timeLengthChangeNext">下一步</el-button>
        </span>
    </el-dialog>
    <el-dialog title="添加会员" :close-on-press-escape='false' :close-on-click-modal='false' :visible.sync="addCustomerVisible" width="300px">
        <el-form ref="addCustomerForm" :model="addCustomerForm"  :rules="addCustomerRules"   label-width="70px">
            <el-form-item label="姓名" style="" class="" prop="userName">
                <el-input v-model="addCustomerForm.userName" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="性别" style="" class="" prop="sex">
                <el-radio-group v-model="addCustomerForm.sex">
                    <el-radio-button label="1">男</el-radio-button>
                    <el-radio-button label="0">女</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="手机号" style="" class="" prop="telephoneNum">
                <el-input v-model="addCustomerForm.telephoneNum" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="出身日期" style="" class="" prop="birthday">
                <el-date-picker style='width: 100%' v-model="addCustomerForm.birthday" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="addCustom('addCustomerForm')">确定</el-button>
        </span>
    </el-dialog>
    
    <!--成功-->
    <el-dialog title="预约成功" :close-on-press-escape='false' :close-on-click-modal='false' :visible.sync="successVisible" width="360px">
        <el-card shadow="hover" >
            <div class="clearfix">
                <span class="right">{{D.orderStartTime}}</span>
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
// 场景二   直接到店消费       操作步骤：选择项目--选择时长--- -- 选择技师 --- 支付  可出现的按钮：分配房间
    const Form = {
        a: '',
        b: '',
        c: ''
    }
    const AddCustomerForm = {
        userName: '',
        sex: 1,
        telephoneNum: '',
        birthday: ''
    }
    const SeachForm = {
        memberNum: '',
        telephoneNum:'',
        userName: '',
        roomName: '',
        pageSize: '100',
        pageNumber: '1'  
        

    }
    import { Loading } from 'element-ui';
    import {cashierService} from '../../../service/cashier';
    import {orderService} from '../../../service/order';
    import {roomService} from '../../../service/room';
    export default {
        data() {
            return {
                changeJishiVisible: false,
                currentOrderItemIndex: '0',
                D:{},
                addCustomerVisible: false,
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
                addCustomerForm: JSON.parse(JSON.stringify(AddCustomerForm)),
                addCustomerRules:{
                    userName: [
                        { required: true, message: '请输入姓名' }
                    ],
                    sex: [
                        { required: true, message: '请选择性别' }
                    ],
                    telephoneNum: [
                        { required: true, message: '请输入手机号码' }
                    ],
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
                roomId: 0,
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
                leveName: [],
                currentOrder: {},
                currentOrderIndex: 0,
                choosedItemIndex: '0',
                choosenProject: [],
                choosenProjectIndex: '0',
                dateTime: '',
                time: '',
                technicianList: [],
                stores: {},
                userInfo: {},
                chooseTechnicIdAll: [],
                replaceJishiVisible: false,
                currentTechnic: {}
            }
        },
        components: {
            
        },
        computed:{
            
        },
        watch:{
            tab1(val){
                const t = this;
                if(val=='检索'){
                    t.getAppointList()
                }
            }
        },
        methods:{
            // 打开可替换技师弹框
            openReplaceJishiModal(v, i){
                const t = this;
                t.selectTechnician('change').then(res=>{
                    t.replaceJishiVisible=true;
                    t.currentTechnic = v;    
                })
            },
            // 确认跟换技师
            confirmChangeJishi(v, i){
                const t =  this;
                let params = {
                    orderItemId: t.currentOrder.orderItems[t.currentOrderItemIndex].id,
                    oldEmployeeId: t.currentTechnic.employeeId,
                    newEmployeeId:  v.id
                }
                cashierService.changeEmployee(params).then(()=>{
                    t.$message.success('更换成功');
                    t.replaceJishiVisible = false;
                    if(t.tab1=='检索'){
                        t.getAppointList();
                    }else{
                        t.customSeach('seachForm')
                    }
                })
            },
            // 打开现有需要更换技师接口弹框
            doChangeJishi(v, i){
                const t = this;
                t.currentOrder = v;
                t.currentOrderIndex = i;
                t.currentOrderItemIndex = '0';
                t.changeJishiVisible = true;
            },
            finishOrder(v, i){
                const t = this;
                cashierService.finishOrder({orderId: v.id}).then((res)=>{
                    t.$message.success('设置成功');
                })
            },
            addCustom(form){
                const t = this;
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        cashierService.addCustom(t.addCustomerForm).then((res)=>{
                            t.$message.success('添加会员成功');
                            t.seachForm.telephoneNum = t.addCustomerForm.telephoneNum;
                            t.addCustomerVisible = false;
                            t.addCustomerForm = JSON.parse(JSON.stringify(AddCustomerForm));
                            t.customSeach('seachForm');
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
               
            },
            appointListClick(v, i){
                const t = this;
                if(t.tab1=='检索'){
                    t.seachForm.telephoneNum = v.user.telephoneNum;
                    t.customSeach('seachForm')
                }
               
                
            },
            // 给项目选择技师
            doChooseTechnic(v, i){
                const t = this;

                if(v.choosed){
                    v.choosed = false;
                    let index = t.chooseTechnicIdAll.indexOf(v.id)
                    t.chooseTechnicIdAll.splice(index, 1)
                }else{
                    v.choosed = true;
                    t.chooseTechnicIdAll.push(v.id)
                }
                t.choosenProject[t.choosenProjectIndex].choosenTechnician = [];
                for(const v of t.technicianList){
                    if(v.choosed){
                        t.choosenProject[t.choosenProjectIndex].choosenTechnician.push(v);
                    }else{

                    }
                }
                console.log(t.chooseTechnicIdAll)
            },
            dateTimeChange(){
                const t = this;
                let day2 = new Date();
                day2.setTime(day2.getTime());
                let Y = day2.getFullYear();
                let M = day2.getMonth()+1;
                M = M <10 ? '0'+M : M;
                let D = day2.getDate();
                D = D <10 ? '0'+D : D;
                let dateTime = Y+"-" + M + "-" + D + ' ' + t.time + ':00';
                t.dateTime = dateTime;
            },
            // 根据服务时长&&项目&&服务时间 选择技师
            selectTechnician(type){
                let p = new Promise((resolve, reject)=>{
                    const t = this;
                    let params;
                    if(type=='change'){
                        params = {
                            itemIdsStr: t.currentOrder.orderItems[t.currentOrderItemIndex].itemId,
                            timesStr:  t.currentOrder.orderItems[t.currentOrderItemIndex].orderTime,
                            dateTime: t.currentOrder.orderItems[t.currentOrderItemIndex].orderStartTime
                        }
                        cashierService.selectTechnician(params).then((res)=>{
                            if(res.length && res[0].employees.length){
                                t.technicianList = res[0].employees;
                            }
                            resolve();
                        
                        })
                    }else{
                        params = {
                            itemIdsStr: t.choosenProject[t.choosenProjectIndex].id,
                            timesStr:  t.choosenProject[t.choosenProjectIndex].defaultDuration,
                            dateTime: t.dateTime
                        };
                        cashierService.selectTechnician(params).then((res)=>{
                            let selfChoosedIds = t.choosenProject[t.choosenProjectIndex].choosenTechnician.map((item)=>{
                                return item.id;
                            })
                            if(res.length && res[0].employees.length){
                                for(const v of res[0].employees){
                                    if(t.chooseTechnicIdAll.indexOf(v.id)>-1 && selfChoosedIds.indexOf(v.id)<0){
                                        v.hasChoosedByOther = true
                                    }else{
                                        if(selfChoosedIds.indexOf(v.id)>-1){
                                            v.choosed = true;
                                        }
                                        v.hasChoosedByOther = false
                                    }
                                }
                                t.technicianList = res[0].employees;
                                
                                resolve();
                            }
                        
                        })
                    }
                    
                })
                return p;
            },
            doChooseProject(){
                const t = this;
                t.choosenProject = [];
                t.choosenProjectIndex = '0';
                for(const v of t.itemClassList){
                    if(v.itemList && v.itemList.length){
                        for(const v2 of v.itemList){
                            if(v2.num > 0){
                                for(let i = 0; i< v2.num; i++){
                                    v2.choosenTechnician = [];
                                    t.choosenProject.push(JSON.parse(JSON.stringify(v2)))
                                }
                            }
                        }
                    }
                }
                console.log(t.choosenProject);
                if(!t.choosenProject.length){
                    t.$message.error('请选择服务项目');
                    return;
                }
                t.serviceTimeVisible = true;
            },
            // 下单
            customOrder(){
                const t = this;
                let orderReqForms = [];
                let params = {
                    userId: t.userForm.id
                }
                let p = new Promise((resolve, reject)=>{
                    for(const v of t.choosenProject){
                        orderReqForms.push({
                            itemId: v.id,
                            orderStartTime: t.dateTime,
                            orderTime: v.defaultDuration,
                            technicianIds: v.choosenTechnician.map((res)=>{
                                return res.id
                            })
                        })
                    }
                    cashierService.customOrder(params, orderReqForms).then((res)=>{
                        resolve(res)
                        // t.$message.success('下单成功');
                    })
                })
                return p;
            },
            getAppointList(){
                const t = this;
                cashierService.getAppointList({
                    pageSize: 100, 
                    pageNumber: 1
                    // userId: window.userId
                }).then((res)=>{
                    for(const v of res.records){
                        v.orderStartTimeObj = v.orderStartTime.replace(/-/g,"/");
                        for(const v2 of v.orderItems){
                            v2.orderTechniciansNames = v2.orderTechnicians.map((v3)=>{return v3.employeeName}).join(',')
                        }
                    }
                    t.appointList = res.records;
                    t.currentOrder = t.appointList[t.currentOrderIndex];
                    setTimeout(() => {
                        for(const i in t.appointList){
                            t.$commonService.getTime('time' + i)
                        }
                    }, 100);
                });
            },
            confirmArrived(i, v){
                const t = this;
                cashierService.arrivalStores({orderId: v.id}).then((res)=>{
                    t.appointList[i].status = 3;
                    t.$set(t.appointList, i, t.appointList[i])
                })
                
            },
           
            customSeach(seachform){
                const t = this;
                
                this.$refs[seachform].validate((valid) => {
                    if (valid) {
                        let params = {};
                        // t.editVisible = false;
                        for(let key in SeachForm){
                            params[key] = t.seachForm[key]
                        }
                        cashierService.customSeach(params).then((res)=>{
                            if(res && res.userInfo.id){
                                t.appointList = res.orderInfo.records;
                                t.currentOrder = t.appointList[t.currentOrderIndex];
                                t.userForm = res.userInfo;
                                t.tab1 = '信息';
                            }
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
            tab3Click(){
                const t = this;
                
            },
            tab2Click(){
                const t = this;
                t.selectTechnician()
            },
            confirmDoFpfj(){
                const t = this;
                let goNext = true;
                for(const v of t.currentOrder.orderItems){
                    if(!v.roomId){
                        t.$message.error("请选择"+v.itemName+"的房间");
                        goNext = false;
                        break;
                    }
                }
                if(goNext){
                    t.currentOrder.orderItems.forEach((v, i)=>{
                        cashierService.setRoom({
                            orderItemId: v.id,
                            roomId: v.roomId
                        }).then((res)=>{
                            if(i == t.currentOrder.orderItems.length-1){
                                t.$message.success("设置成功");
                                t.fpfjVisible = false;
                            }
                        })
                    })
                }
                
            },
            // 选择技师确认
            confirmChange(){
                const t = this;
                
                if(t.directBook){
                    
                    let canGoNext = true;
                    for(const v of t.choosenProject){
                        if(!v.choosenTechnician.length){
                            t.$message.error("请选择"+v.itemName+"的服务技师");
                            canGoNext = false;
                            break;
                        }
                    }
                    if(!canGoNext){
                        return;
                    }
                    t.customOrder().then((res)=>{
                        t.getOrderDetail(res.outTradeNo)
                    });
                    
                }
                
            },
            getOrderDetail(outTradeNo){
                const t = this;
                let _do = ()=>{
                    cashierService.orderDetail({outTradeNo: outTradeNo}).then((res)=>{
                        if(!res){
                            Loading.service({
                                text: 'loading...'
                            });
                            setTimeout(()=>{
                                _do();
                            }, 1000)
                            return
                        }
                        t.D = res;
                        t.changeVisible = false;
                        t.directBook = false;
                        setTimeout(() => {
                            t.successVisible = true;
                            // t.$commonService.getTime('payCountTime')
                        }, 300);
                    })
                }
                _do()
                
            },
            // 分配房间
            doFpfj(v, i){
                const t = this;
                t.fpfjVisible = true;
                t.currentOrder = v;
                t.currentOrderIndex = i;
                t.currentOrderItemIndex = '0';
            },
           
            // 项目时长调整下一步
            timeLengthChangeNext(){
                const t = this;
                t.choosenProjectIndex = '0';
                t.selectTechnician().then(()=>{
                    t.timeChangeLengthVisible = false;
                    setTimeout(() => {
                        t.changeVisible = true;
                    }, 300);
                })
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
                // directBook 直接下单  用来区分跟换技师弹框
                setTimeout(() => {
                    t.directBook = true;
                    t.timeChangeLengthVisible = true;
                }, 300);
            },
            
            back(){
                window.location.href = '/'
            },
            projectNumChange(v, i){
                const t = this;
                console.log(v.num);
                t.choosenProject = [];
                t.itemClassList[t.choosedItemIndex].itemList = t.itemList;
            },
            getItemClassList(){
                const t = this;
                orderService.getItemClassList().then((res)=>{
                    t.itemClassList = res.records;
                    t.getItemList()
                })
            },
            getItemList(){
                const t = this;
                orderService.getItemList({
                    pageSize: 100,
                    pageNumber: 1,
                    itemClassId: t.itemClassList[t.choosedItemIndex].id
                }).then((res)=>{
                    t.itemClassList[t.choosedItemIndex].itemList = res.records;
                    t.itemList = res.records
                }); 
            },
            getRoomList(){
                const t = this;
                roomService.getRoomList({pageSize: '100',pageNumber: '1',}).then((res)=>{
                    t.roomList = res.records;
                    t.roomId = t.roomList[0].id;
                })
            },
            itemClassClick(res){
                const t = this;
                t.getItemList()
            },
            cal(){
                const t = this;
                t.stores = t.userInfo.stores;
                let now = new Date();
                let nowHour = now.getHours();
                let nowMin = now.getMinutes();
                let min;
                min = Number(t.stores.openStartTime.split(':')[0]) > nowHour ? Number(t.data.I.openStartTime.split(':')[0]) : nowHour;
                if (nowMin > t.stores.openStartTime.split(':')[1]) {
                    min = min + 1;
                    t.stores.openStartTime = min+':'+'00'
                } else {
                    t.stores.openStartTime = min+':'+'30'
                }
            }

        },
        mounted(){
            const t = this;
            t.userInfo = JSON.parse(localStorage.userInfo);
            t.cal();
            t.leveName = t.$GD.leveName;
            t.getAppointList();
            t.getItemClassList();
            t.getRoomList();

            setTimeout(()=>{
                this.$notify({
                    message: '您有新的订单',
                    duration: 0
                });
            }, 3000)
            document.body.style.zoom = '1'
            // cashierService.list().then((res)=>{
            //     t.list = res.records;
            //     setTimeout(() => {
            //         for(const i in t.list){
            //             t.$commonService.getTime('time' + i)
            //         }
            //     }, 100);
                
            // })

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
