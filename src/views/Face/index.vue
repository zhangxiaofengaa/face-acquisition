<template>
  <div class="face-acquisition-page">
    <Auth :isPicLoading.sync="isPicLoading" @getInfo="getInfo"></Auth>
    <van-form @submit="onSubmit">
      <!-- <van-field
        required
        readonly
        v-model="form.personName"
        name="人员姓名"
        label="人员姓名"
        placeholder="根据身份证自动识别"
        :error="errorTips.errorPersonName"
      />
      <van-field
        required
        readonly
        v-model="form.idNum"
        name="身份证号"
        label="身份证号"
        placeholder="根据身份证自动识别"
        :error="errorTips.errorIdNum"
      /> -->
      <van-field
          v-model.trim="form.personName"
          ref="personName"
          name="姓名"
          label="姓名"
          placeholder="自动识别身份证信息"
          required
          maxlength="50"
          :error="errorInput"
          :readonly="formDisabled.personName"
          @blur="handleFormFocus('personName', false)"
        >
          <span v-if="showEdit" class="color-orange" slot="button" @click.prevent="handleFormFocus('personName')">修改</span>
        </van-field>
        <van-field
          v-model.trim="form.idNum"
          name="身份证号"
          label="身份证号"
          placeholder="自动识别身份证信息"
          required
          :error="errorInput"
          :readonly="true"
        />
      <van-field required v-model="form.pic" name="人脸照片" label="人脸照片">
        <template #input>
          <div class="uploader-entrance" @click="jumpGuidePage" v-if="!faceImgUrl"></div>
          <div class="face-pic-main" v-else>
            <div class="delete-button" @click="deletePic">
              <van-icon name="cross" class="delete-icon" />
            </div>
            <img :src="faceImgUrl" class="pic" @click="imagePreview(faceImgUrl)" />
          </div>
        </template>
      </van-field>
      <div class="button-main">
        <van-button block type="info" :disabled="disabledSubmit" native-type="submit">提交</van-button>
      </div>
    </van-form>

    <van-loading class="loading" v-if="isPicLoading">上传中...</van-loading>
  </div>
</template>

<script>
import './index.scss'
import { Auth } from './components'
import { Form, Field, Button, Uploader, Icon, ImagePreview, Dialog, Notify, Loading } from 'vant'
import { EventBus } from "@/utils/eventBus"
export default {
  name: 'Face',
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
    [Uploader.name]: Uploader,
    [Icon.name]: Icon,
    [ImagePreview.name]: ImagePreview,
    [Dialog.name]: Dialog,
    [Notify.Component.name]: Notify.Component,
    [Loading.name]: Loading,
    Auth
  },
  data() {
    return {
      form: {
        personName: '',
        idNum: '',
        pic: '',
      },
      formDisabled: {
        personName: true
      },
      errorTips: {
        errorPersonName: false,
        errorIdNum: false
      },
      showEdit: false,
      faceImgUrl: 'https://ts1.cn.mm.bing.net/th?id=OIP-C.6Lv1RQrwV88Jz3Mz82doIgHaD_&w=340&h=183&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',
      fileList: [],
      isPicLoading: false,
      errorInput: false
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
    console.log('------', this.$store.state)
    Notify({
      type: 'warning',
      message: '采集前请先确保该人员的身份证号存在于生物库平台中'
    })
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
      //console.log('???????????')
    },
    getInfo(data) {
      console.log('data', data)
      const { idNum, personName } = data

      if (!!personName ) {
        this.form.personName = personName
      } else {
        this.errorTips.errorPersonName = true
        this.form.personName = '识别失败，请重新上传'
      }

      if (!!idNum) {
        this.form.idNum = idNum
      } else {
        this.errorTips.errorIdNum = true
        this.form.idNum = '识别失败，请重新上传'
      }
      
      // this.showEdit = !!data.idNumber
       this.form.idNum = true
    },
    handleFormFocus(name, canFocus = true) {
      this.formDisabled[name] = !canFocus
      this.$nextTick(() => {
        if (canFocus) {
          this.$refs[name].focus()
        }
      })
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