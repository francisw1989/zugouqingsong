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
                <el-input v-model="chose" placeholder="请输入商品编号或名称" class="handle-input"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="search" class="left10">搜索</el-button>
                <el-checkbox v-model="checked1" class="left40">商品</el-checkbox>
                <el-checkbox v-model="checked2">物料</el-checkbox>
            </div>


            
            <el-table :data="list"  border class="table top20" ref="multipleTable">
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                <el-table-column type="index" label="序号"  width="50" align='center'></el-table-column>
                <!--<el-table-column prop="a" label="商品编号" width="150"></el-table-column>-->
                <el-table-column prop="articleName" label="商品名称" width="120"></el-table-column>
                <el-table-column prop="articleTypeName" label="商品类别"></el-table-column>
                <el-table-column prop="costPrice" label="成本价格（元）"></el-table-column>
                <el-table-column prop="salesPrice" label="销售价格（元）"></el-table-column>
                <el-table-column prop="count" label="数量"></el-table-column>
                <el-table-column prop="unit" label="单位"></el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next"  :page-size='pageSize' :total="total">
                </el-pagination>
            </div>
        </div>
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
                multipleSelection: [],
                select_cate: '',
                chose: '',
                is_search: false,
                idx: -1,
                id: -1,
                editVisible: false,
                checked1: false,
                checked2: false,
                imageUrl: '',
                goodsCat:[],
                total: 0,
                pageSize: 10,
                pageNumber: 1
            }
        },
        components:{
            stockBySotreService
        },
        methods:{
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getStoreArticleStockList();
            },
            search() {
                //this.is_search = true;
                const t=this;
                t.getStoreArticleStockList();
            },
            getStoreArticleStockList(){
                const t = this;
                t.list = [];
                let params = {
                    pageSize: t.pageSize,
                    pageNumber: t.pageNumber,
                    chose: t.chose,
                    storeId:window.Store.id
                }
                if(t.checked1 && !t.checked2){
                    params.articleType =1
                }else if(!t.checked1 && t.checked2){
                    params.articleType =2
                }
                stockBySotreService.getStoreArticleStockList(params).then((res)=>{
                    for(const v of res.records){
                        v.articleTypeName = v.articleType == 1 ? '商品' : '物料';
                    }
                    t.list = res.records;
                    t.total = res.total
                })
            }
        },
        watch:{
            checked1(val){
                this.getStoreArticleStockList();
            },
            checked2(){
                this.getStoreArticleStockList();
            }

        },
        mounted(){
            const t = this;
            t.getStoreArticleStockList();
            t.goodsCat = t.$GD.goodsCat;

        }
    }
</script>
<style scoped>
    
</style>
