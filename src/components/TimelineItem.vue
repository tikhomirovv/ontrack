<script setup>
import { inject } from 'vue'
import {
  isActivityValid,
  isHourValid,
  isNumber,
  isTimelineItemValid,
} from '../validators'
import { NULLABLE_ACTIVITY } from '../constants'
import BaseSelect from './BaseSelect.vue'
import TimelineHour from './TimelineHour.vue'
import TimelineStopwatch from './TimelineStopwatch.vue'

const activities = inject('activities')
const activitySelectOptions = inject('activitySelectOptions')
const props = defineProps({
  timelineItem: {
    type: Object,
    requred: true,
    validator: isTimelineItemValid,
  },
})
const emit = defineEmits({
  selectActivity: isActivityValid,
  scrollToHour: isHourValid,
  updateActivitySeconds: isNumber,
})
const findActivityById = (id) =>
  activities.find((activity) => activity.id === id) || NULLABLE_ACTIVITY
const selectActivity = (id) => {
  emit('selectActivity', findActivityById(id))
}
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
      @select="selectActivity"
    />
    <TimelineStopwatch
      :timeline-item="timelineItem"
      @update-seconds="emit('updateActivitySeconds', $event)"
    />
  </li>
</template>
