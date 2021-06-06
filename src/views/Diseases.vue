<template>
  <div id="hi">
    <br/>
    <v-container

    >
        <v-card class="pa-6 ma-6">
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
                :loading="loading"
            />
            <v-card-text>
                Source: Wikipedia (Webscraped)
            </v-card-text>
        </v-card>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import { postRequest } from '../helpers';

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
                text: 'Frequency',
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
          let self = this;

        postRequest('diseases/', {}, function(result){
            self.data = result;
            self.loading = false;
        });
      }
  },
  mounted: function(){
      this.data = this.getData();
  }
}
</script>

<style scoped>
#hi{
  top:50%;
  font-weight:lighter;
}
</style>