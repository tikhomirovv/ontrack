<script setup>
import {
  isActivityValid,
  isHourValid,
  isNumber,
  isTimelineItemValid,
  validateActivities,
} from '../validators'
import { NULLABLE_ACTIVITY } from '../constants'
import BaseSelect from './BaseSelect.vue'
import TimelineHour from './TimelineHour.vue'
import TimelineStopwatch from './TimelineStopwatch.vue'
const props = defineProps({
  timelineItem: {
    type: Object,
    requred: true,
    validator: isTimelineItemValid,
  },
  activities: {
    type: Array,
    required: true,
    validator: validateActivities,
  },
  activitySelectOptions: {
    type: Array,
    required: true,
  },
})
const emit = defineEmits({
  selectActivity: isActivityValid,
  scrollToHour: isHourValid,
  updateActivitySeconds: isNumber,
})
const findActivityById = (id) =>
  props.activities.find((activity) => activity.id === id) || NULLABLE_ACTIVITY
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
      :seconds="timelineItem.activitySeconds"
      :hour="timelineItem.hour"
      @update-seconds="emit('updateActivitySeconds', $event)"
    />
  </li>
</template>
