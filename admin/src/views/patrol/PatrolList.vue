<template>
	<div class="page-list">
		<el-tabs type="border-card">
			<el-tab-pane label="巡查表">
				<table-filter
					title="巡查"
					:items="items"
					:filterMonths="filterMonths"
					:filterNames="filterNames"
				>
					<el-table-column prop="period" label="节次"> </el-table-column>
					<el-table-column prop="classroom" label="课室"> </el-table-column>
					<el-table-column
						prop="teacher"
						label="教师"
						:filters="filterTeaNames"
						:filter-method="filterTeaName"
					>
					</el-table-column>
					<el-table-column
						prop="className"
						label="班级"
						:filters="filterClasses"
						:filter-method="filterClass"
					>
					</el-table-column>
					<el-table-column prop="note" label="备注" width="200"> </el-table-column>
					<el-table-column
						prop="createdAt"
						label="创建时间"
						width="200"
						:formatter="dateFormat"
					>
					</el-table-column>
					<el-table-column fixed="right" label="操作" width="180">
						<template slot-scope="scope">
							<el-button type="danger" size="mini" @click="remove(scope.row)"
								>删除</el-button
							>
						</template>
					</el-table-column>
				</table-filter>
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
				filterTeaNames: [],
				filterClasses: [],
			};
		},
		methods: {
			dateFormat(row, col) {
				let date = row[col.property];
				if (date) {
					return moment(date).format('YYYY-MM-DD HH:mm');
				}
				return '';
			},
			async fetch() {
				const res = await this.$http.get('rest/patrols');
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

			async fetchTeachers() {
				const res = await this.$http.get('rest/teachers');
				let list = [];
				list = res.data.map(t => t.name);
				list = Array.from(new Set(list)).map(n =>
					this.filterTeaNames.push({ text: n, value: n })
				);
				console.log(list);
			},

			async fetchClassNames() {
				const res = await this.$http.get('rest/classNames');
				let list = [];
				list = res.data.map(c => c.name);
				list = Array.from(new Set(list)).map(n =>
					this.filterClasses.push({ text: n, value: n })
				);
			},

			async remove(row) {
				this.$confirm(`是否确定删除这条记录?`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
				})
					.then(async () => {
						const res = await this.$http.delete(`rest/patrols/${row._id}`);
						this.$message({
							type: 'success',
							message: '删除成功!',
						});
						this.fetch();
					})
					.catch(() => {});
			},
			filterTeaName(value, row) {
				return row.teacher === value;
			},

			filterClass(value, row) {
				return row.className === value;
			},
		},
		created() {
			this.fetch();
			this.fetchTeachers();
			this.fetchClassNames();
		},
	};
</script>
