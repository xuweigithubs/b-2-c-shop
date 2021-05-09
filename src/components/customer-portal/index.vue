<template>
    <div class="portal">
         <common-header/>
         <div class="categoryCms">
             <common-category/>
         </div>
    </div>
</template>
<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import {Action, Getter} from 'vuex-class'
    import Header from  './header/index.vue'
    import Category from "./category/index.vue";
    @Component({
        components:{
            CommonHeader:Header,
            CommonCategory:Category
        }
    })
    export default class ProductIndex extends Vue {
        private async created() {

        }
    }
</script>
<style type="text/css" lang="less">
    .portal{
        height: 145px;
        background: #f5f5f5;
        margin-bottom: 20px;
        width: 100%;
        .categoryCms{
            margin-left: 150px;
            margin-top: 3px;
        }
    }
</style>