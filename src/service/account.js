import {$axios} from './axios.js';
let accountService = {
    // /api/v1/sysUser/{id}
    // 根据id修改账户
    save(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'PATCH',
                url: '/api/v1/sysUser/' + params.id,
                params: params,
                loading: true,
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    // /api/v1/sysUser/
    // 新增账户
    add(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'POST',
                url: '/api/v1/sysUser/',
                params: params,
                loading: true,
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    // /api/v1/sysUser/{id}
    // 根据id删除
    delete(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'DELETE',
                url: '/api/v1/sysUser/' + params.id,
                params: params,
                loading: true,
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    
    // /api/v1/sysUser/list
    // 账户列表查询
    sysUserList(){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'get',
                url: '/api/v1/sysUser/list',
                params: {
                    pageSize: 100,
                    pageNumber: 1
                },
                loading: true,
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    // /api/v1/sysUser/userLoginInfo
    // 获取登录用户信息
    userLoginInfo(){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'get',
                url: '/api/v1/sysUser/userLoginInfo',
                params: {token: localStorage.token},
                loading: true,
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    // /api/v1/sysUser/logout
    // 系统账户退出登陆
    logout(){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'get',
                url: '/api/v1/sysUser/logout',
                params: {},
                loading: true,
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    // /api/v1/sysUser/login
    // 系统账户登陆
    login(params){
        let p = new Promise((resolve, reject)=>{
            let type = '';
            if(localStorage.sysRoute == 'va'){
                type = 1;
            }else{
                type = 0;
            }
            params.type = type;
            let data = {
                method: 'get',
                url: '/api/v1/sysUser/login',
                params: params,
                loading: true,
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    getAccountList(){
        let p = new Promise((resolve, reject)=>{
            let data = [
                {a: '232是是是131',b:'但是',c:'水电费',d:'地方',e:'df', tags: ['23', '32']},
                {a: '23342131',b:'但是',c:'水电费',d:'地方',e:'df'},
                {a: '232rtt131',b:'但是',c:'水电费',d:'地方',e:'df'},
                {a: '2ee32131',b:'但是',c:'水电费',d:'地方',e:'df'},
                {a: '232131rr',b:'但是',c:'水电费',d:'地方',e:'df'},
            ]
            resolve(data)
        })
        return p;
    },

    
}
export { accountService }