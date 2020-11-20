<template>
  <h2 class='title is-2'>Available Birds for Purchase</h2>
  <data-table
    :rows="birds"
    :columns="columns"
    :click="true"
    tableClass="table is-bordered is-striped is-narrow"
    v-if="birds"
  ></data-table>
  <!-- <div>{{ birds }}</div> -->

</template>

<script>
import DataTable from './DataTable.vue'



export default {
  name: 'BirdsAvailable', 
  components: {'data-table': DataTable},
  props: {
    playerid: String,
    modelValue: Array
  },
  data() {
    return {
      birds: null,
      columns: [
        {label: 'name', field: 'name', sortable: true},
        {label: 'Family', field: 'family', sortable: true},
        // {label: 'originalPrice', field: 'originalPrice', sortable: true},
        {label: 'price', field: 'price', sortable: true},
        // {label: 'Type', field: 'airplaneType', sortable: true},
        // {label: 'Bad Threshold', field: 'badConditionThreshold', sortable: true},
        {label: 'capacity', field: 'capacity', sortable: true},
        {label: 'constructionTime', field: 'constructionTime', sortable: true},
        {label: 'countryCode', field: 'countryCode', sortable: true},
        // {label: 'Critical Threshold', field: 'criticalConditionThreshold', sortable: true},
        {label: 'Const Speed -%', field: 'discount_construction_time', sortable: true},
        {label: 'Price -%', field: 'discount_price', sortable: true},
        {label: 'Fuel Burn', field: 'fuelBurn', sortable: true},
        {label: 'Lifespan', field: 'lifespan', sortable: true},
        {label: 'Min AirportSize', field: 'minAirportSize', sortable: true},
        {label: 'Range', field: 'range', sortable: true},
        // {label: 'Why you cannot buy this yet', field: 'rejection', sortable: true},
        {label: 'speed', field: 'speed', sortable: true}
      ]
    }
  },
  mounted() {
    fetch(`airlines/${this.playerid}/airplane-models`, {method: 'GET', mode: 'cors'})
      .then(response => response.json())
      .then(d => {
        d.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
        console.log(d)
        d.forEach(x => {
          if(x.discounts){
            // console.log(x.name, x.discounts)
            let disc = ['construction_time', 'price']
            disc.forEach(y => {
              let t = x.discounts[y] ?? [];
              x[`discount_${y}`] = t.length > 0 ? `-${t[0].discountPercentage}%` : '-'
            })
          }
        })
        this.birds = d;
        this.$emit('update:modelValue', d);

    });
  }
}

</script>