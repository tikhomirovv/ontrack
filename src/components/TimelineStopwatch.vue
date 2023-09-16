<script setup>
import { ref, watch } from 'vue'
import {
  BUTTON_TYPE_DANGER,
  BUTTON_TYPE_SUCCESS,
  BUTTON_TYPE_WARNING,
  MILLISECONDS_IN_SECONDS,
} from '../constants'
import { currentHour, formatSeconds } from '../functions'
import { isTimelineItemValid } from '../validators'
import { updateTimelineItem } from '../timeline-item'
import BaseButton from './BaseButton.vue'
import BaseIcon from './BaseIcon.vue'
import { ICON_ARROW_PATH, ICON_PAUSE, ICON_PLAY } from '../icons'

const props = defineProps({
  timelineItem: {
    type: Object,
    requred: true,
    validator: isTimelineItemValid,
  },
})

const seconds = ref(props.timelineItem.activitySeconds)
const timer = ref(null)

watch(
  () => props.timelineItem.activityId,
  () => {
    updateTimelineItem(props.timelineItem, { activitySeconds: seconds })
  },
)

const start = () => {
  timer.value = setInterval(() => {
    updateTimelineItem(props.timelineItem, {
      activitySeconds: props.timelineItem.activitySeconds + 1,
    })
    seconds.value++
  }, MILLISECONDS_IN_SECONDS)
}
const stop = () => {
  clearInterval(timer.value)
  timer.value = null
}
const reset = () => {
  stop()
  updateTimelineItem(props.timelineItem, {
    activitySeconds: props.timelineItem.activitySeconds - seconds.value,
  })
  seconds.value = 0
}

const isStartButtonDisabled = props.timelineItem.hour !== currentHour()
</script>
<template>
  <div class="flex w-full gap-2">
    <BaseButton
      :type="BUTTON_TYPE_DANGER"
      @click="reset"
      :disabled="seconds === 0"
    >
      <BaseIcon :name="ICON_ARROW_PATH" class="h-8" />
    </BaseButton>
    <div
      class="flex flex-grow items-center rounded bg-gray-100 px-2 font-mono text-3xl"
    >
      {{ formatSeconds(seconds) }}
    </div>
    <BaseButton v-if="timer !== null" :type="BUTTON_TYPE_WARNING" @click="stop">
      <BaseIcon :name="ICON_PAUSE" class="h-8" />
    </BaseButton>
    <BaseButton
      v-else
      :disabled="isStartButtonDisabled"
      :type="BUTTON_TYPE_SUCCESS"
      @click="start"
    >
      <BaseIcon :name="ICON_PLAY" class="h-8" />
    </BaseButton>
  </div>
</template>
