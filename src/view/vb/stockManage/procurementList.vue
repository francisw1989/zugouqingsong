<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item> {{this.$route.meta.title}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div>
                <el-radio-group v-model="type"  @change='typeChange'>
                    <el-radio-button :label="i"  v-for="(v, i) in typeList" :key="i" >{{v}}</el-radio-button>
                </el-radio-group>
            </div>
            <div class=" clearfix top10">
                <el-input v-model="select_word" placeholder="订单编号、商品名称、接收员、采购员" class="handle-input"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="search" class="left10">搜索</el-button>
            </div>


            
            <el-table :data="list"  border class="table top20" ref="multipleTable">
                <el-table-column type="index" label="序号"  width="50" align='center'></el-table-column> 
                <!--<el-table-column prop="index" label="编号" width="50" align='center'></el-table-column> -->
                <el-table-column prop="articleName" label="物品名称" width="120"></el-table-column>
                <el-table-column prop="articleTypeName" label="分类"></el-table-column>
                <el-table-column prop="createTime" label="采购时间"></el-table-column>
                <el-table-column prop="distributorName" label="配送员"></el-table-column>
                <el-table-column prop="distributorPhone" label="配送员手机号"></el-table-column>
                <el-table-column prop="inTime" label="接收时间"></el-table-column>
                <el-table-column prop="signatureName" label="接收员"></el-table-column>
                <el-table-column prop="costPrice" label="成本价"></el-table-column>
                <el-table-column prop="count" label="数量"></el-table-column>
                <el-table-column prop="totalPrice" label="成本总价"></el-table-column>
                <el-table-column prop="statusName" label="状态"></el-table-column>
                <el-table-column label="操作" width="150" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" v-if="scope.row.status==1" @click="handle1(scope.$index, scope.row)" type="danger">签收</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next"  :page-size='pageSize' :total="total">
                </el-pagination>
            </div>
        </div>
		<!-- 签收弹窗 -->
		<el-dialog title="填写签收人" :visible.sync="viewIsVisible" width="300px">
			签收人姓名：<el-input v-model="employessName" label="签收人姓名" />
		    <span slot="footer" class="dialog-footer">
		        <el-button @click="viewIsVisible = false">取 消</el-button>
		        <el-button type="primary" @click="saveOutEdit()">保存</el-button>
		    </span>
		</el-dialog>	
    </div>
</template>
<script>
    import bus from '../../../bus';
    import {stockBySotreService} from '../../../service/stockByStore';
    export default {
        data() {
            return {
                list: [],
                cur_page: 1,
				viewIsVisible: false,
                select_word: '',
				employessName:'',
				idx: -1,
				id:-1,
				row:{},
                is_search: false,
                typeList:['所有采购记录', '配送中', '已采购'],
                type: '0',
				total: 0,
				pageSize: 10,
				pageNumber: 1
            }
        },
        components:{
        },
        methods:{
            typeChange(e){
                const t = this;
                t.type = e;
				t.getList();
            },
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getList();
            },
            search() {
                this.is_search = true;
				t.getList();
            },
            handle1(index,row){
				const t = this;
				t.idx = index;
				t.row = row;
				t.viewIsVisible = true
			},
			saveOutEdit(){
				const t = this;
				if(t.employessName==''){
					t.$message.error('请填写姓名');
					return; 
				}
				t.viewIsVisible = false;
				let params={
					id:t.row.id,
					status:2,
					signatureName: t.employessName
				}
				stockBySotreService.storeInRecordEdit(params).then((res)=>{
					t.getList();
					t.$message.success('签收成功');
				})
			},
            getList(){
                const t = this;
				t.list = [];
				let params = {
				    pageSize: t.pageSize,
				    pageNumber: t.pageNumber,
				    status: t.type==0?null:t.type,
				    storeId:window.Store.id,
					chose:t.select_word
				}
                stockBySotreService.getStoreInRecordList(params).then((res)=>{
					for(const v of res.records){
					    v.articleTypeName = v.articleType == 1 ? '商品' : '物料';
						v.statusName = v.status == 1 ? '配送中' : '已采购';
					}
                    t.list = res.records;
					t.total = res.total;
                });
            }
        },
        mounted(){
			const t = this;
			t.getList();    
        }
    }
</script>
<style scoped>
    
</style>
