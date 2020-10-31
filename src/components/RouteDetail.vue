<template>
  <RouteBirds 
    :birds="linkDetail.assignedAirplanes"
    v-if="linkDetail"
  />
  <hr />
  <RouteCompetition 
    :fromAirportId="linkData.fromAirportId"
    :toAirportId="linkData.toAirportId"
    v-if="linkDetail"
  />
</template>

<script>
import RouteCompetition from './RouteCompetition'
import RouteBirds from './RouteBirds'

export default {
  name: 'RouteList', 
  components: {RouteCompetition, RouteBirds},
  props: {
    linkData: Object,
    playerid: String
  },
  data() {
    return {
      linkDetail: null
    }
  },
  mounted() {
    console.log(this.linkData)
    fetch(`airlines/${this.playerid}/links/${this.linkData.id}`, {method: 'GET', mode: 'cors'})
      .then(response => response.json())
      .then(d => {
        console.log(d)
        this.linkDetail = d;
    });
  }
}

</script>
