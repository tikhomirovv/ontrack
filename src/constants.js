import {
  ClockIcon,
  ListBulletIcon,
  ChartBarIcon,
} from '@heroicons/vue/24/outline'

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
  { icon: ClockIcon, page: PAGE_TIMELINE },
  { icon: ListBulletIcon, page: PAGE_ACTIVITIES },
  { icon: ChartBarIcon, page: PAGE_PROGRESS },
]

export const MIDNIGHT_HOUR = 0
export const HOURS_IN_DAY = 24
export const MILLISECONDS_IN_SECONDS = 1000
export const SECONDS_IN_MINUTE = 60
export const MINUTES_IN_HOUR = 60
export const SECONDS_IN_HOUR = SECONDS_IN_MINUTE * MINUTES_IN_HOUR
