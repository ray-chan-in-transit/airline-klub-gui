<template>
  <div 
    :id='id' 
    style="width: 100%; height: 300px;"
  ></div>

</template>

<script>
import embed from 'vega-embed'

export default {
  name: 'Graph',
  props: {
    id: String,
    gotData: Object,
    customSpec: Object
  },
  data () {
    return {
      defaultSpec: {    
        "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
        "description": "A simple bar chart with embedded data.",
        "width": "container",
        "height": 400,
        "mark": {"type": "line", "tooltip": true, "point": true},  
      }
    }
  },
  mounted() {
    console.log(this.gotData)
    embed('#' + this.id, 
      {
        ...this.defaultSpec, 
        ...this.customSpec,
        "data": {
          "values": this.gotData
        },
      }
    )
  }
}

</script>
