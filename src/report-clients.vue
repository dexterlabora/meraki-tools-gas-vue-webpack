<template id="report-clients">
  <div>
    <v-btn fab fixed bottom center dark color="primary" @click="onRunReport">
      <v-icon>view_list</v-icon>
    </v-btn>
    <v-flex xs12 sm12 d-flex>
      <v-select
        v-model="selectedReport"
        :items="reports"
        item-text="title"
        return-object
        label="Client Reports"
        outline
      ></v-select>
    </v-flex>
    <v-flex xs12 sm12 d-flex>
      <v-switch label="Net-wide Search" v-model="isNetSearch" v-if="netSearchToggle"></v-switch>
    </v-flex>
    <v-flex xs12 sm12 d-flex>
      <v-text-field v-model="timespan" label="Timespan" placeholder="Seconds i.e 7200"></v-text-field>
    </v-flex>
    <v-flex xs12 sm12 d-flex>
      <v-select
        v-bind:items="devices"
        item-text="name"
        item-value="serial"
        return-object
        v-model="device"
        label="Device"
        v-if="deviceSelector"
      ></v-select>
    </v-flex>
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  template: "#report-clients",
  data() {
    return {
      timespan: 7200,
      devices: [],
      device: {},
      deviceSelector: false,
      isNetSearch: false,
      netSearchToggle: false,
      selectedReport: {
        title: "",
        action: "",
        formOptions: []
      },
      client: {},
      clients: []
    };
  },
  created: function() {
    this.fetchDevices();
  },
  watch: {
    net: function() {
      this.fetchDevices();
    },
    "selectedReport.formOptions"() {
      if (this.selectedReport.formOptions.includes("deviceSelector")) {
        this.deviceSelector = true;
      } else {
        this.deviceSelector = false;
      }

      if (this.selectedReport.formOptions.includes("netSearchToggle")) {
        this.netSearchToggle = true;
      } else {
        this.netSearchToggle = false;
      }
    }
  },

  computed: {
    apiKey: function() {
      return this.$store.state.apiKey;
    },
    net: function() {
      return this.$store.state.net;
    },
    reports: function() {
      return [
        {
          title: "List Clients",
          action: this.reportDeviceClients,
          formOptions: ["netSearchToggle", "deviceSelector"]
        }
        /*
          {
            title: "List Device Clients - old",
            action: this.reportDeviceClients,
            formOptions: ["deviceSelector"]
          }
          */
      ];
    }
  },
  methods: {
    writeSheet(json) {
      const csv = json2csv.parse(json);
      google.script.run.writeCsvData(csv);
    },
    onRunReport() {
      var devices = [];
      if (this.isNetSearch) {
        devices = this.devices;
      } else {
        devices[0] = this.device;
      }
      this.selectedReport.action(devices);
    },
    fetchDevices() {
      meraki.getNetworkDevices(this.apiKey, this.net.id).then(res => {
        this.devices = res;
        this.device = this.devices[0]; // set default device
      });
    },
    // REPORTS
    reportDeviceClients(devices) {
      var clients = [];
      for (var i = 0; i < devices.length; i++) {
        meraki
          .getDeviceClients(this.apiKey, devices[i].serial, this.timespan)
          .then(res => {
            console.log("pushing client, ", res);
            clients = clients.concat(res);
          })
          .catch(err => {
            console.log("getClients error: ", err);
          })
          .finally(() => {
            if (i === devices.length) {
              console.log("writingSheet: ", clients);
              this.writeSheet(clients);
            }
          });
      }

      /*
        meraki.clients.getSsids(this.apiKey, this.device.id).then(res => {
          console.log("reportClients res: ", res);
          this.writeSheet(res);
        });
        */
    }
    /*
      reportDeviceClients() {
        meraki.clients
          .getDeviceClients(this.apiKey, this.net.id, this.device.serial, 7200)
          .then(res => {
            this.writeSheet(res);
          });
      }
      */
  }
});
</script>
