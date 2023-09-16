<script setup>
import Nav from './components/Nav.vue'
import { currentPage, routes } from './router'
import Header from './components/Header.vue'
</script>

<template>
  <Header />
  <main class="flex flex-grow flex-col">
    <KeepAlive>
      <component :is="routes[currentPage]" />
    </KeepAlive>
  </main>
  <Nav />
</template>
