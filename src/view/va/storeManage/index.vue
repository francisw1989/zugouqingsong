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
                <el-input v-model="name" placeholder="输入门店名称" class="handle-input"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="search" class="left10">搜索</el-button>
                <el-button type="primary" icon="el-icon-circle-plus-outline" class="handle-del right" @click="handle2">新增</el-button>
            </div>
            <el-table :data="list"  border class="table top10" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="index" label="序号"  width="50"  align='center'></el-table-column>
                <el-table-column prop="name" label="名称" width="150"></el-table-column>
                <el-table-column prop="detailAddress" label="位置"></el-table-column>
                <el-table-column prop="phoneNum" label="电话"></el-table-column>
                <el-table-column prop="openingDate" label="开业日期"></el-table-column>
                <el-table-column prop="maxPeopleNum" label="技师数量"></el-table-column>
                <el-table-column prop="area" label="面积"></el-table-column>
                <el-table-column prop="rent" label="租金(万元/年)"></el-table-column>
                <el-table-column prop="shopowner" label="店长"></el-table-column>
                <el-table-column label="操作" width="330" align="center">
                    <template slot-scope="scope">
                        <el-button  size="mini" @click="handle1(scope.$index, scope.row)">查看</el-button>
                        <el-button  size="mini" @click="handle2(scope.$index, scope.row)">编辑</el-button>
                        <el-button  size="mini" @click="handle4(scope.$index, scope.row)">推荐</el-button>
                        <el-button  size="mini" type="danger" @click="handle3(scope.$index, scope.row)">关闭</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :page-size='pageSize' :total="total">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog :title="idx==-1?'新增':'编辑'" :visible.sync="editVisible" width="600px">
            <el-form ref="form" :model="form"  :rules="rules"   label-width="100px">
                <div class="clearfix">
                    <el-form-item label="名称" prop="name" style="width: 50%" class="left">
                        <el-input v-model="form.name" placeholder="输入门店名称"></el-input>
                    </el-form-item>
                    <el-form-item label="开业日期" prop="openingDate" style="width: 50%"  class="left">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.openingDate" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </div>
                <div class="clearfix">
                    <el-form-item label="电话" prop="phoneNum" style="width: 50%" class="left">
                        <el-input v-model="form.phoneNum" placeholder="输入门店电话"></el-input>
                    </el-form-item>
                    <el-form-item label="面积" prop="area" style="width: 50%"  class="left">
                        <el-input v-model="form.area" placeholder="输入面积"></el-input>
                    </el-form-item>
                </div>
                <div class="clearfix">
                    <el-form-item label="店长" style="width: 50%" class="left">
                        <el-input v-model="form.shopowner" placeholder="店长姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="租金" prop="rent" style="width: 50%"  class="left">
                        <el-input v-model="form.rent" placeholder="租金(元/年)"></el-input>
                    </el-form-item>
                </div>
                <div class="clearfix">
                    <el-form-item label="店长手机" style="width: 50%" class="left">
                        <el-input v-model="form.shopownerPhoneNum" placeholder="联系电话"></el-input>
                    </el-form-item>
                    <el-form-item label="物业" style="width: 50%"  class="left">
                        <el-input v-model="form.propertyCosts" placeholder="租金(元/年/平)"></el-input>
                    </el-form-item>
                </div>
                <div class="clearfix">
                    <el-form-item label="营业时间" style="width: 50%" class="left">
                        <el-time-select style="width: 100%" v-model="form.openStartTime" :picker-options="{start: '08:30',step: '00:30',end: '18:30'}" placeholder="开始时间"></el-time-select>
                        <el-time-select class="top10" style="width: 100%" v-model="form.openEndTime" :picker-options="{start: '12:00',step: '00:30',end: '24:00'}" placeholder="结束时间"></el-time-select>
                    </el-form-item>
                    <el-form-item label="门店标签" style="width: 50%" class="left">
                        <el-input v-model="form.tags" placeholder="英文逗号','隔开"></el-input>
                    </el-form-item>
                </div>
                <div class="clearfix">
                    <el-form-item label="门店照片" prop="imgs">
                        <el-upload
                        :file-list='form.imgListShow'
                        :auto-upload='false'
                        action=""
                        :on-change="getFile"
                        list-type="picture-card"
                        :before-remove="beforeRemove">
                        <i class="el-icon-plus"></i>
                        </el-upload>
                    </el-form-item>
                </div>
                <div class="clearfix">
                    <el-form-item label="详细地址" prop="detailAddress">
                        <div class="clearfix">
                            <el-input v-model="form.detailAddress"  placeholder="请输入详细地址" class="left" style="width: 80%"></el-input>
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
                <el-button type="primary" @click="deleteRow()">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 查看 -->
        <el-dialog title="门店详情" :visible.sync="viewVisible" width="40%">
            <StoreDetail :row='row' :info='info'></StoreDetail>
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
    const Form = {
        id: '',
        name: '',
        openingDate: '',
        phoneNum: '',
        area: '',
        shopowner: '',
        rent: '',
        shopownerPhoneNum: '',
        propertyCosts: '',
        x:'',
        y:'',
        imgs: '',
        tags:'',
        detailAddress: '',
        openStartTime: '',
        openEndTime: ''
    }
    export default {
        data() {
            var imgListShowCheck = (rule, value, callback) => {
                if (!value.length) {
                    callback(new Error('请上传门店照片'));
                } else {
                    callback();
                }
            };
            return {
                list: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                name: '',
                del_list: [],
                is_search: false,
                editVisible: false,
                delVisible: false,
                jwd: '',
                
                form: JSON.parse(JSON.stringify(Form)),
                rules: {
                    name: [
                        { required: true, message: '请输入', trigger: 'blur' },
                    ],
                    openingDate: [
                        { required: true, message: '请选择', trigger: 'blur' },
                    ],
                    area: [
                        { required: true, message: '请输入', trigger: 'blur' },
                    ],
                    shopowner: [
                        { required: true, message: '请输入', trigger: 'blur' },
                    ],
                    rent: [
                        { required: true, message: '请输入', trigger: 'blur' },
                    ],
                    shopownerPhoneNum: [
                        { required: true, message: '请输入', trigger: 'blur' },
                    ],
                    imgs: [
                        { required: true, message: '请上传门店照片' },
                    ],
                    imgListShow: [
                        { validator: imgListShowCheck },
                    ],
                    detailAddress: [
                        { required: true, message: '请输入地址或者点击地图', trigger: 'blur' },
                    ],
                },
                idx: -1,
                id: -1,
                row: {},
                dialogImageUrl: '',
                pt: '',
                viewVisible: false,
                dialogVisible: false,
                total: 0,
                pageSize: 10,
                pageNumber: 1,
                info: {}
            }
        },
        components: {
            StoreDetail
        },
        computed:{
            
        },
        methods:{
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
                console.log(t.form.imgListShow)
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
                this.pageNumber = val;
                this.getList();
            },
            search() {
                // this.is_search = true;
                const t = this;
                t.getList();
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
                let parmas = {
                    id: this.id
                }
                storeService.getData(parmas).then((res)=>{
                    t.info = res;
                })
            },
            
            handle2(index, row) {
                const t = this;
                if(row){
                    // 编辑
                    t.idx = index;
                    t.row = row;
                    t.form = t.row;
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
                    t.jwd = '';
                    t.form = JSON.parse(JSON.stringify(Form));
                    t.form.imgListShow = [];
                }
                setTimeout(() => {
                    t.initMap();
                }, 100);
                t.viewVisible = false;
                t.editVisible = true;
            },
            handle3(index, row){
                const t = this;
                this.idx = index;
                this.id = row.id;
                this.row = row;
                t.delVisible = true;
            },
            handle4(index, row){

            },
             // 保存编辑                
            saveEdit(form) {
                const t = this;
                t.form.imgs = t.form.imgListShow.map((v)=>{
                    return v.url
                }).join(',');
                t.$refs[form].validate((valid) => {
                    if (valid) {
                        let params = {};
                        t.editVisible = false;
                        for(let key in Form){
                            params[key] = t.form[key]
                        }
                        debugger
                        if(t.idx == '-1'){
                            storeService.add(params).then((res)=>{
                                t.getList()
                            })
                        }else{
                            storeService.edit(params).then((res)=>{
                                t.getList()
                            })
                        }
                        

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            // 确定删除
            deleteRow(){
                const t = this;
                let parmas = {
                    id: this.id
                }
                storeService.delete(parmas).then((res)=>{
                    this.$message.success('删除成功');
                    this.delVisible = false;
                    t.getList();
                })
            },
            markerDrag(){
                const t = this;
                t.marker.enableDragging();
                    //标注拖拽后的位置
                t.marker.addEventListener("dragend", function (e) {
                        // alert("当前位置：" + e.point.lng + ", " + e.point.lat);
                        t.form.x = e.point.lat;
                        t.form.y =  e.point.lng;
                        t.geoc.getLocation(e.point, function(rs){
                            var addComp = rs.address;
                            t.form.detailAddress = addComp;
                            t.jwd = t.form.x + "," + t.form.y;
                        });
                });
            },
            searchByStationName() {
                const t = this;
                let loading = t.$Loading.service({
                    text: 'loading'
                });
                var keyword = t.form.detailAddress;
                t.localSearch.setSearchCompleteCallback(function (searchResult) {
                        var poi = searchResult.getPoi(0);
                        t.form.x = poi.point.lat;
                        t.form.y = poi.point.lng;
                        t.jwd = t.form.x + "," + t.form.y;
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
                let point = '南京';
                if(t.row){
                    point = new BMap.Point(t.row.y, t.row.x)
                }
                var myIcon = new BMap.Icon(img, new BMap.Size(100,100));
                t.marker = new BMap.Marker(point,{icon:myIcon});  // 创建标注
                t.map.addOverlay(t.marker);              // 将标注添加到地图中
                t.map.centerAndZoom(point, 13);


                // var point = new BMap.Point(120.391655,36.067588);  // 创建点坐标
                // t.map.centerAndZoom(point, 15);


                t.map.addControl(new BMap.NavigationControl());
                t.map.enableScrollWheelZoom(true);
                t.geoc = new BMap.Geocoder();
                t.localSearch = new BMap.LocalSearch(t.map);
                t.localSearch.enableAutoViewport();
                t.map.addEventListener("click",function(e){
                    t.map.clearOverlays();                   
                    console.log(e);
                    t.form.x = e.point.lat;
                    t.form.y = e.point.lng;
                    //创建标注位置
                    var myIcon = new BMap.Icon(img, new BMap.Size(100,100));
                    t.marker = new BMap.Marker(e.point,{icon:myIcon});  // 创建标注
                    t.map.addOverlay(t.marker);              // 将标注添加到地图中
                    t.markerDrag();
                    //alert(e.point.lng + "," + e.point.lat);
                    t.geoc.getLocation(e.point, function(rs){
                        var addComp = rs.address;
                        t.form.detailAddress = addComp;
                        t.jwd = t.form.x + "," + t.form.y;
                    });
                });
            },
            getList(){
                const t = this;
                t.list = [];
                let params = {
                    pageSize: t.pageSize,
                    pageNumber: t.pageNumber,
                    name: t.name
                }
                storeService.list(params).then((res)=>{
                    t.list = res.records;
                    t.total = res.total
                })
            }
        },
        mounted(){
            const t = this;
            t.getList();


        }
    }
</script>
<style scoped>
    
</style>
