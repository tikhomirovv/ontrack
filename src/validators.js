import {
  NAV_ITEMS,
  HOURS_IN_DAY,
  MIDNIGHT_HOUR,
  BUTTON_TYPES,
} from './constants.js'

// TypeScript, please
const isNull = (value) => value === null
const isNumber = (value) => typeof value === 'number'
const isString = (value) => typeof value === 'string'
const isNotEmptyString = (value) => isString(value) && value.length > 0
export const isPageValid = (page) => {
  return Object.keys(NAV_ITEMS).includes(page)
}

export const isUndefined = (value) => value === undefined
export const isTimelineItemValid = ({ hour }) => isHourValid(hour)

export const isHourValid = (hour) =>
  typeof isNumber(hour) && hour >= MIDNIGHT_HOUR && hour < HOURS_IN_DAY

const validateSelectOption = ({ value, label }) =>
  isNumber(value) && isNotEmptyString(label)
export const validateSelectOptions = (options) =>
  options.every(validateSelectOption)

export const validateTimelineItems = (timelineItems) =>
  timelineItems.every(isTimelineItemValid)

export const isUndefinedOrNull = (value) => isNull(value) || isUndefined(value)

export const isNumberOrNull = (value) => isNumber(value) || isNull(value)

export const isActivityValid = (activity) => isNotEmptyString(activity)

export const validateActivities = (activities) =>
  activities.every(isActivityValid)

export const isButtonTypeValid = (type) => BUTTON_TYPES.includes(type)
