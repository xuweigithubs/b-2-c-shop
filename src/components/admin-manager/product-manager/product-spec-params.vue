<template>
   <div class="productSpec">
        <add-edit-dialog :params="params" @close="close" @confirm="confirm" v-if="specDialogVisible"/>
        <div class="butons"> 
            <el-button icon="el-icon-plus" @click="addParams"> 添加</el-button>
            <el-button icon="el-icon-delete" @click="confirmDelete">删除</el-button>
            <el-input style="flex:1;margin-left:300px"
                placeholder="请输入名称搜索"
                prefix-icon="el-icon-search"
                v-model="searchKey">
            </el-input>
         </div>
         <div class="productSpecParamTable">
            <el-table
               ref="specParamTable"
               tooltip-effect="dark"
               :data="specParamData"
               >
               <el-table-column type="selection">
               </el-table-column>
                <el-table-column
                        prop="categoryName"
                        label="分类名称">
                </el-table-column>
                <el-table-column
                        prop="groupName"
                        label="规格参数组名">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="规格参数名称">
                </el-table-column>
                <el-table-column
                        prop="numberic"
                        label="是否为数字">
                </el-table-column>
                <el-table-column
                        prop="unit"
                        label="单位">
                </el-table-column>
                <el-table-column
                        prop="generic"
                        label="是否为通用">
                </el-table-column>
                <el-table-column
                        prop="searching"
                        label="是否可搜索">
                </el-table-column>
                <el-table-column
                        prop="segments"
                        width="200"
                        label="数字参数取值区间">
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
import {Component, Vue} from 'vue-property-decorator'
import {namespace} from 'vuex-class'
import ApiActions from '@/components/api/api-actions'
import AddEditDialog from "./add-update-dialog/add_edit_params_dialog.vue";
import $ from "jquery";
const goodsName=namespace("goods");
@Component({
  components: {
     AddEditDialog
  },
})
export default class ProductSpecParam extends Vue {
  @goodsName.Mutation updateStatus;
  private total:any=0;
  private searchKey:any="";
  private specParamData:Array<any>=new Array<any>();
  private specDialogVisible:boolean=false;
  private params:any={};
  private currentPage:number=1;
  private pageSize:number=10;
  //创建时调用
  async created(){
     let apiActions=new ApiActions(this);
     //获取规格参数列表
     let result=await apiActions.getSpecByPage({name:"",pager:{pageSize:this.pageSize,currentPage:this.currentPage}});
     this.specParamData=result.data.rows;
     this.total=result.data.total;
     this.$nextTick(()=>{
        $(".el-table th.el-table_1_column_1>.cell").css({'padding-left':'14px!important'});
     })
  }
  private handleSizeChange(){

  }
  private handleCurrentChange(){

  }
  private confirmDelete(){

  }
  private close(){

  }
  private confirm(){


  }

  private addParams(){
      this.specDialogVisible=true;
  }
  
}
</script>
<style lang="less">
.productSpec{
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