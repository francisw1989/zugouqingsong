import {$axios} from './axios.js';
let stockBySotreService = {
     //物料库存列表查询
     getStoreArticleStockList(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'get',
                url: '/api/v1/storeArticleStock/list',
                params: params,
                loading: true,
            }
            $axios(data).then((res)=>{
				for(const v of res.records){
					v.costPrice = v.costPrice/100;
					v.salesPrice = v.salesPrice/100
				}
                resolve(res)
            })
        })
        return p;
    },
	
	//物料库存列表展示
	 getArticleStockList(params){
	    let p = new Promise((resolve, reject)=>{
	        let data = {
	            method: 'get',
	            url: '/api/v1/storeArticleStock/getList',
	            params: params,
	            loading: true,
	        }
	        $axios(data).then((res)=>{
	            resolve(res)
	        })
	    })
	    return p;
	},
	
    //物料入库列表查询
    getStoreInRecordList(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'get',
                url: '/api/v1/storeInRecord/list',
                params: params,
                loading: true,
            }
            $axios(data).then((res)=>{
				for(const v of res.records){
					v.costPrice = v.costPrice/100;
					v.totalPrice = v.totalPrice/100
				}
                resolve(res)
            })
        })
        return p;
    }, //物料入库修改
    storeInRecordEdit(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'PATCH',
                url: '/api/v1/storeInRecord/' + params.id,
                params: params,
                loading: true
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    //物料出库列表查询
    getStoreOutRecordList(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'get',
                url: '/api/v1/storeOutRecord/list',
                params: params,
                loading: true,
            }
            $axios(data).then((res)=>{
				for(const v of res.records){
					v.costPrice = v.costPrice/100;
					v.salesPrice = v.salesPrice/100;
					v.totalPrice = v.totalPrice/100
				}
                resolve(res)
            })
        })
        return p;
    },
    //物料出库新增
    storeOutRecordAdd(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'post',
                url: '/api/v1/storeOutRecord/',
                params: params,
                loading: true
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    //物料出库删除
    storeOutRecordDelete(params){
       let p = new Promise((resolve, reject)=>{
           let data = {
               method: 'DELETE',
               url: '/api/v1/storeOutRecord/' + params.id,
               params: params,
               loading: true
           }
           $axios(data).then((res)=>{
               resolve(res)
           })
       })
       return p;
   },
   
   //商品订单出库
    storeOutRecordArticle(params){
       let p = new Promise((resolve, reject)=>{
           let data = {
               method: 'PATCH',
               url: '/api/v1/storeOutRecord/article/' + params.id,
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
export { stockBySotreService }