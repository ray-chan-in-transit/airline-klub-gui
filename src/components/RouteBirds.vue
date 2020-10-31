<template>
<!--   <div> {{ birds }} </div> -->
  <h2>Airplane Details</h2> 
  <div 
    v-for="bird in birds"
    :key="bird.airplane.id"
  >
  {{ bird.airplane.name }} | ${{ bird.airplane.sellValue }} | {{ bird.airplane.condition }}% | ({{ bird.frequency }}x)
  </div>
</template>

<script>

export default {
  name: 'RouteBirds', 
  components: {},
  props: {
    birds: Object,
  },
  data() {
    return {
    }
  },
  mounted() {
  }
}

</script>
