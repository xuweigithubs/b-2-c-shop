<template>
   <div class="productSpecGroup">
        <add-edit-dialog :params="params" @close="close" @confirm="confirm" v-if="specGroupDialogVisible"/>
        <div class="butons"> 
            <el-button icon="el-icon-plus" @click="addGroup"> 添加</el-button>
            <el-button icon="el-icon-delete" @click="confirmDelete">删除</el-button>
            <el-button icon="el-icon-delete" @click="confirmDelete">关联规格参数</el-button>
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
               :data="specGroupData"
               >
               <el-table-column type="selection">
               </el-table-column>
                <el-table-column
                        prop="categoryName"
                        label="分类名称">
                </el-table-column>
                 <el-table-column
                  prop="name"
                  label="参数组名称">
               </el-table-column>
               <el-table-column label="操作">
                  <template slot-scope="scope">
                  <el-button
                     icon="el-icon-edit"
                     @click="updateGroup(scope.$index, scope.row)">编辑</el-button>
                      <el-button
                              icon="el-icon-edit"
                              @click="updateGroup(scope.$index, scope.row)">查看规格参数</el-button>
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
import AddEditDialog from "./add-update-dialog/add-edit-group-dialog.vue";
import $ from "jquery";
const goodsName=namespace("goods");
@Component({
  components: {
     AddEditDialog
  },
})
export default class ProductSpecGroup extends Vue {
  @goodsName.Mutation updateStatus;
  private total:any=0;
  private searchKey:any="";
  private specGroupData:Array<any>=new Array<any>();
  private specGroupDialogVisible:boolean=false;
  private formLabelWidth:any='120px'
  private params:any={};
  private currentPage:number=1;
  private pageSize:number=10;
  private isShowGroup:boolean=false;
  //创建时调用
  async created(){
     let apiActions=new ApiActions(this);
     let result=await apiActions.getSpecGroupPage({name:"",pager:{pageSize:this.pageSize,currentPage:this.currentPage}});
     this.specGroupData=result.data.rows;
     this.total=result.data.total;
     this.$nextTick(()=>{
        $(".el-table th.el-table_1_column_1>.cell").css({'padding-left':'14px!important'});
     })
  }
  //分页发生变化
  private async handleSizeChange(pageSize){
     this.pageSize=pageSize;
     let apiActions=new ApiActions(this);
     let result=await apiActions.getSpecGroupPage({name:"",pager:{pageSize:this.pageSize,currentPage:this.currentPage}});
     this.specGroupData=result.data.rows;
  }
  //当前页发生变化
  private async handleCurrentChange(currentPage){
     this.currentPage=currentPage;
     let apiActions=new ApiActions(this);
     let result=await apiActions.getSpecGroupPage({name:"",pager:{pageSize:this.pageSize,currentPage:this.currentPage}});
     this.specGroupData=result.data.rows;
  }
  //添加分组
  private addGroup(){
      this.specGroupDialogVisible = true;
  }
  //编辑分组
  private updateGroup(index,item){
      localStorage.setItem("categoryId",item.cid);
      this.specGroupDialogVisible = true;
  }
  private confirmDelete(){
     let specGroupTable:any=this.$refs.specGroupTable;
     let selectData:Array<any>=specGroupTable.selection;
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
          await this.deleteGroup();
          this.$message({
            type: 'success',
            message: '删除成功!',
            center:true
          });
         }).catch(() => {
        });
  }
  //删除分组
  private async deleteGroup(){
     let specGroupTable:any=this.$refs.specGroupTable;
     let selectData:Array<any>=specGroupTable.selection;
     let apiActions=new ApiActions(this);
     let ids:any=selectData.map(item=>{
        return item.id;
     });
     apiActions.deleteSpecGroup(ids);
     let result=await apiActions.getSpecGroupPage({name:"",pager:{pageSize:this.pageSize,currentPage:this.currentPage}});
     this.specGroupData=result.data.rows;
     this.total=result.data.total;
  }
  //关闭
  private close(){
     this.specGroupDialogVisible = false;
  }
  //确认数据
  private async confirm(){
     this.specGroupDialogVisible = false;
     let apiActions=new ApiActions(this);
     let result=await apiActions.getSpecGroupPage({name:"",pager:{pageSize:this.pageSize,currentPage:this.currentPage}});
     this.specGroupData=result.data.rows;
     this.total=result.data.total;
  }
   @Watch("searchKey")
   private async searchByKey(searchText:any){
     console.log("searchText",searchText);
     let apiActions=new ApiActions(this);
     let result=await apiActions.getSpecGroupPage({name:searchText,pager:{pageSize:this.pageSize,currentPage:this.currentPage}});
     this.specGroupData=result.data.rows;
     this.total=result.data.total;
  }
 
}
</script>
<style lang="less">
.productSpecGroup{
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
   .productSpecGroupTable{
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