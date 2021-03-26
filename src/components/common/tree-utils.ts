export default class TreeUtils{
     public static getSearchTree(fzzName:any,orgData:any){
            let allCategories=new Array<any>();
            this.expendTreeData(orgData,allCategories);
            let searchResult=new Array<any>();
            this.searchCategory(searchResult,allCategories,fzzName);
            //整理数据
            let searchResultMap=searchResult.map(item=>{
               return {
                  id:item.id,
                  parentId:item.parentId,
                  name:item.name,
                  parent:item.parent,
                  sort:item.sort,
                  children:null
               }
         });
         //将数据合成父子结构
         let treeData=this.buildTree(searchResultMap);
          return treeData;  
     }
    //将数据构造成一颗树
    public static buildTree(resultData:Array<any>){
         //查找根节点
         let rootNodes=resultData.filter(item=>item.parentId==0);
         rootNodes.forEach(item=>{
            this.addChildrenNodeToList(resultData,item);
         });
         return rootNodes;
     }
     //向根节点添加数据
     public static addChildrenNodeToList(allCatagories,item){
         //获取以当前节点为父节点的数据
         let childrenNodes:Array<any>=allCatagories.filter(eachItem=>eachItem.parentId==item.id);
         if(childrenNodes.length>0){
            item.children=childrenNodes;
            childrenNodes.forEach(childItem=>{
               this.addChildrenNodeToList(allCatagories,childItem);
           });
         }
     }
     //得到展开的树形结构
     public static expendTreeData(expendTree:Array<any>,allTreeData:Array<any>){
          expendTree.forEach(item=>{
              allTreeData.push(item);
              if(item.children&&item.children.length>0){
                  this.expendTreeData(item.children,allTreeData);  
              }
          });
     }
     //现将搜索到的数据包括父亲节点放到结果数组中，再将数据封装成素结构
     public static searchCategory(searchResult:Array<any>,allTreeData:Array<any>,fzzName:any){
         let result:Array<any>=allTreeData.filter(item=>item&&item.name.indexOf(fzzName)!=-1);
         for(let i=0;i<result.length;i++){
              if(result[i]){
                  let currentItem:any=searchResult.find(item=>item.id==result[i].id);
                  if(!currentItem){
                       searchResult.push(result[i]);
                  }
                  this.addFather(allTreeData,searchResult,result[i])  
              }
             
         }
     }    
     //依次搜索父级
     public static addFather(allTreeData,searchResult,currentItem){
        if(currentItem&&currentItem.parentId){
           let parentItem:any=allTreeData.find(eachItem=>eachItem.id==currentItem.parentId);
           if(parentItem){
               let searchItem:any=searchResult.find(eachItem=>eachItem.id==parentItem.id);
               if(!searchItem){
                   searchResult.push(parentItem);
                   this.addFather(allTreeData,searchResult,parentItem);
               }
           }
          
        }  
     }
     public static toggleRowExpansion(tableData,isExpansion,vm){
         this.toggleRowExpansion_forAll(tableData,isExpansion,vm);
     }
     public static toggleRowExpansion_forAll(data,isExpansion,vm,expandAll?,expandId?){
        data.forEach(item=>{
            (vm.$refs.treeTable as any)&&(vm.$refs.treeTable as any).toggleRowExpansion(item,isExpansion);
           if(item.children != undefined && item.children != null){
              this.toggleRowExpansion_forAll(item.children,isExpansion,vm);
           }
        })
     }
}