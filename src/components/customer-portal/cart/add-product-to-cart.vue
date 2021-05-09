<template>
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
</style>