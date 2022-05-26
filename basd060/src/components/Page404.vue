<template>
  <v-sheet class="ma-10"
    >找不到程式...<v-btn @click="$router.go(-1)">回上頁</v-btn></v-sheet
  >
</template>
<script>
export default {
  name: "Page404",
  data() {
    return {};
  },
};
</script>