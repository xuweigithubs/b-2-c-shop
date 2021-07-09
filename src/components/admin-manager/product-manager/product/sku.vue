<template>
    <div class="sku">
        <div class="formList" v-for="(item,index) in groupParams" :key="index">
            <div class="title">{{item.k}}</div>
            <div class="formContent">
                <el-form :model="option" :rules="skuFormRule" v-for="(option,index) in item.options"  :key="index"   ref="skuRuleForm"  class="demo-ruleForm">
                    <el-form-item label-width="20px"  prop="v" label="">
                        <el-input v-model="option.v"></el-input>
                    </el-form-item>
                    <i class="el-icon-delete" @click="deleteOption(item,index)"></i>
                    <i class="el-icon-plus" @click="changeParam(item)"></i>
                </el-form>
            </div>
        </div>
        <div class="skuTable">
            <el-table
                    :data="skuData"
                    style="width: 100%">
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-upload
                                    v-show="props.row.enable"
                                    action="/mshop/api/gataway/file/upload"
                                    list-type="picture-card"
                                    :data="props.row"
                                    :file-list="props.row.fileList"
                                    :on-success="onSuccess"
                                    :auto-upload="autoUpload">
                                <i slot="default" class="el-icon-plus"></i>
                                <div slot="file" slot-scope="{file}">
                                    <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                                    <span class="el-upload-list__item-actions">
                                            <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                                              <i class="el-icon-zoom-in"></i>
                                            </span>
                                            <span v-show="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file,props.row)">
                                              <i class="el-icon-delete"></i>
                                            </span>
                                      </span>
                                </div>
                            </el-upload>
                        </template>
                    </el-table-column>
                    <el-table-column
                            v-for="(group,index) in groupParams" v-if="group.options.length>0&&group.options[0]" :key="index" prop="group"
                            :label="group.k"
                            :prop="group.k">
                    </el-table-column>
                    <el-table-column
                            prop="price"
                            label="价格">
                        <template slot-scope="scope">
                            <el-form :model="scope.row" :rules="priceFormRule" :key="scope.row.index" ref="priceForm">
                                <el-form-item label-width="20px"  prop="price" label="">
                                    <el-input v-model.number="scope.row.price"></el-input>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="stock"
                            label="库存">
                        <template slot-scope="scope">
                            <el-form :model="scope.row" :rules="stockFormRule" :key="scope.row.index" ref="stockForm">
                                <el-form-item label-width="20px"  prop="stock" label="">
                                    <el-input v-model.number="scope.row.stock"></el-input>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="isUsed"
                            label="是否启用">
                        <template slot-scope="scope">
                            <el-form :model="scope.row" :rules="priceFormRule" :key="scope.row.index" ref="isUsedForm">
                                <el-form-item label-width="20px"  label="">
                                    <el-switch
                                            v-model="scope.row.enable"
                                            active-color="#13ce66">
                                    </el-switch>
                                </el-form-item>
                            </el-form>

                        </template>
                    </el-table-column>
                </el-table>
        </div>
    </div>
