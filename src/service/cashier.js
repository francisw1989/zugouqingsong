
let cashierService = {
    list(){

        let p = new Promise((resolve, reject)=>{
            let data = [
                {a: '第三方地方',b:'但是',c:'水电费',d:'地方',e:'df', time: '2019/9/10 23:32'},
                {a: '第三方地方',b:'但是',c:'水电费',d:'地方',e:'df', time: '2019/9/8 10:32'},
            ]
            resolve(data)
        })
        return p;
    }
}
export { cashierService }