<template>
    <div class="loginClass">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="login-ruleForm">
            <div class="loginTitle">管理员登录</div>
            <el-form-item label="用户名" style="margin-top: 10px" prop="username">
                <el-input v-model.number="ruleForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <span v-if="isShowError" style="color: red;font-size: 10px;margin-left: 100px">用户名或密码错误</span>
            <el-form-item>
                <el-button style="width: 300px;margin-top: 20px" type="primary" @click="submitForm('ruleForm')">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import ApiActions from '@/components/api/api-actions'
    @Component
    export default class Login extends Vue {
           private ruleForm:any={};
           private rules:any={};
           private isShowError:boolean=false;
           created() {
               this.rules = {
                   username: [
                       {
                           validator: (rule, value, callback) => {
                               if (value == '') {
                                   callback(new Error('请输入用户名'));
                               } else {
                                   if (this.ruleForm.username != '') {
                                       (this.$refs.ruleForm as any).validateField('password');
                                   }
                                   callback();
                               }
                           }, trigger: 'blur'
                       }
                   ],
                   password: [
                       {
                           validator: (rule, value, callback) => {
                               if (value === '') {
                                   callback(new Error('请输入密码'));
                               } else {
                                   callback();
                               }
                           }, trigger: 'blur'
                       }
                   ]
               }
               this.ruleForm={
                   username: '',
                   password: ''
               };
           }
           private submitForm(formName){
               (this.$refs['ruleForm'] as any).validate(async (valid) => {
                   if (valid) {
                       let apiActions=new ApiActions(this);
                       let params:any={};
                       try {
                               await apiActions.login(this.ruleForm);
                               this.$router.push({
                                   path: '/admin',
                               });
                       }catch (e) {
                               this.$router.push({
                                   path: '/login',
                               });
                               this.$nextTick(()=>{
                                   this.isShowError=true;
                               });
                       }

                   } else {
                       this.isShowError=false;
                       return false;
                   }
               });
           }
    }

</script>

<style lang="less">
    .loginClass{
        width: 100%;
        height: 100%;
        background-image: url("//localhost/images/static/backimg.png");
        background-repeat: no-repeat;
        margin:0px;
        background-size:100% 100%;
        background-attachment:fixed;
        display: flex;
       justify-content: center;
        .login-ruleForm{
            width: 400px;
            align-self: center;
            background-color: white;
            padding-top: 25px;
            padding-bottom: 25px;
            padding-right: 43px;
            border-radius: 5px;
            margin-left: 30px;
            margin-bottom: 50px;
            filter:progid:DXImageTransform.Microsoft.Shadow(color=#909090,direction=120,strength=4);/*ie*/
            -moz-box-shadow: 2px 2px 10px #909090;/*firefox*/
            -webkit-box-shadow: 2px 2px 10px #909090;/*safari或chrome*/
            box-shadow:2px 2px 10px #909090;/*opera或ie9*/
            .loginTitle{
                height: 30px;
                margin-left:45px;
                font-size: larger;
                font-family: monospace;
            }
        }
    }
</style>