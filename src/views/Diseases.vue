<template>
  <div id="hi">
    <br/>
    <v-container

    >
        <v-card v-if="!loading" class="pa-6 ma-6">
            <span>
            <v-card-title>
                Diseases
            </v-card-title>
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
            />
            </span>
            <v-data-table
                :headers="headers"
                :items="data"
                :search="search"
            />
        </v-card>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Diseases',
  data: function() {
    return {
        headers: [
            {
                text: 'Disease',
                align: 'start',
                sortable: true,
                value: 'name'
            },
            {
                text: 'Specialty',
                value: 'specialty'
            },
            {
                text: 'Frequency (per year)',
                value: 'frequency'
            },
            {
                text: 'Mortality Rate',
                value: 'mortality_rate'
            }
        ],
        data: [],
        search: null,
        loading: true
    }
  },
  methods: {
      getData: function(){
          let self = this
          var req = new XMLHttpRequest();
          req.open("GET", "http://127.0.0.1:8000/diseases/");  // Django backend URL
          req.onload = function(){
              if(req.readyState === 4){
                  if(req.status === 200){
                      self.data = JSON.parse(req.responseText);
                      console.log(self.data);
                  }else{
                      console.error(req.statusText);
                  }
              }
          };
          req.onerror = function() {
              console.error(req.statusText);
          }
          req.send(null);
      }
  },
  mounted: function(){
      this.data = this.getData();
      this.loading = false;
  }
}
</script>

<style scoped>
#hi{
  top:50%;
  font-weight:lighter;
}
</style>