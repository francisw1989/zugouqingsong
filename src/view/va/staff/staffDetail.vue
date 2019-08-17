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
                        <el-tag size="small">技师</el-tag>
                        <el-tag size="small" class="left5">三级</el-tag>
                    </p>
                </el-col>
            </el-row>
            <el-form ref="form" :model="form"  :rules="rules"   label-width="80px" class="staffForm top20">
                <el-form-item label="联系电话" >
                    <span v-if="!edit.a">{{form.a}} <i class="el-icon-edit left20 pointer" @click="openEdit('a')"></i> </span>
                    <el-input v-if="edit.a" v-model="form.a" ref="a"></el-input>
                </el-form-item>
                <el-form-item label="入职时间" >
                    <span v-if="!edit.b">{{form.b}} <i class="el-icon-edit left20 pointer" @click="openEdit('b')"></i> </span>
                    <el-date-picker v-if="edit.b" ref="b"  value-format="yyyy-MM-dd" v-model="form.b" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="出身日期" >
                    <span v-if="!edit.c">{{form.c}} <i class="el-icon-edit left20 pointer" @click="openEdit('c')"></i> </span>
                    <el-date-picker v-if="edit.c" ref="c"  value-format="yyyy-MM-dd" v-model="form.c" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="是否流动" >
                        <el-switch v-model="form.isLiudong" class=""></el-switch>
                </el-form-item>
                <el-form-item label="所属门店" >
                    <div v-for="(sItem, i) in form.ssmd" :key="i" class="btm5">
                        <el-select v-model="form.ssmd[i]"  style="width: 80%">
                            <el-option v-for="item in shopList" :key="item.shopName" :label="item.shopName" :value="item.shopName"></el-option>
                        </el-select>
                        <i class="el-icon-circle-plus-outline left10 pointer" @click="mdAdd"></i>
                        <i class="el-icon-remove-outline left5 pointer" v-if='i>0' @click="mdRemove(i)"></i>
                    </div>
                    
                </el-form-item>
                <el-form-item label="服务项目" >
                    <div v-for="(sItem, i) in form.fwxm" :key="i" class="btm5">
                        <el-select v-model="form.fwxm[i]"  style="width: 80%">
                            <el-option v-for="item in projectList" :key="item.a" :label="item.a" :value="item.a"></el-option>
                        </el-select>
                        <i class="el-icon-circle-plus-outline left10 pointer" @click="mdAdd2"></i>
                        <i class="el-icon-remove-outline left5 pointer" v-if='i>0' @click="mdRemove2(i)"></i>
                    </div>
                    
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
                                <p class="top10" style="color:#07c4a8">本月商品销售</p>
                            </el-card>
                        </el-col>
                    </el-row>
                </div>
                <div v-if="tabName=='服务'">
                    <p class="font20 col000">服务记录</p>
                    <el-table class="top10"
                        :data="form.fwList"
                        style="width: 100%">
                        <el-table-column
                            prop="a"
                            label="日期"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="a"
                            label="项目"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="a"
                            label="费用">
                        </el-table-column>
                        <el-table-column
                            prop="a"
                            label="其他">
                        </el-table-column>
                    </el-table>
                    <p class="center top10"><span class="pointer colblue">查看完整记录</span></p>
                </div>
                <div v-if="tabName=='排班'">
                    <p class="font20 col000">一周排班情况</p>
                    <el-table class="top10"
                        :data="form.paibanList"
                        style="width: 100%">
                        <el-table-column
                            prop="a"
                            label="日期"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="a"
                            label="时间"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="a"
                            label="班次">
                        </el-table-column>
                    </el-table>
                    <p class="center top10"><span class="pointer colblue">查看完整排班记录</span></p>

                </div>
                <div v-if="tabName=='岗位'">
                    <p class="font20 col000">岗位信息</p>
                    <el-form ref="form" :model="form"  :rules="rules"   label-width="80px" class="staffForm top10">
                        <el-form-item label="岗位" >
                            <span v-if="!edit.a">{{form.a}} <i class="el-icon-edit left20 pointer" @click="openEdit('a')"></i> </span>
                            <el-input v-if="edit.a" v-model="form.a" ref="a"></el-input>
                        </el-form-item>
                        <el-form-item label="级别" >

                            <span v-if="!edit.jb">{{form.jb}} <i class="el-icon-edit left20 pointer" @click="openEdit('jb')"></i> </span>
                            <el-select v-if="edit.jb" v-model="form.jb"  style="width: 80%">
                                <!-- <el-option v-for="item in shopList" :key="item.shopName" :label="item.shopName" :value="item.shopName"></el-option> -->
                                <el-option label="120%" value="120%"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="收费系数" >
                            <span v-if="!edit.sfxs">{{form.sfxs}} <i class="el-icon-edit left20 pointer" @click="openEdit('sfxs')"></i> </span>
                            <el-select v-if="edit.sfxs" v-model="form.sfxs"  style="width: 80%">
                                <el-option label="120%" value="120%"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="提成系数" >
                            <span v-if="!edit.tcxs">{{form.tcxs}} <i class="el-icon-edit left20 pointer" @click="openEdit('tcxs')"></i> </span>
                            <el-select v-if="edit.tcxs" v-model="form.tcxs"  style="width: 80%">
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
                    <el-table class="top10"
                        :data="form.kqList"
                        style="width: 100%">
                        <el-table-column
                            prop="a"
                            label="日期"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="a"
                            label="打卡时间"
                            width="">
                        </el-table-column>
                        <el-table-column
                            prop="a"
                            label="状态">
                        </el-table-column>
                    </el-table>
                </div>
                <div v-if="tabName=='评价'">
                    <p class="font20 col000">评价记录</p>
                    <el-row class="top20">
                        <el-col :span="3">
                            <img src="../../../assets/img/img.jpg" class="tx2" alt="">
                        </el-col>
                        <el-col :span="21">
                            <p class="clearfix">15652362563 <span class="right col999">2016-36</span></p>
                            <p class=""><el-rate style="display: inline-block" v-model="form.rate" class="top5" disabled show-score></el-rate><span class="verMid">分</span></p>
                            <p class="">活好的离开房间是浪费流动</p>
                        </el-col>
                    </el-row>
                    <el-row class="top20">
                        <el-col :span="3">
                            <img src="../../../assets/img/img.jpg" class="tx2" alt="">
                        </el-col>
                        <el-col :span="21">
                            <p class="clearfix">15652362563 <span class="right col999">2016-36</span></p>
                            <p class=""><el-rate style="display: inline-block" v-model="form.rate" class="top5" disabled show-score></el-rate><span class="verMid">分</span></p>
                            <p class="">活好的离开房间是浪费流动</p>
                        </el-col>
                    </el-row>
                    <el-row class="top20">
                        <el-col :span="3">
                            <img src="../../../assets/img/img.jpg" class="tx2" alt="">
                        </el-col>
                        <el-col :span="21">
                            <p class="clearfix">15652362563 <span class="right col999">2016-36</span></p>
                            <p class=""><el-rate style="display: inline-block" v-model="form.rate" class="top5" disabled show-score></el-rate><span class="verMid">分</span></p>
                            <p class="">活好的离开房间是浪费流动</p>
                        </el-col>
                    </el-row>
                </div>
                <div v-if="tabName=='培训'">
                    <p class="font20 col000 clearfix">培训历程  <el-button type='primary' size="mini" class="right">新增</el-button> </p>
                    <el-row class="top20">
                        <el-col :span="4">
                            <p>2018-20</p>
                            <img src="../../../assets/img/img3.png" class="left25" alt="">
                        </el-col>
                        <el-col :span="20">
                            <p>国家级上来看到了快</p>
                            <p class="col999">打顺风锣;的双方都的反倒是史蒂芬孙但是发</p>
                        </el-col>
                    </el-row>
                    <el-row class="top20">
                        <el-col :span="4">
                            <p>2018-20</p>
                            <img src="../../../assets/img/img3.png" class="left25" alt="">
                        </el-col>
                        <el-col :span="20">
                            <p>国家级上来看到了快</p>
                            <p class="col999">打顺风锣;的双方都的反倒是史蒂芬孙但是发</p>
                        </el-col>
                    </el-row>
                    <el-row class="top20">
                        <el-col :span="4">
                            <p>2018-20</p>
                            <img src="../../../assets/img/img3.png" class="left25" alt="">
                        </el-col>
                        <el-col :span="20">
                            <p>国家级上来看到了快</p>
                            <p class="col999">打顺风锣;的双方都的反倒是史蒂芬孙但是发</p>
                        </el-col>
                    </el-row>
                </div>
                <div v-if="tabName=='晋升'">
                    <p class="font20 col000 clearfix">晋升历程  <el-button type='primary' size="mini" class="right">新增</el-button> </p>
                    <el-row class="top20">
                        <el-col :span="4">
                            <p>2018-20</p>
                            <img src="../../../assets/img/img3.png" class="left25" alt="">
                        </el-col>
                        <el-col :span="20">
                            <p>国家级上来看到了快</p>
                            <p class="col999">打顺风锣;的双方都的反倒是史蒂芬孙但是发</p>
                        </el-col>
                    </el-row>
                    <el-row class="top20">
                        <el-col :span="4">
                            <p>2018-20</p>
                            <img src="../../../assets/img/img3.png" class="left25" alt="">
                        </el-col>
                        <el-col :span="20">
                            <p>国家级上来看到了快</p>
                            <p class="col999">打顺风锣;的双方都的反倒是史蒂芬孙但是发</p>
                        </el-col>
                    </el-row>
                    <el-row class="top20">
                        <el-col :span="4">
                            <p>2018-20</p>
                            <img src="../../../assets/img/img3.png" class="left25" alt="">
                        </el-col>
                        <el-col :span="20">
                            <p>国家级上来看到了快</p>
                            <p class="col999">打顺风锣;的双方都的反倒是史蒂芬孙但是发</p>
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
    var echarts = require('echarts');
    export default {
        name: 'staffDetail',
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
                tabs: ['本月', '服务', '排班', '岗位', '考勤', '评价', '培训', '晋升', '师徒'],
                tabsType:[],
                tabName: '本月',
                year: '2019',
                mouth: '8'
            }
        },
        computed:{
            
        },
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
                    color: ['#3398DB', '#f25e43', '#07c4a8'],
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
                if(t.form.ssmd.length>2){
                    t.$message({
                        message: '最多三条',
                        type: 'warning'
                    });
                    return
                }
                t.form.ssmd.push('');

            },
            mdRemove(i){
                const t = this;
                t.form.ssmd.splice(i, 1)
            },
            mdAdd2(){
                const t = this;
                if(t.form.fwxm.length>2){
                    t.$message({
                        message: '最多三条',
                        type: 'warning'
                    });
                    return
                }
                t.form.fwxm.push('');

            },
            mdRemove2(i){
                const t = this;
                t.form.fwxm.splice(i, 1)
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
            
            staffService.getStaffDetail().then((res)=>{
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
            t.$commonService.getShopList().then((res)=>{
                t.shopList = res;
            });
            // 服务项目列表
            t.$commonService.getProjectList().then((res)=>{
               t.projectList = res;
            });
            
        }
    }
</script>
<style scoped>
    
</style>
