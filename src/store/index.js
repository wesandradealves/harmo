import Vue from "vue";
import Vuex from "vuex";
import NProgress from "nprogress";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		routes: [],
		reviews: [],
		filter: {
			bool: false,
			date: ''
		}
	}
});
