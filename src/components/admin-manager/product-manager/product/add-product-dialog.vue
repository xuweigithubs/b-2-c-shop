<template>
    <div class="addProductDialog">
        <el-dialog width="400px" :close-on-click-modal="isModelClose" :style="dialogStyle" :before-close="close" title="添加商品" v-if="isShowAddProductDialog" :visible.sync="isShowAddProductDialog">

        </el-dialog>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Prop, Vue} from 'vue-property-decorator'
    @Component
    export default class AddProductDialog extends Vue {
       private isShowAddProductDialog=true;
       private isModelClose:boolean=false;
       private dialogStyle:any="";
       @Emit("close")
       private close(){
          this.isShowAddProductDialog=false;
       }
    }
</script>
<style scoped>

</style>