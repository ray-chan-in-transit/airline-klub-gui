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
  <br />
  <br />
  <br />
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
        d.forEach( x => {
            x['p_pax_mile'] = parseFloat((x.profit / (x.passengers.total * x.distance)).toFixed(2));
            x['p_pax_freq'] = parseFloat((x.profit / (x.passengers.total * x.frequency)).toFixed(2));
            x['p_pax'] = parseFloat((x.profit / x.passengers.total).toFixed(2));
            x['p_freq'] = parseFloat((x.profit / x.frequency).toFixed(2));
            x['t_demand'] = (x.passengers.total);
            x['t_capacity'] = (x.capacity.total);
            x['t_load'] = parseFloat((x.passengers.total / x.capacity.total * 100).toFixed(0));
            x['margin'] = parseFloat((x.profit / x.revenue * 100).toFixed(2));
          }
        )
        this.routes = d;
    })
  }
}

</script>
