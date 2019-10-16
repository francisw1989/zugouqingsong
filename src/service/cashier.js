import {$axios} from './axios.js';
let cashierService = {

    // /api/v1/custom/payStatus
    // 根据商户订单获取微信支付结果
    payStatus(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'get',
                url: '/api/v1/custom/payStatus',
                params: params,
                loading: false,
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
     // /api/v1/custom/isSms
    // 客服台是否接受短信提醒
    isSms(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'post',
                url: '/api/v1/custom/isSms',
                params: params,
                loading: true,
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    finishOrder(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'PATCH',
                url: '/api/v1/custom/finishOrder/' + params.orderId,
                loading: true,
                params: params
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    // /api/v1/custom/user
    // 添加会员
    addCustom(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'post',
                url: '/api/v1/custom/user',
                loading: true,
                params: params
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    // /api/v1/custom/orderDetail
    // 根据商户订单号 获取下单结果和详情
    orderDetail(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'get',
                url: '/api/v1/custom/orderDetail',
                loading: params.loading,
                params: params
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    // /api/v1/custom/selectTechnician
    // 客服台选择技师页面
    selectTechnician(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'get',
                url: '/api/v1/custom/selectTechnician',
                loading: true,
                params: params
            }
            $axios(data).then((res)=>{
                if(res.length && res[0].employees.length){
                    for(const v of res[0].employees){
                        if(!v.level){v.level = 0};
                        let levelArr = [];
                        for(let i =0; i<v.level; i++){
                            levelArr.push('')
                        }
                        v.choosed = false;
                        v.levelArr = levelArr;
                    }
                }
                resolve(res)
               
            })
        })
        return p;
    },
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
                loading: true,
                params: params
            }
            $axios(data).then((res)=>{
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
    customOrder(params, orderReqForms){        
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'post',
                url: '/api/v1/custom/order',
                loading: true,
                params: params
            }
            $axios(data, orderReqForms).then((res)=>{
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
                loading: true,
                params: params
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
                url: '/api/v1/custom/room/',
                loading: true,
                params: params
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    // /api/v1/custom/vipRechargeInfo
    // 会员充值活动信息
    vipRechargeInfo(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'get',
                url: '/api/v1/custom/vipRechargeInfo',
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
                loading: true,
                params: params
            }
            $axios(data).then((res)=>{
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