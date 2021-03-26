<template>
   <div class="productSpec">
           <add-edit-dialog :params="params" @close="close" @confirm="confirm" v-if="specDialogVisible"/>
           <select-spec-group :params="params"  @close="close" v-if="isShowselectSpecGroup"/>
           <div class="mainSpec">
               <div class="left">
                   <select-category @onSelect="onSelect" :params="selectParams"/>
               </div>
               <div class="right">
                   <div class="butons">
                       <el-button icon="el-icon-plus" @click="addParams"> 添加</el-button>
                       <el-button icon="el-icon-delete" @click="confirmDelete">删除</el-button>
                       <el-button icon="el-icon-delete" @click="relatedGroup">关联分组</el-button>
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
                                   prop="groupName"
                                   label="参数组名称">
                           </el-table-column>
                           <el-table-column
                                   prop="name"
                                   label="参数名称">
                           </el-table-column>
                           <el-table-column
                                   prop="unit"
                                   label="单位">
                           </el-table-column>
                           <el-table-column
                                   prop="generic"
                                   :formatter="formatterNumberic"
                                   label="是否为通用">
                           </el-table-column>
                           <el-table-column
                                   prop="searching"
                                   :formatter="formatterNumberic"
                                   label="是否可搜索">
                           </el-table-column>
                           <el-table-column
                                   prop="numberic"
                                   label="是否为数字"
                                   :formatter="formatterNumberic"
                           >
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
                                           @click="updateParams(scope.$index, scope.row)">编辑</el-button>
                               </template>
                           </el-table-column>
                       </el-table>
                       <el-pagination
                               @size-change="handleSizeChange"
                               @current-change="handleCurrentChange"
                               :page-sizes="[5,10,100, 200, 300, 400]"
                               :page-size="5"
                               layout="total, sizes, prev, pager, next, jumper"
                               :total="total">
                       </el-pagination>
                   </div>
               </div>
           </div>
   </div>
</template>
<script lang="ts">
import {Component, Vue,Watch} from 'vue-property-decorator'
import {namespace} from 'vuex-class'
import ApiActions from '@/components/api/api-actions'
import AddEditDialog from "./add-update-dialog/add_edit_params_dialog.vue";
import SelectCategory from './add-update-dialog/select-category.vue';
import SelectSpecGroup from './add-update-dialog/select-spec-group.vue';

import $ from "jquery";
const goodsName=namespace("goods");
@Component({
  components: {
     AddEditDialog,
      SelectCategory,
      SelectSpecGroup
  },
})
export default class ProductSpecParam extends Vue {
      @goodsName.Mutation updateStatus;
      private total:any=0;
      private searchKey:any="";
      private specParamData:Array<any>=new Array<any>();
      //参数编辑页面弹出框
      private specDialogVisible:boolean=false;
      //显示选择参数组弹出框
      private isShowselectSpecGroup:boolean=false;
      private currentPage:number=1;
      private pageSize:number=5;
      private params:any={};
      private selectParams:any={isHiddenNext:true}
      //创建时调用
      async created(){
          this.reloadData();
      }
      private async handleSizeChange(pageSize){
          this.pageSize=pageSize;
          await this.reloadData();
      }
      private async handleCurrentChange(currentPage){
           this.currentPage=currentPage;
           await this.reloadData();
      }
      public onSelect(categoryId:any){
           debugger;
           this.params.categoryId=categoryId;
      }
      private async reloadData(){
          let apiActions=new ApiActions(this);
          //获取规格参数列表
          let result=await apiActions.getSpecByPage({name:this.searchKey,pager:{pageSize:this.pageSize,currentPage:this.currentPage}});
          this.specParamData=result.data.rows;
          this.total=result.data.total;
          this.$nextTick(()=>{
              $(".el-table th.el-table_1_column_1>.cell").css({'padding-left':'14px!important'});
          })
      }
      private updateParams(index,row){
          this.params.isUpdate=true;
          let sementsArrayStr=row.segments.split(";");
          let sementsArray=new Array<any>();
          sementsArrayStr.forEach(item=>{
              let sementItem=item.split("-")
              sementsArray.push({from:Number(sementItem[0]),to:Number(sementItem[1])});
          })
          this.params.form={
              id:row.id,
              name: row.name,
              numberic:row.numberic,
              generic:row.generic,
              unit:row.unit,
              searching:row.searching,
              segmentsArray:sementsArray
          }
          this.specDialogVisible=true;
      }
      private formatterNumberic(row, column, cellValue, index){
            if(cellValue){
                return "是"
            }
            return  "否";
      }
        private confirmDelete(){
            let specParamTable:any=this.$refs.specParamTable;
            let selectData:Array<any>=specParamTable.selection;
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
                await this.deleteParams(selectData);
                this.$message({
                    type: 'success',
                    message: '删除成功!',
                    center:true
                });
            }).catch(() => {
            });
        }
      private close(){
          this.specDialogVisible=false;
          this.isShowselectSpecGroup=false;
      }
      private async deleteParams(selectData){
          let apiActions=new ApiActions(this);
          let ids:Array<any>=new Array<any>();
          selectData.forEach(item=>{
              ids.push(item.id);
          })
          await  apiActions.deleteParams(ids);
          await this.reloadData();
      }
      private async confirm(){
          this.specDialogVisible=false;
          await this.reloadData();
      }
      @Watch("searchKey")
      private async searchByKey(searchText:any){
          await this.reloadData();
      }
      private addParams(){
          this.params.isUpdate=false;
          this.specDialogVisible=true;
      }
      //关联分组
      private relatedGroup(){
          let specParamTable:any=this.$refs.specParamTable;
          let selectData:Array<any>=specParamTable.selection;
          this.isShowselectSpecGroup=true;
      }
  
}
</script>
<style lang="less">
    .productSpec{
        height:100%;
        .el-dialog {
            width: 40%;
            margin-top: 0px !important;
            .dialog-footer{
                display: flex;
                justify-content: center;
            }
        }
         .mainSpec{
              display: flex;
              height:100%;
             .right{
                    flex: 1;
                    margin-left:20px;
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
             }
             .left{
                 .el-table--fit{
                     overflow: auto;
                 }
                 .has-gutter{
                     display: none;
                 }
             }
         }

    }
</style>