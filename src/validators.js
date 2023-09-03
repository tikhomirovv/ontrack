import { NAV_ITEMS, HOURS_IN_DAY, MIDNIGHT_HOUR } from './constants.js'

// TypeScript, please
const isNull = (value) => value === null
const isUndefined = (value) => value === undefined
const isNumber = (value) => typeof value === 'number'
const isString = (value) => typeof value === 'string'

export const isPageValid = (page) => {
  return Object.keys(NAV_ITEMS).includes(page)
}

export const isTimelineItemValid = ({ hour }) => isHourValid(hour)
export const isHourValid = (hour) =>
  typeof isNumber(hour) && hour >= MIDNIGHT_HOUR && hour < HOURS_IN_DAY
const validateSelectOption = ({ value, label }) =>
  isNumber(value) && isString(label)
export const validateSelectOptions = (options) =>
  options.every(validateSelectOption)
export const validateTimelineItems = (timelineItems) =>
  timelineItems.every(isTimelineItemValid)
export const isUndefinedOrNull = (value) => isNull(value) || isUndefined(value)
export const isNumberOrNull = (value) => isNumber(value) || isNull(value)
