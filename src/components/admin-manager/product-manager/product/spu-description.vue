<template>
    <div class="edit_container">
                <quill-editor
                        v-model="content"
                        ref="myQuillEditor"
                        :options="editorOption"
                        @blur="onEditorBlur($event)"
                        @focus="onEditorFocus($event)"
                        @change="onEditorChange($event)">
                </quill-editor>
    </div>
</template>
<script lang="ts">
    import {Component, Emit, Prop, Vue} from 'vue-property-decorator';
    @Component
    export default class SpuDescription extends Vue{
         @Prop() params;
         private content:any="";
         private editorOption:any={};
         private descriptionFormRule:any={
             content:[
                 { required: true, message: '描述不能为空', trigger: 'blur' }
             ]
         }
         created(){
             if(this.params.spuId&&this.params.data.spuDetialVO){
                 this.content=this.params.data.spuDetialVO.description;
             }
         }
        private contentObj:any={};
        onEditorBlur(quill) {
        }
        onEditorFocus(quill) {
        }
        onEditorReady(quill) {
        }
        onEditorChange({ quill, html, text }) {
            this.content=html;
        }
    }
</script>

<style lang="less">
    .edit_container{
        .ql-container{
          height: 450px!important;
            overflow: auto;
        }
    }

</style>