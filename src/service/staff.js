import {$axios} from './axios.js';
let staffService = {
    //获取员工列表
    getEmployeesList(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'get',
                url: '/api/v1/employees/list',
                params: params,
                loading: true,
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    //获取员工详情
    getEmployeesDetailsList(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'get',
                url: '/api/v1/employees/'+params.id,
                params: params,
                loading: true,
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    //新增修改员工
    employeesAdd(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'post',
                url: '/api/v1/employees/' + params.id,
                params: params,
                loading: true
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    //删除员工
    platformOutRecordDelete(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'DELETE',
                url: '/api/v1/employees/employeeCourse/' + params.id,
                params: params,
                loading: true
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    getSchedulingList(){
        let p = new Promise((resolve, reject)=>{
            let data = [
                {shopName: '弘扬总店',showAll: 'true', peopleList: [
                    {name: '张三', position: '店长', dayList: [
                        '上','上','上','上','上','上','上','上','上','上','上,周','上,周','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上'
                    ]},
                    {name: '张三', position: '店长', dayList: [
                        '上','上','上','上','上','上','上','上','上','上','上,周','上,周','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上'
                    ]},
                    {name: '张三', position: '店长', dayList: [
                        '上','上','上','上','上','上','上','上','上','上','上,周','上,周','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上'
                    ]},
                    {name: '张三', position: '店长', dayList: [
                        '上','上','上','上','上','上','上','上','上','上','上,周','上,周','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上'
                    ]},
                ]},
                {shopName: '弘扬总店2',showAll: 'true', peopleList: [
                    {name: '张三', position: '店长', dayList: [
                        '上','上','上','上','上','上','上','上','上','上','上,周','上,周','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上'
                    ]},
                    {name: '张三', position: '店长', dayList: [
                        '上','上','上','上','上','上','上','上','上','上','上,周','上,周','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上'
                    ]},
                ]},
                {shopName: '弘扬总店3',showAll: 'true', peopleList: [
                    {name: '张三', position: '店长', dayList: [
                        '上','上','上','上','上','上','上','上','上','上','上,周','上,周','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上'
                    ]},
                    {name: '张三', position: '店长', dayList: [
                        '上','上','上','上','上','上','上','上','上','上','上,周','上,周','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上'
                    ]},
                ]},

            ]
            resolve(data)
        })
        return p;
    },
    getStaffWorktime(){
        let p = new Promise((resolve, reject)=>{
            let data = [
                {shopName: '弘扬总店',showAll: 'true', peopleList: [
                    {name: '张三', position: '店长', dayList: [
                        '0','1','2','3','0','1','2','3','0','1','2','3','0','1','2','3','0','1','2','3','0','1','2','3','0','1','2','3','0','1'
                    ]},
                    {name: '张三', position: '店长', dayList: [
                        '0','1','2','3','0','1','2','3','0','1','2','3','0','1','2','3','0','1','2','3','0','1','2','3','0','1','2','3','0','1'
                    ]},
                    {name: '张三', position: '店长', dayList: [
                        '0','1','2','3','0','1','2','3','0','1','2','3','0','1','2','3','0','1','2','3','0','1','2','3','0','1','2','3','0','1'
                    ]},
                    {name: '张三', position: '店长', dayList: [
                        '0','1','2','3','0','1','2','3','0','1','2','3','0','1','2','3','0','1','2','3','0','1','2','3','0','1','2','3','0','1'
                    ]},
                ]},
                {shopName: '弘扬总店2',showAll: 'true', peopleList: [
                    {name: '张三', position: '店长', dayList: [
                        '0','1','2','3','0','1','2','3','0','1','2','3','0','1','2','3','0','1','2','3','0','1','2','3','0','1','2','3','0','1'
                    ]},
                    {name: '张三', position: '店长', dayList: [
                        '0','1','2','3','0','1','2','3','0','1','2','3','0','1','2','3','0','1','2','3','0','1','2','3','0','1','2','3','0','1'
                    ]},
                ]},
                {shopName: '弘扬总店3',showAll: 'true', peopleList: [
                    {name: '张三', position: '店长', dayList: [
                        '0','1','2','3','0','1','2','3','0','1','2','3','0','1','2','3','0','1','2','3','0','1','2','3','0','1','2','3','0','1'
                    ]},
                    {name: '张三', position: '店长', dayList: [
                        '0','1','2','3','0','1','2','3','0','1','2','3','0','1','2','3','0','1','2','3','0','1','2','3','0','1','2','3','0','1'
                    ]},
                ]},

            ]
            resolve(data)
        })
        return p;
    },
     //岗位等级列表
    getPostList(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'get',
                url: '/api/v1/post/list',
                params: params,
                loading: true,
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    //岗位等级新增
    postAdd(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'post',
                url: '/api/v1/post/',
                params: {},
                loading: true
            }
            $axios(data,params).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    //岗位等级删除
    postDelete(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'DELETE',
                url: '/api/v1/post/' + params.id,
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
export { staffService }