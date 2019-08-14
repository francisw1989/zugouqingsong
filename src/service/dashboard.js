let dashboardService = {
    // 门店收入
    getIncomeData(params){
        let p = new Promise((resolve, reject)=>{
            let data = [{time: '8:00', value: '800'},{time: '9:00', value: '900'},{time: '10:00', value: '1000'},{time: '11:00', value: '1200'}];
            let a = [];
            let b = [];
            for(const v of data){
                a.push(v.time);
                b.push(v.value);
            }
            resolve({a: a, b:b})
        })
        return p;
    },
    // 门店收入
    getNumsData(params){
        let p = new Promise((resolve, reject)=>{
            let data = [
                {time: '8:00', value1: '800', value2: '500', value3: '600'},
                {time: '9:00', value1: '200', value2: '500', value3: '600'},
                {time: '10:00', value1: '100', value2: '800', value3: '600'},
                {time: '11:00', value1: '300', value2: '700', value3: '600'}
            ];
            let a = [];
            let b = [];
            let c = [];
            let d  = [];
            for(const v of data){
                a.push(v.time);
                b.push(v.value1);
                c.push(v.value2);
                d.push(v.value3);
            }
            resolve({a: a, b:b, c:c, d:d})
        })
        return p;
    },
    // 本月门店收入排行
    getMdsrList(){
        let p = new Promise((resolve, reject)=>{
            let data = [
                {a: '弘扬分店', b: '3242'},
                {a: '弘扬分店', b: '3242'},
                {a: '弘扬分店', b: '3242'},
                {a: '弘扬分店', b: '3242'},
                {a: '弘扬分店', b: '3242'},
                {a: '弘扬分店', b: '3242'},
                {a: '弘扬分店', b: '3242'},
                {a: '弘扬分店', b: '3242'},
                {a: '弘扬分店', b: '3242'},
                {a: '弘扬分店', b: '3242'}
            ]
            resolve(data)
        })
        return p;
    },
    // 本月技师服务次数排行
    getJsfwList(){
        
        let p = new Promise((resolve, reject)=>{
            let data = [
                {a: '地方', b: '3242'},
                {a: '地方', b: '3242'},
                {a: '刚好', b: '3242'},
            ]
            resolve(data)
        })
        return p;
    },
    // 本月技师收入排行
    getJssrList(){
        let p = new Promise((resolve, reject)=>{
            let data = [
                {a: '风格', b: '3242'},
                {a: '好烦好烦的', b: '3242'},
                {a: '玩儿翁无', b: '3242'},
            ]
            resolve(data)
        })
        return p;
    }
}
export { dashboardService }