<template>
   <div class="goabal">
       <index-top/>
       <div class="headerBody">
           <div class="w">
               <div style="margin: auto;width: 180px"><img :src="logo" width="150px" height="55px" alt="" /></div>
               <div class="headerBodyRight">
                   <div class="searchArea">
                       <ul>
                           <li><input type="text" class="searchText"/><span class="searchButton">搜索</span></li>
                           <li><span class="myCar" @click="goToCar">我的购物车</span><img :src="myCarIcon" width="15px" height="15px" alt=""/><span class="cartNumber">{{cartItemsCount==0?cartItemCountLocal:cartItemsCount}}</span></li>
                       </ul>
                   </div>
                   <div class="navgation">
                       <ul>
                           <li>京东时尚</li>
                           <li>美妆馆</li>
                           <li>超市</li>
                           <li>生鲜</li>
                           <li>京东国际</li>
                           <li>闪购</li>
                           <li>拍卖</li>
                           <li>金融</li>
                       </ul>
                   </div>
               </div>
           </div>
       </div>
   </div>
</template>
<script lang="ts">
   import {Component, Vue} from 'vue-property-decorator'
   import {Action, Getter} from 'vuex-class'
   import home from "@/components/common/images/home.png"
   import location from '@/components/common/images/location.png'
   import logo from '@/components/common/images/logo.png'
   import myCar from '@/components/common/images/car.png'
   import addCarSuccess from '@/components/common/images/successIcon.png'
   import goToCar from '@/components/common/images/go.png';
   import IndexTop from "@/components/customer-portal/header/indexTop.vue";
   import {namespace} from 'vuex-class';
   import * as _ from 'lodash'
   const goodsName=namespace("goods");
   @Component({
      components:{
          IndexTop
      }
   })
   export default class ProductTable extends Vue {
         @goodsName.State cartItemsCount;
          private imgSrc:any="";
          //地址图片
          private locationImgSrc:any="";
          //log图片
          private logo:any="";
          //购物车图片
          private myCarIcon:any="";
          //添加购物车成功图片
          private addCarSuccess:any="";
          private productImagePath:any="";
          private goImg:any="";
          private async created() {
              //设置背景图片
              this.imgSrc=home;
              this.locationImgSrc=location;
              this.logo=logo;
              this.myCarIcon=myCar;
              this.addCarSuccess=addCarSuccess;
              this.goImg=goToCar;
          }
          private get cartItemCountLocal(){
              let cartItems:Array<any>=JSON.parse(localStorage.getItem("cart"));
              return cartItems?cartItems.length:0;
          }
          //进入购物车
          private goToCar(){
               window.open("http://localhost:8080/#/cart")
          }
   }
   </script>
   <style lang="less">
   .goabal{
      display: flex;
      flex-direction:column;
      li:hover{
         color: red;
      }
      li{
         cursor: pointer;
         list-style-type: none;
      }
      ul{
         margin: 0;
         padding: 0;
      }
       .headerBody{
            background: white;
            .w{
                width: 1190px;
                margin: auto;
                display: flex;
                flex-direction: row;
                .headerBodyRight{
                    flex: 1;
                }
            }
       }
      .navgation{
            width: 100%;
            height: 33px;
            margin-left: 40px;
            ul{
               display: flex;
               flex: 1;
               margin: 0;
               flex: 1;
               justify-content:flex-start;
               padding: 0;
               li{
                   list-style-type: none;
                   display: flex;
                   align-items: center;
                   margin-right: 10px;
                   white-space: nowrap;
                   color: #999;
                   font-size: 12px;
               }
         }
      }
      .searchArea{
         height: 60px;
         margin-top: 10px;
         display: flex;
          margin-left: 40px;
         ul{
            display: flex;
            flex: 1;
            height: 100%;
            margin: 0;
            align-items: center;
            justify-content: space-between;
            padding: 0;
            li{
               list-style-type: none;
               display: flex;
            }
            li:nth-child(1){
                  border-radius: 2px;
                  height: 30px;
                  display: flex;
                  .searchButton{
                     background: red;
                     width: 100px;
                     height: 100%;
                     line-height: 31px;
                     text-align: center;
                     border: 3px solid red;
                     color: #fff;
                     cursor: pointer;
                  }
                  input{
                     text-rendering: auto;
                     color: -internal-light-dark(black, white);
                     letter-spacing: normal;
                     word-spacing: normal;
                     text-transform: none;
                     text-indent: 0px;
                     text-shadow: none;
                     display: inline-block;
                     text-align: start;
                     background-color: -internal-light-dark(rgb(255, 255, 255), rgb(59, 59, 59));
                     -webkit-rtl-ordering: logical;
                     cursor: text;
                     margin: 0em;
                     font: 400 13.3333px Arial;
                     padding: 1px 2px;
                     border-width: 2px;
                     border-style: inset;
                     border-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
                     border-image: initial;
                     width: 500px;
                     height: 24px;
                     line-height: 24px;
                     color: #999;
                     padding: 4px;
                     margin-bottom: 4px;
                     border-width: 2px 0 2px 2px;
                     border-color: #f30213;
                     border-style: solid;
                     outline: 0;
                     font-size: 12px;
                  }
            }
            li:nth-child(2){
               width: 100px;
               height: 34px;
               display: flex;
               border: 1px solid #DFDFDF;
               background: #F9F9F9;
               line-height: 34px;
               margin-right: 40px;
               align-items: center;
               padding-left: 10px;
               padding-right: 10px;
               justify-content: center;
               cursor: pointer;
               .myCar{
                  font: 12px/150% tahoma,arial,Microsoft YaHei,Hiragino Sans GB,"\u5b8b\u4f53",sans-serif;-webkit-font-smoothing: antialiased;
                  color: #f30213;
                  line-height: 34px;
                  text-align: center;
               }
               img{
                  margin-left: 2px;
               }
                .cartNumber{
                    margin-left:3px;
                    display: inline-block;
                    padding: 1px;
                    font-size: 12px;
                    line-height: 14px;
                    letter-spacing: -1px;
                    color: #fff;
                    background-color: #da1026;
                    border-radius: 7px;
                    min-width: 14px;
                    font-family: tahoma,arial;
                    text-align: center;
                }
            }
            li:nth-child(3):hover{
               border: 1px solid red;
            }
         }
      }
   }
</style>