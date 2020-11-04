<template>
    <span v-if="theValue">{{ theValue }}</span>
    <span v-else-if="theElse">{{ theElse }}</span>
    <span v-else>-</span>
</template>

<script>

export default {
  name: 'hyphenIfNull', 
  props: ['theValue', 'theElse'],
}

</script>
