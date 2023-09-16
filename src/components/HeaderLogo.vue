<script setup>
import { CheckBadgeIcon } from '@heroicons/vue/24/solid'
import { PAGE_TIMELINE } from '../constants'
import { navigate, currentPage } from '../router'
import { scrollToCurrentHour } from '../timeline-item'
const handleClick = () => {
  currentPage.value === PAGE_TIMELINE
    ? scrollToCurrentHour(true)
    : navigate(PAGE_TIMELINE)
}
</script>
<template>
  <a
    :href="`#${PAGE_TIMELINE}`"
    @click="handleClick"
    class="flex items-center gap-2 text-red-800"
  >
    <CheckBadgeIcon class="h-9 w-9" />
    <div class="text-2xl">OnTrack</div>
  </a>
</template>
