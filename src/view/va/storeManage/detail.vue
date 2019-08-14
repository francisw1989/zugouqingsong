<template>
    <el-row>
        <el-col :span="12">
            <p></p>
        </el-col>
        <el-col :span="12"></el-col>
    </el-row>
</template>
<script>
    import bus from '../../../bus';
    import {storeService} from '../../../service/store';
    export default {
        data() {
            return {
                
            }
        },
        computed:{
            
        },
        methods:{
            
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
