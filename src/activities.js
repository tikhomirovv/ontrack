import { ref, computed } from 'vue'
import { SECONDS_IN_HOUR } from './constants'
import { id } from './functions'
export const activities = ref(generateActivities())
export const activitySelectOptions = computed(() =>
  generateActivitySelectOptions(activities.value),
)
export const createActivity = (activity) => {
  activities.value.push(activity)
}
export const deleteActivity = (activity) => {
  activities.value.splice(activities.value.indexOf(activity), 1)
}
export const setActivitySecondsToComplete = (activity, secondsToComplete) => {
  activity.secondsToComplete = secondsToComplete || 0
}

function generateActivities() {
  return ['Coding', 'Reading', 'Training'].map((name, hours) => ({
    id: id(),
    name,
    secondsToComplete: hours * SECONDS_IN_HOUR,
  }))
}

function generateActivitySelectOptions(activities) {
  return activities.map((activity) => {
    return { label: activity.name, value: activity.id }
  })
}
