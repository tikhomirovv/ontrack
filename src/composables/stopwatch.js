import { ref } from 'vue'
import { MILLISECONDS_IN_SECONDS } from '../constants'

export function useStopwatch(initialSeconds) {
  const seconds = ref(initialSeconds)
  const timer = ref(null)
  const temp = 120

  const start = () => {
    timer.value = setInterval(() => {
      seconds.value += temp
    }, MILLISECONDS_IN_SECONDS)
  }
  const stop = () => {
    clearInterval(timer.value)
    timer.value = null
  }
  const reset = () => {
    stop()
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
