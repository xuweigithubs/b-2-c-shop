import Vue from 'vue';
import 'babel-polyfill'
import App from "./BusinessApp.vue";
// @ts-ignore
import ElementUI from "element-ui";
import router from './router';
import store from './store';
import promise from 'es6-promise';
import 'element-ui/lib/theme-chalk/index.css';
import {Plugin} from './plugins/plugins';
import VueQuillEditor from 'vue-quill-editor';
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)
Vue.use(ElementUI);
Vue.use(Plugin);
new Vue({
    store,
    el:"#root",
    render:h=>h(App),
    router
});