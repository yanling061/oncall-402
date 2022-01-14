import axios from 'axios';
import Vue from 'vue';
import router from './router';

const http = axios.create({
	baseURL: process.env.VUE_APP_API_URL || '/api',
	// baseURL: 'http://localhost:3001/api',
});

http.interceptors.request.use(
	config => {
		// Do something before request is sent
		if (localStorage.token) {
			config.headers.Authorization = 'Bearer ' + localStorage.token;
		}
		return config;
	},
	error => {
		// Do something with request error
		return Promise.reject(error);
	}
);

http.interceptors.response.use(
	res => {
		return res;
	},
	err => {
		if (err.response.data.message) {
			Vue.prototype.$message({
				type: 'error',
				message: err.response.data.message,
			});

			if (err.response.status === 401) {
				router.push('/login');
			}
		}
		return Promise.reject(err);
	}
);
export default http;
