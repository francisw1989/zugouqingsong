<template>
    <el-row>
        <el-col :span="11" style="border-right: 1px solid #ddd; padding-left: 10px">
            <el-row>
                <el-col :span="7">
                    <div style="width: 80px" class="relative clearfix">
                        <img src="../../../assets/img/img.jpg" alt="" class="tx1 left">
                        <div class="ghWap font12">工号:3242342</div>
                    </div>
                </el-col>
                <el-col :span="17">
                    <p class="font16b top10 ">张三  <span class="left20 font12 col999">男 26岁</span> </p>
                    <p class="top5">
                        <el-tag type="success" size="small">¥1213.00</el-tag>
                        <el-tag type="info" size="small" class="left5">VIP-3</el-tag>
                        <el-tag type="danger" size="small" class="left5">12</el-tag>
                    </p>
                </el-col>
            </el-row>
            <el-form ref="form" :model="form"  :rules="rules"   label-width="80px" class="staffForm top20">
                <el-form-item label="联系电话" >
                    18238383838
                </el-form-item>
                <el-form-item label="注册时间" >
                    2019-09-09
                </el-form-item>
                <el-form-item label="出身日期" >
                    <span v-if="!edit.c">{{form.c}} <i class="el-icon-edit left20 pointer" @click="openEdit('c')"></i> </span>
                    <el-date-picker v-if="edit.c" ref="c"  value-format="yyyy-MM-dd" v-model="form.c" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="黑名单" >
                    <el-switch v-model="form.hei" class=""></el-switch>
                    <span class="col999 left5">2019-7-11 12：00修改</span>
                    <p class="top5">服务时轻薄技术小妹，小妹奋起反抗！</p>
                </el-form-item>
                <el-form-item label="红名单" >
                    <el-switch v-model="form.hong" class=""></el-switch>
                </el-form-item>
                
            </el-form>
            
        </el-col>
        <el-col :span="13" style="padding-left: 10px">
            <div class="smallTabWap">
                <el-tabs v-model="tabName" @tab-click="tabClick">
                    <el-tab-pane :label="v" :name="v" v-for="(v, i) in tabs" :key="i"></el-tab-pane>
                </el-tabs>
            </div>
            <div class="pad10 ">
                <div v-if="tabName=='行为统计'">
                    <p class="font20 col000">服务情况</p>
                    
                </div>
            </div>
        </el-col>
        
    </el-row>
   
</template>
<script>
    import bus from '../../../bus';
    import {customerService} from '../../../service/customer';
    var echarts = require('echarts');
    export default {
        name: 'customerDetail',
        data() {
            return {
                form:{},
                rules: {
                    a: [
                        { required: true, message: '请选择类型', trigger: 'change' },
                    ]
                },
                edit:{
                    
                },
                shopList: [],
                projectList: [],
                tabs: ['行为统计', '服务明细', '消费明细', '充值记录'],
                tabsType:[],
                tabName: '行为统计',
                hei: false,
                hong: false
            }
        },
        computed:{
            
        },
        methods:{
            
            tabClick(tab, event){
                const t = this;
                console.log(t.tabName)
                if(t.tabName == '师徒'){
                    setTimeout(() => {
                        t.initTreeChart()
                    }, 100);
                    
                }
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
            }
        },
        mounted(){
            const t = this;
            
            customerService.getCustormDetail().then((res)=>{
                for(const key in res){
                    t.edit[key] = false;
                }
                t.$commonService.getTagsTypeList().then((res)=>{
                    t.form.tags.forEach(v => {
                        let i = Math.floor(Math.random() * (10 - 0)) + 0;
                        console.log(i);
                        t.tabsType.push(res[i])
                    });
                    
                });
                t.form = res;
                console.log(t.form.ssmd)
            })
           
            
        }
    }
</script>
<style scoped>
    
</style>
