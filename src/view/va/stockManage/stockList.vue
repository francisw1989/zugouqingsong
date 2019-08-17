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
                <el-input v-model="select_word" placeholder="请输入员工姓名,手机号" class="handle-input"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="search" class="left10">搜索</el-button>
                <el-checkbox v-model="checked1" class="left40">只显示黑名单</el-checkbox>
                <el-checkbox v-model="checked2">只显示红名单</el-checkbox>
            </div>


            
            <el-table :data="list"  border class="table top20" ref="multipleTable">
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                <!-- <el-table-column type="index" label="序号"  width="50" align='center'></el-table-column> -->
                <el-table-column prop="a" label="会员编号" sortable width="150"></el-table-column>
                <el-table-column prop="b" label="姓名" width="120"></el-table-column>
                <el-table-column prop="c" label="手机号"></el-table-column>
                <el-table-column prop="c" label="会员级别"></el-table-column>
                <el-table-column prop="c" label="虚拟账户"></el-table-column>
                <el-table-column prop="c" label="储值账户"></el-table-column>
                <el-table-column prop="c" label="黑名单"></el-table-column>
                <el-table-column prop="c" label="红名单"></el-table-column>
                <el-table-column prop="c" label="标签"></el-table-column>
                <el-table-column label="操作" width="150" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handle1(scope.$index, scope.row)">查看</el-button>
                        <el-button size="mini" type="danger" @click="handle2(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                </el-pagination>
            </div>
        </div>

        <!-- 详情 -->
        <el-dialog title="详情" :visible.sync="viewVisible" width="850px">
            
        </el-dialog>



    </div>
</template>
<script>
    import bus from '../../../bus';
    import {stockService} from '../../../service/stock';
    export default {
        data() {
            return {
                list: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                is_search: false,

                idx: -1,
                id: -1,
                viewVisible: false,
                checked1: false,
                checked2: false
            }
        },
        components:{
            
        },
        methods:{


            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            search() {
                this.is_search = true;
            },

            // 员工详情
            handle1(index, row) {
                this.idx = index;
                this.id = row.id;
                this.viewVisible = true;
            },
            handle2(index, row){
                
            }
        },
        mounted(){
            const t = this;
            // 员工列表
            stockService.getStockList().then((res)=>{
                t.list = res;
            });
            

        }
    }
</script>
<style scoped>
    
</style>
