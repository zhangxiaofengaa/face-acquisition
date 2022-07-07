<template>
  <div class="face-acquisition-page">
    <Auth></Auth>
    <van-form @submit="onSubmit">
      <van-field required disabled v-model="form.username" name="人员姓名" label="人员姓名" placeholder="根据身份证自动识别" />
      <van-field required disabled v-model="form.password" name="身份证号" label="身份证号" placeholder="根据身份证自动识别" />
      <van-field required v-model="form.pic" name="人脸照片" label="人脸照片">
        <template #input>
          <div class="uploader-entrance" @click="jumpGuidePage" v-if="!imgUrl"></div>
          <div class="face-pic" v-else>
            <div class="delete-button" @click="deletePic"><van-icon name="cross" class="delete-icon" /></div>
            <img :src="imgUrl" class="pic" />
          </div>
          
          
          <!-- <van-uploader ref="uploader" v-model="fileList" multiple :max-count="1" @click-upload="uploader" :before-read="beforeRead" /> -->
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
import { Form, Field, Button, Uploader, Icon  } from 'vant'
import { EventBus } from "@/utils/eventBus"

export default {
  name: 'Face',
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
    [Uploader.name]: Uploader,
    [Icon .name]: Icon, 
    Auth
  },
  data() {
    return {
      form: {
        username: '',
        password: '',
        pic: '',
      },
      imgUrl: 'https://ts1.cn.mm.bing.net/th?id=OIP-C.6Lv1RQrwV88Jz3Mz82doIgHaD_&w=340&h=183&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',
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
      this.imgUrl = msg
    })
  },
  methods: {
    uploader() {
// 
    },
    beforeRead() {
      console.log('???????????')
    },
    onSubmit() {
      console.log('=====', this.$refs['uploader'].beforeRead)
    },
    jumpGuidePage() {
      // 跳转指引页面
      this.$router.push('shooting-guide')
    },
    deletePic() {
      this.imgUrl = null
    },
  }
}
</script>
<style lang="scss" scoped>
.face-pic {
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
}
</style>