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
                <el-button type="primary" icon="el-icon-search" @click="Export()" class="right">导出</el-button>
                <span class="">员工姓名</span>
                <el-select class="left10"  clearable v-model="employeesId" placeholder="请选择" filterable>
                    <el-option v-for="(v, i) in employeesList" :key='v.id' :label="v.employeeName"  :value="v.id"></el-option>
                </el-select>
                <span class="left20">开始时间</span>
                <el-date-picker class="left10" style="width: 150px" value-format="yyyy-MM-dd" v-model="startData" type="date" placeholder="选择日期"></el-date-picker>
                <span class="left20">结束时间</span>
                <el-date-picker class="left10" style="width: 150px" value-format="yyyy-MM-dd" v-model="endData" type="date" placeholder="选择日期"></el-date-picker>

                <el-button type="primary" icon="el-icon-search" @click="search" class="left10">查询</el-button>
            </div>
            
            <table class="m-table6 top20">
                <tr>
                    <td rowspan='2'>姓名</td>
                    <td rowspan='2'>日期</td>
                    <td colspan="3">项目提成（线上）</td>
                    <td colspan="3">项目提成（收银台）</td>
                    <td rowspan="2">总提成</td>
                </tr>
                <tr>
                    <td>次数</td>
                    <td>业绩</td>
                    <td>提成</td>
                    <td>次数</td>
                    <td>业绩</td>
                    <td>提成</td>
                </tr>
                <template v-for="(v1, i1) in list">
                    <tr class="tr1" v-for="(v2, i2) in v1.list">
                        <td v-if="i2 == 0" :rowspan="v1.list.length">{{v1.name}}</td>
                        <td>{{v2.updatedTime}}</td>
                        <td>{{v2.a1}}</td>
                        <td>{{v2.a2}}</td>
                        <td>{{v2.a3}}</td>
                        <td>{{v2.a4}}</td>
                        <td>{{v2.a5}}</td>
                        <td>{{v2.a6}}</td>
                        <td>{{v2.a7}}</td>
                        
                    </tr>
                    <tr class="tr2">
                        <td colspan="2">合计：</td>
                        <td>{{v1.a1}}</td>
                        <td>{{v1.a2}}</td>
                        <td>{{v1.a3}}</td>
                        <td>{{v1.a4}}</td>
                        <td>{{v1.a5}}</td>
                        <td>{{v1.a6}}</td>
                        <td>{{v1.a7}}</td>
                    </tr>
                </template>
                
            </table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next"  :page-size='pageSize' :total="total">
                </el-pagination>
            </div>
        </div>


    </div>
</template>
<script>
    import bus from '../../../bus';
    import {reportService} from '../../../service/report';
    import {staffService} from '../../../service/staff';
    export default {
        data() {
            return {
                list: [
                    {name: '张三', list: [{updatedTime: '2020-12-01', a1: 100,a2: 100,a3: 100,a4: 100,a5: 100,a6: 100,a7: 100 },{updatedTime: '2020-12-01',a1: 200,a2: 100,a3: 100,a4: 100,a5: 100,a6: 100,a7: 200 }]},
                    {name: '张三2', list: [{updatedTime: '2020-12-07', a1: 200,a2: 200,a3: 100,a4: 100,a5: 100,a6: 100,a7: 100 },{updatedTime: '2020-12-01',a1: 100,a2: 100,a3: 100,a4: 100,a5: 100,a6: 100,a7: 200 }]},
                ],
                startData: '',
                endData: '',
                total: 0,
                pageSize: 10,
                pageNumber: 1,
                employeesList: [],
                employeesId: ''
            }
        },
        components:{
			
        },
        methods:{
            Export(){
                
            },
            getEmployeesList(){
                const t = this;
                t.employeesList = [];
                let params = {
                    pageSize: 1000,
                    pageNumber: 1
                }
                staffService.getEmployeesList(params).then((res)=>{
                    t.employeesList = res.records;
                })
            },
            handleCurrentChange(val) {
                this.pageNumber = val;
                this.getlist();
            },
            search() {
                const t = this;
                t.getlist();
            },
            getlist(){
                const t = this;
                let params = {
                    startData: t.startData,
                    endData: t.endData,
                    employeesId: t.employeesId,
                    pageSize: t.pageSize,
                    pageNumber: t.pageNumber
                }
                const keys = Object.keys(t.list[0].list[0]);
                console.log(keys)
                // 合计处理
                
                t.list.forEach((staffItem) => {
                    staffItem.list.forEach((item, i) =>{
                        keys.forEach(key =>{
                            if(!isNaN(item[key])){
                                staffItem[key] = !isNaN(staffItem[key]) ? Number(staffItem[key] || 0) + Number(item[key] || 0) :  Number(item[key] || 0) 
                                staffItem[key] = staffItem[key].toFixed(2)
                            }
                        })
                    })
                });
                


                console.log(t.list)
                // report.list(params).then((res)=>{
				// 	t.list = res.records;
                //     for(const v of t.list){
                //         v.actualOrderPrice = v.actualOrderPrice/100;
				// 		v.evaluateLabel = v.evaluateLabel==""?'/':v.evaluateLabel;
				// 		v.content = v.content==""?'/':v.content;
                //     }
                //     t.total = res.total
                // });
            }
        },
        watch:{
        },
        mounted(){
           const t = this;
           t.getlist();
           t.getEmployeesList();
        }
    }
</script>
<style scoped>
    
</style>
