<template id="tool-configure-ssid">
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
        v-if="ssidUpdated.name"
      >
        <v-icon>view_list</v-icon>
      </v-btn>
      <v-btn :loading="loading" fab fixed bottom right dark color="orange" @click="updateSsid()">
        <v-icon dark>check</v-icon>
      </v-btn>
      <v-flex xs12 sm12>
        <v-flex xs12 sm12>
          <v-card>
            <v-list two-line subheader>
              <v-subheader>Wireless Networks</v-subheader>
              <v-list-tile avatar>
                <v-list-tile-content>
                  <v-select
                    v-bind:items="ssids"
                    item-text="name"
                    item-value="number"
                    return-object
                    v-model="ssid"
                    label="SSID"
                  ></v-select>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
            <v-list>
              <v-list-tile avatar>
                <v-list-tile-action>
                  <v-switch v-model="ssidForm.enabled"></v-switch>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>Enable Network</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
            <v-list two-line subheader>
              <v-subheader>General</v-subheader>
              <v-list-tile avatar>
                <v-list-tile-content>
                  <v-text-field v-model="ssidForm.name" label="SSID Name" required></v-text-field>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile avatar v-if="ssidForm.authMode == 'psk'">
                <v-list-tile-content>
                  <v-text-field v-model="ssidForm.psk" label="Pre-shared key"></v-text-field>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>

            <v-list two-line subheader v-if="adminMode">
              <v-divider></v-divider>
              <v-subheader>Advanced Settings</v-subheader>
              <v-list-tile avatar>
                <v-list-tile-content>
                  <v-select
                    v-bind:items="ssidOptions.authMode"
                    return-object
                    v-model="ssidForm.authMode"
                    label="Authentication"
                  ></v-select>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile avatar>
                <v-list-tile-content>
                  <v-select
                    v-bind:items="ssidOptions.encryptionMode"
                    return-object
                    v-model="ssidForm.encryptionMode"
                    label="Encryption"
                  ></v-select>
                </v-list-tile-content>
              </v-list-tile>

              <v-list-tile avatar>
                <v-list-tile-content>
                  <v-select
                    v-bind:items="ssidOptions.wpaEncryptionMode"
                    return-object
                    v-model="ssidForm.wpaEncryptionMode"
                    label="WPA Encryption"
                  ></v-select>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>

            <v-divider></v-divider>
            <v-list two-line subheader v-if="adminMode">
              <v-subheader>Splash Page</v-subheader>

              <v-list-tile avatar>
                <v-list-tile-content>
                  <v-select
                    v-bind:items="ssidOptions.splashPage"
                    return-object
                    v-model="ssidForm.splashPage"
                    label="Method"
                  ></v-select>
                </v-list-tile-content>
              </v-list-tile>

              <v-list-tile avatar>
                <v-list-tile-action>
                  <v-checkbox v-model="ssidForm.walledGardenEnabled"></v-checkbox>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>Walled Garden</v-list-tile-title>
                  <v-list-tile-sub-title>
                    Allow access to remote servers prior to
                    authentication
                  </v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-list-tile avatar v-if="ssidForm.walledGardenEnabled">
                <v-list-tile-content>
                  <v-list-tile-title>Walled Garden Ranges</v-list-tile-title>
                  <v-text-field
                    v-model="ssidForm.walledGardenRanges"
                    label="e.g. 192.168.1.1/24 192.168.37.10/32"
                  ></v-text-field>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
            <v-divider></v-divider>
            <v-list two-line subheader v-if="adminMode">
              <v-subheader>Radio Settings</v-subheader>

              <v-list-tile avatar>
                <v-list-tile-content>
                  <v-select
                    v-bind:items="ssidOptions.minBitrate"
                    return-object
                    v-model="ssidForm.minBitrate"
                    label="Minimum bitrate"
                  ></v-select>
                </v-list-tile-content>
              </v-list-tile>

              <v-list-tile avatar>
                <v-list-tile-content>
                  <v-select
                    v-bind:items="ssidOptions.bandSelection"
                    return-object
                    v-model="ssidForm.bandSelection"
                    label="Band Selection"
                  ></v-select>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
        <v-flex xs12 sm12 pt-1 v-if="ssidUpdated.name">
          <v-card>
            <v-card-title>
              <h3>SSID Updated</h3>
            </v-card-title>
            <v-card-text p1>
              <div v-for="(value, key) in ssidUpdated" :key="key.number">
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
  template: "#tool-configure-ssid",
  data() {
    return {
      ssidUpdated: {},
      ssidNum: 0,
      ssid: {},
      ssids: [],
      ssidForm: [],
      ssidOptions: {
        authMode: [
          "open",
          "psk",
          "open-with-radius",
          "8021x-meraki",
          "8021x-radius"
        ],
        encryptionMode: ["wpa", "wep", "wpa-eap"],
        psk: String,
        wpaEncryptionMode: ["WPA1 and WPA2", "WPA2 only"],
        splashPage: [
          "None",
          "Click-through splash page",
          "Billing",
          "Password-protected with Meraki RADIUS",
          "Password-protected with custom RADIUS",
          "Password-protected with Active Directory",
          "Password-protected with LDAP",
          "SMS authentication",
          "Systems Manager Sentry",
          "Facebook Wi-Fi"
        ],
        minBitrate: [1, 2, 5.5, 6, 9, 11, 12, 18, 24, 36, 48, 54],
        bandSelection: [
          "Dual band operation",
          "5 GHz band only",
          "Dual band operation with Band Steering"
        ]
      }
    };
  },

  computed: {
    apiKey: function() {
      return this.$store.state.apiKey;
    },
    net: function() {
      return this.$store.state.net;
    },
    adminMode: function() {
      return true; //this.$store.state.adminMode;
    },
    loading: function() {
      return this.$store.state.loading;
    }
  },
  watch: {
    net: function() {
      this.ssids = [];
      this.ssid = {};
      if (
        this.net.type.includes("wireless") ||
        this.net.type.includes("combined")
      ) {
        this.fetchSsids();
      } else {
        //this.notify('error', 'Not a wireless network')
        return;
      }
    },
    ssid: function() {
      //copy the ssid into the form
      this.ssidForm = Object.assign({}, this.ssid);
    }
  },
  created: function() {
    this.$store.commit("setLoading", false); // improve this
    this.fetchSsids();
  },
  methods: {
    onWriteSheet: function() {
      this.$utilities.writeData(this.ssidUpdated, google);
    },
    fetchSsids: function() {
      if (!this.net.id) {
        return;
      }

      this.$merakiSdk.SSIDsController.getNetworkSsids(this.net.id).then(res => {
        console.log("getNetworkSsids res.data", res.data);
        this.ssids = res;
        this.ssid = this.ssids[this.ssidNum]; // set selected ssid
      });
    },
    updateSsid: function($index) {
      this.$store.commit("setLoading", true);
      console.log("updateSsid form", this.ssidForm);
      this.$merakiSdk.SSIDsController.updateNetworkSsid(
        this.net.id,
        this.ssidForm.number,
        this.ssidForm
      )
        .then(res => {
          this.ssidUpdated = res;
          this.fetchSsids(); // get clean copy of SSID list and update form
          console.log("SSID updated!", res);
        })
        .catch(err => {
          console.log("SSID update Error: ", err);
        })
        .finally(() => {
          this.$store.commit("setLoading", false);
        });
    }
  }
});
</script>
