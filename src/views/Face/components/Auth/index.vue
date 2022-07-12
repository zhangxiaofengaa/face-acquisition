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
        @change="fileCardChange($event)"
        v-if="!cardImg"
      />
      <div class="card-img-main" v-else>
        <img :src="cardImg" class="card-img" @click="imagePreview(cardImg)" />
        <div class="again-upload-btn">
          <van-icon name="replay" />重新上传
          <input
          class="upload-again"
          ref="upload_file"
          type="file"
          name="pic"
          multiple="1"
          accept="image/jpeg, image/jpg, image/png"
          @change="fileCardChange($event)"
        />
        </div>
        
      </div>
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
import { Icon, ImagePreview } from 'vant'
const { unifiedLoginURL } = config[process.env.NODE_ENV]

export default {
  name: 'Auth',
  components: {
    [Icon.name]: Icon,
    [ImagePreview.name]: ImagePreview,
  },
  props: {
    isPicLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      cardImg: '',
      info: {}
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
        this.$emit('update:isPicLoading' , false)
        const {  message, data } = res
        if (message.errorMessage) {
          Toast({
            message: message.errorMessage,
            duration: 10000
          })
        }
        const info = {
          personName: data.personName,
          idNum: data.idNum,
          idImgBase64: data.idImgBase64
        }
        this.cardImg = `data:image/png;base64,${data.idImgBase64}`
        this.$emit('getInfo', info)
        console.log('info')

        console.log('请求接口....', res)
      }).finally(() => {
         this.$emit('update:isPicLoading' , false)
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
      // this.$router.push('student-work-no')
    },
    logout() {
       window.location.href = 'http://ids.zfc.edu.cn/authserver/logout'
    },
    imagePreview(images) {
      ImagePreview({
        showIndex: false,
        images: [images]
      })
    },
  },
}
</script>