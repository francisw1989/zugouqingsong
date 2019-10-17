import {$axios} from './axios.js';
let roomService = {
    // /api/v1/room/{id}
    // 根据房间id查询信息
    roomMessage(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'get',
                url: '/api/v1/room/' + params.id,
                params: params,
                loading: true,
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    // 删除房间
    delete(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'delete',
                url: '/api/v1/room/' + params.id,
                params: params,
                loading: true,
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    // /api/v1/room/{id}
    // 根据id修改房间信息
    editRoom(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'PATCH',
                url: '/api/v1/room/' + params.id,
                params: params,
                loading: true,
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    // /api/v1/room/{id}
    // 根据房间id查询信息
    viewRoom(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'get',
                url: '/api/v1/room/' + params.id,
                params: params,
                loading: true,
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    // /api/v1/room/
    // 新增房间
    addRoom(params){
        let p = new Promise((resolve, reject)=>{
            params.storeId = window.Store.id;
            let data = {
                method: 'post',
                url: '/api/v1/room/',
                params: params,
                loading: true,
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    // /api/v1/room/
    // 查询房间信息列表
    getRoomList(params){
        let p = new Promise((resolve, reject)=>{
            params.storeId = window.Store.id;
            let data = {
                method: 'get',
                url: '/api/v1/room/',
                params: params,
                loading: true,
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
                {a: '232131',b:'但是',c:'水电费',d:'地方',e:'df'},
                {a: '232131',b:'但是',c:'水电费',d:'地方',e:'df'},
                {a: '232131',b:'但是',c:'水电费',d:'地方',e:'df'},
                {a: '232131',b:'但是',c:'水电费',d:'地方',e:'df'},
                {a: '232131',b:'但是',c:'水电费',d:'地方',e:'df'},
            ]
            resolve(data)
        })
        return p;
    }
}
export { roomService }