<template>
  <div class="home">
    <BankInterestRates />
    <hr />
    <CurrentLoans :playerid="playerid"/>
    <hr />
    <NewLoan :playerid="playerid"/>
  </div>
</template>

<script>
// @ is an alias to /src
import BankInterestRates from '@/components/BankInterestRates.vue'
import CurrentLoans from '@/components/CurrentLoans.vue'
import NewLoan from '@/components/NewLoan.vue'

export default {
  name: 'Home',
  components: {
    BankInterestRates, CurrentLoans, NewLoan
  },
  props: {
    week: Number
  },
  data (){
    return {
      // later the website gives you this.  Right now add these to .env.local
      playerid: process.env.VUE_APP_PLAYER_ID, 
      token: process.env.VUE_APP_TOKEN
    }
  }
}
</script>
