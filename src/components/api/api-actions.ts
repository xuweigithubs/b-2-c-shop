import axios from 'axios'
export default class ApiActions {
      private vm:any;
       constructor(vm:any){
         this.vm=vm;
       }
       async getSpecGroupPage(params: any) {
            let result:any=await axios.post('mshop/api/gataway/manager/spec/group/page/list',params);
            return result;
       }
       async getSpecGroup(params: any) {
            let result:any=await axios.post('mshop/api/gataway/manager/spec/group/list',params);
            return result;
       }
       async addSpecGroup(params:any){
            let result:any=await axios.post('mshop/api/gataway/manager/spec/group/add',params);
            return result;
       }
       async updateSpecGroup(params:any){
            let result:any=await axios.post('mshop/api/gataway/manager/spec/group/update',params);
            return result;
       }
      //刪除规格参数组
       async deleteSpecGroup(ids:[]){
            let result:any=await axios.post('mshop/api/gataway/manager/spec/group/delete',ids);
            return result;
       }
      //获取商品分类信息
       async getCategories(params:any){
            let result:any=await axios.post('mshop/api/gataway/manager/category/list',params);
            return result;
       }
      //添加商品分类
       async addCategory(params:any){
            let result:any=await axios.post('mshop/api/gataway/manager/category/add',params);
            return result;
       }
      //修改商品分类
       async updateCategory(params:any){
            let result:any=await axios.post('mshop/api/gataway/manager/category/update',params);
            return result;
       }
       async deleteCategories(ids:[]){
            let result:any=await axios.post('mshop/api/gataway/manager/category/delete',ids);
            return result;
       }
      //删除品牌
       async deleteBrand(ids:[]){
            let result:any=await axios.post('mshop/api/gataway/manager/brand/delete',ids);
            return result;
       }
      //批量保存参数组接口
       async addSpecGroupBatch(params:any){
            let result:any=await axios.post('mshop/api/gataway/manager/spec/group/addBatch',params);
            return result;
       }
      //获取品牌信息
       async getBrandPage(params: any) {
            let result:any=await axios.post('mshop/api/gataway/manager/brand/page/list',params);
            return result;
       }
        async getBrand(params: any) {
            let result:any=await axios.post('mshop/api/gataway/manager/brand/list',params);
            return result;
        }
      //添加品牌信息
       async addBrand(params: any){
            await axios.post('mshop/api/gataway/manager/brand/add',params);
       }
      //修改品牌
       async updateBrand(params: any){
             await axios.post('mshop/api/gataway/manager/brand/update',params);
       }
      //根据品牌id查询品牌对应的分类
       async getCategoryByBrandId(params:any){
            let dataResult:any=await axios.post('mshop/api/gataway/manager/brand/getCategoryIdByBrandId',params);
            return dataResult;
       }
      //保存数据
       async batchSaveBrandAndCategoryRls(params:any){
            await axios.post('mshop/api/gataway/manager/brand/batchSaveBrandAndCategoryRls',params);
       }
      //查询规格参数列表
       async getSpecByPage(params:any){
            let dataResult:any=await axios.post('mshop/api/gataway/manager/spec/params/page/list',params);
            return dataResult;
       }
      //保存规格参数信息
      async saveParams(params:any){
          let dataResult:any=await axios.post('mshop/api/gataway/manager/spec/params/save',params);
          return dataResult;
      }
      //批量删除规格参数
    async deleteParams(ids:Array<any>){
         let result:any=await axios.post('mshop/api/gataway/manager/spec/params/delete',ids);
         return result;
    }
    //修改规格参数
    async updateParams(params:any){
        let result:any=await axios.post('mshop/api/gataway/manager/spec/params/update',params);
        return result;
    }
    //根据ids修改
    async updateParamsByIds(params:any){
        let result:any=await axios.post('mshop/api/gataway/manager/spec/params/updateByIds',params);
        return result;
    }
    async getTemplateByCid(params:any){
        let result:any=await axios.post('mshop/api/gataway/manager/spec/params/getTemplateByCid',params);
        return result;
    }
    //分页获取商品信息
    async getSpuListPage(params:any){
        let result:any=await axios.post('mshop/api/gataway/manager/goods/page/list',params);
        return result;
    }
    //保存商品信息
    async saveGood(spuParam:any){
        let result:any=await axios.post('mshop/api/gataway/manager/goods/save',spuParam);
        return result;
    }
    //修改商品信息
    async updateGood(spuParam:any){
        let result:any=await axios.post('mshop/api/gataway/manager/goods/update',spuParam);
        return result;
    }
    //按条件查询Spu
    async selectProduct(spuParam:any){
        let result:any=await axios.post('mshop/api/gataway/manager/goods/single',spuParam);
        return result;
    }
    async deleteGoods(ids:Array<any>){
        let result:any=await axios.post('mshop/api/gataway/manager/goods/delete',ids);
        return result;
    }

}

