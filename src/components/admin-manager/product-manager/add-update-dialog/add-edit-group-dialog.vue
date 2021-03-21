<template>
   <div class="productSpecGroupDialog">
        <el-dialog :close-on-click-modal="isModelClose" title="添加规格参数组" :before-close="close" :style="dialogStyle" v-if="specGroupDialogVisible" :visible.sync="specGroupDialogVisible">
           <el-steps :active="activeTab" align-center>
               <el-step title="选择商品分类"></el-step>
               <el-step title="添加参数分组"></el-step>
           </el-steps>
           <div class="categoryTreeSelect">
              <select-category :goNext="goNext" v-if="activeTab==1"/>
              <edit-param-group @confirm="confirm" :goPre="goPre" v-if="activeTab==2"/>
           </div>
        </el-dialog>
   </div>
</template>
<script lang="ts">
import {Component, Emit, Prop, Vue} from 'vue-property-decorator'
import ApiActions from '@/components/api/api-actions'
import SelectCategory from './select-category.vue'
import EditParamGroup from './edit-param-group.vue'
import $ from "jquery";

@Component({
components: {
  SelectCategory,
  EditParamGroup
},
})
export default class ProductSpecGroupDialog extends Vue {
  @Prop() params:any;
  private isModelClose:boolean=false;
  private specGroupDialogVisible:boolean=true;
  private isShowTree:boolean=false;
  private dialogStyle:any={};
  private activeTab:any=1;
  private form:any= {
      name: ''
  }
  //表单校验
  private rules:any={
      name: [
         { required: true, message: '请输入规格参数组名称', trigger: 'blur' }
     ]
  }
  private formLabelWidth:any='120px'
  //创建时调用
  async created(){
     this.form.name=this.params.name;
     this.isShowTree=true;
     this.centerDialog();
  }
  //添加分组
  private addGroup(){
      this.specGroupDialogVisible = true;
      this.centerDialog();
  }

  @Emit("close")
  private close(){
     this.specGroupDialogVisible=false;
  }

  @Emit("confirm")
  private confirm(){
     this.specGroupDialogVisible=false;
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
         await apiActions.addSpecGroup({name:this.form.name,cid:110});
      }
      if(this.params.type=="update"){
         await apiActions.updateSpecGroup({id:this.params.id,name:this.form.name,cid:110});
      }
      this.confirm();
  }
  //编辑分组
  private updateGroup(){
      //this.centerDialog();
  }
  private centerDialog(){
      this.$nextTick(()=>{
        let height=$(window).height();
        let dialogHeight=$(".productSpecGroup .el-dialog").height();
        this.dialogStyle={
           top:(height/2-dialogHeight/2)+"px"
        }
     })
  }
  //下一步
  private goNext(){
     this.activeTab=2;
  }
  //上一步
  private goPre(){
     this.activeTab=1;
  }
}
</script>
<style lang="less">
.productSpecGroupDialog{
   position: absolute;
   width:100%;
   height:100%;
   .el-dialog__body{
      padding: 5px 20px;
   }
   .categoryTreeSelect{
      width:100%;
      height:400px;
      overflow-y: auto;
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