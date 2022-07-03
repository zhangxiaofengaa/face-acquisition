<template>
  <div>
    <div class="search-main">
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        show-action
        shape="round"
      >
        <div slot="action">搜索</div>
      </van-search>
    </div>

    <van-cell title="单元格" value="内容" />
    <van-cell title="单元格" value="内容" />
    <van-cell title="单元格" >
      <template #default>
        <van-uploader v-model="fileList" :before-read="beforeRead"/>
      </template>
    </van-cell>
  </div>
</template>
<script>
import { Search, Cell, Uploader  } from 'vant'

export default {
  name: 'Test',
  components: {
    [Search.name]: Search,
    [Cell.name]: Cell,
    [Uploader.name]: Uploader 
  },
  data() {
    return {
      value: '',
      fileList: []
    }
  },
  methods: {
    beforeRead(file) {
      console.log('上传前',file)
    }
  }
}
</script>
<style lang="scss" scoped>
.search-main {
  height: 100px;
}
.van-cell {
  height: 200px;
  line-height: 100px;
}
.van-cell__title {
  flex: unset;
  width: 100px;
  margin-right: 20px;
}
.van-cell__value {
  text-align: left;
}
/deep/ .van-uploader__upload {
  border: 1px solid red ;
  margin: 0;
}
/deep/.van-icon::before {
  content: '+';
  color: red;
}
</style>