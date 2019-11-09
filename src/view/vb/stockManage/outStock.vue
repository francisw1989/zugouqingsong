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
                <el-button type="primary" class="right" @click="handle1">新增</el-button>
                <el-input v-model="select_word" placeholder="订单编号、商品名称、接收员、配送员" class="handle-input"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="search" class="left10">搜索</el-button>
            </div>


            
            <el-table :data="list"  border class="table top20" ref="multipleTable">
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                <el-table-column type="index" label="序号"  width="50" align='center'></el-table-column>
               <!-- <el-table-column prop="a" label="商品编号" sortable width="150"></el-table-column> -->
                <el-table-column prop="articleName" label="商品名称" width="120"></el-table-column>
				<el-table-column prop="articleTypeName" label="分类"></el-table-column>
                <el-table-column prop="costPrice" label="成本价格（元）"></el-table-column>
                <el-table-column prop="salesPrice" label="销售价格（元）"></el-table-column>
				<el-table-column prop="totalPrice" label="销售价格（元）"></el-table-column>
                <el-table-column prop="signatureName" label="购买人"></el-table-column>
                <el-table-column prop="createTime" label="出库时间"></el-table-column>
                <el-table-column prop="count" label="数量"></el-table-column>
                <el-table-column prop="unit" label="单位"></el-table-column>
				<el-table-column prop="statusName" label="状态"></el-table-column>
				<el-table-column prop="remark" label="备注"></el-table-column>
				<el-table-column label="操作" width="150" align="center">
				    <template slot-scope="scope">
				        <el-button size="mini" v-show="scope.row.status==2" type='danger' 
							@click="handleOutStock(scope.$index, scope.row)">出库</el-button>
						<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
				    </template>
				</el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next"  :page-size='pageSize' :total="total">
                </el-pagination>
            </div>
        </div>

        <!-- 新增 -->
        <el-dialog :title="idx==-1?'新增':'查看'" :visible.sync="editVisible" width="350px">
            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                <el-form-item label="物料选择" prop="articleId">
                    <el-select v-model="form.articleId" placeholder="请选择物料" filterable>
                        <el-option v-for="(v,i) in goodsList" :key="v.id" :label="v.articleName" :value="v.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="接收员工" prop="employeeId">
                    <el-select class="" v-model="form.employeeId" placeholder="请选择" filterable >
                        <el-option v-for="(v,i) in employeeList" :key="v.id" :value="v.id"  :label="v.employeeName"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="数量" prop="count">
                    <el-input v-model="form.count"></el-input>
                </el-form-item>
				<el-form-item label="备注" prop="remark">
                    <el-input v-model="form.remark"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit('form')">确 定</el-button>
            </span>
        </el-dialog> 
		
		<!-- 出库弹窗 -->
		<el-dialog title="填写出库人" :visible.sync="viewIsVisible" width="300px">
			出库人姓名：<el-input v-model="employessName" label="出库人姓名" />
		    <span slot="footer" class="dialog-footer">
		        <el-button @click="viewIsVisible = false">取 消</el-button>
		        <el-button type="primary" @click="saveOutEdit()">保存</el-button>
		    </span>
		</el-dialog>	
		
		<!-- 删除提示框 -->
		<el-dialog title="提示" :visible.sync="delVisible" width="300px" left>
		    <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
		    <span slot="footer" class="dialog-footer">
		        <el-button @click="delVisible = false">取 消</el-button>
		        <el-button type="primary" @click="deleteRow()">确 定</el-button>
		    </span>
		</el-dialog>

    </div>
