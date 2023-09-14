<script setup>
import { nextTick, ref, inject } from 'vue'
import BaseButton from './BaseButton.vue'
import { PlusIcon } from '@heroicons/vue/24/outline'
import { id } from './../functions'
import { createActivityKey } from '../keys'
const createActivity = inject(createActivityKey)

let name = ref('')
const submit = async () => {
  createActivity({
    id: id(),
    name: name.value,
    secondsToComplete: 0,
  })
  name.value = ''
  await nextTick()
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
}
</script>
<template>
  <form
    class="sticky bottom-14 flex justify-between gap-2 border-t bg-white p-4"
    @submit.prevent="submit"
  >
    <input
      type="text"
      v-model="name"
      class="w-full flex-grow rounded border px-4 text-xl outline-purple-500 focus:outline-4"
      placeholder="Activity name"
    />
    <BaseButton :disabled="name.trim() === ''">
      <PlusIcon class="h-8" />
    </BaseButton>
  </form>
</template>
