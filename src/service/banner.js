import axios from 'axios';
const u = 'https://zzh.hzysofti.com:8002/api/v1/';
let bannerService = {
    getBannerList(){

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
    getBannerTypeList(){
        let p = new Promise((resolve, reject)=>{
            let data = [
                {name: '技师'},{name: '项目'},{name: '门店'},{name: '无链接'},
            ]
            resolve(data)
        })
        return p;
    },
}
export { bannerService }