<script setup>
import {
  isActivityValid,
  isTimelineItemValid,
  validateActivities,
  isNull,
} from '../validators'
import BaseSelect from './BaseSelect.vue'
import TimelineHour from './TimelineHour.vue'
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
  selectActivity: (activity) => isNull(activity) || isActivityValid(activity),
})
const selectActivity = (id) => {
  emit(
    'selectActivity',
    props.activities.find((activity) => activity.id === id) || null,
  )
}
</script>
<template>
  <li class="relative flex flex-col gap-2 border-t border-gray-200 px-4 py-10">
    <TimelineHour :hour="timelineItem.hour" />
    <BaseSelect
      :selected="timelineItem.activityId"
      :options="activitySelectOptions"
      placeholder="Rest"
      @select="selectActivity"
    />
  </li>
</template>
