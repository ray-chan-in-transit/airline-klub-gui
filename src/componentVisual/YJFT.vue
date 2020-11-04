<template>
      {{ title }}:
      (<span v-if='money'>$</span><hyphenIfNull :theValue="val.economy" /> /
        <span v-if='money'>$</span><hyphenIfNull :theValue="val.business" /> /
        <span v-if='money'>$</span><hyphenIfNull :theValue="val.first" /> 
        <span v-if="total">
            / 
            &Sigma;<hyphenIfNull 

                :theValue="val.total" 
                :theElse='val.economy + val.business + val.first'
            /> 
        </span>)
</template>

<script>
import hyphenIfNull from './hyphenIfNull'
export default {
  name: 'YJFT', 
  components: {hyphenIfNull},
  props: {val: Object, title: String, total: Boolean, money: Boolean},
}

</script>
