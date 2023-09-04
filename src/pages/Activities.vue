<script setup>
import { isActivityValid, validateActivities } from '../validators'
import ActivityItem from '../components/ActivityItem.vue'
import ActivityForm from '../components/ActivityForm.vue'
import ActivitiesEmptyState from '../components/ActivitiesEmptyState.vue'
defineProps({
  activities: {
    type: Array,
    required: true,
    validator: validateActivities,
  },
})
const emit = defineEmits({
  createActivity: isActivityValid,
  deleteActivity: isActivityValid,
})
</script>
<template>
  <div class="flex flex-grow flex-col">
    <ul v-if="activities.length > 0" class="flex-grow divide-y">
      <ActivityItem
        v-for="activity in activities"
        :key="activity"
        :activity="activity"
        @delete="emit('deleteActivity', activity)"
      />
    </ul>
    <ActivitiesEmptyState v-else />
    <ActivityForm @submit="emit('createActivity', $event)" />
  </div>
</template>
