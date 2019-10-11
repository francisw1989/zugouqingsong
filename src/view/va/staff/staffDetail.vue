<template>
<div>
    <el-row>
        <el-col :span="11" style="border-right: 1px solid #ddd; padding-left: 10px">
            <el-row>
                <el-col :span="7">
                    <div style="width: 80px" class="relative clearfix">
                        <img src="../../../assets/img/img.jpg" alt="" class="tx1 left">
                        <div class="ghWap font12">工号:{{form.jobNumber}}</div>
                    </div>
                </el-col>
                <el-col :span="17">
                    <p class="font16b top10 ">{{form.employeeName}}  <span class="left20 font12 col999">{{form.sex=='0'?'女':'男'}} {{form.age}}岁</span> </p>
                    <p class="top5">
                        <el-tag size="small">{{form.postName}} </el-tag>
                        <el-tag size="small" class="left5" v-if='form.postGrade'>{{form.postGrade.gradeName}}</el-tag>
                    </p>
                </el-col>
            </el-row>
            <el-form ref="form" :model="form"  :rules="rules"   label-width="100px" class="staffForm top20">
                <el-form-item label="联系电话" >
                    <span v-if="!edit.telephoneNum">{{form.telephoneNum}} <i class="el-icon-edit left20 pointer" @click="openEdit('telephoneNum')"></i> </span>
                    <el-input v-if="edit.telephoneNum" v-model="form.telephoneNum" ref="telephoneNum"></el-input>
                </el-form-item>
                <el-form-item label="入职时间" >
                    <span v-if="!edit.initiationTime">{{form.initiationTime}} <i class="el-icon-edit left20 pointer" @click="openEdit('initiationTime')"></i> </span>
                    <el-date-picker v-if="edit.initiationTime" ref="initiationTime"  value-format="yyyy-MM-dd" v-model="form.initiationTime" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="出生日期" >
                    <span v-if="!edit.birthday">{{form.birthday}} <i class="el-icon-edit left20 pointer" @click="openEdit('birthday')"></i> </span>
                    <el-date-picker v-if="edit.birthday" ref="birthday"  value-format="yyyy-MM-dd" v-model="form.birthday" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="是否流动" >
                    <el-switch v-model="form.isMobilePosition" class=""></el-switch>
                </el-form-item>
				<el-form-item label="是否离职" >
				    <el-switch v-model="form.status" class=""></el-switch>
				</el-form-item>
                <el-form-item label="所属门店" v-if="sysRoute=='va'">
                    <el-select v-model="form.storesId" filterable clearable>
                        <el-option v-for="v in shopList" :key="v.id" :value="v.id"  :label="v.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="服务门店" v-if='form.isMobilePosition == 1'>
                    <div v-for="(sItem, i) in form.storesList" :key="i" class="btm5">
                        <el-select v-model="form.storesList[i].id" filterable clearable style="width: 200px">
                            <el-option v-for="v in shopList" :key="v.id" :value="v.id"  :label="v.name"></el-option>
                        </el-select>
                        <i class="el-icon-circle-plus-outline left10 pointer" @click="mdAdd"></i>
                        <i class="el-icon-remove-outline left5 pointer" v-if='i>0' @click="mdRemove(i)"></i>
                    </div>
                    
                </el-form-item>
                <el-form-item label="服务项目类目" >
                    <div v-for="(sItem, i) in form.itemClassList" :key="i" class="btm5">
                        <el-select class="" v-model="form.itemClassList[i].id" placeholder="" filterable clearable style="width: 200px">
                            <el-option v-for="(v) in projectList" :key="v.id" :label="v.itemClassName" :value="v.id"></el-option>
                        </el-select>
                        <i class="el-icon-circle-plus-outline left10 pointer" @click="mdAdd2"></i>
                        <i class="el-icon-remove-outline left5 pointer" v-if='i>0' @click="mdRemove2(i)"></i>
                    </div>
                    
                </el-form-item>
                <el-form-item label="擅长技能" >
                    <el-input  v-model="form.info" type='textarea' style="width: 80%"></el-input>
                </el-form-item>
            </el-form>
            <div class='top10 align-right right20'>
                <el-button size="small" @click='saveBase' type="primary">保存</el-button>
            </div>
            
        </el-col>
        <el-col :span="13" style="padding-left: 10px">
            <div class="smallTabWap">
                <el-tabs v-model="tabName" @tab-click="tabClick">
                    <el-tab-pane :label="v" :name="v" v-for="(v, i) in tabs" :key="i"></el-tab-pane>
                </el-tabs>
            </div>
            <div class="pad10 ">
                <div v-if="tabName=='本月'">
                    <p class="font20 col000">本月统计</p>
                    <p class="top20">用户评价</p>
                    <el-rate v-model="form.rate" class="top5" disabled></el-rate>
                    <div class="top20">
                        <el-tag :type="tabsType[i]" v-for="(v, i) in form.tags" :key="i" class="right10">{{v}}</el-tag>
                    </div>
                    <el-row class="top20" :gutter='13'>
                        <el-col :span="8">
                            <el-card class="center" style="border-radius: 50%; height: 110px">
                                <p class="font24b top10">146</p>
                                <p class="top10" style="color:#3398DB">服务次数</p>
                            </el-card>
                        </el-col>
                        <el-col :span="8">
                            <el-card class="center" style="border-radius: 50%; height: 110px">
                                <p class="font24b top10">146元</p>
                                <p class="top10" style="color:#f25e43">平均客单</p>
                            </el-card>
                        </el-col>
                        <el-col :span="8">
                            <el-card class="center" style="border-radius: 50%; height: 110px">
                                <p class="font24b top10">146元</p>
                                <p class="top10" style="color:#459E8C">本月商品销售</p>
                            </el-card>
                        </el-col>
                    </el-row>
                </div>
                <div v-if="tabName=='服务'">
                    <p class="font20 col000">服务记录</p>
                    <el-table class="top10"
                        :data="serviceRecordList"
                        style="width: 100%">
                        <el-table-column
                            prop="orderStartTime"
                            label="日期"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="itemName"
                            label="项目"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="totalPrice"
                            label="费用">
                        </el-table-column>
                    </el-table>
                    <p class="center top10"><span class="pointer colblue">查看完整记录</span></p>
                </div>
                <div v-if="tabName=='排班'">
                    <p class="font20 col000">一月排班情况</p>
                    <el-table 
                        :data="employeeScheduleList"
                        style="width: 100%">
                        <el-table-column
                            prop="scheduleDate"
                            label=""
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="week"
                            label=""
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="startTime"
                            label=""
                            width="100">
                        </el-table-column>
                        -
                         <el-table-column
                            prop="endTime"
                            label=""
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="shiftsName"
                            label="100">
                        </el-table-column>
                    </el-table>
                </div>
                <div v-if="tabName=='岗位'">
                    <p class="font20 col000">岗位信息</p>
                    <el-form ref="form" :model="form"  :rules="rules"   label-width="80px" class="staffForm top10">
                        <el-form-item label="岗位" >
                            <el-select class="" v-model="form.post" placeholder=""  @change='gwChange'>
                                <el-option v-for="(v) in gwList" :key="v.id" :label="v.postName" :value="v.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="级别">
                            <el-select class="" v-model="form.grade" placeholder=""  @change='postGradeChange'>
                                <el-option v-for="(v) in postGradeList" :key="v.level" :label="v.gradeName" :value="v.level"></el-option>
                            </el-select>
                        </el-form-item>
                        <div v-if="postGradeBean.priceCoefficient">
                            <el-form-item label="收费系数" >
                                <span>{{postGradeBean.priceCoefficient}} </span>
                            </el-form-item>
                            <el-form-item label="佣金系数" >
                                <span>{{postGradeBean.incomeCoefficient}} </span>
                            </el-form-item>
                        </div>
                    </el-form>
                    <div class='top10 align-right right20'>
                        <el-button size="small" @click='saveBase' type="primary">保存</el-button>
                    </div>
                </div>
                <div v-if="tabName=='考勤'">
                    <div class="center">
                       <p class="font20 col000"> 
                            <i class="el-icon-caret-left pointer" @click="prevMouth"></i>
                            <span class="left20 right20 ">{{year}}年{{mouth}}月考勤</span>
                            <i class="el-icon-caret-right pointer" @click="nextMouth"></i>
                        </p>
                    </div>
                    <el-row class="table1 top10 center" style="border: none">
                        <el-col :span="4" :offset="2">
                            <p>正常</p>
                            <p>22次</p>
                        </el-col>
                        <el-col :span="4">
                            <p>异常</p>
                            <p>22次</p>
                        </el-col>
                        <el-col :span="4">
                            <p>迟到</p>
                            <p>22次</p>
                        </el-col>
                        <el-col :span="4">
                            <p>早退</p>
                            <p>22次</p>
                        </el-col>
                        <el-col :span="4">
                            <p>请假</p>
                            <p>22次</p>
                        </el-col>
                    </el-row>
                    <el-table 
                        :data="employeeAttendanceList"
                        style="width: 100%">
                        <el-table-column
                            prop="scheduleDate"
                            label=""
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="checkInTime"
                            label=""
                            width="100">
                        </el-table-column>
                        -
                         <el-table-column
                            prop="checkOutTime"
                            label=""
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="statusName"
                            label="">
                        </el-table-column>
                    </el-table>
                </div>
                <div v-if="tabName=='评价'">
                    <p class="font20 col000">评价记录</p>
                    <el-row  v-for="(v) in employeeEvaluateRecord" :key="v.id" class="top20">
                        <el-col :span="3">
                            <img v-if="v.user.photo" :src="v.user.photo" class="tx2" alt="">
                        </el-col>
                        <el-col :span="21">
                            <p class="clearfix">{{v.user.userNickname}} <span class="right col999">{{v.createTime}}</span></p>
                            <p class=""><el-rate style="display: inline-block" class="top5" disabled show-score ></el-rate><span class="verMid">{{v.evaluateScore}}分</span></p>
                           <!--:score-template="v.evaluateScore" -->
                            <p class="">{{v.content}}</p>
                        </el-col>
                    </el-row>
                </div>
                <div v-if="tabName=='培训'">
                    <p class="font20 col000 clearfix btm20">培训历程  <el-button type='primary' size="mini" class="right"  @click="addJslc('1')">新增</el-button> </p>
                    <el-row  v-for="(v) in employeeCourseRecord1" :key="v.id" class="">
                        <el-col :span="5">
                            <p>{{v.courseTime}}</p>
                            <img src="../../../assets/img/img3.png" class="left25" alt="">
                        </el-col>
                        <el-col :span="19">
                            <p class="clearfix">{{v.courseTitle}} <i class="el-icon-error right pointer" @click="courseDelete(v.id)"></i></p>
                            <p class="col999">{{v.courseContent}}</p>
                        </el-col>
                    </el-row>
                </div>
                <div v-if="tabName=='晋升'">
                    <p class="font20 col000 clearfix btm20">晋升历程  <el-button type='primary' size="mini" class="right" @click="addJslc('2')">新增</el-button> </p>
                    <el-row v-for="(v) in employeeCourseRecord2" :key="v.id" class="">
                         <el-col :span="5">
                            <p>{{v.courseTime}}</p>
                            <img src="../../../assets/img/img3.png" class="left25" alt="">
                        </el-col>
                        <el-col :span="19">
                            <p class="clearfix">{{v.courseTitle}} <i class="el-icon-error right pointer" @click="courseDelete(v.id)"></i></p>
                            <p class="col999">{{v.courseContent}}</p>
                        </el-col>
                    </el-row>
                </div>
                <div v-if="tabName=='师徒'">
                    <p class="font20 col000 clearfix">师徒关系 <el-button type='primary' size="mini" class="right">新增师徒关系</el-button></p>
                    <div id="treeChart" style="height: 400px;"></div>
                </div>
            </div>
        </el-col>
        
    </el-row>
    <!-- 新增历程 -->
        <el-dialog :title="lcForm.courseType==1?'新增培训':'新增晋升'" :visible.sync="jslcVisible" width="350px" :modal='false'>
            <el-form ref="form" :model="lcForm"  :rules="rules"   label-width="60px">
                <el-form-item label="标题" prop="">
                    <el-input v-model="lcForm.courseTitle" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="时间" prop="">
                    <el-date-picker v-model="lcForm.courseTime" type="date" value-format="yyyy-MM-dd"  placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="内容" prop="">
                    <el-input v-model="lcForm.courseContent" type="textarea" placeholder=""></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="jslcVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveLc('lcForm')">保存</el-button>
            </span>
        </el-dialog>
