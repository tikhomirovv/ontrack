<script setup>
import { computed } from 'vue'
import { calaculateActivityCompletionPercentage } from '../activities'
import { getProgressColorClass, formatSeconds } from '../functions'
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
const trackedActivitySeconds = computed(() =>
  calculateTrackedActivitySeconds(timelineItems.value, props.activity),
)
const percentage = computed(() =>
  calaculateActivityCompletionPercentage(
    props.activity,
    trackedActivitySeconds.value,
  ),
)
</script>
<template>
  <li class="flex flex-col gap-1 p-4">
    <div class="truncate text-xl">{{ activity.name }}</div>
    <div class="flex h-5 overflow-hidden rounded bg-neutral-200">
      <div
        :class="getProgressColorClass(percentage)"
        :style="`width: ${percentage}%`"
      ></div>
    </div>
    <div class="flex justify-between font-mono text-sm">
      <span>{{ percentage }}%</span>
      <span>
        {{ trackedActivitySeconds }}
        {{ formatSeconds(trackedActivitySeconds) }} /
        {{ formatSeconds(activity.secondsToComplete) }}
      </span>
    </div>
  </li>
</template>
