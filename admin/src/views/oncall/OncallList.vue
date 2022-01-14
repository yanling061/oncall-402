<template>
	<div class="page-list">
		<el-tabs type="border-card">
			<el-tab-pane label="值班表">
				<table-filter
					title="值班"
					:items="items"
					:filterMonths="filterMonths"
					:filterNames="filterNames"
					:getSummaries="getSummaries"
				>
					<el-table-column prop="period" label="时段" width="100"> </el-table-column>
					<el-table-column prop="extraPeriod" label="其他时段(小时)" width="120">
					</el-table-column>
					<el-table-column prop="note" label="备注"> </el-table-column>
					<el-table-column
						prop="createdAt"
						label="创建时间"
						width="230"
						:formatter="dateFormat"
					>
					</el-table-column>
					<el-table-column label="总时长" width="100"> </el-table-column>
					<el-table-column label="时薪" width="100"> </el-table-column>
					<el-table-column fixed="right" label="操作" width="180">
						<template slot-scope="scope">
							<el-button type="danger" size="mini" @click="remove(scope.row)"
								>删除</el-button
							>
						</template>
					</el-table-column>
				</table-filter>
			</el-tab-pane>
			<el-tab-pane label="配置管理" name="second">
				<div>
					<el-input
						v-model="budget"
						placeholder="请输入汇总金额"
						style="width:50%;"
						type="number"
					></el-input>
					<div style="margin-top: 10px">
						<el-button type="primary" size="small" @click="updateBudget"
							>确认修改</el-button
						>
					</div>
				</div>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	import moment from 'moment';
	export default {
		props: {
			id: {},
		},
		data() {
			return {
				items: [],
				filterMonths: [],
				filterNames: [],
				multipleSelection: [],
				price: 0,
				totalTime: 0,
				budget: 1140,
			};
		},
		methods: {
			updateBudget() {
				this.$confirm(`是否确定修改预算?`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
				})
					.then(async () => {
						this.budget = this.budget;
						this.$message({
							type: 'success',
							message: '修改成功!',
						});
						this.fetch();
					})
					.catch(() => {});
			},
			dateFormat(row, col) {
				let date = row[col.property];
				if (date) {
					return moment(date).format('YYYY-MM-DD HH:mm');
				}
				return '';
			},
			async fetch() {
				const res = await this.$http.get('rest/oncalls');
				this.items = res.data;

				let datesList = [];
				let namesList = [];

				this.items.forEach(e => {
					datesList.push(e.date);
				});
				datesList = datesList.map(d => d.slice(0, 7));
				const monthsList = Array.from(new Set(datesList));
				monthsList.map(d => this.filterMonths.push({ text: d, value: d }));

				this.items.forEach(e => {
					namesList.push(e.stuName.name);
				});
				namesList = Array.from(new Set(namesList));
				namesList.map(n => this.filterNames.push({ text: n, value: n }));
			},
			async remove(row) {
				this.$confirm(`是否确定删除记录?`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
				})
					.then(async () => {
						const res = await this.$http.delete(`rest/oncalls/${row._id}`);
						this.$message({
							type: 'success',
							message: '删除成功!',
						});
						this.fetch();
					})
					.catch(() => {});
			},
			getSummaries(param) {
				let budget = 940;
				const { columns, data } = param;
				const sums = [];
				let totalTime;
				let price;

				columns.forEach((column, index) => {
					if (index === 0) {
						sums[index] = '汇总';
						return;
					}
					if (index === 3) {
						let periods = data
							.map(d => d.period)
							.map(p => p.length + p.length * 0.5)
							.reduce((pre, curr) => pre + curr, 0);
						sums[index] = periods;
						return;
					}
					const values = data.map(item => Number(item[column.property]));
					if (!values.every(value => isNaN(value))) {
						sums[index] = values.reduce((prev, curr) => {
							const value = Number(curr);
							if (!isNaN(value)) {
								return prev + curr;
							} else {
								return prev;
							}
						}, 0);
						sums[index] += '';
					} else {
						sums[index] = '';
					}

					if (index === 7) {
						sums[index] = sums[3] * 1 + sums[4] * 1;
					}

					if (
						columns[1].filteredValue.length === 1 &&
						columns[1].filteredValue[0] === data[0].date.slice(0, 7) &&
						columns[2].filteredValue.length === 0
					) {
						totalTime = sums[3] * 1 + sums[4] * 1;
						price = (this.budget / this.totalTime) * 1;
						if (!isNaN(price) && !isNaN(totalTime)) {
							this.totalTime = totalTime;
							this.price = price.toFixed(2);
							sums[2] = this.totalTime * this.price;
						}
					} else if (
						columns[1].filteredValue.length === 1 &&
						columns[1].filteredValue[0] === data[0].date.slice(0, 7) &&
						columns[2].filteredValue.length > 0
					) {
						sums[2] = sums[7] * this.price;
					}
					sums[8] = this.price;
				});
				for (const key in 'object') {
					console.log(i);
				}

				// console.log(sums);
				return sums;
			},
		},

		created() {
			this.fetch();
		},
	};
</script>
