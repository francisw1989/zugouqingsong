import {$axios} from './axios.js';
import {commonService} from './common.js';
let orderService = {
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
    },
    getOrderDetails(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'get',
                url: '/api/v1/order/'+params.id,
                params: params,
                loading: true,
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
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
                for(const v of res.records){
                    v.defaultPrice = v.defaultPrice/100;
                    v.threePrice = v.threePrice/100;
                    v.fivePrice = v.fivePrice/100;
                    v.tenPrice = v.tenPrice/100;
                    v.unitPrice = commonService.getFixed2(v.defaultPrice/v.defaultDuration);
                    v.defaultDurationShow = v.defaultDuration
                    v.num = 0;
                }
                resolve(res)
            })
        })
        return p;
    },
    //服务项目新增
    itemAdd(params){
        let p = new Promise((resolve, reject)=>{
            params.defaultPrice = parseInt(parseFloat(params.defaultPrice) * 100);
            params.threePrice = parseInt(parseFloat(params.threePrice) * 100);
            params.fivePrice = parseInt(parseFloat(params.fivePrice) * 100);
            params.tenPrice = parseInt(parseFloat(params.tenPrice) * 100);
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
		debugger
        let p = new Promise((resolve, reject)=>{
            params.defaultPrice = parseInt(parseFloat(params.defaultPrice) * 100);
            params.threePrice = parseInt(parseFloat(params.threePrice) * 100);
            params.fivePrice = parseInt(parseFloat(params.fivePrice) * 100);
            params.tenPrice = parseInt(parseFloat(params.tenPrice) * 100);
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
	// 服务项目推荐Banner
	itemBanner(params){
	    let p = new Promise((resolve, reject)=>{
	        let data = {
	            method: 'PATCH',
	            url: '/api/v1/item/banner/' + params.resourceId,
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
 //服务项目排序上移
     upSort(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'get',
                url: '/api/v1/item/upSort',
                params: params,
                loading: true,
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    }, //获取服务项目分类
     downSort(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'get',
                url: '/api/v1/item/downSort',
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
export { orderService }