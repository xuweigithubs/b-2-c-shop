<template>
    <div style="max-height: 250px;overflow: auto">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="product-ruleForm">
            <div class="categoryAndBrand">
                <el-form-item label="商品分类" prop="category">
                    <el-cascader @change="categoryChange" :options="categories" :show-all-levels="false"></el-cascader>
                </el-form-item>
                <el-form-item label="商品品牌" prop="brand">
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                                v-for="item in brandItems"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </div>
            <el-form-item label="商品名称" prop="title">
                <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="商品卖点" prop="subTitle">
                <el-input v-model="ruleForm.subTitle"></el-input>
            </el-form-item>
            <el-form-item label="包装清单" prop="packingList">
                <el-input type="textarea" v-model="ruleForm.packingList"></el-input>
            </el-form-item>
            <el-form-item label="售后服务" prop="afterService">
                <el-input type="textarea" v-model="ruleForm.afterService"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Prop, Vue,Watch} from 'vue-property-decorator';
    import {namespace} from 'vuex-class'
    import ApiActions from '@/components/api/api-actions';
    const goodsName=namespace("goods");
    @Component
    export default class SpuBasicInfo extends Vue{
        @goodsName.Mutation updateState;
        @goodsName.State addSpuSelectCategoryId;
        private ruleForm:any={};
        private rules:any={
            title: [
                { required: true, message: '请填写商品名称', trigger: 'blur' }
            ],
            subTitle:[
                { required: true, message: '请填写商品卖掉', trigger: 'blur' }
            ],
            packingList:[
                { required: true, message: '包装清单不能为空', trigger: 'blur' }
            ],
            afterService:[
                { required: true, message: '售后服务不能为空', trigger: 'blur' }
            ]
        };
        private value:any="";
        private categories:Array<any>=new Array<any>();
        //根据分类查询出品牌
        private brandItems:Array<any>=new Array<any>();
        async created(){
            let apiActions=new ApiActions(this);
            let categories=await apiActions.getCategories({});
            let categoryResult=this.mapCategory(categories.data);
            this.categories=categoryResult;
        }
        private async categoryChange(categories:any){
            let addSpuSelectCategoryId:any=categories[categories.length-1];
            this.updateState({addSpuSelectCategoryId:addSpuSelectCategoryId});
            let apiActions=new ApiActions(this);
            let brands=await apiActions.getBrand({cid:addSpuSelectCategoryId});
            this.brandItems=brands.data.map(item=>{
                return {
                     value:item.id,
                     label:item.name
                }
            });
        }
        //映射出所有分类
        private mapCategory(categories:Array<any>){
            let categoryResult=categories.map(item=>{
                return {
                    value:item.id,
                    label:item.name,
                    children:item.children
                }
            });
            for(let i=0;i<categoryResult.length;i++){
                 if(categoryResult[i].children){
                     categoryResult[i].children=this. mapCategory(categoryResult[i].children);
                 }
            }
            return categoryResult;
        }

    }
</script>

<style lang="less">
   .product-ruleForm{
       padding-right: 10px;
   }
    .categoryAndBrand{
        display: flex;justify-content: left;
        .el-form-item{
            width: 50%;
        }
        .el-cascader{
            width: 100%;
        }
        .el-select{
            width: 100%;
        }
    }
</style>