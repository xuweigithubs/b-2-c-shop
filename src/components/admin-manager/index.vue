<template>
    <el-container style="height: 100%;">
      <el-header style="text-align: right; font-size: 12px;background-color:#E7EDF4">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
         <span>王小虎</span>
      </el-header>
      <el-container  style="height:calc(100% - 80px);">
        <el-aside width="250px"  style="height: 100%;background-color: #E7EDF4">
          <el-menu :default-openeds="[openIndex]" :default-active="index_cache">
              <el-submenu :index="item.index" :key="index" v-for="(item,index) in menums">
                  <template slot="title"><i class="el-icon-arrow-down"></i>
                      {{item.name}}
                  </template>
                  <el-menu-item v-for="(subItem,index) in item.elSubmenus" @click="subItem.click" :key="index" :index="subItem.index">{{subItem.name}}</el-menu-item>
              </el-submenu>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>
             <keep-alive>
              <router-view v-if='$route.meta.keepAlive'/>
            </keep-alive>
            <router-view v-if='!$route.meta.keepAlive'/>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
</template>
<script lang="ts">
      import {Component, Vue} from 'vue-property-decorator'
      @Component
      export default class ProductManager extends Vue {
        private isShow: any = false;
        private menums=new Array<any>();
        private index_cache:any="1-1";
        private openIndex="1";
        created(){
            this.menums=[
                {index:"1",name:"商品管理","elSubmenus":
                    [
                        {index:"1-1",name:"商品分类",click:this.goCategory},
                        {index:"1-2",name:"规格参数组管理",click:this.goSpecGroup},
                        {index:"1-3",name:"品牌管理",click:this.goBrand},
                        {index:"1-4",name:"规格参数管理",click:this.goSpecParam},
                        {index:"1-5",name:"管理商品列表",click:this.goProductList}
                    ]
                },
                {index:"2",name:"首页CMS管理","elSubmenus":
                        [
                            {index:"2-1",name:"CMS分类管理",click:this.goCmsCategoryList},
                            {index:"2-2",name:"CMS内容管理",click:this.goCmsContentList}
                        ]
                }
            ];
        }
        mounted(){
             let index_cache:any=localStorage.getItem("index_cache");
             let menums=this.menums;
             if(index_cache){
                 this.index_cache=index_cache;
                 let cacheItem=this.findCacheIndex(menums,index_cache);
                 if(cacheItem){
                     cacheItem.click();
                 }
             }else{
                 this.goCategory();
             }
        }
        private findCacheIndex(menums,index_cache){
             let itemMenu:any=menums&&menums.find(item=>item.index==index_cache);
             if(!itemMenu&&menums&&menums.length>0){
                 for (let i=0;i<menums.length;i++){
                     itemMenu=this.findCacheIndex(menums[i].elSubmenus,index_cache);
                     if(itemMenu){
                         return itemMenu;
                     }
                 }
             };
             return itemMenu;
        }
        //跳转到分类
        private goCategory(data?:any): any {
            if(data){
                localStorage.setItem("index_cache",data.index)
            };
            this.$router.push({  // 核心语句
                path: '/admin/productCategory',// 跳转的路径
                query: {
                    id: '0',
                },
            });
            if(data){
                this.$nextTick(()=>{
                    this.openIndex=data.$parent.index;
                });
            }
        }
        //跳转到品牌
        private goBrand(data?:any): any {
            if(data){
                localStorage.setItem("index_cache",data.index)
            };
            this.$router.push({  // 核心语句
                path: '/admin/brand',// 跳转的路径
                query: {
                  id: '0',
                },
              });
            if(data){
                this.$nextTick(()=>{
                    this.openIndex=data.$parent.index;
                });
            }
        }
        //跳转到规格参数组
        private goSpecGroup(data?:any): any {
            if(data){
                localStorage.setItem("index_cache",data.index)
            };
            this.$router.push({  // 核心语句
                path: '/admin/productSpecGrop',// 跳转的路径
                query: {
                  id: '0',
                },
              });
            if(data){
                this.$nextTick(()=>{
                    this.openIndex=data.$parent.index;
                });
            }
        }
        //跳转到规格参数
        private goSpecParam(data?:any): any {
            if(data){
                localStorage.setItem("index_cache",data.index)
            };
            this.$router.push({  // 核心语句
                path: '/admin/productSpecParams',// 跳转的路径
                query: {
                  id: '0',
                },
              });
            if(data){
                this.$nextTick(()=>{
                    this.openIndex=data.$parent.index;
                });
            }
        }
        //跳转到商品列表
        private goProductList(data?:any): any {
            if(data){
                localStorage.setItem("index_cache",data.index)
            };
            this.$router.push({  // 核心语句
                path: '/admin/productList',// 跳转的路径
                query: {
                  id: '0',
                },
              });
            if(data){
                this.$nextTick(()=>{
                    this.openIndex=data.$parent.index;
                });
            }
        }
         //跳转到内容分类列表
          private goCmsCategoryList(data?:any): any {
              if(data){
                  localStorage.setItem("index_cache",data.index)
              };
              this.$router.push({  // 核心语句
                  path: '/admin/cmsCategoryList',// 跳转的路径
                  query: {
                      id: '0',
                  },
              });
              if(data){
                  this.$nextTick(()=>{
                      this.openIndex=data.$parent.index;
                  });
               }
          }
          //跳转到内容管理
          private goCmsContentList(data?:any): any {
              if(data){
                  localStorage.setItem("index_cache",data.index)
              };
              this.$router.push({  // 核心语句
                  path: '/admin/cmsContentList',// 跳转的路径
                  query: {
                      id: '0',
                  },
              });
              if(data){
                  this.$nextTick(()=>{
                      this.openIndex=data.$parent.index;
                  });
              }
          }
      }
  </script>
  <style>
    html{
      height: calc(100% - 30px);
    }
    body{
      height: 100%;
    }
    #app{
      height: 100%;
    }
    .el-header {
      background-color: #B3C0D1;
      color: #333;
      line-height: 60px;
    }
    
    .el-aside {
      color: #333;
    }
    *::-webkit-scrollbar {
        /*滚动条整体样式*/
        width : 5px;  /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
    }
    *::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        background-color: #B3C0D1;
    }


  </style>