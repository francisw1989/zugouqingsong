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
                <el-input v-model="itemName" placeholder="输入项目名称" class="handle-input left10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="search" class="left10">搜索</el-button>
                 <span class="left20">项目分类</span>
                <el-select class="left10" v-model="form.itemClassId" placeholder="请选择项目分类" filterable>
                    <el-option v-for="(v, i) in xmflList" :key="i+1" :label="v.itemClassName"  :value="i+1"></el-option>
                </el-select>
                <span class="left20">是否推荐</span>
                <el-switch v-model="isRecommend" class="left10"></el-switch>
                <span class="left20">是否拼团</span>
                <el-switch v-model="isAssemble" class="left10"></el-switch>


            </div>

            <el-table :data="list"  border class="table top20" ref="multipleTable" @selection-change="handleSelectionChange">
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                <el-table-column type="index" label="序号"  width="50" align='center'></el-table-column>
                <el-table-column prop="itemName" label="项目名称" sortable width="150"></el-table-column>
                <el-table-column prop="itemClassName" label="所属分类"></el-table-column>
                <el-table-column prop="defaultDuration" label="推荐时长(分钟)"></el-table-column>
                <el-table-column prop="defaultPrice" label="价格(元)"></el-table-column>
                <el-table-column prop="isRecommendc" label="是否推荐"></el-table-column>
                <el-table-column prop="isAssemble" label="参与拼团"></el-table-column>
                <el-table-column prop="createTime" label="创建时间"></el-table-column>
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
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :page-size='pageSize' :total="total">
                </el-pagination>
            </div>
        </div>

         <!-- 编辑弹出框 -->
        <el-dialog :title="idx==-1?'新增':'编辑'" :visible.sync="editVisible" width="40%">
            <el-form ref="form" :model="form"  :rules="rules"   label-width="120px">
                <div class="clearfix">
                    <el-form-item label="项目名称" prop="itemName" style="width: 50%" class="left">
                        <el-input v-model="form.itemName" placeholder="输入项目名称"></el-input>
                    </el-form-item>
                    <el-form-item label="所属分类" prop="itemClassId" style="width: 50%"  class="left">
                        <el-select v-model="form.itemClassId" placeholder="请选择项目分类" filterable>
                            <el-option v-for="(v, i) in xmflList" :key="i+1" :label="v.itemClassName" :value="i+1"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="clearfix">
                    <el-form-item label="推荐时长" prop="defaultDuration" style="width: 50%" class="left">
                        <el-input v-model="form.defaultDuration" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="价格(元)" prop="defaultPrice" style="width: 50%"  class="left">
                        <el-input v-model="form.defaultPrice" placeholder="0"></el-input>
                    </el-form-item>
                </div>
                <div class="clearfix">
                    <el-form-item label="最少服务时间" prop="mixDuration" style="width: 50%" class="left">
                        <el-input v-model="form.mixDuration" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="最高服务时间" prop="maxDuration" style="width: 50%"  class="left">
                        <el-input v-model="form.maxDuration" placeholder=""></el-input>
                    </el-form-item>
                </div>
                <div class="clearfix">
                    <el-form-item label="是否推荐" prop="isRecommend" style="width: 50%" class="left">
                        <el-switch v-model="isRecommend" class=""></el-switch>
                    </el-form-item>
                    
                </div>
                <div class="clearfix">
                    <el-form-item label="是否拼团">
                        <el-switch v-model="form.isAssemble" class=""></el-switch>
                        <div class="clear"></div>
                        <div v-if="form.isAssemble" style="border: 1px solid #ddd; display: inline-block; padding: 10px 20px;" class=" top10">
                            <div>
                                <span>拼团人数</span>
                                <el-select class="left5" v-model="form.threeT" placeholder="" filterable style="width: 50px">
                                    <el-option  :key="threeT" :label="3" :value="3"></el-option>
                                </el-select>
                                <span class="left10">价格(元)</span>
                                <el-input v-model="form.threePrice" style="width: 50px;" class="left5"></el-input>
                            </div>
                            <div class="top10">
                                <span>拼团人数</span>
                                <el-select class="left5" v-model="form.fiveT" placeholder="" filterable style="width: 50px">
                                    <el-option :key="fiveT" :label="5" :value="5"></el-option>
                                </el-select>
                                <span class="left10">价格(元)</span>
                                <el-input v-model="form.fivePrice" style="width: 50px;" class="left5"></el-input>
                            </div>
                            <div class="top10">
                                <span>拼团人数</span>
                                <el-select class="left5" v-model="form.tenT" placeholder="" filterable style="width: 50px">
                                    <el-option  :key="tenT" :label="10" :value="10"></el-option>
                                </el-select>
                                <span class="left10">价格(元)</span>
                                <el-input v-model="form.tenPrice" style="width: 50px;" class="left5"></el-input>
                            </div>
                        </div>
                    </el-form-item>
                </div>
                <div class="clearfix">
                    <el-form-item label="门店照片" prop="imgs">
                        <el-upload
                        :file-list='form.imgListShow'
                        action=""
                        :on-change="getFile"
                        list-type="picture-card"
                        :on-remove="beforeRemove">
                        <i class="el-icon-plus"></i>
                        </el-upload>

                    </el-form-item>
                </div>
                <el-form-item label="适宜人群" prop="crowd">
                    <el-input type="textarea" v-model="form.crowd" placeholder="" style="width: 70%; "></el-input>
                </el-form-item>
                <el-form-item label="调理方法" prop="conditioningMethod">
                    <el-input type="textarea" v-model="form.conditioningMethod" placeholder="" style="width: 70%; "></el-input>
                </el-form-item>
                <el-form-item label="调理流程" prop="conditioningProcess">
                    <el-input type="textarea" v-model="form.conditioningProcess" placeholder="" style="width: 70%; "></el-input>
                </el-form-item>
                <el-form-item label="自我保养方法" prop="maintenanceMethod">
                    <el-input type="textarea" v-model="form.maintenanceMethod" placeholder="" style="width: 70%; "></el-input>
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
    const Form= {
                    id: '',
                    itemName: '',
                    itemClassId: '',
                    itemClassName: '',
                    defaultDuration: '',
                    defaultPrice: '',
                    mixDuration: '',
                    maxDuration: '',
                    isRecommend: false,
                    isAssemble: false,
                    threePrice: '',
                    fivePrice: '',
                    tenPrice: '',
                    imgs: '',
                    crowd: '',
                    conditioningMethod: '',
                    conditioningProcess: '',
                    maintenanceMethod: ''
    }
    export default {
        data() {
            var imgListShowCheck = (rule, value, callback) => {
                if (!value.length) {
                    callback(new Error('请上传项目图片'));
                } else {
                    callback();
                }
            };
            return {
                list: [],
                cur_page: 1,
                multipleSelection: [],
                itemName: '',
                itemClassId: '',
                fiveT: '5',
                threeT: '3',
                tenT: '10',
                is_search: false,
                form: JSON.parse(JSON.stringify(Form)),
                rules: {
                    itemName: [
                        { required: true, message: '请输入', trigger: 'blur' },
                    ],
                    itemClassId: [
                        { required: true, message: '请选择', trigger: 'blur' },
                    ],
                    defaultDuration: [
                        { required: true, message: '请输入', trigger: 'blur' },
                    ],
                    defaultPrice: [
                        { required: true, message: '请输入', trigger: 'blur' },
                    ],
                    mixDuration: [
                        { required: true, message: '请输入', trigger: 'blur' },
                    ],
                    maxDuration: [
                        { required: true, message: '请输入', trigger: 'blur' },
                    ],imgs: [
                        { required: true, message: '请上传项目图片' },
                    ],
                    imgListShow: [
                        { validator: imgListShowCheck },
                    ]
                },
                idx: -1,
                id: -1,
                xmfl: '',
                xmflList: [],
                isRecommend: false,
                isAssemble: false,
                editVisible: false,
                timeList: [3, 10, 5],
                total: 0,
                pageSize: 10,
                pageNumber: 1
            }
        },
        components:{
            orderService
        },
        methods:{
             getFile(file, fileList){
                const t = this;
                t.$commonService.getBase64(file.raw).then((Base64)=>{
                    t.$commonService.upload(Base64).then((res)=>{
                        t.form.imgListShow.push({
                            url: res.netUrl
                        })
                        console.log(t.form.imgListShow)
                    })
                })
            },
            beforeRemove(file, fileList) {
                const t = this;
                for(const i in fileList){
                    if(fileList[i].uid == file.uid){
                        t.form.imgListShow.splice(i, 1)
                    }
                }
                console.log(t.form.imgListShow)
            },
             // 保存编辑
            saveEdit(form) {
                const t = this;
                t.form.imgs = t.form.imgListShow.map((v)=>{
                    return v.url
                }).join(',');
                t.$refs[form].validate((valid) => {
                    if (valid) {
                        let params = {};
                        t.editVisible = false;
                        for(let key in Form){
                            params[key] = t.form[key]
                        }
                        params.isRecommend = t.isRecommend? '1':'0';
                        params.isAssemble = t.isAssemble? '1':'0';
                        if(t.idx == '-1'){
                            orderService.itemAdd(params).then((res)=>{
                                t.getItemList()
                            })
                        }else{
                            orderService.itemEdit(params).then((res)=>{
                                t.getItemList()
                            })
                        }
                        

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
                
            },
            
            
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getItemList();
            },
            search() {
                //this.is_search = true;
                 const t = this;
                t.getItemList();
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 推荐
            handle1(index, row) {
                
            },
            handle2(index, row) {

            },
            handle3(index, row) {
                const t = this;
                if(row){
                    // 编辑
                    t.idx = index;
                    t.row = row;
                    t.form = t.row;
                    t.form.imgListShow = [];
                    if(t.form.imgs){
                        t.form.imgs.split(',').forEach((v)=>{
                            t.form.imgListShow.push({
                                url: v
                            })
                        })
                    }
                    console.log(t.form.imgs)
                }else{
                    // 新增
                    t.idx = '-1';
                    t.id = '';
                    t.form = JSON.parse(JSON.stringify(Form));
                    t.form.imgListShow = [];
                }
                t.editVisible = true;
            },
            handle4(index, row) {

            },
            handle5(index, row) {

            },getItemList(){
                const t = this;
                t.list = [];
                
                let params = {
                    pageSize: t.pageSize,
                    pageNumber: t.pageNumber,
                    itemName: t.itemName,
                    itemClassId: t.itemClassId
                }
                params.isRecommend = t.isRecommend? '1':'0';
                params.isAssemble = t.isAssemble? '1':'0';
                console.log(params);
                orderService.getItemList(params).then((res)=>{
                    t.list = res.records;
                    t.total = res.total
                })
            }
        },
        mounted(){
           const t = this;
           t.getItemList()

           orderService.getXmflList().then((res)=>{
               t.xmflList = res.records;
           })

        }
    }
</script>
<style scoped>
    
</style>
