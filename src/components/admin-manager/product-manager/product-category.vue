<template>
   <div class="productCategoryIndex">
      <add-edit-category-dialog :params="params" @close="close" @confirm="confirm" v-if="categoryDialogVisible"/>
      <div class="butons"> 
          <el-button icon="el-icon-plus" @click="addCategory">添加</el-button>
          <el-button icon="el-icon-plus" @click="addFatherCategory">添加顶级分类</el-button>
          <el-button icon="el-icon-plus" @click="addJdCategory">同步京东分类</el-button>
            <el-input style="flex:1;margin-left:300px"
                placeholder="请输入名称搜索"
                prefix-icon="el-icon-search"
                v-model="searchKey">
            </el-input>
         </div>
         <div class="productCategoryTable">
            <el-table
               ref="treeTable"
               highlight-current-row
               tooltip-effect="dark"
               :row-class-name="tableRowClassName"
                row-key="id"
               :data="productCategoryData"
                @current-change="handleCurrentChange"
              :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
               >
               <el-table-column
                  prop="name"
                  label="分类名称">
               </el-table-column>
                <el-table-column
                  prop="sort"
                  label="排序">
               </el-table-column>
                <el-table-column
                  prop="parent"
                  label="是否子节点">
                   <template slot-scope="scope">
                        {{ scope.row.parent?"是":"否" }}
                   </template>
               </el-table-column>
                <el-table-column
                        prop="channel"
                        label="是否频道节点">
                    <template slot-scope="scope">
                        {{ scope.row.channel==1?"是":"否" }}
                    </template>
                </el-table-column>
               <el-table-column label="操作">
                  <template slot-scope="scope">
                  <el-button
                     size="mini"
                     @click="updateCategory(scope.$index, scope.row)">编辑分类</el-button>
                  <el-button
                     size="mini"
                     type="danger"
                     @click="deleteCategory(scope.$index, scope.row)">删除分类</el-button>
                  </template>
               </el-table-column>
            </el-table>
        </div>
   </div>
</template>
<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator'
import {namespace} from 'vuex-class'
import ApiActions from '@/components/api/api-actions'
import TreeUtils from '@/components/common/tree-utils';
import _ from "lodash";
import AddEditCategoryDialog from "./add-update-dialog/add-edit-category-dialog.vue";
const goodsName=namespace("goods");
@Component({
  components: {
     AddEditCategoryDialog
  },
})
export default class ProductCategory extends Vue {
      @goodsName.Mutation updateState;
      private searchKey:any="";
      private total:any=0;
      private orgProductCategoryData=new Array<any>();
       //分类数据
      private categoryDialogVisible:boolean=false;
      private productCategoryData=new Array<any>();
      private params:any={};
      private currentRow: any="";
      async created(){
            let apiActions=new ApiActions(this);
            let result=await apiActions.getCategories({name:""})
            this.productCategoryData=result.data;
            this.orgProductCategoryData=result.data;
            this.$nextTick(()=>{
                  let categoryId:any=localStorage.getItem("categoryPageId");
                  if(categoryId){
                     this.cacheCheck(categoryId);
                  }else{
                     TreeUtils.toggleRowExpansion(this.productCategoryData,false,this);
                  }
            })
      }
      private cacheCheck(categoryId:any){
            let searchResult=new Array<any>();
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
      //添加分类
      private addCategory(){
         this.params.type="add";
         this.params.name="";
         this.params.sort="";
         this.params.id="";
          this.params.channel=false;
         this.params.parent=false;
         let treeTable:any=this.$refs.treeTable;
         let selectData:Array<any>=treeTable.selection;
         this.params.parentId=this.currentRow.id;
         this.categoryDialogVisible=true;
      }

      private addFatherCategory(){
          this.params.type="add";
          this.params.name="";
          this.params.sort="";
          this.params.id="";
          this.params.channel=false;
          this.params.parent=0;
          let treeTable:any=this.$refs.treeTable;
          let selectData:Array<any>=treeTable.selection;
          this.params.parentId=this.currentRow.id;
          this.categoryDialogVisible=true;
      }
      private async addJdCategory(){
          let apiActions=new ApiActions(this);
          let result=await apiActions.addJdCategories()
      }
      //修改分类
      private updateCategory(index,item){
         this.params.type="update";
         this.params.name=item.name;
         this.params.sort=item.sort;
         this.params.id=item.id;
         this.params.parent=item.parent;
         this.params.channel=item.channel;
         this.params.parentId="";
         this.categoryDialogVisible=true;
         this.$nextTick(()=>{
            let categoryId:any=localStorage.getItem("categoryPageId");
            if(categoryId){
               this.cacheCheck(categoryId);
            }else{
               TreeUtils.toggleRowExpansion(this.productCategoryData,false,this);
            }
         })
      }  
      
      //删除分类
      private async deleteCategory(index,item){
         let deleteArray=new Array<any>();
         deleteArray.push(item);
         let allDatas=new Array<any>();
         TreeUtils.expendTreeData(deleteArray,allDatas);
         let apiActions=new ApiActions(this);
         let ids:any=allDatas.map(item=>{
            return item.id;
         });
         await apiActions.deleteCategories(ids);
         let result=await apiActions.getCategories({name:""})
         this.productCategoryData=result.data;
         this.orgProductCategoryData=result.data;
         this.$nextTick(()=>{
            let categoryId:any=localStorage.getItem("categoryPageId");
            if(categoryId){
               this.cacheCheck(categoryId);
            }else{
               TreeUtils.toggleRowExpansion(this.productCategoryData,false,this);
            }
         })
      }  
       //关闭
      private close(){
         this.categoryDialogVisible = false;
      }
      //确认数据
      private async confirm(){
         this.categoryDialogVisible = false;
         let apiActions=new ApiActions(this);
         let result=await apiActions.getCategories({name:""})
         this.productCategoryData=result.data;
         this.orgProductCategoryData=result.data;
         this.$nextTick(()=>{
            let categoryId:any=localStorage.getItem("categoryPageId");
            if(categoryId){
               this.cacheCheck(categoryId);
            }else{
               TreeUtils.toggleRowExpansion(this.productCategoryData,false,this);
            }
         })
      }
      private handleCurrentChange(val) {
         localStorage.setItem("categoryPageId",val.id);
         this.currentRow=val;
      }
      //列名
      private tableRowClassName({row, rowIndex}){
         let categoryId:any=localStorage.getItem("categoryPageId");
         if (row.id === categoryId) {
               return 'current-row';
            }
            return '';
      }
}
   </script>
<style lang="less">
.productCategoryIndex{
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
   .el-table__body-wrapper{
       overflow-y: auto;
       height: calc(100% - 70px);
   }
   .has-gutter .el-table-column--selection .cell{
      padding-left:14px!important;
   }
    border:soild 1px red;
   .butons{
      display: flex;
      flex-direction:row;
   }
   .productCategoryTable{
      height: calc(100% - 40px);
      .el-table{
         height: calc(100% - 10px);
      }
      .el-pagination{
         margin-top: 12px;
      }
   }
} 
</style>