import {$axios} from './axios.js';

let couponService = {
    getCouponManagerList(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'get',
                url: '/api/v1/couponManager/',
                params: params,
                loading: true,
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    couponManagerDelete(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'DELETE',
                url: '/api/v1/couponManager/' + params.id,
                params: params,
                loading: true
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    //优惠券新增
    couponManagerAdd(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'post',
                url: '/api/v1/couponManager/' + params.id,
                params: params,
                loading: true
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    //优惠券修改
    couponManagerEdit(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'PATCH',
                url: '/api/v1/couponManager/' + params.id,
                params: params,
                loading: true
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    getCouponManagerRecord(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'get',
                url: '/api/v1/couponManager/record',
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
export { couponService }