<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item> {{this.$route.meta.title}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="select_word" placeholder="输入门店名称" class="handle-input"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="search" class="left10">搜索</el-button>
                <el-button type="primary" icon="el-icon-circle-plus-outline" class="handle-del right" @click="handle2">新增</el-button>
            </div>
            <el-table :data="list"  border class="table top10" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="index" label="序号"  width="50"  align='center'></el-table-column>
                <el-table-column prop="a" label="名称" width="150"></el-table-column>
                <el-table-column prop="b" label="位置" width="120"></el-table-column>
                <el-table-column prop="c" label="电话"></el-table-column>
                <el-table-column prop="c" label="开业日期"></el-table-column>
                <el-table-column prop="c" label="技师数量"></el-table-column>
                <el-table-column prop="c" label="面积"></el-table-column>
                <el-table-column prop="c" label="租金(万元/年)"></el-table-column>
                <el-table-column prop="c" label="店长"></el-table-column>
                <el-table-column label="操作" width="330" align="center">
                    <template slot-scope="scope">
                        <el-button  size="mini" @click="handle1(scope.$index, scope.row)">查看</el-button>
                        <el-button  size="mini" @click="handle2(scope.$index, scope.row)">编辑</el-button>
                        <el-button  size="mini" @click="handle4(scope.$index, scope.row)">推荐至banner</el-button>
                        <el-button  size="mini" type="danger" @click="handle3(scope.$index, scope.row)">关闭</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog :title="idx==-1?'新增':'编辑'" :visible.sync="editVisible" width="40%">
            <el-form ref="form" :model="form"  :rules="rules"   label-width="100px">
                <div class="clearfix">
                    <el-form-item label="名称" prop="a" style="width: 50%" class="left">
                        <el-input v-model="form.a" placeholder="输入门店名称"></el-input>
                    </el-form-item>
                    <el-form-item label="开业日期" prop="a" style="width: 50%"  class="left">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.a" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </div>
                <div class="clearfix">
                    <el-form-item label="电话" prop="a" style="width: 50%" class="left">
                        <el-input v-model="form.a" placeholder="输入门店电话"></el-input>
                    </el-form-item>
                    <el-form-item label="面积" prop="a" style="width: 50%"  class="left">
                        <el-input v-model="form.a" placeholder="输入面积"></el-input>
                    </el-form-item>
                </div>
                <div class="clearfix">
                    <el-form-item label="店长" prop="a" style="width: 50%" class="left">
                        <el-input v-model="form.a" placeholder="店长姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="租金" prop="a" style="width: 50%"  class="left">
                        <el-input v-model="form.a" placeholder="租金(元/年)"></el-input>
                    </el-form-item>
                </div>
                <div class="clearfix">
                    <el-form-item label="店长手机" prop="a" style="width: 50%" class="left">
                        <el-input v-model="form.a" placeholder="联系电话"></el-input>
                    </el-form-item>
                    <el-form-item label="物业" prop="a" style="width: 50%"  class="left">
                        <el-input v-model="form.a" placeholder="租金(元/年/平)"></el-input>
                    </el-form-item>
                </div>
                <div class="clearfix">
                    <el-form-item label="门店标签" prop="a" style="width: 50%" class="left">
                        <el-input v-model="form.a" placeholder="英文逗号','隔开"></el-input>
                    </el-form-item>
                </div>
                <div class="clearfix">
                    <el-form-item label="门店照片" prop="a">
                        <el-upload
                        action="https://jsonplaceholder.typicode.com/posts/"
                        list-type="picture-card"
                        :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </el-form-item>
                </div>
                <div class="clearfix">
                    <el-form-item label="详细地址" prop="address">
                        <div class="clearfix">
                            <el-input v-model="form.address"  placeholder="请输入详细地址" class="left" style="width: 80%"></el-input>
                            <el-button size="small" class="left left10" @click="searchByStationName" type='primary'>搜索</el-button>
                        </div>
                        <p class="top5">地图定位  {{jwd}}</p>
                        <div style="height: 300px;" id="map" class="top10"></div>
                    </el-form-item>
                </div>
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
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 查看 -->
        <el-dialog title="门店详情" :visible.sync="viewVisible" width="40%">
            <StoreDetail></StoreDetail>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handle2(idx, row)">编 辑</el-button>
                <el-button type="primary" @click="viewVisible = false">关 闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import bus from '../../../bus';
    import {storeService} from '../../../service/store';
    import StoreDetail from './detail';
    var img = require('../../../assets/img/mark.png');
    export default {
        data() {
            return {
                list: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                editVisible: false,
                delVisible: false,
                jwd: '',
                form: {
                    a: '',
                    b: '',
                    c: '',
                    address: ''
                },
                rules: {
                    a: [
                        { required: true, message: '请选择类型', trigger: 'blur' },
                    ],
                    address: [
                        { required: true, message: '请选择类型', trigger: 'blur' },
                    ]
                },
                idx: -1,
                id: -1,
                row: {},
                dialogImageUrl: '',
                pt: '',
                viewVisible: false,
                dialogVisible: false
            }
        },
        components: {
            StoreDetail
        },
        computed:{
            
        },
        methods:{
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },

            delAll() {
                const length = this.multipleSelection.length;
                let str = '';
                this.del_list = this.del_list.concat(this.multipleSelection);
                console.log(this.multipleSelection)
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].a + ' ';
                }
                this.$message.error('删除了' + str);
                this.multipleSelection = [];
            },
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            search() {
                this.is_search = true;
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handlePublish(index, row){

            },

            handle1(index, row){
                const t = this;
                t.viewVisible = true;
                this.idx = index;
                this.id = row.id;
                this.row = row;
            },
            
            handle2(index, row) {
                const t = this;
                if(row){
                    // 编辑
                    t.idx = index;
                    t.id = row.id;
                    t.lng = row.lng || '';
                    t.lat =  row.lat || '';
                    t.jwd = row.jwd ||  '';
                    t.form = {
                        a: row.a,
                        b: row.b,
                        c: row.c,
                    }
                }else{
                    // 新增
                    t.idx = '-1';
                    t.id = '';
                    t.lng = '';
                    t.lat = '';
                    t.jwd = '';
                    t.form = {
                        a: '',
                        b: '',
                        c: '',
                    }
                    
                }
                setTimeout(() => {
                    t.initMap();
                }, 100);
                t.viewVisible = false;
                t.editVisible = true;
            },
            handle3(index, row){

            },
            handle4(index, row){

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
            // 确定删除
            deleteRow(){
                this.$message.success('删除成功');
                this.delVisible = false;
                if(this.list[this.idx].id === this.id){
                    this.list.splice(this.idx, 1);
                }else{
                    for(let i = 0; i < this.list.length; i++){
                        if(this.list[i].id === this.id){
                            this.list.splice(i, 1);
                            return ;
                        }
                    }
                }
            },
            markerDrag(){
                const t = this;
                t.marker.enableDragging();
                    //标注拖拽后的位置
                t.marker.addEventListener("dragend", function (e) {
                        // alert("当前位置：" + e.point.lng + ", " + e.point.lat);
                        t.lng = e.point.lng;
                        t.lat =  e.point.lat;
                        t.geoc.getLocation(e.point, function(rs){
                            var addComp = rs.address;
                            t.form.address = addComp;
                            t.jwd = t.lng + "," + t.lat;
                        });
                });
            },
            searchByStationName() {
                const t = this;
                let loading = t.$Loading.service({
                    text: 'loading'
                });
                var keyword = t.form.address;
                t.localSearch.setSearchCompleteCallback(function (searchResult) {
                        var poi = searchResult.getPoi(0);
                        t.lng=poi.point.lng;
                        t.lat=poi.point.lat;
                        t.jwd = t.lng + "," + t.lat;
                        t.map.centerAndZoom(poi.point, 15);
                        //创建标注位置
                        var myIcon = new BMap.Icon(img, new BMap.Size(100,100));
                        t.marker = new BMap.Marker(poi.point,{icon:myIcon});  // 创建标注
                        t.map.addOverlay(t.marker);              // 将标注添加到地图中
                        t.markerDrag();
                });
                t.localSearch.search(keyword);
                setTimeout(() => {
                    loading.close();
                }, 1000);
            },
            initMap(){
                const t = this;
                let map = new BMap.Map("map");// 创建地图实例  
                t.map = map;
                // 创建中心点坐标
                t.map.centerAndZoom('南京', 13);
                t.map.addControl(new BMap.NavigationControl());
                t.map.enableScrollWheelZoom(true);
                t.geoc = new BMap.Geocoder();
                t.localSearch = new BMap.LocalSearch(t.map);
                t.localSearch.enableAutoViewport();
                t.map.addEventListener("click",function(e){
                    t.map.clearOverlays();                   
                    console.log(e);
                    t.lng=e.point.lng;
                    t.lat=e.point.lat;
                    //创建标注位置
                    var myIcon = new BMap.Icon(img, new BMap.Size(100,100));
                    t.marker = new BMap.Marker(e.point,{icon:myIcon});  // 创建标注
                    t.map.addOverlay(t.marker);              // 将标注添加到地图中
                    t.markerDrag();
                    //alert(e.point.lng + "," + e.point.lat);
                    t.geoc.getLocation(e.point, function(rs){
                        var addComp = rs.address;
                        t.form.address = addComp;
                        t.jwd = t.lng + "," + t.lat;
                    });
                });
            }
        },
        mounted(){
            const t = this;
            
            t.$commonService.getShopList().then((res)=>{
                t.list = res;
            })
        }
    }
</script>
<style scoped>
    
</style>
