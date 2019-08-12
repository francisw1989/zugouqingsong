<template>
    <div id="zugou">
        <el-row :gutter='20'>
            <el-col :span="9">
                <el-card shadow="hover" class="center">
                    <div slot="header" class="clearfix">
                        <span>今日营收数据（元）</span>
                    </div>
                    <el-row class="infoWap">
                        <el-col :span="8">
                            <p>收入</p>
                            <p>6321.00</p>
                        </el-col>
                        <el-col :span="8">
                            <p>今日支出</p>
                            <p>6321.00</p>
                        </el-col>
                        <el-col :span="8">
                            <p>今日退款</p>
                            <p>6321.00</p>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
            <el-col :span="9">
                <el-card shadow="hover" class="center">
                    <div slot="header" class="clearfix">
                        <span>今日经营数据</span>
                    </div>
                    <el-row class="infoWap">
                        <el-col :span="8">
                            <p>收入</p>
                            <p>6321.00</p>
                        </el-col>
                        <el-col :span="8">
                            <p>今日支出</p>
                            <p>6321.00</p>
                        </el-col>
                        <el-col :span="8">
                            <p>今日退款</p>
                            <p>6321.00</p>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="hover" class="center">
                    <div slot="header" class="clearfix">
                        <span>综合数据</span>
                    </div>
                    <el-row class="infoWap">
                        <el-col :span="12">
                            <p>收入</p>
                            <p>6321.00</p>
                        </el-col>
                        <el-col :span="12">
                            <p>今日支出</p>
                            <p>6321.00</p>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
        <el-card shadow="hover" class="top20">
            <div slot="header" class="clearfix">
                <span>陆琴门店分布情况</span>
            </div>
            <div id="map" style="width: 100%; height: 500px"></div>
            
        </el-card>
    </div>
</template>
<script>
    var img = require('../../../assets/img/img.jpg');
    import bus from '../../../bus';
    export default {
        data() {
            return {
                markerList: [
                    [118.797863,32.061829, '中央门店', '11,11,11'],
                    [118.80,32.10, '中山南路点', '11,11,11'],
                    [118.81,32.15, '江北店', '11,11,11'],
                    [118.82,32.17, '湖南路店', '11,11,11'],
                    [118.83,32.20, '丹凤街店', '11,11,11'],
                ]
            }
        },
        computed:{
            username(){
                let username = localStorage.getItem('ms_username');
                return username ? username : this.name;
            }
        },
        methods:{
            // 创建图标对象
            addMarker(point, title, detail){
                const t = this; 
                var myIcon = new BMap.Icon(img, new BMap.Size(23, 25), {    
                    anchor: new BMap.Size(10, 25),    
                });    
                var marker = new BMap.Marker(point, {icon: myIcon});    
                t.map.addOverlay(marker);

                var label = new BMap.Label(title,{offset:new BMap.Size(20,-10)});
                marker.setLabel(label);

                var opts = {
                    width : 100,     // 信息窗口宽度
                    height: 100,     // 信息窗口高度
                    title : title , // 信息窗口标题
                    enableMessage:true,//设置允许信息窗发送短息
                    message: detail
                }
                var infoWindow = new BMap.InfoWindow(detail, opts);  
                marker.addEventListener("click", function(){
                    t.map.openInfoWindow(infoWindow, point); //开启信息窗口
                }); 
            },
            initMap(){
                const t = this;
                let map = new BMap.Map("map");// 创建地图实例  
                t.map = map;
                // 创建中心点坐标
                t.map.centerAndZoom('南京', 13);
                t.map.enableScrollWheelZoom(true);  
                t.markerList.forEach((v, i)=>{
                    let detail = '当前顾客:'+v[3].split(',')[0]+'<br/>预约顾客:'+v[3].split(',')[0]+'<br/>当班员工:'+v[3].split(',')[0];
                    t.addMarker(new BMap.Point(v[0],v[1]), v[2], detail)
                })
            }
        },
        mounted(){
            const t = this;
            t.initMap();
        }
    }
</script>
<style scoped>
    .infoWap .el-col{ border-right: 1px solid #ddd;}
    .infoWap .el-col:last-child{ border: none}
</style>
