import {$axios} from './axios.js';
let customerService = {
    getCustomerList(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'get',
                url: '/api/v1/user/list',
                params: params,
                loading: true,
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    getCustormDetail(){
        let p = new Promise((resolve, reject)=>{
            let data = {
                a: '1111',
                b: '2015-03-04',
                c: '',
                isLiudong: false,
                ssmd: ['中央门店2', '中央门店222'],
                fwxm: [''],
                rate: 3,
                tags: ['地方','哈哈','通天塔'] ,
                fwList: [{a:'123'},{a:'123'},{a:'123'},{a:'123'},{a:'123'},{a:'123'}],
                paibanList: [{a:'123'},{a:'123'},{a:'123'},{a:'123'},{a:'123'},{a:'123'}],
                kqList: [{a:'123'},{a:'123'},{a:'123'},{a:'123'},{a:'123'},{a:'123'}],
                jb:'3级',
                sfxs: '120%',
                tcxs: '1%'
            }
            resolve(data)
        })
        return p;
    },

}
export { customerService }