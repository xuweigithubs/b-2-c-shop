<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<style lang="sass">
</style>
<script lang="ts">
    import { Vue, Component ,Watch} from 'vue-property-decorator';
    import ApiActions from '@/components/api/api-actions'
    @Component
    export default class App extends Vue {
        private isShowPage=false;
    }
</script>