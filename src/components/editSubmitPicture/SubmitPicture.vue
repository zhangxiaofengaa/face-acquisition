<template>
  <div class="submit-picture-main">
    <van-overlay :show="true"  v-if="showSubmit">
      <div class="submit-panel" >
        <div class="pre" @click="returnGuidePage"></div>
        <div class="picture">
          <img :src="facePicture" class="img" />
        </div>
        <div class="edit-submit">
          <span class="edit" @click="edit">编辑</span>
          <van-button type="info" size="small" @click="goBack">提交</van-button>
        </div>
      </div>
    </van-overlay>
    <EditPicture :facePicture="facePicture" @finish="finish" v-else></EditPicture>
  </div>
</template>
<script>
import { Overlay, Button } from 'vant'
import { EventBus } from "@/utils/eventBus"

export default {
  name: 'SubmitPicture',
  components: {
    [Overlay.name]: Overlay,
    [Button.name]: Button
  },
  props: {
    facePicture: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showSubmit: true
    }
  },
  destroyed(){
    EventBus.$emit("imgUrl", this.facePicture)
  },
  methods: {
    edit() {
      this.showSubmit = false
    },
    returnGuidePage() {
      this.$emit('returnGuidePage')
    },
    finish(val) {
      this.$emit('update:facePicture',val)
      this.goBack()
    },
    goBack() {
      this.$router.back()
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
    width: 21px;
    height: 21px;
    border-radius: 50%;
    margin: 32px 0 21px 16px;
  }
  .pre::before {
    content: '';
    height: 6px;
    width: 6px;
    border: solid $--color-black;
    border-width: 1px 0 0 1px;
    transform: translate(-50%, -50%) rotate(-45deg);
    position: absolute;
    left: 60%;
    top: 50%;
  }

  .picture {
    width: 100%;
    height: 0;
    flex: 1;
    .img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      display: flex;
    }
  }

  .edit-submit {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 49px 15px 15px 20px;

    .edit {
      color: $--color-white;
      font-size: $--font-size-large;
    }
  }
}
</style>