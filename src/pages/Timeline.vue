<script setup>
import { watchPostEffect, ref, nextTick } from 'vue'
import TimelineItem from '../components/TimelineItem.vue'
import { validateTimelineItems } from '../validators'
import { PAGE_TIMELINE } from '../constants'
import { currentPage } from '../router'
defineProps({
  timelineItems: {
    type: Array,
    required: true,
    validator: validateTimelineItems,
  },
})
const timelineItemRefs = ref([])
watchPostEffect(async () => {
  if (currentPage.value === PAGE_TIMELINE) {
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
        :timeline-item="timelineItem"
        @scroll-to-hour="scrollToHour"
        ref="timelineItemRefs"
      />
    </ul>
  </div>
</template>
