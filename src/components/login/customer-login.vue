<template>
    <div class="customerLogin">
        <div class="header">
            <ul>
                <li @click="goHome" style="cursor: pointer"><img width="160px" height="70px" :src="logo"></li>
                <li><b></b></li>
            </ul>
        </div>
        <div class="tips-wrapper">
            依据《网络安全法》，为保障您的账户安全和正常使用，请尽快完成手机号验证！ 新版《京东隐私政策》已上线，将更有利于保护您的个人隐私。
        </div>
        <div class="login-banner">
            <ul>
                <li class="loginBackGround"></li>
                <li style="position: relative">
                    <div class="tips-wrapper">
                        <i class="icon-tips"></i>
                        <span>京东不会以任何理由要求您转账汇款，谨防诈骗。</span>
                    </div>
                    <div class="loginTitle"><span style="color: red">账户登录</span></div>
                    <span v-if="hasError" v-html="errMsg" style="color: red;position: absolute;left:30px;width: 100%;top:95px"></span>
                    <div class="inputWrap">
                        <span class="phoneTitleClass">用 户 名:</span>
                        <input type="text" v-model="username" placeholder="邮箱/用户名/登录手机"/>
                    </div>
                    <div class="inputWrap">
                        <span class="phoneTitleClass">密   码:</span>
                        <input type="password" v-model="password"  placeholder="密码"/>
                    </div>
                    <div class="forgetPasswordTips">
                        <span style="color:#666;cursor: pointer">忘记密码?</span>
                    </div>
                    <div style="display: flex;height: 40px;margin-top: 12px">
                        <el-button type="danger" @click="customerLogin" style="display:flex;flex:1;margin-left:30px;margin-right:30px;justify-content: center">登录</el-button>
                    </div>
                    <div class="loginLink">
                        <div class="loginContent">
                            <span>
                                 <span>QQ</span>
                                 <span>微信</span>
                             </span>
                             <span @click="goRegister">立即注册</span>
                        </div>

                    </div>
                </li>
            </ul>
        </div>
        <div class="footer">
            <login-footer/>
        </div>
    </div>
</template>
<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import {Action, Getter} from 'vuex-class'
    import logo from '@/components/common/images/logo.png'
    import {namespace} from 'vuex-class';
    import * as _ from 'lodash'
    import LoginFooter from "@/components/login/loginFooter.vue";
    const goodsName=namespace("goods");
    @Component({
        components:{
            LoginFooter
        }
    })
    export default class CustomerLogin extends Vue {
        private logo:any="";
        private hasError:boolean=false;
        private errMsg:any="";
        private username:any="";
        private password:any="";
        private async created() {
            this.logo=logo;
        }
        private goHome(){
            this.$router.push({  // 核心语句
                path: '/'
            });
        }
        private goRegister(){
            this.$router.push({  // 核心语句
                path: '/customer/register'
            });
        }
        private customerLogin(){
            if(!this.username){
                this.errMsg="用户名不能为空!";
                this.hasError=true;
                return false;
            }
            if(!this.password){
                this.errMsg="密码不能为空!";
                this.hasError=true;
                return false;
            }
            //校验用户名和密码，如果一样，返回用户名和密码
            this.hasError=false;
            this.$router.push({  // 核心语句
                path: '/'
            });
        }

    }
</script>
<style lang="less">
    .customerLogin{
        width: 100%;
        background-color: white;
        height: 100%;
        .header{
            display: flex;
            justify-content: center;
            ul{
                width: 60%;
                margin: 0px;
                padding: 0px;
                display: flex;
                flex-direction: row;
                li{
                    list-style-type: none;
                    display: flex;
                    align-items: center;
                    b {
                        display: block;
                        width: 110px;
                        margin-top: 10px;
                        height: 40px;
                        background: url(//misc.360buyimg.com/user/passport/1.0.0/css/i/l-icon.png) no-repeat;
                    }
                }
            }
        }
        >.tips-wrapper{
            background: #fff8f0;
            width: 100%;
            padding-top: 10px;
            padding-bottom: 10px;
            text-align: center;
            color: #999;
            font-size: 12px;
        }
        .login-banner{
            width: 100%;
            height: 475px;
            background: #e93854;
            display: flex;
            justify-content: center;
            ul{
                margin: 0px;
                padding: 0px;
                display: flex;
                height: 100%;
                width: 70%;
                flex-direction:row;
                justify-content: center;
                li:nth-child(1){
                    background: url(https://img1.360buyimg.com/pop/jfs/t1/176161/26/18121/101317/60e26a01E031913cf/d2086b8700e9476e.jpg) 0px 0px no-repeat;
                    background-color: #E93854;
                    flex: 1;
                    list-style-type: none;
                    margin: 0px;
                    padding: 0px;
                }
                li:nth-child(2){
                    width: 346px;
                    height: 400px;
                    background: white;
                    list-style-type: none;
                    margin-top: 10px;
                    .inputWrap{
                        display: flex;
                        margin-top: 22px;
                        border: 1px solid #dddddd;
                        height: 52px;
                        width: 280px;
                        margin: auto;
                        margin-top: 20px;
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
                        input{
                            flex: 1;
                            border-width:0px!important;
                            outline: 0;
                        }
                        .phoneTitleClass{
                            text-align: center;
                            display: flex;
                            align-items: center;
                            margin-left:30px;
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
                    .tips-wrapper {
                        background: #fff8f0;
                        width: 100%;
                        text-align: center;
                        padding: 10px 0;
                    }
                    .loginTitle{
                        width: 346px;
                        height: 54px;
                        display: flex;
                        background: #fff;
                        border-bottom: 1px solid #f4f4f4;
                        >span{
                            font-size: 18px;
                            font-family: "microsoft yahei";
                            text-align: center;
                            margin-left:50px;
                            align-items: center;
                            display: flex;
                            align-items: center;
                        }
                    }
                     .forgetPasswordTips{
                         display: flex;
                         margin-left: 30px;
                         margin-right: 30px;
                         justify-content: flex-end;
                         margin-top: 12px;
                     }
                }
            }
        }
        .loginLink{
            width: 100%;
            margin-top: 20px;
            .loginContent{
                margin-left: 30px;
                margin-right: 30px;
                justify-content: space-between;
                display: flex;
                span:nth-child(2){
                    cursor: pointer;
                }
                span:nth-child(1){
                    cursor: pointer;
                }
            }
        }
        .commonFooter{
           margin-top: 0px;
        }
    }
</style>