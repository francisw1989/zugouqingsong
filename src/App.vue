<template>
    <div id="app">
        <router-view></router-view>
        <div id="audioWap">
           
        </div>
    </div>
</template>
<script>
import Bus from './bus';
export default {
    data(){
        return {
            eleList: [],
            index: -1
        }
    },
    watch:{
        index(){
            const t = this;
            
            
        }
    },
    methods: {
        innerHtml(){
            const t = this;
            let $eleWap = document.querySelector('#audioWap');
            Bus.$on('currentMessage', currentMessage => { 
                t.index ++ ;
                let html = 
                `
                    <audio id="message${t.index}">
                        <source src="http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=5&text=${currentMessage}" type="audio/mpeg">
                        <embed height="0" width="0" src="http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=5&text=${currentMessage}">
                    </audio>
                `
                $eleWap.innerHTML += html;
                
                t.eleList.push(document.querySelector('#message'+t.index))
                
            });
        },
        play(){
            const t = this;
            let _do = ()=>{
                window.meaasgeInter = setInterval(() => {
                    if(t.eleList.length){
                        clearInterval(meaasgeInter)
                        t.eleList[0].play();
                        t.eleList[0].addEventListener('ended',()=>{
                            console.log(document.querySelector('#audioWap').children[0])
                            document.querySelector('#audioWap').removeChild(document.querySelector('#audioWap').children[0]);
                            t.eleList.shift();
                            _do();
                        }, false);
                    }
                }, 1000);
            }
            _do();
            
        }
    },
    mounted(){
        const t = this;
        document.title = t.$GD.sysName;
        t.innerHtml();
        t.play();
    }
}
</script>

<style>
    @import "./assets/css/main.css";
    /* @import "./assets/css/color-dark.css";     */
    @import "./assets/css/theme-green/color-green.css"; 
</style>