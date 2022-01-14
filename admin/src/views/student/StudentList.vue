<template>
	<div class="page-list">
		<el-tabs type="border-card">
			<el-tab-pane label="学生列表">
				<el-table :data="students">
					<el-table-column prop="_id" label="ID" width="230"> </el-table-column>
					<el-table-column prop="name" label="姓名"> </el-table-column>
					<el-table-column prop="category.name" label="角色"> </el-table-column>
					<el-table-column prop="createdAt" label="创建时间" :formatter="dateFormat">
					</el-table-column>
					<el-table-column prop="updatedAt" label="更新时间" :formatter="dateFormat">
					</el-table-column>
					<el-table-column fixed="right" label="操作" width="180">
						<template slot-scope="scope">
							<el-button
								type="text"
								size="small"
								@click="$router.push(`/students/edit/${scope.row._id}`)"
								>编辑</el-button
							>
							<el-button type="text" size="small" @click="removeStu(scope.row)"
								>删除</el-button
							>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	import moment from 'moment';

	export default {
		data() {
			return {
				students: [],
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

			async fetchStu() {
				const res = await this.$http.get('rest/students');
				this.students = res.data;
			},

			async removeStu(row) {
				this.$confirm(`是否确定删除学生? '${row.name}'`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
				})
					.then(async () => {
						const res = await this.$http.delete(`rest/students/${row._id}`);
						this.$message({
							type: 'success',
							message: '删除成功!',
						});
						this.fetchStu();
					})
					.catch(() => {});
			},
		},
		created() {
			this.fetchStu();
		},
	};
</script>

<style scoped>
	.page-edit {
		padding: 0 1rem 1rem 1rem;
	}
</style>