</template>
<script lang="ts">
    import {Component, Emit, Prop, Vue,Watch} from 'vue-property-decorator';
    import {namespace} from 'vuex-class';
    import * as _ from 'lodash'
    const goodsName=namespace("goods");
    import ApiActions from '@/components/api/api-actions';
    @Component
    export default class Sku extends Vue{
        @Prop() params;
        @goodsName.State addSpuSelectCategoryId;
        private fileList:Array<any>=new Array<any>();
        private autoUpload:boolean=true;
        private isInit:boolean=true;
        public groupParams:Array<any>=new Array<any>();
        private skuFormRule:any={
            v:[
                { required: true, message: '参数不能为空', trigger: 'blur' }
            ]
        };
        private priceFormRule:any={
            price:[
                { required: true, message: '价格不能为空', trigger: 'blur' },
                {type:'number',message: '价格只能为数字', trigger: 'blur' }
            ]
        }
        private stockFormRule:any={
            stock:[
                { required: true, message: '库存不能为空', trigger: 'blur' },
                {type:'number',message: '库存只能是数字', trigger: 'blur' }
            ]
        }
        private orgData=new Array<any>();
        private model="";
        public skuData:Array<any>=new Array<any>();
        private dialogImageUrl='';
        private dialogVisible=false;
        private disabled=false;
        handleRemove(file,curRow:any) {
            let fileList=new Array<any>();
            let images="";
            curRow.fileList.forEach(item=>{
                 if(file.url!=item.url){
                     fileList.push(item);
                     images=images+item.url+",";
                 }
            });
            images=images.substring(0,images.length-1);
            curRow.fileList=fileList;
            curRow.images=images;
            console.log(file);
        }
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        }
        handleDownload(curRow:any) {
            console.log(curRow);
        }
        private onSuccess(response, file, fileListResult){
            let skuItem=this.skuData.find(item=>item.index==response.index);
            if(skuItem){
                let list=new Array<any>();
                let fileList=skuItem.fileList?skuItem.fileList:list;
                let images="";
                fileListResult.forEach(item=>{
                    if(item.response){
                        fileList.push(item.response);
                        images=images+item.response.url+",";
                    }else{
                        images=images+item.url+",";
                    }
                });
                images=images.substring(0,images.length-1);
                skuItem.images=images;
                skuItem.fileList=fileList;
            };
        }
        @Watch("addSpuSelectCategoryId",{deep:true,immediate:true})
        private async addSkuSelectCategoryIdChange(newVal, oldVal){
            if(this.params.spuId&&this.params.data&&this.params.data.spuDetialVO&&this.params.data.spuDetialVO.specifications){
                let editData:any=JSON.parse(this.params.data.spuDetialVO.specifications);
                let groupParams=new Array<any>();
                if(editData){
                    editData.groupParams.forEach(item=>{
                        item.params.forEach(paramItem=>{
                            paramItem.group=item.group;
                            if(!paramItem.generic){
                                groupParams.push(paramItem);
                            }
                        })
                    })
                };
                this.groupParamsChange(groupParams);
            }else{
                await this.genSkuParams(newVal, oldVal);
            }
        }
        private async genSkuParams(newVal, oldVal){
            //根据分类查询参数模板
            let apiActions=new ApiActions(this);
            let result:any=(await apiActions.getTemplateByCid({categoryId:newVal})).data;
            if(result&&result.length>0) {
                let resultData:any=JSON.parse(result[0].specifications);
                let groupData=resultData.groupParams;
                //展示有分组的规格参数
                let dataTemp:Array<any>=new Array<any>();
                for(let i=0;i<groupData.length;i++){
                    let params=groupData[i].params.map((item,index)=>{
                        let options=new Array<any>();
                        options.push({v:'',index:0});
                        return {
                            group:groupData[i].group,
                            k:item.name,
                            numberic:item.numberic,
                            generic:item.generic,
                            searching:item.searching,
                            segments:item.segments,
                            unit:item.unit,
                            options:options
                        }
                    });
                    params.forEach(item=>{
                        if(!item.generic){
                            dataTemp.push(item);
                        }
                    });
                }
                //展示没有分组的规格参数
                if(resultData.params.length>0){
                    let params=resultData.params.map((item,index)=>{
                        let options=new Array<any>();
                        options.push({v:'',index:0});
                        return {
                            k:item.name,
                            numberic:item.numberic,
                            generic:item.generic,
                            searching:item.searching,
                            segments:item.segments,
                            unit:item.unit,
                            options:options
                        }
                    });
                    params.forEach(item=>{
                        if(!item.generic){
                            dataTemp.push(item);
                        }
                    });
                };
                this.groupParamsChange(dataTemp);
            }else{
                this.groupParams=[];
            }
        }
        private changeParam(item:any){
            item.options.push({v:''});
            item.options.forEach((item,index)=>{
                item.index=index;
            })
        }
        @Watch("groupParams",{deep:true})
        private groupParamsChange(groupParams:Array<any>){
              //这里面对校验信息进行封装
             this.skuData=new Array<any>();
             for(let i=0;i<groupParams.length;i++){
                  this.genPlusSkuItems(groupParams[i]);
             }
             this.groupParams=groupParams;
        }
        //生成sku列表
        private genPlusSkuItems(param){
            let temp: any;
            let tempSkuData = _.cloneDeep(this.skuData);
            this.skuData=new Array<any>();
            let skuLength = tempSkuData.length;
            let opLength = param.options.length;
            let newResult = new Array<any>();
            for (let i = 0; i < opLength; i++) {
                    if(tempSkuData.length>0){
                          for(let j=0;j<tempSkuData.length;j++){
                                  let item:any= _.cloneDeep(tempSkuData[j]);
                                  item[param.k]=param.options[i].v;
                                  item.index=item.index+"-"+param.options[i].index;
                                  newResult.push(item);
                          }
                    }else{
                            let item:any={};
                            item[param.k]=param.options[i].v
                            item.index=param.options[i].index;
                            newResult.push(item);
                    }

            };

            let skuItemList=this.params&&this.params.data&&this.params.data.skus;
            newResult.forEach(curItem=>{
                let skuItem=skuItemList&&skuItemList.find(item=>item.indexes==curItem.index);
                if(skuItem){
                    curItem.price=Number(skuItem.price);
                    curItem.stock=Number(skuItem.stockVO.stock);
                    curItem.enable=skuItem.enable;
                    if(skuItem.images){
                        let imgItems=skuItem.images.split(",");
                        let fileList=new Array<any>();
                        let images="";
                        imgItems.forEach(item=>{
                            fileList.push({name:"",url:item});
                            images=images+item+",";
                        });
                        images=images.substring(0,images.length-1);
                        curItem.images=images;
                        curItem.fileList=fileList;
                    }
                }
            });
            this.skuData=newResult;
        }

        private deleteOption(item,i){
            if(i>0){
                item.options.splice(i,1);
            }
            item.options.forEach((item,index)=>{
                item.index=index++;
            })
        }
    }
</script>
<style lang="less">
    .sku{
        max-height: 320px!important;
        overflow: auto!important;
        .el-form-item{
            margin-bottom: 15px;
        }
        .el-icon-delete{
            margin-left: 10px;
            height: 40px;
            line-height: 40px;
        }
        .el-icon-plus{
            height: 32px;
            line-height: 32px;
        }
        .el-icon-plus:before {
            content: "\e6d9";
            margin-top: 4px;
            display: inline-block;
        }
        .el-input__inner{
            height: 32px;
        }
       .formList{
           display: flex;
           padding-right:30px;
           .title{
               width: 100px;
               text-align: right;
           }
       }
        .el-form-item__error{
            width: 110px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
       .title{
           width: 100px;
           text-align: right;
       }
       .formContent{
           display: flex;
           flex: 1;
           flex-wrap: wrap;
           .el-form{
               display: flex;
               width: 25%;
           }
       }

    }

</style>