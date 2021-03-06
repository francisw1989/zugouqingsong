import axios from 'axios';
import { Loading, Message  } from 'element-ui';
axios.interceptors.request.use(function (config) {
    // 在发起请求请做一些业务处理
    
    return config;
}, function (error) {
// 对请求失败做处理
    return Promise.reject(error);
});

let $axios = ({method = 'get', params = {}, url = '', loading=true, loadingText='loading...'}, otherData)=>{
    if((window.location.href.includes('vb') || window.location.href.includes('cashier')) && localStorage.userInfo){
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
                Message({
                    message: '系统错误',
                    type: 'warning'
                })
            }else{
                resolve(res.data)
            }
            
        }).catch((res)=>{
            _loading && _loading.close();
            // 1001 登录失效
            if(res.response.data.code == 1102){
                localStorage.removeItem('token');
                if(url.indexOf('login')<0){
                    window.location.reload();
                }
                if(res.response.data.msg){
                    Message({
                        message: res.response.data.msg,
                        type: 'warning'
                    })
                }
            }else{
                typeof(oLoading)!='undefined' && oLoading && oLoading.close();
                reject(res.response.data)
                if(res.response.data.msg){
                    Message({
                        message: res.response.data.msg,
                        type: 'warning'
                    })
                }else{
                    Message({
                        message: '系统错误',
                        type: 'warning'
                    })
                }
            }
            
            
            
        });
    })
    return p
    
}

export { $axios }