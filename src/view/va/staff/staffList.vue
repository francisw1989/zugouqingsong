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
                <el-button type="primary" icon="el-icon-circle-plus-outline" class="handle-del right" @click="add">新增</el-button>
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
                <el-table-column prop="postName" label="岗位"></el-table-column>
                <el-table-column prop="gradeNameN" label="等级"></el-table-column>
                <el-table-column prop="isMobilePositionName" label="是否流动"></el-table-column>
                <el-table-column prop="telephoneNum" label="手机号"></el-table-column>
                
                <el-table-column prop="status" label="状态">
                	<template slot-scope="scope">
                        <span v-if="scope.row.status==0">正常</span>
                        <span v-if="scope.row.status==1">离职</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="240" align="center">
                    <template slot-scope="scope" v-if="scope.row.status==0">
                        <el-button size="mini" @click="handle1(scope.$index, scope.row)">查看</el-button>
                        <el-button size="mini" type="danger" @click="dodelete(scope.$index, scope.row)">删除</el-button>
                        <el-button size="mini" type="danger" @click="handle2(scope.$index, scope.row)">重置密码</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :page-size='pageSize' :total="total">
                </el-pagination>
            </div>
        </div>

        <!-- 员工详情 -->
        <el-dialog title="员工详情" :visible.sync="viewVisible" width="850px">
            <staffDetail :row="row" v-if="viewVisible"></staffDetail>
        </el-dialog>
        <!-- 新增 -->
        <el-dialog title="新增员工" :visible.sync="editVisible" width="550px">
            <el-form ref="form" :model="form"  :rules="rules"   label-width="100px">
                <div class="clearfix">
                    <el-form-item label="姓名" prop="" style="width: 50%" class="left">
                        <el-input v-model="form.employeeName" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="出生日期" prop="" style="width: 50%"  class="left">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.birthday" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </div>
                <div class="clearfix">
                    <el-form-item label="工号" prop="" style="width: 50%" class="left">
                        <el-input v-model="form.jobNumber" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="入职时间" prop="" style="width: 50%"  class="left">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.initiationTime" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </div>
                <div class="clearfix">
                    <el-form-item label="手机号" prop="" style="width: 50%" class="left">
                        <el-input v-model="form.telephoneNum" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="薪资(月)" prop="" style="width: 50%"  class="left">
                        <el-input v-model="form.salary" placeholder=""></el-input>
                    </el-form-item>
                </div>
                <div class="clearfix">
                    <el-form-item label="性别" prop="" style="width: 50%" class="left">
                        <el-radio-group v-model="form.sex">
                            <el-radio-button label="1">男</el-radio-button>
                            <el-radio-button label="0">女</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="年龄" prop="" style="width: 50%"  class="left">
                        <el-input v-model="form.age" placeholder=""></el-input>
                    </el-form-item>
                </div>
                <div class="clearfix">
                    <el-form-item label="是否流动" style="width: 50%"  class="left">
                        <el-switch v-model="form.isMobilePosition" class=""></el-switch>
                    </el-form-item>
                    <el-form-item v-if="sysRoute=='va'" label="所属门店" prop="" style="width: 50%"  class="left">
                        <el-select v-model="form.storesId"  filterable clearable>
                            <el-option v-for="v in shopList" :key="v.id" :value="v.id"  :label="v.name"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="clearfix">
                    <el-form-item label="图片" style="width: 50%" class="left">
                        <el-upload action="" 
                            :show-file-list="false" 
                            :on-change='getFile' 
                            :auto-upload='false'>
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                        <img v-if="form.photo" :src="form.photo" class=" top10" style="max-width: 100%">
                    </el-form-item>
                    <el-form-item label="是否技师" style="width: 50%"  class="left">
                        <el-switch v-model="form.isTechnician" class=""></el-switch>
                    </el-form-item>
					<el-form-item label="是否离职" style="width: 50%"  class="left">
					    <el-switch v-model="form.status" class=""></el-switch>
					</el-form-item>
                </div>
                <div class="clearfix">
                    <el-form-item label="岗位" style="width: 50%"  class="left">
                        <el-select class="" v-model="form.post" placeholder="" filterable clearable @change='gwChange'>
                            <el-option v-for="(v) in gwList" :key="v.id" :label="v.postName" :value="v.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item v-if='postGradeList' label="岗位等级" style="width: 50%"  class="left">
                        <el-select class="" v-model="form.grade" placeholder="" filterable clearable>
                            <el-option v-for="(v) in postGradeList" :key="v.level" :label="v.gradeName" :value="v.level"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="clearfix">
                   <el-form-item label="擅长技能" >
                        <el-input v-model="form.info" type="textarea" placeholder=""></el-input>
                    </el-form-item>
                </div>
                <div class="clearfix">
                   <el-form-item label="">
                        <el-checkbox v-model="form.checked">新增之后继续完善员工信息</el-checkbox>
                    </el-form-item>
                </div>
                
                

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit('form')">保存</el-button>
            </span>
        </el-dialog>


    </div>
