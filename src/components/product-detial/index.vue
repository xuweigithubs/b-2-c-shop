<template>
    <div class="productMain" v-if="isShowDetial">
            <common-header/>
            <div class="w">
                <div class="categoryDisplay">
                <div class="wInner">
                    <div class="boyClose">
                        <span v-if="spuData.categoryName1">{{spuData.categoryName1}}></span>
                        <span v-if="spuData.categoryName2">{{spuData.categoryName2}}></span>
                        <span v-if="spuData.categoryName3">{{spuData.categoryName3}}></span>
                        <span v-if="spuData.brandName">{{spuData.brandName}}></span><span :title="spuData.title">{{spuData.title}}</span>
                    </div>
                </div>
            </div>
            <div class="mainBody">
                <div class="productImage">
                    <img :src="currentImages[0]"/>
                    <ul>
                        <li></li>
                        <li v-for="(item,index) in currentImages" v-if="index<5" :key="index">
                             <img :src="item" width="54px" height="54px"/>
                        </li>
                        <li></li>
                    </ul>
                </div>
                <div class="productInfo">
                    <div class="title">{{spuData.title}}</div>
                    <div class="subTitle">{{spuData.subTitle}}</div>
                    <div class="jdPrice">
                        <span class="priceTitle">商品价格：</span>
                        <span class="priceContent">￥{{currentSku.price}}</span>
                    </div>
                    <div class="locationClass">
                        <common-position/>
                    </div>
                    <div class="specParams">
                        <ul>
                            <li v-for="(item,indexKey) in specParams" :key="indexKey">
                                <div class="specTitle"><div>选择{{item.k}}:</div></div>
                                <div class="specContent">
                                    <ul>
                                        <li @click="onSelectParams(item.k,index)" v-for="(option,index) in item.options" :class="{isParamActive:selectParamsMap[item.k]==index}">
                                            {{option.v}}<img width="40px" height="30px" style="margin-top:5px;margin-left:8px;border-radius: 2px" v-if="option.imgUrl" :src="option.imgUrl"/>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="addToCartClass" title="点击进购物车结算">
                        <el-input-number v-model="skuQty" @change="handleChange" :min="1" :max="2000" label="描述文字"></el-input-number>
                        <span class="cartButton" @click="addToCart">加入购物车</span>
                    </div>
                </div>
                <div class="recommondGoods">

                </div>
             </div>
             <div class="goodsDesc">
                <div class="goodsDescLeft">
                    <div class="shopName"><h3>京东京车会自营官方旗</h3></div>
                </div>
                <div class="goodsDescRight">
                    <div class="goodsDescNav">
                        <ul>
                            <li v-for="(item,index) in goodsDescTab" :class="{isDescActive:selected==index}" @click="change(index)">
                                {{item.name}}
                            </li>
                        </ul>
                    </div>
                    <div class="goodsDescContent" v-if="selected==0">
                        <div class="baseParams"></div>
                        <div v-html="spuData.spuDetialVO&&spuData.spuDetialVO.description"></div>
                    </div>
                    <div class="paramsValue" v-if="selected==1">详细规格参数</div>
                    <div class="afterService" v-if="selected==2">售后服务</div>
                    <div class="commonts" v-if="selected==3">商品评价</div>
                    <div class="commonts" v-if="selected==4">本店好评商品</div>
                </div>
            </div>
        </div>
        <common-footer/>
    </div>
</template>

