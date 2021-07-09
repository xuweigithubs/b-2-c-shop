<template>
   <div class="brand">
        <div class="butons"> 
            <el-button icon="el-icon-plus" @click="addGroup">添加</el-button>
            <el-button icon="el-icon-delete" @click="confirmDelete">删除</el-button>
            <el-input style="flex:1;margin-left:300px"
                placeholder="请输入名称搜索"
                prefix-icon="el-icon-search"
                v-model="searchKey">
            </el-input>
         </div>
         <div class="brandTable">
            <el-table
               ref="brandTable"
               tooltip-effect="dark"
               :data="brandData"
               >
               <el-table-column type="selection">
               </el-table-column>
               <el-table-column
                  prop="title"
                  label="内容名称">
               </el-table-column>
                <el-table-column
                        prop="categoryName"
                        label="分类名称">
                </el-table-column>
               <el-table-column
                  prop="pic"
                  width="500px"
                  label="内容图片">
                     <template slot-scope="scope" v-if="scope.row.pic">
                             <img v-for="(pic,index) in scope.row.picList" :key="index" :src="pic" style="width:400px;height:200px"/>
                     </template>
               </el-table-column>
                <el-table-column
                  prop="url"
                  label="内容超链接地址">
                    <template slot-scope="scope" v-if="scope.row.url">
                        <a :href="scope.row.url" target="_blank">{{scope.row.url?scope.row.url.substring(0,100):""}}...</a>
                    </template>
               </el-table-column>
                <el-table-column
                        prop="sortOrder"
                        label="排序号">
                </el-table-column>
                <el-table-column
                        prop="status"
                        label="是否启用">
                </el-table-column>
               <el-table-column label="操作">
                  <template slot-scope="scope">
                  <el-button
                     icon="el-icon-edit"
                     @click="updateBrand(scope.$index, scope.row)">编辑</el-button>
                  </template>
               </el-table-column>
            </el-table>
            <el-pagination
               @size-change="handleSizeChange"
               @current-change="handleCurrentChange"
               :page-sizes="[5,10,100, 200, 300, 400]"
               :page-size="100"
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
import AddUpdateDialog from "./add-update-dialog/add-brand-dialog.vue";
import CategoryTreeDialog from './add-update-dialog/category-tree-dialog.vue'
import $ from "jquery";
const goodsName=namespace("goods");
@Component({
  components: {
  },
})
export default class ProductBrand extends Vue {
  @goodsName.Mutation updateStatus;
  private total:any=0;
  private searchKey:any="";
  private brandData:Array<any>=new Array<any>();
  private brandDialogVisible:boolean=false;
  private formLabelWidth:any='120px'
  private params:any={};
  private currentPage:number=1;
  private pageSize:number=100;
  private isSHowSelectCategory:boolean=false;
  private dialogStyle:any={};
  //创建时调用
  async created(){
     let apiActions=new ApiActions(this);
     let result=await apiActions.getCmsContentPage({title:"",pager:{pageSize:this.pageSize,currentPage:this.currentPage}});
     this.brandData=result.data.rows;
     this.total=result.data.total;
     this.$nextTick(()=>{
        $(".el-table th.el-table_1_column_1>.cell").css({'padding-left':'14px!important'});
     })
  }
  //分页发生变化
  private async handleSizeChange(pageSize){
     this.pageSize=pageSize;
     let apiActions=new ApiActions(this);
     let result=await apiActions.getCmsContentPage({name:"",pager:{pageSize:this.pageSize,currentPage:this.currentPage}});
     this.brandData=result.data.rows;
  }
  //当前页发生变化
  private async handleCurrentChange(currentPage){
     this.currentPage=currentPage;
     let apiActions=new ApiActions(this);
     let result=await apiActions.getCmsContentPage({name:"",pager:{pageSize:this.pageSize,currentPage:this.currentPage}});
     this.brandData=result.data.rows;
  }
  //添加分组
  private addGroup(){
      this.params.type="add";
      this.brandDialogVisible = true;
  }
  //编辑分组
  private updateBrand(index,item){
      this.params.type="update";
      this.params.name=item.name;
      this.params.letter=item.letter;
      this.params.id=item.id;
      this.params.image=item.image;
      this.brandDialogVisible = true;
  }
  private confirmDelete(){
     let brandTable:any=this.$refs.brandTable;
     let selectData:Array<any>=brandTable.selection;
     if(selectData.length==0){
        this.$alert('请选择数据', '提示', {
          confirmButtonText: '确定'
        });
        return false;
     }
     this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await this.deleteBrand();
          this.$message({
            type: 'success',
            message: '删除成功!',
            center:true
          });
         }).catch(() => {
        });
  }
  //删除分组品牌
  private async deleteBrand(){
     let brandTable:any=this.$refs.brandTable;
     let selectData:Array<any>=brandTable.selection;
     let apiActions=new ApiActions(this);
     let ids:any=selectData.map(item=>{
        return item.id;
     });
     await apiActions.deleteBrand(ids);
     let result=await apiActions.getCmsContentPage({name:"",pager:{pageSize:this.pageSize,currentPage:this.currentPage}});
     this.brandData=result.data.rows;
     this.total=result.data.total;
  }
  private async confirmSaveRls(){
     let apiActions=new ApiActions(this);
     let result=await apiActions.getCmsContentPage({name:"",pager:{pageSize:this.pageSize,currentPage:this.currentPage}});
     this.brandData=result.data.rows;
     this.total=result.data.total;
     this.isSHowSelectCategory=false; 
  }
  //关闭
  private close(){
     this.brandDialogVisible = false;
     this.isSHowSelectCategory=false; 
  }
  //确认数据
  private async confirm(){
     this.brandDialogVisible = false;
     let apiActions=new ApiActions(this);
     let result=await apiActions.getCmsContentPage({name:"",pager:{pageSize:this.pageSize,currentPage:this.currentPage}});
     this.brandData=result.data.rows;
     this.total=result.data.total;
  }

   @Watch("searchKey")
   private async searchByKey(searchText:any){
     console.log("searchText",searchText);
     let apiActions=new ApiActions(this);
     let result=await apiActions.getCmsContentPage({name:searchText,pager:{pageSize:this.pageSize,currentPage:this.currentPage}});
     this.brandData=result.data.rows;
     this.total=result.data.total;
  }
  //关联分类
  private reletedCatagory(){
     let brandTable:any=this.$refs.brandTable;
     let selectData:Array<any>=brandTable.selection;
     if(selectData.length==0){
        this.$alert('请勾选数据', '提示', {
          confirmButtonText: '确定'
        });
        return false;
     }
     if(selectData.length>1){
        this.$alert('只能选中一条数据', '提示', {
          confirmButtonText: '确定'
        });
        return false;
     };
     this.params.brandId=selectData[0].id;
     this.isSHowSelectCategory=true;
     this.centerDialog();
  }
  private centerDialog(){
      this.$nextTick(()=>{
        let height=$(window).height();
        let dialogHeight=$(".relatedCatagory .el-dialog").height();
        this.dialogStyle={
           top:(height/2-dialogHeight/2)+"px"
        }
     })
  }
 
}
</script>
<style lang="less">
.brand{
   .relatedCatagory{
      .el-table{
         height: 300px;
      }
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
   .brandTable{
      height: calc(100% - 40px);
      .el-table{
         height: calc(100% - 40px);
      }
      .el-pagination{
         margin-top: 12px;
      }
   }
} 
</style>