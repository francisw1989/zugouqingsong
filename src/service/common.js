import {
	$axios
} from './axios.js';
let commonService = {

	allMenu() {
		let menus = [];
		if (localStorage.sysRoute == 'va') {
			menus = [{
					icon: 'el-icon-lx-home',
					index: '/va/dashboard',
					title: '首页',
					id: 40
				},
				{
					icon: 'el-icon-picture-outline',
					index: '/va/banner',
					title: 'banner管理',
					id: 35
				},
				{
					icon: 'el-icon-lx-shop',
					index: '/va/storeManage',
					title: '门店管理',
					id: 1
				},
				{
					icon: 'el-icon-lx-goods',
					index: '1',
					title: '订单管理',
					id: 3,
					subs: [{
						index: '/va/orderList',
						title: '订单列表',
						id: 4
					}, ]
				}, {
					icon: 'el-icon-lx-goods',
					index: '2',
					title: '项目管理',
					id: 60,
					subs: [{
							index: '/va/projectCat',
							title: '项目分类',
							id: 6
						},
						{
							index: '/va/project',
							title: '服务项目',
							id: 5
						},
						{
							index: '/va/recommendProject',
							title: '推荐项目',
							id: 61
						},
					]
				},
				{
					icon: 'el-icon-lx-friend',
					index: '3',
					title: '员工管理',
					id: 7,
					subs: [{
							index: '/va/staffList',
							title: '员工列表',
							id: 8
						},
						{
							index: '/va/staffScheduling',
							title: '员工排班',
							id: 9
						},
						{
							index: '/va/staffWorktime',
							title: '员工考勤',
							id: 10
						},
						{
							index: '/va/positionSetting',
							title: '岗位与等级设置',
							id: 11
						},
						{
							index: '/va/schedulingSetting',
							title: '排班规则设置',
							id: 12
						},
					]
				},
				{
					icon: 'el-icon-lx-group',
					index: '4',
					title: '客户管理',
					id: 13,
					subs: [{
							index: '/va/customerList',
							title: '客户列表',
							id: 14
						},
						{
							index: '/va/tagsSetting',
							title: '用户标签设置',
							id: 15
						},
						{
							index: '/va/rightsSetting',
							title: '会员权益设置',
							id: 16
						},


					]
				},
				{
					icon: 'el-icon-lx-global',
					index: '5',
					title: '物料商品管理',
					id: 36,
					subs: [{
							index: '/va/stockList',
							title: '库存管理'
						},
						{
							index: '/va/outStock',
							title: '出库记录'
						},
						{
							index: '/va/procurementList',
							title: '采购记录'
						}
					]
				},
				{
					icon: 'el-icon-lx-recharge',
					index: '6',
					title: '优惠卷管理',
					id: 57,
					subs: [{
							index: '/va/couponList',
							title: '优惠券列表',
							id: 58
						},
						{
							index: '/va/lingquList',
							title: '领用记录',
							id: 59
						},
					]
				},
				{
					icon: 'el-icon-lx-present',
					index: '7',
					title: '常规活动',
					id: 24,
					subs: [{
							index: '/va/activityList',
							title: '活动数据',
							id: 25
						},
						{
							index: '/va/activityRule',
							title: '活动规则',
							id: 26
						},
					]
				},
				{
					icon: 'el-icon-lx-message',
					index: '8',
					title: '评价管理',
					id: 27,
					subs: [{
							index: '/va/evaluateList',
							title: '评价列表',
							id: 28
						},
						{
							index: '/va/evaluateTag',
							title: '评价标签',
							id: 29
						},
					]
				},
				{
					icon: 'el-icon-lx-profile',
					index: '/va/accountList',
					title: '账号管理',
					id: 30
				},
				{
					icon: 'el-icon-lx-lock',
					index: '/va/jurisdictionList',
					title: '权限管理',
					id: 31
				},
				{
					icon: 'el-icon-lx-settings',
					index: '/va/system',
					title: '系统配置',
					id: 32
				},

			]
		} else {
			menus = [{
					icon: 'el-icon-lx-home',
					index: '/vb/dashboard',
					title: '首页',
					id: 41
				},
				{
					icon: 'el-icon-lx-recharge',
					index: '/cashier',
					title: '收银台',
					id: 42
				},
				{
					icon: 'el-icon-lx-shop',
					index: '/vb/room',
					title: '房间管理',
					id: 43
				},
				{
					icon: 'el-icon-lx-goods',
					index: '1',
					title: '订单管理',
					id: 44,
					subs: [{
						index: '/vb/orderList',
						title: '订单列表',
						id: 44
					}, ]
				},
				{
					icon: 'el-icon-lx-friend',
					index: '2',
					title: '员工管理',
					id: 46,
					subs: [{
							index: '/vb/staffList',
							title: '员工列表',
							id: 47
						},
						{
							index: '/vb/accountSetting',
							title: '账号管理',
							id: 48
						},
						{
							index: '/vb/staffScheduling',
							title: '员工排班',
							id: 49
						},
						{
							index: '/vb/staffWorktime',
							title: '员工考勤',
							id: 50
						}
					]
				},
				{
					icon: 'el-icon-lx-group',
					index: '3',
					title: '客户管理',
					id: 51,
					subs: [{
						index: '/vb/customerList',
						title: '客户列表',
						id: 55
					}]
				},
				{
					icon: 'el-icon-lx-global',
					index: '4',
					title: '物料商品管理',
					id: 17,
					subs: [{
							index: '/vb/stockList',
							title: '库存管理',
							id: 18
						},
						{
							index: '/vb/outStock',
							title: '出库管理',
							id: 19
						},
						{
							index: '/vb/procurementList',
							title: '入库管理',
							id: 20
						}
					]
				},
				{
					icon: 'el-icon-lx-message',
					index: '7',
					title: '评价管理',
					id: 52,
					subs: [{
						index: '/vb/evaluateList',
						title: '评价列表',
						id: 56
					}, ]
				},
				// {
				//     icon: 'el-icon-lx-profile',
				//     index: '/vb/accountList',
				//     title: '账号管理'
				// },
				{
					icon: 'el-icon-lx-lock',
					index: '/vb/jurisdictionList',
					title: '权限管理',
					id: 53
				},
				{
					icon: 'el-icon-lx-settings',
					index: '/vb/setting',
					title: '门店设置',
					id: 54
				}
			]
		}
		return menus;
	},
	// /api/v1/sysMenu/list/{type}
	// 列表查询系统菜单
	getSysMenu() {
		let p = new Promise((resolve, reject) => {
			let type = '';
			if (localStorage.sysRoute == 'va') {
				type = 1;
			} else if (localStorage.sysRoute == 'vb') {
				type = 0;
			}
			let data = {
				method: 'get',
				url: '/api/v1/sysMenu/list/' + type,
				params: {
					type: type
				},
				loading: true,
			}
			$axios(data).then((res) => {
				resolve(res)
			})
		})
		return p;
	},
	// 公共数据
	GD() {
		let p = new Promise((resolve, reject) => {
			let data = {
				url: 'https://zzh.hzysofti.com/api/v1/',
				sysRoute: 'va',
				sysName: '足够轻松 平台管理',
				// sysName: '后台管理系统',
				tagFlList: ['基础特征'],
				rightsList: [{
					a: '432',
					b: 2
				}, {
					a: '432',
					b: 2
				}, {
					a: '432',
					b: 2
				}],
				goodsCat: ['商品', '物料'],
				yhqTypeList: ['满减', '满赠', '折扣', '抵扣分钟'],
				yhqFwList: ['通用', '项目', '门店'],
				yhqYxqlxList: ['固定日期', '自领取起'],
				ffTypeList: ['充值', '注册', '消费', '邀请好友', '拼团', "评价"],
				hdTypeList: ['注册'],
				yhqList: ['满200减50', '颈椎放松7折', '60分钟颈椎放松'],
				xmflList: ['职场女性', '休闲放松'],
				pjflList: ['好'],
				jueseList: ['管理员', '开发'],
				yuangongList: ['章三'],
				leveName: ['普通会员', '一星会员', '二星会员', '三星会员']

			}
			resolve(data)
		})
		return p;
	},
	// 获取门店列表
	getShopList() {
		let p = new Promise((resolve, reject) => {
			let data = [{
					shopName: '平台统计',
					shopId: '-10000'
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
	getProjectList() {
		let p = new Promise((resolve, reject) => {
			let data = [{
					a: '2地方32131',
					b: '但是',
					c: '水电费',
					d: '地方',
					e: 'df'
				},
				{
					a: '23213df1',
					b: '但是',
					c: '水电费',
					d: '地方',
					e: 'df'
				},
				{
					a: '2dsfd32131',
					b: '但是',
					c: '水电费',
					d: '地方',
					e: 'df'
				},
				{
					a: '2321dsf31',
					b: '但是',
					c: '水电费',
					d: '地方',
					e: 'df'
				},
				{
					a: '23dfd2131',
					b: '但是',
					c: '水电费',
					d: '地方',
					e: 'df'
				},
			]
			resolve(data)
		})
		return p;
	},
	// 获取项目列表
	getTagsTypeList() {
		let p = new Promise((resolve, reject) => {
			let data = ['', 'success', 'info', 'warning', 'danger', '', 'success', 'info', 'warning', 'danger']
			resolve(data)
		})
		return p;
	},
	// 获取项目列表
	getJbList() {
		let p = new Promise((resolve, reject) => {
			let data = ['一级', '二级', '三级', '四级']
			resolve(data)
		})
		return p;
	},
	// 获取项目列表
	getXsList() {
		let p = new Promise((resolve, reject) => {
			let data = ['1', '1.1', '1.2', '1.3']
			resolve(data)
		})
		return p;
	},
	// 获取排班
	getPbgzList() {
		let p = new Promise((resolve, reject) => {
			let data = [{
					a: '早班',
					b: '8:00-14:00'
				},
				{
					a: '中班',
					b: '13:30-21:30'
				},
				{
					a: '晚班',
					b: '21:00-2:30'
				}
			]
			resolve(data)
		})
		return p;
	},
	// 获取排班
	getTagsList() {
		let p = new Promise((resolve, reject) => {
			let data = [{
					a: 'sfdsf',
					b: 'dfsfd',
					c: '232'
				},
				{
					a: 'fdsd',
					b: 'sdfs',
					c: '232'
				},
				{
					a: 'sdfsd',
					b: 'sdfsf',
					c: '232'
				}
			]
			resolve(data)
		})
		return p;
	},
	getBase64(file) {
		return new Promise(function(resolve, reject) {
			let reader = new FileReader();
			let imgResult = "";
			reader.readAsDataURL(file);
			reader.onload = function() {
				imgResult = reader.result;
			};
			reader.onerror = function(error) {
				reject(error);
			};
			reader.onloadend = function() {
				resolve(imgResult);
			};
		});
	},
	upload(Base64) {
		let p = new Promise((resolve, reject) => {
			let params = {
				suffix: 'jpg',
				dir: 'images'
			}
			let data = {
				method: "post",
				url: "/common/v1/file/upload",
				params: params,
				loading: true,
			}
			$axios(data, Base64).then((res) => {
				resolve(res)
			})
		})
		return p;

	},
	getTime(id, GT, callback) {
		let timer = null; //这里设置time为null，用于下面来清除计时器
		let obj = document.getElementById(id) //获取到放置时间数据的span的id
		timer = setInterval(function() { //设置定时器，来更新时间
			let a = GT || new Date((obj.getAttribute("time"))).getTime();
			//上面这一步可能比较复杂，我们首先来看obj.getAttribute("data-time")这一句。这个是用来获取指定标签的data-time属性，即我们要使用的到期时间，然后来看new Date().getTime(),这一句是用来获取我们所设置到期时间的时间戳，用于下面的计算，这个获取的是固定的数值
			let b = new Date().getTime(); //这是获取当前时间，是一个不固定的数值
			let d = 0,
				s = 0,
				h = 0,
				m = 0; //定义变量
			d = Math.floor((a - b) / 1000 / 60 / 60 / 24); //获取剩余天数
			h = Math.floor((a - b) / 1000 / 60 / 60 % 24); //获取剩余小时
			m = Math.floor((a - b) / 1000 / 60 % 60); //获取剩余分钟
			s = Math.floor((a - b) / 1000 % 60); //获取剩余秒数
			//中间这块区域是用来判断，当前时间数值小于10的时候给他前面加个0，这里可以根据具体情况可加可不加，以下同理
			if (d < 10 && d > 1) {
				d = "0" + d + '天 '
			} else if (d >= 10) {
				d = d + '天 '
			} else {
				d = ''
			}
			if (h < 10 && h > 0) {
				h = "0" + h + ':'
			} else if (h >= 10) {
				h = h + ':'
			} else {
				h = ''
			}
			if (m < 10) {
				m = "0" + m + ':';
			} else {
				m = m + ':';
			}
			if (s < 10) {
				s = "0" + s;
			} else if (s < 0) {
				s = 0;
			}
			let str = d + ' ' + h + m + s;
			obj.innerHTML = str;
			if (a <= b) { //当我们的时间到期的时候，清除计时器，然后把当前标签的内容设置为0；
				clearInterval(timer);
				obj.innerHTML = GT ? '支付失败，请重新下单' : '已到店';
				if (callback) {
					callback()
				}
			}
		}, 1000)
	},
	getFixed2(num) {
		let _num = num.toFixed(3).split('.');
		let _num_0 = _num[0];
		let _num_1 = _num[1];
		let __num_1 = _num_1.split('');
		if (__num_1[__num_1.length - 1] > 0) {
			_num_1 = __num_1[0] + (Number(__num_1[1]) + 1)
		} else {
			_num_1 = __num_1[0] + __num_1[1];
		}
		return _num_0 + '.' + _num_1

	},
	formatDate(timestamp) {
		var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
		var Y = date.getFullYear() + '-';
		var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
		var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
		var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
		var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
		return Y + M + D + h + m + s;
	}
}
window.Store = {
	id: 2
}
export {
	commonService
}
