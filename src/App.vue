<script setup>
import { ref } from 'vue'
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
} from './functions'

const timelineItems = generateTimelineItems()
const currentPage = ref(getCurrentPageHash())
const activities = ref(['Coding', 'Reading', 'Trailing'])
const activitySelectOptions = generateActivitySelectOptions(activities.value)
const goTo = (page) => (currentPage.value = page)

const createActivity = (activity) => {
  activities.value.push(activity)
}
const deleteActivity = (activity) => {
  activities.value.splice(activities.value.indexOf(activity), 1)
}
</script>

<template>
  <Header @navigate="goTo" />
  <main class="flex flex-grow flex-col">
    <Timeline
      v-show="currentPage === PAGE_TIMELINE"
      :timeline-items="timelineItems"
      :activity-select-options="activitySelectOptions"
    />
    <Activities
      v-show="currentPage === PAGE_ACTIVITIES"
      :activities="activities"
      @create-activity="createActivity"
      @delete-activity="deleteActivity"
    />
    <Progress v-show="currentPage === PAGE_PROGRESS" />
  </main>
  <Nav :current-page="currentPage" @navigate="goTo($event)" />
</template>
