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
    import {quillRedefine} from 'vue-quill-editor-upload';
    import ApiActions from '@/components/api/api-actions'
    @Component({
        components: {
            quillRedefine
        },
    })
    export default class SpuDescription extends Vue{
             @Prop() params;
             private content:any="";
             private editorOption:any={};
             private orgImageUrls=new Array<any>();
             private currentImageUrls=new Array<any>();
             private descriptionFormRule:any={
                 content:[
                     { required: true, message: '描述不能为空', trigger: 'blur' }
                 ]
             }
            created(){
             this.editorOption=quillRedefine(
                 {
                     uploadConfig: {
                         action:"/mshop/api/gataway/file/upload",
                         res: (respnse) => {
                             return respnse.url
                         },
                         name: 'file'
                     }
                 }
             );
             if(this.params.spuId&&this.params.data.spuDetialVO){
                  this.content=this.params.data.spuDetialVO.description;
                  let reg=/http.*?\.jpg/g;
                  this.orgImageUrls=this.content.match(reg);
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
                    let reg=/http.*?\.jpg/g;
                    this.content=html;
                    this.currentImageUrls=this.content.match(reg);
                    //新老数据做对比
                    let deleteImage:Array<any>=new Array<any>();
                    this.orgImageUrls.forEach(imgUrl=>{
                          let itemUrl:any=this.currentImageUrls.find(curImg=>curImg==imgUrl);
                          if(!itemUrl){
                                console.log("需要删除的图片",imgUrl);
                                this.orgImageUrls=this.currentImageUrls;
                                let params:any={deleteUrl:imgUrl};
                                let apiActions=new ApiActions(this);
                                apiActions.deleteImage(params);
                          }
                    })
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