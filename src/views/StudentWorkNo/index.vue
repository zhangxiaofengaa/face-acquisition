<template>
  <div class="student-work-no-page">
    <div class="info-panel">
      <div class="bottom-library-photos-main">
        <img :src="src" class="bottom-library-photos" @click="imagePreview">
      </div>
      <div class="info">
        <div class="one-level-title">李*毅</div>
        <div class="department-class">美术学院美术学院 / 油画专业油画 / 18级 / 1班</div>
        <div><span class="info-key">学工号：</span><span class="info-val">209***456</span></div>
        <div><span class="info-key">身份证号：</span><span class="info-val">234************189</span></div>
      </div>
    </div>
    <van-form @submit="onSubmit">
      <van-field required name="人脸照片" label="人脸照片">
        <template #input>
          <div class="uploader-entrance" @click="jumpGuidePage"></div>
          <!-- <van-uploader ref="uploader" v-model="fileList" multiple :max-count="1" @click-upload="uploader" :before-read="beforeRead" /> -->
        </template>
      </van-field>
      <div class="button-main">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import './index.scss'
import { Form, Field, Button, ImagePreview } from 'vant';

export default {
  name: 'StudentWorkNo',
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
    [ImagePreview.name]: ImagePreview
  },
  data() {
    return {
      src: 'https://ts1.cn.mm.bing.net/th?id=OIP-C.6Lv1RQrwV88Jz3Mz82doIgHaD_&w=340&h=183&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2'
    }
  },
  methods: {
    imagePreview() {
      ImagePreview({
        showIndex: false,
        images: [this.src]
      });
    },
    onSubmit() {},
  }
}
</script>