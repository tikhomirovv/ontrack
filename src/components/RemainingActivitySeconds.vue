<script setup>
import { computed } from 'vue'
import { formatSecondsWithSign } from '../functions'
import { isActivityValid } from '../validators'
import {
  timelineItems,
  calculateTrackedActivitySeconds,
} from '../timeline-item'
const props = defineProps({
  activity: {
    type: Object,
    required: true,
    validator: isActivityValid,
  },
})
const remainingSeconds = computed(
  () =>
    calculateTrackedActivitySeconds(timelineItems.value, props.activity) -
    props.activity.secondsToComplete,
)
</script>
<template>
  <div
    v-if="activity.secondsToComplete > 0"
    :class="[
      'flex items-center rounded px-2 font-mono text-xl',
      remainingSeconds < 0
        ? 'bg-red-100 text-red-600'
        : 'bg-green-100 text-green-600',
    ]"
  >
    {{ formatSecondsWithSign(remainingSeconds) }}
  </div>
</template>
