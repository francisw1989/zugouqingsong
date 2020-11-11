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
                <el-table-column prop="shiftsName" label="班次名称" sortable width=""></el-table-column>
                <el-table-column prop="shiftsTime" label="班次时间" width=""></el-table-column>
                <el-table-column label="操作" width="100px" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>

        </div>

        <!-- 新增 -->
       <el-dialog :title="idx==-1?'新增':'编辑'" :visible.sync="editVisible" width="600px">
            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                <el-form-item label="班次名称">
                    <el-input v-model="form.shiftsName" placeholder="" style="width: 80%;"></el-input>
                </el-form-item>
                <el-form-item label="班次时间">
                    <el-time-select style="width: 130px;" v-model="form.startTime" :picker-options="{start: '00:00',step: '00:30',end: '24:00'}" placeholder="开始时间"></el-time-select>
                    <el-time-select style="width: 130px;" class="left10" v-model="form.endTime" :picker-options="{start: '00:00',step: '00:30',end: '24:00'}" placeholder="结束时间"></el-time-select>
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
    const Form = {
        id: '',
        shiftsName: '',
        startTime: '',
        endTime: ''
    }
    export default {
        data() {
            return {
                list: [],
                form: JSON.parse(JSON.stringify(Form)),
                rules: {
                    shiftsName: [
                        { required: true, message: '请输入', trigger: 'change' },
                    ],
                    startTime: [
                        { required: true, message: '请选择', trigger: 'change' },
                    ],
                    endTime: [
                        { required: true, message: '请选择', trigger: 'change' },
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
						//判断上班时间是否小于下班时间
						if(params.startTime>params.endTime){
							console.log('上班时间不能大于下班时间!!');
							return false;
						}
						params.endTime=='24:00'?params.endTime = '23:59':params.endTime;
						
                        staffService.shiftsSettingEdit(params).then((res)=>{
                                t.shiftsSettingList()
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            shiftsSettingList(){
                const t = this;
                t.list = [];
                staffService.shiftsSettingList().then((res)=>{
                     for(const v of res){
                         v.shiftsTime=v.startTime+'-'+v.endTime;
                     }
                    t.list = res;
                })
            }
        },
        mounted(){
            const t = this;
            t.shiftsSettingList();
        }
    }
</script>
<style scoped>
    
</style>
