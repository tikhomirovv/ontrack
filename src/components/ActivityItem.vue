<script setup>
import { inject } from 'vue'
import { TrashIcon } from '@heroicons/vue/24/outline'
import { BUTTON_TYPE_DANGER } from '../constants'
import { isActivityValid, isNumber, isUndefined } from '../validators'
import BaseSelect from '../components/BaseSelect.vue'
import BaseButton from '../components/BaseButton.vue'
import ActivitySecondsToComplete from './ActivitySecondsToComplete.vue'
const periodSelectOptions = inject('periodSelectOptions')
const props = defineProps({
  activity: {
    type: Object,
    required: true,
    validator: isActivityValid,
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
        :options="periodSelectOptions"
        @select="emit('setSecondsToComplete', $event || 0)"
      />
      <ActivitySecondsToComplete :activity="activity" />
    </div>
  </li>
</template>
