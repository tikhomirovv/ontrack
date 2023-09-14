<script setup>
import { inject } from 'vue'
import { isNumber, isTimelineItemValid, isUndefined } from '../validators'
import BaseSelect from './BaseSelect.vue'
import TimelineHour from './TimelineHour.vue'
import TimelineStopwatch from './TimelineStopwatch.vue'
import { setTimelineItemActivityKey, activitySelectOptionsKey } from '../keys'
const setTimelineItemActivity = inject(setTimelineItemActivityKey)
const activitySelectOptions = inject(activitySelectOptionsKey)
const props = defineProps({
  timelineItem: {
    type: Object,
    requred: true,
    validator: isTimelineItemValid,
  },
})
const emit = defineEmits({
  scrollToHour: isUndefined,
  updateActivitySeconds: isNumber,
})
</script>
<template>
  <li class="relative flex flex-col gap-2 border-t border-gray-200 px-4 py-10">
    <TimelineHour
      :hour="timelineItem.hour"
      @click.prevent="emit('scrollToHour')"
    />
    <BaseSelect
      :selected="timelineItem.activityId"
      :options="activitySelectOptions"
      placeholder="Rest"
      @select="setTimelineItemActivity(timelineItem, $event)"
    />
    <TimelineStopwatch
      :timeline-item="timelineItem"
      @update-seconds="emit('updateActivitySeconds', $event)"
    />
  </li>
</template>
