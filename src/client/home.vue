<template>
  <div>
    Hello World!
  </div>
</template>
<script lang="ts">
import Vue from "vue";

/**
 * Wrapping the export in Vue.extend() gives you TypeScript IntelliSense about the Vue component inside its functions.
 * For example, if you have a prop called "name" and in a method you refer to "this.nname", TypeScript will notice
 * that the component doesn't have such a field and give you an opportunity to fix the typo.
 */
export default Vue.extend({});
</script>