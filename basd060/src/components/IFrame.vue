<template>
  <v-card flat>
    <iframe
      id="iFrame"
      :src="src"
      frameborder="0"
      scrolling="no"
      width="100%"
      height="450px"
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
  name: "IFrame",
  props: {
    src: {
      type: String,
      default:
        "http://gfcweb/gfc/IDe25b8e68fa1246/?MIval=/gfc/prgr100.html&lang=T",
    },
  },
  data() {
    return {
      progress: false,
    };
  },
  mounted() {
    this.progress = true;
    let iFrame = document.getElementById("iFrame");
    iFrame.onload = () => {
      this.progress = false;
    };
  },
};
</script>
<style></style>
