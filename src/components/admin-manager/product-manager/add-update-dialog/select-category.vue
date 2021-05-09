<template>
   <div class="selectCategory">
          <el-input 
              placeholder="请输入名称搜索"
              prefix-icon="el-icon-search"
              v-model="searchKey">
          </el-input>
          <el-table
               ref="treeTable"
               :row-class-name="tableRowClassName"
               highlight-current-row
               tooltip-effect="dark"
               :row-key="getRowKey"
               :data="productCategoryData"
              @current-change="handleCurrentChange"
              :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
               >
                <el-table-column
                  width="55">
                </el-table-column>
               <el-table-column
                  prop="name"
                  label="分类名称">
               </el-table-column>
          </el-table>
          <el-button type="primary" v-if="!isHiddenNext" style="max-width:80px;margin-top:20px;margin-bottom:20px;" @click="goNext()">下一步</el-button>
   </div>
</template>
<script lang="ts">
import {Component, Prop, Vue, Watch,Emit} from 'vue-property-decorator'
import {namespace} from 'vuex-class'
import ApiActions from '@/components/api/api-actions'
import TreeUtils from '@/components/common/tree-utils';
import _ from "lodash";
const goodsName=namespace("goods");
 @Component({
      components: {
      },
})
export default class SelectCategory extends Vue {
  @Prop() params:any;
  @Prop() goNext:Function;
  @goodsName.Mutation updateState;
  private categoryId:any="";
  private productCategoryData=new Array<any>();
  private orgProductCategoryData=new Array<any>();
  private searchKey:any="";
  private currentRow:any="";
  private isHiddenNext:any=false;
  //创建时调用
  async created(){
        if(this.params&&this.params.isHiddenNext){
            this.isHiddenNext=this.params.isHiddenNext;
        }
        let apiActions=new ApiActions(this);
        let result=await apiActions.getCategories({name:""})
        this.productCategoryData=result.data;
        this.orgProductCategoryData=result.data;
        this.$nextTick(()=>{
            let categoryId:any=localStorage.getItem("categoryId");
            if(categoryId){
               this.cacheCheck(categoryId);
            }else{
                TreeUtils.toggleRowExpansion(this.productCategoryData,false,this);
            }
        })
  }
  private cacheCheck(categoryId:any){
      let searchResult:any=new Array<any>();
      TreeUtils.expendTreeData(this.productCategoryData,searchResult);
      let currentItem=searchResult.find(item=>item.id==categoryId);
      let fatherItems=new Array<any>();
      TreeUtils.addFather(searchResult,fatherItems,currentItem); 
      for(let i=fatherItems.length-1;i>=0;i--){
          if(this.$refs.treeTable){
              (this.$refs.treeTable as any).toggleRowExpansion(fatherItems[i],true);
          }
      }
  }
  @Watch("searchKey")
  private async searchByKey(searchText:any){
      if(!searchText){
            this.productCategoryData=_.cloneDeep(this.orgProductCategoryData);
            TreeUtils.toggleRowExpansion(this.productCategoryData,false,this);
      }
      if(searchText){
          let orgData:Array<any>=this.productCategoryData;
          let treeData:Array<any>=TreeUtils.getSearchTree(searchText,orgData);
          this.productCategoryData=treeData;
          TreeUtils.toggleRowExpansion(this.productCategoryData,true,this);
      }
      let categoryId:any=localStorage.getItem("categoryId");
      if(categoryId){
          this.cacheCheck(categoryId);
      }
  }
  private getRowKey(row){
    return row.id;
  }

  private handleCurrentChange(val){
     localStorage.setItem("categoryId",val.id);
     this.currentRow=val;
     this.updateState({categoryId:val.id});
     this.onSelect(val.id);
  }
  @Emit("onSelect")
  private onSelect(categoryId){
      return categoryId;
  }
  private tableRowClassName({row, rowIndex}){
     let categoryId:any=localStorage.getItem("categoryId");
     if (row.id === categoryId) {
          return 'current-row';
      }
      return '';
  }
}
</script>
<style lang="less">
    .selectCategory{
        display:flex;
        flex-direction:column;
        align-items:center;
      .el-table__body-wrapper{
            overflow-y: auto;
       }
       width:100%;
       height:100%;
      .el-dialog{
            width: 40%;
            margin-top:0px!important;

            .dialog-footer{
                display: flex;
                justify-content: center;
            }
       }

      .el-table .warning-row {
        background: oldlace;
      }
      .el-table .success-row {
        background: #f0f9eb;
      }
    .el-table::before {
        height: 0px;
    }

    }
</style>