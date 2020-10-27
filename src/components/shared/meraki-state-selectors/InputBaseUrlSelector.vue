<template>
  <!-- <v-container fluid> -->
    <v-card>
    <v-card-title><v-label>API Service</v-label></v-card-title>
    <v-card-text>
  <v-combobox
    v-model="model"
    :filter="filter"
    :hide-no-data="!search"
    :items="items"
    item-text="value"
    item-value="value"
    value="apiUrl"
    :search-input.sync="search"
    label="Select an API or paste in an OAS JSON link"
    solo
    small-chips
  >
    <!-- <template v-slot:no-data>
      <v-list-item>
        <span class="subheading"><v-btn @click="items.push(model)">Add API<v-btn /></v-btn></span>
      </v-list-item>
    </template> -->
    <template v-slot:selection="{ attrs, item, parent, selected }">
      <v-chip
        v-if="item === Object(item)"
        v-bind="attrs"
        :color="`${item.color} `"
        :input-value="selected"
        label
        small
      >
        <span class="pr-2">
          {{ item.text }}
        </span>
        <v-icon

          @click="parent.selectItem(item)"
        />
      </v-chip>
    </template>
    <template v-slot:item="{ index, item }">
      <v-text-field
        v-if="editing === item"
        v-model="editing.text"
        autofocus
        flat
        background-color="transparent"

        solo
        @keyup.enter="edit(index, item)"
      />
      <v-chip
        v-else
        :color="`${item.color} `"
        dark
        label
        small
      >
        {{ item.text }}
      </v-chip>
      <v-spacer />
      <v-list-item-action v-if="item.custom" @click.stop>
        <v-btn
          icon
          @click.stop.prevent="edit(index, item)"
        >
          <v-icon>{{ editing !== item ? 'mdi-pencil' : 'mdi-check' }}</v-icon>
        </v-btn>
      </v-list-item-action>
    </template>
  </v-combobox>

    <i>{{form.apiUrl}}</i>
      <!-- <v-text-field label="API Base URL" v-model="form.apiUrl" @change="updateApiUrl"></v-text-field> -->
    </v-card-text>
  </v-card>
</template>
  <!-- </v-container> -->
</template>
<script>
export default {
  data: () => ({
    activator: null,
    attach: null,
    colors: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'],
    editing: null,
    index: -1,
    items: [
      { header: 'Select an API or paste proxy URL' },
      {
        text: 'Meraki API v1',
        value:
            'https://api.meraki.com/api/v1',
        color: 'green'
      },
      {
        text: 'Meraki API v0',
        value:
            'https://api.meraki.com/api/v0',
        color: 'green'
      },
      {
        text: 'dev',
        value:
            'http://localhost:8080/api',
        color: 'grey'
      }
    ],
    nonce: 1,
    menu: false,
    form: {
        apiUrl: ""
      },
    model:
      {
        // text: 'Meraki API v1',
        // value: 'https://api.meraki.com/api/v1',
        // color: 'green'
      },
    x: 0,
    search: null,
    y: 0
  }),
  computed: {
    apiUrl: function() {
      return this.$store.state.apiUrl;
    }
  },
  mounted: function() {
    this.model.value = this.apiUrl;
  },
  watch: {
    model (val, prev) {
      if (!val) { return }
      if (val === prev) { return }
      if (typeof val === 'string') {
        const v = {
          text: val,
          value: val,
          custom: true

        }

        this.items.push(v)

        this.nonce++
      }
      console.log('specSelected', this.model)
      this.$emit('change', this.model)
    }
  },
  created () {
    
    //this.$emit('change', this.model)
  },

  methods: {
    edit (index, item) {
      if (!this.editing) {
        this.editing = item
        this.index = index
      } else {
        this.editing = null
        this.index = -1
      }
    },
    filter (item, queryText, itemText) {
      if (item.header) { return false }

      const hasValue = val => val != null ? val : ''

      const text = hasValue(itemText)
      const query = hasValue(queryText)

      return text.toString()
        .toLowerCase()
        .includes(query.toString().toLowerCase())
    }
  }
}
</script>
