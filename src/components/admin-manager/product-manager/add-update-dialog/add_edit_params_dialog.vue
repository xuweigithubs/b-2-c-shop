<template>
    <div class="paramsDialog">
        <el-dialog :close-on-click-modal="isModelClose" :before-close="close" title="添加规格参数" :style="dialogStyle" v-if="paramsDialogVisible" :visible.sync="paramsDialogVisible">
            <el-form ref="brandForm" :model="form" :rules="rules">
                <el-form-item label="规格参数名称" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="是否为数字" :label-width="formLabelWidth" prop="letter">
                    <el-input v-model="form.letter" autocomplete="off"></el-input>
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
export default class AddEditParamsDialog extends Vue {
        @Prop() params:any;
        private paramData:any={};
        private paramsDialogVisible:boolean=true;
        private dialogStyle:any={};
        private isModelClose:boolean=false;
        private form:any= {
            name: '',
            letter:''
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
            this.imageUrl=data;
            this.paramData={
                orgUrl:data
            }
            this.form.image=data;
        }
        private beforeAvatarUpload(){

        }
        private formLabelWidth:any='120px'
        //创建时调用
        async created(){
            if(this.params.type="update"){
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
            this.paramsDialogVisible=false;
        }

        @Emit("confirm")
        private confirm(){
            this.paramsDialogVisible=false;
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
                let dialogHeight=$(".paramsDialog .el-dialog").height();
                this.dialogStyle={
                    top:(height/2-dialogHeight/2)+"px"
                }
            })
        }

    }
</script>
<style lang="less">
    .paramsDialog{
        position:absolute
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