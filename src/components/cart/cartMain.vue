<template>
    <div class="cartMain">
        <div class="cartTable">
            <ul>
                <li class="allProduct"><em>全部商品</em></li>
                <li class="deliveryClassLi">
                    <common-position/>
                </li>
            </ul>
        </div>
        <div class="cartContent">
            <div class="cartHeader">
                <ul>
                    <li style="max-width:40px"><input type="checkbox" @change="selectAll" v-model="isAllCheck"/></li>
                    <li style="display: flex;flex:3;min-width:300px">商品</li>
                    <li></li>
                    <li>单价</li>
                    <li style="flex:2;"><span style="margin-left:50px">数量</span></li>
                    <li>小计</li>
                    <li>操作</li>
                </ul>
            </div>
            <div class="tableContent">
                <ul v-for="item in cartItemsData">
                    <li style="max-width:40px"><input @change="selectItem" v-model="item.checked" type="checkbox"/></li>
                    <li style="display: flex;flex:3;min-width:300px"><div><img width="80px" height="80px" :src="item.images.split(',')[0]"></div><div style="margin-left: 10px">{{item.title}}</div></li>
                    <li>{{item.ownSpecDesc}}</li>
                    <li style="width:80px">{{item.price}}</li>
                    <li style="flex: 2"> <el-input-number  :min="1" :max="1000" size="mini" v-model="item.qty"></el-input-number></li>
                    <li>{{item.totalAmount}}</li>
                    <li style="width: 100px;cursor: pointer" @click="deleteCurrent(item)"><span>删除</span></li>
                </ul>
            </div>
            <div class="payArea">
                <ul>
                    <li>
                        <span><input @change="selectAll" v-model="isAllCheck" type="checkbox"/></span>
                        <span>全选</span>
                        <span>删除选中的商品</span>
                        <span>清理购物车</span>
                    </li>
                    <li>
                        <span>总价:</span>
                        <span>￥{{allTotalAmount}}</span>
                        <span>去结算</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import {Action, Getter} from 'vuex-class'
    import logo from '@/components/common/images/logo.png'
    import {namespace} from 'vuex-class';
    import IndexTop from "@/components/customer-portal/header/indexTop.vue";
    import Position from "@/components/common/position.vue";
    import * as _ from 'lodash'
    const goodsName=namespace("goods");
    @Component({
        components:{
            IndexTop,
            CommonPosition:Position
        }
    })
    export default class CartMain extends Vue {
        @goodsName.State cartItemsCount;
        private logImg:any="";
        private cartItems:Array<any>=new Array<any>();
        private isAllCheck:any="";
        private async created() {
            this.logImg=logo;
            let cartItems:Array<any>=JSON.parse(localStorage.getItem("cart"));
            cartItems.forEach(item=>{
                 item.totalAmount=item.qty*item.price;
                item.checked=false;
            });
            this.cartItems=cartItems;
        }
        private selectItem(){
             let selectItems:Array<any>=this.cartItemsData.filter(item=>item.checked);
             if(selectItems.length==this.cartItemsData.length){
                 this.isAllCheck=true;
             }else{
                 this.isAllCheck=false;
             }
        }
        private selectAll(){
            this.$nextTick(()=>{
                this.cartItems.forEach(item=>{
                    item.checked=this.isAllCheck;
                });
            });
        }
        private get cartItemsData(){
            this.cartItems.forEach(item=>{
                item.totalAmount=item.qty*item.price;
            });
            return this.cartItems;
        }
        private get allTotalAmount(){
            let allTotalAmount=0;
            this.cartItems.filter(curItem=>curItem.checked).forEach(item=>{
                item.totalAmount=item.qty*item.price;
                allTotalAmount=allTotalAmount+item.totalAmount;
            });
            let cartItemStr:any=JSON.stringify(this.cartItems);
            localStorage.setItem("cart",cartItemStr);
            return allTotalAmount;
        }
        private deleteCurrent(item:any){
            this.cartItems.forEach((curItem,index)=>{
                if(item.id==curItem.id){
                    this.cartItems.splice(index,1);
                }
            });
        }
    }
