<template>
   <div class="categoryDialog">
        <el-dialog :close-on-click-modal="isModelClose" :before-close="close" title="添加商品分类" :style="dialogStyle" v-if="categoryDialogVisible" :visible.sync="categoryDialogVisible">
            <el-form ref="categoryForm" :model="form" :rules="rules">
               <el-form-item label="分类名称" :label-width="formLabelWidth" prop="name">
                  <el-input v-model="form.name" autocomplete="off"></el-input>
               </el-form-item>
                <el-form-item label="排序号" :label-width="formLabelWidth" prop="sort">
                  <el-input v-model="form.sort" autocomplete="off"></el-input>
               </el-form-item>
                <el-form-item label="是否父节点" style="margin-left:40px;margin-bottom:0px">
                  <el-switch v-model="form.parent"></el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
               <el-button @click="close">取 消</el-button>
               <el-button type="primary" @click="submitForm('categoryForm')">确 定</el-button>
            </div>
        </el-dialog>
   </div>
</template>
<script lang="ts">
import {Component, Emit, Prop, Vue} from 'vue-property-decorator'
import ApiActions from '@/components/api/api-actions'
import $ from "jquery";
@Component
export default class CategoryDialog extends Vue {
  @Prop() params:any;
  private categoryDialogVisible:boolean=true;
  private dialogStyle:any={};
  private isModelClose:boolean=false;
  private form:any= {
      name: '',
      sort:'',
      parent:false
  }
  //表单校验
  private rules:any={
      name: [
         { required: true, message: '请输入分类名称', trigger: 'blur' }
     ],
     sort:[
         { required: true, message: '请输入排序号', trigger: 'blur' }
     ]
  }
  private formLabelWidth:any='120px'
  //创建时调用
  async created(){
     this.form.name=this.params.name;
     this.form.sort=this.params.sort;
     this.form.parent=this.params.parent;
     this.form.parentId=this.params.parentId;
     this.centerDialog();
  }

  @Emit("close")
  private close(){
     this.categoryDialogVisible=false;
  }

  @Emit("confirm")
  private confirm(){
     this.categoryDialogVisible=false;
  }
  //提交表单
  private submitForm(formName) {
        (this.$refs[formName] as any).validate((valid) => {
          if (valid) {
             this.confirmSave();
          } else {
            return false;
          }
        });
   }
  //保存分组
  private async confirmSave(){
      let apiActions=new ApiActions(this);
      if(this.params.type=="add"){
         await apiActions.addCategory({name:this.form.name,sort:this.form.sort,parent:this.form.parent,parentId:this.form.parentId});
      }
      if(this.params.type=="update"){
         await apiActions.updateCategory({id:this.params.id,name:this.form.name,sort:this.form.sort,parent:this.form.parent});
      }
      this.confirm();
  }
  //编辑分组
  private updateGroup(){
      this.centerDialog();
  }
  private centerDialog(){
      this.$nextTick(()=>{
        let height=$(window).height();
        let dialogHeight=$(".categoryDialog .el-dialog").height();
        this.dialogStyle={
           top:(height/2-dialogHeight/2)+"px"
        }
     })
  }
}
</script>
<style lang="less">
.categoryDialog{
   position: absolute;
   width:100%;
   height:100%;
   .el-dialog__body{
      padding-bottom: 0px;
   }
    .el-dialog{
        width: 40%;
        margin-top:0px!important;
        .dialog-footer{
            display: flex;
            justify-content: center;
        }
   }
} 
</style>