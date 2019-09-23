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
    //会员权益查询
    getMemberInterestsList(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'get',
                url: '/api/v1/memberInterests/list',
                params: params,
                loading: true,
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    //会员权益修改
    memberInterestsEdit(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'PATCH',
                url: '/api/v1/memberInterests/' + params.id,
                params: params,
                loading: true
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    //用户标签列表查询
    getUserTagsList(){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'get',
                url: '/api/v1/userTags/list',
                loading: true,
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    //用户标签增加
    userTagsAdd(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'post',
                url: '/api/v1/userTags/',
                params: params,
                loading: true
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    //用户标签修改
    userTagsEdit(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'PATCH',
                url: '/api/v1/userTags/' + params.id,
                params: params,
                loading: true
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    // 用户标签删除
    serTagsDelete(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'DELETE',
                url: '/api/v1/userTags/' + params.id,
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
export { customerService }