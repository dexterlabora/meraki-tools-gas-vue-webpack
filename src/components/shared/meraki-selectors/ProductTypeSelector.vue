<template id="product-type-selector">
  <div>
    <v-select
      v-bind:items="productTypes"
      v-model="form.productType"
      autofocus
      label="Product Type"
      clearable
    ></v-select>
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  template: "#product-type-selector",
  props: ["productType"],
  data() {
    return {
      form: {
        productType: ""
      },
      productTypes: ["appliance", "camera", "switch", "wireless"]
    };
  },
  methods: {},
  watch: {
    "form.productType"() {
      this.$emit("onChange", { productType: this.form.productType });
    }
  },
  mounted() {
    this.form.productType = this.productType;
  }
});
</script>

<style scoped>
</style>