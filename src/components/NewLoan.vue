<template>
    <!-- <div>{{ loanTerms }}</div> -->
  <h3>New Loan</h3>
  <div v-if="maxLoan > 0"> 
    <form>
      <strong>Requested</strong> <input v-model="requestedLoan"/>
    </form>
    <!-- {{requestedLoan}} -->
    <ul v-if="loanTerms">
      <li v-for="loan in loanTerms" :key="loan.id">
        <!-- {{ loan }}  <br /> -->
        <strong>Pricipal:</strong> 
          ${{loan.borrowedAmount}} |
        <strong>Intesest:</strong> 
          ${{loan.interest}} |
        <strong>Rate:</strong> 
          {{ (loan.interest / loan.borrowedAmount * 100).toFixed(2) }}% | 
        <strong>Payments:</strong> 
          ${{ loan.weeklyPayment }} |
        <strong>Term:</strong> 
          {{ loan.loanTerm }} weeks
      </li>
    </ul>
  </div>
  <div v-else><strong>{{ rejectMessage }}</strong></div>
</template>

<script>

export default {
  name: 'NewLoan', 
  components: {},
  props: {
    msg: String,
    playerid: String
  },
  data() {
    return {
      maxLoan: null,
      loanTerms: null,
      requestedLoan: null,
      rejectMessage: null
    }
  },
  watch: {
    requestedLoan: {
      handler(x) {
        console.log()
        if (x){
        fetch(`airlines/${this.playerid}/loan-options?loanAmount=${x}`)
          .then((response) => response.json())
          .then((data) => {
            // console.log(data)
            this.loanTerms = data
          })
        }
      }
    }
  },
  mounted() {
    fetch(`airlines/${this.playerid}/max-loan`, {method: 'GET', mode: 'cors'})
      .then(response => response.json())
      .then(data => {
        this.maxLoan = data.maxAmount;
        this.requestedLoan = data.maxAmount;
        this.rejectMessage = data.rejection;
    })
  }
}

</script>
