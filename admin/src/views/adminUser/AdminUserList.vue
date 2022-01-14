<template>
	<div>
		<el-tabs type="border-card">
			<el-tab-pane label="管理员列表">
				<el-table :data="items">
					<el-table-column prop="_id" label="ID" width="240"> </el-table-column>
					<el-table-column prop="username" label="用户名"> </el-table-column>
					<el-table-column fixed="right" label="操作" width="180">
						<template slot-scope="scope">
							<el-button
								type="text"
								size="small"
								@click="$router.push(`/admin_users/edit/${scope.row._id}`)"
								>编辑</el-button
							>
							<el-button type="text" size="small" @click="remove(scope.row)"
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
	export default {
		data() {
			return {
				items: [],
			};
		},
		methods: {
			async fetch() {
				const res = await this.$http.get('rest/admin_users'); //eslint-disable-line no-unused-vars
				this.items = res.data;
			},
			async remove(row) {
				this.$confirm(`是否确定删除用户? '${row.username}'`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
				})
					.then(async () => {
						const res = await this.$http.delete(`rest/admin_users/${row._id}`);
						this.$message({
							type: 'success',
							message: '删除成功!',
						});
						this.fetch();
					})
					.catch(() => {});
			},
		},
		created() {
			this.fetch();
		},
	};
</script>

<style></style>
