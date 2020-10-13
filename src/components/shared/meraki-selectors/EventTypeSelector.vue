<template id="event-type-selector">
  <v-select
    :items="eventTypes"
    v-model="form.input"
    :label="label"
    item-text="description"
    :menu-props="{ maxHeight: '400' }"
    item-value="type"
    small-chips
    multiple
    clearable
    class="small"
    dense
  >
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-icon color="grey lighten-1" v-on="on">info</v-icon>
      </template>
      {{description}}
    </v-tooltip>
  </v-select>
</template>

<script>
import * as rh from "../../../request-handler.js";
import Vue from "vue";
export default Vue.extend({
  template: "#event-type-selector",
  props: ["label", "description", "param", "networkId"],
  data() {
    return {
      form: {
        input: []
      },
      eventTypes: []
    };
  },
  computed: {
    apiUrl: function() {
      return this.$store.state.apiUrl;
    },
    apiKey: function() {
      return this.$store.state.apiKey;
    },
    inputParsed() {
      return this.form.input.split(" ");
    }
  },
  mounted: function() {
    //this.form.input = this.input;
    this.getEventTypes();
  },
  watch: {
    "form.input"() {
      this.updateInput();
    }
  },
  methods: {
    getEventTypes() {
      let options = {};
      options.url = `networks/${this.networkId}/events/eventTypes`;
      options.method = "get";
      this.$rh.request(options).then(res => {
        this.eventTypes = res.sort(function(a, b) {
          if (a.description < b.description) return -1;
          if (a.description > b.description) return 1;
          return 0;
        });
        //console.log("eventTypes", res);
      });
      /*
      this.$meraki.EventsController.getNetworkEventTypes(res => {
        this.eventTypes = res;
        console.log('eventTypes', res);
      });
      */
    },
    updateInput: function() {
      let event = {};
      event[this.param] = this.form.input;
      this.$emit("onChange", event);
    }
  }
});
</script>
