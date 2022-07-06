<template>
  <div class="submit-picture-main">
    <van-overlay :show="true"  v-if="showSubmit">
      <div class="submit-panel" >
        <div class="pre" @click="returnGuidePage"></div>
        <div class="picture">
          <img :src="src" class="img" />
        </div>
        <div class="edit-submit">
          <span class="edit" @click="edit">编辑</span>
          <van-button type="info" size="small">提交</van-button>
        </div>
      </div>
    </van-overlay>
    <EditPicture :picture="src" v-else></EditPicture>
  </div>
</template>
<script>
import { Overlay, Button } from 'vant'

export default {
  name: 'SubmitPicture',
  components: {
    [Overlay.name]: Overlay,
    [Button.name]: Button
  },
  data() {
    return {
      showSubmit: true,
      // src: 'https://ts1.cn.mm.bing.net/th?id=OIP-C.iilMusn3clq4IvVfdvzjOwHaKe&w=210&h=297&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2'
      src: 'https://ts1.cn.mm.bing.net/th?id=OIP-C.6Lv1RQrwV88Jz3Mz82doIgHaD_&w=340&h=183&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2'
    }
  },
  methods: {
    edit() {
      this.showSubmit = false
    },
    returnGuidePage() {
      this.$emit('returnGuidePage')
    }
  }
}
</script>
<style lang="scss" scoped>
.submit-picture-main {
  width: 100%;
  height: 100%;
  z-index: 9;
  position: fixed;
  top: 0;
}
.van-overlay {
  background-color: $--background-black;
}
.submit-panel {
  height: 100%;
  display: flex;
  flex-direction: column;

  .pre {
    position: relative;
    background-color: $--background-white;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    margin: 65px 0 42px 32px;
  }
  .pre::before {
    content: '';
    height: 12px;
    width: 12px;
    border: solid $--color-black;
    border-width: 2px 0 0 2px;
    transform: translate(-50%, -50%) rotate(-45deg);
    position: absolute;
    left: 60%;
    top: 50%;
  }

  .picture {
    width: 100%;
    flex: 1;
    position: relative;
    .img {
      width: 100%;
      height: auto;
      vertical-align: middle;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .edit-submit {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 30px 30px 40px;

    .edit {
      color: $--color-white;
      font-size: $--font-size-large;
    }
  }
}
</style>