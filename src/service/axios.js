import axios from 'axios';
import { Loading } from 'element-ui';
axios.interceptors.request.use(function (config) {
    // 在发起请求请做一些业务处理
    
    return config;
}, function (error) {
// 对请求失败做处理
    return Promise.reject(error);
});

let $axios = ({method = 'get', params = {}, url = '', loading=true, loadingText='loading...'}, otherData)=>{
    if(localStorage.sysRoute=='vb' && localStorage.userInfo){
        let userInfo = JSON.parse(localStorage.userInfo);
        params.storeId = userInfo.storesId;
        params.storesId = userInfo.storesId;
    }
    let p = new Promise((resolve, reject)=>{
        let  _loading;
        if(loading){
            _loading = Loading.service({
                text: loadingText
            });
        }
        axios({
            method: method,
            url: url,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json;charset=UTF-8",
                Authorization: localStorage.token
            },
            params: params,
            data: otherData
        }).then(res => {
            _loading && _loading.close();
            if(res.code){
                alert('系统错误')
            }else{
                resolve(res.data)
            }
            
        }).catch((res)=>{
            _loading && _loading.close();
            // 1001 登录失效
            if(res.response.data.code == 1102){
                if(res.response.data.msg){
                    alert(res.response.data.msg)
                }
                localStorage.removeItem('token');
                if(url.indexOf('login')<0){
                    window.location.reload();
                }
                
            }else{
                typeof(oLoading)!='undefined' && oLoading && oLoading.close();
                reject(res.response.data)
                if(res.response.data.msg){
                    alert(res.response.data.msg)
                }else{
                    alert('系统错误')
                }
            }
            
            
            
        });
    })
    return p
    
}

export { $axios }