<template>
	<div class="page-create">
		<el-tabs type="border-card">
			<el-tab-pane :label="(id ? '编辑' : '新增') + '管理员'">
				<el-form label-width="120px" @submit.native.prevent="save">
					<el-form-item label="用户名" required>
						<el-input v-model="model.username" required></el-input>
					</el-form-item>
					<el-form-item label="密码" required>
						<el-input
							type="password"
							show-password
							v-model="model.password"
							required
						></el-input>
					</el-form-item>
					<el-form-item label="">
						<el-button type="primary" native-type="submit">保存</el-button>
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
				model: {},
			};
		},
		methods: {
			async save() {
				let res;
				if (this.id) {
					const res = await this.$http.put(
						`rest/admin_users/${this.id}`,
						this.model
					);
				} else {
					const res = await this.$http.post('rest/admin_users', this.model); //eslint-disable-line no-unused-vars
				}
				this.$router.push('/admin_users/list');
				this.$message({
					type: 'success',
					message: '保存成功',
				});
			},
			async fetch() {
				const res = await this.$http.get(`rest/admin_users/${this.id}`);
				this.model = res.data;
			},
		},
		created() {
			this.id && this.fetch();
		},
	};
</script>

<style></style>
