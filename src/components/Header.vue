<script setup>
import HeaderLogo from './HeaderLogo.vue'
import HeaderProgress from './HeaderProgress.vue'
const emit = defineEmits(['goToTimeline', 'goToProgress'])
</script>

<template>
  <header class="sticky top-0 z-20 flex items-center justify-between border-b bg-white p-3">
    <HeaderLogo @click="emit('goToTimeline')" />
    <HeaderProgress @click="emit('goToProgress')" />
  </header>
</template>
