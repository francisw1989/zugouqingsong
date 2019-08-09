let common = {
    // 公共数据
    GD(){
        let p = new Promise((resolve, reject)=>{
            let data = {
                sysRoute: 'va',
                sysName: '足够轻松 平台管理'
            }
            resolve(data)
        })
        return p;
    }
}
export { common }