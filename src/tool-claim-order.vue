<template id="tool-claim-order">
  <v-container>
    <v-layout row>
      <v-btn
        fab
        fixed
        bottom
        center
        dark
        color="primary"
        @click="onWriteSheet"
        v-if="orderClaimed.status"
      >
        <v-icon>view_list</v-icon>
      </v-btn>
      <v-btn fab fixed bottom right dark color="orange" @click="onClaim()">
        <v-icon dark>check</v-icon>
      </v-btn>
      <v-flex xs12 sm12>
        <v-flex xs12 md12>
          <v-card>
            <v-card-title>
              <h3>Claim an Order</h3>
              <i>{{ org.name }}</i>
            </v-card-title>
            <v-card-text p1>
              <v-flex xs12 md12 pt-4>
                <v-select
                  v-model="form.type"
                  :items="typeOptions"
                  item-value="value"
                  label="Type"
                  persistent-hint
                  single-line
                ></v-select>
                <v-select
                  v-model="form.licenseMode"
                  :items="licenseModeOptions"
                  item-value="value"
                  label="License Mode"
                  persistent-hint
                  single-line
                  v-if="form.type == 'licenseKey'"
                ></v-select>
                <v-text-field v-model="form.value" label="Order/Serial/License"></v-text-field>
              </v-flex>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12 sm12 pt-1 v-if="orderClaimed">
          <v-card>
            <v-card-title>
              <h3>Order Claimed</h3>
            </v-card-title>
            <v-card-text p1>
              <div v-for="(value, key) in orderClaimed" :key="key.$index">
                <b>{{ key }}:</b>
                {{ value }}
              </div>
              <!--
                v-btn color="primary" right round @click="onWriteSheet">
                  <v-icon>view_list</v-icon> Report
                </v-btn
              -->
            </v-card-text>
          </v-card>
        </v-flex>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  template: "#tool-claim-order",
  data() {
    return {
      orderClaimed: "",
      licenseModeOptions: [
        { text: "Add Devices", value: "addDevices" },
        { text: "Renew", value: "renew" }
      ],
      typeOptions: [
        { text: "Order", value: "order" },
        { text: "Serial", value: "serial" },
        { text: "License Key", value: "licenseKey" }
      ],
      form: {
        value: "",
        type: ""
      },
      payload: {}
    };
  },
  computed: {
    apiKey: function() {
      return this.$store.state.apiKey;
    },
    org: function() {
      return this.$store.state.org;
    }
  },
  methods: {
    writeSheet: function(json) {
      const csv = json2csv.parse(json);
      google.script.run.writeCsvData(csv);
    },
    onWriteSheet: function() {
      this.writeSheet(this.orderClaimed);
    },
    onClaim() {
      var body = {};
      if (this.form.type == "licenseKey") {
        body["licenseMode"] = this.form.licenseMode;
      }
      body[this.form.type] = this.form.value;

      meraki
        .createOrganizationClaim(this.apiKey, this.org.id, body)
        .then(res => {
          // this endpoint does not return any data other than status code 200
          // so just pull license info entirely
          meraki
            .getOrganizationLicenseState(this.apiKey, this.org.id)
            .then(res => {
              this.orderClaimed = res;
            });
        })
        .catch(err => {
          console.log("claim Error: ", err);
        });
    }
  }
});
</script>
