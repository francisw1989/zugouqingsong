import {$axios} from './axios.js';
let bannerService = {
    getBannerList(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'get',
                url: '/api/v1/banner/list',
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
            delete params.id
            let data = {
                method: 'POST',
                url: '/api/v1/banner/',
                params: params,
                loading: true,
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
                url: '/api/v1/banner/' + params.id,
                params: params,
                loading: true,
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    delete(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'DELETE',
                url: '/api/v1/banner/' + params.id,
                params: params,
                loading: true,
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    getBannerTypeList(){
        let p = new Promise((resolve, reject)=>{
            let data = [
                {name: '门店'},
                {name: '项目'},
                {name: '技师'},
                {name: '链接'},
                {name: '无链接'}
            ]
            resolve(data)
        })
        return p;
    },
    publish(params, id){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'PATCH',
                url: '/api/v1/banner/ispublish/' + id,
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
export { bannerService }