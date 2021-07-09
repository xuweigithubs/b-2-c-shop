import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/customer-portal/index.vue'
import Detial from '@/components/product-detial/index.vue'
import Login from '@/components/admin-manager/login.vue'
import Admin from '../components/admin-manager/index.vue'
import ProductCategory from '../components/admin-manager/product-manager/product-category.vue'
import Brand from '../components/admin-manager/product-manager/product-brand.vue'
import ProductSpecGrop from "../components/admin-manager/product-manager/product-spec-group.vue";
import ProductSpecParams from "../components/admin-manager/product-manager/product-spec-params.vue";
import ProductList from "../components/admin-manager/product-manager/product-list.vue";
import CmsCategoryList from "../components/admin-manager/cms-index-manager/cms-category-list.vue";
import CmsContentList from "../components/admin-manager/cms-index-manager/cms-content-list.vue";
import CartIndex from '@/components/cart/index.vue'
import CustomerLogin from '@/components/login/customer-login.vue'
import CustomerRegister from '@/components/login/customer-register.vue'
Vue.use(Router);
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
let router= new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: index,
            meta: {
                title: '网上商城首页'
            }
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: {
                title: '管理员登录'
            }
        },
        {
            path: '/customer/login',
            name: 'customerLogin',
            component: CustomerLogin,
            meta: {
                title: '个人登录'
            }
        },
        {
            path: '/customer/register',
            name: 'customerRegister',
            component: CustomerRegister,
            meta: {
                title: '个人注册'
            }
        },
        {
            path: '/detial',
            name: 'detial',
            component: Detial,
            meta: {
                title: '商品详情页'
            }
        },
        {
            path: '/cart',
            name: 'Cart',
            component: CartIndex,
            meta: {
                title: '购物车'
            }
        },
        {
            path: '/admin',
            name: 'admin',
            component: Admin,
            meta: {
                title: '管理员首页'
            },
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
                },
                {
                    path: 'cmsCategoryList',
                    component: CmsCategoryList,
                    meta: {keepAlive: false},
                },
                {
                    path: 'cmsContentList',
                    component: CmsContentList,
                    meta: {keepAlive: false},
                }
            ]
        }
    ]
});
router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    next()
})
export default router;
