<script setup>
import { BUTTON_TYPE_DANGER, PERIOD_SELECT_OPTIONS } from '../constants'
import { ICON_TRASH } from '../icons'
import { updateActivity, deleteActivity } from '../activities'
import { isActivityValid } from '../validators'
import { timelineItems, resetTimelineActivities } from '../timeline-item'
import ActivitySecondsToComplete from './ActivitySecondsToComplete.vue'
import BaseSelect from './BaseSelect.vue'
import BaseButton from './BaseButton.vue'
import BaseIcon from './BaseIcon.vue'

const props = defineProps({
  activity: {
    type: Object,
    required: true,
    validator: isActivityValid,
  },
})

function deleteAndResetActivity(activity) {
  resetTimelineActivities(timelineItems.value, activity)
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
        <BaseIcon :name="ICON_TRASH" class="h-8" />
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
