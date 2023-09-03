import { NAV_ITEMS, HOURS_IN_DAY, MIDNIGHT_HOUR } from './constants.js'

export const isPageValid = (page) => {
  return Object.keys(NAV_ITEMS).includes(page)
}

export const isTimelineItemValid = ({ hour }) => {
  return (
    typeof hour === 'number' && hour >= MIDNIGHT_HOUR && hour < HOURS_IN_DAY
  )
}

const validateSelectOption = ({ value, label }) =>
  typeof value === 'number' && typeof label === 'string'
export const validateSelectOptions = (options) => {
  return options.every(validateSelectOption)
}

export const validateTimelineItems = (timelineItems) =>
  timelineItems.every(isTimelineItemValid)
