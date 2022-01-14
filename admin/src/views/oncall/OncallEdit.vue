<template>
	<div class="page-create">
		<el-tabs type="border-card">
			<el-tab-pane label="新增值班">
				<el-form ref="form" label-width="80px">
					<el-form-item label="姓名" required>
						<el-select v-model="model.stuName" filterable>
							<el-option
								v-for="stu in students"
								:key="stu._id"
								:label="stu.name"
								:value="stu._id"
								>{{ stu.name }}</el-option
							>
						</el-select>
					</el-form-item>
					<el-form-item label="值班日期" required>
						<div class="block">
							<el-date-picker
								v-model="model.date"
								type="date"
								placeholder="选择日期"
								format="yyyy-MM-dd"
								value-format="yyyy-MM-dd"
								:editable="false"
							>
							</el-date-picker>
						</div>
					</el-form-item>
					<el-form-item label="值班时段(多选)">
						<el-select v-model="model.period" multiple>
							<el-option
								v-for="option of periodOptions"
								:key="option.value"
								:value="option.value"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="其他时段">
						<el-select v-model="model.extraPeriod" multiple filterable>
							<el-option
								v-for="option of extraPeriodOptions"
								:key="option.value"
								:value="option.value"
							></el-option>
						</el-select>
						<span style="color:#ccc; padding-left: 5px">(小时)</span>
					</el-form-item>
					<el-form-item label="备注">
						<el-input type="textarea" v-model="model.note"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" size="medium" @click="commit">提交</el-button>
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
				model: {
					period: [],
					extraPeriod: [],
				},
				students: [],
				periodOptions: [
					{ value: '1-2节' },
					{ value: '3-4节' },
					{ value: '5-6节' },
					{ value: '7-8节' },
				],
				extraPeriodOptions: [
					{ value: 0.5 },
					{ value: 1 },
					{ value: 1.5 },
					{ value: 2 },
				],
			};
		},
		methods: {
			async fetchStu() {
				const res = await this.$http.get('rest/students');
				this.students = res.data;
			},

			async commit() {
				if (this.model.stuName && this.model.date && this.model.period) {
					const res = await this.$http.post('rest/oncalls', this.model);
					this.$message({
						message: '提交成功',
						type: 'success',
						center: true,
						offset: 300,
					});
					this.model = {};
					this.$router.go(0);
				} else {
					this.$message({
						message: '提交内容不完整',
						type: 'warning',
						center: true,
						offset: 300,
					});
				}
			},
		},
		created() {
			this.fetchStu();
		},
	};
</script>
