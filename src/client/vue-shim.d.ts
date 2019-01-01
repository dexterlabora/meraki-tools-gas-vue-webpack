/**
 * TypeScript doesn't play perfectly nicely with vue yet. This ensures that
 * TypeScript's IntelliSense will understand the import of a .vue file.
 */
declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}
