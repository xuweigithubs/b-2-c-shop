<template>
    <div class="paramsDialog">
        <el-dialog :close-on-click-modal="isModelClose" :before-close="close" title="添加规格参数" :style="dialogStyle" v-if="paramsDialogVisible" :visible.sync="paramsDialogVisible">
            <el-form ref="paramMainForm" :model="form" :rules="rules">
                <div class="basicItem">
                    <el-form-item label="规格参数名称" :label-width="formLabelWidth" prop="name">
                        <el-input v-model="form.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item  style="margin-left:0px!important;" :label-width="formLabelWidth" prop="generic">
                        <el-switch  active-text="是否通用规格" v-model="form.generic"></el-switch>
                        <el-switch  style="margin-left:30px" active-text="是否可搜索" v-model="form.searching"></el-switch>
                        <el-switch  active-text="是否为数字" style="margin-left:30px"  v-model="form.numberic"></el-switch>
                    </el-form-item>
                    <el-form-item label="单位"  v-if="form.numberic"  :label-width="formLabelWidth" prop="unit">
                        <el-input v-model="form.unit" autocomplete="off"></el-input>
                    </el-form-item>
                </div>
                <el-form ref="segmentsFormRef" id="segmentsForm"  :rules="segmentsRuleForm" :model="form.segmentsArray[0]"  v-if="form.numberic" :label-width="formLabelWidth">
                    <div v-for="(item,i) in form.segmentsArray" :key="i" style="display: flex">
                        <el-col :span="15">
                            <el-form-item  :label="i==0?'数字参数区间取值':''"
                                           :label-width="formLabelWidth"
                                            prop="from"
                                         >
                                <el-input  v-model.number="item.from" size="mini" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col class="line" :span="2">到</el-col>
                        <el-col :span="11">
                            <el-form-item  :label-width="formToWidth" prop="to">
                                <el-input  v-model.number="item.to" size="mini" autocomplete="off"></el-input>
                                <i class="el-icon-plus" @click="addSegment(item.index)" style="cursor:pointer"></i>
                                <i class="el-icon-delete" @click="deleteSegment(item.index)" style="cursor:pointer"></i>
                            </el-form-item>
                        </el-col>
                    </div>
                </el-form>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="close">取 消</el-button>
                <el-button type="primary" @click="confirmForm()">确 定</el-button>
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
        private segmentsArray=new Array<any>();
        private formLabelWidth:any='150px'
        private formToWidth:any="0px"
        private form:any= {
            name: '',
            numberic:false,
            generic:false,
            searching:false,
            segmentsArray:[]
        }
        //表单校验
        private rules:any={
            name: [
                { required: true, message: '规格参数名称不能为空', trigger: 'blur' }
            ],
            unit:[
                { required: true, message: '单位不能为空', trigger: 'blur' }
            ]
        }
        private segmentsRuleForm:any={
            from:[
                {type:'number',message: '区间开始只能为数字', trigger: 'blur' }
            ],
            to:[
                {type:'number',message: '区间结束只能为数字', trigger: 'blur' }
            ]
        }
        private addSegment(index){
            this.form.segmentsArray.splice(index+1,0,{"from":0,"to":0});
            this.setIndexForData();
        }
        //删除后也需要加上index
        private deleteSegment(index){
            this.form.segmentsArray.splice(index,1);
            this.setIndexForData();
        }
        private setIndexForData(){
            let index=0;
            this.form.segmentsArray.forEach(item=>{
                item.index=index++;
            });
        }
        //创建时调用
        async created(){
            if(this.params.isUpdate){
                this.form=this.params.form;
            }else{
                this.form.segmentsArray=[{"from":0,"to":0}];
            }
            this.setIndexForData();
            this.centerDialog();
        }

        @Emit("close")
        private close(){
            this.paramsDialogVisible=false;
        }
        private async confirmForm(){
            (this.$refs["paramMainForm"] as any).validate((paramMainFormValid) =>{
                if (paramMainFormValid) {
                    if(!this.$refs["segmentsFormRef"]){
                        this.saveParams(this.form);
                        return false;
                    }
                    (this.$refs["segmentsFormRef"] as any).validate((segmentsFormValid) =>{
                        if (segmentsFormValid) {
                             this.saveParams(this.form);
                        }
                    });
                }
            });
        }
        private async saveParams(params:any){
            let apiActions=new ApiActions(this);
            let segments="";
            if(params.segmentsArray.length>0&&params.numberic){
                params.segmentsArray.forEach(item=>{
                    segments=segments+item.from+"-"+item.to+";"
                });
                segments=segments.slice(0,segments.length-1);
            }
            params.segments=segments;
            await apiActions.saveParams(params);
            await this.confirm();
        }
        @Emit("confirm")
        private confirm(){
            this.paramsDialogVisible=false;
        }
        //保存数据
        private centerDialog(){
            this.$nextTick(()=>{
                    let height=$(window).height();
                    let dialogHeight=$(".paramsDialog .el-dialog").height();
                    this.dialogStyle={
                        top:(height/2-dialogHeight/2-40)+"px"
                    }
            });
        }
    }
</script>
<style lang="less">
    .paramsDialog{
        position:absolute;
        width:100%;
        height:100%;
        .el-dialog__body{
            padding-bottom: 0px;
           #segmentsForm{
                max-height: 150px!important;
                overflow:auto!important;
                .line{
                    text-align: center;
                    margin-top: 10px;
                }
            }
            .basicItem{
                padding-right: 20px;
                .el-form-item:nth-child(2) .el-form-item__content{
                    margin-left: 50px!important;
                }
            }
           #segmentsForm{
               .el-input--mini{
                   width: 160px!important;
               }
           }
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