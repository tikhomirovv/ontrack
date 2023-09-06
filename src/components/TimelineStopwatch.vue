<script setup>
import { ref } from 'vue'
import {
  BUTTON_TYPE_DANGER,
  BUTTON_TYPE_SUCCESS,
  BUTTON_TYPE_WARNING,
  MILLISECONDS_IN_SECONDS,
} from '../constants'
import { formatSeconds } from '../functions'
import { isHourValid, isNumber } from '../validators'
import BaseButton from './BaseButton.vue'
import { ArrowPathIcon, PauseIcon, PlayIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  seconds: {
    default: 0,
    type: Number,
    validator: isNumber,
  },
  hour: {
    type: Number,
    required: true,
    validator: isHourValid,
  },
})

const emit = defineEmits({
  updateSeconds: isNumber,
})

const seconds = ref(props.seconds)
const timer = ref(null)

const start = () => {
  timer.value = setInterval(() => {
    emit('updateSeconds', 1)
    seconds.value++
  }, MILLISECONDS_IN_SECONDS)
}
const stop = () => {
  clearInterval(timer.value)
  timer.value = null
}
const reset = () => {
  stop()
  emit('updateSeconds', -seconds.value)
  seconds.value = 0
}

const isStartButtonDisabled = props.hour !== new Date().getHours()
</script>
<template>
  <div class="flex w-full gap-2">
    <BaseButton
      :type="BUTTON_TYPE_DANGER"
      @click="reset"
      :disabled="seconds === 0"
      ><ArrowPathIcon class="h-8"
    /></BaseButton>
    <div
      class="flex flex-grow items-center rounded bg-gray-100 px-2 font-mono text-3xl"
    >
      {{ formatSeconds(seconds) }}
    </div>
    <BaseButton v-if="timer !== null" :type="BUTTON_TYPE_WARNING" @click="stop"
      ><PauseIcon class="h-8"
    /></BaseButton>
    <BaseButton
      v-else
      :disabled="isStartButtonDisabled"
      :type="BUTTON_TYPE_SUCCESS"
      @click="start"
      ><PlayIcon class="h-8"
    /></BaseButton>
  </div>
</template>
