<template>
<!--   <div> {{ countries }} </div><hr />
  <div> {{ paxType }} </div><hr />
  <div> {{ paxPreference }} </div><hr /> -->
    <Graph 
      id='paxCountries' 
      v-if="countries"
      :gotData="countries"
      :customSpec="specTailored('Pax Countries', 'passengerCount', 'countryName')"
    />
    <Graph 
      id='paxType' 
      v-if="paxType"
      :gotData="paxType"
      :customSpec="specTailored('Pax Type', 'passengerCount', 'title')"
    />
    <Graph 
      id='paxPreference' 
      v-if="paxPreference"
      :gotData="paxPreference"
      :customSpec="specTailored('Pax Preference', 'passengerCount', 'title')"
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
  methods: {
    specTailored(t, q, n) {
      this.spec.title = t;
      this.spec.encoding.theta.field = q;
      this.spec.encoding.color.field = n;
      return this.spec
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
  }
}

</script>
