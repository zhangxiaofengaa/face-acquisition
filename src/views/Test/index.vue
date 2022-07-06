<template>
  <div class="test-page">
    <vue-cropper
      ref="cropper"
      :img="option.img"
      :output-size="option.size"
      :output-type="option.outputType"
      :info="true"
      :full="option.full"
      :can-move="option.canMove"
      :can-move-box="option.canMoveBox"
      :original="option.original"
      :auto-crop="option.autoCrop"
      :fixed="option.fixed"
      :fixed-number="option.fixedNumber"
      :center-box="option.centerBox"
      :info-true="option.infoTrue"
      :fixed-box="option.fixedBox"
    ></vue-cropper>
  </div>
</template>
<script>
import { VueCropper } from 'vue-cropper'

export default {
  name: 'Test',
  components: {
    VueCropper
  },
  data() {
    return {
      value: '',
      fileList: [],
      option: {
        img: 'https://ts1.cn.mm.bing.net/th?id=OIP-C.6Lv1RQrwV88Jz3Mz82doIgHaD_&w=340&h=183&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2', // 裁剪图片的地址
        info: false, // 裁剪框的大小信息
        outputSize: 1, // 裁剪生成图片的质量
        outputType: 'jpeg', // 裁剪生成图片的格式
        canScale: false, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 360, // 默认生成截图框宽度
        autoCropHeight: 400, // 默认生成截图框高度
        fixedBox: false, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [3, 4], // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMoveBox: false, // 截图框能否拖动
        original: true, // 上传图片按照原始比例渲染
        centerBox: true, // 截图框是否被限制在图片里面
        infoTrue: false // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      }
    }
  },
  methods: {
    beforeRead(file) {
      console.log('上传前', file)
    }
  }
}
</script>
<style lang="scss" scoped>
.test-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  .vue-cropper {
    background-image: none;
    height: 100%;
    width: 100%;
  }
}
 
</style>