let commonService = {
    // 公共数据
    GD(){
        let p = new Promise((resolve, reject)=>{
            let data = {
                sysRoute: 'va',
                // sysName: '足够轻松 平台管理',
                sysName: '后台管理系统',
                tagFlList: ['基础特征'],
                rightsList: [
                    {a: '432', b:2},{a: '432', b:2},{a: '432', b:2}
                ]
            }
            resolve(data)
        })
        return p;
    },
    // 获取门店列表
    getShopList(){
        let p = new Promise((resolve, reject)=>{
            let data = [
                {
                    shopName: '平台统计',
                    shopId:'-10000'
                },
                {
                    position: '118.797863,32.061829',
                    shopName: '中央门店',
                    num1: '11',
                    num2: '11',
                    num3: '11',
                    shopId: '213dfd1231232'
                },
                {
                    position: '118.80,32.10',
                    shopName: '中央门店2',
                    num1: '11',
                    num2: '11',
                    num3: '11',
                    shopId: '21312fghfg31232'
                },
                {
                    position: '118.81,32.15',
                    shopName: '中央门店222',
                    num1: '11',
                    num2: '11',
                    num3: '11',
                    shopId: '21312312gj2332'
                },
                {
                    position: '118.82,32.17',
                    shopName: '中央门店33',
                    num1: '11',
                    num2: '11',
                    num3: '11',
                    shopId: '3232131231232'
                },
                {
                    position: '118.83,32.20',
                    shopName: '中央门店342',
                    num1: '11',
                    num2: '11',
                    num3: '11',
                    shopId: '21312454e31232'
                }
            ]
            resolve(data)
        })
        return p;
    },
    // 获取项目列表
    getProjectList(){
        let p = new Promise((resolve, reject)=>{
            let data = [
                {a: '2地方32131',b:'但是',c:'水电费',d:'地方',e:'df'},
                {a: '23213df1',b:'但是',c:'水电费',d:'地方',e:'df'},
                {a: '2dsfd32131',b:'但是',c:'水电费',d:'地方',e:'df'},
                {a: '2321dsf31',b:'但是',c:'水电费',d:'地方',e:'df'},
                {a: '23dfd2131',b:'但是',c:'水电费',d:'地方',e:'df'},
            ]
            resolve(data)
        })
        return p;
    },
    // 获取项目列表
    getTagsTypeList(){
        let p = new Promise((resolve, reject)=>{
            let data = ['','success','info','warning','danger','','success','info','warning','danger']
            resolve(data)
        })
        return p;
    },
    // 获取项目列表
     getJbList(){
        let p = new Promise((resolve, reject)=>{
            let data = ['一级','二级','三级','四级']
            resolve(data)
        })
        return p;
    },
    // 获取项目列表
    getXsList(){
        let p = new Promise((resolve, reject)=>{
            let data = ['1','1.1','1.2','1.3']
            resolve(data)
        })
        return p;
    },
    // 获取排班
    getPbgzList(){
        let p = new Promise((resolve, reject)=>{
            let data = [
                {a: '早班', b: '8:00-14:00'},
                {a: '中班', b: '13:30-21:30'},
                {a: '晚班', b: '21:00-2:30'}
            ]
            resolve(data)
        })
        return p;
    },
    // 获取排班
    getTagsList(){
        let p = new Promise((resolve, reject)=>{
            let data = [
                {a: 'sfdsf', b: 'dfsfd', c: '232'},
                {a: 'fdsd', b: 'sdfs', c: '232'},
                {a: 'sdfsd', b: 'sdfsf', c: '232'}
            ]
            resolve(data)
        })
        return p;
    }
}
export { commonService }