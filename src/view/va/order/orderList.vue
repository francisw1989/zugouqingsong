<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item> {{this.$route.meta.title}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class=" clearfix top10">
                <el-radio-group v-model="status" class="">
                    <el-radio-button :label="i"  v-for="(v, i) in typeList" :key="i" >{{v}}</el-radio-button>
                </el-radio-group>
                <span class="left10 font12 colblue pointer" @click="moreSeach">更多筛选条件  <i class="el-icon-caret-bottom"></i></span>
            </div>
            <div v-if='showMore' class="top10">
                <template v-if="sysRoute=='va'">
                    <span class="">服务门店</span>
                    <el-select class="left10" v-model="storeId" placeholder="请选择" filterable  clearable style="width: 140px">
                        <el-option v-for="(v, i) in storeList" :key="v.id" :value="v.id"  :label="v.name"></el-option>
                    </el-select>
                </template>
                <span class="left20">开始时间</span>
                <el-date-picker class="left10" v-model="startTime" type="date"  style="width: 140px"placeholder="选择日期" value-format="yyyy-MM-dd" ></el-date-picker>
                <span class="left20">结束时间</span>
                <el-date-picker class="left10" v-model="endTime" type="date" style="width: 140px" placeholder="选择日期" value-format="yyyy-MM-dd" ></el-date-picker>
                <span class="left20">是否拼团</span>
                <el-select class="left10" clearable v-model="isAssemble" placeholder="" style='width: 60px' filterable>
                    <el-option label="是"  value="1"></el-option>
                    <el-option label="否"  value="0"></el-option>
                </el-select>
                <span class="left20">是否用券</span>
                <el-select class="left10" clearable v-model="isCoupon" placeholder="" style='width: 60px' filterable>
                    <el-option label="是"  value="1"></el-option>
                    <el-option label="否"  value="0"></el-option>
                </el-select>
            </div>
            <el-table :data="list"  border class="table top20" ref="multipleTable" @selection-change="handleSelectionChange">
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                <!-- <el-table-column type="index" label="序号"  width="50" align='center'></el-table-column> -->
                <el-table-column prop="outTradeNo" label="订单编号" sortable width="150"></el-table-column>
                <el-table-column prop="itemNames" label="项目名称" width="120">
                    <template slot-scope="scope">
                        <span v-html="scope.row.itemNames"></span>
                    </template>
                </el-table-column>
                <el-table-column prop="itemClassNames" label="所属分类">
                    <template slot-scope="scope">
                        <span v-html="scope.row.itemClassNames"></span>
                    </template>
                </el-table-column>
                <el-table-column prop="storeName" label="服务门店"></el-table-column>
                <el-table-column prop="orderStartTime" label="预约服务时间"></el-table-column>
                <el-table-column prop="payForOwn" label="是否本人支付">
                    <template slot-scope="scope">
                        <span>{{scope.row.payForOwn?'是':'否'}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="orderTimes" label="预约时长">
                	<template slot-scope="scope">
                        <span v-html="scope.row.orderTimes"></span>
                    </template>
                </el-table-column>
                <el-table-column prop="isCouponName" label="优惠券"></el-table-column>
                <el-table-column prop="isAssembleName" label="拼团"></el-table-column>
                <el-table-column prop="payPrice" label="优惠价(元)"></el-table-column>
                <el-table-column prop="employeeNames" label="服务技师" width='100'>
                    <template slot-scope="scope">
                        <span v-html="scope.row.employeeNames"></span>
                    </template>
                </el-table-column>
                <el-table-column prop="statusName" label="当前状态"></el-table-column>
                <el-table-column prop="createTime" label="创建时间"></el-table-column>
                <el-table-column label="操作" width="80" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleDetails(scope.$index, scope.row)">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :page-size='pageSize' :total="total">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="订单详情" :visible.sync="viewVisible" width="1000px">
            <OrderDetail v-if='viewVisible && info.orderInfo && info.orderInfo.outTradeNo' :row='row' :info='info'></OrderDetail>
        </el-dialog>


    </div>
</template>
<script>
    import bus from '../../../bus';
    import {orderService} from '../../../service/order';
    import {storeService} from '../../../service/store';
    import OrderDetail from './orderDetail';
    export default {
        data() {
            return {
                isAssemble: '',
                startTime: '',
                endTime: '',
                isCoupon: '',
                status: '0',
                list: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                storeId: '',
                del_list: [],
                is_search: false,
                viewVisible: false,
                form: {
                    a: '',
                    b: '',
                    c: ''
                },
                idx: -1,
                id: -1,
                typeList:['所有订单', '未支付','进行中','已完成'],
                type: '0',
                showMore: false,
                xmfl: '',
                row: {},
                xmflList: [],
                storeList: [],
                startData: '',
                endData: '',
                isPintuan: false,
                isQuan: false,
                total: 0,
                pageSize: 10,
                pageNumber: 1,
                statusList: ['待支付','已支付待到店','已到店待服务','服务中','服务完成','系统取消','用户取消'],
                statusN:['','1','4','5'],
                info: {},
                payTypeList:['','虚拟账户','现金账户','微信支付','现金','微信转账','支付宝转账'],
                sexList:['女','男','未知'],
                sysRoute: window.sysRoute || ''
            }
        },
        components:{
            OrderDetail
        },
        methods:{
            moreSeach(){
                const t = this;
                if(t.showMore){
                    t.showMore = false
                }else{
                    t.showMore = true
                }
            },
            handleCurrentChange(val) {
                this.pageNumber = val;
                this.getOrderList();
            },
            search() {
                this.is_search = true;
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 订单详情
            handleDetails(index, row) {
                const t = this;
                t.viewVisible = true;
                this.idx = index;
                this.id = row.id;
                this.row = row;
                let parmas = {
                    id: this.id
                }
                orderService.getOrderDetails(parmas).then((res)=>{
                    res.orderInfo.statusName=t.statusList[res.orderInfo.status-1];
                    res.orderInfo.payPrice=res.orderInfo.payPrice/100;
                    res.orderInfo.actualOrderPrice=res.orderInfo.actualOrderPrice/100;
                    res.orderInfo.totalPrice=res.orderInfo.totalPrice/100;
                    res.orderInfo.refundPrice=res.orderInfo.refundPrice/100;
                    res.orderInfo.payTypeName=res.orderInfo.payType.split('-').map((v)=>{
                        return v&&t.payTypeList[v]
                    }).filter((v2)=>{
                        return v2!=''
                    }).join('、')

                    for(const v3 of res.orderInfo.orderItems){
                        v3.orderPrice=v3.orderPrice/100;
                        v3.payPrice=v3.payPrice/100;
                        v3.actualOrderPrice=v3.actualOrderPrice/100;
                        v3.employeeNames=v3.orderTechnicians.map((v4)=>{
                            return v4.employeeName
                        }).join('、')
                    }
                    res.userInfo.sexName=t.sexList[res.userInfo.sex];
                    if(res.assembleInfo){
                         res.assembleInfo.memberNames=res.assembleInfo?res.assembleInfo.members.map((v5)=>{
                            return v5.userName
                        }).join('、'):'';
                    }
                    t.info = res;
                })
            },
            getOrderList(){
                const t = this;
                t.list = [];
                let params = {
                    pageSize: t.pageSize,
                    pageNumber: t.pageNumber,
                    storeId: t.storeId,
                    isAssemble: t.isAssemble,
                   
                    endTime: t.endTime,
                    isCoupon: t.isCoupon
                }
                params.startTime=t.startTime?t.startTime+' 00:00:00':'';
                params.endTime=t.endTime?t.endTime+' 23:59:59':'';
                params.status=t.statusN[t.status];
                orderService.getOrderList(params).then((res)=>{
                    for(const v of res.records){
                        v.statusName =t.statusList[v.status-1];
                        let itemNames = [];
                        let itemClassNames=[];
                        let orderTimes=[];
                        let employeeNames = [];
                        for(const v2 of v.orderItems){
                            itemNames.push(v2.itemName);
                            itemClassNames.push(v2.itemClassName);
                            orderTimes.push(v2.orderTime);
                            employeeNames.push(v2.orderTechnicians.map((v3)=>{
                                return v3.employeeName
                            }).join('、'))
                        }
                        v.itemNames = itemNames.join('<br />');
                        v.itemClassNames = itemClassNames.join('<br />');
                        v.orderTimes=orderTimes.join('<br />');
                        v.employeeNames = employeeNames.join('<br />');
                        if(v.isCoupon==null){
                            v.isCouponName = '/';
                        }else{
                            v.isCouponName = v.isCoupon == 0 ? '否' : '是';
                        }
                        if(v.isAssemble==null){
                            v.isAssembleName = '/';
                        }else{
                            v.isAssembleName = v.isAssemble == 0 ? '否' : '是';
                        }
                    }
                    t.list = res.records;
                    t.total = res.total
                })
            }
        },
        watch:{
            status(val){
                this.getOrderList();
            },
            storeId(val){
                this.getOrderList();
            },
            startTime(val){
                this.getOrderList();
            },
            endTime(val){
                this.getOrderList();
            },
            isAssemble(val){
                this.getOrderList();
            },
            isCoupon(val){
                this.getOrderList();
            },
        },
        mounted(){
           const t = this;
           
           t.getOrderList();
           storeService.list({pageSize: 100,pageNumber: 1}).then((res)=>{
               t.storeList = res.records;
           })

        }
    }
</script>
<style scoped>
    
</style>
