import { ref } from 'vue'
import { HOURS_IN_DAY } from './constants'
import { currentHour } from './functions'

export const timelineItems = ref(generateTimelineItems())

export function updateTimelineItem(timelineItem, fields) {
  return Object.assign(timelineItem, fields)
}

export function resetTimelineActivities(timelineItems, activity) {
  filterTimelineItemsByActivity(timelineItems, activity).forEach(
    (timelineItem) =>
      updateTimelineItem(timelineItem, {
        activityId: null,
        activitySeconds: 0,
      }),
  )
}

export function calculateTrackedActivitySeconds(timelineItems, activity) {
  return filterTimelineItemsByActivity(timelineItems, activity)
    .map(({ activitySeconds }) => activitySeconds)
    .reduce((total, seconds) => Math.round(total + seconds), 0)
}

function filterTimelineItemsByActivity(timelineItems, { id }) {
  return timelineItems.filter(({ activityId }) => activityId === id)
}

function generateTimelineItems() {
  return [...Array(HOURS_IN_DAY).keys()].map((hour) => ({
    hour,
    activityId: null,
    activitySeconds: 0,
    // activityId: [0, 1, 2, 3, 4].includes(hour)
    //   ? activities.value[hour % 3].id
    //   : null,
    // activitySeconds: [0, 1, 2, 3, 4].includes(hour) ? hour * 600 : 0,
  }))
}
export const timelineItemRefs = ref([])
export function scrollToCurrentHour(isSmooth = false) {
  scrollToHour(currentHour(), isSmooth)
}
export function scrollToHour(hour, isSmooth = true) {
  timelineItemRefs.value[hour].$el.scrollIntoView({
    block: 'center',
    behavior: isSmooth ? 'smooth' : 'instant',
  })
}
