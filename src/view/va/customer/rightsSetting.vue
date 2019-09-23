<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item> {{this.$route.meta.title}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">

            <el-table :data="list"  border class="table" ref="multipleTable">
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                <!-- <el-table-column type="index" label="编号"  width="50" align='center'></el-table-column> -->
                <el-table-column prop="memberLevel" label="会员等级" width=""></el-table-column>
                <el-table-column prop="memberLevelName" label="等级名称" width=""></el-table-column>
                <el-table-column prop="amountCondition" label="金额条件" width=""></el-table-column>
                <el-table-column prop="frequencyCondition" label="频次条件" width=""></el-table-column>
                <el-table-column prop="interestsContent" label="权益内容" width=""></el-table-column>
                <el-table-column label="操作" width="100px" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :page-size='pageSize' :total="total">
                </el-pagination>
            </div>
        </div>

        <!-- 新增 -->
       <el-dialog title="会员权益" :visible.sync="editVisible" width="400px">
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <el-form-item label="会员等级">
                    <el-input v-model="form.memberLevel"></el-input>
                </el-form-item>
                <el-form-item label="等级名称">
                    <el-input v-model="form.memberLevelName"></el-input>
                </el-form-item>
                <el-form-item label="金额条件">
                    <el-input v-model="form.amountCondition"></el-input>
                </el-form-item>
                <el-form-item label="频次名称">
                    <el-input v-model="form.frequencyCondition"></el-input>
                </el-form-item>
                <el-form-item label="权益内容">
                    <el-input v-model="form.interestsContent" type="textarea"></el-input>
                </el-form-item>
                
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit('form')">保 存</el-button>
            </span>
        </el-dialog>


    </div>
</template>
<script>
    import bus from '../../../bus';
    import {customerService} from '../../../service/customer';
    const Form = {
        id: '',
        memberLevel: '',
        memberLevelName: '',
        amountCondition: '',
        frequencyCondition: '',
        interestsContent: '',
    }
    export default {
        data() {
            return {
                levelList: ['普通会员','一星会员','二星会员','三星会员'],
                list: [],
                form: JSON.parse(JSON.stringify(Form)),
                rules: {},
                idx: -1,
                id: -1,
                editVisible: false,
                total: 0,
                pageSize: 10,
                pageNumber: 1,
            }
        },
        components:{
            
        },
        methods:{
            handleEdit(index, row){
                this.idx = index;
                this.id = row.id;
                this.form = row;
                this.editVisible = true;
            },
            // 保存编辑
            saveEdit(form) {
                const t = this;
                t.$refs[form].validate((valid) => {
                    if (valid) {
                        let params = {};
                        t.editVisible = false;
                        for(let key in Form){
                            params[key] = t.form[key]
                        }
                        customerService.memberInterestsEdit(params).then((res)=>{
                                t.shiftsSettingList()
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
                
            },
            getMemberInterestsList(){
                const t = this;
                t.list = [];
                let params = {
                    pageSize: t.pageSize,
                    pageNumber: t.pageNumber,
                }
                customerService.getMemberInterestsList(params).then((res)=>{
                    t.list = res;
                    t.total = res.total
                })
            }

        },
        mounted(){
            const t = this;
            t.getMemberInterestsList();
        }
    }
</script>
<style scoped>

</style>
