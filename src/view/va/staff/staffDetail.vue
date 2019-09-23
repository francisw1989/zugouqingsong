<template>
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
                <el-form-item label="出身日期" >
                    <span v-if="!edit.birthday">{{form.birthday}} <i class="el-icon-edit left20 pointer" @click="openEdit('birthday')"></i> </span>
                    <el-date-picker v-if="edit.birthday" ref="birthday"  value-format="yyyy-MM-dd" v-model="form.birthday" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="是否流动" >
                    <el-switch v-model="form.isMobilePosition" class=""></el-switch>
                </el-form-item>
                <el-form-item label="所属门店" v-if='form.isMobilePosition == 0'>
                    <el-select v-model="form.storesId" filterable clearable>
                        <el-option v-for="v in shopList" :key="v.id" :value="v.id"  :label="v.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="服务门店" v-if='form.isMobilePosition == 1'>
                    <div v-for="(sItem, i) in form.fwmd" :key="i" class="btm5">
                        <el-select v-model="form.fwmd[i].id" filterable clearable>
                            <el-option v-for="v in shopList" :key="v.id" :value="v.id"  :label="v.name"></el-option>
                        </el-select>
                        <i class="el-icon-circle-plus-outline left10 pointer" @click="mdAdd"></i>
                        <i class="el-icon-remove-outline left5 pointer" v-if='i>0' @click="mdRemove(i)"></i>
                    </div>
                    
                </el-form-item>
                <el-form-item label="服务项目类目" >
                    <div v-for="(sItem, i) in form.itemClassList" :key="i" class="btm5">
                        <el-select class="" v-model="form.itemClassList[i].id" placeholder="" filterable clearable>
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
                            <span v-if="!edit.postName">{{form.postBean.postName}} <i class="el-icon-edit left20 pointer" @click="openEdit('postName')"></i> </span>
                            <el-input v-if="edit.postName" v-model="form.postBean.postName" ref="postName"></el-input>
                        </el-form-item>
                        <el-form-item label="级别" >
                            <span v-if="!edit.gradeName">{{form.postGrade.gradeName}} <i class="el-icon-edit left20 pointer" @click="openEdit('gradeName')"></i> </span>
                            <el-select v-if="edit.gradeName" v-model="form.postGrade.gradeName" ref="gradeName" style="width: 80%">
                                <!-- <el-option v-for="item in shopList" :key="item.shopName" :label="item.shopName" :value="item.shopName"></el-option> -->
                                <el-option label="120%" value="120%"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="收费系数" >
                            <span v-if="!edit.priceCoefficient">{{form.postGrade.priceCoefficient}} <i class="el-icon-edit left20 pointer" @click="openEdit('priceCoefficient')"></i> </span>
                            <el-select v-if="edit.priceCoefficient" v-model="form.postGrade.priceCoefficient" ref="priceCoefficient" style="width: 80%">
                                <el-option label="120%" value="120%"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="提成系数" >
                            <span v-if="!edit.incomeCoefficient">{{form.postGrade.incomeCoefficient}} <i class="el-icon-edit left20 pointer" @click="openEdit('incomeCoefficient')"></i> </span>
                            <el-select v-if="edit.incomeCoefficient" v-model="form.postGrade.incomeCoefficient"  ref="incomeCoefficient" style="width: 80%">
                                <el-option label="120%" value="120%"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
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
                    <p class="font20 col000 clearfix">培训历程  <el-button type='primary' size="mini" class="right">新增</el-button> </p>
                    <el-row  v-for="(v) in employeeCourseRecord1" :key="v.id" class="top20">
                        <el-col :span="4">
                            <p><span style="width:100px">{{v.createTime}} </span></p>
                            <img src="../../../assets/img/img3.png" class="left25" alt="">
                        </el-col>
                        <el-col :span="20">
                            <p >{{v.courseTitle}}  <el-button size="mini" type="danger" @click="courseDelete(v.id)">删除</el-button></p>
                            <p class="col999">{{v.courseContent}}</p>
                        </el-col>
                    </el-row>
                </div>
                <div v-if="tabName=='晋升'">
                    <p class="font20 col000 clearfix">晋升历程  <el-button type='primary' size="mini" class="right">新增</el-button> </p>
                    <el-row v-for="(v) in employeeCourseRecord2" :key="v.id" class="top20">
                         <el-col :span="4">
                            <p>{{v.createTime}}</p>
                            <img src="../../../assets/img/img3.png" class="left25" alt="">
                        </el-col>
                        <el-col :span="20">
                            <p>{{v.courseTitle}} <el-button size="mini" type="danger" @click="courseDelete(v.id)">删除</el-button></p></p>
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
        storesIds:'' // 可服务门店
    }
    export default {
        name: 'staffDetail',
        data() {
            return {
                statusName: ['请假', '正常', '未打卡', '休假', '迟到', '早退', '迟到早退'],
                form: {},
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
                res: ''
            }
        },
        computed:{
            
        },
        props: ['row'],
        methods:{

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
                if(t.form.fwmd.length>2){
                    t.$message({
                        message: '最多三条',
                        type: 'warning'
                    });
                    return
                }
                t.form.fwmd.push({id: ''});

            },
            mdRemove(i){
                const t = this;
                t.form.fwmd.splice(i, 1)
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
                t.form.isTechnician = t.form.isTechnician?'1':'0';
                if(t.form.itemClassList.length){
                    t.form.itemClassIds =  t.form.itemClassList.map(v=>{
                        return v.id
                    }).join(',')
                }
                
                if(t.form.fwmd.length){
                    t.form.storesIds =  t.form.fwmd.map(v=>{
                        return v.id
                    }).join(',')
                }
                
                for(let key in Form){
                    params[key] = t.form[key]
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
                            t.employeeCourseRecord1 = res;
                        });
                    }else{
                        staffService.getEmployeeCourseRecord({id: t.row.id,courseType: 2}).then((res)=>{
                          t.employeeCourseRecord1 = res;
                        });
                    }
                })
            }
        },
        mounted(){
            const t = this;
            console.log(t.row)
            t.row.isMobilePosition = t.row.isMobilePosition == 0 ?false: true;
            t.row.isTechnician = t.row.isTechnician == 0 ?false: true;
            
            t.form = t.row;
            t.form.fwmd = [{id: ''}];
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
