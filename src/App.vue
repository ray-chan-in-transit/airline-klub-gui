<template>
  <OilPrices />
  <CashFlow :playerid="playerid"/>
  <BankInterestRates />
</template>

<script>
import OilPrices from './components/OilPrices'
import CashFlow from './components/CashFlow'
import BankInterestRates from './components/BankInterestRates'

export default {
  name: 'App',
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
