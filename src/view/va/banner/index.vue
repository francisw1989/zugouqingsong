<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item> {{this.$route.meta.title}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box align-right">
                <el-button type="primary" icon="el-icon-circle-plus-outline" class="handle-del" @click="handleEdit">新增</el-button>
                <!-- <el-button type="danger" icon="el-icon-delete" class="handle-del left10" @click="delAll">批量删除</el-button> -->
            </div>
            <el-table :data="list"  border class="table top10" ref="multipleTable" @selection-change="handleSelectionChange">
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                <el-table-column type="index" label="序号"  width="50" align='center'></el-table-column>
                <el-table-column label="banner大图" align="center">
                    <template slot-scope="scope">
                        <img :src="scope.row.path" style="width: 200px" alt="">
                    </template>
                </el-table-column>
                <el-table-column prop="typeName" label="类型" width="120">
                </el-table-column>
                <el-table-column prop="isPublishName" label="状态">
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间">
                </el-table-column>
                <el-table-column label="操作" width="240" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" v-if="scope.row.type==4||scope.row.type==5" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" @click="handlePublish(scope.$index, scope.row)">{{scope.row.isPublish==0?'发布':'取消发布'}}</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :page-size='pageSize' :total="total">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog :title="idx==-1?'新增':'编辑'" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                <el-form-item label="图片" prop="path">
                    <el-upload action="" 
                        :show-file-list="false" 
                        :on-change='getFile' 
                        :auto-upload='false'>
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                    <img v-if="form.path" :src="form.path" class=" top10" style="max-width: 100%">
                </el-form-item>
                <el-form-item label="类型" prop="type">
                    <el-select v-model="form.type" placeholder="请选择类型" filterable>
                        <el-option v-for="v in bannerTypeList" :key="v.id" :label='v.name' :value='v.id'></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-if='form.type == 4' label="链接地址" prop="url">
                    <el-input v-model="form.url"></el-input>
                </el-form-item>
                <el-form-item label="是否发布" prop="isPublish">
                    <el-switch v-model="form.isPublish" class="left10"></el-switch>
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
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    const Form = {
        id: '',
        path: '',
        type: '',
        url: '',
        resourceId: '',
        isPublish: 0
    }
    import bus from '../../../bus';
    import {bannerService} from '../../../service/banner';
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
                form: JSON.parse(JSON.stringify(Form)),
                rules: {
                    a: [
                        { required: true, message: '请选择类型', trigger: 'change' },
                    ]
                },
                idx: -1,
                id: -1,
                bannerTypeList: [],
                total: 0,
                pageSize: 10,
                pageNumber: 1
            }
        },
        computed:{
            
        },
        methods:{
            getFile(file, fileList){
                const t = this;
                t.$commonService.getBase64(file.raw).then((Base64)=>{
                    t.$commonService.upload(Base64).then((res)=>{
                        t.form.path = res.netUrl
                    })
                })
            },
            beforeImgUpload(file) {
                console.log(file)
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG && !isPNG) {
                    this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M && isPNG;
            },
            delAll() {
                const length = this.multipleSelection.length;
                let str = '';
                this.del_list = this.del_list.concat(this.multipleSelection);
                console.log(this.multipleSelection)
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
            handlePublish(index, row){
                const t = this;
                let params = {
                    isPublish: row.isPublish==0?'1':'0'
                };
                bannerService.publish(params, row.id).then((res)=>{
                    t.getList()
                })
            },

            handleEdit(index, row) {
                if(row){
                    this.idx = index;
                    this.id = row.id;
                    if(row.isPublish == 0){
                        row.isPublish = false;
                    }else{
                        row.isPublish = true;
                    }
                    this.form = row;
                }else{
                    this.idx = '-1';
                    this.form = JSON.parse(JSON.stringify(Form))
                }
                
                this.editVisible = true;
            },
            handleDelete(index, row) {
                this.idx = index;
                this.id = row.id;
                this.delVisible = true;
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
                        params.isPublish = params.isPublish? '1':'0';
                        if(t.idx == '-1'){
                            bannerService.add(params).then((res)=>{
                                t.getList()
                            })
                        }else{
                            bannerService.edit(params).then((res)=>{
                                t.getList()
                            })
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
                
            },
            // 确定删除
            deleteRow(){
                const t = this;
                bannerService.delete({id: this.id}).then((res)=>{
                    t.getList();
                    t.delVisible = false;
                    t.$message.success('删除成功');
                })
            },
            getList(){
                const t = this;
                t.list = [];
                let params = {
                    pageSize: t.pageSize,
                    pageNumber: t.pageNumber
                }
                bannerService.getBannerList(params).then((res)=>{
                    for(const v of res.records){
                        v.isPublishName = v.isPublish == 0 ? '未发布' : '已发布';
                        //  （1 门店,2项目,3技师,4链接5.无链接）
                        if(v.type==1){
                            v.typeName = '门店'
                        }else if(v.type==2){
                            v.typeName = '项目'
                        }else if(v.type==3){
                            v.typeName = '技师'
                        }else if(v.type==4){
                            v.typeName = '链接'
                        }else if(v.type==5){
                            v.typeName = '无链接'
                        }
                    }
                    t.list = res.records;
                    t.total = res.total
                })
                
            }
        },
        mounted(){
            const t = this;
            t.getList();
            bannerService.getBannerTypeList().then((res)=>{
                t.bannerTypeList = res;
            })
        }
    }
</script>
<style scoped>
    
</style>
