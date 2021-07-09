<template>
    <div class="discoverNiceGoodsMain">
        <div class="leftArea">
            <a href="//fxhh.jd.com" target="_blank" class="nice-goods__logo nice-goods__logo--bg-1" clstag="h|keycount|core|goods_a">
                <div class="logo-new-class"></div>
                <div class="logo-text-class">探索新生活</div>
            </a>
        </div>
        <div class="rightArea">
            <ul :style="leftIns">
                <li :style="liStyle(index)" v-for="(item ,index) in discoverData" :key="index">
                    <div class="imageDiv"><img :src="item.pic" width="150px" height="150px"/></div>
                    <div class="goodName">{{item.title}}</div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script lang="ts">
    import {Component, Vue,Prop} from 'vue-property-decorator'
    import {Action, Getter} from 'vuex-class';
    import _ from "lodash";
    @Component({
        components:{}
    })
    export default class DiscoverNiceGoods extends Vue {
        @Prop() params:any;
        private discoverData=new Array<any>();
        private leftIns:any=0;
        private timer:any="";
        created(){
            this.discoverData=this.params.filter(item=>item.categoryName=="发现好物");
            let dataB=_.cloneDeep(this.discoverData);
            this.discoverData.push(...dataB);
            this.leftIns={left:'0px'};
            let temp=0;
            this.timer=setInterval(()=>{
                temp=temp-1;
                if(temp<-2000){
                    temp=0;
                }
                this.leftIns.left=temp+"px";
            },10);

        }
        private liStyle(index:any){
            if(index%2==0){
                return {"flex-direction":"column-reverse"};
            }
            return {"flex-direction":"column"};
        }
    }
</script>

<style lang="less" scoped>
    .discoverNiceGoodsMain{
        height: 260px;
        width: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: row;
        background: white;
        .leftArea{
            width: 190px;
            height: 100%;
            a{
                height: 100%;
                display: inherit;
                text-decoration: none;
            }
            .nice-goods__logo--bg-1 {
                background-image:url(//misc.360buyimg.com/mtd/pc/index_2019/1.0.0/assets/img/e222ff5affd7051c21a5df1af734893b.png);
            }
            .logo-new-class{
                width: 150px;
                height: 60px;
                background-image: url(//localhost/images/static/fxhu.png);
                margin:auto;
            }
            .logo-text-class{
                width: 100px;
                color: rgba(255,255,255,.8);
                font-size: 16px;
                display: block;
                margin: auto;
            }
        }
        .rightArea{
            height: 260px;
            width: calc(100% - 110px);
            overflow: hidden;
            position: sticky;
            ul{
                height: 100%;
                margin: 0;
                padding: 0;
                display: flex;
                position: absolute;
                justify-content: center;
                flex-wrap: nowrap;
                flex-direction: row;
                li{
                    list-style-type: none;
                    width: 150px;
                    height: 100%;
                    margin-left: 50px;
                    display: flex;
                    flex-direction: column;
                    justify-content: revert;
                    .goodName{
                        font-size: 14px;
                        color: #333;
                        transition: color .2s ease;
                        overflow: hidden;
                        white-space: nowrap;
                        text-align: center;
                        margin-top: 30px;
                        text-overflow: ellipsis;
                        width: 100%;
                        height:30px;
                    }
                    .imageDiv{
                        height: 150px;
                        margin-top: 20px;
                    }
                }
            }
        }
    }
</style>