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
                <el-input v-model="orderId" placeholder="订单编号" class="handle-input"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="search" class="left10">搜索</el-button>
                <span class="left10 font12 colblue pointer" @click="moreSeach">更多筛选条件  <i class="el-icon-caret-bottom"></i></span>
            </div>
            <div v-if='showMore' class="top10">
                <span class="">项目分类</span>
                <el-select class="left10"  clearable v-model="itemClassId" placeholder="请选择项目分类" filterable>
                    <el-option v-for="(v, i) in itemClassList" :key='v.id' :label="v.itemClassName"  :value="v.id"></el-option>
                </el-select>
                <span class="left20">开始时间</span>
                <el-date-picker class="left10" style="width: 150px" value-format="yyyy-MM-dd" v-model="startTime" type="date" placeholder="选择日期"></el-date-picker>
                <span class="left20">结束时间</span>
                <el-date-picker class="left10" style="width: 150px" value-format="yyyy-MM-dd" v-model="endTime" type="date" placeholder="选择日期"></el-date-picker>
                <!-- <el-radio-group v-model="neirong" class="left20" @change='radioChange'> 
                    <el-radio label="0">全部</el-radio>
                    <el-radio label="1">有评价的内容</el-radio>
                </el-radio-group> -->
            </div>
            <el-table :data="list"  border class="table top20" ref="multipleTable">
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                <el-table-column type="index" label="序号"  width="50" align='center'></el-table-column>
                <el-table-column prop="actualOrderTime" label="服务时间" width="150"></el-table-column>
                <el-table-column prop="user.userName" label="客户名称" width="120"></el-table-column>
                <el-table-column prop="evaluateScore" label="评分"></el-table-column>
                <el-table-column prop="employeeName" label="服务技师"></el-table-column>
                <el-table-column prop="evaluateLabel" label="评价标签"></el-table-column>
                <el-table-column prop="content" label="评价内容"></el-table-column>
                <el-table-column prop="itemName" label="项目名称"></el-table-column>
                <el-table-column prop="actualOrderPrice" label="实际消费(元)"></el-table-column>
                 <el-table-column label="操作" width="80" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" type="success" @click="handle1(scope.$index, scope.row)">回复</el-button>
                    </template>
                </el-table-column> 
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next"  :page-size='pageSize' :total="total">
                </el-pagination>
            </div>
        </div>
        <!-- 详情 -->
       <!-- <el-dialog title="回复用户评价"  :visible.sync="viewVisible" width="400px">
             <el-row>
                <el-col :span="7">
                    <div style="width: 80px" class="relative clearfix">
                        <img src="../../../assets/img/img.jpg" alt="" class="tx1 left">
                        <div class="ghWap font12">{{evaluateDetail.user.memberNum}}</div>
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
            <div class="bor_btm_so clearfix" style="padding-bottom: 20px;">
                <p class="top10" >服务项目: 颈椎放松</p>
                <p class="top10" >服务时间: 2019-09-09</p>
                <p class="top10" >服务技师: 2019-09-09</p>
            </div> 
            <div class="clearfix">
                <p class="top15">您有多大可能性向您的朋友推荐足够轻松的服务？</p>
                <div class="top10">
                    <el-checkbox v-model="form.tuijian">会</el-checkbox>
                </div>
                <p class="top15">服务标签</p>
                <div class="top10">
                    <el-checkbox-group v-model="form.checkList">
                        <el-checkbox v-for="(v, i) in tags" :key="i" :label="v"></el-checkbox>
                    </el-checkbox-group>
                </div>
                <p class="top15">建议</p>
                <div class="top10">
                    <el-input type="textarea" v-model="form.a"></el-input>
                </div>
                <p class="top15">回复内容:</p>
                <div class="top10">
                    <el-input type="textarea" v-model="replyContent"></el-input>
                </div>
                
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="viewVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit()">确 定</el-button>
            </span>
        </el-dialog> -->

		<el-dialog title="评价详情" :visible.sync="viewVisible" width="400px">
		    <EvaluateDetail :row="row" v-if="viewVisible"></EvaluateDetail>
		</el-dialog>


    </div>
</template>
<script>
    import bus from '../../../bus';
    import {evaluateService} from '../../../service/evaluate';
    import {orderService} from '../../../service/order';
	import EvaluateDetail from './evaluateDetail';
    export default {
        data() {
            return {
                list: [],
				replyContent:'',
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                is_search: false,
                idx: -1,
                id: -1,
                startData: '',
                endData: '',
				row:{},
                hdType: '',
                hdTypeList: [],
                showMore: false,
                xmfl: '',
                xmflList: [],
                neirong: '0',
                viewVisible: false,
                tags: ['环境好','技术好','服务好'],
                total: 0,
                pageSize: 10,
                pageNumber: 1,
                orderId: '',
                startTime: '',
                endTime: '',
                itemClassId: '',
                itemClassList: []
            }
        },
        components:{
			EvaluateDetail
        },
        methods:{
            radioChange(){
                const t = this;
                console.log(t.neirong)
            },
            moreSeach(){
                const t = this;
                if(t.showMore){
                    t.showMore = false
                }else{
                    t.showMore = true
                }
            },
            handleCurrentChange(val) {
                this.pageNumber = val;
                this.getlist();
            },
            search() {
                const t = this;
                t.getlist();
            },
            // 评价详情
            handle1(index, row) {
				//const t = this;
                this.idx = index;
                this.row = row;
                this.viewVisible = true;
            },
           /* saveEdit(){
                const t = this;
				if(t.replyName==''){
					t.$message.error('请填写回复内容');
					return;
				}
				t.viewVisible = false;
				let params = {
					id: t.row.id,
					replyContent : t.replyContent,
					userId:window.userId,
					storeId:window.storeId== undefined ? 0 : window.storeId
				}
				evaluateService.saveReply(params).then((res)=>{
					t.getlist();
					t.$message.success('回复成功');
				});
            }, */
            getlist(){
                const t = this;
                let params = {
                    orderId: t.orderId,
                    startTime: t.startTime,
                    endTime: t.endTime,
                    itemClassId: t.itemClassId,
                    pageSize: t.pageSize,
                    pageNumber: t.pageNumber,
					storeId:window.Store.id
                }
                evaluateService.list(params).then((res)=>{
					t.list = res.records;
                    for(const v of t.list){
                        v.actualOrderPrice = v.actualOrderPrice/100;
						v.evaluateLabel = v.evaluateLabel==""?'/':v.evaluateLabel;
						v.content = v.content==""?'/':v.content;
                    }
                    t.total = res.total
                });
            }
        },
        watch:{
            startTime(){
                const t = this;
                t.getlist()
            },
            endTime(){
                const t = this;
                t.getlist()
            },
            itemClassId(){
                const t = this;
                t.getlist()
            }
        },
        mounted(){
           const t = this;
           t.getlist();
           orderService.getItemClassList().then((res)=>{
               t.itemClassList = res.records;
           })
        //    t.xmflList = t.$GD.xmflList;
        }
    }
</script>
<style scoped>
    
</style>
