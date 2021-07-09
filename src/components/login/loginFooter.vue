<template>
    <div class="commonFooter">
        <ul>
            <li>关于我们</li>
            <li>联系我们</li>
            <li>人才招聘</li>
            <li>商家入驻</li>
            <li>广告服务</li>
            <li>手机京东</li>
            <li>友情链接</li>
            <li>销售联盟</li>
            <li>京东社区</li>
            <li>京东公益</li>
            <li>English Site</li>
        </ul>
        <div style="width:100%;text-align: center;margin-top: 20px">Copyright©2004-2021  京东crm.com 版权所有</div>
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
    export default class StepOne extends Vue {
        private async created() {

        }
    }
</script>
<style lang="less">
    .commonFooter{
        width: 100%;
        margin-top:200px;
        background-color: white;
        height: 130px;
        border-top:1p solid silver;
        ul{
            margin: 0px;
            padding: 0px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-top: solid 1px #e6e6e6;
            padding-top: 40px;
            li{
                margin: 0px;
                padding: 0px;
                list-style-type: none;
                margin-left: 15px;
                list-style-type: none;
                padding-left: 15px;
                cursor: pointer;
            }
        }
    }
</style>