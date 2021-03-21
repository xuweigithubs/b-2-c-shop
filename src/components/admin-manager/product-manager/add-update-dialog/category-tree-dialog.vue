<template>
   <div class="categoryTreeDialog">
        <el-dialog :close-on-click-modal="isModelClose" :before-close="close" title="添加商品分类" :style="dialogStyle" v-if="categoryDialogVisible" :visible.sync="categoryDialogVisible">
            <el-tree
                :data="categoryData"
                show-checkbox
                v-if="isShowTree"
                :auto-expand-parent="expendParent"
                :props="defaultProps"
                node-key="id"
                ref="categoryTreeRef"
                :default-checked-keys="keys"
                :default-expanded-keys="keys">
            </el-tree>
            <div slot="footer" class="dialog-footer">
               <el-button @click="close">取 消</el-button>
               <el-button type="primary" @click="submitForm()">确 定</el-button>
            </div>
        </el-dialog>
   </div>
</template>
<script lang="ts">
import {Component, Emit, Prop, Vue} from 'vue-property-decorator'
import ApiActions from '@/components/api/api-actions'
import $ from "jquery";
@Component
export default class CategoryTreeDialog extends Vue {
  @Prop() params:any;
  private isShowTree:boolean=false;
  private dialogStyle:any={};
  private categoryDialogVisible:boolean=true; 
  private defaultProps:any={ children: 'children',label: 'name'}
  private categoryData:Array<any>=Array<any>();
  private isModelClose:boolean=false;
  private keys:Array<any>=new Array<any>();
  private expendParent:boolean=true;
  //创建时调用
  async created(){
     let apiActions=new ApiActions(this);
     let categoryData:any=await apiActions.getCategories({name:""});
     this.categoryData=categoryData.data;
     this.isShowTree=true;
     let categoryIdsInfo:any=await apiActions.getCategoryByBrandId({brandId:this.params.brandId});
     //获取这个品牌所关联的分类
     this.$nextTick(()=>{
         this.keys=categoryIdsInfo.data
     })
  }
  mounted(){
      this.centerDialog();
  }

  @Emit("close")
  private close(){
     this.categoryDialogVisible=false;
  }

  @Emit("confirm")
  private async submitForm(){
     let categoryTree:any= this.$refs.categoryTreeRef;
     let checkNodesKeys:any=categoryTree.getCheckedKeys(true,false);
     let brandAndProductList=new Array<any>();
     checkNodesKeys.forEach(categoryId => {
        brandAndProductList.push({categoryId:categoryId,brandId:this.params.brandId});
     });
     let apiActions=new ApiActions(this);
     await apiActions.batchSaveBrandAndCategoryRls(brandAndProductList);
     this.categoryDialogVisible=false;
  }
  //提交表单
  private centerDialog(){
      this.$nextTick(()=>{
        let height=$(window).height();
        let dialogHeight=$(".categoryTreeDialog  .el-dialog").height();
        this.dialogStyle={
           top:(height/2-dialogHeight/2)+"px"
        }
     })
  }
  
}
</script>
<style lang="less">
    .categoryTreeDialog{
          .el-dialog__wrapper{
             position:absolute;
          }
          .el-dialog__body{
             height:250px!important;
             overflow:auto;
          }
    }
</style>