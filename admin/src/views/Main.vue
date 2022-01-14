<template>
	<el-container style="height: 100vh;">
		<el-menu
			v-if="isCollapse"
			router
			unique-opened
			:default-active="$route.path"
			class="el-menu-vertical-demo"
			collapse-transition
		>
			<el-submenu v-if="isLogin" index="1">
				<template slot="title"
					><i class="el-icon-edit-outline"></i>
					<span>内容管理</span>
				</template>

				<el-menu-item-group>
					<template slot="title"></template>
					<el-menu-item index="/oncalls/list"
						><i class="el-icon-sugar"></i>值班表</el-menu-item
					>
					<el-menu-item index="/patrols/list"
						><i class="el-icon-apple"></i>巡查表</el-menu-item
					>
				</el-menu-item-group>
				<el-menu-item-group>
					<template slot="title">学生</template>
					<el-menu-item index="/students/create"
						><i class="el-icon-ice-cream"></i>新建学生</el-menu-item
					>
					<el-menu-item index="/students/list"
						><i class="el-icon-dessert"></i>学生列表</el-menu-item
					>
				</el-menu-item-group>
				<el-menu-item-group>
					<template slot="title">任课教师</template>
					<el-menu-item index="/teachers/create"
						><i class="el-icon-chicken"></i>新建任课教师</el-menu-item
					>
					<el-menu-item index="/teachers/list"
						><i class="el-icon-cold-drink"></i>任课教师列表</el-menu-item
					>
				</el-menu-item-group>

				<el-menu-item-group>
					<template slot="title">上课班级</template>
					<el-menu-item index="/class_names/create"
						><i class="el-icon-chicken"></i>新建上课班级</el-menu-item
					>
					<el-menu-item index="/class_names/list"
						><i class="el-icon-cold-drink"></i>上课班级列表</el-menu-item
					>
				</el-menu-item-group>
				<el-menu-item-group>
					<template slot="title">管理员</template>
					<el-menu-item index="/admin_users/create"
						><i class="el-icon-cherry"></i>新建管理员</el-menu-item
					>
					<el-menu-item index="/admin_users/list"
						><i class="el-icon-pear"></i>管理员列表</el-menu-item
					>
				</el-menu-item-group>
			</el-submenu>
			<el-submenu v-if="isLogin" index="2">
				<template slot="title"
					><i class="el-icon-s-custom"></i><span>角色管理</span></template
				>
				<el-menu-item-group>
					<template slot="title">角色</template>
					<el-menu-item index="/categories/create"
						><i class="el-icon-potato-strips"></i>新建角色</el-menu-item
					>
					<el-menu-item index="/categories/list"
						><i class="el-icon-ice-cream-round"></i>角色列表</el-menu-item
					>
				</el-menu-item-group>
			</el-submenu>
			<el-submenu index="3">
				<template slot="title"
					><i class="el-icon-edit"></i><span>值班巡查</span></template
				>
				<el-menu-item-group>
					<template slot="title">新建内容</template>
					<el-menu-item index="/oncalls/create"
						><i class="el-icon-grape"></i>值班表</el-menu-item
					>
					<el-menu-item index="/patrols/create"
						><i class="el-icon-lollipop"></i>巡查表</el-menu-item
					>
				</el-menu-item-group>
			</el-submenu>
		</el-menu>

		<el-container>
			<el-header>
				<div style="flex:1" @click="changeCollapese">
					<i class="el-icon-s-unfold"></i>
				</div>
				<span v-if="isLogin" style="font-size:14px; padding: 0 10px"
					>你好, {{ username }}</span
				>
				<el-dropdown v-if="isLogin" @command="handleCommand">
					<i class="el-icon-setting" style="margin-right: 15px"></i>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item command="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
				<div v-else style="font-size: 17px;" @click="$router.push('/login')">
					<i class="el-icon-user-solid"></i>
					<span style="font-size: 14px; ">登录</span>
				</div>
				<span></span>
			</el-header>
			<el-main>
				<router-view :key="$route.path" />
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	export default {
		data() {
			return {
				isCollapse: false,
				isLogin: false,
				username: '',
			};
		},
		methods: {
			changeCollapese() {
				this.isCollapse = !this.isCollapse;
			},
			verifyLogin() {
				const token = localStorage.token;
				if (token) {
					this.isLogin = true;
					this.username = localStorage.username;
				}
			},
			handleCommand(command) {
				if (command === 'logout') {
					localStorage.clear();
					this.isLogin = false;
					this.$router.push('/oncalls/create');
					this.$router.go(0);
				}
			},
		},
		created() {
			this.verifyLogin();
		},
	};
</script>

<style>
	.el-header {
		display: flex;
		font-size: 1.25rem;
		color: #909399;
		line-height: 60px;
		border-bottom: 1px solid #efefef;
	}

	/* .el-aside {
		min-width: 200px;
		color: #333;
	} */

	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 200px;
		min-height: 400px;
	}

	.el-submenu {
		width: 190px;
		z-index: 0;
	}

	/* .el-header {
		z-index: 1;
	} */
	.el-icon-setting {
		font-size: 1rem !important;
	}
</style>
