<template>
  <h1>Routes</h1>
  <RouteTable 
    :routes="routes" 
    v-if="routes"
  />
  <h1>See Some Details!</h1>
  <select 
    v-model='selectedRoute'
    v-if="routes"
  >
    <option 
      v-for="route in routes" 
      :key="route.id" 
      :value="route"
    >
      {{ route.fromAirportCode }} - {{ route.toAirportCode }}
    </option>
  </select>
  <RouteDetail 
    :playerid="playerid" 
    v-if="selectedRoute" 
    :linkData="selectedRoute"
    :key='selectedRoute'
  />
<!--   <div v-for="route in routes" :key="route.id">
    <span>{{ route }}</span>
    <hr />
  </div> -->
</template>

<script>
import RouteDetail from './RouteDetail'
import RouteTable from './RouteTable'

export default {
  name: 'RouteList', 
  components: {RouteDetail, RouteTable},
  props: {
    playerid: String
  },
  data() {
    return {
      selectedRoute: null,
      routes: null
    }
  },
  mounted() {
    fetch(`airlines/${this.playerid}/links-details`, {method: 'GET', mode: 'cors'})
      .then(response => response.json())
      .then(d => {
        // console.log(d)
        this.routes = d;
    })
  }
}

</script>
