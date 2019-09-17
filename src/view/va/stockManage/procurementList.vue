<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item> {{this.$route.meta.title}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class=" clearfix top10">
                <el-button type="primary" class="right" @click="handleEdit">新增</el-button>
                <el-input v-model="chose" placeholder="商品名称、接收员、采购员" class="handle-input"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="search" class="left10">搜索</el-button>
            </div>


            
            <el-table :data="list"  border class="table top20" ref="multipleTable">
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
               <el-table-column type="index" label="序号"  width="50" align='center'></el-table-column>
              <!--  <el-table-column prop="articleId" label="编号" sortable width="150"></el-table-column>-->
                <el-table-column prop="articleName" label="商品名称" width="120"></el-table-column>
                <el-table-column prop="articleTypeName" label="商品类别"></el-table-column>
                <el-table-column prop="supplierName" label="供货商"></el-table-column>
                <el-table-column prop="inTime" label="采购时间"></el-table-column>
                <el-table-column prop="signatureName" label="采购员"></el-table-column>
                <el-table-column prop="inTime" label="接收时间"></el-table-column>
                <el-table-column prop="signatureName" label="收货员"></el-table-column>
                <el-table-column prop="costPrice" label="成本单价（元）"></el-table-column>
                <el-table-column prop="count" label="数量"></el-table-column>
                <el-table-column prop="totalPrice" label="总计"></el-table-column>
             <!--   <el-table-column label="操作" width="150" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleDetail(scope.$index, scope.row)">查看</el-button>
                    </template>
                </el-table-column>-->
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :page-size='pageSize' :total="total">
                </el-pagination>
            </div>
        </div>

        <!-- 新增 -->
        <el-dialog :title="idx==-1?'新增':'查看'" :visible.sync="editVisible" width="350px">
            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                <el-form-item label="商品类别" prop="articleType">
                    <el-select v-model="form.articleType" @change='articleTypeChange' placeholder="请选择" filterable>
                        <el-option v-for="(v,i) in goodsCat" :key="i+1" :label="v" :value="i+1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商品名称" prop="articleId">
                    <el-select v-model="form.articleId" @change='articleManagerListChange' placeholder="请选择" filterable>
                            <el-option v-for="(v, i) in getArticleManagerList" :key='v.id' :label="v.articleName"  :value="v.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="成本价" prop="costPrice">
                    <el-input v-model="form.costPrice" disabled></el-input>
                </el-form-item>
                <el-form-item label="单位" prop="unit">
                    <el-input v-model="form.unit" disabled></el-input>
                </el-form-item>
                <el-form-item label="进货时间" prop="inTime">
                    <el-date-picker v-model="form.inTime" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="数量" prop="count">
                    <el-input v-model="form.count"></el-input>
                </el-form-item>
                <el-form-item label="采购员" prop="signatureName">
                    <el-input v-model="form.signatureName"></el-input>
                </el-form-item>
                <el-form-item label="供应商名称" prop="supplierName">
                    <el-input v-model="form.supplierName"></el-input>
                </el-form-item>
                  <el-form-item label="供应商电话" prop="supplierPhone">
                    <el-input v-model="form.supplierPhone"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit('form')">确 定</el-button>
            </span>
        </el-dialog>



    </div>
</template>
<script>
    import bus from '../../../bus';
    import {stockService} from '../../../service/stock';
    const Form= {
        id: '',
        articleId: '',
        articleName: '',
        articleType: '',
        costPrice: '',
        salesPrice: '',
        inTime: '',
        count: '',
        signatureName: '',
        supplierName: '',
        supplierPhone: '',
        unit: ''
    }
    export default {
        data() {
            return {
                list: [],
                cur_page: 1,
                chose: '',
                is_search: false,
                idx: -1,
                id: -1,
                editVisible: false,
                form: JSON.parse(JSON.stringify(Form)),
                rules: {
                    articleType: [
                        { required: true, message: '请选择', trigger: 'blur' },
                    ],
                    articleId: [
                        { required: true, message: '请选择', trigger: 'blur' },
                    ],
                    inTime: [
                        { required: true, message: '请选择', trigger: 'blur' },
                    ],
                    count: [
                        { required: true, message: '请输入', trigger: 'blur' },
                    ],
                    signatureName: [
                        { required: true, message: '请输入', trigger: 'blur' },
                    ]
                },
                imageUrl: '',
                goodsCat:[],
                getArticleManagerList: [],
                total: 0,
                pageSize: 10,
                pageNumber: 1
            }
        },
        components:{
            stockService
        },
        methods:{
            articleManagerListChange(val){
                const t = this;
                t.form.costPrice = t.getArticleManagerList.filter((item)=>{
                    return item.id == val
                })[0].costPrice;
                t.form.unit = t.getArticleManagerList.filter((item)=>{
                    return item.id == val
                })[0].unit;
                 console.log(t.form.costPrice)
                console.log(t.form.unit)
            },
            articleTypeChange(val){
                const t = this;
                t.form.articleId='';
                t.form.costPrice='';
                t.form.unit='';
                t.articleManagerList();
            },
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getPlatformInRecordList();
            },
            search() {
                //this.is_search = true;
                const t = this;
                t.getPlatformInRecordList();
            },
             // 物料采购
            handleEdit(index, row) {
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
            // 保存编辑
            saveEdit(form) {
                 const t = this;
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        let params = {};
                        this.editVisible = false;
                        for(let key in Form){
                            params[key] = t.form[key]
                        }
                        console.log(params);
                        if(t.idx == '-1'){
                            stockService.platformInRecordAdd(params).then((res)=>{
                                t.getPlatformInRecordList()
                            })
                        }else{
                            // orderService.itemClassEdit(params).then((res)=>{
                            //     t.getItemClassList()
                            // })
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            getPlatformInRecordList(){
                const t = this;
                t.list = [];
                let params = {
                    pageSize: t.pageSize,
                    pageNumber: t.pageNumber,
                    chose: t.chose
                }
                stockService.getPlatformInRecordList(params).then((res)=>{
                    for(const v of res.records){
                        v.articleTypeName = v.articleType == 1 ? '商品' : '物料';
                    }
                    t.list = res.records;
                    t.total = res.total
                })
            },
            articleManagerList(){
                const t = this;
                let params = {
                    pageSize: 20,
                    pageNumber: 1,
                    articleType: t.form.articleType
                }
                stockService.getArticleManagerList(params).then((res)=>{
                    t.getArticleManagerList = res.records;
                })
            }
            
        },
        mounted(){
            const t = this;
            t.getPlatformInRecordList();
            t.goodsCat = t.$GD.goodsCat;
            t.articleManagerList();
        }
    }
</script>
<style scoped>
    
</style>
