<template>
    <div class="sku">
        <div class="formList" v-for="(item,index) in groupParams" :key="index">
            <div class="title">{{item.k}}</div>
            <div class="formContent">
                <el-form :model="skuForm" :rules="skuFormRule"   ref="skuRuleForm"  class="demo-ruleForm">
                    <el-form-item label-width="20px"   v-for="(option,index) in item.options" :key="index" prop="option">
                        <el-input v-model="option.v"></el-input><i class="el-icon-delete" @click="deleteOption(item,index)"></i>
                    </el-form-item>
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
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item label="商品图片">
                                    <span>{{ props.row.name }}</span>
                                </el-form-item>
                            </el-form>
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
                            <el-input v-model="scope.row.price"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="stock"
                            label="库存">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.stock"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="isUsed"
                            label="是否启用">
                        <template slot-scope="scope">
                            <el-switch
                                    v-model="scope.row.isUsed"
                                    active-color="#13ce66">
                            </el-switch>
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
        @goodsName.State addSkuSelectCategoryId;
        private groupParams:Array<any>=new Array<any>();
        private skuForm:any={};
        private skuFormRule:any={};
        private orgData=new Array<any>();
        private model="";
        private skuData:Array<any>=new Array<any>();
        @Watch("addSpuSelectCategoryId",{deep:true,immediate:true})
        private async addSkuSelectCategoryIdChange(newVal, oldVal){
            //根据分类查询参数模板
            let apiActions=new ApiActions(this);
            let result:any=(await apiActions.getTemplateByCid({categoryId:newVal})).data;
            if(result&&result.length>0) {
                let resultData:any=JSON.parse(result[0].specifications);
                let groupData=resultData.groupParams;
                //展示有分组的规格参数
                let dataTemp:Array<any>=new Array<any>();
                for(let i=0;i<groupData.length;i++){
                    let params=groupData[i].params.map(item=>{
                        let options=new Array<any>();
                        options.push({v:''});
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
                    let params=resultData.params.map(item=>{
                        let options=new Array<any>();
                        options.push({v:''});
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
                this.groupParams=dataTemp;
            }
        }
        private changeParam(item:any){
            item.options.push({v:''});
            let index=0;
            item.options.forEach(item=>{
                item.index=index++;
            })
        }
        @Watch("groupParams",{deep:true})
        private groupParamsChange(groupParams:any){
             this.skuData=new Array<any>();
             for(let i=0;i<groupParams.length;i++){
                 if(i==0){
                     this.genSkuItems(groupParams[i]);
                 }else{
                     let opLength=
                     this.genPlusSkuItems(groupParams[i]);
                 }
             }
        }
        genSkuItems(param:any){
            for(let i=0;i<param.options.length;i++){
                let k:any=param.k;
                let v=param.options[i].v;
                let skuDataItem:any={};
                skuDataItem[k]=v
                if(v){
                    this.skuData.push(skuDataItem);
                }
            }
        }

        private genPlusSkuItems(param){
            let temp: any;
            let skuLength = this.skuData.length;
            let opLength = param.options.length;
            let newResult = new Array<any>();
            for (let i = 0; i < opLength; i++) {
                    temp = _.cloneDeep(this.skuData);
                    temp.forEach(item=>{
                        let k:any=param.k;
                        let v=param.options[i].v;
                        item[k]=v;
                    });
                    newResult.push(...temp);
            };
            let sortResult=new Array<any>();
            sortResult=_.sortBy(newResult, (item)=> {
                return item[this.groupParams[0].k];
            });
            this.skuData=sortResult;
        }

        private deleteOption(item,i){
            item.options.splice(i,1);
            let index=0;
            item.options.forEach(item=>{
                item.index=index++;
            })
        }
    }
</script>


<style lang="less">
    .sku{
        max-height: 400px!important;
        overflow: auto!important;
        .el-form-item{
            margin-bottom: 10px;
        }
        .el-icon-delete{
            margin-left: 10px;
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
           .title{
               width: 100px;
               text-align: right;
           }
       }
       .title{
           width: 100px;
           text-align: right;
       }
       .formContent{
           flex: 1;
       }
        .el-form{
            max-height: 300px!important;
            overflow: auto!important;
            .el-form-item{
                width: 23%;
            }
            display:flex;
            flex-wrap:wrap;
            .el-input{
                width: 80%!important;
            }
        }
    }

</style>