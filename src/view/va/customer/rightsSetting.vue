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
                <el-table-column prop="a" label="会员等级" width=""></el-table-column>
                <el-table-column prop="a" label="等级名称" width=""></el-table-column>
                <el-table-column prop="a" label="金额条件" width=""></el-table-column>
                <el-table-column prop="a" label="频次条件" width=""></el-table-column>
                <el-table-column prop="a" label="权益内容" width=""></el-table-column>
                <el-table-column label="操作" width="100px" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="edit(scope.$index, scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>

        </div>

        <!-- 新增 -->
       <el-dialog title="会员权益" :visible.sync="editVisible" width="400px">
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <el-form-item label="会员等级">
                    <el-input v-model="form.a"></el-input>
                </el-form-item>
                <el-form-item label="等级名称">
                    <el-input v-model="form.a"></el-input>
                </el-form-item>
                <el-form-item label="金额条件">
                    <el-input v-model="form.a"></el-input>
                </el-form-item>
                <el-form-item label="频次名称">
                    <el-input v-model="form.a"></el-input>
                </el-form-item>
                <el-form-item label="权益内容">
                    <el-input v-model="form.a" type="textarea"></el-input>
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

    export default {
        data() {
            return {
                list: [],
                form: {
                    a: '',
                    b: '',
                    c: ''
                },
                rules: {
                    a: [
                        { required: true, message: '请选择类型', trigger: 'change' },
                    ]
                },
                idx: -1,
                id: -1,
                editVisible: false,
                imageUrl: ''
            }
        },
        components:{
            
        },
        methods:{

            upImgChange(res){
                this.imageUrl = URL.createObjectURL(res.raw);
            },
            upImgSuccess(res, file) {
                debugger
                this.imageUrl = URL.createObjectURL(file.raw);
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
                if(row){
                    this.idx = index;
                    this.id = row.id;
                    this.form = row;
                }else{
                    this.idx = -1000;
                    this.id = '';
                    this.form = {
                        a: '',
                        b: '',
                        c: ''
                    };
                }
                
                console.log(this.form)
                this.editVisible = true;
            },


        },
        mounted(){
            const t = this;

            t.list = t.$GD.rightsList;
        }
    }
</script>
<style scoped>

</style>
