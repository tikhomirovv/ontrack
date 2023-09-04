<script setup>
import BaseButton from './BaseButton.vue'
import { PlusIcon } from '@heroicons/vue/24/outline'
import { isActivityValid } from './../validators'
import { ref } from 'vue'

const emit = defineEmits({
  submit: isActivityValid,
})
let activity = ref('')
const submit = () => {
  emit('submit', activity.value)
  activity.value = ''
}
</script>
<template>
  <form
    class="sticky bottom-14 flex justify-between gap-2 border-t bg-white p-4"
    @submit.prevent="submit"
  >
    <input
      type="text"
      v-model="activity"
      class="w-full flex-grow rounded border px-4 text-xl"
      placeholder="Activity name"
    />
    <BaseButton :disabled="activity.trim() === ''">
      <PlusIcon class="h-8" />
    </BaseButton>
  </form>
</template>
