<template>
  <div id="hi">
    <br/>

  <v-container>
    <v-card class="pa-6 ma-6">
     <v-card-title>
        Life Tables
    </v-card-title>
      <v-row>
        <v-col>
          <v-select
            v-model="selectedCountry"
            :items=countries
            item-text="name"
            label="Country"
            :loading="countriesLoading"
            @input="getYears"
          >
          </v-select>
        </v-col>

        <v-col>
          <v-select
            v-model="selectedYear"
            :items=years
            label="Year"
            :disabled="!selectedCountry"
            @input="getData"
          >
          </v-select>
        </v-col>

        <v-col>
          <v-select
            v-model="selectedSex"
            :items=sexes
            label="Sex"
            @input="getData"
          >
          </v-select>
        </v-col>
      </v-row>
      <highcharts
        :options="chartOptions"
      />
      <v-card-text>
        Source: Human Mortality Database
      </v-card-text>
    </v-card>
  </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import postRequest from '../helpers';
import { Chart } from 'highcharts-vue';

export default {
  name: 'LifeTables',
  components: {
    highcharts: Chart
  },
  data: function() {
    return {
      tables: [],
      years: [],
      sexes: ['Male','Female'],
      countries: [],
      countriesLoading:true,
      selectedCountry:null,
      selectedYear:null,
      selectedSex:null,
      //alive_series: [],
      chartOptions: {
        title: {
          text: "Life Table",
        },
        chart: {
          type: 'area',
        },
        plotOptions: {
        },
        xAxis: {
          title: {
            text: "Age"
          }
        },
        yAxis: {
          ceiling: 1,
          title: {
            text: "Probability"
          }
        },
        series: [
          {
            lineColor: '#0496FFFF',
            color:'#0496FF99',
            data: [],
            name: "Probability still alive",
          },
          {
            lineColor:'#FF1A05FF',
            color: '#FF1A0599',
            fillOpacity:0.75,
            data: [],
            name: "Probability died this year",
          }
        ]
      }

    }
  },
  methods: {
    getCountries: function() {
      let self = this;
      var req = new XMLHttpRequest();
      req.open("POST", "http://127.0.0.1:8000/lifetables_countries/");
      req.onload = function(){
        if(req.readyState === 4){
          if(req.status === 200 ){
            self.countries = JSON.parse(req.responseText);
          }
        }
      };
      req.onerror = function() {
        console.error(req.statusText);
      }
      req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      req.send(null);
      this.getData();
    },

    getYears: function() {
      let self = this;
      const data = {country: this.selectedCountry};
      postRequest('http://127.0.0.1:8000/lifetable_years/', data, function(result){
        self.years = result;
      });
      this.getData();
    },

    getData: function() {
      let self = this;
      if(this.selectedCountry!=null && this.selectedYear!=null && this.selectedSex!=null){
        const data = {
          country: this.selectedCountry,
          year: this.selectedYear,
          sex: this.selectedSex
        };
        postRequest('http://127.0.0.1:8000/lifetables/', data, function(result){
          self.tables = result;
        });
      }
    },

    refresh: function() {
      this.chartOptions.series[1].data = this.alive_series;
      this.chartOptions.series[0].data = this.death_series;
    }

  },
  mounted: function(){
    this.getCountries();
    this.countriesLoading=false;
  },

  computed: {
    alive_series: function (){
      let result = [];
      for(let i=0; i<this.tables.length; i++){
        result.push({
          x:parseInt(this.tables[i].age),
          y:parseFloat(this.tables[i].probability)
        })
      }
      return result;
    },
    death_series: function (){
      let result = [];
      for(let i=0; i<this.tables.length; i++){
        result.push({
          x:parseInt(this.tables[i].age),
          y:parseFloat(this.tables[i].cumulative_probability)
        })
      }
      return result;
    },
  },
  watch: {
    tables: { 
      handler: function(){
        this.refresh() 
      }
    }
  }
}
</script>

<style scoped>
#hi{
  top:50%;
  font-weight:lighter;
}
</style>