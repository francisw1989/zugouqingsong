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
                <el-button type="primary" icon="el-icon-circle-plus-outline" class="handle-del right" @click="handle3">新增</el-button>
                <span>项目名称</span>
                <el-input v-model="select_word" placeholder="输入项目名称" class="handle-input left10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="search" class="left10">搜索</el-button>
                 <span class="left20">项目分类</span>
                <el-select class="left10" v-model="form.a" placeholder="请选择项目分类" filterable>
                    <el-option v-for="(v, i) in xmflList" :key="i" :label="v" :value="v"></el-option>
                </el-select>
                <span class="left20">是否推荐</span>
                <el-switch v-model="isTuijian" class="left10"></el-switch>
                <span class="left20">是否拼团</span>
                <el-switch v-model="isPintuan" class="left10"></el-switch>


            </div>

            <el-table :data="list"  border class="table top20" ref="multipleTable" @selection-change="handleSelectionChange">
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                <el-table-column type="index" label="序号"  width="50" align='center'></el-table-column>
                <el-table-column prop="a" label="项目名称" sortable width="150"></el-table-column>
                <el-table-column prop="c" label="所属分类"></el-table-column>
                <el-table-column prop="c" label="推荐时长(分钟)"></el-table-column>
                <el-table-column prop="c" label="价格(元)"></el-table-column>
                <el-table-column prop="c" label="是否推荐"></el-table-column>
                <el-table-column prop="c" label="参与拼团"></el-table-column>
                <el-table-column prop="c" label="创建时间"></el-table-column>
                <el-table-column label="操作" width="430" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handle1(scope.$index, scope.row)">推荐</el-button>
                        <el-button size="mini" @click="handle2(scope.$index, scope.row)">参与拼团</el-button>
                        <el-button size="mini" @click="handle3(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handle5(scope.$index, scope.row)">下架</el-button>
                        <el-button size="mini" @click="handle4(scope.$index, scope.row)">推荐至banner</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                </el-pagination>
            </div>
        </div>

         <!-- 编辑弹出框 -->
        <el-dialog :title="idx==-1?'新增':'编辑'" :visible.sync="editVisible" width="40%">
            <el-form ref="form" :model="form"  :rules="rules"   label-width="120px">
                <div class="clearfix">
                    <el-form-item label="项目名称" prop="a" style="width: 50%" class="left">
                        <el-input v-model="form.a" placeholder="输入项目名称"></el-input>
                    </el-form-item>
                    <el-form-item label="所属分类" prop="a" style="width: 50%"  class="left">
                        <el-select v-model="form.a" placeholder="请选择项目分类" filterable>
                            <el-option v-for="(v, i) in xmflList" :key="i" :label="v" :value="v"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="clearfix">
                    <el-form-item label="推荐时长" prop="a" style="width: 50%" class="left">
                        <el-input v-model="form.a" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="价格(元)" prop="a" style="width: 50%"  class="left">
                        <el-input v-model="form.a" placeholder=""></el-input>
                    </el-form-item>
                </div>
                <div class="clearfix">
                    <el-form-item label="最少服务时间" prop="a" style="width: 50%" class="left">
                        <el-input v-model="form.a" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="最高服务时间" prop="a" style="width: 50%"  class="left">
                        <el-input v-model="form.a" placeholder=""></el-input>
                    </el-form-item>
                </div>
                <div class="clearfix">
                    <el-form-item label="是否推荐" prop="a" style="width: 50%" class="left">
                        <el-switch v-model="isTuijian" class=""></el-switch>
                    </el-form-item>
                    
                </div>
                <div class="clearfix">
                    <el-form-item label="是否拼团">
                        <el-switch v-model="form.isPintuan" class=""></el-switch>
                        <div class="clear"></div>
                        <div v-if="form.isPintuan" style="border: 1px solid #ddd; display: inline-block; padding: 10px 20px;" class=" top10">
                            <div>
                                <span>拼团人数</span>
                                <el-select class="left5" v-model="form.a" placeholder="" filterable style="width: 50px">
                                    <el-option v-for="(v, i) in timeList" :key="i" :label="v" :value="v"></el-option>
                                </el-select>
                                <span class="left10">价格(元)</span>
                                <el-input v-model="form.a" style="width: 50px;" class="left5"></el-input>
                            </div>
                            <div class="top10">
                                <span>拼团人数</span>
                                <el-select class="left5" v-model="form.a" placeholder="" filterable style="width: 50px">
                                    <el-option v-for="(v, i) in timeList" :key="i" :label="v" :value="v"></el-option>
                                </el-select>
                                <span class="left10">价格(元)</span>
                                <el-input v-model="form.a" style="width: 50px;" class="left5"></el-input>
                            </div>
                            <div class="top10">
                                <span>拼团人数</span>
                                <el-select class="left5" v-model="form.a" placeholder="" filterable style="width: 50px">
                                    <el-option v-for="(v, i) in timeList" :key="i" :label="v" :value="v"></el-option>
                                </el-select>
                                <span class="left10">价格(元)</span>
                                <el-input v-model="form.a" style="width: 50px;" class="left5"></el-input>
                            </div>
                            
                        </div>
                    </el-form-item>
                </div>
                <div class="clearfix">
                    <el-form-item label="门店照片" prop="a">
                        <el-upload
                        action="https://jsonplaceholder.typicode.com/posts/"
                        list-type="picture-card"
                        :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                        </el-upload>

                    </el-form-item>
                </div>
                <el-form-item label="适宜人群" prop="a">
                    <el-input type="textarea" v-model="form.a" placeholder="" style="width: 70%; "></el-input>
                </el-form-item>
                <el-form-item label="调理方法" prop="a">
                    <el-input type="textarea" v-model="form.a" placeholder="" style="width: 70%; "></el-input>
                </el-form-item>
                <el-form-item label="调理流程" prop="a">
                    <el-input type="textarea" v-model="form.a" placeholder="" style="width: 70%; "></el-input>
                </el-form-item>
                <el-form-item label="自我保养方法" prop="a">
                    <el-input type="textarea" v-model="form.a" placeholder="" style="width: 70%; "></el-input>
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
    import {orderService} from '../../../service/order';
    export default {
        data() {
            return {
                list: [],
                cur_page: 1,
                multipleSelection: [],
                select_word: '',
                is_search: false,
                form: {
                    a: '',
                    b: '',
                    c: '',
                    isPintuan: false
                },
                rules: {
                    a: [
                        { required: true, message: '请选择类型', trigger: 'blur' },
                    ]
                },
                idx: -1,
                id: -1,
                xmfl: '',
                xmflList: [],
                isTuijian: false,
                isPintuan: false,
                editVisible: false,
                timeList: [3, 10, 5],
            }
        },
        components:{
            
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
            // 订单详情
            handle1(index, row) {
                
            },
            handle2(index, row) {

            },
            handle3(index, row) {
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
            handle4(index, row) {

            },
            handle5(index, row) {

            }
        },
        mounted(){
           const t = this;
           t.$commonService.getProjectList().then((res)=>{
               t.list = res;
           });
           orderService.getXmflList().then((res)=>{
               t.xmflList = res;
           })

        }
    }
</script>
<style scoped>
    
</style>
