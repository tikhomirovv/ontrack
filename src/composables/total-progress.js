import { computed } from 'vue'
import { getProgressColorClass } from '../functions'
import {
  timelineItems,
  calculateTrackedActivitySeconds,
} from '../timeline-item'
import { trackedActivities, calculateCompletionPercentage } from '../activities'
export function useTotalProgress() {
  const totalTrackedSeconds = computed(() => {
    return trackedActivities.value
      .map((activity) =>
        Math.min(
          calculateTrackedActivitySeconds(timelineItems.value, activity),
          activity.secondsToComplete,
        ),
      )
      .reduce((total, seconds) => total + seconds, 0)
  })
  const percentage = computed(() =>
    calculateCompletionPercentage(totalTrackedSeconds.value),
  )
  const colorClass = computed(() => getProgressColorClass(percentage.value))
  return {
    colorClass,
    percentage,
  }
}
