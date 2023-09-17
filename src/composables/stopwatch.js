import { ref, watch } from 'vue'
import { MILLISECONDS_IN_SECONDS } from '../constants'
import { updateTimelineItem } from '../timeline-item'

export function useStopwatch(timelineItem) {
  const seconds = ref(timelineItem.activitySeconds)
  const timer = ref(null)
  const temp = 120

  watch(
    () => timelineItem.activityId,
    () => {
      updateTimelineItem(timelineItem, {
        activitySeconds: seconds.value,
      })
    },
  )
  const start = () => {
    timer.value = setInterval(() => {
      updateTimelineItem(timelineItem, {
        activitySeconds: timelineItem.activitySeconds + temp,
      })
      seconds.value += temp
    }, MILLISECONDS_IN_SECONDS)
  }
  const stop = () => {
    clearInterval(timer.value)
    timer.value = null
  }
  const reset = () => {
    stop()
    updateTimelineItem(timelineItem, {
      activitySeconds: timelineItem.activitySeconds - seconds.value,
    })
    seconds.value = 0
  }

  return {
    seconds,
    timer,
    start,
    stop,
    reset,
  }
}
