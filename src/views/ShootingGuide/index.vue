<template>
  <div class="guide-page">
    <div class="correct-panel">
      <img src="@/assets/image/demonstration.png" class="correct-pic" />
      <div>
        <div class="two-level-title">正确示范</div>
        <div class="desc-content">请衣着整齐，平视镜头，并正对光源，头部约占照片高度的2/3</div>
      </div>
    </div>
    <div class="error-panel">
      <div class="two-level-title">错误示范</div>
      <div class="error-type-main">
        <div v-for="(item, index) in errorPicList" :key="index" class="item-error-type">
          <img :src="item.url" class="error-pic" />
          <div class="desc">{{item.desc}}</div>
          <div></div>
        </div>
      </div>
    </div>
    <div class="button-main">
      <van-uploader :after-read="afterRead">
        <van-button type="info">开始采集</van-button>
      </van-uploader>
    </div>
  </div>
</template>

<script>
import './index.scss'
import { Button, Uploader, Overlay } from 'vant'
export default {
  name: 'ShootingGuide',
  components: {
    [Button.name]: Button,
    [Uploader.name]: Uploader,
    [Overlay.name]: Overlay 
  },
  data() {
    return {
      errorPicList: [
        { url: require('@/assets/image/error-demonstration1.png'), desc: '五官遮挡'},
        { url: require('@/assets/image/error-demonstration2.png'), desc: '光线太暗'},
        { url: require('@/assets/image/error-demonstration3.png'), desc: '模糊'},
        { url: require('@/assets/image/error-demonstration4.png'), desc: '侧对镜头'},
      ]
    }
  },
  methods: {
    afterRead(file) {
      console.log('???????')
      console.log('file.......', file)
    }
  }
}
</script>