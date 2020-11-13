<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item> {{this.$route.meta.title}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="center ">
                <p class="font20 col000"> 
                    <i class="el-icon-caret-left pointer" @click="prevMouth"></i>
                    <span class="left20 right20 ">{{year}}年{{mouth}}月排班计划表</span>
                    <i class="el-icon-caret-right pointer" @click="nextMouth"></i>
                </p>
            </div>
            <div class=" clearfix top10" v-if="sysRoute=='va'">
                <!-- <el-input v-model="select_word" placeholder="请输入员工姓名" class="handle-input"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="search" class="left10">搜索</el-button> -->
                <el-checkbox-group v-model="checkList" class="" style="display: inline" @change='checkBoxChange'>
                    <el-checkbox :label="v.id"  v-for="(v, i) in shopList" :key="i">{{v.name}}</el-checkbox>
                </el-checkbox-group>
            </div>
            <div class="top20">
                班次： 
                <template  v-for="(v, i) in shiftsSettingList">
                    <span  v-if="i!=shiftsSettingList.length-1" :key="i"  class="left10 right10" :style="{color: colors[v.shiftsName]}">{{v.shiftsName}} {{v.startTime}}-{{v.endTime}}</span>
                </template>
            </div>
            <table class="m-table top20" style="min-width: 1200px">
                <tr class="tr2">
                    <td style="width: 40px">
                        
                    </td>
                    <td style="width: 80px">姓名</td><td style="width: 80px">职务</td>
                    <template v-if="loadDay">
                        <td v-for="(v, i) in shopList[0].peopleList[0].employeeScheduleList" :key="i" class="td">{{i+1}}</td>
                    </template>
                </tr>
            </table>
            <div v-if="loadDay">
                <table class="m-table" style="min-width: 1200px" v-for="(shopItem, shopIndex) in shopList" :key="shopIndex"  >
                    <template v-if="shopItem.show">
                        <tr class="tr">
                            <td :colspan="shopList[0].peopleList[0].employeeScheduleList.length+3">
                                <div class="left left13">
                                    <span class="ci" :class="shopItem.checkedAll?'checked':''" @click="handleCheckAllChange(shopIndex)"></span>
                                    <span class="left5">全选</span>
                                    <el-button type='primary' size='mini' class="left10" @click="plpbDo(shopIndex)">批量排班</el-button>
                                </div>
                                <span class="pointer" style="margin-left: -120px" @click="showAll(shopIndex)">
                                    {{shopItem.name}} 
                                    <i :class="shopItem.showAll?'el-icon-caret-top':''" class="el-icon-caret-bottom left5"></i> 
                                </span>
                            </td>
                        </tr>
                        
                        <template v-if='shopItem.showAll' >
                            <tr v-for="(peopleItem, peopleIndex) in shopItem.peopleList" :key="peopleIndex">
                                <td style="width: 40px">
                                    <span class="ci" :class="peopleItem.checked?'checked':''" @click="peopleItem.checked = !peopleItem.checked; handleCheckedChange(shopIndex, peopleIndex)"></span>
                                </td>
                                <td style="width: 80px">{{peopleItem.employeeName}}</td>
                                <td style="width: 80px">
                                    <span v-if="peopleItem.postBean && peopleItem.postBean.postName">{{peopleItem.postBean.postName}}</span>
                                </td>
                                <template v-for="(dayItem, dayIndex) in peopleItem.employeeScheduleList">
                                    <td  class="td" :key="dayIndex" :style="{'background': colors[dayItem.shiftsName || '无']}">
                                        <el-dropdown trigger="click" placement='bottom-start' @command="handleCommand">
                                            <span class="pointer colfff">{{dayItem.shiftsName || '无'}}</span>
                                            <el-dropdown-menu slot="dropdown">
                                                <el-dropdown-item v-for="(v, i) in shiftsSettingList" :key="v.id"  :command="shopIndex+','+peopleIndex+','+dayIndex + ',' + i">{{v.shiftsName}}</el-dropdown-item>
                                            </el-dropdown-menu>
                                        </el-dropdown>
                                    </td>
                                </template>
                            </tr>
                        </template>
                        
                    </template>
                </table>
            </div>
        </div>
        <el-dialog
            title="批量排班"
            :visible.sync="plpbVisible"
            width="330px">
            <div>
                排班：
                <el-select style="width: 220px" v-model="handleShiftsId" placeholder="请选择">
                    <el-option
                    v-for="item in shiftsSettingList"
                    :key="item.id"
                    :label="item.shiftsName"
                    :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <div class="top10">
                日期：
                <el-date-picker style="width: 220px"
                v-model="handleScheduleDate"
                value-format="yyyy-MM-dd"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
                </el-date-picker>
                
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="plpbVisible = false">取 消</el-button>
                <el-button type="primary" @click="scheduleSetbatch">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import bus from '../../../bus';
    import {staffService} from '../../../service/staff';
    import {storeService} from '../../../service/store';
    import settingVue from './setting.vue';
    import StaffDetail from './staffDetail';
import { clearInterval } from 'timers';
    export default {
        data() {
            return {
                shopList: [],
                is_search: false,
                select_word: '',
                checkList: [],
                dayLength: 0,
                dayList: [],
                year: new Date().getFullYear(),
                mouth: '',
                loadDay: false,
                shiftsSettingList: [],
                sysRoute: window.sysRoute || '',
                colors: {},
                plpbVisible: false,
                handleShopIndex: 0,
                handleCheckedPeopleList: [],
                handleShiftsId: '',
                handleScheduleDate: '',
                datalength: ''
            }
        },
        components:{
            StaffDetail
        },
        watch:{
            handleScheduleDate(){
                const t = this;
                console.log(t.handleScheduleDate)
                let _time = new Date(t.handleScheduleDate[1]).getTime() - new Date(t.handleScheduleDate[0]).getTime();
                let datalength = _time/1000/60/60/24 + 1;
                console.log(datalength)
                if(datalength>30){
                    t.handleScheduleDate = [];
                    t.$message({
                        message: '最多只能选择一个月',
                        type: 'warning'
                    });
                    return
                }
            },
            mouth(){
                const t = this;
                t.loadDay = false;
                if(t.shopList.length){
                    t.shopList[0].showAll = false;
                    t.shopList[0].peopleList = null;
                    t.showAll(0)
                }
            },
            year(){
                const t = this;
                t.loadDay = false;
                t.shopList[0].showAll = false
                t.shopList[0].peopleList = null;
                t.showAll(0)
            }
        },
        methods:{
            plpbDo(shopIndex){
                const t = this;
                let _checkedPeopleList = t.shopList[shopIndex].peopleList.filter(v=>{
                    return v.checked
                })
                if(!_checkedPeopleList.length){
                    t.$message({
                        message: '请选择门店员工',
                        type: 'warning'
                    });
                    return
                }
                t.handleShopIndex = shopIndex;
                t.handleCheckedPeopleList = _checkedPeopleList
                t.plpbVisible = true;
            },
            handleCheckAllChange(shopIndex) {
                const t = this;
                let _do = ()=>{
                    if(t.shopList[shopIndex].checkedAll){
                        t.shopList[shopIndex].checkedAll = false;
                        t.shopList[shopIndex].peopleList.forEach(v=>{
                            v.checked = false;
                        })
                    }else{
                        t.shopList[shopIndex].checkedAll = true;
                        t.shopList[shopIndex].peopleList.forEach(v=>{
                            v.checked = true;
                        })
                    }
                    t.$set(t.shopList,shopIndex,t.shopList[shopIndex])
                }
                if(t.shopList[shopIndex].showAll == false){
                    t.showAll(shopIndex).then(res=>{
                        _do();
                    })
                }else{
                    _do();
                }
                
            },
            handleCheckedChange(shopIndex, peopleIndex) {
                const t = this;
                // t.shopList[shopIndex].peopleList[peopleIndex].checked = !t.shopList[shopIndex].peopleList[peopleIndex].checked;
                let checkedCount = t.shopList[shopIndex].peopleList.filter((v)=>{
                    return v.checked
                }).length;
                t.shopList[shopIndex].checkedAll = checkedCount == t.shopList[shopIndex].peopleList.length;
                t.$set(t.shopList,shopIndex,t.shopList[shopIndex])
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
            formatEveryDay(){
                const t = this;
                let start = t.handleScheduleDate[0],
                    end   = t.handleScheduleDate[1];
                let getDate = (datestr)=>{
                    var temp = datestr.split("-");
                    var date = new Date(temp[0], temp[1] - 1, temp[2]);
                    return date;
                }
                let dateList = []; 
                var startTime = getDate(start);
                var endTime = getDate(end);

                while ((endTime.getTime() - startTime.getTime()) >= 0) {
                    var year = startTime.getFullYear();
                    var month = startTime.getMonth() + 1 < 10 ? '0' + (startTime.getMonth() + 1) : startTime.getMonth() + 1;
                    var day = startTime.getDate().toString().length == 1 ? "0" + startTime.getDate() : startTime.getDate();
                    dateList.push(year + "-" + month + "-" + day); 
                    startTime.setDate(startTime.getDate() + 1);
                }
                return dateList;
            },
            refreash(){
                const t = this;
                t.plpbVisible = false;
                t.shopList[t.handleShopIndex].peopleList = null;
                t.shopList[t.handleShopIndex].showAll = false;
                t.showAll(t.handleShopIndex);
            },
            scheduleSetbatch(){
                const t = this;
                let len = 0;
                let _do = (scheduleDate)=>{
                    let params = {
                        employeeIds: t.handleCheckedPeopleList.map((v)=>{return v.id}).join(','),
                        shiftsId: t.handleShiftsId,
                        scheduleDate: scheduleDate
                    }
                    staffService.scheduleSetbatch(params).then(res=>{
                        len += 1;
                    })
                }
                let dateList = t.formatEveryDay();
                dateList.forEach((v, i)=>{
                    _do(v)
                })
                let setii = setInterval(() => {
                    if(len == dateList.length){
                        t.refreash();
                        window.clearInterval(setii);
                    }
                }, 100);
            },
            handleCommand(res){
                const t = this;
                let d = res.split(',');
                //   :command="shopIndex+','+peopleIndex+','+dayIndex + ',' + i"
                t.shopList[d[0]].peopleList[d[1]].employeeScheduleList[d[2]].shiftsName = t.shiftsSettingList[d[3]].shiftsName;
                t.$set(t.shopList,d[0],t.shopList[d[0]])
                // t.shopList = JSON.parse(JSON.stringify(t.shopList))
                if(t.shiftsSettingList[d[3]].id==0){
                    let params = {
                        employeeId: t.shopList[d[0]].peopleList[d[1]].id,
                        scheduleDate: t.shopList[d[0]].peopleList[d[1]].employeeScheduleList[d[2]].scheduleDate
                    }
                    staffService.scheduleDel(params)
                }else{
                    let params = {
                        employeeId: t.shopList[d[0]].peopleList[d[1]].id,
                        shiftsId: t.shiftsSettingList[d[3]].id,
                        scheduleDate: t.shopList[d[0]].peopleList[d[1]].employeeScheduleList[d[2]].scheduleDate
                    }
                    staffService.scheduleSet(params)
                }
                
            },
            showAll(shopIndex){
                const t = this;
                let p = new Promise((resolve, reject)=>{
                    if(!t.shopList[shopIndex].showAll){
                        let storeId = t.shopList[shopIndex].id;
                        if(!t.shopList[shopIndex].peopleList){
                            t.getStoreEmployeeScheduleList(storeId).then((res)=>{
                                res.forEach((v, i)=>{
                                    v.checked = false;
                                })
                                t.shopList[shopIndex].peopleList = res;
                                t.$set(t.shopList,shopIndex,t.shopList[shopIndex]);
                                t.loadDay = true;
                                resolve();
                            })
                        }else{
                            t.$set(t.shopList,shopIndex,t.shopList[shopIndex]);
                            resolve();
                        }
                        setTimeout(() => {
                            t.shopList[shopIndex].showAll = true;    
                        }, 0);
                    }else{
                        t.shopList[shopIndex].showAll = false;
                        t.$set(t.shopList,shopIndex,t.shopList[shopIndex]);
                        resolve();
                    }
                })
                return p;
                
                
            },
            checkBoxChange(){
                const t = this;
                if(!t.checkList.length){
                    for(const v of t.shopList){
                        v.show = true;
                    }
                    return
                }
                t.shopList.forEach((v, i)=>{
                    if(t.checkList.indexOf(v.id)>-1){
                        v.show = true;
                        t.showAll(i);
                        v.showAll = true;
                    }else{
                        v.show = false
                    }
                })
            },
            search() {
                this.is_search = true;
            },
            getStoreEmployeeScheduleList(storeId){
                const t = this;
                let p = new Promise((resolve, reject)=>{
                    staffService.getStoreEmployeeScheduleList({
                        storeId: storeId,
                        monthDate: t.year + '-' + t.mouth
                    }).then((res)=>{

                        resolve(res)
                    });
                })
                return p;
                
            }
        },
        mounted(){
            const t = this;
            t.mouth = new Date().getMonth() +1;
            t.mouth = t.mouth<10?'0'+t.mouth : t.mouth;
            // 门店列表
            storeService.list({pageSize: 100,pageNumber: 1}).then((res)=>{
                for(const v of res.records){
                    v.showAll = false;
                    v.show = true;
                    v.checkedAll = false;
                    v.checkedPeoples = [];
                }
                t.shopList = res.records;
                if(window.sysRoute=='vb'){
                    // 门店处理
                    t.shopList = t.shopList.filter((v)=>{
                        return v.id == window.storeId;
                    })
                }
                t.showAll(0)
            });
            // 排班列表
            staffService.shiftsSettingList().then((res)=>{
                res.push({
                    shiftsName: '无',
                    id: 0
                })
                t.colors[res[0].shiftsName] = '#00ee2d';
                t.colors[res[1].shiftsName] = '#00b4ff';
                t.colors[res[2].shiftsName] = '#ffde00';
                t.colors[res[3].shiftsName] = '#aeaeae';
                t.shiftsSettingList = res;
            })
        }
    }
</script>
<style scoped>
    
</style>
