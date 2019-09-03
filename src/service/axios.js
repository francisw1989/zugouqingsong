import axios from 'axios';
import { Loading } from 'element-ui';
axios.interceptors.request.use(function (config) {
    // 在发起请求请做一些业务处理
    
    return config;
}, function (error) {
// 对请求失败做处理
    return Promise.reject(error);
});

let $axios = (data)=>{
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
                Accept: "application/json;charset=UTF-8"
            },
            params: data.params
        }).then(res => {
            resolve(res.data)
            loading && loading.close();
        }).catch((res)=>{
            reject(res.response.data)
            loading && loading.close();
        });
    })
    return p
    
}

export { $axios }