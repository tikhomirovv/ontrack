<script setup>
import { watch, watchEffect } from 'vue'
import {
  BUTTON_TYPE_DANGER,
  BUTTON_TYPE_SUCCESS,
  BUTTON_TYPE_WARNING,
} from '../constants'
import { currentHour, formatSeconds } from '../functions'
import { isTimelineItemValid } from '../validators'
import { updateTimelineItem } from '../timeline-item'
import { useStopwatch } from '../composables/stopwatch'
import { ICON_ARROW_PATH, ICON_PAUSE, ICON_PLAY } from '../icons'
import BaseButton from './BaseButton.vue'
import BaseIcon from './BaseIcon.vue'
const props = defineProps({
  timelineItem: {
    type: Object,
    requred: true,
    validator: isTimelineItemValid,
  },
})
const { seconds, timer, start, stop, reset } = useStopwatch(
  props.timelineItem.activitySeconds,
)
watchEffect(() =>
  updateTimelineItem(props.timelineItem, {
    activitySeconds: seconds.value,
  }),
)
</script>
<template>
  <div class="flex w-full gap-2">
    <BaseButton
      :type="BUTTON_TYPE_DANGER"
      @click="reset"
      :disabled="timelineItem.activitySeconds === 0"
    >
      <BaseIcon :name="ICON_ARROW_PATH" />
    </BaseButton>
    <div
      class="flex flex-grow items-center rounded bg-gray-100 px-2 font-mono text-3xl"
    >
      {{ formatSeconds(timelineItem.activitySeconds) }}
    </div>
    <BaseButton v-if="timer !== null" :type="BUTTON_TYPE_WARNING" @click="stop">
      <BaseIcon :name="ICON_PAUSE" />
    </BaseButton>
    <BaseButton
      v-else
      :disabled="timelineItem.hour !== currentHour()"
      :type="BUTTON_TYPE_SUCCESS"
      @click="start"
    >
      <BaseIcon :name="ICON_PLAY" />
    </BaseButton>
  </div>
</template>
