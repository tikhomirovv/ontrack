import {
  NAV_ITEMS,
  HOURS_IN_DAY,
  MIDNIGHT_HOUR,
  BUTTON_TYPES,
} from './constants.js'

// TypeScript, please
const isString = (value) => typeof value === 'string'
const isNotEmptyString = (value) => isString(value) && value.length > 0
export const isPageValid = (page) => {
  return Object.keys(NAV_ITEMS).includes(page)
}

export const isNull = (value) => value === null
export const isNumber = (value) => typeof value === 'number'
export const isUndefined = (value) => value === undefined
export const isTimelineItemValid = ({ hour }) => isHourValid(hour)

export const isHourValid = (hour) =>
  typeof isNumber(hour) && hour >= MIDNIGHT_HOUR && hour < HOURS_IN_DAY

const isSelectOptionsValid = ({ value, label }) =>
  (isNumber(value) || isNotEmptyString(value)) && isNotEmptyString(label)
export const validateSelectOptions = (options) =>
  options.every(isSelectOptionsValid)

export const validateTimelineItems = (timelineItems) =>
  timelineItems.every(isTimelineItemValid)

export const isUndefinedOrNull = (value) => isNull(value) || isUndefined(value)

export const isSelectValueValid = (value) =>
  isNotEmptyString(value) || isNumber(value) || isNull(value)
export const isNumberOrNull = (value) => isNumber(value) || isNull(value)

export const isActivityValid = ({ id, name, secondsToComplete }) => {
  if (isNull(id)) {
    return true
  }
  return [
    isNotEmptyString(id),
    isNotEmptyString(name),
    isNumber(secondsToComplete),
  ].every(Boolean)
}
export const validateActivities = (activities) =>
  activities.every(isActivityValid)

export const isButtonTypeValid = (type) => BUTTON_TYPES.includes(type)
