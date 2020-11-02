<template>
  <OilPrices />
  <hr />
  <CurrentOilContracts :playerid="playerid"/>
  <hr />
  <NewOilContract :playerid="playerid"/>
</template>

<script>
// @ is an alias to /src
import OilPrices from '@/components/OilPrices.vue'
import CurrentOilContracts from '@/components/CurrentOilContracts.vue'
import NewOilContract from '@/components/NewOilContract.vue'

export default {
  name: 'Oil',
  components: {
    OilPrices, CurrentOilContracts, NewOilContract
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