<script lang="ts">
    import {Component, Vue,Prop} from 'vue-property-decorator'
    import {Action, Getter} from 'vuex-class';
    import Header from  "@/components/customer-portal/header/index.vue";
    import Footer from  "@/components/customer-portal/footer/index.vue";
    import Position from "@/components/common/position.vue";
    import _ from "lodash";
    import ApiActions from '@/components/api/api-actions';
    import {namespace} from 'vuex-class'
    const goodsName=namespace("goods");
    @Component({
        components:{
            CommonHeader:Header,
            CommonFooter:Footer,
            CommonPosition:Position
        }
    })
    export default class ProductDetialIndex extends Vue {
         @Prop() params: any;
        @goodsName.Mutation updateState;
         private isShowDetial:boolean=false;
         private selectParamsMap:any={};
         private spuData:any={};
         private currentSku:any={};
         private currentImages:Array<any>=[];
         private specParams=new Array<any>();
         private skuQty:any=0;
         private selected=0;
         private skuSelect="";
         private goodsDescTab=[
             {name:"商品介绍"},
             {name:"规格与包装"},
             {name:"售后保障"},
             {name:"商品评价"},
             {name:"本店好评商品"}
         ]
         async created(){
                 let spuId:any=this.$route.query.id;
                 let apiActions=new ApiActions(this);
                 let result:any=await apiActions.selectProduct({id:spuId});
                 this.spuData=result.data;
                 this.currentSku=this.spuData.skus[0];
                 this.currentImages=this.currentSku.images.split(",");
                 let editData:any=JSON.parse(this.spuData.spuDetialVO.specifications);
                 this.specParams=editData.groupParams[0].params.filter(item=>!item.generic);
                 this.specParams.forEach(item=>{
                     Vue.set(this.selectParamsMap,item.k,-1)
                 });
                 this.specParams.forEach((item,index)=>{
                     item.options.forEach(op=>{
                         //获取sku库存信息
                        let sluItem:any=this.spuData.skus.find(sku=>{
                             let skuIndexArray:Array<any>=sku.indexes.split("-");
                             let sluIndex=skuIndexArray[index];
                             if(sluIndex==op.index){
                                 return true;
                             }
                             return false;
                         });
                        if(sluItem&&sluItem.images&&index==0){
                            op.imgUrl=sluItem.images.split(",")[0];
                        }
                     });
                 });
                this.isShowDetial=true;
         }
         private handleChange(){

         }
        private  change(index) {
            this.selected = index;
        }
        //选择规格参数
        private onSelectParams(key:any,selectValue:any){
            this.selectParamsMap[key]=selectValue;
        }
        //加入购物车
        private addToCart(){
             let skuIndex="";
             for(let key in this.selectParamsMap){
                 let selectValue:any=this.selectParamsMap[key];
                 skuIndex=skuIndex+selectValue+"-";
                 if(selectValue<0){
                     return false;
                 }
             };
                skuIndex=skuIndex.substring(0,skuIndex.length-1);
                //如果成功的话就获取到了sku
                let curSku:any=this.spuData.skus.find(item=>item.indexes==skuIndex);
                let cartItems:Array<any>=new Array<any>();
                let skuItem:any={
                     id:curSku.id,
                     title:curSku.title,
                     images:curSku.images,
                     qty:1,
                     ownSpecDesc:curSku.ownSpecDesc,
                     price:curSku.price
                 }
                 if(localStorage.getItem("cart")){
                         let cartItems=JSON.parse(localStorage.getItem("cart"));
                         let curItem=cartItems.find(item=>item.id==curSku.id);
                         if(!curItem){
                             cartItems.push(skuItem);
                         }else{
                             curItem.qty=curItem.qty+this.skuQty;
                         }
                         this.updateState({cartItemsCount:cartItems.length});
                         localStorage.setItem("cart",JSON.stringify(cartItems));
                 }else{
                         cartItems.push(skuItem);
                         let cartItemStr:any=JSON.stringify(cartItems);
                         this.updateState({cartItemsCount:cartItems.length});
                         localStorage.setItem("cart",cartItemStr);
                 }
                this.$message({
                    message: '加入购物车成功',
                    type: 'success'
                });
        }
    }
</script>

