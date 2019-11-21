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
                <span>项目名称</span>
                <el-input v-model="itemName" style='width: 110px!important'  placeholder="输入项目名称" class="handle-input left10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="search" class="left10">搜索</el-button>
                <span class="left20">项目分类</span>
                <el-select class="left10" style='width: 140px!important'   clearable v-model="itemClassId" placeholder="请选择项目分类" filterable>
                    <el-option v-for="(v, i) in itemClassList" :key='v.id' :label="v.itemClassName"  :value="v.id"></el-option>
                </el-select>
                <span class="left20">是否推荐</span>
                <el-select class="left10" clearable v-model="isRecommend" placeholder="" style='width: 60px' filterable>
                    <el-option label="是"  value="1"></el-option>
                    <el-option label="否"  value="0"></el-option>
                </el-select>

                <span class="left20">是否拼团</span>
                <el-select class="left10" clearable v-model="isAssemble" placeholder="" style='width: 60px' filterable>
                    <el-option label="是"  value="1"></el-option>
                    <el-option label="否"  value="0"></el-option>
                </el-select>

            </div>

            <el-table :data="list"  border class="table top20" ref="multipleTable" @selection-change="handleSelectionChange">
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                <el-table-column type="index" label="序号"  width="50" align='center'></el-table-column>
                <el-table-column prop="itemName" label="项目名称" sortable width="150"></el-table-column>
                <el-table-column prop="itemClassName" label="所属分类"></el-table-column>
                <el-table-column prop="defaultDuration" label="推荐时长(分钟)"></el-table-column>
                <el-table-column prop="defaultPrice" label="默认价格(元)"></el-table-column>
                <el-table-column prop="isRecommendName" label="是否推荐"></el-table-column>
                <el-table-column prop="isAssembleName" label="是否可拼团"></el-table-column>
                <el-table-column prop="createTime" label="创建时间"></el-table-column>
                <el-table-column label="操作" width="430" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleRecommend(scope.$index, scope.row)">{{scope.row.isRecommend==0?'推荐':'取消推荐'}}</el-button>
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
						<el-button size="mini" v-if="scope.row.isBanner==0" type="danger" @click="handleBanner(scope.$index, scope.row)">推荐至banner</el-button>
						<el-button size="mini" v-else type="success" disabled="disabled" @click="handleBanner(scope.$index, scope.row)">已推荐至banner</el-button>
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
        <el-dialog :title="idx==-1?'新增':'编辑'" :visible.sync="editVisible" width="40%">
            <el-form ref="form" :model="form"  :rules="rules"   label-width="120px">
                <div class="clearfix">
                    <el-form-item label="项目名称" prop="itemName" style="width: 50%" class="left">
                        <el-input v-model="form.itemName" placeholder="输入项目名称"></el-input>
                    </el-form-item>
                    <el-form-item label="所属分类" prop="itemClassId" style="width: 50%"  class="left">
                        <el-select v-model="form.itemClassId" @change='itemClassListChange' placeholder="请选择项目分类" filterable>
                            <el-option v-for="(v, i) in itemClassList" :key='v.id' :label="v.itemClassName"  :value="v.id"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="clearfix">
                    <el-form-item label="推荐时长" prop="defaultDuration" style="width: 50%" class="left">
                        <el-input v-model="form.defaultDuration" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="默认价格(元)" prop="defaultPrice" style="width: 50%"  class="left">
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
                        <el-switch v-model="form.isRecommend" class=""></el-switch>
                    </el-form-item>
                    
                </div>
                <div class="clearfix">
                    <el-form-item label="是否拼团" prop="isAssemble">
                        <el-switch v-model="form.isAssemble" class=""></el-switch>
                        <div class="clear"></div>
                        <div v-if="form.isAssemble" style="border: 1px solid #ddd; display: inline-block; padding: 10px 20px;" class=" top10">
                            <div>
                                <span>拼团人数</span>
                                <span class='pad10RL'>3</span>
                                <span class="">价格(总价/元)</span>
                                <el-input v-model="form.threePrice" style="width: 80px;" class="left5"></el-input>
                            </div>
                            <div class="top10">
                                <span>拼团人数</span>
                                <span class='pad10RL'>5</span>
                                <span class="">价格(总价/元)</span>
                                <el-input v-model="form.fivePrice" style="width: 80px;" class="left5"></el-input>
                            </div>
                            <div class="top10">
                                <span>拼团人数</span>
                                <span class='pad10RL'>10</span>
                                <span class="">价格(总价/元)</span>
                                <el-input v-model="form.tenPrice" style="width: 80px;" class="left5"></el-input>
                            </div>
                        </div>
                    </el-form-item>
                </div>
                <div class="clearfix">
                    <el-form-item label="项目图片" prop="imgs">
                        <el-upload
                        :file-list='form.imgListShow'
                        :auto-upload='false'
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
    import {orderService} from '../../../service/order';
    import {bannerService} from '../../../service/banner';
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
		isBanner:false,
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
                delVisible: false,
                form: JSON.parse(JSON.stringify(Form)),
                rules: {
                    itemName: [
                        { required: true, message: '请输入', trigger: 'blur' },
                    ],
                    itemClassId: [
                        { required: true, message: '请选择', trigger: 'change' },
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
                itemClassList: [],
                isRecommend: '',
                isAssemble: '',
                editVisible: false,
                isRecommendcName: '',
                isAssembleName: '',
                total: 0,
                pageSize: 10,
                pageNumber: 1
            }
        },
        components:{
            orderService
        },
        methods:{
            itemClassListChange(val){
                const t = this;
                t.form.itemClassName = t.itemClassList.filter((item)=>{
                    return item.id == val
                })[0].itemClassName;
                console.log(t.form.itemClassName)
            },
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
                t.form.imgListShow = fileList;
                console.log(t.form.imgListShow)
            },
             // 保存编辑
            saveEdit(form) {
                const t = this;
                t.form.imgs = t.form.imgListShow.map((v)=>{
                    return v.url
                }).join(',');
                t.$refs[form].validate((valid) => {   //表单验证 validate
					if (valid) {
                        let params = {};
                        t.editVisible = false;
                        for(let key in Form){
                            params[key] = t.form[key]
                        }
						debugger
                        params.isRecommend = params.isRecommend? '1':'0';
                        params.isAssemble = params.isAssemble? '1':'0';
						params.threePrice = params.threePrice==""? '0': params.threePrice;
						params.fivePrice = params.fivePrice==""? '0': params.fivePrice;
						params.tenPrice = params.tenPrice==""? '0': params.tenPrice;
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
            handleRecommend(index, row) {
                const t = this;
                let params = {
                    isRecommend: row.isRecommend==0?'1':'0',
                    id: row.id
                };
                orderService.itemRecommend(params).then((res)=>{
                    this.$message.success('设置成功');
                    t.getItemList();
                })
            },
            handleEdit(index, row) {
                const t = this;
                if(row){
                    // 编辑
                    t.idx = index;
                    t.row = row;
                    t.form = t.row;
                    t.row.isRecommend=="1"?t.form.isRecommend=true:t.form.isRecommend=false;
                    t.row.isAssemble=="1"?t.form.isAssemble=true:t.form.isAssemble=false;
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
            handleBanner(index, row) {
                const t = this;
                let params = {
                    path: row.imgs,
                    type: 2,
                    resourceId: row.id,
                    isPublish:0
                }
				let param = {
					resourceId: row.id,
					isBanner:1
				}
				debugger
                //console.log(params);
                 bannerService.add(params).then((res)=>{
                    this.$message.success('推荐成功');
                    //t.getItemList();
                });
				orderService.itemBanner(param).then((res)=>{
					t.getItemList();
				})
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
                orderService.itemDelete(parmas).then((res)=>{
                    this.$message.success('删除成功');
                    this.delVisible = false;
                    t.getItemList();
                })
            },
            getItemList(){
                const t = this;
                t.list = [];
                
                let params = {
                    pageSize: t.pageSize,
                    pageNumber: t.pageNumber,
                    itemName: t.itemName,
                    itemClassId: t.itemClassId,
                    isRecommend: t.isRecommend,
                    isAssemble:t.isAssemble
                }
                console.log(params);
                orderService.getItemList(params).then((res)=>{
                    for(const v of res.records){
                        v.isRecommendName = v.isRecommend == 0 ? '未推荐' : '已推荐';
                        v.isAssembleName=v.isAssemble == 0 ? '不参与' : '参与';
                    }
                    t.list = res.records;
                    t.total = res.total
                })
            }
        },
        watch:{
            itemClassId(val){
                this.getItemList();
            },
            isRecommend(){
                this.getItemList();
            },
            isAssemble(){
                this.getItemList();
            }

        },
        mounted(){
           const t = this;
           t.getItemList()

           orderService.getItemClassList().then((res)=>{
               t.itemClassList = res.records;
           })

        }
    }
</script>
<style scoped>
    
</style>
