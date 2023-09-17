<script setup>
import { trackedActivities } from '../activities'
import ProgressItem from '../components/ProgressItem.vue'
import ProgressEmptyState from '../components/ProgressEmptyState.vue'
</script>
<template>
  <div class="flex flex-grow flex-col">
    <ul v-if="trackedActivities.length > 0" class="divide-y">
      <ProgressItem
        v-for="activity in trackedActivities"
        :key="activity.id"
        :activity="activity"
      />
    </ul>
    <ProgressEmptyState v-else />
  </div>
</template>
