<template>
<!--   <div>{{ airline }}</div> -->
  <div v-if="airline">
    <h1>Home</h1>
    <h2>Airline Details</h2>
      <strong>{{airline.name}}</strong> [{{airline.countryCode}}] |
      Type: {{ airline.gradeDescription }} (Grade: {{ airline.gradeValue }})
      <br />
      ${{airline.balance}} |
      Rep: {{ airline.reputation }} | Service: {{ airline.serviceQuality}}
    <h2>Airport Bases</h2>
      <ul>
        <li v-for="base in airline.baseAirports" :key="base.airportId">
          <span v-if="base.headquarter === true"><strong>HQ</strong></span>
          {{ base.airportCode }} - {{ base.airportName}} 
          (Base Size: {{ base.scale }})
        </li>
      </ul>
  </div>

</template>

<script>
// import RouteCompetition from './RouteCompetition'
// import RoutePaxDetail from './RoutePaxDetail'
// import RouteBirds from './RouteBirds'

export default {
  name: 'AirlineHighDetail', 
  components: {},
  props: {
    playerid: String
  },
  data() {
    return {
      airline: null
    }
  },
  mounted() {
    fetch(`airlines/${this.playerid}`, {method: 'GET', mode: 'cors'})
      .then(response => response.json())
      .then(d => {
        console.log(d)
        this.airline = d;
    });
  }
}

</script>
