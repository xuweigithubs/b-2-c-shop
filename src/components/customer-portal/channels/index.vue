<template>
    <div class="channelMain">
        <div class="areaFirst">
            <div class="firstArea1">
                <img :src="bigData[0].pic" height="370px"/>
                <img :src="bigData[1].pic" height="370px"/>
            </div>
            <div class="firstArea2">
                <ul>
                    <li class="firstArea2Each" v-if="index<4" v-for="(item,index) in smallData">
                        <div class="title">
                            <span>{{item.title.split("->")[0].split(";")[0]}}</span>
                            <span>{{item.title.split("->")[0].split(";")[1]}}</span>
                        </div>
                        <div class="imageClass"><img width="100px" height="100px" v-if="indexPic>0" v-for="(itemPic,indexPic) in item.pic.split(';')" :src="itemPic"/></div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="areaLast">
            <div class="areaLastEach" v-if="index>=4" v-for="(item,index) in smallData">
                <div class="title">
                    <span>{{item.title.split("->")[0].split(";")[0]}}</span>
                    <span>{{item.title.split("->")[0].split(";")[1]}}</span>
                </div>
                <div class="imageClass"><img width="100px" height="100px" v-if="indexPic>0" v-for="(itemPic,indexPic) in item.pic.split(';')" :src="itemPic"/></div>
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
    export default class Channel extends Vue {
        @Prop() params:any;
        private channelData=new Array<any>();
        private bigData=new Array<any>();
        private smallData=new Array<any>();
        created(){
             this.channelData=this.params.filter(item=>item.categoryName=="频道广场");
             this.bigData=this.channelData.filter(item=>{
                 let images:Array<any>=item.pic.split(";");
                 return images.length==1;
             });
             this.smallData=this.channelData.filter(item=>{
                 let images:Array<any>=item.pic.split(";");
                 return images.length>1;
             });
             console.log(this.channelData);
        }
    }
</script>

<style lang="less" scoped>
    .channelMain{
        height:1005px;
        width: 100%;
        margin-top: 10px;
        .areaFirst{
            height: 370px;
            width: 100%;
            display: flex;
            .firstArea1{
                flex: 1;
                display: flex;
                background: white;
            }
            .firstArea2{
                flex: 1;
               ul{
                   display: flex;
                   flex-direction: row;
                   flex-wrap: wrap;
                   margin: 0px;
                   padding: 0px;
                   li{
                       list-style-type:none;
                       background: white;
                       height: 180px;
                       width: 287px;
                       margin-top: 10px;
                       margin-left: 10px;
                       background: white;
                       display: flex;
                       flex-direction: column;
                       justify-content: center;
                       .title{
                           margin-top: 13px;
                           display: flex;
                           justify-content: center;
                           flex-direction: row;
                          span:nth-child(1){
                               font-size: 22px;
                               font-weight: 700;
                               color: #333;
                               display: inline-block;
                               text-align: center;
                           }
                           span:nth-child(2){
                               font-size: 14px;
                               color: #999;
                               margin-left: 8px;
                               display: inline-block;
                               text-align: center;
                               margin-top: auto;
                               margin-bottom: auto;
                           }
                       }
                       .imageClass{
                           display: flex;
                           justify-content: center;
                           margin-top: 12px;
                       }
                   }
                   li:nth-child(1){
                       margin-top: 0px;
                   }
                   li:nth-child(2){
                       margin-top: 0px;
                   }
               }
            }
        }
        .areaLast{
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content:space-between;
            .areaLastEach{
                height: 180px;
                width: 290px;
                margin-top: 10px;
                background: white;
                .title{
                    margin-top: 13px;
                    display: flex;
                    justify-content: center;
                    flex-direction: row;
                    span:nth-child(1){
                        font-size: 22px;
                        font-weight: 700;
                        display: inline-block;
                        color: #333;
                    }
                    span:nth-child(2){
                        font-size: 14px;
                        color: #999;
                        display: inline-block;
                        margin-left: 8px;
                        margin-top: auto;
                        margin-bottom: auto;
                    }
                }
                .imageClass{
                    display: flex;
                    justify-content: center;
                    margin-top: 12px;
                }
            }
        }
    }
</style>