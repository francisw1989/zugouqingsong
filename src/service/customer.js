let customerService = {
    getCustomerList(){
        let p = new Promise((resolve, reject)=>{
            let data = [
                {a: '232是是是131',b:'但是',c:'水电费',d:'地方',e:'df'},
                {a: '23342131',b:'但是',c:'水电费',d:'地方',e:'df'},
                {a: '232rtt131',b:'但是',c:'水电费',d:'地方',e:'df'},
                {a: '2ee32131',b:'但是',c:'水电费',d:'地方',e:'df'},
                {a: '232131rr',b:'但是',c:'水电费',d:'地方',e:'df'},
            ]
            resolve(data)
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