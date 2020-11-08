<template>
  <!-- <div>{{ birdChoice }}</div> -->
  <h3 class='title is-3'>Current Market</h3>
  <data-table
    :rows="bird"
    :columns="columns"
    :click="true"
    tableClass="table is-bordered is-striped is-narrow"
    v-if="bird"
  ></data-table>
  <!-- <div>{{ bird }}</div> -->

</template>

<script>
import DataTable from './DataTable.vue'



export default {
  name: 'BirdsForSale', 
  components: {'data-table': DataTable},
  props: {
    playerid: String,
    birdChoice: Number
  },
  data() {
    return {
      bird: null,
      columns: [
        // {label: 'badConditionThreshold', field: 'badConditionThreshold', sortable: true},
        // {label: 'capacity', field: 'capacity', sortable: true},
        {label: 'ownerName', field: 'ownerName', sortable: true},
        {label: 'condition', field: 'condition', sortable: true},
        // {label: 'configuration', field: 'configuration', sortable: true},
        // {label: 'configurationId', field: 'configurationId', sortable: true},
        {label: 'dealerRatio', field: 'dealerRatio', sortable: true},
        {label: 'dealerValue', field: 'dealerValue', sortable: true},
        // {label: 'fuelBurn', field: 'fuelBurn', sortable: true},
        // {label: 'homeAirportId', field: 'homeAirportId', sortable: true},
        // {label: 'id', field: 'id', sortable: true},
        // {label: 'isReady', field: 'isReady', sortable: true},
        // {label: 'maxFlightMinutes', field: 'maxFlightMinutes', sortable: true},
        // {label: 'modelId', field: 'modelId', sortable: true},
        // {label: 'name', field: 'name', sortable: true},
        // {label: 'ownerId', field: 'ownerId', sortable: true},
        // {label: 'ownerName', field: 'ownerName', sortable: true},
        // {label: 'price', field: 'price', sortable: true},
        // {label: 'purchasedCycle', field: 'purchasedCycle', sortable: true},
        // {label: 'range', field: 'range', sortable: true},
        // {label: 'sellValue', field: 'sellValue', sortable: true},
        // {label: 'speed', field: 'speed', sortable: true},
        // {label: 'value', field: 'value', sortable: true},
      ]
    }
  },
  mounted() {
    fetch(`airlines/${this.playerid}/used-airplanes/models/${this.birdChoice}`, {method: 'GET', mode: 'cors'})
      .then(response => response.json())
      .then(d => {
        console.log(d)
        this.bird = d;
        // this.birdsAssigned = []
        // this.birdsAvailable = []
        // this.birdsBuilding = []
        // for (const [key, value] of Object.entries(this.birds)){
        //   console.log(key, value)
        //   this.birdsAssigned.push(...value.assignedAirplanes)
        //   this.birdsAvailable.push(...value.availableAirplanes)
        //   this.birdsBuilding.push(...value.constructingAirplanes)
        // }

    });
  }
}

</script>