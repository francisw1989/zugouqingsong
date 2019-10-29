<template>
	<div class="table">
	     <el-row>
	        <el-col :span="7" >
	            <div style="width: 80px" class="relative clearfix">
	                <img :src="photo" alt="" class="tx1 left">
	                <!-- <div class="ghWap font12">zz</div> -->
	            </div>
	        </el-col>
	        <el-col :span="17" >
	            <p class="font16b top10 ">{{userName}}  <span class="left20 font12 col999">{{sexName}} {{age}}岁</span> </p>
	            <p class="top5">
	                <el-tag type="success" size="small">¥{{money}}</el-tag>
	                <el-tag type="info" size="small" class="left5">VIP-{{vipLevel}}</el-tag>
	                <el-tag type="danger" size="small" class="left5">{{score}}分</el-tag>
	            </p>
	        </el-col>
	    </el-row>
	    <div class="bor_btm_so clearfix" width = "200px">
	        <p class="top10" >服务项目: {{evaluateDetail.itemName}}</p>
	        <p class="top10" >服务时长: {{evaluateDetail.actualOrderTime}}</p>
	        <p class="top10" >服务技师: {{evaluateDetail.employeeName}}</p>
	    </div> 
	    <div class="clearfix">
	        <p class="top15">您有多大可能性向您的朋友推荐足够轻松的服务？</p>
	        <div class="top10">
	           <p class="top10" >{{tag}}</p>
	        </div>
	        <p class="top15">评价标签:</p>
	        <div class="top10">
	          <p class="top10" >{{evaluateLabel}}</p>
	        </div>
	        <p class="top15">建议:</p>
	            <el-input type="textarea" v-model="evaluateDetail.content" readonly = "readonly"></el-input>
	        <p class="top15">回复内容:</p>
	            <el-input v-if="evaluateDetail.replyContent==null" type="textarea" v-model="replyContent" ></el-input>
				<el-input v-else type="textarea" v-model="evaluateDetail.replyContent" readonly = "readonly"></el-input>
	    </div>
	    <span slot="footer" class="dialog-footer">
	        <el-button type="primary" @click="saveEdit()">保 存</el-button>
	    </span>
	</div>
</template>

<script>
	import bus from '../../../bus';
	import {evaluateService} from '../../../service/evaluate';
	
	export default{
		data() {
		    return {
		        evaluateDetail:{},
		        inputVisible: false,
		        sexList:['女','男','未知'],
				tagList:['0','不会','不确定','可能','看情况','会'],
				tag:'',
				replyContent:'',
				sexName:'',
				photo:'',
				userName:'',
				age:'',
				money:'',
				vipLevel:'',
				score:'',
				evaluateLabel:''
		    }
		},
		computed:{
		},
		props: ['row'],
		methods:{
			saveEdit(){
				const t = this;
				if(t.replyContent==''){
					t.$message.error('请填写回复内容');
					return;
				}
				let params = {
					id: t.row.id,
					replyContent : t.replyContent,
					userId:window.userId,
					storeId:window.storeId== undefined ? 0 : window.storeId
				}
				evaluateService.saveReply(params).then((res)=>{
					t.$message.success('回复成功');
					parent.location.reload();
				});
			}
		},
		mounted(){
			const t = this;
			evaluateService.getEvaluateDetail({id:t.row.id}).then((res)=>{
				console.log(res);
				t.evaluateDetail = res;
				t.sexName = t.sexList[res.user.sex];
				t.photo = res.user.photo;
				t.userName = res.user.userName;
				t.age = res.user.age;
				t.vipLevel = res.user.memberLevel;
				t.score = res.user.score;
				t.money = res.user.virtualAccount+res.user.savingsAccount;
				t.tag = t.tagList[res.evaluateScore];
				t.evaluateLabel = res.evaluateLabel==""?'无':res.evaluateLabel;
			})
		}
	}
</script>

<style scoped>
</style>
