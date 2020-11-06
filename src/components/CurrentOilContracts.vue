<template>
  <div v-if="contracts"> 
    <!-- <div>{{ contracts }}</div> -->
    <h3>Current Oil Contracts</h3>
    <div 
      v-for="contract in contracts" 
      :key="contract.id"
      style="width: 75%; margin: 0 auto"
    >
      <hr /> 
      Volume: {{contract.volume}} |
      Contract Cost: ${{contract.cost}} 
      <br />
      Price: ${{contract.price}} |
      Remaining Duration: {{contract.remainingDuration}} Weeks
      <br />
      Termination Penalty: ${{ contract.terminationPenalty}}
      <span v-if="contract.rejection"> | {{contract.rejection}} </span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CurrentOilContracts', 
  components: {},
  props: {
    msg: String,
    playerid: String
  },
  data() {
    return {
      contracts: null,
    }
  },
  mounted() {
    fetch(`airlines/${this.playerid}/oil-contracts`, {method: 'GET', mode: 'cors'})
      .then(response => response.json())
      .then(data => {
        this.contracts = data;
    })
  }
}

</script>
