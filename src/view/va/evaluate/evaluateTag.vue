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
                <!-- <el-table-column type="index" label="序号"  width="50" align='center'></el-table-column> -->
                <el-table-column prop="evaluateLevel" label="评价等级名称" width="150"></el-table-column>
                <el-table-column prop="evaluateScore" label="对应分值" width="120"></el-table-column>
                <el-table-column prop="evaluateLabel" label="标签"></el-table-column>
                <el-table-column label="操作" width="150" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handle1(scope.$index, scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>

        </div>
        <el-dialog :title="idx==-1?'新增':'修改'" :visible.sync="editVisible" width="500px">
            <el-form ref="form" :model="form" :rules="rules" label-width="120px">
                <el-form-item label="评价等级名称" prop="evaluateLevel">
                    <el-input v-model="form.evaluateLevel"></el-input>
                </el-form-item>
                <!-- <el-form-item label="分值" prop="a">
                    <el-input v-model="form.a" style="width: 80px" placeholder="分"></el-input>
                </el-form-item> -->
                <el-form-item label="评价标签">
                    <el-tag :key="tag" v-for="tag in form.evaluateLabel" closable :disable-transitions="false" @close="handleClose(tag)" class="right5">
                    {{tag}}
                    </el-tag>
                    <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="mini" @keyup.enter.native="handleInputConfirm"
                    @blur="handleInputConfirm">
                    </el-input>
                    <el-button v-else class="button-new-tag" size="mini" @click="showInput">+ 新增标签</el-button>
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
    import {evaluateService} from '../../../service/evaluate';
    const Form = {
        id: '',
        evaluateScore: '',
        evaluateLevel: '',
        evaluateLabel: ''
    }
    export default {
        data() {
            return {
                list: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                is_search: false,
                form: {
                    
                },
                rules: {
                    evaluateLevel: [
                        { required: true, message: '请输入', trigger: 'change' },
                    ]
                },
                idx: -1,
                id: -1,
                pjflList: [],
                editVisible: false,
                inputVisible: false,
                inputValue: ''
            }
        },
        components:{
            
        },
        methods:{
            getlist(){
                const t = this;
                evaluateService.getLabList({}).then((res)=>{
                    t.list = res;
                });

            },
            handleClose(tag) {
                this.form.evaluateLabel.splice(this.form.evaluateLabel.indexOf(tag), 1);
            },
            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.form.evaluateLabel.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
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
                        params.evaluateLabel = params.evaluateLabel.join(',')
                        console.log(params);
                        evaluateService.saveEdit(params).then(()=>{
                            t.getlist();
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
                
                
            },
            handle1(index, row) {
                if(row){
                    this.idx = index;
                    this.id = row.id;
                    this.form = JSON.parse(JSON.stringify(row));
                    this.form.evaluateLabel = this.form.evaluateLabel.split(',')
                }else{
                    this.idx = '-1';
                    this.id = '';
                    this.form = JSON.parse(JSON.stringify(Form));
                    
                }
                
                this.editVisible = true;
            },
            radioChange(){
                const t = this;
                console.log(t.neirong)
            },
            moreSeach(){
                const t = this;
                if(t.showMore){
                    t.showMore = false
                }else{
                    t.showMore = true
                }
            },
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            search() {
                this.is_search = true;
            },

        },
        mounted(){
            const t = this;
            t.getlist();
            t.xmflList = t.$GD.xmflList;
            t.pjflList = t.$GD.pjflList;

        }
    }
</script>
<style scoped>
.button-new-tag {
    margin-left: 5px;
    height: 24px;
    line-height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}
.input-new-tag {
    width: 90px;
    margin-left: 5px;
    vertical-align: bottom;
}
</style>
