<template>
    <div class="recommondsMain">
        <div class="tabs"></div>
        <div  class="goodList">
            <div class="goodItem" @click="goToDetial(item)" v-for="(item ,index) in recommondsData">
                <img style="margin-left: auto;margin-right:auto;display: flex;margin-top: 30px" width="150px" height="150px" :src="item.spuImage"/>
                <div class="title">{{item.title}}</div>
                <div class="mainPrice">
                    <i class="mod_price_i">¥</i>
                    <span class="mod_price">{{item.spuPrice}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import {Component, Vue,Prop} from 'vue-property-decorator';
    import {Action, Getter} from 'vuex-class';
    import ApiActions from '@/components/api/api-actions';
    @Component({
        components:{}
    })
    export default class RecommondsIndex extends Vue {
        @Prop() params:any;
        private recommondsData=new Array<any>();
        private async created() {
            let apiActions=new ApiActions(this);
            let result:any=await apiActions.getSpuListPage({title:"",pager:{pageSize:500,currentPage:1}});
            this.recommondsData=result.data.rows;
        }
        private goToDetial(item:any){
            let routeOne = this.$router.resolve({
                name: "detial",
                query: {
                    id: item.id
                }
            });
            window.open(routeOne.href, '_blank');
        }
    }
</script>

<style lang="less" scoped>
    .recommondsMain{
         width: 100%;
         display: flex;
        .goodList{
            flex-direction: row;
            flex-wrap: wrap;
            width: 100%;
            display: flex;
            justify-content:space-between;
            .goodItem{
                width: 230px;
                height: 322px;
                background: white;
                margin-left: 5px;
                cursor: pointer;
                margin-top: 10px;
                .title{
                    height: 48px;
                    width: 190px;
                    margin-left: auto;
                    margin-right: auto;
                    font-size: 14px;
                    line-height: 24px;
                    text-align: left;
                    color: #666;
                    -webkit-transition: color .2s ease;
                    transition: color .2s ease;
                    word-break: break-all;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    margin-top: 40px;
                }
                .mainPrice{
                    width: 190px;
                    margin-left: auto;
                    margin-right: auto;
                    margin-top: 15px;
                    .mod_price{
                        display: inline-block;
                        line-height: 18px;
                        height: 18px;
                        color: #e1251b;
                        font-size: 20px;
                        font-weight: 700;
                        font-family: arial,sans-serif;
                    }
                    .mod_price_i{
                        vertical-align: middle;
                        font-size: 12px;
                        font-weight: 700;
                        font-family: MicrosoftYahei-regular,Arial,Helvetica,sans-serif;
                        color: #e1251b;
                        font-style: normal;
                    }
                }

            }
        }
    }
</style>