<script setup>
import { onMounted, ref } from 'vue'
import TimelineItem from '../components/TimelineItem.vue'
import {
  validateActivities,
  validateTimelineItems,
  validateSelectOptions,
  isTimelineItemValid,
  isActivityValid,
} from '../validators'

const a = () => {}
defineProps({
  timelineItems: {
    type: Array,
    required: true,
    validator: validateTimelineItems,
  },
  activities: {
    type: Array,
    required: true,
    validator: validateActivities,
  },
  activitySelectOptions: {
    type: Array,
    required: true,
    validator: validateSelectOptions,
  },
})
const emit = defineEmits({
  setTimelineItemActivity(timelineItem, activity) {
    return [isTimelineItemValid(timelineItem), isActivityValid(activity)].every(
      Boolean,
    )
  },
})
const timelineItemRefs = ref([])
onMounted(() => scrollToCurrentTimelineItem)
const scrollToCurrentTimelineItem = () => {
  const currentHour = new Date().getHours()
  if (currentHour > 0) {
    timelineItemRefs.value[currentHour - 1].$el.scrollIntoView()
  }
}
</script>
<template>
  <div class="mt-7">
    <ul>
      <TimelineItem
        v-for="timelineItem in timelineItems"
        :key="timelineItem.hour"
        :activities="activities"
        :timeline-item="timelineItem"
        :activity-select-options="activitySelectOptions"
        @select-activity="emit('setTimelineItemActivity', timelineItem, $event)"
        ref="timelineItemRefs"
      />
    </ul>
  </div>
</template>
