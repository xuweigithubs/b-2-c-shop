<template>
    <div class="addProductDialog" v-if="isShowSpuDetial">
        <el-dialog width="900px"  :close-on-click-modal="isModelClose" :style="dialogStyle" :before-close="close" title="添加商品" v-if="isShowAddProductDialog" :visible.sync="isShowAddProductDialog">
                <el-steps :active="active" finish-status="success">
                    <el-step title="基本信息">
                    </el-step>
                    <el-step title="描述信息">
                    </el-step>
                    <el-step title="spu信息">
                    </el-step>
                    <el-step title="sku信息">
                    </el-step>
                </el-steps>
                <spu-basic-info :params="params" v-show="active==0" ref="spuBasicInfoRef"/>
                <spu-description :params="params" v-show="active==1" ref="spuDescriptionRef"/>
                <spu :params="params" v-show="active==2" ref="spuRef"/>
                <sku :params="params" v-show="active==3" ref="skuRef"/>
                <span slot="footer" class="dialog-footer">
                    <el-button v-if="isShowPre" @click="pre">上一步</el-button>
                    <el-button v-if="isShowNext" @click="next">下一步</el-button>
                    <el-button v-if="isShowConfirm" :disabled="active!=3" type="primary" @click="confirm">确定</el-button>
                </span>
        </el-dialog>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Prop, Vue} from 'vue-property-decorator'
    import $ from "jquery";
    import Sku from "./sku.vue";
    import Spu from "./spu.vue";
    import SpuBasicInfo from "./spu-basic-info.vue";
    import SpuDescription from "./spu-description.vue";
    import ApiActions from '@/components/api/api-actions';
    @Component({
        components:{
            Sku,
            Spu,
            SpuBasicInfo,
            SpuDescription
        }
    })
    export default class AddProductDialog extends Vue {
        @Prop() params;
        private isShowAddProductDialog=true;
        private isModelClose:boolean=false;
        private dialogStyle:any="";
        private active:number=0;
        private isShowPre:boolean=true;
        private isShowNext:boolean=true;
        private isShowConfirm:boolean=true;
        private isShowSpuDetial=false;
       @Emit("close")
       private close(){
           this.isShowAddProductDialog=false;
       }
       async created(){
           if(this.params.spuId){
               let apiActions=new ApiActions(this);
               let result:any=await apiActions.selectProduct({id:this.params.spuId});
               this.params.data=result.data;
           }
           this.isShowSpuDetial=true;
       }
       private next(){
           let isValidate=false;
           let spuBasicInfoRef:any=(this.$refs.spuBasicInfoRef as any).$refs.ruleForm;
           spuBasicInfoRef.validate((paramMainFormValid) =>{
               if (paramMainFormValid) {
                   isValidate=true;
               }else{
                   isValidate=false;
               }
           });
           if(!isValidate&&this.active==0){
                return false;
           }
           let spuDescription:any=(this.$refs.spuDescriptionRef as any).content;
           if(!spuDescription&&this.active==1){
                return false;
           }
           //校验spu表单数据
           let spuRef:Array<any>=(this.$refs.spuRef as any).$refs.spuRuleForm;
           let spuIsValidate=true;
           if(spuRef){
               for(let i=0;i<spuRef.length;i++){
                   spuRef[i].validate((paramMainFormValid) =>{
                       if (paramMainFormValid) {
                           spuIsValidate=true;
                       }else{
                           spuIsValidate=false;
                       }
                   });
                   if(!spuIsValidate){
                       break;
                   }
               }
           }
           if(!spuIsValidate&&this.active==2){
               return false;
           }
           if(this.active<3){
               this.active++;
           }
           this.centerDialog();
       }
       private pre(){
           if(this.active>0){
               this.active--;
           }
           this.centerDialog();
       }
       private confirm(){
           //点击确定的时候需要看看最后一步的sku是否填写完整
           let skuRef:Array<any>=(this.$refs.skuRef as any).$refs.skuRuleForm;
           let priceForm:any=(this.$refs.skuRef as any).$refs.priceForm;
           let stockForm:any=(this.$refs.skuRef as any).$refs.stockForm;
           let hasErrorArray=new Array<any>();
           skuRef.forEach(item=>{
               item.validate((paramMainFormValid) =>{
                   if (!paramMainFormValid) {
                       hasErrorArray.push(true)
                   }
               });
           });
           priceForm&&priceForm.validate((paramMainFormValid) =>{
               if (!paramMainFormValid) {
                   hasErrorArray.push(true)
               }
           });
           stockForm&&stockForm.validate((paramMainFormValid) =>{
               if (!paramMainFormValid) {
                   hasErrorArray.push(true)
               }
           });
           if(hasErrorArray.length>0){
               return false;
           };
           //校验通过后需要获取组件的数据
           //获取基本信息
           let spuBasicInfoData:any=(this.$refs.spuBasicInfoRef as any);
           let categoryIds=spuBasicInfoData.categoryId;
           let brandId=spuBasicInfoData.brandId;
           let ruleForm=spuBasicInfoData.ruleForm;
           //描述信息
           let spuDescription:any=(this.$refs.spuDescriptionRef as any).content;
           //spu信息
           let spuRef=(this.$refs.spuRef as any);
           //sku信息
           let skuDataRef:any=(this.$refs.skuRef as any);
           //sku价格和库存信息
           let skuTableData=skuDataRef.skuData;
           let skus=new Array<any>();
           skuTableData.forEach(item=>{
               let ownSpec={};
               let index=0;
               let skuTitleStr="";
               for(let key  in item){
                     if(key!="index"&&key!="enable"&&key!="price"&&key!="stock"&&key!="images"){
                         ownSpec[key]=item[key];
                         skuTitleStr=skuTitleStr+item[key]+" "
                     }
               }
               let sluTitle=ruleForm.title+" "+skuTitleStr;
               skus.push( {
                   spuId:"",
                   title:sluTitle,
                   images:item.images,
                   price:item.price,
                   indexes:item.index,
                   ownSpec:JSON.stringify(ownSpec),
                   enable:item.enable,
                   stockVO:{
                           skuId:"",
                           seckillStock:"",
                           seckillTotal:"",
                           stock:item.stock
                       }
                   });
           });
           //获取通用规格参数和特有规格参数的
           let spuData=spuRef.groupParams;
           let skuData=skuDataRef.groupParams;
           let allParams=[...spuData,...skuData];
           let groupSet=new Set();
           allParams.forEach(item=>{
               groupSet.add(item.group);
           });
           let groupArray=Array.from(groupSet);
           let groupSpecifications=new Array<any>();
           groupArray.forEach(item=>{
               let params=allParams.filter(curItem=>curItem.group==item);
               groupSpecifications.push({group:item,params:params});
           })
           let noGroupParams=allParams.filter(item=>!item.group);
           let specifications={groupParams:groupSpecifications,params:noGroupParams};
           //取出所有特有规格参数
           //组装数据入库
           let spuParams:any={
               title:ruleForm.title,
               subTitle:ruleForm.subTitle,
               cid1:categoryIds[0],
               cid2:categoryIds[1],
               cid3:categoryIds[2],
               brandId:brandId,
               saleable:true,
               valid:true,
               spuDetialVO:{
                   spuId:"",
                   description:spuDescription,
                   specifications:JSON.stringify(specifications),
                   specTemplate:JSON.stringify(skuData),
                   packingList:ruleForm.packingList,
                   afterService:ruleForm.afterService
               },
               skus:skus
           };
           //调用接口保存规格参数
           let apiActions=new ApiActions(this);
           if(this.params.spuId){
               spuParams.id=this.params.spuId;
               apiActions.updateGood(spuParams);
           }else{
               apiActions.saveGood(spuParams);
           }

           this.close();
       }
        mounted(){
            this.centerDialog();
        }
        private centerDialog(){
            this.$nextTick(()=>{
                let height=$(window).height();
                let dialogHeight=$(".addProductDialog .el-dialog").height();
                this.dialogStyle={
                    top:(height/2-dialogHeight/2-130)+"px"
                }
            })
        }
    }
</script>
<style lang="less">
    .addProductDialog{
        .el-dialog__footer{
            text-align: center!important;
        }
    }
</style>