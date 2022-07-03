<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
body,html {
  padding: 0;
  margin: 0;
  height: 100%;
}
#app {
  height: 100%;
  color: #333;
  background-color: $--background-color;
  font-family: PingFangSC-Regular, sans-serif;
}
</style>
