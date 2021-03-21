<template>
   <div class="editParamGroup">
      <div class="buttons"><el-button icon="el-icon-plus" @click="addGroup"> 添加</el-button></div>
      <el-table
         :data="paramGroupData"
         border
         style="width:100%">
         <el-table-column
            prop="name"
            label="参数组名称"
           >
            <template slot-scope="scope">
               <div class="input-box">
                     <el-input size="small" @blur="handleInputBlur" v-model="scope.row.name" ></el-input>
               </div>
            </template>
         </el-table-column>
         <el-table-column
            prop="address"
            width="150px"
            label="操作">
             <template slot-scope="scope">
                  <el-button
                     icon="el-icon-edit"
                     size="mini"
                     @click="deleteGroup(scope.$index, scope.row)">删除</el-button>
            </template>
         </el-table-column>
     </el-table>
      <div class="footer">
          <el-button type="primary" style="max-width:80px;margin-top:20px;margin-bottom:20px;" @click="goPre()">上一步</el-button>
          <el-button type="primary" style="max-width:80px;margin-top:20px;margin-bottom:20px;" @click="saveGroup()">添加</el-button>
      </div>
   </div>
</template>
<script lang="ts">
import {Component, Emit, Prop, Vue} from 'vue-property-decorator'
import {namespace} from 'vuex-class'
import ApiActions from '@/components/api/api-actions';
const goodsName=namespace("goods");
@Component
export default class EditParamGroup extends Vue {
  @Prop() params:any;
  @Prop() goPre:Function;
  @goodsName.State categoryId;
  private paramGroupData:any=new Array<any>();
  //创建时调用
  async  created(){
     let apiActions=new ApiActions(this);
      let categoryId:any=localStorage.getItem("categoryId");
      if(!categoryId){
         categoryId=this.categoryId;
      }
      let groupDatas:any=await apiActions.getSpecGroup({cid:categoryId});
      this.paramGroupData=groupDatas.data;
  }
  private addGroup(){
    if(!this.paramGroupData){
       this.paramGroupData=new Array<any>()
    }
    this.paramGroupData.push({name:""});
  }
  private deleteGroup(index,item){
      this.paramGroupData.splice(index, 1);
  }
  private handleInputBlur(){

  }
  //批量保存规格参数组
  private async saveGroup(){
      let categoryId:any=localStorage.getItem("categoryId");
      if(!categoryId){
         categoryId=this.categoryId;
      }
      console.log("paramGroupData",this.paramGroupData);
      let apiActions=new ApiActions(this);
      this.paramGroupData.forEach(element => {
         element.cid=categoryId
      });
      await apiActions.addSpecGroupBatch(this.paramGroupData);
      this.confirm();
  }
  @Emit("confirm")
  private confirm(){
  }
}
</script>
<style lang="less">
.editParamGroup{
   display: flex;
   flex-direction: column;
   justify-content: center;
   width:100%;
   height:100%;
   .buttons{
      justify-content: flex-end;
      display: flex;
      margin-bottom: 10px;
   }
   .footer{
      justify-content: center;
      display: flex;
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