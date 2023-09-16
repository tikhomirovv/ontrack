import { generatePeriodSelectOptions } from './functions'
import { ICON_CLOCK, ICON_CHART_BAR, ICON_LIST_BULLET } from './icons'

export const BUTTON_TYPE_DANGER = 'danger'
export const BUTTON_TYPE_NEUTRAL = 'neutral'
export const BUTTON_TYPE_PRIMARY = 'primary'
export const BUTTON_TYPE_SUCCESS = 'success'
export const BUTTON_TYPE_WARNING = 'warning'

export const BUTTON_TYPES = [
  BUTTON_TYPE_NEUTRAL,
  BUTTON_TYPE_DANGER,
  BUTTON_TYPE_PRIMARY,
  BUTTON_TYPE_SUCCESS,
  BUTTON_TYPE_WARNING,
]
export const PAGE_TIMELINE = 'timeline'
export const PAGE_ACTIVITIES = 'activities'
export const PAGE_PROGRESS = 'progress'

export const NAV_ITEMS = [
  { icon: ICON_CLOCK, page: PAGE_TIMELINE },
  { icon: ICON_LIST_BULLET, page: PAGE_ACTIVITIES },
  { icon: ICON_CHART_BAR, page: PAGE_PROGRESS },
]

export const MIDNIGHT_HOUR = 0
export const HOURS_IN_DAY = 24
export const MILLISECONDS_IN_SECONDS = 1000
export const SECONDS_IN_MINUTE = 60
export const MINUTES_IN_HOUR = 60
export const SECONDS_IN_HOUR = SECONDS_IN_MINUTE * MINUTES_IN_HOUR

export const PERIOD_SELECT_OPTIONS = generatePeriodSelectOptions()
