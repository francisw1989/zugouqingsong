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
                <el-input v-model="userName" placeholder="请输入会员姓名,手机号" class="handle-input"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="search" class="left10">搜索</el-button>
                <span class="left20">是否黑名单：</span>
                <el-select class="left10" v-model="inBlacklist" placeholder="" clearable style="width: 70px">
                    <el-option value="1"  label="是"></el-option>
                    <el-option value="0"  label="否"></el-option>
                </el-select>
                <span class="left20">是否红名单：</span>
                <el-select class="left10" v-model="inRedlist" placeholder="" clearable style="width: 70px">
                    <el-option value="1"  label="是"></el-option>
                    <el-option value="0"  label="否"></el-option>
                </el-select>
            </div>


            
            <el-table :data="list"  border class="table top20" ref="multipleTable">
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                <!--<el-table-column type="index" label="序号"  width="50" align='center'></el-table-column> -->
                <el-table-column prop="memberNum" label="会员编号" sortable width="150"></el-table-column>
                <el-table-column prop="userName" label="姓名" width="120"></el-table-column>
                <el-table-column prop="telephoneNum" label="手机号"></el-table-column>
                <el-table-column label="会员级别">
                    <template slot-scope="scope">
                        {{levelList[scope.row.memberLevel]}}
                    </template>
                </el-table-column>
                <el-table-column prop="virtualAccount" label="虚拟账户">
                    <template slot-scope="scope">
                        {{(scope.row.virtualAccount/100).toFixed(2)}}
                    </template>
                </el-table-column>
                <el-table-column prop="savingsAccount" label="储值账户">
                    <template slot-scope="scope">
                        {{(scope.row.savingsAccount/100).toFixed(2)}}
                    </template>
                </el-table-column>
                <el-table-column prop="cardNumber" label="身份证"></el-table-column>
                <el-table-column prop="inBlacklist" label="黑名单"></el-table-column>
                <el-table-column prop="inRedlist" label="红名单"></el-table-column>
                <el-table-column prop="userTags" label="标签"></el-table-column>
                <el-table-column prop="userTags" label="来源">
                    <template slot-scope="scope">
                        {{sourceName[scope.row.source]}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="150" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handle1(scope.$index, scope.row)">查看</el-button>
                        <el-button size="mini" type="danger" @click="handle2(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next"  :page-size='pageSize' :total="total">
                </el-pagination>
            </div>
        </div>

        <!-- 详情 -->
        <el-dialog title="客户详情" :visible.sync="viewVisible" width="850px">
            <CustomerDetail :row="row" v-if="viewVisible"></CustomerDetail>
        </el-dialog>



    </div>
</template>
<script>
    import bus from '../../../bus';
    import {customerService} from '../../../service/customer';
    import CustomerDetail from './customerDetail';
    export default {
        data() {
            return {
                list: [],
                levelList: ['普通会员','一星会员','二星会员','三星会员'],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                memberNum: '',
                userName: '',
                telephoneNum: '',
                virtualAccount: '',
                savingsAccount: '',
                inBlacklist: '',
                inRedlist: '',
                userTags: '',
                is_search: false,
                idx: -1,
                id: -1,
                viewVisible: false,
                checked1: '',
                checked2: '',
                total: 0,
                pageSize: 10,
                pageNumber: 1,
                sourceName: ['小程序', '客服台', '客户端']
            }
        },
        components:{
            CustomerDetail
        },
        methods:{


            handleCurrentChange(val) {
                this.cur_page = val;
                this.getCustomerList();
            },
            search() {
                //this.is_search = true;
                const t = this;
                t.getCustomerList();
            },
            //客户详情
            handle1(index, row) {
                this.idx = index;
                this.row = JSON.parse(JSON.stringify(row));
                this.viewVisible = true;
            },
            handle2(index, row){
                
            },
            getCustomerList(){
                const t = this;
                t.list = [];
                let params = {
                    pageSize: t.pageSize,
                    pageNumber: t.pageNumber,
                    userName: t.userName,
                    inBlacklist: t.inBlacklist,
                    inRedlist: t.inRedlist
                }

                customerService.getCustomerList(params).then((res)=>{
                    for(const v of res.records){
                        v.inBlacklist = v.inBlacklist == 1 ? '是' : '否';
                        v.inRedlist = v.inRedlist == 1 ? '是' : '否';
                    }
                    t.list = res.records;
                    t.total = res.total
                })
                
            }
        
        },
        watch:{
             inRedlist(val){
                this.getCustomerList();
            },
            inBlacklist(){
                this.getCustomerList();
            }
        },
        mounted(){
            const t = this;
            // 员工列表
           t.getCustomerList();
        }
    }
</script>
<style scoped>
    
</style>
