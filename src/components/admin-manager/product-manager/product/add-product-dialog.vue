<template>
    <div class="addProductDialog">
        <el-dialog width="800px"  :close-on-click-modal="isModelClose" :style="dialogStyle" :before-close="close" title="添加商品" v-if="isShowAddProductDialog" :visible.sync="isShowAddProductDialog">
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
            <spu-basic-info v-if="active==0"/>
            <spu-description v-if="active==1"/>
            <spu v-if="active==2"/>
            <sku v-if="active==3"/>
            <span slot="footer" class="dialog-footer">
                <el-button v-if="isShowPre" @click="pre">上一步</el-button>
                <el-button v-if="isShowNext" @click="next">下一步</el-button>
                <el-button v-if="isShowConfirm" :disabled="active!=4" type="primary" @click="confirm">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Prop, Vue} from 'vue-property-decorator'
    import Sku from "./sku.vue";
    import Spu from "./spu.vue";
    import SpuBasicInfo from "./spu-basic-info.vue";
    import SpuDescription from "./spu-description.vue";
    @Component({
        components:{
            Sku,
            Spu,
            SpuBasicInfo,
            SpuDescription
        }
    })
    export default class AddProductDialog extends Vue {
       private isShowAddProductDialog=true;
       private isModelClose:boolean=false;
       private dialogStyle:any="";
       private active:number=0;
       private isShowPre:boolean=true;
       private isShowNext:boolean=true;
       private isShowConfirm:boolean=true;
       @Emit("close")
       private close(){
           this.isShowAddProductDialog=false;
       }
       private next(){
           if(this.active<4){
               this.active++;
           }
       }
       private pre(){
           if(this.active>0){
               this.active--;
           }
       }
       private confirm(){
           this.close();
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