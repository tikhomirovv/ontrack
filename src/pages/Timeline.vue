<script setup>
import { watchPostEffect, ref, nextTick } from 'vue'
import TimelineItem from '../components/TimelineItem.vue'
import {
  validateActivities,
  validateTimelineItems,
  validateSelectOptions,
  isTimelineItemValid,
  isActivityValid,
  isPageValid,
  isNumber,
} from '../validators'
import { PAGE_TIMELINE } from '../constants'

const props = defineProps({
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
  currentPage: {
    type: String,
    required: true,
    validator: isPageValid,
  },
})
const emit = defineEmits({
  setTimelineItemActivity(timelineItem, activity) {
    return [isTimelineItemValid(timelineItem), isActivityValid(activity)].every(
      Boolean,
    )
  },
  updateTimelineItemActivitySeconds(timelineItem, activitySeconds) {
    return [isTimelineItemValid(timelineItem), isNumber(activitySeconds)].every(
      Boolean,
    )
  },
})
const timelineItemRefs = ref([])
watchPostEffect(async () => {
  if (props.currentPage === PAGE_TIMELINE) {
    await nextTick()
    scrollToHour(null, false)
  }
})
const scrollToHour = (hour = null, isSmooth = true) => {
  hour ??= new Date().getHours()
  timelineItemRefs.value[hour].$el.scrollIntoView({
    block: 'center',
    behavior: isSmooth ? 'smooth' : 'instant',
  })
}
defineExpose({ scrollToHour })
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
        @scroll-to-hour="scrollToHour"
        @update-activity-seconds="
          emit('updateTimelineItemActivitySeconds', timelineItem, $event)
        "
        ref="timelineItemRefs"
      />
    </ul>
  </div>
</template>
