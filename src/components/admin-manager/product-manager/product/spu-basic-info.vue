<template>
    <div style="max-height: 250px;overflow: auto">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="product-ruleForm">
            <div class="categoryAndBrand">
                <el-form-item label="商品分类">
                    <el-cascader @change="categoryChange" :options="categories" v-model="categoryId" :show-all-levels="true"></el-cascader>
                </el-form-item>
                <el-form-item label="商品品牌" prop="brand">
                    <el-select v-model="brandId" placeholder="请选择">
                        <el-option
                                v-for="item in brandItems"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </div>
            <el-form-item label="商品名称" :prop="title">
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
    import _ from "lodash";
    @Component
    export default class SpuBasicInfo extends Vue{
        @goodsName.Mutation updateState;
        @Prop() params;
        private title="title";
        public categoryId:any="";
        public ruleForm:any={
            subTitle:"",
            title:"",
            packingList:"",
            afterService:""
        };
        public rules:any={
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
        private brandId:any="";
        private categories:Array<any>=new Array<any>();
        //根据分类查询出品牌
        private brandItems:Array<any>=new Array<any>();
        async created(){
            //查询Spu基本信息
            let apiActions=new ApiActions(this);
            let categories=await apiActions.getCategories({});
            let categoryResult=this.mapCategory(categories.data);
            this.categories=categoryResult;
            let currentSelectCategoryIdArray=localStorage.getItem("currentSelectCategoryIdArray");
            if(currentSelectCategoryIdArray){
                let categoryIds:Array<any>=currentSelectCategoryIdArray.split(",");
                this.categoryId=categoryIds;
                let addSpuSelectCategoryIdResult:any=categoryIds[categoryIds.length-1];
                this.updateState({addSpuSelectCategoryId:addSpuSelectCategoryIdResult});
            }else{
                this.categoryId=["1020","1021","1025"];
                this.updateState({addSpuSelectCategoryId:"1025"});
            }
            if(this.params.spuId){
                this.ruleForm.title=_.cloneDeep(this.params.data.title);
                this.ruleForm.subTitle=_.cloneDeep(this.params.data.subTitle);
                this.ruleForm.packingList=_.cloneDeep(this.params.data.spuDetialVO.packingList);
                this.ruleForm.afterService=_.cloneDeep(this.params.data.spuDetialVO.afterService);
            }
        }
        private async categoryChange(categories:any){
            localStorage.setItem("currentSelectCategoryIdArray",categories);
            let addSpuSelectCategoryIdResult:any=categories[categories.length-1];
            this.updateState({addSpuSelectCategoryId:addSpuSelectCategoryIdResult});
            let apiActions=new ApiActions(this);
            let brands=await apiActions.getBrand({cid:addSpuSelectCategoryIdResult});
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