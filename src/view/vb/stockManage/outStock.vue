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
                <el-table-column prop="signature_name" label="购买人"></el-table-column>
                <el-table-column prop="createTime" label="出库时间"></el-table-column>
                <el-table-column prop="count" label="数量"></el-table-column>
                <el-table-column prop="unit" label="单位"></el-table-column>
				<el-table-column prop="statusName" label="状态"></el-table-column>
				<el-table-column label="操作" width="150" align="center">
				    <template slot-scope="scope">
				       <!-- <el-button size="mini" @click="handle1(scope.$index, scope.row)">查看</el-button>-->
				        <el-button size="mini" v-show="scope.row.status==2"  
							@click="handleOutStock(scope.$index, scope.row)">出库</el-button>
				    </template>
				</el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next"  :page-size='pageSize' :total="total">
                </el-pagination>
            </div>
        </div>

        <!-- 新增 -->
       <!-- <el-dialog :title="idx==-1?'新增':'查看'" :visible.sync="editVisible" width="350px">
            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                <el-form-item label="商品类别" prop="a">
                    <el-select v-model="form.a" placeholder="请选择类型" filterable>
                        <el-option v-for="item in goodsCat" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商品名称" prop="a">
                    <el-input v-model="form.a"></el-input>
                </el-form-item>
                
                <el-form-item label="成本价" prop="a">
                    2元
                </el-form-item>
                <el-form-item label="销售价" prop="a">
                    2元
                </el-form-item>
                <el-form-item label="单位" prop="a">
                    瓶
                </el-form-item>
                <el-form-item label="接收门店" prop="a">
                    <el-select class="" v-model="form.a" placeholder="请选择" filterable >
                        <el-option v-for="(item, index) in shopList" :key="index" :value="item.shopId"  :label="item.shopName"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="出库时间" prop="a">
                    <el-date-picker class=""  v-model="form.a" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="数量" prop="a">
                    <el-input v-model="form.a"></el-input>
                </el-form-item>
                <el-form-item label="配送员" prop="a">
                    <el-input v-model="form.a"></el-input>
                </el-form-item>
                <el-form-item label="配送员电话" prop="a">
                    <el-input v-model="form.a"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit('form')">确 定</el-button>
            </span>
        </el-dialog> -->
		
		<!-- 出库弹窗 -->
		<el-dialog title="填写出库人" :visible.sync="viewIsVisible" width="300px">
			出库人姓名：<el-input v-model="employessName" label="出库人姓名" />
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
	const Form= {
	    id: '',
	    articleId: '',
	    articleName: '',
	    articleType: '',
	    costPrice: '',
	    salesPrice: '',
	    storeId: '',
	    outTime: '',
	    count: '',
	    totalPrice: '',
	    distributorName: '',
	    distributorPhone: '',
	    unit: ''
	}
    export default {
        data() {
            return {
                list: [],
                cur_page: 1,
                select_word: '',
                is_search: false,
					
                idx: -1,
				row:{},
                id: -1,
                editVisible: false,
				viewIsVisible: false,
				employessName:'',
                form: {
                    a: '',
                    b: '',
                    c: ''
                },
                rules: {
                    a: [
                        { required: true, message: '请选择类型', trigger: 'change' },
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
            stockBySotreService
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
            
            // 
            handle1(index, row) {
                if(row){
                    this.idx = index;
                    this.id = row.id;
                    this.form = {
                        a: row.a,
                        b: row.b,
                        c: row.c,
                    }
                }else{
                    this.idx = '-1';
                    this.id = '';
                    this.imageUrl = '';
                    this.form = {
                        a: '',
                        b: '',
                        c: '',
                    }
                }
                
                this.editVisible = true;
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
