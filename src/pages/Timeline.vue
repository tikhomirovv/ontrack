<script setup>
import TimelineItem from '../components/TimelineItem.vue'
import { generateTimelineItems } from '../functions'
const timelineItems = generateTimelineItems()
</script>
<template>
  <div class="mt-7">
    <ui>
      <TimelineItem
        v-for="timelineItem in timelineItems"
        :key="timelineItem.hour"
        :timeline-item="timelineItem"
      />
    </ui>
  </div>
</template>
