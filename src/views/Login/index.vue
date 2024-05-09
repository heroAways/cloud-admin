<template>
    <div class="login-container">
        <div class="login">
            <img src="http://vue3.mengxuegu.com/assets/login-logo-6c42311e.png" alt="">
            <div class="login-title">
                帐号登录
            </div>
            <el-form size="large" ref="loginRuleRef" :model="state.loginForm" :rules="loginRules">
                <el-form-item prop="username">
                    <el-input v-model="state.loginForm.username" placeholder="请输入账号/手机号">
                        <template #prefix>
                            <svg-icon icon="user"></svg-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="state.loginForm.password" placeholder="请输入密码">
                        <template #prefix>
                            <svg-icon icon="lock"></svg-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-checkbox v-model="state.isRemember">
                        <span>记住密码</span>
                    </el-checkbox>
                    <el-button @click="handleSubmit" type="primary" style="width: 100%;">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script lang='ts' setup>
import { ref, reactive } from 'vue'
import { local } from '@/utils/storage'
import {loginApi} from '@/api/userApi'
import { useRouter } from 'vue-router'
const router = useRouter()
const loginRuleRef = ref()
let state = reactive({
    isRemember: local.get('isRemember') || false,
    loginForm: {
        username: local.get('username') || '',
        password: local.get('password') || ''
    }
})
const validateUsername = (rule: any, val: string, callBack: Function) => {
    const phoneReg = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/
    if (phoneReg.test(val)) {
        callBack()
    } else {
        callBack(new Error('请输入正确的手机号'))
    }
}
const validatePassword = (rule: any, val: string, callBack: Function) => {
    const passReg = /^[0-9]{6}$/
    if (passReg.test(val)) {
        callBack()
    } else {
        callBack(new Error('请输入正确密码'))
    }
}
const loginRules = reactive({
    username: [
        { required: true, message: '请输入账号或手机号!', trigger: 'blur' },
        { validator: validateUsername, trigger: "blur" },
    ],
    password: [
        { required: true, message: '请输入密码!', trigger: 'blur' },
        { validator: validatePassword, trigger: "blur" },
    ]
})
const handleSubmit = () => {
    loginRuleRef.value.validate(async (valid: boolean) => {
        if (valid) {
            if (state.isRemember) {
                local.set('username', state.loginForm.username)
                local.set('password', state.loginForm.password)
                local.set('isRemember', state.isRemember)
            } else {
                local.remove('username')
                local.remove('password')
                local.remove('isRemember')
            }
            loginApi().then(res => {
                console.log(res);
                router.push('/')
            })
            
        }
    })
}
</script>
<style lang='scss' scoped>
.login-container {
    height: 100%;
    background-image: url('http://vue3.mengxuegu.com/assets/login-bj-514aa045.png');
    background-size: cover;
    overflow: hidden;

    .login {
        width: 410px;
        height: 460px;
        box-shadow: #d7d3d3 1px 2px 10px;
        display: flex;
        margin: auto;
        margin-right: 122px;
        margin-top: 132px;
        background-color: #fff;
        border-radius: 10px;
        padding: 30px;
        display: flex;
        flex-direction: column;

        img {
            display: block !important;
            margin: 0 auto;
            width: 130px;
            height: 42px;
        }

        .login-title {
            letter-spacing: 2px;
            font-weight: bold;
            font-size: 22px;
            height: 70px;
            line-height: 70px;
        }
    }
}
</style>