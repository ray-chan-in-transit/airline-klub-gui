<template>
  <div class="home">
    <AirlineHighDetail :playerid="playerid"/>
  </div>
</template>

<script>
// @ is an alias to /src
import AirlineHighDetail from '@/components/AirlineHighDetail.vue'

export default {
  name: 'Home',
  components: {
    AirlineHighDetail
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
