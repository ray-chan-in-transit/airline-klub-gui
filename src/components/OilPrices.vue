<template>
  <div class="hello">
    <Graph 
      id='oilPrice' 
      v-if="gotData"
      :gotData="gotData"
      :customSpec="spec"
    />

  </div>
</template>

<script>
// import embed from 'vega-embed'
import Graph from './Graph'

export default {
  name: 'OilPrices', 
  components: {Graph},
  props: {
    msg: String
  },
  data() {
    return {
      gotData: null,
      spec: {
        "title": "Oil Prices",
        "encoding": {
          "x": {
            "field": "cycle", 
            "type": "quantitative", 
            "axis": {"labelAngle": -90, "format": ".5"}
          },
          "y": {
            "field": "price", 
            "type": "quantitative",
            "axis": {"format": "$.2"}
          }
        }
      }
    }
  },
  mounted() {
    fetch("oil-prices", {method: 'GET', mode: 'cors'})
      .then(response => response.json())
      .then(d => {
        this.gotData = d;
    })
  }
}

</script>
