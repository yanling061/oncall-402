<template>
	<div class="page-edit">
		<el-tabs type="border-card">
			<el-tab-pane :label="(id ? '编辑' : '新增') + '角色'">
				<el-form ref="form" label-width="80px">
					<el-form-item label="名称" required>
						<el-input v-model="model.name"></el-input>
					</el-form-item>
					<el-form-item label="描述">
						<el-input v-model="model.desc"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="save">保存</el-button>
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
					const res = await this.$http.put(`rest/categories/${this.id}`, this.model);
				} else {
					const res = await this.$http.post('rest/categories', this.model);
				}
				this.$router.push('/categories/list');
				this.$message({
					type: 'success',
					message: '保存成功',
				});
			},
			async fetch() {
				const res = await this.$http.get(`rest/categories/${this.id}`);
				this.model = res.data;
			},
		},
		created() {
			this.id && this.fetch();
		},
	};
</script>

<style scoped>
	.page-edit {
		padding: 0 1rem 1rem 1rem;
	}
</style>
