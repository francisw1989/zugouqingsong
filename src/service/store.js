import {$axios} from './axios.js';

let storeService = {
    list(res){
        let p = new Promise((resolve, reject)=>{
            let params = {
                pageSize: res.pageSize,
                pageNumber: res.pageNumber
            }
            let data = {
                method: 'get',
                url: '/api/v1/stores/list',
                params: params,
                loading: true,
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    add(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'post',
                url: '/api/v1/stores/' + params.id,
                params: params,
                loading: true
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    }

}
export { storeService }