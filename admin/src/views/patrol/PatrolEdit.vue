<template>
	<div class="page-create">
		<el-tabs type="border-card">
			<el-tab-pane label="新增巡查">
				<el-form ref="form" label-width="80px">
					<el-form-item label="巡查人" required>
						<el-select v-model="model.stuName" filterable>
							<el-option
								v-for="stu of students"
								:key="stu._id"
								:label="stu.name"
								:value="stu._id"
								>{{ stu.name }}</el-option
							>
						</el-select>
					</el-form-item>
					<el-form-item label="巡查日期" required>
						<div class="block">
							<el-date-picker
								:editable="false"
								v-model="model.date"
								type="date"
								placeholder="选择日期"
								format="yyyy-MM-dd"
								value-format="yyyy-MM-dd"
							>
							</el-date-picker>
						</div>
					</el-form-item>
					<el-form-item label="节次" required>
						<el-select v-model="model.period">
							<el-option
								v-for="option of periodOptions"
								:key="option.value"
								:value="option.value"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="课室" required>
						<el-select
							v-model="model.classroom"
							filterable
							@focus="closeReadOnly"
							@blur="closeReadOnly"
						>
							<el-option v-for="room of classroom" :key="room" :value="room">{{
								room
							}}</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="教师">
						<el-select
							v-model="model.teacher"
							filterable
							:allow-create="true"
							default-first-option
							@focus="closeReadOnly"
							@blur="closeReadOnly"
						>
							<el-option
								v-for="teacher of teachers"
								:key="teacher._id"
								:value="teacher.name"
								>{{ teacher.name }}</el-option
							>
						</el-select>
					</el-form-item>
					<el-form-item label="班级">
						<el-select
							v-model="model.className"
							filterable
							:allow-create="true"
							default-first-option
							@focus="closeReadOnly"
							@blur="closeReadOnly"
						>
							<el-option
								v-for="className of classNames"
								:key="className._id"
								:value="className.name"
								>{{ className.name }}</el-option
							>
						</el-select>
					</el-form-item>
					<el-form-item label="巡查情况">
						<el-input
							type="textarea"
							v-model="model.note"
							placeholder="机房设备问题..."
						></el-input>
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
				},
				students: [],
				periodOptions: [{ value: '1-4节' }, { value: '5-8节' }],
				classroom: [
					'Y404',
					'Y406',
					'Y412',
					'Y413',
					'Y415',
					'Y416',
					'Y508',
					'S603',
					'S604',
					'S606',
				],
				teachers: [],
				classNames: [],
			};
		},
		methods: {
			closeReadOnly() {
				Array.from(document.getElementsByClassName('el-select')).forEach(d => {
					d.children[0].children[0].removeAttribute('readOnly');
					d.children[0].children[0].onblur = function() {
						let _this = this;
						_this.removeAttribute('readOnly');
					};
				});
			},
			async fetchStudents() {
				const res = await this.$http.get('rest/students');
				this.students = res.data;
			},
			async fetchTeachers() {
				const res = await this.$http.get('rest/teachers');
				this.teachers = res.data;
			},
			async fetchClassNames() {
				const res = await this.$http.get('rest/classNames');
				this.classNames = res.data;
			},

			async commit() {
				if (
					this.model.stuName &&
					this.model.date &&
					this.model.period &&
					this.model.classroom
				) {
					const res = await this.$http.post('rest/patrols', this.model);
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
			this.fetchStudents();
			this.fetchTeachers();
			this.fetchClassNames();
		},
	};
</script>