</template>
<script>
    import bus from '../../../bus';
    import {staffService} from '../../../service/staff';
    import {orderService} from '../../../service/order';
    import {storeService} from '../../../service/store';
    import StaffDetail from './staffDetail';
    const Form= {
        employeeName: '',
        password: '111111',
        sex: '1',
        birthday: '',
        photo: '',
        age: '',
        post: '',
        grade: '',
        isMobilePosition: false,
        storesId: '',
        jobNumber: '',
        telephoneNum: '',
        initiationTime: '',
        salary: '',
        info: '',
        isTechnician: true,
		status:false
    }
    export default {
        data() {
            return {
                list: [],
                multipleSelection: [],
                select_cate: '',
                del_list: [],
                is_search: false,
                form: JSON.parse(JSON.stringify(Form)),
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
                
                postName: '',
                storeName: '',
                shop: '',
                gwList: [],
                gw: [],
                projectList: [],
                project: '',
                isLiudong: false,
                viewVisible: false,
                editVisible: false,
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
                sysRoute: window.sysRoute || ''
            }
        },
        watch: {
            viewVisible(val){
                console.log(val)
                if(val == false){
                    this.getEmployeesList()
                }
            },
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
            StaffDetail
        },
        methods:{
            getFile(file, fileList){
                const t = this;
                t.$commonService.getBase64(file.raw).then((Base64)=>{
                    t.$commonService.upload(Base64).then((res)=>{
                        t.form.photo = res.netUrl
                    })
                })
            },
            beforeImgUpload(file) {
                console.log(file)
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG && !isPNG) {
                    this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M && isPNG;
            },
            // 岗位改变 联动 岗位等级
            gwChange(id){
                const t = this;
                t.postGradeList = t.gwList.filter((v)=>{
                    return v.id == id
                })[0].postGradeList
            },
            // 删除
            dodelete(index, row){
                const t = this;
                let params = {
                    employeeId: row.id
                }
                this.$confirm('确认删除？').then(() => {
                    staffService.platformOutRecordDelete(params).then((res)=>{
                        this.$message.success('删除成功！');
                        t.getEmployeesList();
                    })
                }).catch(_ => {});
                
            },
            // 保存编辑
            saveEdit(form) {
                const t = this;
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        let params = {};
                        this.editVisible = false;
                        for(let key in Form){
                            params[key] = t.form[key]
                        }
                        params.isMobilePosition = params.isMobilePosition?'1':'0';
						params.status = params.status?'1':'0';
                        params.isTechnician = params.isTechnician?'1':'0';
                        staffService.employeesAdd(params).then((res)=>{
                            t.getEmployeesList();
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
                
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            add(){
                this.editVisible = true;
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
            // 员工详情
            handle1(index, row) {
                this.idx = index;
                this.row = row;
                console.log(this.row)
                this.viewVisible = true;
            },
            // 重置密码
            handle2(index, row) {
                this.idx = index;
                this.id = row.id;
                this.$confirm('确认重置密码？').then(() => {
                    let params = {
                        employeeId: row.id,
                        storesId: row.storesId
                    }
                    staffService.resetPassword(params).then((res)=>{
                        this.$message.success('设置成功！');
                    })
                }).catch(_ => {});
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
            // 门店列表
            storeService.list({pageSize: 100,pageNumber: 1}).then((res)=>{
                t.shopList = res.records
            });
            // 服务项目列表
            orderService.getItemClassList({pageSize: 100,pageNumber: 1}).then((res)=>{
                t.projectList = res.records;
            })

        }
    }
</script>
<style scoped>
    
</style>
