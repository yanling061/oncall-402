<template>
	<div class="page-list">
		<el-tabs type="border-card">
			<el-tab-pane label="任课教师列表">
				<el-table :data="classNames">
					<el-table-column prop="_id" label="ID" width="230"> </el-table-column>
					<el-table-column prop="name" label="班级名称" sortable> </el-table-column>
					<el-table-column prop="createdAt" label="创建时间" :formatter="dateFormat">
					</el-table-column>
					<el-table-column prop="updatedAt" label="更新时间" :formatter="dateFormat">
					</el-table-column>
					<el-table-column fixed="right" label="操作" width="180">
						<template slot-scope="scope">
							<el-button
								type="text"
								size="small"
								@click="$router.push(`/class_names/edit/${scope.row._id}`)"
								>编辑</el-button
							>
							<el-button type="text" size="small" @click="removeCla(scope.row)"
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
				classNames: [],
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

			async fetchCla() {
				const res = await this.$http.post('rest/classNames/pagination', {
					page: this.page,
					size: this.size,
				});
				this.classNames = res.data.model;
				this.totalCount = res.data.totalCount;
			},

			async removeCla(row) {
				this.$confirm(`是否确定删除班级? '${row.name}'`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
				})
					.then(async () => {
						const res = await this.$http.delete(`rest/classNames/${row._id}`);
						this.$message({
							type: 'success',
							message: '删除成功!',
						});
						this.fetchCla();
					})
					.catch(() => {});
			},
			handleCurrentChange(val) {
				this.page = val;
				this.fetchCla();
			},
		},
		created() {
			this.fetchCla();
		},
	};
</script>

<style scoped>
	.page-edit {
		padding: 0 1rem 1rem 1rem;
	}
</style>
