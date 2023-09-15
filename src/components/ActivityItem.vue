<script setup>
import { TrashIcon } from '@heroicons/vue/24/outline'
import { BUTTON_TYPE_DANGER, PERIOD_SELECT_OPTIONS } from '../constants'
import { updateActivity, deleteActivity } from '../activities'
import { isActivityValid } from '../validators'
import { resetTimelineActivities } from '../timeline-item'
import BaseSelect from '../components/BaseSelect.vue'
import BaseButton from '../components/BaseButton.vue'
import ActivitySecondsToComplete from './ActivitySecondsToComplete.vue'

const props = defineProps({
  activity: {
    type: Object,
    required: true,
    validator: isActivityValid,
  },
})

function deleteAndResetActivity(activity) {
  resetTimelineActivities(activity)
  deleteActivity(activity)
}
</script>
<template>
  <li class="flex flex-col gap-2 p-4">
    <div class="flex items-center gap-2">
      <BaseButton
        :type="BUTTON_TYPE_DANGER"
        @click="deleteAndResetActivity(activity)"
      >
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
        @select="updateActivity(activity, { secondsToComplete: $event || 0 })"
      />
      <ActivitySecondsToComplete :activity="activity" />
    </div>
  </li>
</template>
