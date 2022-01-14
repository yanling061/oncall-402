<template>
	<div class="page-create">
		<el-tabs type="border-card">
			<el-tab-pane :label="(id ? '编辑' : '新增') + '上课班级'">
				<el-form ref="form" label-width="80px" @submit.native.prevent="saveCla">
					<el-form-item label="班级名称" required>
						<el-input
							required
							style="width:220px"
							size
							v-model="className.name"
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
				className: {},
			};
		},
		methods: {
			async saveCla() {
				let res;
				if (this.id) {
					const res = await this.$http.put(
						`rest/classNames/${this.id}`,
						this.className
					);
				} else {
					const res = await this.$http.post('rest/classNames', this.className);
				}
				this.$router.go(0);
				this.$message({
					type: 'success',
					message: '保存成功',
				});
			},
			async fetchCla() {
				const res = await this.$http.get(`rest/classNames/${this.id}`);
				this.className = res.data;
			},
		},
		created() {
			this.id && this.fetchCla();
		},
	};
</script>

<style scoped>
	.page-create {
		padding: 0 1rem 1rem 1rem;
	}
</style>
