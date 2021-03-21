<template>
   <div class="goabal">
      <div class="header">
         <div class="mainWidth">
               <div class="titleLeft">
                  <ul>
                     <li><img :src="imgSrc" width="15px" height="15px" alt="" /><span class="title">商城首页</span></li>
                     <li><img :src="locationImgSrc" width="15px" height="15px" alt="" /><span class="title">广东</span></li>
                 </ul>
               </div>
               <div class="titleRight">
                  <ul>
                     <li>你好，请登录</li>
                     <li>免费注册</li>
                     <li>我的订单</li>
                     <li>我的京东</li>
                     <li>京东会员</li>
                     <li>企业采购</li>
                     <li>客户服务</li>
                     <li>网站导航</li>
                     <li>手机京东</li>
                  </ul>
               </div>
        </div>
      </div>
      <div class="searchArea">
         <ul>
            <li><img :src="logo" width="150px" height="55px" alt="" /></li>
            <li><input type="text" class="searchText"/><span class="searchButton">搜索</span></li>
            <li><span class="myCar">我的购物车</span><img :src="myCarIcon" width="15px" height="15px" alt=""/></li>
         </ul>
      </div>
      <div class="navgation">
         <ul>
            <li><span>全部商品分类</span></li>
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
      <div class="headerLine"></div>
      <div class="addCarSuccess">
          <div class="addSuccessTips"><img :src="addCarSuccess" width="25px" height="25px" alt="" /><span>商品已成功加入购物车！</span></div>
          <div class="addSuccessProduct">
             <ul>
                <li>
                   <img :src="productImagePath" width="60px" height="60px" alt="" />
                   <span class="productDescription">
                      <span>港荣蒸蛋糕 奶香味900g/箱 饼干蛋糕 营养早餐食品 手撕面包口袋吐司 休闲零食小吃</span>
                      <span>颜色：奶香900g/ 数量：1</span>
                   </span>
                </li>
                <li>
                   <span class="viewDetial">查看商品详情</span>
                   <span class="goToCart">去购物车结算<img width="15px" height="16px" :src="goImg"/></span>
                </li>
             </ul>
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
   import goToCar from '@/components/common/images/go.png'

   @Component
   export default class ProductTable extends Vue {
      @Action('getAllGoods') public  getAllGoods: any;
      @Getter('allGoods') public goods: any;
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
          let image= require("@/components/customer-portal/images/product-images/1.png");
          this.productImagePath=image;
          this.goImg=goToCar;
          await this.getAllGoods();
      }
      }
   </script>
   <style lang="less">
   .goabal{
      display: flex;
      flex-direction: column;
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
      .header{
         width: 100%;
         height: 30px;
         min-width: 1000px;
         display: flex;
         line-height: 30px;
         background: #e3e4e5;
         border-bottom: solid 1px #ddd;
         .mainWidth{
            display: flex;
            width: 100%;
            flex-wrap: wrap;
            margin-left: 150px;
            margin-right: 150px;
            align-content: stretch;
            .titleLeft{
               width: 40%;
               height: 100%;
               display: flex;
               ul{
                  height: 100%;
                  display: flex;
                  flex: 1;
                  margin: 0;
                  padding: 0;
                  li{
                     height: 100%;
                     list-style-type: none;
                     display: flex;
                     align-items: center;
                     .title{
                        margin-left: 5px;
                        color: #999;
                        min-width: 60px;
                        font: 12px/150% tahoma,arial,Microsoft YaHei,Hiragino Sans GB,"\u5b8b\u4f53",sans-serif;
                     }
                  }
               }
            }
            .titleRight{
               width: 60%;
               height: 100%;
               ul{
                  display: flex;
                  flex: 1;
                  height: 100%;
                  justify-content: flex-end;
                  margin: 0;
                  align-items: center;
                  padding: 0;
                  li:nth-child(1){
                     min-width: 75px;
                  }
                  li{
                     list-style-type: none;
                     border-right: 1px solid #999;
                     display: flex;
                     align-items: center;
                     height: 15px;
                     color: #999;
                     padding: 0px 10px 0px 10px;
                     min-width: 50px;
                     font: 12px/150% tahoma,arial,Microsoft YaHei,Hiragino Sans GB,"\u5b8b\u4f53",sans-serif;
                      .title{
                        margin-left: 5px;
                        color: #999;
                        min-width: 50px;
                        font: 12px/150% tahoma,arial,Microsoft YaHei,Hiragino Sans GB,"\u5b8b\u4f53",sans-serif;
                     }
                  }
               }
            }
         }
       }
      .navgation{
            width: 100%;
            margin-left: 150px;
            margin-right: 150px;
            height: 33px;
            ul{
               display: flex;
               flex: 1;
               height: 100%;
               margin: 0;
               flex: 1;
               justify-content:flex-start;
               padding: 0;
               li{
                  list-style-type: none;
                  display: flex;
                  font-weight: 700;
                  padding: 0 22px;
                  align-items: center;
                  font-size: 14px;
               }
               li:nth-child(1){
                  width: 150px;
                  display: flex;
                  justify-content: center;
                  background-color: red;
                  align-items: center;
                  color: #fff;
                  font-size: 14px;
               }
         }
      }
      .searchArea{
         height: 60px;
         margin-top: 10px;
         display: flex;
         padding-left: 150px;
         padding-right: 150px;
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
            li:nth-child(2){
                  border-radius: 2px;
                  height: 30px;
                  display: flex;
                  .searchButton{
                     background: red;
                     width: 100px;
                     height: 100%;
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
            li:nth-child(3){
               width: 91px;
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
            }
            li:nth-child(3):hover{
               border: 1px solid red;
            }
         }
      }
      .headerLine{
         width: 100%;
         border-top: 2px solid red;
         margin-top: 2px;
      }
      .addCarSuccess{
         height: 145px;
         background: #f5f5f5;
         margin-bottom: 20px;
         width: 100%;
         .addSuccessTips{
            color: #71b247;
            margin-left: 150px;
            margin-right: 150px;
            font-size: 18px;
            line-height: 25px;
            font-weight: 400;
            display: flex;
            align-items: center;
            margin-top: 25px;
         }
         .addSuccessProduct{
            width: 100%;
            height: 70px;
            display: flex;
            ul{
               display: flex;
               width: 100%;
               align-items: center;
               justify-content: space-between;
               margin-top: 20px;
               padding-left: 150px;
               padding-right: 150px;
               li{
                  display: flex;
               }
               .viewDetial{
                  background: #fff;
                  color: #E2231A;
                  border: 1px solid #fff;
                  height: 30px;
                  width: 100px;
                  padding: 0 30px;
                   display: flex;
                  align-items: center;
                  justify-content: center;
                  border: 1px solid red;
               }
               .goToCart{
                  margin-left: 20px;
                  height: 30px;padding-left: 30px;
                  display: flex;
                  width: 130px;
                  display: flex;
                  background: #E2231A;
                  border: 1px solid #E2231A;
                  color: #fff;
                  justify-content: center;
                  align-items: center;
                  padding-left: 10px;
               }
               .productDescription{
                  display: flex;
                  margin-left: 20px;
                  flex-direction: column;
                  span:nth-child(1){
                      color: #333;
                      text-decoration: none;
                      cursor: pointer;
                      white-space: nowrap;
                      font-size: 14px;
                  }
                  span:nth-child(2){
                     color: #aaa;
                         font-family: "Microsoft YaHei";
                         font: 12px/150% tahoma,arial,Microsoft YaHei,Hiragino Sans GB,"\u5b8b\u4f53",sans-serif;
                         -webkit-font-smoothing: antialiased;

                  }
               }
            }
         }
      }
   }
   </style>