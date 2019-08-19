let couponService = {
    getCouponList(){
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
    
    

}
export { couponService }