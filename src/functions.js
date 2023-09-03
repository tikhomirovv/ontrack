import {
  PAGE_TIMELINE,
  PAGE_ACTIVITIES,
  PAGE_PROGRESS,
  HOURS_IN_DAY,
} from './constants'
export const getCurrentPageHash = () => {
  const hash = window.location.hash.slice(1)
  if ([PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE].includes(hash)) {
    return hash
  }
  window.location.hash = PAGE_TIMELINE
  return PAGE_TIMELINE
}

export function generateTimelineItems() {
  const timelineItems = []
  for (let hour = 0; hour < HOURS_IN_DAY; hour++) {
    timelineItems.push({ hour })
  }
  return timelineItems
}
