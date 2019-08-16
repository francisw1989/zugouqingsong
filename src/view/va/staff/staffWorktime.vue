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
            <div class=" clearfix top10">
                <el-input v-model="select_word" placeholder="请输入员工姓" class="handle-input"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="search" class="left10">搜索</el-button>
                <el-checkbox-group v-model="checkList" class="left20" style="display: inline" @change='checkBoxChange'>
                    <el-checkbox :label="v.shopId"  v-for="(v, i) in shopList" :key="i">{{v.shopName}}</el-checkbox>
                </el-checkbox-group>
            </div>
             <el-checkbox-group v-model="typeValue" class="top20"  @change='type_change'>
                <el-checkbox-button :icon='v.icon' :label="v.name"  v-for="(v, i) in typeList" :key="i" ><i :class="v.icon"></i><span class="left5">{{v.name}}</span></el-checkbox-button>
            </el-checkbox-group>
            
            <table class="m-table top20">
                <tr class="tr2">
                    <td>姓名</td><td>职务</td>
                    <td v-for="(v, i) in dayList" :key="i" class="td">{{i+1}}</td>
                </tr>
            </table>
            <table class="m-table" v-for="(shopItem, shopIndex) in list" :key="shopIndex">
                <tr class="tr"><td :colspan="dayLength+2"><span class="pointer" @click="showAll(shopIndex)">{{shopItem.shopName}} (今日异常0,本月异常:0,出勤率99%)<i class="el-icon-caret-bottom left5"></i> </span></td></tr>
                <template  v-if='shopItem.showAll' >
                    <tr v-for="(peopleItem, peopleIndex) in shopItem.peopleList" :key="peopleIndex">
                        <td>{{peopleItem.name}}</td>
                        <td>{{peopleItem.position}}</td>
                        <template  v-for="(dayItem, dayIndex) in peopleItem.dayList">
                            <td  class="td" :key="dayIndex"><i :class="typeList[dayItem].icon"></i></td>
                        </template>
                    </tr>
                </template>
            </table>
        </div>
    </div>
</template>
<script>
    import bus from '../../../bus';
    import {staffService} from '../../../service/staff';
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
                year: '2019',
                mouth: '8',
                typeList: [
                    {name: '正常', icon:'el-icon-check'},
                    {name: '休班', icon:'el-icon-remove-outline'},
                    {name: '迟到', icon:'el-icon-arrow-down'},
                    {name: '早退', icon:'el-icon-arrow-up'},
                    {name: '迟到且早退', icon:'el-icon-close'},
                    {name: '请假', icon:'el-icon-circle-close-outline'},
                ],
                typeValue: []
            }
        },
        components:{
            StaffDetail
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
                t.list[shopIndex].showAll ? t.list[shopIndex].showAll = false : t.list[shopIndex].showAll = true;
                t.$set(t.list,shopIndex,t.list[shopIndex])
            },
            checkBoxChange(){
                const t = this;
                console.log(t.checkList)
            },
            search() {
                this.is_search = true;
            },

          
        },
        mounted(){
            const t = this;
            // 门店列表
            t.$commonService.getShopList().then((res)=>{
                t.shopList = res
            });
            staffService.getStaffWorktime().then((res)=>{
                t.list = res;
                console.log(t.list)
                t.dayList = res[0].peopleList[0].dayList;
                t.dayLength = res[0].peopleList[0].dayList.length
            });

        }
    }
</script>
<style scoped>
    
</style>
