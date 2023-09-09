<script setup>
import { inject } from 'vue'
import {
  isHourValid,
  isNumber,
  isTimelineItemValid,
} from '../validators'
import BaseSelect from './BaseSelect.vue'
import TimelineHour from './TimelineHour.vue'
import TimelineStopwatch from './TimelineStopwatch.vue'

const setTimelineItemActivity = inject('setTimelineItemActivity')
const activitySelectOptions = inject('activitySelectOptions')
const props = defineProps({
  timelineItem: {
    type: Object,
    requred: true,
    validator: isTimelineItemValid,
  },
})
const emit = defineEmits({
  scrollToHour: isHourValid,
  updateActivitySeconds: isNumber,
})
</script>
<template>
  <li class="relative flex flex-col gap-2 border-t border-gray-200 px-4 py-10">
    <TimelineHour
      :hour="timelineItem.hour"
      @click.prevent="emit('scrollToHour', timelineItem.hour)"
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
