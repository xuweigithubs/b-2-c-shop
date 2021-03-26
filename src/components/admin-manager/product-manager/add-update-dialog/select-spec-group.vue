<template>
    <div class="selectSpecGroupDialog">
        <el-dialog width="400px" :close-on-click-modal="isModelClose" :style="dialogStyle" :before-close="close" title="选择规格参数组" v-if="selectSpecGroupDialogVisible" :visible.sync="selectSpecGroupDialogVisible">
            <div class="butons">
                <el-input style="flex:1"
                          placeholder="请输入名称搜索"
                          prefix-icon="el-icon-search"
                          v-model="searchKey">
                </el-input>
            </div>
            <div class="productSelectSpecGroupTable">
                <el-table
                        ref="specGroupTable"
                        tooltip-effect="dark"
                        @current-change="handleCurrentChange"
                        highlight-current-row
                        :data="selectSpecGroupData"
                >
                    <el-table-column
                            prop="name"
                            label="参数组名称">
                    </el-table-column>
                </el-table>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="close">取 消</el-button>
                <el-button type="primary" @click="confirm()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script lang="ts">
    import {Component, Prop, Vue, Watch,Emit} from 'vue-property-decorator'
    import {namespace} from 'vuex-class';
    import ApiActions from '@/components/api/api-actions';
    import $ from "jquery";
    @Component({
        components: {
        }
    })
    export default class SelectSpecGroup extends Vue {
        @Prop() params:any;
        private isModelClose:boolean=false;
        private selectSpecGroupDialogVisible:boolean=true;
        private selectSpecGroupData:Array<any>=new Array<any>();
        private dialogStyle:any={};
        private currentRow:any="";
        private searchKey:any="";
        async created(){
             let apiActions=new ApiActions(this);
             if(this.params&&this.params.categoryId){
                 let groupDatas:any=await apiActions.getSpecGroup({cid:this.params.categoryId});
                 this.selectSpecGroupData=groupDatas.data;
             }
        }
        @Emit("close")
        private close(){
            this.selectSpecGroupDialogVisible=false;
        }
        private confirm(){
            let row=this.currentRow;
            this.confirmSelect(row);
        }
        //确认选中
        @Emit("confirmSelect")
        private async confirmSelect(row){
            return row;
        }
        mounted(){
            this.centerDialog();
        }
        @Watch("searchKey")
        private async searchByKey(searchText:any){
            let apiActions=new ApiActions(this);
            if(this.params&&this.params.categoryId){
                let groupDatas:any=await apiActions.getSpecGroup({cid:this.params.categoryId,name:this.searchKey});
                this.selectSpecGroupData=groupDatas.data;
            }
        }
        private handleCurrentChange(val){
            this.currentRow=val;
        }
        private centerDialog(){
            this.$nextTick(()=>{
                let height=$(window).height();
                let dialogHeight=$(".selectSpecGroupDialog .el-dialog").height();
                this.dialogStyle={
                    top:(height/2-dialogHeight/2-30)+"px"
                }
            })
        }
    }
</script>

<style lang="less">
    .selectSpecGroupDialog{
        .el-dialog__body{
            max-height: 200px;
            overflow: auto;
        }
    }
</style>