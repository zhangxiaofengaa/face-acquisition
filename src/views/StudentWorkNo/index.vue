<template>
  <div class="student-work-no-page">
    <div class="info-panel">
      <div class="bottom-library-photos-main">
        <img :src="src || defaultImg" class="bottom-library-photos" @click="imagePreview(src)" />
      </div>
      <div>
        <div class="one-level-title">{{userInfo.userName}}</div>
        <div class="department-class">{{userInfo.organizationName}}</div>
        <div class="encrypted-info">
          <div class="info">
            <div class="info-key">学工号：</div>
            <div class="info-val">{{userInfo.wkNo}}</div>
          </div>
        </div>
        <div class="encrypted-info">
          <div class="info">
            <div class="info-key">身份证号：</div>
            <div class="info-val">{{idNumber}}</div>
          </div>
          <img
            :src="seeIDNumber ? displayImg : hideImg"
            class="display-hide-icon"
            @click="see"
          />
        </div>
      </div>
    </div>
    <van-form @submit="onSubmit">
      <van-field required name="人脸照片" label="人脸照片">
        <template #input>
          <div class="uploader-entrance" @click="jumpGuidePage" v-if="!faceImgUrl"></div>
          <div class="face-pic-main" v-else>
            <div class="delete-button" @click="deletePic">
              <van-icon name="cross" class="delete-icon" />
            </div>
            <img :src="faceImgUrl" class="pic" @click="imagePreview(faceImgUrl)" />
          </div>
        </template>
      </van-field>
      <div class="button-main">
        <van-button block type="info" :disabled="disabledSubmit" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import './index.scss'
import defaultImg from '@imgs/default-pic.png'
import displayImg from '@imgs/display.png'
import hideImg from '@imgs/hide.png'

import { Form, Field, Button, Icon, ImagePreview } from 'vant'
import { EventBus } from "@/utils/eventBus"
import { uploadFaceImage, verifyImageQuality } from '@/api/studentWorkNo'

export default {
  name: 'StudentWorkNo',
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [ImagePreview.name]: ImagePreview
  },
  data() {
    return {
      defaultImg,
      displayImg,
      hideImg,
      faceImgUrl: '',
      src: 'https://ts1.cn.mm.bing.net/th?id=OIP-C.6Lv1RQrwV88Jz3Mz82doIgHaD_&w=340&h=183&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',
      seeIDNumber: false,
      idCard: '230506199512091623',
      studentWorkNumber: '11222211',
      userInfo: {}
    }
  },
  computed: {
    disabledSubmit() {
      return !this.faceImgUrl ? true : false
    },
    idNumber() {
      if (!this.seeIDNumber) {
        return this.idCard.replace(/^(\d{6})\d+(\d{4})$/, "$1******$2")
      } else {
        return this.idCard
      }
    }
  },
  created() {
    EventBus.$on("imgUrl", (msg) => {
      this.faceImgUrl = msg
    })
    this.getUserInfo()
     console.log('..........', this.$store.state)
  },
  methods: {
    imagePreview(images) {
      ImagePreview({
        showIndex: false,
        images: [images]
      })
    },
    onSubmit() {
      const data = {
        code: this.userInfo.wkNo,
        faceImageBase64: this.faceImgUrl
      }
      uploadFaceImage(data).then(res => {
        console.log('res', res)
      })
    },
    // 图片质量检测
    pictureQualityInspection() {
      verifyImageQuality(this.faceImgUrl).then(res => {
        console.log('图片质量检测.........', res)
      })
    },
    jumpGuidePage() {
      // 跳转指引页面
      this.$router.push('shooting-guide')
    },
    deletePic() {
      this.faceImgUrl = null
    },
    see() {
      this.seeIDNumber = !this.seeIDNumber
    },
    getUserInfo() {
      if (window.location.search) {
        const params = new URLSearchParams(window.location.search)
        const wkNo = params.get('wkNo')
        const userName = params.get('name')
        const sex = params.get('sex')
        const organizationName = params.get('organizationName')
        const personType = params.get('personType')
        const photoUrl = params.get('basicUrl')
        const idNumber = params.get('idNumber')
        const token = params.get('token')

        const userInfo = { wkNo, sex, userName, organizationName, personType, photoUrl, idNumber }

        const url = location.href.split("?")[0]
        window.history.pushState('object', document.title, url)

        sessionStorage.setItem('token', token)
        this.$store.commit('setUserInfo', userInfo)
        this.$store.commit('setToken', token)
        this.userInfo = userInfo
        console.log('idNumber', idNumber)
      }

    }
  }
}
</script>