<script setup>
import { TrashIcon } from '@heroicons/vue/24/outline'
import { PERIOD_SELECT_OPTIONS, BUTTON_TYPE_DANGER } from '../constants'
import {
  isActivityValid,
  isNumber,
  isUndefined,
  validateTimelineItems,
} from '../validators'
import BaseSelect from '../components/BaseSelect.vue'
import BaseButton from '../components/BaseButton.vue'
import ActivitySecondsToComplete from './ActivitySecondsToComplete.vue'

const props = defineProps({
  activity: {
    type: Object,
    required: true,
    validator: isActivityValid,
  },
  timelineItems: {
    type: Array,
    required: true,
    validator: validateTimelineItems,
  },
})

const emit = defineEmits({
  setSecondsToComplete: isNumber,
  delete: isUndefined,
})
</script>
<template>
  <li class="flex flex-col gap-2 p-4">
    <div class="flex items-center gap-2">
      <BaseButton :type="BUTTON_TYPE_DANGER" @click="emit('delete')">
        <TrashIcon class="h-8" />
      </BaseButton>
      <span class="truncate text-xl">{{ activity.name }}</span>
    </div>
    <div class="flex gap-2">
      <BaseSelect
        class="flex-grow font-mono"
        :selected="activity.secondsToComplete || null"
        :placeholder="'hh:mm'"
        :options="PERIOD_SELECT_OPTIONS"
        @select="emit('setSecondsToComplete', $event || 0)"
      />
      <ActivitySecondsToComplete
        :activity="activity"
        :timeline-items="props.timelineItems"
      />
    </div>
  </li>
</template>
