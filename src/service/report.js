import {$axios} from './axios.js';
import {commonService} from './common.js';
let reportService = {
    // 项目销售列表导出
    itemReportExport(params){
        if(localStorage.sysRoute=='vb' && localStorage.userInfo){
            let userInfo = JSON.parse(localStorage.userInfo);
            params.storeId = userInfo.storesId;
            params.storesId = userInfo.storesId;
        }
        window.open('/api/v1/storeArticleStock/itemReportExport?' + Object.keys(params).map(function (key) {
            return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
        }).join("&"))
    },
    // 获取项目列表
    getItemList(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'get',
                url: '/api/v1/storeArticleStock/itemSelect',
                params: params,
                loading: true,
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    //获取订单列表
    itemReportList(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'get',
                url: '/api/v1/storeArticleStock/itemReportList',
                params: params,
                loading: true,
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    // 获取渠道分析列表
    channelAnalysisReportList(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'get',
                url: '/api/v1/storeArticleStock/channelAnalysisReportList',
                params: params,
                loading: true,
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    // 渠道分析列表导出
    channelAnalysisReportExport(params){
        if(localStorage.sysRoute=='vb' && localStorage.userInfo){
            let userInfo = JSON.parse(localStorage.userInfo);
            params.storeId = userInfo.storesId;
            params.storesId = userInfo.storesId;
        }
        window.open('/api/v1/storeArticleStock/channelAnalysisReportExport?' + Object.keys(params).map(function (key) {
            return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
        }).join("&"))
    },
    // 充值报表上3个总额统计
    rechargeStatistics(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'get',
                url: '/api/v1/storeArticleStock/rechargeStatistics',
                params: params,
                loading: true,
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    // 充值报表
    rechargeReportList(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'get',
                url: '/api/v1/storeArticleStock/rechargeReportList',
                params: params,
                loading: true,
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    // 充值报表导出
    rechargeReportExport(params){
        if(localStorage.sysRoute=='vb' && localStorage.userInfo){
            let userInfo = JSON.parse(localStorage.userInfo);
            params.storeId = userInfo.storesId;
            params.storesId = userInfo.storesId;
        }
        window.open('/api/v1/storeArticleStock/rechargeReportExport?' + Object.keys(params).map(function (key) {
            return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
        }).join("&"))
    },
    // 员工提成报表
    employeeCoefficientReportList(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'get',
                url: '/api/v1/storeArticleStock/employeeCoefficientReportList',
                params: params,
                loading: true,
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    employeeSelect(){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'get',
                url: '/api/v1/storeArticleStock/employeeSelect',
                loading: true,
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    // 员工提成报表导出
    employeeCoefficientReportExport(params){
        if(localStorage.sysRoute=='vb' && localStorage.userInfo){
            let userInfo = JSON.parse(localStorage.userInfo);
            params.storeId = userInfo.storesId;
            params.storesId = userInfo.storesId;
        }
        window.open('/api/v1/storeArticleStock/employeeCoefficientReportExport?' + Object.keys(params).map(function (key) {
            return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
        }).join("&"))
    },
}
export { reportService }