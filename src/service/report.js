import {$axios} from './axios.js';
import {commonService} from './common.js';
let orderService = {
    // 导出订单
    orderExport(params){
        if(localStorage.sysRoute=='vb' && localStorage.userInfo){
            let userInfo = JSON.parse(localStorage.userInfo);
            params.storeId = userInfo.storesId;
            params.storesId = userInfo.storesId;
        }
        window.open('/api/v1/order/export?' + Object.keys(params).map(function (key) {
            return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
        }).join("&"))
    },
    //获取订单列表
    getOrderList(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'get',
                url: '/api/v1/order/list',
                params: params,
                loading: true,
            }
            $axios(data).then((res)=>{
                for(const v of res.records){
                    v.payPrice = v.payPrice/100;
                }
                resolve(res)
            })
        })
        return p;
    }
}
export { orderService }