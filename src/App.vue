<script setup>
import { ref, computed } from 'vue'
import Header from './components/Header.vue'
import Nav from './components/Nav.vue'
import Timeline from './pages/Timeline.vue'
import Activities from './pages/Activities.vue'
import Progress from './pages/Progress.vue'
import { PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE } from './constants'
import {
  getCurrentPageHash,
  generateTimelineItems,
  generateActivitySelectOptions,
  generateActivities,
} from './functions'

const timeline = ref()
const activities = ref(generateActivities())
const currentPage = ref(getCurrentPageHash())
const timelineItems = ref(generateTimelineItems(activities.value))
const activitySelectOptions = computed(() =>
  generateActivitySelectOptions(activities.value),
)
const goTo = (page) => {
  if (currentPage.value === PAGE_TIMELINE && page === PAGE_TIMELINE) {
    timeline.value.scrollToHour()
  } else if (page !== PAGE_TIMELINE) {
    document.body.scrollIntoView()
  }
  currentPage.value = page
}

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
const setTimelineItemActivity = (timelineItem, activity) => {
  timelineItem.activityId = activity.id
}
const setActivitySecondsToComplete = (activity, secondsToComplete) => {
  activity.secondsToComplete = secondsToComplete
}
</script>

<template>
  <Header @navigate="goTo" />
  <main class="flex flex-grow flex-col">
    <Timeline
      ref="timeline"
      v-show="currentPage === PAGE_TIMELINE"
      :current-page="currentPage"
      :activities="activities"
      :timeline-items="timelineItems"
      :activity-select-options="activitySelectOptions"
      @set-timeline-item-activity="setTimelineItemActivity"
    />
    <Activities
      v-show="currentPage === PAGE_ACTIVITIES"
      :activities="activities"
      @create-activity="createActivity"
      @delete-activity="deleteActivity"
      @set-activity-seconds-to-complete="setActivitySecondsToComplete"
    />
    <Progress v-show="currentPage === PAGE_PROGRESS" />
  </main>
  <Nav :current-page="currentPage" @navigate="goTo($event)" />
</template>
