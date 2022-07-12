<template>
  <div class="edit-picture">
    <vue-cropper
      :img="facePicture"
      ref="cropper"
      :outputSize="option.outputSize"
      :outputType="option.outputType"
      :info="option.info"
      :canScale="option.canScale"
      :autoCrop="option.autoCrop"
      :autoCropWidth="option.autoCropWidth"
      :autoCropHeight="option.autoCropHeight"
      :fixedBox="option.fixedBox"
      :fixed="option.fixed"
      :fixedNumber="option.fixedNumber"
      :canMove="option.canMove"
      :canMoveBox="option.canMoveBox"
      :original="option.original"
      :centerBox="option.centerBox"
      :infoTrue="option.infoTrue"
      :full="option.full"
      :enlarge="option.enlarge"
      :mode="option.mode"
      @realTime="realTime"
      @cropMoving="cropMoving"
    ></vue-cropper>
    <img :src="rotate" class="rotate" @click="rotateLeft" />
    <div class="btn-main">
      <div class="font-btn">取消</div>
      <div class="font-btn" :class="{'color-gray': !openReduction}" @click="reset">还原</div>
      <div class="font-btn" @click="goBack">完成</div>
    </div>
  </div>
</template>
<script>
import { VueCropper } from 'vue-cropper'
import { Overlay, Button } from 'vant'
import rotate from '@imgs/rotate.png'

export default {
  name: 'EditPicture',
  components: {
    [Overlay.name]: Overlay,
    [Button.name]: Button,
    VueCropper
  },
  props: {
    facePicture: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      rotate,
      openReduction: false,
      option: {
        img: '', // 裁剪图片的地址 url 地址, base64, blob
        outputSize: 1, // 裁剪生成图片的质量
        outputType: 'jpeg', // 裁剪生成图片的格式 jpeg, png, webp
        info: true, // 裁剪框的大小信息
        canScale: true, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 200, // 默认生成截图框宽度
        autoCropHeight: 200, // 默认生成截图框高度
        fixedBox: false, // 固定截图框大小 不允许改变
        fixed: false,
        canMove: false, // 上传图片是否可以移动
        canMoveBox: true, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: true, // 截图框是否被限制在图片里面
        infoTrue: false, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
        full: true, // 是否输出原图比例的截图
        enlarge: '1', // 图片根据截图框输出比例倍数
        mode: '90% auto%', // 图片默认渲染方式 contain , cover, 100px, 100% auto
      },
      cropMovingCount: 0,
      imgUrl: ''
    }
  },
  methods: {
    rotateLeft() {
      this.$refs.cropper.rotateLeft()
      this.openReduction = true
    },
    realTime(data) {
      // 需要获取初始剪裁框大小来判断 这里先写死
      if (data.h > 200 || data.w > 200) {
        this.openReduction = true
      }
      // this.previews = data
    },
    cropMoving() {
      // 进页面第一次没编辑就会触发，所以大于1时开启还原
      this.cropMovingCount++
      if (this.cropMovingCount > 1) {
        this.openReduction = true
      }
    },
    reset() {
      this.$refs.cropper.refresh()
      this.openReduction = false
      this.cropMovingCount = 0
    },
    goBack() {
      this.$refs.cropper.getCropData((base64) => {
        this.$emit('finish', base64)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.edit-picture {
  width: 100%;
  height: 100%;
  background: $--background-black;
  display: flex;
  flex-direction: column;

  .vue-cropper {
    background-image: none;
  }
  .rotate {
    width: 14px;
    height: 14px;
    margin-left: 22px;
    margin-bottom: 51px;
  }
  .btn-main {
    z-index: 99;
    padding: 0 16px 22px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .font-btn {
      font-size: $--font-size-large;
      color: $--color-white;
    }
    .color-gray {
      color: #5d5d5d;
    }
  }
}
</style>