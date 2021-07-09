<template>
    <div class="stepOne">
        <div style="margin-top:50px;">
            <div style="display: flex;flex-direction: row;position: relative;">
                <el-input placeholder="请输入手机号码" v-model="phone" @blur="hasError" class="input-with-select">
                    <el-select v-model="select" slot="prepend">
                        <el-option label="中国 0086" value="1"></el-option>
                    </el-select>
                </el-input>
                <span v-if="isShowError" style="color: red;position: absolute;left: 390px;width: 100%;top:10px">请输入正确电话号码</span>
            </div>
            <div class="phoneWrap" style="display: flex;flex-direction: row;position: relative;">
                <span class="phoneTitleClass">手机验证码:</span>
                <input v-model="phoneCode"/>
                <span class="getPhoneClass">重新获取</span>
                <span v-if="isShowErrorCode" style="color: red;position: absolute;left: 390px;width: 100%;top:10px">请输入验证码</span>
            </div>
        </div>
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
        private phone:any="";
        private select:any="1";
        private isShowError=false;
        private phoneCode:any="";
        private isShowErrorCode:any=false;
        public hasError(){
            let phoneReg = /^[1][3,5,7,8][0-9]{9}$/
            let isPass=phoneReg.test(this.phone);
            if(!this.phone){
                this.isShowError=true;
                return true;
            }
            if(!isPass){
                this.isShowError=true;
                return true;
            }
            this.isShowError=false;
            if(!this.phoneCode){
                 this.isShowErrorCode=true;
                 return true;
            }
            this.isShowErrorCode=false;
            return false;
        }

    }
</script>
<style lang="less">
    .stepOne{
        width: 380px;
        background-color: white;
        height: 100%;
        .el-select .el-input {
            width: 120px;
        }
        .phoneWrap{
            display: flex;
            margin-top: 30px;
            border:1px solid rgb(221, 221, 221);
            height: 52px;
            input{
                flex: 1;
                border-width:0px!important;
                outline: 0;
            }
            .phoneTitleClass{
                text-align: center;
                display: flex;
                align-items: center;
                margin-left: 18px;
                width: 120px;
                font: 12px/150% tahoma,arial,Microsoft YaHei,Hiragino Sans GB,"\u5b8b\u4f53",sans-serif;
                -webkit-font-smoothing: antialiased;
                color: #666;
                font-size: 14px;
            }
            .getPhoneClass{
                width: 118px;
                height: 52px;
                border-left: 1px solid rgb(221, 221, 221);
                background: #fff;
                color: #333;
                padding: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                font: 400 13.3333px Arial;
            }
        }
        .el-input__inner{
            height: 50px;
        }
        .input-with-select .el-input-group__prepend {
             background-color: #fff;
        }
        .el-button+.el-button{
            margin-left:0px;
        }
        .confirmButton{
            width: 100%;
            display: flex;
        }
    }
</style>