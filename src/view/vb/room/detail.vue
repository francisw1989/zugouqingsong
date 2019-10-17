<template>
    <div>
        <div class="font20  col333 top10">{{D.name}}<span class="left10 font12 col999">{{D.labels}}</span><span class="left10 font12 col999">{{D.count||0}}/{{D.peopleNum}}</span></div>
        <el-row class="table1 center top20" v-if="D.roomDetailData">
            <el-col :span="8">
                <p  class="colblue font16">今日收入</p>
                <p>{{(D.roomDetailData.totalPrice/100).toFixed(2)}}</p>
            </el-col>
            <el-col :span="8">
                <p class="colred font16">服务人次</p>
                <p>{{D.roomDetailData.serviceNum}}</p>
            </el-col>
            <el-col :span="8">
                <p class="colgreen font16">客单价</p>
                <p class="">{{(D.roomDetailData.perTicketSale/100).toFixed(2)}}</p>
            </el-col>
        </el-row>
        <p class="top20 font20 col333">今日房间预约</p>
        <template  v-if='D.roomDetailData && D.roomDetailData.orderItemList && D.roomDetailData.orderItemList.length' >
            <div v-for="(v, i) in D.roomDetailData.orderItemList" :key="i" class="top20">
                <div class="">{{v.itemName}}</div>
                <table class="m-table2 top10">
                    <tr>
                        <td style="width: 200px">{{v.orderStartTime}}</td>
                        <td style="width: 130px">{{v.employeeName.join(',')}}</td>
                        <td>{{(v.orderPrice/100).toFixed(2)}}元</td>
                    </tr>
                </table>
            </div>
        </template>
    </div>
   
   
</template>
<script>
    import bus from '../../../bus';
    import {roomService} from '../../../service/room';

    var echarts = require('echarts');
    export default {
        name: 'Detail',
        props: ['id'],
        data() {
            return {
                D:{}
            }
        },
        computed:{
            
        },
        methods:{
            roomMessage(){
                const t = this;
                roomService.roomMessage({id: t.id}).then((res)=>{
                    t.D = res
                })
            }
        },
        mounted(){
            const t = this;
            t.roomMessage();
        }
    }
</script>
<style scoped>
    
</style>
