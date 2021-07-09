<template>
    <div class="newGoodsMain">
        <div class="newGoods">
            <div class="newGoodName">新品首发</div>
            <div id="photo_box">
                <div class="photo_box_item" v-if="index<3" v-for="(item,index) in itemData" >
                    <img style="width:130px;height:130px;" :src="item.pic"/>
                    <div class="titleName" v-if="index==1">{{item.title}}</div>
                    <div class="priceClass" v-if="index==1">￥1190.00起</div>
                </div>
            </div>
        </div>
        <div class="newGoods">
            <div class="rankDataName">排行榜</div>
            <div class="rankTab">
                <ul>
                    <li :title="title" @mouseenter="showProductByRankTab(item)" v-for="item in itemRankTabDataRander">{{item.tabName}}</li>
                </ul>
            </div>
            <div class="rankData">
                <ul>
                    <li v-for="(childrenItem,index) in itemRankTabDataChildrenRander" v-if="index<3">
                        <img style="width:80px;height: 70px" :src="childrenItem.pic"/>
                        <div style="margin-left: 5px">
                            <div  class="titleClass">{{childrenItem.title}}</div>
                            <div class="price">¥ 5880</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="newGoods">
            <div class="shopDataName">逛号店</div>
            <div class="shopData">
                <ul>
                    <li v-for="(item,index) in niceShopData" v-if="index<2">
                        <div class="descInfo">{{item.title}}</div>
                        <div class="imgInfo">
                            <img style="width:90px;height:90px;margin:auto" :src="item.pic"/>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="newGoods">
            <div class="couponDataName">优惠卷</div>
            <div class="bg">
                <div style="display: flex;align-items: center;height: 86px" v-for="item in couponData">
                    <div style="margin-left:45px;margin-top: -18px;"><img :src="item.pic" style="width:50px;height: 50px;"></div>
                    <div style="margin-left: 20px;" class="couponDataNameTitle">{{item.title}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import {Component, Vue,Prop} from 'vue-property-decorator'
    import {Action, Getter} from 'vuex-class'
    import _ from "lodash";
    @Component({
        components:{}
    })
    export default class NewGoods extends Vue {
        @Prop() params:any;
        private title="";
        private itemData:any=new Array<any>();
        private itemRankData=new Array<any>();
        private itemRankTabData=new Array<any>();
        private itemRankTabDataRander=new Array<any>();
        private itemRankTabDataChildrenRander=new Array<any>();
        private niceShopData:Array<any>=new Array<any>();
        private couponData:Array<any>=new Array<any>();
        created(){
            this.itemData=this.params.filter(item=>item.categoryName=="新品首发");
            this.niceShopData=this.params.filter(item=>item.categoryName=="好店信息");
            this.couponData=this.params.filter(item=>item.categoryName=="优惠卷");
            this.itemRankData=this.params.filter(item=>item.categoryName.indexOf("排行榜")>-1);
            this.itemRankTabData=_.unionBy(this.itemRankData,"categoryName");
            this.itemRankTabDataRander=this.itemRankTabData.map(item=>{
                //获取该tab下的孩子节点
                let children:Array<any>=this.itemRankData.filter(rankItem=>rankItem.categoryName==item.categoryName);
                return {
                    tabName:item.categoryName.split("-->")[1],
                    children:children
                }
            });
            this.itemRankTabDataChildrenRander=this.itemRankTabDataRander[0].children;
        }
        private showProductByRankTab(item:any){
            this.itemRankTabDataChildrenRander=this.itemRankTabDataRander.find(curItem=>curItem.tabName==item.tabName).children;
            this.title=item.tabName;
        }
    }
</script>

<style lang="less">
    .newGoodsMain{
        height: 340px;
        width: 100%;
        display: flex;
        flex-direction: row;
        margin-top: 10px;
        .newGoods{
            display: flex;
            flex-direction: column;
            width: 25%;
            margin-left: 10px;
            background-color: white;
            #photo_box{
                width: 100%;
                height: 180px;
                margin-top: 20px;
                display: flex;
                flex-direction: row;
                justify-content:left;
                perspective: 100px;
                transform-style: preserve-3d;/*表示所有子元素在3D空间中呈现*/
                .photo_box_item{
                    left:67px!important;
                    margin-top: 10px;
                }
                .photo_box_item:nth-child(1){
                    transform: translate3d(-141px, -27px, -40px) scale(0.6,1);
                    position: absolute;
                }
                .photo_box_item:nth-child(2){
                    transform: rotate3d(1deg) translate3d(0px,0px,0px);
                    position: absolute;
                }
                .photo_box_item:nth-child(3){
                    transform: translate3d(141px, -26px, -39px) scale(0.6,1);
                    position: absolute;
                }
                .titleName{
                    display: block;
                    max-height: 2.6em;
                    line-height: 1.3em;
                    font-size: 14px;
                    margin-top: 20px;
                    color: #333;
                    overflow: hidden;
                    transition: all .2s ease;
                    font-family: Microsoft Yahei,PingFangSC-Medium,sans-serif,serif;
                    width:130px;
                    text-overflow: ellipsis;
                    white-space:nowrap;
                }
            }
            .newGoodName{
                margin-left:10px;
                font-weight: 700;
                font-size: 24px;
                margin-top: 20px;
                color: #333;
                line-height: 32px;
            }
            .priceClass{
                margin-top: 20px;
                font-family: Arial-BoldMT,Microsoft Yahei,PingFangSC-Medium,sans-serif,serif;
                font-size: 18px;
                color: #e1251b;
                letter-spacing: 0;
            }
        }
        .newGoods:nth-child(1){
            margin-left: 0px;
        }
        .newGoods:nth-child(2){
            .rankDataName{
                margin-left:10px;
                font-weight: 700;
                font-size: 24px;
                margin-top: 20px;
                color: #333;
                line-height: 32px;
            }
            .rankTab{
                margin-top: 8px;
                ul{
                    margin: 0px;
                    padding: 0px;
                    display: flex;
                    flex-direction: row;
                    li{
                        display: flex;
                        cursor: pointer;
                        list-style-type: none;
                        display: inline-block;
                        max-width: 70px;
                        padding-left: 2px;
                        padding-right: 2px;
                        text-align: center;
                        overflow: hidden;
                        white-space:nowrap;
                        text-overflow: ellipsis;
                        color: #999;
                        font-size: 12px;
                        background-color: #f6f6f6;
                        height: 20px;
                        line-height: 20px;
                        margin: 0 4px;
                        width: 66px;
                        text-align: center;
                        border-radius: 12px;
                        font-family: Microsoft Yahei,PingFangSC-Medium,sans-serif,serif;
                    }
                    li:hover{
                        background-color: #e1251b;
                        color: #fff;
                    }
                }
            }
            .rankData{
                ul{
                    padding: 0px;
                    margin: 0px;
                    li{
                        list-style-type: none;
                        display: flex;
                        flex-direction: row;
                        margin-top: 13px;
                        .titleClass{
                            max-height: 2.6em;
                            line-height: 1.3em;
                            font-size: 14px;
                            word-break: break-all;
                            color: #333;
                            overflow: hidden;
                            -webkit-transition: all .2s ease;
                            transition: all .2s ease;
                            font-family: Microsoft Yahei,PingFangSC-Medium,sans-serif,serif;
                        }
                        .price{
                            font-family: Arial-BoldMT,Microsoft Yahei,PingFangSC-Medium,sans-serif,serif;
                            font-size: 16px;
                            color: #e1251b;
                            letter-spacing: 0;
                            margin-top: 10px;
                        }
                    }
                }
            }
        }
        .newGoods:nth-child(3){
            .shopDataName{
                margin-left:10px;
                font-weight: 700;
                font-size: 24px;
                margin-top: 20px;
                color: #333;
                line-height: 32px;
            }
            .shopData{
                height: 100%;
                margin-top: 10px;
                ul{
                    height: calc(100% - 30px);
                    margin: 0px;
                    padding: 0px;
                    li{
                        list-style-type: none;
                        display: flex;
                        flex-direction: row;
                        margin: 10px;
                        height: 50%;
                        background-color:rgba(246, 239, 243, 1);
                        .descInfo{
                            width: 140px;
                            height: 100px;
                            margin: auto;
                            line-height: 1.3em;
                            font-size: 14px;
                            color: #333;
                            -webkit-transition: color .2s ease;
                            transition: color .2s ease;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                        }
                        .imgInfo{
                            width: 100px;
                            height: 100px;
                            margin: auto;
                        }
                    }
                }
            }
        }
        .newGoods:nth-child(4){
              .couponDataName{
                    margin-left:10px;
                    font-weight: 700;
                    font-size: 24px;
                    margin-top: 20px;
                    color: #333;
                    line-height: 32px;
             }
             .bg{
                 margin-top: 20px;
                  background: url("http://localhost/images/static/coupon-background.png") no-repeat bottom;
                 .couponDataNameTitle{
                     width: 150px;
                     font-size: 12px;
                     line-height: 18px;
                     height: 18px;
                     white-space: nowrap;
                     overflow: hidden;
                     text-overflow: ellipsis;
                 }
             }

        }
    }
</style>