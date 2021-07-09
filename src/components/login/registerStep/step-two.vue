<template>
    <div class="stepTwo">
        <div class="inputWrap">
            <span class="phoneTitleClass">用 户 名:</span>
            <input type="text" v-model="username" placeholder="您的账户名和登录名"/>
            <span v-if="isShowUserNameError" v-html="errMsg" style="color: red;position: absolute;left: 390px;width: 100%;top:10px"></span>
        </div>
        <div class="inputWrap">
            <span class="phoneTitleClass">设置密码:</span>
            <input type="password" v-model="password"  placeholder="建议使用两种或两种以上字符组合"/>
            <span v-if="isShowPasswordError" v-html="errMsg" style="color: red;position: absolute;left: 390px;width: 100%;top:10px"></span>
        </div>
        <div class="inputWrap">
            <span class="phoneTitleClass">确认密码:</span>
            <input type="password" placeholder="请再次输入密码" v-model="confirmPassword"/>
            <span v-if="isShowConfirmPasswordError" v-html="errMsg" style="color: red;position: absolute;left: 390px;width: 100%;top:10px"></span>
        </div>
        <div class="inputWrap">
            <span class="phoneTitleClass">邮 箱 验 证:</span>
            <input type="text"  placeholder="请输入邮箱" v-model="email"/>
            <span v-if="isShowEmailError" v-html="errMsg" style="color: red;position: absolute;left: 390px;width: 100%;top:10px"></span>
        </div>
        <div class="inputWrap">
            <span class="phoneTitleClass">邮箱验证码:</span>
            <input v-model="emailCode" placeholder="请输入邮箱验证码" />
            <span class="getPhoneClass">获取验证码</span>
            <span v-if="isShowEmailCodeError" v-html="errMsg" style="color: red;position: absolute;left: 390px;width: 100%;top:10px"></span>
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
    export default class StepTwo extends Vue {
        private username:any="";
        private password:any="";
        private confirmPassword:any="";
        private emailCode:any="";
        private email:any="";
        private errMsg:any="";
        private isShowUserNameError:boolean=false;
        private isShowPasswordError:boolean=false;
        private isShowConfirmPasswordError:boolean=false;
        private isShowEmailError:boolean=false;
        private isShowEmailCodeError:boolean=false;
        private hasError(){
            if(!this.username){
                 this.isShowUserNameError=true;
                 this.errMsg="用户名不能为空!";
                 return true;
            };
            let userNameReg:any=/^[a-zA-Z\d]{5,18}$/;
            let userNamePass=userNameReg.test(this.username);
            if(!userNamePass){
                this.errMsg="用户名必须是5-18为字母和数字";
                this.isShowUserNameError=true;
                return true;
            }
            this.isShowUserNameError=false;
            //用户名校验结束，密码校验开始
            this.isShowPasswordError=false;
            if(!this.password){
                this.errMsg="密码不能为空!";
                this.isShowPasswordError=true;
                return true;
            }
            let passwordReg:any=/^[a-z_\d]{6,30}$/;
            let passwordPass=passwordReg.test(this.password);
            if(!passwordPass){
                this.isShowPasswordError=true;
                this.errMsg="密码必须是6-30位字母和数字下划线";
                return true;
            }
            this.isShowPasswordError=false;
            //确认密码校验
            if(this.password!==this.confirmPassword){
                this.isShowConfirmPasswordError=true;
                this.errMsg="两次密码不一致，请重新输入.";
                return true;
            }
            this.isShowConfirmPasswordError=false;
            if(!this.email){
                this.errMsg="邮箱不能为空";
                this.isShowEmailError=true;
                return true;
            }
            let emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
            let emailPass=emailReg.test(this.email);
            if(!emailPass){
                this.isShowEmailError=true;
                this.errMsg="邮箱必须格式不正确";
                return true;
            }
            this.isShowEmailError=false;
            if(!this.emailCode){
                this.errMsg="邮箱验证码不能为空";
                this.isShowEmailCodeError=true;
                return true;
            }
            return false;
        }
    }
</script>
<style lang="less">
    .stepTwo{
        width: 380px;
        background-color: white;
        height: 100%;
        display: flex;
        flex-direction: column;
        .inputWrap{
            input:-ms-input-placeholder,
            textarea:-ms-input-placeholder {
                color: rgba(204, 204, 204, 1);
            }

            input::-webkit-input-placeholder,
            textarea::-webkit-input-placeholder {
                color: rgba(204, 204, 204, 1);
            }
            display: flex;
            margin-top: 22px;
            border:1px solid rgb(221, 221, 221);
            height: 52px;
            position: relative;
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
                width: 90px;
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
    }
</style>