</div>
</template>
<script>
    import bus from '../../../bus';
    import {staffService} from '../../../service/staff';
    import {orderService} from '../../../service/order';
    import {storeService} from '../../../service/store';

    var echarts = require('echarts');
    const Form= {
        id: '',
        employeeName: '',
        password: '111111',
        sex: '1',
        birthday: '',
        photo: '',
        age: '',
        post: '',
        grade: '',
        isMobilePosition: false,
        storesId: '', // 所属门店
        jobNumber: '',
        telephoneNum: '',
        initiationTime: '',
        salary: '',
        info: '',
        itemClassIds: '',
        isTechnician: true,
        storesIds:'', // 可服务门店
        status:false   //是否离职（0否  1是）
    };
    const LcForm = {
        id: '',
        courseTime: '',
        courseTitle: '',
        courseContent: '',
        courseType: ''
    }
    export default {
        name: 'staffDetail',
        data() {
            return {
                jslcVisible: false,
                statusName: ['请假', '正常', '未打卡', '休假', '迟到', '早退', '迟到早退'],
                form: {},
                lcForm: JSON.parse(JSON.stringify(LcForm)),
                rules: {
                    a: [
                        { required: true, message: '请选择类型', trigger: 'change' },
                    ]
                },
                edit:{
                    
                },
                shopList: [],
                projectList: [],
                serviceRecordList: [],
                // tabs: ['本月', '服务', '排班', '岗位', '考勤', '评价', '培训', '晋升', '师徒'],
                tabs: ['服务', '排班', '岗位', '考勤', '评价', '培训', '晋升', '师徒'],
                tabsType:[],
                tabName: '服务',
                year: '2019',
                mouth: '8',
                res: '',
                postGradeList: [],
                postGradeBean:{},// 岗位职级bean
                sysRoute: window.sysRoute || ''
            }
        },
        computed:{
            
        },
        props: ['row'],
        methods:{
            addJslc(courseType){
                const t = this;
                t.lcForm = JSON.parse(JSON.stringify(LcForm));
                t.jslcVisible = true;
                t.lcForm.id = t.row.id;
                t.lcForm.courseType = courseType;
            },
            saveLc(){
                const t = this;
                staffService.addLc(t.lcForm).then(()=>{
                    t.jslcVisible = false;
                    if(t.lcForm.courseType == 2){
                        staffService.getEmployeeCourseRecord({id: t.row.id,courseType: 2}).then((res)=>{
                            t.employeeCourseRecord2 = [];
                            t.employeeCourseRecord2 = res;
                        });
                    }else{
                        staffService.getEmployeeCourseRecord({id: t.row.id,courseType: 1}).then((res)=>{
                            t.employeeCourseRecord1 = [];
                            t.employeeCourseRecord1 = res;
                        });
                    }
                    
                    
                })
            },
            // 岗位改变 联动 岗位等级
            gwChange(id){
                const t = this;
                t.postGradeList = t.gwList.filter((v)=>{
                    return v.id == id
                })[0].postGradeList;
                t.postGradeChange(t.postGradeList[0].id);
            },
            postGradeChange(id){
                const t = this;
                t.postGradeBean = t.postGradeList.filter((v)=>{
                    return v.id == id
                })[0]
                console.log(t.postGradeBean)
            },
            prevMouth(){
                const t = this;
                if(t.mouth==1){
                    t.mouth = 12;
                    t.year --;
                    return
                }
                t.mouth --;
            },
            nextMouth(){
                const t = this;
                if(t.mouth==12){
                    t.mouth = 1;
                    t.year ++;
                    return
                }
                t.mouth ++;
            },
            initTreeChart(){
                const t = this;
                let stData = {
                    name: '张三',
                    children: [
                        {name: '李四', children:[
                            {name: '刘七'},{name: '刘七'},{name: '刘七'},
                        ]},
                        {name: '王五'},
                        {name: '王五'},
                        {name: '王五'},
                        {name: '王五'},
                    ]
                }
                t.treeChart = echarts.init(document.getElementById('treeChart'));
                t.treeChart.setOption({
                    color: ['#3398DB', '#f25e43', '#459E8C'],
                    tooltip: {
                        trigger: 'item',
                        triggerOn: 'mousemove'
                    },
                    series: [
                        {
                            type: 'tree',
                            data: [stData],
                            top: '1%',
                            left: '10%',
                            bottom: '1%',
                            right: '20%',
                            symbolSize: 12,
                            label: {
                                normal: {
                                    position: 'left',
                                    verticalAlign: 'middle',
                                    align: 'right',
                                    fontSize: 14
                                }
                            },
                            leaves: {
                                label: {
                                    normal: {
                                        position: 'right',
                                        verticalAlign: 'middle',
                                        align: 'left'
                                    }
                                }
                            },
                            expandAndCollapse: true,
                            animationDuration: 550,
                            animationDurationUpdate: 750
                        }
                    ]
                });
            },
            tabClick(tab, event){
                const t = this;
                console.log(t.tabName)
                if(t.tabName == '师徒'){
                    setTimeout(() => {
                        t.initTreeChart()
                    }, 100);
                    
                }
            },
            mdAdd(){
                const t = this;
                // if(t.form.storesList.length>2){
                //     t.$message({
                //         message: '最多三条',
                //         type: 'warning'
                //     });
                //     return
                // }
                t.form.storesList.push({});

            },
            mdRemove(i){
                const t = this;
                t.form.storesList.splice(i, 1)
            },
            mdAdd2(){
                const t = this;
                // if(t.form.itemClassList.length>2){
                //     t.$message({
                //         message: '最多三条',
                //         type: 'warning'
                //     });
                //     return
                // }
                t.form.itemClassList.push({});

            },
            mdRemove2(i){
                const t = this;
                t.form.itemClassList.splice(i, 1)
            },
            openEdit(key){
                const t = this;
                for(const _key in t.edit){
                    t.edit[_key] = false;
                }
                t.edit[key] = true;
                t.edit = JSON.parse(JSON.stringify(t.edit));
                setTimeout(() => {
                    t.$refs[key].$el.children[0].select();
                }, 100);
            },
            saveBase(){
                const t = this;
                let params = {};
                this.editVisible = false;
                
                t.form.isMobilePosition = t.form.isMobilePosition?'1':'0';
				 t.form.status = t.form.status?'1':'0';
                t.form.isTechnician = t.form.isTechnician?'1':'0';
                if(t.form.itemClassList.length){
                    t.form.itemClassIds =  t.form.itemClassList.map(v=>{
                        if(v.id){
                            return v.id
                        }
                        
                    }).join(',')
                }
                
                if(t.form.storesList.length){
                    t.form.storesIds =  t.form.storesList.map(v=>{
                        if(v.id){
                            return v.id
                        }
                        
                    }).join(',')
                }
                
                for(let key in Form){
                    params[key] = t.form[key]
                }
                if(window.sysRoute=='vb'){
                    params.storesId = window.storesId
                }
                staffService.employeesEdit(params).then((res)=>{
                    
                })
            },
            //员工服务列表
            getServiceRecordList(){
                const t = this;
                t.list = [];
                let params = {
                    id: t.row.id,
                    pageSize: 20,
                    pageNumber: 1
                }
                staffService.getServiceRecordList(params).then((res)=>{
                    t.serviceRecordList = res.records;
                })
            },
            courseDelete(id,courseType){
                const t = this;
                let params = {
                    id: id
                }
                staffService.employeeCourseDelete(params).then((res)=>{
                    this.$message.success('删除成功');
                    if(courseType=='1'){
                        staffService.getEmployeeCourseRecord({id: t.row.id,courseType: 1}).then((res)=>{
                            t.employeeCourseRecord1 == [];
                            t.employeeCourseRecord1 = JSON.parse(JSON.stringify(res));
                        });
                    }else{
                        staffService.getEmployeeCourseRecord({id: t.row.id,courseType: 2}).then((res)=>{
                            t.employeeCourseRecord2 == []
                            t.employeeCourseRecord2 = JSON.parse(JSON.stringify(res));
                        });
                    }
                })
            }
        },
        mounted(){
            const t = this;
            console.log(t.row)
            t.row.isMobilePosition = t.row.isMobilePosition == 0 ?false: true;
			 t.row.status = t.row.status == 0 ?false: true;
            t.row.isTechnician = t.row.isTechnician == 0 ?false: true;
            
            if(!t.row.storesList || !t.row.storesList.length){
                t.row.storesList = [{}]
            }
            
            if(!t.row.itemClassList || !t.row.itemClassList.length){
                t.row.itemClassList = [{}]
            }
            t.form = t.row;
            console.log(t.form)
            for(const key in t.row){
                t.edit[key] = false;
            }
            
            t.getServiceRecordList();
            //员工排班列表
            staffService.getEmployeeScheduleList({employeeId: t.row.id,monthDate: '2019-8'}).then((res)=>{
                t.employeeScheduleList = res;
            });
            //员工考勤列表
            staffService.getEmployeeAttendanceList({employeeId: t.row.id,monthDate: '2019-8'}).then((res)=>{
                console.log('getEmployeeAttendanceList'+res);
                for(const v of res){
                    if(res.status == null){
                        res.statusName = ''
                    }else{
                        res.statusName = t.statusName[res.status];
                    }
                }
                
                t.employeeAttendanceList = res;
            });
            //员工考勤情况
            staffService.getEmployeeAttendanceCount({employeeId: t.row.id,monthDate: '2019-8'}).then((res)=>{
                console.log('getEmployeeAttendanceCount'+res);
                t.employeeAttendance = res;
            });
            //员工被评价记录列表
            staffService.getEmployeeEvaluateRecord({id: t.row.id,pageSize: 20,pageNumber: 1}).then((res)=>{
                t.employeeEvaluateRecord = res.records;
            });
            //员工培训历程
            staffService.getEmployeeCourseRecord({id: t.row.id,courseType: 1}).then((res)=>{
                t.employeeCourseRecord1 = res;
            });
            //员工晋升历程
            staffService.getEmployeeCourseRecord({id: t.row.id,courseType: 2}).then((res)=>{
                t.employeeCourseRecord2 = res;
            });
            //员工师徒关系
            staffService.getEmployeEmentorShip({id: t.row.id,}).then((res)=>{
                t.data = res;
            });
            // t.$commonService.getTagsTypeList().then((res)=>{
            //     t.form.tags.forEach(v => {
            //         let i = Math.floor(Math.random() * (10 - 0)) + 0;
            //         console.log(i);
            //         t.tabsType.push(res[i])
            //     });
                
            // });
            // 岗位列表
            staffService.getPostList({pageSize: 100,pageNumber: 1}).then((res)=>{
                t.gwList = res.records;
                t.postGradeList = t.gwList.filter((v)=>{
                    return v.id == t.form.post;
                })[0].postGradeList;
                t.postGradeBean = t.postGradeList.filter((v)=>{
                    return v.id == t.form.grade
                })[0]
                
            });
            // 门店列表
            storeService.list({pageSize: 100,pageNumber: 1}).then((res)=>{
                t.shopList = res.records
            });
            orderService.getItemClassList({pageSize: 100,pageNumber: 1}).then((res)=>{
                t.projectList = res.records;
            })
            

            
        }
    }
</script>
<style scoped>
    
</style>
