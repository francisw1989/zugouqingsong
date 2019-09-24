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
                    <el-option v-for="(v,i) in yhqFwList" :key="i+1" :label="v" :value="i+1"></el-option>
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
                <el-table-column label="操作" width="150" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
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
        <el-dialog :title="idx==-1?'新增优惠券':'修改优惠券'" :visible.sync="editVisible" width="500px">
            <el-form ref="form" :model="form" :rules="rules" label-width="120px">
                <el-form-item label="优惠券名称" prop="a">
                    <el-input v-model="form.a"></el-input>
                </el-form-item>
                <el-form-item label="使用范围" prop="yhqFw">
                    <el-radio-group v-model="form.yhqFw">
                        <el-radio :label="item" v-for="item in yhqFwList" :key="item"></el-radio>
                    </el-radio-group>
                    <div v-if="form.yhqFw!='通用'" class="top10">
                        <el-select v-model="form.shop" multiple placeholder="">
                            <el-option v-for="item in shopList" :key="item.shopName" :label="item.shopName" :value="item.shopName"></el-option>
                        </el-select>
                    </div>
                </el-form-item>
                <el-form-item label="优惠券类型" prop="yhqType">
                    <el-radio-group v-model="form.yhqType">
                        <template v-if="form.yhqFw=='项目'">
                            <el-radio  :label="item" v-for="item in yhqTypeList" :key="item"></el-radio>
                        </template>
                        <template v-if="form.yhqFw!='项目'">
                            <el-radio  :label="v" v-for="(v, i) in yhqTypeList" :key="v" v-if='i!=yhqTypeList.length-1'></el-radio>
                        </template>
                    </el-radio-group>
                    <div class="top10" v-if="form.yhqType=='满减'">
                        <p class="col999 top10">满减设置</p>
                        <div class="">
                            满<el-input v-model="form.a" class="left5" style="width: 80px"></el-input>
                            <span class="left20">减</span><el-input v-model="form.a" class="left5" style="width: 80px"></el-input>
                        </div>
                    </div>
                    <div class="top10" v-if="form.yhqType=='满赠'">
                        <p class="col999 top10">满赠设置</p>
                        <div class="">
                            满<el-input v-model="form.a" class="left5" style="width: 80px"></el-input>
                            <span class="left20">赠</span><el-input v-model="form.a" class="left5" style="width: 80px"></el-input>
                        </div>
                    </div>
                    <div class="top10" v-if="form.yhqType=='折扣'">
                        <p class="col999 top10">折扣设置(优惠价 = 原价 x 折率)</p>
                        <div class="">
                            折率<el-input v-model="form.a" class="left5" style="width: 80px"></el-input>
                        </div>
                    </div>
                    <div class="top10" v-if="form.yhqType=='抵扣时间'">
                        <p class="col999 top10">抵扣时间</p>
                        <div class="">
                            抵扣<el-input v-model="form.a" class="left5" style="width: 80px"></el-input>
                            <span class="left5">分钟</span>
                        </div>
                    </div>

                </el-form-item>
                <el-form-item label="发放数量" prop="a">
                    <el-input v-model="form.a" style="width: 40%"></el-input>
                    <span class="col999 left10">不填写为无限量</span>
                </el-form-item>
                <el-form-item label="每人限制领取" prop="a">
                    <el-input v-model="form.a" style="width: 40%"></el-input>
                    <span class="left5">张</span>
                    <span class="col999 left10">不填写为无限量</span>
                </el-form-item>
                <el-form-item label="有效期类型" prop="yxqlx">
                    <el-radio-group v-model="form.yxqlx">
                        <el-radio :label="item" v-for="item in yhqYxqlxList" :key="item"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="有效期时间" prop="data" v-if="form.yxqlx=='固定日期'">
                    <el-date-picker v-if="form.data"  value-format="yyyy-MM-dd" v-model="form.b" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="领取几日内有效" prop="data" v-if="form.yxqlx=='自领取起'">
                    <el-input v-model="form.a" style="width: 40%"></el-input>
                    <span class="left5">日</span>
                </el-form-item>
                <el-form-item label="备注" prop="a">
                    <el-input type="textarea" v-model="form.a"></el-input>
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
                yhqFwList: '',
                yhqYxqlxList: [],
                form: {
                    a: '',
                    b: '',
                    c: '',
                    yhqType: '满减',
                    yxqlx: '固定日期',
                    yhqFw: '通用',
                    data: '2019-05-06',
                    shop: [],
                },
                rules: {
                    a: [
                        { required: true, message: '请选择类型', trigger: 'change' },
                    ]
                },
                imageUrl: '',
                goodsCat:[],
                shopList: [],
                total: 0,
                pageSize: 10,
                pageNumber: 1
            }
        },
        components:{
            
        },
        watch:{
            
        },
        methods:{
            // 保存编辑
            saveEdit() {
                this.editVisible = false;
                this.$message.success(`修改第 ${this.idx+1} 行成功`);
                if(this.tableData[this.idx].id === this.id){
                    this.$set(this.tableData, this.idx, this.form);
                }else{
                    for(let i = 0; i < this.tableData.length; i++){
                        if(this.tableData[i].id === this.id){
                            this.$set(this.tableData, i, this.form);
                            return ;
                        }
                    }
                }
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
            
            // 员工详情
            handleEdit(index, row) {
                if(row){
                    this.idx = index;
                    this.id = row.id;
                    // this.form = row;
                }else{
                    this.idx = '-1';
                    this.id = '';
                    this.imageUrl = '';
                    // this.form = {
                    //     a: '',
                    //     b: '',
                    //     c: '',
                    // }
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
                let parmas = {
                    id: this.id
                }
                couponService.couponManagerDelete(parmas).then((res)=>{
                    this.$message.success('删除成功');
                    this.delVisible = false;
                    t.getCouponManagerList();
                })
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

            t.$commonService.getShopList().then((res)=>{
                t.shopList = res
            })
            t.yhqTypeList = t.$GD.yhqTypeList;
            t.yhqFwList = t.$GD.yhqFwList;
            t.yhqYxqlxList = t.$GD.yhqYxqlxList;

        }
    }
</script>
<style scoped>
    
</style>
