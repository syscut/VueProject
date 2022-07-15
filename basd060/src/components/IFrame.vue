<template>
  <v-card flat>
    <iframe
      id="iFrame"
      :src="'http://gfcweb/gfc/gfc/' + src + '.html'"
      frameborder="0"
      scrolling="no"
      width="100%"
      height="475px"
    ></iframe>
    <v-dialog v-model="progress" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          連線中...
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script>
export default {
  name: "iFrame",
  props: {
    src: {
      default: "prgr100",
    },
  },
  data() {
    return {
      progress: false,
    };
  },
  watch: {
    src() {
      this.progress = true;
    },
  },
  methods: {},
  mounted() {
    this.progress = true;
    let iFrame = document.getElementById("iFrame");
    iFrame.onload = () => {
      // console.log(iFrame.contentWindow.browsingContext);
      this.progress = false;
    };
  },
};
</script>
<style></style>
