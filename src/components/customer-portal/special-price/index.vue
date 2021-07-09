<template>
    <div class="specialPriceMain">
        <div class="specialPrice">
            <div class="specialPriceHeader">
                <div class="title">每日特价</div>
                <div class="tabs">
                    <ul>
                        <li>精选</li>
                        <li>美食</li>
                        <li>百货</li>
                        <li>个护</li>
                        <li>预告</li>
                    </ul>
                </div>
            </div>
            <div class="specialPriceBody">
                <div class="left">
                    <img width="120px" height="120px" :src="jinxuData[4].pic"/>
                    <div>{{jinxuData[4].title}}</div>
                </div>
                <div class="right">
                    <div class="special_item_0">
                    </div>
                    <div class="special_item_list">
                        <div class="itemDiv" v-for="(item,index) in jinxuData" v-if="index<=3">
                            <div style="margin: auto"><img width="84px" height="84px" :src="item.pic"/></div>
                            <div style="margin: auto;margin-left:15px;">
                                 <div class="specTitle">{{item.title}}</div>
                                 <div class="price">￥29.9</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="brandBuy">
            <div class="title">品牌闪购</div>
            <div class="brandBody">
                <div class="leftArea">
                    <div>{{brandData[6].title}}</div>
                    <img :src="brandData[6].pic"/>
                </div>
                <div class="rightArea">
                    <ul>
                        <li v-for="(item,index) in brandData" :key="index" v-if="index<brandData.length-1">
                            <img style="margin: auto" width="100px" height="50px" :src="item.pic"/>
                            <div>{{item.title}}</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import {Component, Vue,Prop} from 'vue-property-decorator'
    import {Action, Getter} from 'vuex-class'
    @Component({
        components:{}
    })
    export default class SpecialPrice extends Vue {
        @Prop() params:any;
        private jinxuData=new Array<any>();
        private meisiData=new Array<any>();
        private baihuoData=new Array<any>();
        private gerenhuliData=new Array<any>();
        private yugaoData=new Array<any>();
        private brandData=new Array<any>();
        created(){
            this.jinxuData=this.params.filter(item=>item.categoryName=="特价商品-->精选");
            this.meisiData=this.params.filter(item=>item.categoryName=="特价商品-->美食");
            this.baihuoData=this.params.filter(item=>item.categoryName=="特价商品-->百货");
            this.gerenhuliData=this.params.filter(item=>item.categoryName=="特价商品-->个护");
            this.yugaoData=this.params.filter(item=>item.categoryName=="特价商品-->预告");
            this.brandData=this.params.filter(item=>item.categoryName=="品牌闪购");
        }
    }
</script>

<style lang="less" scoped>
    .specialPriceMain{
        height: 340px;
        width: 100%;
        display: flex;
        flex-direction: row;
        margin-top: 20px;
        .specialPrice{
            flex: 1;
            height: 340px;
            width: 540px;
            background: white;
            .specialPriceHeader{
                display: flex;
                margin-top: 10px;
                flex-direction: row;
                .title{
                    float: left;
                    font-weight: 700;
                    font-size: 24px;
                    color: #333;
                    line-height: 32px;
                }
                .tabs{
                    justify-content: flex-end;
                    flex: 1;
                    display: flex;
                    align-items: center;
                    margin-right: 10px;
                    ul{
                        margin: 0px;
                        padding: 0px;
                        max-height: 10px;
                        display: flex;
                        flex-direction: row;
                        li{
                            list-style-type: none;
                            margin-left: 10px;
                            vertical-align: middle;
                            display: inline-block;
                            cursor: pointer;
                            font-size: 14px;
                            font-family: Microsoft Yahei,PingFangSC-Medium,sans-serif,serif;
                            color: #999;
                            line-height: 19px;
                            padding-bottom: 2px;
                        }
                    }
                }

            }
            .specialPriceBody{
                display: flex;
                flex-direction: row;
                margin-top: 10px;
                .specTitle{
                    display: inline-block;
                    width: 100%;
                    color: #333;
                    height: 32px;
                    font-size: 12px;
                    line-height: 16px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    word-break: break-all;
                    font-family: Microsoft Yahei,PingFangSC-Medium,sans-serif,serif;
                }
                .left{
                    width: 170px;
                    height: 265px;
                    background-color: rgba(109,126,146,.05);
                    margin-right: 6px;
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    div{
                        margin-top: 15px;
                        margin-bottom: 4px;
                        height: 19px;
                        line-height: 19px;
                        width: 150px;
                        font-size: 14px;
                        display: inline-block;
                        text-align: center;
                    }
                    img{
                        margin-top: 30px;
                    }
                }
                .right{
                    flex: 1;
                    height: 290px;
                    .special_item_list{
                        display: flex;
                        flex-wrap: wrap;
                        flex-direction: row;
                        .itemDiv{
                            width:200px ;
                            height: 160px;
                            display: flex;
                            flex-direction: row;
                        }
                    }
                }
                .price{
                    line-height: 16px;
                    font-family: Arial-BoldMT,Microsoft Yahei,PingFangSC-Medium,sans-serif,serif;
                    color: #e1251b;
                    letter-spacing: 0;
                    margin-top: 5px;
                    font-weight: 700;
                    display: inline-block;
                }
            }
        }
        .brandBuy{
            flex: 1;
            background: white;
            margin-left: 10px;
            .title{
                font-weight: 700;
                font-size: 24px;
                color: #333;
                line-height: 32px;
                margin-left: 15px;
            }
            .brandBody{
                margin-left: 15px;
                margin-top: 20px;
                display: flex;
                flex-direction: row;
                .leftArea{
                    width: 265px;
                    height: 270px;
                    background: linear-gradient(180deg,rgba(161,215,152,.05),rgba(31,102,26,.05));
                    div{
                        margin-top: 15px;
                        margin-bottom: 4px;
                        height: 19px;
                        line-height: 19px;
                        width: 150px;
                        font-size: 14px;
                        display: inline-block;
                        text-align: center;
                    }
                }
                .rightArea{
                    ul{
                        margin: 0px;
                        padding: 0px;
                        margin-left: 18px;
                        flex-direction: row;
                        flex-wrap: wrap;
                        display: flex;
                        li{
                            list-style-type: none;
                            width: 50%;
                            margin-top: 15px;
                            justify-content: center;
                            flex-direction: column;
                            display: flex;
                            div{
                                color: #666;
                                margin-top: 6px;
                                font-size: 12px;
                                text-align: center;
                                font-weight: 400;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }
                        }
                    }
                }
            }
        }
    }
</style>