<template>
  <BirdsOwned :playerid="playerid"/>
  <hr />
  <h2 class='title is-2'>Used Birds</h2>
  <label>Select a bird</label>&nbsp;
  <select v-model="birdChoice"
  >
    <option 
      v-for="bird in allBirds"
      :key="bird.id" 
      :value="bird.id"
    >
      {{bird.name}}
    </option>
  </select>
  <BirdsForSale 
    :playerid="playerid" 
    :birdChoice='birdChoice' 
    v-if="birdChoice" 
    :key="birdChoice"
  />
  <hr />
  <BirdsAvailable :playerid="playerid" v-model="allBirds"/>

</template>

<script>
// @ is an alias to /src
import BirdsAvailable from '@/components/BirdsAvailable.vue'
import BirdsOwned from '@/components/BirdsOwned.vue'
import BirdsForSale from '@/components/BirdsForSale.vue'

export default {
  name: 'Home',
  components: {
    BirdsAvailable, BirdsOwned, BirdsForSale
  },
  data (){
    return {
      // later the website gives you this.  Right now add these to .env.local
      playerid: process.env.VUE_APP_PLAYER_ID, 
      token: process.env.VUE_APP_TOKEN,
      allBirds: [],
      birdChoice: null
    }
  }
}
</script>