<style lang="less">
    .productMain{
      .categoryDisplay{
          width: 100%;
          height: 40px;
          background: #f2f2f2;
      }
      .w{
          margin: auto;
          display: flex;
          flex-direction:column;
          height: 100%;
          background-color: white;
          .mainBody{
              width:1190px;
              margin: auto;
              margin-top: 10px;
              margin-bottom: 20px;
              background-color: white;
              display: flex;
              flex-direction: row;
              .productImage{
                  ul{
                      display: flex;
                      flex-direction: row;
                      margin: 0px;
                      padding: 0px;
                      flex-wrap: wrap;
                      justify-content: space-between;
                      li{
                          width: 54px;
                          height: 54px;
                          list-style-type: none;
                          background-color: beige;
                          cursor: pointer;
                      }
                      li:nth-child(1){
                          width:15px;
                      }
                      li:nth-last-child(1){
                          width:18px;
                      }
                  }
              }
              .productInfo{
                  flex: 1;
                  margin-left: 60px;
                  .title{
                      font: 700 16px Arial,"microsoft yahei";
                      color: #666;
                      margin-bottom: 5px;
                  }
                  .subTitle{
                      margin-bottom: 5px;
                      overflow: hidden;
                      white-space: nowrap;
                      text-overflow: ellipsis;
                      width: 618px;
                      max-height: 1.5em;
                      line-height: 1.5em;
                      color: #e4393c;
                      margin-bottom: 5px;
                  }
                  .jdPrice{
                      height: 45px;
                      margin-top: 10px;
                      background: #f3f3f3;
                       display: flex;
                      align-items: center;
                      .priceTitle{
                          line-height: 22px;
                          float: left;
                          padding-left: 10px;
                          font-family: simsun;
                          color: #999;
                      }
                      .priceContent{
                          color: #e4393c;
                          font-family: "microsoft yahei";
                          margin-right: 10px;
                          font-size: 22px;
                      }
                  }
                  .locationClass{
                      flex: 1;
                      height: 30px;
                      display: flex;
                      margin-top: 10px;
                      .locationClasstitle{
                          line-height: 26px;
                          padding-left: 10px;
                          font-family: simsun;
                          color: #999;
                      }
                      .hasGoods{
                          line-height: 26px;
                          padding-left: 10px;
                          font-family: simsun;
                          color: #999;
                      }
                      .selectLocation{
                          position: relative;
                          height: 26px;
                          line-height: 26px;
                          margin-left: 10px;
                          width:150px;
                          background: #fff;
                          border: 1px solid #CECBCE;
                          line-height: 23px;
                          overflow: hidden;
                      }
                  }
                  .specParams{
                      margin-top: 10px;
                      ul{
                          margin: 0px;
                          padding: 0px;
                          li{
                              list-style-type: none;
                              display: flex;
                              flex-direction: row;
                              .specContent{
                                  display: flex;
                                  flex: 1;
                                  ul{
                                      margin: 0px;
                                      padding: 0px;
                                      display: flex;
                                      flex-direction: row;
                                      justify-content: flex-start;
                                      flex-wrap:wrap;
                                      li{
                                         list-style-type: none;
                                          height: 40px;
                                          line-height: 40px;
                                          border: 1px solid #ccc;
                                          padding: 0 8px;
                                          background-color: #f7f7f7;
                                          cursor: pointer;
                                          white-space: nowrap;
                                          margin-left: 10px;
                                          margin-top: 10px;
                                          border-radius: 2px;
                                      }
                                  }
                              }
                              .specTitle{
                                  padding-left: 10px;
                                  font-family: simsun;
                                  color: #999;
                                  height: 40px;
                                  line-height: 40px;
                              }
                          }
                      }
                  }
                  .addToCartClass{
                      display: flex;
                      align-items: center;
                      flex-direction: row;
                      margin-left: 75px;
                      margin-top: 20px;
                      .cartButton{
                          height: 26px;
                          line-height: 26px;
                          padding: 10px 26px;
                          font-size: 18px;
                          display: inline-block;
                          font-family: "microsoft yahei";
                          background-color: #df3033;
                          color: #fff;
                          margin-left: 20px;
                          border-radius: 3px;
                          cursor: pointer;
                      }
                      .el-input-number__decrease, .el-input-number__increase{
                          width: 25px!important;
                          height: 45px;
                      }
                      .el-input-number{
                          width: 120px!important;
                      }
                      .el-input-number .el-input__inner {
                          padding-left: 5px;
                          padding-right: 5px;
                          text-align: center;
                          height: 47px;
                      }
                  }
              }
              .recommondGoods{
                  width: 210px;
              }
          }
      }
      .wInner{
          width:1190px;
          margin: auto;
          height: 100%;
          .boyClose{
              width: 352px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              display: inline-block;
              line-height: 40px;
              span{
                  cursor: pointer;
              }
          }
      }
      .goodsDesc{
          display: flex;
          flex-direction: row;
          width:1190px;
          margin: auto;
          .goodsDescLeft{
              width: 200px;
              .shopName{
                  background-color: #f7f7f7;
                  border: 1px solid #eee;
                  height: 40px;
                  line-height: 40px;
                  border-radius: 3px;
                  h3{
                      padding: 0px;
                      margin: 0px;
                      margin-left: 10px;
                  }
              }
          }
          .goodsDescRight{
              margin-left: 10px;
              flex: 1;
              .goodsDescNav{
                  ul{
                      margin: 0px;
                      padding: 0px;
                      display: flex;
                      flex-direction: row;
                      background-color: #f7f7f7;
                      border: 1px solid #eee;
                      border-bottom: 1px solid #e4393c;
                      li{
                          list-style-type: none;
                          padding: 10px 25px;
                          font-size: 14px;
                          cursor: pointer;
                      }
                  }
              }
          }
          .goodsDescContent{
              .baseParams{
                  width: 100%;
              }
          }
          .isDescActive{
              background-color: #e4393c;
              color: #fff;
          }
          .paramsValue{
              height: 500px;
          }
          .afterService{
              height: 500px;
          }
      }

  }
    .isParamActive{
        border: 1px solid #e4393c!important;
    }
</style>