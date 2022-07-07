<template>
  <div class="card-main">
    <div class="top">
      <div class="one-level-title">人脸认证</div>
      <div class="color-orange" @click="jumpCommonProblemPage">采集遇到问题？</div>
    </div>
    
    <div class="desc-content">请将正面照完整拍摄，否则会影响识别</div>
    <div class="card">
      
    </div>
    <div class="tips">
      没带证件？<span class="color-blue">使用学工号采集备份</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Auth',
  methods: {
    jumpCommonProblemPage() {
      this.$router.push('common-problem')
    }
  },
}
</script>
<style lang="scss" scoped>
.card-main {
  width: 100%;
  height: 588px;
  padding:  32px 32px 30px;
  margin-bottom: 20px;
  background-color: $--background-white;
  box-sizing: border-box;
  font-size: $--font-size-base;
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .color-orange {
    color: $--color-orange;
  }

  .desc-content {
    margin-bottom: 32px;
  }

  .card {
    background:#F5F7F9 url(../../../../assets/image/card.png) no-repeat center;
    background-size: 448px 296px;
    width: 492px;
    height: 331px;
    margin: 0 auto;
  }

  .tips {
    text-align: center;
    margin-top: 20px;
  }

  .color-blue {
    color: $--color-blue;
  }
}
</style>