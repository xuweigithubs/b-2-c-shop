<template>
    <div class="categoryTree">
        <ul>
            <li @mouseenter="showChildrenCategory(item)" @mouseleave="hideChildrenCategory(item)" v-for="(item,index) in categoryData" :key="index">{{item.name}}</li>
        </ul>
        <ul class="popCategoryDialog" @mouseenter="showChildrenCategory()" @mouseleave="hideChildrenCategory()" v-if="isShowPopCategoryDialog">
            <div class="heightLine"></div>
            <li>

            </li>
        </ul>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import ApiActions from '@/components/api/api-actions';
    @Component({
        components:{
        }
    })
    export default class CategoryIndex extends Vue{
        private categoryData:any="";
        private isShowPopCategoryDialog:boolean=false;
        async created(){
            let apiActions=new ApiActions(this);
            let result=await apiActions.getCategories({name:""})
            this.categoryData=result.data;
            console.log(this.categoryData);
        }
        private showChildrenCategory(){
            this.isShowPopCategoryDialog=true;
        }
        private hideChildrenCategory(){
            this.isShowPopCategoryDialog=false;
        }
    }
</script>

<style lang="less">
   .categoryTree{
        height: 470px;
        position: relative;
       .popCategoryDialog{
           .heightLine{
               width: 0;
               border: 1px solid #f7f7f7;
               height: 470px;
               box-shadow:2px 0 5px rgb(0 0 0 / 10%);
           }
           z-index: 100000000000;
           width: 998px;
           position: absolute;
           height: 470px;
           top: 0px;
           left: 188px;
           background: white;
       }
       padding: 0;
       background-color: #fefefe;
       color: #636363;
       margin-top: 10px;
       width: 189px;
       ul{
           padding: 0px;
           margin: 0px;
           li{
               list-style: none;
               margin-left: 15px;
               margin-top: 5px;
               font-size: 14px;
               color: #333;
               cursor:pointer;
           }
       }
   }
</style>