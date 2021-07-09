<template>
    <div class="miaoshaMain">
        <div class="firstElement">
            <div class="countdown-title">京东秒杀</div>
            <div>
                <div class="countdown-desc"><strong>00:00</strong>点场 距结束</div>
            </div>
        </div>
        <ul>
            <li v-for="(item,index) in miaoShaData" v-if="index>=0&&index<4">
                  <img width="140px" height="140px" :src="item.pic"/>
                  <h6 class="seckill-item__name" :title="item.title">
                      {{item.title}}
                  </h6>
                  <div class="seckill-item__price">
                      <span class="price-miaosha">
                          <i>¥</i>
                          <span>116.90</span>
                      </span>
                      <span class="price-origin">
                          <i>¥</i>
                          <span>145.90</span>
                      </span>
                  </div>
            </li>
        </ul>
        <div class="lastElement">
            <div class="seckill-brand">
                <a class="brand-item" href="//miaosha.jd.com/brandlist.html?brand_id=48406&amp;sku_id=41347011023" target="_blank" clstag="h|keycount|core|seckill_c01" aria-label="品类秒杀 潮流品质小家电 低至99元">
                    <div class="item-image">
                        <div style="display: flex;justify-content: center">
                            <img src="//img12.360buyimg.com/seckillcms/s260x260_jfs/t1/194693/29/4897/431656/60ad9e8fEd8a49f20/0b529b7b1f57307e.jpg.webp" class="lazyimg_img">
                        </div>
                    </div>
                    <div class="item-info">
                        <p class="item-info-title">潮流品质小家电</p>
                        <p class="item-info-promo">低至99元</p>
                        <div style="display: flex;justify-content: center;width: 100%"><div class="item-info-action">品类秒杀</div></div>
                    </div>
                </a>
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
    export default class MiaoSha extends Vue {
        @Prop() params:any;
        private miaoShaData=new Array<any>();
        private async created() {
            this.miaoShaData=this.params.filter(item=>item.categoryName=="秒杀信息");
        }

    }
</script>

<style lang="less" scoped>
    .miaoshaMain{
        height: 260px;
        width: 100%;
        background: white;
        display: flex;
        flex-direction: row;
        ul{
            margin: 0px;
            padding: 0px;
            display: flex;
            flex-direction: row;
            li{
                list-style-type: none;
                width: 200px;
                display: flex;
                margin-left: 15px;
                justify-content: center;
                flex-direction: column;
                h6{
                    margin: 0  20px;
                    font-size: 12px;
                    font-weight: 400;
                    color: #333;
                    -webkit-transition: color .2s ease;
                    transition: color .2s ease;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                img{
                    margin: auto;
                    margin-bottom: 0px;
                    margin-top: 0px;
                }
                .seckill-item__price{
                    margin-top: 18px;
                    border: 1px solid #e1251b;
                    position: relative;
                    -webkit-box-sizing: border-box;
                    box-sizing: border-box;
                    line-height: 24px;
                    overflow: hidden;
                    background-color: #e1251b;
                    .price-miaosha{
                        width: 92px;
                        height: 100%;
                        text-align: center;
                        color: #fff;
                        font-size: 16px;
                        font-weight: 700;
                        line-height: 22px;
                        float: left;
                    }
                    .price-origin{
                        height: 100%;
                        width: 66px;
                        float: right;
                        background: #fff;
                        text-align: center;
                        color: #999;
                        font-size: 12px;
                        line-height: 22px;
                        -webkit-box-sizing: border-box;
                        box-sizing: border-box;
                        text-decoration: line-through;
                        vertical-align: top;
                    }
                }
            }
        }
        .firstElement{
            width: 190px;
            height: 100%;
            color: #fff;
            background-color: #e83632;
            background-image: url(http://localhost/images/static/miaoshaLogo.png);
            background-size: contain;
            background-position: 50%;
            background-repeat: no-repeat;
            .countdown-title{
                width: 100%;
                text-align: center;
                font-size: 30px;
                font-weight: 700;
                margin-top: 31px;
            }
            .countdown-desc{
                margin-top: 90px;
                font-size: 14px;
                text-align: center;
                color: #fff;
            }
            .countdown-main{
                margin-left: auto;
                margin-right: auto;
                width: 130px;
                height: 30px;
                margin-top: 10px;
                display: block;
            }
            .timer{
                color: #333;
                font-weight: 700;
            }
            .timmer__unit:after {
                content: ":";
                display: block;
                position: absolute;
                right: -20px;
                font-weight: bolder;
                font-size: 18px;
                width: 20px;
                height: 100%;
                top: 0;
            }
        }
        .lastElement{
            width: 200px;
            height: 100%;
            margin-left: 10px;
            img{
                width: 120px;
                height: 120px;
                margin-left: auto;
                margin-right: auto;
                margin-top: 20px;
                text-align: center;
                display: inline-block;
            }
            .item-info {
                width: 100%;
                height: 90px;
                margin-top: 10px;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                .item-info-title{
                    color: #666;
                    text-align: center;
                    font-size: 14px;
                }
                .item-info-promo{
                    color: #333;
                    font-weight: 700;
                    text-align: center;
                    font-size: 14px;
                }
                .item-info-action{
                    font-size: 14px;
                    margin: auto;
                    display: inline-block;
                    color: #e1251b;
                    border-radius: 14px;
                    width: 82px;
                    height: 24px;
                    -webkit-box-sizing: border-box;
                    box-sizing: border-box;
                    text-align: center;
                    display: inline-block;
                    line-height: 22px;
                    font-weight: 700;
                    padding-left: 4px;
                    font-size: 12px;
                    border: 1px solid #e1251b;
                    margin-top: 4px;
                    -webkit-transition: background-color .2s ease;
                    transition: background-color .2s ease;
                }
            }
        }
    }
</style>