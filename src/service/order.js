let orderService = {
    getOrderList(){
        let p = new Promise((resolve, reject)=>{
            let data = [
                {a: '232131',b:'但是',c:'水电费',d:'地方',e:'df'},
                {a: '232131',b:'但是',c:'水电费',d:'地方',e:'df'},
                {a: '232131',b:'但是',c:'水电费',d:'地方',e:'df'},
                {a: '232131',b:'但是',c:'水电费',d:'地方',e:'df'},
                {a: '232131',b:'但是',c:'水电费',d:'地方',e:'df'},
            ]
            resolve(data)
        })
        return p;
    },
    
    getProjectCatList(){
        let p = new Promise((resolve, reject)=>{
            let data = [
                {a: '232131',b:'但是',c:'水电费',d:'地方',e:'df'},
                {a: '232131',b:'但是',c:'水电费',d:'地方',e:'df'},
                {a: '232131',b:'但是',c:'水电费',d:'地方',e:'df'},
                {a: '232131',b:'但是',c:'水电费',d:'地方',e:'df'},
                {a: '232131',b:'但是',c:'水电费',d:'地方',e:'df'},
            ]
            resolve(data)
        })
        return p;
    },
    getXmflList(){
        let p = new Promise((resolve, reject)=>{
            let data = ['职场女性','休闲放松']
            resolve(data)
        })
        return p;
    },
    getOrderDetal(){
        let p = new Promise((resolve, reject)=>{
            let data = {
                a: 'dsfdsf'
            }
            resolve(data)
        })
        return p;
    }

}
export { orderService }