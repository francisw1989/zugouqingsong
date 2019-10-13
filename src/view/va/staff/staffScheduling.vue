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
                <div class="top20">
                    班次： 
                    <template  v-for="(v, i) in shiftsSettingList">
                        <span  v-if="i!=shiftsSettingList.length-1" :key="i"  class="left10 right10" >{{v.shiftsName}} {{v.startTime}}-{{v.endTime}}</span>
                    </template>
                    
                </div>
            </div>
            
            <table class="m-table top20" style="min-width: 1200px">
                <tr class="tr2">
                    <td style="width: 80px">姓名</td><td style="width: 80px">职务</td>
                    <template v-if="loadDay">
                        <td v-for="(v, i) in shopList[0].peopleList[0].employeeScheduleList" :key="i" class="td">{{i+1}}</td>
                    </template>
                </tr>
            </table>
            <div v-if="loadDay">
                <table class="m-table" style="min-width: 1200px" v-for="(shopItem, shopIndex) in shopList" :key="shopIndex"  v-if="shopItem.show">
                    <tr class="tr" ><td  :colspan="shopList[0].peopleList[0].employeeScheduleList.length+2"><span class="pointer" @click="showAll(shopIndex)">{{shopItem.name}} <i :class="shopItem.showAll?'el-icon-caret-top':''" class="el-icon-caret-bottom left5"></i> </span></td></tr>
                    <template  v-if='shopItem.showAll' >
                        <tr v-for="(peopleItem, peopleIndex) in shopItem.peopleList" :key="peopleIndex">
                            <td style="width: 80px">{{peopleItem.employeeName}}</td>
                            <td style="width: 80px">{{peopleItem.postBean.postName}}</td>
                            <template  v-for="(dayItem, dayIndex) in peopleItem.employeeScheduleList">
                                <td  class="td" :key="dayIndex">
                                    <el-dropdown trigger="click" placement='bottom-start' @command="handleCommand">
                                        <span class="pointer">{{dayItem.shiftsName || '无'}}</span>
                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item v-for="(v, i) in shiftsSettingList" :key="v.id"  :command="shopIndex+','+peopleIndex+','+dayIndex + ',' + i">{{v.shiftsName}}</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>
                                </td>
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
            prevMouth(){
                const t = this;
                if(t.mouth==1){
                    t.mouth = 12;
                    t.year --;
                    t.
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
                // for(const v of t.shopList){
                //     v.showAll = false
                // }
                // t.shopList = JSON.parse(JSON.stringify(t.shopList))
                if(!t.shopList[shopIndex].showAll){
                    t.shopList[shopIndex].showAll = true;
                    let storeId = t.shopList[shopIndex].id;
                    if(!t.shopList[shopIndex].peopleList){
                        t.getStoreEmployeeScheduleList(storeId).then((res)=>{
                            // for(const v of res){
                            //     for(const v2 of v.employeeScheduleList){
                            //         if(v2.shiftsId){
                            //             v2.shiftsName = t.shiftsSettingList[Number(v2.shiftsId) -1]
                            //         }else{
                            //             v2.shiftsName = '无'
                            //         }
                            //     }
                            // }
                            t.shopList[shopIndex].peopleList = res;
                            t.$set(t.shopList,shopIndex,t.shopList[shopIndex]);
                            t.loadDay = true;
                            console.log(t.shopList[0].peopleList[0].employeeScheduleList)
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
                t.shiftsSettingList = res;
            })


        }
    }
</script>
<style scoped>
    
</style>
