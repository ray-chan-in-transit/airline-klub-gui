<template>
    <!-- <div>{{ loanTerms }}</div> -->
  <div v-if="oil">
    <h3>Fuel Consumption History</h3>
    <div v-for="(h, index) in oil.history" :key="index">
      <!-- {{ index }}  <br /> -->
      <strong>Price:</strong> 
        {{h.price}} |
      <strong>Volume:</strong> 
        {{h.volume}} |
      <strong>type:</strong> 
        {{ h.type }}
    </div>
    <span>Total Oil Consumed: {{ totalOilConsumption }}</span>
    <hr />
    <h3>New Oil Contract</h3>
    <form>
      <strong>Suggested Barrels</strong>&nbsp;
        <input 
          v-model="volume"
          type="number"
        /> <br />
      <strong>Suggested Duration</strong>&nbsp;
        <input 
          v-model="duration" 
          type="number"
          min="0"
          max="200"
        />
    </form>
    <div v-if="oilTerms">
      Offer Price: {{oilTerms.price}} | 
      Volume: {{oilTerms.volume}} |
      Total Cost: {{oilTerms.cost}}
    </div>
    <!-- {{requestedLoan}} -->
  </div>
</template>

<script>

export default {
  name: 'NewOilContract', 
  components: {},
  props: {
    msg: String,
    playerid: String
  },
  data() {
    return {
      oil: null,
      volume: null,
      duration: null,
      totalOilConsumption: null,
      oilTerms: null
    }
  },
  watch: {
    volume: {
      handler(x) {
        if(x){this.getContractTerms()}
      }
    },
    duration: {
      handler(x) {
        if(x){this.getContractTerms()}
      }
    },
  },
  methods: {
    getContractTerms() {
      fetch(`airlines/${this.playerid}/oil-contract-consideration?volume=${this.volume}&duration=${this.duration}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("lol",data)
          this.oilTerms = data
        })
    }
  },
  mounted() {
    fetch(`airlines/${this.playerid}/oil-details`, {method: 'GET', mode: 'cors'})
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.oil = data;
        this.volume = data.suggestedBarrels;
        this.duration = data.suggestedDuration;
        this.totalOilConsumption = data.history.reduce((a,b) => a + b.volume, 0)
        this.getContractTerms()
    })
  }
}

</script>
