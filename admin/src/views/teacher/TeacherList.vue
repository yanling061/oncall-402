<template>
	<div class="page-list">
		<el-tabs type="border-card">
			<el-tab-pane label="任课教师列表">
				<el-table :data="teachers">
					<el-table-column prop="_id" label="ID" width="230"> </el-table-column>
					<el-table-column prop="name" label="姓名"> </el-table-column>
					<el-table-column prop="createdAt" label="创建时间" :formatter="dateFormat">
					</el-table-column>
					<el-table-column prop="updatedAt" label="更新时间" :formatter="dateFormat">
					</el-table-column>
					<el-table-column fixed="right" label="操作" width="180">
						<template slot-scope="scope">
							<el-button
								type="text"
								size="small"
								@click="$router.push(`/teachers/edit/${scope.row._id}`)"
								>编辑</el-button
							>
							<el-button type="text" size="small" @click="removeTea(scope.row)"
								>删除</el-button
							>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
			<el-pagination
				background
				layout="prev, pager, next"
				:total="totalCount"
				style="text-align:center; padding:20px"
				:current-page="page"
				:page-size="size"
				@current-change="handleCurrentChange"
			>
			</el-pagination>
		</el-tabs>
	</div>
</template>

<script>
	import moment from 'moment';

	export default {
		data() {
			return {
				teachers: [],
				totalCount: 0,
				page: 1,
				size: 5,
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

			async fetchTea() {
				const res = await this.$http.post('rest/teachers/pagination', {
					page: this.page,
					size: this.size,
				});
				this.teachers = res.data.model;
				this.totalCount = res.data.totalCount;
			},

			async removeTea(row) {
				this.$confirm(`是否确定删除任教老师? '${row.name}'`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
				})
					.then(async () => {
						const res = await this.$http.delete(`rest/teachers/${row._id}`);
						this.$message({
							type: 'success',
							message: '删除成功!',
						});
						this.fetchTea();
					})
					.catch(() => {});
			},
			handleCurrentChange(val) {
				this.page = val;
				this.fetchTea();
			},
		},
		created() {
			this.fetchTea();
		},
	};
</script>

<style scoped>
	.page-edit {
		padding: 0 1rem 1rem 1rem;
	}
</style>
