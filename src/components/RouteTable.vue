<template>
  <!-- <div> {{routes}}</div> -->
  <div class="table-container" v-if="routes">
    <data-table
      :rows="routes"
      :columns="columns"
      :click="true"
      tableClass="table is-bordered is-striped is-narrow"
    ></data-table>
  </div>
<!--   <hr />
  <div class="table-container" v-if="routes">
    <table class="table is-bordered is-striped is-narrow">
      <thead>
        <tr>
          <th>From IATA</th>
          <th>To IATA</th>
          <th>From Name</th>
          <th>To Name</th>
          <th>Price (Y/J/F)</th>
          <th>Revenue</th>
          <th>Profit</th>
          <th>Margin</th>
          <th>Demand (Y/J/F)</th>
          <th>Capacity (Y/J/F)</th>
          <th>Load (Y/J/F)</th>
          <th>Flights/Week</th>
          <th>$/Flight</th>
          <th>$/Pax</th>
          <th>$/Pax-Mile</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="route in routes" :key="route.id">
          <td>{{ route.fromAirportCode }}</td>
          <td>{{ route.toAirportCode }}</td>
          <td>{{ route.fromAirportName }}</td>
          <td>{{ route.toAirportName }}</td>
          <td>${{ route.price.economy }}/${{ route.price.business }}/${{ route.price.first }}</td>
          <td>${{ route.revenue }}</td>
          <td>${{ route.profit }}</td>
          <td>{{ Math.round(route.profit / route.revenue * 100)}}%</td>
          <td>{{ route.passengers.economy }}/{{ route.passengers.business }}/{{ route.passengers.first }} = {{ route.passengers.total }}</td>
          <td>{{ route.capacity.economy }}/{{ route.capacity.business }}/{{ route.capacity.first }} = {{ route.capacity.total }}</td>
          <td>{{ Math.round(route.passengers.economy / route.capacity.economy * 100 ) }}%/{{ Math.round(route.passengers.business / route.capacity.business * 100 ) }}%/{{ Math.round(route.passengers.first / route.capacity.first * 100 ) }}% = {{ Math.round(route.passengers.total / route.capacity.total * 100 ) }}%</td>
          <td>{{ route.frequency }}</td>
          <td>${{ Math.round(route.profit / route.frequency)}}</td>
          <td>${{ Math.round(route.profit / route.passengers.total)}}</td>
          <td>${{ (route.profit / (route.passengers.total * route.distance)).toFixed(2)}}</td>
        </tr>
      </tbody>
    </table>
  </div>-->
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
import DataTable from './DataTable.vue'
export default {
  name: 'RouteTable', 
  components: {'data-table': DataTable},
  props: {
    routes: Object
  },
  data() {
    return {
      columns: [
        {label: 'fromAirportName', field: 'fromAirportName', sortable: true},
        {label: 'toAirportName', field: 'toAirportName', sortable: true},
        {label: 'fromAirportCode', field: 'fromAirportCode', sortable: true},
        {label: 'toAirportCode', field: 'toAirportCode', sortable: true},
        {label: 'revenue', field: 'revenue', sortable: true},
        {label: 'profit', field: 'profit', sortable: true},
        {label: 'frequency', field: 'frequency', sortable: true},
        {label: '$/pax-mile', field: 'p_pax_mile', sortable: true},
        {label: '$/pax-freq', field: 'p_pax_freq', sortable: true},
        {label: '$/pax', field: 'p_pax', sortable: true},
        {label: '$/freq', field: 'p_freq', sortable: true},
        {label: 't_demand', field: 't_demand', sortable: true},
        {label: 't_capacity', field: 't_capacity', sortable: true},
        {label: 't_load', field: 't_load', sortable: true},
        {label: 'margin', field: 'margin', sortable: true},
      ]
    }
  },
  mounted() {
    console.log("a route", this.routes[0])
  }
}

</script>
