<template>
  <div v-if="loans"> 
    <!-- <div>{{ loans }}</div> -->
    <h3 class='title is-3'>Current Loans</h3>
    <data-table
      :rows="loans"
      :columns="columns"
      :click="true"
      tableClass="table is-bordered is-striped is-narrow"
      v-if="loans"
    ></data-table>

<!--     <div 
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
    </div> -->
  </div>
</template>

<script>
import DataTable from './DataTable.vue'
export default {
  name: 'CurrentLoans', 
  components: {DataTable},
  props: {
    msg: String,
    playerid: String
  },
  data() {
    return {
      loans: null,
      columns: [
        {field: 'id', label: 'Loan ID', sortable: true},
        {field: 'borrowedAmount', label: 'Borrowed', sortable: true},
        {field: 'interest', label: 'Interest', sortable: true},
        {field: 'remainingAmount', label: 'Remaining Amt', sortable: true},
        {field: 'weeklyPayment', label: 'Weekly Pmt', sortable: true},
        {field: 'loanTerm', label: 'Term', sortable: true},
        {field: 'remainingTerm', label: 'Remaining', sortable: true},
        {field: 'earlyRepayment', label: 'Early Repay', sortable: true}
      ]
    }
  },
  mounted() {
    fetch(`airlines/${this.playerid}/loans`, {method: 'GET', mode: 'cors'})
      .then(response => response.json())
      .then(data => {
        console.log("yur loan", data)
        this.loans = data;
    })
  }
}

</script>
