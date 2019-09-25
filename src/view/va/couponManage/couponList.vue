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
                <el-button type="primary" class="right" @click="handleEdit">新增</el-button>
                <el-input v-model="couponName" placeholder="请输入商品编号或名称" class="handle-input"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="search" class="left10">搜索</el-button>
                
                <span class="left20">优惠券类型</span>
                <el-select class="left10" v-model="couponType" placeholder="请选择类型" style="width: 120px">
                    <el-option v-for="(v,i) in yhqTypeList" :key="i+1" :label="v" :value="i+1"></el-option>
                </el-select>
                <span class="left20">优惠券范围</span>
                <el-select class="left10" v-model="couponScope" placeholder="请选择"  style="width: 120px">
                    <el-option v-for="(v,i) in yhqFwList" :key="i" :label="v" :value="i"></el-option>
                </el-select>
            </div>
            <el-table :data="list"  border class="table top20" ref="multipleTable">
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                <el-table-column type="index" label="序号"  width="50" align='center'></el-table-column>
                <el-table-column prop="couponName" label="优惠券名称" sortable width="150"></el-table-column>
                <el-table-column prop="couponScopeName" label="使用范围" width="120"></el-table-column>
                <el-table-column prop="couponTypeName" label="类型"></el-table-column>
                <el-table-column prop="couponDenomination" label="面额"></el-table-column>
                <el-table-column prop="couponCondition" label="使用条件"></el-table-column>
                <el-table-column prop="grantCount" label="发放数量"></el-table-column>
                <el-table-column prop="receivingCount" label="已领取数量"></el-table-column>
                <el-table-column prop="limitCount" label="限领"></el-table-column>
                <el-table-column prop="expiryDate" label="有效期截止时间"></el-table-column>
                <el-table-column prop="createTime" label="创建时间"></el-table-column>
                <el-table-column prop="statusName" label="状态"></el-table-column>
                <el-table-column label="操作" width="240" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        <el-button size="mini" @click="statusEdit(scope.$index, scope.row)">{{scope.row.status==1?'取消生效':'生效'}}</el-button>

                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :page-size='pageSize' :total="total">
                </el-pagination>
            </div>
        </div>

        <!-- 新增 -->
        <el-dialog :title="idx==-1?'新增优惠券':'修改优惠券'" :visible.sync="editVisible" width="500px">
            <el-form ref="form" :model="form" :rules="rules" label-width="130px">
                <el-form-item label="优惠券名称" prop="couponName">
                    <el-input v-model="form.couponName"></el-input>
                </el-form-item>
                <el-form-item label="使用范围" prop="couponScope">
                    <el-radio-group v-model="form.couponScope">
                        <el-radio v-for="(v,i) in yhqFwList" :key="i"  :label="i" >{{v}}</el-radio>
                    </el-radio-group>
                    <!--门店-->
                    <div v-if="form.couponScope=='2'" class="top10">
                        <el-select v-model="form.applyStore" placeholder="">
                            <el-option v-for="(v) in shopList" :key="v.id" :value="v.id"  :label="v.name"></el-option>
                        </el-select>
                    </div>
                    <!--通用-->
                    <div v-if="form.couponScope=='1'" class="top10">
                        <el-select v-model="form.applyItemId" placeholder="" @change='changeT'>
                            <el-option v-for="(v) in projectList" :key="v.id" :value="v.id"  :label="v.itemName"></el-option>
                        </el-select>
                    </div>
                </el-form-item>
                <el-form-item label="优惠券类型" prop="couponType">
                    <el-radio-group v-model="form.couponType">
                        <template v-if="form.couponScope=='1'">
                            <el-radio  v-for="(v, i) in yhqTypeList" :key="i+1" :label="i+1" >{{v}}</el-radio>
                        </template>
                        <template v-if="form.couponScope!='1'">
                            <el-radio v-for="(v, i) in yhqTypeList" :key="i+1" :label="i+1"  v-if='i!=(yhqTypeList.length-1)'>{{v}}</el-radio>
                        </template>
                    </el-radio-group>
                    <div class="top10" v-if="form.couponType=='1'">
                        <p class="col999 top10">满减设置</p>
                        <div class="">
                            满<el-input v-model="form.couponCondition" class="left5" style="width: 80px"></el-input>
                            <span class="left20">减</span><el-input v-model="form.couponDenomination" class="left5" style="width: 80px"></el-input>
                        </div>
                    </div>
                    <div class="top10" v-if="form.couponType=='2'">
                        <p class="col999 top10">满赠设置</p>
                        <div class="">
                            满<el-input v-model="form.couponCondition" class="left5" style="width: 80px"></el-input>
                            <span class="left20">赠</span><el-input v-model="form.couponDenomination" class="left5" style="width: 80px"></el-input>
                        </div>
                    </div>
                    <div class="top10" v-if="form.couponType=='3'">
                        <p class="col999 top10">折扣设置(优惠价 = 原价 x 折率)</p>
                        <div class="">
                            折率<el-input v-model="form.couponDenomination" placeholder="7" class="left5" style="width: 80px"></el-input>
                            <span class="left5">折</span>
                        </div>
                    </div>
                    <div class="top10" v-if="form.couponType=='4'">
                        <p class="col999 top10">抵扣时间</p>
                        <div class="">
                            抵扣<el-input v-model="form.couponDenomination" placeholder="30" class="left5" style="width: 80px"></el-input>
                            <span class="left5">分钟</span>
                        </div>
                    </div>

                </el-form-item>
                <el-form-item label="发放数量" prop="grantCount">
                    <el-input v-model="form.grantCount" style="width: 40%" ></el-input>
                    <span class="col999 left10">默认0，无限量</span>
                </el-form-item>
                <el-form-item label="每人限制领取" prop="limitCount">
                    <el-input v-model="form.limitCount" style="width: 40%" ></el-input>
                    <span class="left5">张</span>
                    <span class="col999 left10">默认0，无限量</span>
                </el-form-item>
                <el-form-item label="有效期类型" prop="expiryType">
                    <el-radio-group v-model="form.expiryType">
                        <el-radio v-for="(v,i) in yhqYxqlxList" :key="i+1" :label="i+1">{{v}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="有效期时间" prop="expiryDate" v-if="form.expiryType=='1'">
                    <el-date-picker  value-format="yyyy-MM-dd" v-model="form.expiryDate" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="领取几日内有效" prop="expiryDays" v-if="form.expiryType=='2'">
                    <el-input v-model="form.expiryDays" style="width: 40%"></el-input>
                    <span class="left5">日</span>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input type="textarea" v-model="form.remark"></el-input>
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
    import {couponService} from '../../../service/coupon';
    import {storeService} from '../../../service/store';
    import {orderService} from '../../../service/order';
    const Form= {
        id: '',
        couponName: '',
        couponScope: '', // 使用范围(0通用 1项目 2门店)
        couponType: '', //（1满减 2满赠 3折扣 4抵扣分钟）
        couponDenomination: '',
        couponCondition: '0',
        grantCount: '0',
        applyItemId: '',
        applyStore: '',
        remark: '',
        limitCount: '0',
        expiryDate: '',
        expiryType: '', //（1固定日期 2自领取日算起）
        expiryDays: '',
        status: '0'
    }
    export default {
        data() {
            return {
                list: [],
                couponScopeList: ['通用','项目','门店'],
                couponTypeList: ['','满减','满赠','折扣','抵扣分钟'],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                couponName: '',
                is_search: false,
                idx: -1,
                id: -1,
                editVisible: false,
                delVisible: false,
                couponType: '',
                yhqTypeList: [],
                couponScope: '',
                storesId: '',
                yhqFwList: '',
                couponCondition: '0',
                grantCount: '0',
                yhqYxqlxList: [],
                form: JSON.parse(JSON.stringify(Form)),
                rules: {
                   couponName: [
                        { required: true, message: '请输入', trigger: 'blur' },
                    ],
                    couponScope: [
                        { required: true, message: '请选择', trigger: 'change' },
                    ],
                    couponType: [
                        { required: true, message: '请选择', trigger: 'change' },
                    ],
                    couponDenomination: [
                        { required: true, message: '请输入', trigger: 'blur' },
                    ],
                    couponCondition: [
                        { required: true, message: '请输入', trigger: 'blur' },
                    ],
                    grantCount: [
                        { required: true, message: '请输入', trigger: 'blur' },
                    ],
                    applyItemId: [
                        { required: true, message: '请选择', trigger: 'change' },
                    ],
                    applyStore: [
                        { required: true, message: '请选择', trigger: 'change' },
                    ],
                    remark: [
                        { required: true, message: '请输入', trigger: 'blur' },
                    ],
                    limitCount: [
                        { required: true, message: '请输入', trigger: 'blur' },
                    ],
                    expiryDate: [
                        { required: true, message: '请选择', trigger: 'change' },
                    ],
                    expiryType: [
                        { required: true, message: '请选择', trigger: 'change' },
                    ],
                    expiryDays: [
                        { required: true, message: '请输入', trigger: 'blur' },
                    ] 
                },
                goodsCat:[],
                shopList: [],
                total: 0,
                pageSize: 10,
                pageNumber: 1
            }
        },
        components:{
            couponService
        },
        methods:{
            changeT(e){
                console.log(e)
            },
            // 保存编辑
            saveEdit(form) {
                const t = this;
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        let params = {};
                        t.editVisible = false;
                        for(let key in Form){
                            params[key] = t.form[key]
                        }
                        console.log(params);
                        if(params.couponType == 1 || params.couponType == 2){
                            params.couponCondition = params.couponCondition * 100;
                            params.couponDenomination = params.couponDenomination * 100;
                        }
                        if(params.couponType == 3){
                            params.couponDenomination = params.couponDenomination * 10;
                        }
                        if(t.idx == '-1'){
                            couponService.couponManagerAdd(params).then((res)=>{
                                t.getCouponManagerList()
                            })
                        }else{
                            couponService.couponManagerEdit(params).then((res)=>{
                                t.getCouponManagerList()
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
                this.getCouponManagerList();
            },
            search() {
                //this.is_search = true;
                const t = this;
                t.getCouponManagerList();
            },
            
            // 优惠券修改
            handleEdit(index, row) {
                const t = this;
                if(row){
                    t.idx = index;
                    t.row = row;
                    t.form = t.row;
                    // this.form = row;
                }else{
                    this.idx = '-1';
                    this.id = '';
                    t.form = JSON.parse(JSON.stringify(Form));
                }
                
                this.editVisible = true;
            },
            handleDelete(index, row){
                const t = this;
                this.idx = index;
                this.id = row.id;
                this.row = row;
                t.delVisible = true;
            },
            // 确定删除
            deleteRow(){
                const t = this;
                let params = {
                    id: this.id
                }
                couponService.couponManagerDelete(params).then((res)=>{
                    this.$message.success('删除成功');
                    this.delVisible = false;
                    t.getCouponManagerList();
                })
            },
            //操作生效
            statusEdit(index, row) {
                const t = this;
                t.idx = index;
                t.row = row;
                t.form = t.row;
                t.row.status=="1"?t.from.status=0:t.from.status=1;
                t.handleEdit(index, row);
            },
            getCouponManagerList(){
                const t = this;
                t.list = [];
                let params = {
                    pageSize: t.pageSize,
                    pageNumber: t.pageNumber,
                    couponName: t.couponName,
                    couponScope: t.couponScope,
                    couponType: t.couponType
                }
                couponService.getCouponManagerList(params).then((res)=>{
                    for(const v of res.records){
                        v.statusName = v.status == 0?'不生效':'生效'
                         if(v.couponType == 1 || v.couponType == 2){
                            v.couponCondition = v.couponCondition / 100;
                            v.couponDenomination = v.couponDenomination / 100;
                        }
                        if(v.couponScope == null){
                            v.couponScopeName = ''
                        }else{
                            v.couponScopeName = t.couponScopeList[v.couponScope];
                        }
                        if(v.couponType == null){
                            v.couponTypeName = ''
                        }else{
                            v.couponTypeName = t.couponTypeList[v.couponType];
                        }
                    }
                    t.list = res.records;
                    t.total = res.total
                })
            }
        },
        watch:{
            couponType(val){
                this.getCouponManagerList();
            },
            couponScope(){
                this.getCouponManagerList();
            }

        },
        mounted(){
            const t = this;
            t.getCouponManagerList();

             // 门店列表
            storeService.list({pageSize: 100,pageNumber: 1}).then((res)=>{
                t.shopList = res.records
            });
            //服务项目列表
            orderService.getItemList({pageSize: 100,pageNumber: 1}).then((res)=>{
                  t.projectList = res.records
            }); 
            t.yhqTypeList = t.$GD.yhqTypeList;
            t.yhqFwList = t.$GD.yhqFwList;
            t.yhqYxqlxList = t.$GD.yhqYxqlxList;

        }
    }
</script>
<style scoped>
    
</style>
