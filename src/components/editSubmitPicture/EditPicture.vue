<template>
  <div class="edit-picture">
    <vue-cropper
      :img="picture"
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
    ></vue-cropper>
    <img :src="rotate" class="rotate" @click="rotateLeft">
    <div class="btn-main">
      <div class="font-btn">取消</div>
      <div class="font-btn" :class="{'color-gray': edited}">还原</div>
      <van-button type="info" size="small">完成</van-button>
    </div>
  </div>
</template>
<script>
import { VueCropper } from 'vue-cropper'
import { Overlay, Button } from 'vant'
import rotate from  '@imgs/rotate.png'

export default {
  name: 'EditPicture',
  components: {
    [Overlay.name]: Overlay,
    [Button.name]: Button,
    VueCropper
  },
  props: {
    picture: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      rotate,
      edited: false,
      option: {
        img: '', // 裁剪图片的地址 url 地址, base64, blob
        outputSize: 1, // 裁剪生成图片的质量
        outputType: 'jpeg', // 裁剪生成图片的格式 jpeg, png, webp
        info: true, // 裁剪框的大小信息
        canScale: true, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 200 , // 默认生成截图框宽度
        autoCropHeight: 200, // 默认生成截图框高度
        fixedBox: false, // 固定截图框大小 不允许改变
        fixed: false,
        canMove: false, // 上传图片是否可以移动
        canMoveBox: true, // 截图框能否拖动
        original: true, // 上传图片按照原始比例渲染
        centerBox: true, // 截图框是否被限制在图片里面
        infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
        full: true, // 是否输出原图比例的截图
        enlarge: '1', // 图片根据截图框输出比例倍数
        mode: 'auto', // 图片默认渲染方式 contain , cover, 100px, 100% auto
      },
    }
  },
  watch: {
    'option.autoCropWidth': {
      handler(val) {
        console.log('=========',val)
        if (!this.edited) this.edited = true
      }
    },
    'option.autoCropHeight': {
      handler() {
        if (!this.edited) this.edited = true
      }
    }
  },
  mounted() {
  },
  methods: {
    rotateLeft() {
      this.$refs.cropper.rotateLeft()
    },
    realTime (data) {
      this.previews = data
    },
  }
}
</script>
<style lang="scss" scoped>
.edit-picture {
  height: 100%;
  display: flex;
  flex-direction: column;

  .vue-cropper {
    background-image: none;
  }
  .rotate {
    width: 40px;
    height: 40px;
    margin-left: 43px;
    margin-bottom: 102px;
  } 
  .btn-main {
    z-index: 99;
    padding: 0 32px 43px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .font-btn {
      font-size: $--font-size-large;
      color: $--color-white;
    }
    .color-gray {
      color: #5D5D5D;
    }
  }
}
</style>