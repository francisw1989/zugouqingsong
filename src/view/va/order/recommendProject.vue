<template>
	<div class="table">
		<div class="crumbs">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item> {{this.$route.meta.title}}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class=" clearfix top10">
				<el-button type="primary" class="handle-del right" @click="updatePage()">刷新页面</el-button>
				<span>项目名称</span>
				<el-input v-model="itemName" style='width: 110px!important' placeholder="输入项目名称" class="handle-input left10"></el-input>
				<el-button type="primary" icon="el-icon-search" @click="search" class="left10">搜索</el-button>
				<span class="left20">项目分类</span>
				<el-select class="left10" style='width: 140px!important' clearable v-model="itemClassId" placeholder="请选择项目分类"
				 filterable>
					<el-option v-for="(v, i) in itemClassList" :key='v.id' :label="v.itemClassName" :value="v.id"></el-option>
				</el-select>
				<span class="left20">是否拼团</span>
				<el-select class="left10" clearable v-model="isAssemble" placeholder="" style='width: 60px' filterable>
					<el-option label="是" value="1"></el-option>
					<el-option label="否" value="0"></el-option>
				</el-select>
			</div>

			<el-table :data="list" border class="table top20" ref="multipleTable" @selection-change="handleSelectionChange"
			 @cell-dblclick="rowDblclick">
				<!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
				<el-table-column type="index" label="序号" width="50" align='center'></el-table-column>
				<el-table-column prop="itemName" label="项目名称" sortable width="110"></el-table-column>
				<el-table-column prop="itemClassName" sortable width="110" label="所属分类"></el-table-column>
				<el-table-column prop="defaultDuration" label="推荐时长(分钟)"></el-table-column>
				<el-table-column prop="defaultPrice" label="默认价格(元)"></el-table-column>
				<el-table-column label="排序(双击修改)">
					<template slot-scope="{row}">
						<span v-if="!isEdit[row.index]">{{row.recommendSort}}</span>
						<el-input v-if="isEdit[row.index]" @blur="changeSort(row)" v-model="row.sortNum" placeholder="序号"></el-input>
					</template>
				</el-table-column>
				<!-- <el-table-column prop="recommendSort" label="排序(双击修改)" edit="false">
					<template slot-scope="scope">
						<el-input v-if="scope.row.recommendSort.edit"  v-model="scope.row.sortNum.value" @blur="scope.row.recommendSort.edit = false">
						</el-input>
						<span v-else>{{ scope.row.recommendSort }}</span>
					</template>
				</el-table-column> -->
				<el-table-column prop="isRecommendName" label="是否推荐"></el-table-column>
				<el-table-column prop="isAssembleName" label="是否可拼团"></el-table-column>
				<el-table-column prop="createTime" label="创建时间"></el-table-column>
				<el-table-column label="操作" width="300" align="center">
					<template slot-scope="scope">
						<el-button size="mini" @click="handleRecommend(scope.$index, scope.row)">{{scope.row.isRecommend==0?'推荐':'取消推荐'}}</el-button>
						<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination">
				<el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :page-size='pageSize'
				 :total="total">
				</el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
	import bus from '../../../bus';
	import Vue from 'vue';
	import {
		orderService
	} from '../../../service/order';
	import {
		bannerService
	} from '../../../service/banner';
	const Form = {
		id: '',
		itemName: '',
		itemClassId: '',
		itemClassName: '',
		defaultDuration: '',
		defaultPrice: '',
		mixDuration: '',
		maxDuration: '',
		isRecommend: false,
		isBanner: false,
		isAssemble: false,
		threePrice: '',
		fivePrice: '',
		tenPrice: '',
		imgs: '',
		crowd: '',
		conditioningMethod: '',
		conditioningProcess: '',
		maintenanceMethod: ''
	}
	export default {
		data() {
			var imgListShowCheck = (rule, value, callback) => {
				if (!value.length) {
					callback(new Error('请上传项目图片'));
				} else {
					callback();
				}
			};
			return {
				edit: false,
				isEdit: [],
				list: [],
				cur_page: 1,
				multipleSelection: [],
				itemName: '',
				sortNum: '',
				itemClassId: '',
				fiveT: '5',
				threeT: '3',
				tenT: '10',
				is_search: false,
				delVisible: false,
				form: JSON.parse(JSON.stringify(Form)),
				rules: {
					itemName: [{
						required: true,
						message: '请输入',
						trigger: 'blur'
					}, ],
					itemClassId: [{
						required: true,
						message: '请选择',
						trigger: 'change'
					}, ],
					defaultDuration: [{
						required: true,
						message: '请输入',
						trigger: 'blur'
					}, ],
					defaultPrice: [{
						required: true,
						message: '请输入',
						trigger: 'blur'
					}, ],
					mixDuration: [{
						required: true,
						message: '请输入',
						trigger: 'blur'
					}, ],
					maxDuration: [{
						required: true,
						message: '请输入',
						trigger: 'blur'
					}, ],
					imgs: [{
						required: true,
						message: '请上传项目图片'
					}, ],
					imgListShow: [{
						validator: imgListShowCheck
					}, ]
				},
				idx: -1,
				id: -1,
				itemClassList: [],
				isRecommend: '',
				isAssemble: '',
				editVisible: false,
				isRecommendcName: '',
				isAssembleName: '',
				total: 0,
				pageSize: 10,
				pageNumber: 1
			}
		},
		components: {
			orderService
		},
		methods: {
			itemClassListChange(val) {
				const t = this;
				t.form.itemClassName = t.itemClassList.filter((item) => {
					return item.id == val
				})[0].itemClassName;
				console.log(t.form.itemClassName)
			},
			getFile(file, fileList) {
				const t = this;
				t.$commonService.getBase64(file.raw).then((Base64) => {
					t.$commonService.upload(Base64).then((res) => {
						t.form.imgListShow.push({
							url: res.netUrl
						})
						console.log(t.form.imgListShow)
					})
				})
			},
			beforeRemove(file, fileList) {
				const t = this;
				for (const i in fileList) {
					if (fileList[i].uid == file.uid) {
						t.form.imgListShow.splice(i, 1)
					}
				}
				t.form.imgListShow = fileList;
				console.log(t.form.imgListShow)
			},
			// 保存编辑
			saveEdit(form) {
				const t = this;
				t.form.imgs = t.form.imgListShow.map((v) => {
					return v.url
				}).join(',');
				t.$refs[form].validate((valid) => { //表单验证 validate
					if (valid) {
						let params = {};
						t.editVisible = false;
						for (let key in Form) {
							params[key] = t.form[key]
						}
						params.isRecommend = params.isRecommend ? '1' : '0';
						params.isAssemble = params.isAssemble ? '1' : '0';
						params.threePrice = params.threePrice == "" ? '0' : params.threePrice;
						params.fivePrice = params.fivePrice == "" ? '0' : params.fivePrice;
						params.tenPrice = params.tenPrice == "" ? '0' : params.tenPrice;
						if (t.idx == '-1') {
							orderService.itemAdd(params).then((res) => {
								t.recommendList()
							})
						} else {
							orderService.itemEdit(params).then((res) => {
								t.recommendList()
							})
						}


					} else {
						console.log('error submit!!');
						return false;
					}
				});

			},


			handleCurrentChange(val) {
				this.cur_page = val;
				this.recommendList();
			},
			search() {
				//this.is_search = true;
				const t = this;
				t.recommendList();
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			// 推荐
			handleRecommend(index, row) {
				const t = this;
				let params = {
					isRecommend: row.isRecommend == 0 ? '1' : '0',
					id: row.id
				};
				orderService.itemRecommend(params).then((res) => {
					this.$message.success('设置成功');
					t.recommendList();
				})
			},
			handleEdit(index, row) {
				const t = this;
				if (row) {
					// 编辑
					t.idx = index;
					t.row = row;
					t.form = t.row;
					t.row.isRecommend == "1" ? t.form.isRecommend = true : t.form.isRecommend = false;
					t.row.isAssemble == "1" ? t.form.isAssemble = true : t.form.isAssemble = false;
					t.form.imgListShow = [];
					if (t.form.imgs) {
						t.form.imgs.split(',').forEach((v) => {
							t.form.imgListShow.push({
								url: v
							})
						})
					}
					console.log(t.form.imgs)
				} else {
					// 新增
					t.idx = '-1';
					t.id = '';
					t.form = JSON.parse(JSON.stringify(Form));
					t.form.imgListShow = [];
				}
				t.editVisible = true;
			},
			handleBanner(index, row) {
				const t = this;
				let params = {
					path: row.imgs,
					type: 2,
					resourceId: row.id,
					isPublish: 0
				}
				let param = {
					resourceId: row.id,
					isBanner: 1
				}
				//console.log(params);
				bannerService.add(params).then((res) => {
					this.$message.success('推荐成功');
					//t.recommendList();
				});
				orderService.itemBanner(param).then((res) => {
					t.recommendList();
				})
			},
			changeSort(row) {
				const t = this;
				if (row.sortNum == undefined) {
					//window.location.reload();
					this.$message.error('序号不能为空');
					return;
				}
				this.sortNum = row.sortNum;
				this.id = row.id;
				let params = {
					id: this.id,
					sort: this.sortNum
				}
				orderService.changeRecommengSort(params).then((res) => {
					this.$message.success('修改成功');
					//t.recommendList();
				})
			},
			updatePage() {
				window.location.reload();
			},
			rowDblclick(row, column, cell, event) {
				//判断是否是需要编辑的列 再改变对应的值
				if (column.label == '排序(双击修改)') {
					// t.sortNum = row.recommendSort;
					// row.sortNum = t.sortNum;
					/* 第一个参数是你要改变的数组， 
					  第二个参数是你要改变数组中对应值的索引，
					  第三个参数是你要将这个值改成什么 */
					this.$set(this.isEdit, row.$index, true)
				}
			},
			// rowDblclick(row, column, cell, event) {
			// 	//判断是否是需要编辑的列 再改变对应的值
			// 	debugger
			// 	if (column.label == '排序(双击修改)') {
			// 		if (row[column.property]) {
			// 			row[column.property].edit = true
			// 			setTimeout(() => {
			// 				this.$refs[column.property].focus()
			// 			}, 20)
			// 		}
			// 	}
			// },
			handleDelete(index, row) {
				const t = this;
				this.idx = index;
				this.id = row.id;
				this.row = row;
				t.delVisible = true;
			},
			// 确定删除
			deleteRow() {
				const t = this;
				let parmas = {
					id: this.id
				}
				orderService.itemDelete(parmas).then((res) => {
					this.$message.success('排序成功');
					this.delVisible = false;
					t.recommendList();
				})
			},
			recommendList() {
				const t = this;
				t.list = [];

				let params = {
					pageSize: t.pageSize,
					pageNumber: t.pageNumber,
					itemName: t.itemName,
					itemClassId: t.itemClassId,
					isAssemble: t.isAssemble
				}
				orderService.recommendList(params).then((res) => {
					for (const v of res.records) {
						v.isRecommendName = v.isRecommend == 0 ? '未推荐' : '已推荐';
						v.isAssembleName = v.isAssemble == 0 ? '不参与' : '参与';
					}
					t.list = res.records;
					t.total = res.total
				})
			}
		},
		watch: {
			itemClassId(val) {
				this.recommendList();
			},
			isRecommend() {
				this.recommendList();
			},
			isAssemble() {
				this.recommendList();
			}
		},
		mounted() {
			const t = this;
			t.recommendList()

			orderService.getItemClassList().then((res) => {
				t.itemClassList = res.records;
			})

		}
	}
</script>

<style scoped>
</style>
