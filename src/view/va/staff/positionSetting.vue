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
                <el-button type="primary" icon="el-icon-circle-plus-outline" class="handle-del right" @click="edit">新增</el-button>
                <el-input v-model="select_word" placeholder="请输入员工姓名,手机号" class="handle-input"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="search" class="left10">搜索</el-button>
            </div>



            
            <el-table :data="list"  border class="table top20" ref="multipleTable" @selection-change="handleSelectionChange">
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                <el-table-column type="index" label="编号"  width="50" align='center'></el-table-column>
                <el-table-column prop="a" label="岗位名称" sortable width=""></el-table-column>
                <el-table-column prop="b" label="等级" width=""></el-table-column>
                <el-table-column label="操作" width="100px" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="edit(scope.$index, scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                </el-pagination>
            </div>
        </div>

        <!-- 新增 -->
       <el-dialog :title="idx==-1?'新增':'编辑'" :visible.sync="editVisible" width="600px">
            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                <el-form-item label="岗位名称">
                    <el-input v-model="form.a" placeholder="" style="width: 80%;"></el-input>
                </el-form-item>
                <el-form-item label="此岗位级别" class="clearfix">
                    <div v-for="(gwItem, i) in form.gwjbList" :key="i">
                        <el-input v-model="form.a" placeholder="" style="width: 80px;" ></el-input>
                        <span class="left10">单价系数</span>
                        <el-input v-model="form.a" placeholder="" style="width: 80px;" class="left5"></el-input>
                        <span class="left10">佣金系数</span>
                        <el-input v-model="form.a" placeholder="" style="width: 80px;" class="left5"></el-input>
                        <i class="el-icon-circle-plus-outline left10 pointer" @click="mdAdd"></i>
                        <i class="el-icon-remove-outline left5 pointer" v-if='i>0' @click="mdRemove(i)"></i>

                    </div>
                    
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
    import {staffService} from '../../../service/staff';
    import {orderService} from '../../../service/order';

    export default {
        data() {
            return {
                list: [],
                cur_page: 1,
                multipleSelection: [],
                select_word: '',
                del_list: [],
                is_search: false,
                
                form: {
                    a: '',
                    b: '',
                    c: '',
                    gwjbList: [
                        {a: '一级', b: '1', c: '1.1'},
                        {a: '一级', b: '1', c: '1.1'},
                        {a: '一级', b: '1', c: '1.1'}
                    ],
                    
                },
                jbList:[],
                xsList: [],
                rules: {
                    a: [
                        { required: true, message: '请选择类型', trigger: 'change' },
                    ]
                },
                idx: -1,
                id: -1,
                viewVisible: false,
                editVisible: false
            }
        },
        components:{
            
        },
        methods:{
            mdAdd(){
                const t = this;
                if(t.form.gwjbList.length>3){
                    t.$message({
                        message: '最多四条',
                        type: 'warning'
                    });
                    return
                }
                t.form.gwjbList.push({});

            },
            mdRemove(i){
                const t = this;
                t.form.gwjbList.splice(i, 1)
            },
            // 保存编辑
            saveEdit(form) {
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        this.editVisible = false;
                        this.$message.success(`修改第 ${this.idx+1} 行成功`);
                        if(this.list[this.idx].id === this.id){
                            this.$set(this.list, this.idx, this.form);
                        }else{
                            for(let i = 0; i < this.list.length; i++){
                                if(this.list[i].id === this.id){
                                    this.$set(this.list, i, this.form);
                                    return ;
                                }
                            }
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
                
            },

            edit(index, row){
                if(row){
                    this.idx = index;
                    this.id = row.id;
                    this.form = {
                        a: row.a,
                        b: row.b,
                        c: row.c,
                        gwjbList: [
                            {a: '一级', b: '1', c: '1.1'},
                            {a: '一级', b: '1', c: '1.1'},
                            {a: '一级', b: '1', c: '1.1'}
                        ],
                    }
                }else{
                    this.idx = '-1';
                    this.id = '';
                    this.form = {
                        a: '',
                        b: '',
                        c: '',
                        gwjbList: [
                            {a: '一级', b: '1', c: '1.1'},
                            {a: '一级', b: '1', c: '1.1'},
                            {a: '一级', b: '1', c: '1.1'}
                        ],
                    }
                }
                this.editVisible = true;
            },

            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            search() {
                this.is_search = true;
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 员工详情
            handle1(index, row) {
                this.idx = index;
                this.id = row.id;
                this.viewVisible = true;
            },
        },
        mounted(){
            const t = this;

            // 岗位列表
            staffService.getGwList().then((res)=>{
                t.list = res;
            });
            t.$commonService.getJbList().then((res)=>{
                t.jbList = res
            })
            t.$commonService.getXsList().then((res)=>{
                t.xsList = res
            })
            


        }
    }
</script>
<style scoped>
    
</style>
