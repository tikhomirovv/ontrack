<script setup>
import { isHourValid } from '../validators'
const classes = [
  'absolute -top-4 left-1/2 -translate-x-1/2 rounded  px-2 font-mono text-lg',
  props.hour === new Date().getHours()
    ? 'bg-purple-900 font-black text-white'
    : 'bg-gray-100 text-grey-500',
]
const props = defineProps({
  hour: {
    type: Number,
    requred: true,
    validator: isHourValid,
  },
})
const formattedHour = `${props.hour.toString().padStart(2, 0)}:00`
</script>
<template>
  <a href="#" :class="classes"> {{ formattedHour }} </a>
</template>
