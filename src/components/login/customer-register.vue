<template>
    <div class="customerRegister">
        <div class="header">
            <ul>
                <li @click="goHome" style="cursor: pointer"><img width="160px" height="60px" :src="logo"></li>
                <li class="regTopTitle">欢迎注册</li>
                <li style="position: absolute;right:200px;font-size: 16px;color: #999;">已有账号？</li>
                <li style="position: absolute;right:140px;color: #e22;font-size: 16px;cursor: pointer" @click="goLogin">请登录></li>
            </ul>
        </div>
        <div class="content" v-if="active!=3">
            <el-steps :space="200" :active="active" finish-status="success" align-center>
                <el-step title="验证手机号"></el-step>
                <el-step title="填写账号信息"></el-step>
                <el-step title="注册成功"></el-step>
            </el-steps>
        </div>
        <div class="contentForm">
            <step-one ref="selectOne"  v-if="active==1"/>
            <step-two ref="selectTwo"  v-if="active==2"/>
            <step-three ref="selectThree" v-if="active==3"/>
        </div>
        <div class="confirmButton">
            <el-button type="danger" @click="goNext" :style="buttonStyle">{{buttonText}}</el-button>
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
    import * as _ from 'lodash';
    import StepOne from "@/components/login/registerStep/step-one.vue";
    import StepTwo from "@/components/login/registerStep/step-two.vue";
    import StepThree from "@/components/login/registerStep/step-three.vue";
    import LoginFooter from "@/components/login/loginFooter.vue";
    const goodsName=namespace("goods");
    @Component({
        components:{
            StepOne,
            StepTwo,
            StepThree,
            LoginFooter
        }
    })
    export default class CustomerRegister extends Vue {
        private logo:any="";
        private active:any=1;
        private currentShow=1;
        private async created() {
            this.logo=logo;
        }
        private get buttonText(){
            if(this.active==1){
                return "下一步";
            }
            if(this.active==2){
                return "立即注册";
            }
            return "去购物";
        }
        private get buttonStyle(){
            if(this.active==3){
                return {
                    "width":"100px",
                    "margin-top":"45px",
                    "height":"50px"
                }
            }
            return {
                "width":"380px",
                "margin-top":"45px",
                "height":"50px"
            }
        }
        private goHome(){
            this.$router.push({  // 核心语句
                path: '/'
            });
        }
        private goLogin(){
            this.$router.push({  // 核心语句
                path: '/customer/login'
            });
        }
        private goNext(){
            //获取手机号
            let params:any={};
            if(this.$refs.selectOne){
                let selectOne:any=this.$refs.selectOne;
                if(!selectOne){
                    return false;
                }
                let hasError:any=selectOne.hasError();
                if(hasError){
                    return false;
                };
                let phone:any=selectOne.ipone;
            }
            if(this.$refs.selectTwo){
                let selectTwo:any=this.$refs.selectTwo;
                if(!selectTwo){
                    return false;
                }
                let hasError:any=selectTwo.hasError();
                if(hasError){
                    return false;
                };
                let username:any=selectTwo.username;
                let password:any=selectTwo.password;
                let email:any=selectTwo.email;
            }
            //获取手机号以外的数据
            if(this.active==3){
                this.goHome();
                return false;
            }
            this.active=this.active+1;
            this.currentShow=this.currentShow+1;
            if(this.active>=3){
                setTimeout(()=>{
                    this.goHome();
                },3000)
            }
        }
    }
</script>
<style lang="less">
    .customerRegister{
        width: 100%;
        background-color: white;
        height: 100%;
        .regTopTitle{
            float: left;
            height: 34px;
            line-height: 34px;
            font-size: 24px;
            color: #333;
        }
        .header{
            height: 110px;
            background: url(//misc.360buyimg.com/user/reg/3.0.0/css/i/headbg.jpg) repeat-x left bottom;
            ul{
                margin: 0px;
                padding: 0px;
                display: flex;
                padding: 0px 150px;
                align-items: center;
                height: 100%;
                li{
                    list-style-type: none;
                    flex-direction: row;
                }
            }
        }
        .content{
            display: flex;
            justify-content: center;
            margin-top: 80px;
        }
        .contentForm{
            display: flex;
            justify-content: center;
        }
        .el-steps{
            width: 500px;
            display: flex;
            justify-content: center;
        }
        .confirmButton{
            display: flex;
            justify-content: center;
            width: 100%;
        }
    }
</style>