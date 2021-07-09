<template>
    <div class="rotation">
        <div class="rotationMain">
            <ul>
                <li v-for="(item,index) in rotationMainData" :key="item.index" v-show="index==num">
                    <img :src="item.pic" alt=""/>
                </li>
            </ul>
        </div>
        <div class="rotationRight">
                <img style="height:150px;width:190px;" v-for="(item,index) in rotationRightData"  v-if="index>3*rughtNum&&index<=3*(rughtNum+1)" :key="index" :src="item.pic"/>
        </div>
        <div class="jdNews">
            <div class="loginAndReg">
                <div class="topArea">
                    <div class="user_avatar">
                        <a>
                            <img :src="loginLog"/>
                        </a>
                    </div>
                    <div>
                        <a style="color: #666;text-decoration: none;margin-top: 5px;display: inline-block" href="http://localhost:8080/login">Hi~欢迎逛京东！</a>
                        <p style="padding: 0px;margin: 0px;">
                            <a style="color: #666;text-decoration: none;display: inline-block;cursor: pointer" @click="login">登录</a>&nbsp;&nbsp;<a style="color: #666;text-decoration: none;display: inline-block;cursor: pointer"  @click="register">注册</a>
                        </p>
                    </div>
                </div>
                <div class="user_profit">
                    <a class="user_profit_lk" href="http://localhost:8080/#/">新人福利</a>
                    <a class="user_profit_lk user_profit_lk_plus" href="http://localhost:8080/#/">PLUS会员</a>
                </div>
            </div>
            <div class="jdKuaibao">
                <div class="news_hd">
                    <h5 class="news_title">京东快报</h5>
                    <a class="news_more" href="http://localhost:8080/#/">更多>></a>
                </div>
                <ul>
                    <li><span>HOT</span>&nbsp;<span>竟然有50fps的帧率差异？Y7000与R7000对线</span></li>
                    <li><span>最新</span>&nbsp;<span>小户家庭保鲜能手，美的230升三门冰箱评测</span></li>
                    <li><span>热评</span>&nbsp;<span>秋冬季季无惧寒流，选择骆驼户外，穿出幸福感！</span></li>
                    <li><span>推荐</span>&nbsp;<span>美的零电洗电热水器，洗澡更安全</span></li>
                </ul>
            </div>
            <div  class="module_12">
                <ul>
                    <li>
                        <div style="margin: auto">
                            <img height="28px" style="display: block" width="28px" class="service_ico_img" src="//m.360buyimg.com/babel/jfs/t1/30057/19/14881/720/5cbf064aE187b8361/eed6f6cbf1de3aaa.png">
                            <span class="service_txt">话费</span>
                        </div>
                    </li>
                    <li>
                        <div style="margin: auto">
                            <img height="28px" style="display: block" width="28px" class="service_ico_img" src="//m.360buyimg.com/babel/jfs/t1/36478/38/5384/2901/5cbf065aEb0c60a12/afb4399323fe3b76.png">
                            <span class="service_txt">机票</span>
                        </div>
                    </li>
                    <li>
                        <div style="margin: auto">
                            <img height="28px" style="display: block" width="28px" class="service_ico_img" src="//m.360buyimg.com/babel/jfs/t1/31069/34/14642/979/5cbf0665Ec7dc8223/5fee386254dd2ebc.png">
                            <span class="service_txt">酒店</span>
                        </div>
                    </li>
                    <li>
                        <div style="margin: auto">
                            <img height="28px" style="display: block" width="28px" class="service_ico_img" src="//m.360buyimg.com/babel/jfs/t1/32403/22/14829/3699/5cbf0674E04723693/caa83ce9b881cd24.png">
                            <span class="service_txt">游戏</span>
                        </div>
                    </li>
                    <li>
                        <div style="margin: auto">
                            <img height="28px" style="display: block" width="28px" class="service_ico_img" src="https://m.360buyimg.com/babel/jfs/t1/71890/14/9897/3048/5d7739ddE93eb94f8/f1f6dc5c207329f9.png">
                            <span class="service_txt">加油卡</span>
                        </div>
                    </li>
                    <li>
                        <div style="margin: auto">
                            <img height="28px" style="display: block" width="28px" class="service_ico_img" src="https://m.360buyimg.com/babel/jfs/t1/45761/32/10307/1581/5d7739e2Ece4b6671/0004c1b85fbf7bde.png">
                            <span class="service_txt">火车票</span>
                        </div>
                    </li>
                    <li>
                        <div style="margin: auto">
                            <img height="28px" style="display: block" width="28px" class="service_ico_img" src="https://m.360buyimg.com/babel/jfs/t1/51584/31/10221/1685/5d7739e7E1adb25cd/1d0957d7f2ae01a2.png">
                            <span class="service_txt">众筹</span>
                        </div>
                    </li>
                    <li>
                        <div style="margin: auto">
                            <img height="28px" style="display: block" width="28px" class="service_ico_img" src="https://m.360buyimg.com/babel/jfs/t1/52683/35/10394/3447/5d7739edE270aa7b3/d4d1151b09b5553b.png">
                            <span class="service_txt">理财</span>
                        </div>
                    </li>
                    <li>
                        <div style="margin: auto">
                            <img height="28px" style="display: block" width="28px" class="service_ico_img" src="https://m.360buyimg.com/babel/jfs/t1/56296/3/10260/1443/5d7739f3E233abc53/e6976f3cb30c9a8a.png">
                            <span class="service_txt">白条</span>
                        </div>
                    </li>
                    <li>
                        <div style="margin: auto">
                            <img height="28px" style="display: block" width="28px" class="service_ico_img" src="https://m.360buyimg.com/babel/jfs/t1/60778/37/9838/3066/5d7739faEd3b7dbb9/dd4d9ef7ce8fc169.png">
                            <span class="service_txt">电影票</span>
                        </div>
                    </li>
                    <li>
                        <div style="margin: auto">
                            <img height="28px" style="display: block" width="28px" class="service_ico_img" src="https://m.360buyimg.com/babel/jfs/t1/40738/20/14562/826/5d773a01E09eb8121/d6f3909618c6307a.png">
                            <span class="service_txt">企业购</span>
                        </div>
                    </li>
                    <li>
                        <div style="margin: auto">
                            <img height="28px" style="display: block" width="28px" class="service_ico_img" src="https://m.360buyimg.com/babel/jfs/t1/57014/6/10297/815/5d773a07Ec7a61fc9/97917a2daa34be0f.png">
                            <span class="service_txt">礼品卡</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import {Component, Vue,Prop} from 'vue-property-decorator'
    import {Action, Getter} from 'vuex-class'
    import Header from  './header/index.vue'
    import Category from "./category/index.vue";
    @Component({
        components:{}
    })
    export default class RotationChart extends Vue {
        @Prop() params:any;
        private curUrl:any="";
        private loginLog:any="";
        private rotationMainData:any={};
        private rotationRightData:any={};
        private timer:any="";
        private num:any=0;
        private rughtNum:any=0;
        private async created() {
            this.rotationMainData=this.params.filter(item=>item.categoryName=="首页轮播图");
            this.curUrl=this.rotationMainData[0].pic;
            this.rotationRightData=this.params.filter(item=>item.categoryName=="首页右侧轮播图");
            console.log(this.params)
            this.loginLog="http://localhost/images/static/loginLog.png";
            this.play();
            this.playRight();
        }
        private login(){
            this.$router.push({
                path: 'customer/login',
            });
        }
        private register(){
            this.$router.push({
                path: 'customer/register',
            });
        }
        play(){
            this.timer=setInterval(()=>{
                this.num++;
                if(this.num==this.rotationMainData.length){
                     this.num=0
                }
            },2000);
        }
        playRight(){
            this.timer=setInterval(()=>{
                this.rughtNum++;
                if(this.rughtNum==2){
                    this.rughtNum=0
                }
            },5000);
        }
    }
