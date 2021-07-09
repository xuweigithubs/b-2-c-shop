<template>
        <div class="portal">
            <common-header/>
            <div class="categoryCms">
                <div class="w">
                    <common-category/>
                    <main-rotation-chart :params="params" v-if="isShowCms"/>
                </div>
                <div class="w maisha">
                    <common-miao-sha :params="params" v-if="isShowCms"/>
                </div>
                <div>
                    <common-gobal-nice-goods :params="params" v-if="isShowCms"/>
                </div>
                <div class="w">
                    <common-special-price :params="params" v-if="isShowCms"/>
                </div>
                <div class="w discoverNiceGoods">
                    <common-discover-nice-goods :params="params" v-if="isShowCms"/>
                </div>
                <div class="w">
                    <common-new-goods :params="params" v-if="isShowCms"/>
                </div>
                <div class="w">
                    <common-channels :params="params" v-if="isShowCms"/>
                </div>
                <div class="w">
                    <common-recommonds :params="params" v-if="isShowCms"/>
                </div>
                <div>
                    <common-footer :params="params" v-if="isShowCms"/>
                </div>
            </div>
        </div>
</template>
<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import {Action, Getter} from 'vuex-class'
    import Header from  './header/index.vue'
    import Category from "./category/index.vue";
    import RotationChart from "./rotation-chart/index.vue";
    import MiaoSha from "./miao-sha/index.vue";
    import GobalNiceGoods from "./gobal-nice-goods/index.vue";
    import SpecialPrice from "./special-price/index.vue";
    import DiscoverNiceGoods from "./discover-nice-goods/index.vue";
    import NewGoods from "./new-goods/index.vue";
    import Channels from "./channels/index.vue";
    import Recommonds from "./recommonds/index.vue";
    import Footer from "./footer/index.vue";
    import ApiActions from '@/components/api/api-actions';
    @Component({
        components:{
            MainRotationChart:RotationChart,
            CommonCategory:Category,
            CommonHeader:Header,
            CommonMiaoSha:MiaoSha,
            CommonGobalNiceGoods:GobalNiceGoods,
            CommonSpecialPrice:SpecialPrice,
            CommonDiscoverNiceGoods:DiscoverNiceGoods,
            CommonNewGoods:NewGoods,
            CommonChannels:Channels,
            CommonRecommonds:Recommonds,
            CommonFooter:Footer
        }
    })
    export default class ProductIndex extends Vue {
        private isShowCms:any=false;
        private params:any={};
        private async created() {
           let apiActions=new ApiActions(this);
           let result=await apiActions.getCmsContent({});
           this.params=result.data;
           this.isShowCms=true;
        }
    }
</script>
<style type="text/css" lang="less">
    body{
        font: 12px/1.5 Microsoft YaHei,Heiti SC,tahoma,arial,Hiragino Sans GB,"\5B8B\4F53",sans-serif;
        color: #666;
    }
    .portal{
        margin-bottom: 20px;
        width: 100%;
        .categoryCms{
            margin-top: 3px;
            background: url("//img10.360buyimg.com/babel/jfs/t1/179214/17/4974/86871/60a4d856E263cbf89/5580001e18881b2d.png.webp") 50% 0px no-repeat;
            .w{
                width:1190px;
                margin: auto;
                display: flex;
                flex-direction:row;
            }
            .maisha{
                margin-top: 23px;
            }
            .discoverNiceGoods{
                margin-top: 8px;
            }
        }
    }
    #app{
        font: 12px/1.5 Microsoft YaHei,Heiti SC,tahoma,arial,Hiragino Sans GB,"\5B8B\4F53",sans-serif;
        color: #666!important;
    }
</style>