<script setup>
import { validateActivities } from '../validators'
import ActivityItem from '../components/ActivityItem.vue'
import ActivityForm from '../components/ActivityForm.vue'
import ActivitiesEmptyState from '../components/ActivitiesEmptyState.vue'
const props = defineProps({
  activities: {
    type: Array,
    required: true,
    validator: validateActivities,
  },
})
</script>
<template>
  <div class="flex flex-grow flex-col">
    <ul v-if="activities.length > 0" class="flex-grow divide-y">
      <ActivityItem
        v-for="activity in activities"
        :key="activity.id"
        :activity="activity"
      />
    </ul>
    <ActivitiesEmptyState v-else />
    <ActivityForm />
  </div>
</template>