</script>
<style type="text/css" lang="less">
    .rotation{
        display: flex;
        flex-direction: row;
        .rotationMain{
            width: 590px;
            height: 470px;
            margin-top: 10px;
            margin-left: 5px;
            ul{
                margin: 0px;
                padding:0px;
                display: flex;
                flex-direction: row;
                li{
                    margin: 0px;
                    padding: 0px;
                }
            }
        }
        .rotationRight{
            width: 190px;
            height: 470px;
            margin-left: 10px;
            margin-top: 10px;
            img:nth-child(1){
                margin-top: 0px;
            }
            img{
                margin-top: 5px;
            }

        }
        .jdNews{
            width: 190px;
            height: 470px;
            margin-top: 10px;
            background: white;
            margin-left: 10px;
            .loginAndReg{
                height: 100px;
                border-bottom:1px solid #eeeeee;
                width: 189px;
                .topArea{
                    display: flex;
                    flex-direction: row;
                    margin-left: 20px;
                    margin-top: 5px;
                }
                .user_avatar{
                    left: 20px;
                    top: 13px;
                    width: 44px;
                    height: 44px;
                    img{
                        width: 40px;
                        height: 40px;
                        border: 2px solid #fff;
                        border-radius: 50%;
                    }
                }
                .user_profit{
                    height: 25px;
                    font-size: 0;
                    text-align: center;
                    .user_profit_lk{
                        display: inline-block;
                        margin: 0 5px;
                        width: 70px;
                        height: 25px;
                        line-height: 25px;
                        font-size: 12px;
                        text-align: center;
                        color: #fff;
                        border-radius: 13px;
                        background: #e1251b;
                        cursor: pointer;
                        text-decoration: none;
                        margin-top: 10px;
                    }
                    .user_profit_lk_plus{
                        background: #363634;
                        color: #e5d790;
                    }
                }
            }
            .jdKuaibao{
                overflow: hidden;
                height: 130px;
                background: #fff;
                 .news_hd{
                     position: relative;
                     .news_title{
                         display: inline-block;
                         font-size: 14px;
                         margin-left: 15px;
                         color: #333;
                         padding: 0px;
                         margin: 0px;
                         margin-top: 10px;
                         margin-left: 10px;
                     }
                     .news_more{
                         right: 15px;
                         top: 10px;
                         font-size: 12px;
                         color: #999;
                         text-decoration: none;
                         position: absolute;
                     }
                 }
                ul{
                    display: block;
                    list-style-type: disc;
                    margin-block-start: 1em;
                    margin-block-end: 1em;
                    margin-inline-start: 0px;
                    margin-inline-end: 0px;
                    padding-inline-start: 10px;
                    li{
                        max-width: 160px;
                        _width: 160px;
                        height: 16px;
                        line-height: 16px;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        color: #999;
                        margin-bottom: 6px;
                    }
                }
            }
            .module_12{
                ul{
                    margin: 0px;
                    padding: 0px;
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    li{
                        margin: 0px;
                        padding: 0px;
                        display: flex;
                        flex-direction: column;
                        width: 55px;
                        height: 55px;
                        .service_txt{
                                display: block;
                                height: 25px;
                                line-height: 25px;
                                border-bottom: 2px solid #fff;
                                color: #333;
                                -webkit-transition: color .15s ease;
                                transition: color .15s ease;
                        }
                    }
                }
            }
        }
    }

</style>