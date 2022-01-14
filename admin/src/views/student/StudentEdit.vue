<template>
	<div class="page-create">
		<el-tabs type="border-card">
			<el-tab-pane :label="(id ? '编辑' : '新增') + '巡查人'">
				<el-form ref="form" label-width="80px" @submit.native.prevent="saveStu">
					<el-form-item label="角色">
						<el-select disabled v-model="student.category" placeholder="学生">
							<el-option
								v-for="cate in cates"
								:key="cate._id"
								:label="cate.name"
								:value="cate._id"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="姓名" required>
						<el-input
							required
							style="width:220px"
							size
							v-model="student.name"
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
				student: {},
			};
		},
		methods: {
			async saveStu() {
				let res;
				if (this.id) {
					const res = await this.$http.put(`rest/students/${this.id}`, this.student);
				} else {
					const res = await this.$http.post('rest/students', this.student);
				}
				this.$router.go(0);
				this.$message({
					type: 'success',
					message: '保存成功',
				});
			},

			async fetchCategories() {
				const res = await this.$http.get('rest/categories');
				this.cates = res.data;
				this.$set(this.student, 'category', this.cates[0]._id);
			},

			async fetchStu() {
				const res = await this.$http.get(`rest/students/${this.id}`);
				this.student = res.data;
			},
		},
		created() {
			this.fetchCategories();
			this.id && this.fetchStu();
		},
	};
</script>

<style scoped>
	.page-create {
		padding: 0 1rem 1rem 1rem;
	}
</style>
