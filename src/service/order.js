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
    getProjectCatList(){
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
    getXmflList(){
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
    }

}
export { orderService }