</template>
<script>
    import bus from '../../../bus';
    import {stockBySotreService} from '../../../service/stockByStore';
	import {staffService} from '../../../service/staff';
	import {stockService} from '../../../service/stock';
	const Form= {
	    articleId: '',
	    storeId: window.Store.id,
	    count: '',
		employeeId: '',
		remark:''
	}
    export default {
        data() {
            return {
                list: [],
                cur_page: 1,
                select_word: '',
                is_search: false,
				goodsList:[],
				employeeList:[],
                idx: -1,
				row:{},
                id: -1,
                editVisible: false,
				viewIsVisible: false,
				delVisible:false,
				employessName:'',
                form:JSON.parse(JSON.stringify(Form)),
                rules: {
                   articleId: [
                       { required: true, message: '请选择', trigger: 'change' },
                   ], 
				   employeeId: [
                        { required: true, message: '请选择', trigger: 'change' },
                    ]
                },
                typeList:['全部','商品', '物料'],
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
				const t=this;
                this.is_search = true;
				t.getList();
            },
            
            handle1(index, row) {
				const t = this;
				if(row){
				    // 编辑
				    t.idx = index;
				    t.row = row;
				    t.form = t.row;
				}else{
				     // 新增
				    t.idx = '-1';
				    t.id = '';
				    t.form = JSON.parse(JSON.stringify(Form));
				}
                this.editVisible = true;
            },
			saveEdit(form){
				const t = this;
				this.$refs[form].validate((valid) => {
				    if (valid) {
				        let params = {
						}
				        this.editVisible = false;
				        for(let key in Form){
				            params[key] = t.form[key]
				        }
				        if(t.idx == '-1'){
				            stockBySotreService.storeOutRecordAdd(params).then((res)=>{
				                t.getList();
								t.$message.success("出库成功");
				            })
				        }else{
				        }
				    } else {
				        console.log('error submit!!');
				        return false;
				    }
				});
			},
            handleOutStock(index, row){
                const t = this;
				this.idx = index;
				this.row = row;
				this.viewIsVisible = true;
            },
			saveOutEdit(){
				const t = this;
				if(t.employessName==''){
					t.$message.error('请填写姓名');
					return; 
				}
				t.viewIsVisible = false;
				let params = {
					id: t.row.id,
					employeeName : t.employessName
				}
				stockBySotreService.storeOutRecordArticle(params).then((res)=>{
					t.getList();
					t.$message.success("出库成功");
				})
			},
            getList(){
                const t = this;
				t.list = [];
				let params = {
				    pageSize: t.pageSize,
				    pageNumber: t.pageNumber,
				    articleType: t.type==0?null:t.type,
				    storeId:window.Store.id,
					chose:t.select_word	
				}
                stockBySotreService.getStoreOutRecordList(params).then((res)=>{
					for(const v of res.records){
						 v.articleTypeName = v.articleType == 1 ? '商品' : '物料';
						 v.statusName = v.status == 1 ? '已出库' : '已下单';
					}
                    t.list = res.records;
					t.total = res.total;
                });
            },
			getGoodList(){
			    const t = this;
			    t.goodsList = [];
			    let params = {
			        pageSize: 100,
			        pageNumber: 1,
					articleType:2
			    }
			    stockService.getArticleManagerList(params).then((res)=>{
			        t.goodsList = res.records;
			    })
			},
			getEmployeeList(){
				 const t = this;
				 t.list = [];
				 let params = {
					 pageSize: 100,
					 pageNumber: 1,
					 storesId:window.Store.id
				 }
				staffService.getEmployeesList(params).then((res)=>{
					t.employeeList = res.records;
				})
			},
			handleDelete(index, row) {
			    const t = this;
			    this.idx = index;
			    this.id = row.id;
			    this.row = row;
			    t.delVisible = true;
			},
			// 确定删除
			deleteRow(){
			    const t = this;
			    let parmas = {
			        id: this.id
			    }
			    stockBySotreService.storeOutRecordDelete(parmas).then((res)=>{
			        t.$message.success('删除成功');
			        t.delVisible = false;
			        t.getList();
			    })
			}
        },
        mounted(){
            const t = this;
            t.getList(); 
			t.getGoodList();
			t.getEmployeeList();
        }
    }
</script>
<style scoped>
    
</style>
