import {$axios} from './axios.js';
let cashierService = {
    // /api/v1/custom/arrivalStores/{orderId}
    // 确认到店
    arrivalStores(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'PATCH',
                url: '/api/v1/custom/arrivalStores/' + params.orderId,
                loading: true,
                params: params
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    //     /api/v1/custom/
    // 根据条件检索会员订单
    customSeach(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'get',
                url: '/api/v1/custom/',
                loading: true,
                params: params
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    //     /api/v1/custom/
    // 增加客户预约订单
    addAppointe(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'post',
                url: '/api/v1/custom/',
                loading: true
            }
            $axios(data, params).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    //     /api/v1/custom/employee/{orderItemId}
    // 根据oderItem_id修改技师
    changeEmployee(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'PATCH',
                url: '/api/v1/custom/employee/' + params.orderItemId,
                loading: true
            }
            $axios(data, params).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },

    // /api/v1/custom/list
    // 查询今天未到店的预约列表
    getAppointList(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'get',
                url: '/api/v1/custom/list',
                params: params,
                loading: true
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    //     /api/v1/custom/notify/order
    // 客服台支付回调通知处理
    notifyOrder(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'post',
                url: '/api/v1/custom/notify/order/',
                loading: true
            }
            $axios(data, params).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    //     /api/v1/custom/order
    // 服务项目下单接口
    customOrder(params){        
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'post',
                url: '/api/v1/custom/order',
                loading: true,
                params: {
                    userId: window.userId
                }
            }
            $axios(data, params).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },

    // /api/v1/custom/orderPayTwoBarCodes
    // 客服台订单服务支付接口
    orderPayTwoBarCodes(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'post',
                url: '/api/v1/custom/orderPayTwoBarCodes',
                loading: true
            }
            $axios(data, params).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },

    // /api/v1/custom/room/{orderItemId}
    // 分配订单房间
    setRoom(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'PATCH',
                url: '/api/v1/custom/room/' + params.orderItemId,
                loading: true,
                params: params
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    // /api/v1/custom/vipRecharge
    // 客服台会员充值
    vipRecharge(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'post',
                url: '/api/v1/custom/vipRecharge/',
                loading: true
            }
            $axios(data, params).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    list(){

        let p = new Promise((resolve, reject)=>{
            let data = [
                {a: '第三方地方',b:'但是',c:'水电费',d:'地方',e:'df', time: '2019/9/30 23:32', isArrived: false, isRoomed: false},
                {a: '第三方地方',b:'但是',c:'水电费',d:'地方',e:'df', time: '2019/9/8 10:32', isArrived: true, isRoomed: false},
                {a: '第三方地方',b:'但是',c:'水电费',d:'地方',e:'df', time: '2019/9/8 10:32', isArrived: true, isRoomed: true},
            ]
            resolve(data)
        })
        return p;
    }
}
export { cashierService }