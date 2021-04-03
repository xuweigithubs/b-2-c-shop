<template>
    <div class="spu">
        <el-form :model="spuForm" :rules="spuFormRule" ref="spuRuleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item v-for="(item,index) in groupParams" :key="index" :label="item.k" prop="name">
                <el-input v-model="item.v"></el-input><span style="margin-left: 5px">{{item.unit}}</span>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Prop, Vue,Watch} from 'vue-property-decorator';
    import {namespace} from 'vuex-class'
    const goodsName=namespace("goods");
    import ApiActions from '@/components/api/api-actions';
    @Component
    export default class spu extends Vue{
        @goodsName.State addSpuSelectCategoryId;
        private groupParams:Array<any>=new Array<any>();
        private spuForm:any={};
        private spuFormRule:any={}
        @Watch("addSpuSelectCategoryId",{deep:true,immediate:true})
        private async addSpuSelectCategoryIdChange(newVal, oldVal){
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
                         return {
                             group:groupData[i].group,
                             k:item.name,
                             numberic:item.numberic,
                             generic:item.generic,
                             searching:item.searching,
                             segments:item.segments,
                             unit:item.unit
                         }
                     });
                    params.forEach(item=>{
                        if(item.generic){
                            dataTemp.push(item);
                        }
                    });
                }
                //展示没有分组的规格参数
                if(resultData.params.length>0){
                    let params=resultData.params.map(item=>{
                        return {
                            k:item.name,
                            numberic:item.numberic,
                            generic:item.generic,
                            searching:item.searching,
                            segments:item.segments,
                            unit:item.unit
                        }
                    });
                     params.forEach(item=>{
                         if(item.generic){
                             dataTemp.push(item);
                         }
                     });
                }
                this.groupParams=dataTemp;
            }
        }
    }
</script>

<style lang="less">
    .spu{
        .el-form{
            max-height: 300px!important;
            overflow: auto!important;;
            .el-form-item{
                width: 33%;
            }
            display:flex;
            flex-wrap:wrap;
            .el-input{
                width: 80%!important;
            }
            .el-form-item__content{
                margin-left: 80px;
            }
        }
    }

</style>