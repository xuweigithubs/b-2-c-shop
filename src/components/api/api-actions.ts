import axios from 'axios'
export default class ApiActions {
      private vm:any;
       constructor(vm:any){
         this.vm=vm;
       }
       async getSpecGroupPage(params: any) {
            let result:any=await axios.post('mshop/api/gataway/item/manager/spec/group/page/list',params);
            return result;
       }
       async getSpecGroup(params: any) {
            let result:any=await axios.post('mshop/api/gataway/item/manager/spec/group/list',params);
            return result;
       }
       async addSpecGroup(params:any){
            let result:any=await axios.post('mshop/api/gataway/item/manager/spec/group/add',params);
            return result;
       }
       async updateSpecGroup(params:any){
            let result:any=await axios.post('mshop/api/gataway/item/manager/spec/group/update',params);
            return result;
       }
      //刪除规格参数组
       async deleteSpecGroup(ids:[]){
            let result:any=await axios.post('mshop/api/gataway/item/manager/spec/group/delete',ids);
            return result;
       }
      //获取商品分类信息
       async getCategories(params:any){
            let result:any=await axios.post('mshop/api/gataway/item/manager/category/list',params);
            return result;
       }
      //添加商品分类
       async addCategory(params:any){
            let result:any=await axios.post('mshop/api/gataway/item/manager/category/add',params);
            return result;
       }
      //修改商品分类
       async updateCategory(params:any){
            let result:any=await axios.post('mshop/api/gataway/item/manager/category/update',params);
            return result;
       }
       async deleteCategories(ids:[]){
            let result:any=await axios.post('mshop/api/gataway/item/manager/category/delete',ids);
            return result;
       }
      //删除品牌
       async deleteBrand(ids:[]){
            let result:any=await axios.post('mshop/api/gataway/item/manager/brand/delete',ids);
            return result;
       }
      //批量保存参数组接口
       async addSpecGroupBatch(params:any){
            let result:any=await axios.post('mshop/api/gataway/item/manager/spec/group/addBatch',params);
            return result;
       }
      //获取品牌信息
       async getBrandPage(params: any) {
            let result:any=await axios.post('mshop/api/gataway/item/manager/brand/page/list',params);
            return result;
       }
        async getBrand(params: any) {
            let result:any=await axios.post('mshop/api/gataway/item/manager/brand/list',params);
            return result;
        }
      //添加品牌信息
       async addBrand(params: any){
            await axios.post('mshop/api/gataway/item/manager/brand/add',params);
       }
      //修改品牌
       async updateBrand(params: any){
             await axios.post('mshop/api/gataway/item/manager/brand/update',params);
       }
      //根据品牌id查询品牌对应的分类
       async getCategoryByBrandId(params:any){
            let dataResult:any=await axios.post('mshop/api/gataway/item/manager/brand/getCategoryIdByBrandId',params);
            return dataResult;
       }
      //保存数据
       async batchSaveBrandAndCategoryRls(params:any){
            await axios.post('mshop/api/gataway/item/manager/brand/batchSaveBrandAndCategoryRls',params);
       }
      //查询规格参数列表
       async getSpecByPage(params:any){
            let dataResult:any=await axios.post('mshop/api/gataway/item/manager/spec/params/page/list',params);
            return dataResult;
       }
      //保存规格参数信息
      async saveParams(params:any){
          let dataResult:any=await axios.post('mshop/api/gataway/item/manager/spec/params/save',params);
          return dataResult;
      }
      //批量删除规格参数
    async deleteParams(ids:Array<any>){
         let result:any=await axios.post('mshop/api/gataway/item/manager/spec/params/delete',ids);
         return result;
    }
    //修改规格参数
    async updateParams(params:any){
        let result:any=await axios.post('mshop/api/gataway/item/manager/spec/params/update',params);
        return result;
    }
    //根据ids修改
    async updateParamsByIds(params:any){
        let result:any=await axios.post('mshop/api/gataway/item/manager/spec/params/updateByIds',params);
        return result;
    }
    async getTemplateByCid(params:any){
        let result:any=await axios.post('mshop/api/gataway/item/manager/spec/params/getTemplateByCid',params);
        return result;
    }
    //分页获取商品信息
    async getSpuListPage(params:any){
        let result:any=await axios.post('mshop/api/gataway/item/manager/goods/page/list',params);
        return result;
    }
    //保存商品信息
    async saveGood(spuParam:any){
        let result:any=await axios.post('mshop/api/gataway/item/manager/goods/save',spuParam);
        return result;
    }
    //修改商品信息
    async updateGood(spuParam:any){
        let result:any=await axios.post('mshop/api/gataway/item/manager/goods/update',spuParam);
        return result;
    }
    //按条件查询Spu
    async selectProduct(spuParam:any){
        let result:any=await axios.post('mshop/api/gataway/item/manager/goods/single',spuParam);
        return result;
    }
    async deleteGoods(ids:Array<any>){
        let result:any=await axios.post('mshop/api/gataway/item/manager/goods/delete',ids);
        return result;
    }
    async addJdCategories(){
        let result:any=await axios.get('mshop/api/gataway/item/manager/jdcategory/get');
        return result;
    }
    //分页查询首页CMS分类信息
    async getCmsCategoryPage(params:any){
        let result:any=await axios.post('mshop/api/gataway/item/manager/cms/category/content/page/list',params);
        return result;
    }
    //不分页查询
    async getCmsCategory(params:any){
        let result:any=await axios.post('mshop/api/gataway/item/manager/cms/category/content/list',params);
        return result;
    }
    //分页查询CMS内容信息
    async getCmsContentPage(params:any){
        let result:any=await axios.post('mshop/api/gataway/item/manager/cms/content/page/list',params);
        result.data.rows.forEach(item=>{
              let pics=item.pic;
              let picListArray=new Array();
              if(pics){
                  let picList=pics.split(";");
                  picList.forEach(p=>{
                      if(p){
                          picListArray.push(p);
                      }
                  });
              }
               item.picList=picListArray;
        });
        return result;
    }
    //不分页查询cms信息
    async getCmsContent(params:any){
        let result:any=await axios.post('mshop/api/gataway/item/manager/cms/content/list',params);
        return result;
    }
    //添加cms分类信息
    async addCmsCategory(params:any){
        let result:any=await axios.post('mshop/api/gataway/item/manager/cms/category/content/add',params);
        return result;
    }
    //批量添加cms信息
    async addCmsCategoryBatch(params:any){
        let result:any=await axios.post('mshop/api/gataway/item/manager/cms/category/content/add/batch',params);
        return result;
    }
    //添加cms信息
    async addCmsContent(params:any){
        let result:any=await axios.post('mshop/api/gataway/item/manager/cms/content/add',params);
        return result;
    }
    //批量添加cms信息
    async addCmsContentBatch(params:any){
        let result:any=await axios.post('mshop/api/gataway/item/manager/cms/content/add/batch',params);
        return result;
    }
    //修改cms分类信息
    async updateCmsCategoryContent(params:any){
        let result:any=await axios.post('mshop/api/gataway/item/manager/cms/category/content/update',params);
        return result;
    }
    //修改cms信息
    async updateCmsContent(params:any){
        let result:any=await axios.post('mshop/api/gataway/item/manager/cms/content/update',params);
        return result;
    }
    //删除cms分类信息
    async deleteCmsCategory(ids:[]){
        let result:any=await axios.post('mshop/api/gataway/item/manager/cms/category/content/delete',ids);
        return result;
    }
    //删除cms信息
    async deleteCmsContent(ids:[]){
        let result:any=await axios.post('mshop/api/gataway/item/manager/cms/content/delete',ids);
        return result;
    }
    //同步京东cms信息
    async asyncJdCmsData(){
        let result:any=await axios.post('mshop/api/gataway/item/manager/cms/async/jdcmsdata');
        return result;
    }
    //删除图片信息
    async deleteImage(params:any){
        let result:any=await axios.post('mshop/api/gataway/item/file/delete',params);
        return result;
    }
    //验证是否登录
   async verify(){
       let result:any=await axios.get('mshop/api/gataway/auth/verify');
       return result;
   }
    async login(params:any){
        let result:any=await axios.post('mshop/api/gataway/auth/accredit',params);
        return result;
    }
    //退出登录
    async unLogin(){
        let result:any=await axios.post('mshop/api/gataway/auth/unaccredit');
        return result;
    }
    //获取地址信息
    async getPositionData(params:any){
        let result:any=await axios.post('mshop/api/gataway/user/position/list',params);
        return result;
    }
}

