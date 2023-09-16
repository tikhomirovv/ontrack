import { ref, computed } from 'vue'
import { getTotalActivitySeconds } from './timeline-item'
import { id } from './functions'
import { HUNDRED_PERCENT } from './constants'
export const activities = ref(generateActivities())
export const trackedActivities = computed(() => {
  return activities.value.filter(
    ({ secondsToComplete }) => secondsToComplete !== 0,
  )
})
export const activitySelectOptions = computed(() =>
  generateActivitySelectOptions(activities.value),
)
export const createActivity = (activity) => {
  activities.value.push(activity)
}
export const deleteActivity = (activity) => {
  activities.value.splice(activities.value.indexOf(activity), 1)
}

export function getActivityProgress(activity) {
  return Math.floor(
    (getTotalActivitySeconds(activity) * HUNDRED_PERCENT) /
      activity.secondsToComplete,
  )
}

export const updateActivity = (activity, fields) => {
  return Object.assign(activity, fields)
}

function generateActivities() {
  return ['Coding', 'Reading', 'Training'].map((name, hours) => ({
    id: id(),
    name,
    secondsToComplete: 15 * 60, //hours * SECONDS_IN_HOUR,
  }))
}

function generateActivitySelectOptions(activities) {
  return activities.map((activity) => {
    return { label: activity.name, value: activity.id }
  })
}
