<template>
  <div class="hello">
    <Graph 
      id='cashFlow' 
      v-if="gotData"
      :gotData="gotData"
      :customSpec="spec"
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
      spec: {
        "title": "Total Cash Flow",
        "encoding": {
          "x": {
            "field": "cycle", 
            "type": "quantitative", 
            "axis": {"labelAngle": -90, "format": ".5", tickCount: 10}
          },
          "y": {
            "field": "totalCashFlow", 
            "type": "quantitative",
            "axis": {"format": "$.2s"}
          }
        }
      }
    }
  },
  mounted() {
    fetch(`airlines/${this.playerid}/finances`, {method: 'GET', mode: 'cors'})
      .then(response => response.json())
      .then(data => {
        this.gotData = data.cashFlows.filter(x => x.period === 'WEEKLY');
    })
  }
}

</script>
