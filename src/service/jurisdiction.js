import {$axios} from './axios.js';
let jurisdictionService = {
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