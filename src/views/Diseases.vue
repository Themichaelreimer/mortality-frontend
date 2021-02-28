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
                value: 'disease'
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
        data: [
            {
                id:1, 
                disease:'Rhinovirus', 
                frequency: '0.1',
                mortality_rate:'0.01%'
            },
            {
                id:2, 
                disease:'Influenza A', 
                frequency: '0.02',
                mortality_rate:'0.33%'
            },
            {
                id:3, 
                disease:'Influenza B', 
                frequency: '0.019',
                mortality_rate:'0.25%'
            },
        ],
        search: null,
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