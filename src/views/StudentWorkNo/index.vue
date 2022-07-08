<template>
  <div class="student-work-no-page">
    <div class="info-panel">
      <div class="bottom-library-photos-main">
        <img :src="src || defaultImg" class="bottom-library-photos" @click="imagePreview(src)" />
      </div>
      <div class="info">
        <div class="one-level-title">李*毅</div>
        <div class="department-class">美术学院美术学院 / 油画专业油画 / 18级 / 1班</div>
        <div class="encrypted-info">
          <div>
            <span class="info-key">学工号：</span>
            <span class="info-val">209***456</span>
          </div>
          <img
            :src="seeStudentWorkNumber ? displayImg : hideImg"
            class="display-hide-icon"
            @click="see('seeStudentWorkNumber')"
          />
        </div>
        <div class="encrypted-info">
          <div>
            <span class="info-key">身份证号：</span>
            <span class="info-val">234************189</span>
          </div>
          <img
            :src="seeIDNumber ? displayImg : hideImg"
            class="display-hide-icon"
            @click="see('seeIDNumber')"
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
      seeStudentWorkNumber: false,
      seeIDNumber: false,
    }
  },
  computed: {
    disabledSubmit() {
      return !this.faceImgUrl ? true : false
    }
  },
  created() {
    EventBus.$on("imgUrl", (msg) => {
      this.faceImgUrl = msg
    })
    // const params = new URLSearchParams(window.location.search)
    // const wkNo = params.get('wkNo')
    // console.log('===*********', params.get('wkNo'))
    this.getUserInfo()
  },
  methods: {
    imagePreview(images) {
      ImagePreview({
        showIndex: false,
        images: [images]
      })
    },
    onSubmit() {

    },
    jumpGuidePage() {
      // 跳转指引页面
      this.$router.push('shooting-guide')
    },
    deletePic() {
      this.faceImgUrl = null
    },
    see(val) {
      // val 改变图标状态  到时还需要加入解密的字段
      this[val] = !this[val]
    },
    getUserInfo() {
      if (window.location.search) {
        const params = new URLSearchParams(window.location.search)
        const wkNo = params.get('wkNo')
        const userName = params.get('name')
        const organizationName = params.get('organizationName')
        const personType = params.get('personType')
        const token = params.get('token')

        const url = location.href.split("?")[0]
        window.history.pushState('object', document.title, url)
        // this.src = params.get('basicUrl')
        sessionStorage.setItem('token', token)
        this.$store.commit('setUserInfo', { wkNo, userName, organizationName, personType })
      }

    }
  }
}
</script>