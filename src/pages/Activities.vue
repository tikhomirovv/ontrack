<script setup>
import {
  isActivityValid,
  isNumber,
  validateActivities,
  validateTimelineItems,
} from '../validators'
import ActivityItem from '../components/ActivityItem.vue'
import ActivityForm from '../components/ActivityForm.vue'
import ActivitiesEmptyState from '../components/ActivitiesEmptyState.vue'
const props = defineProps({
  activities: {
    type: Array,
    required: true,
    validator: validateActivities,
  },
  timelineItems: {
    type: Array,
    required: true,
    validator: validateTimelineItems,
  },
})
const emit = defineEmits({
  createActivity: isActivityValid,
  deleteActivity: isActivityValid,
  setActivitySecondsToComplete: (activity, secondsToComplete) =>
    [isActivityValid(activity), isNumber(secondsToComplete)].every(Boolean),
})
const setSecondsToComplete = (activity, secondsToComplete) => {
  emit('setActivitySecondsToComplete', activity, secondsToComplete)
}
</script>
<template>
  <div class="flex flex-grow flex-col">
    <ul v-if="activities.length > 0" class="flex-grow divide-y">
      <ActivityItem
        v-for="activity in activities"
        :key="activity.id"
        :activity="activity"
        :timeline-items="props.timelineItems"
        @set-seconds-to-complete="setSecondsToComplete(activity, $event)"
        @delete="emit('deleteActivity', activity)"
      />
    </ul>
    <ActivitiesEmptyState v-else />
    <ActivityForm @submit="emit('createActivity', $event)" />
  </div>
</template>
