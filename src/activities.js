import { ref, computed } from 'vue'
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

export function calaculateActivityCompletionPercentage(
  { secondsToComplete },
  trackedSeconds,
) {
  return Math.floor((trackedSeconds * HUNDRED_PERCENT) / secondsToComplete)
}

export function calculateCompletionPercentage(totalTrackedSeconds) {
  return Math.floor(
    (totalTrackedSeconds * HUNDRED_PERCENT) /
      totalActivitySecondsToComplete.value,
  )
}

export const updateActivity = (activity, fields) => {
  return Object.assign(activity, fields)
}

const totalActivitySecondsToComplete = computed(() => {
  return trackedActivities.value
    .map(({ secondsToComplete }) => secondsToComplete)
    .reduce((total, seconds) => total + seconds, 0)
})

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
