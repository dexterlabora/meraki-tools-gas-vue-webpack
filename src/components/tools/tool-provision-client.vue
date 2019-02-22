<template id="tool-provision-client">
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
        v-if="provisionedClient.name"
      >
        <v-icon>view_list</v-icon>
      </v-btn>
      <v-btn
        :loading="loading"
        fab
        fixed
        bottom
        right
        dark
        color="orange"
        @click="onProvisionClient()"
      >
        <v-icon dark>check</v-icon>
      </v-btn>
      <v-flex xs12 sm12>
        <v-flex xs12 sm12>
          <v-card>
            <v-card-title>
              <h3>Create a Client</h3>
            </v-card-title>
            <v-card-text p1>
              <p>
                <i>{{ net.name }}</i>
              </p>
              <v-flex xs12 md12 pt-4>
                <v-text-field v-model="form.name" label="Client Name"></v-text-field>

                <v-text-field v-model="form.mac" label="Client MAC"></v-text-field>
                <v-select
                  :items="devicePolicies"
                  v-model="form.devicePolicy"
                  label="Policy Type"
                  single-line
                ></v-select>
                <v-select
                  v-if="form.devicePolicy == 'Group policy'"
                  :items="policies"
                  item-text="name"
                  item-value="groupPolicyId"
                  v-model="form.groupPolicyId"
                  label="Select Group Policy"
                  single-line
                ></v-select>
                <!--v-btn color="success" right round @click="onProvisionClient">
                  <v-icon>add</v-icon> Create
                </v-btn-->
              </v-flex>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs12 sm12 pt-1 v-if="provisionedClient.clientId">
          <v-card>
            <v-card-title>
              <h3>Client Provisioned</h3>
            </v-card-title>
            <v-card-text p1>
              <p>
                <b>Name:</b>
                {{ provisionedClient.name }}
              </p>
              <p>
                <b>ID:</b>
                {{ provisionedClient.clientId }}
              </p>
              <p>
                <b>MAC:</b>
                {{ provisionedClient.mac }}
              </p>
              <p>
                <b>Policy Name:</b>
                {{ provisionedClient.devicePolicy }}
              </p>
              <p>
                <b>Policy ID:</b>
                {{ provisionedClient.groupPolicyId }}
              </p>
              <!--v-btn color="primary" right round @click="onWriteSheet">
                <v-icon>view_list</v-icon> Report
              </v-btn-->
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
  template: "#tool-provision-client",
  mounted() {
    this.fetchPolicies();
  },
  data() {
    return {
      devicePolicies: ["Whitelisted", "Blocked", "Group policy"],
      provisionedClient: {},
      policies: [],
      form: {
        mac: "",
        name: "",
        groupPolicyId: "",
        devicePolicy: "" //not configurable
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
    loading: function() {
      return this.$store.state.loading;
    }
  },
  watch: {
    "net.id"() {
      this.fetchPolicies();
    },
    policies() {
      // set default policy
      this.form.policy = this.policies[0];
    }
  },
  methods: {
    onWriteSheet: function() {
      console.log(this.provisionedClient);
      if (typeof google !== "undefined") {
        this.$utilities.writeData(this.provisionedClient, google);
      }
    },
    fetchPolicies: function() {
      if (!this.net) {
        return;
      }

      this.$merakiSdk.GroupPoliciesController.getNetworkGroupPolicies(
        this.net.id
      ).then(res => {
        this.policies = res;
        this.policy =
          this.policies.find(policy => policy.id == this.policyId) ||
          this.policies[0]; //this.vlans[this.ssidNum]; // set selected ssid
      });
    },
    onProvisionClient() {
      this.$store.commit("setLoading", true);
      this.$merakiSdk.ClientsController.createProvisionNetworkClients(
        this.net.id,
        this.form
      )
        .then(res => {
          this.provisionedClient = res;
        })
        .catch(err => {
          console.log("client provision Error: ", err);
        })
        .finally(() => {
          this.$store.commit("setLoading", false);
        });
    }
  }
});
</script>
