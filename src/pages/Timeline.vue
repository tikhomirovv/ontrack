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
})
const timelineItemRefs = ref([])
watchPostEffect(async () => {
  if (props.currentPage === PAGE_TIMELINE) {
    await nextTick()
    scrollToHour(new Date().getHours())
  }
})
const scrollToHour = (hour) => {
  timelineItemRefs.value[hour].$el.scrollIntoView({
    block: 'center',
    behavior: 'smooth',
  })
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
        @scroll-to-hour="scrollToHour"
        ref="timelineItemRefs"
      />
    </ul>
  </div>
</template>
