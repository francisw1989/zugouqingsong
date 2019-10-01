import {$axios} from './axios.js';
let systemService = {
    // /api/v1/sysSetting/itemValueList
    // 批量编辑具体配置项
    saveItemValueList(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'PATCH',
                url: '/api/v1/sysSetting/itemValueList',
                params: {},
                loading: true,
            }
            $axios(data, params).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    // /api/v1/sysSetting/tabCodeList/{tabId}
    // 获取标签相互关联数据
    getTabCodeList(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'get',
                url: '/api/v1/sysSetting/tabCodeList/' + params.tabId,
                params: params,
                loading: true,
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    // /api/v1/sysSetting/tabList
    // 根据系统类型查询标签
    getTabList(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'get',
                url: '/api/v1/sysSetting/tabList',
                params: {},
                loading: true,
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },




    // /api/v1/sysSetting/item/{settingKey}
    // 根据settingKey获取item信息
    getItemClassList(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'get',
                url: '/api/v1/sysSetting/item/{settingKey}',
                params: params,
                loading: true,
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    // /api/v1/sysSetting/itemAll
    // 配置项key，value数据
    getItemList(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'get',
                url: '/api/v1/sysSetting/itemAll',
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
export { systemService }