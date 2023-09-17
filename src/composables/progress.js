import { computed } from 'vue'
import { getProgressColorClass } from '../functions'
import { calaculateActivityCompletionPercentage } from '../activities'
import {
  timelineItems,
  calculateTrackedActivitySeconds,
} from '../timeline-item'
export function useProgress(activity) {
  const colorClass = computed(() => getProgressColorClass(percentage.value))
  const percentage = computed(() =>
    calaculateActivityCompletionPercentage(activity, trackedSeconds.value),
  )
  const trackedSeconds = computed(() =>
    calculateTrackedActivitySeconds(timelineItems.value, activity),
  )

  return {
    colorClass,
    percentage,
    trackedSeconds,
  }
}
