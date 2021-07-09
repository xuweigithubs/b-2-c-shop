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
               ref="goodsTable"
               tooltip-effect="dark"
               :data="spus"
               >
               <el-table-column type="selection">
               </el-table-column>
                 <el-table-column
                  prop="title"
                  label="商品名称">
               </el-table-column>
                <el-table-column
                        prop="spuImage"
                        label="商品图片">
                    <template slot-scope="scope" v-if="scope.row.spuImage">
                        <img  :src="scope.row.spuImage" style="width:400px;height:200px"/>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="spuPrice"
                        label="商品单价">
                </el-table-column>
                <el-table-column
                  prop="categoryName3"
                  label="商品分类">
                </el-table-column>
                <el-table-column
                        prop="brandName"
                        label="商品品牌">
                </el-table-column>
               <el-table-column label="操作">
                  <template slot-scope="scope">
                  <el-button
                     icon="el-icon-edit"
                     @click="updateGood(scope.$index, scope.row)">编辑</el-button>
                  </template>
               </el-table-column>
            </el-table>
            <el-pagination
               @size-change="handleSizeChange"
               @current-change="handleCurrentChange"
               :page-sizes="[7,10,100, 200, 300, 400]"
               :page-size="7"
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
  private pageSize:number=7;
  private spus:any=new Array<any>();
  //创建时调用
  async created(){
      await this.initPageData();
  }
  private async initPageData(){
      let apiActions=new ApiActions(this);
      let result:any=await apiActions.getSpuListPage({title:this.searchKey,pager:{pageSize:this.pageSize,currentPage:this.currentPage}});
      this.spus=result.data.rows;
      this.total=result.data.total;
  }
  //分页发生变化
  private async handleSizeChange(pageSize){
      this.pageSize=pageSize;
      await this.initPageData();
  }
  //当前页发生变化
   private async handleCurrentChange(currentPage){
       this.currentPage=currentPage;
       await this.initPageData();
   }
  //关闭
   private async close(){
       this.productDialogVisible=false;
       await this.initPageData();
   }

   @Watch("searchKey")
   private async searchByKey(searchText:any){
      this.initPageData();
   }
   //修改商品
   private updateGood(index, row){
        this.params.spuId=row.id;
        this.productDialogVisible=true;
   }

   private addProduct(){
       this.params.spuId="";
       this.productDialogVisible=true;
   }
   private async confirmDelete(){
       let apiActions=new ApiActions(this);
       let goodsTables:any=this.$refs.goodsTable;
       let selectData:Array<any>=goodsTables.selection;
       if(selectData.length==0){
           this.$alert('请选择数据', '提示', {
               confirmButtonText: '确定'
           });
           return false;
       }
       let ids=new Array<any>();
       selectData.forEach(item=>{
           ids.push(item.id);
       });
       await apiActions.deleteGoods(ids);
       await this.initPageData();
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