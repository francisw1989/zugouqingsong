
let cashierService = {
    list(){

        let p = new Promise((resolve, reject)=>{
            let data = [
                {a: '第三方地方',b:'但是',c:'水电费',d:'地方',e:'df', time: '2019/9/10 23:32', isArrived: false, isRoomed: false},
                {a: '第三方地方',b:'但是',c:'水电费',d:'地方',e:'df', time: '2019/9/8 10:32', isArrived: true, isRoomed: false},
                {a: '第三方地方',b:'但是',c:'水电费',d:'地方',e:'df', time: '2019/9/8 10:32', isArrived: true, isRoomed: true},
            ]
            resolve(data)
        })
        return p;
    }
}
export { cashierService }