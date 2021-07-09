<template>
    <div class="niceGoodsMain" :style="backImg">
        <div class="leftArea">'
            <ul>
                <li v-for="(item,index) in activityData" style="background-image:url(//img13.360buyimg.com/img/s380x420_jfs/t1/176936/21/4586/754/60a20f82Eaa2168e2/b51953e00fc6f2bd.png)">
                    <img :src="item.pic"/>
                    <div class="sku-desc-text" style="background-color: rgba(221, 27, 198, 1)">{{item.title.split(";")[0]}}</div>
                    <div class="sku-title">{{item.title.split(";")[1]}}</div>
                </li>
            </ul>
        </div>
        <div class="rightArea">
            <ul>
                <li v-for="(item,index) in shopData">
                    <img :src="item.pic"/>
                </li>
            </ul>
        </div>
    </div>
</template>
<script lang="ts">
    import {Component, Vue,Prop} from 'vue-property-decorator'
    import {Action, Getter} from 'vuex-class'
    @Component({
        components:{}
    })
    export default class NiceGoodsMain extends Vue {
        @Prop() params:any;
        private activityData=new Array<any>();
        private shopData=new Array<any>();
        private backData=new Array<any>();
        private backImg="";
        private async created() {
            this.activityData=this.params.filter(item=>item.categoryName=="活动专区-->活动商品");
            this.shopData=this.params.filter(item=>item.categoryName=="活动专区-->活动店");
            this.backData=this.params.filter(item=>item.categoryName=="活动专区-->背景图片");
            this.backImg=`background-image:url(${this.backData[0].pic})`;
        }
    }
</script>

<style lang="less" scoped>
    .niceGoodsMain{
        background-size: cover;
        width: 1270px;
        height: 555px;
        margin: auto;
        margin-top: 15px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        .leftArea{
            height: 440px;
            width: 1000px;
            margin-top: 95px;
            ul{
                margin: 0px;
                padding: 0px;
                width: 100%;
                height: 100%;
                display: flex;
                flex-wrap: wrap;
                li{
                    display: flex;
                    justify-content: center;
                    margin-left: 10px;
                    .sku-title{
                        text-align: center;
                        bottom: 12px;
                        width: 130px;
                        color: #de452b;
                        margin: auto;
                        margin-top:5px;
                        margin-bottom:8px;
                        background-color: #e5d790;
                        border-radius:4px;
                    }
                    .sku-desc-text{
                        border-radius: 4px;
                        text-align: center;
                        font-weight: 700;
                        margin-top: 2px;
                        width: 130px;
                        margin: auto;
                        margin-top:5px;
                        margin-bottom:8px;
                        color: #fff;
                    }
                    list-style-type: none;
                    width: 190px;
                    height: 210px;
                    display: flex;
                    justify-content: center;
                    flex-direction: column;
                    background: white;
                    img{
                        width: 130px;
                        height: 130px;
                        margin: 0px auto;
                    }
                }
            }
        }
        .rightArea{
            margin-left: 10px;
            margin-top: 95px;
            ul{
                margin: 0px;
                padding: 0px;
                margin-top: 18px;
                li{
                    list-style-type: none;
                    width: 190px;
                    margin-top: 10px;
                    height: 100px;
                    img{
                        width: 190px;
                        height: 100px;
                    }
                }
            }
        }
    }
</style>