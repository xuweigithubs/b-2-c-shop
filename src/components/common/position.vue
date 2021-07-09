<template>
        <div class="positionClass">
                <div style="margin-right:10px">配送至:</div><div class="addressClass"><span>{{positionStr}}</span><b @click="showSelect"></b></div>
                <div class="selectPosition" v-show="isShowSelect">
                        <div class="tabTitle">
                                <ul>
                                        <li v-for="(item,index) in selectData" @click="selectTab(item)">
                                                <span>{{item.positionName}}</span><b></b>
                                        </li>
                                </ul>
                        </div>
                        <div class="tabContent">
                                <ul>
                                    <li :style="currentSelectPos==item.code?activeClass:''" v-for="item in currentPageData" @click="selectPosition(item)">
                                            {{item.positionName}}
                                    </li>
                                </ul>
                        </div>
                </div>
        </div>
</template>
<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import {Action, Getter} from 'vuex-class'
    import ApiActions from '@/components/api/api-actions';
    import _ from "lodash";
    @Component({
        components:{
        }
    })
    export default class Position extends Vue {
        private params:any={};
        private currentPageData=new Array<any>();
        private selectData=new Array<any>();
        private selectLevel=0;
        private isShowSelect:boolean=false;
        private positionStr:any="";
        private currentSelectPos:any="";
        private async created() {
               let apiActions=new ApiActions(this);
               let result=await apiActions.getPositionData({parentCode:"0"});
               this.params=result.data;
               this.currentPageData=this.params.filter(item=>item.parentCode=="0");
               this.getCache();
        }
        private getCache(){
                if(localStorage.getItem("selectData")){
                   this.selectData=JSON.parse(localStorage.getItem("selectData"));
                }
                if(localStorage.getItem("positionStr")){
                   this.positionStr=localStorage.getItem("positionStr");
                }
                if(localStorage.getItem("selectLevel")){
                    this.selectLevel=Number(localStorage.getItem("selectLevel"));
                }
                if(localStorage.getItem("currentPageData")){
                    this.currentPageData=JSON.parse(localStorage.getItem("currentPageData"));
                }
                if(localStorage.getItem("currentSelectPos")){
                        this.currentSelectPos=JSON.parse(localStorage.getItem("currentSelectPos"));
                }
        }
        private showSelect(){
                this.isShowSelect=!this.isShowSelect;
        }
        //获取
        private selectPosition(item){
                item=_.cloneDeep(item);
                let data=this.params.filter(curItem=>curItem.parentCode==item.code);
                if(data.length>0){
                        this.selectLevel=this.selectLevel+1;
                        item.level=this.selectLevel;
                        this.selectData.push(item);
                        this.currentPageData=data;
                        this.selectData=this.selectData.slice(0,this.selectLevel);
                        this.selectData[this.selectData.length-1].code=item.code;
                        this.selectData[this.selectData.length-1].parentCode=item.parentCode;
                        this.selectData[this.selectData.length-1].positionName=item.positionName;
                }else{
                       item.isEnd=true;
                       let dataItem:any=this.selectData.find(curItem=>curItem.isEnd);
                       if(!dataItem){
                           this.selectLevel=this.selectLevel+1;
                           item.level=this.selectLevel;
                           this.selectData.push(item);
                       }else{
                           dataItem.code=item.code;
                           dataItem.positionName=item.positionName;
                       }
                       this.positionStr="";
                       this.selectData.forEach(item=>{
                            this.positionStr=this.positionStr+" "+item.positionName;
                       })
                       this.isShowSelect=false;
                       //设置缓存，记住原来的数据
                       this.currentSelectPos=item.code;
                       this.setCache();
                }
        }
        private get activeClass(){
                return {
                  color:"red"
                }
        }
        private setCache(){
                localStorage.setItem("selectData",JSON.stringify(this.selectData));
                localStorage.setItem("positionStr",this.positionStr);
                localStorage.setItem("selectLevel",this.selectLevel.toString());
                localStorage.setItem("currentPageData",JSON.stringify(this.currentPageData));
                localStorage.setItem("currentSelectPos",this.currentSelectPos);
        }
        private selectTab(item:any){
                this.selectLevel=item.level-1;
                this.currentPageData=this.params.filter(curItem=>curItem.parentCode==item.parentCode);
        }
    }
</script>
<style type="text/css" lang="less">
    .positionClass{
        b {
             display: block;
             width: 17px;
             height: 17px;
             margin-right: 7px;
             cursor: pointer;
             background: url(//img12.360buyimg.com/uba/jfs/t4660/73/4024943067/1159/f1a90f68/59088392N8b6279bb.png) no-repeat 3px 5px;
        }
        display: flex;
        flex-direction: row;
        .addressClass{
               min-width: 200px;
               height: 20px;
                border: 1px solid #CECBCE;
                display: flex;
                justify-content: space-between;
        }
            position: relative;
           .selectPosition{
                   z-index: 1000;
                   width: 450px;
                   background-color: white;
                   border: 1px solid #CECBCE;
                   position: absolute;
                   top: 21px;
                   left: 49px;
                  .tabTitle{
                      width: 100%;
                      >ul{
                              margin: 0px;
                              padding: 0px;
                              display: flex;
                              margin-top:5px;
                              flex-direction: row;
                              >li{
                                      height: 20px;
                                      margin: 0px;
                                      padding: 0px;
                                      list-style-type: none;
                                      cursor: pointer;
                                      border: 1px solid #ddd;
                                      margin-left: 5px;
                                      display: flex;
                                      flex-direction: row;
                                      padding-left:5px;
                                      padding-right: 1px;
                              }
                              li:nth-child(1){
                                      margin-left:3px;
                              }
                      }
               }
               .tabContent{
                       ul{
                               margin: 0px;
                               padding: 0px;
                               margin-top:5px;
                               margin-left: 10px;
                               margin-bottom: 10px;
                               flex-direction: row;
                               display: flex;
                               flex-wrap: wrap;
                               li{
                                       height: 20px;
                                       margin: 0px;
                                       float: left;
                                       padding: 0px;
                                       list-style-type: none;
                                       width: 100px;
                                       margin-top: 10px;
                                       padding: 2px 4px 2px 0;
                                       color: #005aa0;
                                       cursor: pointer;
                               }
                       }
               }
          }
    }
</style>