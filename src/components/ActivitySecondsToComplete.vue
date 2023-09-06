<script setup>
import { computed } from 'vue'
import { formatSeconds, getTotalActivitySeconds } from '../functions'
import { isActivityValid, validateTimelineItems } from '../validators'

const props = defineProps({
  activity: {
    type: Object,
    required: true,
    validator: isActivityValid,
  },
  timelineItems: {
    type: Array,
    required: true,
    validator: validateTimelineItems,
  },
})
const seconds = computed(
  () => `${sign.value}${formatSeconds(secondsDiff.value)}`,
)
const sign = computed(() => (secondsDiff.value >= 0 ? '' : '-'))
const secondsDiff = computed(
  () =>
    getTotalActivitySeconds(props.activity, props.timelineItems) -
    props.activity.secondsToComplete,
)
</script>
<template>
  <div
    v-if="activity.secondsToComplete > 0"
    class="flex items-center rounded bg-purple-100 px-2 font-mono text-xl text-purple-600"
    :class="{
      'bg-green-100 text-green-600': secondsDiff > 0,
      'bg-red-100 text-red-600': secondsDiff < 0,
    }"
  >
    {{ seconds }}
  </div>
</template>
