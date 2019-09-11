<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item> {{this.$route.meta.title}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-table :data="list"  border class="table top20" ref="multipleTable">
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                <el-table-column type="index" label="编号"  width="50" align='center'></el-table-column>
                <el-table-column prop="a" label="班次名称" sortable width=""></el-table-column>
                <el-table-column prop="b" label="班次时间" width=""></el-table-column>
                <el-table-column label="操作" width="100px" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="edit(scope.$index, scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>

        </div>

        <!-- 新增 -->
       <el-dialog :title="idx==-1?'新增':'编辑'" :visible.sync="editVisible" width="600px">
            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                <el-form-item label="班次名称">
                    <el-input v-model="form.a" placeholder="" style="width: 80%;"></el-input>
                </el-form-item>
                <el-form-item label="班次时间">
                    <el-time-select style="width: 130px;" v-model="form.timeStart" :picker-options="{start: '08:30',step: '00:15',end: '24:00'}" placeholder="开始时间"></el-time-select>
                    <el-time-select style="width: 130px;" class="left10" v-model="form.timeEnd" :picker-options="{start: '08:30',step: '00:15',end: '24:00'}" placeholder="结束时间"></el-time-select>
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
    import {staffService} from '../../../service/staff';
    import {orderService} from '../../../service/order';

    export default {
        data() {
            return {
                list: [],
                form: {
                    a: '',
                    b: '',
                    c: '',
                    timeStart: '',
                    timeEnd: '',
                },
                rules: {
                    a: [
                        { required: true, message: '请选择类型', trigger: 'change' },
                    ]
                },
                idx: -1,
                id: -1,
                editVisible: false
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

            edit(index, row){
                this.idx = index;
                this.id = row.id;
                this.form = row;
                console.log(this.form)
                this.editVisible = true;
            },

            // 员工详情
            handle1(index, row) {
                this.idx = index;
                this.id = row.id;
                this.viewVisible = true;
            },
        },
        mounted(){
            const t = this;

            // 岗位列表
            t.$commonService.getPbgzList().then((res)=>{
                for(const v of res){
                    v.timeStart = v.b.split('-')[0];
                    v.timeEnd = v.b.split('-')[1];
                }
                t.list = res;
            });

        }
    }
</script>
<style scoped>
    
</style>
