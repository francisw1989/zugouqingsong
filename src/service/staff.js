import {$axios} from './axios.js';
let staffService = {
    // /api/v1/employees/resetPassword
    // 重置员工密码（暂时重置为123456）
    resetPassword(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'PATCH',
                url: '/api/v1/employees/resetPassword',
                params: params,
                loading: true
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    // /api/v1/employees/setRoleId
    // 分配角色id给员工
    saveRole(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'PATCH',
                url: '/api/v1/employees/setRoleId',
                params: params,
                loading: true
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    setPassword(){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'PATCH',
                url: '/api/v1/employees/' + params.id,
                params: params,
                loading: true
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    // 查询某个门店下的所有员工 某月份的考勤记录
    getStoreWorkingTimeList(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'get',
                url: '/api/v1/employeeAttendance/record/stores/'+params.storeId,
                params: params,
                loading: true,
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    // 删除排班
    scheduleDel(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'DELETE',
                url: '/api/v1/employeeSchedule/record/employees/',
                params: params,
                loading: true
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
     // 设置排班
     scheduleSet(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'POST',
                url: '/api/v1/employeeSchedule/record/employees/',
                params: params,
                loading: true
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    // 给某个员工添加历程
    addLc(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'POST',
                url: '/api/v1/employees/employeeCourse/' + params.id,
                params: params,
                loading: true
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    // 删除员工
    platformOutRecordDelete(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'DELETE',
                url: '/api/v1/employees/' + params.employeeId,
                params: params,
                loading: true,
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    //获取员工列表
    getEmployeesList(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'get',
                url: '/api/v1/employees/list',
                params: params,
                loading: true,
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    //获取员工详情
    getEmployeesDetailsList(params){
		debugger
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'get',
                url: '/api/v1/employees/'+params.id,
                params: params,
                loading: true,
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    //新增员工
    employeesAdd(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'post',
                url: '/api/v1/employees/',
                params: params,
                loading: true
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    //修改员工
    employeesEdit(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'PATCH',
                url: '/api/v1/employees/' + params.id,
                params: params,
                loading: true
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    //获取员工服务记录
    getServiceRecordList(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'get',
                url: '/api/v1/employees/serviceRecord/'+params.id,
                params: params,
                loading: true,
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    //获取员工排班记录
    getEmployeeScheduleList(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'get',
                url: '/api/v1/employeeSchedule/record/employees/'+params.employeeId,
                params: params,
                loading: true,
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    //获取员工考勤记录
    getEmployeeAttendanceList(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'get',
                url: '/api/v1/employeeAttendance/record/employees/'+params.employeeId,
                params: params,
                loading: true,
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    //获取员工考勤情况
    getEmployeeAttendanceCount(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'get',
                url: '/api/v1/employeeAttendance/count/employees/'+params.employeeId,
                params: params,
                loading: true,
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    //获取员工被评价记录
    getEmployeeEvaluateRecord(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'get',
                url: '/api/v1/employees/evaluateRecord/'+params.id,
                params: params,
                loading: true,
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    //获取员工培训晋升历程
     getEmployeeCourseRecord(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'get',
                url: '/api/v1/employees/courseRecord/'+params.id,
                params: params,
                loading: true,
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    //删除员工历程
    employeeCourseDelete(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'DELETE',
                url: '/api/v1/employees/employeeCourse/' + params.id,
                params: params,
                loading: true
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    //获取员工师徒关系
    getEmployeEmentorShip(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'get',
                url: '/api/v1/employees/mentorShip/'+params.id,
                params: params,
                loading: true,
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },

    //获取某个门店某个月的所有员工的排班记录
    getStoreEmployeeScheduleList(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'get',
                url: '/api/v1/employeeSchedule/record/stores/'+params.storeId,
                params: params,
                loading: true,
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    
    getSchedulingList(){
        let p = new Promise((resolve, reject)=>{
            let data = [
                {shopName: '弘扬总店',showAll: 'true', peopleList: [
                    {name: '张三', position: '店长', dayList: [
                        '上','上','上','上','上','上','上','上','上','上','上,周','上,周','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上'
                    ]},
                    {name: '张三', position: '店长', dayList: [
                        '上','上','上','上','上','上','上','上','上','上','上,周','上,周','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上'
                    ]},
                    {name: '张三', position: '店长', dayList: [
                        '上','上','上','上','上','上','上','上','上','上','上,周','上,周','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上'
                    ]},
                    {name: '张三', position: '店长', dayList: [
                        '上','上','上','上','上','上','上','上','上','上','上,周','上,周','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上'
                    ]},
                ]},
                {shopName: '弘扬总店2',showAll: 'true', peopleList: [
                    {name: '张三', position: '店长', dayList: [
                        '上','上','上','上','上','上','上','上','上','上','上,周','上,周','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上'
                    ]},
                    {name: '张三', position: '店长', dayList: [
                        '上','上','上','上','上','上','上','上','上','上','上,周','上,周','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上'
                    ]},
                ]},
                {shopName: '弘扬总店3',showAll: 'true', peopleList: [
                    {name: '张三', position: '店长', dayList: [
                        '上','上','上','上','上','上','上','上','上','上','上,周','上,周','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上'
                    ]},
                    {name: '张三', position: '店长', dayList: [
                        '上','上','上','上','上','上','上','上','上','上','上,周','上,周','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上','上'
                    ]},
                ]},

            ]
            resolve(data)
        })
        return p;
    },
    getStaffWorktime(){
        let p = new Promise((resolve, reject)=>{
            let data = [
                {shopName: '弘扬总店',showAll: 'true', peopleList: [
                    {name: '张三', position: '店长', dayList: [
                        '0','1','2','3','0','1','2','3','0','1','2','3','0','1','2','3','0','1','2','3','0','1','2','3','0','1','2','3','0','1'
                    ]},
                    {name: '张三', position: '店长', dayList: [
                        '0','1','2','3','0','1','2','3','0','1','2','3','0','1','2','3','0','1','2','3','0','1','2','3','0','1','2','3','0','1'
                    ]},
                    {name: '张三', position: '店长', dayList: [
                        '0','1','2','3','0','1','2','3','0','1','2','3','0','1','2','3','0','1','2','3','0','1','2','3','0','1','2','3','0','1'
                    ]},
                    {name: '张三', position: '店长', dayList: [
                        '0','1','2','3','0','1','2','3','0','1','2','3','0','1','2','3','0','1','2','3','0','1','2','3','0','1','2','3','0','1'
                    ]},
                ]},
                {shopName: '弘扬总店2',showAll: 'true', peopleList: [
                    {name: '张三', position: '店长', dayList: [
                        '0','1','2','3','0','1','2','3','0','1','2','3','0','1','2','3','0','1','2','3','0','1','2','3','0','1','2','3','0','1'
                    ]},
                    {name: '张三', position: '店长', dayList: [
                        '0','1','2','3','0','1','2','3','0','1','2','3','0','1','2','3','0','1','2','3','0','1','2','3','0','1','2','3','0','1'
                    ]},
                ]},
                {shopName: '弘扬总店3',showAll: 'true', peopleList: [
                    {name: '张三', position: '店长', dayList: [
                        '0','1','2','3','0','1','2','3','0','1','2','3','0','1','2','3','0','1','2','3','0','1','2','3','0','1','2','3','0','1'
                    ]},
                    {name: '张三', position: '店长', dayList: [
                        '0','1','2','3','0','1','2','3','0','1','2','3','0','1','2','3','0','1','2','3','0','1','2','3','0','1','2','3','0','1'
                    ]},
                ]},

            ]
            resolve(data)
        })
        return p;
    },
    //岗位等级列表
    getPostList(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'get',
                url: '/api/v1/post/list',
                params: params,
                loading: true,
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    //岗位等级新增
    postAdd(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'post',
                url: '/api/v1/post/',
                params: {},
                loading: true
            }
            $axios(data,params).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    //岗位等级删除
    postDelete(params){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'DELETE',
                url: '/api/v1/post/' + params.id,
                params: params,
                loading: true
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    //班次列表查询
    shiftsSettingList(){
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'get',
                url: '/api/v1/shiftsSetting/list',
                loading: true,
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
    //班次修改
    shiftsSettingEdit(params){
		debugger
        let p = new Promise((resolve, reject)=>{
            let data = {
                method: 'PATCH',
                url: '/api/v1/shiftsSetting/' + params.id,
                params: params,
                loading: true
            }
            $axios(data).then((res)=>{
                resolve(res)
            })
        })
        return p;
    },
}
export { staffService }