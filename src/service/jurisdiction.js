import {$axios} from './axios.js';
let jurisdictionService = {

    // /api/v1/sysRole/{id}
    // 根据id删除
    delete(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'DELETE',
                url: '/api/v1/sysRole/' + params.id,
                loading: true,
                params: params
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    // /api/v1/sysRole/{id}
    // 根据id修改权限和信息
    save(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'PATCH',
                url: '/api/v1/sysRole/' + params.id,
                loading: true,
                params: params
            }
            
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    // /api/v1/sysRole/
    // 新增权限角色
    add(params){
        params.platform = localStorage.sysRoute == 'va'? 1 : 0;
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'post',
                url: '/api/v1/sysRole/',
                loading: true,
                params: params
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    //     /api/v1/sysRole/list
    // 权限列表查询
    getList(){
        let p = new Promise((resolve, reject)=>{
            let params = {
                pageSize: 100,
                pageNumber: 1
            }
            params.platform = localStorage.sysRoute == 'va'? 1 : 0;
            let data = {
                method: 'get',
                url: '/api/v1/sysRole/list',
                loading: true,
                params: params
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    getJurisdictionList(){
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
    //系统菜单列表
    getSysMenuList(){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'get',
                url: '/api/v1/sysMenu/list/1',
                loading: true,
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
    return p;
},
    
}
export { jurisdictionService }