<template>
  <CashFlow :playerid="playerid"/>
  <OilPrices />
  <BankInterestRates />
</template>

<script>
import OilPrices from './components/OilPrices'
import CashFlow from './components/CashFlow'
import BankInterestRates from './components/BankInterestRates'

export default {
  name: 'Dash',
  components: {
    OilPrices, CashFlow, 
    BankInterestRates
  },
  data (){
    return {
      // later the website gives you this.  Right now add these to .env.local
      playerid: process.env.VUE_APP_PLAYER_ID, 
      token: process.env.VUE_APP_TOKEN
    }
  },
  mounted() {
    document.cookie = `PLAY_SESSION=${this.token}`;
    console.log()
  }
}
</script>

<style>
</style>
