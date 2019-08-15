<template id="snackbar">
  <div>
    <v-snackbar v-model="show" bottom multi-line :timeout="3000">
      {{ message }}
      <v-btn color="pink" @click.native="show = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  template: "#snackbar",

  data() {
    return {
      message: "",
      show: false
    };
  },
  computed: {
    snackbar: function() {
      return this.$store.state.snackbar;
    }
  },
  watch: {
    snackbar: function() {
      console.log("Snackbar.vue watch msg", this.snackbar.msg);
      const msg = this.snackbar.msg;
      if (msg !== "") {
        this.show = true;
        this.message = this.snackbar.msg;
        this.$store.commit("setSnackbar", { msg: "", color: "default" });
      }
    }
  }
  /*
  created: function() {
    // Snackbar
    this.$store.watch(
      state => state.snackbar.msg,
      () => {
        console.log("Snackbar.vue watch msg", this.$store.state.snackbar.msg);
        const msg = this.$store.state.snackbar.msg;
        if (msg !== "") {
          this.show = true;
          this.message = this.$store.state.snackbar.msg;
          this.$store.commit("setSnack", { msg: "", color: "default" });
        }
      }
    );
  }
  */
});
</script>

<style scoped>
</style>