<template>
  <div class="page-success">
    <div class="icon"></div>
    <p class="tips">采集成功</p>
    <div class="submit-btn">
      <div class="btn">
        <van-button square block type="info" native-type="submit" @click="backHome">返回首页</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import './index.scss'
import { Button } from 'vant'

export default {
  name: 'Success',
  components: {
    [Button.name]: Button,
  },
  methods: {
    backHome() {
      this.$router.replace('/')
    },
  },
}
</script>

