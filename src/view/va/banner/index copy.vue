<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item> {{this.$route.meta.title}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
                <el-select v-model="select_cate" placeholder="筛选省份" class="handle-select left10">
                    <el-option key="1" label="广东省" value="广东省"></el-option>
                    <el-option key="2" label="湖南省" value="湖南省"></el-option>
                </el-select>
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input left10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="search" class="left10">搜索</el-button>
            </div>
            <el-table :data="list"  border class="table top10" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="a" label="banner大图" sortable width="150">
                </el-table-column>
                <el-table-column prop="b" label="类型" width="120">
                </el-table-column>
                <el-table-column prop="c" label="状态">
                </el-table-column>
                <el-table-column prop="c" label="创建时间">
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">发布</el-button>
                        <el-button type="text" icon="el-icon-delete" class="colred" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="50px">
                <el-form-item label="日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.c" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="form.a"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.b"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" left>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import bus from '../../../bus';
    export default {
        data() {
            return {
                list: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                editVisible: false,
                delVisible: false,
                form: {
                    a: '',
                    b: '',
                    c: ''
                },
                idx: -1,
                id: -1
            }
        },
        computed:{
            
        },
        methods:{
            delAll() {
                const length = this.multipleSelection.length;
                let str = '';
                this.del_list = this.del_list.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].a + ' ';
                }
                this.$message.error('删除了' + str);
                this.multipleSelection = [];
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
            handleEdit(index, row) {
                this.idx = index;
                this.id = row.id;
                this.form = {
                    a: row.a,
                    b: row.b,
                    c: row.c,
                }
                this.editVisible = true;
            },
            handleDelete(index, row) {
                this.idx = index;
                this.id = row.id;
                this.delVisible = true;
            },
             // 保存编辑
            saveEdit() {
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
            },
            // 确定删除
            deleteRow(){
                this.$message.success('删除成功');
                this.delVisible = false;
                if(this.list[this.idx].id === this.id){
                    this.list.splice(this.idx, 1);
                }else{
                    for(let i = 0; i < this.list.length; i++){
                        if(this.list[i].id === this.id){
                            this.list.splice(i, 1);
                            return ;
                        }
                    }
                }
            }
        },
        mounted(){
           const t = this;
           console.log(this.$route)
           t.$commonService.getBannerList().then((res)=>{
               t.list = res;
           })
        }
    }
</script>
<style scoped>
    
</style>
