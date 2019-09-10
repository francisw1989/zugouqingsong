import {$axios} from './axios.js';
let orderService = {
    getOrderList(){
        let p = new Promise((resolve, reject)=>{
            let data = [
                {a: '232131',b:'但是',c:'水电费',d:'地方',e:'df'},
                {a: '232131',b:'但是',c:'水电费',d:'地方',e:'df'},
                {a: '232131',b:'但是',c:'水电费',d:'地方',e:'df'},
                {a: '232131',b:'但是',c:'水电费',d:'地方',e:'df'},
                {a: '232131',b:'但是',c:'水电费',d:'地方',e:'df'},
            ]
            resolve(data)
        })
        return p;
    },
    //获取服务项目列表
    getItemList(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'get',
                url: '/api/v1/item/list',
                params: params,
                loading: true,
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    //获取服务项目分类
    getItemClassList(){
        let params = {
            pageSize: 10,
            pageNumber: 1
        }
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'get',
                url: '/api/v1/itemClass/list',
                params: params,
                loading: true,
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    getOrderDetal(){
        let p = new Promise((resolve, reject)=>{
            let data = {
                a: 'dsfdsf'
            }
            resolve(data)
        })
        return p;
    },
    //服务项目新增
    itemAdd(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'post',
                url: '/api/v1/item/' + params.id,
                params: params,
                loading: true
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    //服务项目修改
    itemEdit(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'PATCH',
                url: '/api/v1/item/' + params.id,
                params: params,
                loading: true
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
     // 服务项目下架
     itemDelete(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'DELETE',
                url: '/api/v1/item/' + params.id,
                params: params,
                loading: true
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    // 服务项目推荐设置
    itemRecommend(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'PATCH',
                url: '/api/v1/item/recommend/' + params.id,
                params: params,
                loading: true
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
     //服务分类项目新增
     itemClassAdd(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'post',
                url: '/api/v1/itemClass/' + params.id,
                params: params,
                loading: true
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    //服务分类项目修改
    itemClassEdit(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'PATCH',
                url: '/api/v1/itemClass/' + params.id,
                params: params,
                loading: true
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
     // 服务分类项目下架
     itemClassDelete(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'DELETE',
                url: '/api/v1/itemClass/' + params.id,
                params: params,
                loading: true
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },

}
export { orderService }