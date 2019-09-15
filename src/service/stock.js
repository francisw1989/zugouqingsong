import {$axios} from './axios.js';
let stockService = {
    //物料商品列表
    getArticleManagerList(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'get',
                url: '/api/v1/articleManager/list',
                params: params,
                loading: true,
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
     //物料库存列表查询
     getPlatformArticleStockList(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'get',
                url: '/api/v1/platformArticleStock/list',
                params: params,
                loading: true,
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    //物料商品新增
    platformArticleStockAdd(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'post',
                url: '/api/v1/platformArticleStock/add/' + params.id,
                params: params,
                loading: true
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },

    //物料入库列表查询
    getPlatformInRecordList(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'get',
                url: '/api/v1/platformInRecord/list',
                params: params,
                loading: true,
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    }, //物料入库新增
    platformInRecordAdd(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'post',
                url: '/api/v1/platformInRecord/add' + params.id,
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
export { stockService }