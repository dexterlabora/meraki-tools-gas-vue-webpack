<template id="net-select">
  <v-layout row>
    <v-flex xs12 sm6 md6 pt-2>
      <v-select
        v-bind:items="nets"
        item-text="name"
        item-value="id"
        return-object
        v-model="form.net"
        label="Networks"
      ></v-select>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios";
import Vue from "vue";
export default Vue.extend({
  template: "#net-select",
  props: {
    apiKey: {
      type: String,
      defaul: ""
    },
    apiUrl: {
      type: String,
      defaul: ""
    },
    org: {
      type: String,
      defaul: ""
    }
  },
  data() {
    return {
      form: {
        net: {
          id: "",
          name: ""
        }
      },
      nets: []
    };
  },
  created() {
    this.fetchNets();
  },
  methods: {
    fetchNets: function() {
      this.nets = [];
      this.form.net = {
        id: "",
        name: ""
      };
      if (!this.org.id) {
        return;
      }
      axios
        .get(`${this.apiUrl}/organizations/${this.org.id}/networks`)
        .then(res => {
          this.nets = res.data;
          this.form.net = this.nets[0]; // set default
          //this.$store.commit("setNets", this.nets); // set state
          this.$event.emit("nets", this.nets);
        });
    }
  },
  watch: {
    org() {
      this.fetchNets();
    },
    "form.net"() {
      this.$event.emit("net", this.form.net);
      //this.$store.commit("setNet", this.form.net); // set state
    }
  }
});
</script>
