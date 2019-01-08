<template id="tool-configure-vlan">
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
        v-if="updatedVlan.name"
      >
        <v-icon>view_list</v-icon>
      </v-btn>
      <v-btn fab fixed bottom right dark color="orange" @click="updateVlan()">
        <v-icon dark>check</v-icon>
      </v-btn>
      <v-flex xs12 sm12>
        <v-flex xs12 sm6>
          <v-card>
            <v-list two-line subheader>
              <v-subheader>Update a VLAN</v-subheader>
              <v-list-tile avatar>
                <v-list-tile-content>
                  <v-select
                    v-bind:items="vlans"
                    item-text="name"
                    return-object
                    v-model="vlan"
                    label="vlan"
                  ></v-select>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>

            <v-list two-line subheader>
              <v-subheader>Settings</v-subheader>

              <v-list-tile avatar>
                <v-list-tile-content>
                  <v-text-field v-model="vlanForm.id" label="ID" disabled></v-text-field>
                </v-list-tile-content>
              </v-list-tile>

              <v-list-tile avatar>
                <v-list-tile-content>
                  <v-text-field v-model="vlanForm.name" label="Name"></v-text-field>
                </v-list-tile-content>
              </v-list-tile>

              <v-list-tile avatar>
                <v-list-tile-content>
                  <v-text-field v-model="vlanForm.subnet" label="Subnet"></v-text-field>
                </v-list-tile-content>
              </v-list-tile>

              <v-list-tile avatar>
                <v-list-tile-content>
                  <v-text-field v-model="vlanForm.applianceIp" label="Appliance IP"></v-text-field>
                </v-list-tile-content>
              </v-list-tile>
              <!--
              TO DO - break out object options
              <v-list-tile-content>
                  <v-text-field
                    v-model="vlanForm.fixedIpAssignments"
                    label="Fixed IP Assignments"

                  ></v-text-field>
                </v-list-tile-content>
              </v-list-tile>

              <v-list-tile-content>
                  <v-text-field
                    v-model="vlanForm.reservedIpRanges"
                    label="Reserved IP Ranges"

                  ></v-text-field>
                </v-list-tile-content>
              </v-list-tile>
              -->
              <v-list-tile avatar>
                <v-list-tile-content>
                  <v-text-field v-model="vlanForm.vpnNatSubnet" label="VPN NAT Subnet"></v-text-field>
                </v-list-tile-content>
              </v-list-tile>

              <v-list-tile avatar>
                <v-list-tile-content>
                  <v-select
                    v-bind:items="vlanOptions.dnsNameservers"
                    return-object
                    v-model="vlanForm.dnsNameservers"
                    label="DNS Nameservers"
                  ></v-select>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
        <v-flex xs12 sm12 pt-1 v-if="updatedVlan.name">
          <v-card>
            <v-card-title>
              <h3>VLAN Updated</h3>
            </v-card-title>
            <v-card-text p1>
              <div v-for="(value, key) in updatedVlan" :key="key.id">
                <b>{{ key }}:</b>
                {{ value }}
              </div>
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
  template: "#tool-configure-vlan",
  data() {
    return {
      updatedVlan: {
        name: "",
        subnet: "",
        applianceIp: "",
        fixedIpAssignment: "",
        reservedIpRanges: "",
        vpnNatSubnet: ""
      },
      vlanId: 0,
      vlan: {},
      vlans: [],
      vlanForm: [],
      vlanOptions: {
        /*
            name: "",
            subnet: "",
            applianceIp: "",
            fixedIpAssignment:"",
            reservedIpRanges:"",
            vpnNatSubnet:"",
            */
        dnsNameservers: [
          "upstream_dns",
          "upstream_dns",
          "google_dns",
          "open_dns"
        ] // add custom IP addresses and domain names
      }
    };
  },

  computed: {
    net: function() {
      return this.$store.state.net;
    }
  },
  watch: {
    net: function() {
      this.fetchVlans();
    },
    vlan: function() {
      //copy the vlan into the form
      this.vlanForm = Object.assign({}, this.vlan);
    },
    vlanForm: function(change) {
      console.log("vlanForm changes: ", change);
    }
  },
  created: function() {
    this.fetchVlans();
  },
  methods: {
    onWriteSheet: function() {
      this.$utilities.writeData(this.updatedVlan, google);
    },
    fetchVlans: function() {
      if (!this.net) {
        return;
      }

      this.$meraki.getNetworkVlans({ networkId: this.net.id }).then(res => {
        this.vlans = res.data;
        this.vlan =
          this.vlans.find(vlan => vlan.id == this.vlanId) || this.vlans[0]; //this.vlans[this.ssidNum]; // set selected ssid
      });
    },
    updateVlan: function() {
      //console.log("updating vlan ", this.vlan);
      //console.log("vlanForm ", this.vlanForm);

      this.vlanId = this.vlanForm.id; // save vlan ID for use after refresh

      var data = this.vlanForm;
      delete data.id; //not required in body
      delete data.fixedIpAssignments; // debugging
      delete data.reservedIpRanges; // debugging

      console.log("data: ", data);
      this.$meraki
        .updateNetworkVlan({
          networkId: this.net.id,
          vlanId: this.vlan.id,
          body: this.vlanForm //data
        })
        .then(res => {
          this.updatedVlan = res.data;
          this.fetchVlans(); // get clean copy of VLANs list and update form
          console.log("VLANs updated!", res.data);
        })
        .catch(err => {
          console.log("VLAN update Error: ", err);
        });
    }
  }
});
</script>
