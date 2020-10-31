<template>
  <!-- <div> {{routes}}</div> -->
  <div v-for="route in routes" :key="route.id">
    <h3>
      {{ route.fromAirportCode }} - {{ route.toAirportCode }}<br />
      <sub>{{ route.fromAirportName }} - {{ route.toAirportName }}</sub>
    </h3>
    <strong>Price:</strong>  ${{ route.price.economy }}/${{ route.price.business }}/${{ route.price.first }}
    <br />
    <strong>Revenue:</strong> ${{ route.revenue }} | <strong>Profit:</strong> ${{ route.profit }} | <strong>Margin:</strong> {{ Math.round(route.profit / route.revenue * 100, 2)}}%
    <br />
    <strong>Demand:</strong> (
      {{ route.passengers.economy }}/{{ route.passengers.business }}/{{ route.passengers.first }} = {{ route.passengers.total }}
    ) | 
    <strong>Capacity:</strong> ({{ route.capacity.economy }}/{{ route.capacity.business }}/{{ route.capacity.first }} = {{ route.capacity.total }}) | 
    <strong>Load:</strong> ({{ Math.round(route.passengers.economy / route.capacity.economy * 100 , 2) }}%/{{ Math.round(route.passengers.business / route.capacity.business * 100 , 2) }}%/{{ Math.round(route.passengers.first / route.capacity.first * 100 , 2) }}% = {{ Math.round(route.passengers.total / route.capacity.total * 100 , 2) }}%)
    <br />
    <strong>Flights:</strong> {{ route.frequency }} | <strong>Profit/Flight:</strong> ${{ Math.round(route.profit / route.frequency, 2)}} | <strong>Profit/Pax:</strong> ${{ Math.round(route.profit / route.passengers.total, 2)}} | <strong>Profit/Pax-Mile</strong>: ${{ (route.profit / (route.passengers.total * route.distance)).toFixed(2)}}
    <hr />
  </div>
</template>

<script>

export default {
  name: 'RouteTable', 
  components: {},
  props: {
    routes: Object
  },
  data() {
    return {

    }
  },
  mounted() {
    console.log("a route", this.routes[0])
  }
}

</script>
