<template>
    <div class="stepThree">
        <div style="margin-top: 20px;font-size: 18px;text-align: center">注册成功</div>
        <el-button style="margin-top: 20px;width: 40px;align-self: center;" type="success" icon="el-icon-check" circle></el-button>
    </div>
</template>
<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import {Action, Getter} from 'vuex-class'
    import logo from '@/components/common/images/logo.png'
    import {namespace} from 'vuex-class';
    import * as _ from 'lodash'
    @Component({
        components:{
        }
    })
    export default class StepThree extends Vue {
        private async created() {

        }
    }
</script>
<style lang="less">
    .stepThree{
        width:100px;
        background-color: white;
        height: 100%;
        display: flex;
        justify-content: center;
        justify-items: center;
        flex-direction: column;
    }
</style>