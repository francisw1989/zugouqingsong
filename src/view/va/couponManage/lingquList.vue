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
                <el-radio-group v-model="fwType" class="right">
                    <el-radio-button :label="i"  v-for="(v, i) in typeList" :key="i" >{{v}}</el-radio-button>
                </el-radio-group>
                <el-input v-model="userName" placeholder="领取人" class="handle-input" style='width: 110px!important'></el-input>
                <el-button type="primary" icon="el-icon-search" @click="search" class="left10">搜索</el-button>
                
                <span class="left20">优惠券类型</span>
                <el-select class="left10" v-model="couponType" placeholder="请选择类型" style="width: 120px">
                    <el-option v-for="(v,i) in yhqTypeList" :key="i+1" :label="v" :value="i+1"></el-option>
                </el-select>
                <span class="left20">发放方式</span>
                <el-select class="left10" v-model="receivingType" placeholder="请选择"  style="width: 120px">
                    <el-option v-for="(v,i) in ffTypeList" :key="i" :label="v" :value="i+1"></el-option>
                </el-select>

            </div>


            
            <el-table :data="list"  border class="table top20" ref="multipleTable">
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                <el-table-column type="index" label="序号"  width="50" align='center'></el-table-column>
                <el-table-column prop="coupon.couponName" label="优惠券名称" width="150"></el-table-column>
                <el-table-column prop="couponTypeName" label="类型"></el-table-column>
                <el-table-column prop="receivingTime" label="领取时间"></el-table-column>
                <el-table-column prop="userName" label="领取人"></el-table-column>
                <el-table-column prop="phone" label="手机号"></el-table-column>
                <el-table-column prop="receivingTypeName" label="发放方式"></el-table-column>
                <el-table-column prop="usedTime" label="使用时间"></el-table-column>
                <el-table-column prop="statusName" label="状态"></el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :page-size='pageSize' :total="total">
                </el-pagination>
            </div>
        </div>



    </div>
</template>
<script>
    import bus from '../../../bus';
    import {couponService} from '../../../service/coupon';
    export default {
        data() {
            return {
                list: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                userName: '',
                is_search: false,
                idx: -1,
                id: -1,
                editVisible: false,
                yhqTypeList: [],
                yhqYxqlxList: [],
                fwType:'',
                receivingType: '',
                couponType:'',
                imageUrl: '',
                goodsCat:[],
                shopList: [],
                ffTypeList: [],
                typeList:['所有优惠券', '已领取','已使用'],
                type: '0',
                total: 0,
                pageSize: 10,
                pageNumber: 1,
            }
        },
        components:{
            couponService
        },
        methods:{
            
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getCouponManagerRecord();
            },
            search() {
                //this.is_search = true;
                const t = this;
                t.getCouponManagerRecord();
            },
            getCouponManagerRecord(){
                const t = this;
                t.list = [];
                let params = {
                    pageSize: t.pageSize,
                    pageNumber: t.pageNumber,
                    userName: t.userName,
                    receivingType: t.receivingType,
                    couponType: t.couponType
                }
                couponService.getCouponManagerRecord(params).then((res)=>{
                    for(const v of res.records){
                        if(res.coupon == null){
                            v.couponTypeName = ''
                        }else{
                            v.couponTypeName = t.yhqTypeList[v.coupon.couponType+1];
                        }
                        v.receivingTypeName=t.ffTypeList[v.receivingType];
                        v.statusName=res.status==1?'已使用':'已领取';
                    }
                    
                    t.list = res.records;
                    t.total = res.total
                })
            }
        },
        watch:{
            couponType(val){
                this.getCouponManagerRecord();
            },
            receivingType(){
                this.getCouponManagerRecord();
            }

        },
        mounted(){
            const t = this;
            t.yhqTypeList = t.$GD.yhqTypeList;
            t.ffTypeList = t.$GD.ffTypeList;
             t.getCouponManagerRecord();
        }
    }
</script>
<style scoped>
    
</style>