</script>
<style lang="less">
    .cartMain{
        display: flex;
        flex-direction: column;
        margin-top: 30px;
        margin-left: 270px;
        margin-right: 270px;
        .cartTable{
            width: 100%;
            >ul{
                width: 100%;
                height:55px;
                display: flex;
                margin: 0px;
                padding: 0px;
                justify-content: space-between;
                align-items: center;
                min-width: 560px;
                >li{
                    list-style-type: none;
                }
                .allProduct{
                    float: left;
                    position: relative;
                    font-weight: 700;
                    font-size: 16px;
                    height: 28px;
                    line-height: 28px;
                    text-align: center;
                    padding: 0 0 10px;
                    cursor: pointer;
                    margin: 5px 30px 0 0;
                    em{
                        color: #e2231a;
                        font-style: normal;
                    }

                }
                .deliveryClassLi{
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    .deliveryClass{
                        float: left;
                        position: relative;
                        top: 0;
                        height: 23px;
                        background: #fff;
                        border: 1px solid #CECBCE;
                        padding: 0 24px 0 4px;
                        line-height: 23px;
                        width: 140px;
                        overflow: hidden;
                        margin-left: 10px;
                    }
                }

            }
        }
        .cartContent{
            width: 100%;
            .cartHeader{
                display: flex;
                width: 100%;
                flex-direction: column;
                >ul{
                    width: 100%;
                    margin: 0px;
                    padding: 0px;
                    display: flex;
                    height: 40px;
                    height: 40px;
                    background: #f3f3f3;
                    border: 1px solid #e9e9e9;
                    border-top: 0;
                    min-width: 560px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap:wrap;
                    >li{
                        list-style-type: none;
                        flex: 1;
                        padding: 5px;
                    }
                }
            }
            .tableContent{
                >ul{
                    width: 100%;
                    margin: 0px;
                    padding: 0px;
                    margin-top: 20px;
                    display: flex;
                    border: 1px solid #e9e9e9;
                    border-top: 0;
                    min-width: 560px;
                    justify-content: space-between;
                    flex-wrap:wrap;
                    >li{
                        list-style-type: none;
                        flex: 1;
                        padding: 5px;
                    }
                    >li:nth-child(2):hover{
                        color: red;
                    }
                    >li:nth-child(2){
                        cursor: pointer;
                    }
                    >li:nth-child(7):hover{
                        color: red;
                    }
                    >li:nth-child(7){
                        cursor: pointer;
                    }
                }
            }
        }
        .payArea{
            width: 100%;
            height: 50px;
            border: 1px solid #f0f0f0;
            background: #fff;
            margin-top: 5px;
            ul{
                padding: 0px;
                margin: 0px;
                height: 100%;
                display: flex;
                justify-content: space-between;
                li{
                    list-style-type: none;
                    height: 100%;
                    margin: 0px;
                    padding: 0px;
                }
                li:nth-child(1){
                    display: flex;
                    justify-content:start;
                    align-items: center;
                    span:nth-child(1){
                        width: 20px;
                        margin-left:5px;
                        cursor: pointer;
                    }
                    span:nth-child(2){
                        width: 30px;
                        cursor: pointer;
                    }
                    span:nth-child(3){
                        margin-left: 20px;
                        cursor: pointer;
                    }
                    span:nth-child(4){
                        margin-left: 20px;
                        cursor: pointer;
                    }
                }
                li:nth-child(2){
                    height: 52px;
                    display: flex;
                    justify-content: start;
                    span:nth-child(1){
                        color: #999;
                        margin-top: 5px;
                        margin-right: 10px;
                    }
                    span:nth-child(2){
                        font-size: 16px;
                        margin-right:20px;
                        margin-top: 2px;
                        color: #e2231a;
                        font-family: verdana;
                        font-weight: 700;
                    }
                    span:nth-child(3){
                        width: 94px;
                        height: 52px;
                        background: #e54346;
                        text-align: center;
                        vertical-align: middle;
                        cursor: pointer;
                        line-height: 52px;
                        color: white;
                        font-size: 18px;
                    }
                }
            }
        }
    }
</style>