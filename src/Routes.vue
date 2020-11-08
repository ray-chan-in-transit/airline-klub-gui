<template>
  <RouteList :playerid="playerid" />
  <!-- <CashFlow :playerid="playerid"/> -->
</template>

<script>
import RouteList from './components/RouteList'

export default {
  name: 'Routes',
  components: {
    RouteList
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
