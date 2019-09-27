import {$axios} from './axios.js';
let evaluateService = {
    // /api/v1/orderEvaluate/list
    // 订单评价列表查询
    list(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'get',
                url: '/api/v1/orderEvaluate/list',
                params: params,
                loading: true,
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },

    
}
export { evaluateService }