<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item> {{this.$route.meta.title}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class=" clearfix">
                <el-input v-model="select_word" placeholder="请输入员工姓名,手机号" class="handle-input"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="search" class="left10">搜索</el-button>
                <span class="left10 font12 colblue pointer" @click="moreSeach">更多筛选条件  <i class="el-icon-caret-bottom"></i></span>
            </div>
            <div v-if='showMore' class="top10">
                <span class="">所属门店</span>
                <el-select class="left10" v-model="shop" placeholder="" filterable>
                    <el-option v-for="(item, index) in shopList" :key="index" :value="item.shopId"  :label="item.shopName"></el-option>
                </el-select>
                <span class="left20">岗位</span>
                <el-select class="left10" v-model="gw" placeholder="" filterable>
                    <el-option v-for="(v, i) in gwList" :key="i" :label="v.a" :value="v.a"></el-option>
                </el-select>
                <span class="left20">可服务项目</span>
                <el-select class="left10" v-model="project" placeholder="" filterable>
                    <el-option v-for="(v) in projectList" :key="v.a" :label="v.a" :value="v.a"></el-option>
                </el-select>
                <span class="left20">是否流动</span>
                <el-switch v-model="isLiudong" class="left10"></el-switch>
            </div>


            
            <el-table :data="list"  border class="table top20" ref="multipleTable" @selection-change="handleSelectionChange">
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                <!-- <el-table-column type="index" label="序号"  width="50" align='center'></el-table-column> -->
                <el-table-column prop="a" label="工号" sortable width="150"></el-table-column>
                <el-table-column prop="b" label="姓名" width="120"></el-table-column>
                <el-table-column prop="c" label="性别"></el-table-column>
                <el-table-column prop="c" label="所属门店"></el-table-column>
                <el-table-column prop="c" label="岗位"></el-table-column>
                <el-table-column prop="c" label="等级"></el-table-column>
                <el-table-column prop="c" label="是否流动"></el-table-column>
                <el-table-column prop="c" label="手机号"></el-table-column>
                <el-table-column label="操作" width="150" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handle1(scope.$index, scope.row)">分配角色</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                </el-pagination>
            </div>
        </div>

      
        <!-- 新增 -->
        <el-dialog title="新增员工" :visible.sync="editVisible" width="300px">
            <el-form ref="form" :model="form"  :rules="rules"   label-width="80px" label-position='left'>
                <el-form-item label="姓名" prop="a">
                    <el-input v-model="form.a" placeholder="" disabled></el-input>
                </el-form-item>
                <el-form-item label="角色" prop="a">
                    <el-select class="" v-model="shop" placeholder="" filterable>
                        <el-option v-for="(item, index) in roleList" :key="index" :value="index"  :label="item"></el-option>
                    </el-select>
                </el-form-item>
                

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit('form')">保存</el-button>
            </span>
        </el-dialog>


    </div>
</template>
<script>
    import bus from '../../../bus';
    import {staffService} from '../../../service/staff';
    import {orderService} from '../../../service/order';
    import StaffDetail from './staffDetail';
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
                
                form: {
                    a: '',
                    b: '',
                    c: '',
                    gender: '男'
                },
                rules: {
                    a: [
                        { required: true, message: '请选择类型', trigger: 'change' },
                    ]
                },
                idx: -1,
                id: -1,
                showMore: false,
                shopList: [],
                shop: '',
                gwList: [],
                gw: [],
                projectList: [],
                project: '',
                isLiudong: false,
                viewVisible: false,
                editVisible: false,
                roleList: ['超级管理员','管理员','员工']
            }
        },
        components:{
            StaffDetail
        },
        methods:{
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
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            add(){
                this.editVisible = true;
            },
            moreSeach(){
                const t = this;
                if(t.showMore){
                    t.showMore = false
                }else{
                    t.showMore = true
                }
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
            // 分配角色
            handle1(index, row) {
                this.idx = index;
                this.id = row.id;
                this.editVisible = true;
            },
        },
        mounted(){
            const t = this;
            // 员工列表
            staffService.getStaffList().then((res)=>{
                t.list = res;
            });
            // 岗位列表
            staffService.getGwList().then((res)=>{
                t.gwList = res;
            });
            // 门店列表
            t.$commonService.getShopList().then((res)=>{
                t.shopList = res
            });
            // 服务项目列表
            t.$commonService.getProjectList().then((res)=>{
               t.projectList = res;
           });

        }
    }
</script>
<style scoped>
    
</style>
