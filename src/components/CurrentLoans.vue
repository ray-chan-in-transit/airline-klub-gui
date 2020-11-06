<template>
  <div v-if="loans"> 
    <!-- <div>{{ loans }}</div> -->
    <h3>Current Loans</h3>
    <div 
      v-for="loan in loans" 
      :key="loan.id"
      style="width: 75%; margin: 0 auto"
    >
      <hr />
      Borrowed: ${{loan.borrowedAmount}} |
      Intesest: ${{loan.interest}} ({{(100*loan.interest/loan.borrowedAmount).toFixed(2)}}%)
      <br />
      Remaining Amount: ${{loan.remainingAmount}} 
      ({{ (loan.remainingAmount / loan.borrowedAmount * 100).toFixed(2) }}%) | 
      Weekly Payment: ${{ loan.weeklyPayment }}
      <br />
      Term: {{ loan.loanTerm}} |
      Remaining: {{loan.remainingTerm}}
    </div>
  </div>
</template>

<script>

export default {
  name: 'CurrentLoans', 
  components: {},
  props: {
    msg: String,
    playerid: String
  },
  data() {
    return {
      loans: null,
    }
  },
  mounted() {
    fetch(`airlines/${this.playerid}/loans`, {method: 'GET', mode: 'cors'})
      .then(response => response.json())
      .then(data => {
        this.loans = data;
    })
  }
}

</script>
