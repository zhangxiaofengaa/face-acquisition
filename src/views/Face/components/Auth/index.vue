<template>
  <div class="card-main">
    <div class="top">
      <div class="one-level-title">人脸认证</div>
      <div class="color-orange" @click="jumpCommonProblemPage">采集遇到问题？</div>
    </div>
    
    <div class="desc-content">请将正面照完整拍摄，否则会影响识别</div>
    <div class="card">
      <input
        class="upload-card-input"
        ref="upload_file"
        type="file"
        name="pic"
        multiple="1"
        accept="image/jpeg, image/jpg, image/png"
        @change="fileCardChange($event, 1)"
      />
    </div>
    <div class="tips">
      没带证件？<span class="color-blue" @click="jumpStudentWorkNoPage">使用学工号采集备份</span>
    </div>
  </div>
</template>
<script>
import './index.scss'
import config from '~config'
import { uploadOcrIdImage } from '@/api/face'

const { unifiedLoginURL } = config[process.env.NODE_ENV]

export default {
  name: 'Auth',
  props: {
    isPicLoading: {
      type: Boolean,
      default: false
    }
  },
  mounted() {},
  methods: {
    fileCardChange(e) {
      const imgFile = e.target.files[0]
      let postData = new FormData()
      postData.append('file', imgFile)
      this.$emit('update:isPicLoading' , true)

      uploadOcrIdImage(postData).then(res => {
        this.$emit('update:isPicLoading' , fasle)
        console.log('请求接口....', res)
      }).finally(() => {
         this.$emit('update:isPicLoading' , fasle)
      })
    },
    jumpCommonProblemPage() {
      this.$router.push('common-problem')
    },
    // 跳转学工号登录页面
    async jumpStudentWorkNoPage() {
      // 先对接统一登陆 成功后跳转页面
      await this.logout()
      window.location.href = `${unifiedLoginURL}/bioDev/gateway/auth/personFaceCollection/login`
    },
    logout() {
       window.location.href = 'http://ids.zfc.edu.cn/authserver/logout'
    },
  },
}
</script>