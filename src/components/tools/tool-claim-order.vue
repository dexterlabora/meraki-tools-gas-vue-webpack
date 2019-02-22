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
      <v-btn :loading="loading" fab fixed bottom right dark color="orange" @click="onClaim()">
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
              <v-btn @click="showScanner = !showScanner">Barcode Scanner</v-btn>
              <quagga-scanner
                v-if="showScanner"
                :onDetected="onScanner"
                :readerSize="readerSize"
                :readerType="'ean_reader'"
              ></quagga-scanner>
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

    <v-snackbar v-model="snackbar" bottom multi-line :timeout="3000">
      {{ snackbarText }}
      <v-btn color="pink" flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import Vue from "vue";
import { QuaggaScanner } from "vue-quaggajs";

export default Vue.extend({
  template: "#tool-claim-order",
  components: {
    QuaggaScanner
  },
  data() {
    return {
      showScanner: false,
      readerSize: {
        width: 640,
        height: 480
      },
      snackbar: false,
      snackbarText: "",
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
    org: function() {
      return this.$store.state.org;
    },
    loading: function() {
      return this.$store.state.loading;
    }
  },
  methods: {
    onScanner: function(res) {
      console.log("scanner res", res);
    },
    onWriteSheet: function() {
      this.$utilities.writeData(this.orderClaimed);
    },
    onClaim() {
      this.$store.commit("setLoading", true);
      var body = {};
      if (this.form.type == "licenseKey") {
        body["licenseMode"] = this.form.licenseMode;
      }
      body[this.form.type] = this.form.value;

      this.$merakiSdk.OrganizationsController.createClaimOrganization(
        this.org.id,
        body
      )
        .then(res => {
          // this endpoint does not return any data other than status code 200
          // so just pull license info entirely
          this.$merakiSdk.OrganizationsController.getOrganizationLicenseState(
            this.org.id
          ).then(res => {
            this.orderClaimed = res;
          });
        })
        .catch(err => {
          console.log("claim Error: ", err);
          this.onSnackbar(JSON.parse(err.errorResponse).errors[0]);
        })
        .finally(() => {
          this.$store.commit("setLoading", false);
        });
    },
    onSnackbar(msg) {
      this.snackbarText = msg;
      this.snackbar = true;
    }
  }
});
</script>
