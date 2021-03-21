import Vue from 'vue'
import Router from 'vue-router'
import addProductToCart from '@/components/customer-portal/cart/add-product-to-cart.vue'
import Admin from '../components/admin-manager/index.vue'
import ProductCategory from '../components/admin-manager/product-manager/product-category.vue'
import Brand from '../components/admin-manager/product-manager/product-brand.vue'
import ProductSpecGrop from "../components/admin-manager/product-manager/product-spec-group.vue";
import ProductSpecParams from "../components/admin-manager/product-manager/product-spec-params.vue";
import ProductList from "../components/admin-manager/product-manager/product-list.vue";
Vue.use(Router);
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
export default new Router({
    routes: [
        {
            path: '/addProductToCart',
            name: 'addProductToCart',
            component: addProductToCart,
        },
        {
            path: '/admin',
            name: 'admin',
            component: Admin,
            children: [
                {
                    path: 'productSpecGrop',
                    component: ProductSpecGrop,
                    meta: {keepAlive: false},
                },
                {
                    path: 'productCategory',
                    component: ProductCategory,
                    meta: {keepAlive: false},
                },
                {
                    path: 'brand',
                    component: Brand,
                    meta: {keepAlive: false},
                },
                {
                    path: 'productSpecParams',
                    component: ProductSpecParams,
                    meta: {keepAlive: false},
                },
                {
                    path: 'productList',
                    component: ProductList,
                    meta: {keepAlive: false},
                }
            ]
        }
    ]
})
