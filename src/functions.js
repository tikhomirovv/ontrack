import {
  PAGE_TIMELINE,
  MIDNIGHT_HOUR,
  HOURS_IN_DAY,
  SECONDS_IN_HOUR,
} from './constants'
import { isPageValid, isNull } from './validators'
export const getCurrentPageHash = () => {
  const page = window.location.hash.slice(1)
  if (isPageValid(page)) {
    return page
  }
  window.location.hash = PAGE_TIMELINE
  return PAGE_TIMELINE
}

export const id = () =>
  Date.now().toString(36) + Math.random().toString(36).substring(2)

export const normalizeSelectValue = (value) =>
  isNull(value) || isNaN(value) ? value : +value

export const generateActivities = () => {
  return ['Coding', 'Reading', 'Training'].map((name, hours) => ({
    id: id(),
    name,
    secondsToComplete: hours * SECONDS_IN_HOUR,
  }))
}

export function generateTimelineItems() {
  const timelineItems = []
  for (let hour = MIDNIGHT_HOUR; hour < HOURS_IN_DAY; hour++) {
    timelineItems.push({ hour, activityId: null })
  }
  return timelineItems
}

export const generateActivitySelectOptions = (activities) =>
  activities.map((activity) => {
    return { label: activity.name, value: activity.id }
  })
