<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    mounted(){
        const t = this;
        document.title = t.$GD.sysName
    }
}
</script>

<style>
    @import "./assets/css/main.css";
    /* @import "./assets/css/color-dark.css";     */
    @import "./assets/css/theme-green/color-green.css"; 
</style>