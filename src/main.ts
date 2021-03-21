import Vue from 'vue';
import App from "./BusinessApp.vue";
import ElementUI from "element-ui";
import router from './router';
import store from './store';
import 'element-ui/lib/theme-chalk/index.css';
import {Plugin} from './plugins/plugins';
Vue.use(ElementUI);
Vue.use(Plugin);
new Vue({
    store,
    el:"#root",
    render:h=>h(App),
    router
});