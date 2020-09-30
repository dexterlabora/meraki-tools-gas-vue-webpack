<template>
    <div id="app">
  <v-app id="inspire">
    <v-card
      class="mx-auto"
      width="300"
    >
     <v-toolbar>
       
     
      <v-text-field
        
        flat
        hide-details
        label="Search"
        prepend-inner-icon="search"
        solo-inverted
      ></v-text-field>
      
      
         
        
     
      </v-toolbar>
      <div class="mx-4">
        <v-select
     
      item-text="name"
      item-value="id"
      return-object
    
      label="Organizations"
      mask
    
    ></v-select>
      </div>

      <v-list dense>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>cloud</v-icon>
          </v-list-item-icon>
  
          <v-list-item-title>General</v-list-item-title>
        </v-list-item>
  
        <v-list-group
          prepend-icon="mdi-view-comfy"
          value="true"
        >
          <template v-slot:activator>
            <v-list-item-title>Products</v-list-item-title>
          </template>
  
          <v-list-group
            no-action
            sub-group
            value="true"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Appliance</v-list-item-title>
              </v-list-item-content>
            </template>
  
            <v-list-item
              v-for="(admin, i) in admins"
              :key="i"
              link
            >
              <v-list-item-title v-text="admin[0]"></v-list-item-title>
              <v-list-item-icon>
                <v-icon v-text="admin[1]"></v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
  
          <v-list-group
            sub-group
            no-action
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Cellular Gateway</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="(crud, i) in cruds"
              :key="i"
              @click=""
            >
              <v-list-item-title v-text="crud[0]"></v-list-item-title>
              <v-list-item-action>
                <v-icon v-text="crud[1]"></v-icon>
              </v-list-item-action>
            </v-list-item>
          </v-list-group>
        </v-list-group>
      </v-list>
    </v-card>
  </v-app>
</div>
</template>

<script>
export default {
    new Vue({
  el: '#app',
  vuetify: new Vuetify(),
  data: () => ({
    admins: [
      ['DHCP', 'settings'],
      ['Performance', 'mdi-chart-bar'],
    ],
    cruds: [
      ['Create', 'add'],
      ['Read', 'insert_drive_file'],
      ['Update', 'update'],
      ['Delete', 'delete'],
    ],
  }),
})
}
</script>

