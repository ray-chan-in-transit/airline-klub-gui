<template>
  <div class="hello">
    <Graph 
      id='interestRates' 
      v-if="gotData"
      :gotData="gotData"
      :customSpec="spec"
    />

  </div>
</template>

<script>
import Graph from './Graph'

export default {
  name: 'BankInterestRates', 
  components: {Graph},
  props: {
    msg: String
  },
  data() {
    return {
      gotData: null,
      spec: {
        "title": "Bank Interest Rates",
        "encoding": {
          "x": {
            "field": "cycle", 
            "type": "quantitative", 
            "axis": {"labelAngle": -90, "format": ".5"}
          },
          "y": {
            "field": "rate", 
            "type": "quantitative",
            "axis": {"format": ".2%"}

          }
        }
      }
    }
  },
  mounted() {
    fetch("loan-interest-rates", {method: 'GET', mode: 'cors'})
      .then(response => response.json())
      .then(data => {
        this.gotData = data;
    })
  }
}

</script>
