<template>
    <div class="stepOne">
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
    .stepOne{
        width: 100%;
        background-color: white;
        height: 100%;
    }
</style>