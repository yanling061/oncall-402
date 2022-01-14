import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from '@/views/Main.vue';

import CategoryEdit from '@/views/category/CategoryEdit';
import CategoryList from '@/views/category/CategoryList';

import StudentEdit from '@/views/student/StudentEdit';
import StudentList from '@/views/student/StudentList';

import TeacherEdit from '@/views/teacher/TeacherEdit';
import TeacherList from '@/views/teacher/TeacherList';

import ClassNameEdit from '@/views/className/ClassNameEdit';
import ClassNameList from '@/views/className/ClassNameList';

import OncallEdit from '@/views/oncall/OncallEdit';
import OncallList from '@/views/oncall/OncallList';

import PatrolEdit from '@/views/patrol/PatrolEdit';
import PatrolList from '@/views/patrol/PatrolList';

import AdminUserEdit from '@/views/adminUser/AdminUserEdit';
import AdminUserList from '@/views/adminUser/AdminUserList';

import Login from '@/views/Login.vue';

Vue.use(VueRouter);

const router = new VueRouter({
	routes: [
		{
			path: '/login',
			name: 'Login',
			component: Login,
			meta: { isPublic: true },
		},
		{
			path: '/',
			component: Main,

			children: [
				{ path: '/', redirect: '/patrols/create', props: true },

				{ path: '/categories/create', component: CategoryEdit },
				{ path: '/categories/edit/:id', component: CategoryEdit, props: true },
				{ path: '/categories/list', component: CategoryList },

				{ path: '/students/create', component: StudentEdit },
				{ path: '/students/edit/:id', component: StudentEdit, props: true },
				{ path: '/students/list', component: StudentList },

				{ path: '/teachers/create', component: TeacherEdit },
				{ path: '/teachers/edit/:id', component: TeacherEdit, props: true },
				{ path: '/teachers/list', component: TeacherList },

				{ path: '/class_names/create', component: ClassNameEdit },
				{ path: '/class_names/edit/:id', component: ClassNameEdit, props: true },
				{ path: '/class_names/list', component: ClassNameList },

				{
					path: '/oncalls/create',
					component: OncallEdit,
					meta: { isPublic: true },
				},
				{ path: '/oncalls/list', component: OncallList },

				{
					path: '/patrols/create',
					component: PatrolEdit,
					meta: { isPublic: true },
				},
				{ path: '/patrols/list', component: PatrolList },

				{ path: '/admin_users/create', component: AdminUserEdit },
				{ path: '/admin_users/edit/:id', component: AdminUserEdit, props: true },
				{ path: '/admin_users/list', component: AdminUserList },
			],
		},
	],
});

router.beforeEach((to, from, next) => {
	if (!to.meta.isPublic && !localStorage.token) {
		Vue.prototype.$message({
			type: 'error',
			message: '请先登录',
		});
		next('/login');
	}
	next();
});

export default router;
