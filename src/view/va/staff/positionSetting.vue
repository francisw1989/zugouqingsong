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
                <el-button type="primary" icon="el-icon-circle-plus-outline" class="handle-del right" @click="handleEdit">新增</el-button>
            </div>



            
            <el-table :data="list"  border class="table top20" ref="multipleTable" @selection-change="handleSelectionChange">
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                <el-table-column type="index" label="编号"  width="50" align='center'></el-table-column>
                <el-table-column prop="postName" label="岗位名称" sortable width=""></el-table-column>
                <el-table-column prop="gradeNameN" label="等级" width=""></el-table-column>
                <el-table-column label="操作" width="150px" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
       <el-dialog :title="idx==-1?'新增':'编辑'" :visible.sync="editVisible" width="750px">
            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                <el-form-item label="岗位名称" prop="postName">
                    <el-input v-model="form.postName" placeholder="" style="width: 80%;"></el-input>
                </el-form-item>
                <el-form-item label="此岗位级别" class="clearfix">
                    <div v-for="(v, i) in form.postGradeList" :key="i" class='btm5'>
                        <span class="">级别名称</span>
                        <el-input v-model="v.gradeName" placeholder="" style="width: 100px;" class='left5'></el-input>
                        <span class="left10">收费系数</span>
                        <el-input v-model="v.priceCoefficient" placeholder="" style="width: 50px;" class="left5"></el-input>
                        <span class="left10">佣金系数</span>
                        <el-input v-model="v.incomeCoefficient" placeholder="" style="width: 50px;" class="left5"></el-input>
                        <span class="left10">等级数值</span>
                        <el-input :value='i+1' disabled placeholder="" style="width: 60px;" class="left5"></el-input>
                        <i class="el-icon-remove-outline left5 pointer" @click="mdRemove(i)"></i>
                    </div>
                    <div class='top5'>                        
                        <el-button type="primary" @click="mdAdd">新 增</el-button>
                    </div>
                    
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
    import {staffService} from '../../../service/staff';
    import {orderService} from '../../../service/order';
    const Form= {
        id: '',
        postGradeList: [
            {
                gradeName: '',
                id: '',
                incomeCoefficient: '',
                level: '',
                postId: '',
                priceCoefficient: ''
            }
        ],
        postName: ''
    }
    export default {
        data() {
            return {
                list: [],
                cur_page: 1,
                multipleSelection: [],
                select_word: '',
                del_list: [],
                is_search: false,
                form: JSON.parse(JSON.stringify(Form)),
                jbList:[],
                xsList: [],
                rules: {
                    postName: [
                        { required: true, message: '请输入', trigger: 'blur' },
                    ]
                },
                idx: -1,
                id: -1,
                viewVisible: false,
                editVisible: false,
                delVisible: false,
                total: 0,
                pageSize: 10,
                pageNumber: 1
            }
        },
        components:{
            
        },
        methods:{
            mdAdd(){
                const t = this;
                // if(t.form.gwjbList.length>3){
                //     t.$message({
                //         message: '最多四条',
                //         type: 'warning'
                //     });
                //     return
                // }
                t.form.postGradeList.push({});

            },
            mdRemove(i){
                const t = this;
                t.form.postGradeList.splice(i, 1)
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
                        for(const i in params.postGradeList){
                            params.postGradeList[i].level = Number(i)+1;
                        }
                        staffService.postAdd(params).then((res)=>{
                            t.getPostList()
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            handleEdit(index, row){
                const t = this;
                if(row){
                    // 编辑
                    t.idx = index;
                    t.row = row;
                    t.form = t.row;
                    console.log(t.form)
                }else{
                    // 新增
                    t.idx = '-1';
                    t.id = '';
                    t.form = JSON.parse(JSON.stringify(Form));

                }
                this.editVisible = true;
            },

            handleCurrentChange(val) {
                this.cur_page = val;
                this.getPostList();
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
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
                staffService.postDelete(parmas).then((res)=>{
                    this.$message.success('删除成功');
                    this.delVisible = false;
                    t.getPostList();
                })
            },
            getPostList(){
                const t = this;
                t.list = [];
                let params = {
                    pageSize: t.pageSize,
                    pageNumber: t.pageNumber
                }
                staffService.getPostList(params).then((res)=>{
                    for(const v of res.records){
                        v.gradeNameN = v.postGradeList.map((item, i)=>{
                            return item.gradeName
                        }).join(',') || '\\'
                    }
                    t.list = res.records;
                    t.total = res.total
                })
            }
        },
        mounted(){
            const t = this;
            //岗位等级列表
            t.getPostList();
        }
    }
</script>
<style scoped>
    
</style>
