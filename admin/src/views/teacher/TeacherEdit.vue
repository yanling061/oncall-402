<template>
	<div class="page-create">
		<el-tabs type="border-card">
			<el-tab-pane :label="(id ? '编辑' : '新增') + '任课教师'">
				<el-form ref="form" label-width="80px" @submit.native.prevent="saveTea">
					<el-form-item label="姓名" required>
						<el-input
							required
							style="width:220px"
							size
							v-model="teacher.name"
						></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" size="small" native-type="submit"
							>保存</el-button
						>
					</el-form-item>
				</el-form>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	export default {
		props: {
			id: {},
		},
		data() {
			return {
				cates: [],
				teacher: {},
			};
		},
		methods: {
			async saveTea() {
				let res;
				if (this.id) {
					const res = await this.$http.put(`rest/teachers/${this.id}`, this.teacher);
				} else {
					const res = await this.$http.post('rest/teachers', this.teacher);
				}
				this.$router.go(0);
				this.$message({
					type: 'success',
					message: '保存成功',
				});
			},
			async fetchTea() {
				const res = await this.$http.get(`rest/teachers/${this.id}`);
				this.teacher = res.data;
			},
		},
		created() {
			this.id && this.fetchTea();
		},
	};
</script>

<style scoped>
	.page-create {
		padding: 0 1rem 1rem 1rem;
	}
</style>
