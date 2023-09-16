<script setup>
import { isNumber, isTimelineItemValid, isUndefined } from '../validators'
import { updateTimelineItem } from '../timeline-item'
import { activitySelectOptions } from '../activities'
import { scrollToHour } from '../timeline-item'
import BaseSelect from './BaseSelect.vue'
import TimelineHour from './TimelineHour.vue'
import TimelineStopwatch from './TimelineStopwatch.vue'

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
      @click.prevent="scrollToHour(timelineItem.hour)"
    />
    <BaseSelect
      :selected="timelineItem.activityId"
      :options="activitySelectOptions"
      placeholder="Rest"
      @select="updateTimelineItem(timelineItem, { activityId: $event })"
    />
    <TimelineStopwatch
      :timeline-item="timelineItem"
      @update-seconds="emit('updateActivitySeconds', $event)"
    />
  </li>
</template>
