<template>
  <!-- <div> {{ competitors }} </div> <hr /> -->
  <div> 
    <h2> Competition Detail </h2>
    <div 
      v-for="competitor in competitors"
      :key="competitor.airlineId"
    >
      {{ competitor.airlineName}} <br />
      <YJFT :val="competitor.price" title="Price" :total="false" :money="true"/>
      [{{competitor.frequency}} Flights @ {{competitor.quality}} Service]<br />
      <YJFT :val="competitor.capacity" title="Seats" :total="true"/>
      Usage: {{ competitor.soldSeats }} / {{competitor.capacity.total}}  
      ({{(competitor.soldSeats / competitor.capacity.total * 100).toFixed(2)}}%) <br /><br />
    </div>
  </div>
  <hr />
  <div>
    <h2>~~Fight~~</h2>
    <div 
      v-for="competitor in competitors"
      :key="competitor.airlineId"
    >
      {{competitor.airlineName}}: {{ competitor.soldSeats }} / {{totalCapacity}} ({{ (competitor.soldSeats / totalCapacity * 100).toFixed(2)}}%)
    </div>
  <hr />
    <Graph 
      id='compPie' 
      v-if="competitors"
      :gotData="competitors"
      :customSpec="spec"
    />
  </div>
</template>

<script>
import Graph from './Graph'
import YJFT from '../componentVisual/YJFT'

export default {
  name: 'RouteCompetition', 
  components: {Graph, YJFT},
  props: {
    fromAirportId: Number,
    toAirportId: Number
  },
  data() {
    return {
      competitors: null,
      totalCapacity: null,
      spec: {
        "title": "Competition",
        "mark": {"type": "arc", "tooltip": true},
        "encoding": {
          "theta": {
            "field": "soldSeats", 
            "type": "quantitative", 
            "axis": {"format": ".2s"}
          },
          "color": {
            "field": "airlineName", 
            "type": "nominal",
          }
        }
      }
    }
  },
  mounted() {
    fetch(`airports/${this.fromAirportId}/to/${this.toAirportId}`, {method: 'GET', mode: 'cors'})
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.competitors = data
        })
      .then(() => {
        this.totalCapacity = this.competitors.reduce((a,b) => a + b.soldSeats, 0)
      })
  }
}

</script>
