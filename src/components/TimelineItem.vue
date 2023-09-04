<script setup>
import { ref } from 'vue'
import { isTimelineItemValid } from '../validators'
import BaseSelect from './BaseSelect.vue'
import TimelineHour from './TimelineHour.vue'
defineProps({
  timelineItem: {
    type: Object,
    requred: true,
    validator: isTimelineItemValid,
  },
  activitySelectOptions: {
    type: Array,
    required: true,
  },
})
const selectedActivityId = ref(0)
</script>
<template>
  <li class="relative flex flex-col gap-2 border-t border-gray-200 px-4 py-10">
    <TimelineHour :hour="timelineItem.hour" />
    <BaseSelect
      :selected="selectedActivityId"
      :options="activitySelectOptions"
      placeholder="Rest"
      @select="selectedActivityId = $event"
    />
  </li>
</template>
