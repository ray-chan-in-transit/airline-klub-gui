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
    <Graph 
      id='niceOpsData' 
      v-if="niceOpsData"
      :gotData="niceOpsData"
      :customSpec="{...spec('Typical Operations Flow'), 'mark': {'type': 'line', 'tooltip': true, 'point': true}}"
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
      niceOpsData: null,
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
            // "aggregate": "sum",
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
        console.log('cf', this.gotData)
        let melt = []
        this.gotData.forEach(x => {
          let tt = [
            'operation', 
            'loanInterest', 
            'loanPrincipal', 
            'createLink', 
            'oilContract', 
          ]
          tt.forEach(
            k => melt.push({cycle: x.cycle, type: k, value: x[k]})
          )
        })
        this.meltedData = melt;

        let niceOps = []
        this.gotData.forEach(x => {
          niceOps.push({cycle: x.cycle, type: 'typicalFlow', value: (x.operation + x.loanInterest + x.loanPrincipal)})
        })

        this.gotData.forEach(x => {
          let tt = ['operation', 'loanInterest', 'loanPrincipal']
          tt.forEach(
            k => niceOps.push({cycle: x.cycle, type: k, value: Math.abs(x[k])})
          )
        })
        this.niceOpsData = niceOps
        console.log(niceOps)

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
