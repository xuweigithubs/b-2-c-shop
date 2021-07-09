<template>
    <div class="cart">
        <index-top/>
        <cart-top/>
        <cart-main/>
        <common-footer/>
    </div>
</template>
<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import {Action, Getter} from 'vuex-class'
    import logo from '@/components/common/images/logo.png'
    import {namespace} from 'vuex-class';
    import IndexTop from "@/components/customer-portal/header/indexTop.vue";
    import CartTop from "@/components/cart/cartTop.vue";
    import cartMain from "@/components/cart/cartMain.vue";
    import Footer from  "@/components/customer-portal/footer/index.vue";
    import * as _ from 'lodash'
    const goodsName=namespace("goods");
    @Component({
        components:{
            IndexTop,
            CartTop,
            cartMain,
            CommonFooter:Footer
        }
    })
    export default class ProductTable extends Vue {
        @goodsName.State cartItemsCount;
        private async created() {
            //设置背景图片
        }
    }
</script>
<style lang="less">
    .cart{
        width: 100%;
        background-color: white;
    }
</style>