import {$axios} from './axios.js';
let evaluateService = {
    //     POST
    // /api/v1/evaluationLabel/
    // 新增标签
    add(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'POST',
                url: '/api/v1/evaluationLabel/',
                params: params,
                loading: true,
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    // /api/v1/evaluationLabel/{id}
    // 根据id删除标签
    delete(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'DELETE',
                url: '/api/v1/evaluationLabel/' + params.id,
                params: params,
                loading: true,
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
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

    // /api/v1/evaluationLabel/list
    // 所有标签列表查询
    getLabList(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'get',
                url: '/api/v1/evaluationLabel/list',
                params: params,
                loading: true,
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    // /api/v1/evaluationLabel/{id}
    // 根据id修改标签   
    saveEdit(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'PATCH',
                url: '/api/v1/evaluationLabel/' + params.id,
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