<template>
<!--   <div> {{ countries }} </div><hr />
  <div> {{ paxType }} </div><hr />
  <div> {{ paxPreference }} </div><hr /> -->
    <Graph 
      id='paxCountries' 
      v-if="countries"
      :gotData="countries"
      :customSpec="specTailoredArc('Pax Countries', 'passengerCount', 'countryName')"
    />
    <Graph 
      id='paxType' 
      v-if="paxType"
      :gotData="paxType"
      :customSpec="specTailoredArc('Pax Type', 'passengerCount', 'title')"
    />
    <Graph 
      id='paxPreference' 
      v-if="paxPreference"
      :gotData="paxPreference"
      :customSpec="specTailoredArc('Pax Preference', 'passengerCount', 'title')"
    />
    <Graph 
      id='CapacitySeats' 
      v-if="consumed"
      :gotData="consumed"
      :customSpec="specTailoredLine('Consumed Seats', 'cycle', 'capacity.total')"
    />
    <Graph 
      id='consumedSeats' 
      v-if="consumed"
      :gotData="consumed"
      :customSpec="specTailoredLine('Consumed Seats', 'cycle', 'soldSeats.total')"
    />
    <Graph 
      id='cancelledSeats' 
      v-if="consumed"
      :gotData="consumed"
      :customSpec="specTailoredLine('Cancelled Seats', 'cycle', 'cancelledSeats.total')"
    />
</template>

<script>
import Graph from './Graph'

export default {
  name: 'RoutePaxDetail', 
  components: {Graph},
  props: {
    playerid: String,
    linkid: Number
  },
  data() {
    return {
      countries: null,
      paxType: null,
      paxPreference: null,
      consumed: null
    }
  },
  methods: {
    specTailoredArc(t, q, n) {
      var newSpec = {
        "title": "Competition",
        "mark": {"type": "arc", "tooltip": true},
        "encoding": {
          "theta": {
            "type": "quantitative", 
            "axis": {"format": ".2s"}
          },
          "color": {
            "type": "nominal",
          }
        }
      }
      newSpec.title = t;
      newSpec.encoding.theta.field = q;
      newSpec.encoding.color.field = n;
      return newSpec
    },
    specTailoredLine(t, x, y) {
      var newSpec = {
        "title": "Competition",
        // "mark": {"type": "arc", "tooltip": true},
        "encoding": {
          "x": {
            "type": "quantitative", 
            "axis": {"format": ".2s"}
          },
          "y": {
            "type": "quantitative",
          }
        }
      }
      newSpec.title = t;
      newSpec.encoding.x.field = x;
      newSpec.encoding.y.field = y;
      return newSpec
    }
  },
  mounted() {
    fetch(`airlines/${this.playerid}/link-composition/${this.linkid}`, {method: 'GET', mode: 'cors'})
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.countries = data.country
        this.paxType = data.passengerType
        this.paxPreference = data.preferenceType
      })
    fetch(`airlines/${this.playerid}/link-consumptions/${this.linkid}?cycleCount=24`, {method: 'GET', mode: 'cors'})
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.consumed = data
      })
  }
}

</script>
