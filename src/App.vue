<script setup>
import { ref, computed, provide, readonly } from 'vue'
import Header from './components/Header.vue'
import Nav from './components/Nav.vue'
import Timeline from './pages/Timeline.vue'
import Activities from './pages/Activities.vue'
import Progress from './pages/Progress.vue'
import { PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE } from './constants'
import {
  generateTimelineItems,
  generateActivitySelectOptions,
  generateActivities,
  generatePeriodSelectOptions,
} from './functions'
import * as keys from './keys'
import { currentPage, timelineRef } from './router'
const activities = ref(generateActivities())
const timelineItems = ref(generateTimelineItems(activities.value))
const activitySelectOptions = computed(() =>
  generateActivitySelectOptions(activities.value),
)

const createActivity = (activity) => {
  activities.value.push(activity)
}
const deleteActivity = (activity) => {
  timelineItems.value.forEach((timelineItem) => {
    if (timelineItem.activityId === activity.id) {
      timelineItem.activityId = null
      timelineItem.activitySeconds = 0
    }
  })
  activities.value.splice(activities.value.indexOf(activity), 1)
}
const setTimelineItemActivity = (timelineItem, activityId) => {
  timelineItem.activityId = activityId
}
function updateTimelineItemActivitySeconds(timelineItem, activitySeconds) {
  timelineItem.activitySeconds += activitySeconds
}
const setActivitySecondsToComplete = (activity, secondsToComplete) => {
  activity.secondsToComplete = secondsToComplete
}
provide(
  keys.updateTimelineItemActivitySecondsKey,
  updateTimelineItemActivitySeconds,
)
provide(keys.setActivitySecondsToCompleteKey, setActivitySecondsToComplete)
provide(keys.setTimelineItemActivityKey, setTimelineItemActivity)
provide(keys.createActivityKey, createActivity)
provide(keys.deleteActivityKey, deleteActivity)
provide(keys.activitySelectOptionsKey, readonly(activitySelectOptions.value))
provide(keys.periodSelectOptionsKey, readonly(generatePeriodSelectOptions()))
provide(keys.timelineItemsKey, readonly(timelineItems.value))
</script>

<template>
  <Header />
  <main class="flex flex-grow flex-col">
    <Timeline
      ref="timelineRef"
      v-show="currentPage === PAGE_TIMELINE"
      :timeline-items="timelineItems"
    />
    <Activities
      v-show="currentPage === PAGE_ACTIVITIES"
      :activities="activities"
    />
      <Progress v-show="currentPage === PAGE_PROGRESS" />
  </main>
  <Nav />
</template>
