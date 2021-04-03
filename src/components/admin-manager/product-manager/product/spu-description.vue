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
         private content:any="";
         private editorOption:any={};
        onEditorBlur(quill) {
            console.log('editor blur!', quill)
        }
        onEditorFocus(quill) {
            console.log('editor focus!', quill)
        }
        onEditorReady(quill) {
            console.log('editor ready!', quill)
        }
        onEditorChange({ quill, html, text }) {
            console.log('editor change!', html)
        }
    }
</script>

<style lang="less">
    .edit_container{
        .ql-container{
          height: 200px!important;
            overflow: auto;
        }
    }

</style>