<template>
    <el-container style="height: 100%; border: 1px solid #eee">
      <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
         <span>王小虎</span>
      </el-header>
      <el-container  style="height:calc(100% - 80px)">
        <el-aside width="250px"  style="height: 100%;background-color: rgb(238, 241, 246)">
          <el-menu :default-openeds="['1']">
              <el-submenu index="1">
                  <template slot="title"><i class="el-icon-message"></i>商品管理</template>
                  <el-menu-item @click="goCategory" index="1-1">商品分类</el-menu-item>
                  <el-menu-item @click="goSpecGroup" index="1-3">规格参数组管理</el-menu-item>
                  <el-menu-item @click="goBrand" index="1-2">品牌管理</el-menu-item>
                  <el-menu-item @click="goSpecParam" index="1-4">规格参数管理</el-menu-item>
                  <el-menu-item @click="goProductList" index="1-5">商品管理</el-menu-item>
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

        mounted(){
             this.goCategory();
        }
        //跳转到分类
        private goCategory(): any {
          this.$router.push({  // 核心语句
            path: '/admin/productCategory',// 跳转的路径
            query: {
              id: '0',
            },
          })
        }
        //跳转到品牌
        private goBrand(): any {
            this.$router.push({  // 核心语句
                path: '/admin/brand',// 跳转的路径
                query: {
                  id: '0',
                },
              })
        }
        //跳转到规格参数组
        private goSpecGroup(): any {
            this.$router.push({  // 核心语句
                path: '/admin/productSpecGrop',// 跳转的路径
                query: {
                  id: '0',
                },
              })
        }
        //跳转到规格参数
        private goSpecParam(): any {
            this.$router.push({  // 核心语句
                path: '/admin/productSpecParams',// 跳转的路径
                query: {
                  id: '0',
                },
              })
        }
        //跳转到商品列表
        private goProductList(): any {
            this.$router.push({  // 核心语句
                path: '/admin/productList',// 跳转的路径
                query: {
                  id: '0',
                },
              })
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
    
  </style>