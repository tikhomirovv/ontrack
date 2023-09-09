<script setup>
import { CheckBadgeIcon } from '@heroicons/vue/24/solid'
import { PAGE_TIMELINE } from '../constants'
import { navigate } from '../router'
</script>
<template>
  <a
    :href="`#${PAGE_TIMELINE}`"
    @click="navigate(PAGE_TIMELINE)"
    class="flex items-center gap-2 text-red-800"
  >
    <CheckBadgeIcon class="h-9 w-9" />
    <div class="text-2xl">OnTrack</div>
  </a>
</template>
