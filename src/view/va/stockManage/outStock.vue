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
                <el-radio-group v-model="status">
                    <el-radio-button :label="i"  v-for="(v, i) in typeList" :key="i" >{{v}}</el-radio-button>
                </el-radio-group>
            </div>
            <div class=" clearfix top10">
                <el-button type="primary" class="right" @click="handleEdit">新增</el-button>
                <el-input v-model="chose" placeholder="商品名称、接收员、配送员" class="handle-input"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="search" class="left10">搜索</el-button>
                <span class="left10 font12 colblue pointer" @click="moreSeach">更多筛选条件  <i class="el-icon-caret-bottom"></i></span>

            </div>
            <div v-if='showMore' class="top10">
                <span class="">接收门店</span>
                <el-select class="left10" v-model="storeId" placeholder="请选择" filterable  clearable>
                    <el-option v-for="(v, i) in storeList" :key="v.id" :value="v.id"  :label="v.name"></el-option>
                </el-select>
                <el-checkbox v-model="checked1" class="left40">商品</el-checkbox>
                <el-checkbox v-model="checked2">物料</el-checkbox>
                <div class="top10">
                    <span class="">出库开始时间</span>
                    <el-date-picker class="left10" style="width: 140px" v-model="outStartTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" ></el-date-picker>
                    <span class="left20">出库结束时间</span>
                    <el-date-picker class="left10" style="width: 140px" v-model="outEndTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" ></el-date-picker>
                    <span class="left20">接收开始时间</span>
                    <el-date-picker class="left10" style="width: 140px" v-model="inStartTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" ></el-date-picker>
                    <span class="left20">接收结束时间</span>
                    <el-date-picker class="left10" style="width: 140px" v-model="inEndTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" ></el-date-picker>
                </div>
                <!--<div class="top10">
                    <span class="">是否拼团</span>
                    <el-switch v-model="isPintuan" class="left10"></el-switch>
                    <span class="left20">是否用券</span>
                    <el-switch v-model="isQuan" class="left10"></el-switch>
                </div>-->
            </div>

            
            <el-table :data="list"  border class="table top20" ref="multipleTable">
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                <el-table-column type="index" label="序号"  width="50" align='center'></el-table-column>
                <!--<el-table-column prop="a" label="商品编号" sortable width="150"></el-table-column>-->
                <el-table-column prop="articleName" label="商品名称" width="120"></el-table-column>
                <el-table-column prop="articleTypeName" label="商品类别"></el-table-column>
                <el-table-column prop="outTime" label="出库时间"></el-table-column>
                <el-table-column prop="distributorName" label="配送员"></el-table-column>
                <el-table-column prop="storeName" label="接收门店"></el-table-column>
                <el-table-column prop="signatureTime" label="接收时间"></el-table-column>
                <el-table-column prop="signatureName" label="接收员"></el-table-column>
                <el-table-column prop="costPrice" label="单价（元）"></el-table-column>
                <el-table-column prop="count" label="数量"></el-table-column>
                <el-table-column prop="totalPrice" label="总价（元）"></el-table-column>
                <el-table-column prop="statusName" label="状态"></el-table-column>
                <el-table-column label="操作" width="150" align="center">
                    <template slot-scope="scope">
                       <!-- <el-button size="mini" @click="handle1(scope.$index, scope.row)">查看</el-button>-->
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
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
                    <el-select v-model="form.articleType"  @change='articleTypeChange'  placeholder="请选择" filterable>
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
                <el-form-item label="销售价" prop="salesPrice">
                    <el-input v-model="form.salesPrice" disabled></el-input>
                </el-form-item>
                <el-form-item label="单位" prop="unit">
                    <el-input v-model="form.unit" disabled></el-input>
                </el-form-item>
                <el-form-item label="接收门店" prop="storeId">
                    <el-select class="" v-model="form.storeId" placeholder="请选择" filterable >
                        <el-option v-for="(v, i) in storeList" :key="v.id" :value="v.id"  :label="v.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="出库时间" prop="outTime">
                    <el-date-picker class=""  v-model="form.outTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" ></el-date-picker>
                </el-form-item>
                <el-form-item label="数量" prop="count">
                    <el-input v-model="form.count"></el-input>
                </el-form-item>
                <el-form-item label="总计" prop="totalPrice">
                    <el-input v-model="form.costPrice*form.count"></el-input>
                </el-form-item>
                <el-form-item label="配送员" prop="distributorName">
                    <el-input v-model="form.distributorName"></el-input>
                </el-form-item>
                <el-form-item label="配送员电话" prop="distributorPhone">
                    <el-input v-model="form.distributorPhone"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit('form')">确 定</el-button>
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
    import {stockService} from '../../../service/stock';
    import {storeService} from '../../../service/store';
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
                status: '0',
                typeList: ['所有订单','已出库','已签收'],
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
                        { required: true, message: '请选择', trigger: 'change' },
                    ],
                    articleId: [
                        { required: true, message: '请选择', trigger: 'change' },
                    ],
                    storeId: [
                        { required: true, message: '请选择', trigger: 'change' },
                    ],
                    outTime: [
                        { required: true, message: '请选择', trigger: 'blur' },
                    ],
                    count: [
                        { required: true, message: '请输入', trigger: 'blur' },
                    ],
                    distributorName: [
                        { required: true, message: '请输入', trigger: 'blur' },
                    ],
                    distributorPhone: [
                        { required: true, message: '请输入', trigger: 'blur' },
                    ]
                },
                imageUrl: '',
                goodsCat:[],
                showMore: false,
                delVisible: false,
                getArticleManagerList: [],
                storeList: [],
                checked1: false,
                checked2: false,
                inStartTime: '',
                inEndTime: '',
                outStartTime: '',
                outEndTime: '',
                storeId: '',
                total: 0,
                pageSize: 10,
                pageNumber: 1
            }
        },
        components:{
            
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
                t.form.salesPrice = t.getArticleManagerList.filter((item)=>{
                    return item.id == val
                })[0].salesPrice;
 
            },
            moreSeach(){
                const t = this;
                if(t.showMore){
                    t.showMore = false
                }else{
                    t.showMore = true
                }
            },
            articleTypeChange(val){
                const t = this;
                t.form.articleId='';
                t.form.costPrice='';
                t.form.salesPrice='';
                t.form.unit='';
                t.articleManagerList();
            },

            handleCurrentChange(val) {
                this.cur_page = val;
                this.getPlatformOutRecordList();
            },
            search() {
                //this.is_search = true;
                const t = this;
                t.getPlatformOutRecordList();
            },
            handleEdit(index, row){
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
                        if(t.idx == '-1'){
                            stockService.platformOutRecordAdd(params).then((res)=>{
                                t.getPlatformOutRecordList()
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
                stockService.platformOutRecordDelete(parmas).then((res)=>{
                    this.$message.success('删除成功');
                    this.delVisible = false;
                    t.getPlatformOutRecordList();
                })
            },
            getPlatformOutRecordList(){
                const t = this;
                t.list = [];
                let params = {
                    pageSize: t.pageSize,
                    pageNumber: t.pageNumber,
                    chose: t.chose,
                    storeId: t.storeId,
                    outStartTime: t.outStartTime,
                    outEndTime: t.outEndTime,
                    inStartTime: t.inStartTime,
                    inEndTime: t.inEndTime,
                    status: t.status==0?null:t.status
                }
                if(t.checked1 && !t.checked2){
                    params.articleType =1
                }else if(!t.checked1 && t.checked2){
                    params.articleType =2
                }
                stockService.getPlatformOutRecordList(params).then((res)=>{
                    for(const v of res.records){
                        v.articleTypeName = v.articleType == 1 ? '商品' : '物料';
                        v.statusName=v.status==1?'已出库':'已签收';
                    }
                    t.list = res.records;
                    t.total = res.total
                })
            },
            articleManagerList(){
                const t = this;
                let params = {
                    pageSize: 50,
                    pageNumber: 1,
                    articleType: t.form.articleType
                }
                stockService.getArticleManagerList(params).then((res)=>{
                    t.getArticleManagerList = res.records;
                })
            },
            getStoreList(){
                const t = this;
                t.list = [];
                let params = {
                    pageSize: 50,
                    pageNumber: 1
                }
                storeService.list(params).then((res)=>{
                    t.storeList = res.records;
                })
            }
        },
        watch:{
            status(val){
                this.getPlatformOutRecordList();
            },
            storeId(val){
                this.getPlatformOutRecordList();
            },
            checked1(val){
                this.getPlatformOutRecordList();
            },
            checked2(){
                this.getPlatformOutRecordList();
            },
            inStartTime(val){
                this.getPlatformOutRecordList();
            },
            inEndTime(val){
                this.getPlatformOutRecordList();
            },
            outStartTime(val){
                this.getPlatformOutRecordList();
            },
            outEndTime(val){
                this.getPlatformOutRecordList();
            }
        },
        mounted(){
            const t = this;
            // 出库列表
            t.getPlatformOutRecordList();
            t.goodsCat = t.$GD.goodsCat;
             t.articleManagerList();
             t.getStoreList();
        }
    }
</script>
<style scoped>
    
</style>
