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
                            <div v-if="tab1=='检索'" class="bor_btm_so font18 col000" style="padding-bottom: 15px">待服务({{appointList.length}})</div>
                            <div v-if="tab1=='信息'" class="bor_btm_so font18 col000" style="padding-bottom: 15px">预约订单</div>
                            <div style="height: 80%; overflow: auto">
                                <div v-for="(v, i) in appointList" :key="i" style="border-bottom: 5px solid #ddd" class="top10">
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
                                                            <el-button type="primary" size="mini" v-if='v.status==2' @click='confirmArrived(i, v)'>确认到店</el-button>
                                                            <el-button v-if="v.status==3" type="primary" size="mini" class="left10" @click="doFpfj(i ,v)">分配房间</el-button>
                                                            <el-button v-if="v.status==4" type="primary" size="mini" class="left10" @click="doChangeJishi(i ,v)">更换技师</el-button>
                                                            <el-button v-if="v.status==4" type="primary" size="mini" class="left10" @click="doChangeRoom(i ,v)">更换房间</el-button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </table>
                                           
                                        </div>

                                    </div>
                                </div>
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
                                    <el-badge :value="2" class="item">
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
    <el-dialog title="分配房间" :visible.sync="fpfjVisible" width="350px">
        
        <el-radio-group v-model="roomId">
            <el-radio :label="v.id" v-for="(v) in roomList" :key="v.id" style="margin: 10px 0 0 0">
                <span>{{v.name}}</span>
                <span class="left10">剩余：{{v.useNum || 0}}位/{{v.peopleNum}}位</span>
                <span class="left10">{{v.labels}}</span>
            </el-radio>
        </el-radio-group>
        <span slot="footer" class="dialog-footer">
            <el-button @click="fpfjVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirmDoFpfj">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog title="选择技师" :visible.sync="changeVisible" width="500px">
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
                <el-button @click="changeVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmChange">确 定</el-button>
            </span>
    </el-dialog>
    <el-dialog title="服务时间选择" :visible.sync="serviceTimeVisible" width="300px">
        <el-time-select v-model="time" @change="dateTimeChange" :picker-options="{start: stores.openStartTime, step: '00:30',end: stores.openEndTime}" placeholder="选择时间" style="width: 100%;"></el-time-select>
        <span slot="footer" class="dialog-footer">
            <!-- <el-button type="primary" @click="serviceTimePrev">上一步</el-button> -->
            <el-button type="primary" @click="serviceTimeNext">下一步</el-button>
        </span>
    </el-dialog>
    
    <el-dialog title="项目时长调整" :visible.sync="timeChangeLengthVisible" width="500px">
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
    import {roomService} from '../../../service/room';
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
                choosedItemIndex: 0,
                choosenProject: [],
                choosenProjectIndex: 0,
                dateTime: '',
                time: '',
                technicianList: [],
                stores: {},
                userInfo: {},
                chooseTechnicIdAll: []
            }
        },
        components: {
            
        },
        computed:{
            
        },
        methods:{
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
            selectTechnician(){
                let p = new Promise((resolve, reject)=>{
                    const t = this;
                    
                    let params = {
                        itemIdsStr: t.choosenProject[t.choosenProjectIndex].id,
                        timesStr:  t.choosenProject[t.choosenProjectIndex].defaultDuration,
                        dateTime: t.dateTime
                    };
                    cashierService.selectTechnician(params).then((res)=>{
                        let selfChoosedIds = t.choosenProject[t.choosenProjectIndex].choosenTechnician.map((item)=>{
                            return item.id;
                        })
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
                    })
                })
                return p;
            },
            doChooseProject(){
                const t = this;
                t.choosenProject = [];
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
                t.serviceTimeVisible = true;
            },
            // 下单
            customOrder(){
                const t = this;
                let orderReqForms = [];
                let params = {
                    userId: t.userForm.id
                }
                for(const v of t.choosenProject){
                    orderReqForms.push({
                        itemId: v.id,
                        orderStartTime: t.dateTime,
                        orderTime: t.defaultDuration,
                        technicianIds: v.choosenTechnician.map((res)=>{
                            return res.id
                        })
                    })
                }
                cashierService.customOrder(params, orderReqForms).then((res)=>{
                    t.$message.success('下单成功');
                })
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
                t.tab1 = '信息';
                this.$refs[seachform].validate((valid) => {
                    if (valid) {
                        let params = {};
                        // t.editVisible = false;
                        for(let key in SeachForm){
                            params[key] = t.seachForm[key]
                        }
                        cashierService.customSeach(params).then((res)=>{
                            t.appointList = res.records;
                            t.userForm = t.appointList[0].user;
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
                const t = this;
                t.selectTechnician()
            },
            confirmDoFpfj(){
                const t = this;
                t.fpfjVisible = false;
                cashierService.setRoom({
                    orderItemId: t.currentOrder.id,
                    roomId: t.roomId
                }).then(()=>{

                })
                t.list = JSON.parse(JSON.stringify(t.list));
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
                t.currentOrder = v;
                t.currentOrderIndex = i;
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
                t.choosenProjectIndex = 0;
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
