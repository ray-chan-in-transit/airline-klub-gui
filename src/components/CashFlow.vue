<template>
  <div class="hello">
    <Graph 
      id='meltedData' 
      v-if="meltedData"
      :gotData="meltedData"
      :customSpec="spec('Operational Cash Flow')"
    />
    <Graph 
      id='capData' 
      v-if="capData"
      :gotData="capData"
      :customSpec="spec('Capital Cash Flow')"
    />
  </div>
</template>

<script>
import Graph from './Graph'

export default {
  name: 'CashFlow', 
  components: {Graph},
  props: {
    playerid: String
  },
  data() {
    return {
      gotData: null,
      meltedData: null,
      capData: null,
    }
  },
  methods: {
    spec(t) {
      let stuff =  {
        "title": t,
        "transform": [
          ],
        "mark": "area",
        "encoding": {
          "x": {
            "field": "cycle", 
            "type": "quantitative", 
            "axis": {"labelAngle": -90, "format": ".5", tickCount: 10}
          },
          "y": {
            "field": "value", 
            "type": "quantitative",
            "axis": {"format": "$.3s"}
          },
          "color": {
            "field": "type", 
            "type": "nominal"
          }
        }
      }
      return stuff
    }
  },
  mounted() {
    fetch(`airlines/${this.playerid}/finances`, {method: 'GET', mode: 'cors'})
      .then(response => response.json())
      .then(data => {
        this.gotData = data.cashFlows.filter(x => x.period === 'WEEKLY');
        return data
      })
      .then(() => {
        let melt = []
        this.gotData.forEach(x => {
          let tt = [
            'operation', 
            'loanInterset', 
            'loanPrincipal', 
            // 'baseConstruction', 
            // 'buyAirplane', 
            'createLink', 
            // 'facilityConstruction', 
            'oilContract', 
            // 'sellAirplane',
          ]
          tt.forEach(
            k => melt.push({cycle: x.cycle, type: k, value: x[k]})
          )
        })
        this.meltedData = melt;
        console.log(melt)

        let capMelt = []
        this.gotData.forEach(x => {
          let tt = [
            'baseConstruction', 
            'buyAirplane', 
            'facilityConstruction', 
            'sellAirplane',
          ]
          tt.forEach(
            k => capMelt.push({cycle: x.cycle, type: k, value: x[k]})
          )
        })
        this.capData = capMelt;
      })
  }
}

</script>
