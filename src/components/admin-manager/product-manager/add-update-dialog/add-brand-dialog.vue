<template>
   <div class="brandDialog">
        <el-dialog :close-on-click-modal="isModelClose" :before-close="close" title="添加商品分类" :style="dialogStyle" v-if="brandDialogVisible" :visible.sync="brandDialogVisible">
            <el-form ref="brandForm" :model="form" :rules="rules">
               <el-form-item label="品牌名称" :label-width="formLabelWidth" prop="name">
                  <el-input v-model="form.name" autocomplete="off"></el-input>
               </el-form-item>
                <el-form-item label="Letter" :label-width="formLabelWidth" prop="letter">
                  <el-input v-model="form.letter" autocomplete="off"></el-input>
               </el-form-item>
                <el-form-item label="选择图片" style="margin-left:40px;margin-bottom:0px">
                    <el-upload
                        class="avatar-uploader"
                        action="/mshop/api/gataway/file/upload"
                        :data="paramData"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
               <el-button @click="close">取 消</el-button>
               <el-button type="primary" @click="submitForm('brandForm')">确 定</el-button>
            </div>
        </el-dialog>
   </div>
</template>
<script lang="ts">
import {Component, Emit, Prop, Vue} from 'vue-property-decorator'
import ApiActions from '@/components/api/api-actions'
import $ from "jquery";
@Component
export default class BrandDialog extends Vue {
  @Prop() params:any;
  private paramData:any={};
  private brandDialogVisible:boolean=true;
  private dialogStyle:any={};
  private isModelClose:boolean=false;
  private imageUrl:any="";
  private form:any= {
      name: '',
      letter:'',
      image:''
  }
  //表单校验
  private rules:any={
     name: [
         { required: true, message: '请输入品牌名称', trigger: 'blur' }
     ],
     letter:[
         { required: true, message: '请输入Letter', trigger: 'blur' }
     ]
  }
  private handleAvatarSuccess(data){
    this.imageUrl=data.url;
    this.paramData={
       orgUrl:data.url
     }
    this.form.image=data.url;
  }
  private beforeAvatarUpload(){
    
  }
  private formLabelWidth:any='120px'
  //创建时调用
  async created(){
    if(this.params.type==="update"){
        this.form.id=this.params.id;
        this.form.name=this.params.name;
        this.form.letter=this.params.letter;
        this.form.image=this.params.image;
        this.imageUrl=this.params.image;
    }else{
        this.form.id="";
        this.form.name="";
        this.form.sort="";
        this.form.image="";
        this.imageUrl="";
    }
   
     this.centerDialog();
  }

  @Emit("close")
  private close(){
     this.brandDialogVisible=false;
  }

  @Emit("confirm")
  private confirm(){
     this.brandDialogVisible=false;
  }
  //提交表单
  private submitForm(formName) {
        (this.$refs[formName] as any).validate((valid) => {
          if (valid) {
              if(this.params.type=="add"){
                  this.saveBrand();
              }else{
                  this.updateBrand();
              }
            
          } else {
            return false;
          }
        });
   }
  //保存分组
  private async saveBrand(){
      let apiActions=new ApiActions(this);
      await apiActions.addBrand(this.form);
      this.confirm();
  }
  //编辑分组
  private async updateBrand(){
      let apiActions=new ApiActions(this);
      await apiActions.updateBrand(this.form);
      this.confirm();
  }
  private centerDialog(){
      this.$nextTick(()=>{
        let height=$(window).height();
        let dialogHeight=$(".brandDialog .el-dialog").height();
        this.dialogStyle={
           top:(height/2-dialogHeight/2)+"px"
        }
     })
  }
  
}
</script>
<style lang="less">
.brandDialog{
      .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
        }
        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            line-height: 178px;
            text-align: center;
        }
        .avatar {
            width: 178px;
            height: 178px;
            display: block;
        }
   position:absolute;
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