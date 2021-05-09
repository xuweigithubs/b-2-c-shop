<template>
    <div class="categoryTree">
        <ul>
            <li></li>
        </ul>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import ApiActions from '@/components/api/api-actions'
    @Component({
        components:{
        }
    })
    export default class CategoryIndex extends Vue{
        private categoryData:any="";
        async created(){
            let apiActions=new ApiActions(this);
            let result=await apiActions.getCategories({name:""})
            this.categoryData=result.data;
            console.log(this.categoryData);
        }
    }
</script>

<style scoped>
   .categoryTree{
       height: 480px;
       width: 190px;
       border: 1px solid red;
   }
</style>