<script setup>
import { navigate, currentPage } from '../router'
import { isNavItemValid } from '../validators'
defineProps({
  navItem: {
    type: Object,
    required: true,
    validator: isNavItemValid,
  },
})
</script>
<template>
  <li
    class="flex-1"
    :class="{ 'pointer-events-none bg-gray-200': currentPage === navItem.page }"
  >
    <a
      :href="`#${navItem.page}`"
      @click="navigate(navItem.page)"
      class="flex flex-col items-center p-2 text-xs capitalize"
    >
      <component :is="navItem.icon" class="h-6 w-6" /> {{ navItem.page }}
    </a>
  </li>
</template>
