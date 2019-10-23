import axios from 'axios';
import { Loading } from 'element-ui';
axios.interceptors.request.use(function (config) {
    // 在发起请求请做一些业务处理
    
    return config;
}, function (error) {
// 对请求失败做处理
    return Promise.reject(error);
});

let $axios = (data, otherData)=>{
    if(localStorage.sysRoute=='vb' && localStorage.userInfo){
        let userInfo = JSON.parse(localStorage.userInfo);
        data.params.storeId = userInfo.storesId;
        data.params.storesId = userInfo.storesId;
    }
    let p = new Promise((resolve, reject)=>{
        let loading, loadingText = 'loading...';
        if(data.loadingText){
            loadingText = data.loadingText
        }
        if(data.loading){
            loading = Loading.service({
                text: loadingText
            });
        }
        axios({
            method: data.method,
            url: data.url,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json;charset=UTF-8",
                Authorization: localStorage.token
            },
            params: data.params,
            data: otherData
        }).then(res => {
            loading && loading.close();
            if(res.code){
                alert('系统错误')
            }else{
                resolve(res.data)
            }
            
        }).catch((res)=>{
            loading && loading.close();
            // 1001 登录失效
            if(res.response.data.code == 1001){
                localStorage.removeItem('token');
                window.location.reload();
            }
            oLoading && oLoading.close();
            reject(res.response.data)
            alert(res.response.data.msg)
            
            
        });
    })
    return p
    
}

export { $axios }