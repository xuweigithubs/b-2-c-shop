<template>
   <div class="productManager">
        <add-product-dialog :params="params" @close="close" @confirm="confirm" v-if="productDialogVisible"/>
        <div class="buttons">
            <el-button icon="el-icon-plus" @click="addProduct">添加</el-button>
            <el-button icon="el-icon-delete" @click="confirmDelete">删除</el-button>
            <el-input style="flex:1;margin-left:300px"
                placeholder="请输入名称搜索"
                prefix-icon="el-icon-search"
                v-model="searchKey">
            </el-input>
         </div>
         <div class="productSpecGroupTable">
            <el-table
               ref="specGroupTable"
               tooltip-effect="dark"
               :data="spus"
               >
               <el-table-column type="selection">
               </el-table-column>
                 <el-table-column
                  prop="name"
                  label="商品名称">
               </el-table-column>
                <el-table-column
                  prop="categoryName"
                  label="商品分类">
                </el-table-column>
                <el-table-column
                        prop="categoryName"
                        label="商品品牌">
                </el-table-column>
               <el-table-column label="操作">
                  <template slot-scope="scope">
                  <el-button
                     icon="el-icon-edit"
                     @click="updateGroup(scope.$index, scope.row)">编辑</el-button>
                  </template>
               </el-table-column>
            </el-table>
            <el-pagination
               @size-change="handleSizeChange"
               @current-change="handleCurrentChange"
               :page-sizes="[10,100, 200, 300, 400]"
               :page-size="10"
               layout="total, sizes, prev, pager, next, jumper"
               :total="total">
            </el-pagination>
        </div>
   </div>
</template>
<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator'
import {namespace} from 'vuex-class'
import ApiActions from '@/components/api/api-actions'
import AddProductDialog from "./product/add-product-dialog.vue";
import $ from "jquery";
const goodsName=namespace("goods");
@Component({
  components: {
      AddProductDialog
  },
})
export default class ProductList extends Vue {
  @goodsName.Mutation updateStatus;
  private total:any=0;
  private searchKey:any="";
  private productListData:Array<any>=new Array<any>();
  private productDialogVisible:boolean=false;
  private formLabelWidth:any='120px'
  private params:any={};
  private currentPage:number=1;
  private pageSize:number=10;
  private spus:any=new Array<any>();
  //创建时调用
  async created(){

  }
  //分页发生变化
  private async handleSizeChange(pageSize){

  }
  //当前页发生变化
   private async handleCurrentChange(currentPage){

   }
  //关闭
   private close(){
      this.productDialogVisible=false;
   }

   @Watch("searchKey")
   private async searchByKey(searchText:any){

   }

   private addProduct(){
       this.productDialogVisible=true;
   }
   private confirmDelete(){

   }
   private confirm(){

   }
 
}
</script>
<style lang="less">
.productManager{
   width:100%;
   height:100%;
    .buttons{
        display: flex;
    }
} 
</style>