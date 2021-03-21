import Vue from 'vue';
import goods from './modules/goods-store';
import Vuex from 'vuex';
Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        goods,
    },
})
