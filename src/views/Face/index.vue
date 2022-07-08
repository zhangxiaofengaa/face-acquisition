<template>
  <div class="face-acquisition-page">
    <Auth></Auth>
    <van-form @submit="onSubmit">
      <van-field required disabled v-model="form.username" name="人员姓名" label="人员姓名" placeholder="根据身份证自动识别" />
      <van-field required disabled v-model="form.password" name="身份证号" label="身份证号" placeholder="根据身份证自动识别" />
      <van-field required v-model="form.pic" name="人脸照片" label="人脸照片">
        <template #input>
          <div class="uploader-entrance" @click="jumpGuidePage" v-if="!faceImgUrl"></div>
          <div class="face-pic-main" v-else>
            <div class="delete-button" @click="deletePic"><van-icon name="cross" class="delete-icon" /></div>
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
import { Auth } from './components'
import { Form, Field, Button, Uploader, Icon, ImagePreview, Dialog, Notify } from 'vant'
import { EventBus } from "@/utils/eventBus"

export default {
  name: 'Face',
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
    [Uploader.name]: Uploader,
    [Icon .name]: Icon, 
    [ImagePreview.name]: ImagePreview,
    [Dialog.name]: Dialog,
    [Notify.Component.name]: Notify.Component,
    Auth
  },
  data() {
    return {
      form: {
        username: '',
        password: '',
        pic: '',
      },
      faceImgUrl: 'https://ts1.cn.mm.bing.net/th?id=OIP-C.6Lv1RQrwV88Jz3Mz82doIgHaD_&w=340&h=183&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',
      fileList: []
    }
  },
  computed: {
    disabledSubmit() {
      const { username, password, pic } = this.form
      if (!username && !password && !pic) {
        return true
      }
      return false
    }
  },
  created() {
    EventBus.$on("imgUrl", (msg) => {
      this.faceImgUrl = msg
    })
  },
  mounted() {
    // Notify({
    //   type: 'warning',
    //   message: '采集前请先确保该人员的身份证号存在于生物库平台中',
    // })
    // Dialog.alert({
    //   title: '采集信息说明',
    //   confirmButtonText: '我已知晓',
    //   messageAlign: 'left',
    //   message: '一、人脸认证非唯一通行方式，用户拒绝人脸信息采集的，还可刷卡通行。\n二、系统郑重承诺，采集的身份证、个人图像信息仅用作人证核验与校内门禁通行，不外泄、不作他用。\n三、如完成信息采集后，选择放弃人脸识别通行方式，可联系系统管理员收回相应权限。',
    // })
  },
  methods: {
    uploader() {
// 
    },
    beforeRead() {
      console.log('???????????')
    },
    imagePreview(images) {
      ImagePreview({
        showIndex: false,
        images: [images]
      })
    },
    onSubmit() {
      console.log('=====', this.$refs['uploader'].beforeRead)
    },
    jumpGuidePage() {
      // 跳转指引页面
      this.$router.push('shooting-guide')
    },
    deletePic() {
      this.faceImgUrl = null
    },
  }
}
</script>
<style lang="scss" scoped>
.face-pic-main {
  width: 160px;
  height: 160px;
  border-radius: 4px;
  position: relative;
  margin: 8px 0;

  .pic {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .delete-button {
    width: 44px;
    height: 44px;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 0px 4px 0px 4px;
    position: absolute;
    right: 0;

    .delete-icon {
      color: $--color-white;
      font-size: 34px;
      margin: 5px;
    }
  }

  .van-dialog {
    .van-dialog__content {
      color: $--color-gray2 !important;
    }
  }
}
</style>