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
                <el-table-column prop="evaluateLevel" label="评价" width="150"></el-table-column>
                <el-table-column prop="evaluateScore" label="对应分值" width="120"></el-table-column>
                <el-table-column prop="evaluateLabel" label="标签"></el-table-column>
                <el-table-column label="操作" width="150" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handle1(scope.$index, scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>

        </div>
        <el-dialog :title="idx==-1?'新增优惠券':'修改优惠券'" :visible.sync="editVisible" width="500px">
            <el-form ref="form" :model="form" :rules="rules" label-width="120px">
                <el-form-item label="评价名称" prop="a">
                    <el-select v-model="form.pjfl" placeholder="">
                        <el-option v-for="item in pjflList" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-form-item label="分值" prop="a">
                    <el-input v-model="form.a" style="width: 80px" placeholder="分"></el-input>
                </el-form-item> -->
                <el-form-item label="评价标签">
                    <el-tag :key="tag" v-for="tag in form.tags" closable :disable-transitions="false" @close="handleClose(tag)" class="right5">
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
                    a: '',
                    b: '',
                    c: '',
                    tags: ['dsfsd']
                },
                rules: {
                    a: [
                        { required: true, message: '请选择类型', trigger: 'change' },
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
                this.form.tags.splice(this.form.tags.indexOf(tag), 1);
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
                    this.form.tags.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },
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
            handle1(index, row) {
                if(row){
                    this.idx = index;
                    this.id = row.id;
                    this.form = row;
                }else{
                    this.idx = '-1';
                    this.id = '';
                    this.form = {
                        a: '',
                        b: '',
                        c: '',
                        tags: []
                    }
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
