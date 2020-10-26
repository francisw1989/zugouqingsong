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
                    <span class="left20 right20 ">{{year}}年{{mouth}}月考勤</span>
                    <i class="el-icon-caret-right pointer" @click="nextMouth"></i>
                </p>
            </div>
            <div class=" clearfix top10" v-if="sysRoute=='va'">
                <!-- <el-input v-model="select_word" placeholder="请输入员工姓" class="handle-input"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="search" class="left10">搜索</el-button> -->
                <el-checkbox-group v-model="checkList" class="" style="display: inline" @change='checkBoxChange' >
                    <el-checkbox :label="v.id"  v-for="(v, i) in shopList" :key="i">{{v.name}}</el-checkbox>
                </el-checkbox-group>
            </div>
            <div class="top20">
                <span v-for="(v, i) in typeList" :key="i" class="right10">
                    <i :class="v.icon"></i><span class="left5" :style="{'color':v.color}">{{v.name}}</span>
                </span>
            </div>
             <!-- <el-checkbox-group v-model="typeValue" class="top20"  @change='type_change' disabled>
                <el-checkbox-button :icon='v.icon' :label="v.name"  v-for="(v, i) in typeList" :key="i" ><i :class="v.icon"></i><span class="left5">{{v.name}}</span></el-checkbox-button>
            </el-checkbox-group> -->
            
            <table class="m-table top20" style="min-width: 1200px">
                <tr class="tr2">
                    <td style="width: 80px">姓名</td><td style="width: 80px">职务</td>
                    <template v-if="loadDay">
                        <td v-for="(v, i) in shopList[0].peopleList[0].employeeAttendanceList" :key="i" class="td">{{i+1}}</td>
                    </template>
                </tr>
            </table>
            <div v-if="loadDay">
                <table class="m-table" style="min-width: 1200px" v-for="(shopItem, shopIndex) in shopList" :key="shopIndex"  v-if="shopItem.show">
                    <tr class="tr" ><td  :colspan="shopList[0].peopleList[0].employeeAttendanceList.length+2"><span class="pointer" @click="showAll(shopIndex)">{{shopItem.name}} <i :class="shopItem.showAll?'el-icon-caret-top':''" class="el-icon-caret-bottom left5"></i> </span></td></tr>
                    <template  v-if='shopItem.showAll' >
                        <tr v-for="(peopleItem, peopleIndex) in shopItem.peopleList" :key="peopleIndex">
                            <td style="width: 80px">{{peopleItem.employeeName}}</td>
                            <td style="width: 80px">{{peopleItem.postBean.postName}}</td>
                            <template  v-for="(dayItem, dayIndex) in peopleItem.employeeAttendanceList">
                                 <td  class="td" :key="dayIndex" :style="{'background': typeList[2].color}" v-if="dayItem.status==null"><i :class="typeList[2].icon + ' colfff'"></i></td>
                                 <td  class="td" :key="dayIndex" :style="{'background': typeList[dayItem.status].color}" v-else><i :class="typeList[dayItem.status].icon + ' colfff'"></i></td>
                            </template>
                        </tr>
                    </template>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
    import bus from '../../../bus';
    import {staffService} from '../../../service/staff';
    import {storeService} from '../../../service/store';
    import StaffDetail from './staffDetail';
    export default {
        data() {
            return {
                list: [],
                is_search: false,
                select_word: '',
                checkList:[],
                shopList: [],
                dayLength: 0,
                dayList: [],
                year: new Date().getFullYear(),
                mouth: new Date().getMonth() +1,
                //  0.请假 1正常  2.未打卡  3.休假   4.迟到  5.早退  6.迟到早退
                typeList: [
                    {name: '请假', icon:'el-icon-circle-close-outline', color: '#aeaeae'},
                    {name: '正常', icon:'el-icon-check', color: '#00ee2d'},
                    {name: '未打卡', icon:'el-icon-circle-close', color: '#ff3c3c'},
                    {name: '休班', icon:'el-icon-remove-outline', color: '#aeaeae'},
                    {name: '迟到', icon:'el-icon-arrow-down', color: '#ffde00'},
                    {name: '早退', icon:'el-icon-arrow-up', color: '#ff9600'},
                    {name: '迟到早退', icon:'el-icon-close', color: '#ffde00'},
                ],
                typeValue: [],
                loadDay: false,
                sysRoute: window.sysRoute || ''
            }
        },
        components:{
            StaffDetail
        },
        watch:{
            mouth(){
                const t = this;
                t.loadDay = false;
                if(t.shopList.length){
                    t.shopList[0].showAll = false
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
            type_change(){
                const  t = this;
                console.log(t.typeValue)
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
            handleCommand(res){
                const t = this;
                let d = res.split(',');
                t.list[d[0]].peopleList[d[1]].dayList[d[2]] = d[3];
                t.$set(t.list,d[0],t.list[d[0]])
            },
            showAll(shopIndex){
                const t = this;
                // for(const v of t.shopList){
                //     v.showAll = false
                // }
                // t.shopList = JSON.parse(JSON.stringify(t.shopList))
                if(!t.shopList[shopIndex].showAll){
                    t.shopList[shopIndex].showAll = true;
                    let storeId = t.shopList[shopIndex].id;
                    if(!t.shopList[shopIndex].peopleList){
                        t.getStoreWorkingTimeList(storeId).then((res)=>{
                            t.shopList[shopIndex].peopleList = res;
                            t.$set(t.shopList,shopIndex,t.shopList[shopIndex]);
                            t.loadDay = true;
                            console.log(t.shopList[0].peopleList[0].employeeAttendanceList)
                        })
                    }else{
                        t.$set(t.shopList,shopIndex,t.shopList[shopIndex]);
                    }
                }else{
                    t.shopList[shopIndex].showAll = false;
                    t.$set(t.shopList,shopIndex,t.shopList[shopIndex]);
                }
                
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
            getStoreWorkingTimeList(storeId){
                const t = this;
                let p = new Promise((resolve, reject)=>{
                    staffService.getStoreWorkingTimeList({
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
            // staffService.getStaffWorktime().then((res)=>{
            //     t.list = res;
            //     console.log(t.list)
            //     t.dayList = res[0].peopleList[0].dayList;
            //     t.dayLength = res[0].peopleList[0].dayList.length
            // });

        }
    }
</script>
<style scoped>
    
</style>
