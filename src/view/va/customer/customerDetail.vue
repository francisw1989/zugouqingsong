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
                    <el-row class="table1 top10 center" style="border: none">
                        <el-col :span="6">
                            <p>服务次数</p>
                            <p>22次</p>
                        </el-col>
                        <el-col :span="6">
                            <p>服务总额</p>
                            <p>22323</p>
                        </el-col>
                        <el-col :span="6">
                            <p>平均客单</p>
                            <p>22次</p>
                        </el-col>
                        <el-col :span="6">
                            <p>消费频次</p>
                            <p>22次</p>
                        </el-col>
                    </el-row>
                    <p class="font20 col000 top20">服务偏好</p>
                    <el-form ref="form" :model="form"  :rules="rules"   label-width="60px" class="staffForm top20">
                        <el-form-item label="标签" >
                            <el-tag :key="tag" v-for="tag in form.tags" closable :disable-transitions="false" @close="handleClose(tag)" class="right5">
                            {{tag}}
                            </el-tag>
                            <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="mini" @keyup.enter.native="handleInputConfirm"
                            @blur="handleInputConfirm">
                            </el-input>
                            <el-button v-else class="button-new-tag" size="mini" @click="showInput">+ 新增标签</el-button>
                        </el-form-item>
                        <el-form-item label="门店" >
                            <el-tag type="success">弘扬总店</el-tag><el-tag type="success" class="left5">新街口店</el-tag>
                        </el-form-item>
                        <el-form-item label="技师" >
                            <el-tag type="warning">张三</el-tag><el-tag type="warning" class="left5">李四</el-tag>
                            <p class="font12 col999">自动过滤服务一次的技师</p>
                        </el-form-item>
                        
                    </el-form>
                </div>
                <div v-if="tabName=='服务明细'">
                    <p class="font20 col000  clearfix"><span class="right ">本月共服务8单</span>服务订单</p>
                    <div class="pad15TB bor_btm_so">
                        <p class="col999">
                            <span>2019-08-02 21：00</span>
                            <span class="left20">颈椎放松</span>
                            <span class="left20">弘扬总店</span>
                            <span class="left20">拼团</span>
                            <span class="left20">120元</span>
                        </p>
                        <p class="">
                            <span class="verMid">张三</span>
                            <span class="left20 verMid">5分</span>
                            <span class="left20 txtOver verMid" style="width: 160px">干活不错,手艺好干活不错,手艺好干活不错,手艺好</span>
                            <el-tag type="success" class="left20 verMid">已预约</el-tag>
                        </p>
                    </div>
                    <div class="pad15TB bor_btm_so">
                        <p class="col999">
                            <span>2019-08-02 21：00</span>
                            <span class="left20">颈椎放松</span>
                            <span class="left20">弘扬总店</span>
                            <span class="left20">拼团</span>
                            <span class="left20">120元</span>
                        </p>
                        <p class="">
                            <span class="verMid">张三</span>
                            <span class="left20 verMid">5分</span>
                            <span class="left20 txtOver verMid" style="width: 160px">干活不错,手艺好干活不错,手艺好干活不错,手艺好</span>
                            <el-tag type="success" class="left20 verMid">已预约</el-tag>
                        </p>
                    </div>
                    <div class="pad15TB bor_btm_so">
                        <p class="col999">
                            <span>2019-08-02 21：00</span>
                            <span class="left20">颈椎放松</span>
                            <span class="left20">弘扬总店</span>
                            <span class="left20">拼团</span>
                            <span class="left20">120元</span>
                        </p>
                        <p class="">
                            <span class="verMid">张三</span>
                            <span class="left20 verMid">5分</span>
                            <span class="left20 txtOver verMid" style="width: 160px">干活不错,手艺好干活不错,手艺好干活不错,手艺好</span>
                            <el-tag type="success" class="left20 verMid">已预约</el-tag>
                        </p>
                    </div>
                    <p  class="center top10"><span class="pointer colblue">查看完整记录</span></p>
                </div>
                <div v-if="tabName=='消费明细'">
                    <p class="font20 col000  clearfix"><span class="right ">本月共消费8元</span>消费明细</p>
                    <table class="m-table1 top20">
                        <tr>
                            <td class="col999">2019-08-02 21:00</td>
                            <td class="col999">-120元</td>
                            <td>服务消费</td>
                            <td>储值卡支付</td>
                        </tr>
                         <tr>
                            <td class="col999">2019-08-02 21:00</td>
                            <td class="col999">-120元</td>
                            <td>服务消费</td>
                            <td>储值卡支付</td>
                        </tr>
                         <tr>
                            <td class="col999">2019-08-02 21:00</td>
                            <td class="col999">-120元</td>
                            <td>服务消费</td>
                            <td>储值卡支付</td>
                        </tr>
                         <tr>
                            <td class="col999">2019-08-02 21:00</td>
                            <td class="col999">-120元</td>
                            <td>服务消费</td>
                            <td>储值卡支付</td>
                        </tr>
                    </table>
                </div>
                <div v-if="tabName=='充值记录'">
                    <p class="font20 col000  clearfix">充值记录</p>
                    <table class="m-table1 top20">
                        <tr>
                            <td class="col999">2019-08-02 21:00</td>
                            <td class="col999">弘扬总店</td>
                            <td>+3000元</td>
                            <td>会员充值</td>
                            <td>微信</td>
                        </tr>
                        <tr>
                            <td class="col999">2019-08-02 21:00</td>
                            <td class="col999">弘扬总店</td>
                            <td>+3000元</td>
                            <td>会员充值</td>
                            <td>微信</td>
                        </tr>
                        <tr>
                            <td class="col999">2019-08-02 21:00</td>
                            <td class="col999">弘扬总店</td>
                            <td>+3000元</td>
                            <td>会员充值</td>
                            <td>微信</td>
                        </tr>
                        <tr>
                            <td class="col999">2019-08-02 21:00</td>
                            <td class="col999">弘扬总店</td>
                            <td>+3000元</td>
                            <td>会员充值</td>
                            <td>微信</td>
                        </tr>
                    </table>
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
                hong: false,
                inputVisible: false,
                inputValue: ''
            }
        },
        computed:{
            
        },
        methods:{
            handleClose(tag) {
                this.form.tags.splice(this.form.tags.indexOf(tag), 1);
            },
            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.form.tags.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
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
                t.form = res;
                console.log(t.form.ssmd)
            })
           
            
        }
    }
</script>
<style scoped>
    .button-new-tag {
        margin-left: 5px;
        height: 24px;
        line-height: 24px;
        padding-top: 0;
        padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 5px;
    vertical-align: bottom;
  }
</style>
