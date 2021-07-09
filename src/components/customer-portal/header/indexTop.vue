<template>
   <div class="goabal">
       <div class="header">
         <div class="mainWidth">
               <div class="titleLeft">
                  <ul>
                     <li @click="goHome"><img :src="imgSrc"  width="15px" height="15px" alt="" /><span class="title">商城首页</span></li>
                     <li><img :src="locationImgSrc" width="15px" height="15px" alt="" /><span class="title">广东</span></li>
                 </ul>
               </div>
               <div class="titleRight">
                  <ul>
                     <li @click="customerLogin">你好，请登录</li>
                     <li @click="customerRegister">免费注册</li>
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
   import {namespace} from 'vuex-class';
   import * as _ from 'lodash'
   const goodsName=namespace("goods");
   @Component({
      components:{
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
          private goHome(){
              this.$router.push({
                  path: '/',
              });
          }
          private customerLogin(){
              this.$router.push({
                  path: 'customer/login',
              });
          }
          private customerRegister(){
              this.$router.push({
                  path: 'customer/register',
              });
          }
   }
   </script>
   <style lang="less">
   .goabal{
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
   }
</style>