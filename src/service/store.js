import {$axios} from './axios.js';

let storeService = {


    // /api/v1/stores/data/{id}
    // 根据门店id查询门店数据
    getData(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'get',
                url: '/api/v1/stores/data/' + params.id,
                params: params,
                loading: true,
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    // /api/v1/stores/{id}
    // 根据门店id查询门店基本详情
    getDetail(){
        
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'get',
                url: '/api/v1/stores/' + window.storeId,
                params: {
                    id: window.storeId
                },
                loading: true,
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    list(params){
        let p = new Promise((resolve, reject)=>{
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
    },
    edit(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'PATCH',
                url: '/api/v1/stores/' + params.id,
                params: params,
                loading: true
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    // 关闭
    delete(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'DELETE',
                url: '/api/v1/stores/' + params.id,
                params: params,
                loading: true
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    // 查询门店数据
    getData(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'get',
                url: '/api/v1/stores/data/'+params.id,
                params: params,
                loading: true,
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    }

}
export { storeService }