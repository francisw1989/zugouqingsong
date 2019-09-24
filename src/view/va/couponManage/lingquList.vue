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
                <el-radio-group v-model="type" class="right">
                    <el-radio-button :label="i"  v-for="(v, i) in typeList" :key="i" >{{v}}</el-radio-button>
                </el-radio-group>
                <el-input v-model="select_word" placeholder="优惠券名称、领取人、手机号" class="handle-input"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="search" class="left10">搜索</el-button>
                
                <span class="left20">优惠券类型</span>
                <el-select class="left10" v-model="yhqType" placeholder="请选择类型" style="width: 120px">
                    <el-option v-for="item in yhqTypeList" :key="item" :label="item" :value="item"></el-option>
                </el-select>
                <span class="left20">发放方式</span>
                <el-select class="left10" v-model="yhqFw" placeholder="请选择"  style="width: 120px">
                    <el-option v-for="item in ffTypeList" :key="item" :label="item" :value="item"></el-option>
                </el-select>

            </div>


            
            <el-table :data="list"  border class="table top20" ref="multipleTable">
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                <el-table-column type="index" label="序号"  width="50" align='center'></el-table-column>
                <el-table-column prop="a" label="优惠券名称" width="150"></el-table-column>
                <el-table-column prop="c" label="类型"></el-table-column>
                <el-table-column prop="c" label="领取时间"></el-table-column>
                <el-table-column prop="c" label="领取人"></el-table-column>
                <el-table-column prop="c" label="手机号"></el-table-column>
                <el-table-column prop="c" label="发放方式"></el-table-column>
                <el-table-column prop="c" label="使用时间"></el-table-column>
                <el-table-column prop="c" label="使用服务"></el-table-column>
                <el-table-column prop="c" label="状态"></el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
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
                select_word: '',
                is_search: false,

                idx: -1,
                id: -1,
                editVisible: false,
                yhqType: '',
                yhqTypeList: [],
                yhqYxqlxList: [],
                rules: {
                    a: [
                        { required: true, message: '请选择类型', trigger: 'change' },
                    ]
                },
                imageUrl: '',
                goodsCat:[],
                shopList: [],
                ffTypeList: [],
                typeList:['所有优惠券', '已领取','已使用'],
                type: '0',
            }
        },
        components:{
            
        },
        methods:{
            
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            search() {
                this.is_search = true;
            },
        },
        mounted(){
            const t = this;
            couponService.getLingquList().then((res)=>{
                t.list = res;
            });
            t.yhqTypeList = t.$GD.yhqTypeList;
            t.ffTypeList = t.$GD.ffTypeList;
        }
    }
</script>
<style scoped>
    
</style>