<template>
    <div class="cartTop">
        <ul>
            <li><img :src="logImg" width="150px" height="55px" alt="" /></li>
            <li class="searchArea"><input type="text" class="searchText"/><input type="button" value="搜索" class="button"/></li>
        </ul>
    </div>
</template>
<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import {Action, Getter} from 'vuex-class'
    import logo from '@/components/common/images/logo.png'
    import {namespace} from 'vuex-class';
    import IndexTop from "@/components/customer-portal/header/indexTop.vue";
    import * as _ from 'lodash'
    const goodsName=namespace("goods");
    @Component({
        components:{
            IndexTop
        }
    })
    export default class ProductTable extends Vue {
        @goodsName.State cartItemsCount;
        private logImg:any="";
        private async created() {
            //设置背景图片
            this.logImg=logo;
        }
    }
</script>
<style lang="less">
    .cartTop{
        display: flex;
        margin-top: 30px;
        ul{
            width: 100%;
            height:55px;
            display: flex;
            margin: 0px;
            padding: 0px;
            justify-content: space-between;
            align-items: center;
            margin-left: 280px;
            margin-right: 280px;
            li{
                list-style-type: none;
            }
            .searchArea{
                display: flex;
                justify-content: center;
                flex-direction: row;
                border: 2px solid #c91623;
                background: #c91623;
                height: 24px;
                .button{
                    display: inline-block;
                    vertical-align: top;
                    width: 48px;
                    height: 24px;
                    background: #c91623;
                    text-align: center;
                    color: #fff;
                    font-weight: 700;
                    margin: 0;
                    padding: 0;
                    border: 0;
                    text-align: center;
                    cursor: pointer;
                }
                .searchText{
                    border: 0;
                    height: 18px;
                    line-height: 18px;
                    width: 260px;
                    padding: 3px 5px;
                    padding: 3px 5px 2px;
                    outline: none;
                }
            }
        }
    }
</style>