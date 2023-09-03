<script setup>
import { PAGE_PROGRESS, PAGE_TIMELINE } from '../constants'
import { isPageValid } from '../validators'
import HeaderLogo from './HeaderLogo.vue'
import HeaderProgress from './HeaderProgress.vue'

const emit = defineEmits({
  navigate: isPageValid,
})
</script>

<template>
  <header
    class="sticky top-0 z-20 flex items-center justify-between border-b bg-white p-3"
  >
    <HeaderLogo @click="emit('navigate', PAGE_TIMELINE)" />
    <HeaderProgress @click="emit('navigate', PAGE_PROGRESS)" />
  </header>
</template>
