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
                <el-input v-model="select_word" placeholder="请输入员工姓" class="handle-input"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="search" class="left10">搜索</el-button>
                <el-checkbox-group v-model="checkList" class="left20" style="display: inline" @change='checkBoxChange'>
                    <el-checkbox :label="v.shopId"  v-for="(v, i) in shopList" :key="i">{{v.shopName}}</el-checkbox>
                </el-checkbox-group>
            </div>
            <table class="m-table">
                <tr>
                    <td>姓名</td><td>职务</td>
                    <td v-for="(v, i) in dayList" :key="i">{{i+1}}</td>
                </tr>
                <template v-for="(shopItem, shopIndex) in list">
                    <tr><td :colspan="dayLength+2">{{shopItem.shopName}}</td></tr>
                    <tr v-for="(peopleItem, peopleIndex) in shopItem.peopleList" :key="peopleIndex">
                        <td>{{peopleItem.name}}</td>
                        <td>{{peopleItem.position}}</td>
                        <td v-for="(dayItem, dayIndex) in peopleItem.dayList" :key="dayIndex">{{dayItem}}</td>
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
                dayList: []
            }
        },
        components:{
            StaffDetail
        },
        methods:{
           
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
            staffService.getSchedulingList().then((res)=>{
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
