<template>
  <h2 class='title is-2'>Your Current Birds</h2>
  <data-table
    :rows="birdsAssigned"
    :columns="columns"
    :click="true"
    tableClass="table is-bordered is-striped is-narrow"
    v-if="birdsAssigned"
  ></data-table>
<!--   <div>{{ birdsAssigned }}</div>
  <div>{{ birds }}</div> -->

</template>

<script>
import DataTable from './DataTable.vue'



export default {
  name: 'BirdsOwned', 
  components: {'data-table': DataTable},
  props: {
    playerid: String
  },
  data() {
    return {
      birds: null,
      birdsAssigned: null, 
      birdsAvailable: null, 
      birdsBuilding: null, 
      columns: [
        // {label: 'badConditionThreshold', field: 'badConditionThreshold', sortable: true},
        {label: 'capacity', field: 'capacity', sortable: true},
        {label: 'condition', field: 'condition', sortable: true},
        {label: 'configuration', field: 'configuration', sortable: true},
        // {label: 'configurationId', field: 'configurationId', sortable: true},
        // {label: 'dealerValue', field: 'dealerValue', sortable: true},
        // {label: 'fuelBurn', field: 'fuelBurn', sortable: true},
        {label: 'homeAirportId', field: 'homeAirportId', sortable: true},
        // {label: 'id', field: 'id', sortable: true},
        // {label: 'isReady', field: 'isReady', sortable: true},
        {label: 'AvailPct', field: 'AvailPct', sortable: true},
        // {label: 'maxFlightMinutes', field: 'maxFlightMinutes', sortable: true},
        // {label: 'availableFlightMinutes', field: 'availableFlightMinutes', sortable: true},
        // {label: 'modelId', field: 'modelId', sortable: true},
        {label: 'name', field: 'name', sortable: true},
        // {label: 'ownerId', field: 'ownerId', sortable: true},
        // {label: 'ownerName', field: 'ownerName', sortable: true},
        // {label: 'price', field: 'price', sortable: true},
        // {label: 'purchasedCycle', field: 'purchasedCycle', sortable: true},
        // {label: 'range', field: 'range', sortable: true},
        {label: 'sellValue', field: 'sellValue', sortable: true},
        // {label: 'speed', field: 'speed', sortable: true},
        // {label: 'value', field: 'value', sortable: true},
      ]
    }
  },
  mounted() {
    fetch(`airlines/${this.playerid}/airplanes?simpleResult=false&groupedResult=true`, {method: 'GET', mode: 'cors'})
      .then(response => response.json())
      .then(d => {
        // console.log(d)
        this.birds = d;
        this.birdsAssigned = []
        this.birdsAvailable = []
        this.birdsBuilding = []
        for (const [, value] of Object.entries(this.birds)){
          // console.log(key, value)
          this.birdsAssigned.push(...value.assignedAirplanes)
          this.birdsAvailable.push(...value.availableAirplanes)
          this.birdsBuilding.push(...value.constructingAirplanes)
        }
        [this.birdsAssigned, this.birdsAvailable, this.birdsBuilding].forEach(y => {
            y.forEach( x => {
              x['AvailPct'] = (x.availableFlightMinutes / x.maxFlightMinutes).toFixed(2) * 100
            })
        })
    });
  }
}

</script>