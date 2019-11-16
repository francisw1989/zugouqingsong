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
                <el-input v-model="employeeName" placeholder="请输入员工姓名,手机号" class="handle-input"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="search" class="left10">搜索</el-button>
                <span class="left10 font12 colblue pointer" @click="moreSeach">更多筛选条件  <i class="el-icon-caret-bottom"></i></span>
            </div>
            <div v-if='showMore' class="top10">
                <template v-if="sysRoute=='va'">
                    <span class="">所属门店</span>
                    <el-select class="left10" v-model="storesId" placeholder="" filterable clearable style="width: 130px">
                        <el-option v-for="(v) in shopList" :key="v.id" :value="v.id"  :label="v.name"></el-option>
                    </el-select>
                </template>
                <span class="left20">岗位</span>
                <el-select class="left10" v-model="post" placeholder="" filterable clearable style="width: 130px">
                    <el-option v-for="(v) in gwList" :key="v.id" :label="v.postName" :value="v.id"></el-option>
                </el-select>
                <span class="left20">可服务项目</span>
                <el-select class="left10" v-model="itemClassId" placeholder="" filterable clearable style="width: 130px">
                    <el-option v-for="(v) in projectList" :key="v.id" :label="v.itemClassName" :value="v.id"></el-option>
                </el-select>
                <span class="left20">是否流动</span>
                <el-select class="left10" v-model="isMobilePosition" placeholder="" filterable clearable style="width: 80px">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                </el-select>
            </div>


            
            <el-table :data="list"  border class="table top20" ref="multipleTable" @selection-change="handleSelectionChange">
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                <!-- <el-table-column type="index" label="序号"  width="50" align='center'></el-table-column> -->
                <el-table-column prop="jobNumber" label="工号" sortable></el-table-column>
                <el-table-column prop="employeeName" label="姓名"></el-table-column>
                <el-table-column prop="sexName" label="性别"></el-table-column>
                <el-table-column prop="storeName" label="所属门店"></el-table-column>
				<el-table-column prop="roleName" label="角色"></el-table-column>
                <el-table-column prop="postName" label="岗位"></el-table-column>
                <el-table-column prop="gradeNameN" label="等级"></el-table-column>
                <el-table-column prop="isMobilePositionName" label="是否流动"></el-table-column>
                <el-table-column prop="telephoneNum" label="手机号"></el-table-column>
                <el-table-column prop="lastLoginTime" label="最后登录"></el-table-column>
                <el-table-column prop="status" label="状态">
                	<template slot-scope="scope">
                        <span v-if="scope.row.status==0">正常</span>
                        <span v-if="scope.row.status==1">离职</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="120" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handle1(scope.$index, scope.row)">分配角色</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :page-size='pageSize' :total="total">
                </el-pagination>
            </div>
        </div>
        <el-dialog title="分配角色" :visible.sync="viewVisible" width="300px">
            <el-select v-model="roleId"  filterable clearable style="width: 100%">
                <el-option v-for="v in jueseList" :key="v.id" :value="v.id"  :label="v.roleName"></el-option>
            </el-select>
            <span slot="footer" class="dialog-footer">
                <el-button @click="viewVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit()">保存</el-button>
            </span>
        </el-dialog>


    </div>
</template>
<script>
    import bus from '../../../bus';
    import {staffService} from '../../../service/staff';
    import {orderService} from '../../../service/order';
    import {storeService} from '../../../service/store';
    import {jurisdictionService} from '../../../service/jurisdiction';
    
   
    export default {
        data() {
            return {
                roleId: '',
                list: [],
                multipleSelection: [],
                select_cate: '',
                del_list: [],
                is_search: false,
                
                rules: {
                    requery: [
                        { required: true, message: '请输入或选择' },
                    ]
                },
                idx: -1,
                id: -1,
                showMore: false,
                shopList: [],
                jobNumber: '',
                sexName: '',
                roleNames:'',
                postName: '',
                storeName: '',
                shop: '',
                gwList: [],
                gw: [],
                projectList: [],
                project: '',
                isLiudong: false,
                viewVisible: false,
                total: 0,
                pageSize: 50,
                pageNumber: 1,

                // 头部查询参数
                employeeName: '', 
                storesId: '',
                post: '',
                itemClassId: '',
                isMobilePosition: '',

                postGradeList:[],
                row: {},
                sysRoute: window.sysRoute || '',
                jueseList: []
            }
        },
        watch: {
            storesId(){
                this.getEmployeesList()
            },
            post(){
                this.getEmployeesList()
            },
            itemClassId(){
                this.getEmployeesList()
            },
            isMobilePosition(){
                this.getEmployeesList()
            },
        },
        components:{
            
        },
        methods:{
            
            // 岗位改变 联动 岗位等级
            gwChange(id){
                const t = this;
                t.postGradeList = t.gwList.filter((v)=>{
                    return v.id == id
                })[0].postGradeList
            },
            
            // 设置角色
            saveEdit() {
                const t = this;
                if(!t.roleId){
                    t.$message.error('请选择角色');
                    return
                }
                t.viewVisible = false;
                let params = {
                    roleId: t.roleId,
                    employeeId: t.row.id
                }
                staffService.saveRole(params).then((res)=>{
                    t.$message.success('设置成功');
					t.getEmployeesList();
                })
                
            },
            
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
                this.getEmployeesList();
            },
            search() {
                this.is_search = true;
                this.getEmployeesList();
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 分配角色
            handle1(index, row) {
                this.idx = index;
                this.row = row;
                this.viewVisible = true;
            },
            getEmployeesList(){
                const t = this;
                t.list = [];
                let params = {
                    pageSize: t.pageSize,
                    pageNumber: t.pageNumber,
                    employeeName: t.employeeName, 
                    storesId: t.storesId,
                    post: t.post,
                    itemClassId: t.itemClassId,
                    isMobilePosition: t.isMobilePosition,
                }
                staffService.getEmployeesList(params).then((res)=>{
                    for(const v of res.records){
                        v.postName = v.postBean?v.postBean.postName: '';
						v.roleName = v.role?v.role.roleName : '';
                        v.storeName = v.stores?v.stores.name: '';
                        if(v.sex==0) {v.sexName='女'} else if(v.sex==1) {v.sexName='男'} else {v.sexName='未知'}
                        v.isMobilePositionName=v.isMobilePosition==0?'否':'是';
                        v.gradeNameN = v.postGrade?v.postGrade.gradeName:'';
                    }
                    t.list = res.records;
                    t.total = res.total
                })
            }
        },
        mounted(){
            const t = this;
            // 员工列表
            t.getEmployeesList();
            // 岗位列表
            staffService.getPostList({pageSize: 100,pageNumber: 1}).then((res)=>{
                t.gwList = res.records;
            });
            // 服务项目列表
            orderService.getItemClassList({pageSize: 100,pageNumber: 1}).then((res)=>{
                t.projectList = res.records;
            })
            // 角色列表
            jurisdictionService.getList().then((res)=>{
                t.jueseList = res.records;
            });

        }
    }
</script>
<style scoped>
    
</style>
